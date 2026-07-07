import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ================= i18n =================
const I18N = {
  zh: {
    title: "装柜专家", containers: "集装箱", cargo: "货物", params: "参数",
    add: "+ 添加", template: "模板", import: "导入", pack: "🚀 开始装柜",
    chooseContainer: "选择箱型",
    chooseCargo: "选择货物",
    cargoLibrary: "货物库",
    libraryDblHint: "双击添加到装柜列表;⚙ 编辑库内属性;× 从库中删除",
    libAdd: "+ 新增货物",
    libDelConfirm: "确定从货物库删除该货物?",
    exportExcel: "导出 Excel", exportPdf: "导出 PDF", viewReport: "查看报表", replay: "▶ 重放动画",
    skipAnim: "跳过动画",
    packAnim: "装柜动画",
    ssr: "底面支撑率",
    ssrDefault: "(默认 0.70)",
    name: "名称", L: "长", W: "宽", H: "高", wt: "重",
    payload: "载重", qty: "量", stack: "叠", detail: "货物详情", seq: "装入序号",
    pos: "位置", size: "尺寸", weight: "重量", volUtil: "体积利用率",
    wtUtil: "重量利用率", items: "件", loaded: "装入", notLoaded: "未装入",
    packing: "装柜计算中...", done: "完成", total: "共", err: "出错",
    importOk: "已导入", importing: "导入中...", noResult: "请先装柜再导出",
    exporting: "导出中...", exported: "已导出",
    packStrategy: "码放策略", strategyExtreme: "极点法", strategyDoor: "门侧最后码放(默认)",
    doorFixedHint: "门侧最后:门在 x=长,从里向外码满;假想验—假设门朝天往里灌水,里侧可进水空隙尽量小",
    packMode: "装柜方式",
    modeMultiMulti: "多货多柜",
    modeSingleMulti: "单货多柜",
    modeVolumeRatio: "体积配比",
    modeVariableQty: "数量不定",
    modeHint_multi_multi: "多种货物+备选箱型;求全装完且运费最省;可设从里到外装柜顺序(详情待配置)。",
    modeHint_single_multi: "一种(套)货物+多种箱型;生成多种装柜方案供对比(算法待完善)。",
    modeHint_volume_ratio: "多种货物按体积比配载;多种箱型;输出多种比例方案(算法待完善)。",
    modeHint_variable_qty: "固定数量货物须全装;单箱型;剩余空间尽量多装不定量货(算法待完善)。",
    modePending: "该模式求解器开发中,当前使用基础装柜引擎预览。",
    spatialOrder: "空间顺序",
    spatialOrderHint: "越小越先装(如托盘0);装柜时每种货均从里向外填,与数量无关",
    volumeRatio: "体积比",
    maximizeLoad: "尽量装载",
    singleCargoOnly: "单货多柜模式下只能添加一种货物",
    loadPlan: "装柜方案", loadStep: "装柜步骤", stepNo: "第 {n} 步",
    cargoName: "货物名称", loadOrient: "装柜方向", gridCount: "各方向摆放件数",
    gridDims: "各方向尺寸", stepLoad: "本步装柜", totalLoad: "已经装柜",
    orientStandFwd: "立放,正向", orientStandSide: "立放,横向",
    orientFlatFwd: "卧放,正向", orientSide: "侧放",
    stepHint: "批次数≈柜长÷平均地面深度;从里向外分批装入",
    animOrderHint: "动画:从柜内(门对侧)到门侧",
    itemDetailTitle: "货物详细信息", tabBasic: "尺寸", tabOrient: "摆放限制",
    itemDesc: "描述", netWt: "净重(kg)", grossWt: "毛重(kg)", itemColor: "颜色",
    stackLevel: "堆码级别",
    stackLevelHint: "越高承重越强、装柜越靠后;下方所需承托见摆放限制「承托级别」", itemPrice: "整箱价格", pcsPerBox: "每箱小件数",
    maxStackLayers: "最大堆码层数", orientDir: "摆放方向", orientAllow: "允许",
    orientHint: "可多选摆放方向;取消承重面则上方不可再堆叠", ok: "确定", cancel: "取消", edit: "微调",
    origSize: "原尺寸", deformCoeff: "型变系数", deformTol: "型变公差", deformFinal: "型变后尺寸",
    minSupport: "最少底部承托", sizeUnitLabel: "尺寸单位", weightUnitLabel: "重量单位",
    unitMm: "毫米", unitCm: "厘米", unitDm: "分米", unitM: "米", unitIn: "英寸", unitFt: "英尺",
    unitG: "克", unitKg: "千克", unitT: "吨", unitLb: "磅",
    loadBearing: "承重面", supportLevel: "承托级别", selfStackLimit: "自身堆码限制",
    cogTitle: "重量重心", cogPos: "重心坐标", cogOffset: "偏离柜心",
    cogLong: "纵向", cogLat: "横向", cogVert: "高度",
    towardDoor: "偏门侧", towardInside: "偏里侧", towardHigh: "偏高", towardLow: "偏低",
    cogBalanced: "平衡良好", cogFromDoor: "距门侧", cogFromInside: "距里侧",
    towardRight: "偏右", towardLeft: "偏左",
    cogHoverHint: "悬停高亮重心位置",
    containerDetailTitle: "集装箱详细信息",
    innerDims: "内部尺寸",
    cornerDims: "角件尺寸",
    tareWeight: "空柜自重",
    freight: "运费",
    maxAvailable: "最多可用",
    containerDetailHint: "内部尺寸为可码放外廓;角件从各轴两端扣除,参与装箱边界计算",
    grossWtTotal: "货柜总重",
    recTitle: "集装箱推荐",
    recHint: "当前柜量不足,以下为更少柜数/更低运费的试算方案",
    recApply: "应用并装柜",
    recFreight: "运费",
    recFitsAll: "可全装",
    interiorWater: "里侧可进水(假设灌水)",
    deepFloorFill: "里侧底板填实",
    interiorVoid: "里侧底板空洞",
  },
  en: {
    title: "LoadExpert", containers: "Containers", cargo: "Cargo", params: "Params",
    add: "+ Add", template: "Template", import: "Import", pack: "🚀 Pack",
    chooseContainer: "Container type",
    chooseCargo: "Cargo type",
    cargoLibrary: "Cargo library",
    libraryDblHint: "Double-click to add; ⚙ edit library entry; × remove from library",
    libAdd: "+ New cargo",
    libDelConfirm: "Remove this cargo from the library?",
    exportExcel: "Export Excel", exportPdf: "Export PDF", viewReport: "View report", replay: "▶ Replay",
    skipAnim: "Skip anim",
    packAnim: "Pack animation",
    ssr: "Support ratio",
    ssrDefault: "(default 0.70)",
    name: "Name", L: "L", W: "W", H: "H", wt: "Wt",
    payload: "Payload", qty: "Qty", stack: "Stk", detail: "Item detail", seq: "Load seq",
    pos: "Position", size: "Size", weight: "Weight", volUtil: "Volume util",
    wtUtil: "Weight util", items: "pcs", loaded: "Loaded", notLoaded: "Unpacked",
    packing: "Packing...", done: "Done", total: "Total", err: "Error",
    importOk: "Imported", importing: "Importing...", noResult: "Pack first, then export",
    exporting: "Exporting...", exported: "Exported",
    packStrategy: "Strategy", strategyExtreme: "Extreme point", strategyDoor: "Door side last (default)",
    doorFixedHint: "Door at x=L; inside→door; thought test: if door were up, minimize water-fillable void inside",
    packMode: "Loading mode",
    modeMultiMulti: "Multi cargo · multi box",
    modeSingleMulti: "Single cargo · multi box",
    modeVolumeRatio: "Volume ratio",
    modeVariableQty: "Variable quantity",
    modeHint_multi_multi: "Multiple SKUs + container types; minimize freight; load order inside→door.",
    modeHint_single_multi: "One cargo + container types; multiple scenarios to compare.",
    modeHint_volume_ratio: "Load by volume ratio; multiple container scenarios.",
    modeHint_variable_qty: "Fixed qty must fit; one box type; maximize variable-qty fill.",
    modePending: "Solver in progress; basic engine preview for now.",
    spatialOrder: "Spatial order",
    spatialOrderHint: "Smaller = load earlier (pallet 0); each SKU packs inside→door regardless of qty",
    volumeRatio: "Vol ratio",
    maximizeLoad: "Max fill",
    singleCargoOnly: "Single-cargo mode allows only one SKU",
    loadPlan: "Loading plan", loadStep: "Step", stepNo: "Step {n}",
    cargoName: "Cargo", loadOrient: "Orientation", gridCount: "Grid (L×W×H)",
    gridDims: "Dimensions", stepLoad: "This step", totalLoad: "Loaded so far",
    orientStandFwd: "Upright, forward", orientStandSide: "Upright, sideways",
    orientFlatFwd: "Flat, forward", orientSide: "On side",
    stepHint: "Batches ≈ length ÷ avg floor depth; inside → door",
    animOrderHint: "Anim: inside → door",
    itemDetailTitle: "Cargo details", tabBasic: "Dimensions", tabOrient: "Placement",
    itemDesc: "Description", netWt: "Net wt", grossWt: "Gross wt", itemColor: "Color",
    stackLevel: "Stack level",
    stackLevelHint: "Higher = stronger bearing & later load; min support below = orient support level", itemPrice: "Price/box", pcsPerBox: "Pcs per box",
    maxStackLayers: "Max stack layers", orientDir: "Orientation", orientAllow: "Allow",
    orientHint: "Multi-select orientations; uncheck load-bearing to forbid stacking above", ok: "OK", cancel: "Cancel", edit: "Edit",
    origSize: "Original", deformCoeff: "Deform %", deformTol: "Deform tol", deformFinal: "Final size",
    minSupport: "Min support", sizeUnitLabel: "Size unit", weightUnitLabel: "Weight unit",
    unitMm: "mm", unitCm: "cm", unitDm: "dm", unitM: "m", unitIn: "in", unitFt: "ft",
    unitG: "g", unitKg: "kg", unitT: "t", unitLb: "lb",
    loadBearing: "Load bearing", supportLevel: "Support lvl", selfStackLimit: "Self stack limit",
    cogTitle: "Center of gravity", cogPos: "CoG position", cogOffset: "Offset from center",
    cogLong: "Length", cogLat: "Width", cogVert: "Height",
    towardDoor: "toward door", towardInside: "toward inside", towardHigh: "high", towardLow: "low",
    cogBalanced: "Balanced", cogFromDoor: "from door", cogFromInside: "from inside",
    towardRight: "to starboard", towardLeft: "to port",
    cogHoverHint: "Hover to highlight center of gravity",
    containerDetailTitle: "Container details",
    innerDims: "Internal dims",
    cornerDims: "Corner fitting",
    tareWeight: "Tare weight",
    freight: "Freight",
    maxAvailable: "Max available",
    containerDetailHint: "Internal dims = outer pack envelope; corners inset from each end",
    grossWtTotal: "Gross (cargo+tare)",
    recTitle: "Container suggestions",
    recHint: "Not enough capacity — trials ranked by fewer boxes, more load, lower freight",
    recApply: "Apply & pack",
    recFreight: "Freight",
    recFitsAll: "Fits all",
    interiorWater: "Deep water vol. (hypothetical)",
    deepFloorFill: "Deep floor fill",
    interiorVoid: "Deep floor void",
  },
};
let lang = "zh";
const t = (k) => I18N[lang][k] ?? k;

// ================= 单位 =================
// 内部一律用 cm / kg;imperial 仅影响显示与输入
let unit = "metric";
const CM_PER_IN = 2.54, KG_PER_LB = 0.45359237;
const toLen = (cm) => unit === "metric" ? cm : cm / CM_PER_IN;
const fromLen = (v) => unit === "metric" ? v : v * CM_PER_IN;
const toWt = (kg) => unit === "metric" ? kg : kg / KG_PER_LB;
const fromWt = (v) => unit === "metric" ? v : v * KG_PER_LB;
const lenU = () => unit === "metric" ? "cm" : "in";
const wtU = () => unit === "metric" ? "kg" : "lb";
const r1 = (n) => Math.round(n * 10) / 10;

const UNIT_PREF_KEY = "loadexpert.unitPrefs";
const ANIM_PREF_KEY = "loadexpert.packAnim";
const ITEM_LIB_KEY = "loadexpert.itemLibrary";
const LEN_UNIT_IDS = ["mm", "cm", "dm", "m", "in", "ft"];
const WT_UNIT_IDS = ["g", "kg", "t", "lb"];
let detailLenUnit = "mm";
let detailWtUnit = "kg";
let packAnimEnabled = true;

