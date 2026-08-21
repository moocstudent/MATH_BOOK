## Overview

The first big block of linear algebra — examined on Papers I, II and III alike — is built on three threads: **determinants, matrices, and linear systems**. The multiple-choice and fill-in sections almost always carry one short determinant or rank item, and the long-answer problems often hinge on discussing a parametrized system.

What it tests is not arithmetic volume but **structural judgment**: can this determinant be triangularized, unfolded into a recurrence, or recognized as Vandermonde? How many solutions a system has comes down to comparing $r(A)$ with $r(A\mid b)$. This chapter organizes the block into five question types and, for every formula, **cites its historical source and the matching chapter on this site**, so you can trace each principle back.

> **The method in one line.** For a determinant, look for structure first: can it be triangularized, unfolded into a recurrence, or matched to Vandermonde? For a system, compute $r(A)$ and $r(A\mid b)$ first, then invoke the two theorems on existence and solution structure.

## Question Types

### Type 1: five determinant techniques

**How it's asked.** Evaluate an $n$-th order determinant (numeric or abstract), or prove a determinant equals a given expression.

**Method.** The five workhorse techniques:

1. **Reduce to upper-triangular** — use row operations, then the product of the diagonal entries is the determinant;
2. **Cofactor (Laplace) expansion** — expand along the row or column with the most zeros to lower the order;
3. **Recurrence** — for tridiagonal or "claw" determinants, derive a recurrence $D_n=aD_{n-1}+bD_{n-2}$ and solve it;
4. **Product of eigenvalues** — when the eigenvalues are known, $\det A=\prod_{i}\lambda_i$;
5. **Vandermonde and bordering** — recognize a Vandermonde structure and apply the formula, or add a border (raise the order) to reach a computable structure.

**Formulas & sources.**

- **The determinant and cofactor expansion**: the determinant was introduced independently by **G. Leibniz** (1693) and **Seki Takakazu** (1683); expansion along a row or column — the **Laplace expansion** — was systematized by **P.-S. Laplace** (1772). See [a1] Determinants.
- **The Vandermonde determinant**
$$\begin{vmatrix} 1 & 1 & \cdots & 1 \\ x_1 & x_2 & \cdots & x_n \\ \vdots & \vdots & & \vdots \\ x_1^{n-1} & x_2^{n-1} & \cdots & x_n^{n-1} \end{vmatrix}=\prod_{1\le i<j\le n}(x_j-x_i),$$
named after **A.-T. Vandermonde**; an upper-triangular determinant equals the product of its diagonal entries, which underlies the "reduce to triangular" method. See [a1] Determinants.

**Example 1.** Evaluate $\begin{vmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \\ 1 & 3 & 6 \end{vmatrix}$.

> **Solution.** Row operations $R_2-R_1,\ R_3-R_1$:
> $$\begin{vmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \\ 1 & 3 & 6 \end{vmatrix}=\begin{vmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \\ 0 & 2 & 5 \end{vmatrix}.$$
> Expand along the first column:
> $$=1\cdot\begin{vmatrix} 1 & 2 \\ 2 & 5 \end{vmatrix}=1\cdot(5-4)=1.$$

**Example 2.** Prove the Vandermonde determinant $\begin{vmatrix} 1 & 1 & 1 \\ a & b & c \\ a^{2} & b^{2} & c^{2} \end{vmatrix}=(b-a)(c-a)(c-b)$.

> **Solution.** Clear the first column from the bottom up: first $R_3-aR_2$, then $R_2-aR_1$,
> $$\begin{vmatrix} 1 & 1 & 1 \\ a & b & c \\ a^{2} & b^{2} & c^{2} \end{vmatrix}=\begin{vmatrix} 1 & 1 & 1 \\ 0 & b-a & c-a \\ 0 & b(b-a) & c(c-a) \end{vmatrix}.$$
> Expand along the first column, then factor $(b-a)$ and $(c-a)$ out of the two columns:
> $$=\begin{vmatrix} b-a & c-a \\ b(b-a) & c(c-a) \end{vmatrix}=(b-a)(c-a)\begin{vmatrix} 1 & 1 \\ b & c \end{vmatrix}=(b-a)(c-a)(c-b).$$
> This is the $3\times3$ case of the Vandermonde determinant $\prod_{i<j}(x_j-x_i)$.

### Type 2: matrix equations and inverses

**How it's asked.** Solve a matrix equation $AX=B$ (or $XA=B$, $AXB=C$); find an inverse $A^{-1}$.

**Method.** If $A$ is invertible, then $AX=B\Rightarrow X=A^{-1}B$, $XA=B\Rightarrow X=BA^{-1}$, and $AXB=C\Rightarrow X=A^{-1}CB^{-1}$ (the left/right positions must not be swapped). Two ways to invert: the **adjugate method** $A^{-1}=\frac{1}{\det A}A^{*}$ (for $2\times2$, "swap the main diagonal, negate the off-diagonal"); the **row-reduction method** $[\,A\mid I\,]\to[\,I\mid A^{-1}\,]$.

**Formulas & sources.**

- **The inverse and the adjugate**: they satisfy
$$AA^{*}=A^{*}A=\det A\cdot I,\qquad A^{-1}=\frac{1}{\det A}A^{*}\quad(\det A\ne0).$$
The systematic theory of matrices and their operations was laid down by **A. Cayley** (*A Memoir on the Theory of Matrices*, 1858). See [a2] Matrices & Operations.
- **The $2\times2$ inverse shortcut**: $\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1}=\frac{1}{ad-bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$, i.e. "swap the main diagonal, negate the off-diagonal". See [a2] Matrices & Operations.

**Example 3.** Find the inverse of $A=\begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix}$.

> **Solution.** $\det A=2\cdot1-1\cdot1=1\ne0$, so $A$ is invertible. Using the $2\times2$ shortcut ("swap the main diagonal, negate the off-diagonal"):
> $$A^{-1}=\frac{1}{1}\begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix}=\begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix}.$$
> Check:
> $$AA^{-1}=\begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix}\begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix}=\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}=I.$$

