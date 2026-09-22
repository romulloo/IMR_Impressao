/**
 * =============================================================================
 * IMR IMPRESSÃO 3D - CATÁLOGO OFICIAL DE PRODUTOS B2B & VAREJO
 * Edição E-Commerce Puma Style (Design Clean, Premium & Alta Precisão)
 * Banco de Dados de Soluções em Manufatura Digital Bambu Lab A1 Multi-Cores
 * =============================================================================
 */

const PRODUCTS_DATA = [
  {
    id: "action-figure-miles-morales",
    name: "Action Figure Miles Morales Spider-Verse",
    subtitle: "Escultura Colecionável de Alta Definição Camada 0.12mm",
    category: "action-figures",
    categoryName: "Action Figures",
    pumaCategory: "colecionaveis",
    pumaCategoryLabel: "COLECIONÁVEL 3D • MULTICOR",
    badge: "Colecionável VIP",
    basePrice: 149.00,
    wholesalePrice: 92.38,
    wholesaleMinQty: 10,
    wholesaleLabel: "R$ 92,38 un (a partir de 10 un)",
    wholesaleDiscountPercent: "38% OFF",
    materialDisplay: "PLA Tough Ultra HD • Camada 0.12mm",
    materials: ["PLA Tough Ultra HD", "Resina Híbrida"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "21,0cm (A) × 13,5cm (L) × 11,0cm (P)",
    weight: "240g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 149.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 9 un", price: 126.65, discount: "15% OFF" },
      { min: 10, label: "10+ un (Atacado)", price: 92.38, discount: "38% OFF" }
    ],
    description: "Estatueta colecionável com pose dinâmica inspirada no salto sobre a cidade. Modelagem com alta definição de teias, texturas da jaqueta e tênis estilizados. Base personalizada com estabilidade perfeita e acabamento impecável em fundo branco puro.",
    b2bBenefits: [
      "Produto de altíssimo valor percebido para lojas geek e colecionadores",
      "Resolução de camada de 0.12mm com linhas de impressão ultra-suaves",
      "Embalagem reforçada à prova de impacto para transporte seguro",
      "Excelente para revenda especializada e presentes VIP"
    ],
    mainImage: "assets/images/prod_miles_morales_clean_white.png",
    gallery: [
      "assets/images/prod_miles_morales_clean_white.png",
      "assets/images/prod_action_figures_imr.jpg"
    ]
  },
  {
    id: "action-figure-anime-games",
    name: "Action Figure Anime & Games Exclusiva",
    subtitle: "Escultura de Personagens Épicos com Base Temática em Fundo Branco",
    category: "action-figures",
    categoryName: "Action Figures",
    pumaCategory: "colecionaveis",
    pumaCategoryLabel: "COLECIONÁVEL 3D • ANIME",
    badge: "Lançamento Geek",
    basePrice: 159.00,
    wholesalePrice: 98.50,
    wholesaleMinQty: 10,
    wholesaleLabel: "R$ 98,50 un (a partir de 10 un)",
    wholesaleDiscountPercent: "38% OFF",
    materialDisplay: "PLA Silk Ultra HD / Resina • 0.12mm",
    materials: ["PLA Silk Alta Definição", "Resina Fotopolímero"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "20,0cm (A) × 12,5cm (L) × 10,0cm (P)",
    weight: "220g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 159.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 9 un", price: 135.15, discount: "15% OFF" },
      { min: 10, label: "10+ un (Atacado)", price: 98.50, discount: "38% OFF" }
    ],
    description: "Figures colecionáveis de animes, mangás e jogos icônicos. Detalhamento milimétrico em expressões, vestimentas e armas, com suporte reforçado e base personalizada diorama em acrílico cristal.",
    b2bBenefits: [
      "Atende o crescente mercado geek e colecionador",
      "Impressão precisa com tolerância milimétrica na Bambu Lab A1",
      "Variedade de personagens sob demanda para sua loja",
      "Margem de lucro atrativa para lojistas e revendedores"
    ],
    mainImage: "assets/images/prod_anime_clean_white.png",
    gallery: [
      "assets/images/prod_anime_clean_white.png",
      "assets/images/prod_action_figures_imr.jpg"
    ]
  },
  {
    id: "mascote-abelha-hollywood",
    name: "Display de Balcão Personalizado (Sua Marca Aqui)",
    subtitle: "Mascote 3D com Porta-Cartões & Placa Suspensa para Sua Marca",
    category: "bonecos",
    categoryName: "Bonecos Personalizados",
    pumaCategory: "colecionaveis",
    pumaCategoryLabel: "COLECIONÁVEL 3D • MASCOTE B2B",
    badge: "Bestseller B2B",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 139.00,
    wholesalePrice: 80.62,
    wholesaleMinQty: 30,
    wholesaleLabel: "R$ 80,62 un (a partir de 30 un)",
    wholesaleDiscountPercent: "42% OFF",
    materialDisplay: "PLA Multi-Cores • 4 Cores Bambu AMS",
    materials: ["PLA Premium Multi-Cores", "PETG Ultra Resistente"],
    leadTime: "2 a 4 dias úteis",
    dimensions: "18,5cm (A) × 14,0cm (L) × 12,0cm (P)",
    weight: "210g",
    discountTiers: [
      { min: 1, label: "1 a 9 un", price: 139.00, discount: "Preço Padrão" },
      { min: 10, label: "10 a 29 un", price: 113.98, discount: "18% OFF" },
      { min: 30, label: "30+ un (Atacado)", price: 80.62, discount: "42% OFF" }
    ],
    description: "Mascote de balcão articulado para pontos de venda e restaurantes. Acompanha porta-cartões de visita integrado e plaquinha frontal personalizável com o logotipo da sua empresa em relevo colorido direto da máquina sem pintura.",
    b2bBenefits: [
      "Gera alto engajamento visual no caixa ou balcão de atendimento",
      "Placa frontal com o nome da SUA MARCA AQUI",
      "Porta-cartões ou porta-recados embutido na base",
      "Desconto progressivo de até 42% para redes e franquias"
    ],
    mainImage: "assets/images/prod_abelha_clean_white.png",
    gallery: [
      "assets/images/prod_abelha_clean_white.png",
      "assets/images/prod_hollywood_burguer.jpg"
    ]
  },
  {
    id: "boneco-rennan-paraquedista",
    name: "Boneco Personalizado 3D (Sua Marca / Seu Personagem)",
    subtitle: "Escultura Modular Multipeças com Pose Dinâmica e Base Nuvem",
    category: "bonecos",
    categoryName: "Bonecos Personalizados",
    pumaCategory: "colecionaveis",
    pumaCategoryLabel: "COLECIONÁVEL 3D • PERSONALIZADO",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 139.00,
    wholesalePrice: 80.62,
    wholesaleMinQty: 20,
    wholesaleLabel: "R$ 80,62 un (a partir de 20 un)",
    wholesaleDiscountPercent: "42% OFF",
    materialDisplay: "PLA Multi-Cores 4 Tons Bambu",
    materials: ["PLA Premium Multi-Cores", "Encaixes Tolerância 0.15mm"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "16,0cm (A) × 12,0cm (L) × 10,5cm (P)",
    weight: "195g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 139.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 19 un", price: 111.20, discount: "20% OFF" },
      { min: 20, label: "20+ un (Atacado)", price: 80.62, discount: "42% OFF" }
    ],
    description: "Modelo colecionável modular produzido com engenharia de tolerância milimétrica. Cores autênticas fundidas camada por camada, base estilizada em formato de nuvem com estabilidade estrutural máxima.",
    b2bBenefits: [
      "Criação de mascotes exclusivos para campanhas de marketing",
      "Totalmente modular: peças separadas por cor sem falhas visuais",
      "Excelente para premiações internas e celebrações de metas",
      "Produção rápida para eventos corporativos"
    ],
    mainImage: "assets/images/prod_rennan_clean_white.png",
    gallery: [
      "assets/images/prod_rennan_clean_white.png",
      "assets/images/PREVIEW_RENNAN_MODULAR_3D.png"
    ]
  },
  {
    id: "boneco-funko-medica",
    name: "Boneco Personalizado 3D Profissões (Sua Marca Aqui)",
    subtitle: "Estilo Funko Pop Customizado com Uniforme e Logotipo da Empresa",
    category: "bonecos",
    categoryName: "Bonecos Personalizados",
    pumaCategory: "colecionaveis",
    pumaCategoryLabel: "COLECIONÁVEL 3D • PROFISSÕES",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 129.00,
    wholesalePrice: 74.82,
    wholesaleMinQty: 25,
    wholesaleLabel: "R$ 74,82 un (a partir de 25 un)",
    wholesaleDiscountPercent: "42% OFF",
    materialDisplay: "PLA Multi-Cores Bambu • Acabamento Fosco",
    materials: ["PLA Silk & Matte", "Resina HD nos Detalhes"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "12,0cm (A) × 8,5cm (L) × 7,5cm (P)",
    weight: "140g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 129.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 24 un", price: 103.20, discount: "20% OFF" },
      { min: 25, label: "25+ un (Atacado)", price: 74.82, discount: "42% OFF" }
    ],
    description: "Homenagem em miniatura para médicos, engenheiros, advogados, equipes corporativas e formandos. Roupas nas cores da empresa ou hospital, com crachá ou jaleco personalizado com a SUA MARCA AQUI.",
    b2bBenefits: [
      "Presente inesquecível de Dia dos Médicos, Formaturas e Confraternizações",
      "Uniforme, jaleco e acessórios com a logo da SUA EMPRESA",
      "Escala compacta de 12cm perfeita para mesas e consultórios",
      "Preços especiais para clínicas, hospitais e escritórios"
    ],
    mainImage: "assets/images/prod_funko_medica_clean_white.png",
    gallery: [
      "assets/images/prod_funko_medica_clean_white.png"
    ]
  },
  {
    id: "chaveiro-timelion-3d",
    name: "Chaveiro 3D Personalizado (Sua Marca Aqui)",
    subtitle: "Em Relevo Tridimensional com Argola Inox Italiana",
    category: "chaveiros",
    categoryName: "Chaveiros & Brindes",
    pumaCategory: "chaveiros",
    pumaCategoryLabel: "CHAVEIROS & BRINDES • 3D",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 18.00,
    wholesalePrice: 4.50,
    wholesaleMinQty: 100,
    wholesaleLabel: "R$ 4,50 un (a partir de 100 un)",
    wholesaleDiscountPercent: "75% OFF",
    materialDisplay: "PLA Tough Alta Densidade • 4 Cores",
    materials: ["PLA Tough Ultra Resistente", "Argola Inox 25mm com Corrente"],
    leadTime: "2 a 4 dias úteis",
    dimensions: "5,5cm (L) × 4,5cm (A) × 0,45cm (E)",
    weight: "14g",
    discountTiers: [
      { min: 1, label: "1 a 19 un", price: 18.00, discount: "Preço Padrão" },
      { min: 20, label: "20 a 49 un", price: 9.90, discount: "45% OFF" },
      { min: 50, label: "50 a 99 un", price: 6.50, discount: "64% OFF" },
      { min: 100, label: "100+ un (Atacado)", price: 4.50, discount: "75% OFF" }
    ],
    description: "Chaveiro corporativo premium com modelagem em relevo volumétrico da SUA MARCA AQUI. Argola em aço inox padrão italiano. Não descasca nem desbota por ser fundido em cores puras na Bambu Lab.",
    b2bBenefits: [
      "Brinde de custo unitário a partir de R$ 4,50 com valor percebido de loja",
      "Relevo tridimensional nítido que destaca a marca no dia a dia do cliente",
      "Resistência mecânica a quedas e uso contínuo em bolsos e bolsas",
      "Capacidade produtiva de centenas de unidades por dia"
    ],
    mainImage: "assets/images/prod_chaveiro_suamarca_clean_white.png",
    gallery: [
      "assets/images/prod_chaveiro_suamarca_clean_white.png",
      "assets/images/prod_chaveiro_timelion.jpg"
    ]
  },
  {
    id: "chaveiro-logo-imr-3d",
    name: "Chaveiro Logo Bicolor (Sua Marca Aqui)",
    subtitle: "Acabamento Alto Contraste Bicolor com Base Chanfrada",
    category: "chaveiros",
    categoryName: "Chaveiros & Brindes",
    pumaCategory: "chaveiros",
    pumaCategoryLabel: "CHAVEIROS & BRINDES • BICOLOR",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 16.00,
    wholesalePrice: 4.20,
    wholesaleMinQty: 100,
    wholesaleLabel: "R$ 4,20 un (a partir de 100 un)",
    wholesaleDiscountPercent: "74% OFF",
    materialDisplay: "PLA Tough Preto & Branco Fosco",
    materials: ["PLA Tough Bicolor", "Argola com Trava Reforçada"],
    leadTime: "2 a 3 dias úteis",
    dimensions: "5,0cm (L) × 4,0cm (A) × 0,40cm (E)",
    weight: "12g",
    discountTiers: [
      { min: 1, label: "1 a 19 un", price: 16.00, discount: "Preço Padrão" },
      { min: 20, label: "20 a 49 un", price: 8.90, discount: "44% OFF" },
      { min: 50, label: "50 a 99 un", price: 5.90, discount: "63% OFF" },
      { min: 100, label: "100+ un (Atacado)", price: 4.20, discount: "74% OFF" }
    ],
    description: "Design moderno com bordas chanfradas e tipografia em alto relevo contrastante. Ideal para concessionárias, imobiliárias, academias e eventos corporativos que buscam um brinde elegante e durável com a SUA MARCA AQUI.",
    b2bBenefits: [
      "Design geométrico moderno com acabamento tátil de alto padrão",
      "Entrega ultra-rápida mesmo para lotes de grande volume",
      "Gravação em alto relevo com durabilidade permanente",
      "Excelente retorno sobre investimento para branding da empresa"
    ],
    mainImage: "assets/images/imr_foto_chaveiros_logo_1789928036453.jpg",
    gallery: [
      "assets/images/imr_foto_chaveiros_logo_1789928036453.jpg",
      "assets/images/imr_novo_chaveiros_1789925969908.jpg"
    ]
  },
  {
    id: "kit-chaveiros-corporativos-b2b",
    name: "Kit Chaveiros Corporativos B2B (Sua Marca Aqui)",
    subtitle: "Lote Especial com Embalagem Individual e Tag de Apresentação",
    category: "chaveiros",
    categoryName: "Chaveiros & Brindes",
    pumaCategory: "chaveiros",
    pumaCategoryLabel: "CHAVEIROS & BRINDES • B2B ESCALA",
    badge: "✦ LOTE B2B PROMOCIONAL",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 14.00,
    wholesalePrice: 3.90,
    wholesaleMinQty: 200,
    wholesaleLabel: "R$ 3,90 un (a partir de 200 un)",
    wholesaleDiscountPercent: "72% OFF",
    materialDisplay: "PLA Tough Multi-Cores • Embalagem Selada",
    materials: ["PLA Tough Resistente", "Embalagem Plástica Cristal Individual"],
    leadTime: "3 a 6 dias úteis",
    dimensions: "5,0cm × 4,5cm (formato conforme logo)",
    weight: "13g un",
    discountTiers: [
      { min: 50, label: "50 a 99 un", price: 6.20, discount: "55% OFF" },
      { min: 100, label: "100 a 199 un", price: 4.80, discount: "65% OFF" },
      { min: 200, label: "200+ un (Atacado VIP)", price: 3.90, discount: "72% OFF" }
    ],
    description: "Solução completa para feiras de negócios, convenções e campanhas promocionais em massa. Cada chaveiro já sai embalado individualmente com saquinho adesivado pronto para distribuição para o seu cliente final.",
    b2bBenefits: [
      "Pronto para entrega imediata em eventos, feiras e congressos",
      "Apresentação premium com saquinho selado de alta transparência",
      "Custo unitário imbatível para grandes ações de marketing",
      "Personalização 100% fiel à identidade visual da SUA EMPRESA"
    ],
    mainImage: "assets/images/prod_chaveiros_brindes.jpg",
    gallery: [
      "assets/images/prod_chaveiros_brindes.jpg",
      "assets/images/imr_foto_chaveiros_logo_1789928036453.jpg"
    ]
  },
  {
    id: "display-placa-pix-balcao",
    name: "Placa PIX de Balcão (Sua Marca Aqui)",
    subtitle: "Display Tridimensional em Ângulo com QR Code e Chave PIX",
    category: "displays",
    categoryName: "Displays & PDV",
    pumaCategory: "displays",
    pumaCategoryLabel: "DISPLAYS & PDV • QR CODE PIX",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 69.00,
    wholesalePrice: 34.50,
    wholesaleMinQty: 20,
    wholesaleLabel: "R$ 34,50 un (a partir de 20 un)",
    wholesaleDiscountPercent: "50% OFF",
    materialDisplay: "PLA Bicolor & QR Code Alto Relevo",
    materials: ["PLA Premium Alto Contraste", "Base Angulada 65° Antirreflexo"],
    leadTime: "2 a 3 dias úteis",
    dimensions: "15,0cm (A) × 11,5cm (L) × 7,0cm (P)",
    weight: "115g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 69.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 19 un", price: 48.30, discount: "30% OFF" },
      { min: 20, label: "20+ un (Atacado)", price: 34.50, discount: "50% OFF" }
    ],
    description: "Display elegante para balcões de lojas, restaurantes, consultórios e quiosques. Acomoda o logotipo da sua empresa em alto relevo colorido, QR Code do PIX e chave formatada com leitura instantânea por câmera de celular.",
    b2bBenefits: [
      "Agiliza o pagamento no caixa e reduz filas de atendimento",
      "Aumenta a confiança do cliente com acabamento profissional moderno",
      "Gravação física do QR Code em relevo indelével",
      "Ângulo de 65 graus estudado para evitar reflexos de lâmpadas de teto"
    ],
    mainImage: "assets/images/prod_placa_pix_suamarca.png",
    gallery: [
      "assets/images/prod_placa_pix_suamarca.png",
      "assets/images/imr_foto_trofeu_imr_1789928508709.jpg"
    ]
  },
  {
    id: "display-expositor-pdv",
    name: "Display Expositor de Balcão (Sua Marca Aqui)",
    subtitle: "Suporte Multifuncional para Produtos, Folhetos e Cartões",
    category: "displays",
    categoryName: "Displays & PDV",
    pumaCategory: "displays",
    pumaCategoryLabel: "DISPLAYS & PDV • BALCÃO",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 89.00,
    wholesalePrice: 48.95,
    wholesaleMinQty: 15,
    wholesaleLabel: "R$ 48,95 un (a partir de 15 un)",
    wholesaleDiscountPercent: "45% OFF",
    materialDisplay: "PETG Estrutural Antirrisco",
    materials: ["PETG Reforçado 3mm", "Encaixes de Travamento Rápido"],
    leadTime: "2 a 4 dias úteis",
    dimensions: "22,0cm (A) × 18,0cm (L) × 14,0cm (P)",
    weight: "260g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 89.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 14 un", price: 66.75, discount: "25% OFF" },
      { min: 15, label: "15+ un (Atacado)", price: 48.95, discount: "45% OFF" }
    ],
    description: "Estrutura robusta para destacar produtos no ponto de venda (PDV). Permite exibir cosméticos, acessórios de celular, eletrônicos ou panfletos promocionais com a SUA MARCA AQUI no frontão superior.",
    b2bBenefits: [
      "Aumenta o giro de produtos no ponto focal do cliente",
      "Frontão superior com logotipo da SUA EMPRESA em 4 cores diretas",
      "Leve para transporte, porém firme e estável na bancada",
      "Personalizável sob medida para as dimensões do seu produto"
    ],
    mainImage: "assets/images/prod_display_balcao_suamarca.png",
    gallery: [
      "assets/images/prod_display_balcao_suamarca.png",
      "assets/images/prod_suporte_pdv.jpg"
    ]
  },
  {
    id: "letreiro-logo-3d-led-luminoso",
    name: "Letreiro Luminoso 3D (Sua Marca Aqui)",
    subtitle: "Logo Volumétrico Caixa Alta com Iluminação LED Interna",
    category: "letreiros",
    categoryName: "Letreiros & Troféus",
    pumaCategory: "letreiros",
    pumaCategoryLabel: "LETREIROS & LOGOS 3D • LUMINOSO",
    badge: "✦ IMPACTO VISUAL MÁXIMO",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 249.00,
    wholesalePrice: 161.85,
    wholesaleMinQty: 5,
    wholesaleLabel: "R$ 161,85 un (a partir de 5 un)",
    wholesaleDiscountPercent: "35% OFF",
    materialDisplay: "PETG Translúcido Difusor + LED 12V Bivolt",
    materials: ["PETG Black & White Difusor", "Fita LED SMD Alto Brilho", "Fonte 12V Bivolt Inclusa"],
    leadTime: "3 a 6 dias úteis",
    dimensions: "32,0cm (L) × 24,0cm (A) × 6,0cm (P)",
    weight: "580g",
    discountTiers: [
      { min: 1, label: "1 a 2 un", price: 249.00, discount: "Preço Padrão" },
      { min: 3, label: "3 a 4 un", price: 204.18, discount: "18% OFF" },
      { min: 5, label: "5+ un (Atacado)", price: 161.85, discount: "35% OFF" }
    ],
    description: "Letreiro luminoso tridimensional estilo caixa alta projetado para recepções, escritórios, estúdios de podcast e fachadas internas. A iluminação LED uniforme destaca a SUA MARCA AQUI com sofisticação total.",
    b2bBenefits: [
      "Transforma a recepção ou o fundo de vídeo de chamadas da sua empresa",
      "Iluminação LED difusa sem pontos quentes aparentes",
      "Acompanha fonte bivolt automática e furação oculta para fixação",
      "Excelente para padronização de franquias e filiais corporativas"
    ],
    mainImage: "assets/images/imr_foto_letreiro_led_imr_1789928309416.jpg",
    gallery: [
      "assets/images/imr_foto_letreiro_led_imr_1789928309416.jpg",
      "assets/images/prod_letreiro_led_novo.jpg"
    ]
  },
  {
    id: "trofeu-corporativo-facetado",
    name: "Troféu Corporativo 3D (Sua Marca Aqui)",
    subtitle: "Design Geométrico Facetado com Placa Metálica Personalizada",
    category: "letreiros",
    categoryName: "Letreiros & Troféus",
    pumaCategory: "letreiros",
    pumaCategoryLabel: "LETREIROS & LOGOS 3D • TROFÉU",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 169.00,
    wholesalePrice: 98.02,
    wholesaleMinQty: 10,
    wholesaleLabel: "R$ 98,02 un (a partir de 10 un)",
    wholesaleDiscountPercent: "42% OFF",
    materialDisplay: "PLA Silk Ouro / Bronze / Platina",
    materials: ["PLA Silk Alta Refletividade", "Base Pesada com Lastro Interno"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "24,0cm (A) × 11,0cm (L) × 9,5cm (P)",
    weight: "320g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 169.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 9 un", price: 135.20, discount: "20% OFF" },
      { min: 10, label: "10+ un (Atacado)", price: 98.02, discount: "42% OFF" }
    ],
    description: "Troféu com estética geométrica de facetas que refletem a iluminação ambiente. Ideal para premiações anuais de vendedores, homenagens por tempo de casa, torneios esportivos ou eventos de tecnologia corporativa.",
    b2bBenefits: [
      "Brilho metálico sedoso Silk que dispensa pintura química",
      "Gravação do nome do premiado e logotipo da SUA EMPRESA",
      "Base com lastro interno que confere peso e sensação de luxo ao segurar",
      "Lotes sob medida com nomes individuais impressos sem taxa extra"
    ],
    mainImage: "assets/images/imr_foto_trofeu_imr_1789928508709.jpg",
    gallery: [
      "assets/images/imr_foto_trofeu_imr_1789928508709.jpg",
      "assets/images/prod_trofeu_personalizado.jpg"
    ]
  },
  {
    id: "capa-celular-magsafe-honeycomb",
    name: "Capas de Celular MagSafe 3D (Sua Marca Aqui)",
    subtitle: "Estrutura Honeycomb em TPU Antishock com Grip Anatômico",
    category: "tech",
    categoryName: "Cases & Tech",
    pumaCategory: "tech",
    pumaCategoryLabel: "CASES & TECH • MAGSAFE",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 79.00,
    wholesalePrice: 39.50,
    wholesaleMinQty: 30,
    wholesaleLabel: "R$ 39,50 un (a partir de 30 un)",
    wholesaleDiscountPercent: "50% OFF",
    materialDisplay: "TPU Flexível 95A + PLA Tough Híbrido",
    materials: ["TPU Flexível de Alta Densidade", "Anel de Ímãs Neodímio N52 MagSafe"],
    leadTime: "2 a 4 dias úteis",
    dimensions: "Modelos para iPhone 13 ao 16 Pro Max e Linha Galaxy S",
    weight: "48g",
    discountTiers: [
      { min: 1, label: "1 a 9 un", price: 79.00, discount: "Preço Padrão" },
      { min: 10, label: "10 a 29 un", price: 55.30, discount: "30% OFF" },
      { min: 30, label: "30+ un (Atacado)", price: 39.50, discount: "50% OFF" }
    ],
    description: "Capa protetora de celular de absorção de impacto com padrão colmeia ventilado. Integra anel magnético de neodímio N52 para compatibilidade com carregadores e suportes veiculares MagSafe.",
    b2bBenefits: [
      "Acessório tecnológico de altíssimo giro e consumo recorrente",
      "Gravação do logotipo ou nome da SUA EMPRESA no painel traseiro",
      "Proteção certificada contra quedas com reforço nos cantos",
      "Compatibilidade total com carregamento sem fio e suportes veiculares"
    ],
    mainImage: "assets/images/prod_card_cases_magsafe.png",
    gallery: [
      "assets/images/prod_card_cases_magsafe.png"
    ]
  },
  {
    id: "copos-termicos-luva-3d",
    name: "Copos Térmicos 3D (Sua Marca Aqui)",
    subtitle: "Luva Protetora Geométrica em TPU para Copos Térmicos Inox",
    category: "utilidades",
    categoryName: "Copos & Utilidades",
    pumaCategory: "utilidades",
    pumaCategoryLabel: "COPOS & UTILIDADES • TÉRMICO",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 89.00,
    wholesalePrice: 48.06,
    wholesaleMinQty: 30,
    wholesaleLabel: "R$ 48,06 un (a partir de 30 un)",
    wholesaleDiscountPercent: "46% OFF",
    materialDisplay: "Aço Inox 304 • Luva TPU 3D",
    materials: ["Copo Inox Parede Dupla a Vácuo", "Luva em TPU Flexível 3D"],
    leadTime: "2 a 4 dias úteis",
    dimensions: "17,5cm (A) × 8,8cm (Ø) • 473ml",
    weight: "340g conjunto",
    discountTiers: [
      { min: 1, label: "1 a 9 un", price: 89.00, discount: "Preço Padrão" },
      { min: 10, label: "10 a 29 un", price: 71.20, discount: "20% OFF" },
      { min: 30, label: "30+ un (Atacado)", price: 48.06, discount: "46% OFF" }
    ],
    description: "Copo térmico em aço inox 304 com isolamento a vácuo (bebidas geladas até 12h ou quentes até 4h), customizado com luva protetora geométrica tridimensional com grip emborrachado anatômico com a SUA MARCA AQUI em relevo.",
    b2bBenefits: [
      "Brinde executivo que clientes e diretores usam diariamente na mesa ou no carro",
      "Logomarca da SUA EMPRESA estampada em relevo tridimensional na luva",
      "Luva geométrica que impede condensação e protege contra batidas",
      "Design sofisticado que se destaca de brindes promocionais comuns"
    ],
    mainImage: "assets/images/imr_foto_copos_3d_1789928215558.jpg",
    gallery: [
      "assets/images/imr_foto_copos_3d_1789928215558.jpg",
      "assets/images/prod_kit_copos_novo.jpg"
    ]
  },
  {
    id: "organizador-mesa-barbearia",
    name: "Organizadores de Bancada (Sua Marca Aqui)",
    subtitle: "Divisórias Sob Medida com o Nome ou Logo do Seu Negócio",
    category: "utilidades",
    categoryName: "Copos & Utilidades",
    pumaCategory: "utilidades",
    pumaCategoryLabel: "COPOS & UTILIDADES • BANCADA",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 119.00,
    wholesalePrice: 65.45,
    wholesaleMinQty: 15,
    wholesaleLabel: "R$ 65,45 un (a partir de 15 un)",
    wholesaleDiscountPercent: "45% OFF",
    materialDisplay: "PETG Antichoque • Resistente a Óleos",
    materials: ["PETG Resistente a Impactos e Óleos", "Pés Antiderrapantes"],
    leadTime: "2 a 4 dias úteis",
    dimensions: "28,0cm (L) × 18,0cm (P) × 7,5cm (A)",
    weight: "360g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 119.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 14 un", price: 92.82, discount: "22% OFF" },
      { min: 15, label: "15+ un (Atacado)", price: 65.45, discount: "45% OFF" }
    ],
    description: "Bandeja organizadora profissional projetada para bancadas de trabalho, clínicas e barbearias. Berços anatômicos com personalização em alto relevo com a SUA MARCA AQUI ou nome do estabelecimento.",
    b2bBenefits: [
      "Personalizável com o nome ou logotipo do seu estabelecimento",
      "Aumenta a velocidade de atendimento e mantém o posto de trabalho impecável",
      "Resistente a respingos de água, óleos lubrificantes e álcool 70%",
      "Canaletas para passagem embutida de cabos elétricos"
    ],
    mainImage: "assets/images/organizador_mesa_1789879865373.jpg",
    gallery: [
      "assets/images/organizador_mesa_1789879865373.jpg"
    ]
  }
];

