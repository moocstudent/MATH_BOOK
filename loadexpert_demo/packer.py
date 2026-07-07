"""
装柜引擎(自包含实现)
---------------------------------
基于极点法(Extreme Point)的三维装箱构造式启发算法,支持:
  - 6 种朝向旋转(可按货物单独限制)
  - 集装箱最大载重约束
  - 堆叠稳定性检查(底面支撑率)
  - 多柜型、多柜位自动分配
  - 门侧最后码放(默认):门固定在长度终点(x=长),分深度带从门对侧逐步向门推进
    (假设灌水检验:假想门朝天往里灌水,越靠里离门越远、可进水空隙体积应尽量小)
  - 防损准则:重不压轻/大不压小、贴地贴墙填缝、横向重心平衡、门区禁留助跑缝隙
  - 不可堆叠货物:后装,空间上仍从里向外紧凑排列;同类中承托级别低者优先最后装(自然靠外)
  - 空间顺序 load_order:越小越先装(如托盘先于扁箱);各波次内均从里向外填,与数量无关
  - 全程确定性:无随机;并列时按评分键、朝向序号、坐标、货物名逐级决断
"""
from __future__ import annotations

from dataclasses import dataclass, field
from itertools import permutations
from typing import Optional


ALL_ROTATIONS = list(dict.fromkeys(permutations((0, 1, 2))))

STRATEGY_EXTREME = "extreme_point"
STRATEGY_DOOR_LAST = "door_last"

# 门固定在长度终点 (x = container.length)
DOOR_X_MAX = "x_max"


ORIENTATION_ROTS = [(0, 1, 2), (0, 2, 1), (1, 0, 2), (1, 2, 0), (2, 0, 1), (2, 1, 0)]


def _default_orient_rules(max_layers: int = 99) -> tuple[dict, ...]:
    base = {
        "allowed": True, "load_bearing": True, "support_level": 1,
        "self_stack_limit": True, "max_layers": max_layers,
    }
    return tuple(dict(base) for _ in ORIENTATION_ROTS)


def _rot_index(rot) -> int:
    try:
        return ORIENTATION_ROTS.index(tuple(rot))
    except ValueError:
        return -1


@dataclass
class Item:
    name: str
    length: float
    width: float
    height: float
    weight: float
    allowed_rotations: tuple = field(default_factory=lambda: tuple(ALL_ROTATIONS))
    stackable: bool = True
    color: Optional[str] = None
    desc: str = ""
    price: float = 0.0
    pcs_per_box: int = 1
    stack_level: int = 5
    max_stack_layers: int = 99
    load_order: int = 0          # 空间顺序:越小越靠里(先装),越大越靠门(后装)
    gross_weight: Optional[float] = None
    orig_length: Optional[float] = None
    orig_width: Optional[float] = None
    orig_height: Optional[float] = None
    deform_mode: str = "final"
    deform_coeff: tuple = (0.0, 0.0, 0.0)
    deform_tol: tuple = (0.0, 0.0, 0.0)
    min_support_ratio: Optional[float] = None
    min_support_axes: tuple = (0.75, 0.75, 0.75)  # 原尺寸 L/W/H 三轴最少承托(底面两轴取较大)
    orient_rules: tuple = field(default_factory=lambda: _default_orient_rules())

    @property
    def base_name(self) -> str:
        return self.name.split("#")[0]

    def rule_for_rot(self, rot) -> dict:
        idx = _rot_index(rot)
        if idx < 0 or idx >= len(self.orient_rules):
            return {"allowed": True, "load_bearing": True, "self_stack_limit": True,
                    "max_layers": self.max_stack_layers}
        return self.orient_rules[idx]

    def support_ratio_required(self, rot, packer_default: float) -> float:
        """按摆放方向取底面两轴承托要求(与货物详情「最少底部承托」一致)。"""
        a0, a1 = rot[0], rot[1]
        if self.min_support_axes and len(self.min_support_axes) >= 3:
            return max(float(self.min_support_axes[a0]), float(self.min_support_axes[a1]))
        if self.min_support_ratio is not None:
            return self.min_support_ratio
        return packer_default

    def dims_for(self, rot) -> tuple:
        base = (self.length, self.width, self.height)
        return (base[rot[0]], base[rot[1]], base[rot[2]])

    @property
    def volume(self) -> float:
        return self.length * self.width * self.height


@dataclass
class Placement:
    item: Item
    x: float
    y: float
    z: float
    dx: float
    dy: float
    dz: float
    rot: tuple = (0, 1, 2)
    seq: int = 0  # 本柜装入顺序,从 1 开始

    @property
    def volume(self) -> float:
        return self.dx * self.dy * self.dz


@dataclass
class Container:
    name: str
    length: float
    width: float
    height: float
    max_payload: float
    desc: str = ""
    color: Optional[str] = None
    corner_length: float = 0.0   # 角件占用(cm),各轴两端各扣除
    corner_width: float = 0.0
    corner_height: float = 0.0
    tare_weight: float = 0.0     # 空柜自重 kg
    placements: list = field(default_factory=list)

    def pack_limits(self) -> tuple[float, float, float, float, float, float]:
        """可码放区域 [x0,y0,z0) ~ (x1,y1,z1)。"""
        cl, cw, ch = self.corner_length, self.corner_width, self.corner_height
        return (
            cl, cw, ch,
            max(cl, self.length - cl),
            max(cw, self.width - cw),
            max(ch, self.height - ch),
        )

    @property
    def packable_volume(self) -> float:
        x0, y0, z0, x1, y1, z1 = self.pack_limits()
        return max(0.0, x1 - x0) * max(0.0, y1 - y0) * max(0.0, z1 - z0)

    @property
    def volume(self) -> float:
        return self.packable_volume if self.packable_volume > 0 else self.length * self.width * self.height

    @property
    def gross_weight(self) -> float:
        return self.tare_weight + self.used_weight

    @property
    def used_volume(self) -> float:
        return sum(p.volume for p in self.placements)

    @property
    def used_weight(self) -> float:
        return sum(p.item.weight for p in self.placements)

    @property
    def volume_utilization(self) -> float:
        return self.used_volume / self.volume if self.volume else 0.0

    @property
    def weight_utilization(self) -> float:
        return self.used_weight / self.max_payload if self.max_payload else 0.0