function loadAnimPref() {
  try {
    const raw = localStorage.getItem(ANIM_PREF_KEY);
    if (raw === null) return;
    packAnimEnabled = raw === "1" || raw === "true";
  } catch (_) { /* ignore */ }
}

function saveAnimPref() {
  try {
    localStorage.setItem(ANIM_PREF_KEY, packAnimEnabled ? "1" : "0");
  } catch (_) { /* ignore */ }
}

function syncPackAnimCheckbox() {
  const el = document.getElementById("pack_anim");
  if (el) el.checked = packAnimEnabled;
}

function wantPackAnim() {
  return packAnimEnabled;
}

window.onPackAnimChange = (checked) => {
  packAnimEnabled = !!checked;
  saveAnimPref();
};

const LEN_UNIT_I18N = {
  mm: "unitMm", cm: "unitCm", dm: "unitDm", m: "unitM", in: "unitIn", ft: "unitFt",
};
const WT_UNIT_I18N = {
  g: "unitG", kg: "unitKg", t: "unitT", lb: "unitLb",
};

function cmToDetailLen(cm, u = detailLenUnit) {
  switch (u) {
    case "mm": return cm * 10;
    case "cm": return cm;
    case "dm": return cm / 10;
    case "m": return cm / 100;
    case "in": return cm / CM_PER_IN;
    case "ft": return cm / (CM_PER_IN * 12);
    default: return cm * 10;
  }
}

function fromDetailLen(v, u = detailLenUnit) {
  switch (u) {
    case "mm": return v / 10;
    case "cm": return v;
    case "dm": return v * 10;
    case "m": return v * 100;
    case "in": return v * CM_PER_IN;
    case "ft": return v * CM_PER_IN * 12;
    default: return v / 10;
  }
}

function formatDetailLen(cm, u = detailLenUnit) {
  const v = cmToDetailLen(cm, u);
  if (u === "mm") return Math.round(v);
  if (u === "m") return Math.round(v * 1000) / 1000;
  return r1(v);
}

function kgToDetailWt(kg, u = detailWtUnit) {
  switch (u) {
    case "g": return kg * 1000;
    case "kg": return kg;
    case "t": return kg / 1000;
    case "lb": return kg / KG_PER_LB;
    default: return kg;
  }
}

function fromDetailWt(v, u = detailWtUnit) {
  switch (u) {
    case "g": return v / 1000;
    case "kg": return v;
    case "t": return v * 1000;
    case "lb": return v * KG_PER_LB;
    default: return v;
  }
}

function formatDetailWt(kg, u = detailWtUnit) {
  const v = kgToDetailWt(kg, u);
  if (u === "g") return Math.round(v);
  if (u === "t") return Math.round(v * 10000) / 10000;
  return r1(v);
}

function loadUnitPrefs() {
  try {
    const raw = localStorage.getItem(UNIT_PREF_KEY);
    if (!raw) return;
    const p = JSON.parse(raw);
    if (LEN_UNIT_IDS.includes(p.len)) detailLenUnit = p.len;
    if (WT_UNIT_IDS.includes(p.wt)) detailWtUnit = p.wt;
  } catch (_) { /* ignore */ }
}

function saveUnitPrefs() {
  try {
    localStorage.setItem(UNIT_PREF_KEY, JSON.stringify({
      len: detailLenUnit,
      wt: detailWtUnit,
    }));
  } catch (_) { /* ignore */ }
}

function fillUnitSelectOptions() {
  const fillLen = (id) => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = LEN_UNIT_IDS.map((uid) =>
      `<option value="${uid}">${t(LEN_UNIT_I18N[uid])}</option>`
    ).join("");
    sel.value = detailLenUnit;
  };
  const fillWt = (id) => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = WT_UNIT_IDS.map((uid) =>
      `<option value="${uid}">${t(WT_UNIT_I18N[uid])}</option>`
    ).join("");
    sel.value = detailWtUnit;
  };
  fillLen("md-len-unit");
  fillLen("cd-len-unit");
  fillWt("md-wt-unit");
  fillWt("cd-wt-unit");
}

function updateDetailUnitHints() {
  const hint = document.getElementById("md-size-unit-hint");
  if (hint) hint.textContent = `${t("sizeUnitLabel")}: ${t(LEN_UNIT_I18N[detailLenUnit])}`;
}

const DETAIL_LEN_INPUTS = [
  "md-orig-l", "md-orig-w", "md-orig-h",
  "md-final-l", "md-final-w", "md-final-h",
  "md-tol-l", "md-tol-w", "md-tol-h",
];
const CONTAINER_DETAIL_LEN_INPUTS = [
  "cd-inner-l", "cd-inner-w", "cd-inner-h",
  "cd-corner-l", "cd-corner-w", "cd-corner-h",
];
const CONTAINER_DETAIL_WT_INPUTS = ["cd-tare", "cd-payload"];

function convertDetailLenInputs(oldUnit, newUnit) {
  for (const id of [...DETAIL_LEN_INPUTS, ...CONTAINER_DETAIL_LEN_INPUTS]) {
    const el = document.getElementById(id);
    if (!el || el.value === "") continue;
    const cm = fromDetailLen(+el.value, oldUnit);
    el.value = formatDetailLen(cm, newUnit);
  }
}

function convertDetailWtInputs(oldUnit, newUnit) {
  for (const id of ["md-weight", "md-gross", ...CONTAINER_DETAIL_WT_INPUTS]) {
    const el = document.getElementById(id);
    if (!el || el.value === "") continue;
    const kg = fromDetailWt(+el.value, oldUnit);
    el.value = formatDetailWt(kg, newUnit);
  }
}

window.onDetailLenUnitChange = (v) => {
  if (!LEN_UNIT_IDS.includes(v) || v === detailLenUnit) return;
  const old = detailLenUnit;
  detailLenUnit = v;
  convertDetailLenInputs(old, v);
  saveUnitPrefs();
  updateDetailUnitHints();
};

window.onDetailWtUnitChange = (v) => {
  if (!WT_UNIT_IDS.includes(v) || v === detailWtUnit) return;
  const old = detailWtUnit;
  detailWtUnit = v;
  convertDetailWtInputs(old, v);
  saveUnitPrefs();
};

window.onContainerLenUnitChange = (v) => onDetailLenUnitChange(v);
window.onContainerWtUnitChange = (v) => onDetailWtUnitChange(v);

// 可选集装箱预设(图源 mm → 内部 cm; 载重 kg,20尺28000/40尺26500)
const CONTAINER_PRESETS = [
  { name: "COSCO 20",      length: 590,   width: 234,   height: 235,   max_payload: 28000 },
  { name: "COSCO 40",      length: 1180,  width: 234,   height: 235,   max_payload: 26500 },
  { name: "COSCO 40HQ",    length: 1180,  width: 234,   height: 269,   max_payload: 26500 },
  { name: "EVERGREEN 40HQ",length: 1203,  width: 235,   height: 269,   max_payload: 26500, desc: "EVERGREEN 40尺加高" },
  { name: "EVERYGREEN 20", length: 590,   width: 235,   height: 239,   max_payload: 28000 },
  { name: "EVERYGREEN 40", length: 1203,  width: 235,   height: 238,   max_payload: 26500 },
  { name: "MARESK 20",     length: 591.9, width: 234,   height: 238,   max_payload: 28000 },
  { name: "MARESK 40",     length: 1204.5,width: 230.9, height: 237.9, max_payload: 26500 },
  { name: "MARESK 40HQ",   length: 1205.6,width: 234.7, height: 268.4, max_payload: 26500 },
  { name: "PNO 20",        length: 589,   width: 234.5, height: 240,   max_payload: 28000 },
  { name: "PNO 40",        length: 1201.5,width: 234.5, height: 236.2, max_payload: 26500 },
  { name: "PNO 40HQ",      length: 1201.5,width: 234.5, height: 269,   max_payload: 26500, tare_weight: 3900, desc: "PNO 40尺高柜", freight_cost: 43 },
  { name: "STD 20",        length: 586,   width: 232,   height: 235,   max_payload: 28000, desc: "标准20尺" },
  { name: "STD 40",        length: 1200,  width: 232,   height: 235,   max_payload: 26500, desc: "标准40尺" },
  { name: "STD 40 HQ",     length: 1200,  width: 232,   height: 265,   max_payload: 26500, desc: "标准40尺加高" },
];

function defaultContainer(overrides = {}) {
  return {
    name: "New", length: 1200, width: 235, height: 269, max_payload: 26500,
    count: 1, max_available: null, freight_cost: null,
    desc: "", color: "#64748b",
    corner_length: 0, corner_width: 0, corner_height: 0,
    tare_weight: 3800,
    ...overrides,
  };
}

function normalizeContainer(c) {
  return defaultContainer({ ...c });
}

function presetAt(i) {
  const p = CONTAINER_PRESETS[i];
  return normalizeContainer({
    name: p.name, length: p.length, width: p.width, height: p.height,
    max_payload: p.max_payload, count: 1,
    max_available: p.max_available ?? null,
    freight_cost: p.freight_cost ?? null,
    desc: p.desc ?? "", color: p.color ?? "#64748b",
    corner_length: p.corner_length ?? 0, corner_width: p.corner_width ?? 0,
    corner_height: p.corner_height ?? 0, tare_weight: p.tare_weight ?? 3800,
  });
}

const ORIENTATIONS = [
  { rot: [0, 1, 2], zh: "立放,正向", en: "Vertical, forward" },
  { rot: [0, 2, 1], zh: "立放,横向", en: "Vertical, sideways" },
  { rot: [1, 0, 2], zh: "侧放,正向", en: "Side, forward" },
  { rot: [1, 2, 0], zh: "侧放,横向", en: "Side, sideways" },
  { rot: [2, 0, 1], zh: "卧放,正向", en: "Flat, forward" },
  { rot: [2, 1, 0], zh: "卧放,横向", en: "Flat, sideways" },
];

const toMm = (cm) => cmToDetailLen(cm, "mm");
const fromMm = (mm) => fromDetailLen(mm, "mm");

function defaultOrientRule(maxLayers = 99) {
  return { allowed: true, load_bearing: true, support_level: 1, self_stack_limit: true, max_layers: maxLayers };
}

function defaultOrientRules(maxLayers = 99) {
  return ORIENTATIONS.map(() => defaultOrientRule(maxLayers));
}

function defaultItem(overrides = {}) {
  const maxStack = overrides.max_stack_layers ?? 99;
  return {
    id: overrides.id || null,
    name: "New", length: 60, width: 40, height: 30, weight: 20, gross_weight: null,
    qty: 1, qty_fixed: true, load_order: 0, volume_ratio: 1, stackable: true, color: randColor(),
    desc: "", price: 0, pcs_per_box: 1, stack_level: 5, max_stack_layers: maxStack,
    orig_length: 60, orig_width: 40, orig_height: 30,
    deform_mode: "final", deform_coeff: [0, 0, 0], deform_tol: [0, 0, 0],
    min_support: [0.7, 0.7, 0.7],
    orient_rules: defaultOrientRules(maxStack),
    ...overrides,
  };
}

function migrateOrientRules(it) {
  if (it.orient_rules && it.orient_rules.length === 6) return it.orient_rules.map((r) => ({ ...defaultOrientRule(it.max_stack_layers), ...r }));
  const rules = defaultOrientRules(it.max_stack_layers ?? 99);
  if (Array.isArray(it.orientations)) {
    it.orientations.forEach((ok, i) => { if (i < 6) rules[i].allowed = !!ok; });
  }
  return rules;
}

function normalizeItem(it) {
  const d = defaultItem();
  const merged = { ...d, ...it };
  merged.orient_rules = migrateOrientRules(merged);
  merged.deform_coeff = [...(merged.deform_coeff || d.deform_coeff)];
  merged.deform_tol = [...(merged.deform_tol || d.deform_tol)];
  merged.min_support = [...(merged.min_support || d.min_support)];
  if (merged.orig_length == null) merged.orig_length = merged.length;
  if (merged.orig_width == null) merged.orig_width = merged.width;
  if (merged.orig_height == null) merged.orig_height = merged.height;
  return merged;
}

