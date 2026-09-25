"""
=============================================================================
IMR IMPRESSÃO 3D - GERADOR DE IMAGENS DE CATÁLOGO EM 4 POSIÇÕES
Padronização: 800x800px, Fundo 100% Branco Puro (#FFFFFF), Sem Cortes Indesejados
Gera para cada produto do catálogo:
  1. Foto 1: Vista Frontal (Front)
  2. Foto 2: Vista em Perspectiva 3/4 (Hero)
  3. Foto 3: Vista Lateral / Perfil (Side)
  4. Foto 4: Vista Superior / Detalhe em Uso (Detail/Macro)
=============================================================================
"""

import os
import shutil
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

# Diretórios
BASE_DIR = r"C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao"
FULLSTACK_IMG_DIR = os.path.join(BASE_DIR, "catalogo_imr_fullstack", "public", "assets", "images")
LEGACY_IMG_DIR = os.path.join(BASE_DIR, "catalogo_imr", "assets", "images")
BRAIN_DIR = r"C:\Users\User\.gemini\antigravity-cli\brain\263646fc-74c4-4622-82eb-38ca5486bec7"

TARGET_SIZE = (800, 800)
WHITE_RGB = (255, 255, 255)

def clean_white_background(img, threshold=238):
    """
    Garante que o fundo seja 100% branco puro #FFFFFF (255, 255, 255),
    removendo vinhetas, cinzas sutis e sombras de estúdio nas bordas.
    """
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    
    data = np.array(img)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Detecção de pixels quase brancos
    is_near_white = (r >= threshold) & (g >= threshold) & (b >= threshold) & (a > 200)
    
    # Criar imagem com fundo branco puro
    bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    
    # Converter quase branco em branco puro
    data[is_near_white, 0] = 255
    data[is_near_white, 1] = 255
    data[is_near_white, 2] = 255
    data[is_near_white, 3] = 255
    
    cleaned_img = Image.fromarray(data, mode="RGBA")
    bg.paste(cleaned_img, (0, 0), cleaned_img)
    return bg.convert("RGB")

def crop_to_content(img, bg_color=WHITE_RGB, tolerance=15):
    """
    Recorta as bordas brancas vazias para focar no conteúdo principal.
    """
    arr = np.array(img)
    diff = np.abs(arr.astype(int) - np.array(bg_color))
    mask = np.any(diff > tolerance, axis=2)
    
    coords = np.argwhere(mask)
    if coords.size == 0:
        return img
    
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    
    # Adicionar pequena margem segura
    pad = 10
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(img.width, x1 + pad)
    y1 = min(img.height, y1 + pad)
    
    return img.crop((x0, y0, x1, y1))

def place_on_canvas(content_img, target_size=TARGET_SIZE, padding_ratio=0.88, offset_x=0, offset_y=0):
    """
    Redimensiona proporcionalmente a imagem do produto e centraliza no canvas 800x800 branco.
    """
    canvas = Image.new("RGB", target_size, WHITE_RGB)
    
    max_w = int(target_size[0] * padding_ratio)
    max_h = int(target_size[1] * padding_ratio)
    
    cw, ch = content_img.size
    ratio = min(max_w / cw, max_h / ch)
    new_w = max(1, int(cw * ratio))
    new_h = max(1, int(ch * ratio))
    
    resized = content_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    pos_x = (target_size[0] - new_w) // 2 + offset_x
    pos_y = (target_size[1] - new_h) // 2 + offset_y
    
    canvas.paste(resized, (pos_x, pos_y))
    return canvas

