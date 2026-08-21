## 题型总览

曲线积分与曲面积分是考研数学一(数一)专属的一块大题:它把定积分、二重积分、三重积分串成一张网,考的不是单个公式,而是**先辨类型、再选定理**的判断力——第一类还是第二类?闭还是不闭?平面还是空间?本章把两类曲线积分、两类曲面积分,以及格林、高斯、斯托克斯三大公式归纳成六种题型,并对每种方法**标注其所依据的定理或公式的出处**——既给历史来源,也指明本站对应章节,方便回查原理。

> **一句话方法论.** 曲线积分先分清第一类(对弧长,与方向无关)还是第二类(对坐标,与方向有关);闭曲线优先想格林/斯托克斯,闭曲面优先想高斯。

## 题型精讲

### 题型 1:第一类曲线积分(对弧长)

**常见问法.** 求 $\int_L f(x,y)\,ds$,其中 $L$ 为一段已知曲线(直线段、圆弧等)。

**方法.** 参数化 $x=x(t),y=y(t)$,用 $ds=\sqrt{x'^2+y'^2}\,dt$ 化为定积分;第一类曲线积分与积分方向无关,可利用曲线的对称性化简。

**公式与依据.** 弧长微元
$$ds=\sqrt{x'^2+y'^2}\,dt$$
源自弧长公式(见《[g3] 积分》);第一类曲线积分把定积分从直线段推广到一般曲线,是「对弧长积分」的自然产物。见《[g7] 曲线积分与曲面积分》。

**例 1.** 求 $\int_L (x+y)\,ds$,$L$ 为从 $(0,0)$ 到 $(1,1)$ 的直线段。

> **解.** 取参数 $x=t,\ y=t,\ t\in[0,1]$,则 $ds=\sqrt{x'^2+y'^2}\,dt=\sqrt2\,dt$,于是
> $$\int_L (x+y)\,ds=\int_0^1(t+t)\sqrt2\,dt=\sqrt2\int_0^1 2t\,dt=\sqrt2.$$

### 题型 2:第二类曲线积分与格林公式

**常见问法.** 求 $\int_L P\,dx+Q\,dy$;若 $L$ 为正向闭曲线,常提示「用格林公式」。

**方法.** 直接参数化 $\int_\alpha^\beta(Px'+Qy')\,dt$;若 $L$ 为正向闭曲线,用格林公式 $\oint_L P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,d\sigma$ 化为二重积分;非闭曲线可补线成闭再减去补的部分。

**公式与依据.** 格林公式
$$\oint_L P\,dx+Q\,dy=\iint_D\Bigl(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\Bigr)\,d\sigma$$
由 **George Green**(1828)建立,把平面正向闭曲线上的第二类曲线积分化为其所围区域上的二重积分。见《[g7] 曲线积分与曲面积分》。

**例 2.** 用格林公式求 $\oint_L (x^2-y)\,dx+(x+y^2)\,dy$,$L$ 为单位圆 $x^2+y^2=1$ 正向。

> **解.** 这里 $P=x^2-y,\ Q=x+y^2$,故 $Q_x-P_y=1-(-1)=2$,于是
> $$\oint_L (x^2-y)\,dx+(x+y^2)\,dy=\iint_D 2\,d\sigma=2\cdot\pi=2\pi,$$
> 其中 $D$ 为单位圆盘,面积为 $\pi$。

### 题型 3:路径无关与势函数

**常见问法.** 判断 $\int_L P\,dx+Q\,dy$ 是否与路径无关;或已知路径无关,求积分之值(常给出端点)。

**方法.** 在单连通域内 $\int_L P\,dx+Q\,dy$ 与路径无关 $\iff P_y=Q_x$;此时 $P\,dx+Q\,dy=du$ 为全微分,求出势函数 $u$ 后 $\int_A^B P\,dx+Q\,dy=u(B)-u(A)$。

**公式与依据.** 路径无关的充要条件
$$\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}$$
及势函数(全微分/恰当条件),是格林公式在单连通域上的直接推论(**George Green**,1828)。见《[g7] 曲线积分与曲面积分》。

**例 3.** 求 $\int_L 2xy\,dx+x^2\,dy$,从 $(0,0)$ 到 $(1,2)$。

> **解.** 这里 $P=2xy,\ Q=x^2$,而 $P_y=2x=Q_x$,故积分与路径无关。求势函数:由 $u_x=2xy$ 得 $u=x^2y+g(y)$,再由 $u_y=x^2+g'(y)=x^2$ 得 $g'=0$,取 $u=x^2y$。于是
> $$\int_L 2xy\,dx+x^2\,dy=u(1,2)-u(0,0)=2.$$

### 题型 4:第一类曲面积分

**常见问法.** 求 $\iint_\Sigma f(x,y,z)\,dS$,其中 $\Sigma$ 为一片已知曲面。

**方法.** 对 $z=z(x,y)$ 投影到 $xy$ 面,用 $dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy$ 化为二重积分;第一类曲面积分与曲面侧无关,善用对称性可大幅化简。

**公式与依据.** 曲面面积微元
$$dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy$$
是第一类曲面积分的核心;它把二重积分从平面区域推广到空间曲面,与弧长微元一脉相承。见《[g7] 曲线积分与曲面积分》。

