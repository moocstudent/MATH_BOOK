## Overview

Eigenvalues, similarity and quadratic forms are the second major block of linear algebra and the customary capstone of its part of the postgraduate entrance exam (Papers I, II and III): in a long-answer problem it often links up with the previous chapter's systems and rank, so a single question can span the whole chain "find the eigenvalues — decide whether it diagonalizes — reduce the quadratic form — test positive-definiteness". What it tests is again the judgment to **first read the structure, then choose the algorithm**: is the matrix general or real symmetric? does the quadratic form call for a standard form or only a positive-definiteness test? This chapter organizes the block into five question types, and for each theorem **cites its source** — the historical origin plus the matching chapter on this site, so you can trace the principle back.

> **The method in one line.** For eigenvalue problems, first sanity-check with $\sum\lambda_i=\operatorname{tr}A$ and $\prod\lambda_i=\det A$; a real symmetric matrix can always be orthogonally diagonalized — the moment you see "real symmetric", head straight for $Q^{\mathsf T}AQ$.

## Question Types

### Type 1: eigenvalues/vectors and their properties

**How it's asked.** Find the eigenvalues and eigenvectors of a matrix; or, given the eigenvalues, find related quantities such as $\det A$, $\operatorname{tr}A$, $A^{k}$, $p(A)$.

**Method.** Two steps: first solve the **characteristic equation** $\det(\lambda I-A)=0$ for all the $\lambda_i$, then for each $\lambda_i$ solve the homogeneous system $(A-\lambda_i I)x=0$ for its eigenvectors (the nonzero vectors of that eigenspace). When the eigenvalues are given and you must recover other quantities, lean on the properties below — often without ever writing $A$ out.

**Formulas & sources.**

- **Trace and determinant**: from the root–coefficient relations of the characteristic polynomial (Vieta's formulas),
$$\sum_{i}\lambda_i=\operatorname{tr}A,\qquad \prod_{i}\lambda_i=\det A.$$
These are also the two quickest rulers for checking eigenvalues.
- **Spectral mapping**: if $Ax=\lambda x$ ($x\ne0$), then $A^{k}x=\lambda^{k}x$, $A^{-1}x=\lambda^{-1}x$, $(A+cI)x=(\lambda+c)x$, so the eigenvalues of $A^{k}$, $A^{-1}$, $A+cI$ and a polynomial $p(A)$ are $\lambda^{k}$, $1/\lambda$, $\lambda+c$, $p(\lambda)$ respectively, with the eigenvectors unchanged. The cornerstone of this "polynomials acting on a matrix" framework is the **Cayley–Hamilton theorem** (**A. Cayley**, 1858: every square matrix satisfies its own characteristic equation). See [a4] Eigenvalues & Eigenvectors.

**Example 1.** Find the eigenvalues and eigenvectors of $A=\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix}$.

> **Solution.** The characteristic equation
> $$\det(A-\lambda I)=(2-\lambda)^{2}-1=\lambda^{2}-4\lambda+3=(\lambda-1)(\lambda-3)=0,$$
> so $\lambda_1=1,\ \lambda_2=3$.
> - $\lambda=1$: $(A-I)x=0$, i.e. $x_1-x_2=0$, giving $x_1=x_2$ and eigenvector $(1,1)^{\mathsf T}$;
> - $\lambda=3$: $(A-3I)x=0$, i.e. $x_1+x_2=0$, giving $x_1=-x_2$ and eigenvector $(1,-1)^{\mathsf T}$.
> Check: $\operatorname{tr}A=4=1+3$ and $\det A=3=1\times3$.

**Example 2.** Let the $3\times3$ matrix $A$ have eigenvalues $1,2,3$. Find $\det(A^{2}+A+I)$.

> **Solution.** By spectral mapping, the eigenvalues of $A^{2}+A+I$ are $\lambda^{2}+\lambda+1$. Substituting each:
> $$\lambda=1\Rightarrow3,\qquad \lambda=2\Rightarrow7,\qquad \lambda=3\Rightarrow13.$$
> The determinant is the product of all eigenvalues, so
> $$\det(A^{2}+A+I)=3\times7\times13=273.$$

### Type 2: similarity and diagonalization

**How it's asked.** Decide whether a matrix diagonalizes; when it does, find an invertible $P$ with $P^{-1}AP=\Lambda$ diagonal.

