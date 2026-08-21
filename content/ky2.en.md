## Overview

Mean-value theorems and the applications of the derivative form a core block of calculus (Papers I, II and III). The **mean-value-theorem proofs** have always been the long-answer questions that spread scores the widest, while the **applications of the derivative** (monotonicity, extrema, concavity, asymptotes, roots of an equation) are regulars in every section. What they test is not memorized formulas but two kinds of judgment: for a proof you must **read the required derivative relation backwards into an auxiliary function**, and for an application you must **differentiate first to fix a sign, then read off the geometry**. This chapter organizes the block into six question types and **cites the source of every theorem** — both the historical origin (Fermat, Rolle, Lagrange, Cauchy, Taylor) and the matching chapter on this site, so you can trace the principle back.

> **The method in one line.** For a proof, first think "which derivative relation must I show → work backwards to the auxiliary function"; for an application, differentiate first and fix the sign of $f'$.

## Question Types

### Type 1: the derivative definition and differentiability

**How it's asked.** Differentiate from the definition; decide whether a piecewise function is differentiable at a junction; recognize the derivative definition hidden inside the limit of an abstract function.

**Method.**

- Differentiable $\Longleftrightarrow$ the left and right derivatives both exist and are equal;
- compute from the definition $\displaystyle f'(x_0)=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}$;
- keep the implication in mind: differentiable $\Rightarrow$ continuous, but not conversely (continuous need not be differentiable).

