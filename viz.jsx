/* =========================================================
   viz.jsx — interactive diagrams (dependency-free, canvas 2D)
   ---------------------------------------------------------
   Each chapter may set `viz: "<name>"` in data.jsx; the chapter
   page renders <Viz name={...} /> in a free "Interactive" section.
   Components read CSS theme vars live and redraw on theme toggle.
   ========================================================= */

function cssvar(name, fb) {
  try { const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); return v || fb; }
  catch (e) { return fb; }
}
function COLORS() {
  return {
    ink: cssvar("--ink", "#141414"),
    accent: cssvar("--accent", "#ff4d1f"),
    accentInk: cssvar("--accent-ink", "#1a0700"),
    primary: cssvar("--primary", "#0e3a3a"),
    muted: cssvar("--muted", "#6b6657"),
    hair: cssvar("--hairline-strong", "#14141433"),
    surface: cssvar("--surface", "#ebe6d9"),
    bg: cssvar("--bg", "#f3efe6"),
  };
}

// Redraw tick when the theme attribute flips.
function useThemeTick() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    const obs = new MutationObserver(() => setT((x) => x + 1));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return t;
}

// Canvas that redraws on every render (params/theme/resize → re-render).
function Canvas({ draw, height }) {
  const ref = React.useRef(null);
  const tick = useThemeTick();
  const [, setRsz] = React.useState(0);
  React.useEffect(() => {
    const on = () => setRsz((x) => x + 1);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  React.useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const W = Math.max(280, cv.clientWidth || 520), H = height || 260;
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    draw(ctx, W, H);
  });
  return <canvas ref={ref} className="viz-canvas" style={{ width: "100%", height: (height || 260) + "px", display: "block" }} />;
}

function niceStep(span) {
  const raw = span / 8, p = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / p;
  return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * p;
}
function fmtNum(v) { return Math.abs(v) < 1e-9 ? "0" : (Math.round(v * 100) / 100).toString(); }

// Draw grid + axes for ranges xr,yr; return mapping {X,Y,...}.
function makeAxes(ctx, W, H, xr, yr) {
  const c = COLORS();
  const pad = { l: 36, r: 12, t: 14, b: 22 };
  const x0 = pad.l, x1 = W - pad.r, y0 = H - pad.b, y1 = pad.t;
  const X = (x) => x0 + (x - xr[0]) / (xr[1] - xr[0]) * (x1 - x0);
  const Y = (y) => y0 - (y - yr[0]) / (yr[1] - yr[0]) * (y0 - y1);
  ctx.font = "10px ui-monospace, monospace";
  ctx.textBaseline = "middle";
  const xs = niceStep(xr[1] - xr[0]), ys = niceStep(yr[1] - yr[0]);
  ctx.strokeStyle = c.hair; ctx.lineWidth = 1;
  ctx.fillStyle = c.muted;
  for (let gx = Math.ceil(xr[0] / xs) * xs; gx <= xr[1] + 1e-9; gx += xs) {
    ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.moveTo(X(gx), y1); ctx.lineTo(X(gx), y0); ctx.stroke(); ctx.globalAlpha = 1;
    if (Math.abs(gx) > 1e-9) { ctx.textAlign = "center"; ctx.fillText(fmtNum(gx), X(gx), y0 + 11); }
  }
  for (let gy = Math.ceil(yr[0] / ys) * ys; gy <= yr[1] + 1e-9; gy += ys) {
    ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.moveTo(x0, Y(gy)); ctx.lineTo(x1, Y(gy)); ctx.stroke(); ctx.globalAlpha = 1;
    if (Math.abs(gy) > 1e-9) { ctx.textAlign = "right"; ctx.fillText(fmtNum(gy), x0 - 4, Y(gy)); }
  }
  ctx.strokeStyle = c.ink; ctx.lineWidth = 1.4;
  if (yr[0] <= 0 && yr[1] >= 0) { ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x1, Y(0)); ctx.stroke(); }
  if (xr[0] <= 0 && xr[1] >= 0) { ctx.beginPath(); ctx.moveTo(X(0), y0); ctx.lineTo(X(0), y1); ctx.stroke(); }
  return { X, Y, x0, x1, y0, y1, c };
}

