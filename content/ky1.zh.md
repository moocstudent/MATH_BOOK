## 题型总览

求极限是考研数学(数一、数二、数三)雷打不动的第一大考点:选择题、填空题几乎必出,大题也常以它开场或收尾。它考的不是某一个公式,而是**先判类型、再选方法**的判断力。本章把求极限归纳成七种方法、五类题型,并对每种方法**标注其所依据的定理或公理的出处**——既给历史来源,也指明本站对应章节,方便回查原理。

> **一句话方法论.** 看到极限,先问三件事:① 是什么未定式($\frac00,\frac\infty\infty,\infty-\infty,0\cdot\infty,1^\infty,\infty^0,0^0$)?② 能否先化简(通分、有理化、提因子)?③ 该上等价无穷小、泰勒,还是洛必达?

## 题型精讲

### 题型 1:七种求极限方法总览

**常见问法.** 求 $\displaystyle\lim_{x\to a} f(x)$ 或 $\displaystyle\lim_{n\to\infty} x_n$,其中表达式呈某种未定式。

**方法.** 考研求极限的七种主力方法,按「先易后难」排序:

1. **代入 + 四则运算法则**——非未定式直接代入;
2. **恒等变形**——通分、有理化(乘共轭)、分子分母同除最高次幂(「抓大头」);
3. **两个重要极限**——见题型 2;
4. **等价无穷小替换**——见题型 3;
5. **洛必达法则**——$\frac00$ 或 $\frac\infty\infty$ 时对分子分母分别求导;
6. **泰勒公式**——加减式中出现相消时最稳,见题型 3;
7. **夹逼定理 / 单调有界准则 / 定积分定义**——数列极限与 $n$ 项和的常用武器。

**公式与依据.**

- **极限的 $\varepsilon\text{–}\delta$ 定义与四则运算法则**:极限的严格语言由 **A.-L. Cauchy**(《分析教程》,1821)提出、**K. Weierstrass**(1860 年代)用 $\varepsilon\text{–}\delta$ 最终定型。参见本站《[g1] 极限与连续》。
- **洛必达法则** $\displaystyle\lim\frac{f}{g}=\lim\frac{f'}{g'}$:首见于 **G. de l'Hôpital** 的教材《无穷小分析》(1696),实际结果出自其老师 **Johann Bernoulli**。使用前必须核验是 $\frac00$ 或 $\frac\infty\infty$ 型。原理见《[g2] 导数与微分》。

**例 1.** 求 $\displaystyle\lim_{x\to 0}\frac{\tan x-\sin x}{x^{3}}$。

> **解.** 先化简、再用等价无穷小(乘除因子可换):
> $$\tan x-\sin x=\sin x\Bigl(\frac{1}{\cos x}-1\Bigr)=\sin x\cdot\frac{1-\cos x}{\cos x}.$$
> 当 $x\to0$:$\sin x\sim x$、$1-\cos x\sim\dfrac{x^{2}}{2}$、$\cos x\to1$,故分子 $\sim x\cdot\dfrac{x^{2}}{2}=\dfrac{x^{3}}{2}$,于是
> $$\lim_{x\to0}\frac{\tan x-\sin x}{x^{3}}=\frac12.$$

**例 2.** 求 $\displaystyle\lim_{n\to\infty}\sum_{k=1}^{n}\frac{n}{n^{2}+k}$(夹逼定理)。

> **解.** 对 $k=1,\dots,n$ 每一项放缩,把分母统一取最小、最大:
> $$\sum_{k=1}^{n}\frac{n}{n^{2}+n}\ \le\ \sum_{k=1}^{n}\frac{n}{n^{2}+k}\ \le\ \sum_{k=1}^{n}\frac{n}{n^{2}+1}.$$
> 左端 $=\dfrac{n\cdot n}{n^{2}+n}=\dfrac{n^{2}}{n^{2}+n}\to1$,右端 $=\dfrac{n^{2}}{n^{2}+1}\to1$。由**夹逼定理**(思想可追溯到 Archimedes 的穷竭法,现代形式见 Cauchy),原极限 $=1$。

### 题型 2:$1^{\infty}$ 型与两个重要极限

**常见问法.** 求 $\displaystyle\lim\, [\,f(x)\,]^{\,g(x)}$,其中底 $f\to1$、指数 $g\to\infty$。