def _overlap(ax, ay, az, adx, ady, adz, p: Placement) -> bool:
    return (
        ax < p.x + p.dx and ax + adx > p.x and
        ay < p.y + p.dy and ay + ady > p.y and
        az < p.z + p.dz and az + adz > p.z
    )


def _support_overlap(x, y, z, dx, dy, p: Placement) -> tuple[float, float]:
    """与支撑面 p 顶面的 XY 重叠面积,及占新货物底面积比例。"""
    if abs(p.z + p.dz - z) > 1e-6:
        return 0.0, 0.0
    ox = max(0.0, min(x + dx, p.x + p.dx) - max(x, p.x))
    oy = max(0.0, min(y + dy, p.y + p.dy) - max(y, p.y))
    overlap = ox * oy
    base = dx * dy
    ratio = overlap / base if base > 0 else 0.0
    return overlap, ratio


def _xy_overlap(x, y, dx, dy, p: Placement) -> bool:
    return (
        x < p.x + p.dx and x + dx > p.x and
        y < p.y + p.dy and y + dy > p.y
    )


def _self_stack_layers_below(x, y, z, dx, dy, item: Item, rot, container: Container) -> int:
    """同种货物、同朝向在目标位置正下方已堆叠层数。"""
    base = item.base_name
    layers = 0
    for p in container.placements:
        if p.item.base_name != base or tuple(p.rot) != tuple(rot):
            continue
        if not _xy_overlap(x, y, dx, dy, p):
            continue
        if p.z + p.dz <= z + 1e-6:
            layers += 1
    return layers


def _stacking_load_ok(x, y, z, dx, dy, item: Item, rot, container: Container) -> bool:
    """重不压轻、大不压小;校验支撑面承重级别(摆放限制)。"""
    if z <= 1e-6:
        return True
    place_rule = item.rule_for_rot(rot)
    # 下方所需承托级别:仅由摆放限制「承托级别」决定,与堆码级别无关
    place_need = place_rule.get("support_level", 1)
    for p in container.placements:
        overlap, _ = _support_overlap(x, y, z, dx, dy, p)
        if overlap <= 1e-6:
            continue
        if not p.item.stackable:
            return False
        sup_rule = p.item.rule_for_rot(p.rot)
        if not sup_rule.get("load_bearing", True):
            return False
        # 堆码级别=该货物承重能力;与承托面级别取较大值
        sup_cap = max(
            p.item.stack_level,
            sup_rule.get("support_level", 1),
        )
        if place_need > sup_cap:
            return False
        if item.weight > p.item.weight + 1e-6:
            return False
        if dx > p.dx + 1e-6 or dy > p.dy + 1e-6:
            return False
        if item.weight > p.item.weight * 1.05 and p.item.stack_level < item.stack_level:
            return False
    return True


def _support_ratio(x, y, z, dx, dy, container: Container) -> float:
    if z <= 1e-6:
        return 1.0
    base_area = dx * dy
    if base_area <= 0:
        return 0.0
    covered = 0.0
    for p in container.placements:
        if abs(p.z + p.dz - z) > 1e-6:
            continue
        ox = max(0.0, min(x + dx, p.x + p.dx) - max(x, p.x))
        oy = max(0.0, min(y + dy, p.y + p.dy) - max(y, p.y))
        covered += ox * oy
    return covered / base_area


def container_balance(c: Container) -> dict:
    """装后重心与偏载百分比(门在 x=长 时,横向偏载最关键)。"""
    tw = c.used_weight
    if tw <= 1e-6 or not c.placements:
        return {"cog_x": 0, "cog_y": 0, "cog_z": 0, "lateral_pct": 0, "longitudinal_pct": 0}
    sx = sy = sz = 0.0
    for p in c.placements:
        w = p.item.weight
        sx += w * (p.x + p.dx / 2)
        sy += w * (p.y + p.dy / 2)
        sz += w * (p.z + p.dz / 2)
    cog_x, cog_y, cog_z = sx / tw, sy / tw, sz / tw
    half_l = max(c.length / 2, 1e-6)
    half_w = max(c.width / 2, 1e-6)
    return {
        "cog_x": round(cog_x, 2),
        "cog_y": round(cog_y, 2),
        "cog_z": round(cog_z, 2),
        "lateral_pct": round((cog_y - half_w) / half_w * 100, 1),
        "longitudinal_pct": round((cog_x - half_l) / half_l * 100, 1),
    }


