"""
Script para gerar o arquivo products.js oficial da IMR Impressão 3D
com todos os 33 produtos, 4 fotos em fundo branco puro (#FFFFFF),
sem o termo 'Copo Temático 3D ', com a categoria de Natal '🎄 NATAL 3D' em destaque.
"""

import os
import json

BASE_DIR = r"C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao"
DEST_FULLSTACK = os.path.join(BASE_DIR, "catalogo_imr_fullstack", "public", "assets", "js", "products.js")
DEST_LEGACY = os.path.join(BASE_DIR, "catalogo_imr", "assets", "js", "products.js")

PRODUCTS = [
  # 1. ESCUDO VASCO 3D COM PEDESTAL
  {
    "id": "escudo-vasco-3d",
    "name": "Escudo 3D Clube de Regatas Vasco da Gama com Pedestal",
    "subtitle": "Escudo Cruz de Malta em Alto Relevo com Pedestal Bicolor & Iluminação",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • OFICIAL VASCO",
    "badge": "✦ LANÇAMENTO OFICIAL",
    "basePrice": 139.00,
    "wholesalePrice": 83.40,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 83,40 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "40% OFF",
    "materialDisplay": "PLA Tough Preto & Branco Puro • Camada 0.12mm",
    "materials": ["PLA Tough de Alta Densidade", "Pedestal Bicolor Hexagonal com Encaixe Preciso"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "19,5cm (A) × 14,0cm (L) × 8,5cm (P)",
    "weight": "210g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 139.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 111.20, "discount": "20% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 83.40, "discount": "40% OFF" }
    ],
    "description": "Escudo tridimensional oficial do Clube de Regatas Vasco da Gama modelado com a emblemática Cruz de Malta em relevo profundo. Acompanha base pedestal moderna de exposição com grafismos comemorativos e acabamento em camadas de 0.12mm fundidas na Bambu Lab A1.",
    "b2bBenefits": [
      "Item de desejo absoluto para torcedores vascaínos, colecionadores e lojas de esportes",
      "Contraste perfeito preto e branco com tolerância milimétrica de montagem",
      "Pedestal estável com acabamento premium para mesas de escritório, estantes e balcões",
      "Excelente margem de lucro para revendedores e torcidas organizadas"
    ]
  },

  # 2. SUPORTE DUPLO DE CONTROLES GAMER ATHLETICO
  {
    "id": "suporte-duplo-controles-athletico",
    "name": "Suporte Duplo de Controles Gamer - Athletico Paranaense",
    "subtitle": "Pedestal Expositor Duplo para PlayStation & Xbox com Emblema CAP em Relevo",
    "category": "tech",
    "categoryName": "Cases & Tech",
    "pumaCategory": "tech",
    "pumaCategoryLabel": "LINHA GAMER • ATHLETICO PARANAENSE",
    "badge": "✦ EDIÇÃO ESPECIAL CAP",
    "basePrice": 129.00,
    "wholesalePrice": 74.82,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 74,82 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "42% OFF",
    "materialDisplay": "PLA Tough Preto, Vermelho Rubro-Negro & Branco",
    "materials": ["PLA Tough Resistente a Impactos", "Faixas Rubro-Negras Coextrudadas", "Emblema CAP Tridimensional"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "15,5cm (A) × 24,0cm (L) × 12,0cm (P)",
    "weight": "245g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 129.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 103.20, "discount": "20% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 74.82, "discount": "42% OFF" }
    ],
    "description": "Suporte expositor duplo de controles gamer projetado com a identidade do Athletico Paranaense. Acomoda com firmeza dois controles de PlayStation (PS4/PS5) ou Xbox Series/One. Base geométrica com as icônicas quatro faixas rubro-negras e monograma CAP em alto relevo.",
    "b2bBenefits": [
      "Compatibilidade universal com controles de PS5 DualSense, PS4, Xbox e Nintendo Switch Pro",
      "Organiza o setup gamer com visual agressivo e acabamento de grife",
      "Personalizável também com logotipos de outros times sob encomenda B2B",
      "Produção rápida para lojas de informática, games e quiosques de shopping"
    ]
  },

  # 3. BOLAS DE NATAL PERSONALIZADAS 3D
  {
    "id": "bolas-natal-personalizadas-3d",
    "name": "Bolas de Natal Personalizadas 3D (Nome / Família / Logo)",
    "subtitle": "Esferas Geométricas Vazadas em Silk Ouro, Rubi e Pérola com Fita de Cetim",
    "category": "natal",
    "categoryName": "Linha de Natal 3D",
    "pumaCategory": "natal",
    "pumaCategoryLabel": "🎄 NATAL 3D • PERSONALIZADO",
    "badge": "🎄 ESPECIAL DE NATAL",
    "isCustomizable": True,
    "customTag": "SEU NOME / SUA LOGO",
    "basePrice": 24.90,
    "wholesalePrice": 9.90,
    "wholesaleMinQty": 50,
    "wholesaleLabel": "R$ 9,90 un (a partir de 50 un)",
    "wholesaleDiscountPercent": "60% OFF",
    "materialDisplay": "PLA Silk Ouro Metálico, Rubi & Branco Pérola",
    "materials": ["PLA Silk com Refletividade Premium", "Fita de Cetim Nobre Inclusa"],
    "leadTime": "2 a 5 dias úteis",
    "dimensions": "8,0cm (Ø) • Esfera Vazada Geométrica",
    "weight": "28g un",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 24.90, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 29 un", "price": 18.90, "discount": "24% OFF" },
      { "min": 30, "label": "30 a 49 un", "price": 14.50, "discount": "41% OFF" },
      { "min": 50, "label": "50+ un (Atacado)", "price": 9.90, "discount": "60% OFF" }
    ],
    "description": "Bolas de Natal 3D de alto luxo com padrões geométricos vazados em renda tridimensional. Personalizadas com o nome da família, membros queridos ou a logomarca da sua empresa na faixa central. Acompanha fita de cetim acetinado pronta para pendurar na árvore.",
    "b2bBenefits": [
      "Brinde de Natal inesquecível para colaboradores, clientes VIP e celebrações familiares",
      "Brilho sedoso Silk que reflete as luzes pisca-pisca da árvore sem necessidade de pintura",
      "Estrutura leve e ultra-resistente que não quebra ao cair no chão",
      "Produção em larga escala com nomes individuais sem custo adicional"
    ]
  },

  # 4. ÁRVORE DE NATAL GEOMÉTRICA ESPIRAL
  {
    "id": "arvore-natal-geometrica-espiral",
    "name": "Árvore de Natal Geométrica Espiral 3D Dobrável",
    "subtitle": "Design Paramétrico Contemporâneo em PLA Silk Ouro & Esmeralda com Estrela",
    "category": "natal",
    "categoryName": "Linha de Natal 3D",
    "pumaCategory": "natal",
    "pumaCategoryLabel": "🎄 NATAL 3D • DESIGN PARAMÉTRICO",
    "badge": "🎄 EXCLUSIVIDADE IMR",
    "basePrice": 99.00,
    "wholesalePrice": 59.40,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 59,40 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "40% OFF",
    "materialDisplay": "PLA Silk Bicolor Verde Esmeralda & Ouro Nobre",
    "materials": ["PLA Silk Alta Densidade", "Estrela Topo Geométrica Facetada"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "26,0cm (A) × 13,5cm (Ø Base)",
    "weight": "165g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 99.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 79.20, "discount": "20% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 59.40, "discount": "40% OFF" }
    ],
    "description": "Árvore de Natal de mesa com arquitetura paramétrica em espiral helicoidal. As aletas anguladas criam um jogo elegante de luz e sombras sobre mesas, bancadas de recepção e aparadores. Estrela do topo vazada em facetas poliédricas de ouro.",
    "b2bBenefits": [
      "Decoração de Natal moderna, minimalista e sofisticada que foge do tradicional",
      "Ocupa pouco espaço com presença visual marcante em mesas de escritório e consultórios",
      "Acabamento Silk bimetálico que não desbota e dura por muitos Natais",
      "Presente de fim de ano requintado para clientes corporativos de alto padrão"
    ]
  },

  # 5. GUIRLANDA DE NATAL 3D DECORATIVA
  {
    "id": "guirlanda-natal-geometrica-3d",
    "name": "Guirlanda de Natal 3D Decorativa com Placa Personalizada",
    "subtitle": "Folhagens Low-Poly em Relevo, Bagas Rubras, Laço Nobre e Placa Boas Festas",
    "category": "natal",
    "categoryName": "Linha de Natal 3D",
    "pumaCategory": "natal",
    "pumaCategoryLabel": "🎄 NATAL 3D • GUIRLANDA LUXO",
    "badge": "🎄 LANÇAMENTO DE NATAL",
    "isCustomizable": True,
    "customTag": "PLACA PERSONALIZADA",
    "basePrice": 149.00,
    "wholesalePrice": 89.40,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 89,40 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "40% OFF",
    "materialDisplay": "PLA Matte Verde Pinheiro, Vermelho Carmesim & Mogno",
    "materials": ["PLA Premium Multi-Cores", "Placa de Boas Festas ou Nome da Família", "Passador Traseiro de Parede/Porta"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "28,0cm (Ø) × 4,5cm (E)",
    "weight": "340g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 149.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 119.20, "discount": "20% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 89.40, "discount": "40% OFF" }
    ],
    "description": "Guirlanda decorativa para portas de entrada e halls com estética geométrica contemporânea. Ramos facetados em verde pinheiro, bagas vermelhas com brilho acentuado, laço tridimensional encorpado e placa central personalizada com gravação permanente.",
    "b2bBenefits": [
      "Primeira impressão acolhedora e natalina para residências e portas corporativas",
      "Não deforma nem solta galhos como guirlandas sintéticas comuns",
      "Possibilidade de gravar o logotipo da empresa na placa central para recepções",
      "Embalagem reforçada à prova de choque para envio seguro para todo o Brasil"
    ]
  },

  # 6. PORTA-BATOM NIVEA MORANGO SHINE
  {
    "id": "porta-batom-nivea-morango-shine",
    "name": "Porta-Batom Nivea Morango Shine & Cosméticos 3D",
    "subtitle": "Organizador de Mesa Temático Morango com Encaixe Sob Medida para Lip Balm Nivea",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "LINHA FEMININA • COSMÉTICOS",
    "badge": "✦ LINHA FEMININA",
    "isCustomizable": True,
    "customTag": "GRAVAÇÃO DO SEU NOME",
    "basePrice": 34.90,
    "wholesalePrice": 18.50,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 18,50 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "47% OFF",
    "materialDisplay": "PLA Matte Rosa Pastel & Vermelho Morango",
    "materials": ["PLA Silk & Matte", "Berço Cilíndrico com Encaixe Preciso para Nivea Shine"],
    "leadTime": "2 a 3 dias úteis",
    "dimensions": "6,5cm (A) × 6,0cm (L) × 6,0cm (P)",
    "weight": "42g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 34.90, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 19 un", "price": 24.50, "discount": "30% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 18.50, "discount": "47% OFF" }
    ],
    "description": "Suporte delicado e funcional esculpido especialmente para acomodar o hidratante labial Nivea Morango Shine e cosméticos de bolso. Design fofo com relevos florais e formato de moranguinho com base antiderrapante.",
    "b2bBenefits": [
      "Sucesso absoluto nas redes sociais (TikTok e Instagram) e presente ideal para público feminino",
      "Mantém o batom sempre em pé na penteadeira sem risco de rolar ou cair",
      "Ótimo brinde para clínicas de estética, salões de beleza, farmácias e lojas de cosméticos",
      "Custo unitário acessível com alta margem de revenda"
    ]
  },

  # 7. PORTA-JOIAS FLOR DE LÓTUS MINIMALISTA
  {
    "id": "porta-joias-flor-lotus-minimalista",
    "name": "Porta-Joias Floral Flor de Lótus Minimalista 3D",
    "subtitle": "Pétalas Articuladas em Camadas com Berços Aveludados para Anéis e Colares",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "LINHA FEMININA • PORTA-JOIAS",
    "badge": "✦ DESIGN FLORAL LUXO",
    "basePrice": 89.00,
    "wholesalePrice": 49.90,
    "wholesaleMinQty": 15,
    "wholesaleLabel": "R$ 49,90 un (a partir de 15 un)",
    "wholesaleDiscountPercent": "44% OFF",
    "materialDisplay": "PLA Matte Rosa Blush & Branco Marfim",
    "materials": ["PLA Tough Acabamento Acetinado", "Compartimentos Escalonados"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "15,0cm (Ø Aberto) × 8,5cm (A)",
    "weight": "175g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 89.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 14 un", "price": 68.50, "discount": "23% OFF" },
      { "min": 15, "label": "15+ un (Atacado)", "price": 49.90, "discount": "44% OFF" }
    ],
    "description": "Porta-joias de estética refinada em formato de flor de lótus desabrochada. O miolo superior possui ranhuras almofadadas para anéis e brincos, enquanto as pétalas inferiores formam bandejas côncavas para correntes, pulseiras e relógios.",
    "b2bBenefits": [
      "Design escultural que embeleza quartos, closets e penteadeiras de luxo",
      "Organiza joias finas sem riscar ou embaraçar fios de ouro e prata",
      "Presente marcante para datas comemorativas: Dia das Mães, Natal e Aniversários",
      "Rentabilidade expressiva para lojas de presentes criativos e joalherias"
    ]
  },

  # 8. ORGANIZADOR DE PINCÉIS E CUIDADOS PESSOAIS
  {
    "id": "organizador-pinceis-cuidados-pessoais",
    "name": "Organizador Cilíndrico Canelado de Pincéis & Cuidados Pessoais 3D",
    "subtitle": "Arquitetura Estriada em Degraus para Pincéis de Maquiagem, Séruns e Perfumes",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "LINHA FEMININA • BANCADA",
    "badge": "✦ LINHA BANCADA LUXO",
    "basePrice": 79.00,
    "wholesalePrice": 44.50,
    "wholesaleMinQty": 15,
    "wholesaleLabel": "R$ 44,50 un (a partir de 15 un)",
    "wholesaleDiscountPercent": "44% OFF",
    "materialDisplay": "PLA Matte Rosé Gold & Off-White Fluted",
    "materials": ["PLA Resistente com Textura Canelada", "7 Nichos de Alturas Diferentes"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "18,5cm (L) × 18,5cm (P) × 12,0cm (A)",
    "weight": "260g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 79.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 14 un", "price": 59.90, "discount": "24% OFF" },
      { "min": 15, "label": "15+ un (Atacado)", "price": 44.50, "discount": "44% OFF" }
    ],
    "description": "Organizador moderno inspirado na tendência de design canelado fluted. Estrutura escalonada em múltiplos cilindros de alturas distintas para organizar ordenadamente pincéis de base, delineadores, batons, hidratantes e séruns faciais.",
    "b2bBenefits": [
      "Tendência contemporânea de decoração com alta demanda entre blogueiras e maquiadoras",
      "Sete nichos dedicados que mantêm cosméticos de diferentes tamanhos sempre visíveis",
      "Fácil de lavar e resistente à umidade de bancadas de banheiro",
      "Excelente para composição de kits corporativos femininos"
    ]
  },

  # 9. COPO TEMÁTICO 3D HOMEM-ARANHA (SPIDER-MAN)
  {
    "id": "copo-3d-homem-aranha",
    "name": "Copo Temático 3D Homem-Aranha (Spider-Man)",
    "subtitle": "Copo com Luva Protetora em TPU Bicolor com Máscara e Teias em Alto Relevo 3D",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "COPOS & GEEK • SPIDER-MAN",
    "badge": "✦ GEEK HEROES",
    "basePrice": 99.00,
    "wholesalePrice": 54.90,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 54,90 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "45% OFF",
    "materialDisplay": "PLA Tough / TPU Emborrachado Bicolor • Tampa com Trava",
    "materials": ["Corpo Rígido em PLA Tough Alimentício", "Luva Protetora TPU com Textura Teia", "Tampa Anatômica"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "18,0cm (A) × 8,8cm (Ø) • Capacidade 480ml",
    "weight": "285g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 99.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 19 un", "price": 74.90, "discount": "24% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 54.90, "discount": "45% OFF" }
    ],
    "description": "Copo temático premium com luva geométrica tridimensional esculpida com a icônica máscara do Homem-Aranha e textura de teias em relevo táctil. Produzido com precisão milimétrica na Bambu Lab A1, com fundo branco puro.",
    "b2bBenefits": [
      "Design exclusivo que chama atenção imediata do público geek, jovem e colecionador",
      "Luva em TPU com grip anatômico que protege contra batidas e quedas",
      "Tampa segura com bocal anti-respingo",
      "Produto campeão de vendas em datas comemorativas e convenções"
    ]
  },

  # 10. COPOS TEMÁTICOS 3D DE TIMES DE FUTEBOL
  {
    "id": "copo-3d-times-futebol",
    "name": "Copos Temáticos 3D de Times de Futebol (Vasco, Athletico, Flamengo e Mais)",
    "subtitle": "Porta-Lata / Copo Temático com Escudo Oficial Tridimensional em Relevo e Grip Ergonômico",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "COPOS & ESPORTES • TIMES DE FUTEBOL",
    "badge": "✦ EDIÇÃO FUTEBOL VIP",
    "isCustomizable": True,
    "customTag": "ESCOLHA SEU TIME",
    "basePrice": 95.00,
    "wholesalePrice": 52.00,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 52,00 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "45% OFF",
    "materialDisplay": "PLA Tough Bicolor nas Cores do Clube • Relevo Multi-Cores",
    "materials": ["PLA Tough Alta Densidade", "Escudo do Time em Relevo Coextrudado", "Tampa Segura"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "17,5cm (A) × 8,5cm (Ø) • Capacidade 470ml",
    "weight": "270g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 95.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 19 un", "price": 72.00, "discount": "24% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 52.00, "discount": "45% OFF" }
    ],
    "description": "Linha oficial de copos temáticos e porta-latas dos maiores clubes de futebol do Brasil: Vasco da Gama, Athletico Paranaense, Flamengo, Palmeiras, Corinthians, São Paulo, Grêmio e Coritiba. Apresenta o escudo do seu clube do coração com relevo tátil impecável.",
    "b2bBenefits": [
      "Altíssima procura o ano inteiro em dias de jogos, churrascos e comemorações",
      "Cores autênticas de cada equipe fundidas camada por camada sem pintura frágil",
      "Opção de personalização com nome do torcedor gravado a laser 3D",
      "Lotes sob demanda para lojas de torcida, atléticas universitárias e bares"
    ]
  },

  # 11. DRAGÃO ARTICULADO 3D SENSORIAL (FIDGET)
  {
    "id": "dragao-articulado-3d-fidget",
    "name": "Dragão Articulado 3D Sensorial Fidget Toy (Print-in-Place)",
    "subtitle": "Escultura Articulada Flexível de Alta Resistência em PLA Silk Bicolor Sem Montagem",
    "category": "brinquedos",
    "categoryName": "Brinquedos & Crianças",
    "pumaCategory": "brinquedos",
    "pumaCategoryLabel": "BRINQUEDOS 3D • SENSORIAL FIDGET",
    "badge": "✦ SUCESSO INFANTIL",
    "basePrice": 69.00,
    "wholesalePrice": 34.50,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 34,50 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "50% OFF",
    "materialDisplay": "PLA Silk Dual-Color Roxo & Ouro Metálico",
    "materials": ["PLA Silk Bicolor Coextrusão", "Articulações Print-in-Place Sem Montagem"],
    "leadTime": "2 a 3 dias úteis",
    "dimensions": "45,0cm (Comprimento estendido) × 4,5cm (L)",
    "weight": "135g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 69.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 19 un", "price": 49.00, "discount": "29% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 34.50, "discount": "50% OFF" }
    ],
    "description": "Dragão articulado de cristal impresso de uma só vez na mesa (print-in-place) com dezenas de vértebras móveis. Movimento serpentino hipnotizante e sensorial, perfeito para alívio de estresse, brincadeiras criativas e decoração de mesas e prateleiras.",
    "b2bBenefits": [
      "Febre de vendas mundial entre crianças, jovens e colecionadores de fantasia",
      "Não possui peças soltas coladas: juntas fundidas diretamente na impressão de alta tolerância",
      "Efeito de cor camaleão Silk que muda de tonalidade conforme o ângulo da luz",
      "Excelente custo-benefício com giro instantâneo em feiras e lojas de brinquedos"
    ]
  },

  # 12. ROBÔ ARTICULADO MODULAR INFANTIL
  {
    "id": "robo-modular-articulado-infantil",
    "name": "Robô Articulado Modular Infantil 3D",
    "subtitle": "Robô com Juntas Esféricas de Encaixe Snap-Fit e Acessórios Intercambiáveis",
    "category": "brinquedos",
    "categoryName": "Brinquedos & Crianças",
    "pumaCategory": "brinquedos",
    "pumaCategoryLabel": "BRINQUEDOS 3D • EDUCATIVO & MODULAR",
    "badge": "✦ EDUCATIVO & MODULAR",
    "basePrice": 79.00,
    "wholesalePrice": 39.90,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 39,90 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "49% OFF",
    "materialDisplay": "PLA Tough Cores Vivas (Azul Ciano, Amarelo Solar & Branco)",
    "materials": ["PLA Atóxico e Resistente", "Juntas Esféricas Ball-Joints com Pressão Ajustada"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "17,0cm (A) × 10,0cm (L) × 5,5cm (P)",
    "weight": "150g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 79.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 19 un", "price": 55.00, "discount": "30% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 39.90, "discount": "49% OFF" }
    ],
    "description": "Figura mecha de ação montável com juntas esféricas nos braços, pernas, tronco e cabeça. Permite criar dezenas de poses dinâmicas de herói. Peças modulares desmontáveis que estimulam a coordenação motora e criatividade infantil.",
    "b2bBenefits": [
      "Brinquedo pedagógico e criativo livre de substâncias nocivas (PLA biodegradável e atóxico)",
      "Encaixes por fricção duráveis que não quebram mesmo em brincadeiras ativas",
      "Possibilidade de criar variantes de cores para séries colecionáveis",
      "Sucesso de vendas para o Dia das Crianças e presentes de aniversário"
    ]
  },

  # 13. PORTA-CHAVES GM CELTA 2002
  {
    "id": "porta-chaves-celta-2002",
    "name": "Porta-Chaves de Parede Traseira GM Celta 2002 3D",
    "subtitle": "Réplica Fiel em Escala com Lanternas Bicolor, Letreiros Celta e 4 Ganchos de Aço",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "UTILIDADES • LINHA AUTOMOTIVA",
    "badge": "✦ LANÇAMENTO AUTOMOTIVO",
    "basePrice": 89.00,
    "wholesalePrice": 48.95,
    "wholesaleMinQty": 15,
    "wholesaleLabel": "R$ 48,95 un (a partir de 15 un)",
    "wholesaleDiscountPercent": "45% OFF",
    "materialDisplay": "PLA Tough Prata Metálico, Preto Fosco & Vermelho Freio",
    "materials": ["PLA Resistente Automotivo", "4 Ganchos Ocultos Reforçados", "Fita Dupla Face 3M Inclusa"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "20,0cm (L) × 8,5cm (A) × 3,5cm (P)",
    "weight": "160g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 89.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 14 un", "price": 68.00, "discount": "24% OFF" },
      { "min": 15, "label": "15+ un (Atacado)", "price": 48.95, "discount": "45% OFF" }
    ],
    "description": "Porta-chaves de parede escultural reproduzindo nos mínimos detalhes a traseira nostálgica do GM Celta 2002. Possui lanternas bicolores vermelhas e âmbar, placa em baixo relevo, vidro traseiro em preto piano e 4 ganchos resistentes.",
    "b2bBenefits": [
      "Produto viral entre entusiastas automotivos, mecânicas, auto centers e fãs de carros clássicos",
      "Fixação ultra-simples por fita dupla face de alta aderência ou parafusos ocultos",
      "Suporta múltiplos molhos de chaves pesados sem envergar",
      "Excelente brinde para concessionárias e lojas de autopeças"
    ]
  },

  # 14. BONECO RENNAN SENTADO NO VASO
  {
    "id": "boneco-rennan-sentado-vaso",
    "name": "Mascote Rennan Sentado no Vaso Sanitário 3D (Edição Humor)",
    "subtitle": "Escultura Modular Multipeças 4 Cores AMS Bambu Lab com Óculos e Base Detalhada",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • HUMOR & MEME",
    "badge": "✦ MEME & HUMOR VIP",
    "basePrice": 139.00,
    "wholesalePrice": 80.62,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 80,62 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "42% OFF",
    "materialDisplay": "PLA Multi-Cores 4 Tons Bambu Lab A1",
    "materials": ["PLA Premium Multi-Cores", "Peças Modulares com Encaixe Macho-Fêmea 0.15mm"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "16,0cm (A) × 11,5cm (L) × 10,0cm (P)",
    "weight": "210g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 139.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 109.00, "discount": "22% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 80.62, "discount": "42% OFF" }
    ],
    "description": "Edição especial comemorativa e divertida do personagem Rennan sentado no vaso sanitário com pose cômica e descontraída. Modelado com óculos de grau em relevo, barba esculpida, cueca personalizada e vaso sanitário com textura de cerâmica brilhante.",
    "b2bBenefits": [
      "Presente icônico para brincadeiras entre amigos, formaturas e troféu de 'inimigo secreto'",
      "Construção modular com separação cromática limpa e sem falhas de pintura",
      "Base estável que fica perfeita sobre mesas de trabalho e estantes",
      "Altíssimo engajamento como peça promocional de humor e descontração"
    ]
  },

  # 15. COPO NITRO NOS MONSTER ENERGY
  {
    "id": "copo-3d-nitro-monster",
    "name": "Copo Temático 3D Nitro NOS Monster Energy",
    "subtitle": "Porta-Lata e Copo Estilo Cilindro NOS Nitro com Válvulas e Logotipo em Relevo",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "COPOS & MOTORSPORT • TUNING SPEED",
    "badge": "✦ EDIÇÃO TUNING SPEED",
    "basePrice": 99.00,
    "wholesalePrice": 54.90,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 54,90 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "45% OFF",
    "materialDisplay": "PETG Azul Elétrico NOS & Verde Limão Monster",
    "materials": ["PETG Resistente a Impactos e Líquidos", "Válvulas Réplica de Cilindro de Óxido Nitroso"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "19,0cm (A) × 8,2cm (Ø) • Capacidade 500ml",
    "weight": "290g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 99.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 19 un", "price": 74.90, "discount": "24% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 54.90, "discount": "45% OFF" }
    ],
    "description": "Porta-lata e copo temático inspirado nas corridas de arrancada e cultura tuning. Réplica de cilindro de nitro NOS azul elétrico com garras verdes e logo Monster Energy em alto relevo tridimensional. A tampa imita as válvulas de alta pressão com manômetro.",
    "b2bBenefits": [
      "Atração instantânea em encontros automotivos, track days, oficinas e lojas de acessórios",
      "Paredes espessas em PETG que garantem ótima durabilidade estrutural e proteção",
      "Encaixa perfeitamente em latas de energéticos Monster e refrigerantes padrão",
      "Produto de alto valor agregado com grande apelo de coleção"
    ]
  },

  # 16. SANTAS NOSSA SENHORA DE FÁTIMA 20CM
  {
    "id": "santas-nossa-senhora-fatima-3d",
    "name": "Imagem Sacra Nossa Senhora de Fátima 3D (20cm)",
    "subtitle": "Escultura Sacra em Alta Definição com Coroa de Raios Dourada e Acabamento Seda",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • LINHA SACRA DEVOCIONAL",
    "badge": "✦ LINHA SACRA DEVOCIONAL",
    "basePrice": 119.00,
    "wholesalePrice": 69.90,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 69,90 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "41% OFF",
    "materialDisplay": "PLA Branco Seda Marfim & Coroa Ouro Metálico",
    "materials": ["PLA Silk Marfim Devocional", "Coroa com Raios Dourados Destacável", "Base Rocha Nuvem"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "20,0cm (A) × 8,5cm (L) × 7,0cm (P)",
    "weight": "190g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 119.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 89.90, "discount": "24% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 69.90, "discount": "41% OFF" }
    ],
    "description": "Escultura de arte sacra com manto fluido em dobras suaves e mãos postas em oração. Impressa em PLA seda branco marfim que confere aspecto de mármore acetinado. Acompanha coroa de glória com raios em ouro reluzente.",
    "b2bBenefits": [
      "Presente de fé e devoção de profunda comoção para mães, avós, capelas e eventos religiosos",
      "Superfície acetinada de altíssima definição que dispensa pintura artesanal",
      "Não lasca nem quebra facilmente como imagens convencionais de gesso",
      "Demanda perene com forte aquecimento nas épocas de Páscoa, Dia das Mães e Natal"
    ]
  },

  # 17. MILES MORALES SPIDER-VERSE
  {
    "id": "action-figure-miles-morales",
    "name": "Action Figure Miles Morales Spider-Verse",
    "subtitle": "Escultura Colecionável de Alta Definição Camada 0.12mm",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • MULTICOR",
    "badge": "Colecionável VIP",
    "basePrice": 149.00,
    "wholesalePrice": 92.38,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 92,38 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "38% OFF",
    "materialDisplay": "PLA Tough Ultra HD • Camada 0.12mm",
    "materials": ["PLA Tough Ultra HD", "Resina Híbrida"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "21,0cm (A) × 13,5cm (L) × 11,0cm (P)",
    "weight": "240g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 149.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 126.65, "discount": "15% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 92.38, "discount": "38% OFF" }
    ],
    "description": "Estatueta colecionável com pose dinâmica inspirada no salto sobre a cidade. Modelagem com alta definição de teias, texturas da jaqueta e tênis estilizados. Base personalizada com estabilidade perfeita e acabamento impecável em fundo branco puro.",
    "b2bBenefits": [
      "Produto de altíssimo valor percebido para lojas geek e colecionadores",
      "Resolução de camada de 0.12mm com linhas de impressão ultra-suaves",
      "Embalagem reforçada à prova de impacto para transporte seguro",
      "Excelente para revenda especializada e presentes VIP"
    ]
  },

  # 18. ANIME & GAMES EXCLUSIVA
  {
    "id": "action-figure-anime-games",
    "name": "Action Figure Anime & Games Exclusiva",
    "subtitle": "Escultura de Personagens Épicos com Base Temática em Fundo Branco",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • ANIME",
    "badge": "Lançamento Geek",
    "basePrice": 159.00,
    "wholesalePrice": 98.50,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 98,50 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "38% OFF",
    "materialDisplay": "PLA Silk Ultra HD / Resina • 0.12mm",
    "materials": ["PLA Silk Alta Definição", "Resina Fotopolímero"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "20,0cm (A) × 12,5cm (L) × 10,0cm (P)",
    "weight": "220g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 159.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 135.15, "discount": "15% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 98.50, "discount": "38% OFF" }
    ],
    "description": "Figures colecionáveis de animes, mangás e jogos icônicos. Detalhamento milimétrico em expressões, vestimentas e armas, com suporte reforçado e base personalizada diorama em acrílico cristal.",
    "b2bBenefits": [
      "Atende o crescente mercado geek e colecionador",
      "Impressão precisa com tolerância milimétrica na Bambu Lab A1",
      "Variedade de personagens sob demanda para sua loja",
      "Margem de lucro atrativa para lojistas e revendedores"
    ]
  },

  # 19. BONECO RENNAN PARAQUEDISTA
  {
    "id": "boneco-rennan-paraquedista",
    "name": "Boneco Personalizado 3D (Sua Marca / Seu Personagem)",
    "subtitle": "Escultura Modular Multipeças com Pose Dinâmica e Base Nuvem",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • PERSONALIZADO",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 139.00,
    "wholesalePrice": 80.62,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 80,62 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "42% OFF",
    "materialDisplay": "PLA Multi-Cores 4 Tons Bambu",
    "materials": ["PLA Premium Multi-Cores", "Encaixes Tolerância 0.15mm"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "16,0cm (A) × 12,0cm (L) × 10,5cm (P)",
    "weight": "195g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 139.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 19 un", "price": 111.20, "discount": "20% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 80.62, "discount": "42% OFF" }
    ],
    "description": "Modelo colecionável modular produzido com engenharia de tolerância milimétrica. Cores autênticas fundidas camada por camada, base estilizada em formato de nuvem com estabilidade estrutural máxima.",
    "b2bBenefits": [
      "Criação de mascotes exclusivos para campanhas de marketing",
      "Totalmente modular: peças separadas por cor sem falhas visuais",
      "Excelente para premiações internas e celebrações de metas",
      "Produção rápida para eventos corporativos"
    ]
  },

  # 20. BONECO FUNKO MÉDICA PROFISSÕES
  {
    "id": "boneco-funko-medica",
    "name": "Boneco Personalizado 3D Profissões (Sua Marca Aqui)",
    "subtitle": "Estilo Funko Pop Customizado com Uniforme e Logotipo da Empresa",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • PROFISSÕES",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 129.00,
    "wholesalePrice": 74.82,
    "wholesaleMinQty": 25,
    "wholesaleLabel": "R$ 74,82 un (a partir de 25 un)",
    "wholesaleDiscountPercent": "42% OFF",
    "materialDisplay": "PLA Multi-Cores Bambu • Acabamento Fosco",
    "materials": ["PLA Silk & Matte", "Resina HD nos Detalhes"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "12,0cm (A) × 8,5cm (L) × 7,5cm (P)",
    "weight": "140g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 129.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 24 un", "price": 103.20, "discount": "20% OFF" },
      { "min": 25, "label": "25+ un (Atacado)", "price": 74.82, "discount": "42% OFF" }
    ],
    "description": "Homenagem em miniatura para médicos, enfermeiros, engenheiros, advogados e equipes corporativas. Roupas nas cores da empresa ou hospital, com crachá ou jaleco personalizado com a SUA MARCA AQUI.",
    "b2bBenefits": [
      "Presente inesquecível de Dia dos Médicos, Formaturas e Confraternizações",
      "Uniforme, jaleco e acessórios com a logo da SUA EMPRESA",
      "Escala compacta de 12cm perfeita para mesas e consultórios",
      "Preços especiais para clínicas, hospitais e escritórios"
    ]
  },

  # 21. CHAVEIRO TIMELION 3D
  {
    "id": "chaveiro-timelion-3d",
    "name": "Chaveiro 3D Personalizado (Sua Marca Aqui)",
    "subtitle": "Em Relevo Tridimensional com Argola Inox Italiana",
    "category": "chaveiros",
    "categoryName": "Chaveiros & Brindes",
    "pumaCategory": "chaveiros",
    "pumaCategoryLabel": "CHAVEIROS & BRINDES • 3D",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 18.00,
    "wholesalePrice": 4.50,
    "wholesaleMinQty": 100,
    "wholesaleLabel": "R$ 4,50 un (a partir de 100 un)",
    "wholesaleDiscountPercent": "75% OFF",
    "materialDisplay": "PLA Tough Alta Densidade • 4 Cores",
    "materials": ["PLA Tough Ultra Resistente", "Argola Inox 25mm com Corrente"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "5,5cm (L) × 4,5cm (A) × 0,45cm (E)",
    "weight": "14g",
    "discountTiers": [
      { "min": 1, "label": "1 a 19 un", "price": 18.00, "discount": "Preço Padrão" },
      { "min": 20, "label": "20 a 49 un", "price": 9.90, "discount": "45% OFF" },
      { "min": 50, "label": "50 a 99 un", "price": 6.50, "discount": "64% OFF" },
      { "min": 100, "label": "100+ un (Atacado)", "price": 4.50, "discount": "75% OFF" }
    ],
    "description": "Chaveiro corporativo premium com modelagem em relevo volumétrico da SUA MARCA AQUI. Argola em aço inox padrão italiano. Não descasca nem desbota por ser fundido em cores puras na Bambu Lab.",
    "b2bBenefits": [
      "Brinde de custo unitário a partir de R$ 4,50 com valor percebido de loja",
      "Relevo tridimensional nítido que destaca a marca no dia a dia do cliente",
      "Resistência mecânica a quedas e uso contínuo em bolsos e bolsas",
      "Capacidade produtiva de centenas de unidades por dia"
    ]
  },

  # 22. CHAVEIRO LOGO BICOLOR
  {
    "id": "chaveiro-logo-imr-3d",
    "name": "Chaveiro Logo Bicolor (Sua Marca Aqui)",
    "subtitle": "Acabamento Alto Contraste Bicolor com Base Chanfrada",
    "category": "chaveiros",
    "categoryName": "Chaveiros & Brindes",
    "pumaCategory": "chaveiros",
    "pumaCategoryLabel": "CHAVEIROS & BRINDES • BICOLOR",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 16.00,
    "wholesalePrice": 4.20,
    "wholesaleMinQty": 100,
    "wholesaleLabel": "R$ 4,20 un (a partir de 100 un)",
    "wholesaleDiscountPercent": "74% OFF",
    "materialDisplay": "PLA Tough Preto & Branco Fosco",
    "materials": ["PLA Tough Bicolor", "Argola com Trava Reforçada"],
    "leadTime": "2 a 3 dias úteis",
    "dimensions": "5,0cm (L) × 4,0cm (A) × 0,40cm (E)",
    "weight": "12g",
    "discountTiers": [
      { "min": 1, "label": "1 a 19 un", "price": 16.00, "discount": "Preço Padrão" },
      { "min": 20, "label": "20 a 49 un", "price": 8.90, "discount": "44% OFF" },
      { "min": 50, "label": "50 a 99 un", "price": 5.90, "discount": "63% OFF" },
      { "min": 100, "label": "100+ un (Atacado)", "price": 4.20, "discount": "74% OFF" }
    ],
    "description": "Design moderno com bordas chanfradas e tipografia em alto relevo contrastante. Ideal para concessionárias, imobiliárias, academias e eventos corporativos que buscam um brinde elegante e durável com a SUA MARCA AQUI.",
    "b2bBenefits": [
      "Design geométrico moderno com acabamento tátil de alto padrão",
      "Entrega ultra-rápida mesmo para lotes de grande volume",
      "Gravação em alto relevo com durabilidade permanente",
      "Excelente retorno sobre investimento para branding da empresa"
    ]
  },

  # 23. KIT CHAVEIROS CORPORATIVOS B2B
  {
    "id": "kit-chaveiros-corporativos-b2b",
    "name": "Kit Chaveiros Corporativos B2B (Sua Marca Aqui)",
    "subtitle": "Lote Especial com Embalagem Individual e Tag de Apresentação",
    "category": "chaveiros",
    "categoryName": "Chaveiros & Brindes",
    "pumaCategory": "chaveiros",
    "pumaCategoryLabel": "CHAVEIROS & BRINDES • B2B ESCALA",
    "badge": "✦ LOTE B2B PROMOCIONAL",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 14.00,
    "wholesalePrice": 3.90,
    "wholesaleMinQty": 200,
    "wholesaleLabel": "R$ 3,90 un (a partir de 200 un)",
    "wholesaleDiscountPercent": "72% OFF",
    "materialDisplay": "PLA Tough Multi-Cores • Embalagem Selada",
    "materials": ["PLA Tough Resistente", "Embalagem Plástica Cristal Individual"],
    "leadTime": "3 a 6 dias úteis",
    "dimensions": "5,0cm × 4,5cm (formato conforme logo)",
    "weight": "13g un",
    "discountTiers": [
      { "min": 50, "label": "50 a 99 un", "price": 6.20, "discount": "55% OFF" },
      { "min": 100, "label": "100 a 199 un", "price": 4.80, "discount": "65% OFF" },
      { "min": 200, "label": "200+ un (Atacado VIP)", "price": 3.90, "discount": "72% OFF" }
    ],
    "description": "Solução completa para feiras de negócios, convenções e campanhas promocionais em massa. Cada chaveiro já sai embalado individualmente com saquinho adesivado pronto para distribuição para o seu cliente final.",
    "b2bBenefits": [
      "Pronto para entrega imediata em eventos, feiras e congressos",
      "Apresentação premium com saquinho selado de alta transparência",
      "Custo unitário imbatível para grandes ações de marketing",
      "Personalização 100% fiel à identidade visual da SUA EMPRESA"
    ]
  },

  # 24. DISPLAY PLACA PIX DE BALCÃO
  {
    "id": "display-placa-pix-balcao",
    "name": "Placa PIX de Balcão (Sua Marca Aqui)",
    "subtitle": "Display Tridimensional em Ângulo com QR Code e Chave PIX",
    "category": "displays",
    "categoryName": "Displays & PDV",
    "pumaCategory": "displays",
    "pumaCategoryLabel": "DISPLAYS & PDV • QR CODE PIX",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 69.00,
    "wholesalePrice": 34.50,
    "wholesaleMinQty": 20,
    "wholesaleLabel": "R$ 34,50 un (a partir de 20 un)",
    "wholesaleDiscountPercent": "50% OFF",
    "materialDisplay": "PLA Bicolor & QR Code Alto Relevo",
    "materials": ["PLA Premium Alto Contraste", "Base Angulada 65° Antirreflexo"],
    "leadTime": "2 a 3 dias úteis",
    "dimensions": "15,0cm (A) × 11,5cm (L) × 7,0cm (P)",
    "weight": "115g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 69.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 19 un", "price": 48.30, "discount": "30% OFF" },
      { "min": 20, "label": "20+ un (Atacado)", "price": 34.50, "discount": "50% OFF" }
    ],
    "description": "Display elegante para balcões de lojas, restaurantes, consultórios e quiosques. Acomoda o logotipo da sua empresa em alto relevo colorido, QR Code do PIX e chave formatada com leitura instantânea por câmera de celular.",
    "b2bBenefits": [
      "Agiliza o pagamento no caixa e reduz filas de atendimento",
      "Aumenta a confiança do cliente com acabamento profissional moderno",
      "Gravação física do QR Code em relevo indelével",
      "Ângulo de 65 graus estudado para evitar reflexos de lâmpadas de teto"
    ]
  },

  # 25. LETREIRO LUMINOSO 3D LED
  {
    "id": "letreiro-logo-3d-led-luminoso",
    "name": "Letreiro Luminoso 3D (Sua Marca Aqui)",
    "subtitle": "Logo Volumétrico Caixa Alta com Iluminação LED Interna",
    "category": "letreiros",
    "categoryName": "Letreiros & Troféus",
    "pumaCategory": "letreiros",
    "pumaCategoryLabel": "LETREIROS & LOGOS 3D • LUMINOSO",
    "badge": "✦ IMPACTO VISUAL MÁXIMO",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 249.00,
    "wholesalePrice": 161.85,
    "wholesaleMinQty": 5,
    "wholesaleLabel": "R$ 161,85 un (a partir de 5 un)",
    "wholesaleDiscountPercent": "35% OFF",
    "materialDisplay": "PETG Translúcido Difusor + LED 12V Bivolt",
    "materials": ["PETG Black & White Difusor", "Fita LED SMD Alto Brilho", "Fonte 12V Bivolt Inclusa"],
    "leadTime": "3 a 6 dias úteis",
    "dimensions": "32,0cm (L) × 24,0cm (A) × 6,0cm (P)",
    "weight": "580g",
    "discountTiers": [
      { "min": 1, "label": "1 a 2 un", "price": 249.00, "discount": "Preço Padrão" },
      { "min": 3, "label": "3 a 4 un", "price": 204.18, "discount": "18% OFF" },
      { "min": 5, "label": "5+ un (Atacado)", "price": 161.85, "discount": "35% OFF" }
    ],
    "description": "Letreiro luminoso tridimensional estilo caixa alta projetado para recepções, escritórios, estúdios de podcast e fachadas internas. A iluminação LED uniforme destaca a SUA MARCA AQUI com sofisticação total.",
    "b2bBenefits": [
      "Transforma a recepção ou o fundo de vídeo de chamadas da sua empresa",
      "Iluminação LED difusa sem pontos quentes aparentes",
      "Acompanha fonte bivolt automática e furação oculta para fixação",
      "Excelente para padronização de franquias e filiais corporativas"
    ]
  },

  # 26. TROFÉU CORPORATIVO FACETADO
  {
    "id": "trofeu-corporativo-facetado",
    "name": "Troféu Corporativo 3D (Sua Marca Aqui)",
    "subtitle": "Design Geométrico Facetado com Placa Metálica Personalizada",
    "category": "letreiros",
    "categoryName": "Letreiros & Troféus",
    "pumaCategory": "letreiros",
    "pumaCategoryLabel": "LETREIROS & LOGOS 3D • TROFÉU",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 169.00,
    "wholesalePrice": 98.02,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 98,02 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "42% OFF",
    "materialDisplay": "PLA Silk Ouro / Bronze / Platina",
    "materials": ["PLA Silk Alta Refletividade", "Base Pesada com Lastro Interno"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "24,0cm (A) × 11,0cm (L) × 9,5cm (P)",
    "weight": "320g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 169.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 135.20, "discount": "20% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 98.02, "discount": "42% OFF" }
    ],
    "description": "Troféu com estética geométrica de facetas que refletem a iluminação ambiente. Ideal para premiações anuais de vendedores, homenagens por tempo de casa, torneios esportivos ou eventos de tecnologia corporativa.",
    "b2bBenefits": [
      "Brilho metálico sedoso Silk que dispensa pintura química",
      "Gravação do nome do premiado e logotipo da SUA EMPRESA",
      "Base com lastro interno que confere peso e sensação de luxo ao segurar",
      "Lotes sob medida com nomes individuais impressos sem taxa extra"
    ]
  },

  # 27. CAPAS DE CELULAR MAGSAFE HONEYCOMB
  {
    "id": "capa-celular-magsafe-honeycomb",
    "name": "Capas de Celular MagSafe 3D (Sua Marca Aqui)",
    "subtitle": "Estrutura Honeycomb em TPU Antishock com Grip Anatômico",
    "category": "tech",
    "categoryName": "Cases & Tech",
    "pumaCategory": "tech",
    "pumaCategoryLabel": "CASES & TECH • MAGSAFE",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 79.00,
    "wholesalePrice": 39.50,
    "wholesaleMinQty": 30,
    "wholesaleLabel": "R$ 39,50 un (a partir de 30 un)",
    "wholesaleDiscountPercent": "50% OFF",
    "materialDisplay": "TPU Flexível 95A + PLA Tough Híbrido",
    "materials": ["TPU Flexível de Alta Densidade", "Anel de Ímãs Neodímio N52 MagSafe"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "Modelos para iPhone 13 ao 16 Pro Max e Linha Galaxy S",
    "weight": "48g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 79.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 29 un", "price": 55.30, "discount": "30% OFF" },
      { "min": 30, "label": "30+ un (Atacado)", "price": 39.50, "discount": "50% OFF" }
    ],
    "description": "Capa protetora de celular de absorção de impacto com padrão colmeia ventilado. Integra anel magnético de neodímio N52 para compatibilidade com carregadores e suportes veiculares MagSafe.",
    "b2bBenefits": [
      "Acessório tecnológico de altíssimo giro e consumo recorrente",
      "Gravação do logotipo ou nome da SUA EMPRESA no painel traseiro",
      "Proteção certificada contra quedas com reforço nos cantos",
      "Compatibilidade total com carregamento sem fio e suportes veiculares"
    ]
  },

  # 28. PORTA-COPOS & LUVAS TEMÁTICAS 3D (SUA MARCA AQUI)
  {
    "id": "porta-copos-luva-3d",
    "name": "Porta-Copos & Luva Temática 3D (Sua Marca Aqui)",
    "subtitle": "Luva Protetora Geométrica em TPU para Copos e Latas com Logo da Sua Empresa",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "COPOS & UTILIDADES • ACESSÓRIOS 3D",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 49.00,
    "wholesalePrice": 24.50,
    "wholesaleMinQty": 30,
    "wholesaleLabel": "R$ 24,50 un (a partir de 30 un)",
    "wholesaleDiscountPercent": "50% OFF",
    "materialDisplay": "TPU Flexível 95A + PLA Tough Multi-Cores",
    "materials": ["Luva em TPU Flexível Texturizado", "Grip Geométrico Antiderrapante"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "12,0cm (A) × 8,5cm (Ø) • Padrão Latas e Copos",
    "weight": "85g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 49.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 29 un", "price": 34.30, "discount": "30% OFF" },
      { "min": 30, "label": "30+ un (Atacado)", "price": 24.50, "discount": "50% OFF" }
    ],
    "description": "Luva protetora geométrica tridimensional e porta-copos com grip emborrachado anatômico. Personalizado com a SUA MARCA AQUI em alto relevo com acabamento de grife.",
    "b2bBenefits": [
      "Brinde executivo que clientes e diretores usam diariamente na mesa ou no carro",
      "Logomarca da SUA EMPRESA estampada em relevo tridimensional na luva",
      "Luva geométrica que impede condensação e protege contra batidas",
      "Design sofisticado que se destaca de brindes promocionais comuns"
    ]
  },

  # 29. ORGANIZADOR DE MESA BARBEARIA
  {
    "id": "organizador-mesa-barbearia",
    "name": "Organizadores de Bancada (Sua Marca Aqui)",
    "subtitle": "Divisórias Sob Medida com o Nome ou Logo do Seu Negócio",
    "category": "utilidades",
    "categoryName": "Copos & Utilidades",
    "pumaCategory": "utilidades",
    "pumaCategoryLabel": "COPOS & UTILIDADES • BANCADA",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 119.00,
    "wholesalePrice": 65.45,
    "wholesaleMinQty": 15,
    "wholesaleLabel": "R$ 65,45 un (a partir de 15 un)",
    "wholesaleDiscountPercent": "45% OFF",
    "materialDisplay": "PETG Antichoque • Resistente a Óleos",
    "materials": ["PETG Resistente a Impactos e Óleos", "Pés Antiderrapantes"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "28,0cm (L) × 18,0cm (P) × 7,5cm (A)",
    "weight": "360g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 119.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 14 un", "price": 92.82, "discount": "22% OFF" },
      { "min": 15, "label": "15+ un (Atacado)", "price": 65.45, "discount": "45% OFF" }
    ],
    "description": "Bandeja organizadora profissional projetada para bancadas de trabalho, clínicas e barbearias. Berços anatômicos com personalização em alto relevo com a SUA MARCA AQUI ou nome do estabelecimento.",
    "b2bBenefits": [
      "Personalizável com o nome ou logotipo do seu estabelecimento",
      "Aumenta a velocidade de atendimento e mantém o posto de trabalho impecável",
      "Resistente a respingos de água, óleos lubrificantes e álcool 70%",
      "Canaletas para passagem embutida de cabos elétricos"
    ]
  },

  # 30. MOD VOLANTE BMW LOGITECH G29
  {
    "id": "mod-volante-bmw-logitech-g29",
    "name": "Volante Fórmula 1 Mod BMW M-Power para Logitech G29 / G920 / G923",
    "subtitle": "Aro F1 GT com Empunhaduras em Azul Matte, Faceplate Vazado e Tampa BMW",
    "category": "tech",
    "categoryName": "Cases & Tech",
    "pumaCategory": "tech",
    "pumaCategoryLabel": "SIM RACING • MOD F1 LOGITECH G29",
    "badge": "✦ LANÇAMENTO SIM RACING F1",
    "isCustomizable": True,
    "customTag": "PROJETO ESPECIAL IMR",
    "basePrice": 250.00,
    "wholesalePrice": 175.00,
    "wholesaleMinQty": 5,
    "wholesaleLabel": "R$ 175,00 un (a partir de 5 un)",
    "wholesaleDiscountPercent": "30% OFF",
    "materialDisplay": "PLA Matte Preto & Azul Cobalto • Fundo Branco",
    "materials": ["PLA Matte de Alta Densidade", "Empunhaduras Anatômicas em Azul Matte", "Tampa Central BMW M-Power"],
    "leadTime": "2 a 4 dias úteis",
    "dimensions": "28,5cm (L) × 18,0cm (A) × 4,5cm (P) • Padrão F1 Real",
    "weight": "260g",
    "discountTiers": [
      { "min": 1, "label": "1 a 2 un", "price": 250.00, "discount": "Preço Padrão" },
      { "min": 3, "label": "3 a 4 un", "price": 212.50, "discount": "15% OFF" },
      { "min": 5, "label": "5+ un (Atacado VIP)", "price": 175.00, "discount": "30% OFF" }
    ],
    "description": "Mod oficial de Volante Fórmula 1 / GT para simuladores Logitech G29, G920 e G923. Estrutura rígida em PLA Matte preto com alívio de peso hexagonal, empunhaduras laterais ergonômicas em azul matte, 4 capas de botões em azul e tampa central com o logotipo da BMW.",
    "b2bBenefits": [
      "Design exatamente igual ao projeto original Bambu Lab F1 Rim",
      "Empunhaduras ergonômicas em azul matte de alta aderência",
      "Tampa central com emblema BMW e encaixes perfeitos",
      "Compatível com toda a furação e eletrônica original do Logitech"
    ]
  },

  # 31. SUPORTE CELULAR GEOMÉTRICO DE MESA
  {
    "id": "suporte-celular-geometrico-mesa",
    "name": "Suporte de Celular Anatômico para Mesa (Sua Marca Aqui)",
    "subtitle": "Design Geométrico Minimalista com Passagem Embutida de Cabo",
    "category": "tech",
    "categoryName": "Cases & Tech",
    "pumaCategory": "tech",
    "pumaCategoryLabel": "CASES & TECH • SUPORTE DE MESA",
    "badge": "✦ SUA MARCA AQUI",
    "isCustomizable": True,
    "customTag": "SUA MARCA AQUI",
    "basePrice": 39.00,
    "wholesalePrice": 19.50,
    "wholesaleMinQty": 30,
    "wholesaleLabel": "R$ 19,50 un (a partir de 30 un)",
    "wholesaleDiscountPercent": "50% OFF",
    "materialDisplay": "PLA Tough Bicolor Preto & Branco com Base Antiderrapante",
    "materials": ["PLA Tough de Alta Densidade", "Berço com Abertura para Carregador"],
    "leadTime": "2 a 3 dias úteis",
    "dimensions": "10,5cm (A) × 9,0cm (L) × 9,5cm (P)",
    "weight": "85g",
    "discountTiers": [
      { "min": 1, "label": "1 a 9 un", "price": 39.00, "discount": "Preço Padrão" },
      { "min": 10, "label": "10 a 29 un", "price": 27.30, "discount": "30% OFF" },
      { "min": 30, "label": "30+ un (Atacado)", "price": 19.50, "discount": "50% OFF" }
    ],
    "description": "Suporte de mesa ergonômico com design geométrico moderno para smartphones e tablets compactos. Mantém a tela no ângulo ideal de 65 graus para videochamadas, notificações e visualização sem cansar o pescoço. Canaleta integrada permite carregar o aparelho enquanto repousa no suporte.",
    "b2bBenefits": [
      "Brinde corporativo tecnológico de uso diário na mesa de trabalho",
      "Gravação do logotipo da SUA EMPRESA em relevo de alto contraste",
      "Compatível com todos os modelos de iPhone, Samsung Galaxy e Xiaomi",
      "Estabilidade total que não tomba ao tocar na tela"
    ]
  },

  # 32. SUPER SAIYAN WARRIOR
  {
    "id": "action-figure-anime-super-saiyan",
    "name": "Action Figure Anime Super Saiyan Warrior 3D Ultra HD",
    "subtitle": "Escultura Colecionável Épica com Efeitos de Energia e Base Rochosa",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • ANIME PREMIUM",
    "badge": "✦ LANÇAMENTO ÉPICO",
    "basePrice": 189.00,
    "wholesalePrice": 117.18,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 117,18 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "38% OFF",
    "materialDisplay": "PLA Tough Ultra HD • Camada 0.12mm • Fundo Branco",
    "materials": ["PLA Tough Ultra HD", "Resina Fotopolímero nos Efeitos de Energia"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "23,5cm (A) × 16,0cm (L) × 14,0cm (P)",
    "weight": "310g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 189.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 160.65, "discount": "15% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 117.18, "discount": "38% OFF" }
    ],
    "description": "Estatueta de grande porte inspirada nos guerreiros lendários dos animes clássicos. Apresenta pose de concentração de poder, cabelos dourados pontiagudos com alta fidelidade, músculos hiperdetalhados e base diorama de cratera de rochas vulcânicas.",
    "b2bBenefits": [
      "Peça central de destaque para vitrines, lojas geek e quartos de colecionadores",
      "Fidelidade milimétrica em expressões e dobras do quimono",
      "Embalagem especial anti-impacto com berço sob medida",
      "Margem de revenda expressiva para lojistas e e-commerces"
    ]
  },

  # 33. ESPADACHIM SAMURAI LEGEND
  {
    "id": "action-figure-anime-warrior-legend",
    "name": "Action Figure Anime Espadachim Místico 3D Ultra HD",
    "subtitle": "Guerreiro Samurai em Pose de Ataque com Espada de Chamas e Capa Fluida",
    "category": "colecionaveis",
    "categoryName": "Colecionáveis & Geek",
    "pumaCategory": "colecionaveis",
    "pumaCategoryLabel": "COLECIONÁVEL 3D • ANIME GUERREIRO",
    "badge": "✦ EDIÇÃO LIMITADA",
    "basePrice": 179.00,
    "wholesalePrice": 110.98,
    "wholesaleMinQty": 10,
    "wholesaleLabel": "R$ 110,98 un (a partir de 10 un)",
    "wholesaleDiscountPercent": "38% OFF",
    "materialDisplay": "PLA Tough Ultra HD • Resina Alta Definição",
    "materials": ["PLA Tough Ultra HD", "Resina de Engenharia"],
    "leadTime": "3 a 5 dias úteis",
    "dimensions": "22,0cm (A) × 15,0cm (L) × 13,0cm (P)",
    "weight": "280g",
    "discountTiers": [
      { "min": 1, "label": "1 a 4 un", "price": 179.00, "discount": "Preço Padrão" },
      { "min": 5, "label": "5 a 9 un", "price": 152.15, "discount": "15% OFF" },
      { "min": 10, "label": "10+ un (Atacado)", "price": 110.98, "discount": "38% OFF" }
    ],
    "description": "Guerreiro anime dinâmico com armadura detalhada em tons azul escuro e dourado, capa esculpida com sensação de vento e lâmina mística envolta em chamas brilhantes. Base circular com diorama de pedras facetadas em fundo branco puro.",
    "b2bBenefits": [
      "Acabamento digno de estátuas importadas de resina com a resistência do PLA Tough",
      "Pose dinâmica e equilíbrio estrutural perfeito no pedestal",
      "Excelente demanda no mercado de games e animes",
      "Alta rentabilidade para revenda especializada"
    ]
  }
]

