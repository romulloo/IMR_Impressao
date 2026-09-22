/**
 * =============================================================================
 * IMR IMPRESSÃO - MOTOR DE ORÇAMENTO INSTANTÂNEO & INTEGRAÇÃO PYTHON
 * Comunica com /api/analyze-stl e /api/calculate-quote
 * =============================================================================
 */

const QuoteSimulator = (function () {
  // Estado do Simulador
  const state = {
    mode: "stl", // "stl" ou "product"
    currentFile: null,
    currentFileName: "ABELHA_FUNKO_MASCOTE.stl",
    currentAnalysis: null,
    selectedProductId: "mascote-abelha-hollywood",
    material: "PLA",
    infill: 15,
    colors: 1,
    quantity: 1,
    filamentPriceKg: 110.00,
    isCalculating: false
  };

  // Referências DOM
  let dom = {};

  function init() {
    cacheDOM();
    bindEvents();
    // Inicializa com um modelo de exemplo pré-carregado
    loadDefaultSample("assets/sample_models/ABELHA_FUNKO_MASCOTE.stl", "ABELHA_FUNKO_MASCOTE.stl");
  }

  function cacheDOM() {
    dom = {
      // Abas
      tabStl: document.getElementById("tab-mode-stl"),
      tabProduct: document.getElementById("tab-mode-product"),
      panelStl: document.getElementById("panel-mode-stl"),
      panelProduct: document.getElementById("panel-mode-product"),

      // Upload STL
      stlFileInput: document.getElementById("stl-file-input"),
      dropzone: document.getElementById("stl-dropzone"),
      uploadProgress: document.getElementById("stl-upload-progress"),
      uploadProgressBar: document.getElementById("stl-progress-bar"),
      uploadStatusText: document.getElementById("stl-status-text"),
      sampleButtons: document.querySelectorAll("[data-sample-stl]"),

      // Seleção de Produto
      productSelect: document.getElementById("calc-product-select"),

      // Parâmetros
      materialSelect: document.getElementById("calc-material-select"),
      infillSlider: document.getElementById("calc-infill-slider"),
      infillValueText: document.getElementById("calc-infill-val"),
      colorsContainer: document.getElementById("calc-colors-options"),
      quantityInput: document.getElementById("calc-quantity-input"),
      quantitySlider: document.getElementById("calc-quantity-slider"),
      btnQtyMinus: document.getElementById("btn-calc-qty-minus"),
      btnQtyPlus: document.getElementById("btn-calc-qty-plus"),

      // Resultados
      resultCard: document.getElementById("calc-results-card"),
      resFileName: document.getElementById("res-item-title"),
      resDimensions: document.getElementById("res-dimensions"),
      resTriangles: document.getElementById("res-triangles"),
      resRawVolume: document.getElementById("res-raw-volume"),
      resWeight: document.getElementById("res-weight"),
      resPrintTime: document.getElementById("res-print-time"),
      resUnitPrice: document.getElementById("res-unit-price"),
      resDiscountBadge: document.getElementById("res-discount-badge"),
      resTotalPrice: document.getElementById("res-total-price"),
      resSavingsNotice: document.getElementById("res-savings-notice"),
      resCostBreakdown: document.getElementById("res-cost-breakdown"),
      tiersTableBody: document.getElementById("calc-tiers-tbody"),

      // Ações
      btnWhatsapp: document.getElementById("btn-calc-whatsapp"),
      btnAddToCart: document.getElementById("btn-calc-add-cart"),
      btnView3D: document.getElementById("btn-calc-view-3d")
    };
  }

  function bindEvents() {
    // Alternância de Abas
    if (dom.tabStl && dom.tabProduct) {
      dom.tabStl.addEventListener("click", () => switchMode("stl"));
      dom.tabProduct.addEventListener("click", () => switchMode("product"));
    }

    // Input File STL
    if (dom.stlFileInput) {
      dom.stlFileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          handleSTLUpload(e.target.files[0]);
        }
      });
    }

    // Drag & Drop no Dropzone
    if (dom.dropzone) {
      dom.dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dom.dropzone.classList.add("dragover");
      });
      dom.dropzone.addEventListener("dragleave", () => {
        dom.dropzone.classList.remove("dragover");
      });
      dom.dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dom.dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleSTLUpload(e.dataTransfer.files[0]);
        }
      });
    }

    // Botões de Modelos de Exemplo
    if (dom.sampleButtons) {
      dom.sampleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const samplePath = btn.getAttribute("data-sample-stl");
          const sampleName = btn.getAttribute("data-sample-name") || "modelo_exemplo.stl";
          loadDefaultSample(samplePath, sampleName);
        });
      });
    }

    // Seleção de Produto
    if (dom.productSelect) {
      dom.productSelect.addEventListener("change", (e) => {
        state.selectedProductId = e.target.value;
        recalculate();
      });
    }

    // Material
    if (dom.materialSelect) {
      dom.materialSelect.addEventListener("change", (e) => {
        state.material = e.target.value;
        recalculate();
      });
    }

    // Preenchimento (Infill)
    if (dom.infillSlider) {
      dom.infillSlider.addEventListener("input", (e) => {
        state.infill = parseInt(e.target.value);
        if (dom.infillValueText) {
          dom.infillValueText.textContent = `${state.infill}%`;
        }
      });
      dom.infillSlider.addEventListener("change", () => {
        if (state.mode === "stl" && state.currentFile) {
          // Re-analisa com o novo preenchimento
          handleSTLUpload(state.currentFile);
        } else {
          recalculate();
        }
      });
    }

    // Cores AMS
    if (dom.colorsContainer) {
      dom.colorsContainer.querySelectorAll("[data-colors]").forEach(btn => {
        btn.addEventListener("click", () => {
          dom.colorsContainer.querySelectorAll("[data-colors]").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          state.colors = parseInt(btn.getAttribute("data-colors"));
          if (state.mode === "stl" && state.currentFile) {
            handleSTLUpload(state.currentFile);
          } else {
            recalculate();
          }
        });
      });
    }

    // Quantidade
    if (dom.quantityInput) {
      dom.quantityInput.addEventListener("change", (e) => {
        const val = Math.max(1, parseInt(e.target.value) || 1);
        state.quantity = val;
        if (dom.quantitySlider) dom.quantitySlider.value = Math.min(100, val);
        recalculate();
      });
    }

    if (dom.quantitySlider) {
      dom.quantitySlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        state.quantity = val;
        if (dom.quantityInput) dom.quantityInput.value = val;
        recalculate();
      });
    }

    if (dom.btnQtyMinus) {
      dom.btnQtyMinus.addEventListener("click", () => {
        if (state.quantity > 1) {
          state.quantity--;
          if (dom.quantityInput) dom.quantityInput.value = state.quantity;
          if (dom.quantitySlider) dom.quantitySlider.value = Math.min(100, state.quantity);
          recalculate();
        }
      });
    }

    if (dom.btnQtyPlus) {
      dom.btnQtyPlus.addEventListener("click", () => {
        state.quantity++;
        if (dom.quantityInput) dom.quantityInput.value = state.quantity;
        if (dom.quantitySlider) dom.quantitySlider.value = Math.min(100, state.quantity);
        recalculate();
      });
    }

    // WhatsApp Action
    if (dom.btnWhatsapp) {
      dom.btnWhatsapp.addEventListener("click", () => sendQuoteToWhatsApp());
    }

    // Adicionar ao Carrinho
    if (dom.btnAddToCart) {
      dom.btnAddToCart.addEventListener("click", () => addQuoteToCart());
    }

    // Visualizar 3D
    if (dom.btnView3D) {
      dom.btnView3D.addEventListener("click", () => {
        const viewerSection = document.getElementById("visualizador-3d");
        if (viewerSection) {
          viewerSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }

  function switchMode(newMode) {
    state.mode = newMode;
    if (newMode === "stl") {
      dom.tabStl.classList.add("active");
      dom.tabProduct.classList.remove("active");
      dom.panelStl.style.display = "block";
      dom.panelProduct.style.display = "none";
      if (state.currentAnalysis) {
        renderResults(state.currentAnalysis);
      }
    } else {
      dom.tabProduct.classList.add("active");
      dom.tabStl.classList.remove("active");
      dom.panelProduct.style.display = "block";
      dom.panelStl.style.display = "none";
      recalculate();
    }
  }

  /**
   * Upload e Análise de Arquivo STL no Servidor Node + Python
   */
  async function handleSTLUpload(file) {
    if (!file) return;

    state.currentFile = file;
    state.currentFileName = file.name;
    setLoading(true, `Enviando "${file.name}" para o Motor de Cálculo Python...`);

    // Carrega prévia imediata no visualizador 3D local
    if (window.IMR_Viewer3D && typeof window.IMR_Viewer3D.loadSTLFile === "function") {
      window.IMR_Viewer3D.loadSTLFile(file);
    }

    const formData = new FormData();
    formData.append("stl_file", file);
    formData.append("infill", state.infill);
    formData.append("colors", state.colors);
    formData.append("material", state.material);
    formData.append("price_kg", state.filamentPriceKg);

    try {
      setLoading(true, "Python Engine analisando triângulos, volume e preenchimento...");
      const response = await fetch("/api/analyze-stl", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Erro HTTP ${response.status}`);
      }

      const result = await response.json();
      state.currentAnalysis = result;

      // Se a resposta trouxe a URL do STL no servidor, garante carregamento no Three.js
      if (result.file_url && window.IMR_Viewer3D && typeof window.IMR_Viewer3D.loadSTLUrl === "function") {
        window.IMR_Viewer3D.loadSTLUrl(result.file_url, file.name);
      }

      renderResults(result);
      setLoading(false);
      showNotification(`STL "${file.name}" analisado com sucesso!`, "success");
    } catch (err) {
      console.error("Erro na análise STL:", err);
      setLoading(false);
      showNotification(`Falha ao analisar STL: ${err.message}`, "error");
    }
  }

  /**
   * Carrega modelo de exemplo pré-existente
   */
  async function loadDefaultSample(samplePath, sampleName) {
    state.currentFileName = sampleName;
    setLoading(true, `Carregando modelo 3D "${sampleName}"...`);

    // Carrega no Three.js
    if (window.IMR_Viewer3D && typeof window.IMR_Viewer3D.loadSTLUrl === "function") {
      window.IMR_Viewer3D.loadSTLUrl(samplePath, sampleName);
    }

    try {
      // Busca o arquivo como Blob e envia para a API Python
      const res = await fetch(samplePath);
      if (!res.ok) throw new Error("Arquivo de exemplo não pôde ser baixado.");
      const blob = await res.blob();
      const file = new File([blob], sampleName, { type: "application/octet-stream" });
      handleSTLUpload(file);
    } catch (err) {
      console.warn("Não foi possível enviar exemplo para a API, usando fallback de cálculo:", err);
      setLoading(false);
      // Fallback para exibir cálculo estático da Abelha
      recalculate();
    }
  }

  /**
   * Recalcula cotação com a API Python /api/calculate-quote
   */
  async function recalculate() {
    let weight_g = 120;
    let print_time_minutes = 150;
    let itemName = "Peça Customizada";

    if (state.mode === "stl" && state.currentAnalysis) {
      itemName = state.currentFileName;
      weight_g = state.currentAnalysis.weights_g[state.material] || state.currentAnalysis.filament_weight_g;
      print_time_minutes = state.currentAnalysis.estimated_print_time_minutes;
    } else if (state.mode === "product") {
      const prod = PRODUCTS_DATA.find(p => p.id === state.selectedProductId);
      if (prod) {
        itemName = prod.name;
        weight_g = prod.weight_g || 100;
        print_time_minutes = prod.print_time_minutes || 120;
      }
    }

    try {
      const response = await fetch("/api/calculate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight_g,
          print_time_minutes,
          material: state.material,
          colors: state.colors,
          quantity: state.quantity,
          price_kg: state.filamentPriceKg
        })
      });

      if (!response.ok) throw new Error("Erro ao calcular cotação.");
      const quoteData = await response.json();

      // Monta estrutura combinada para renderização
      const displayData = {
        success: true,
        filename: itemName,
        dimensions_mm: state.currentAnalysis ? state.currentAnalysis.dimensions_mm : { x: 120, y: 80, z: 95 },
        triangles: state.currentAnalysis ? state.currentAnalysis.triangles : 8500,
        raw_volume_cm3: state.currentAnalysis ? state.currentAnalysis.raw_volume_cm3 : (weight_g / 1.24).toFixed(1),
        filament_weight_g: weight_g,
        estimated_print_time_formatted: formatTime(print_time_minutes),
        quote: quoteData
      };

      renderResults(displayData);
    } catch (err) {
      console.error("Erro no recálculo da cotação:", err);
    }
  }

  /**
   * Renderiza os resultados calculados pelo Python na UI
   */
  function renderResults(data) {
    if (!data) return;

    const q = data.quote || {};
    const pricing = q.pricing || {};
    const costs = q.costs_breakdown || {};

    if (dom.resFileName) dom.resFileName.textContent = data.filename || "Peça 3D Analisada";

    if (dom.resDimensions && data.dimensions_mm) {
      const { x, y, z } = data.dimensions_mm;
      dom.resDimensions.textContent = `${x} × ${y} × ${z} mm`;
    }

    if (dom.resTriangles) {
      dom.resTriangles.textContent = data.triangles ? data.triangles.toLocaleString("pt-BR") : "N/A";
    }

    if (dom.resRawVolume) {
      dom.resRawVolume.textContent = `${data.raw_volume_cm3 || 0} cm³`;
    }

    if (dom.resWeight) {
      dom.resWeight.textContent = `${data.filament_weight_g || 0} g (${state.material})`;
    }

    if (dom.resPrintTime) {
      dom.resPrintTime.textContent = data.estimated_print_time_formatted || "0h 45min";
    }

    // Preços
    const unitPrice = pricing.active_unit_price_brl || 0;
    const basePrice = pricing.base_unit_price_brl || 0;
    const discountPercent = pricing.discount_percent || 0;
    const totalOrder = pricing.total_order_brl || 0;
    const savings = pricing.total_savings_brl || 0;

    if (dom.resUnitPrice) {
      dom.resUnitPrice.textContent = formatBRL(unitPrice);
    }

    if (dom.resDiscountBadge) {
      if (discountPercent > 0) {
        dom.resDiscountBadge.textContent = `${discountPercent}% OFF Atacado`;
        dom.resDiscountBadge.style.display = "inline-flex";
      } else {
        dom.resDiscountBadge.style.display = "none";
      }
    }

    if (dom.resTotalPrice) {
      dom.resTotalPrice.textContent = formatBRL(totalOrder);
    }

    if (dom.resSavingsNotice) {
      if (savings > 0) {
        dom.resSavingsNotice.textContent = `🎉 Você economiza ${formatBRL(savings)} com o desconto para ${state.quantity} un!`;
        dom.resSavingsNotice.style.display = "block";
      } else {
        dom.resSavingsNotice.style.display = "none";
      }
    }

    // Detalhamento de Custos Fabris IMR
    if (dom.resCostBreakdown && costs.total_direct_cost_unit_brl) {
      dom.resCostBreakdown.innerHTML = `
        <div class="cost-item">
          <span>Filamento (${state.material}):</span>
          <strong>${formatBRL(costs.material_cost_unit_brl || 0)}</strong>
        </div>
        <div class="cost-item">
          <span>Energia Copel (150W):</span>
          <strong>${formatBRL(costs.energy_cost_unit_brl || 0)}</strong>
        </div>
        <div class="cost-item">
          <span>Desgaste de Máquina:</span>
          <strong>${formatBRL(costs.wear_cost_unit_brl || 0)}</strong>
        </div>
        <div class="cost-item">
          <span>Setup / Calibração:</span>
          <strong>${formatBRL(costs.setup_cost_unit_brl || 0)}</strong>
        </div>
      `;
    }

    // Tabela de Faixas de Desconto
    if (dom.tiersTableBody && pricing.scale_tiers) {
      dom.tiersTableBody.innerHTML = pricing.scale_tiers.map(tier => {
        const isActive = state.quantity >= tier.min && state.quantity <= tier.max;
        return `
          <tr class="${isActive ? 'tier-active' : ''}">
            <td><strong>${tier.tier}</strong></td>
            <td>${tier.discount_percent > 0 ? `<span class="tier-tag">${tier.discount_percent}% OFF</span>` : 'Preço Base'}</td>
            <td><strong>${formatBRL(tier.unit_price_brl)}</strong></td>
            <td>${formatBRL(tier.unit_price_brl * tier.min)} a ${formatBRL(tier.unit_price_brl * Math.min(tier.max, 500))}</td>
          </tr>
        `;
      }).join("");
    }
  }

  function setLoading(isLoading, statusText = "") {
    state.isCalculating = isLoading;
    if (dom.uploadProgress) {
      dom.uploadProgress.style.display = isLoading ? "block" : "none";
    }
    if (dom.uploadStatusText && statusText) {
      dom.uploadStatusText.textContent = statusText;
    }
    if (dom.btnWhatsapp) {
      dom.btnWhatsapp.disabled = isLoading;
    }
  }

  /**
   * Formatação da Mensagem B2B para o WhatsApp
   */
  function sendQuoteToWhatsApp() {
    const analysis = state.currentAnalysis || {};
    const dims = analysis.dimensions_mm ? `${analysis.dimensions_mm.x} × ${analysis.dimensions_mm.y} × ${analysis.dimensions_mm.z} mm` : "Sob Consulta";
    const weight = analysis.filament_weight_g || (state.mode === "product" ? "Conforme especificação" : "Calculado");
    const printTime = analysis.estimated_print_time_formatted || "Otimizado Bambu Lab";
    const unitPrice = dom.resUnitPrice ? dom.resUnitPrice.textContent : "R$ 0,00";
    const totalPrice = dom.resTotalPrice ? dom.resTotalPrice.textContent : "R$ 0,00";
    const itemName = state.mode === "stl" ? state.currentFileName : (PRODUCTS_DATA.find(p => p.id === state.selectedProductId)?.name || "Produto IMR");

    const messageLines = [
      `*🚀 SOLICITAÇÃO DE ORÇAMENTO IMR IMPRESSÃO 3D*`,
      `--------------------------------------------------`,
      `📦 *Projeto / Peça:* ${itemName}`,
      `📐 *Dimensões:* ${dims}`,
      `🧱 *Material:* ${state.material} de Engenharia`,
      `🎨 *Cores Bambu AMS:* ${state.colors} cor(es)`,
      `⚙️ *Preenchimento (Infill):* ${state.infill}%`,
      `⚖️ *Peso Estimado:* ${weight} g`,
      `⏱️ *Tempo de Impressão:* ${printTime}`,
      `🔢 *Quantidade:* ${state.quantity} unidade(s)`,
      `💰 *Valor Unitário:* ${unitPrice}`,
      `💵 *VALOR TOTAL DO PEDIDO:* ${totalPrice}`,
      `--------------------------------------------------`,
      `📍 *Empresa / Cliente:* Olá, gostaria de validar a viabilidade de produção e prazo de entrega para este projeto!`
    ];

    const fullMessage = encodeURIComponent(messageLines.join("\n"));
    const waUrl = `https://wa.me/5541999273954?text=${fullMessage}`;
    window.open(waUrl, "_blank");
  }

  /**
   * Adiciona o orçamento calculado ao Carrinho B2B
   */
  function addQuoteToCart() {
    const itemName = state.mode === "stl" ? `STL: ${state.currentFileName}` : (PRODUCTS_DATA.find(p => p.id === state.selectedProductId)?.name || "Produto IMR");
    const unitPrice = parseFloat((dom.resUnitPrice?.textContent || "0").replace(/[^0-9,-]+/g, "").replace(",", "."));

    const cartItem = {
      id: `custom-quote-${Date.now()}`,
      name: itemName,
      material: `${state.material} (${state.colors} cores, ${state.infill}% infill)`,
      color: `${state.colors} cores`,
      quantity: state.quantity,
      unitPrice: unitPrice,
      totalPrice: unitPrice * state.quantity,
      image: "assets/images/imr_logo_light.png"
    };

    if (typeof window.addItemToQuoteCart === "function") {
      window.addItemToQuoteCart(cartItem);
    } else {
      showNotification(`Item "${itemName}" adicionado ao orçamento!`, "success");
    }
  }

  function formatBRL(v) {
    return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatTime(totalMins) {
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return h > 0 ? `${h}h ${m.toString().padStart(2, "0")}min` : `${m} min`;
  }

  function showNotification(msg, type = "info") {
    if (typeof window.showToast === "function") {
      window.showToast(msg, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${msg}`);
    }
  }

  return {
    init,
    handleSTLUpload,
    loadDefaultSample,
    recalculate,
    sendQuoteToWhatsApp
  };
})();

// Inicializa no carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  QuoteSimulator.init();
});