### Type 3: computing and proving rank

**How it's asked.** Find the rank of a matrix (possibly with a parameter); prove an inequality about ranks.

**Method.** Row-reduce the matrix to **row-echelon form**; the number of nonzero rows is the rank. With a parameter, simplify first and then split into cases. Common rank inequalities: $r(AB)\le\min\{r(A),r(B)\}$, $r(A+B)\le r(A)+r(B)$.

**Formulas & sources.**

- **Rank and elementary operations**: the concept of matrix rank was established by **F. G. Frobenius** (1878); **elementary operations do not change the rank**, which justifies every "reduce to echelon form and read off the rank". See [a2] Matrices & Operations.
- **Common rank inequalities**
$$r(AB)\le\min\{r(A),\,r(B)\},\qquad r(A+B)\le r(A)+r(B).$$
They recur throughout problems on systems and vector families. See [a2] Matrices & Operations and [a3] Linear Systems & Vector Spaces.

**Example 4.** Find the rank of $A=\begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 1 \end{bmatrix}$.

> **Solution.** Row operations $R_2-2R_1$, $R_3-R_1$:
> $$\begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 1 \end{bmatrix}\to\begin{bmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & -1 & -2 \end{bmatrix}\to\begin{bmatrix} 1 & 2 & 3 \\ 0 & -1 & -2 \\ 0 & 0 & 0 \end{bmatrix}.$$
> The echelon form has $2$ nonzero rows, so $r(A)=2$.

### Type 4: existence and structure of solutions, with parameters

**How it's asked.** Discuss when a parametrized linear system has no solution, a unique solution, or infinitely many, and find the general solution in the last case.

**Method.** Compare the rank $r(A)$ of the coefficient matrix with the rank $r(A\mid b)$ of the augmented matrix (let $n$ be the number of unknowns):

- $r(A)=r(A\mid b)=n$: unique solution;
- $r(A)=r(A\mid b)=r<n$: infinitely many solutions, with general solution = one particular solution + the homogeneous general solution, whose fundamental system contains $n-r$ vectors;
- $r(A)<r(A\mid b)$: no solution.

For a square parametrized system, the coefficient determinant $D=\det A$ locates the cases quickly: $D\ne0$ forces a unique solution, while $D=0$ needs case-by-case discussion.

**Formulas & sources.**

- **The existence criterion** (Rouché–Capelli theorem): the system $Ax=b$ is consistent if and only if $r(A)=r(A\mid b)$. See [a3] Linear Systems & Vector Spaces.
- **The structure theorem**: the general solution of a non-homogeneous system = one particular solution + the general solution of the associated homogeneous system; the fundamental system of $Ax=0$ in $n$ unknowns has $n-r(A)$ linearly independent solution vectors. See [a3] Linear Systems & Vector Spaces.

**Example 5.** Discuss, for which values of $\lambda$, the system
$$\begin{cases} \lambda x_1+x_2+x_3=1 \\ x_1+\lambda x_2+x_3=\lambda \\ x_1+x_2+\lambda x_3=\lambda^{2} \end{cases}$$
has a unique solution, no solution, or infinitely many, and find the general solution in the last case.

> **Solution.** The coefficient determinant (add every column to the first and factor out $\lambda+2$):
> $$D=\begin{vmatrix} \lambda & 1 & 1 \\ 1 & \lambda & 1 \\ 1 & 1 & \lambda \end{vmatrix}=(\lambda+2)(\lambda-1)^{2}.$$
> **(1) $\lambda\ne1$ and $\lambda\ne-2$:** $D\ne0$, so $r(A)=r(A\mid b)=3$ and there is a unique solution.
> **(2) $\lambda=-2$:** adding the three equations, the left side is $(\lambda+2)(x_1+x_2+x_3)=0$ while the right side is $1+(-2)+4=3\ne0$, a contradiction, so $r(A)=2<r(A\mid b)=3$ and there is no solution.
> **(3) $\lambda=1$:** all three equations reduce to $x_1+x_2+x_3=1$, so $r(A)=r(A\mid b)=1<3$ and there are infinitely many solutions. Take the particular solution $(1,0,0)^{\mathsf T}$; the homogeneous equation $x_1+x_2+x_3=0$ has fundamental system $(-1,1,0)^{\mathsf T}$ and $(-1,0,1)^{\mathsf T}$, so the general solution is
> $$x=(1,0,0)^{\mathsf T}+k_1(-1,1,0)^{\mathsf T}+k_2(-1,0,1)^{\mathsf T},$$
> where $k_1,k_2$ are arbitrary constants.

### Type 5: dependence and maximal independent sets

**How it's asked.** Decide whether a family of vectors is linearly dependent or independent; find its rank and one maximal linearly independent subset.

**Method.** A family is **linearly dependent** $\Leftrightarrow$ some coefficients, not all zero, make the linear combination zero $\Leftrightarrow$ the rank of the family is less than the number of vectors. Arrange the vectors as the columns (or rows) of a matrix and row-reduce to echelon form; the vectors in the **pivot columns** form a maximal independent subset, and the number of pivots is the rank.

**Formulas & sources.**

- **Definition of linear dependence**: $\alpha_1,\dots,\alpha_m$ are linearly dependent $\Leftrightarrow$ there exist $k_1,\dots,k_m$, not all zero, with $k_1\alpha_1+\cdots+k_m\alpha_m=0$. See [a3] Linear Systems & Vector Spaces.
- **Rank and maximal independent subsets**: the rank of a vector family equals **the number of vectors in a maximal linearly independent subset**, which does not depend on the subset chosen. See [a3] Linear Systems & Vector Spaces.

**Example 6.** Decide the linear dependence of $\alpha_1=(1,2,3),\ \alpha_2=(2,3,4),\ \alpha_3=(3,4,5)$ and find one maximal independent subset.

> **Solution.** Note that $\alpha_1-2\alpha_2+\alpha_3=(0,0,0)$ with coefficients not all zero, so the three vectors are linearly dependent. Since $\alpha_1,\alpha_2$ are not proportional they are independent, so the rank is $2$, one maximal independent subset is $\{\alpha_1,\alpha_2\}$, and $\alpha_3=2\alpha_2-\alpha_1$.

## Exercises

1. Evaluate $\begin{vmatrix} 2 & 1 & 1 \\ 1 & 2 & 1 \\ 1 & 1 & 2 \end{vmatrix}$.
2. Find the inverse of $A=\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$.
3. Find the rank of $A=\begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & 9 \end{bmatrix}$.
4. Find a fundamental system of the homogeneous system $\begin{cases} x_1-x_2+x_3=0 \\ 2x_1+x_2-x_3=0 \end{cases}$.
5. Find $a$ for which $\begin{cases} x_1+x_2+x_3=0 \\ x_1+2x_2+3x_3=0 \\ x_1+3x_2+ax_3=0 \end{cases}$ has a nonzero solution, and solve it.
6. Decide the linear dependence of $\alpha_1=(1,0,1),\ \alpha_2=(0,1,1),\ \alpha_3=(1,1,2)$ and find one maximal independent subset.

**Answers.**
1) Expanding along the first row $=2(4-1)-1(2-1)+1(1-2)=6-1-1=4$.
2) $\det A=-2$, so $A^{-1}=\frac{1}{-2}\begin{bmatrix} 4 & -2 \\ -3 & 1 \end{bmatrix}=\begin{bmatrix} -2 & 1 \\ \tfrac32 & -\tfrac12 \end{bmatrix}$.
3) The three rows are proportional (rows 2 and 3 are $2$ and $3$ times row 1), so $r(A)=1$.
4) $r=2,\ n-r=1$; adding the two equations gives $3x_1=0$, so $x_1=0,\ x_2=x_3$, and the fundamental system is $(0,1,1)^{\mathsf T}$.
5) The coefficient determinant $=a-5$, so there is a nonzero solution iff $a=5$; then the solution is any multiple of $(1,-2,1)^{\mathsf T}$.
6) $\alpha_3=\alpha_1+\alpha_2$, so they are linearly dependent, the rank is $2$, and one maximal independent subset is $\{\alpha_1,\alpha_2\}$.