def generate_4_views(src_img_front, src_img_hero=None, src_img_side=None, src_img_detail=None):
    """
    Gera as 4 vistas padronizadas em 800x800 no fundo branco puro:
      1. Frontal (Front)
      2. Perspectiva 3/4 (Hero)
      3. Lateral / Perfil (Side)
      4. Detalhe / Macro (Detail)
    """
    # 1. Frontal
    clean_front = clean_white_background(src_img_front)
    crop_front = crop_to_content(clean_front)
    view_front = place_on_canvas(crop_front, padding_ratio=0.86)
    
    # 2. Hero (3/4 Perspective)
    if src_img_hero:
        clean_hero = clean_white_background(src_img_hero)
        crop_hero = crop_to_content(clean_hero)
        view_hero = place_on_canvas(crop_hero, padding_ratio=0.86)
    else:
        # Se não houver hero separado, cria uma vista heróica dinâmica
        hero_transformed = crop_front.rotate(-2, resample=Image.Resampling.BICUBIC, expand=True, fillcolor=WHITE_RGB)
        view_hero = place_on_canvas(hero_transformed, padding_ratio=0.88, offset_x=8)
    
    # 3. Lateral / Perfil (Side)
    if src_img_side:
        clean_side = clean_white_background(src_img_side)
        crop_side = crop_to_content(clean_side)
        view_side = place_on_canvas(crop_side, padding_ratio=0.86)
    else:
        # Simula perfil lateral através de compressão horizontal com sombreamento sutil de contorno
        w, h = crop_front.size
        side_transformed = crop_front.resize((max(1, int(w * 0.72)), h), Image.Resampling.LANCZOS)
        side_transformed = ImageOps.mirror(side_transformed)
        view_side = place_on_canvas(side_transformed, padding_ratio=0.84, offset_x=-5)
    
    # 4. Detalhe / Macro (Detail)
    if src_img_detail:
        clean_detail = clean_white_background(src_img_detail)
        crop_detail = crop_to_content(clean_detail)
        view_detail = place_on_canvas(crop_detail, padding_ratio=0.90)
    else:
        # Foca nos detalhes centrais com zoom macro
        w, h = crop_front.size
        cx, cy = w // 2, int(h * 0.45)
        zoom_w = int(w * 0.55)
        zoom_h = int(h * 0.55)
        x0 = max(0, cx - zoom_w // 2)
        y0 = max(0, cy - zoom_h // 2)
        x1 = min(w, x0 + zoom_w)
        y1 = min(h, y0 + zoom_h)
        
        detail_crop = crop_front.crop((x0, y0, x1, y1))
        enhancer = ImageEnhance.Sharpness(detail_crop)
        detail_sharp = enhancer.enhance(1.25)
        view_detail = place_on_canvas(detail_sharp, padding_ratio=0.92)
    
    return view_front, view_hero, view_side, view_detail

# Dicionário de Produtos e Fontes de Imagem
PRODUCTS_MAP = {
    # 1. Escudo Vasco 3D
    "escudo-vasco-3d": {
        "front": os.path.join(BRAIN_DIR, "vasco_3d_front_1790338115237.jpg"),
        "hero": os.path.join(BRAIN_DIR, "vasco_3d_hero_1790338133362.jpg"),
    },
    # 2. Suporte Gamer Athletico Paranaense
    "suporte-duplo-controles-athletico": {
        "front": os.path.join(BRAIN_DIR, "suporte_athletico_hero_1790338492356.jpg"),
        "hero": os.path.join(BASE_DIR, "PROJETO_SUPORTE_CONTROLE_ATHLETICO", "PREVIEW_SUPORTE_CONTROLE_ATHLETICO.png"),
    },
    # 3. Bolas de Natal Personalizadas 3D
    "bolas-natal-personalizadas-3d": {
        "front": os.path.join(BRAIN_DIR, "natal_bolas_hero_1790338154502.jpg"),
    },
    # 4. Árvore de Natal Geométrica Espiral
    "arvore-natal-geometrica-espiral": {
        "front": os.path.join(BRAIN_DIR, "natal_arvore_hero_1790338176152.jpg"),
    },
    # 5. Guirlanda de Natal 3D Decorativa
    "guirlanda-natal-geometrica-3d": {
        "front": os.path.join(BRAIN_DIR, "natal_guirlanda_hero_1790338205526.jpg"),
    },
    # 6. Porta Batom Nivea Morango Shine
    "porta-batom-nivea-morango-shine": {
        "front": os.path.join(BASE_DIR, "PROJETO_PORTA_BATOM", "PREVIEW_PORTA_BATOM_MORANGO_SHINE.png"),
        "hero": os.path.join(BASE_DIR, "PROJETO_PORTA_BATOM", "PREVIEW_PORTA_BATOM_NIVEA.png"),
    },
    # 7. Porta-Joias Floral Flor de Lótus
    "porta-joias-flor-lotus-minimalista": {
        "front": os.path.join(BRAIN_DIR, "porta_joias_lotus_hero_1790338329611.jpg"),
    },
    # 8. Organizador de Pincéis e Cuidados Pessoais
    "organizador-pinceis-cuidados-pessoais": {
        "front": os.path.join(BRAIN_DIR, "organizador_pinceis_hero_1790338369256.jpg"),
    },
    # 9. Copo Térmico Homem-Aranha Spider-Man
    "copo-termico-spiderman-3d": {
        "front": os.path.join(BRAIN_DIR, "spiderman_copo_hero_1790338231842.jpg"),
    },
    # 10. Copo Térmico Times de Futebol
    "copo-termico-times-futebol-3d": {
        "front": os.path.join(BRAIN_DIR, "copo_times_futebol_hero_1790338261712.jpg"),
    },
    # 11. Dragão Articulado 3D Sensorial (Fidget)
    "dragao-articulado-3d-fidget": {
        "front": os.path.join(BRAIN_DIR, "dragao_articulado_hero_1790338295616.jpg"),
    },
    # 12. Robô Articulado Modular Infantil
    "robo-modular-articulado-infantil": {
        "front": os.path.join(BRAIN_DIR, "robo_modular_hero_1790338410961.jpg"),
    },
    # 13. Porta Chaves GM Celta 2002
    "porta-chaves-celta-2002": {
        "front": os.path.join(BASE_DIR, "PROJETO_PORTA_CHAVES_CELTA", "PREVIEW_PORTA_CHAVES_CELTA_2002.png"),
    },
    # 14. Mascote Rennan Sentado no Vaso Sanitário
    "boneco-rennan-sentado-vaso": {
        "front": os.path.join(BASE_DIR, "PROJETO_RENNAN", "PREVIEW_RENNAN_SENTADO_COMPLETO.png"),
        "hero": os.path.join(BASE_DIR, "PROJETO_RENNAN", "PREVIEW_FINAL_RENNAN_16CM_MODULAR.png"),
    },
    # 15. Copo Nitro NOS Monster Energy 3D
    "copo-termico-nitro-monster-3d": {
        "front": os.path.join(BASE_DIR, "PROJETO_COPO_MONSTER", "PREVIEW_COPO_NOS_MONSTER_3D.png"),
    },
    # 16. Santas Nossa Senhora de Fátima 20cm
    "santas-nossa-senhora-fatima-3d": {
        "front": os.path.join(BASE_DIR, "PROJETO_SANTAS_E_RELIGIOSOS", "PREVIEW_SANTAS_20CM.png"),
    },
    # 17. Miles Morales Spider-Verse
    "action-figure-miles-morales": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_miles_morales_clean_white.png"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "prod_action_figures_imr.jpg"),
    },
    # 18. Anime & Games Exclusiva
    "action-figure-anime-games": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_anime_clean_white.png"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "prod_action_figures_imr.jpg"),
    },
    # 19. Boneco Rennan Paraquedista
    "boneco-rennan-paraquedista": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_rennan_clean_white.png"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "PREVIEW_RENNAN_MODULAR_3D.png"),
    },
    # 20. Boneco Funko Médica
    "boneco-funko-medica": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_funko_medica_clean_white.png"),
    },
    # 21. Chaveiro Timelion 3D
    "chaveiro-timelion-3d": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_chaveiro_suamarca_clean_white.png"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "prod_chaveiro_timelion.jpg"),
    },
    # 22. Chaveiro Logo Bicolor
    "chaveiro-logo-imr-3d": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "imr_foto_chaveiros_logo_1789928036453.jpg"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "imr_novo_chaveiros_1789925969908.jpg"),
    },
    # 23. Kit Chaveiros Corporativos B2B
    "kit-chaveiros-corporativos-b2b": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_chaveiros_brindes.jpg"),
    },
    # 24. Display Placa PIX de Balcão
    "display-placa-pix-balcao": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_placa_pix_suamarca.png"),
    },
    # 25. Letreiro Luminoso 3D LED
    "letreiro-logo-3d-led-luminoso": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "imr_foto_letreiro_led_imr_1789928309416.jpg"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "prod_letreiro_led_novo.jpg"),
    },
    # 26. Troféu Corporativo Facetado
    "trofeu-corporativo-facetado": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "imr_foto_trofeu_imr_1789928508709.jpg"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "prod_trofeu_personalizado.jpg"),
    },
    # 27. Capa Celular MagSafe
    "capa-celular-magsafe-honeycomb": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_card_cases_magsafe.png"),
    },
    # 28. Copos Térmicos Luva 3D
    "copos-termicos-luva-3d": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "imr_foto_copos_3d_1789928215558.jpg"),
        "hero": os.path.join(FULLSTACK_IMG_DIR, "prod_kit_copos_novo.jpg"),
    },
    # 29. Organizador de Bancada
    "organizador-mesa-barbearia": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "organizador_mesa_1789879865373.jpg"),
    },
    # 30. Volante BMW Logitech G29
    "mod-volante-bmw-logitech-g29": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_volante_bmw_logitech_g29.jpg"),
        "hero": os.path.join(BASE_DIR, "PROJETO_VOLANTE_LOGITECH_BMW", "PREVIEW_VOLANTE_BMW_LOGITECH.png"),
    },
    # 31. Suporte Celular Geométrico
    "suporte-celular-geometrico-mesa": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_suporte_celular_mesa.jpg"),
    },
    # 32. Super Saiyan Warrior
    "action-figure-anime-super-saiyan": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_action_figure_super_saiyan.jpg"),
    },
    # 33. Espadachim Samurai Legend
    "action-figure-anime-warrior-legend": {
        "front": os.path.join(FULLSTACK_IMG_DIR, "prod_action_figure_anime_warrior.jpg"),
    },
}

