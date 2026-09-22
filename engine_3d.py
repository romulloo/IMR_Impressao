#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
IMR IMPRESSÃO 3D - MOTOR DE MANUFATURA DIGITAL & PRECIFICAÇÃO BAMBU LAB
Engine Python v2.0 - Desenvolvido para IMR Impressão (Curitiba - PR)
=============================================================================
Funcionalidades:
  1. Parser nativo de malhas STL (Binário e ASCII) em alta velocidade sem dependências externas.
  2. Cálculo exato de volume tridimensional (Teorema da Divergência / Tetraedros sinalizados).
  3. Cálculo de área de superfície e dimensões de caixa delimitadora (Bounding Box X/Y/Z).
  4. Estimativa precisa de peso de filamento com suporte a densidades (PLA, PETG, ABS, TPU).
  5. Cálculo de perdas de purga do sistema multicolor Bambu Lab AMS (1 a 4 cores).
  6. Estimativa de tempo de impressão na Bambu Lab A1 (alta velocidade 200-300mm/s).
  7. Algoritmo de precificação B2B com custos de material, energia, desgaste de máquina e descontos de atacado.
=============================================================================
"""

import os
import sys
import math
import struct
import json
import argparse

# Constantes de Densidade dos Materiais (g/cm³)
MATERIAL_DENSITIES = {
    "PLA": 1.24,
    "PETG": 1.27,
    "ABS": 1.04,
    "TPU": 1.20,
    "PLA Tough": 1.24,
    "PLA Silk": 1.24
}

# Preço médio de filamento de primeira linha (R$/kg)
DEFAULT_FILAMENT_PRICE_PER_KG = 110.00

# Parâmetros de Custo Operacional Bambu Lab A1
DEFAULT_ENERGY_TARIFF_KWH = 0.95      # R$ por kWh (Tarifa média Paraná / Copel)
BAMBU_A1_POWER_KW = 0.150              # 150W consumo médio de impressão com mesa aquecida a 60°C
MACHINE_MAINTENANCE_PER_HOUR = 3.80    # R$ 3,80/hora (bicos endurecidos, correias, lubrificação, PEI)
SETUP_PREPARATION_COST = 5.00          # R$ 5,00 por lote (fatiamento, conferência CAD e preparação)

# Fatores de purga multicolor Bambu Lab AMS
AMS_PURGE_FACTORS = {
    1: 1.00,  # Monocromático: 0% de purga adicional
    2: 1.18,  # Bicolor: +18% de material em torre de purga e transições
    3: 1.32,  # 3 Cores: +32%
    4: 1.45   # 4 Cores: +45% de volume de descarte
}

# Velocidade volumétrica média de extrusão da Bambu Lab A1 (mm³/s)
VOLUMETRIC_SPEED_MM3_S = 14.0

def parse_binary_stl(f, file_size):
    """
    Parser binário ultra-rápido usando struct em blocos de memória.
    Lê triângulos de 50 bytes: 3 floats (normal) + 9 floats (3 vértices) + 2 bytes atributo.
    """
    f.seek(80)
    triangle_count_bytes = f.read(4)
    if len(triangle_count_bytes) < 4:
        raise ValueError("Arquivo STL binário corrompido ou incompleto.")
    
    num_triangles = struct.unpack('<I', triangle_count_bytes)[0]
    expected_size = 84 + num_triangles * 50
    if file_size < expected_size:
        # Algumas exportações podem ter menos bytes que o cabeçalho declara
        num_triangles = max(0, (file_size - 84) // 50)

    total_signed_volume = 0.0
    total_surface_area = 0.0
    
    min_x = float('inf')
    max_x = float('-inf')
    min_y = float('inf')
    max_y = float('-inf')
    min_z = float('inf')
    max_z = float('-inf')

    # Processamento em lotes de 10.000 triângulos para eficiência de cache e velocidade
    batch_size = 10000
    triangles_left = num_triangles

    while triangles_left > 0:
        current_batch = min(batch_size, triangles_left)
        raw_data = f.read(current_batch * 50)
        if len(raw_data) < current_batch * 50:
            current_batch = len(raw_data) // 50
            if current_batch == 0:
                break
        
        # Desempacota triângulos no lote
        for i in range(current_batch):
            offset = i * 50
            # Pula os 12 bytes da normal (3 floats) e lê os 9 floats dos vértices
            v_data = raw_data[offset + 12 : offset + 48]
            x1, y1, z1, x2, y2, z2, x3, y3, z3 = struct.unpack('<9f', v_data)

            # Atualiza Bounding Box
            if x1 < min_x: min_x = x1
            if x2 < min_x: min_x = x2
            if x3 < min_x: min_x = x3
            if x1 > max_x: max_x = x1
            if x2 > max_x: max_x = x2
            if x3 > max_x: max_x = x3

            if y1 < min_y: min_y = y1
            if y2 < min_y: min_y = y2
            if y3 < min_y: min_y = y3
            if y1 > max_y: max_y = y1
            if y2 > max_y: max_y = y2
            if y3 > max_y: max_y = y3

            if z1 < min_z: min_z = z1
            if z2 < min_z: min_z = z2
            if z3 < min_z: min_z = z3
            if z1 > max_z: max_z = z1
            if z2 > max_z: max_z = z2
            if z3 > max_z: max_z = z3

            # Volume do tetraedro: (v1 . (v2 x v3)) / 6
            # v2 x v3 = (y2*z3 - y3*z2, z2*x3 - z3*x2, x2*y3 - x3*y2)
            cross_x = y2 * z3 - y3 * z2
            cross_y = z2 * x3 - z3 * x2
            cross_z = x2 * y3 - x3 * y2
            total_signed_volume += (x1 * cross_x + y1 * cross_y + z1 * cross_z)

            # Área do triângulo: 0.5 * |(v2 - v1) x (v3 - v1)|
            e1x, e1y, e1z = x2 - x1, y2 - y1, z2 - z1
            e2x, e2y, e2z = x3 - x1, y3 - y1, z3 - z1
            ax = e1y * e2z - e1z * e2y
            ay = e1z * e2x - e1x * e2z
            az = e1x * e2y - e1y * e2x
            total_surface_area += 0.5 * math.sqrt(ax * ax + ay * ay + az * az)

        triangles_left -= current_batch

    raw_volume_mm3 = abs(total_signed_volume) / 6.0
    raw_volume_cm3 = raw_volume_mm3 / 1000.0
    surface_area_cm2 = total_surface_area / 100.0

    dim_x = max(0.0, max_x - min_x) if min_x != float('inf') else 0.0
    dim_y = max(0.0, max_y - min_y) if min_y != float('inf') else 0.0
    dim_z = max(0.0, max_z - min_z) if min_z != float('inf') else 0.0

    return {
        "format": "binary",
        "triangles": num_triangles,
        "dimensions_mm": {
            "x": round(dim_x, 2),
            "y": round(dim_y, 2),
            "z": round(dim_z, 2)
        },
        "raw_volume_cm3": round(raw_volume_cm3, 3),
        "surface_area_cm2": round(surface_area_cm2, 2)
    }

def parse_ascii_stl(f):
    """
    Parser ASCII para arquivos de texto STL.
    """
    f.seek(0)
    min_x = float('inf')
    max_x = float('-inf')
    min_y = float('inf')
    max_y = float('-inf')
    min_z = float('inf')
    max_z = float('-inf')

    total_signed_volume = 0.0
    total_surface_area = 0.0
    triangles = 0
    current_vertices = []

    for line in f:
        stripped = line.strip().lower()
        if stripped.startswith("vertex"):
            parts = stripped.split()
            if len(parts) >= 4:
                try:
                    vx, vy, vz = float(parts[1]), float(parts[2]), float(parts[3])
                    current_vertices.append((vx, vy, vz))
                    
                    if vx < min_x: min_x = vx
                    if vx > max_x: max_x = vx
                    if vy < min_y: min_y = vy
                    if vy > max_y: max_y = vy
                    if vz < min_z: min_z = vz
                    if vz > max_z: max_z = vz

                    if len(current_vertices) == 3:
                        triangles += 1
                        (x1, y1, z1), (x2, y2, z2), (x3, y3, z3) = current_vertices
                        
                        cross_x = y2 * z3 - y3 * z2
                        cross_y = z2 * x3 - z3 * x2
                        cross_z = x2 * y3 - x3 * y2
                        total_signed_volume += (x1 * cross_x + y1 * cross_y + z1 * cross_z)

                        e1x, e1y, e1z = x2 - x1, y2 - y1, z2 - z1
                        e2x, e2y, e2z = x3 - x1, y3 - y1, z3 - z1
                        ax = e1y * e2z - e1z * e2y
                        ay = e1z * e2x - e1x * e2z
                        az = e1x * e2y - e1y * e2x
                        total_surface_area += 0.5 * math.sqrt(ax * ax + ay * ay + az * az)

                        current_vertices = []
                except ValueError:
                    continue

    raw_volume_mm3 = abs(total_signed_volume) / 6.0
    raw_volume_cm3 = raw_volume_mm3 / 1000.0
    surface_area_cm2 = total_surface_area / 100.0

    dim_x = max(0.0, max_x - min_x) if min_x != float('inf') else 0.0
    dim_y = max(0.0, max_y - min_y) if min_y != float('inf') else 0.0
    dim_z = max(0.0, max_z - min_z) if min_z != float('inf') else 0.0

    return {
        "format": "ascii",
        "triangles": triangles,
        "dimensions_mm": {
            "x": round(dim_x, 2),
            "y": round(dim_y, 2),
            "z": round(dim_z, 2)
        },
        "raw_volume_cm3": round(raw_volume_cm3, 3),
        "surface_area_cm2": round(surface_area_cm2, 2)
    }

def analyze_stl_file(filepath, infill_percent=15, colors=1, selected_material="PLA", filament_price_kg=DEFAULT_FILAMENT_PRICE_PER_KG):
    """
    Analisa um arquivo STL e retorna diagnóstico completo de geometria e custos.
    """
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Arquivo não encontrado: {filepath}")

    file_size = os.path.getsize(filepath)
    if file_size < 84:
        raise ValueError("Arquivo STL inválido ou excessivamente pequeno.")

    with open(filepath, 'rb') as f:
        # Detecta se é binário ou ASCII
        header = f.read(80)
        is_ascii = False
        try:
            header_text = header.decode('ascii', errors='ignore').strip()
            if header_text.startswith("solid") and b'\0' not in header:
                # Confere se contém facet normal nas primeiras linhas
                sample = f.read(1024).decode('ascii', errors='ignore')
                if "facet normal" in sample or "vertex" in sample:
                    is_ascii = True
        except Exception:
            is_ascii = False

    if is_ascii:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            mesh_data = parse_ascii_stl(f)
    else:
        with open(filepath, 'rb') as f:
            mesh_data = parse_binary_stl(f, file_size)

    raw_volume_cm3 = mesh_data["raw_volume_cm3"]
    surface_area_cm2 = mesh_data["surface_area_cm2"]

    # Modelo Físico de Fatiamento Bambu Lab:
    # Casca externa (paredes de 1.2mm = 3 voltas + camadas de topo/fundo)
    # Área de superfície (cm²) * espessura média (0.12 cm)
    shell_volume_cm3 = surface_area_cm2 * 0.12
    if shell_volume_cm3 >= raw_volume_cm3:
        # Peça fina ou sólida (ex: chaveiro fino, placa 2D em relevo)
        effective_volume_cm3 = raw_volume_cm3 * 0.95
    else:
        core_volume_cm3 = raw_volume_cm3 - shell_volume_cm3
        infill_ratio = max(0.05, min(1.0, infill_percent / 100.0))
        effective_volume_cm3 = shell_volume_cm3 + (core_volume_cm3 * infill_ratio)
        effective_volume_cm3 = min(raw_volume_cm3, effective_volume_cm3)

    # Multiplicador de purga do Bambu AMS
    purge_multiplier = AMS_PURGE_FACTORS.get(int(colors), 1.0)
    total_effective_volume_cm3 = effective_volume_cm3 * purge_multiplier

    # Cálculo dos pesos para diferentes materiais (gramas)
    weights_g = {}
    for mat, density in MATERIAL_DENSITIES.items():
        weights_g[mat] = round(total_effective_volume_cm3 * density, 2)

    primary_weight_g = weights_g.get(selected_material, round(total_effective_volume_cm3 * 1.24, 2))

    # Estimativa de tempo de impressão na Bambu Lab A1
    # 1. Tempo de extrusão: volume efetivo em mm³ / taxa volumétrica (14 mm³/s)
    effective_volume_mm3 = total_effective_volume_cm3 * 1000.0
    extrusion_time_seconds = effective_volume_mm3 / VOLUMETRIC_SPEED_MM3_S
    
    # 2. Overhead fixo (calibração de ressonância dinâmica, nivelamento da cama com sensor indutivo, aquecimento): 6 min
    base_overhead_minutes = 6.0

    # 3. Tempo por camada e trocas de cores AMS (média de 60s por troca de cor)
    estimated_layers = max(10, int(mesh_data["dimensions_mm"]["z"] / 0.20)) # Altura de camada 0.20mm
    color_swaps_time_minutes = 0.0
    if colors > 1:
        # Estimativa de trocas de filamento ao longo do modelo
        active_color_layers = min(estimated_layers, int(estimated_layers * 0.65))
        color_swaps_time_minutes = (active_color_layers * (colors - 1) * 65.0) / 60.0

    total_print_time_minutes = round(base_overhead_minutes + (extrusion_time_seconds / 60.0) + color_swaps_time_minutes)
    total_print_time_minutes = max(12, total_print_time_minutes) # Mínimo de 12 minutos

    hours = total_print_time_minutes // 60
    mins = total_print_time_minutes % 60
    formatted_time = f"{hours}h {mins:02d}min" if hours > 0 else f"{mins} min"

    # Geração do Orçamento B2B
    quote = calculate_pricing_breakdown(
        weight_g=primary_weight_g,
        print_time_minutes=total_print_time_minutes,
        material=selected_material,
        colors=colors,
        filament_price_kg=filament_price_kg,
        quantity=1
    )

    return {
        "success": True,
        "filename": os.path.basename(filepath),
        "filesize_kb": round(file_size / 1024.0, 1),
        "format": mesh_data["format"],
        "triangles": mesh_data["triangles"],
        "dimensions_mm": mesh_data["dimensions_mm"],
        "raw_volume_cm3": round(raw_volume_cm3, 2),
        "surface_area_cm2": round(surface_area_cm2, 2),
        "effective_volume_cm3": round(effective_volume_cm3, 2),
        "purge_multiplier": purge_multiplier,
        "weights_g": weights_g,
        "filament_weight_g": primary_weight_g,
        "estimated_print_time_minutes": total_print_time_minutes,
        "estimated_print_time_formatted": formatted_time,
        "bambu_specs": {
            "printer": "Bambu Lab A1 com AMS Lite (4 Cores)",
            "acceleration_mm_s2": 10000,
            "max_speed_mm_s": 500,
            "layer_height_default_mm": 0.20,
            "hotend": "Hardened Steel 0.4mm"
        },
        "quote": quote
    }

def calculate_pricing_breakdown(weight_g, print_time_minutes, material="PLA", colors=1, filament_price_kg=DEFAULT_FILAMENT_PRICE_PER_KG, quantity=1):
    """
    Algoritmo oficial de precificação de manufatura IMR Impressão:
    - Custo direto de matéria-prima (filamento R$/g)
    - Consumo elétrico Bambu Lab A1 (~150W médios)
    - Depreciação de máquinas e consumíveis por hora de produção
    - Margem comercial justa com escalabilidade B2B
    """
    cost_per_gram = filament_price_kg / 1000.0
    material_cost_unit = round(weight_g * cost_per_gram, 2)

    print_time_hours = print_time_minutes / 60.0
    energy_cost_unit = round(print_time_hours * BAMBU_A1_POWER_KW * DEFAULT_ENERGY_TARIFF_KWH, 2)
    wear_cost_unit = round(print_time_hours * MACHINE_MAINTENANCE_PER_HOUR, 2)

    # Custo fabril unitário direto
    direct_factory_cost_unit = material_cost_unit + energy_cost_unit + wear_cost_unit

    # Setup de fatiamento e calibração por lote (diluído na quantidade)
    qty = max(1, int(quantity))
    setup_amortized = round(SETUP_PREPARATION_COST / qty, 2)
    total_cost_per_unit = direct_factory_cost_unit + setup_amortized

    # Preço base de venda unitário (1 un)
    # Margem de contribuição média IMR: base de mark-up calculada com valor mínimo mínimo viável
    # Ex: Peça pequena rápida tem preço mínimo de R$ 18,00 para compensar atendimento e embalagem
    raw_selling_price = (total_cost_per_unit * 2.85) + 6.00
    base_unit_price = round(max(18.00, raw_selling_price), 2)

    # Tabela de Descontos por Escala B2B
    scale_discounts = [
        {
            "tier": "1 a 4 un",
            "min": 1,
            "max": 4,
            "discount_percent": 0,
            "unit_price_brl": base_unit_price,
            "label": "Preço Padrão de Varejo"
        },
        {
            "tier": "5 a 19 un",
            "min": 5,
            "max": 19,
            "discount_percent": 18,
            "unit_price_brl": round(base_unit_price * 0.82, 2),
            "label": "18% OFF - Pequeno Lote"
        },
        {
            "tier": "20 a 49 un",
            "min": 20,
            "max": 49,
            "discount_percent": 32,
            "unit_price_brl": round(base_unit_price * 0.68, 2),
            "label": "32% OFF - Lote Corporativo"
        },
        {
            "tier": "50 a 99 un",
            "min": 50,
            "max": 99,
            "discount_percent": 45,
            "unit_price_brl": round(base_unit_price * 0.55, 2),
            "label": "45% OFF - Atacado Promocional"
        },
        {
            "tier": "100 a 500 un",
            "min": 100,
            "max": 500,
            "discount_percent": 58,
            "unit_price_brl": round(base_unit_price * 0.42, 2),
            "label": "58% OFF - Super Atacado B2B"
        }
    ]

    # Preço final para a quantidade solicitada
    active_discount_percent = 0
    active_unit_price = base_unit_price
    for tier in scale_discounts:
        if tier["min"] <= qty <= tier["max"]:
            active_discount_percent = tier["discount_percent"]
            active_unit_price = tier["unit_price_brl"]
            break
    if qty > 500:
        active_discount_percent = 62
        active_unit_price = round(base_unit_price * 0.38, 2)

    total_order_value = round(active_unit_price * qty, 2)
    standard_total_value = round(base_unit_price * qty, 2)
    total_savings = round(standard_total_value - total_order_value, 2)

    return {
        "material": material,
        "weight_g": weight_g,
        "colors": colors,
        "quantity": qty,
        "costs_breakdown": {
            "material_cost_unit_brl": material_cost_unit,
            "energy_cost_unit_brl": energy_cost_unit,
            "wear_cost_unit_brl": wear_cost_unit,
            "setup_cost_unit_brl": setup_amortized,
            "total_direct_cost_unit_brl": round(total_cost_per_unit, 2)
        },
        "pricing": {
            "base_unit_price_brl": base_unit_price,
            "active_unit_price_brl": active_unit_price,
            "discount_percent": active_discount_percent,
            "total_order_brl": total_order_value,
            "total_savings_brl": total_savings,
            "scale_tiers": scale_discounts
        }
    }

def main():
    parser = argparse.ArgumentParser(description="IMR Impressão - Motor de Análise 3D e Precificação")
    subparsers = parser.add_subparsers(dest="command", help="Comando a executar")

    # Subcomando: analyze-stl
    parser_stl = subparsers.add_parser("analyze-stl", help="Analisa arquivo STL (binário ou ASCII)")
    parser_stl.add_argument("filepath", help="Caminho do arquivo STL")
    parser_stl.add_argument("--infill", type=int, default=15, help="Porcentagem de preenchimento (default: 15)")
    parser_stl.add_argument("--colors", type=int, default=1, help="Número de cores AMS (1 a 4)")
    parser_stl.add_argument("--material", default="PLA", choices=list(MATERIAL_DENSITIES.keys()), help="Material do filamento")
    parser_stl.add_argument("--price-kg", type=float, default=DEFAULT_FILAMENT_PRICE_PER_KG, help="Preço do filamento por kg (R$)")

    # Subcomando: calculate-quote
    parser_calc = subparsers.add_parser("calculate-quote", help="Calcula orçamento a partir de peso e tempo")
    parser_calc.add_argument("--weight-g", type=float, required=True, help="Peso do filamento em gramas")
    parser_calc.add_argument("--print-time-min", type=int, required=True, help="Tempo estimado de impressão em minutos")
    parser_calc.add_argument("--material", default="PLA", choices=list(MATERIAL_DENSITIES.keys()), help="Material")
    parser_calc.add_argument("--colors", type=int, default=1, help="Número de cores AMS (1 a 4)")
    parser_calc.add_argument("--quantity", type=int, default=1, help="Quantidade solicitada")
    parser_calc.add_argument("--price-kg", type=float, default=DEFAULT_FILAMENT_PRICE_PER_KG, help="Preço por kg do filamento")

    # Modo stdin JSON
    parser.add_argument("--json-input", action="store_true", help="Lê comando e argumentos de stdin em JSON")

    args = parser.parse_args()

    if args.json_input:
        try:
            stdin_data = sys.stdin.read()
            payload = json.loads(stdin_data)
            cmd = payload.get("command")
            if cmd == "analyze-stl":
                result = analyze_stl_file(
                    filepath=payload["filepath"],
                    infill_percent=payload.get("infill", 15),
                    colors=payload.get("colors", 1),
                    selected_material=payload.get("material", "PLA"),
                    filament_price_kg=payload.get("price_kg", DEFAULT_FILAMENT_PRICE_PER_KG)
                )
            elif cmd == "calculate-quote":
                result = calculate_pricing_breakdown(
                    weight_g=float(payload["weight_g"]),
                    print_time_minutes=int(payload["print_time_min"]),
                    material=payload.get("material", "PLA"),
                    colors=int(payload.get("colors", 1)),
                    filament_price_kg=float(payload.get("price_kg", DEFAULT_FILAMENT_PRICE_PER_KG)),
                    quantity=int(payload.get("quantity", 1))
                )
            else:
                result = {"success": False, "error": f"Comando desconhecido: {cmd}"}
            print(json.dumps(result, ensure_ascii=False))
            return
        except Exception as e:
            print(json.dumps({"success": False, "error": str(e)}, ensure_ascii=False))
            sys.exit(1)

    if args.command == "analyze-stl":
        try:
            result = analyze_stl_file(
                filepath=args.filepath,
                infill_percent=args.infill,
                colors=args.colors,
                selected_material=args.material,
                filament_price_kg=args.price_kg
            )
            print(json.dumps(result, ensure_ascii=False, indent=2))
        except Exception as e:
            print(json.dumps({"success": False, "error": str(e)}, ensure_ascii=False))
            sys.exit(1)

    elif args.command == "calculate-quote":
        try:
            result = calculate_pricing_breakdown(
                weight_g=args.weight_g,
                print_time_minutes=args.print_time_min,
                material=args.material,
                colors=args.colors,
                filament_price_kg=args.price_kg,
                quantity=args.quantity
            )
            print(json.dumps(result, ensure_ascii=False, indent=2))
        except Exception as e:
            print(json.dumps({"success": False, "error": str(e)}, ensure_ascii=False))
            sys.exit(1)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
