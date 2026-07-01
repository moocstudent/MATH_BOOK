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

/* ============ direct proportion y = kx (through origin) ============ */
function ProportionDemo() {
  const lang = useLang();
  const [k, setK] = React.useState(1.5);
  const xr = [-6, 6], yr = [-6, 6];
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    const c = ax.c;
    // Shade the two quadrants the line lives in: k>0 → I & III, k<0 → II & IV.
    ctx.save(); ctx.globalAlpha = 0.09; ctx.fillStyle = k >= 0 ? c.accent : c.primary;
    if (k >= 0) {
      ctx.fillRect(ax.X(0), ax.Y(yr[1]), ax.X(xr[1]) - ax.X(0), ax.Y(0) - ax.Y(yr[1]));   // Q I
      ctx.fillRect(ax.X(xr[0]), ax.Y(0), ax.X(0) - ax.X(xr[0]), ax.Y(yr[0]) - ax.Y(0));    // Q III
    } else {
      ctx.fillRect(ax.X(xr[0]), ax.Y(yr[1]), ax.X(0) - ax.X(xr[0]), ax.Y(0) - ax.Y(yr[1])); // Q II
      ctx.fillRect(ax.X(0), ax.Y(0), ax.X(xr[1]) - ax.X(0), ax.Y(yr[0]) - ax.Y(0));         // Q IV
    }
    ctx.restore();
    // the line y = kx
    plotFn(ctx, ax, (x) => k * x, xr, yr, c.accent, 2.6);
    // rise / run step: origin → (1,0) → (1,k)
    ctx.strokeStyle = c.primary; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(ax.X(0), ax.Y(0)); ctx.lineTo(ax.X(1), ax.Y(0)); ctx.lineTo(ax.X(1), ax.Y(k)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = c.muted; ctx.font = "11px ui-monospace,monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(lang === "zh" ? "x 增 1" : "Δx=1", ax.X(0.5), ax.Y(0) + 3);
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText((lang === "zh" ? "y 增 " : "Δy=") + fmtNum(k), ax.X(1) + 6, ax.Y(k / 2));
    // key points: origin and (1,k)
    dot(ctx, ax.X(0), ax.Y(0), 4, c.primary);
    dot(ctx, ax.X(1), ax.Y(k), 4.5, c.accent);
    ctx.fillStyle = c.ink; ctx.textAlign = "left"; ctx.textBaseline = "bottom";
    ctx.fillText("(1, " + fmtNum(k) + ")", ax.X(1) + 6, ax.Y(k) - 4);
  };
  return (
    <div>
      <Canvas draw={draw} height={260} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "比例系数 k" : "constant k"} value={k} min={-3} max={3} step={0.1} onChange={setK} />
      </div>
      <Readout>y = {fmtNum(k)}x &nbsp;·&nbsp; {lang === "zh" ? "比值" : "ratio"} y/x = <b>{fmtNum(k)}</b> ({lang === "zh" ? "恒定" : "constant"})</Readout>
      <div className="viz-caption">{lang === "zh" ? "正比例函数 y=kx 的图象是过原点的直线,必过点 (1,k)。x 每增加 1,y 就改变 k;k>0 时图象在第一、三象限(y 随 x 增大),k<0 时在第二、四象限(y 随 x 减小)。" : "The graph of y=kx is a line through the origin, always passing (1,k). Each +1 in x changes y by k; k>0 lives in quadrants I & III (y increases), k<0 in II & IV (y decreases)."}</div>
    </div>
  );
}

