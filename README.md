# IMR Impressão 3D - Sistema Web Híbrido (Node.js + Python)

Plataforma Web Full Stack de Manufatura Digital desenvolvida para a **IMR Impressão** (Curitiba - PR), unindo servidor web de alta performance em **Node.js (Express)** e motor de cálculo tridimensional em **Python 3.12** com fatiamento e precificação no padrão **Bambu Lab A1 AMS**.

---

## 🏛️ Arquitetura do Sistema

```
                         ┌──────────────────────────────────────────────┐
                         │   Frontend Web (HTML5 / Tailwind / Three.js) │
                         │   - Visualizador 3D WebGL (OrbitControls)    │
                         │   - Simulador de Orçamento Instantâneo       │
                         │   - Catálogo 12 Produtos B2B & Carrinho      │
                         └──────────────────────┬───────────────────────┘
                                                │ REST API / Uploads
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │      Servidor Web Node.js (Express v4)       │
                         │      Porta: 3000 (server.js)                 │
                         │   - GET  /api/health                         │
                         │   - GET  /api/products                       │
                         │   - POST /api/calculate-quote                │
                         │   - POST /api/analyze-stl                    │
                         └──────────────────────┬───────────────────────┘
                                                │ child_process (spawn)
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │   Motor de Manufatura Python (engine_3d.py)  │
                         │   - Parser Binário & ASCII STL Nativo        │
                         │   - Cálculo de Volume (Tetraedros / Diverg.) │
                         │   - Bounding Box X/Y/Z & Área Superficial    │
                         │   - Densidades PLA / PETG / ABS / TPU        │
                         │   - Fator Purga Multicolor AMS Bambu Lab     │
                         │   - Algoritmo de Custos Copel & Desgaste     │
                         │   - Tabela de Escala B2B (Até 72% OFF)       │
                         └──────────────────────────────────────────────┘
```

---

## 🚀 Como Iniciar o Sistema

### Método 1: Atalho de 1 Clique (Recomendado)
Dê um duplo clique no arquivo **`INICIAR_SISTEMA_IMR.bat`** localizado:
- Na sua **Área de Trabalho** (`C:\Users\User\OneDrive\Área de Trabalho\INICIAR_SISTEMA_IMR.bat`), ou
- Dentro da pasta do projeto (`catalogo_imr_fullstack\INICIAR_SISTEMA_IMR.bat`).

O script verifica Node.js e Python, instala dependências se necessário, inicia o servidor e abre automaticamente o navegador em `http://localhost:3000`.

### Método 2: Via Terminal
```bash
cd "C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao\catalogo_imr_fullstack"
npm install
npm start
```
Acesse: **`http://localhost:3000`**

---

## 📡 Rotas da API REST

### 1. `GET /api/health`
Retorna a saúde do servidor Node.js e confirmação do ambiente Python:
```json
{
  "status": "online",
  "service": "IMR Impressão Fullstack Platform",
  "version": "2.0.0",
  "node": { "version": "v22.14.0", "uptime_seconds": 15 },
  "python": { "available": true, "version": "Python 3.12.8", "engine_ready": true },
  "total_products": 12
}
```

### 2. `GET /api/products`
Retorna o catálogo completo dos 12 produtos IMR com fotos, especificações, dimensões, pesos, materiais e tabelas de descontos de atacado:
- `?category=pdv|mascotes|chaveiros|letreiros|tech|utilidades`
- `?search=termo_de_busca`

### 3. `POST /api/calculate-quote`
Calcula o custo fabril, preço de venda e descontos de atacado a partir de parâmetros manuais:
```json
{
  "weight_g": 85.5,
  "print_time_minutes": 120,
  "material": "PETG",
  "colors": 2,
  "quantity": 50,
  "price_kg": 110.00
}
```

