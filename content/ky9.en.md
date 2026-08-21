## Overview

Line and surface integrals are a fixture of the Paper-I long-answer section: they weave the definite, double and triple integrals into a single web, and what they test is not one formula but the judgment to **first identify the type, then pick the theorem** — first kind or second? closed or not? plane or space? This chapter organizes both kinds of line integral, both kinds of surface integral, and the three great formulas of Green, Gauss and Stokes into six question types, and for each method **cites the source of the theorem or formula it relies on** — the historical origin plus the matching chapter on this site, so you can trace the principle back.

> **The method in one line.** For a line integral, first tell the first kind (with respect to arc length, direction-independent) from the second (with respect to coordinates, direction-dependent); for a closed curve reach for Green/Stokes first, for a closed surface reach for Gauss.

## Question Types

### Type 1: Line integrals w.r.t. arc length

**How it's asked.** Evaluate $\int_L f(x,y)\,ds$, where $L$ is a given curve (a line segment, a circular arc, etc.).

**Method.** Parametrize $x=x(t),y=y(t)$ and use $ds=\sqrt{x'^2+y'^2}\,dt$ to reduce it to a definite integral; a first-kind line integral is independent of direction, so exploit any symmetry of the curve.

**Formulas & sources.** The arc-length element
$$ds=\sqrt{x'^2+y'^2}\,dt$$
comes from the arc-length formula (see [g3] Integration); the first-kind line integral extends the definite integral from a segment to a general curve — the natural "integral with respect to arc length". See [g7] Line & Surface Integrals.

**Example 1.** Evaluate $\int_L (x+y)\,ds$, where $L$ is the segment from $(0,0)$ to $(1,1)$.

> **Solution.** Take $x=t,\ y=t,\ t\in[0,1]$, so $ds=\sqrt{x'^2+y'^2}\,dt=\sqrt2\,dt$, and
> $$\int_L (x+y)\,ds=\int_0^1(t+t)\sqrt2\,dt=\sqrt2\int_0^1 2t\,dt=\sqrt2.$$

### Type 2: Line integrals w.r.t. coordinates & Green

**How it's asked.** Evaluate $\int_L P\,dx+Q\,dy$; when $L$ is a positively oriented closed curve, the hint is usually "use Green's theorem".

**Method.** Parametrize directly as $\int_\alpha^\beta(Px'+Qy')\,dt$; when $L$ is a positively oriented closed curve, Green's theorem $\oint_L P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,d\sigma$ turns it into a double integral; a non-closed curve can be closed up by adding an arc and then subtracting that added part.

**Formulas & sources.** Green's theorem
$$\oint_L P\,dx+Q\,dy=\iint_D\Bigl(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\Bigr)\,d\sigma$$
was established by **George Green** (1828); it converts a second-kind line integral over a positively oriented closed curve into a double integral over the region it bounds. See [g7] Line & Surface Integrals.

**Example 2.** Use Green's theorem to evaluate $\oint_L (x^2-y)\,dx+(x+y^2)\,dy$, where $L$ is the unit circle $x^2+y^2=1$ positively oriented.

> **Solution.** Here $P=x^2-y,\ Q=x+y^2$, so $Q_x-P_y=1-(-1)=2$, and
> $$\oint_L (x^2-y)\,dx+(x+y^2)\,dy=\iint_D 2\,d\sigma=2\cdot\pi=2\pi,$$
> where $D$ is the unit disk, of area $\pi$.

### Type 3: Path independence & potentials

**How it's asked.** Decide whether $\int_L P\,dx+Q\,dy$ is path-independent; or, given that it is, evaluate it (endpoints are usually supplied).

**Method.** On a simply connected domain, $\int_L P\,dx+Q\,dy$ is path-independent $\iff P_y=Q_x$; then $P\,dx+Q\,dy=du$ is an exact differential, and once the potential $u$ is found, $\int_A^B P\,dx+Q\,dy=u(B)-u(A)$.

**Formulas & sources.** The criterion for path independence
$$\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}$$
together with the potential (exact-differential) condition is a direct corollary of Green's theorem on a simply connected domain (**George Green**, 1828). See [g7] Line & Surface Integrals.

**Example 3.** Evaluate $\int_L 2xy\,dx+x^2\,dy$ from $(0,0)$ to $(1,2)$.

> **Solution.** Here $P=2xy,\ Q=x^2$ and $P_y=2x=Q_x$, so the integral is path-independent. Find the potential: from $u_x=2xy$, $u=x^2y+g(y)$; then $u_y=x^2+g'(y)=x^2$ gives $g'=0$, so take $u=x^2y$. Hence
> $$\int_L 2xy\,dx+x^2\,dy=u(1,2)-u(0,0)=2.$$

### Type 4: Surface integrals of the first kind

**How it's asked.** Evaluate $\iint_\Sigma f(x,y,z)\,dS$, where $\Sigma$ is a given surface patch.

**Method.** For $z=z(x,y)$, project onto the $xy$-plane and use $dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy$ to reduce it to a double integral; a first-kind surface integral does not depend on the side of the surface, so use symmetry to simplify.

**Formulas & sources.** The surface-area element
$$dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy$$
is the heart of the first-kind surface integral; it extends the double integral from a plane region to a surface in space, in step with the arc-length element. See [g7] Line & Surface Integrals.