function escHtml(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function cloneItem(it) {
  const n = normalizeItem(it);
  return {
    ...n,
    deform_coeff: [...n.deform_coeff],
    deform_tol: [...n.deform_tol],
    min_support: [...n.min_support],
    orient_rules: n.orient_rules.map((r) => ({ ...r })),
  };
}

function makeLibId(name) {
  const base = String(name || "item").trim().replace(/\s+/g, "_").replace(/[^\w\u4e00-\u9fff-]/gi, "") || "item";
  return `${base}_${Date.now().toString(36)}`;
}

function itemToLibraryEntry(it) {
  const n = cloneItem(it);
  n.qty = 1;
  if (!n.id) n.id = makeLibId(n.name);
  return n;
}

let itemLibrary = [];

function saveItemLibrary() {
  try {
    localStorage.setItem(ITEM_LIB_KEY, JSON.stringify(itemLibrary));
  } catch (_) { /* ignore */ }
}

function loadItemLibrary() {
  try {
    const raw = localStorage.getItem(ITEM_LIB_KEY);
    if (raw) {
      itemLibrary = JSON.parse(raw).map((it) => itemToLibraryEntry(normalizeItem(it)));
      return;
    }
  } catch (_) { /* ignore */ }
  itemLibrary = itemsData.map((it) => itemToLibraryEntry(it));
  saveItemLibrary();
}

function upsertLibraryEntry(it) {
  const entry = itemToLibraryEntry(it);
  const byId = entry.id ? itemLibrary.findIndex((e) => e.id === entry.id) : -1;
  const byName = itemLibrary.findIndex((e) => e.name === entry.name);
  const idx = byId >= 0 ? byId : byName;
  if (idx >= 0) {
    entry.id = itemLibrary[idx].id;
    itemLibrary[idx] = entry;
  } else {
    itemLibrary.push(entry);
  }
  saveItemLibrary();
  renderItemPresets();
  renderLibraryTable();
}

function deleteLibraryEntry(i) {
  itemLibrary.splice(i, 1);
  saveItemLibrary();
  renderItemPresets();
  renderLibraryTable();
}

function libraryEntryAt(i) {
  const e = itemLibrary[i];
  return e ? cloneItem(e) : null;
}

function cloneForPackingList(libEntry, qty) {
  const c = cloneItem(libEntry);
  c.qty = qty ?? libEntry.qty ?? 1;
  return c;
}

function computeEffectiveDims(it) {
  const oL = it.orig_length ?? it.length;
  const oW = it.orig_width ?? it.width;
  const oH = it.orig_height ?? it.height;
  const c = it.deform_coeff || [0, 0, 0];
  const t = it.deform_tol || [0, 0, 0];
  if (it.deform_mode === "original") return { length: oL, width: oW, height: oH };
  if (it.deform_mode === "coeff") {
    return {
      length: oL * (1 + c[0] / 100), width: oW * (1 + c[1] / 100), height: oH * (1 + c[2] / 100),
    };
  }
  if (it.deform_mode === "tol") {
    return { length: oL + t[0] / 10, width: oW + t[1] / 10, height: oH + t[2] / 10 };
  }
  return { length: it.length, width: it.width, height: it.height };
}

// ================= 默认数据(canonical: cm/kg) =================
let containersData = [
  normalizeContainer({ ...presetAt(11), count: 1 }),
];
let itemsData = [
  normalizeItem({ name: "PalletBox-A", length: 120, width: 100, height: 110, weight: 260, qty: 18, load_order: 0, stackable: true,  color: "#4C72B0", stack_level: 3, max_stack_layers: 3 }),
  normalizeItem({ name: "PalletBox-B", length: 110, width: 90,  height: 90,  weight: 180, qty: 20, load_order: 0, stackable: true,  color: "#DD8452", stack_level: 3, max_stack_layers: 3 }),
  normalizeItem({ name: "LongCrate",   length: 200, width: 60,  height: 60,  weight: 150, qty: 10, load_order: 1, stackable: true,  color: "#55A868", stack_level: 2, max_stack_layers: 2 }),
  normalizeItem({ name: "Cube-M",      length: 80,  width: 80,  height: 80,  weight: 90,  qty: 24, load_order: 2, stackable: true,  color: "#C44E52", stack_level: 4, max_stack_layers: 4 }),
  normalizeItem({ name: "FlatCarton",  length: 60,  width: 40,  height: 30,  weight: 22,  qty: 40, load_order: 8, stackable: true,  color: "#8172B3", stack_level: 5, max_stack_layers: 6 }),
  normalizeItem({ name: "Fragile-Top", length: 100, width: 80,  height: 70,  weight: 70,  qty: 8,  load_order: 9, stackable: false, color: "#DA8BC3", stack_level: 1, max_stack_layers: 1,
    orient_rules: (() => { const r = defaultOrientRules(1); r[4].allowed = false; r[5].allowed = false; return r; })() }),
];

let editingItemIdx = null;
let editingLibraryIdx = null;
let editingContainerIdx = null; // null=装柜行, -1=库新增, >=0=库编辑

// ================= 表格渲染 =================
function num(v) { return `<input type="number" value="${v}" />`; }

// 列宽: 集装箱表 (名称/长宽高/载重/数量/编辑/删除)
const CH_COLS = ["24%", "11%", "10%", "10%", "14%", "8%", "5%", "6%"];
const colTag = (w) => `<col style="width:${w}" />`;

function itemColWidths() {
  const w = ["14%", "5%", "11%", "6%"];
  if (packMode === "multi_multi") w.push("6%");
  if (packMode === "volume_ratio") w.push("7%", "6%");
  if (packMode === "variable_qty") w.push("6%", "6%");
  w.push("7%", "7%", "7%", "7%", "5%", "4%", "4%");
  return w;
}

function renderItemModeHeadCells() {
  let h = "";
  if (packMode === "volume_ratio") h += `<th title="${t("volumeRatio")}">${t("volumeRatio")}</th>`;
  if (packMode === "variable_qty") h += `<th>${t("maximizeLoad")}</th>`;
  if (packMode === "multi_multi" || packMode === "volume_ratio" || packMode === "variable_qty") {
    h += `<th title="${t("spatialOrderHint")}">${t("spatialOrder")}</th>`;
  }
  return h;
}

function renderItemModeCells(it) {
  let c = "";
  if (packMode === "volume_ratio") {
    c += `<td><input type="number" data-f="volume_ratio" value="${it.volume_ratio ?? 1}" step="0.1" min="0.01" /></td>`;
  }
  if (packMode === "variable_qty") {
    c += `<td style="text-align:center"><input type="checkbox" data-f="maximize_load" ${it.qty_fixed === false ? "checked" : ""} title="${t("maximizeLoad")}" /></td>`;
  }
  if (packMode === "multi_multi" || packMode === "volume_ratio" || packMode === "variable_qty") {
    c += `<td><input type="number" data-f="load_order" value="${it.load_order ?? 0}" step="1" /></td>`;
  }
  return c;
}

function canAddCargoRow() {
  return packMode !== "single_multi" || itemsData.length === 0;
}

function renderContainerPresets() {
  const sel = document.getElementById("container_preset");
  if (!sel) return;
  sel.innerHTML = CONTAINER_PRESETS.map((p, i) => {
    const label = p.desc ? `${p.name} — ${p.desc}` : p.name;
    return `<option value="${i}">${label}</option>`;
  }).join("");
  sel.value = "3";
}

function renderItemPresets() {
  const sel = document.getElementById("item_preset");
  if (!sel) return;
  if (!itemLibrary.length) {
    sel.innerHTML = `<option value="-1">${lang === "zh" ? "(暂无,请先添加货物)" : "(empty)"}</option>`;
    return;
  }
  sel.innerHTML = itemLibrary.map((it, i) => {
    const dims = `${r1(toLen(it.length))}×${r1(toLen(it.width))}×${r1(toLen(it.height))}${lenU()}`;
    return `<option value="${i}">${escHtml(it.name)} — ${dims}</option>`;
  }).join("");
  sel.value = "0";
}

function renderLibraryTable() {
  const body = document.getElementById("library-body");
  if (!body) return;
  if (!itemLibrary.length) {
    body.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:12px">${lang === "zh" ? "货物库为空,点击右上角新增" : "Library empty — add cargo"}</td></tr>`;
    return;
  }
  body.innerHTML = itemLibrary.map((it, i) => `
    <tr data-i="${i}" ondblclick="addFromLibrary(${i})" title="${t("libraryDblHint")}">
      <td><span class="swatch-sm" style="background:${escHtml(it.color || "#4C72B0")}"></span>${escHtml(it.name)}</td>
      <td>${r1(toLen(it.length))}</td>
      <td>${r1(toLen(it.width))}</td>
      <td>${r1(toLen(it.height))}</td>
      <td>${r1(toWt(it.weight))}</td>
      <td style="text-align:center">${it.stackable ? "✓" : "—"}</td>
      <td style="text-align:center"><span class="edit" onclick="event.stopPropagation();editLibraryItem(${i})" title="${t("edit")}">⚙</span></td>
      <td style="text-align:center"><span class="del" onclick="event.stopPropagation();deleteLibraryItem(${i})">×</span></td>
    </tr>`).join("");
}

window.addLibraryItem = () => {
  editingItemIdx = null;
  editingLibraryIdx = -1;
  openItemModal(defaultItem({ name: lang === "zh" ? "新货物" : "New cargo" }));
};
window.editLibraryItem = (i) => {
  editingItemIdx = null;
  editingLibraryIdx = i;
  openItemModal(normalizeItem(itemLibrary[i]));
};
window.deleteLibraryItem = (i) => {
  if (!itemLibrary[i]) return;
  if (!confirm(t("libDelConfirm"))) return;
  deleteLibraryEntry(i);
};

window.openItemLibrary = () => {
  renderLibraryTable();
  document.getElementById("library-modal").style.display = "flex";
};
window.closeItemLibrary = () => {
  document.getElementById("library-modal").style.display = "none";
};
window.addFromLibrary = (i) => {
  syncFromInputs();
  if (!canAddCargoRow()) {
    document.getElementById("msg").textContent = t("singleCargoOnly");
    return;
  }
  const entry = libraryEntryAt(i);
  if (!entry) return;
  itemsData.push(cloneForPackingList(entry));
  renderItems();
  closeItemLibrary();
};

function renderHeads() {
  document.getElementById("ch-head").innerHTML =
    `<th>${t("name")}</th><th>${t("L")}</th><th>${t("W")}</th><th>${t("H")}</th><th>${t("payload")}</th><th>${t("qty")}</th><th></th><th></th>`;
  document.getElementById("it-head").innerHTML =
    `<th>${t("name")}</th><th>${t("itemColor")}</th><th>${t("itemDesc")}</th><th>${t("qty")}</th>`
    + renderItemModeHeadCells()
    + `<th>${t("L")}</th><th>${t("W")}</th><th>${t("H")}</th><th>${t("wt")}</th><th>${t("stack")}</th><th></th><th></th>`;
  const ch = document.getElementById("ch-colgroup");
  if (ch) ch.innerHTML = CH_COLS.map(colTag).join("");
  const it = document.getElementById("it-colgroup");
  if (it) it.innerHTML = itemColWidths().map(colTag).join("");
}

function renderContainers() {
  document.getElementById("containers").innerHTML = containersData.map((c, i) => {
    const box = normalizeContainer(c);
    return `
    <tr data-i="${i}">
      <td><input type="text" value="${escHtml(box.name)}" /></td>
      <td>${r1(toLen(box.length))}</td><td>${r1(toLen(box.width))}</td><td>${r1(toLen(box.height))}</td>
      <td>${r1(toWt(box.max_payload))}</td>
      <td><input type="number" data-f="count" value="${box.count}" min="1" step="1" /></td>
      <td style="text-align:center"><span class="edit" onclick="editContainer(${i})" title="${t("edit")}">⚙</span></td>
      <td style="text-align:center"><span class="del" onclick="delContainer(${i})">×</span></td>
    </tr>`;
  }).join("");
}
function renderItems() {
  document.getElementById("items").innerHTML = itemsData.map((it, i) => `
    <tr class="row-item" data-i="${i}">
      <td><input type="text" data-f="name" value="${escHtml(it.name)}" /></td>
      <td style="text-align:center"><input type="color" data-f="color" value="${it.color || "#4C72B0"}" class="cell-color" /></td>
      <td><input type="text" data-f="desc" value="${escHtml(it.desc || "")}" /></td>
      <td><input type="number" data-f="qty" value="${it.qty}" min="0" step="1" /></td>
      ${renderItemModeCells(it)}
      <td>${num(r1(toLen(it.length)))}</td><td>${num(r1(toLen(it.width)))}</td><td>${num(r1(toLen(it.height)))}</td>
      <td>${num(r1(toWt(it.weight)))}</td>
      <td style="text-align:center"><input type="checkbox" data-f="stackable" ${it.stackable ? "checked" : ""} /></td>
      <td style="text-align:center"><span class="edit" onclick="editItem(${i})" title="${t("edit")}">⚙</span></td>
      <td style="text-align:center"><span class="del" onclick="delItem(${i})">×</span></td>
    </tr>`).join("");
}

// 把界面输入写回 canonical 数据
function syncFromInputs() {
  containersData = [...document.querySelectorAll("#containers tr")].map((tr, i) => {
    const prev = normalizeContainer(containersData[i] || {});
    const inputs = tr.querySelectorAll("input");
    const countEl = tr.querySelector('[data-f="count"]');
    return {
      ...prev,
      name: inputs[0]?.value ?? prev.name,
      count: Math.max(1, +(countEl?.value) || prev.count || 1),
    };
  });
  itemsData = [...document.querySelectorAll("#items tr")].map((tr, i) => {
    const prev = normalizeItem(itemsData[i] || {});
    const gf = (f) => tr.querySelector(`[data-f="${f}"]`);
    const nameEl = gf("name");
    const qtyFixed = packMode === "variable_qty" && gf("maximize_load")
      ? !gf("maximize_load").checked
      : prev.qty_fixed;
    return {
      ...prev,
      name: nameEl?.value ?? prev.name,
      color: gf("color")?.value ?? prev.color,
      desc: gf("desc")?.value ?? prev.desc,
      qty: gf("qty") ? Math.max(0, +gf("qty").value) : prev.qty,
      load_order: gf("load_order") ? (+gf("load_order").value || 0) : prev.load_order,
      volume_ratio: gf("volume_ratio") ? Math.max(0.01, +gf("volume_ratio").value || 1) : prev.volume_ratio,
      qty_fixed: qtyFixed,
      length: prev.length, width: prev.width, height: prev.height,
      weight: prev.weight,
      stackable: gf("stackable") ? gf("stackable").checked : prev.stackable,
      stack_level: prev.stack_level,
      max_stack_layers: prev.max_stack_layers,
      orient_rules: prev.orient_rules,
    };
  });
}

let packMode = "multi_multi";

function onPackModeChange() {
  const sel = document.getElementById("pack_mode");
  packMode = sel ? sel.value : "multi_multi";
  if (packMode === "single_multi" && itemsData.length > 1) {
    syncFromInputs();
    itemsData = [normalizeItem(itemsData[0])];
    document.getElementById("msg").textContent = t("singleCargoOnly");
  }
  updateModeHint();
  renderHeads();
  renderItems();
  updateContainerModalModeFields();
}
window.onPackModeChange = onPackModeChange;

function updateModeHint() {
  const hint = document.getElementById("mode-hint");
  if (!hint) return;
  const key = `modeHint_${packMode}`;
  hint.innerHTML = `${t(key)}<br><span class="mode-badge">${t("modePending")}</span>`;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  renderHeads();
  const ps = document.getElementById("pack_strategy");
  if (ps) [...ps.options].forEach((o) => { if (o.dataset.i18n) o.textContent = t(o.dataset.i18n); });
  const cp = document.getElementById("container_preset");
  if (cp) cp.title = t("chooseContainer");
  const ip = document.getElementById("item_preset");
  if (ip) ip.title = t("chooseCargo");
  const pm = document.getElementById("pack_mode");
  if (pm) [...pm.options].forEach((o) => { if (o.dataset.i18n) o.textContent = t(o.dataset.i18n); });
  updateModeHint();
  fillUnitSelectOptions();
  updateDetailUnitHints();
}

window.setLang = (v) => { syncFromInputs(); lang = v; applyI18n(); renderContainerPresets(); renderItemPresets(); renderHeads(); renderContainers(); renderItems(); if (lastResult) { renderTabs(); showContainer(activeIdx, false); } };
window.setUnit = (v) => { syncFromInputs(); unit = v; renderContainerPresets(); renderItemPresets(); renderHeads(); renderContainers(); renderItems(); if (lastResult) showContainer(activeIdx, false); };

window.addContainer = () => {
  syncFromInputs();
  const sel = document.getElementById("container_preset");
  const idx = sel ? +sel.value : 0;
  containersData.push(presetAt(idx));
  renderContainers();
};
window.delContainer = (i) => { syncFromInputs(); containersData.splice(i, 1); renderContainers(); };
window.addItem = () => {
  syncFromInputs();
  if (!canAddCargoRow()) {
    document.getElementById("msg").textContent = t("singleCargoOnly");
    return;
  }
  const sel = document.getElementById("item_preset");
  const idx = sel ? +sel.value : -1;
  if (idx >= 0 && itemLibrary[idx]) {
    itemsData.push(cloneForPackingList(libraryEntryAt(idx)));
  } else {
    const blank = defaultItem();
    itemsData.push(blank);
    upsertLibraryEntry(blank);
  }
  renderItems();
};
window.delItem = (i) => { syncFromInputs(); itemsData.splice(i, 1); renderItems(); };
function randColor() { return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"); }

function updateItemPreview(color) {
  const box = document.getElementById("md-preview");
  if (!box) return;
  const c = color || "#4C72B0";
  box.style.setProperty("--c1", c);
  box.style.setProperty("--c2", c + "99");
}

function renderOrientRows(rules) {
  const body = document.getElementById("md-orient-body");
  if (!body) return;
  body.innerHTML = ORIENTATIONS.map((o, i) => {
    const r = rules[i] || defaultOrientRule();
    return `<tr>
      <td>${lang === "zh" ? o.zh : o.en}</td>
      <td><input type="checkbox" data-f="allowed" data-oi="${i}" ${r.allowed ? "checked" : ""} /></td>
      <td><input type="checkbox" data-f="load_bearing" data-oi="${i}" ${r.load_bearing ? "checked" : ""} /></td>
      <td><input type="number" data-f="support_level" data-oi="${i}" min="1" max="99" value="${r.support_level}" style="width:48px" /></td>
      <td><input type="checkbox" data-f="self_stack_limit" data-oi="${i}" ${r.self_stack_limit ? "checked" : ""} /></td>
      <td><input type="number" data-f="max_layers" data-oi="${i}" min="1" max="99" value="${r.max_layers}" style="width:48px" /></td>
    </tr>`;
  }).join("");
}

function fillSizeTab(it) {
  const eff = computeEffectiveDims(it);
  document.getElementById("md-orig-l").value = formatDetailLen(it.orig_length ?? it.length);
  document.getElementById("md-orig-w").value = formatDetailLen(it.orig_width ?? it.width);
  document.getElementById("md-orig-h").value = formatDetailLen(it.orig_height ?? it.height);
  document.getElementById("md-coeff-l").value = it.deform_coeff[0];
  document.getElementById("md-coeff-w").value = it.deform_coeff[1];
  document.getElementById("md-coeff-h").value = it.deform_coeff[2];
  document.getElementById("md-tol-l").value = formatDetailLen(it.deform_tol[0]);
  document.getElementById("md-tol-w").value = formatDetailLen(it.deform_tol[1]);
  document.getElementById("md-tol-h").value = formatDetailLen(it.deform_tol[2]);
  document.getElementById("md-final-l").value = formatDetailLen(eff.length);
  document.getElementById("md-final-w").value = formatDetailLen(eff.width);
  document.getElementById("md-final-h").value = formatDetailLen(eff.height);
  document.getElementById("md-support-l").value = Math.round((it.min_support[0] ?? 0.7) * 100);
  document.getElementById("md-support-w").value = Math.round((it.min_support[1] ?? 0.7) * 100);
  document.getElementById("md-support-h").value = Math.round((it.min_support[2] ?? 0.7) * 100);
  const mode = it.deform_mode || "final";
  const radio = document.querySelector(`input[name="deform-mode"][value="${mode}"]`);
  if (radio) radio.checked = true;
}

function readSizeTab() {
  const deform_mode = document.querySelector('input[name="deform-mode"]:checked')?.value || "final";
  const orig_length = fromDetailLen(+document.getElementById("md-orig-l").value);
  const orig_width = fromDetailLen(+document.getElementById("md-orig-w").value);
  const orig_height = fromDetailLen(+document.getElementById("md-orig-h").value);
  const deform_coeff = [
    +document.getElementById("md-coeff-l").value || 0,
    +document.getElementById("md-coeff-w").value || 0,
    +document.getElementById("md-coeff-h").value || 0,
  ];
  const deform_tol = [
    fromDetailLen(+document.getElementById("md-tol-l").value || 0),
    fromDetailLen(+document.getElementById("md-tol-w").value || 0),
    fromDetailLen(+document.getElementById("md-tol-h").value || 0),
  ];
  const min_support = [
    (+document.getElementById("md-support-l").value || 70) / 100,
    (+document.getElementById("md-support-w").value || 70) / 100,
    (+document.getElementById("md-support-h").value || 70) / 100,
  ];
  let length = fromDetailLen(+document.getElementById("md-final-l").value);
  let width = fromDetailLen(+document.getElementById("md-final-w").value);
  let height = fromDetailLen(+document.getElementById("md-final-h").value);
  const draft = {
    orig_length, orig_width, orig_height, deform_mode, deform_coeff, deform_tol,
    length, width, height,
  };
  const eff = computeEffectiveDims(draft);
  return { ...draft, ...eff, min_support_ratio: Math.min(...min_support), min_support };
}

function readOrientRules() {
  const rules = defaultOrientRules(99);
  document.querySelectorAll("#md-orient-body [data-oi]").forEach((el) => {
    const i = +el.dataset.oi;
    const f = el.dataset.f;
    if (el.type === "checkbox") rules[i][f] = el.checked;
    else rules[i][f] = +el.value || 1;
  });
  return rules;
}

window.switchItemTab = (tab) => {
  document.querySelectorAll(".modal-tabs .tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  document.getElementById("tab-basic").style.display = tab === "basic" ? "block" : "none";
  document.getElementById("tab-orient").style.display = tab === "orient" ? "block" : "none";
};

function updateItemModalModeFields(it) {
  const item = normalizeItem(it);
  document.querySelectorAll(".mode-field").forEach((el) => {
    const modes = (el.dataset.modes || "").split(/\s+/);
    el.style.display = modes.includes(packMode) ? "" : "none";
  });
  const lo = document.getElementById("md-load-order");
  if (lo) {
    lo.value = item.load_order ?? 0;
    lo.title = t("spatialOrderHint");
  }
  const sl = document.getElementById("md-stack-level");
  if (sl) sl.title = t("stackLevelHint");
  const vr = document.getElementById("md-volume-ratio");
  if (vr) vr.value = item.volume_ratio ?? 1;
  const mx = document.getElementById("md-maximize-load");
  if (mx) mx.checked = item.qty_fixed === false;
  const qtyEl = document.getElementById("md-qty");
  if (qtyEl && packMode === "variable_qty") {
    qtyEl.min = "0";
    qtyEl.disabled = item.qty_fixed === false;
    qtyEl.title = item.qty_fixed === false ? (lang === "zh" ? "尽量装载时数量由算法决定" : "Qty decided when max fill") : "";
  } else if (qtyEl) {
    qtyEl.min = "1";
    qtyEl.disabled = false;
    qtyEl.title = "";
  }
}

function openItemModal(it) {
  const item = normalizeItem(it);
  document.getElementById("md-name").value = item.name;
  document.getElementById("md-desc").value = item.desc || "";
  document.getElementById("md-weight").value = formatDetailWt(item.weight);
  document.getElementById("md-gross").value = item.gross_weight != null ? formatDetailWt(item.gross_weight) : "";
  document.getElementById("md-color").value = item.color || "#4C72B0";
  document.getElementById("md-stack-level").value = item.stack_level;
  document.getElementById("md-price").value = item.price;
  document.getElementById("md-pcs").value = item.pcs_per_box;
  document.getElementById("md-qty").value = item.qty;
  document.getElementById("md-stackable").checked = item.stackable;
  updateItemModalModeFields(item);
  fillUnitSelectOptions();
  updateDetailUnitHints();
  fillSizeTab(item);
  renderOrientRows(item.orient_rules);
  updateItemPreview(item.color);
  switchItemTab("basic");
  document.getElementById("item-modal").style.display = "flex";
  const colorEl = document.getElementById("md-color");
  colorEl.oninput = () => updateItemPreview(colorEl.value);
  const mxEl = document.getElementById("md-maximize-load");
  if (mxEl) mxEl.onchange = () => updateItemModalModeFields({ ...item, qty_fixed: !mxEl.checked });
}

function readItemFromModal(prev = {}) {
  const base = normalizeItem(prev);
  const grossRaw = document.getElementById("md-gross").value;
  const size = readSizeTab();
  let orient_rules = readOrientRules();
  const maxStack = Math.max(...orient_rules.map((r) => r.max_layers));
  const stackLevel = +document.getElementById("md-stack-level").value || 5;
  const stackable = document.getElementById("md-stackable").checked;
  const name = document.getElementById("md-name").value;
  const qtyFixed = packMode === "variable_qty"
    ? !document.getElementById("md-maximize-load").checked
    : base.qty_fixed;
  const effectiveMaxStack = stackable ? Math.max(maxStack, stackLevel) : maxStack;
  if (stackable && effectiveMaxStack > maxStack) {
    orient_rules = orient_rules.map((r) => ({
      ...r,
      max_layers: Math.max(r.max_layers, effectiveMaxStack),
    }));
  }
  return normalizeItem({
    ...base,
    id: base.id || makeLibId(name),
    name,
    desc: document.getElementById("md-desc").value,
    weight: fromDetailWt(+document.getElementById("md-weight").value),
    gross_weight: grossRaw === "" ? null : fromDetailWt(+grossRaw),
    color: document.getElementById("md-color").value,
    stack_level: stackLevel,
    price: +document.getElementById("md-price").value || 0,
    pcs_per_box: +document.getElementById("md-pcs").value || 1,
    qty: Math.max(0, +document.getElementById("md-qty").value || 0),
    qty_fixed: qtyFixed,
    load_order: packMode === "single_multi" ? 0 : (+document.getElementById("md-load-order")?.value || 0),
    volume_ratio: packMode === "volume_ratio" ? Math.max(0.01, +document.getElementById("md-volume-ratio")?.value || 1) : base.volume_ratio,
    stackable,
    length: size.length, width: size.width, height: size.height,
    orig_length: size.orig_length, orig_width: size.orig_width, orig_height: size.orig_height,
    deform_mode: size.deform_mode, deform_coeff: size.deform_coeff, deform_tol: size.deform_tol,
    min_support: size.min_support, min_support_ratio: size.min_support_ratio,
    max_stack_layers: effectiveMaxStack,
    orient_rules,
  });
}

window.editItem = (i) => {
  syncFromInputs();
  editingItemIdx = i;
  editingLibraryIdx = null;
  openItemModal(itemsData[i]);
};

window.closeItemModal = () => {
  document.getElementById("item-modal").style.display = "none";
  editingItemIdx = null;
  editingLibraryIdx = null;
};

window.saveItemDetail = () => {
  if (editingLibraryIdx !== null) {
    const prev = editingLibraryIdx >= 0 ? normalizeItem(itemLibrary[editingLibraryIdx]) : {};
    const item = readItemFromModal(prev);
    if (editingLibraryIdx === -1) {
      itemLibrary.push(itemToLibraryEntry(item));
    } else {
      item.id = itemLibrary[editingLibraryIdx].id;
      itemLibrary[editingLibraryIdx] = itemToLibraryEntry(item);
    }
    saveItemLibrary();
    renderItemPresets();
    renderLibraryTable();
    closeItemModal();
    return;
  }
  if (editingItemIdx === null) return;
  const prev = normalizeItem(itemsData[editingItemIdx]);
  const libMatch = itemLibrary.find((e) => e.name === prev.name || e.id === prev.id);
  const item = readItemFromModal({ ...prev, id: prev.id || libMatch?.id });
  itemsData[editingItemIdx] = item;
  upsertLibraryEntry(item);
  closeItemModal();
  renderItems();
};

function updateContainerPreview(color) {
  const box = document.getElementById("cd-preview");
  if (!box) return;
  const c = color || "#64748b";
  box.style.setProperty("--c1", c);
  box.style.setProperty("--c2", c + "99");
}

function updateContainerModalModeFields() {
  document.querySelectorAll("#container-modal .mode-field").forEach((el) => {
    const modes = (el.dataset.modes || "").split(/\s+/);
    el.style.display = modes.includes(packMode) ? "" : "none";
  });
}

function openContainerModal(c) {
  const box = normalizeContainer(c);
  document.getElementById("cd-name").value = box.name;
  document.getElementById("cd-desc").value = box.desc || "";
  document.getElementById("cd-color").value = box.color || "#64748b";
  document.getElementById("cd-freight").value = box.freight_cost ?? "";
  document.getElementById("cd-max-available").value = box.max_available ?? "";
  document.getElementById("cd-inner-l").value = formatDetailLen(box.length);
  document.getElementById("cd-inner-w").value = formatDetailLen(box.width);
  document.getElementById("cd-inner-h").value = formatDetailLen(box.height);
  document.getElementById("cd-corner-l").value = formatDetailLen(box.corner_length);
  document.getElementById("cd-corner-w").value = formatDetailLen(box.corner_width);
  document.getElementById("cd-corner-h").value = formatDetailLen(box.corner_height);
  document.getElementById("cd-tare").value = formatDetailWt(box.tare_weight);
  document.getElementById("cd-payload").value = formatDetailWt(box.max_payload);
  fillUnitSelectOptions();
  updateContainerModalModeFields();
  updateContainerPreview(box.color);
  document.getElementById("container-modal").style.display = "flex";
  const colorEl = document.getElementById("cd-color");
  colorEl.oninput = () => updateContainerPreview(colorEl.value);
}

function readContainerFromModal(prev = {}) {
  const base = normalizeContainer(prev);
  const freightRaw = document.getElementById("cd-freight").value;
  const maxAvailRaw = document.getElementById("cd-max-available").value;
  return normalizeContainer({
    ...base,
    name: document.getElementById("cd-name").value,
    desc: document.getElementById("cd-desc").value,
    color: document.getElementById("cd-color").value,
    length: fromDetailLen(+document.getElementById("cd-inner-l").value),
    width: fromDetailLen(+document.getElementById("cd-inner-w").value),
    height: fromDetailLen(+document.getElementById("cd-inner-h").value),
    corner_length: fromDetailLen(+document.getElementById("cd-corner-l").value || 0),
    corner_width: fromDetailLen(+document.getElementById("cd-corner-w").value || 0),
    corner_height: fromDetailLen(+document.getElementById("cd-corner-h").value || 0),
    tare_weight: fromDetailWt(+document.getElementById("cd-tare").value || 0),
    max_payload: fromDetailWt(+document.getElementById("cd-payload").value),
    freight_cost: freightRaw === "" ? null : +freightRaw,
    max_available: maxAvailRaw === "" ? null : Math.max(0, +maxAvailRaw),
  });
}

window.editContainer = (i) => {
  syncFromInputs();
  editingContainerIdx = i;
  openContainerModal(containersData[i]);
};

window.closeContainerModal = () => {
  document.getElementById("container-modal").style.display = "none";
  editingContainerIdx = null;
};

window.saveContainerDetail = () => {
  if (editingContainerIdx === null) return;
  const prev = normalizeContainer(containersData[editingContainerIdx]);
  containersData[editingContainerIdx] = readContainerFromModal(prev);
  closeContainerModal();
  renderContainers();
};

// ================= Three.js =================
let scene, camera, renderer, controls, group, raycaster, pointer;
let boxMeshes = [];       // {mesh, edges, placement, target:{x,y,z}}
let selected = null;
let animState = null;

function scheduleLayoutRefresh() {
  requestAnimationFrame(() => requestAnimationFrame(onResize));
}

function initThree() {
  const wrap = document.getElementById("canvas-wrap");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1220);
  camera = new THREE.PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, 1, 20000);
  camera.position.set(1600, 1100, 1600);
  renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.sortObjects = true;
  wrap.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.addEventListener("start", () => {
    orbitDragged = false;
    pauseAnimClock();
  });
  controls.addEventListener("change", () => { orbitDragged = true; });
  controls.addEventListener("end", () => resumeAnimClock());
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(1, 2, 1.5); scene.add(dir);
  group = new THREE.Group(); scene.add(group);
  raycaster = new THREE.Raycaster(); pointer = new THREE.Vector2();
  renderer.domElement.addEventListener("click", onCanvasClick);
  window.addEventListener("resize", onResize);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(scheduleLayoutRefresh).observe(wrap);
  }
  animate();
}
function onResize() {
  const wrap = document.getElementById("canvas-wrap");
  if (!wrap || !renderer || !camera) return;
  const w = wrap.clientWidth, h = wrap.clientHeight;
  if (w < 2 || h < 2) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
function animate() {
  requestAnimationFrame(animate);
  stepAnim();
  controls.update();
  renderer.render(scene, camera);
}
function clearGroup() {
  setCogFocus(false);
  while (group.children.length) group.remove(group.children[0]);
  boxMeshes = [];
  selected = null;
}

let packMeta = { pack_strategy: "door_last" };
let activeContainer = null;
let activePlanStep = null;
let planStepsData = [];
let planTagged = [];
let cogGroup = null;

function placementWeight(p) {
  const w = +(p.weight ?? 0);
  if (w > 0) return w;
  const base = p.base_name || p.name?.split("#")[0];
  const hit = itemsData.find((it) => it.name === base || it.name === p.name);
  return hit ? +(hit.weight ?? 0) : 0;
}

function computeCoG(placements) {
  let tw = 0, sx = 0, sy = 0, sz = 0;
  for (const p of placements) {
    const w = placementWeight(p);
    if (w <= 0) continue;
    sx += w * (p.x + p.dx / 2);
    sy += w * (p.y + p.dy / 2);
    sz += w * (p.z + p.dz / 2);
    tw += w;
  }
  if (tw <= 1e-6) return null;
  return { x: sx / tw, y: sy / tw, z: sz / tw, totalWeight: tw };
}

function formatCoGOffset(cog, c) {
  if (!cog || !c) return { long: "—", lat: "—", vert: "—", longHint: "", latHint: "", vertHint: "" };
  const L = c.length, W = c.width, H = c.height;
  const ox = ((cog.x - L / 2) / (L / 2)) * 100;
  const oy = ((cog.y - W / 2) / (W / 2)) * 100;
  const oz = ((cog.z - H / 2) / (H / 2)) * 100;
  const fmt = (v) => (v >= 0 ? "+" : "") + r1(v) + "%";
  const hint = (v, pos, neg) => (Math.abs(v) < 5 ? t("cogBalanced") : v > 0 ? pos : neg);
  const doorInside = packMeta.pack_strategy === "door_last"
    ? (ox > 0 ? t("towardDoor") : t("towardInside"))
    : (ox > 0 ? t("towardInside") : t("towardDoor"));
  return {
    long: fmt(ox), lat: fmt(oy), vert: fmt(oz),
    longHint: hint(ox, doorInside, packMeta.pack_strategy === "door_last" ? t("towardInside") : t("towardDoor")),
    latHint: hint(oy, t("towardRight"), t("towardLeft")),
    vertHint: hint(oz, t("towardHigh"), t("towardLow")),
  };
}

function clearCoG() {
  if (cogGroup && group) {
    group.remove(cogGroup);
    cogGroup.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
    cogGroup = null;
  }
}

function cogOverlayMat(color, opacity = 1, offset = -4) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 0.98,
    opacity,
    side: THREE.FrontSide,
    depthWrite: opacity >= 0.98,
    polygonOffset: true,
    polygonOffsetFactor: offset,
    polygonOffsetUnits: offset,
  });
}

