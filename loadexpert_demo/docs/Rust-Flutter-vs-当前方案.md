# Rust + Flutter 装柜程序 vs 当前实现 — 调研对比

> 调研对象：本项目 `loadexpert_demo`（Python 装柜引擎 + FastAPI Web + Three.js 3D）  
> 对比方案：Rust 承担核心计算/服务，Flutter 承担跨端 UI  
> 日期：2026-07

---

## 1. 当前实现概览

| 层级 | 技术 | 规模（约） | 职责 |
|------|------|-----------|------|
| 装柜引擎 | Python `packer.py` | ~500 行 | 极点法 3D 装箱、朝向/承重/门侧策略、多柜分配 |
| 可视化（CLI） | Python + Matplotlib | `visualize.py` | 导出 PNG |
| Web 后端 | FastAPI + Uvicorn | `app.py` ~230 行 | REST API、Excel 导入、PDF/Excel 报表 |
| Web 前端 | 原生 HTML/CSS/JS + Three.js | `app.js` ~900 行 | 3D 交互、装柜动画、步骤树、i18n、单位切换 |
| 报表 | reportlab + openpyxl | `reports.py` ~350 行 | LoadExpert 风格 HTML/PDF/Excel |

**架构特点**

- 单体仓库、依赖少，改算法即改一处，Web 通过 `sys.path` 直接复用 `packer.py`
- 浏览器即客户端，无需安装；局域网访问靠 `0.0.0.0` + 防火墙放行
- 3D 完全依赖 Three.js（成熟、文档多）
- Python 解释执行，大批量/高并发时装柜会成为 CPU 瓶颈

---

## 2. Rust + Flutter 方案概览

典型拆分方式：

```
┌─────────────────────────────────────────────────────────┐
│  Flutter（Desktop / Web / Mobile）                       │
│  · 货物/柜型表单、装柜方案树、步骤浏览、报表入口          │
│  · 3D：flutter_gl / 嵌入 WebView+Three / 自研 Canvas   │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP / gRPC / FFI（桌面可本地调用）
┌───────────────────────▼─────────────────────────────────┐
│  Rust                                                    │
│  · packing-core：装柜引擎（从 packer.py 移植或重写）     │
│  · packing-api：Axum/Actix 提供 API（可选）              │
│  · 可选：编译为 WASM 供 Flutter Web 在浏览器内算         │
└─────────────────────────────────────────────────────────┘
```

| 层级 | 常见选型 | 职责 |
|------|----------|------|
| 引擎 | Rust crate（`nalgebra` 可选） | 装箱启发式、约束检查、序列重排 |
| 服务 | Axum + Tokio | 与现 FastAPI 对等的 `/pack`、`/export` |
| 客户端 | Flutter 3.x | 一套代码覆盖 Windows / macOS / Android / iOS / Web |
| 3D | 见下文「3D 是最大变量」 | 集装箱与货物 mesh、步骤高亮、动画 |
| 报表 | `printpdf` / `rust_xlsxwriter` 或继续服务端生成 | PDF/Excel |

---

## 3. Rust + Flutter 的优势

### 3.1 性能与可扩展性（Rust）

| 点 | 说明 |
|----|------|
| **装柜吞吐** | 三维装箱是 CPU 密集型；Rust 本地代码通常比 Python 快一个数量级以上，件数上千、多方案比价时差距明显 |
| **内存与确定性** | 无 GIL，适合多柜并行、遗传算法/多策略枚举等扩展 |
| **交付形态** | 引擎可编译为 **动态库 + FFI** 嵌进 Flutter 桌面端，离线装柜无需起服务 |
| **WASM** | 同一套 `packing-core` 可打 `wasm32`，Flutter Web 端在浏览器内算，减轻服务器压力 |
| **类型安全** | 尺寸/重量/朝向用强类型建模，重构大引擎时比 Python dataclass 更不易埋运行时错误 |

### 3.2 产品与体验（Flutter）