// Plot y=f(x) over xr, breaking the path near asymptotes / out-of-range.
function plotFn(ctx, ax, f, xr, yr, color, width) {
  ctx.strokeStyle = color; ctx.lineWidth = width || 2.2; ctx.lineJoin = "round";
  const N = 320, margin = (yr[1] - yr[0]);
  let pen = false; ctx.beginPath();
  for (let i = 0; i <= N; i++) {
    const x = xr[0] + (xr[1] - xr[0]) * i / N;
    let y = f(x);
    if (y == null || !isFinite(y) || y < yr[0] - margin || y > yr[1] + margin) { pen = false; continue; }
    const py = ax.Y(Math.max(yr[0] - 0.5, Math.min(yr[1] + 0.5, y)));
    if (!pen) { ctx.moveTo(ax.X(x), py); pen = true; } else ctx.lineTo(ax.X(x), py);
  }
  ctx.stroke();
}
function dot(ctx, x, y, r, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); }

function Slider({ label, value, min, max, step, onChange }) {
  const v = Number.isFinite(value) ? value : (Number.isFinite(min) ? min : 0);
  return (
    <label className="viz-slider">
      <span>{label} = <b>{Math.round(v * 100) / 100}</b></span>
      <input type="range" min={min} max={max} step={step || 0.1} value={v}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
    </label>
  );
}
function Readout({ children }) { return <div className="viz-readout">{children}</div>; }

/* ============ generic parametric function plot ============ */
function FunctionPlot({ config }) {
  const lang = useLang();
  const initial = React.useMemo(() => { const o = {}; (config.params || []).forEach((q) => (o[q.key] = q.value)); return o; }, [config]);
  const [p, setP] = React.useState(initial);
  React.useEffect(() => { setP(initial); }, [initial]); // reset params when the chapter (config) changes
  const xr = config.xr || [-6, 6], yr = config.yr || [-4, 8];
  const set = (k, v) => setP((s) => ({ ...s, [k]: v }));
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    (config.curves || []).forEach((cv) => plotFn(ctx, ax, (x) => cv.f(x, p), xr, yr, cv.color === "primary" ? ax.c.primary : ax.c.accent, cv.width || 2.4));
    if (config.annotate) config.annotate(ctx, ax, p, lang);
  };
  return (
    <div>
      <Canvas draw={draw} height={config.height || 260} />
      <div className="viz-controls">
        {(config.params || []).map((q) => (
          <Slider key={q.key} label={lang === "zh" ? q.zh : q.en} value={p[q.key]} min={q.min} max={q.max} step={q.step} onChange={(v) => set(q.key, v)} />
        ))}
      </div>
      {config.readout && <Readout>{config.readout(p, lang)}</Readout>}
      <div className="viz-caption">{pick(lang, config.caption)}</div>
    </div>
  );
}

