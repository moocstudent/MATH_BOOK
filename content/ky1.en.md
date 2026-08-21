## Overview

Computing limits is the immovable first topic of the postgraduate entrance exam (Papers I, II and III): it is almost guaranteed in the multiple-choice and fill-in sections, and often opens or closes a long-answer problem. What it really tests is not one formula but the judgment to **first classify, then choose a method**. This chapter organizes limits into seven methods and five question types, and for each method **cites the source of the theorem or axiom it relies on** — the historical origin plus the matching chapter on this site, so you can trace the principle back.

> **The method in one line.** Facing a limit, ask three things: (1) which indeterminate form is it ($\frac00,\frac\infty\infty,\infty-\infty,0\cdot\infty,1^\infty,\infty^0,0^0$)? (2) can it be simplified first (common denominator, rationalize, factor out)? (3) should you reach for equivalents, Taylor, or L'Hôpital?

## Question Types

### Type 1: the seven limit techniques

**How it's asked.** Evaluate $\displaystyle\lim_{x\to a} f(x)$ or $\displaystyle\lim_{n\to\infty} x_n$, where the expression is some indeterminate form.

**Method.** The seven workhorse methods, easiest first:

1. **Substitution + limit laws** — plug in directly when it is not indeterminate;
2. **Algebraic manipulation** — common denominator, rationalizing (multiply by the conjugate), dividing by the highest power ("keep the dominant term");
3. **The two standard limits** — see Type 2;
4. **Equivalent infinitesimals** — see Type 3;
5. **L'Hôpital's rule** — differentiate top and bottom for $\frac00$ or $\frac\infty\infty$;
6. **Taylor's formula** — safest when a subtraction causes cancellation, see Type 3;
7. **Squeeze theorem / monotone-bounded criterion / definite-integral definition** — the go-to tools for sequences and $n$-term sums.

**Formulas & sources.**