function drawCoGMarker(cog, L, W, H) {
  clearCoG();
  if (!cog || !group) return;
  cogGroup = new THREE.Group();
  cogGroup.renderOrder = 20;
  const tx = cog.x, ty = cog.z, tz = cog.y;
  const cx = L / 2, cz = W / 2;
  const floorY = Math.max(8, Math.min(L, W) * 0.02);
  const size = Math.min(L, W);
  const rOuter = Math.max(18, size * 0.14);
  const barThick = Math.max(3.5, size * 0.02);

  const layFlat = (mesh, x, y, z, order) => {
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y, z);
    mesh.renderOrder = order;
    cogGroup.add(mesh);
  };

  // 单层底面圆盘 + 外圈(合并原多层,避免透明叠面闪动)
  layFlat(new THREE.Mesh(new THREE.CircleGeometry(rOuter, 48), cogOverlayMat(0xf59e0b, 0.88)), tx, floorY, tz, 21);
  layFlat(new THREE.Mesh(
    new THREE.RingGeometry(rOuter * 0.9, rOuter * 1.08, 48),
    cogOverlayMat(0xfef08a, 1, -5),
  ), tx, floorY + 1.5, tz, 22);

  // 粗十字(略高于圆盘)
  const crossLen = rOuter * 1.15;
  const crossY = floorY + 2.5;
  const barX = new THREE.Mesh(new THREE.BoxGeometry(crossLen * 2, barThick, barThick), cogOverlayMat(0xfffbeb, 1, -6));
  barX.position.set(tx, crossY, tz);
  barX.renderOrder = 23;
  cogGroup.add(barX);
  const barZ = new THREE.Mesh(new THREE.BoxGeometry(barThick, barThick, crossLen * 2), cogOverlayMat(0xfffbeb, 1, -6));
  barZ.position.set(tx, crossY, tz);
  barZ.renderOrder = 23;
  cogGroup.add(barZ);

  // 柜心(单环)
  layFlat(new THREE.Mesh(
    new THREE.RingGeometry(5, 10, 24),
    cogOverlayMat(0x38bdf8, 1, -3),
  ), cx, floorY, cz, 20);

  // 参考中线
  const lineMat = (color, opacity) => new THREE.LineBasicMaterial({
    color, transparent: true, opacity, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
  });
  const lineY = floorY + 0.8;
  const addLine = (pts, color, opacity = 0.5) => {
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(color, opacity));
    line.renderOrder = 19;
    cogGroup.add(line);
  };
  addLine([new THREE.Vector3(0, lineY, cz), new THREE.Vector3(L, lineY, cz)], 0x64748b);
  addLine([new THREE.Vector3(cx, lineY, 0), new THREE.Vector3(cx, lineY, W)], 0x64748b);

  // 偏移箭头
  const dx = tx - cx, dz = tz - cz;
  const dist = Math.hypot(dx, dz);
  if (dist > 2) {
    const ang = Math.atan2(dz, dx);
    const arrowY = floorY + 3.5;
    const shaft = new THREE.Mesh(
      new THREE.BoxGeometry(dist, barThick * 1.3, barThick * 1.3),
      cogOverlayMat(0xef4444, 0.95, -7),
    );
    shaft.position.set((cx + tx) / 2, arrowY, (cz + tz) / 2);
    shaft.rotation.y = ang;
    shaft.renderOrder = 24;
    cogGroup.add(shaft);

    const head = new THREE.Mesh(
      new THREE.ConeGeometry(barThick * 2.8, barThick * 8, 12),
      cogOverlayMat(0xef4444, 1, -7),
    );
    head.rotation.z = Math.PI / 2;
    head.rotation.y = ang;
    head.position.set(tx - Math.cos(ang) * barThick * 3.5, arrowY, tz - Math.sin(ang) * barThick * 3.5);
    head.renderOrder = 24;
    cogGroup.add(head);
  }

  // 立柱 + 顶部球(与底面分层,减少共面)
  if (ty > floorY + 6) {
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(rOuter * 0.12, rOuter * 0.18, ty - floorY - 2, 16),
      cogOverlayMat(0xfbbf24, 0.35, -2),
    );
    pillar.position.set(tx, (ty + floorY) / 2, tz);
    pillar.renderOrder = 18;
    cogGroup.add(pillar);
  }

  const sphereR = Math.max(9, Math.min(L, W, H) * 0.035);
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(sphereR, 20, 16),
    cogOverlayMat(0xfef08a, 1, -8),
  );
  sphere.position.set(tx, ty, tz);
  sphere.renderOrder = 25;
  cogGroup.add(sphere);

  group.add(cogGroup);
}

