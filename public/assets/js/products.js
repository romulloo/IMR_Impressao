/**
 * =============================================================================
 * IMR IMPRESSÃO 3D - CATÁLOGO OFICIAL DE PRODUTOS B2B & VAREJO
 * Banco de Dados de 15 Soluções em Manufatura Digital Bambu Lab
 * Clean Apple-Style Light Theme (Branco Minimalista)
 * Foco B2B: 'SUA MARCA AQUI' em Todos os Produtos Personalizáveis
 * =============================================================================
 */

const PRODUCTS_DATA = [
  {
    id: "action-figure-miles-morales",
    name: "Action Figure Miles Morales Spider-Verse",
    subtitle: "Escultura Colecionável de Alta Definição Camada 0.12mm",
    category: "action-figures",
    categoryName: "Action Figures",
    badge: "Colecionável VIP",
    basePrice: 149.00,
    wholesalePrice: 92.38,
    wholesaleMinQty: 10,
    wholesaleLabel: "R$ 92,38 un (a partir de 10 un)",
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
    badge: "Lançamento Geek",
    basePrice: 159.00,
    wholesalePrice: 98.50,
    wholesaleMinQty: 10,
    wholesaleLabel: "R$ 98,50 un (a partir de 10 un)",
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
    badge: "Bestseller B2B",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 139.00,
    wholesalePrice: 80.62,
    wholesaleMinQty: 30,
    wholesaleLabel: "R$ 80,62 un (a partir de 30 un)",
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
    description: "Display icônico de balcão desenvolvido sob medida para estabelecimentos comerciais, restaurantes e lojas. Integra mascote 3D carismático, poste com placa suspensa gravada com SUA MARCA AQUI e compartimento duplo para cartões de visita e suporte Pix de balcão.",
    b2bBenefits: [
      "Espaço nobre reservado para a SUA MARCA / LOGO em alto relevo",
      "Aumento comprovado de engajamento e conversão de pagamentos no balcão",
      "Gera fotos e stories espontâneos dos clientes da sua loja",
      "Produzido na Bambu Lab A1 com 4 cores diretas sem falhas de pintura manual"
    ],
    mainImage: "assets/images/prod_display_balcao_suamarca.png",
    gallery: [
      "assets/images/prod_display_balcao_suamarca.png",
      "assets/images/prod_abelha_clean_white.png",
      "assets/images/PREVIEW_MODELO_3D_HOLLYWOOD.png"
    ]
  },
  {
    id: "boneco-rennan-paraquedista",
    name: "Boneco Personalizado 3D (Sua Marca / Seu Personagem)",
    subtitle: "Miniatura Customizada a partir de Foto ou Mascote Corporativo",
    category: "bonecos",
    categoryName: "Bonecos Personalizados",
    badge: "100% Personalizado",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 139.00,
    wholesalePrice: 89.00,
    wholesaleMinQty: 10,
    wholesaleLabel: "R$ 89,00 un (a partir de 10 un)",
    materialDisplay: "PLA Multi-Cores • Bambu AMS",
    materials: ["PLA Premium Multi-Cores", "Base Acrílica 3D"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "16,0cm (A) × 10,0cm (L) × 8,5cm (P)",
    weight: "180g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 139.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 9 un", price: 115.00, discount: "17% OFF" },
      { min: 10, label: "10+ un (Atacado)", price: 89.00, discount: "36% OFF" }
    ],
    description: "Escultura colecionável personalizada sob medida: modelamos seu avatar, personagem exclusivo, mascote da empresa ou líder a partir de fotos enviadas pelo WhatsApp. Base sólida com identificação e gravação da SUA MARCA AQUI.",
    b2bBenefits: [
      "Presente criativo de máximo impacto e descontração",
      "Modelado a partir de fotografias reais enviadas pelo WhatsApp",
      "Impressão multicolor de alta definição sem pintura manual",
      "Base sólida com placa de identificação e logo gravados sob medida"
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
    subtitle: "Estilo Colecionável Funko com Gravação da Sua Marca na Base",
    category: "bonecos",
    categoryName: "Bonecos Personalizados",
    badge: "100% Personalizado",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 129.00,
    wholesalePrice: 77.40,
    wholesaleMinQty: 15,
    wholesaleLabel: "R$ 77,40 un (a partir de 15 un)",
    materialDisplay: "PLA Multi-Cores • Base com Nome Gravado",
    materials: ["PLA Premium Multi-Cores", "Base 3D Personalizada"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "12,5cm (A) × 8,5cm (L) × 7,0cm (P)",
    weight: "110g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 129.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 14 un", price: 108.36, discount: "16% OFF" },
      { min: 15, label: "15+ un (Atacado)", price: 77.40, discount: "40% OFF" }
    ],
    description: "Homenagem em formato colecionável estilo Funko Pop. Modelamos detalhes faciais, cabelo, uniforme profissional, crachá funcional e o letreiro SUA MARCA AQUI gravado em relevo na base. Ideal para formaturas, médicos, advogados, diretores e presentes de equipe.",
    b2bBenefits: [
      "Presente corporativo de altíssimo impacto emocional",
      "Modelagem sob medida a partir de fotos enviadas pelo WhatsApp",
      "Nome do homenageado e logotipo gravados em relevo na base frontal",
      "Condições especiais para lotes e turmas inteiras de formandos"
    ],
    mainImage: "assets/images/prod_funko_medica_clean_white.png",
    gallery: [
      "assets/images/prod_funko_medica_clean_white.png"
    ]
  },
  {
    id: "chaveiro-timelion-3d",
    name: "Chaveiro 3D Personalizado (Sua Marca Aqui)",
    subtitle: "Acabamento Geométrico Facetado em Relevo Tátil Bicolor",
    category: "chaveiros",
    categoryName: "Chaveiros & Brindes",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 18.00,
    wholesalePrice: 4.50,
    wholesaleMinQty: 100,
    wholesaleLabel: "R$ 4,50 un (a partir de 100 un)",
    materialDisplay: "PETG Inquebrável • Relevo Tátil",
    materials: ["PETG Resistente a Impactos", "PLA Tough"],
    leadTime: "2 a 3 dias úteis",
    dimensions: "5,8cm (L) × 5,0cm (A) × 0,45cm (E)",
    weight: "14g com argola",
    discountTiers: [
      { min: 1, label: "1 a 9 un", price: 18.00, discount: "Preço Padrão" },
      { min: 10, label: "10 a 49 un", price: 11.70, discount: "35% OFF" },
      { min: 50, label: "50 a 99 un", price: 8.10, discount: "55% OFF" },
      { min: 100, label: "100+ un (Atacado)", price: 4.50, discount: "75% OFF" }
    ],
    description: "Chaveiro geométrico com desenho poligonal facetado em alto relevo com a SUA MARCA AQUI gravada em contraste perfeito. Fabricado com fusão de duas cores na mesma camada em PETG de engenharia inquebrável. Acompanha argola reforçada em aço niquelado.",
    b2bBenefits: [
      "Gravação da SUA MARCA / LOGO em alto relevo 3D nítido e permanente",
      "Não quebra nem risca no contato com chaves de carro ou maçanetas",
      "Custo unitário extremamente acessível em lotes corporativos B2B",
      "Modelamos qualquer logotipo ou símbolo geométrico da sua empresa"
    ],
    mainImage: "assets/images/prod_chaveiro_suamarca_clean_white.png",
    gallery: [
      "assets/images/prod_chaveiro_suamarca_clean_white.png",
      "assets/images/prod_chaveiro_timelion.jpg",
      "assets/images/PREVIEW_V7_PERFEITO.png"
    ]
  },
  {
    id: "chaveiro-logo-imr-3d",
    name: "Chaveiro Logo Bicolor (Sua Marca Aqui)",
    subtitle: "Logomarca da Sua Empresa em Alto Relevo com Argola em Aço Niquelado",
    category: "chaveiros",
    categoryName: "Chaveiros & Brindes",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 16.00,
    wholesalePrice: 4.20,
    wholesaleMinQty: 100,
    wholesaleLabel: "R$ 4,20 un (a partir de 100 un)",
    materialDisplay: "PETG Bicolor • Resistente ao Bolso",
    materials: ["PETG Engenharia", "Argola Aço Niquelado"],
    leadTime: "2 a 3 dias úteis",
    dimensions: "5,5cm (L) × 4,0cm (A) × 0,4cm (E)",
    weight: "12g",
    discountTiers: [
      { min: 1, label: "1 a 9 un", price: 16.00, discount: "Preço Padrão" },
      { min: 10, label: "10 a 49 un", price: 10.40, discount: "35% OFF" },
      { min: 50, label: "50 a 99 un", price: 7.20, discount: "55% OFF" },
      { min: 100, label: "100+ un (Atacado)", price: 4.20, discount: "74% OFF" }
    ],
    description: "Chaveiro personalizado com a SUA MARCA AQUI em relevo tridimensional e contraste perfeito de cores. Produzido com filamento PETG de engenharia que suporta tração mecânica e atrito diário sem desbotar.",
    b2bBenefits: [
      "Divulgação diária da sua marca no bolso de clientes e parceiros",
      "Gravação nítida do seu logotipo mesmo em detalhes finos e tipografia",
      "Argola em aço niquelado de alta resistência já montada",
      "Condições imperdíveis para compras no atacado corporativo"
    ],
    mainImage: "assets/images/prod_chaveiros_logo.jpg",
    gallery: [
      "assets/images/prod_chaveiros_logo.jpg",
      "assets/images/imr_foto_chaveiros_logo_1789928036453.jpg"
    ]
  },
  {
    id: "kit-chaveiros-corporativos-b2b",
    name: "Kit Chaveiros Corporativos B2B (Sua Marca Aqui)",
    subtitle: "Identidade Visual Fiel em até 4 Cores Diretas Bambu Lab",
    category: "chaveiros",
    categoryName: "Chaveiros & Brindes",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 14.00,
    wholesalePrice: 3.92,
    wholesaleMinQty: 100,
    wholesaleLabel: "R$ 3,92 un (a partir de 100 un)",
    materialDisplay: "PETG Co-Polímero • Até 4 Cores",
    materials: ["PETG Co-Polímero Durável", "PLA Premium"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "4,5cm a 6,5cm (conforme logo)",
    weight: "15g",
    discountTiers: [
      { min: 1, label: "1 a 24 un", price: 14.00, discount: "Preço Padrão" },
      { min: 25, label: "25 a 49 un", price: 9.10, discount: "35% OFF" },
      { min: 50, label: "50 a 99 un", price: 6.72, discount: "52% OFF" },
      { min: 100, label: "100+ un (Atacado)", price: 3.92, discount: "72% OFF" }
    ],
    description: "Brindes institucionais de alto padrão para feiras, eventos corporativos e kits de onboarding. Convertemos o vetor da sua logomarca em relevo 3D nítido e imprimimos com troca automatizada de filamentos em até 4 cores simultâneas.",
    b2bBenefits: [
      "Substitui brindes descartáveis por peças personalizadas de alto padrão com SUA MARCA",
      "Sem pedido mínimo de milhares de unidades como na injeção plástica",
      "Personalização flexível por evento, filial ou departamento",
      "Envio rápido e seguro para todo o território nacional"
    ],
    mainImage: "assets/images/imr_novo_chaveiros_1789925969908.jpg",
    gallery: [
      "assets/images/imr_novo_chaveiros_1789925969908.jpg",
      "assets/images/prod_chaveiros_brindes.jpg"
    ]
  },
  {
    id: "display-placa-pix-balcao",
    name: "Placa PIX de Balcão (Sua Marca Aqui)",
    subtitle: "Display Bicolor Angulado com QR Code e Espaço para Sua Marca",
    category: "displays",
    categoryName: "Displays & PDV",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 69.00,
    wholesalePrice: 35.88,
    wholesaleMinQty: 30,
    wholesaleLabel: "R$ 35,88 un (a partir de 30 un)",
    materialDisplay: "PETG Bicolor • Anti-Reflexo 65°",
    materials: ["PETG Bicolor de Engenharia", "PLA Ônix"],
    leadTime: "24h a 48h úteis",
    dimensions: "15,0cm (L) × 11,5cm (A) × 6,0cm (P)",
    weight: "135g",
    discountTiers: [
      { min: 1, label: "1 a 9 un", price: 69.00, discount: "Preço Padrão" },
      { min: 10, label: "10 a 29 un", price: 55.20, discount: "20% OFF" },
      { min: 30, label: "30+ un (Atacado)", price: 35.88, discount: "48% OFF" }
    ],
    description: "Display ergonômico projetado com ângulo de 65 graus para captura instantânea por qualquer câmera de smartphone, sem reflexos de lâmpadas do teto. QR Code e chave Pix impressos em relevo tridimensional com espaço superior reservado para a SUA MARCA AQUI.",
    b2bBenefits: [
      "Área superior personalizada em alto relevo com a SUA MARCA / LOGO",
      "Elimina erros de digitação de chaves Pix no balcão de atendimento",
      "QR Code em relevo milimétrico permanente (não risca, não borra, não desbota)",
      "Design minimalista moderno que valoriza o visual da sua loja"
    ],
    mainImage: "assets/images/prod_placa_pix_suamarca.png",
    gallery: [
      "assets/images/prod_placa_pix_suamarca.png",
      "assets/images/prod_placa_pix_imr.jpg",
      "assets/images/display_pix_3d_1789879699059.jpg"
    ]
  },
  {
    id: "display-expositor-pdv",
    name: "Display Expositor de Balcão (Sua Marca Aqui)",
    subtitle: "Expositor Modular para Balcão Personalizado com Sua Marca",
    category: "displays",
    categoryName: "Displays & PDV",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 89.00,
    wholesalePrice: 48.90,
    wholesaleMinQty: 20,
    wholesaleLabel: "R$ 48,90 un (a partir de 20 un)",
    materialDisplay: "PETG Estrutural de Alta Resistência",
    materials: ["PETG Estrutural", "Acrílico 3D"],
    leadTime: "2 a 4 dias úteis",
    dimensions: "22,0cm (L) × 18,0cm (A) × 10,0cm (P)",
    weight: "290g",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 89.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 19 un", price: 69.42, discount: "22% OFF" },
      { min: 20, label: "20+ un (Atacado)", price: 48.90, discount: "45% OFF" }
    ],
    description: "Suporte expositor projetado para balcões de lojas, farmácias, óticas e recepções. Compartimentos inteligentes para destacar folhetos, cartões e amostras de produtos, com espaço frontal personalizado para a SUA MARCA AQUI.",
    b2bBenefits: [
      "Personalização frontal com SUA MARCA AQUI em alto relevo",
      "Aumenta a conversão de vendas por impulso no ponto de venda",
      "Geometria auto-portante robusta que não tomba",
      "Material resistente e fácil de higienizar com álcool 70%"
    ],
    mainImage: "assets/images/prod_expositores_balcao.jpg",
    gallery: [
      "assets/images/prod_expositores_balcao.jpg",
      "assets/images/prod_suporte_pdv.jpg"
    ]
  },
  {
    id: "letreiro-logo-3d-led-luminoso",
    name: "Letreiro Luminoso 3D (Sua Marca Aqui)",
    subtitle: "Retroiluminação LED com Difusor de Luz Moldado com Seu Logo",
    category: "letreiros",
    categoryName: "Letreiros & Troféus",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 249.00,
    wholesalePrice: 174.30,
    wholesaleMinQty: 5,
    wholesaleLabel: "R$ 174,30 un (a partir de 5 un)",
    materialDisplay: "PETG Estrutural • LED 12V Bivolt",
    materials: ["PETG Estrutural Térmico", "Face Difusora Translúcida", "Fita LED 12V"],
    leadTime: "4 a 6 dias úteis",
    dimensions: "35,0cm (L) × 22,0cm (A) × 4,5cm (P)",
    weight: "680g",
    discountTiers: [
      { min: 1, label: "1 a 2 un", price: 249.00, discount: "Preço Padrão" },
      { min: 3, label: "3 a 4 un", price: 204.18, discount: "18% OFF" },
      { min: 5, label: "5+ un (Atacado)", price: 174.30, discount: "30% OFF" }
    ],
    description: "Letreiro volumétrico tridimensional sob medida desenvolvido para destacar a SUA MARCA AQUI em recepções, salas de reunião, barbearias e cenários de gravação. Caixa oca com difusão homogênea e iluminação LED uniforme de alta durabilidade.",
    b2bBenefits: [
      "Valorização estética e profissional da sua recepção ou consultório com SUA MARCA",
      "Alimentação prática via fonte bivolt inclusa ou cabo USB",
      "Fixação simples com fita 3M de alta fixação ou furação traseira",
      "Consumo elétrico ultra-baixo de apenas 12 Watts"
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
    subtitle: "Design Poligonal Escultural com Gravação da Sua Marca na Base",
    category: "letreiros",
    categoryName: "Letreiros & Troféus",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 169.00,
    wholesalePrice: 92.95,
    wholesaleMinQty: 15,
    wholesaleLabel: "R$ 92,95 un (a partir de 15 un)",
    materialDisplay: "PLA Silk Ouro/Prata • Base Ônix",
    materials: ["PLA Silk Dourado / Prata / Bronze", "Base Ônix de Alta Densidade"],
    leadTime: "3 a 5 dias úteis",
    dimensions: "24,0cm (A) × 12,5cm (L) × 8,5cm (P)",
    weight: "480g com lastro",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 169.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 14 un", price: 135.20, discount: "20% OFF" },
      { min: 15, label: "15+ un (Atacado)", price: 92.95, discount: "45% OFF" }
    ],
    description: "Troféu de alta presença estética para premiações corporativas. Cada faceta reflete a iluminação em ângulos diferentes, gerando um efeito imponente. A base suporta gravação em relevo com a SUA MARCA AQUI, nome do premiado e categoria.",
    b2bBenefits: [
      "Personalização completa com a SUA MARCA / LOGO e dados da premiação",
      "Valorização máxima de colaboradores de destaque, metas batidas e eventos",
      "Base sólida com centro de gravidade perfeitamente equilibrado",
      "Prazos ágeis de fabricação para convenções e datas comemorativas"
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
    subtitle: "Estrutura Colmeia Biomimética com Sua Marca ou Logo Gravado",
    category: "tech",
    categoryName: "Cases & Tech",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 79.00,
    wholesalePrice: 39.50,
    wholesaleMinQty: 30,
    wholesaleLabel: "R$ 39,50 un (a partir de 30 un)",
    materialDisplay: "TPU Flexível • Anel MagSafe Neodímio",
    materials: ["TPU Flexível de Engenharia", "PETG de Alta Densidade"],
    leadTime: "24h a 48h úteis",
    dimensions: "Compatível com iPhone e Galaxy",
    weight: "28g (Ultraleve)",
    discountTiers: [
      { min: 1, label: "1 a 4 un", price: 79.00, discount: "Preço Padrão" },
      { min: 5, label: "5 a 19 un", price: 61.62, discount: "22% OFF" },
      { min: 20, label: "20 a 29 un", price: 48.98, discount: "38% OFF" },
      { min: 30, label: "30+ un (Atacado)", price: 39.50, discount: "50% OFF" }
    ],
    description: "Capa protetora com padrão de favo de mel vazado que reduz o aquecimento do smartphone durante uso intenso. Anel magnético MagSafe integrado e espaço para inserção da SUA MARCA AQUI.",
    b2bBenefits: [
      "Design futurista e ergonômico personalizável com o logotipo da sua frota ou equipe",
      "Reduz superaquecimento do celular durante navegação por GPS e jogos",
      "Compatível com suportes veiculares magnéticos e carregadores sem fio",
      "Excelente para frotistas, equipes de campo e revenda corporativa"
    ],
    mainImage: "assets/images/prod_card_cases_magsafe.png",
    gallery: [
      "assets/images/prod_card_cases_magsafe.png"
    ]
  },
  {
    id: "copos-termicos-luva-3d",
    name: "Copos Térmicos 3D (Sua Marca Aqui)",
    subtitle: "Aço Inox 473ml com Luva Grip Personalizada com Sua Marca",
    category: "utilidades",
    categoryName: "Copos & Utilidades",
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 89.00,
    wholesalePrice: 48.06,
    wholesaleMinQty: 30,
    wholesaleLabel: "R$ 48,06 un (a partir de 30 un)",
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
    badge: "✦ SUA MARCA AQUI",
    isCustomizable: true,
    customTag: "SUA MARCA AQUI",
    basePrice: 119.00,
    wholesalePrice: 65.45,
    wholesaleMinQty: 15,
    wholesaleLabel: "R$ 65,45 un (a partir de 15 un)",
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

// Categorias Oficiais do Catálogo Minimalista IMR
const CATEGORIES = [
  { id: "all", name: "Todos os Produtos", count: PRODUCTS_DATA.length },
  { id: "action-figures", name: "Action Figures", count: PRODUCTS_DATA.filter(p => p.category === "action-figures").length },
  { id: "bonecos", name: "Bonecos Personalizados", count: PRODUCTS_DATA.filter(p => p.category === "bonecos").length },
  { id: "chaveiros", name: "Chaveiros & Brindes", count: PRODUCTS_DATA.filter(p => p.category === "chaveiros").length },
  { id: "displays", name: "Displays & PDV", count: PRODUCTS_DATA.filter(p => p.category === "displays").length },
  { id: "letreiros", name: "Letreiros & Troféus", count: PRODUCTS_DATA.filter(p => p.category === "letreiros").length },
  { id: "tech", name: "Cases & Tech", count: PRODUCTS_DATA.filter(p => p.category === "tech").length },
  { id: "utilidades", name: "Copos & Utilidades", count: PRODUCTS_DATA.filter(p => p.category === "utilidades").length }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS_DATA, CATEGORIES };
}