const LINEAR = {
  xr: [-6, 6], yr: [-6, 6], height: 250,
  params: [{ key: "k", zh: "斜率 k", en: "slope k", min: -3, max: 3, step: 0.1, value: 1 }, { key: "b", zh: "截距 b", en: "intercept b", min: -4, max: 4, step: 0.5, value: 1 }],
  curves: [{ f: (x, p) => p.k * x + p.b, color: "accent" }],
  readout: (p, l) => `y = ${p.k}x ${p.b >= 0 ? "+ " + p.b : "− " + (-p.b)}`,
  caption: { zh: "拖动滑块:k 改变倾斜程度与方向,b 上下平移直线。", en: "Drag the sliders: k tilts the line, b shifts it up or down." },
};
const QUADRATIC = {
  xr: [-6, 6], yr: [-6, 10], height: 270,
  params: [
    { key: "a", zh: "a", en: "a", min: -2, max: 2, step: 0.1, value: 1 },
    { key: "b", zh: "b", en: "b", min: -6, max: 6, step: 0.5, value: 0 },
    { key: "c", zh: "c", en: "c", min: -6, max: 6, step: 0.5, value: -3 },
  ],
  curves: [{ f: (x, p) => p.a * x * x + p.b * x + p.c, color: "accent" }],
  annotate: (ctx, ax, p, l) => {
    if (Math.abs(p.a) < 1e-6) return;
    const vx = -p.b / (2 * p.a), vy = p.a * vx * vx + p.b * vx + p.c;
    dot(ctx, ax.X(vx), ax.Y(vy), 4, ax.c.primary);
    const d = p.b * p.b - 4 * p.a * p.c;
    if (d >= 0) {
      const r1 = (-p.b - Math.sqrt(d)) / (2 * p.a), r2 = (-p.b + Math.sqrt(d)) / (2 * p.a);
      [r1, r2].forEach((r) => dot(ctx, ax.X(r), ax.Y(0), 3.5, ax.c.accent));
    }
  },
  readout: (p, l) => {
    const d = p.b * p.b - 4 * p.a * p.c;
    const root = d > 0 ? (l === "zh" ? "两个实根" : "two real roots") : d === 0 ? (l === "zh" ? "一个重根" : "one double root") : (l === "zh" ? "无实根" : "no real roots");
    return `Δ = b² − 4ac = ${Math.round(d * 100) / 100} → ${root}`;
  },
  caption: { zh: "抛物线 y=ax²+bx+c。绿点是顶点,橙点是与 x 轴的交点(实根);判别式 Δ 决定交点个数。", en: "Parabola y=ax²+bx+c. Green = vertex, orange = x-intercepts (real roots); the discriminant Δ sets how many." },
};
const EXPLOG = {
  xr: [-4, 5], yr: [-3, 6], height: 270,
  params: [{ key: "a", zh: "底数 a", en: "base a", min: 0.25, max: 4, step: 0.05, value: 2 }],
  curves: [
    { f: (x, p) => (Math.abs(p.a - 1) < 0.02 ? null : Math.pow(p.a, x)), color: "accent" },
    { f: (x, p) => (x > 0 && Math.abs(p.a - 1) > 0.02 ? Math.log(x) / Math.log(p.a) : null), color: "primary" },
  ],
  annotate: (ctx, ax) => {
    // y = x reference line (the axis of symmetry between a function and its inverse)
    ctx.strokeStyle = ax.c.muted; ctx.setLineDash([4, 4]); ctx.lineWidth = 1; ctx.beginPath();
    ctx.moveTo(ax.X(-3), ax.Y(-3)); ctx.lineTo(ax.X(5), ax.Y(5)); ctx.stroke(); ctx.setLineDash([]);
  },
  readout: (p, l) => `y = ${p.a}^x   ${l === "zh" ? "与" : "and"}   y = log_${p.a}(x)`,
  caption: { zh: "橙线是指数函数 y=aˣ,绿线是对数函数 y=logₐx;二者关于虚线 y=x 对称——互为反函数。", en: "Orange = exponential y=aˣ, green = logarithm y=logₐx; they mirror across the dashed line y=x — inverse functions." },
};
const NORMAL = {
  xr: [-6, 6], yr: [0, 1.05], height: 250,
  params: [{ key: "m", zh: "均值 μ", en: "mean μ", min: -3, max: 3, step: 0.2, value: 0 }, { key: "s", zh: "标准差 σ", en: "std σ", min: 0.4, max: 2.5, step: 0.1, value: 1 }],
  curves: [{ f: (x, p) => Math.exp(-((x - p.m) * (x - p.m)) / (2 * p.s * p.s)) / (p.s * Math.sqrt(2 * Math.PI)), color: "accent" }],
  annotate: (ctx, ax, p, l) => {
    ctx.strokeStyle = ax.c.primary; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(ax.X(p.m), ax.y0); ctx.lineTo(ax.X(p.m), ax.Y(0.45 / p.s)); ctx.stroke(); ctx.setLineDash([]);
  },
  readout: (p, l) => `X ~ N(${p.m}, ${Math.round(p.s * p.s * 100) / 100})`,
  caption: { zh: "正态分布密度。μ 决定中心(虚线),σ 决定胖瘦:σ 越大越扁平、越分散。", en: "Normal density. μ sets the center (dashed line), σ sets the spread: larger σ → flatter, wider." },
};