/* ============ a family of proportional lines y = kx ============ */
function ProportionFamilyDemo() {
  const lang = useLang();
  const xr = [-6, 6], yr = [-6, 6];
  const ks = [2, 1, 0.5, -0.5, -1, -2];
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    const c = ax.c;
    ks.forEach((k) => {
      const col = k >= 0 ? c.accent : c.primary;
      ctx.globalAlpha = 0.45 + 0.5 * Math.min(1, Math.abs(k) / 2);
      plotFn(ctx, ax, (x) => k * x, xr, yr, col, 1.4 + Math.min(1.4, Math.abs(k) * 0.5));
      ctx.globalAlpha = 1;
      // label near the point where the line leaves the frame
      let lx = xr[1] - 0.35, ly = k * lx, rightEdge = true;
      if (ly > yr[1] - 0.35) { ly = yr[1] - 0.35; lx = ly / k; rightEdge = false; }
      else if (ly < yr[0] + 0.35) { ly = yr[0] + 0.35; lx = ly / k; rightEdge = false; }
      ctx.fillStyle = col; ctx.font = "10px ui-monospace,monospace"; ctx.textBaseline = "middle";
      // Lines that exit the right edge would clip the label → right-align it inside.
      ctx.textAlign = rightEdge ? "right" : "left";
      ctx.fillText("k=" + k, ax.X(lx) + (rightEdge ? -4 : 4), ax.Y(ly));
    });
    dot(ctx, ax.X(0), ax.Y(0), 4, c.ink);
  };
  return (
    <div>
      <Canvas draw={draw} height={260} />
      <div className="viz-caption">{lang === "zh" ? "所有正比例函数 y=kx 都过原点,像一把绕原点张开的扇子。|k| 越大直线越陡;k>0(橙)从左下到右上,k<0(绿)从左上到右下。" : "Every y=kx passes through the origin, like a fan pivoting there. Larger |k| means steeper; k>0 (orange) rises left-to-right, k<0 (green) falls."}</div>
    </div>
  );
}

/* ============ direct proportion in the real world: s = v·t ============ */
function ProportionRealWorldDemo() {
  const lang = useLang();
  const [v, setV] = React.useState(60); // speed km/h
  const tr = [0, 6], sr = [0, 480];     // hours, km
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, tr, sr);
    const c = ax.c;
    plotFn(ctx, ax, (t) => v * t, tr, sr, c.accent, 2.6);
    // mark a working point at t = 3 h
    const t0 = 3, s0 = v * t0;
    ctx.strokeStyle = c.primary; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(ax.X(t0), ax.Y(0)); ctx.lineTo(ax.X(t0), ax.Y(Math.min(s0, sr[1])));
    ctx.lineTo(ax.X(0), ax.Y(Math.min(s0, sr[1]))); ctx.stroke(); ctx.setLineDash([]);
    dot(ctx, ax.X(t0), ax.Y(Math.min(s0, sr[1])), 4.5, c.accent);
    ctx.fillStyle = c.muted; ctx.font = "11px ui-monospace,monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "top"; ctx.fillText("t=3h", ax.X(t0), ax.Y(0) + 3);
  };
  return (
    <div>
      <Canvas draw={draw} height={260} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "车速 v (km/h)" : "speed v (km/h)"} value={v} min={20} max={120} step={5} onChange={setV} />
      </div>
      <Readout>{lang === "zh" ? "路程" : "distance"} s = {fmtNum(v)}·t &nbsp;·&nbsp; t=3h → s = <b>{fmtNum(v * 3)}</b> km</Readout>
      <div className="viz-caption">{lang === "zh" ? "匀速行驶时路程 s 与时间 t 成正比:s=vt,车速 v 就是比例系数 k。车速越大,同样时间跑得越远,图象越陡。" : "At constant speed, distance s is proportional to time t: s=vt, where speed v plays the role of k. Faster speed = steeper line."}</div>
    </div>
  );
}

