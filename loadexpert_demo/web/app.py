"""
装柜 Web 服务(FastAPI)
复用上级目录的 packer 引擎,提供 /api/pack 装柜接口,并托管前端静态页面。

启动:
    cd loadexpert_demo/web
    python app.py
浏览器打开 http://127.0.0.1:8010 ；局域网用本机 IP:8010
"""
from __future__ import annotations

import os
import sys

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

# 让本文件能 import 上级目录的 packer.py
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from packer import Container, Item, Packer, container_balance, interior_water_metrics  # noqa: E402
import modes  # noqa: E402
import reports  # noqa: E402
import container_recommend  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(HERE, "static")

app = FastAPI(title="装柜专家 Demo", version="0.1.0")


class ContainerIn(BaseModel):
    name: str
    length: float
    width: float
    height: float
    max_payload: float
    count: int = 1
    max_available: int | None = None
    freight_cost: float | None = None
    desc: str = ""
    color: str | None = None
    corner_length: float = 0.0
    corner_width: float = 0.0
    corner_height: float = 0.0
    tare_weight: float = 0.0


ORIENTATION_ROTS = [(0, 1, 2), (0, 2, 1), (1, 0, 2), (1, 2, 0), (2, 0, 1), (2, 1, 0)]


class OrientRuleIn(BaseModel):
    allowed: bool = True
    load_bearing: bool = True
    support_level: int = 1
    self_stack_limit: bool = True
    max_layers: int = 99


def _rotations_from_rules(rules: list[OrientRuleIn] | None, legacy_orientations: list[bool] | None) -> tuple:
    from packer import ALL_ROTATIONS
    if rules and len(rules) >= 6:
        rots = [ORIENTATION_ROTS[i] for i, r in enumerate(rules[:6]) if r.allowed]
        return tuple(rots) if rots else tuple(ALL_ROTATIONS)
    return _rotations_from_orientations(legacy_orientations)


def _rules_to_tuple(rules: list[OrientRuleIn] | None, max_stack: int) -> tuple:
    from packer import _default_orient_rules
    if not rules or len(rules) < 6:
        return _default_orient_rules(max_stack)
    return tuple({
        "allowed": r.allowed,
        "load_bearing": r.load_bearing,
        "support_level": r.support_level,
        "self_stack_limit": r.self_stack_limit,
        "max_layers": r.max_layers,
    } for r in rules[:6])


def _effective_dims(it: "ItemIn") -> tuple[float, float, float]:
    oL = it.orig_length if it.orig_length is not None else it.length
    oW = it.orig_width if it.orig_width is not None else it.width
    oH = it.orig_height if it.orig_height is not None else it.height
    mode = it.deform_mode or "final"
    coeff = it.deform_coeff or [0, 0, 0]
    tol = it.deform_tol or [0, 0, 0]
    if mode == "original":
        return oL, oW, oH
    if mode == "coeff":
        return (
            oL * (1 + coeff[0] / 100),
            oW * (1 + coeff[1] / 100),
            oH * (1 + coeff[2] / 100),
        )
    if mode == "tol":
        return (oL + tol[0] / 10, oW + tol[1] / 10, oH + tol[2] / 10)
    return it.length, it.width, it.height


def _rotations_from_orientations(orientations: list[bool] | None) -> tuple:
    if not orientations:
        from packer import ALL_ROTATIONS
        return tuple(ALL_ROTATIONS)
    rots = [ORIENTATION_ROTS[i] for i, ok in enumerate(orientations[:6]) if ok]
    if not rots:
        from packer import ALL_ROTATIONS
        return tuple(ALL_ROTATIONS)
    return tuple(rots)


class ItemIn(BaseModel):
    name: str
    length: float
    width: float
    height: float
    weight: float
    qty: int = 1
    stackable: bool = True
    color: str | None = None
    desc: str = ""
    price: float = 0
    pcs_per_box: int = 1
    stack_level: int = 5
    max_stack_layers: int = 99
    gross_weight: float | None = None
    orientations: list[bool] | None = None
    orient_rules: list[OrientRuleIn] | None = None
    orig_length: float | None = None
    orig_width: float | None = None
    orig_height: float | None = None
    deform_mode: str = "final"
    deform_coeff: list[float] | None = None
    deform_tol: list[float] | None = None
    min_support_ratio: float | None = None
    min_support: list[float] | None = None   # 货物详情: L/W/H 三轴最少底部承托 0~1
    qty_fixed: bool = True              # 数量不定:false=尽量多装
    load_order: int = 0                 # 多货多柜:从里到外,小者优先靠里
    volume_ratio: float = 1.0           # 体积配比:相对体积权重


class PackRequest(BaseModel):
    containers: list[ContainerIn]
    items: list[ItemIn]
    support_surface_ratio: float = Field(0.70, ge=0.0, le=1.0)
    bigger_first: bool = True
    pack_strategy: str = "door_last"   # extreme_point | door_last
    pack_mode: str = modes.MODE_MULTI_MULTI