/* ============ derivative: tangent line ============ */
function DerivativeDemo() {
  const lang = useLang();
  const [x0, setX0] = React.useState(1);
  const xr = [-6.3, 6.3], yr = [-1.7, 1.7];
  const f = Math.sin, df = Math.cos;
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    plotFn(ctx, ax, f, xr, yr, ax.c.accent, 2.4);
    const m = df(x0), y0 = f(x0);
    ctx.strokeStyle = ax.c.primary; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ax.X(xr[0]), ax.Y(y0 + m * (xr[0] - x0))); ctx.lineTo(ax.X(xr[1]), ax.Y(y0 + m * (xr[1] - x0))); ctx.stroke();
    dot(ctx, ax.X(x0), ax.Y(y0), 4.5, ax.c.primary);
  };
  return (
    <div>
      <Canvas draw={draw} height={250} />
      <div className="viz-controls"><Slider label={lang === "zh" ? "切点 x₀" : "point x₀"} value={x0} min={-6} max={6} step={0.05} onChange={setX0} /></div>
      <Readout>{lang === "zh" ? "斜率" : "slope"} f′(x₀) = cos({Math.round(x0 * 100) / 100}) = <b>{Math.round(Math.cos(x0) * 1000) / 1000}</b></Readout>
      <div className="viz-caption">{lang === "zh" ? "导数 = 切线斜率。移动切点,看绿色切线如何随曲线弯曲而转动——它的斜率正是 f′(x₀)。" : "The derivative is the slope of the tangent. Move the point and watch the tangent rotate; its slope is f′(x₀)."}</div>
    </div>
  );
}

/* ============ Riemann sum ============ */
function RiemannDemo() {
  const lang = useLang();
  const [n, setN] = React.useState(6);
  const [mode, setMode] = React.useState("left");
  const a = 0, b = Math.PI, f = (x) => Math.sin(x);
  const xr = [-0.4, Math.PI + 0.4], yr = [-0.15, 1.2];
  let approx = 0;
  for (let i = 0; i < n; i++) { const dx = (b - a) / n; const x = mode === "left" ? a + i * dx : mode === "right" ? a + (i + 1) * dx : a + (i + 0.5) * dx; approx += f(x) * dx; }
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    const dx = (b - a) / n;
    for (let i = 0; i < n; i++) {
      const xl = a + i * dx, xs = mode === "left" ? xl : mode === "right" ? xl + dx : xl + dx / 2, hgt = f(xs);
      ctx.fillStyle = ax.c.accent; ctx.globalAlpha = 0.22;
      ctx.fillRect(ax.X(xl), ax.Y(hgt), ax.X(xl + dx) - ax.X(xl), ax.Y(0) - ax.Y(hgt));
      ctx.globalAlpha = 1; ctx.strokeStyle = ax.c.accent; ctx.lineWidth = 1;
      ctx.strokeRect(ax.X(xl), ax.Y(hgt), ax.X(xl + dx) - ax.X(xl), ax.Y(0) - ax.Y(hgt));
    }
    plotFn(ctx, ax, f, [a, b], yr, ax.c.primary, 2.4);
  };
  return (
    <div>
      <Canvas draw={draw} height={250} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "矩形数 n" : "rectangles n"} value={n} min={1} max={40} step={1} onChange={(v) => setN(Math.round(v))} />
        <div className="viz-seg">
          {["left", "mid", "right"].map((mm) => (
            <button key={mm} className={mode === mm ? "active" : ""} onClick={() => setMode(mm)}>
              {lang === "zh" ? { left: "左", mid: "中", right: "右" }[mm] : mm}
            </button>
          ))}
        </div>
      </div>
      <Readout>{lang === "zh" ? "近似面积" : "approx area"} ≈ <b>{Math.round(approx * 1000) / 1000}</b> &nbsp;·&nbsp; {lang === "zh" ? "精确值" : "exact"} = 2</Readout>
      <div className="viz-caption">{lang === "zh" ? "用 n 个矩形逼近 ∫₀^π sin x dx。增大 n,矩形面积之和越来越接近真实面积 2——这就是定积分的定义。" : "Approximate ∫₀^π sin x dx with n rectangles. As n grows, the sum approaches the true area 2 — the definition of the definite integral."}</div>
    </div>
  );
}

