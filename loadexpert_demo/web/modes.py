"""
四种装柜方式调度层。

P0: 统一入口 + 模式元数据; 各模式算法分阶段实现。
"""
from __future__ import annotations

from packer import Packer

MODE_MULTI_MULTI = "multi_multi"       # 多货多柜
MODE_SINGLE_MULTI = "single_multi"     # 单货多柜
MODE_VOLUME_RATIO = "volume_ratio"     # 体积配比
MODE_VARIABLE_QTY = "variable_qty"     # 数量不定

PACK_MODES = (
    MODE_MULTI_MULTI,
    MODE_SINGLE_MULTI,
    MODE_VOLUME_RATIO,
    MODE_VARIABLE_QTY,
)

MODE_META = {
    MODE_MULTI_MULTI: {
        "zh": "多货多柜",
        "en": "Multi cargo · multi container",
        "zh_hint": "多种货物+备选箱型(可限最多数量/运费),求全装完且运费最省;可设从里到外装柜顺序。",
        "en_hint": "Multiple SKUs and container types; minimize freight while loading all; optional load order.",
    },
    MODE_SINGLE_MULTI: {
        "zh": "单货多柜",
        "en": "Single cargo · multi container",
        "zh_hint": "一种(套)货物+多种箱型,生成多种装柜方案供对比选择。",
        "en_hint": "One cargo type/set and several container types; multiple loading scenarios.",
    },
    MODE_VOLUME_RATIO: {
        "zh": "体积配比",
        "en": "Volume ratio",
        "zh_hint": "多种货物按体积比配载,多种箱型,输出多种比例装柜方案。",
        "en_hint": "Load by volume ratio across SKUs; multiple container scenarios.",
    },
    MODE_VARIABLE_QTY: {
        "zh": "数量不定",
        "en": "Variable quantity",
        "zh_hint": "固定数量货物必须全装;单箱型;剩余空间尽量多装不定量货物。",
        "en_hint": "Fixed qty must fit; one container type; maximize variable-qty cargo in leftover space.",
    },
}


def normalize_mode(mode: str | None) -> str:
    if mode in PACK_MODES:
        return mode
    return MODE_MULTI_MULTI


def run_pack_mode(
    packer: Packer,
    mode: str,
    *,
    bigger_first: bool = True,
    item_order: list[int] | None = None,
    req_meta: dict | None = None,
) -> dict:
    """
    按装柜方式执行并返回扩展结果字段。

    当前 P0: 各模式均走基础 pack(); 后续替换为专用求解器。
    """
    mode = normalize_mode(mode)
    packer.pack(bigger_first=bigger_first, item_order=item_order)
    extra: dict = {
        "pack_mode": mode,
        "mode_status": "stub",
        "total_freight": None,
        "scenarios": None,
        "variable_loaded": None,
        "plan_summary": None,
    }

    if mode == MODE_MULTI_MULTI:
        extra["mode_status"] = "legacy_greedy"
        extra["plan_summary"] = _container_usage_summary(packer)
        extra["total_freight"] = _estimate_freight(req_meta)

    elif mode == MODE_SINGLE_MULTI:
        extra["mode_status"] = "pending"
        extra["scenarios"] = _stub_single_multi_scenarios(packer)

    elif mode == MODE_VOLUME_RATIO:
        extra["mode_status"] = "pending"
        extra["scenarios"] = _stub_volume_ratio_scenarios(packer)

    elif mode == MODE_VARIABLE_QTY:
        extra["mode_status"] = "pending"
        extra["variable_loaded"] = _stub_variable_loaded(packer, req_meta)

    return extra


def _container_usage_summary(packer: Packer) -> dict[str, int]:
    out: dict[str, int] = {}
    for c in packer.containers:
        if not c.placements:
            continue
        base = c.name.rsplit("-", 1)[0] if "-" in c.name else c.name
        out[base] = out.get(base, 0) + 1
    return out


def _estimate_freight(req_meta: dict | None) -> float | None:
    if not req_meta:
        return None
    costs = req_meta.get("freight_by_name") or {}
    total = 0.0
    found = False
    for c in req_meta.get("used_containers") or []:
        name = c.get("name", "")
        base = name.rsplit("-", 1)[0] if "-" in name else name
        cost = costs.get(name) or costs.get(base)
        if cost is not None:
            total += float(cost)
            found = True
    return round(total, 2) if found else None


def _stub_single_multi_scenarios(packer: Packer) -> list[dict]:
    """占位: 未来将按箱型生成多方案。"""
    scenarios = []
    for c in packer.containers:
        if not c.placements:
            continue
        scenarios.append({
            "id": len(scenarios) + 1,
            "label": c.name,
            "container_count": 1,
            "item_count": len(c.placements),
            "volume_utilization": round(c.volume_utilization * 100, 1),
            "note": "stub — full single-multi solver pending",
        })
    return scenarios or None


def _stub_volume_ratio_scenarios(packer: Packer) -> list[dict]:
    """占位: 未来将输出体积比偏差与方案列表。"""
    if not packer.containers or not any(c.placements for c in packer.containers):
        return None
    c = next(c for c in packer.containers if c.placements)
    vol_by_name: dict[str, float] = {}
    total = 0.0
    for p in c.placements:
        v = p.volume
        base = p.item.base_name
        vol_by_name[base] = vol_by_name.get(base, 0.0) + v
        total += v
    ratios = {k: round(v / total * 100, 1) for k, v in vol_by_name.items()} if total else {}
    return [{
        "id": 1,
        "label": c.name,
        "actual_volume_pct": ratios,
        "note": "stub — target ratio comparison pending",
    }]


def _stub_variable_loaded(packer: Packer, req_meta: dict | None) -> dict[str, int] | None:
    """占位: 未来将区分 fixed / variable 计数。"""
    if not req_meta:
        return None
    variable_names = set(req_meta.get("variable_item_names") or [])
    if not variable_names:
        return None
    counts: dict[str, int] = {}
    for c in packer.containers:
        for p in c.placements:
            base = p.item.base_name
            if base in variable_names or p.item.name.split("#")[0] in variable_names:
                counts[base] = counts.get(base, 0) + 1
    return counts or None
