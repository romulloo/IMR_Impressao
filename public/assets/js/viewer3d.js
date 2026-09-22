/**
 * =============================================================================
 * IMR IMPRESSÃO - VISUALIZADOR 3D INTERATIVO (THREE.JS WebGL + STL LOADER)
 * Suporte a malhas STL reais do cliente e modelos de catálogo
 * =============================================================================
 */

(function () {
  let scene, camera, renderer, controls;
  let currentModelGroup = null;
  let particlesMesh, pedestalMesh, neonRing, gridHelper;
  let isWireframe = false;
  let autoRotate = true;
  let currentMaterialPreset = "cyan";
  let clock = new THREE.Clock();

  const container = document.getElementById("canvas-3d-container");
  if (!container) return;

  // Presets de Materiais e Acabamentos Bambu Lab
  const MATERIAL_CONFIGS = {
    cyan: {
      primaryColor: 0x00c2ff,
      secondaryColor: 0x0e1726,
      accentColor: 0x00e5ff,
      roughness: 0.25,
      metalness: 0.65,
      emissive: 0x003855,
      emissiveIntensity: 0.3
    },
    emerald: {
      primaryColor: 0x00d26a,
      secondaryColor: 0x0f291e,
      accentColor: 0x00ff88,
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0x004d25,
      emissiveIntensity: 0.3
    },
    carbon: {
      primaryColor: 0x18181b,
      secondaryColor: 0x09090b,
      accentColor: 0x71717a,
      roughness: 0.45,
      metalness: 0.85,
      emissive: 0x09090b,
      emissiveIntensity: 0.1
    },
    gold: {
      primaryColor: 0xffc72c,
      secondaryColor: 0x3d2b00,
      accentColor: 0xffe082,
      roughness: 0.18,
      metalness: 0.9,
      emissive: 0x423000,
      emissiveIntensity: 0.35
    },
    white: {
      primaryColor: 0xf8fafc,
      secondaryColor: 0x1e293b,
      accentColor: 0xffffff,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0x1e293b,
      emissiveIntensity: 0.1
    }
  };

  function init() {
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f17, 0.035);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.8);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Limpa canvas anterior se houver
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Controls
    if (typeof THREE.OrbitControls !== "undefined") {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2 + 0.08;
      controls.minDistance = 1.8;
      controls.maxDistance = 10.0;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.6;
      controls.target.set(0, 0.6, 0);
    }

    // 5. Lights
    setupLights();

    // 6. Pedestal & Partículas
    setupPedestal();
    setupParticles();

    // 7. Carrega Modelo Inicial (ou STL padrão)
    loadModel("display");

    // 8. Event Listeners de UI e Drag & Drop
    setupUIControls();
    setupCanvasDragAndDrop();
    window.addEventListener("resize", onWindowResize);

    // 9. Animation Loop
    animate();
  }

  function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Ciano Rim Light
    const cyanLight = new THREE.PointLight(0x00c2ff, 3.2, 10);
    cyanLight.position.set(-4, 3, -3);
    scene.add(cyanLight);

    // Emerald Fill Light
    const emeraldLight = new THREE.PointLight(0x00d26a, 2.4, 10);
    emeraldLight.position.set(4, 2, -2);
    scene.add(emeraldLight);

    // Uplight de Base
    const upLight = new THREE.PointLight(0x00c2ff, 1.6, 4);
    upLight.position.set(0, 0.2, 0);
    scene.add(upLight);
  }

  function setupPedestal() {
    // Pedestal Base (Mesa de Impressão Bambu Lab A1)
    const pedestalGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.25, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x121624,
      metalness: 0.8,
      roughness: 0.3
    });
    pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -0.125;
    pedestalMesh.receiveShadow = true;
    scene.add(pedestalMesh);

    // Anel Neon Ciano IMR
    const ringGeo = new THREE.TorusGeometry(2.1, 0.035, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff });
    neonRing = new THREE.Mesh(ringGeo, ringMat);
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = 0.01;
    scene.add(neonRing);

    // Grid de Cama Quente 256x256mm
    gridHelper = new THREE.GridHelper(12, 24, 0x00c2ff, 0x1e293b);
    gridHelper.position.y = -0.26;
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
  }

  function setupParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00c2ff);
    const c2 = new THREE.Color(0x00d26a);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const mixed = c1.clone().lerp(c2, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
  }

  /**
   * CARREGADOR DE ARQUIVOS STL (THREE.STLLoader)
   */
  function loadSTLGeometry(geometry, modelTitle = "Modelo STL") {
    if (currentModelGroup) {
      scene.remove(currentModelGroup);
    }

    const cfg = MATERIAL_CONFIGS[currentMaterialPreset] || MATERIAL_CONFIGS.cyan;

    // Garante normais computadas
    geometry.computeVertexNormals();
    geometry.center();

    // Material PBR de alta definição
    const material = new THREE.MeshStandardMaterial({
      color: cfg.primaryColor,
      metalness: cfg.metalness,
      roughness: cfg.roughness,
      wireframe: isWireframe
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Calcula Bounding Box para posicionar perfeitamente sobre o pedestal
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const sizeX = box.max.x - box.min.x;
    const sizeY = box.max.y - box.min.y;
    const sizeZ = box.max.z - box.min.z;
    const maxDim = Math.max(sizeX, sizeY, sizeZ);

    // Escala proporcional para encaixar suavemente na câmera (altura visual ~2.2 unidades)
    const scaleFactor = 2.2 / (maxDim || 1);
    mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Ajusta base na altura Y = 0 sobre o pedestal
    mesh.position.y = (sizeY * scaleFactor) / 2.0;

    // Se a geometria veio deitada (eixo Z para cima ao invés de Y), gira para posição em pé
    if (sizeZ > sizeY && sizeZ > sizeX) {
      mesh.rotation.x = -Math.PI / 2;
    }

    currentModelGroup = new THREE.Group();
    currentModelGroup.add(mesh);
    currentModelGroup.userData = {
      modelType: "stl",
      title: modelTitle,
      triangles: geometry.attributes.position ? geometry.attributes.position.count / 3 : 0,
      meshRef: mesh
    };

    scene.add(currentModelGroup);

    // Atualiza overlay de estatísticas 3D
    updateModelStatsOverlay({
      title: modelTitle,
      triangles: Math.round(currentModelGroup.userData.triangles),
      dimensions: `${Math.round(sizeX)} × ${Math.round(sizeY)} × ${Math.round(sizeZ)} mm`
    });
  }

  function loadSTLUrl(url, filename = "Modelo 3D") {
    if (typeof THREE.STLLoader === "undefined") {
      console.warn("STLLoader não carregado, usando fallback.");
      return;
    }

    const loader = new THREE.STLLoader();
    loader.load(
      url,
      (geometry) => {
        loadSTLGeometry(geometry, filename);
      },
      (xhr) => {
        // Progresso de download
      },
      (error) => {
        console.error("Erro ao carregar STL via URL:", error);
      }
    );
  }

  function loadSTLFile(file) {
    if (typeof THREE.STLLoader === "undefined") return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const buffer = e.target.result;
      const loader = new THREE.STLLoader();
      try {
        const geometry = loader.parse(buffer);
        loadSTLGeometry(geometry, file.name);
      } catch (err) {
        console.error("Erro ao interpretar STL local:", err);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  /**
   * Drag & Drop Direto no Canvas 3D
   */
  function setupCanvasDragAndDrop() {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      container.classList.add("drag-hover");
    });
    container.addEventListener("dragleave", () => {
      container.classList.remove("drag-hover");
    });
    container.addEventListener("drop", (e) => {
      e.preventDefault();
      container.classList.remove("drag-hover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.name.toLowerCase().endsWith(".stl")) {
          loadSTLFile(file);
          // Aciona também o calculador Python se disponível
          if (window.QuoteSimulator && typeof window.QuoteSimulator.handleSTLUpload === "function") {
            window.QuoteSimulator.handleSTLUpload(file);
          }
        }
      }
    });
  }

  /**
   * Modelos Procedurais de Catálogo
   */
  function createDisplayStandModel(cfg) {
    const group = new THREE.Group();
    const baseMat = new THREE.MeshStandardMaterial({
      color: cfg.secondaryColor,
      metalness: cfg.metalness,
      roughness: cfg.roughness,
      wireframe: isWireframe
    });
    const faceMat = new THREE.MeshStandardMaterial({
      color: cfg.primaryColor,
      metalness: cfg.metalness * 0.8,
      roughness: cfg.roughness,
      wireframe: isWireframe
    });

    const footGeo = new THREE.BoxGeometry(1.9, 0.18, 1.2);
    const foot = new THREE.Mesh(footGeo, baseMat);
    foot.position.y = 0.09;
    foot.castShadow = true;
    foot.receiveShadow = true;
    group.add(foot);

    const boardGroup = new THREE.Group();
    boardGroup.position.set(0, 0.15, 0.1);
    boardGroup.rotation.x = -0.28;

    const boardGeo = new THREE.BoxGeometry(1.7, 1.9, 0.12);
    const board = new THREE.Mesh(boardGeo, baseMat);
    board.position.y = 0.95;
    board.castShadow = true;
    boardGroup.add(board);

    const frameGeo = new THREE.BoxGeometry(1.58, 1.76, 0.04);
    const frame = new THREE.Mesh(frameGeo, faceMat);
    frame.position.set(0, 0.95, 0.07);
    boardGroup.add(frame);

    group.add(boardGroup);
    group.userData = { modelType: "display", title: "Display Placa PIX de Balcão", triangles: 820, dimensions: "150 × 115 × 60 mm" };
    return group;
  }

  function createKeychainModel(cfg) {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({
      color: cfg.secondaryColor,
      metalness: cfg.metalness,
      roughness: cfg.roughness,
      wireframe: isWireframe
    });
    const lionMat = new THREE.MeshStandardMaterial({
      color: cfg.primaryColor,
      metalness: cfg.metalness,
      roughness: cfg.roughness * 0.7,
      wireframe: isWireframe
    });

    const baseGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.16, 6);
    const base = new THREE.Mesh(baseGeo, bodyMat);
    base.position.y = 0.8;
    base.rotation.y = Math.PI / 6;
    base.castShadow = true;
    group.add(base);

    const reliefGeo = new THREE.ConeGeometry(0.7, 0.35, 5);
    const relief = new THREE.Mesh(reliefGeo, lionMat);
    relief.position.set(0, 0.92, 0);
    relief.rotation.x = Math.PI;
    relief.castShadow = true;
    group.add(relief);

    const ringGeo = new THREE.TorusGeometry(0.35, 0.06, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.95, roughness: 0.1 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 1.95, 0);
    group.add(ring);

    group.userData = { modelType: "keychain", title: "Chaveiro TimeLion 3D", triangles: 1240, dimensions: "58 × 50 × 4.5 mm" };
    return group;
  }

  function createTrophyModel(cfg) {
    const group = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: cfg.primaryColor,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: isWireframe
    });
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.6,
      roughness: 0.4,
      wireframe: isWireframe
    });

    const pedestalGeo = new THREE.BoxGeometry(1.4, 0.45, 1.4);
    const pedestal = new THREE.Mesh(pedestalGeo, baseMat);
    pedestal.position.y = 0.225;
    pedestal.castShadow = true;
    group.add(pedestal);

    const cupGeo = new THREE.ConeGeometry(0.9, 1.6, 6);
    const cup = new THREE.Mesh(cupGeo, goldMat);
    cup.position.y = 1.35;
    cup.rotation.y = Math.PI / 6;
    cup.castShadow = true;
    group.add(cup);

    group.userData = { modelType: "trophy", title: "Troféu Corporativo Facetado", triangles: 2150, dimensions: "125 × 240 × 85 mm" };
    return group;
  }

  function loadModel(type) {
    if (currentModelGroup) {
      scene.remove(currentModelGroup);
    }

    const cfg = MATERIAL_CONFIGS[currentMaterialPreset] || MATERIAL_CONFIGS.cyan;

    if (type === "display") {
      currentModelGroup = createDisplayStandModel(cfg);
    } else if (type === "keychain") {
      currentModelGroup = createKeychainModel(cfg);
    } else if (type === "trophy") {
      currentModelGroup = createTrophyModel(cfg);
    } else if (type === "abelha") {
      // Carrega o STL real da Abelha Mascote
      loadSTLUrl("assets/sample_models/ABELHA_FUNKO_MASCOTE.stl", "Mascote 3D Abelha Hollywood");
      return;
    } else {
      currentModelGroup = createDisplayStandModel(cfg);
    }

    scene.add(currentModelGroup);
    updateModelStatsOverlay({
      title: currentModelGroup.userData.title || "Peça 3D IMR",
      triangles: currentModelGroup.userData.triangles || 0,
      dimensions: currentModelGroup.userData.dimensions || "N/A"
    });

    document.querySelectorAll("[data-model]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-model") === type);
    });
  }

  function updateMaterials() {
    if (!currentModelGroup) return;

    const cfg = MATERIAL_CONFIGS[currentMaterialPreset] || MATERIAL_CONFIGS.cyan;

    currentModelGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.wireframe = isWireframe;
        // Atualiza cor principal do modelo se for malha única
        if (currentModelGroup.userData.modelType === "stl") {
          child.material.color.setHex(cfg.primaryColor);
          child.material.metalness = cfg.metalness;
          child.material.roughness = cfg.roughness;
        }
      }
    });

    if (neonRing) {
      neonRing.material.color.setHex(cfg.primaryColor);
    }
  }

  function updateModelStatsOverlay(stats) {
    const titleEl = document.getElementById("viewer-model-title");
    const triEl = document.getElementById("viewer-model-triangles");
    const dimEl = document.getElementById("viewer-model-dimensions");

    if (titleEl && stats.title) titleEl.textContent = stats.title;
    if (triEl && stats.triangles) triEl.textContent = stats.triangles.toLocaleString("pt-BR");
    if (dimEl && stats.dimensions) dimEl.textContent = stats.dimensions;
  }

  function setupUIControls() {
    // Seletores de Modelos Prontos
    document.querySelectorAll("[data-model]").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-model");
        loadModel(type);
      });
    });

    // Seletor de Acabamento / Material
    document.querySelectorAll("[data-mat-preset]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentMaterialPreset = btn.getAttribute("data-mat-preset");
        document.querySelectorAll("[data-mat-preset]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateMaterials();
      });
    });

    // Auto-Rotate
    const rotateBtn = document.getElementById("btn-toggle-rotate");
    if (rotateBtn) {
      rotateBtn.addEventListener("click", () => {
        autoRotate = !autoRotate;
        if (controls) controls.autoRotate = autoRotate;
        rotateBtn.classList.toggle("active", autoRotate);
      });
    }

    // Wireframe
    const wireframeBtn = document.getElementById("btn-toggle-wireframe");
    if (wireframeBtn) {
      wireframeBtn.addEventListener("click", () => {
        isWireframe = !isWireframe;
        wireframeBtn.classList.toggle("active", isWireframe);
        updateMaterials();
      });
    }

    // Reset View
    const resetBtn = document.getElementById("btn-reset-view");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (controls) {
          controls.reset();
          camera.position.set(0, 3.2, 5.8);
          controls.target.set(0, 0.6, 0);
        }
      });
    }
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    if (controls) controls.update();

    if (neonRing) {
      const s = 1.0 + Math.sin(elapsedTime * 3.0) * 0.015;
      neonRing.scale.set(s, s, s);
    }

    if (particlesMesh) {
      particlesMesh.rotation.y = elapsedTime * 0.04;
    }

    renderer.render(scene, camera);
  }

  // API Pública do Visualizador 3D
  window.IMR_Viewer3D = {
    loadModel,
    loadSTLUrl,
    loadSTLFile,
    setMaterialPreset: (preset) => {
      currentMaterialPreset = preset;
      updateMaterials();
    }
  };

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
