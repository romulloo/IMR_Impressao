/**
 * =============================================================================
 * IMR IMPRESSÃO 3D - CATÁLOGO E-COMMERCE ESTILO PUMA
 * Lógica Frontend: Navbar Puma, Busca Instantânea, Wishlist (Favoritos),
 * Sacola de Orçamento com Cálculo B2B, Modal Técnico e Conversão WhatsApp
 * =============================================================================
 */

const IMR_WHATSAPP_NUMBER = "5541987698054";

// Estado da Aplicação
const AppState = {
  activeCategory: "all",
  searchQuery: "",
  sortBy: "popular",
  showOnlyFavorites: false,
  selectedProduct: null
};

// Gerenciador de Favoritos (Wishlist)
const WishlistManager = {
  KEY: "imr_puma_wishlist",
  getIds() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || "[]");
    } catch {
      return [];
    }
  },
  has(id) {
    return this.getIds().includes(id);
  },
  toggle(id) {
    let ids = this.getIds();
    const index = ids.indexOf(id);
    let added = false;
    if (index >= 0) {
      ids.splice(index, 1);
    } else {
      ids.push(id);
      added = true;
    }
    localStorage.setItem(this.KEY, JSON.stringify(ids));
    this.updateBadges();
    return added;
  },
  updateBadges() {
    const count = this.getIds().length;
    const badge = document.getElementById("wishlist-badge");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    }
  }
};