def interior_water_metrics(c: Container, deep_ratio: float = 0.65, grid: float = 12.0) -> dict:
    """
    假设灌水检验:假想门朝天往里灌水,估算里侧可进水体积与底板填实率。
    按列扫描每格顶部空腔,深处(x 小)权重更大。
    """
    L, W, H = c.length, c.width, c.height
    if L <= 0 or W <= 0 or H <= 0:
        return {
            "interior_water_cm3": 0, "interior_water_liters": 0.0,
            "deep_floor_fill_pct": 100.0, "interior_floor_void_cm2": 0.0,
        }
    deep_x = L * deep_ratio
    nx = max(1, int(L / grid))
    ny = max(1, int(W / grid))
    weighted_water = 0.0
    deep_floor_cells = 0
    deep_floor_filled = 0

    for ix in range(nx):
        x0 = ix * grid
        x1 = min((ix + 1) * grid, L)
        cx = (x0 + x1) / 2
        inside_w = max(0.0, 1.0 - cx / L) ** 2
        in_deep = cx <= deep_x

        for iy in range(ny):
            y0 = iy * grid
            y1 = min((iy + 1) * grid, W)
            cell_area = (x1 - x0) * (y1 - y0)
            max_top = 0.0
            floor_cover = 0.0
            for p in c.placements:
                if p.x >= x1 - 1e-6 or p.x + p.dx <= x0 + 1e-6:
                    continue
                if p.y >= y1 - 1e-6 or p.y + p.dy <= y0 + 1e-6:
                    continue
                max_top = max(max_top, p.z + p.dz)
                if p.z <= 1e-6:
                    ox = min(x1, p.x + p.dx) - max(x0, p.x)
                    oy = min(y1, p.y + p.dy) - max(y0, p.y)
                    floor_cover += max(0.0, ox) * max(0.0, oy)

            headroom = max(0.0, H - max_top)
            weighted_water += inside_w * headroom * cell_area
            if in_deep:
                deep_floor_cells += 1
                if floor_cover >= cell_area * 0.55:
                    deep_floor_filled += 1

    deep_fill = (deep_floor_filled / deep_floor_cells * 100) if deep_floor_cells else 100.0
    void_cm2 = _interior_floor_void_area_static(c, deep_x)
    return {
        "interior_water_cm3": round(weighted_water, 0),
        "interior_water_liters": round(weighted_water / 1000, 2),
        "deep_floor_fill_pct": round(deep_fill, 1),
        "interior_floor_void_cm2": round(void_cm2, 1),
    }


def _floor_x_intervals_at_y(
    c: Container, y: float, y_end: float, x_max: float | None = None,
) -> list[tuple[float, float]]:
    intervals: list[tuple[float, float]] = []
    for p in c.placements:
        if p.z > 1e-6:
            continue
        if p.y + p.dy <= y + 1e-6 or p.y >= y_end - 1e-6:
            continue
        a, b = p.x, p.x + p.dx
        if x_max is not None:
            if a >= x_max - 1e-6:
                continue
            b = min(b, x_max)
        intervals.append((a, b))
    if not intervals:
        return []
    intervals.sort()
    merged = [intervals[0]]
    for a, b in intervals[1:]:
        if a <= merged[-1][1] + 1e-6:
            merged[-1] = (merged[-1][0], max(merged[-1][1], b))
        else:
            merged.append((a, b))
    return merged


def _void_gaps_in_strip(
    c: Container, y: float, y_end: float, x_max: float,
) -> list[tuple[float, float]]:
    gaps: list[tuple[float, float]] = []
    cursor = 0.0
    for a, b in _floor_x_intervals_at_y(c, y, y_end, x_max):
        if a > cursor + 1e-6:
            gaps.append((cursor, a))
        cursor = max(cursor, b)
    if cursor < x_max - 1e-6:
        gaps.append((cursor, x_max))
    return gaps


def _interior_floor_void_area_static(c: Container, x_max: float) -> float:
    ys: set[float] = {0.0}
    for p in c.placements:
        ys.add(p.y)
        ys.add(p.y + p.dy)
    ys_sorted = sorted(ys)
    total = 0.0
    for i in range(len(ys_sorted) - 1):
        y0, y1 = ys_sorted[i], ys_sorted[i + 1]
        if y1 <= y0 + 1e-6:
            continue
        for gx0, gx1 in _void_gaps_in_strip(c, y0, y1, x_max):
            total += (gx1 - gx0) * (y1 - y0)
    return total