- **The $\varepsilon\text{–}\delta$ definition of a limit and the limit laws**: the rigorous language of limits was introduced by **A.-L. Cauchy** (*Cours d'analyse*, 1821) and finalized in $\varepsilon\text{–}\delta$ form by **K. Weierstrass** (1860s). See the chapter [g1] Limits & Continuity.
- **L'Hôpital's rule** $\displaystyle\lim\frac{f}{g}=\lim\frac{f'}{g'}$: first appeared in **G. de l'Hôpital**'s textbook *Analyse des infiniment petits* (1696); the result is actually due to his teacher **Johann Bernoulli**. Always check the form is $\frac00$ or $\frac\infty\infty$ before applying. The principle is in [g2] Derivatives & Differentials.

**Example 1.** Evaluate $\displaystyle\lim_{x\to 0}\frac{\tan x-\sin x}{x^{3}}$.

> **Solution.** Simplify first, then use equivalents (allowed on factors in a product):
> $$\tan x-\sin x=\sin x\Bigl(\frac{1}{\cos x}-1\Bigr)=\sin x\cdot\frac{1-\cos x}{\cos x}.$$
> As $x\to0$: $\sin x\sim x$, $1-\cos x\sim\dfrac{x^{2}}{2}$, $\cos x\to1$, so the numerator $\sim x\cdot\dfrac{x^{2}}{2}=\dfrac{x^{3}}{2}$, giving
> $$\lim_{x\to0}\frac{\tan x-\sin x}{x^{3}}=\frac12.$$

**Example 2.** Evaluate $\displaystyle\lim_{n\to\infty}\sum_{k=1}^{n}\frac{n}{n^{2}+k}$ (squeeze theorem).

> **Solution.** Bound each of the $n$ terms by taking the largest and smallest denominator:
> $$\sum_{k=1}^{n}\frac{n}{n^{2}+n}\ \le\ \sum_{k=1}^{n}\frac{n}{n^{2}+k}\ \le\ \sum_{k=1}^{n}\frac{n}{n^{2}+1}.$$
> The left side $=\dfrac{n\cdot n}{n^{2}+n}=\dfrac{n^{2}}{n^{2}+n}\to1$ and the right side $=\dfrac{n^{2}}{n^{2}+1}\to1$. By the **squeeze theorem** (its idea goes back to Archimedes' method of exhaustion; the modern form is in Cauchy), the limit is $1$.

### Type 2: $1^{\infty}$ forms and the two standard limits

**How it's asked.** Evaluate $\displaystyle\lim\, [\,f(x)\,]^{\,g(x)}$ where the base $f\to1$ and the exponent $g\to\infty$.

**Method.** **Match the second standard limit**, or **exponentiate**. Fastest is the "$1^\infty$ three-step to $e$": if $f\to1$ and $g\to\infty$, then
$$\lim f^{g}=\exp\Bigl(\lim g\,(f-1)\Bigr).$$
The safe general route is $f^{g}=e^{\,g\ln f}$: move the power into the exponent and evaluate $\lim g\ln f$.

**Formulas & sources.**

- **The two standard limits**
$$\lim_{x\to0}\frac{\sin x}{x}=1,\qquad \lim_{x\to\infty}\Bigl(1+\frac1x\Bigr)^{x}=e.$$
The first follows from **squeezing areas/arcs on the unit circle**; the second grew out of **Jacob Bernoulli**'s work on compound interest (1683), and the constant $e$ and its notation were fixed by **L. Euler** (*Introductio in analysin infinitorum*, 1748). See [g1] Limits & Continuity and [h1] Exponentials & Logarithms.
- **The power identity** $u^{v}=e^{v\ln u}$ ($u>0$), which rests on the continuity of the exponential (limits may pass through it); see [h1] Exponentials & Logarithms.

**Example 3.** Evaluate $\displaystyle\lim_{x\to0}(\cos x)^{1/x^{2}}$.

> **Solution.** Exponentiate: $(\cos x)^{1/x^{2}}=\exp\!\Bigl(\dfrac{\ln\cos x}{x^{2}}\Bigr)$. Now $\ln\cos x=\ln\bigl(1+(\cos x-1)\bigr)\sim\cos x-1\sim-\dfrac{x^{2}}{2}$, so the exponent $\to-\dfrac12$, and
> $$\lim_{x\to0}(\cos x)^{1/x^{2}}=e^{-1/2}.$$

### Type 3: equivalents and Taylor expansion

**How it's asked.** A $\frac00$ form containing $\sin x,\tan x,\ln(1+x),e^{x}-1,1-\cos x$, etc.

**Method.** Equivalents may replace factors in a **product or quotient** freely; in a **sum or difference** where cancellation occurs, a replacement loses precision — switch to **Taylor's formula** and expand to the lowest order that survives the cancellation.

**Formulas & sources.**

- **Standard equivalents ($x\to0$)**
$$\sin x\sim x,\quad \tan x\sim x,\quad \arcsin x\sim x,\quad \arctan x\sim x,$$
$$1-\cos x\sim\frac{x^{2}}{2},\quad e^{x}-1\sim x,\quad \ln(1+x)\sim x,\quad (1+x)^{a}-1\sim a x.$$
Every one is the **leading term of a Taylor/Maclaurin expansion**, due to **B. Taylor** (*Methodus Incrementorum*, 1715) and **C. Maclaurin** (*Treatise of Fluxions*, 1742). The expansion principle is in [g4] Infinite Series.

**Example 4.** Evaluate $\displaystyle\lim_{x\to0}\frac{e^{x}-1-x}{x^{2}}$.

> **Solution.** The numerator is "$e^x$ minus its first-order approximation", so equivalents no longer suffice — use **Taylor**: $e^{x}=1+x+\dfrac{x^{2}}{2}+o(x^{2})$, hence the numerator $=\dfrac{x^{2}}{2}+o(x^{2})$ and
> $$\lim_{x\to0}\frac{e^{x}-1-x}{x^{2}}=\frac12.$$

### Type 4: comparing orders of infinitesimals and finding parameters

**How it's asked.** Compare the orders of two infinitesimals; or find constants $a,b,k$ making a limit **finite and nonzero** (or equal to a given value).

**Method.** Expand everything with **Taylor** and align powers of $x$: make the lowest power of the numerator match the denominator and equate coefficients to solve for the unknown constants. The **order** of infinitesimals $\alpha,\beta$ is read off $\lim\dfrac{\alpha}{\beta}$: $0$ (higher order), a nonzero constant (same order), $1$ (equivalent).

**Formulas & sources.** The comparison of infinitesimals and their orders was set up systematically by **Cauchy** (1821); the expansions used are those of Type 3, resting on Taylor–Maclaurin. See [g1] Limits & Continuity and [g4] Infinite Series.

**Example 5.** Suppose $\displaystyle\lim_{x\to0}\frac{\ln(1+x)-x}{x^{k}}=c$ with $c$ a nonzero constant. Find $k$ and $c$.

> **Solution.** Expand $\ln(1+x)=x-\dfrac{x^{2}}{2}+\dfrac{x^{3}}{3}-\cdots$, so
> $$\ln(1+x)-x=-\frac{x^{2}}{2}+o(x^{2}).$$
> For a finite nonzero limit the denominator must match the numerator's order, i.e. $k=2$, and then
> $$c=\lim_{x\to0}\frac{-x^{2}/2+o(x^{2})}{x^{2}}=-\frac12.$$
> Hence $k=2,\ c=-\dfrac12$.

### Type 5: continuity and classifying discontinuities

**How it's asked.** Decide whether a piecewise function is continuous at a junction; find and **classify** a function's discontinuities.

**Method.** Continuity means $\displaystyle\lim_{x\to x_{0}}f(x)=f(x_{0})$ (all three exist and agree). Discontinuities are classified by the **one-sided limits**:

- **First kind** (both one-sided limits exist): equal but $\ne f(x_0)$, or $f$ undefined → **removable**; unequal → **jump**;
- **Second kind** (at least one one-sided limit fails to exist): tends to $\infty$ → **infinite**; oscillates → **oscillatory**.

**Formulas & sources.** The rigorous definition of continuity is due to **B. Bolzano** (1817) and **Cauchy** (1821); the classification above is an immediate consequence. See [g1] Limits & Continuity.

**Example 6.** Find and classify the discontinuities of $\displaystyle f(x)=\frac{x^{2}-1}{x^{2}-3x+2}$.

> **Solution.** The denominator $x^{2}-3x+2=(x-1)(x-2)$, so $f$ is undefined at $x=1,2$ — the only discontinuities. Factor:
> $$f(x)=\frac{(x-1)(x+1)}{(x-1)(x-2)}=\frac{x+1}{x-2}\quad(x\ne1).$$
> - At $x=1$: $\displaystyle\lim_{x\to1}f(x)=\frac{2}{-1}=-2$ (the limit exists) but $f(1)$ is undefined, so it is a **removable** discontinuity (first kind).
> - At $x=2$: $\displaystyle\lim_{x\to2}f(x)=\infty$, so it is an **infinite** discontinuity (second kind).

## Exercises

1. Evaluate $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x\sin x}$.
2. Evaluate $\displaystyle\lim_{x\to\infty}\Bigl(\frac{x+1}{x-1}\Bigr)^{x}$.
3. Evaluate $\displaystyle\lim_{x\to0}\frac{\sqrt{1+x}-\sqrt{1-x}}{x}$.
4. Evaluate $\displaystyle\lim_{x\to0}\frac{x-\sin x}{x^{3}}$.
5. Suppose $\displaystyle\lim_{x\to0}\frac{\sin x-x\cos x}{x^{k}}=c$ with $c\ne0$. Find $k$ and $c$.
6. Classify the discontinuity of $f(x)=2^{1/x}$ at $x=0$.

**Answers.**
1) $1-\cos x\sim\frac{x^{2}}{2}$ and $x\sin x\sim x^{2}$, so the limit is $\frac12$.
2) $\bigl(1+\frac{2}{x-1}\bigr)^{x}$; taking logs, $x\ln\bigl(1+\frac{2}{x-1}\bigr)\sim x\cdot\frac{2}{x-1}\to2$, so the limit is $e^{2}$.
3) Rationalize, or use $(1+x)^{1/2}-1\sim\frac{x}{2}$: $\sqrt{1+x}-\sqrt{1-x}\sim\frac{x}{2}-(-\frac{x}{2})=x$, so the limit is $1$.
4) Taylor $\sin x=x-\frac{x^{3}}{6}+o(x^{3})$, so $x-\sin x=\frac{x^{3}}{6}+o(x^{3})$ and the limit is $\frac16$.
5) With $\sin x=x-\frac{x^{3}}{6}+o(x^3)$ and $x\cos x=x-\frac{x^{3}}{2}+o(x^3)$, the difference is $\sin x-x\cos x=\frac{x^{3}}{3}+o(x^{3})$, so $k=3,\ c=\frac13$.
6) As $x\to0^{+}$, $2^{1/x}\to+\infty$; as $x\to0^{-}$, $2^{1/x}\to0$. The right-hand limit is infinite, so $x=0$ is a **second-kind (infinite)** discontinuity.