| 点 | 说明 |
|----|------|
| **真正跨端** | 一套 UI 做仓库 Win 平板、司机手机、办公室桌面；当前 Three.js 方案主要是浏览器 |
| **原生感** | 窗口、文件选择、打印、离线缓存、系统分享等比纯网页顺手 |
| **状态与导航** | 装柜方案树、步骤面板、货物编辑弹窗用 Flutter 组件化更清晰，利于做复杂 ERP 嵌套 |
| **发布** | 可上架商店或企业内部分发安装包，不依赖用户记 IP:8010 |

### 3.3 工程与商业（中长期）

- **核心资产保护**：装柜算法编译为二进制，比 Python 源码更难被直接拷贝
- **与工业软件对齐**：物流/制造侧 Rust 核心 + 多端 UI 是常见演进路径
- **测试**：引擎层 Rust 单元测试 + 属性测试（`proptest`）适合约束型几何问题

---

## 4. Rust + Flutter 的劣势与风险

### 4.1 开发与人力成本

| 点 | 说明 |
|----|------|
| **重写引擎** | `packer.py` 虽不大，但含门侧策略、易碎品顺序、支撑率等业务细节，Rust 移植需完整回归用例，**不是简单翻译** |
| **双语言栈** | 团队需同时维护 Rust + Dart；当前一人 Python 即可改算法+API+前端 |
| **迭代速度** | Demo 阶段 Python「改完即刷新」；Rust 编译 + Flutter 热重载仍慢于改一段 `packer.py` |

### 4.2 3D 是最大变量（Flutter 短板）

当前 Three.js 已实现：orbit 控制、逐件动画、按步骤着色、点击高亮、门侧标记。

Flutter 侧可选路径与代价：

| 方案 | 优点 | 缺点 |
|------|------|------|
| **WebView 嵌现有 Three.js** | 复用现成 `app.js`，迁移最快 | 非纯 Flutter，Web/桌面表现不一，性能一般 |
| **flutter_cube / 简单 OpenGL** | 依赖少 | 复杂交互、大量 mesh、边线高亮都要自己写 |
| **Unity 嵌入 Flutter** | 3D 能力强 | 技术栈再+1，包体大 |
| **服务端只出坐标，Flutter 2.5D** | 实现简单 | 难达到现 Demo 的旋转查看体验 |

**结论**：若 3D 体验要对标现 Demo，Flutter 单独一项的工作量可能 ≥ 重写 Rust 引擎。

### 4.3 报表与办公集成

| 现实现 | Rust/Flutter |
|--------|----------------|
| `reports.py` + reportlab/openpyxl，中文与多表格式已跑通 | Rust PDF/Excel 库排版能力需重新踩坑；或 Flutter 端用 `syncfusion` 等商业组件（授权成本） |
| Excel **导入**货物 | Dart `excel` 包可读 xlsx，复杂模板需重做 |

### 4.4 部署与运维

| 点 | 说明 |
|----|------|
| **Web 模式** | Flutter Web 包体积通常数 MB，首屏重于现 HTML+CDN Three.js |
| **局域网** | 仍要解决 API 监听与防火墙；Flutter 桌面可本地 FFI 绕过网络，但更新引擎要发新版应用 |
| **Python 生态** | 数据分析、快速试算法、Jupyter 试错；Rust 不适合频繁改启发式参数 |

---

## 5. 分维度对照表

| 维度 | 当前 Python + Web | Rust + Flutter |
|------|-------------------|----------------|
| **开发效率（Demo）** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **装柜性能** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **3D 交互成熟度** | ⭐⭐⭐⭐⭐（Three.js） | ⭐⭐~⭐⭐⭐（视选型） |
| **跨端（桌面/移动）** | ⭐⭐（浏览器） | ⭐⭐⭐⭐⭐ |
| **离线装柜** | ⭐（需本地起服务） | ⭐⭐⭐⭐（FFI/内置引擎） |
| **算法保密** | ⭐⭐ | ⭐⭐⭐⭐ |
| **报表/Excel** | ⭐⭐⭐⭐ | ⭐⭐⭐（需重做） |
| **团队技能门槛** | 低 | 中高 |
| **与 ERP 集成** | HTTP API 即可 | HTTP 或 gRPC + 多端壳 |
| **包体/依赖** | 服务端 ~几十 MB venv | 安装包 20~80 MB 级 |