/* ============ gradient descent ============ */
function GradientDemo() {
  const lang = useLang();
  const f = (x) => 0.5 * x * x, df = (x) => x;
  const [alpha, setAlpha] = React.useState(0.7);
  const [x0, setX0] = React.useState(-5);
  const [pts, setPts] = React.useState([-5]);
  const [playing, setPlaying] = React.useState(false);
  const xr = [-6.5, 6.5], yr = [-1, 20];
  React.useEffect(() => { setPts([x0]); setPlaying(false); }, [x0, alpha]);
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setPts((prev) => {
        if (prev.length > 45) return prev;
        const xk = prev[prev.length - 1]; let xn = xk - alpha * df(xk);
        if (Math.abs(xn) > 60) xn = Math.sign(xn) * 60;
        if (Math.abs(xn - xk) < 1e-3) return prev;
        return prev.concat(xn);
      });
    }, 260);
    return () => clearInterval(id);
  }, [playing, alpha]);
  const cur = pts[pts.length - 1];
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    plotFn(ctx, ax, f, xr, yr, ax.c.accent, 2.4);
    ctx.strokeStyle = ax.c.primary; ctx.lineWidth = 1.4;
    for (let i = 0; i < pts.length; i++) {
      const x = pts[i], y = f(x), px = ax.X(Math.max(xr[0], Math.min(xr[1], x))), py = ax.Y(Math.min(yr[1], y));
      if (i > 0) { const xp = pts[i - 1]; ctx.beginPath(); ctx.moveTo(ax.X(Math.max(xr[0], Math.min(xr[1], xp))), ax.Y(Math.min(yr[1], f(xp)))); ctx.lineTo(px, py); ctx.stroke(); }
      dot(ctx, px, py, i === pts.length - 1 ? 5 : 2.6, i === pts.length - 1 ? ax.c.accent : ax.c.primary);
    }
  };
  return (
    <div>
      <Canvas draw={draw} height={250} />
      <div className="viz-controls">
        <button className="viz-btn" onClick={() => setPlaying((q) => !q)}>{playing ? (lang === "zh" ? "暂停" : "Pause") : (lang === "zh" ? "▶ 迭代" : "▶ Run")}</button>
        <button className="viz-btn" onClick={() => { setPts([x0]); setPlaying(false); }}>{lang === "zh" ? "重置" : "Reset"}</button>
        <Slider label={lang === "zh" ? "学习率 α" : "rate α"} value={alpha} min={0.1} max={2.4} step={0.05} onChange={setAlpha} />
        <Slider label={lang === "zh" ? "起点 x₀" : "start x₀"} value={x0} min={-6} max={6} step={0.5} onChange={setX0} />
      </div>
      <Readout>{lang === "zh" ? "第" : "step"} {pts.length - 1} {lang === "zh" ? "步" : ""}: x = <b>{Math.round(cur * 1000) / 1000}</b>, f(x) = <b>{Math.round(f(cur) * 1000) / 1000}</b>{Math.abs(cur) > 12 ? (lang === "zh" ? " — 发散!α 太大" : " — diverging! α too large") : ""}</Readout>
      <div className="viz-caption">{lang === "zh" ? "梯度下降 x ← x − α·f′(x) 沿斜坡往下滚向最小值。α 太小收敛慢,α 太大(>2)会越跳越远而发散。" : "Gradient descent x ← x − α·f′(x) rolls downhill to the minimum. Too-small α is slow; too-large α (>2) overshoots and diverges."}</div>
    </div>
  );
}

