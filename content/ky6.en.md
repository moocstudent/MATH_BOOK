## Overview

Probability and mathematical statistics is a major block of Papers I and III (Paper II does not test probability), showing up reliably in the multiple-choice, fill-in, and long-answer sections. As with limits, what it really tests is not a single formula but the judgment to **first identify the model, then apply the matching method**: is the problem classical/geometric probability, conditional probability, a specific distribution, or parameter estimation? Once the type is fixed, the formula is almost automatic.

This chapter organizes the high-frequency topics into six question types, from classical probability all the way to estimation and hypothesis testing, and for each formula **cites its historical origin (who, and when) plus the matching chapter on this site**, so you can trace the principle back.

> **The method in one line.** First tell apart the "classical / geometric / conditional / distribution" type, then apply the matching formula; for a continuous variable, always pin down the constant first via $\int f=1$.

## Question Types

### Type 1: classical and geometric probability

**How it's asked.** Find the probability of an event in an equally-likely experiment (counting for the classical case, a ratio of measures for the geometric case).

**Method.** First decide whether the sample space is **finite and equally likely** or **infinite but uniform**:

- **Classical probability** (finitely many equally likely outcomes): $P(A)=\dfrac{m}{n}$, where $n$ is the total number of basic outcomes and $m$ the number favorable to $A$; usually paired with permutation/combination counting;
- **Geometric probability** (infinite but "uniform"): $P(A)=\dfrac{\mu(A)}{\mu(\Omega)}$, the ratio of the measure of the favorable region to that of the sample region (lengths / areas / volumes).

**Formulas & sources.**

- **Classical probability** $P(A)=\dfrac{m}{n}$: under equally likely outcomes, the probability of an event is favorable-over-total; systematically laid out by **P.-S. Laplace** (*Théorie analytique des probabilités*, 1812), with the modern axiomatic footing supplied by **A. Kolmogorov** (*Grundbegriffe der Wahrscheinlichkeitsrechnung*, 1933). See [p1] Events & Probability.
- **Geometric probability** $P(A)=\dfrac{\mu(A)}{\mu(\Omega)}$: extends "equally likely" from counting to measures, within the same framework as the classical case. See [p1] Events & Probability.

**Example 1.** A bag holds $3$ white and $2$ black balls; draw $2$ at random. Find the probability that both are white.

> **Solution.** The total number of draws is $\binom{5}{2}=10$ and the number of all-white draws is $\binom{3}{2}=3$, so
> $$P=\frac{\binom{3}{2}}{\binom{5}{2}}=\frac{3}{10}.$$

### Type 2: conditional, total probability and Bayes

**How it's asked.** A staged ("first…, then…") experiment; or inferring a cause from an observed result (a posterior probability).

**Method.**

- **Conditional probability**: $P(A\mid B)=\dfrac{P(AB)}{P(B)}$ (requires $P(B)>0$);
- **Law of total probability**: split a complex event over a complete system $\{B_i\}$, $P(A)=\sum_i P(B_i)P(A\mid B_i)$;
- **Bayes' formula**: given that $A$ occurred, recover the posterior of a cause $B_j$, $P(B_j\mid A)=\dfrac{P(B_j)P(A\mid B_j)}{\sum_i P(B_i)P(A\mid B_i)}$.

**Formulas & sources.**

- **Conditional probability** is introduced by its definition $P(A\mid B)=\dfrac{P(AB)}{P(B)}$, a direct product of the axiomatization of **A. Kolmogorov** (1933);
- **Bayes' formula** first appeared in the posthumous essay of **T. Bayes** (published 1763 by R. Price) and was later developed into its general form independently by **P.-S. Laplace**. See [p1] Events & Probability.

**Example 2.** Bag A has $2$ red and $1$ white, bag B has $1$ red and $2$ white. Choose a bag at random (equal probability) and draw one ball; given that it is red, find the probability it came from bag A.

> **Solution.** Let $A_1,A_2$ be "drawn from bag A" and "drawn from bag B", and $R$ be "a red ball is drawn". The bag is chosen with equal probability, so $P(A_1)=P(A_2)=\tfrac12$; since bag A has $2$ red and $1$ white while bag B has $1$ red and $2$ white, $P(R\mid A_1)=\tfrac23,\ P(R\mid A_2)=\tfrac13$. By Bayes' formula
> $$P(A_1\mid R)=\frac{P(A_1)P(R\mid A_1)}{P(A_1)P(R\mid A_1)+P(A_2)P(R\mid A_2)}=\frac{\tfrac12\cdot\tfrac23}{\tfrac12\cdot\tfrac23+\tfrac12\cdot\tfrac13}=\frac{1/3}{1/2}=\frac23.$$