**Example 4.** Evaluate $\iint_\Sigma z\,dS$, where $\Sigma$ is the part of the plane $z=x+y$ over $D=[0,1]\times[0,1]$.

> **Solution.** From $z=x+y$, $z_x=z_y=1$, so $dS=\sqrt{1+1+1}\,dx\,dy=\sqrt3\,dx\,dy$. On $\Sigma$, $z=x+y$, hence
> $$\iint_\Sigma z\,dS=\iint_D (x+y)\sqrt3\,dx\,dy=\sqrt3\int_0^1\!\int_0^1(x+y)\,dx\,dy=\sqrt3\cdot1=\sqrt3.$$

### Type 5: Surface integrals of the second kind & Gauss

**How it's asked.** Evaluate $\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy$ (a flux); when $\Sigma$ is the outer side of a closed surface, the hint is usually "use Gauss's theorem".

**Method.** For a closed surface (outer side), reach first for Gauss's theorem $\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega(P_x+Q_y+R_z)\,dV$ to turn it into a triple integral; a non-closed surface can be closed up by adding a patch and then subtracting it.

**Formulas & sources.** Gauss's theorem (the divergence theorem)
$$\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega(P_x+Q_y+R_z)\,dV$$
was established by **C. F. Gauss** (1813) and **M. Ostrogradsky** (1826); it turns the flux through a closed surface (outer side) into the volume integral of the divergence over the solid it bounds. See [g7] Line & Surface Integrals.

**Example 5.** Use Gauss's theorem to evaluate $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$, where $\Sigma$ is the outer side of the unit sphere $x^2+y^2+z^2=1$ (a closed surface).

> **Solution.** The divergence of the integrand is $P_x+Q_y+R_z=1+1+1=3$. Let $\Omega$ be the unit ball; then
> $$\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy=\iiint_\Omega 3\,dV=3\cdot\frac43\pi\cdot1^3=4\pi.$$

### Type 6: Stokes' theorem & space curves

**How it's asked.** Evaluate a second-kind line integral $\oint_\Gamma P\,dx+Q\,dy+R\,dz$ (a circulation) over a closed space curve $\Gamma$.

**Method.** For a second-kind line integral over a closed space curve, use Stokes' theorem $\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(\nabla\times\mathbf F)\cdot\mathbf n\,dS$ to turn it into a surface integral, choosing any simple surface with $\Gamma$ as its boundary.

**Formulas & sources.** Stokes' theorem
$$\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(\nabla\times\mathbf F)\cdot\mathbf n\,dS$$
was proposed by **Lord Kelvin (W. Thomson)** (1850) and spread by **G. G. Stokes** (1854); it turns the circulation of a space curve into the flux of the curl — the spatial generalization of Green's theorem. See [g7] Line & Surface Integrals.

**Example 6.** Use Stokes' theorem to evaluate $\oint_\Gamma z\,dx+x\,dy+y\,dz$, where $\Gamma$ is the unit circle $x^2+y^2=1$ in the plane $z=0$, counterclockwise as seen from the positive $z$-axis.

> **Solution.** Let $\mathbf F=(z,x,y)$; then
> $$\nabla\times\mathbf F=(R_y-Q_z,\,P_z-R_x,\,Q_x-P_y)=(1,1,1).$$
> Take $\Sigma$ to be that unit disk, with unit normal $\mathbf n=(0,0,1)$, so $(\nabla\times\mathbf F)\cdot\mathbf n=1$, and
> $$\oint_\Gamma z\,dx+x\,dy+y\,dz=\iint_\Sigma 1\,dS=\pi,$$
> the area of the unit circle.

## Exercises

1. Evaluate $\int_L y^2\,ds$, where $L$ is the segment from $(0,0)$ to $(0,2)$ (along the $y$-axis).
2. Use Green's theorem to evaluate $\oint_L -y\,dx+x\,dy$, where $L$ is the positively oriented unit circle.
3. Evaluate $\int_L y\,dx+x\,dy$ from $(1,1)$ to $(2,3)$ (path-independent).
4. Evaluate $\iint_\Sigma x\,dS$, where $\Sigma$ is the part of the plane $z=x+y$ over $D=[0,1]\times[0,1]$.
5. Use Gauss's theorem to evaluate $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$, where $\Sigma$ is the outer side of the sphere $x^2+y^2+z^2=4$.
6. Use Green's theorem to evaluate $\oint_L xy\,dx+x^2\,dy$, where $L$ is the positively oriented unit circle.

**Answers.**
1) $x=0,\ y=t,\ t\in[0,2],\ ds=dt$; $\int_0^2 t^2\,dt=\frac83$.
2) $Q_x-P_y=1-(-1)=2$; $\iint_D 2\,d\sigma=2\pi$.
3) $P_y=1=Q_x$, take the potential $u=xy$; $u(2,3)-u(1,1)=6-1=5$.
4) $dS=\sqrt3\,dx\,dy$; $\sqrt3\int_0^1\!\int_0^1 x\,dx\,dy=\sqrt3\cdot\frac12=\frac{\sqrt3}{2}$.
5) Divergence $=3$; $\iiint_\Omega 3\,dV=3\cdot\frac43\pi\cdot2^3=32\pi$.
6) $Q_x-P_y=2x-x=x$; $\iint_D x\,d\sigma=0$ (odd function, region symmetric about the $y$-axis).