/* ============ the ratio y/x = k stays constant ============ */
function ProportionRatioDemo() {
  const lang = useLang();
  const [k, setK] = React.useState(1.5);
  const xr = [0, 6], yr = [0, 9];
  const xs = [1, 2, 3, 4];
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    const c = ax.c;
    plotFn(ctx, ax, (x) => k * x, xr, yr, c.accent, 2.4);
    // similar right triangles under each sample point → same shape (same ratio)
    xs.forEach((x) => {
      const y = k * x;
      if (y > yr[1] + 1e-9) return;
      ctx.strokeStyle = c.primary; ctx.globalAlpha = 0.55; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(ax.X(x), ax.Y(0)); ctx.lineTo(ax.X(x), ax.Y(y)); ctx.lineTo(ax.X(0), ax.Y(0)); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      dot(ctx, ax.X(x), ax.Y(y), 3.6, c.accent);
      ctx.fillStyle = c.ink; ctx.font = "10px ui-monospace,monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "bottom";
      ctx.fillText(fmtNum(y) + "/" + x + "=" + fmtNum(k), ax.X(x), ax.Y(y) - 4);
    });
  };
  return (
    <div>
      <Canvas draw={draw} height={260} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "比例系数 k" : "constant k"} value={k} min={0.5} max={2.5} step={0.1} onChange={setK} />
      </div>
      <Readout>{lang === "zh" ? "每个点都满足" : "every point gives"} y/x = <b>{fmtNum(k)}</b> ({lang === "zh" ? "恒定不变" : "always the same"})</Readout>
      <div className="viz-caption">{lang === "zh" ? "正比例的核心是「比值恒定」:直线上任取一点,纵坐标 ÷ 横坐标 都等于 k。这些直角三角形彼此相似,斜率处处相同。" : "The heart of direct proportion is a constant ratio: for any point on the line, y÷x equals k. The right triangles are all similar — the slope never changes."}</div>
    </div>
  );
}

/* ============ one point determines y = kx (undetermined-coefficient idea) ============ */
function ProportionThroughPointDemo() {
  const lang = useLang();
  const [px, setPx] = React.useState(2);
  const [py, setPy] = React.useState(3);
  const xr = [-6, 6], yr = [-6, 6];
  const k = Math.abs(px) < 1e-9 ? null : py / px;
  const draw = (ctx, W, H) => {
    const ax = makeAxes(ctx, W, H, xr, yr);
    const c = ax.c;
    if (k != null) plotFn(ctx, ax, (x) => k * x, xr, yr, c.accent, 2.6);
    dot(ctx, ax.X(0), ax.Y(0), 4, c.primary);
    dot(ctx, ax.X(px), ax.Y(py), 5, c.accent);
    ctx.fillStyle = c.ink; ctx.font = "11px ui-monospace,monospace";
    ctx.textAlign = "left"; ctx.textBaseline = "bottom";
    ctx.fillText("(" + fmtNum(px) + ", " + fmtNum(py) + ")", ax.X(px) + 6, ax.Y(py) - 4);
  };
  return (
    <div>
      <Canvas draw={draw} height={260} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "点横坐标 x" : "point x"} value={px} min={-5} max={5} step={0.5} onChange={setPx} />
        <Slider label={lang === "zh" ? "点纵坐标 y" : "point y"} value={py} min={-5} max={5} step={0.5} onChange={setPy} />
      </div>
      <Readout>{k == null ? (lang === "zh" ? "x=0 无法确定 k" : "x=0 cannot fix k") : <>{lang === "zh" ? "代入 " : "sub in: "}{fmtNum(py)} = k·{fmtNum(px)} → k = <b>{fmtNum(k)}</b>, y = {fmtNum(k)}x</>}</Readout>
      <div className="viz-caption">{lang === "zh" ? "正比例函数必过原点,所以「再知道一个点」就能确定它:把该点代入 y=kx 解出 k(待定系数法)。移动这个点,直线随之绕原点转动。" : "Since y=kx must pass the origin, one extra point pins it down: plug the point into y=kx and solve for k. Move the point and the line pivots about the origin."}</div>
    </div>
  );
}