class Packer:
    def __init__(
        self,
        support_surface_ratio: float = 0.75,
        pack_strategy: str = STRATEGY_DOOR_LAST,
    ):
        self.containers: list[Container] = []
        self.items: list[Item] = []
        self.unpacked: list[Item] = []
        self.support_surface_ratio = support_surface_ratio
        self.pack_strategy = pack_strategy
        self.door_side = DOOR_X_MAX
        self._door_depth_limit: dict[int, float] = {}
        # 门区助跑缝隙(cm):过小难加固、过大易冲撞箱门
        self._runway_gap_min = 8.0
        self._runway_gap_max = 45.0
        self._max_load_order_cache: int | None = None
        self._pref_rot_cache: dict[str, tuple] = {}

    def _container_key(self, c: Container) -> int:
        try:
            return self.containers.index(c)
        except ValueError:
            return id(c)

    def _sorted_allowed_rots(self, item: Item) -> tuple:
        """固定朝向遍历顺序(与摆放限制表 6 行一致),避免并列时隐式随机。"""
        return tuple(sorted(item.allowed_rotations, key=lambda r: (_rot_index(r), r)))

    def _rank_suffix(self, rot, x: float, y: float, z: float) -> tuple:
        """评分完全相同时的确定性决断:朝向序号 → 坐标。"""
        ri = _rot_index(rot)
        return (ri if ri >= 0 else 99, round(x, 4), round(y, 4), round(z, 4))

    def _sku_preferred_rotation(self, item: Item) -> tuple:
        """整箱统一:装柜前为该 SKU 选定宽平放主朝向(知悉本柜全部货物后再放置)。"""
        key = item.base_name
        if key in self._pref_rot_cache:
            return self._pref_rot_cache[key]
        mn = min(item.length, item.width, item.height)
        best_rot = None
        best_key = None
        for rot in self._sorted_allowed_rots(item):
            if not item.rule_for_rot(rot).get("allowed", True):
                continue
            dx, dy, dz = item.dims_for(rot)
            flat_gap = max(0.0, dz - mn)
            ri = _rot_index(rot)
            rank = (flat_gap, dz, dx * dy, ri if ri >= 0 else 99)
            if best_key is None or rank < best_key:
                best_key, best_rot = rank, rot
        if best_rot is None:
            rots = self._sorted_allowed_rots(item)
            best_rot = rots[0] if rots else (0, 1, 2)
        self._pref_rot_cache[key] = best_rot
        return best_rot

    def _max_load_order(self) -> int:
        if self._max_load_order_cache is None:
            self._max_load_order_cache = max((it.load_order for it in self.items), default=0)
        return self._max_load_order_cache

    def _load_order_band_penalty(
        self, c: Container, item: Item, x: float, dx: float,
    ) -> float:
        """空间顺序只决定装柜波次,不约束目标 x(各波次均从里向外填)。"""
        return 0.0

    def _cog_after_place(
        self, c: Container, w: float, cx: float, cy: float, cz: float,
    ) -> tuple[float, float, float]:
        tw = c.used_weight + w
        if tw <= 1e-6:
            return c.length / 2, c.width / 2, 0.0
        sx = sy = sz = 0.0
        for p in c.placements:
            wt = p.item.weight
            sx += wt * (p.x + p.dx / 2)
            sy += wt * (p.y + p.dy / 2)
            sz += wt * (p.z + p.dz / 2)
        sx += w * cx
        sy += w * cy
        sz += w * cz
        return sx / tw, sy / tw, sz / tw

    def _contact_score(
        self, c: Container, x: float, y: float, z: float, dx: float, dy: float, dz: float,
    ) -> int:
        """贴墙/贴货/贴地越多越稳(处处填实)。"""
        eps = 1.5
        L, W = c.length, c.width
        score = 0
        if z <= eps:
            score += 5
        if x <= eps:
            score += 4 if self.pack_strategy == STRATEGY_DOOR_LAST else 2
        if y <= eps or y + dy >= W - eps:
            score += 2
        if x + dx >= L - eps:
            score += 4
        for p in c.placements:
            px, py, pz = p.x, p.y, p.z
            pdx, pdy, pdz = p.dx, p.dy, p.dz
            y_overlap = y < py + pdy - eps and y + dy > py + eps
            x_overlap = x < px + pdx - eps and x + dx > px + eps
            z_overlap = z < pz + pdz - eps and z + dz > pz + eps
            if abs(x + dx - px) < eps and y_overlap and z_overlap:
                score += 2
            if abs(x - (px + pdx)) < eps and y_overlap and z_overlap:
                score += 2
            if abs(y + dy - py) < eps and x_overlap and z_overlap:
                score += 1
            if abs(y - (py + pdy)) < eps and x_overlap and z_overlap:
                score += 1
            if abs(z - (pz + pdz)) < eps and x_overlap and y_overlap:
                score += 2
        return score

    def _runway_gap_penalty(self, c: Container, x: float, dx: float) -> float:
        """门侧留缝惩罚:8~45cm 的缝隙最难加固,易成货物助跑区。"""
        void = c.length - (x + dx)
        if void <= 1e-3:
            return 0.0
        if self._runway_gap_min <= void <= self._runway_gap_max:
            return void * 4.0
        if void < self._runway_gap_min:
            return void * 0.5
        return void * 0.15

    def add_container(self, container: Container):
        self.containers.append(container)

    def add_item(self, item: Item, qty: int = 1):
        for i in range(qty):
            clone = Item(
                name=item.name if qty == 1 else f"{item.name}#{i + 1}",
                length=item.length, width=item.width, height=item.height,
                weight=item.weight, allowed_rotations=item.allowed_rotations,
                stackable=item.stackable, color=item.color,
                desc=item.desc, price=item.price, pcs_per_box=item.pcs_per_box,
                stack_level=item.stack_level, max_stack_layers=item.max_stack_layers,
                load_order=item.load_order,
                gross_weight=item.gross_weight,
                orig_length=item.orig_length, orig_width=item.orig_width,
                orig_height=item.orig_height, deform_mode=item.deform_mode,
                deform_coeff=item.deform_coeff, deform_tol=item.deform_tol,
                min_support_ratio=item.min_support_ratio,
                min_support_axes=item.min_support_axes,
                orient_rules=item.orient_rules,
            )
            self.items.append(clone)

    def _feasible(self, c: Container, item: Item, rot, x, y, z) -> bool:
        rule = item.rule_for_rot(rot)
        if not rule.get("allowed", True):
            return False
        dx, dy, dz = item.dims_for(rot)
        x0, y0, z0, x1, y1, z1 = c.pack_limits()
        if (
            x < x0 - 1e-6 or y < y0 - 1e-6 or z < z0 - 1e-6
            or x + dx > x1 + 1e-6 or y + dy > y1 + 1e-6 or z + dz > z1 + 1e-6
        ):
            return False
        if c.used_weight + item.weight > c.max_payload + 1e-6:
            return False
        # 不可堆叠(易碎):只允许放在集装箱底板,禁止压在其他货物上
        if not item.stackable and z > 1e-6:
            return False
        for p in c.placements:
            if _overlap(x, y, z, dx, dy, dz, p):
                return False
            if not p.item.stackable and abs(p.z + p.dz - z) <= 1e-6:
                ox = min(x + dx, p.x + p.dx) - max(x, p.x)
                oy = min(y + dy, p.y + p.dy) - max(y, p.y)
                if ox > 1e-6 and oy > 1e-6:
                    return False
            if abs(p.z + p.dz - z) <= 1e-6:
                ox = min(x + dx, p.x + p.dx) - max(x, p.x)
                oy = min(y + dy, p.y + p.dy) - max(y, p.y)
                if ox > 1e-6 and oy > 1e-6 and not p.item.rule_for_rot(p.rot).get("load_bearing", True):
                    return False
        req_support = item.support_ratio_required(rot, self.support_surface_ratio)
        if _support_ratio(x, y, z, dx, dy, c) + 1e-6 < req_support:
            return False
        if not _stacking_load_ok(x, y, z, dx, dy, item, rot, c):
            return False
        if z > 1e-6:
            below = _self_stack_layers_below(x, y, z, dx, dy, item, rot, c)
            max_layers = rule["max_layers"] if rule.get("self_stack_limit", True) else item.max_stack_layers
            if below + 1 > max_layers:
                return False
        return True

    def _front_gap(self, c: Container, x: float, y: float, dx: float, dy: float) -> float:
        """与前方墙(y=0)或前方相邻货物之间的空隙。"""
        front_end = 0.0
        for p in c.placements:
            if x + dx <= p.x + 1e-6 or p.x + p.dx <= x + 1e-6:
                continue
            if p.y + p.dy <= y + 1e-6:
                front_end = max(front_end, p.y + p.dy)
        return y - front_end

    def _left_gap(self, c: Container, x: float, y: float, dx: float, dy: float) -> float:
        """与左侧墙或左侧相邻货物之间的水平空隙,越小越应优先(往里靠)。"""
        left_end = 0.0
        for p in c.placements:
            if y + dy <= p.y + 1e-6 or p.y + p.dy <= y + 1e-6:
                continue
            if p.x + p.dx <= x + 1e-6:
                left_end = max(left_end, p.x + p.dx)
        return x - left_end

    def _floor_void_rect(
        self, c: Container, x0: float, x1: float, y0: float, y1: float,
    ) -> float:
        """矩形底面 [x0,x1)×[y0,y1) 内未被 z≈0 货物占用的面积(假设灌水时可渗入的空洞)。"""
        if x1 <= x0 + 1e-6 or y1 <= y0 + 1e-6:
            return 0.0
        rect_area = (x1 - x0) * (y1 - y0)
        covered = 0.0
        for p in c.placements:
            if p.z > 1e-6:
                continue
            ox0 = max(x0, p.x)
            ox1 = min(x1, p.x + p.dx)
            oy0 = max(y0, p.y)
            oy1 = min(y1, p.y + p.dy)
            if ox1 > ox0 + 1e-6 and oy1 > oy0 + 1e-6:
                covered += (ox1 - ox0) * (oy1 - oy0)
        return max(0.0, rect_area - covered)

    def _interior_floor_void_area(self, c: Container, x_max: float) -> float:
        return _interior_floor_void_area_static(c, x_max)

    def _void_fill_points(
        self, c: Container, x_max: float,
    ) -> list[tuple[float, float, float]]:
        """里侧底板空洞起点,优先把假设灌水时可渗入的低 x 缝隙填实。"""
        ys: set[float] = {0.0}
        for p in c.placements:
            ys.add(p.y)
            ys.add(p.y + p.dy)
        ys_sorted = sorted(ys)
        pts: set[tuple[float, float, float]] = set()
        for i in range(len(ys_sorted) - 1):
            y0, y1 = ys_sorted[i], ys_sorted[i + 1]
            if y1 <= y0 + 1e-6:
                continue
            for gx0, gx1 in _void_gaps_in_strip(c, y0, y1, x_max):
                if gx1 - gx0 < 1e-6:
                    continue
                pts.add((gx0, y0, 0.0))
                if gx1 < x_max - 1e-6:
                    pts.add((gx1, y0, 0.0))
        return sorted(pts, key=lambda t: (t[0], t[1]))

    def _ahead_of_void_penalty(self, c: Container, x: float, x_cap: float | None) -> float:
        """跳过里侧底板洞、直接占更外层的惩罚。"""
        cap = x_cap if x_cap is not None else c.length
        void_area = self._interior_floor_void_area(c, cap)
        if void_area <= 80.0 or x <= 15.0:
            return 0.0
        return void_area * 0.08 + x * 0.5

    def _interior_water_penalty(
        self, c: Container, x: float, y: float, z: float,
        dx: float, dy: float, dz: float,
    ) -> float:
        """
        假设灌水检验:柜内深处(x 小)可进水体积应尽量小。
        惩罚里侧底板空洞、水平缝、立柱上方空腔及未贴里墙留缝。
        """
        L, H = c.length, c.height
        center_x = x + dx / 2
        inside_w = max(0.0, 1.0 - center_x / max(L, 1e-6)) ** 2

        behind_floor_void = self._floor_void_rect(c, 0.0, x, y, y + dy)
        behind_strip_void = 0.0
        cap_x = min(x, c.length * 0.7)
        if cap_x > 1e-6:
            behind_strip_void = self._interior_floor_void_area(c, cap_x) * 0.02
        left_gap = self._left_gap(c, x, y, dx, dy)
        front_gap = self._front_gap(c, x, y, dx, dy)
        seam_depth = max(dz, H * 0.15)
        headroom = max(0.0, H - (z + dz))
        column_open = dx * dy * headroom
        wall_gap = x if x > 1e-6 else 0.0
        ahead = self._ahead_of_void_penalty(c, x, cap_x)

        return inside_w * (
            behind_floor_void * H * 5.0
            + behind_strip_void * H
            + (left_gap * dy + front_gap * dx) * seam_depth * 3.0
            + column_open * 0.8
            + wall_gap * dy * H * 0.2
        ) + ahead

    def _compact_floor_points(self, c: Container) -> list[tuple[float, float, float]]:
        """紧凑底板候选:柜角、天际线贴靠点、里侧空洞填缝点。"""
        pts: set[tuple[float, float, float]] = {(0.0, 0.0, 0.0)}
        ys: set[float] = {0.0}
        max_used = max((p.x + p.dx for p in c.placements), default=c.length)
        for p in c.placements:
            ys.add(p.y)
            ys.add(p.y + p.dy)
            pts.add((p.x + p.dx, p.y, 0.0))
            pts.add((p.x, p.y + p.dy, 0.0))
            if p.z <= 1e-6:
                pts.add((p.x, p.y, 0.0))
        for y in ys:
            pts.add((0.0, y, 0.0))
            skyline = 0.0
            for p in c.placements:
                if p.z > 1e-6:
                    continue
                if y + 1e-6 < p.y or p.y + p.dy <= y + 1e-6:
                    continue
                skyline = max(skyline, p.x + p.dx)
            if skyline > 1e-6:
                pts.add((skyline, y, 0.0))
        if self.pack_strategy == STRATEGY_DOOR_LAST and max_used > 1e-6:
            for pt in self._void_fill_points(c, max_used):
                pts.add(pt)
        return sorted(pts, key=lambda t: (t[0], t[1]))

    def _floor_candidate_points(self, c: Container) -> list[tuple[float, float, float]]:
        return self._compact_floor_points(c)

    def _extreme_points(self, c: Container):
        pts = {(0.0, 0.0, 0.0)}
        for p in c.placements:
            pts.add((p.x + p.dx, p.y, p.z))
            pts.add((p.x, p.y + p.dy, p.z))
            pts.add((p.x, p.y, p.z + p.dz))
        # 低处、门对侧优先遍历
        return sorted(pts, key=lambda t: (t[2], t[0], t[1]))


    def _flat_rotation_allowed(self, item: Item) -> bool:
        mn = min(item.length, item.width, item.height)
        for rot in item.allowed_rotations:
            _, _, dz = item.dims_for(rot)
            if dz <= mn + 2.0:
                return True
        return False

    def _orientation_rank_penalty(
        self, c: Container, item: Item, rot, dx: float, dy: float, dz: float,
    ) -> float:
        """在允许方向内:宽平放优先、同类统一为装柜前预定的主朝向。"""
        mn = min(item.length, item.width, item.height)
        pen = 0.0
        if self._flat_rotation_allowed(item) and dz > mn + 2.0:
            pen += (dz - mn) * 4.0
        pref = self._sku_preferred_rotation(item)
        if tuple(rot) != tuple(pref):
            pen += 80.0
        return pen

    def _placement_rank_key(
        self, c: Container, item: Item, rot, x: float, y: float, z: float,
        dx: float, dy: float, dz: float,
    ) -> tuple:
        """
        位姿排序(越小越优);末位 _rank_suffix 保证全序、无随机并列。
        door_last: 里侧深度→朝向→灌水→重心→门区→填缝→贴靠→纵向平衡。
        extreme_point: 朝向→贴地→重心→门区→填缝→贴靠→深度。
        """
        L, W = c.length, c.width
        cx = x + dx / 2
        cy = y + dy / 2
        cz = z + dz / 2
        cog_x, cog_y, _ = self._cog_after_place(c, item.weight, cx, cy, cz)
        y_off = abs(cog_y - W / 2) / max(W / 2, 1e-6)
        x_off = abs(cog_x - L / 2) / max(L / 2, 1e-6)
        door_void = L - (x + dx)
        in_door_band = x + dx >= L * 0.8
        runway = self._runway_gap_penalty(c, x, dx) if in_door_band else self._runway_gap_penalty(c, x, dx) * 0.25
        contacts = self._contact_score(c, x, y, z, dx, dy, dz)
        left_gap = self._left_gap(c, x, y, dx, dy)
        front_gap = self._front_gap(c, x, y, dx, dy)
        deep = cx < L * 0.55

        if self.pack_strategy == STRATEGY_DOOR_LAST:
            water_pen = self._interior_water_penalty(c, x, y, z, dx, dy, dz)
            orient_pen = self._orientation_rank_penalty(c, item, rot, dx, dy, dz)
            return (
                x * 6.0 + z * 0.25,
                orient_pen,
                water_pen,
                y_off * 10.0,
                runway,
                left_gap * (3.0 if deep else 1.0),
                front_gap * (2.5 if deep else 1.0),
                door_void if in_door_band else door_void * 0.15,
                -contacts,
                y,
                x_off * 3.0,
                *self._rank_suffix(rot, x, y, z),
            )
        return (
            self._orientation_rank_penalty(c, item, rot, dx, dy, dz),
            z,
            y_off * 10.0,
            runway,
            left_gap,
            front_gap,
            door_void if in_door_band else door_void * 0.3,
            -contacts,
            x,
            y,
            x_off * 3.0,
            *self._rank_suffix(rot, x, y, z),
        )

    def _best_among_points_with_rots(
        self, c: Container, item: Item, points, rots: tuple,
        x_cap: float | None = None,
        prefer_points: list[tuple[float, float, float]] | None = None,
    ):
        inside_first = self.pack_strategy == STRATEGY_DOOR_LAST and item.stackable
        pt_key = lambda t: (t[0], t[2], t[1])

        def _merge_points(*groups) -> list[tuple[float, float, float]]:
            seen: set[tuple[float, float, float]] = set()
            merged: list[tuple[float, float, float]] = []
            for grp in groups:
                for pt in grp:
                    if pt in seen:
                        continue
                    seen.add(pt)
                    merged.append(pt)
            return sorted(merged, key=pt_key)

        floor_list = _merge_points(
            ((x, y, 0.0) for x, y, _ in self._floor_candidate_points(c)),
            ((x, y, z) for x, y, z in points if z <= 1e-6),
            ((x, y, 0.0) for x, y, z in (prefer_points or [])),
        )
        if x_cap is not None and x_cap >= c.length * 0.82:
            ys = {0.0}
            for p in c.placements:
                ys.add(p.y)
                ys.add(p.y + p.dy)
            extra = []
            for rot in rots:
                dx, _, _ = item.dims_for(rot)
                if dx <= c.length + 1e-6:
                    for y in sorted(ys):
                        extra.append((c.length - dx, y, 0.0))
            floor_list = _merge_points(floor_list, extra)

        ordered_floor = floor_list
        if prefer_points:
            pref = {(x, y, 0.0) for x, y, z in prefer_points}
            ordered_floor = [p for p in floor_list if p in pref]
            ordered_floor += [p for p in floor_list if p not in ordered_floor]

        floor_best = None
        for x, y, z in ordered_floor:
            for rot in rots:
                dx, dy, dz = item.dims_for(rot)
                if x_cap is not None and x + dx > x_cap + 1e-6:
                    continue
                if not self._feasible(c, item, rot, x, y, z):
                    continue
                key = self._placement_rank_key(c, item, rot, x, y, z, dx, dy, dz)
                slot = (key, x, y, z, dx, dy, dz, rot)
                if floor_best is None or key < floor_best[0]:
                    floor_best = slot

        if not inside_first:
            if floor_best is not None or not item.stackable:
                return floor_best

        stack_pts = sorted(points, key=pt_key) if inside_first else sorted(points, key=lambda t: (t[2], t[0], t[1]))
        stack_best = None
        for x, y, z in stack_pts:
            if z <= 1e-6:
                continue
            for rot in rots:
                dx, dy, dz = item.dims_for(rot)
                if x_cap is not None and x + dx > x_cap + 1e-6:
                    continue
                if not self._feasible(c, item, rot, x, y, z):
                    continue
                key = self._placement_rank_key(c, item, rot, x, y, z, dx, dy, dz)
                slot = (key, x, y, z, dx, dy, dz, rot)
                if stack_best is None or key < stack_best[0]:
                    stack_best = slot

        if inside_first:
            if floor_best and stack_best:
                return floor_best if floor_best[0] <= stack_best[0] else stack_best
            return floor_best or stack_best
        return stack_best

    def _best_among_points(
        self, c: Container, item: Item, points, x_cap: float | None = None,
        prefer_points: list[tuple[float, float, float]] | None = None,
    ):
        """
        在极点中寻最优位;遍历顺序与评分键均固定,并列无隐式随机。
        先仅用该 SKU 预定主朝向;若无任何可行位再回退其他允许朝向。
        """
        all_rots = self._sorted_allowed_rots(item)
        pref = self._sku_preferred_rotation(item)
        phases: list[tuple] = []
        if pref in all_rots:
            phases.append((pref,))
        # 门侧渐进扩展深度时:不临时改用更窄朝向,等 x_cap 够大再用主朝向
        allow_fallback = x_cap is None or x_cap >= c.length - 1e-6
        if allow_fallback:
            if len(all_rots) > 1:
                phases.append(all_rots)
            elif not phases:
                phases.append(all_rots)
        for rots in phases:
            best = self._best_among_points_with_rots(
                c, item, points, rots, x_cap=x_cap, prefer_points=prefer_points,
            )
            if best is not None:
                return best
        return None

    def _append_placement(self, c: Container, item: Item, x, y, z, dx, dy, dz, rot):
        seq = len(c.placements) + 1
        c.placements.append(Placement(item, x, y, z, dx, dy, dz, rot=rot, seq=seq))

    def _try_place_extreme(self, c: Container, item: Item) -> bool:
        best = self._best_among_points(c, item, self._extreme_points(c))
        if best is None:
            return False
        _, x, y, z, dx, dy, dz, rot = best
        self._append_placement(c, item, x, y, z, dx, dy, dz, rot)
        return True

    def _try_place_door_opposite_first(self, c: Container, item: Item) -> bool:
        """
        门在 x=长。假设灌水检验:深处先填实、里侧空隙最小,再小步向门侧扩展。
        先在当前已占深度内紧凑填缝,避免跳过里侧底板洞直接占门外层。
        """
        length = c.length
        bands = 128
        step = length / bands
        cid = self._container_key(c)
        limit = self._door_depth_limit.get(cid, step)
        points = self._extreme_points(c)
        max_used = max((p.x + p.dx for p in c.placements), default=0.0)

        # 阶段1a:里侧底板仍有空洞时,优先在空洞点填缝
        if max_used > 1e-6:
            void_area = self._interior_floor_void_area(c, max_used)
            if void_area > 80.0:
                void_pts = self._void_fill_points(c, max_used)
                if void_pts:
                    best = self._best_among_points(
                        c, item, points, x_cap=max_used, prefer_points=void_pts,
                    )
                    if best is not None:
                        _, x, y, z, dx, dy, dz, rot = best
                        self._append_placement(c, item, x, y, z, dx, dy, dz, rot)
                        self._door_depth_limit[cid] = max(limit, x + dx)
                        return True

        # 阶段1b:仅在当前最大深度内填缝(不向前扩展)
        if max_used > 1e-6:
            best = self._best_among_points(c, item, points, x_cap=max_used)
            if best is not None:
                _, x, y, z, dx, dy, dz, rot = best
                self._append_placement(c, item, x, y, z, dx, dy, dz, rot)
                self._door_depth_limit[cid] = max(limit, x + dx)
                return True

        # 阶段2:小步向门侧扩大可放置深度
        limit = max(limit, max_used + step)
        while limit <= length + 1e-6:
            best = self._best_among_points(c, item, points, x_cap=limit)
            if best is not None:
                _, x, y, z, dx, dy, dz, rot = best
                self._append_placement(c, item, x, y, z, dx, dy, dz, rot)
                self._door_depth_limit[cid] = max(limit, x + dx)
                return True
            limit += step
            self._door_depth_limit[cid] = limit
        return False

    def _try_place(self, c: Container, item: Item) -> bool:
        if self.pack_strategy == STRATEGY_DOOR_LAST:
            return self._try_place_door_opposite_first(c, item)
        return self._try_place_extreme(c, item)

    def clear_placements(self):
        self._pref_rot_cache.clear()
        for c in self.containers:
            c.placements.clear()
        self.unpacked = []
        self._door_depth_limit.clear()

    def _reassign_load_sequence(self, c: Container):
        """按装柜实际操作顺序重排序号:从门对侧(里,x小)到门侧(外,x大)。"""
        for i, p in enumerate(
            sorted(c.placements, key=lambda pl: (pl.x, pl.z, pl.y, pl.item.name)),
            start=1,
        ):
            p.seq = i

    def _build_pack_sequence(
        self, bigger_first: bool = True, item_order: list[int] | None = None,
    ) -> list[Item]:
        """装柜顺序:load_order 小者先装(靠里),同序内重货大货优先。"""
        if item_order is not None:
            items = [self.items[i] for i in item_order]
        else:
            items = list(self.items)

        fragile = [it for it in items if not it.stackable]
        stackable = [it for it in items if it.stackable]

        def stack_key(it: Item) -> tuple:
            if bigger_first:
                return (it.load_order, -it.weight, -it.volume, it.stack_level, it.name)
            return (it.load_order, -it.volume, -it.weight, it.name)

        stackable.sort(key=stack_key)
        fragile.sort(key=lambda it: (it.load_order, -it.stack_level, -it.weight, -it.volume, it.name))
        return stackable + fragile

    def _pack_by_load_order_waves(self, items: list[Item]) -> None:
        """门侧策略:按空间顺序分批,先里后外(PalletBox 类先,FlatCarton 类后)。"""
        orders = sorted({it.load_order for it in items})
        for lo in orders:
            wave = [it for it in items if it.load_order == lo]
            wave.sort(key=lambda it: (-it.weight, -it.volume, it.stack_level, it.name))
            for item in wave:
                placed = False
                for c in self.containers:
                    if self._try_place(c, item):
                        placed = True
                        break
                if not placed:
                    self.unpacked.append(item)

    def pack(self, bigger_first: bool = True, item_order: list[int] | None = None):
        self.clear_placements()
        self._max_load_order_cache = None
        items = self._build_pack_sequence(bigger_first, item_order)
        multi_band = (
            self.pack_strategy == STRATEGY_DOOR_LAST
            and len({it.load_order for it in items}) > 1
        )
        if multi_band:
            self._pack_by_load_order_waves(items)
        else:
            for item in items:
                placed = False
                for c in self.containers:
                    if self._try_place(c, item):
                        placed = True
                        break
                if not placed:
                    self.unpacked.append(item)
        for c in self.containers:
            self._reassign_load_sequence(c)
        return self.containers

    def report(self) -> str:
        lines = ["=" * 60, "装柜结果报告", "=" * 60]
        for c in self.containers:
            lines.append(
                f"\n[{c.name}] 内部 {c.length}x{c.width}x{c.height} cm  "
                f"载重上限 {c.max_payload} kg"
            )
            lines.append(
                f"  装入件数: {len(c.placements)}   "
                f"体积利用率: {c.volume_utilization * 100:5.1f}%   "
                f"重量利用率: {c.weight_utilization * 100:5.1f}%   "
                f"({c.used_weight:.0f}/{c.max_payload:.0f} kg)"
            )
            if self.pack_strategy == STRATEGY_DOOR_LAST and c.placements:
                wm = interior_water_metrics(c)
                lines.append(
                    f"  假设灌水: 里侧可进水 {wm['interior_water_liters']:.1f} L  "
                    f"里侧底板填实 {wm['deep_floor_fill_pct']:.1f}%  "
                    f"里侧底板空洞 {wm['interior_floor_void_cm2']:.0f} cm²"
                )
        if self.unpacked:
            lines.append(f"\n未装入货物 ({len(self.unpacked)} 件):")
            for it in self.unpacked:
                lines.append(f"  - {it.name} ({it.length}x{it.width}x{it.height})")
        else:
            lines.append("\n全部货物已装入。")
        lines.append("=" * 60)
        return "\n".join(lines)
