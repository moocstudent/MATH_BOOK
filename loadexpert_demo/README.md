# 装柜 Demo(3D Container Loading)

一个自包含的三维装箱(装柜)最小可运行示例:构造式启发算法 + Matplotlib 三维可视化。
纯原创实现,无版权限制,可自由使用与二次开发。

## 功能

- 三维装箱(极点法 Extreme Point 启发式),支持 6 种朝向旋转
- 集装箱最大载重约束
- 堆叠稳定性(底面支撑率)与"易碎品不可被压"约束
- 多柜型 / 多柜位自动分配
- 每个集装箱导出三维装柜图 PNG,含利用率报告

## 目录

| 文件 | 说明 |
|------|------|
| `packer.py` | 装柜引擎:`Item` / `Container` / `Packer` 及算法 |
| `visualize.py` | 三维可视化,导出 PNG |
| `demo.py` | 主程序:定义柜型和货物,装柜并出图 |
| `requirements.txt` | 依赖(matplotlib、numpy) |

## 运行

```bash
pip install -r requirements.txt
python demo.py
```

结果图片输出到 `output/` 目录。

## 自定义

- 改柜型:编辑 `demo.py` 里的 `CONTAINER_SPECS` 与 `build_containers(...)`
- 改货物:编辑 `demo.py` 里的 `build_cargo(...)` 的 `catalog`(名称/尺寸/重量/数量/是否可堆叠/颜色)
- 调稳定性严格程度:`Packer(support_surface_ratio=0.70)`,值越大要求支撑越充分

## Web 界面(loadexpert_demo/web)

交互式三维装柜网页(FastAPI + Three.js),功能:

- 三维交互:鼠标旋转/缩放/平移查看装柜结果,多柜位标签切换
- **点击箱体高亮**并显示该件货物详情(名称/装入序号/坐标/尺寸)
- **装载顺序动画**:逐件从顶部飞入,可点"重放动画"重看
- **Excel 导入货物清单 / 导出装柜报告**(Excel 多表 + PDF,含中文),另可下载导入模板
- **单位切换**(公制 cm/kg ↔ 英制 in/lb)与**多语言**(中/英)

启动:

```bash
cd web
pip install -r requirements.txt
python app.py
# 浏览器打开 http://127.0.0.1:8010
```

后端接口:`POST /api/pack` 装柜、`POST /api/import` 导入、
`POST /api/export/excel|pdf` 导出、`GET /api/template` 模板。

## 说明

集装箱尺寸/载重为常见近似值(20GP/40GP/40HQ),生产使用请以实际箱型规格为准。
算法为构造式启发式(极点法),适合快速原型;追求更高利用率可改用墙建法/LAFF 等商业常用策略(见上文算法说明)。