### 4. `POST /api/analyze-stl` (Upload Multipart)
Recebe o arquivo binário ou ASCII `.stl` do cliente e aciona o motor Python:
- Campo `stl_file`: Arquivo `.stl`
- Campos opcionais: `infill` (ex: 15), `colors` (1 a 4), `material` (PLA, PETG, ABS, TPU), `price_kg` (default: 110.00).

Retorno:
- `triangles`: Quantidade exata de faces triangulares
- `dimensions_mm`: Largura X, Profundidade Y, Altura Z
- `raw_volume_cm3`: Volume bruto
- `weights_g`: Peso em gramas para PLA, PETG, ABS, TPU
- `estimated_print_time_minutes`: Tempo estimado de impressão na Bambu Lab A1
- `costs_breakdown`: Custo direto de filamento, consumo de energia Copel, desgaste de máquina e setup
- `pricing`: Preço unitário no lote, preço base de varejo, valor total do pedido e economia gerada pelo atacado.

---

## 🖨️ Fórmulas & Modelo Físico da Bambu Lab A1

1. **Volume por Tetraedros Sinalizados:**
   $$\text{Volume} = \frac{1}{6} \left| \sum_{i=1}^{N} \mathbf{v}_1 \cdot (\mathbf{v}_2 \times \mathbf{v}_3) \right|$$

2. **Volume Efetivo com Preenchimento (Infill) & Paredes:**
   $$\text{Vol}_{\text{efetivo}} = \text{Área Superficial} \times \text{Espessura da Casca} + (\text{Vol}_{\text{bruto}} - \text{Vol}_{\text{casca}}) \times \text{Infill Ratio}$$

3. **Perdas de Purga Multicolor AMS Lite:**
   - 1 cor: 1.00x (sem purga)
   - 2 cores: 1.18x (+18% torre de purga)
   - 3 cores: 1.32x (+32%)
   - 4 cores: 1.45x (+45%)

4. **Consumo Elétrico Copel (Curitiba - PR):**
   - Bambu Lab A1: Potência média de 150 Watts (0,15 kW)
   - Tarifa média: R$ 0,95 / kWh
   - Custo elétrico: `horas_impressao * 0.15 * 0.95`

---

## 📦 Estrutura de Diretórios

```
catalogo_imr_fullstack/
├── INICIAR_SISTEMA_IMR.bat      <- Inicializador com 1 clique
├── server.js                    <- Servidor Express e rotas da API REST
├── engine_3d.py                 <- Motor de Manufatura Digital em Python
├── package.json                 <- Configuração e dependências (express, cors, multer)
├── uploads/                     <- Armazenamento temporário de arquivos STL enviados
└── public/
    ├── index.html               <- Interface Dark Mode responsiva
    └── assets/
        ├── css/styles.css       <- Estilização espacial (#0B0F17, Ciano, Esmeralda)
        ├── js/
        │   ├── three.min.js     <- Biblioteca WebGL 3D
        │   ├── OrbitControls.js <- Controles de câmera orbital 360°
        │   ├── STLLoader.js     <- Parser STL client-side para Three.js
        │   ├── products.js      <- Banco de dados dos 12 produtos IMR
        │   ├── viewer3d.js      <- Visualizador 3D com shaders e dropzone
        │   ├── quote_calculator.js <- Conexão com a API Python e WhatsApp
        │   └── app.js           <- Catálogo, filtros, modais e carrinho B2B
        ├── images/              <- 80+ fotos em alta definição dos produtos IMR
        └── sample_models/       <- STLs reais de demonstração (Abelha, TimeLion, etc.)
```

---

## 📞 Contato IMR Impressão
- **Responsável:** Romullo (IMR Impressão)
- **Website Oficial:** [imrimpressao.com](https://www.imrimpressao.com)
- **E-mail Institucional:** [contato@imrimpressao.com](mailto:contato@imrimpressao.com)
- **WhatsApp:** (41) 98769-8054
- **Instagram:** [@imr_impressao](https://instagram.com/imr_impressao)
- **Localização:** Curitiba - PR
