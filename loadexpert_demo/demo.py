"""
装柜 Demo 主程序
运行:  python demo.py
产出:  控制台报告 + output/ 下每个集装箱的三维装柜图 PNG
"""
from __future__ import annotations

import os
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from packer import Container, Item, Packer
from visualize import draw_container


# 标准集装箱内部尺寸(cm)与最大载重(kg),取常见近似值
CONTAINER_SPECS = {
    "20GP": dict(length=589, width=235, height=239, max_payload=28000),
    "40GP": dict(length=1203, width=235, height=239, max_payload=26500),
    "40HQ": dict(length=1203, width=235, height=269, max_payload=26500),
}


def build_containers(spec_name: str, count: int) -> list[Container]:
    spec = CONTAINER_SPECS[spec_name]
    return [
        Container(name=f"{spec_name}-{i + 1}", **spec)
        for i in range(count)
    ]


def build_cargo(packer: Packer):
    # (名称, 长, 宽, 高 cm, 重量 kg, 数量, 是否可堆叠, 颜色)
    # (名称, 长, 宽, 高 cm, 重量 kg, 数量, 是否可堆叠, 颜色, load_order)
    catalog = [
        ("PalletBox-A", 120, 100, 110, 260, 18, True, "#4C72B0", 0),
        ("PalletBox-B", 110, 90, 90, 180, 20, True, "#DD8452", 0),
        ("LongCrate",  200, 60, 60, 150, 10, True, "#55A868", 1),
        ("Cube-M",      80, 80, 80, 90, 24, True, "#C44E52", 2),
        ("FlatCarton",  60, 40, 30, 22, 40, True, "#8172B3", 8),
        ("Fragile-Top", 100, 80, 70, 70, 8, False, "#DA8BC3", 9),
    ]
    for name, l, w, h, wt, qty, stack, color, load_order in catalog:
        packer.add_item(
            Item(name=name, length=l, width=w, height=h, weight=wt,
                 stackable=stack, color=color, load_order=load_order),
            qty=qty,
        )


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(here, "output")
    os.makedirs(out_dir, exist_ok=True)

    packer = Packer(support_surface_ratio=0.70)

    # 备 2 个 40HQ 高柜作为可用柜位
    for c in build_containers("40HQ", 2):
        packer.add_container(c)

    build_cargo(packer)

    total_items = len(packer.items)
    print(f"待装货物总数: {total_items} 件\n")

    packer.pack(bigger_first=True)
    print(packer.report())

    print("\n生成三维装柜图...")
    for c in packer.containers:
        if not c.placements:
            continue
        path = os.path.join(out_dir, f"{c.name}.png")
        draw_container(c, path)
        print(f"  已保存: {path}")

    print("\n完成。")


if __name__ == "__main__":
    main()