### Type 3: distributions and numerical characteristics

**How it's asked.** From a density or a probability mass function, determine a constant, find the distribution function, or compute the mean and variance.

**Method.** For a continuous variable, first use normalization $\int_{-\infty}^{\infty}f(x)\,dx=1$ to pin down the unknown constant, then compute from $E X=\int_{-\infty}^{\infty}x f(x)\,dx$ and $D X=E X^{2}-(E X)^{2}$. Memorize the numerical characteristics of the common distributions:

- Binomial $B(n,p)$: $E X=np,\ D X=np(1-p)$;
- Poisson $P(\lambda)$: $E X=\lambda,\ D X=\lambda$;
- Uniform $U(a,b)$: $E X=\dfrac{a+b}{2},\ D X=\dfrac{(b-a)^{2}}{12}$;
- Exponential $E(\lambda)$: $E X=\dfrac1\lambda,\ D X=\dfrac1{\lambda^{2}}$;
- Normal $N(\mu,\sigma^{2})$: $E X=\mu,\ D X=\sigma^{2}$.

**Formulas & sources.** The axiomatization of probability is due to **A. Kolmogorov** (1933); the notion of mathematical expectation goes back to **C. Huygens** (*De ratiociniis in ludo aleae*, 1657). The common distributions each have their origin: the binomial from **J. Bernoulli** (*Ars Conjectandi*, 1713), the Poisson from **S. Poisson** (1837), and the normal from **de Moivre–Gauss**. See [p2] Random Variables & Distributions and [p3] Expectation, Variance & Covariance.

**Example 3.** Let a continuous random variable $X$ have density
$$f(x)=\begin{cases} cx, & 0<x<2,\\ 0, & \text{otherwise}. \end{cases}$$
Find the constant $c$ and $E X$.

> **Solution.** By normalization $\displaystyle\int_{0}^{2}cx\,dx=c\cdot\frac{x^{2}}{2}\Big|_{0}^{2}=2c=1$, so $c=\tfrac12$. Then
> $$E X=\int_{0}^{2}x\cdot\frac{x}{2}\,dx=\int_{0}^{2}\frac{x^{2}}{2}\,dx=\frac12\cdot\frac{8}{3}=\frac43.$$

### Type 4: bivariate variables and independence

**How it's asked.** From a joint distribution, find the marginals, test independence, and compute the covariance.

**Method.**

- **Marginals**: obtained by summing (discrete) or integrating (continuous) the joint distribution over the other variable;
- **Independence**: $X,Y$ are independent $\iff$ the joint equals the product of the marginals, i.e. $P(X=x,Y=y)=P(X=x)P(Y=y)$ for all values (discrete), or $f(x,y)=f_X(x)f_Y(y)$ (continuous);
- **Covariance**: $\operatorname{Cov}(X,Y)=E(XY)-E X\,E Y$. Note that **independence implies uncorrelatedness, but not conversely**.

**Formulas & sources.** Independence is defined by the joint distribution equaling the product of the marginals; covariance and the correlation coefficient were introduced by **K. Pearson** (1896) to measure the degree of linear association. See [p2] Random Variables & Distributions and [p3] Expectation, Variance & Covariance.

**Example 4.** Let the bivariate variable $(X,Y)$ have the joint mass function

| $P(X=x,\,Y=y)$ | $y=0$ | $y=1$ |
| :-: | :-: | :-: |
| $x=0$ | $0.1$ | $0.2$ |
| $x=1$ | $0.3$ | $0.4$ |

Find the marginals, test independence, and compute $\operatorname{Cov}(X,Y)$.

> **Solution.** Marginals: $P(X=1)=0.3+0.4=0.7$ and $P(Y=1)=0.2+0.4=0.6$, so $E X=0.7,\ E Y=0.6$. Since
> $$P(1,1)=0.4\ne P(X=1)P(Y=1)=0.7\times0.6=0.42,$$
> $X$ and $Y$ are **not independent**. As $XY$ equals $1$ only when $X=Y=1$, we have $E(XY)=1\times0.4=0.4$, hence
> $$\operatorname{Cov}(X,Y)=E(XY)-E X\,E Y=0.4-0.7\times0.6=-0.02.$$

### Type 5: LLN and the central limit theorem

**How it's asked.** Use Chebyshev's inequality for a probability estimate; use the central limit theorem for a normal approximation.

**Method.**

- **Chebyshev's inequality**: only the mean and variance are needed for a crude bound on a deviation, $P(|X-\mu|\ge\varepsilon)\le\dfrac{\sigma^{2}}{\varepsilon^{2}}$;
- **Central limit theorem**: the sum $\sum_{i=1}^{n}X_i$ of $n$ i.i.d. variables is approximately $N(n\mu,\,n\sigma^{2})$; standardize and read off probabilities from the standard normal $\Phi$.

