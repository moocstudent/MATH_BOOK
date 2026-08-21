## Overview

Differential equations are a core chapter of the postgraduate entrance exam, tested on all three papers (Papers I, II and III): they push the fact that **the unknown is a function** to center stage, appearing in the multiple-choice and fill-in sections and often anchoring a long-answer problem. What they test is not one memorized formula for the general solution but the judgment to **first classify, then apply the matching method** — the same $y'$ is solved differently as separable, homogeneous, linear, or Bernoulli. This chapter organizes ordinary differential equations into six question types, and for each method **cites the source of the method or theorem it relies on** — the historical origin plus the matching chapter on this site, so you can trace the principle back.

> **The method in one line.** Facing an equation, first fix its **order** and whether it is **linear**: for first order, identify the type (separable / homogeneous / first-order linear / Bernoulli) and pick the matching solver; for second-order constant-coefficient equations, write the **characteristic equation** first, read off the three root cases for the homogeneous part, then add one particular solution on top.

## Question Types

### Type 1: recognizing and solving first-order equations

**How it's asked.** Find the general solution of a first-order equation $y'=g(x,y)$, or the particular solution meeting an initial condition $y(x_0)=y_0$.

**Method.** The method for a first-order equation is decided entirely by its **type**; identify it first, then treat it accordingly:

1. **Separable** $\frac{dy}{dx}=f(x)g(y)$ — move each variable to its own side and integrate both sides;
2. **Homogeneous** $\frac{dy}{dx}=f(y/x)$ — set $u=y/x$ (i.e. $y=ux$) to reduce it to separable form;
3. **First-order linear** $y'+P(x)y=Q(x)$ — multiply by the integrating factor $e^{\int P\,dx}$, making the left side an exact derivative before integrating;
4. **Bernoulli** $y'+Py=Qy^{n}$ ($n\ne0,1$) — divide by $y^{n}$ and substitute $z=y^{1-n}$ to linearize.

**Formulas & sources.**

- **Separation of variables and the integrating factor**: separating variables is as old as calculus itself; the **integrating factor** $e^{\int P\,dx}$ for first-order linear equations was developed by **G. Leibniz** and **L. Euler**. See [o1] First-Order ODEs.
- **The Bernoulli equation** $y'+Py=Qy^{n}$: posed by **Jakob Bernoulli** (1695), it becomes first-order linear under the substitution $z=y^{1-n}$. See [o1] First-Order ODEs.

**Example 1.** Find the general solution of $y'=2xy$.

> **Solution.** This is separable. Separate the variables:
> $$\frac{dy}{y}=2x\,dx.$$
> Integrating gives $\ln|y|=x^{2}+C_{1}$, so the general solution is
> $$y=Ce^{x^{2}}.$$
> Check: $y'=Ce^{x^{2}}\cdot2x=2xy$, matching the original equation.

### Type 2: reducible higher-order equations

**How it's asked.** Find the general solution of a higher-order equation $y''=f(\cdots)$ in which either $y$ or $x$ is missing.

**Method.** Use a substitution to lower "second order" to "first order":

