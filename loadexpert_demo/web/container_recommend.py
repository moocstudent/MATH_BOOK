"""
集装箱组合推荐:柜数尽量少、装货尽量多、运费尽量低。
用于用户所选集装箱装不完时,从备选箱型中搜索更优方案。
"""
from __future__ import annotations

import math
from copy import deepcopy
from dataclasses import dataclass
from typing import Any, Callable

# 默认箱型目录(与前端 CONTAINER_PRESETS 对齐;运费为估算值 USD/柜)
CATALOG: list[dict[str, Any]] = [
    {"name": "COSCO 20", "length": 590, "width": 234, "height": 235, "max_payload": 28000, "freight_cost": 25},
    {"name": "COSCO 40", "length": 1180, "width": 234, "height": 235, "max_payload": 26500, "freight_cost": 38},
    {"name": "COSCO 40HQ", "length": 1180, "width": 234, "height": 269, "max_payload": 26500, "freight_cost": 42},
    {"name": "EVERGREEN 40HQ", "length": 1203, "width": 235, "height": 269, "max_payload": 26500, "freight_cost": 44},
    {"name": "PNO 20", "length": 589, "width": 234.5, "height": 240, "max_payload": 28000, "freight_cost": 26},
    {"name": "PNO 40", "length": 1201.5, "width": 234.5, "height": 236.2, "max_payload": 26500, "freight_cost": 40},
    {"name": "PNO 40HQ", "length": 1201.5, "width": 234.5, "height": 269, "max_payload": 26500, "freight_cost": 43},
    {"name": "STD 20", "length": 586, "width": 232, "height": 235, "max_payload": 28000, "freight_cost": 24},
    {"name": "STD 40", "length": 1200, "width": 232, "height": 235, "max_payload": 26500, "freight_cost": 37},
    {"name": "STD 40 HQ", "length": 1200, "width": 232, "height": 265, "max_payload": 26500, "freight_cost": 41},
]


@dataclass
class TrialResult:
    unpacked_count: int
    loaded_count: int
    container_count: int
    total_freight: float | None
    containers: list[dict[str, Any]]


def _freight_of(ct: dict[str, Any]) -> float:
    fc = ct.get("freight_cost")
    if fc is not None:
        return float(fc)
    L, H = float(ct["length"]), float(ct["height"])
    if L < 650:
        return 25.0
    if H >= 265:
        return 43.0
    return 38.0


def _usable_volume(ct: dict[str, Any]) -> float:
    cl = float(ct.get("corner_length") or 0)
    cw = float(ct.get("corner_width") or 0)
    ch = float(ct.get("corner_height") or 0)
    L = max(0.0, float(ct["length"]) - 2 * cl)
    W = max(0.0, float(ct["width"]) - 2 * cw)
    H = max(0.0, float(ct["height"]) - 2 * ch)
    return L * W * H


def _cargo_totals(items: list[Any], vol_fn: Callable) -> tuple[float, float, int]:
    vol = wt = 0.0
    n = 0
    for it in items:
        qty = max(1, int(getattr(it, "qty", 1) or 1))
        if getattr(it, "qty_fixed", True) is False:
            continue
        L, W, H = vol_fn(it)
        vol += L * W * H * qty
        wt += float(it.weight) * qty
        n += qty
    return vol, wt, n


def _min_boxes(ct: dict[str, Any], total_vol: float, total_wt: float) -> int:
    uv = _usable_volume(ct)
    by_vol = math.ceil(total_vol / uv) if uv > 1e-6 else 1
    payload = float(ct["max_payload"])
    by_wt = math.ceil(total_wt / payload) if payload > 1e-6 else 1
    return max(1, by_vol, by_wt)


def _container_dict_to_in(ct: dict[str, Any], count: int) -> dict[str, Any]:
    return {
        "name": ct["name"],
        "length": ct["length"],
        "width": ct["width"],
        "height": ct["height"],
        "max_payload": ct["max_payload"],
        "count": count,
        "max_available": ct.get("max_available"),
        "freight_cost": ct.get("freight_cost") if ct.get("freight_cost") is not None else _freight_of(ct),
        "desc": ct.get("desc", ""),
        "color": ct.get("color", "#64748b"),
        "corner_length": ct.get("corner_length", 0),
        "corner_width": ct.get("corner_width", 0),
        "corner_height": ct.get("corner_height", 0),
        "tare_weight": ct.get("tare_weight", 3800),
    }


def _merge_candidates(req_containers: list[Any]) -> list[dict[str, Any]]:
    by_name: dict[str, dict[str, Any]] = {}
    for row in CATALOG:
        by_name[row["name"]] = deepcopy(row)
    for c in req_containers:
        d = c.model_dump() if hasattr(c, "model_dump") else dict(c)
        name = d.get("name") or "Unknown"
        base = name.rsplit("-", 1)[0] if "-" in name else name
        merged = {**by_name.get(base, {}), **d, "name": base}
        if merged.get("freight_cost") is None:
            merged["freight_cost"] = _freight_of(merged)
        by_name[base] = merged
    return list(by_name.values())