// Gerenciador de Sacola de Orçamento (Cart)
const CartManager = {
  KEY: "imr_puma_cart",
  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || "[]");
    } catch {
      return [];
    }
  },
  addItem(productId, qty = 1) {
    let items = this.getItems();
    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      const prod = PRODUCTS_DATA.find(p => p.id === productId);
      if (!prod) return;
      items.push({ id: productId, qty: qty });
    }
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadges();
    this.renderDrawer();
    openCartDrawer();
  },
  updateQty(productId, delta) {
    let items = this.getItems();
    const item = items.find(i => i.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        items = items.filter(i => i.id !== productId);
      }
      localStorage.setItem(this.KEY, JSON.stringify(items));
      this.updateBadges();
      this.renderDrawer();
    }
  },
  removeItem(productId) {
    let items = this.getItems().filter(i => i.id !== productId);
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadges();
    this.renderDrawer();
  },
  clear() {
    localStorage.removeItem(this.KEY);
    this.updateBadges();
    this.renderDrawer();
  },
  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.qty, 0);
  },
  updateBadges() {
    const count = this.getCount();
    const badge = document.getElementById("cart-badge");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    }
  },
  renderDrawer() {
    const container = document.getElementById("cart-items-list");
    const footer = document.getElementById("cart-drawer-footer");
    const emptyState = document.getElementById("cart-empty-state");
    const countTitle = document.getElementById("cart-total-count");
    if (!container) return;

    const items = this.getItems();
    const totalCount = this.getCount();
    if (countTitle) countTitle.textContent = `(${totalCount})`;

    if (items.length === 0) {
      container.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      if (footer) footer.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (footer) footer.style.display = "block";

    let subtotalStandard = 0;
    let subtotalActual = 0;

    container.innerHTML = items.map(item => {
      const prod = PRODUCTS_DATA.find(p => p.id === item.id);
      if (!prod) return "";

      // Verificar melhor faixa de atacado conforme a quantidade
      let unitPrice = prod.basePrice;
      if (prod.discountTiers && prod.discountTiers.length > 0) {
        const sortedTiers = [...prod.discountTiers].sort((a, b) => b.min - a.min);
        const matchedTier = sortedTiers.find(t => item.qty >= t.min);
        if (matchedTier) unitPrice = matchedTier.price;
      }

      const itemTotal = unitPrice * item.qty;
      subtotalStandard += prod.basePrice * item.qty;
      subtotalActual += itemTotal;

      return `
        <div class="cart-item-row" data-id="${prod.id}">
          <div class="cart-item-img-box">
            <img src="${prod.mainImage}" alt="${prod.name}" onerror="this.src='assets/images/IMR_LOGO_TRANSPARENTE.png';" />
          </div>
          <div class="cart-item-details">
            <div class="cart-item-category">${prod.pumaCategoryLabel || prod.categoryName}</div>
            <h4 class="cart-item-title">${prod.name}</h4>
            <div class="cart-item-pricing">
              <span class="cart-item-unit-price">${formatBRL(unitPrice)} un</span>
              ${unitPrice < prod.basePrice ? `<span class="cart-item-tag-wholesale">Desconto Lote</span>` : ""}
            </div>
            <div class="cart-item-actions">
              <div class="cart-qty-stepper">
                <button type="button" class="stepper-btn" onclick="CartManager.updateQty('${prod.id}', -1)" aria-label="Diminuir">-</button>
                <span class="stepper-val">${item.qty}</span>
                <button type="button" class="stepper-btn" onclick="CartManager.updateQty('${prod.id}', 1)" aria-label="Aumentar">+</button>
              </div>
              <button type="button" class="cart-remove-btn" onclick="CartManager.removeItem('${prod.id}')" title="Remover item">
                Remover
              </button>
            </div>
          </div>
          <div class="cart-item-total">
            ${formatBRL(itemTotal)}
          </div>
        </div>
      `;
    }).join("");

    const savings = subtotalStandard - subtotalActual;
    const subtotalEl = document.getElementById("cart-subtotal-val");
    const savingsEl = document.getElementById("cart-savings-val");
    const savingsRow = document.getElementById("cart-savings-row");

    if (subtotalEl) subtotalEl.textContent = formatBRL(subtotalActual);
    if (savingsEl && savingsRow) {
      if (savings > 0) {
        savingsRow.style.display = "flex";
        savingsEl.textContent = `- ${formatBRL(savings)}`;
      } else {
        savingsRow.style.display = "none";
      }
    }

    // Configurar Botão de Checkout WhatsApp
    const checkoutBtn = document.getElementById("cart-whatsapp-checkout");
    if (checkoutBtn) {
      let waText = `Olá IMR Impressão! Gostaria de formalizar um orçamento oficial dos seguintes itens:\n\n`;
      items.forEach((item, idx) => {
        const prod = PRODUCTS_DATA.find(p => p.id === item.id);
        if (!prod) return;
        let unitPrice = prod.basePrice;
        if (prod.discountTiers) {
          const matched = [...prod.discountTiers].sort((a, b) => b.min - a.min).find(t => item.qty >= t.min);
          if (matched) unitPrice = matched.price;
        }
        waText += `${idx + 1}. *${prod.name}*\n   Quantidade: ${item.qty} un • Valor: ${formatBRL(unitPrice * item.qty)} (${formatBRL(unitPrice)}/un)\n`;
      });
      waText += `\n*TOTAL ESTIMADO:* ${formatBRL(subtotalActual)}\n`;
      if (savings > 0) {
        waText += `*ECONOMIA B2B:* ${formatBRL(savings)} OFF\n`;
      }
      waText += `\nPoderiam verificar o prazo de produção e chave de faturamento?`;

      checkoutBtn.href = `https://wa.me/${IMR_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
    }
  }
};

// Formatação Monetária BRL
function formatBRL(value) {
  if (typeof value !== "number") return value;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Inicialização Geral da Aplicação
document.addEventListener("DOMContentLoaded", () => {
  initNavbarCategories();
  initCategoryPills();
  renderProducts();
  setupSearchAndSort();
  setupDrawers();
  setupModalEvents();
  setupFloatingBanner();
  WishlistManager.updateBadges();
  CartManager.updateBadges();
  CartManager.renderDrawer();
});

// Renderizar Categorias na Navbar Puma Superior
function initNavbarCategories() {
  const navContainer = document.getElementById("puma-nav-categories");
  const mobileContainer = document.getElementById("mobile-nav-categories");
  if (typeof PUMA_CATEGORIES === "undefined") return;

  // Render desktop links (ignora o "all" na navbar estilo Puma)
  const navItems = PUMA_CATEGORIES.filter(c => c.id !== "all");

  const html = navItems.map(cat => `
    <a 
      href="#catalogo" 
      class="puma-category-link ${cat.id === AppState.activeCategory ? 'active' : ''}" 
      data-category-id="${cat.id}"
    >
      ${cat.name}
    </a>
  `).join("");

  if (navContainer) {
    navContainer.innerHTML = html;
    navContainer.querySelectorAll(".puma-category-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const catId = link.getAttribute("data-category-id");
        selectCategory(catId);
        scrollToCatalog();
      });
    });
  }

  if (mobileContainer) {
    mobileContainer.innerHTML = PUMA_CATEGORIES.map(cat => `
      <a 
        href="#catalogo" 
        class="mobile-category-link ${cat.id === AppState.activeCategory ? 'active' : ''}" 
        data-category-id="${cat.id}"
      >
        <span>${cat.name}</span>
        <span class="mobile-category-count">${cat.count}</span>
      </a>
    `).join("");

    mobileContainer.querySelectorAll(".mobile-category-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const catId = link.getAttribute("data-category-id");
        selectCategory(catId);
        closeMobileMenu();
        scrollToCatalog();
      });
    });
  }
}

// Renderizar Pílulas de Categoria Abaixo do Hero
function initCategoryPills() {
  const container = document.getElementById("category-filters");
  if (!container || typeof PUMA_CATEGORIES === "undefined") return;

  container.innerHTML = PUMA_CATEGORIES.map(cat => {
    const isActive = cat.id === AppState.activeCategory && !AppState.showOnlyFavorites;
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
      const catId = btn.getAttribute("data-category-id");
      selectCategory(catId);
    });
  });
}

// Selecionar Categoria
function selectCategory(catId) {
  AppState.activeCategory = catId;
  AppState.showOnlyFavorites = false;

  // Atualizar classes ativas na Navbar Puma
  document.querySelectorAll(".puma-category-link").forEach(l => {
    if (l.getAttribute("data-category-id") === catId) {
      l.classList.add("active");
    } else {
      l.classList.remove("active");
    }
  });

  // Atualizar classes nas pílulas
  document.querySelectorAll(".category-pill").forEach(p => {
    if (p.getAttribute("data-category-id") === catId) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  // Atualizar mobile
  document.querySelectorAll(".mobile-category-link").forEach(m => {
    if (m.getAttribute("data-category-id") === catId) {
      m.classList.add("active");
    } else {
      m.classList.remove("active");
    }
  });

  renderProducts();
}

// Rolar suavemente até o catálogo
function scrollToCatalog() {
  const catalogEl = document.getElementById("catalogo");
  if (catalogEl) {
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 70;
    const topPos = catalogEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
    window.scrollTo({ top: topPos, behavior: "smooth" });
  }
}

// Filtrar e Ordenar Produtos
function getFilteredProducts() {
  if (typeof PRODUCTS_DATA === "undefined") return [];
  let list = [...PRODUCTS_DATA];

  // Filtro por Favoritos
  if (AppState.showOnlyFavorites) {
    const favIds = WishlistManager.getIds();
    list = list.filter(p => favIds.includes(p.id));
  }

  // Filtro por Categoria Puma
  if (AppState.activeCategory !== "all" && !AppState.showOnlyFavorites) {
    if (AppState.activeCategory === "colecionaveis") {
      list = list.filter(p => p.pumaCategory === "colecionaveis" || p.category === "action-figures" || p.category === "bonecos");
    } else if (AppState.activeCategory === "outlet-b2b") {
      list = list.filter(p => p.discountTiers && p.discountTiers.length > 1);
    } else {
      list = list.filter(p => p.pumaCategory === AppState.activeCategory || p.category === AppState.activeCategory);
    }
  }

  // Filtro por Busca Puma
  if (AppState.searchQuery.trim() !== "") {
    const q = AppState.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.pumaCategoryLabel && p.pumaCategoryLabel.toLowerCase().includes(q)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
      (p.badge && p.badge.toLowerCase().includes(q)) ||
      (p.materialDisplay && p.materialDisplay.toLowerCase().includes(q))
    );
  }

  // Ordenação Puma
  if (AppState.sortBy === "price-asc") {
    list.sort((a, b) => a.basePrice - b.basePrice);
  } else if (AppState.sortBy === "price-desc") {
    list.sort((a, b) => b.basePrice - a.basePrice);
  } else if (AppState.sortBy === "discount-desc") {
    list.sort((a, b) => {
      const getDisc = p => p.wholesalePrice ? (1 - p.wholesalePrice / p.basePrice) : 0;
      return getDisc(b) - getDisc(a);
    });
  } else if (AppState.sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

// Renderizar Grade de Produtos Puma E-Commerce
function renderProducts() {
  const grid = document.getElementById("products-grid");
  const countLabel = document.getElementById("results-count");
  if (!grid) return;

  const products = getFilteredProducts();

  if (countLabel) {
    if (AppState.showOnlyFavorites) {
      countLabel.innerHTML = `Exibindo <strong>${products.length}</strong> produtos salvos nos seus Favoritos`;
    } else {
      countLabel.innerHTML = `<strong>${products.length}</strong> ${products.length === 1 ? 'modelo disponível' : 'modelos disponíveis no catálogo'}`;
    }
  }

  if (products.length === 0) {
    if (AppState.showOnlyFavorites) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>Sua lista de Favoritos está vazia</h3>
          <p>Clique no ícone de coração no canto superior direito de qualquer produto para salvá-lo aqui.</p>
          <button type="button" class="btn btn-primary" onclick="resetFilters()">Explorar Todo o Catálogo</button>
        </div>
      `;
    } else {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>Nenhum modelo encontrado</h3>
          <p>Não encontramos produtos com os termos pesquisados. Tente outra busca ou selecione outra categoria.</p>
          <button type="button" class="btn btn-primary" onclick="resetFilters()">Limpar Filtros</button>
        </div>
      `;
    }
    return;
  }

  grid.innerHTML = products.map(prod => {
    const isFav = WishlistManager.has(prod.id);
    const waText = `Olá IMR Impressão! Gostaria de encomendar o modelo ${prod.name} (${formatBRL(prod.basePrice)} unitário).`;
    const waUrl = `https://wa.me/${IMR_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    return `
      <article class="puma-product-card" data-id="${prod.id}">
        <!-- Container de Imagem Estilo Grife Clean -->
        <div class="puma-card-media">
          <!-- Ícone de Coração / Favoritos no Canto Superior Direito -->
          <button 
            type="button" 
            class="card-heart-btn ${isFav ? 'active' : ''}" 
            onclick="handleToggleFavorite('${prod.id}', this, event)" 
            title="${isFav ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}"
            aria-label="Favoritar"
          >
            <svg class="heart-svg" viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>

          <!-- Badges Estilo Puma -->
          <div class="puma-badge-stack">
            ${prod.badge ? `<span class="puma-product-badge">${prod.badge}</span>` : ''}
            ${prod.wholesaleDiscountPercent ? `<span class="puma-discount-pill">ATÉ ${prod.wholesaleDiscountPercent}</span>` : ''}
          </div>

          <!-- Imagem Centralizada com Enquadramento Perfeito (Sem Cortes) -->
          <div class="puma-img-wrapper" onclick="openProductDetails('${prod.id}')">
            <img 
              src="${prod.mainImage}" 
              alt="${prod.name}" 
              class="puma-card-img" 
              loading="lazy"
              onerror="this.onerror=null; this.src='assets/images/IMR_LOGO_TRANSPARENTE.png';"
            />
          </div>
        </div>

        <!-- Informações Estilo Puma E-Commerce -->
        <div class="puma-card-body">
          <div class="puma-card-category">${prod.pumaCategoryLabel || prod.categoryName}</div>
          <h3 class="puma-card-title" onclick="openProductDetails('${prod.id}')">${prod.name}</h3>
          
          <div class="puma-card-specs">
            <span>${prod.materialDisplay || 'Bambu Lab Multi-Cores'}</span>
          </div>

          <!-- Bloco de Preços de Alto Contraste -->
          <div class="puma-pricing-block">
            <div class="puma-price-row">
              <span class="puma-price-label">Preço Unitário</span>
              <span class="puma-price-val">${formatBRL(prod.basePrice)}</span>
            </div>
            
            <div class="puma-wholesale-row">
              <span class="puma-wholesale-label">Atacado B2B:</span>
              <span class="puma-wholesale-val">${prod.wholesaleLabel || 'Consulte Lotes'}</span>
            </div>
          </div>

          <!-- Ações: Adicionar ao Orçamento + WhatsApp Comercial -->
          <div class="puma-card-actions">
            <button 
              type="button" 
              class="puma-btn-add-cart" 
              onclick="CartManager.addItem('${prod.id}', 1)"
              title="Adicionar à Sacola de Orçamento"
            >
              + Adicionar ao Orçamento
            </button>

            <a 
              href="${waUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="puma-btn-wa"
              title="Comprar no WhatsApp com mensagem pronta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.942.898 2.79.898h.001c3.182 0 5.768-2.587 5.769-5.767.001-3.181-2.586-5.768-5.77-5.768zm3.36 8.163c-.144.405-.837.774-1.17.822-.311.045-.698.059-2.072-.511-1.636-.68-2.678-2.339-2.76-2.447-.08-.109-.661-.88-.661-1.678 0-.798.419-1.19.568-1.353.149-.163.325-.204.433-.204.108 0 .217.001.312.006.1.005.234-.038.366.279.136.327.464 1.134.505 1.216.041.082.068.177.014.286-.055.109-.082.177-.163.272-.082.095-.172.213-.246.286-.081.082-.167.172-.072.336.095.163.421.696.904 1.127.621.554 1.144.726 1.308.808.163.082.259.068.354-.041.095-.109.407-.476.516-.639.108-.163.217-.136.366-.082.149.054.949.448 1.112.53.163.082.271.122.312.19.041.069.041.396-.103.801z"/>
              </svg>
              Comprar no WhatsApp
            </a>
          </div>

          <button 
            type="button" 
            class="puma-btn-details-link" 
            onclick="openProductDetails('${prod.id}')"
          >
            Ver Ficha Técnica & Lotes Atacado →
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// Ação de Alternar Favorito
window.handleToggleFavorite = function(productId, btn, e) {
  if (e) e.stopPropagation();
  const isAdded = WishlistManager.toggle(productId);
  if (btn) {
    if (isAdded) {
      btn.classList.add("active");
      btn.setAttribute("title", "Remover dos Favoritos");
    } else {
      btn.classList.remove("active");
      btn.setAttribute("title", "Salvar nos Favoritos");
      if (AppState.showOnlyFavorites) {
        renderProducts();
      }
    }
  }
};

// Configurar Busca e Ordenação
function setupSearchAndSort() {
  const pumaSearchInput = document.getElementById("puma-search-input");
  const pumaSearchClear = document.getElementById("puma-search-clear");
  const catalogSearchInput = document.getElementById("catalog-search-input");

  function handleSearchUpdate(val) {
    AppState.searchQuery = val;
    if (pumaSearchInput && pumaSearchInput.value !== val) pumaSearchInput.value = val;
    if (catalogSearchInput && catalogSearchInput.value !== val) catalogSearchInput.value = val;
    if (pumaSearchClear) pumaSearchClear.style.display = val.length > 0 ? "block" : "none";
    renderProducts();
  }

  if (pumaSearchInput) {
    pumaSearchInput.addEventListener("input", (e) => {
      handleSearchUpdate(e.target.value);
    });
    pumaSearchInput.addEventListener("focus", () => {
      scrollToCatalog();
    });
  }

  if (pumaSearchClear) {
    pumaSearchClear.addEventListener("click", () => {
      handleSearchUpdate("");
      if (pumaSearchInput) pumaSearchInput.focus();
    });
  }

  if (catalogSearchInput) {
    catalogSearchInput.addEventListener("input", (e) => {
      handleSearchUpdate(e.target.value);
    });
  }

  const sortSelect = document.getElementById("catalog-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Wishlist Navbar Click
  const navWishlistBtn = document.getElementById("nav-wishlist-btn");
  if (navWishlistBtn) {
    navWishlistBtn.addEventListener("click", (e) => {
      e.preventDefault();
      AppState.showOnlyFavorites = !AppState.showOnlyFavorites;
      if (AppState.showOnlyFavorites) {
        navWishlistBtn.classList.add("active-filter");
      } else {
        navWishlistBtn.classList.remove("active-filter");
      }
      renderProducts();
      scrollToCatalog();
    });
  }
}

// Resetar Filtros
window.resetFilters = function() {
  AppState.activeCategory = "all";
  AppState.searchQuery = "";
  AppState.showOnlyFavorites = false;
  const s1 = document.getElementById("puma-search-input");
  const s2 = document.getElementById("catalog-search-input");
  const clear = document.getElementById("puma-search-clear");
  const navWish = document.getElementById("nav-wishlist-btn");
  if (s1) s1.value = "";
  if (s2) s2.value = "";
  if (clear) clear.style.display = "none";
  if (navWish) navWish.classList.remove("active-filter");
  initCategoryPills();
  initNavbarCategories();
  renderProducts();
};

// Configurar Gavetas (Drawers) e Menus
function setupDrawers() {
  // Sacola de Orçamento
  const cartBtn = document.getElementById("nav-cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartCloseBtn = document.getElementById("cart-drawer-close");
  const cartBackdrop = document.getElementById("cart-drawer-backdrop");

  window.openCartDrawer = function() {
    CartManager.renderDrawer();
    if (cartDrawer) cartDrawer.classList.add("open");
    if (cartBackdrop) cartBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeCartDrawer = function() {
    if (cartDrawer) cartDrawer.classList.remove("open");
    if (cartBackdrop) cartBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (cartBtn) cartBtn.addEventListener("click", openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCartDrawer);

  // Menu Mobile Puma
  const mobileToggle = document.getElementById("puma-mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");
  const mobileCloseBtn = document.getElementById("mobile-menu-close");
  const mobileBackdrop = document.getElementById("mobile-menu-backdrop");

  window.openMobileMenu = function() {
    if (mobileDrawer) mobileDrawer.classList.add("open");
    if (mobileBackdrop) mobileBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeMobileMenu = function() {
    if (mobileDrawer) mobileDrawer.classList.remove("open");
    if (mobileBackdrop) mobileBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (mobileToggle) mobileToggle.addEventListener("click", openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMobileMenu);
}

// Configurar Banner Flutuante Inferior Estilo Puma
function setupFloatingBanner() {
  const banner = document.getElementById("floating-b2b-banner");
  const closeBtn = document.getElementById("close-floating-banner");
  const bannerLink = document.getElementById("floating-banner-link");

  // Verificar se o usuário já fechou na sessão atual
  if (sessionStorage.getItem("imr_puma_banner_closed") === "true") {
    if (banner) banner.style.display = "none";
    return;
  }

  if (closeBtn && banner) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      banner.classList.add("fade-out");
      setTimeout(() => {
        banner.style.display = "none";
      }, 300);
      sessionStorage.setItem("imr_puma_banner_closed", "true");
    });
  }

  if (bannerLink) {
    bannerLink.addEventListener("click", (e) => {
      e.preventDefault();
      selectCategory("outlet-b2b");
      scrollToCatalog();
    });
  }
}

// Abrir Modal de Detalhes Técnicos
window.openProductDetails = function(productId) {
  if (typeof PRODUCTS_DATA === "undefined") return;
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  AppState.selectedProduct = prod;

  const modal = document.getElementById("details-modal");
  if (!modal) return;

  // Preenchimento de dados
  const imgEl = document.getElementById("modal-img");
  if (imgEl) {
    imgEl.src = prod.mainImage;
    imgEl.onerror = function() { this.src = "assets/images/IMR_LOGO_TRANSPARENTE.png"; };
  }

  const titleEl = document.getElementById("modal-title");
  const subEl = document.getElementById("modal-subtitle");
  const descEl = document.getElementById("modal-desc");
  const dimsEl = document.getElementById("modal-spec-dims");
  const leadEl = document.getElementById("modal-spec-lead");
  const weightEl = document.getElementById("modal-spec-weight");
  const matEl = document.getElementById("modal-spec-mat");
  const priceUnitEl = document.getElementById("modal-price-unit");
  const priceWholesaleEl = document.getElementById("modal-price-wholesale");

  if (titleEl) titleEl.textContent = prod.name;
  if (subEl) subEl.textContent = prod.subtitle;
  if (descEl) descEl.textContent = prod.description;
  if (dimsEl) dimsEl.textContent = prod.dimensions || "Sob consulta";
  if (leadEl) leadEl.textContent = prod.leadTime || "2 a 4 dias úteis";
  if (weightEl) weightEl.textContent = prod.weight || "Conforme modelo";
  if (matEl) matEl.textContent = prod.materialDisplay || "PLA / PETG Multi-Cores";

  if (priceUnitEl) priceUnitEl.textContent = formatBRL(prod.basePrice);
  if (priceWholesaleEl) priceWholesaleEl.textContent = prod.wholesaleLabel || "Consulte lotes";

  const waMsg = `Olá IMR Impressão! Gostaria de encomendar o modelo ${prod.name} no valor de ${formatBRL(prod.basePrice)}.`;
  const modalWaBtn = document.getElementById("modal-whatsapp-cta");
  if (modalWaBtn) {
    modalWaBtn.href = `https://wa.me/${IMR_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;
  }

  const modalAddCartBtn = document.getElementById("modal-add-cart-cta");
  if (modalAddCartBtn) {
    modalAddCartBtn.onclick = function() {
      CartManager.addItem(prod.id, 1);
      closeDetailsModal();
    };
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
    if (e.key === "Escape") {
      closeDetailsModal();
      closeCartDrawer();
      closeMobileMenu();
    }
  });
}
