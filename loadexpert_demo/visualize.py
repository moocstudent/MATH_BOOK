"""
三维装柜可视化(matplotlib)
把 Container 里的每个 Placement 画成半透明立方体,并导出 PNG。
"""
from __future__ import annotations

import itertools

import matplotlib

matplotlib.use("Agg")  # 无界面环境下也能保存图片
import matplotlib.pyplot as plt  # noqa: E402
from mpl_toolkits.mplot3d.art3d import Poly3DCollection  # noqa: E402

from packer import Container  # noqa: E402


_PALETTE = [
    "#4C72B0", "#DD8452", "#55A868", "#C44E52", "#8172B3",
    "#937860", "#DA8BC3", "#8C8C8C", "#CCB974", "#64B5CD",
]


def _cuboid_faces(x, y, z, dx, dy, dz):
    corners = list(itertools.product([x, x + dx], [y, y + dy], [z, z + dz]))
    c = {p: i for i, p in enumerate(corners)}

    def q(*pts):
        return [corners[c[p]] for p in pts]

    x1, y1, z1, x2, y2, z2 = x, y, z, x + dx, y + dy, z + dz
    return [
        q((x1, y1, z1), (x2, y1, z1), (x2, y2, z1), (x1, y2, z1)),  # bottom
        q((x1, y1, z2), (x2, y1, z2), (x2, y2, z2), (x1, y2, z2)),  # top
        q((x1, y1, z1), (x2, y1, z1), (x2, y1, z2), (x1, y1, z2)),  # front
        q((x1, y2, z1), (x2, y2, z1), (x2, y2, z2), (x1, y2, z2)),  # back
        q((x1, y1, z1), (x1, y2, z1), (x1, y2, z2), (x1, y1, z2)),  # left
        q((x2, y1, z1), (x2, y2, z1), (x2, y2, z2), (x2, y1, z2)),  # right
    ]


def draw_container(container: Container, out_path: str, alpha: float = 0.7):
    fig = plt.figure(figsize=(11, 8))
    ax = fig.add_subplot(111, projection="3d")

    color_map: dict[str, str] = {}
    color_cycle = itertools.cycle(_PALETTE)

    for p in container.placements:
        base_name = p.item.name.split("#")[0]
        if base_name not in color_map:
            color_map[base_name] = p.item.color or next(color_cycle)
        color = color_map[base_name]
        faces = _cuboid_faces(p.x, p.y, p.z, p.dx, p.dy, p.dz)
        box = Poly3DCollection(faces, alpha=alpha, facecolor=color, edgecolor="black", linewidths=0.4)
        ax.add_collection3d(box)

    ax.set_xlim(0, container.length)
    ax.set_ylim(0, container.width)
    ax.set_zlim(0, container.height)
    try:
        ax.set_box_aspect((container.length, container.width, container.height))
    except Exception:
        pass
    ax.set_xlabel("Length (cm)")
    ax.set_ylabel("Width (cm)")
    ax.set_zlabel("Height (cm)")
    ax.set_title(
        f"{container.name}  |  items={len(container.placements)}  "
        f"vol={container.volume_utilization * 100:.1f}%  "
        f"wt={container.weight_utilization * 100:.1f}%"
    )
    ax.view_init(elev=22, azim=-58)

    handles = [
        plt.Line2D([0], [0], marker="s", linestyle="", markersize=10, markerfacecolor=col, label=name)
        for name, col in color_map.items()
    ]
    if handles:
        ax.legend(handles=handles, loc="upper left", fontsize=8, framealpha=0.9)

    fig.tight_layout()
    fig.savefig(out_path, dpi=130)
    plt.close(fig)
    return out_path