def _plan_score(result: TrialResult, total_items: int) -> tuple:
    """越小越优:未装 → 柜数 → 运费 → 少装件数。"""
    return (
        result.unpacked_count,
        result.container_count,
        result.total_freight if result.total_freight is not None else 1e9,
        -(result.loaded_count),
        -(total_items - result.unpacked_count),
    )


def _trial_plan(
    trial_pack: Callable[[list[dict[str, Any]]], TrialResult],
    ct: dict[str, Any],
    count: int,
) -> TrialResult | None:
    max_avail = ct.get("max_available")
    if max_avail is not None and count > int(max_avail):
        return None
    if count <= 0:
        return None
    containers = [_container_dict_to_in(ct, count)]
    return trial_pack(containers)


def _trial_mixed(
    trial_pack: Callable[[list[dict[str, Any]]], TrialResult],
    a: dict[str, Any],
    na: int,
    b: dict[str, Any],
    nb: int,
) -> TrialResult | None:
    if na <= 0 and nb <= 0:
        return None
    containers = []
    if na > 0:
        if a.get("max_available") is not None and na > int(a["max_available"]):
            return None
        containers.append(_container_dict_to_in(a, na))
    if nb > 0:
        if b.get("max_available") is not None and nb > int(b["max_available"]):
            return None
        containers.append(_container_dict_to_in(b, nb))
    return trial_pack(containers)


def recommend_containers(
    req: Any,
    trial_pack: Callable[[list[dict[str, Any]]], TrialResult],
    vol_fn: Callable,
    *,
    current_unpacked: int,
    max_trials: int = 36,
) -> list[dict[str, Any]]:
    """
    搜索推荐方案。仅在 multi_multi 且当前有未装货物时由 app 调用。
    返回按优劣排序的方案列表(最多 5 条)。
    """
    if current_unpacked <= 0:
        return []

    items = list(req.items)
    total_vol, total_wt, total_items = _cargo_totals(items, vol_fn)
    if total_items <= 0:
        return []

    candidates = _merge_candidates(req.containers)
    # 运费效率:每立方米运费越低越优先尝试
    candidates.sort(
        key=lambda ct: (
            _freight_of(ct) / max(_usable_volume(ct), 1.0),
            _freight_of(ct),
        ),
    )

    seen: set[tuple] = set()
    results: list[TrialResult] = []
    trials = 0

    for ct in candidates:
        lo = _min_boxes(ct, total_vol, total_wt)
        hi = lo + 2
        if ct.get("max_available") is not None:
            hi = min(hi, int(ct["max_available"]))
        for n in range(lo, hi + 1):
            if trials >= max_trials:
                break
            key = ("single", ct["name"], n)
            if key in seen:
                continue
            seen.add(key)
            res = _trial_plan(trial_pack, ct, n)
            trials += 1
            if res:
                results.append(res)

    # 双箱型组合(仅当前五类且单箱未全装时)
    if trials < max_trials and not any(r.unpacked_count == 0 for r in results):
        top = candidates[:5]
        for i, a in enumerate(top):
            for b in top[i + 1:]:
                na = _min_boxes(a, total_vol * 0.55, total_wt * 0.55)
                nb = _min_boxes(b, total_vol * 0.55, total_wt * 0.55)
                for da in (0, 1):
                    for db in (0, 1):
                        if trials >= max_trials:
                            break
                        n1, n2 = na + da, nb + db
                        if n1 + n2 <= 0:
                            continue
                        key = ("mix", a["name"], n1, b["name"], n2)
                        if key in seen:
                            continue
                        seen.add(key)
                        res = _trial_mixed(trial_pack, a, n1, b, n2)
                        trials += 1
                        if res:
                            results.append(res)

    if not results:
        return []

    results.sort(key=lambda r: _plan_score(r, total_items))
    out: list[dict[str, Any]] = []
    used_sigs: set[tuple] = set()
    for res in results:
        sig = tuple((c["name"], c["count"]) for c in res.containers)
        if sig in used_sigs:
            continue
        used_sigs.add(sig)
        freight = res.total_freight
        parts = [f"{c['name']}×{c['count']}" for c in res.containers]
        label = " + ".join(parts)
        if res.unpacked_count == 0:
            reason_zh = f"{label} 可装完全部 {total_items} 件"
            reason_en = f"{label} fits all {total_items} pcs"
        else:
            reason_zh = (
                f"{label} 可装 {res.loaded_count}/{total_items} 件"
                f"(仍剩 {res.unpacked_count} 件未装)"
            )
            reason_en = (
                f"{label} loads {res.loaded_count}/{total_items} pcs"
                f" ({res.unpacked_count} left)"
            )
        out.append({
            "rank": len(out) + 1,
            "containers": res.containers,
            "total_containers": res.container_count,
            "total_freight": freight,
            "loaded_count": res.loaded_count,
            "unpacked_count": res.unpacked_count,
            "fits_all": res.unpacked_count == 0,
            "label": label,
            "reason_zh": reason_zh,
            "reason_en": reason_en,
        })
        if len(out) >= 5:
            break
    return out
