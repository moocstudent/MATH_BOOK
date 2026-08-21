## Overview

Multivariable calculus is a guaranteed long-answer block in the advanced-mathematics part of the postgraduate entrance exam (Papers I, II and III): partial derivatives and total differentials, directional derivatives and gradients, and extrema and double integrals appear year after year — as a problem of their own or as a bridge to later integral calculus. What it tests is not one formula but the judgment to **first read the structure, then choose a method**. This chapter organizes multivariable calculus into six question types, and for each method **cites the source of the theorem it relies on** — the historical origin plus the matching chapter on this site, so you can trace the principle back.

> **The method in one line.** When taking a partial derivative, hold every other variable constant; before a double integral, ask two things: (1) rectangular or polar coordinates (prefer polar for a disk or when $x^2+y^2$ appears)? (2) can — or must — you swap the order of integration?

## Question Types

### Type 1: Partials & total differential

**How it's asked.** Find the partial derivatives $z_x,z_y$ of a multivariable function, or its total differential $dz$.

**Method.** To differentiate with respect to one variable, treat every other variable as a constant and apply the single-variable rules; the total differential is $dz=z_x\,dx+z_y\,dy$; when the two mixed partials are continuous, $z_{xy}=z_{yx}$.

**Formulas & sources.**

- **Partial derivatives and the total differential** $dz=z_x\,dx+z_y\,dy$: the notions of partial derivative and total differential took shape in 18th-century work on multivariable problems (**L. Euler**, **A. Clairaut**); the **equality of mixed partials** $z_{xy}=z_{yx}$ is guaranteed by the **Clairaut/Schwarz theorem** (**A. Clairaut**, 1740; **H. A. Schwarz**, 1873). See [g5] Multivariable Differential Calculus.

**Example 1.** Find the total differential of $z=\ln(x^2+y^2)$.

> **Solution.** Differentiate partially (treat $y$ as constant for $z_x$, and vice versa):
> $$z_x=\frac{2x}{x^2+y^2},\qquad z_y=\frac{2y}{x^2+y^2}.$$
> Hence the total differential is
> $$dz=z_x\,dx+z_y\,dy=\frac{2x\,dx+2y\,dy}{x^2+y^2}.$$

### Type 2: Chain rule & implicit differentiation

**How it's asked.** Find the partials of a composite function; or, for an implicit function $z=z(x,y)$ defined by $F(x,y,z)=0$, find $z_x,z_y$.

**Method.** For a composite, use the **chain rule**: draw the dependency tree, multiply along each path and add the paths together; when $z=z(x,y)$ is defined by $F(x,y,z)=0$, then $z_x=-\dfrac{F_x}{F_z}$ and $z_y=-\dfrac{F_y}{F_z}$.

**Formulas & sources.**

- **The multivariable chain rule** ($\dfrac{\partial z}{\partial x}=z_u u_x+z_v v_x$) and the **implicit-differentiation formula** $z_x=-\dfrac{F_x}{F_z}$: the first extends composite differentiation to several variables; the applicability of the second is guaranteed by the **implicit function theorem** (**U. Dini**, 1878). See [g5] Multivariable Differential Calculus.

**Example 2.** Let $z=e^{u}\sin v$, $u=xy$, $v=x+y$. Find $\dfrac{\partial z}{\partial x}$.

> **Solution.** By the chain rule, $z$ depends on $x$ through $u$ and $v$:
> $$\frac{\partial z}{\partial x}=z_u u_x+z_v v_x=e^{u}\sin v\cdot y+e^{u}\cos v\cdot1.$$
> Substituting $u=xy,\ v=x+y$:
> $$\frac{\partial z}{\partial x}=e^{xy}\bigl[y\sin(x+y)+\cos(x+y)\bigr].$$

### Type 3: Directional derivative & gradient

**How it's asked.** Find the directional derivative of a function at a point along a given direction; find the gradient, the direction of steepest ascent, or the maximum rate of change.

**Method.** The directional derivative is $\dfrac{\partial f}{\partial l}=\nabla f\cdot\hat l$, where $\hat l$ is the **unit vector** of the direction $\vec l$; the function **changes fastest along the gradient $\nabla f$**, with maximum rate of change $|\nabla f|$.

**Formulas & sources.**

- **Directional derivative and gradient** $\dfrac{\partial f}{\partial l}=\nabla f\cdot\hat l$: the gradient and vector notation come from the 19th-century development of **vector analysis** (**W. R. Hamilton**, **J. W. Gibbs**). See [g5] Multivariable Differential Calculus.

**Example 3.** Find the directional derivative of $u=xyz$ at $(1,1,1)$ along $\vec l=(1,2,2)$.

> **Solution.** First the gradient: $\nabla u=(yz,xz,xy)$, which at $(1,1,1)$ equals $(1,1,1)$. Normalize the direction: $|\vec l|=\sqrt{1^2+2^2+2^2}=3$, so $\hat l=\bigl(\tfrac13,\tfrac23,\tfrac23\bigr)$. Therefore
> $$\frac{\partial u}{\partial l}=\nabla u\cdot\hat l=(1,1,1)\cdot\Bigl(\tfrac13,\tfrac23,\tfrac23\Bigr)=\frac{5}{3}.$$

### Type 4: Extrema & constrained extrema

**How it's asked.** Find the unconstrained extrema of a function of two variables; or find constrained extrema / extreme values subject to $\varphi(x,y)=0$.