- $y''=f(x)$ (right side involves $x$ only): integrate twice with respect to $x$;
- $y''=f(x,y')$ ($y$ absent): set $p=y'$, so $y''=p'$, reducing to a first-order equation in $p$;
- $y''=f(y,y')$ ($x$ absent): set $p=y'$ and treat $y$ as the independent variable, so $y''=p\dfrac{dp}{dy}$, reducing to a first-order equation in $p(y)$.

**Formulas & sources.** The substitution $p=y'$ lowers a higher-order equation to a lower-order one — the general device for reducible equations. See [o2] Higher-Order Linear ODEs.

**Example 2.** Find the general solution of $xy''=y'$.

> **Solution.** Here $y$ is missing, so set $p=y'$, giving $y''=p'$ and $xp'=p$, i.e.
> $$\frac{dp}{p}=\frac{dx}{x}.$$
> Integrating gives $\ln|p|=\ln|x|+C$, so $p=C_{1}x$. Integrating again,
> $$y=\int C_{1}x\,dx=C_{1}\frac{x^{2}}{2}+C_{2}=\tilde C_{1}x^{2}+C_{2}.$$
> Check: $y'=2\tilde C_{1}x$ and $y''=2\tilde C_{1}$, so $xy''=2\tilde C_{1}x=y'$.

### Type 3: constant-coefficient homogeneous equations

**How it's asked.** Find the general solution of $y''+py'+qy=0$ with $p,q$ constant.

**Method.** Write the **characteristic equation** $r^{2}+pr+q=0$ and pick the general solution by its discriminant:

- **Distinct real roots** $r_{1}\ne r_{2}$: $y=C_{1}e^{r_{1}x}+C_{2}e^{r_{2}x}$;
- **Double real root** $r_{1}=r_{2}=r$: $y=(C_{1}+C_{2}x)e^{rx}$;
- **Complex conjugate roots** $\alpha\pm\beta i$: $y=e^{\alpha x}(C_{1}\cos\beta x+C_{2}\sin\beta x)$.

**Formulas & sources.** The characteristic-equation method was established by **L. Euler** (1743): the trial solution $y=e^{rx}$ turns a linear constant-coefficient equation into an algebraic one. See [o2] Higher-Order Linear ODEs.

**Example 3.** Find the general solution of $y''-5y'+6y=0$.

> **Solution.** The characteristic equation
> $$r^{2}-5r+6=(r-2)(r-3)=0$$
> has roots $r=2,3$ (distinct and real), so the general solution is
> $$y=C_{1}e^{2x}+C_{2}e^{3x}.$$

### Type 4: constant-coefficient non-homogeneous equations

**How it's asked.** Find the general solution of $y''+py'+qy=f(x)$, where $f(x)$ is of type $P_n(x)e^{\lambda x}$ or involves $\cos/\sin$.

**Method.** **General solution = homogeneous general solution + one particular solution.** Solve the homogeneous part first (Type 3), then find a particular solution by **undetermined coefficients**:

- $f(x)=P_{n}(x)e^{\lambda x}$: try $y^{*}=x^{k}Q_{n}(x)e^{\lambda x}$, where $Q_n$ is a degree-$n$ polynomial with unknown coefficients and $k$ is the multiplicity of $\lambda$ as a characteristic root ($k=0$ if not a root, $1$ if a simple root, $2$ if a double root);
- $f(x)$ containing $e^{\alpha x}\cos\beta x$ or $e^{\alpha x}\sin\beta x$: try a like-form solution in $\cos\beta x,\sin\beta x$, with $k$ set by whether $\alpha\pm\beta i$ is a characteristic root.

Substitute into the equation and match coefficients to pin down the unknowns.

**Formulas & sources.** The **superposition principle** for linear equations (every solution is the homogeneous general solution plus one particular solution) together with undetermined coefficients is the standard route for constant-coefficient non-homogeneous equations. See [o2] Higher-Order Linear ODEs.

**Example 4.** Find the general solution of $y''-y=e^{2x}$.

> **Solution.** The homogeneous characteristic equation $r^{2}-1=0$ has roots $r=\pm1$, so $y_{h}=C_{1}e^{x}+C_{2}e^{-x}$. Since $\lambda=2$ is not a characteristic root, try $y^{*}=Ae^{2x}$; substituting into $y''-y=e^{2x}$ and cancelling $e^{2x}$ gives $4A-A=1$, so $A=\tfrac13$. Hence
> $$y=C_{1}e^{x}+C_{2}e^{-x}+\tfrac13e^{2x}.$$

### Type 5: geometric and physical applications

**How it's asked.** Given the rule its slope (or some rate of change) obeys at each point, find the curve (or the motion/decay law); usually with one determining condition.

**Method.** Translate "slope / rate of change" word for word into a differential equation: "the slope of the tangent at $(x,y)$" is $y'$; "the rate of change is proportional to ..." is something like $\frac{dy}{dt}=ky$. Solve the resulting equation by its Type 1 class, then use the determining condition (initial value, or passing through a point) to fix the constant and get the particular solution.

**Formulas & sources.** Modeling geometric, mechanical, growth and decay phenomena with differential equations has been the general method since Newtonian mechanics. See [o1] First-Order ODEs.

**Example 5.** Find the curve through $(1,1)$ whose tangent at any point $(x,y)$ has slope $\frac{2y}{x}$.

> **Solution.** "Slope of the tangent" is $y'$, so
> $$y'=\frac{2y}{x}.$$
> This is separable: $\frac{dy}{y}=\frac{2\,dx}{x}$, and integrating gives $\ln|y|=2\ln|x|+C_{1}$, i.e. $y=Cx^{2}$. From $y(1)=1$ we get $C=1$, so the curve is
> $$y=x^{2}.$$

### Type 6: Euler equations and mixed problems

**How it's asked.** Find the general solution of an Euler equation $x^{2}y''+pxy'+qy=0$ ($x>0$), or of a problem combining several of the earlier methods.

**Method.** Two routes for an Euler equation:

- **Substitution**: set $x=e^{t}$ (i.e. $t=\ln x$), turning it into a constant-coefficient linear equation in $t$; solve by Types 3–4 and substitute back $t=\ln x$;
- **Trial solution**: try $y=x^{r}$ directly to get a characteristic equation in $r$; solving for $r$ gives the basic solutions (distinct real roots give $x^{r_1},x^{r_2}$; double and complex roots have their own forms).

**Formulas & sources.** The Euler (equidimensional) equation was studied by **L. Euler**; its variable coefficients are "straightened" into constant ones by the substitution. See [o2] Higher-Order Linear ODEs.

**Example 6.** Find the general solution of the Euler equation $x^{2}y''+xy'-y=0$ ($x>0$).

> **Solution.** Try $y=x^{r}$, so $y'=rx^{r-1}$ and $y''=r(r-1)x^{r-2}$; substituting and cancelling $x^{r}$,
> $$r(r-1)+r-1=r^{2}-1=0,$$
> with roots $r=\pm1$, so the general solution is
> $$y=C_{1}x+\frac{C_{2}}{x}.$$

## Exercises

1. Find the general solution of $y'=\frac{y}{x}$.
2. Find the general solution of $y'+y=e^{-x}$.
3. Find the general solution of $y''+y'=0$.
4. Find the general solution of $y''-4y=0$.
5. Find a particular solution of $y''+y=x$.
6. Find the curve through the origin whose tangent at $(x,y)$ has slope $x+y$.

**Answers.**
1) Separable: $\frac{dy}{y}=\frac{dx}{x}$, so $\ln|y|=\ln|x|+C_1$ and $y=Cx$.
2) First-order linear with integrating factor $e^{x}$: $(ye^{x})'=e^{x}e^{-x}=1$, so $ye^{x}=x+C$ and $y=(x+C)e^{-x}$.
3) Characteristic equation $r^{2}+r=0$ with roots $r=0,-1$, so $y=C_{1}+C_{2}e^{-x}$.
4) Characteristic equation $r^{2}-4=0$ with roots $r=\pm2$, so $y=C_{1}e^{2x}+C_{2}e^{-2x}$.
5) Try $y^{*}=ax+b$; then $(y^{*})''=0$ and $ax+b=x$, giving $a=1,b=0$, so $y^{*}=x$.
6) Here $y'=x+y$, i.e. $y'-y=x$; with integrating factor $e^{-x}$ the solution is $y=Ce^{x}-x-1$, and $y(0)=0$ gives $C=1$, so $y=e^{x}-x-1$.
