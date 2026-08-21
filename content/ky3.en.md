## Overview

Integration is the computational core of the postgraduate entrance exam (Papers I, II and III): guaranteed in the fill-in and multiple-choice sections, and in long-answer problems it interweaves with differential equations, geometric applications and series; Papers I and III also test the convergence and summation of infinite series. Again what it tests is not a single formula but the judgment to **read the structure first, then choose a method** — whether an indefinite integral wants a differential-match or integration by parts, whether a definite integral collapses in one step by symmetry, often decides the outcome. This chapter organizes integrals and series into six question types and, for each formula, **cites its historical origin and the matching chapter on this site** so you can trace the principle back.

> **The method in one line.** For a definite integral, first ask whether symmetry, parity, or the reflection trick ($x\to a-x$) makes it collapse; for an indefinite integral, try the order "match a differential → substitute → parts → partial fractions".

## Question Types

### Type 1: the four integration methods

**How it's asked.** Evaluate the indefinite integral $\displaystyle\int f(x)\,dx$.

**Method.** The four workhorse methods, tried roughly in this order:

1. **Matching a differential (first substitution)** — $\int f(\varphi(x))\varphi'(x)\,dx=\int f(u)\,du$, absorbing $\varphi'(x)\,dx$ into $d\varphi$;
2. **Second substitution** — a trigonometric substitution ($x=a\sin t$) or a radical substitution to clear a root;
3. **Integration by parts** — $\int u\,dv=uv-\int v\,du$, for "polynomial × exponential/trig/log";
4. **Rational functions** — split into partial fractions and integrate term by term.

**Formulas & sources.** Substitution $\int f(\varphi(x))\varphi'(x)\,dx=\int f(u)\,du$ and integration by parts $\int u\,dv=uv-\int v\,du$ were developed into systematic tools by **G. Leibniz** and **L. Euler** in the 18th century — the two operational pillars of the fundamental theorem of calculus (parts is the product rule run backwards). See [g3] Integration.

**Example 1.** Evaluate $\displaystyle\int x e^{x}\,dx$.

> **Solution.** Integrate by parts with $u=x,\ dv=e^{x}\,dx$, so $du=dx,\ v=e^{x}$:
> $$\int xe^{x}\,dx=xe^{x}-\int e^{x}\,dx=xe^{x}-e^{x}+C=(x-1)e^{x}+C.$$

### Type 2: symmetry and the reflection trick

**How it's asked.** Evaluate a definite integral, especially when the integrand has parity, a symmetric interval, or a $\sin/\cos$ swap structure.

**Method.** Three moves come first:

- **Parity** — an odd function over a symmetric interval gives $\int_{-a}^{a}f\,dx=0$, an even one gives $\int_{-a}^{a}f\,dx=2\int_{0}^{a}f\,dx$;
- **Periodicity** — with period $T$, $\int_{a}^{a+T}f\,dx=\int_{0}^{T}f\,dx$;
- **Reflection trick (the substitution $x\to a-x$)** — $\int_{0}^{a}f(x)\,dx=\int_{0}^{a}f(a-x)\,dx$.

**Formulas & sources.** The linearity and interval-additivity of the definite integral both follow from its definition as a Riemann sum (**B. Riemann**, 1854); the reflection trick is just the direct consequence of the substitution $x\to a-x$. See [g3] Integration.

**Example 2.** Evaluate $\displaystyle I=\int_{0}^{\pi/2}\frac{\sin x}{\sin x+\cos x}\,dx$.

> **Solution.** Apply the reflection $x\to\frac{\pi}{2}-x$ (which swaps $\sin x\leftrightarrow\cos x$):
> $$I=\int_{0}^{\pi/2}\frac{\cos x}{\cos x+\sin x}\,dx.$$
> Adding the two expressions,
> $$2I=\int_{0}^{\pi/2}\frac{\sin x+\cos x}{\sin x+\cos x}\,dx=\int_{0}^{\pi/2}1\,dx=\frac{\pi}{2},$$
> so $I=\dfrac{\pi}{4}$.