function getCoGPlacements() {
  if (animState) {
    return boxMeshes.filter((b) => b.done).map((b) => b.placement);
  }
  const all = boxMeshes.map((b) => b.placement);
  if (!activePlanStep || !planTagged.length) return all;
  const visible = stableVisibleSeqs(activePlanStep, planTagged, all);
  return all.filter((p) => visible.has(p.seq));
}

function updateCoGStat(c, cog) {
  const el = document.getElementById("cog-stat");
  if (!el) return;
  if (!cog || !c) {
    el.innerHTML = "";
    setCogFocus(false);
    return;
  }
  const off = formatCoGOffset(cog, c);
  const doorX = packMeta.pack_strategy === "door_last" ? c.length - cog.x : cog.x;
  const insideX = c.length - doorX;
  el.innerHTML = `
    <div class="cog-stat-block" title="${t("cogHoverHint")}">
      <div style="font-weight:600;margin-bottom:4px">⚖ ${t("cogTitle")}</div>
      <div>${t("cogPos")}: X ${r1(toLen(cog.x))} · Y ${r1(toLen(cog.y))} · Z ${r1(toLen(cog.z))} ${lenU()}</div>
      <div>${t("cogFromDoor")}: ${r1(toLen(doorX))} ${lenU()}　${t("cogFromInside")}: ${r1(toLen(insideX))} ${lenU()}</div>
      <div>${t("cogOffset")} — ${t("cogLong")} <b>${off.long}</b> (${off.longHint})</div>
      <div style="padding-left:4em">${t("cogLat")} <b>${off.lat}</b>　${t("cogVert")} <b>${off.vert}</b> (${off.vertHint})</div>
      <div style="font-size:11px;color:var(--muted);margin-top:2px">${r1(toWt(cog.totalWeight))} ${wtU()} · ${lang === "zh" ? "底部橙盘=重心投影 · 蓝点=柜心 · 红箭=偏移" : "Orange disc=CoG · Blue=center · Red arrow=offset"}</div>
    </div>`;
  bindCogStatHover();
}