**例 4.** 求 $\iint_\Sigma z\,dS$,$\Sigma$ 为平面 $z=x+y$ 上对应 $D=[0,1]\times[0,1]$ 的部分。

> **解.** 由 $z=x+y$ 得 $z_x=z_y=1$,故 $dS=\sqrt{1+1+1}\,dx\,dy=\sqrt3\,dx\,dy$。在 $\Sigma$ 上 $z=x+y$,于是
> $$\iint_\Sigma z\,dS=\iint_D (x+y)\sqrt3\,dx\,dy=\sqrt3\int_0^1\!\int_0^1(x+y)\,dx\,dy=\sqrt3\cdot1=\sqrt3.$$

### 题型 5:第二类曲面积分与高斯公式

**常见问法.** 求 $\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy$(通量);若 $\Sigma$ 为闭曲面外侧,常提示「用高斯公式」。

**方法.** 闭曲面(外侧)优先用高斯公式 $\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega(P_x+Q_y+R_z)\,dV$ 化为三重积分;非闭曲面可补面成闭再减去补的部分。

**公式与依据.** 高斯公式(散度定理)
$$\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega(P_x+Q_y+R_z)\,dV$$
由 **C. F. Gauss**(1813)与 **M. Ostrogradsky**(1826)建立,把闭曲面外侧的通量化为其所围立体上散度的体积分。见《[g7] 曲线积分与曲面积分》。

**例 5.** 用高斯公式求 $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$,$\Sigma$ 为单位球面 $x^2+y^2+z^2=1$ 外侧(闭曲面)。

> **解.** 被积表达式的散度 $P_x+Q_y+R_z=1+1+1=3$。记 $\Omega$ 为单位球体,则
> $$\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy=\iiint_\Omega 3\,dV=3\cdot\frac43\pi\cdot1^3=4\pi.$$

### 题型 6:斯托克斯公式与空间曲线积分

**常见问法.** 求空间闭曲线 $\Gamma$ 上的第二类曲线积分 $\oint_\Gamma P\,dx+Q\,dy+R\,dz$(环量)。

**方法.** 空间闭曲线的第二类曲线积分用斯托克斯公式 $\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(\nabla\times\mathbf F)\cdot\mathbf n\,dS$ 化为曲面积分,选一张以 $\Gamma$ 为边界的简单曲面即可。

**公式与依据.** 斯托克斯公式
$$\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(\nabla\times\mathbf F)\cdot\mathbf n\,dS$$
由 **Lord Kelvin(W. Thomson)**(1850)提出、**G. G. Stokes**(1854)传播;它把空间曲线上的环量化为旋度的通量,是格林公式在空间的推广。见《[g7] 曲线积分与曲面积分》。

**例 6.** 用斯托克斯公式求 $\oint_\Gamma z\,dx+x\,dy+y\,dz$,$\Gamma$ 为平面 $z=0$ 上的单位圆 $x^2+y^2=1$,从 $z$ 轴正向看取逆时针。

> **解.** 记 $\mathbf F=(z,x,y)$,则
> $$\nabla\times\mathbf F=(R_y-Q_z,\,P_z-R_x,\,Q_x-P_y)=(1,1,1).$$
> 取 $\Sigma$ 为该单位圆盘,其单位法向 $\mathbf n=(0,0,1)$,故 $(\nabla\times\mathbf F)\cdot\mathbf n=1$,于是
> $$\oint_\Gamma z\,dx+x\,dy+y\,dz=\iint_\Sigma 1\,dS=\pi,$$
> 即单位圆的面积。

## 练习与自测

1. 求 $\int_L y^2\,ds$,$L$ 为从 $(0,0)$ 到 $(0,2)$ 的直线段(沿 $y$ 轴)。
2. 用格林公式求 $\oint_L -y\,dx+x\,dy$,$L$ 为正向单位圆。
3. 求 $\int_L y\,dx+x\,dy$,从 $(1,1)$ 到 $(2,3)$(路径无关)。
4. 求 $\iint_\Sigma x\,dS$,$\Sigma$ 为平面 $z=x+y$ 上对应 $D=[0,1]\times[0,1]$ 的部分。
5. 用高斯公式求 $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$,$\Sigma$ 为球面 $x^2+y^2+z^2=4$ 外侧。
6. 用格林公式求 $\oint_L xy\,dx+x^2\,dy$,$L$ 为正向单位圆。

**参考答案.**
1) $x=0,\ y=t,\ t\in[0,2],\ ds=dt$;$\int_0^2 t^2\,dt=\frac83$。
2) $Q_x-P_y=1-(-1)=2$;$\iint_D 2\,d\sigma=2\pi$。
3) $P_y=1=Q_x$,取势函数 $u=xy$;$u(2,3)-u(1,1)=6-1=5$。
4) $dS=\sqrt3\,dx\,dy$;$\sqrt3\int_0^1\!\int_0^1 x\,dx\,dy=\sqrt3\cdot\frac12=\frac{\sqrt3}{2}$。
5) 散度 $=3$;$\iiint_\Omega 3\,dV=3\cdot\frac43\pi\cdot2^3=32\pi$。
6) $Q_x-P_y=2x-x=x$;$\iint_D x\,d\sigma=0$(奇函数,区域关于 $y$ 轴对称)。