**Method.** The key criterion: an $n\times n$ matrix $A$ is diagonalizable $\iff$ it has $n$ linearly independent eigenvectors $\iff$ for every eigenvalue the **geometric multiplicity** (namely $n-r(A-\lambda I)$) equals its **algebraic multiplicity** (its multiplicity as a root of the characteristic polynomial). A handy sufficient condition: $n$ distinct eigenvalues $\Rightarrow$ always diagonalizable. To diagonalize, place the eigenvectors as the columns of $P$; then the diagonal entries of $\Lambda$ are the corresponding eigenvalues in the same order.

**Formulas & sources.** Diagonalization theorem: $P^{-1}AP=\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ iff the columns of $P$ are $n$ linearly independent eigenvectors of $A$. Similar matrices share every **similarity invariant** — the same characteristic polynomial, trace, determinant and rank — which supplies necessary conditions for two matrices to be similar. The framework is the matrix of one linear map under different bases. See [a4] Eigenvalues & Eigenvectors.

**Example 3.** Decide whether $A=\begin{bmatrix} 3 & 1 \\ 0 & 3 \end{bmatrix}$ is diagonalizable.

> **Solution.** $A$ is upper triangular, so its eigenvalues are the diagonal entries: $\lambda=3$ (double, algebraic multiplicity $2$). Now
> $$A-3I=\begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix},\qquad r(A-3I)=1,$$
> so the geometric multiplicity $=2-r(A-3I)=2-1=1<2=$ the algebraic multiplicity. The geometric multiplicity falls short, so $A$ is **not diagonalizable**.

### Type 3: orthogonal diagonalization of a real symmetric matrix

**How it's asked.** For a given real symmetric matrix $A$, find an orthogonal matrix $Q$ making $Q^{\mathsf T}AQ$ diagonal.

**Method.** Three steps: (1) solve the characteristic equation for all eigenvalues and find an eigenvector for each; (2) eigenvectors from distinct eigenvalues are **automatically orthogonal**, while within a repeated eigenvalue you orthogonalize the several eigenvectors by the **Gram–Schmidt process**; (3) **normalize** every eigenvector and use this orthonormal set of eigenvectors as the columns of $Q$, so that $Q^{\mathsf T}=Q^{-1}$ and $Q^{\mathsf T}AQ=\Lambda$.

**Formulas & sources.**

- **Spectral theorem (principal-axis theorem)**: a real symmetric matrix can always be orthogonally diagonalized — there exists an orthogonal $Q$ with $Q^{\mathsf T}AQ$ real diagonal; its eigenvalues are all real, and eigenvectors of distinct eigenvalues are mutually orthogonal. This was established by **A.-L. Cauchy** (1829) in the principal-axis problem.
- **Gram–Schmidt process**: the standard procedure turning a linearly independent set into an orthonormal one, named after **J. P. Gram** (1883) and **E. Schmidt** (1907). See [a4] Eigenvalues & Eigenvectors.

**Example 4.** For $A=\begin{bmatrix} 2 & 2 \\ 2 & 5 \end{bmatrix}$, find an orthogonal matrix $Q$ making $Q^{\mathsf T}AQ$ diagonal.

> **Solution.** The characteristic equation
> $$\det(A-\lambda I)=(2-\lambda)(5-\lambda)-4=\lambda^{2}-7\lambda+6=(\lambda-1)(\lambda-6)=0,$$
> so $\lambda_1=1,\ \lambda_2=6$.
> - $\lambda=1$: $(A-I)x=0$, i.e. $x_1+2x_2=0$, take $(2,-1)^{\mathsf T}$;
> - $\lambda=6$: $(A-6I)x=0$, i.e. $x_2=2x_1$, take $(1,2)^{\mathsf T}$.
> Their inner product $2\cdot1+(-1)\cdot2=0$, so they are already orthogonal; dividing each by its length $\sqrt5$ to normalize gives
> $$Q=\frac{1}{\sqrt5}\begin{bmatrix} 2 & 1 \\ -1 & 2 \end{bmatrix},\qquad Q^{\mathsf T}AQ=\begin{bmatrix} 1 & 0 \\ 0 & 6 \end{bmatrix}.$$

### Type 4: reducing a quadratic form

**How it's asked.** Reduce a quadratic form $f=x^{\mathsf T}Ax$ ($A$ symmetric) to a standard form with square terms only.

**Method.** Two routes: **completing the square** (Lagrange) — repeatedly form perfect squares to kill the cross terms one by one, then apply an invertible linear substitution; **orthogonal transformation** — for real symmetric $A$ find an orthogonal $Q$ and set $x=Qy$, so that
$$f=x^{\mathsf T}Ax=y^{\mathsf T}(Q^{\mathsf T}AQ)y=\sum_i\lambda_i y_i^{2},$$
where the $\lambda_i$ are exactly the eigenvalues of $A$. Completing the square is faster; the orthogonal route also yields the principal-axis directions.