function refreshCoG() {
  const c = activeContainer;
  if (!c || !c.placements?.length) {
    clearCoG();
    updateCoGStat(null, null);
    return;
  }
  const cog = computeCoG(getCoGPlacements());
  drawCoGMarker(cog, c.length, c.width, c.height);
  updateCoGStat(c, cog);
  if (cogFocusActive) applySceneFocus(true);
}

let cogFocusActive = false;
const COG_FOCUS = { mesh: 0.04, edge: 0.38, deco: 0.1 };

function rememberMatState(mat) {
  if (!mat || mat.focusSaved) return;
  mat.focusSaved = {
    opacity: mat.opacity,
    transparent: mat.transparent,
    depthWrite: mat.depthWrite,
    color: mat.color ? mat.color.clone() : null,
  };
}

function restoreMatState(mat) {
  const s = mat?.focusSaved;
  if (!s) return;
  mat.opacity = s.opacity;
  mat.transparent = s.transparent;
  if (s.depthWrite !== undefined) mat.depthWrite = s.depthWrite;
  if (s.color && mat.color) mat.color.copy(s.color);
}

function applySceneFocus(on) {
  for (const b of boxMeshes) {
    if (!b.mesh.visible) continue;
    rememberMatState(b.mesh.material);
    rememberMatState(b.edges.material);
    if (on) {
      b.mesh.material.transparent = true;
      b.mesh.material.opacity = selected === b ? 0.18 : COG_FOCUS.mesh;
      b.mesh.material.depthWrite = false;
      b.edges.material.transparent = true;
      b.edges.material.opacity = COG_FOCUS.edge;
    } else {
      restoreMatState(b.mesh.material);
      restoreMatState(b.edges.material);
      b.mesh.material.opacity = selected === b ? 1 : 0.92;
    }
  }
  if (group) {
    group.children.forEach((child) => {
      if (child === cogGroup) return;
      child.traverse((obj) => {
        if (!obj.material) return;
        rememberMatState(obj.material);
        if (on) {
          obj.material.transparent = true;
          const base = obj.material.focusSaved?.opacity ?? 1;
          obj.material.opacity = Math.min(COG_FOCUS.deco, base * 0.22);
          obj.material.depthWrite = false;
        } else {
          restoreMatState(obj.material);
        }
      });
    });
  }
  if (cogGroup) {
    cogGroup.traverse((obj) => {
      if (!obj.material) return;
      rememberMatState(obj.material);
      if (on) {
        const base = obj.material.focusSaved?.opacity ?? 1;
        obj.material.opacity = Math.min(1, base + 0.15);
        if (obj.material.color && obj.material.focusSaved?.color) {
          obj.material.color.copy(obj.material.focusSaved.color);
          obj.material.color.offsetHSL(0, 0.12, 0.18);
        }
      } else {
        restoreMatState(obj.material);
      }
    });
  }
}

function setCogFocus(on) {
  if (cogFocusActive === on) return;
  if (on && !cogGroup) return;
  cogFocusActive = on;
  document.getElementById("stat")?.classList.toggle("cog-focus", on);
  ["legend", "tabs", "step-info-panel", "anim-tools", "detail"].forEach((id) => {
    document.getElementById(id)?.classList.toggle("cog-focus-dim", on);
  });
  document.getElementById("cog-focus-veil")?.classList.toggle("active", on);
  applySceneFocus(on);
}

function bindCogStatHover() {
  const block = document.querySelector(".cog-stat-block");
  if (!block) return;
  block.onmouseenter = () => setCogFocus(true);
  block.onmouseleave = () => setCogFocus(false);
}

// 坐标映射:容器 (x=长,y=宽,z=高) -> three (x=长,y=高,z=宽)
function drawDoorMarker(L, W, H) {
  if (packMeta.pack_strategy !== "door_last") return;
  const mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, H), mat);
  mesh.position.set(L, H / 2, W / 2);
  mesh.rotation.y = -Math.PI / 2;
  group.add(mesh);
}

function drawContainer(c, animated) {
  clearGroup();
  clearCoG();
  activeContainer = c;
  activePlanStep = null;
  planStepsData = [];
  planTagged = [];
  animState = null;
  updateAnimControls();
  const L = c.length, W = c.width, H = c.height;
  const col = new THREE.Color(c.color || "#64748b");
  const cl = c.corner_length || 0, cw = c.corner_width || 0, ch = c.corner_height || 0;
  const box = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(L, H, W)),
    new THREE.LineBasicMaterial({ color: col }));
  box.position.set(L / 2, H / 2, W / 2); group.add(box);
  if (cl > 0 || cw > 0 || ch > 0) {
    const innerL = Math.max(0, L - 2 * cl);
    const innerW = Math.max(0, W - 2 * cw);
    const innerH = Math.max(0, H - 2 * ch);
    if (innerL > 0 && innerW > 0 && innerH > 0) {
      const inner = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(innerL, innerH, innerW)),
        new THREE.LineBasicMaterial({ color: 0x38bdf8 }));
      inner.position.set(cl + innerL / 2, ch + innerH / 2, cw + innerW / 2);
      group.add(inner);
    }
  }
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(L, W),
    new THREE.MeshBasicMaterial({
      color: col.clone().multiplyScalar(0.35), transparent: true, opacity: 0.55,
      side: THREE.FrontSide, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 2,
    }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(L / 2, 0.05, W / 2);
  floor.renderOrder = 0;
  group.add(floor);
  drawDoorMarker(L, W, H);

  const sorted = [...c.placements].sort((a, b) => {
    const ka = loadOrderKey(a), kb = loadOrderKey(b);
    for (let i = 0; i < ka.length; i++) if (ka[i] !== kb[i]) return ka[i] - kb[i];
    return 0;
  });
  const planMeta = computePlanSteps(c);
  planStepsData = planMeta.steps;
  planTagged = planMeta.tagged;
  const stepBySeq = new Map();
  for (const s of planMeta.tagged) stepBySeq.set(s.placement.seq, s.step);

  sorted.forEach((p) => {
    const geo = new THREE.BoxGeometry(p.dx, p.dz, p.dy);
    const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(p.color || "#4C72B0"), transparent: true, opacity: 0.92 });
    const mesh = new THREE.Mesh(geo, mat);
    const target = { x: p.x + p.dx / 2, y: p.z + p.dz / 2, z: p.y + p.dy / 2 };
    mesh.position.set(target.x, target.y, target.z);
    mesh.userData.baseColor = mat.color.clone();
    group.add(mesh);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x0b1220 }));
    edges.position.copy(mesh.position); group.add(edges);
    const planStep = stepBySeq.get(p.seq) ?? 1;
    boxMeshes.push({ mesh, edges, placement: p, target, planStep });
  });

  controls.target.set(L / 2, H / 2, W / 2);
  const d = Math.max(L, W, H);
  camera.position.set(L / 2 + d * 0.9, H + d * 0.7, W / 2 + d * 1.1);
  controls.update();

  if (animated) startAnim(H);
  else if (planStepsData.length) pickPlanStep(planStepsData.length, false);
  refreshCoG();
}