def _cargo_spatial_score(it: ItemIn) -> float:
    """越大越应靠里(先装):托盘/大箱优先里侧,扁箱小件靠门。"""
    L, W, H = _effective_dims(it)
    return L * W * H * max(it.weight, 0.1) + L * W * 50.0


def _assign_default_load_orders(items: list[ItemIn]) -> None:
    """未区分空间顺序时,按体积重量自动分配:大件靠里、小件靠门。"""
    if len({it.load_order for it in items}) > 1:
        return
    stackable = [it for it in items if it.stackable]
    fragile = [it for it in items if not it.stackable]
    ranked = sorted(stackable, key=lambda it: -_cargo_spatial_score(it))
    for i, it in enumerate(ranked):
        it.load_order = i
    base = len(ranked)
    for i, it in enumerate(
        sorted(fragile, key=lambda it: (-it.stack_level, -_cargo_spatial_score(it))),
    ):
        it.load_order = base + i


def _build_packer(req: PackRequest) -> Packer:
    packer = Packer(
        support_surface_ratio=req.support_surface_ratio,
        pack_strategy=req.pack_strategy,
    )
    items_input = list(req.items)
    if req.pack_mode in (
        modes.MODE_MULTI_MULTI,
        modes.MODE_VOLUME_RATIO,
        modes.MODE_VARIABLE_QTY,
    ):
        _assign_default_load_orders(items_input)
        items_input.sort(key=lambda it: (it.load_order, it.name))

    for c in req.containers:
        n = max(1, c.count)
        if c.max_available is not None:
            n = min(n, max(0, c.max_available))
        if n <= 0:
            continue
        for i in range(n):
            packer.add_container(Container(
                name=f"{c.name}-{i + 1}" if n > 1 else c.name,
                length=c.length, width=c.width, height=c.height,
                max_payload=c.max_payload,
                desc=c.desc, color=c.color,
                corner_length=c.corner_length, corner_width=c.corner_width,
                corner_height=c.corner_height, tare_weight=c.tare_weight,
            ))
    for it in items_input:
        L, W, H = _effective_dims(it)
        rots = _rotations_from_rules(it.orient_rules, it.orientations)
        rules = _rules_to_tuple(it.orient_rules, it.max_stack_layers)
        coeff = tuple((it.deform_coeff or [0, 0, 0])[:3])
        tol = tuple((it.deform_tol or [0, 0, 0])[:3])
        if it.min_support and len(it.min_support) >= 3:
            min_axes = tuple(float(v) for v in it.min_support[:3])
            min_ratio = it.min_support_ratio if it.min_support_ratio is not None else min(min_axes)
        else:
            fallback = it.min_support_ratio if it.min_support_ratio is not None else req.support_surface_ratio
            min_axes = (fallback, fallback, fallback)
            min_ratio = it.min_support_ratio
        packer.add_item(
            Item(
                name=it.name, length=L, width=W, height=H, weight=it.weight,
                stackable=it.stackable, color=it.color,
                desc=it.desc, price=it.price, pcs_per_box=it.pcs_per_box,
                stack_level=it.stack_level, max_stack_layers=it.max_stack_layers,
                load_order=it.load_order,
                gross_weight=it.gross_weight,
                orig_length=it.orig_length or it.length,
                orig_width=it.orig_width or it.width,
                orig_height=it.orig_height or it.height,
                deform_mode=it.deform_mode,
                deform_coeff=coeff, deform_tol=tol,
                min_support_ratio=min_ratio,
                min_support_axes=min_axes,
                orient_rules=rules,
                allowed_rotations=rots,
            ),
            qty=max(1, it.qty),
        )
    return packer


def _run_trial_pack(req: PackRequest, containers_spec: list[dict]) -> container_recommend.TrialResult:
    """试算一组集装箱配置,返回装载与运费摘要(用于推荐搜索)。"""
    trial_req = req.model_copy(update={
        "containers": [ContainerIn(**c) for c in containers_spec],
    })
    packer = _build_packer(trial_req)
    item_order = None
    if req.pack_mode in (
        modes.MODE_MULTI_MULTI,
        modes.MODE_VOLUME_RATIO,
        modes.MODE_VARIABLE_QTY,
    ) and packer.items:
        item_order = list(range(len(packer.items)))
    modes.run_pack_mode(
        packer, req.pack_mode,
        bigger_first=req.bigger_first,
        item_order=item_order,
        req_meta=_build_req_meta(trial_req, packer),
    )
    req_meta = _build_req_meta(trial_req, packer)
    freight = modes._estimate_freight(req_meta)
    if freight is None:
        freight = round(sum(
            float(c.get("freight_cost") or container_recommend._freight_of(c)) * max(1, int(c.get("count") or 1))
            for c in containers_spec
        ), 2)
    loaded = sum(len(c.placements) for c in packer.containers)
    return container_recommend.TrialResult(
        unpacked_count=len(packer.unpacked),
        loaded_count=loaded,
        container_count=sum(max(1, c["count"]) for c in containers_spec),
        total_freight=freight,
        containers=containers_spec,
    )