**Formulas & sources.** Chebyshev's inequality is due to **P. Chebyshev** (1867); the law of large numbers in the i.i.d. case is **Khinchin's law** (**A. Khinchin**, 1929); the matching central limit theorem is the **Lindeberg–Lévy theorem** (**J. Lindeberg**, 1922 / **P. Lévy**). See [p4] LLN & Central Limit Theorem.

**Example 5.** Let $X$ have mean $\mu$ and variance $\sigma^{2}$. Use Chebyshev's inequality to estimate $P(|X-\mu|\ge 3\sigma)$.

> **Solution.** Taking $\varepsilon=3\sigma$ in Chebyshev's inequality,
> $$P(|X-\mu|\ge 3\sigma)\le\frac{\sigma^{2}}{(3\sigma)^{2}}=\frac{1}{9}.$$

### Type 6: estimation and hypothesis testing

**How it's asked.** Find the method-of-moments or maximum-likelihood estimator of an unknown parameter; understand the framework of hypothesis testing.

**Method.**

- **Method of moments**: set sample moments equal to population moments (e.g. $\bar{X}=E X$) and solve for the parameter;
- **Maximum likelihood**: write the likelihood $L(\theta)=\prod_i f(x_i;\theta)$, then set $\dfrac{d\ln L}{d\theta}=0$ and solve for $\hat\theta$;
- **Hypothesis testing**: under the null $H_0$, build a test statistic, compare it with a critical value, and weigh the two kinds of error (type I / type II).

**Formulas & sources.** The method of moments was proposed by **K. Pearson** (1894); maximum likelihood was established systematically by **R. A. Fisher** (1912/1922); interval estimation is due to **J. Neyman** (1937); and the optimality theory of testing is the **Neyman–Pearson lemma** (1933). See [s2] Parameter Estimation and [s3] Hypothesis Testing.

**Example 6.** Let the population $X$ follow an exponential distribution with parameter $\lambda$, density $f(x;\lambda)=\lambda e^{-\lambda x}$ ($x>0$), and let $x_1,\dots,x_n$ be a sample. Find the maximum-likelihood estimator of $\lambda$.

> **Solution.** The likelihood is
> $$L(\lambda)=\prod_{i=1}^{n}\lambda e^{-\lambda x_i}=\lambda^{n}e^{-\lambda\sum_{i=1}^{n}x_i},$$
> so $\ln L=n\ln\lambda-\lambda\sum_{i=1}^{n}x_i$. Setting
> $$\frac{d\ln L}{d\lambda}=\frac{n}{\lambda}-\sum_{i=1}^{n}x_i=0,$$
> gives $\hat\lambda=\dfrac{n}{\sum_{i=1}^{n}x_i}=\dfrac{1}{\bar{X}}$.

## Exercises

1. Among $5$ tickets, $3$ are "winners"; draw $2$ in turn without replacement. Find the probability that both win.
2. Given $P(A)=0.5,\ P(B)=0.6,\ P(A\mid B)=0.5$, find $P(B\mid A)$.
3. Let $X$ have density $f(x)=kx^{2}$ for $0<x<1$ and $0$ elsewhere. Find $k$ and $E X$.
4. Let $X\sim B(3,\tfrac13)$. Find $E X$ and $D X$.
5. Let $X,Y$ be independent with $D X=1,\ D Y=2$. Find $D(2X-Y+3)$.
6. Let the population $X\sim N(\mu,\sigma^{2})$ with $\mu$ unknown. Find the method-of-moments and maximum-likelihood estimators of $\mu$.

**Answers.**
1) In turn without replacement: $P=\dfrac{3}{5}\cdot\dfrac{2}{4}=\dfrac{3}{10}$.
2) $P(AB)=P(B)P(A\mid B)=0.6\times0.5=0.3$, so $P(B\mid A)=\dfrac{P(AB)}{P(A)}=\dfrac{0.3}{0.5}=0.6$.
3) From $\displaystyle\int_{0}^{1}kx^{2}\,dx=\frac{k}{3}=1$ we get $k=3$; then $E X=\displaystyle\int_{0}^{1}x\cdot3x^{2}\,dx=\frac{3}{4}$.
4) $E X=np=3\cdot\tfrac13=1$ and $D X=np(1-p)=3\cdot\tfrac13\cdot\tfrac23=\dfrac23$.
5) $D(2X-Y+3)=4D X+D Y=4\times1+2=6$.
6) Both are the sample mean: $\hat\mu=\bar{X}$.