// 装入顺序比较:门对侧(里) → 门侧(外),与后端 seq 一致
function loadOrderKey(p) {
  return [p.x ?? 0, p.z ?? 0, p.y ?? 0, p.seq ?? 0];
}
function compareLoadOrder(a, b) {
  const ka = loadOrderKey(a.placement || a);
  const kb = loadOrderKey(b.placement || b);
  for (let i = 0; i < ka.length; i++) {
    if (ka[i] !== kb[i]) return ka[i] - kb[i];
  }
  return 0;
}

let orbitDragged = false;

function pauseAnimClock() {
  if (!animState || animState.pauseStart != null) return;
  animState.pauseStart = performance.now();
}

function resumeAnimClock() {
  if (!animState || animState.pauseStart == null) return;
  animState.pausedMs += performance.now() - animState.pauseStart;
  animState.pauseStart = null;
}

function animElapsed() {
  if (!animState) return 0;
  let ms = performance.now() - animState.t0 - animState.pausedMs;
  if (animState.pauseStart != null) ms -= performance.now() - animState.pauseStart;
  return ms;
}

function updateAnimControls() {
  const skipBtn = document.getElementById("skip-anim");
  if (skipBtn) skipBtn.style.display = animState ? "inline-block" : "none";
}

function finishAnimImmediate() {
  for (const b of boxMeshes) {
    b.mesh.visible = true;
    b.edges.visible = true;
    b.mesh.position.set(b.target.x, b.target.y, b.target.z);
    b.edges.position.copy(b.mesh.position);
    b.done = true;
  }
  animState = null;
  updateAnimControls();
  if (planStepsData.length) pickPlanStep(planStepsData.length, false);
  refreshCoG();
}

// ---- 动画:从柜内(门对侧)到门侧逐件飞入 ----
function startAnim(H) {
  const per = 90, rise = Math.max(H * 0.7, 200);
  const ordered = [...boxMeshes].sort(compareLoadOrder);
  ordered.forEach((b, i) => {
    b.mesh.visible = false; b.edges.visible = false;
    b.from = { x: b.target.x, y: b.target.y + rise, z: b.target.z };
    b.startAt = i * per; b.dur = 300; b.done = false;
  });
  animState = { t0: performance.now(), pausedMs: 0, pauseStart: null, cogDone: 0 };
  updateAnimControls();
  clearCoG();
  updateCoGStat(activeContainer, null);
}
function stepAnim() {
  if (!animState) return;
  const now = animElapsed();
  let allDone = true;
  for (const b of boxMeshes) {
    if (b.done) continue;
    if (now < b.startAt) { allDone = false; continue; }
    const k = Math.min(1, (now - b.startAt) / b.dur);
    b.mesh.visible = true; b.edges.visible = true;
    const e = 1 - Math.pow(1 - k, 3);
    const y = b.from.y + (b.target.y - b.from.y) * e;
    b.mesh.position.set(b.target.x, y, b.target.z);
    b.edges.position.copy(b.mesh.position);
    if (k >= 1) b.done = true; else allDone = false;
  }
  const doneN = boxMeshes.filter((b) => b.done).length;
  if (doneN !== animState.cogDone) {
    animState.cogDone = doneN;
    refreshCoG();
  }
  if (allDone) finishAnimImmediate();
}
window.skipAnim = () => {
  if (!animState) return;
  finishAnimImmediate();
};
window.replayAnim = () => {
  const c = (window._usedContainers || [])[activeIdx];
  if (c) {
    drawContainer(c, true);
    renderPlanTree(c);
  }
};

// ---- 点击高亮 + 详情 ----
function onCanvasClick(ev) {
  if (orbitDragged) { orbitDragged = false; return; }
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(boxMeshes.map((b) => b.mesh));
  if (selected) { selected.mesh.material.color.copy(selected.mesh.userData.baseColor); selected.mesh.material.opacity = cogFocusActive ? COG_FOCUS.mesh : 0.92; }
  if (hits.length === 0) {
    selected = null;
    document.getElementById("detail").style.display = "none";
    highlightPlanStep(null);
    return;
  }
  const hit = boxMeshes.find((b) => b.mesh === hits[0].object);
  selected = hit;
  hit.mesh.material.color.offsetHSL(0, 0, 0.25);
  hit.mesh.material.opacity = cogFocusActive ? 0.22 : 1;
  showDetail(hit.placement, hit.placement.seq || (boxMeshes.indexOf(hit) + 1));
}
function showDetail(p, seq) {
  const d = document.getElementById("detail");
  d.style.display = "block";
  d.innerHTML = `
    <span class="close" onclick="document.getElementById('detail').style.display='none'">×</span>
    <div style="font-weight:600;margin-bottom:4px">${t("detail")}</div>
    <div><span class="k">${t("name")}:</span> ${p.base_name}</div>
    <div><span class="k">${t("seq")}:</span> #${seq}</div>
    <div><span class="k">${t("pos")} (${lenU()}):</span> ${r1(toLen(p.x))}, ${r1(toLen(p.y))}, ${r1(toLen(p.z))}</div>
    <div><span class="k">${t("size")} (${lenU()}):</span> ${r1(toLen(p.dx))}×${r1(toLen(p.dy))}×${r1(toLen(p.dz))}</div>`;
}

// ================= 装柜请求 =================
let lastResult = null, activeIdx = 0;

async function runPack() {
  syncFromInputs();
  const msg = document.getElementById("msg");
  msg.textContent = t("packing");
  const payload = {
    containers: containersData, items: itemsData,
    support_surface_ratio: +document.getElementById("ssr").value, bigger_first: true,
    pack_strategy: document.getElementById("pack_strategy").value,
    pack_mode: document.getElementById("pack_mode")?.value || "multi_multi",
  };
  try {
    const res = await fetch("/api/pack", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    lastResult = await res.json();
    packMeta.pack_strategy = lastResult.pack_strategy || payload.pack_strategy;
    let extra = "";
    if (lastResult.pack_mode) {
      const ml = { multi_multi: "modeMultiMulti", single_multi: "modeSingleMulti", volume_ratio: "modeVolumeRatio", variable_qty: "modeVariableQty" };
      extra += ` · ${t(ml[lastResult.pack_mode] || "modeMultiMulti")}`;
    }
    if (lastResult.total_freight != null) extra += ` · ${lang === "zh" ? "运费" : "Freight"} ${lastResult.total_freight}`;
    if (lastResult.scenarios?.length) extra += ` · ${lastResult.scenarios.length} ${lang === "zh" ? "种方案" : "scenarios"}`;
    msg.textContent = `${t("done")}: ${t("total")} ${lastResult.total_items} ${t("items")}, ${t("notLoaded")} ${lastResult.unpacked.length} ${t("items")}${extra}`;
    activeIdx = 0; renderTabs(); showContainer(0, wantPackAnim());
    renderContainerRecommendations();
  } catch (e) { msg.textContent = t("err") + ": " + e.message; renderContainerRecommendations(); }
}
window.runPack = runPack;

function renderContainerRecommendations() {
  const panel = document.getElementById("rec-panel");
  if (!panel) return;
  const recs = lastResult?.container_recommendations;
  if (!recs?.length || packMode !== "multi_multi") {
    panel.style.display = "none";
    panel.innerHTML = "";
    return;
  }
  panel.style.display = "block";
  const rows = recs.map((rec, i) => {
    const fitBadge = rec.fits_all
      ? `<span style="color:#4ade80">✓ ${t("recFitsAll")}</span>`
      : `<span style="color:#fbbf24">${rec.loaded_count}/${lastResult.total_items} ${t("items")}</span>`;
    const freight = rec.total_freight != null
      ? `${t("recFreight")} <b>${rec.total_freight}</b>`
      : "";
    return `
      <div class="rec-item ${i === 0 ? "best" : ""}">
        <div><b>#${rec.rank}</b> ${escHtml(rec.label)} · ${rec.total_containers} ${lang === "zh" ? "柜" : "box(es)"}</div>
        <div class="rec-meta">${fitBadge} ${freight ? `· ${freight}` : ""}</div>
        <div class="rec-meta">${escHtml(lang === "zh" ? rec.reason_zh : rec.reason_en)}</div>
        <button type="button" class="secondary mini" onclick="applyContainerRecommendation(${i})">${t("recApply")}</button>
      </div>`;
  }).join("");
  panel.innerHTML = `<h3>📦 ${t("recTitle")}</h3><div style="font-size:11px;color:var(--muted);margin-bottom:8px">${t("recHint")}</div>${rows}`;
}

window.applyContainerRecommendation = (idx) => {
  const rec = lastResult?.container_recommendations?.[idx];
  if (!rec?.containers?.length) return;
  syncFromInputs();
  containersData = rec.containers.map((c) => normalizeContainer({
    ...c,
    count: Math.max(1, +c.count || 1),
  }));
  renderContainers();
  runPack();
};

function renderTabs() {
  const used = lastResult.containers.filter((c) => c.item_count > 0);
  document.getElementById("tabs").innerHTML = used.map((c, i) =>
    `<div class="chip ${i === activeIdx ? "active" : ""}" onclick="pickTab(${i})">${c.name} · ${c.item_count}${t("items")} · ${c.volume_utilization}%</div>`).join("");
  window._usedContainers = used;
}
window.pickTab = (i) => { activeIdx = i; renderTabs(); showContainer(i, wantPackAnim()); };

function showContainer(i, animated) {
  const c = (window._usedContainers || [])[i];
  document.getElementById("detail").style.display = "none";
  if (!c) { clearGroup(); return; }
  drawContainer(c, animated);
  const stat = document.getElementById("stat");
  stat.style.display = "block";
  const wm = c.water_metrics;
  const tareLine = c.tare_weight > 0 ? `
      <div style="font-size:12px;margin-top:2px">${t("tareWeight")} <b>${r1(toWt(c.tare_weight))}</b> ${wtU()}
      　${t("grossWtTotal")} <b>${r1(toWt(c.gross_weight ?? (c.used_weight + (c.tare_weight || 0))))}</b> ${wtU()}</div>` : "";
  const waterLine = wm ? `
      <div style="font-size:12px;margin-top:4px;padding-top:4px;border-top:1px solid var(--border)" title="${lang === "zh" ? "假想验:假设门朝天往里灌水,用于评估里侧空隙" : "Thought test: if door were up, estimates interior void"}">
        💧 ${t("interiorWater")} <b>${wm.interior_water_liters} L</b>
        　${t("deepFloorFill")} <b>${wm.deep_floor_fill_pct}%</b>
        　${t("interiorVoid")} <b>${r1(wm.interior_floor_void_cm2)} cm²</b>
      </div>` : "";
  stat.innerHTML = `
    <div class="stat-main">
      <div><b>${c.name}</b> — ${r1(toLen(c.length))}×${r1(toLen(c.width))}×${r1(toLen(c.height))} ${lenU()}</div>
      <div>${t("loaded")} <b>${c.item_count}</b> ${t("items")}　${r1(toWt(c.used_weight))}/${r1(toWt(c.max_payload))} ${wtU()}</div>
      <div>${t("volUtil")} <b>${c.volume_utilization}%</b><div class="bar"><i style="width:${c.volume_utilization}%"></i></div></div>
      <div>${t("wtUtil")} <b>${c.weight_utilization}%</b><div class="bar"><i style="width:${c.weight_utilization}%;background:#f59e0b"></i></div></div>
      ${tareLine}
      ${waterLine}
    </div>
    <div id="cog-stat"></div>`;
  const colors = {};
  for (const p of c.placements) colors[p.base_name] = p.color;
  const legend = document.getElementById("legend");
  legend.style.display = "block";
  let html = Object.entries(colors).map(([n, col]) => `<div class="lg"><span class="swatch" style="background:${col}"></span>${n}</div>`).join("");
  if (lastResult.unpacked.length) html += `<div class="unpacked">${t("notLoaded")} ${lastResult.unpacked.length} ${t("items")}</div>`;
  legend.innerHTML = html;
  renderSteps(c, animated);
  refreshCoG();
  scheduleLayoutRefresh();
}

function renderSteps(c, skipHighlight = false) {
  renderPlanTree(c);
  if (!skipHighlight && planStepsData.length) pickPlanStep(planStepsData.length, false);
}

function comparePlacementsByLoadOrder(a, b) {
  const ka = loadOrderKey(a), kb = loadOrderKey(b);
  for (let i = 0; i < ka.length; i++) {
    if (ka[i] !== kb[i]) return ka[i] - kb[i];
  }
  return 0;
}

function overlapXY(a, b) {
  const ox = Math.min(a.x + a.dx, b.x + b.dx) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.dy, b.y + b.dy) - Math.max(a.y, b.y);
  return ox > 1e-3 && oy > 1e-3;
}