/* ============ combinatorics helpers ============ */
const ITEM_LABELS = "ABCDEFGHIJ";
function permCount(n, k) {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
}
function combCount(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}
function allCombinations(n, k) {
  const res = [];
  const go = (start, path) => {
    if (path.length === k) { res.push([...path]); return; }
    for (let i = start; i < n; i++) { path.push(i); go(i + 1, path); path.pop(); }
  };
  go(0, []);
  return res;
}
function allPermutations(n, k) {
  const res = [];
  const used = new Array(n).fill(false);
  const go = (path) => {
    if (path.length === k) { res.push([...path]); return; }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(i); go(path); path.pop(); used[i] = false;
    }
  };
  go([]);
  return res;
}

/* ============ ordered slots: P(n,k) ============ */
function PermSlotsDemo() {
  const lang = useLang();
  const [n, setN] = React.useState(4);
  const [k, setK] = React.useState(2);
  const kk = Math.min(k, n);
  const labels = ITEM_LABELS.slice(0, n);
  const draw = (ctx, W, H) => {
    const c = COLORS();
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, W, H);
    const slotW = Math.min(46, Math.max(28, (W - 48) / kk - 10));
    const gap = 10;
    const rowW = kk * slotW + (kk - 1) * gap;
    const x0 = (W - rowW) / 2;
    const slotY = 34;
    for (let i = 0; i < kk; i++) {
      const x = x0 + i * (slotW + gap);
      ctx.strokeStyle = c.ink; ctx.lineWidth = 1.6;
      ctx.strokeRect(x, slotY, slotW, slotW);
      ctx.fillStyle = c.muted; ctx.font = "10px ui-monospace,monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "bottom";
      ctx.fillText((lang === "zh" ? "第" : "") + (i + 1) + (lang === "zh" ? "位" : ""), x + slotW / 2, slotY - 4);
      ctx.fillStyle = c.accent; ctx.font = "bold 15px ui-monospace,monospace";
      ctx.textBaseline = "middle";
      ctx.fillText(String(n - i), x + slotW / 2, slotY + slotW / 2);
      ctx.fillStyle = c.muted; ctx.font = "9px ui-monospace,monospace";
      ctx.textBaseline = "top";
      ctx.fillText(lang === "zh" ? "种选法" : " choices", x + slotW / 2, slotY + slotW + 3);
      if (i < kk - 1) {
        ctx.fillStyle = c.ink; ctx.font = "16px ui-monospace,monospace";
        ctx.textBaseline = "middle";
        ctx.fillText("×", x + slotW + gap / 2, slotY + slotW / 2);
      }
    }
    const parts = [];
    for (let i = 0; i < kk; i++) parts.push(n - i);
    const p = permCount(n, kk);
    ctx.fillStyle = c.ink; ctx.font = "13px ui-monospace,monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText("P(" + n + "," + kk + ") = " + parts.join(" × ") + " = " + p, W / 2, slotY + slotW + 28);
    const ballR = Math.min(17, (W - 40) / n / 2 - 5);
    const ballGap = ballR * 2 + 10;
    const ballX0 = (W - n * ballGap + 10) / 2 + ballR;
    const ballY = H - 38;
    labels.forEach((ch, i) => {
      const bx = ballX0 + i * ballGap;
      ctx.fillStyle = i % 2 ? c.primary : c.accent;
      ctx.beginPath(); ctx.arc(bx, ballY, ballR, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = c.bg; ctx.font = "bold 12px ui-monospace,monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(ch, bx, ballY);
    });
    ctx.fillStyle = c.muted; ctx.font = "11px ui-monospace,monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "bottom";
    ctx.fillText(lang === "zh" ? "n 个不同元素(无放回)" : "n distinct items (no replacement)", W / 2, ballY - ballR - 6);
  };
  return (
    <div>
      <Canvas draw={draw} height={240} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "元素个数 n" : "items n"} value={n} min={3} max={6} step={1} onChange={(v) => { setN(v); if (k > v) setK(v); }} />
        <Slider label={lang === "zh" ? "选取个数 k" : "pick k"} value={kk} min={1} max={n} step={1} onChange={setK} />
      </div>
      <Readout>P({n},{kk}) = <b>{permCount(n, kk)}</b> {lang === "zh" ? "种有序方案" : "ordered outcomes"}</Readout>
      <div className="viz-caption">{lang === "zh" ? "排列用乘法原理分步计数:第 1 位 n 种,第 2 位 n−1 种……每占一位,可选集合就缩小一个。" : "Permutations multiply step by step: n choices for slot 1, n−1 for slot 2, … each filled slot shrinks the pool."}</div>
    </div>
  );
}