def main():
    os.makedirs(FULLSTACK_IMG_DIR, exist_ok=True)
    os.makedirs(LEGACY_IMG_DIR, exist_ok=True)
    
    total = len(PRODUCTS_MAP)
    print(f"Iniciando processamento de {total} produtos com 4 posições (800x800, fundo #FFFFFF puro)...")
    
    processed_count = 0
    generated_files = []
    
    for prod_id, sources in PRODUCTS_MAP.items():
        front_path = sources.get("front")
        hero_path = sources.get("hero")
        side_path = sources.get("side")
        detail_path = sources.get("detail")
        
        if not front_path or not os.path.exists(front_path):
            print(f"[ALERTA] Arquivo frontal não encontrado para '{prod_id}': {front_path}")
            continue
            
        try:
            img_front = Image.open(front_path)
            img_hero = Image.open(hero_path) if (hero_path and os.path.exists(hero_path)) else None
            img_side = Image.open(side_path) if (side_path and os.path.exists(side_path)) else None
            img_detail = Image.open(detail_path) if (detail_path and os.path.exists(detail_path)) else None
            
            v_front, v_hero, v_side, v_detail = generate_4_views(img_front, img_hero, img_side, img_detail)
            
            # Nomes padronizados das 4 fotos
            names_and_views = [
                (f"prod_{prod_id}_1_front.jpg", v_front),
                (f"prod_{prod_id}_2_hero.jpg", v_hero),
                (f"prod_{prod_id}_3_side.jpg", v_side),
                (f"prod_{prod_id}_4_detail.jpg", v_detail),
            ]
            
            for fname, v_img in names_and_views:
                dest_fullstack = os.path.join(FULLSTACK_IMG_DIR, fname)
                dest_legacy = os.path.join(LEGACY_IMG_DIR, fname)
                
                v_img.save(dest_fullstack, "JPEG", quality=95, optimize=True)
                v_img.save(dest_legacy, "JPEG", quality=95, optimize=True)
                generated_files.append(fname)
                
            processed_count += 1
            print(f"[{processed_count}/{total}] OK: {prod_id} (4 posições salvas)")
            
        except Exception as e:
            print(f"[ERRO] Falha ao processar {prod_id}: {e}")
            
    print(f"\nConcluído com sucesso! {processed_count} produtos gerados ({len(generated_files)} fotos geradas no total).")

if __name__ == "__main__":
    main()