/* ============ sequences & partial sums ============ */
function SequenceDemo() {
  const lang = useLang();
  const [type, setType] = React.useState("arith");
  const [a1, setA1] = React.useState(1);
  const [d, setD] = React.useState(2);     // common difference
  const [q, setQ] = React.useState(1.5);   // common ratio
  const [n, setN] = React.useState(7);
  const term = (k) => (type === "arith" ? a1 + (k - 1) * d : a1 * Math.pow(q, k - 1));
  const terms = []; for (let k = 1; k <= n; k++) terms.push(term(k));
  const Sn = terms.reduce((s, v) => s + v, 0);
  const draw = (ctx, W, H) => {
    const c = COLORS();
    const pad = { l: 30, r: 12, t: 16, b: 22 }, x0 = pad.l, x1 = W - pad.r, y0 = H - pad.b, y1 = pad.t;
    const maxv = Math.max(1, ...terms.map((v) => Math.abs(v)));
    const Y = (v) => y0 - (v / maxv) * (y0 - y1) * 0.92;
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
    const bw = (x1 - x0) / n;
    terms.forEach((v, i) => {
      const bx = x0 + i * bw + bw * 0.18, w = bw * 0.64;
      ctx.fillStyle = c.accent; ctx.globalAlpha = 0.85;
      ctx.fillRect(bx, Y(v), w, y0 - Y(v)); ctx.globalAlpha = 1;
      ctx.fillStyle = c.muted; ctx.font = "10px ui-monospace,monospace"; ctx.textAlign = "center";
      ctx.fillText("a" + (i + 1), bx + w / 2, y0 + 11);
    });
    // cumulative sum polyline
    let acc = 0; const smax = Math.max(1, Math.abs(Sn));
    ctx.strokeStyle = c.primary; ctx.lineWidth = 2; ctx.beginPath();
    terms.forEach((v, i) => { acc += v; const sx = x0 + i * bw + bw * 0.5, sy = y0 - (acc / smax) * (y0 - y1) * 0.92; if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy); });
    ctx.stroke();
    acc = 0; terms.forEach((v, i) => { acc += v; const sx = x0 + i * bw + bw * 0.5, sy = y0 - (acc / smax) * (y0 - y1) * 0.92; dot(ctx, sx, sy, 2.6, c.primary); });
  };
  return (
    <div>
      <Canvas draw={draw} height={240} />
      <div className="viz-controls">
        <div className="viz-seg">
          <button className={type === "arith" ? "active" : ""} onClick={() => setType("arith")}>{lang === "zh" ? "等差" : "Arithmetic"}</button>
          <button className={type === "geom" ? "active" : ""} onClick={() => setType("geom")}>{lang === "zh" ? "等比" : "Geometric"}</button>
        </div>
        <Slider label={lang === "zh" ? "首项 a₁" : "a₁"} value={a1} min={-4} max={6} step={0.5} onChange={setA1} />
        {type === "arith"
          ? <Slider label={lang === "zh" ? "公差 d" : "diff d"} value={d} min={-3} max={4} step={0.5} onChange={setD} />
          : <Slider label={lang === "zh" ? "公比 q" : "ratio q"} value={q} min={-2} max={2} step={0.1} onChange={setQ} />}
        <Slider label={lang === "zh" ? "项数 n" : "n terms"} value={n} min={3} max={12} step={1} onChange={(v) => setN(Math.round(v))} />
      </div>
      <Readout>{lang === "zh" ? "前 n 项和" : "sum"} S<sub>{n}</sub> = <b>{Math.round(Sn * 100) / 100}</b></Readout>
      <div className="viz-caption">{lang === "zh" ? "橙色柱是各项 aₖ,绿线是前 k 项和 Sₖ 的增长。等差数列和线性增长,等比数列(|q|>1)爆炸式增长。" : "Orange bars are the terms aₖ; the green line is the running sum Sₖ. Arithmetic sums grow linearly; geometric (|q|>1) explode."}</div>
    </div>
  );
}