/* ============ unordered subset: C(n,k) ============ */
function CombSelectDemo() {
  const lang = useLang();
  const [n, setN] = React.useState(5);
  const [k, setK] = React.useState(2);
  const [idx, setIdx] = React.useState(0);
  const kk = Math.min(k, n);
  const labels = ITEM_LABELS.slice(0, n);
  const all = allCombinations(n, kk);
  React.useEffect(() => { setIdx(0); }, [n, kk]);
  const pick = all.length ? all[Math.min(idx, all.length - 1)] : [];
  const pickSet = new Set(pick);
  const draw = (ctx, W, H) => {
    const c = COLORS();
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, W, H);
    const ballR = Math.min(20, (W - 40) / n / 2 - 4);
    const ballGap = ballR * 2 + 14;
    const ballX0 = (W - n * ballGap + 14) / 2 + ballR;
    const ballY = H / 2 - 8;
    labels.forEach((ch, i) => {
      const bx = ballX0 + i * ballGap;
      const on = pickSet.has(i);
      ctx.fillStyle = on ? c.accent : c.surface;
      ctx.strokeStyle = on ? c.accent : c.hair;
      ctx.lineWidth = on ? 2 : 1;
      ctx.beginPath(); ctx.arc(bx, ballY, ballR, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
      ctx.fillStyle = on ? c.bg : c.ink;
      ctx.font = (on ? "bold " : "") + "13px ui-monospace,monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(ch, bx, ballY);
    });
    const subset = pick.map((i) => labels[i]).join(", ");
    ctx.fillStyle = c.ink; ctx.font = "13px ui-monospace,monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText("{" + subset + "}", W / 2, ballY + ballR + 18);
    ctx.fillStyle = c.muted; ctx.font = "11px ui-monospace,monospace";
    ctx.fillText((lang === "zh" ? "方案 " : "case ") + (all.length ? idx + 1 : 0) + " / " + all.length, W / 2, 16);
  };
  return (
    <div>
      <Canvas draw={draw} height={200} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "元素个数 n" : "items n"} value={n} min={3} max={6} step={1} onChange={(v) => { setN(v); if (k > v) setK(v); }} />
        <Slider label={lang === "zh" ? "选取个数 k" : "pick k"} value={kk} min={1} max={n} step={1} onChange={setK} />
        {all.length > 1 && <Slider label={lang === "zh" ? "浏览方案" : "browse"} value={idx} min={0} max={all.length - 1} step={1} onChange={setIdx} />}
      </div>
      <Readout>C({n},{kk}) = <b>{combCount(n, kk)}</b> {lang === "zh" ? "种无序方案" : "unordered subsets"} &nbsp;·&nbsp; P({n},{kk}) / {kk}! = {permCount(n, kk)} / {kk > 1 ? kk + "!" : "1"}</Readout>
      <div className="viz-caption">{lang === "zh" ? "组合只关心「选了谁」,同一组元素不论顺序只计一次。因此组合数 = 排列数 ÷ k!(消去同一组的 k! 种排列)。" : "Combinations care only about which items are chosen — order ignored. So C(n,k) = P(n,k) / k!, canceling the k! orderings of each set."}</div>
    </div>
  );
}