### Type 3: differentiating a variable-limit integral

**How it's asked.** Differentiate an integral with a variable upper or lower limit, or use it to compute a $\frac00$ limit.

**Method.** Apply the variable-limit differentiation formula directly:
$$\frac{d}{dx}\int_{a}^{x}f(t)\,dt=f(x),\qquad \frac{d}{dx}\int_{a}^{\varphi(x)}f(t)\,dt=f(\varphi(x))\varphi'(x).$$
When a $\frac00$ limit has a variable-limit integral on top, this pairs naturally with L'Hôpital's rule.

**Formulas & sources.** The first part of the fundamental theorem of calculus (discovered independently by **I. Newton** and **G. Leibniz**; the rigorous limit language was supplied later by **A.-L. Cauchy**). See [g3] Integration.

**Example 3.** Evaluate $\displaystyle\lim_{x\to0}\frac{\int_{0}^{x}\sin t^{2}\,dt}{x^{3}}$.

> **Solution.** This is a $\frac00$ form; use L'Hôpital. Differentiating the top in $x$ gives $\sin x^{2}$ (variable-limit differentiation), and the bottom gives $3x^{2}$:
> $$\lim_{x\to0}\frac{\int_{0}^{x}\sin t^{2}\,dt}{x^{3}}=\lim_{x\to0}\frac{\sin x^{2}}{3x^{2}}=\frac13,$$
> where the last step used $\sin x^{2}\sim x^{2}$ as $x\to0$. Hence the limit is $\dfrac13$.

### Type 4: improper integrals

**How it's asked.** Decide whether an improper integral converges or diverges, and evaluate it when it converges.

**Method.** For an infinite limit take $\int_{a}^{\infty}f\,dx=\lim_{b\to\infty}\int_{a}^{b}f\,dx$; for a singular integral (integrand unbounded at an endpoint) take the limit at the singular point. Benchmark results: $\int_{1}^{\infty}\frac{dx}{x^{p}}$ converges precisely when $p>1$; $\int_{0}^{1}\frac{dx}{x^{p}}$ converges precisely when $p<1$.

**Formulas & sources.** Improper integrals are defined by a limit (**A.-L. Cauchy**); the $p$-integral test above is the most-used comparison benchmark. See [g3] Integration.

**Example 4.** Evaluate $\displaystyle\int_{0}^{\infty}x e^{-x}\,dx$.

> **Solution.** Integrate by parts with $u=x,\ dv=e^{-x}\,dx$, so $v=-e^{-x}$:
> $$\int_{0}^{\infty}xe^{-x}\,dx=\bigl[-xe^{-x}\bigr]_{0}^{\infty}+\int_{0}^{\infty}e^{-x}\,dx=0+\bigl[-e^{-x}\bigr]_{0}^{\infty}=1.$$
> The integral converges, with value $1$.

### Type 5: geometric applications

**How it's asked.** Find the area of a plane region, the volume of a solid of revolution, or the arc length of a curve.

**Method.** Apply the element-of-integration formulas:

- **Area** $S=\int_{a}^{b}(y_{2}-y_{1})\,dx$, where $y_{2}$ is the upper curve and $y_{1}$ the lower;
- **Volume about the $x$-axis** $V_{x}=\pi\int_{a}^{b}y^{2}\,dx$;
- **Volume about the $y$-axis (cylindrical shells)** $V_{y}=2\pi\int_{a}^{b}x\,y\,dx$;
- **Arc length** $L=\int_{a}^{b}\sqrt{1+y'^{2}}\,dx$.

**Formulas & sources.** All of these are derived from the definite integral as a limit of Riemann sums via the "element" method (**B. Riemann**); the shell method is just a different way of slicing the same volume. See [g3] Integration.

**Example 5.** Find the area of the region enclosed by $y=x^{2}$ and $y=x$.

> **Solution.** The curves meet at $x=0$ and $x=1$, and on $[0,1]$ we have $x\ge x^{2}$, so the upper curve is $y=x$:
> $$S=\int_{0}^{1}(x-x^{2})\,dx=\Bigl[\frac{x^{2}}{2}-\frac{x^{3}}{3}\Bigr]_{0}^{1}=\frac12-\frac13=\frac16.$$

### Type 6: series convergence and power-series sums

**How it's asked.** Decide whether a numerical series converges; find the domain of convergence or the sum function of a power series.

**Method.** For positive-term series use the comparison, ratio, root, or integral test; for alternating series use the Leibniz test. A power series has radius of convergence $R=1/\lim_{n\to\infty}\bigl|\frac{a_{n+1}}{a_{n}}\bigr|$, and its sum function is usually found by differentiating or integrating term by term, reducing to the geometric series $\sum x^{n}=\frac{1}{1-x}$.

**Formulas & sources.**

- **Ratio test** (**J. d'Alembert**, 1768) and **root test** (**A.-L. Cauchy**, 1821): for a positive-term series $\sum a_{n}$, if $\lim\frac{a_{n+1}}{a_{n}}$ (or $\lim\sqrt[n]{a_{n}}$) $<1$ it converges, $>1$ it diverges.
- **Leibniz test** (**G. Leibniz**): an alternating series converges if its terms decrease monotonically to zero.
- The **radius of convergence** is given by the **Cauchy–Hadamard formula** (**A.-L. Cauchy** 1821 / **J. Hadamard** 1888), and convergence at the endpoints rests on **Abel's theorem** (**N. Abel**): $$R=\Bigl(\lim_{n\to\infty}\bigl|\tfrac{a_{n+1}}{a_{n}}\bigr|\Bigr)^{-1}.$$

See [g4] Infinite Series.

**Example 6.** Find the sum function of the power series $\displaystyle\sum_{n=1}^{\infty}n x^{n-1}$ for $|x|<1$.

> **Solution.** From the geometric series $\sum_{n=1}^{\infty}x^{n}=\dfrac{x}{1-x}$ (for $|x|<1$), differentiate term by term:
> $$\sum_{n=1}^{\infty}n x^{n-1}=\frac{d}{dx}\Bigl(\frac{x}{1-x}\Bigr)=\frac{1}{(1-x)^{2}}.$$

## Exercises

1. Evaluate $\displaystyle\int\frac{dx}{x^{2}+2x+2}$.
2. Evaluate $\displaystyle\int_{0}^{1}x e^{x}\,dx$.
3. Evaluate $\displaystyle\int_{-\pi/2}^{\pi/2}(x^{2}\sin x+\cos x)\,dx$.
4. Decide the convergence of $\displaystyle\int_{1}^{\infty}\frac{dx}{x\sqrt{x}}$ and evaluate it.
5. Find the volume of the solid obtained by rotating the region bounded by $y=\sqrt{x}$, the $x$-axis, and the line $x=4$ about the $x$-axis.
6. Decide the convergence of the series $\displaystyle\sum_{n=1}^{\infty}\frac{2^{n}}{n!}$.

**Answers.**
1) Complete the square $x^{2}+2x+2=(x+1)^{2}+1$, so $\int\frac{dx}{(x+1)^{2}+1}=\arctan(x+1)+C$.
2) By parts, $\int_{0}^{1}xe^{x}\,dx=\bigl[(x-1)e^{x}\bigr]_{0}^{1}=0-(-1)=1$.
3) $x^{2}\sin x$ is odd, so its integral over the symmetric interval is $0$; the rest is $\int_{-\pi/2}^{\pi/2}\cos x\,dx=2\int_{0}^{\pi/2}\cos x\,dx=2$.
4) $\int_{1}^{\infty}x^{-3/2}\,dx=\bigl[-2x^{-1/2}\bigr]_{1}^{\infty}=2$, so it converges, with value $2$.
5) $V=\pi\int_{0}^{4}(\sqrt{x})^{2}\,dx=\pi\int_{0}^{4}x\,dx=8\pi$.
6) The ratio $\frac{a_{n+1}}{a_{n}}=\frac{2}{n+1}\to0<1$, so by the ratio test the series converges.