// Categorias Oficiais Puma Style solicitadas
const PUMA_CATEGORIES = [
  { id: "all", name: "TODOS OS PRODUTOS", label: "TODOS", count: PRODUCTS_DATA.length },
  { id: "colecionaveis", name: "COLECIONÁVEIS", label: "COLECIONÁVEIS", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "colecionaveis").length },
  { id: "displays", name: "DISPLAYS & PDV", label: "DISPLAYS & PDV", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "displays").length },
  { id: "chaveiros", name: "CHAVEIROS & BRINDES", label: "CHAVEIROS & BRINDES", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "chaveiros").length },
  { id: "letreiros", name: "LETREIROS & LOGOS 3D", label: "LETREIROS & LOGOS 3D", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "letreiros").length },
  { id: "tech", name: "CASES & TECH", label: "CASES & TECH", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "tech").length },
  { id: "utilidades", name: "COPOS & UTILIDADES", label: "COPOS & UTILIDADES", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "utilidades").length },
  { id: "outlet-b2b", name: "OUTLET / B2B ATACADO", label: "OUTLET / B2B ATACADO", count: PRODUCTS_DATA.filter(p => p.discountTiers && p.discountTiers.length > 1).length }
];

// Fallback retrocompatível
const CATEGORIES = PUMA_CATEGORIES;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS_DATA, CATEGORIES, PUMA_CATEGORIES };
}
