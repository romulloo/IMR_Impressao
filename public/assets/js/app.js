/**
 * =============================================================================
 * IMR IMPRESSÃO 3D - CATÁLOGO WEB MINIMALISTA APPLE-STYLE LIGHT
 * Lógica Frontend: Busca Instantânea, Filtros de Categoria,
 * Cards com Preços Prontos, Enquadramento Perfeito e Conversão no WhatsApp
 * =============================================================================
 */

const IMR_WHATSAPP_NUMBER = "5541999273954";

const AppState = {
  activeCategory: "all",
  searchQuery: "",
  sortBy: "popular",
  selectedProduct: null
};

// Formatação Monetária BRL
function formatBRL(value) {
  if (typeof value !== "number") return value;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initCategoryFilters();
  renderProducts();
  setupSearchAndSort();
  setupModalEvents();
});

// Renderizar Pílulas de Categoria
function initCategoryFilters() {
  const container = document.getElementById("category-filters");
  if (!container || typeof CATEGORIES === "undefined") return;

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = cat.id === AppState.activeCategory;
    return `
      <button 
        type="button" 
        class="category-pill ${isActive ? 'active' : ''}" 
        data-category-id="${cat.id}"
      >
        <span>${cat.name}</span>
        <span class="pill-count">${cat.count}</span>
      </button>
    `;
  }).join("");

  container.querySelectorAll("[data-category-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      AppState.activeCategory = btn.getAttribute("data-category-id");
      container.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      renderProducts();
    });
  });
}