# Injetar arrays de 4 imagens em todos os produtos
IMAGE_LABELS = [
  "Vista Frontal (Front)",
  "Perspectiva 3/4 (Hero)",
  "Vista Lateral (Side)",
  "Detalhe 3D / Macro (0.12mm)"
]

for prod in PRODUCTS:
  pid = prod["id"]
  imgs = [
    f"assets/images/prod_{pid}_1_front.jpg",
    f"assets/images/prod_{pid}_2_hero.jpg",
    f"assets/images/prod_{pid}_3_side.jpg",
    f"assets/images/prod_{pid}_4_detail.jpg",
  ]
  prod["images"] = imgs
  prod["gallery"] = imgs
  prod["image"] = imgs[0]
  prod["mainImage"] = imgs[0]
  prod["imageLabels"] = IMAGE_LABELS

# Categorias Puma Style com a pílula de Natal em destaque
CATEGORIES_JS = """
// Categorias Oficiais Puma Style com Destaque Especial de Natal
const PUMA_CATEGORIES = [
  { id: "all", name: "TODOS OS PRODUTOS", label: "TODOS", count: PRODUCTS_DATA.length },
  { id: "natal", name: "🎄 NATAL 3D", label: "🎄 NATAL 3D", count: PRODUCTS_DATA.filter(p => p.category === "natal" || p.pumaCategory === "natal").length },
  { id: "colecionaveis", name: "COLECIONÁVEIS", label: "COLECIONÁVEIS", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "colecionaveis").length },
  { id: "tech", name: "GAMES & TECH", label: "GAMES & TECH", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "tech").length },
  { id: "utilidades", name: "COPOS & CASA", label: "COPOS & CASA", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "utilidades").length },
  { id: "brinquedos", name: "BRINQUEDOS & GEEK", label: "BRINQUEDOS & GEEK", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "brinquedos").length },
  { id: "chaveiros", name: "CHAVEIROS & BRINDES", label: "CHAVEIROS & BRINDES", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "chaveiros").length },
  { id: "displays", name: "DISPLAYS & PDV", label: "DISPLAYS & PDV", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "displays").length },
  { id: "letreiros", name: "LETREIROS & TROFÉUS", label: "LETREIROS & TROFÉUS", count: PRODUCTS_DATA.filter(p => p.pumaCategory === "letreiros").length },
  { id: "outlet-b2b", name: "OUTLET / B2B ATACADO", label: "OUTLET / B2B ATACADO", count: PRODUCTS_DATA.filter(p => p.discountTiers && p.discountTiers.length > 1).length }
];

const CATEGORIES = PUMA_CATEGORIES;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS_DATA, CATEGORIES, PUMA_CATEGORIES };
}
"""

js_content = "/**\n" \
             " * =============================================================================\n" \
             " * IMR IMPRESSÃO 3D - CATÁLOGO OFICIAL DE PRODUTOS B2B & VAREJO\n" \
             " * Edição Especial de Natal 2026 • Design Clean Puma Style • Fundo Branco #FFFFFF\n" \
             " * Cada produto contém 4 posições padronizadas (Front, Hero 3/4, Side, Detail)\n" \
             " * =============================================================================\n" \
             " */\n\n" \
             f"const PRODUCTS_DATA = {json.dumps(PRODUCTS, indent=2, ensure_ascii=False)};\n" \
             f"{CATEGORIES_JS}\n"

with open(DEST_FULLSTACK, "w", encoding="utf-8") as f:
  f.write(js_content)

os.makedirs(os.path.dirname(DEST_LEGACY), exist_ok=True)
with open(DEST_LEGACY, "w", encoding="utf-8") as f:
  f.write(js_content)

print(f"Sucesso! {len(PRODUCTS)} produtos gerados em:")
print(f" -> {DEST_FULLSTACK}")
print(f" -> {DEST_LEGACY}")