---

## 6. 推荐演进路径（不必二选一）

### 路径 A：维持现状（适合继续打磨业务）

- 装柜规则、步骤 UI、报表格式仍频繁变动
- 用户主要是办公室浏览器 + 局域网
- 单柜几十~几百件，性能足够

### 路径 B：仅 Rust 化引擎（性价比最高）

```
Flutter / 现有 Web ──HTTP──► Axum API ──► packing-core (Rust)
                              │
                              └── 仍可用 Python 做报表过渡
```

- Python `packer.py` 逻辑迁到 Rust，**API 契约不变**，前端可暂不改
- 验证性能与正确性后再考虑 Flutter

### 路径 C：Flutter 壳 + WebView 3D（最快跨端）

- 表单、步骤树、报表用 Flutter
- 3D 区域嵌入现 Three.js 页面
- 适合要「安装版」但不想重写 3D 的阶段

### 路径 D：全量 Rust + Flutter（适合产品化）

- 引擎、API、UI、报表全部重写
- 适合装柜成为独立收费产品、需移动端/离线、并发装柜多方案比价

---

## 7. 针对本项目的具体判断

**当前 Demo 已具备**

- 门侧最后码放、易碎品装序、装柜批次步骤树、LoadExpert 风格报表、集装箱预设、货物微调（朝向/型变/承托）
- 代码量整体 < 2500 行，**业务逻辑仍在快速迭代期**

**若上 Rust + Flutter，优先收益在**

1. 多策略并行、大批量柜（性能）
2. 仓库平板 / 手机端现场查方案（Flutter 多端）
3. 算法作为商业核心不愿开源（Rust 二进制）

**若上 Rust + Flutter，主要代价在**

1. **3D 重做或 WebView 折中**（最大风险）
2. **报表与 Excel 导入导出重做**
3. **双人月级**起步的移植与联调（引擎+最小 Flutter 壳），全功能对标现 Web 往往 **3~6 人月**（视 3D 方案而定）

---

## 8. 技术选型速查（供落地时参考）

### Rust 装柜引擎

- 语言：Rust 2021 edition
- HTTP：`axum` + `serde_json`（与现 `PackRequest` JSON 对齐）
- 并行：`rayon` 多柜/多策略
- 测试：固定 `demo.py` 用例做 golden 对比（利用率、坐标、seq）

### Flutter 客户端

- 状态：`riverpod` / `bloc`
- 桌面：`window_manager`、`file_picker`
- 3D（按投入排序）：WebView 复用 > `flutter_cube` 简化版 > 原生 OpenGL/Vulkan 插件
- 国际化：现 `I18N` 键值可迁到 ARB

### 不建议

- 用 Flutter **单独**重写复杂 Three.js 场景而不做技术验证（易低估工期）
- 为了性能先把 **整个** Python 栈换掉，而瓶颈其实在算法而非语言

---

## 9. 总结一句话

| | |
|--|--|
| **现在** | Python + Web 极适合 **验证装柜规则、报表和交互**，成本低、3D 强、改得快。 |
| **Rust + Flutter** | 适合 **产品化、多端交付、高性能与算法保护**；但 3D 与报表迁移是主要成本，不宜在业务规则仍大变时全量切换。 |
| **务实建议** | 业务稳定后 **先 Rust 引擎 + 保留 Web 前端**；需要安装版再加 **Flutter 壳 + WebView 3D**；全原生 3D 作为二期。 |

---

## 附录：现项目文件与 Rust/Flutter 映射

| 现文件 | Rust 侧 | Flutter 侧 |
|--------|---------|------------|
| `packer.py` | `packing-core` lib | 通过 API/FFI 调用 |
| `web/app.py` | `packing-api` (Axum) | `Dio` HTTP 客户端 |
| `web/static/app.js` | — | WebView 或 3D 模块重写 |
| `web/reports.py` | `packing-report` crate 或服务端保留 | PDF 预览 / 分享 |
| `web/static/index.html` | — | Flutter Widget 树 |