/* ============ unit circle → sine wave ============ */
function TrigDemo() {
  const lang = useLang();
  const [theta, setTheta] = React.useState(0.9);
  const [playing, setPlaying] = React.useState(true);
  const last = React.useRef(0), raf = React.useRef(0);
  React.useEffect(() => {
    if (!playing) return; let alive = true;
    const loop = (ts) => {
      if (!alive) return;
      if (!last.current) last.current = ts;
      const dt = (ts - last.current) / 1000; last.current = ts;
      setTheta((t) => (t + dt * 1.0) % (2 * Math.PI));
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf.current); last.current = 0; };
  }, [playing]);
  const draw = (ctx, W, H) => {
    const c = COLORS();
    const R = Math.min(H / 2 - 14, 72), cx = 20 + R, cy = H / 2;
    ctx.strokeStyle = c.hair; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - R - 6, cy); ctx.lineTo(cx + R + 6, cy); ctx.moveTo(cx, cy - R - 6); ctx.lineTo(cx, cy + R + 6); ctx.stroke();
    const px = cx + R * Math.cos(theta), py = cy - R * Math.sin(theta);
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.setLineDash([3, 3]); ctx.strokeStyle = c.primary; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke();
    ctx.strokeStyle = c.muted; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(cx, py); ctx.stroke(); ctx.setLineDash([]);
    dot(ctx, px, py, 3.5, c.accent);
    const wx0 = cx + R + 28, wx1 = W - 12, wy = cy, amp = R, span = wx1 - wx0;
    ctx.strokeStyle = c.hair; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(wx0, wy); ctx.lineTo(wx1, wy); ctx.stroke();
    ctx.strokeStyle = c.primary; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 220; i++) { const an = 2 * Math.PI * i / 220, X = wx0 + span * an / (2 * Math.PI), Y = wy - amp * Math.sin(an); if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); }
    ctx.stroke();
    const dX = wx0 + span * theta / (2 * Math.PI), dY = wy - amp * Math.sin(theta);
    ctx.setLineDash([3, 3]); ctx.strokeStyle = c.hair; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(dX, dY); ctx.stroke(); ctx.setLineDash([]);
    dot(ctx, dX, dY, 3.5, c.accent);
    ctx.fillStyle = c.muted; ctx.font = "11px ui-monospace,monospace"; ctx.textAlign = "left";
    ctx.fillText("θ=" + theta.toFixed(2) + "   sinθ=" + Math.sin(theta).toFixed(2) + "   cosθ=" + Math.cos(theta).toFixed(2), 14, 14);
  };
  return (
    <div>
      <Canvas draw={draw} height={220} />
      <div className="viz-controls">
        <button className="viz-btn" onClick={() => setPlaying((q) => !q)}>{playing ? (lang === "zh" ? "暂停" : "Pause") : (lang === "zh" ? "▶ 播放" : "▶ Play")}</button>
        <Slider label={"θ"} value={theta} min={0} max={2 * Math.PI} step={0.01} onChange={(v) => { setPlaying(false); setTheta(v); }} />
      </div>
      <div className="viz-caption">{lang === "zh" ? "单位圆上的点逆时针旋转,它的高度(纵坐标 = sin θ)在右边描出正弦曲线;水平投影则是 cos θ。" : "As the point circles counter-clockwise, its height (y = sin θ) traces the sine wave on the right; its horizontal projection is cos θ."}</div>
    </div>
  );
}

const VIZ = {
  linear: () => <FunctionPlot config={LINEAR} />,
  quadratic: () => <FunctionPlot config={QUADRATIC} />,
  explog: () => <FunctionPlot config={EXPLOG} />,
  normal: () => <FunctionPlot config={NORMAL} />,
  derivative: () => <DerivativeDemo />,
  riemann: () => <RiemannDemo />,
  gradient: () => <GradientDemo />,
  sequence: () => <SequenceDemo />,
  trig: () => <TrigDemo />,
};

function Viz({ name }) {
  const render = VIZ[name];
  if (!render) return null;
  // key by name so switching chapters remounts the demo with fresh state
  return <div className="viz" key={name}>{render()}</div>;
}

window.Viz = Viz;