// Filtrar e Ordenar Produtos
function getFilteredProducts() {
  if (typeof PRODUCTS_DATA === "undefined") return [];
  let list = [...PRODUCTS_DATA];

  // Filtro por Categoria
  if (AppState.activeCategory !== "all") {
    list = list.filter(p => p.category === AppState.activeCategory);
  }

  // Filtro por Busca
  if (AppState.searchQuery.trim() !== "") {
    const q = AppState.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
      (p.badge && p.badge.toLowerCase().includes(q)) ||
      (p.materialDisplay && p.materialDisplay.toLowerCase().includes(q))
    );
  }

  // Ordenação
  if (AppState.sortBy === "price-asc") {
    list.sort((a, b) => a.basePrice - b.basePrice);
  } else if (AppState.sortBy === "price-desc") {
    list.sort((a, b) => b.basePrice - a.basePrice);
  } else if (AppState.sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

// Renderizar Grade de Produtos
function renderProducts() {
  const grid = document.getElementById("products-grid");
  const countLabel = document.getElementById("results-count");
  if (!grid) return;

  const products = getFilteredProducts();

  if (countLabel) {
    countLabel.textContent = `${products.length} ${products.length === 1 ? 'produto encontrado' : 'produtos disponíveis no catálogo'}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Nenhum produto encontrado</h3>
        <p>Não encontramos produtos com os termos pesquisados. Tente outra busca ou selecione "Todos os Produtos".</p>
        <button type="button" class="btn btn-outline" onclick="resetFilters()">Limpar Filtros</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(prod => {
    const waText = `Olá IMR Impressão! Gostaria de encomendar o produto ${prod.name} no valor de ${formatBRL(prod.basePrice)}`;
    const waUrl = `https://wa.me/${IMR_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    return `
      <article class="product-card" data-id="${prod.id}">
        <!-- Container de Imagem Compacto & Enquadramento Perfeito -->
        <div class="card-media-wrapper" onclick="openProductDetails('${prod.id}')">
          <img 
            src="${prod.mainImage}" 
            alt="${prod.name}" 
            class="card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/imr_logo_light.png';"
          />
          <div class="badge-stack">
            ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
            <span class="category-tag">${prod.categoryName || ''}</span>
          </div>
        </div>

        <div class="card-body">
          <div class="card-meta-top">
            <span>Prazo: ${prod.leadTime || '2 a 4 dias'}</span>
            <span>Bambu Lab A1</span>
          </div>

          <h3 class="card-title" onclick="openProductDetails('${prod.id}')">${prod.name}</h3>
          <p class="card-subtitle">${prod.subtitle}</p>

          <div class="card-material-badge">
            ${prod.materialDisplay || 'PLA / PETG Alta Definição'}
          </div>

          <!-- Preços Prontos no Card -->
          <div class="pricing-block-ready">
            <div class="price-unit-row">
              <span class="price-unit-label">Preço Unitário:</span>
              <div class="price-unit-val">${formatBRL(prod.basePrice)} <small>un</small></div>
            </div>

            <div class="price-wholesale-row">
              <span class="wholesale-tag-label">Lote / Atacado:</span>
              <span class="wholesale-tag-val">${prod.wholesaleLabel || 'Consulte lote'}</span>
            </div>
          </div>

          <!-- Ações: Pedir no WhatsApp + Detalhes -->
          <div class="card-actions-row">
            <a 
              href="${waUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-card-wa"
              title="Pedir no WhatsApp com mensagem pronta"
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.942.898 2.79.898h.001c3.182 0 5.768-2.587 5.769-5.767.001-3.181-2.586-5.768-5.77-5.768zm3.36 8.163c-.144.405-.837.774-1.17.822-.311.045-.698.059-2.072-.511-1.636-.68-2.678-2.339-2.76-2.447-.08-.109-.661-.88-.661-1.678 0-.798.419-1.19.568-1.353.149-.163.325-.204.433-.204.108 0 .217.001.312.006.1.005.234-.038.366.279.136.327.464 1.134.505 1.216.041.082.068.177.014.286-.055.109-.082.177-.163.272-.082.095-.172.213-.246.286-.081.082-.167.172-.072.336.095.163.421.696.904 1.127.621.554 1.144.726 1.308.808.163.082.259.068.354-.041.095-.109.407-.476.516-.639.108-.163.217-.136.366-.082.149.054.949.448 1.112.53.163.082.271.122.312.19.041.069.041.396-.103.801z"/>
              </svg>
              Pedir no WhatsApp
            </a>

            <button 
              type="button" 
              class="btn-card-details" 
              onclick="openProductDetails('${prod.id}')"
            >
              Detalhes
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Configurar Busca e Ordenação
function setupSearchAndSort() {
  const searchInput = document.getElementById("catalog-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById("catalog-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }
}

// Resetar Filtros
window.resetFilters = function() {
  AppState.activeCategory = "all";
  AppState.searchQuery = "";
  const searchInput = document.getElementById("catalog-search-input");
  if (searchInput) searchInput.value = "";
  initCategoryFilters();
  renderProducts();
};

// Abrir Modal de Detalhes Técnicos
window.openProductDetails = function(productId) {
  if (typeof PRODUCTS_DATA === "undefined") return;
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  AppState.selectedProduct = prod;

  const modal = document.getElementById("details-modal");
  if (!modal) return;

  // Preenchimento de dados
  document.getElementById("modal-img").src = prod.mainImage;
  document.getElementById("modal-img").onerror = function() { this.src = "assets/images/imr_logo_light.png"; };
  document.getElementById("modal-title").textContent = prod.name;
  document.getElementById("modal-subtitle").textContent = prod.subtitle;
  document.getElementById("modal-desc").textContent = prod.description;
  document.getElementById("modal-spec-dims").textContent = prod.dimensions || "Sob consulta";
  document.getElementById("modal-spec-lead").textContent = prod.leadTime || "2 a 4 dias úteis";
  document.getElementById("modal-spec-weight").textContent = prod.weight || "Conforme modelo";
  document.getElementById("modal-spec-mat").textContent = prod.materialDisplay || "PLA / PETG 4 Cores";

  // Preço e WhatsApp do Modal
  document.getElementById("modal-price-unit").textContent = formatBRL(prod.basePrice);
  document.getElementById("modal-price-wholesale").textContent = prod.wholesaleLabel || "Consulte lotes";

  const waMsg = `Olá IMR Impressão! Gostaria de encomendar o produto ${prod.name} no valor de ${formatBRL(prod.basePrice)}`;
  const modalWaBtn = document.getElementById("modal-whatsapp-cta");
  if (modalWaBtn) {
    modalWaBtn.href = `https://wa.me/${IMR_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;
  }

  // Tabela de Lotes
  const tiersBody = document.getElementById("modal-tiers-body");
  if (tiersBody && prod.discountTiers) {
    tiersBody.innerHTML = prod.discountTiers.map(t => `
      <tr>
        <td><strong>${t.label}</strong></td>
        <td>${t.discount}</td>
        <td><strong>${formatBRL(t.price)} un</strong></td>
      </tr>
    `).join("");
  }

  // Vantagens
  const benefitsUl = document.getElementById("modal-benefits-list");
  if (benefitsUl && prod.b2bBenefits) {
    benefitsUl.innerHTML = prod.b2bBenefits.map(b => `<li>${b}</li>`).join("");
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
};

// Fechar Modal
window.closeDetailsModal = function() {
  const modal = document.getElementById("details-modal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
};

function setupModalEvents() {
  const modal = document.getElementById("details-modal");
  const closeBtn = document.getElementById("details-close-btn");

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeDetailsModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDetailsModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetailsModal();
  });
}