function hasVisibleSupport(p, shownSeqs, all) {
  const below = all.filter(
    (s) => Math.abs(s.z + s.dz - p.z) < 0.1 && overlapXY(s, p),
  );
  if (!below.length) return false;
  return below.some((s) => shownSeqs.has(s.seq));
}

/** 本步及此前已装且支撑完整的货物(先低后高,避免悬空) */
function stableVisibleSeqs(stepIdx, tagged, allPlacements) {
  const allowed = new Set(
    tagged.filter((t) => t.step <= stepIdx).map((t) => t.placement.seq),
  );
  const ordered = [...allPlacements]
    .filter((p) => allowed.has(p.seq))
    .sort((a, b) => (a.z - b.z) || comparePlacementsByLoadOrder(a, b));
  const shown = new Set();
  for (const p of ordered) {
    if (p.z < 0.1 || hasVisibleSupport(p, shown, allPlacements)) {
      shown.add(p.seq);
    }
  }
  return shown;
}

function restoreMeshColor(b, opacity) {
  b.mesh.material.color.copy(b.mesh.userData.baseColor);
  const op = opacity ?? (cogFocusActive ? (selected === b ? 0.18 : COG_FOCUS.mesh) : 0.92);
  b.mesh.material.opacity = op;
  if (cogFocusActive && b.edges?.material) b.edges.material.opacity = COG_FOCUS.edge;
}

function inferOrientLabel(p) {
  const { dx, dy, dz } = p;
  const max = Math.max(dx, dy, dz);
  if (max === dz) return dx >= dy ? t("orientStandFwd") : t("orientStandSide");
  if (max === dx) return t("orientFlatFwd");
  return t("orientSide");
}

function gridCountText(placements) {
  if (!placements.length) return "—";
  const rep = placements[0];
  const tol = 1.5;
  const same = placements.filter(
    (p) => Math.abs(p.dx - rep.dx) < tol && Math.abs(p.dy - rep.dy) < tol && Math.abs(p.dz - rep.dz) < tol,
  );
  const bx = (v) => Math.round(v / tol);
  const xs = new Set(same.map((p) => bx(p.x)));
  const ys = new Set(same.map((p) => bx(p.y)));
  const zs = new Set(same.map((p) => bx(p.z)));
  return `${xs.size}×${ys.size}×${zs.size}`;
}

function summarizeNewOnes(newOnes) {
  if (!newOnes.length) {
    return { cargoName: "—", orient: "—", grid: "—", dims: "—" };
  }
  const groups = {};
  for (const p of newOnes) {
    if (!groups[p.base_name]) groups[p.base_name] = [];
    groups[p.base_name].push(p);
  }
  const names = Object.keys(groups).sort(
    (a, b) => groups[b].length - groups[a].length,
  );
  const cargoName = names.map((n) => `${n}×${groups[n].length}`).join("、");

  if (names.length === 1) {
    const rep = groups[names[0]][0];
    return {
      cargoName,
      orient: inferOrientLabel(rep),
      grid: gridCountText(groups[names[0]]),
      dims: `(${r1(rep.dx)}, ${r1(rep.dy)}, ${r1(rep.dz)})`,
    };
  }

  const orient = names.map((n) => `${n}:${inferOrientLabel(groups[n][0])}`).join("；");
  const grid = names.map((n) => `${n}:${gridCountText(groups[n])}`).join("；");
  const dims = names.map((n) => {
    const r = groups[n][0];
    return `${n}:(${r1(r.dx)}, ${r1(r.dy)}, ${r1(r.dz)})`;
  }).join("；");

  return { cargoName, orient, grid, dims };
}

/** 按深度分批(仅底板定带);堆叠件同步支撑步,不先于下层出现 */
function computePlanSteps(c) {
  const placements = [...c.placements].sort(comparePlacementsByLoadOrder);
  if (!placements.length) return { steps: [], tagged: [], numSteps: 0, avgDx: 0 };

  const floor = placements.filter((p) => (p.z ?? 0) < 0.1);
  const src = floor.length ? floor : placements;
  const avgDx = src.reduce((s, p) => s + (p.dx || 0), 0) / src.length;
  let numSteps = Math.max(1, Math.min(placements.length, Math.round(c.length / avgDx)));
  const band = c.length / numSteps;

  const stepBySeq = new Map();
  for (const p of placements) {
    if ((p.z ?? 0) < 0.1) {
      stepBySeq.set(
        p.seq,
        Math.min(numSteps, Math.max(1, Math.floor(p.x / band) + 1)),
      );
    }
  }

  const used = [...new Set(stepBySeq.values())].sort((a, b) => a - b);
  const remap = new Map(used.map((s, i) => [s, i + 1]));
  for (const [seq, s] of [...stepBySeq.entries()]) stepBySeq.set(seq, remap.get(s));
  numSteps = used.length || 1;

  const byZ = [...placements].sort((a, b) => (a.z - b.z) || comparePlacementsByLoadOrder(a, b));
  for (const p of byZ) {
    if ((p.z ?? 0) < 0.1) continue;
    let step = Math.min(numSteps, Math.max(1, Math.floor(p.x / band) + 1));
    step = remap.get(step) ?? step;
    const below = placements.filter(
      (s) => Math.abs(s.z + s.dz - p.z) < 0.1 && overlapXY(s, p),
    );
    for (const s of below) {
      const bs = stepBySeq.get(s.seq);
      if (bs != null) step = Math.max(step, bs);
    }
    stepBySeq.set(p.seq, step);
  }

  const tagged = placements.map((p) => ({
    placement: p,
    step: stepBySeq.get(p.seq) ?? 1,
  }));

  const steps = [];
  for (let k = 1; k <= numSteps; k++) {
    const newOnes = tagged.filter((t) => t.step === k).map((t) => t.placement);
    const cumulative = tagged.filter((t) => t.step <= k).map((t) => t.placement);
    const summary = summarizeNewOnes(newOnes);
    steps.push({
      index: k,
      newOnes,
      cumulative,
      newCount: newOnes.length,
      totalCount: cumulative.length,
      depthTo: Math.min(c.length, k * band),
      ...summary,
    });
  }
  return { steps, tagged, numSteps, avgDx, band };
}

function renderPlanTree(c) {
  const tree = document.getElementById("plan-tree");
  const body = document.getElementById("plan-tree-body");
  const info = document.getElementById("step-info-panel");
  if (!c || !c.placements.length || !planStepsData.length) {
    tree.style.display = "none";
    body.innerHTML = "";
    info.style.display = "none";
    scheduleLayoutRefresh();
    return;
  }
  tree.style.display = "block";
  info.style.display = "block";
  const stepItems = planStepsData.map((s) =>
    `<div class="tree-step" data-step="${s.index}" onclick="pickPlanStep(${s.index})">
      ${t("stepNo").replace("{n}", s.index)}
    </div>`
  ).join("");
  body.innerHTML = `
    <div class="tree-cname">${c.name}</div>
    ${stepItems}`;
  scheduleLayoutRefresh();
}

function renderStepInfo(stepIdx) {
  const grid = document.getElementById("step-info-grid");
  const step = planStepsData[stepIdx - 1];
  if (!step) { grid.innerHTML = ""; return; }
  const allPlacements = planTagged.map((t) => t.placement);
  const visible = stableVisibleSeqs(stepIdx, planTagged, allPlacements);
  const stepNewVisible = step.newOnes.filter((p) => visible.has(p.seq));
  const summary = summarizeNewOnes(stepNewVisible);
  const rows = [
    [t("loadStep"), step.index],
    [t("cargoName"), summary.cargoName],
    [t("loadOrient"), summary.orient],
    [t("gridCount"), summary.grid],
    [t("gridDims"), summary.dims],
    [t("stepLoad"), stepNewVisible.length],
    [t("totalLoad"), visible.size],
  ];
  const cog = computeCoG(allPlacements.filter((p) => visible.has(p.seq)));
  if (cog && activeContainer) {
    const off = formatCoGOffset(cog, activeContainer);
    rows.push([t("cogTitle"), `${t("cogLong")} ${off.long} (${off.longHint})`]);
  }
  grid.innerHTML = rows.map(([k, v]) =>
    `<div class="info-row"><span class="k">${k}:</span><span class="v">${v}</span></div>`
  ).join("");
}

window.pickPlanStep = (stepIdx, scrollTree = true) => {
  highlightPlanStep(stepIdx, scrollTree);
  renderStepInfo(stepIdx);
};

function highlightPlanStep(stepIdx, scrollTree) {
  activePlanStep = stepIdx ?? null;
  document.querySelectorAll("#plan-tree .tree-step").forEach((el) => {
    const n = +el.dataset.step;
    el.classList.toggle("active", stepIdx !== null && n === stepIdx);
  });

  const allPlacements = boxMeshes.map((b) => b.placement);

  if (!stepIdx || !planStepsData.length) {
    boxMeshes.forEach((b) => {
      b.mesh.visible = true;
      b.edges.visible = true;
      restoreMeshColor(b);
    });
    refreshCoG();
    return;
  }

  const visible = stableVisibleSeqs(stepIdx, planTagged, allPlacements);

  boxMeshes.forEach((b) => {
    if (!visible.has(b.placement.seq)) {
      b.mesh.visible = false;
      b.edges.visible = false;
      return;
    }
    b.mesh.visible = true;
    b.edges.visible = true;
    restoreMeshColor(b);
  });

  refreshCoG();

  if (scrollTree) {
    const el = document.querySelector(`#plan-tree .tree-step[data-step="${stepIdx}"]`);
    if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

// ================= 导入 / 导出 =================
window.downloadTemplate = () => { window.location.href = "/api/template"; };

window.importItems = async (file) => {
  if (!file) return;
  const msg = document.getElementById("msg");
  msg.textContent = t("importing");
  const fd = new FormData(); fd.append("file", file);
  try {
    const res = await fetch("/api/import", { method: "POST", body: fd });
    const data = await res.json();
    if (data.items && data.items.length) {
      itemsData = data.items.map((it) => normalizeItem({ ...it, color: it.color || randColor() }));
      data.items.forEach((it) => upsertLibraryEntry(it));
      renderItems();
      msg.textContent = `${t("importOk")}: ${data.items.length} ${t("items")}`;
    } else { msg.textContent = t("err"); }
  } catch (e) { msg.textContent = t("err") + ": " + e.message; }
  document.getElementById("xlsx").value = "";
};

window.exportReport = async (kind) => {
  const msg = document.getElementById("msg");
  if (!lastResult) { msg.textContent = t("noResult"); return; }
  msg.textContent = t("exporting");
  try {
    const res = await fetch(`/api/export/${kind}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lastResult),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = kind === "pdf" ? "loading_report.pdf" : "loading_report.xlsx";
    a.click(); URL.revokeObjectURL(url);
    msg.textContent = t("exported");
  } catch (e) { msg.textContent = t("err") + ": " + e.message; }
};

window.viewReport = async () => {
  const msg = document.getElementById("msg");
  if (!lastResult) { msg.textContent = t("noResult"); return; }
  try {
    const res = await fetch("/api/report", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lastResult),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const html = await res.text();
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); }
    else msg.textContent = t("err") + ": popup blocked";
  } catch (e) { msg.textContent = t("err") + ": " + e.message; }
};

// ================= 侧栏拖拽调宽 =================
function initResizer() {
  const resizer = document.getElementById("resizer");
  const root = document.documentElement;
  const MIN = 320, MAX = 900;
  let dragging = false;

  const onMove = (e) => {
    if (!dragging) return;
    const w = Math.min(MAX, Math.max(MIN, e.clientX));
    root.style.setProperty("--sidebar-w", w + "px");
    onResize(); // 同步刷新三维画布尺寸
  };
  const stop = () => {
    if (!dragging) return;
    dragging = false;
    resizer.classList.remove("dragging");
    document.body.classList.remove("resizing");
    onResize();
  };
  resizer.addEventListener("mousedown", (e) => {
    dragging = true;
    resizer.classList.add("dragging");
    document.body.classList.add("resizing");
    e.preventDefault();
  });
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", stop);
  // 双击复位默认宽度
  resizer.addEventListener("dblclick", () => {
    root.style.setProperty("--sidebar-w", "440px");
    onResize();
  });
}

// ================= 启动 =================
loadAnimPref();
loadUnitPrefs();
loadItemLibrary();
applyI18n();
syncPackAnimCheckbox();
renderContainerPresets();
renderItemPresets();
renderContainers();
renderItems();
initThree();
initResizer();
runPack();