/* ============ permutation vs combination side by side ============ */
function PermVsCombDemo() {
  const lang = useLang();
  const [n, setN] = React.useState(4);
  const [k, setK] = React.useState(2);
  const kk = Math.min(k, n);
  const labels = ITEM_LABELS.slice(0, n);
  const perms = allPermutations(n, kk);
  const combs = allCombinations(n, kk);
  const draw = (ctx, W, H) => {
    const c = COLORS();
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, W, H);
    const mid = W / 2;
    ctx.strokeStyle = c.hair; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mid, 12); ctx.lineTo(mid, H - 12); ctx.stroke();
    const drawList = (items, x0, w, title, col, formatter) => {
      ctx.fillStyle = col; ctx.font = "bold 12px ui-monospace,monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(title, x0 + w / 2, 14);
      ctx.fillStyle = c.muted; ctx.font = "10px ui-monospace,monospace";
      ctx.fillText(items.length + (lang === "zh" ? " 种" : " ways"), x0 + w / 2, 30);
      const cols = Math.max(2, Math.floor(w / 52));
      const rowH = 18;
      const startY = 48;
      items.forEach((item, i) => {
        const ci = i % cols, row = Math.floor(i / cols);
        const x = x0 + 12 + ci * 50;
        const y = startY + row * rowH;
        if (y > H - 20) return;
        ctx.fillStyle = c.ink; ctx.font = "11px ui-monospace,monospace";
        ctx.textAlign = "left"; ctx.textBaseline = "top";
        ctx.fillText(formatter(item), x, y);
      });
    };
    const half = mid - 8;
    drawList(perms, 8, half, lang === "zh" ? "排列(计顺序)" : "Permutations", c.accent, (p) => p.map((i) => labels[i]).join(""));
    drawList(combs, mid + 8, half, lang === "zh" ? "组合(不计顺序)" : "Combinations", c.primary, (p) => "{" + p.map((i) => labels[i]).join(",") + "}");
  };
  return (
    <div>
      <Canvas draw={draw} height={Math.min(320, 80 + Math.ceil(permCount(n, kk) / 2) * 18)} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "元素个数 n" : "items n"} value={n} min={3} max={5} step={1} onChange={(v) => { setN(v); if (k > v) setK(v); }} />
        <Slider label={lang === "zh" ? "选取个数 k" : "pick k"} value={kk} min={1} max={n} step={1} onChange={setK} />
      </div>
      <Readout>P({n},{kk}) = <b>{perms.length}</b> &nbsp;·&nbsp; C({n},{kk}) = <b>{combs.length}</b> &nbsp;·&nbsp; {perms.length} ÷ {kk}! = {combs.length}</Readout>
      <div className="viz-caption">{lang === "zh" ? "同一道题:AB 与 BA 在排列中是两种方案,在组合中算同一组。组合数恒为排列数除以 k!。" : "Same problem: AB and BA are two permutations but one combination. Always C(n,k) = P(n,k) / k!."}</div>
    </div>
  );
}