**方法.** **凑第二个重要极限**或用**指数化**。最快的是「$1^\infty$ 三步凑 $e$」:若 $f\to1$、$g\to\infty$,则
$$\lim f^{g}=\exp\Bigl(\lim g\,(f-1)\Bigr).$$
更稳妥的通法是 $f^{g}=e^{\,g\ln f}$,把幂化到指数上再求 $\lim g\ln f$。

**公式与依据.**

- **两个重要极限**
$$\lim_{x\to0}\frac{\sin x}{x}=1,\qquad \lim_{x\to\infty}\Bigl(1+\frac1x\Bigr)^{x}=e.$$
第一式由单位圆的**面积/弧长夹逼**得到;第二式源自 **Jacob Bernoulli** 对复利的研究(1683),常数 $e$ 及其记号由 **L. Euler**(《无穷分析引论》,1748)确立。参见《[g1] 极限与连续》《[h1] 指数与对数》。
- **幂指恒等式** $u^{v}=e^{v\ln u}$($u>0$),依据指数函数的连续性(可与极限交换),见《[h1] 指数与对数》。

**例 3.** 求 $\displaystyle\lim_{x\to0}(\cos x)^{1/x^{2}}$。

> **解.** 指数化:$(\cos x)^{1/x^{2}}=\exp\!\Bigl(\dfrac{\ln\cos x}{x^{2}}\Bigr)$。而 $\ln\cos x=\ln\bigl(1+(\cos x-1)\bigr)\sim\cos x-1\sim-\dfrac{x^{2}}{2}$,故指数 $\to-\dfrac12$。于是
> $$\lim_{x\to0}(\cos x)^{1/x^{2}}=e^{-1/2}.$$

### 题型 3:等价无穷小与泰勒展开求极限

**常见问法.** $\frac00$ 型,表达式含 $\sin x,\tan x,\ln(1+x),e^{x}-1,1-\cos x$ 等。

**方法.** **乘除**因子可直接用等价无穷小替换;**加减**式中若出现相消,替换会丢精度,必须改用**泰勒公式**展开到「相消后不为零的最低阶」。

**公式与依据.**

- **常用等价无穷小($x\to0$)**
$$\sin x\sim x,\quad \tan x\sim x,\quad \arcsin x\sim x,\quad \arctan x\sim x,$$
$$1-\cos x\sim\frac{x^{2}}{2},\quad e^{x}-1\sim x,\quad \ln(1+x)\sim x,\quad (1+x)^{a}-1\sim a x.$$
它们**全部是泰勒/麦克劳林展开的一阶主部**,来源为 **B. Taylor**(《增量法》,1715)与 **C. Maclaurin**(《流数论》,1742)。展开原理见《[g4] 无穷级数》。

**例 4.** 求 $\displaystyle\lim_{x\to0}\frac{e^{x}-1-x}{x^{2}}$。

> **解.** 分子是「$e^x$ 减去它的一阶近似」,等价无穷小已不够用,改用**泰勒展开**:$e^{x}=1+x+\dfrac{x^{2}}{2}+o(x^{2})$,故分子 $=\dfrac{x^{2}}{2}+o(x^{2})$,于是
> $$\lim_{x\to0}\frac{e^{x}-1-x}{x^{2}}=\frac12.$$

### 题型 4:无穷小阶的比较与由极限定参数

**常见问法.** 比较两个无穷小的阶;或求常数 $a,b,k$ 使某极限**存在且非零**(或等于给定值)。

**方法.** 统一**泰勒展开**,按 $x$ 的幂次对齐:让分子最低次幂与分母同阶,令系数相等,即可解出待定常数。无穷小 $\alpha,\beta$ 的**阶**由 $\lim\dfrac{\alpha}{\beta}$ 判定:$0$(高阶)、非零常数(同阶)、$1$(等价)。

**公式与依据.** 无穷小及其阶的比较由 **Cauchy** 系统建立(1821);比较时所用的展开式同题型 3,依据 Taylor–Maclaurin 定理。参见《[g1] 极限与连续》《[g4] 无穷级数》。

**例 5.** 设 $\displaystyle\lim_{x\to0}\frac{\ln(1+x)-x}{x^{k}}=c$($c$ 为非零常数),求 $k$ 与 $c$。

