# 数学自学 · self-taught math

从**高数、代数到大学数学**的中英双语自学网站。把大学数学的主干——微积分、线性代数、概率统计、离散数学、常微分方程、复变函数、数理统计、最优化——拆成 **8 大模块、32 个章节**;每章含学习目标、知识提纲,以及**登录后解锁**的核心讲义、典型例题与练习。公式用 **KaTeX** 渲染,全站**一键中英切换**,学习进度由 **Firebase** 云端同步。

> 姊妹项目 [AI_BOOK](../AI_BOOK) 的同款技术栈(无构建 React SPA + Firebase 登录 + 加密配置),本项目在其基础上增加了**真正的中英文切换(i18n)**、**KaTeX 数学公式**与**章节内的登录门**。

---

## 本地运行

无需构建、无需安装依赖。任意静态服务器即可(因为章节正文用 `fetch` 加载 `content/*.md`,**不能直接双击 `index.html`**,要走 http):

```bash
# 方式一:Python(已验证)
python -m http.server 5620 --directory D:/webcode/MATH_BOOK
# 浏览器打开 http://localhost:5620

# 方式二:Node
npx serve D:/webcode/MATH_BOOK
```

Claude Code 用户:`.claude/launch.json` 里已配 `math-book`(端口 5620),直接 `preview_start` 即可。

---

## 文件结构

```
index.html              入口:加载 CDN(React/Babel/marked/KaTeX/Firebase)与下列脚本
styles.css              设计系统(米色纸感 + 大号衬线;含 i18n/KaTeX/锁区样式)
i18n.jsx                中英文字典 UI{} + LangContext + useLang/useT/pick   ← 切换语言的核心
data.jsx                课程数据:MODULES(4) + CHAPTERS(16),纯双语元数据
auth.jsx                Firebase 邮箱登录 + 登录弹窗 + 章节内 LockSection(登录门)
roadmap.jsx             首页地铁线式路线图(双语站点)
pages.jsx              Home / Module / Chapter / About;含 Prose(marked+KaTeX)与按需 fetch
app.jsx                 路由 · 主题 · 语言 · 进度 · 顶栏(含 中/EN 切换按钮)
content/<id>.<lang>.md  每章「重要内容」(核心讲义+例题+练习),登录后才加载
firebase-*.js / .json   配置解密与初始化(见下)
tools/encrypt-config.mjs 把明文 Firebase 配置加密为可提交的密文
```

## 中英文切换(i18n)

- 界面文案集中在 `i18n.jsx` 的 `UI` 对象,形如 `key: { zh, en }`。新增文案就在这里加一条,组件里用 `t("key")`。
- 内容数据(`data.jsx`)里凡是双语的字段都写成 `{ zh, en }`,组件里用 `pick(lang, obj)` 取当前语言。
- 章节正文用两份 markdown:`content/<id>.zh.md` 与 `content/<id>.en.md`。
- 语言选择存在 `localStorage.math_book_lang`,默认中文;点顶栏 **中 / EN** 按钮切换。

## 写章节内容

每章的「重要内容」放在 `content/<id>.<lang>.md`,结构(中文版)如下:

```markdown
## 核心讲义
### 子主题…
正文,**加粗**术语,行内公式 $a^2+b^2=c^2$,独立公式:
$$\int_0^1 x^2\,dx = \frac13$$

## 典型例题
**例 1.** …
> **解.** …

## 练习与自测
1. …
**参考答案.** 1) …
```

英文版 `content/<id>.en.md` 用 `## Core Notes / ## Worked Examples / ## Exercises`。

**KaTeX 注意**:数学分隔符内**不要写中文**(KaTeX 不渲染 CJK,会报错);自然语言一律放在 `$...$` 之外。`.md` 文件里 LaTeX 用**单反斜杠**(`\frac`、`\lim`),不要双重转义。

## 登录与进度(Firebase)

- 章节的导读 / 目标 / 提纲对游客开放;**核心讲义、例题、练习需登录**(`auth.jsx` 的 `LockSection`)。登录门只依赖鉴权,**与 RTDB 规则无关,开箱即用**。
- 进度按账号存在 RTDB `math_progress/<uid>`,登录后跨设备同步;游客存 localStorage。
- **当前复用了 AI_BOOK 的 Firebase 项目 `aibook-5e82b`**,所以登录注册开箱即用(Email/Password 已启用)。两站共用账号体系,进度路径已隔离(`math_progress/` vs `progress/`)。

> ⚠️ **进度同步需要一条 RTDB 规则(你来在控制台加)。** 实测该项目对 `math_progress/` 路径返回 `PERMISSION_DENIED`(测试模式规则可能已过期,或现有规则只放行了 AI_BOOK 的 `progress/`)。登录、解锁、看内容都正常,但**进度写云端会被拒**(代码已优雅降级:写失败回滚、读失败仅 console 报错,不影响使用)。
> 在 Firebase 控制台 → Realtime Database → 规则,贴入下面这份(同时放行两站、按用户隔离):
> ```json
> {
>   "rules": {
>     "progress":      { "$uid": { ".read": "auth != null && auth.uid === $uid", ".write": "auth != null && auth.uid === $uid" } },
>     "math_progress": { "$uid": { ".read": "auth != null && auth.uid === $uid", ".write": "auth != null && auth.uid === $uid" } }
>   }
> }
> ```
- 换成独立项目:编辑 `firebase-config.local.json` 填入新项目配置 → `node tools/encrypt-config.mjs` 重新生成 `firebase-config.enc.js` → 在 Firebase 控制台启用 Email/Password、加授权域名、配 RTDB 规则。
- 线上部署后若没有本地口令文件,在控制台执行 `mathBookUnlock("口令")` 解锁一次即可(口令见 `firebase-key.local.js`,**gitignored**)。

> 安全说明:Firebase 的 web 配置本就是「标识符」而非真密钥,加密只是不让它进公开源码;真正的防护靠**授权域名 + 安全规则 + App Check**。

## 部署

纯静态站,可托管到 GitHub Pages / Netlify / Vercel 等。把整个目录推上去即可;`content/*.md` 与各脚本都是相对路径。

## 许可

MIT。内容供自学使用。