/* ============ Pascal's triangle ============ */
function PascalTriangleDemo() {
  const lang = useLang();
  const [rows, setRows] = React.useState(6);
  const [selN, setSelN] = React.useState(4);
  const [selK, setSelK] = React.useState(2);
  const sn = Math.min(selN, rows);
  const sk = Math.min(selK, sn);
  const draw = (ctx, W, H) => {
    const c = COLORS();
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, W, H);
    const maxRow = rows;
    const cellW = Math.min(44, (W - 24) / (maxRow + 2));
    const cellH = 26;
    const topY = 20;
    for (let n = 0; n <= maxRow; n++) {
      const rowLen = n + 1;
      const rowW = rowLen * cellW;
      const x0 = (W - rowW) / 2;
      for (let k = 0; k <= n; k++) {
        const x = x0 + k * cellW;
        const y = topY + n * cellH;
        const val = combCount(n, k);
        const hl = n === sn && k === sk;
        const parent = n === sn && (k === sk || k === sk + 1);
        ctx.fillStyle = hl ? c.accent : parent ? c.surface : c.bg;
        ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);
        ctx.strokeStyle = hl ? c.accent : parent ? c.primary : c.hair;
        ctx.lineWidth = hl ? 2 : 1;
        ctx.strokeRect(x + 2, y + 2, cellW - 4, cellH - 4);
        ctx.fillStyle = hl ? c.bg : c.ink;
        ctx.font = (hl ? "bold " : "") + "11px ui-monospace,monospace";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(String(val), x + cellW / 2, y + cellH / 2);
      }
    }
  };
  const left = sn > 0 && sk > 0 ? combCount(sn - 1, sk - 1) : 0;
  const right = sn > 0 ? combCount(sn - 1, sk) : 0;
  return (
    <div>
      <Canvas draw={draw} height={20 + (rows + 1) * 26 + 16} />
      <div className="viz-controls">
        <Slider label={lang === "zh" ? "行数" : "rows"} value={rows} min={4} max={8} step={1} onChange={(v) => { setRows(v); if (selN > v) setSelN(v); }} />
        <Slider label="n" value={sn} min={0} max={rows} step={1} onChange={(v) => { setSelN(v); if (selK > v) setSelK(v); }} />
        <Slider label="k" value={sk} min={0} max={sn} step={1} onChange={setSelK} />
      </div>
      <Readout>
        C({sn},{sk}) = <b>{combCount(sn, sk)}</b>
        {sn > 0 && <> &nbsp;·&nbsp; C({sn - 1},{sk - 1}) + C({sn - 1},{sk}) = {left} + {right} = <b>{left + right}</b></>}
      </Readout>
      <div className="viz-caption">{lang === "zh" ? "杨辉三角第 n 行第 k 个数就是 C(n,k)。每个数等于肩上两数之和,对应「固定某元素选或不选」的帕斯卡分类。" : "Row n, entry k of Pascal's triangle is C(n,k). Each entry is the sum of the two above — the choose / skip split."}</div>
    </div>
  );
}

const VIZ = {
  permSlots: () => <PermSlotsDemo />,
  combSelect: () => <CombSelectDemo />,
  permVsComb: () => <PermVsCombDemo />,
  pascalTriangle: () => <PascalTriangleDemo />,
  proportion: () => <ProportionDemo />,
  proportionFamily: () => <ProportionFamilyDemo />,
  proportionRealWorld: () => <ProportionRealWorldDemo />,
  proportionRatio: () => <ProportionRatioDemo />,
  proportionThroughPoint: () => <ProportionThroughPointDemo />,
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

const VIZ_TITLE = {
  permSlots: { zh: "有序选 k 个:排列 P(n,k)", en: "Ordered picks: P(n,k)" },
  combSelect: { zh: "无序选 k 个:组合 C(n,k)", en: "Unordered picks: C(n,k)" },
  permVsComb: { zh: "排列 vs 组合", en: "Permutations vs combinations" },
  pascalTriangle: { zh: "杨辉三角与帕斯卡公式", en: "Pascal's triangle" },
  proportion: { zh: "正比例函数 y = kx", en: "Direct proportion y = kx" },
  proportionFamily: { zh: "一族正比例函数 y = kx", en: "A family of lines y = kx" },
  proportionRealWorld: { zh: "实际情境:路程 s = vt", en: "Real world: distance s = vt" },
  proportionRatio: { zh: "比值 y/x = k 恒定", en: "Constant ratio y/x = k" },
  proportionThroughPoint: { zh: "由一点确定 y = kx", en: "One point fixes y = kx" },
  linear: { zh: "一次函数 y = kx + b", en: "Linear function y = kx + b" },
};

function Viz({ name }) {
  const lang = useLang();
  const names = (Array.isArray(name) ? name : [name]).filter((n) => VIZ[n]);
  if (!names.length) return null;
  const many = names.length > 1;
  return (
    <>
      {names.map((n, i) => (
        <div className="viz" key={n}>
          {many && (
            <div className="viz-title">
              <span className="viz-title-idx">{String(i + 1).padStart(2, "0")}</span>
              {VIZ_TITLE[n] ? pick(lang, VIZ_TITLE[n]) : n}
            </div>
          )}
          {VIZ[n]()}
        </div>
      ))}
    </>
  );
}

window.Viz = Viz;