**Method.** **Unconstrained**: first solve $f_x=f_y=0$ for the critical points, then classify with the discriminant $AC-B^2$ (where $A=f_{xx}$, $B=f_{xy}$, $C=f_{yy}$). **Constrained**: build the Lagrange function $L=f-\lambda\varphi$ and solve $L_x=L_y=L_\lambda=0$.

**Formulas & sources.**

- The **first-order necessary condition** (partials vanish at a critical point) generalizes Fermat's idea of extrema to several variables; the **method of Lagrange multipliers** ($L=f-\lambda\varphi$) handles constrained extrema and is due to **J.-L. Lagrange** (*Mécanique analytique*, 1788). See [g5] Multivariable Differential Calculus.

**Example 4.** Maximize $f=x+y$ subject to $x^2+y^2=1$.

> **Solution.** Form $L=x+y-\lambda(x^2+y^2-1)$ and set the partials to zero:
> $$L_x=1-2\lambda x=0,\qquad L_y=1-2\lambda y=0,$$
> whose ratio gives $x=y$. Substituting into $x^2+y^2=1$ gives $x=y=\dfrac{1}{\sqrt2}$, so the maximum is
> $$f=x+y=\sqrt2.$$

### Type 5: Evaluating double integrals

**How it's asked.** Evaluate $\displaystyle\iint_D f(x,y)\,d\sigma$; or swap the order of integration first, then compute the iterated integral.

**Method.** In **rectangular coordinates**, reduce to an iterated integral (choose X-type or Y-type by the region); when the region is a disk or the integrand contains $x^2+y^2$, switch to **polar coordinates** ($x=r\cos\theta$, $y=r\sin\theta$, $d\sigma=r\,dr\,d\theta$); if one order cannot be integrated, **swap the order of integration**.

**Formulas & sources.**

- **Iterated integration (reducing a double integral to two single ones)** is **Fubini's theorem** (**G. Fubini**, 1907); the factor $r$ appearing in the **polar change of variables** is the **Jacobian determinant** of the transformation (**C. G. J. Jacobi**). See [g6] Multiple Integrals.

**Example 5.** Swap the order of integration to evaluate $\displaystyle\int_0^1\!dx\int_x^1 e^{y^2}\,dy$.

> **Solution.** The region $0\le x\le1,\ x\le y\le1$ is the triangle $0\le y\le1,\ 0\le x\le y$. Integrating in $x$ first:
> $$\int_0^1\!dy\int_0^y e^{y^2}\,dx=\int_0^1 y\,e^{y^2}\,dy=\frac12\,e^{y^2}\Big|_0^1=\frac12(e-1).$$

### Type 6: Symmetry & applications

**How it's asked.** Use symmetry to simplify a double integral; or use a double integral to compute the area of a plane region or the volume of a solid with curved top.

**Method.** When the region $D$ is symmetric about a coordinate axis and the integrand is **odd** in the corresponding variable, that part of the integral is zero (odd/even symmetry); moreover $\iint_D 1\,d\sigma$ gives the **area** of $D$, and $\iint_D f\,d\sigma$ ($f\ge0$) gives the **volume** of the solid under the surface.

**Formulas & sources.**

- The **odd/even symmetry of double integrals** follows directly from the definition of the double integral together with the symmetry of the region; the integral representations of area and volume are the geometric meaning of the double integral. See [g6] Multiple Integrals.

**Example 6.** Evaluate $\displaystyle\iint_D (x+y+1)\,d\sigma$, where $D:\ x^2+y^2\le1$.

> **Solution.** The region $D$ is the unit disk, symmetric about both coordinate axes. Since $x$ is odd about the $y$-axis and $y$ is odd about the $x$-axis,
> $$\iint_D x\,d\sigma=0,\qquad \iint_D y\,d\sigma=0.$$
> Hence
> $$\iint_D (x+y+1)\,d\sigma=\iint_D 1\,d\sigma=\pi$$
> (the area of the unit disk).

## Exercises

1. Find the total differential of $z=x^2y^3$.
2. Let $z=f(x^2+y^2)$ with $f$ differentiable. Find $z_x,z_y$.
3. Evaluate $\nabla(x^2+y^2+z^2)$ at the point $(1,-1,2)$.
4. Find the extremum of $f=xy$ subject to $x+y=2$.
5. Use polar coordinates to evaluate $\displaystyle\iint_D (x^2+y^2)\,d\sigma$, $D:\ x^2+y^2\le1$.
6. Swap the order of integration in $\displaystyle\int_0^1\!dy\int_y^1 f(x,y)\,dx$.

**Answers.**
1) $z_x=2xy^3$ and $z_y=3x^2y^2$, so $dz=2xy^3\,dx+3x^2y^2\,dy$.
2) By the chain rule, $z_x=2xf'(x^2+y^2)$ and $z_y=2yf'(x^2+y^2)$.
3) $\nabla(x^2+y^2+z^2)=(2x,2y,2z)$, which at $(1,-1,2)$ is $(2,-2,4)$.
4) Lagrange $L=xy-\lambda(x+y-2)$ gives $x=y=1$, a (maximum) value $f=1$.
5) In polar form $\displaystyle\int_0^{2\pi}\!\!\int_0^1 r^2\cdot r\,dr\,d\theta=2\pi\cdot\frac14=\frac{\pi}{2}$.
6) The region $0\le y\le1,\ y\le x\le1$ is $0\le x\le1,\ 0\le y\le x$, so $\displaystyle\int_0^1\!dx\int_0^x f(x,y)\,dy$.
