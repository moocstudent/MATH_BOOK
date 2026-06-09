/* =========================================================
   i18n — Chinese / English switching
   ---------------------------------------------------------
   UI            : dictionary of interface strings { key: {zh, en} }
   LangContext   : current language ("zh" | "en")
   useLangState(): App-level state hook (persists to localStorage)
   useLang()     : read current language inside any component
   useT()        : returns t(key) -> localized UI string
   pick(lang,obj): localize a content object { zh, en } (or a plain string)
   ========================================================= */

const LANG_KEY = "math_book_lang";

const LangContext = React.createContext("zh");

function useLangState() {
  const [lang, setLangRaw] = React.useState(() => {
    try { return localStorage.getItem(LANG_KEY) || "zh"; } catch (e) { return "zh"; }
  });
  React.useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);
  const setLang = (l) => {
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
    setLangRaw(l);
  };
  const toggle = () => setLang(lang === "zh" ? "en" : "zh");
  return [lang, setLang, toggle];
}

function useLang() { return React.useContext(LangContext); }

function useT() {
  const lang = React.useContext(LangContext);
  return (key) => {
    const e = UI[key];
    if (e === undefined) return key;
    if (typeof e === "object") return e[lang] !== undefined ? e[lang] : e.zh;
    return e;
  };
}

// Localize a content object {zh, en}; passes plain strings through.
function pick(lang, obj) {
  if (obj === null || obj === undefined) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] !== undefined ? obj[lang] : (obj.zh !== undefined ? obj.zh : (obj.en || ""));
}