**Formulas & sources.** The derivative definition above and the implication "differentiable $\Rightarrow$ continuous" both trace back to the calculus created independently by **I. Newton** and **G. W. Leibniz** (17th century), while the rigorous treatment of the underlying limit was completed by **A.-L. Cauchy** (*Cours d'analyse*, 1821). See the chapter [g2] Derivatives & Differentials.

**Example 1.** Let
$$f(x)=\begin{cases} x^{2}\sin\dfrac{1}{x}, & x\ne0,\\ 0, & x=0,\end{cases}$$
prove from the definition that $f$ is differentiable at $x=0$ and find $f'(0)$.

> **Solution.** By the definition,
> $$f'(0)=\lim_{x\to0}\frac{f(x)-f(0)}{x-0}=\lim_{x\to0}\frac{x^{2}\sin(1/x)}{x}=\lim_{x\to0}x\sin\frac1x.$$
> Since $\bigl|x\sin\frac1x\bigr|\le|x|\to0$, the squeeze theorem gives the limit $0$. Hence $f$ is differentiable at $x=0$ with $f'(0)=0$.

### Type 2: mean-value-theorem proofs and auxiliary functions

**How it's asked.** Prove that there exists a $\xi$ making some equation involving $f'(\xi)$ hold.

**Method.** Rolle's theorem is the workhorse — build an auxiliary function $F$ with $F(a)=F(b)$, then apply Rolle to obtain $F'(\xi)=0$. Common templates:

1. To prove a relation of the form $f'(\xi)+g(\xi)f(\xi)=0$, take $F(x)=f(x)e^{\int g(x)\,dx}$;
2. For $\xi f'(\xi)+f(\xi)$, take $F(x)=xf(x)$.

**Formulas & sources.** Behind this type sits a whole family of mean-value theorems: Fermat's lemma (**P. de Fermat**, c. 1637) gives the necessary condition for an extremum; Rolle's theorem (**M. Rolle**, 1691), the Lagrange mean-value theorem (**J.-L. Lagrange**, 1797) and the Cauchy mean-value theorem (**A.-L. Cauchy**, 1823) generalize it in turn; and Taylor's theorem (**B. Taylor**, 1715) supplies the higher-order approximation. See the chapter [g2] Derivatives & Differentials.

**Example 2.** Let $f$ be continuous on $[0,1]$ and differentiable on $(0,1)$ with $f(1)=0$. Prove there exists $\xi\in(0,1)$ such that $\xi f'(\xi)+f(\xi)=0$.

> **Solution.** Notice that $\xi f'(\xi)+f(\xi)$ is exactly the value of $\bigl(xf(x)\bigr)'$ at $\xi$, so set
> $$F(x)=xf(x).$$
> Then $F(0)=0$, $F(1)=1\cdot f(1)=0$, and $F$ is continuous on $[0,1]$ and differentiable on $(0,1)$. By **Rolle's theorem** there is a $\xi\in(0,1)$ with
> $$F'(\xi)=f(\xi)+\xi f'(\xi)=0,$$
> that is, $\xi f'(\xi)+f(\xi)=0$.

### Type 3: four ways to prove an inequality

**How it's asked.** Prove a functional inequality on some interval.

**Method.** Four main lines:

1. **Monotonicity** — move everything to one side as $F(x)\ge0$, show $F'$ keeps one sign on the interval, and finish with the known endpoint value;
2. **Mean-value theorem** — apply Lagrange's MVT to the difference $f(b)-f(a)$, then bound $f'(\xi)$;
3. **Taylor's formula** — expand to first order with the **Lagrange remainder** and let the remainder's sign fix the inequality;
4. **Concavity** — use Jensen's inequality.

**Formulas & sources.** The monotonicity test is a corollary of the Lagrange mean-value theorem (**J.-L. Lagrange**, 1797); the Lagrange form of the Taylor remainder is likewise due to **Lagrange**. See the chapters [g2] Derivatives & Differentials and [g4] Infinite Series.

**Example 3.** Prove that $\ln(1+x)<x$ for $x>0$.

> **Solution.** Let $F(x)=x-\ln(1+x)$. Then $F(0)=0$, and for $x>0$
> $$F'(x)=1-\frac{1}{1+x}=\frac{x}{1+x}>0.$$
> So $F$ is strictly increasing on $[0,+\infty)$, hence $F(x)>F(0)=0$ for $x>0$, i.e. $\ln(1+x)<x$.

### Type 4: monotonicity, extrema and global extrema

**How it's asked.** Find intervals of monotonicity, local extrema, or the maximum and minimum on a closed interval.

**Method.**

- $f'>0$ gives increasing, $f'<0$ gives decreasing;
- the candidate extrema are the **stationary points** ($f'=0$) and the **points of non-differentiability**; test them with the **first sufficient condition** ($f'$ changes sign across the point) or the **second sufficient condition** (the sign of $f''$);
- for a closed interval, compare the values of $f$ at every candidate and at the two endpoints, and take the largest and the smallest.

**Formulas & sources.** The necessary condition $f'(x_0)=0$ for an extremum comes from Fermat's lemma (**P. de Fermat**, c. 1637); the monotonicity test is a corollary of the Lagrange mean-value theorem. See the chapter [g2] Derivatives & Differentials.

**Example 4.** Find the local maximum and minimum of $f(x)=2x^{3}-9x^{2}+12x$.

> **Solution.** Differentiate and factor:
> $$f'(x)=6x^{2}-18x+12=6(x-1)(x-2).$$
> The stationary points are $x=1,2$. Signs: $f'>0$ for $x<1$, $f'<0$ for $1<x<2$, $f'>0$ for $x>2$. So $f$ has a **local maximum** at $x=1$,
> $$f(1)=2-9+12=5,$$
> and a **local minimum** at $x=2$,
> $$f(2)=16-36+24=4.$$

### Type 5: concavity, inflection points, asymptotes and curve sketching

**How it's asked.** Find intervals of concavity, inflection points, asymptotes of every kind, or produce a full sketch.

**Method.**

- **Concavity**: $f''>0$ means concave up, $f''<0$ means concave down; an **inflection point** occurs where $f''$ changes sign.
- **Asymptotes**: vertical — $\lim_{x\to x_0}f(x)=\infty$ gives $x=x_0$; horizontal — $\lim_{x\to\infty}f(x)=b$ gives $y=b$; oblique — $y=ax+b$ with
$$a=\lim_{x\to\infty}\frac{f(x)}{x},\qquad b=\lim_{x\to\infty}\bigl(f(x)-ax\bigr).$$

**Formulas & sources.** The second-derivative test for concavity and the limit definition of asymptotes are standard results of differential calculus. See the chapters [g2] Derivatives & Differentials and [g1] Limits & Continuity.

**Example 5.** Find the asymptotes of the curve $f(x)=\dfrac{x^{2}}{x-1}$.

> **Solution.** The denominator vanishes at $x=1$, and $\displaystyle\lim_{x\to1}\frac{x^{2}}{x-1}=\infty$, so there is a **vertical asymptote** $x=1$. For the **oblique asymptote** $y=ax+b$:
> $$a=\lim_{x\to\infty}\frac{x^{2}}{x(x-1)}=1,\qquad b=\lim_{x\to\infty}\Bigl(\frac{x^{2}}{x-1}-x\Bigr)=\lim_{x\to\infty}\frac{x}{x-1}=1.$$
> Hence the oblique asymptote is $y=x+1$.

### Type 6: counting the roots of an equation

**How it's asked.** Discuss the number of real roots of an equation (often with a parameter).

**Method.** For **existence**, use the zero (intermediate-value) theorem; for **uniqueness or the count**, use monotonicity or Rolle's theorem (between two roots there must be a zero of $f'$). Or combine algebra with geometry, writing the equation as the intersection of two curves.