**Formulas & sources.** Quadratic forms correspond one-to-one with symmetric matrices ($f=x^{\mathsf T}Ax$, $A=A^{\mathsf T}$); the legitimacy of the orthogonal route comes from the spectral theorem of Type 3. Whichever invertible transformation is used, the numbers of positive and negative square terms (the positive and negative indices of inertia) do not change — this is the **law of inertia** (**J. J. Sylvester**, 1852). See [a4] Eigenvalues & Eigenvectors.

**Example 5.** Use completing the square to reduce $f=x_1^{2}+x_2^{2}+x_3^{2}+2x_1x_2$ to standard form.

> **Solution.** Collect the $x_1$ terms into a perfect square:
> $$x_1^{2}+2x_1x_2+x_2^{2}=(x_1+x_2)^{2},$$
> so $f=(x_1+x_2)^{2}+x_3^{2}$. With the invertible substitution $y_1=x_1+x_2,\ y_2=x_3,\ y_3=x_2$, the standard form is
> $$f=y_1^{2}+y_2^{2}.$$
> Its rank is $2$ and its positive index of inertia is $2$ (no negative square term).

### Type 5: testing a positive-definite form

**How it's asked.** Decide whether a quadratic form is positive definite; or find the range of a parameter making it positive definite.

**Method.** For real symmetric $A$ the following are equivalent, and any one settles positive-definiteness: all eigenvalues of $A$ are $>0$; **all leading principal minors of $A$ are $>0$** (Sylvester's criterion); the positive index of inertia $=n$; $A$ is congruent to the identity ($A=C^{\mathsf T}C$ with $C$ invertible). With a parameter present, the leading-minor criterion is the least work — just write the inequalities order by order.

**Formulas & sources.** Among these equivalent characterizations, the **leading-principal-minor criterion** (all leading principal minors $>0$ $\iff$ positive definite) is known as **Sylvester's criterion**; and the invariance of the positive and negative indices of inertia under congruence is guaranteed by the **law of inertia** (**J. J. Sylvester**, 1852), which is exactly what justifies testing positive-definiteness via the signs of eigenvalues or via the index of inertia. See [a4] Eigenvalues & Eigenvectors.

**Example 6.** Find the range of $t$ making the quadratic form $f=x_1^{2}+2x_2^{2}+tx_3^{2}+2x_1x_2$ positive definite.

> **Solution.** The matrix of the form is
> $$A=\begin{bmatrix} 1 & 1 & 0 \\ 1 & 2 & 0 \\ 0 & 0 & t \end{bmatrix}.$$
> The leading principal minors are
> $$D_1=1>0,\qquad D_2=\begin{vmatrix} 1 & 1 \\ 1 & 2 \end{vmatrix}=1>0,\qquad D_3=\det A=t.$$
> By Sylvester's criterion, positive definite $\iff$ $D_1,D_2,D_3$ are all $>0$ $\iff$ $t>0$.

## Exercises

1. Find the eigenvalues of $A=\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix}$.
2. Let the $3\times3$ matrix $A$ have eigenvalues $1,-1,2$. Find $\det A$ and $\det(A+2I)$.
3. Decide whether $A=\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$ is diagonalizable.
4. For $A=\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$, find an orthogonal matrix $Q$ making $Q^{\mathsf T}AQ$ diagonal.
5. Use an orthogonal transformation to reduce $f=2x_1x_2$ to standard form.
6. Find $t$ making $f=x_1^{2}+2x_2^{2}+tx_3^{2}+2x_1x_2$ positive definite.

**Answers.**
1) $\det(A-\lambda I)=\lambda^{2}-4\lambda+3=(\lambda-1)(\lambda-3)$, so $\lambda_1=1,\ \lambda_2=3$.
2) $\det A=1\cdot(-1)\cdot2=-2$; $A+2I$ has eigenvalues $3,1,4$, so $\det(A+2I)=3\times1\times4=12$.
3) $\lambda=1$ is double with geometric multiplicity $=2-r(A-I)=2-1=1<2$, so it is **not diagonalizable**.
4) $\lambda=1$ gives $(1,1)^{\mathsf T}$ and $\lambda=-1$ gives $(1,-1)^{\mathsf T}$; normalizing, $Q=\frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$ and $Q^{\mathsf T}AQ=\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$.
5) The matrix of $f=2x_1x_2$ is $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ with eigenvalues $\pm1$, so the standard form is $f=y_1^{2}-y_2^{2}$.
6) The leading principal minors are $D_1=1>0,\ D_2=1>0,\ D_3=t$, so positive definite $\iff t>0$.