def _recommend_for_request(req: PackRequest, current_unpacked: int) -> list[dict]:
    if req.pack_mode != modes.MODE_MULTI_MULTI or current_unpacked <= 0:
        return []
    return container_recommend.recommend_containers(
        req,
        lambda spec: _run_trial_pack(req, spec),
        _effective_dims,
        current_unpacked=current_unpacked,
    )


def _build_req_meta(req: PackRequest, packer: Packer) -> dict:
    freight: dict[str, float] = {}
    for c in req.containers:
        if c.freight_cost is not None:
            freight[c.name] = c.freight_cost
    variable_names = [it.name for it in req.items if not it.qty_fixed]
    used = [{"name": c.name} for c in packer.containers if c.placements]
    return {
        "freight_by_name": freight,
        "variable_item_names": variable_names,
        "used_containers": used,
        "volume_ratios": {it.name: it.volume_ratio for it in req.items},
    }


def _packer_to_response(packer: Packer) -> dict:
    containers_out = []
    for c in packer.containers:
        entry = {
            "name": c.name,
            "length": c.length, "width": c.width, "height": c.height,
            "max_payload": c.max_payload,
            "desc": c.desc, "color": c.color,
            "corner_length": c.corner_length, "corner_width": c.corner_width,
            "corner_height": c.corner_height, "tare_weight": c.tare_weight,
            "gross_weight": round(c.gross_weight, 1),
            "used_weight": round(c.used_weight, 1),
            "item_count": len(c.placements),
            "volume_utilization": round(c.volume_utilization * 100, 1),
            "weight_utilization": round(c.weight_utilization * 100, 1),
            "balance": container_balance(c),
            "placements": [_placement_dict(p) for p in c.placements],
        }
        if packer.pack_strategy == "door_last" and c.placements:
            entry["water_metrics"] = interior_water_metrics(c)
        containers_out.append(entry)
    unpacked = [
        {"name": it.name, "length": it.length, "width": it.width,
         "height": it.height, "weight": it.weight}
        for it in packer.unpacked
    ]
    out = {
        "containers": containers_out,
        "unpacked": unpacked,
        "total_items": len(packer.items),
        "pack_strategy": packer.pack_strategy,
        "door_side": packer.door_side,
    }
    return out


def _placement_dict(p):
    base = p.item.name.split("#")[0]
    return {
        "name": p.item.name,
        "base_name": base,
        "color": p.item.color,
        "desc": p.item.desc,
        "price": p.item.price,
        "pcs_per_box": p.item.pcs_per_box,
        "x": p.x, "y": p.y, "z": p.z,
        "dx": p.dx, "dy": p.dy, "dz": p.dz,
        "seq": p.seq,
        "weight": round(p.item.weight, 2),
        "load_order": p.item.load_order,
    }


@app.get("/api/pack-modes")
def pack_modes_list():
    return {
        "modes": [
            {"id": m, "label_zh": modes.MODE_META[m]["zh"], "label_en": modes.MODE_META[m]["en"],
             "hint_zh": modes.MODE_META[m]["zh_hint"], "hint_en": modes.MODE_META[m]["en_hint"]}
            for m in modes.PACK_MODES
        ]
    }


@app.post("/api/pack")
def pack(req: PackRequest):
    packer = _build_packer(req)
    req_meta = _build_req_meta(req, packer)
    item_order = None
    if req.pack_mode in (
        modes.MODE_MULTI_MULTI,
        modes.MODE_VOLUME_RATIO,
        modes.MODE_VARIABLE_QTY,
    ) and packer.items:
        item_order = list(range(len(packer.items)))
    mode_extra = modes.run_pack_mode(
        packer, req.pack_mode,
        bigger_first=req.bigger_first,
        item_order=item_order,
        req_meta=req_meta,
    )
    response = {**_packer_to_response(packer), **mode_extra}
    unpacked_n = len(packer.unpacked)
    recs = _recommend_for_request(req, unpacked_n)
    if recs:
        response["container_recommendations"] = recs
        response["recommendation_needed"] = True
    else:
        response["recommendation_needed"] = unpacked_n > 0
    return response


@app.get("/api/template")
def template():
    data = reports.build_template()
    return Response(
        content=data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=cargo_template.xlsx"},
    )


@app.post("/api/import")
async def import_items(file: UploadFile = File(...)):
    raw = await file.read()
    items = reports.parse_items_excel(raw)
    return {"items": items}


@app.post("/api/export/excel")
def export_excel(result: dict):
    data = reports.build_excel_report(result)
    return Response(
        content=data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=loading_report.xlsx"},
    )


@app.post("/api/export/pdf")
def export_pdf(result: dict):
    data = reports.build_pdf_report(result)
    return Response(
        content=data,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=loading_report.pdf"},
    )


@app.post("/api/report")
def view_report(result: dict):
    html = reports.build_html_report(result)
    return Response(content=html, media_type="text/html; charset=utf-8")


@app.get("/")
def index():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))


app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8010)