const UI = {
  /* ---- nav ---- */
  brand_word:      { zh: "自学数学", en: "self-taught" },
  nav_home:        { zh: "路线图", en: "Roadmap" },
  nav_about:       { zh: "关于", en: "About" },
  nav_login:       { zh: "登录 / 注册", en: "Log in / Sign up" },
  nav_logout:      { zh: "登出", en: "Sign out" },
  nav_about_site:  { zh: "关于本站", en: "About this site" },
  theme_title:     { zh: "切换明暗", en: "Toggle theme" },
  lang_title:      { zh: "Switch to English", en: "切换到中文" },
  chip_unit:       { zh: "章", en: "ch." },

  /* ---- home hero ---- */
  hero_badge:      { zh: "课程体系 v1.0 · 2026", en: "CURRICULUM v1.0 · 2026" },
  guest_mode:      { zh: "游客模式", en: "GUEST MODE" },
  welcome:         { zh: "欢迎", en: "WELCOME" },
  hero_l1:         { zh: "从高数、代数,", en: "From calculus & algebra," },
  hero_l2a:        { zh: "系统学完", en: "learn" },
  hero_l2b:        { zh: "大学数学", en: "all of college math." },
  hero_en_tail:    { zh: "college mathematics, on your own.", en: "" },
  hero_sub: {
    zh: "把大学数学的主干——微积分、线性代数、概率统计、离散数学——拆成 {M} 大模块、{C} 个章节。每章配学习目标、知识提纲、核心讲义、典型例题与练习;重要内容登录后解锁,进度云端同步。",
    en: "The backbone of university mathematics — calculus, linear algebra, probability & statistics, discrete math — broken into {M} modules and {C} chapters. Each chapter ships with objectives, an outline, core lecture notes, worked examples and exercises. The important content unlocks after a free login; progress syncs to the cloud.",
  },
  cta_start:       { zh: "从第一章开始 →", en: "Start chapter one →" },
  cta_register:    { zh: "注册解锁内容 →", en: "Sign up to unlock →" },
  cta_howto:       { zh: "如何使用", en: "How to use" },
  cta_roadmap:     { zh: "看完整路线图 ↓", en: "See the full roadmap ↓" },
  meta_modules:    { zh: "模块", en: "Modules" },
  meta_chapters:   { zh: "章节", en: "Chapters" },
  meta_examples:   { zh: "例题", en: "Examples" },
  meta_hours:      { zh: "学时", en: "Hours" },
  your_progress:   { zh: "你的进度", en: "Your progress" },
  of_chapters:     { zh: "章已完成", en: "chapters done" },
  synced:          { zh: "Firebase · 跨设备同步", en: "Firebase · synced across devices" },

  /* ---- sections ---- */
  sec01:           { zh: "路线图", en: "Roadmap" },
  sec01_aside:     { zh: "从左到右 · 从上到下", en: "left → right · top → bottom" },
  sec02:           { zh: "四大模块", en: "Four modules" },
  sec02_aside:     { zh: "点击进入", en: "click to enter" },
  sec03:           { zh: "怎么用这份地图", en: "How to use this map" },
  sec03_aside:     { zh: "三条原则", en: "three rules" },
  modules_count:   { zh: "门课", en: "chapters" },
  done_word:       { zh: "完成", en: "done" },
  enter_word:      { zh: "→ 进入", en: "→ enter" },

  /* roadmap legend */
  rm_notstarted:   { zh: "未开始", en: "not started" },
  rm_done:         { zh: "已完成", en: "done" },
  rm_track:        { zh: "横线 = 模块主线", en: "line = module track" },
  rm_axis_1:       { zh: "I · 基础", en: "I · basics" },
  rm_axis_2:       { zh: "II · 核心", en: "II · core" },
  rm_axis_3:       { zh: "III · 进阶", en: "III · advanced" },
  rm_axis_4:       { zh: "IV · 拓展", en: "IV · beyond" },

  /* philosophy cards */
  phil1_zh:        { zh: "顺序是建议,不是法律。", en: "Order is a suggestion." },
  phil1_b:         { zh: "M1→M4 是推荐的依赖顺序,但你可以从最需要的地方切入,再回头补前置。先有动机,再讲严谨。", en: "M1→M4 is the suggested dependency order, but you can dive in where you need it most and backfill prerequisites later. Motivation first, rigor second." },
  phil2_zh:        { zh: "先看直觉,再补证明。", en: "Intuition first, then proofs." },
  phil2_b:         { zh: "每章先用一段话讲清「这是什么、为什么重要」,再进入定义、定理与推导。看得懂,才记得住。", en: "Every chapter opens with what it is and why it matters, then moves to definitions, theorems and derivations. You remember what you understand." },
  phil3_zh:        { zh: "动手算,而不是只看。", en: "Work it, don't just watch." },
  phil3_b:         { zh: "每章配典型例题与练习。看十道例题,不如亲手算一道;算对一道,不如讲明白为什么。", en: "Each chapter has worked examples and exercises. Solving one beats reading ten; explaining why beats solving one." },

  /* ---- module page ---- */
  bc_home:         { zh: "首页", en: "Home" },
  bc_modules:      { zh: "模块", en: "Modules" },
  module_word:     { zh: "模块", en: "Module" },
  of_word:         { zh: "/", en: "of" },
  m_chapters:      { zh: "章节 · CHAPTERS", en: "CHAPTERS" },
  m_meta_chapters: { zh: "章节", en: "CHAPTERS" },
  m_meta_hours:    { zh: "学时", en: "HOURS" },
  m_meta_level:    { zh: "难度", en: "LEVEL" },
  m_meta_progress: { zh: "进度", en: "PROGRESS" },
  chapter_list:    { zh: "章节清单", en: "Chapter list" },
  click_enter:     { zh: "点击进入 · 勾选标记完成", en: "click to enter · check to mark done" },
  hours_unit:      { zh: "学时", en: "hrs" },
  no_prereq:       { zh: "无先修", en: "no prereq" },
  prereq_n:        { zh: "先修 {n}", en: "{n} prereq" },
  mark_login_hint: { zh: "登录后可标记进度", en: "log in to track progress" },
  mark_done_title: { zh: "标记完成", en: "mark as done" },
  back_to:         { zh: "回到", en: "Back to" },

  /* ---- chapter page ---- */
  toc_contents:    { zh: "目录", en: "Contents" },
  toc_siblings:    { zh: "同模块", en: "In this module" },
  ch_sec_intro:    { zh: "导读 / Intro", en: "Intro" },
  ch_sec_obj:      { zh: "学习目标 / Objectives", en: "Objectives" },
  ch_sec_outline:  { zh: "知识提纲 / Outline", en: "Outline" },
  ch_sec_viz:      { zh: "交互演示 / Interactive", en: "Interactive demo" },
  viz_hint:        { zh: "拖动滑块或点播放,直观感受这一章的核心概念(免费开放)。", en: "Drag the sliders or hit play to feel this chapter's core idea (free)." },
  ch_sec_notes:    { zh: "核心讲义 / Core notes", en: "Core notes" },
  ch_sec_examples: { zh: "典型例题 / Examples", en: "Worked examples" },
  ch_sec_exercises:{ zh: "练习与自测 / Exercises", en: "Exercises" },
  toc_intro:       { zh: "00 · 导读", en: "00 · Intro" },
  toc_obj:         { zh: "01 · 学习目标", en: "01 · Objectives" },
  toc_outline:     { zh: "02 · 知识提纲", en: "02 · Outline" },
  toc_viz:         { zh: "✦ · 交互演示", en: "✦ · Interactive" },
  toc_notes:       { zh: "03 · 核心讲义", en: "03 · Core notes" },
  toc_examples:    { zh: "04 · 典型例题", en: "04 · Examples" },
  toc_exercises:   { zh: "05 · 练习自测", en: "05 · Exercises" },
  important_badge: { zh: "重要内容 · 需登录", en: "KEY CONTENT · LOGIN REQUIRED" },
  loading_notes:   { zh: "正在加载讲义…", en: "Loading notes…" },
  notes_missing:   { zh: "本章讲义正在编写中。", en: "Notes for this chapter are in progress." },
  example_word:    { zh: "例", en: "Example" },
  solution_word:   { zh: "解", en: "Solution" },
  show_solution:   { zh: "显示解答", en: "Show solution" },
  hide_solution:   { zh: "收起解答", en: "Hide solution" },
  level_word:      { zh: "难度", en: "Level" },
  est_word:        { zh: "建议学时", en: "Est. time" },
  ch_prev:         { zh: "上一章", en: "Prev" },
  ch_next:         { zh: "下一章", en: "Next" },
  mark_done_btn:   { zh: "标记完成", en: "Mark as done" },
  marked_done:     { zh: "已完成", en: "Completed" },

  /* ---- bookmarks ---- */
  bm_section:      { zh: "书签", en: "Bookmark" },
  bm_add:          { zh: "📑 在此处加书签", en: "📑 Bookmark this spot" },
  bm_jump:         { zh: "↧ 跳到书签", en: "↧ Jump to spot" },
  bm_update:       { zh: "更新到当前位置", en: "Update to current spot" },
  bm_remove:       { zh: "移除", en: "Remove" },
  bm_note_ph:      { zh: "记几个字(可选,如:看到换元法)", en: "A few words (optional)" },
  bm_at:           { zh: "位置", en: "at" },
  bm_hint_guest:   { zh: "提示:登录后书签可云端跨设备同步。", en: "Tip: log in to sync bookmarks across devices." },
  home_resume:     { zh: "继续阅读", en: "Resume reading" },
  home_resume_aside: { zh: "你的书签 · 点击跳回", en: "your bookmarks · click to jump back" },
  bm_continue:     { zh: "继续 →", en: "Resume →" },

  /* difficulty labels */
  diff_1:          { zh: "入门", en: "Intro" },
  diff_2:          { zh: "基础", en: "Core" },
  diff_3:          { zh: "进阶", en: "Advanced" },

  /* ---- login gate (in-chapter) ---- */
  gate_eyebrow:    { zh: "锁定 · 需要登录", en: "LOCKED · LOGIN REQUIRED" },
  gate_title:      { zh: "重要内容对登录用户开放。", en: "The important content is for logged-in learners." },
  gate_sub:        { zh: "You're seeing the overview. The notes, examples and exercises are behind a free login.", en: "讲义、例题与练习需要免费登录后查看。" },
  gate_body:       { zh: "游客可以浏览每章的导读、学习目标与知识提纲。核心讲义、典型例题与练习需要登录——账号与进度由 Firebase 托管,仅用于按账号保存你的学习进度。", en: "Guests can browse each chapter's intro, objectives and outline. The core notes, worked examples and exercises require a login — accounts and progress are handled by Firebase, used only to save your learning progress per account." },
  gate_login:      { zh: "已注册 · 登录", en: "Have an account · Log in" },
  gate_register:   { zh: "新来的 · 注册", en: "New here · Sign up" },
  gate_m_notes:    { zh: "讲义", en: "NOTES" },
  gate_m_examples: { zh: "例题", en: "EXAMPLES" },
  gate_m_exercises:{ zh: "练习", en: "EXERCISES" },
  gate_m_hours:    { zh: "学时", en: "HOURS" },

  /* ---- auth modal ---- */
  auth_welcome:    { zh: "WELCOME BACK", en: "WELCOME BACK" },
  auth_join:       { zh: "JOIN IN", en: "JOIN IN" },
  auth_login_t1:   { zh: "登入。", en: "Welcome" },
  auth_login_t2:   { zh: "resume.", en: "back." },
  auth_reg_t1:     { zh: "注册。", en: "Begin" },
  auth_reg_t2:     { zh: "begin.", en: "here." },
  auth_blurb_course:{ zh: "你正要打开《{name}》的重要内容——核心讲义、典型例题与练习。这部分对登录用户开放。", en: "You're about to open the key content of “{name}” — core notes, worked examples and exercises. This part is for logged-in learners." },
  auth_blurb:      { zh: "登录后可解锁全部章节的讲义、例题与练习。账号与学习进度由 Firebase 托管,登录后跨设备同步。", en: "Log in to unlock the notes, examples and exercises of every chapter. Accounts and progress are handled by Firebase and sync across devices." },
  auth_b1:         { zh: "解锁全部章节的重要内容", en: "Unlock the key content of every chapter" },
  auth_b2:         { zh: "进度云端同步 · 跨设备", en: "Progress synced across devices" },
  auth_b3:         { zh: "账号由 Firebase 安全托管", en: "Accounts secured by Firebase" },
  auth_tab_login:  { zh: "登录 / login", en: "Log in" },
  auth_tab_reg:    { zh: "注册 / register", en: "Sign up" },
  auth_name:       { zh: "显示名 · Name", en: "Display name" },
  auth_name_ph:    { zh: "例如:数学爱好者", en: "e.g. Math learner" },
  auth_email:      { zh: "邮箱 · Email", en: "Email" },
  auth_pass:       { zh: "密码 · Password", en: "Password" },
  auth_pass_hint:  { zh: "(≥ 6 位)", en: "(≥ 6 chars)" },
  auth_submit_login:{ zh: "登录 →", en: "Log in →" },
  auth_submit_reg: { zh: "注册并登录 →", en: "Sign up →" },
  auth_busy:       { zh: "请稍候…", en: "Please wait…" },
  auth_note:       { zh: "使用邮箱 + 密码注册。账号与登录由 Firebase 处理,仅用于保存学习进度。", en: "Sign up with email + password. Accounts and login are handled by Firebase, used only to save your learning progress." },
  auth_close:      { zh: "关闭", en: "Close" },

  /* auth errors */
  err_email:       { zh: "邮箱格式不对", en: "Invalid email format" },
  err_pass:        { zh: "密码至少 6 位", en: "Password must be at least 6 characters" },
  err_email_used:  { zh: "该邮箱已注册,请直接登录", en: "Email already registered — please log in" },
  err_notfound:    { zh: "找不到该用户,请先注册", en: "User not found — please sign up first" },
  err_wrongpass:   { zh: "邮箱或密码错误", en: "Wrong email or password" },
  err_toomany:     { zh: "尝试过于频繁,请稍后再试", en: "Too many attempts — try again later" },
  err_network:     { zh: "网络异常,请检查连接", en: "Network error — check your connection" },
  err_notallowed:  { zh: "邮箱登录未启用 — 需在 Firebase 控制台开启 Email/Password", en: "Email login disabled — enable Email/Password in the Firebase console" },
  err_noconfig:    { zh: "认证未配置 — 请检查 Firebase 设置与授权域名", en: "Auth not configured — check Firebase settings and authorized domains" },
  err_need_both:   { zh: "请输入邮箱和密码", en: "Enter both email and password" },
  err_notready:    { zh: "认证服务未就绪,请稍后重试", en: "Auth service not ready — try again shortly" },
  err_locked:      { zh: "认证服务未就绪:配置未解锁", en: "Auth not ready: config is locked" },
  err_generic:     { zh: "操作失败", en: "Something went wrong" },

  /* ---- about ---- */
  about_kicker:    { zh: "关于", en: "ABOUT" },
  about_q:         { zh: "为什么自己学数学?", en: "Why teach yourself math?" },
  about_q_accent:  { zh: "自己学", en: "yourself" },
  about_sub:       { zh: "Because understanding beats memorizing.", en: "因为理解,胜过死记硬背。" },
  about_h1:        { zh: "这是什么", en: "What is this" },
  about_p1:        { zh: "一份面向自学者的大学数学地图。我们把通常分散在好几门课里的内容,重新组织成 {M} 个模块、{C} 个章节,每章配学习目标、知识提纲、核心讲义、典型例题与练习。", en: "A self-study map of university mathematics. Content usually scattered across several courses is reorganized into {M} modules and {C} chapters, each with objectives, an outline, core notes, worked examples and exercises." },
  about_p1b:       { zh: "不卖课、不收钱、不发证书。它只是一份你可以随时打开、关上、再打开的地图。", en: "No courses for sale, no fees, no certificates. Just a map you can open, close and reopen anytime." },
  about_h2:        { zh: "如何使用", en: "How to use it" },
  about_p2:        { zh: "1. 从首页路线图看清各章的位置与依赖。\n2. 选一章感兴趣的,读完导读与提纲。\n3. 登录解锁核心讲义、例题与练习,把它们走完。\n4. 勾选「已完成」,进度按账号云端同步;卡住了就回到先修补一补。", en: "1. Use the roadmap to see where each chapter sits and what it depends on.\n2. Pick a chapter, read the intro and outline.\n3. Log in to unlock the notes, examples and exercises, and work through them.\n4. Check “done”; progress syncs per account. Stuck? Go back to a prerequisite." },
  about_h3:        { zh: "中英双语", en: "Bilingual" },
  about_p3:        { zh: "全站支持中英文一键切换——界面、章节标题、讲义正文与例题都有两种语言版本。数学符号用 KaTeX 渲染,中英一致。点右上角的「EN / 中」即可切换。", en: "The whole site switches between Chinese and English with one click — interface, chapter titles, notes and examples all have both. Formulas are rendered with KaTeX, identical in either language. Use the “EN / 中” button at the top right." },
  about_h4:        { zh: "不承诺什么", en: "What we don't promise" },
  about_p4:        { zh: "不承诺学完就能考满分、不承诺覆盖每一个考点、也不承诺替你思考。它能做的,是把你愿意付出的时间,用在更有效的地方。", en: "We don't promise a perfect score, full exam coverage, or thinking for you. What it can do is help you spend the time you're willing to invest more effectively." },

  footer_tag:      { zh: "自学数学 · self-taught math", en: "self-taught math" },
  footer_sync:     { zh: "云端同步", en: "cloud sync" },
  not_found_ch:    { zh: "未找到章节。", en: "Chapter not found." },
  not_found_m:     { zh: "未找到模块。", en: "Module not found." },
};

// Fill {M}/{C} placeholders lazily where used (helper).
function fmt(str, map) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (map && map[k] !== undefined ? map[k] : "{" + k + "}"));
}

window.UI = UI;
window.LangContext = LangContext;
window.useLangState = useLangState;
window.useLang = useLang;
window.useT = useT;
window.pick = pick;
window.fmt = fmt;