> **解.** 展开 $\ln(1+x)=x-\dfrac{x^{2}}{2}+\dfrac{x^{3}}{3}-\cdots$,故
> $$\ln(1+x)-x=-\frac{x^{2}}{2}+o(x^{2}).$$
> 要使极限为非零有限值,分母须与分子同阶,即 $k=2$,此时
> $$c=\lim_{x\to0}\frac{-x^{2}/2+o(x^{2})}{x^{2}}=-\frac12.$$
> 所以 $k=2,\ c=-\dfrac12$。

### 题型 5:连续性与间断点分类

**常见问法.** 判断分段函数在衔接点是否连续;找出函数的间断点并**分类**。

**方法.** 连续的定义是 $\displaystyle\lim_{x\to x_{0}}f(x)=f(x_{0})$(三者存在且相等)。间断点按**左右极限**分类:

- **第一类**(左、右极限都存在):两者相等但 $\ne f(x_0)$ 或 $f$ 无定义 → **可去间断点**;两者不等 → **跳跃间断点**;
- **第二类**(至少一侧极限不存在):趋于 $\infty$ → **无穷间断点**;来回摆动 → **振荡间断点**。

**公式与依据.** 连续性的严格定义由 **B. Bolzano**(1817)与 **Cauchy**(1821)给出;间断点的上述分类是其直接推论。参见《[g1] 极限与连续》。

**例 6.** 求 $\displaystyle f(x)=\frac{x^{2}-1}{x^{2}-3x+2}$ 的间断点并分类。

> **解.** 分母 $x^{2}-3x+2=(x-1)(x-2)$,故 $x=1,2$ 处无定义,是仅有的间断点。因式分解:
> $$f(x)=\frac{(x-1)(x+1)}{(x-1)(x-2)}=\frac{x+1}{x-2}\quad(x\ne1).$$
> - 在 $x=1$:$\displaystyle\lim_{x\to1}f(x)=\frac{2}{-1}=-2$(极限存在),但 $f(1)$ 无定义,故为**可去间断点**(第一类)。
> - 在 $x=2$:$\displaystyle\lim_{x\to2}f(x)=\infty$,故为**无穷间断点**(第二类)。

## 练习与自测

1. 求 $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x\sin x}$。
2. 求 $\displaystyle\lim_{x\to\infty}\Bigl(\frac{x+1}{x-1}\Bigr)^{x}$。
3. 求 $\displaystyle\lim_{x\to0}\frac{\sqrt{1+x}-\sqrt{1-x}}{x}$。
4. 求 $\displaystyle\lim_{x\to0}\frac{x-\sin x}{x^{3}}$。
5. 设 $\displaystyle\lim_{x\to0}\frac{\sin x-x\cos x}{x^{k}}=c$($c\ne0$),求 $k$ 与 $c$。
6. 判断 $f(x)=2^{1/x}$ 在 $x=0$ 处的间断点类型。

**参考答案.**
1) $1-\cos x\sim\frac{x^{2}}{2}$、$x\sin x\sim x^{2}$,故极限 $=\frac12$。
2) $\bigl(1+\frac{2}{x-1}\bigr)^{x}$,取对数 $x\ln\bigl(1+\frac{2}{x-1}\bigr)\sim x\cdot\frac{2}{x-1}\to2$,故原式 $=e^{2}$。
3) 分子有理化或用 $(1+x)^{1/2}-1\sim\frac{x}{2}$:$\sqrt{1+x}-\sqrt{1-x}\sim\frac{x}{2}-(-\frac{x}{2})=x$,极限 $=1$。
4) 泰勒 $\sin x=x-\frac{x^{3}}{6}+o(x^{3})$,$x-\sin x=\frac{x^{3}}{6}+o(x^{3})$,极限 $=\frac16$。
5) 展开 $\sin x=x-\frac{x^{3}}{6}+o(x^3)$、$x\cos x=x-\frac{x^{3}}{2}+o(x^3)$,相减得 $\sin x-x\cos x=\frac{x^{3}}{3}+o(x^{3})$,故 $k=3,\ c=\frac13$。
6) $x\to0^{+}$ 时 $2^{1/x}\to+\infty$,$x\to0^{-}$ 时 $2^{1/x}\to0$。右极限为 $\infty$,故 $x=0$ 是**第二类(无穷)间断点**。
