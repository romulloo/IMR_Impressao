/**
 * =============================================================================
 * IMR IMPRESSÃO 3D - SERVIDOR WEB HÍBRIDO (NODE.JS + PYTHON)
 * Backend Express + Engine Python de Manufatura Digital Bambu Lab
 * =============================================================================
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn, execFile } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;
const PYTHON_PATH = process.env.PYTHON_PATH || 'python';
const ENGINE_SCRIPT = path.join(__dirname, 'engine_3d.py');

// Configuração de Diretórios
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta public sem cache agressivo no desenvolvimento local
app.use(express.static(PUBLIC_DIR, {
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Configuração do Multer para upload de arquivos STL
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${uniqueSuffix}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limite de 60 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.stl') {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos no formato .STL são aceitos para análise 3D.'));
    }
  }
});

/**
 * BANCO DE DADOS OFICIAL - PRODUTOS IMR IMPRESSÃO
 * Carregamento dinâmico sem cache para refletir atualizações instantaneamente
 */
function getProductsData() {
  const pPath = path.join(__dirname, 'public', 'assets', 'js', 'products.js');
  try {
    delete require.cache[require.resolve(pPath)];
    return require(pPath).PRODUCTS_DATA || [];
  } catch (e) {
    console.error('Erro ao ler products.js:', e);
    return [];
  }
}

/**
 * Função Auxiliar: Executa o Script Python via child_process com Timeout e Sanitização
 */
function runPythonEngine(args) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const child = spawn(PYTHON_PATH, [ENGINE_SCRIPT, ...args]);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      const elapsedMs = Date.now() - startTime;
      if (code !== 0) {
        return reject(new Error(`Python Engine falhou (código ${code}): ${stderr || stdout}`));
      }
      try {
        const parsed = JSON.parse(stdout);
        parsed._engine_latency_ms = elapsedMs;
        resolve(parsed);
      } catch (err) {
        reject(new Error(`Erro ao interpretar resposta JSON do Python: ${err.message}. Output: ${stdout}`));
      }
    });

    child.on('error', (err) => {
      reject(new Error(`Falha ao iniciar processo Python: ${err.message}`));
    });

    // Timeout de segurança para arquivos STL gigantes (60 segundos)
    setTimeout(() => {
      child.kill();
      reject(new Error('Tempo limite excedido no processamento 3D (Timeout 60s).'));
    }, 60000);
  });
}

/**
 * =============================================================================
 * ROTAS DA API REST
 * =============================================================================
 */

// 1. GET /api/health -> Status do servidor Node.js e integridade do Python
app.get('/api/health', async (req, res) => {
  try {
    const pythonCheck = await new Promise((resolve) => {
      execFile(PYTHON_PATH, ['--version'], (error, stdout, stderr) => {
        if (error) {
          resolve({ available: false, version: stderr || error.message });
        } else {
          resolve({ available: true, version: (stdout || stderr).trim() });
        }
      });
    });

    res.json({
      status: 'online',
      service: 'IMR Impressão Fullstack Platform',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      node: {
        version: process.version,
        uptime_seconds: Math.round(process.uptime()),
        memory_usage_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
      },
      python: {
        available: pythonCheck.available,
        version: pythonCheck.version,
        engine_path: ENGINE_SCRIPT,
        engine_ready: fs.existsSync(ENGINE_SCRIPT)
      },
      total_products: getProductsData().length
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. GET /api/products -> Retorna a lista completa dos produtos IMR
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  const allProducts = getProductsData();
  let filtered = [...allProducts];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category || p.secondaryCategory === category);
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.subtitle.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    total: allProducts.length,
    products: filtered
  });
});

// 3. GET /api/products/:id -> Detalhes de um produto específico
app.get('/api/products/:id', (req, res) => {
  const product = getProductsData().find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
  }
  res.json({ success: true, product });
});

// 4. POST /api/calculate-quote -> Comunica com o motor Python para precificação e descontos
app.post('/api/calculate-quote', async (req, res) => {
  try {
    const {
      weight_g,
      print_time_minutes,
      material = 'PLA',
      colors = 1,
      quantity = 1,
      price_kg = 110.00
    } = req.body;

    if (!weight_g || !print_time_minutes) {
      return res.status(400).json({
        success: false,
        message: 'Parâmetros obrigatórios: weight_g (peso em gramas) e print_time_minutes (tempo em minutos).'
      });
    }

    const args = [
      'calculate-quote',
      '--weight-g', String(weight_g),
      '--print-time-min', String(print_time_minutes),
      '--material', String(material),
      '--colors', String(colors),
      '--quantity', String(quantity),
      '--price-kg', String(price_kg)
    ];

    const result = await runPythonEngine(args);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('Erro ao calcular cotação:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. POST /api/analyze-stl -> Upload de arquivo STL do cliente e acionamento do Python 3D Engine
app.post('/api/analyze-stl', upload.single('stl_file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Nenhum arquivo STL foi enviado no campo "stl_file".'
    });
  }

  const uploadedFilePath = req.file.path;

  try {
    const infill = req.body.infill ? parseInt(req.body.infill) : 15;
    const colors = req.body.colors ? parseInt(req.body.colors) : 1;
    const material = req.body.material || 'PLA';
    const priceKg = req.body.price_kg ? parseFloat(req.body.price_kg) : 110.00;

    const args = [
      'analyze-stl',
      uploadedFilePath,
      '--infill', String(infill),
      '--colors', String(colors),
      '--material', String(material),
      '--price-kg', String(priceKg)
    ];

    const analysis = await runPythonEngine(args);

    // URL relativa para que o Three.js no frontend possa carregar o STL diretamente na tela
    const fileUrl = `/uploads/${path.basename(uploadedFilePath)}`;

    res.json({
      success: true,
      file_url: fileUrl,
      original_filename: req.file.originalname,
      ...analysis
    });
  } catch (err) {
    console.error('Erro na análise do STL:', err);
    res.status(500).json({
      success: false,
      error: err.message,
      tip: 'Verifique se o arquivo STL é uma malha 3D sólida válida (Watertight manifold).'
    });
  }
});

// Servir os uploads temporários para visualização Three.js no navegador
app.use('/uploads', express.static(UPLOADS_DIR));

// Fallback SPA para rota raiz
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log('================================================================');
  console.log('  IMR IMPRESSÃO 3D - SERVIDOR HÍBRIDO (NODE.JS + PYTHON)');
  console.log('================================================================');
  console.log(`  🚀 Servidor Node.js rodando em: http://localhost:${PORT}`);
  console.log(`  ⚙️  Motor 3D Python: ${ENGINE_SCRIPT}`);
  console.log(`  📂 Diretório de Uploads: ${UPLOADS_DIR}`);
  console.log(`  🌐 Catálogo & Simulador Web Ativos`);
  console.log('================================================================');
});