**Formulas & sources.** The intermediate-value (zero) theorem was proved rigorously by **B. Bolzano** (1817); Rolle's theorem is due to **M. Rolle** (1691). See the chapters [g1] Limits & Continuity and [g2] Derivatives & Differentials.

**Example 6.** Discuss the number of real roots of $x^{3}-3x+k=0$ according to the parameter $k$.

> **Solution.** Let $f(x)=x^{3}-3x+k$. Then
> $$f'(x)=3x^{2}-3=3(x-1)(x+1),$$
> with stationary points $x=-1,1$. The **local maximum** is $f(-1)=-1+3+k=k+2$ and the **local minimum** is $f(1)=1-3+k=k-2$. When the maximum is $>0$ and the minimum is $<0$, i.e. $-2<k<2$, there are **three** distinct real roots; when $k=2$ or $k=-2$ there are **two** real roots (one of them a double root); when $|k|>2$ there is only **one** real root.

## Exercises

1. Use the definition to find the derivative of $f(x)=x|x|$ at $x=0$.
2. Prove that $e^{x}>1+x+\dfrac{x^{2}}{2}$ for $x>0$.
3. Prove that the equation $x^{5}+x-1=0$ has exactly one real root.
4. Find the local maximum and minimum of $f(x)=x^{3}-6x^{2}+9x$.
5. Find the asymptotes of the curve $y=\dfrac{x^{2}+1}{x}$.
6. Find the intervals of monotonicity, the extrema, the intervals of concavity and the inflection point of $f(x)=xe^{-x}$.

**Answers.**
1) $\displaystyle f'(0)=\lim_{x\to0}\frac{x|x|}{x}=\lim_{x\to0}|x|=0$.
2) Let $F(x)=e^{x}-1-x-\frac{x^{2}}{2}$. Then $F(0)=0$ and $F'(x)=e^{x}-1-x$; since $F'(0)=0$ and $F''(x)=e^{x}-1>0$ for $x>0$, $F'$ increases so $F'>0$, hence $F$ increases and $F(x)>0$, i.e. $e^{x}>1+x+\frac{x^{2}}{2}$.
3) $f(x)=x^{5}+x-1$ is continuous with $f(0)=-1<0$ and $f(1)=1>0$, so a root exists by the zero theorem; and $f'(x)=5x^{4}+1>0$ makes $f$ strictly increasing, so the root is unique.
4) $f'(x)=3x^{2}-12x+9=3(x-1)(x-3)$, giving local maximum $f(1)=4$ and local minimum $f(3)=0$.
5) $y=x+\dfrac{1}{x}$, so the vertical asymptote is $x=0$ and the oblique asymptote is $y=x$.
6) $f'(x)=(1-x)e^{-x}$: increasing on $(-\infty,1)$, decreasing on $(1,+\infty)$, local maximum $f(1)=1/e$; $f''(x)=(x-2)e^{-x}$: concave down on $(-\infty,2)$, concave up on $(2,+\infty)$, inflection point $(2,2e^{-2})$.
