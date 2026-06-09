/* =========================================================
   Curriculum data — 4 modules / 16 chapters
   ---------------------------------------------------------
   Metadata only (bilingual). The heavy teaching content for
   each chapter (core notes, worked examples, exercises — with
   LaTeX) lives in  content/<id>.<lang>.md  and is fetched on
   demand by the chapter page (and only when unlocked).
   ========================================================= */

const MODULES = [
  {
    id: "m1",
    code: "M1",
    zh: "高等数学",
    en: "Calculus",
    accent: "primary",
    level: 1,
    tagline: {
      zh: "变化的语言:极限、导数、积分。",
      en: "The language of change: limits, derivatives, integrals.",
    },
    description: {
      zh: "从极限出发,理解导数如何刻画瞬时变化、积分如何累积总量,再到无穷级数。这是几乎所有后续数学与工程的地基。",
      en: "Starting from limits, see how derivatives capture instantaneous change, how integrals accumulate totals, and where infinite series lead. The bedrock of almost everything that follows.",
    },
  },
  {
    id: "m2",
    code: "M2",
    zh: "线性代数",
    en: "Linear Algebra",
    accent: "primary",
    level: 2,
    tagline: {
      zh: "把方程组升级为空间里的变换。",
      en: "From systems of equations to transformations of space.",
    },
    description: {
      zh: "行列式、矩阵、线性方程组、特征值。重点不是死算,而是把矩阵看成线性变换——这是数据科学与机器学习的母语。",
      en: "Determinants, matrices, linear systems, eigenvalues. The point isn't grinding arithmetic but seeing a matrix as a linear transformation — the native tongue of data science and machine learning.",
    },
  },
  {
    id: "m3",
    code: "M3",
    zh: "概率论与数理统计",
    en: "Probability & Statistics",
    accent: "primary",
    level: 2,
    tagline: {
      zh: "在不确定中做出可靠的判断。",
      en: "Reasoning reliably under uncertainty.",
    },
    description: {
      zh: "从随机事件、随机变量与分布,到期望方差、大数定律与中心极限定理。理解随机性的规律,是统计与机器学习的前提。",
      en: "From random events, variables and distributions to expectation, variance, the law of large numbers and the central limit theorem. Grasping the laws of randomness underpins statistics and ML.",
    },
  },
  {
    id: "m4",
    code: "M4",
    zh: "离散数学",
    en: "Discrete Mathematics",
    accent: "accent",
    level: 3,
    tagline: {
      zh: "计算机科学的数学骨架。",
      en: "The mathematical skeleton of computer science.",
    },
    description: {
      zh: "数理逻辑、集合与关系、图论、组合与数论初步。处理离散结构的工具箱,是算法、密码学与形式化推理的基础。",
      en: "Logic, sets and relations, graph theory, combinatorics and elementary number theory. The toolkit for discrete structures behind algorithms, cryptography and formal reasoning.",
    },
  },
];

const CHAPTERS = [
  /* ============ M1 高等数学 / Calculus ============ */
  {
    id: "g1", code: "MA1", moduleId: "m1", difficulty: 1, hours: 10, prereq: [],
    nExamples: 5, nExercises: 6,
    title: { zh: "极限与连续", en: "Limits & Continuity" },
    summary: {
      zh: "用极限精确描述「无限接近」,并用它定义函数的连续性——整个微积分的起点。",
      en: "Make “approaching” precise with limits, then use them to define continuity — the starting point of all calculus.",
    },
    objectives: [
      { zh: "理解数列与函数极限的直观与 ε–δ 定义", en: "Understand limits of sequences and functions, both intuitively and via ε–δ" },
      { zh: "熟练运用极限运算法则与两个重要极限", en: "Apply the limit laws and the two standard limits fluently" },
      { zh: "掌握连续、间断点的分类与判定", en: "Classify continuity and types of discontinuity" },
      { zh: "会用夹逼定理与等价无穷小求极限", en: "Compute limits with the squeeze theorem and equivalent infinitesimals" },
    ],
    outline: [
      { zh: "数列极限与收敛", en: "Sequences and convergence" },
      { zh: "函数极限的 ε–δ 定义", en: "The ε–δ definition of a function limit" },
      { zh: "极限运算法则", en: "Limit laws" },
      { zh: "两个重要极限", en: "The two standard limits" },
      { zh: "无穷小与等价替换", en: "Infinitesimals and equivalents" },
      { zh: "连续性与间断点", en: "Continuity and discontinuities" },
    ],
  },
  {
    id: "g2", code: "MA2", moduleId: "m1", difficulty: 2, hours: 12, prereq: ["g1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "导数与微分", en: "Derivatives & Differentials" },
    summary: {
      zh: "导数是瞬时变化率,微分是局部线性近似。掌握求导法则与几何意义。",
      en: "The derivative is an instantaneous rate of change; the differential is a local linear approximation. Master the rules and the geometry.",
    },
    objectives: [
      { zh: "从极限定义理解导数与可导性", en: "Understand the derivative and differentiability from the limit definition" },
      { zh: "熟练运用四则、链式、隐函数与参数求导", en: "Differentiate using product/quotient, chain, implicit and parametric rules" },
      { zh: "理解微分作为线性近似的含义", en: "See the differential as a linear approximation" },
      { zh: "会求高阶导数与常见函数的导数", en: "Compute higher-order derivatives and derivatives of standard functions" },
    ],
    outline: [
      { zh: "导数的定义与几何意义", en: "Definition and geometric meaning" },
      { zh: "求导法则:四则与链式", en: "Rules: arithmetic and chain rule" },
      { zh: "隐函数与参数方程求导", en: "Implicit and parametric differentiation" },
      { zh: "高阶导数", en: "Higher-order derivatives" },
      { zh: "微分与线性近似", en: "Differentials and linear approximation" },
    ],
  },
  {
    id: "g3", code: "MA3", moduleId: "m1", difficulty: 2, hours: 14, prereq: ["g2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "积分", en: "Integration" },
    summary: {
      zh: "不定积分是求导的逆运算,定积分是累积求和的极限,微积分基本定理把两者连接。",
      en: "The indefinite integral inverts differentiation; the definite integral is a limit of sums. The Fundamental Theorem ties them together.",
    },
    objectives: [
      { zh: "理解定积分作为黎曼和极限的定义", en: "Understand the definite integral as a limit of Riemann sums" },
      { zh: "掌握微积分基本定理及其意义", en: "Master the Fundamental Theorem of Calculus" },
      { zh: "熟练换元法与分部积分法", en: "Apply substitution and integration by parts fluently" },
      { zh: "会用定积分计算面积与体积等几何量", en: "Use definite integrals for area, volume and other quantities" },
    ],
    outline: [
      { zh: "不定积分与基本积分表", en: "Indefinite integrals and the basic table" },
      { zh: "换元积分法", en: "Integration by substitution" },
      { zh: "分部积分法", en: "Integration by parts" },
      { zh: "定积分与黎曼和", en: "Definite integrals and Riemann sums" },
      { zh: "微积分基本定理", en: "The Fundamental Theorem of Calculus" },
      { zh: "定积分的应用", en: "Applications of the definite integral" },
    ],
  },
  {
    id: "g4", code: "MA4", moduleId: "m1", difficulty: 3, hours: 12, prereq: ["g3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "无穷级数", en: "Infinite Series" },
    summary: {
      zh: "把函数展开成无穷多项之和:从收敛判别,到幂级数与泰勒展开。",
      en: "Express functions as infinite sums: from convergence tests to power series and Taylor expansions.",
    },
    objectives: [
      { zh: "判断常数项级数的收敛与发散", en: "Test numerical series for convergence and divergence" },
      { zh: "掌握比值、根值、比较等判别法", en: "Use the ratio, root and comparison tests" },
      { zh: "理解幂级数的收敛半径与区间", en: "Find the radius and interval of convergence of power series" },
      { zh: "会把常见函数展开成泰勒/麦克劳林级数", en: "Expand standard functions as Taylor / Maclaurin series" },
    ],
    outline: [
      { zh: "数项级数与收敛", en: "Numerical series and convergence" },
      { zh: "正项级数判别法", en: "Tests for positive series" },
      { zh: "交错级数与绝对收敛", en: "Alternating series and absolute convergence" },
      { zh: "幂级数与收敛半径", en: "Power series and radius of convergence" },
      { zh: "泰勒级数与应用", en: "Taylor series and applications" },
    ],
  },

  /* ============ M2 线性代数 / Linear Algebra ============ */
  {
    id: "a1", code: "LA1", moduleId: "m2", difficulty: 1, hours: 8, prereq: [],
    nExamples: 5, nExercises: 6,
    title: { zh: "行列式", en: "Determinants" },
    summary: {
      zh: "行列式是一个把方阵映为数的函数,度量线性变换对体积的缩放,也判定可逆性。",
      en: "The determinant maps a square matrix to a number — the volume scaling of its transformation, and a test for invertibility.",
    },
    objectives: [
      { zh: "理解行列式的定义与几何意义(体积缩放)", en: "Understand the determinant and its geometry (volume scaling)" },
      { zh: "掌握行列式的性质与按行/列展开", en: "Use determinant properties and cofactor expansion" },
      { zh: "会用行变换高效计算行列式", en: "Compute determinants efficiently via row reduction" },
      { zh: "了解克拉默法则", en: "Know Cramer's rule" },
    ],
    outline: [
      { zh: "二、三阶行列式与几何意义", en: "2×2 and 3×3 determinants and geometry" },
      { zh: "n 阶行列式的定义", en: "The general n×n determinant" },
      { zh: "行列式的性质", en: "Properties of determinants" },
      { zh: "按行(列)展开", en: "Cofactor (Laplace) expansion" },
      { zh: "克拉默法则", en: "Cramer's rule" },
    ],
  },
  {
    id: "a2", code: "LA2", moduleId: "m2", difficulty: 2, hours: 12, prereq: ["a1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "矩阵及其运算", en: "Matrices & Operations" },
    summary: {
      zh: "矩阵是线性变换的坐标表示。掌握乘法、逆、转置与初等变换。",
      en: "A matrix is the coordinate form of a linear map. Master multiplication, inverse, transpose and elementary operations.",
    },
    objectives: [
      { zh: "理解矩阵乘法为何这样定义(复合变换)", en: "Understand why matrix multiplication is defined as it is (composition)" },
      { zh: "掌握逆矩阵的概念与求法", en: "Master the inverse and how to compute it" },
      { zh: "熟练初等行变换与矩阵的秩", en: "Use elementary row operations and matrix rank" },
      { zh: "了解分块矩阵与转置的性质", en: "Know block matrices and properties of the transpose" },
    ],
    outline: [
      { zh: "矩阵的加法、数乘与乘法", en: "Addition, scalar multiplication, multiplication" },
      { zh: "转置、对称与正交", en: "Transpose, symmetric and orthogonal matrices" },
      { zh: "逆矩阵与初等矩阵", en: "Inverse and elementary matrices" },
      { zh: "初等变换与矩阵的秩", en: "Row reduction and rank" },
      { zh: "分块矩阵", en: "Block matrices" },
    ],
  },
  {
    id: "a3", code: "LA3", moduleId: "m2", difficulty: 2, hours: 12, prereq: ["a2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "线性方程组与向量空间", en: "Linear Systems & Vector Spaces" },
    summary: {
      zh: "用秩与解的结构理解方程组,用向量空间、基与维数统一这一切。",
      en: "Understand systems through rank and solution structure, and unify it all with vector spaces, bases and dimension.",
    },
    objectives: [
      { zh: "用增广矩阵的秩判断解的存在与个数", en: "Use the rank of the augmented matrix to decide solvability" },
      { zh: "理解齐次/非齐次方程组解的结构", en: "Understand the structure of homogeneous and general solutions" },
      { zh: "掌握线性相关、无关、基与维数", en: "Master linear (in)dependence, basis and dimension" },
      { zh: "理解向量空间与子空间", en: "Understand vector spaces and subspaces" },
    ],
    outline: [
      { zh: "高斯消元法", en: "Gaussian elimination" },
      { zh: "解的存在性与唯一性", en: "Existence and uniqueness of solutions" },
      { zh: "向量组的线性相关性", en: "Linear dependence of vectors" },
      { zh: "基、维数与坐标", en: "Basis, dimension and coordinates" },
      { zh: "解空间的结构", en: "Structure of the solution set" },
    ],
  },
  {
    id: "a4", code: "LA4", moduleId: "m2", difficulty: 3, hours: 12, prereq: ["a3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "特征值与特征向量", en: "Eigenvalues & Eigenvectors" },
    summary: {
      zh: "特征向量是变换中方向不变的向量。对角化把复杂的矩阵幂变简单。",
      en: "Eigenvectors keep their direction under a transformation. Diagonalization makes matrix powers easy.",
    },
    objectives: [
      { zh: "理解特征值、特征向量的定义与几何意义", en: "Understand eigenvalues/eigenvectors and their geometry" },
      { zh: "会求特征多项式与特征值", en: "Find the characteristic polynomial and eigenvalues" },
      { zh: "掌握矩阵可对角化的条件", en: "Know when a matrix is diagonalizable" },
      { zh: "了解实对称矩阵的正交对角化", en: "Know orthogonal diagonalization of symmetric matrices" },
    ],
    outline: [
      { zh: "特征值与特征向量的定义", en: "Definition of eigenvalues and eigenvectors" },
      { zh: "特征多项式", en: "The characteristic polynomial" },
      { zh: "相似与对角化", en: "Similarity and diagonalization" },
      { zh: "实对称矩阵的对角化", en: "Diagonalizing symmetric matrices" },
      { zh: "应用:矩阵的幂与递推", en: "Applications: matrix powers and recurrences" },
    ],
  },

  /* ============ M3 概率论与数理统计 / Probability & Statistics ============ */
  {
    id: "p1", code: "PS1", moduleId: "m3", difficulty: 1, hours: 10, prereq: [],
    nExamples: 5, nExercises: 6,
    title: { zh: "随机事件与概率", en: "Events & Probability" },
    summary: {
      zh: "用样本空间与事件描述随机现象,用公理化概率、条件概率与贝叶斯公式做推断。",
      en: "Describe randomness with sample spaces and events; reason with axiomatic probability, conditional probability and Bayes' rule.",
    },
    objectives: [
      { zh: "掌握样本空间、事件与概率公理", en: "Master sample spaces, events and the probability axioms" },
      { zh: "熟练古典概型与计数", en: "Handle classical probability and counting" },
      { zh: "理解条件概率与独立性", en: "Understand conditional probability and independence" },
      { zh: "会用全概率公式与贝叶斯公式", en: "Apply the total-probability and Bayes formulas" },
    ],
    outline: [
      { zh: "样本空间与事件", en: "Sample spaces and events" },
      { zh: "概率的公理化定义", en: "Axiomatic probability" },
      { zh: "古典概型与几何概型", en: "Classical and geometric probability" },
      { zh: "条件概率与乘法公式", en: "Conditional probability" },
      { zh: "全概率与贝叶斯公式", en: "Total probability and Bayes" },
      { zh: "事件的独立性", en: "Independence of events" },
    ],
  },
  {
    id: "p2", code: "PS2", moduleId: "m3", difficulty: 2, hours: 12, prereq: ["p1", "g3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "随机变量及其分布", en: "Random Variables & Distributions" },
    summary: {
      zh: "随机变量把结果数值化。掌握分布列、密度函数与常见分布。",
      en: "Random variables turn outcomes into numbers. Master mass/density functions and the standard distributions.",
    },
    objectives: [
      { zh: "区分离散型与连续型随机变量", en: "Distinguish discrete and continuous random variables" },
      { zh: "掌握分布函数、分布列与密度函数", en: "Master CDFs, PMFs and PDFs" },
      { zh: "熟悉二项、泊松、均匀、指数与正态分布", en: "Know binomial, Poisson, uniform, exponential and normal" },
      { zh: "会求随机变量函数的分布", en: "Find the distribution of a function of a random variable" },
    ],
    outline: [
      { zh: "随机变量与分布函数", en: "Random variables and CDFs" },
      { zh: "离散型:分布列", en: "Discrete: probability mass functions" },
      { zh: "连续型:密度函数", en: "Continuous: density functions" },
      { zh: "常见分布", en: "Standard distributions" },
      { zh: "随机变量函数的分布", en: "Functions of a random variable" },
    ],
  },
  {
    id: "p3", code: "PS3", moduleId: "m3", difficulty: 2, hours: 10, prereq: ["p2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "期望、方差与协方差", en: "Expectation, Variance & Covariance" },
    summary: {
      zh: "用数字特征概括分布:期望刻画中心,方差刻画离散,协方差刻画相关。",
      en: "Summarize distributions with numbers: expectation for center, variance for spread, covariance for association.",
    },
    objectives: [
      { zh: "掌握期望与方差的定义与性质", en: "Master the definition and properties of expectation and variance" },
      { zh: "会计算常见分布的期望与方差", en: "Compute expectation/variance for standard distributions" },
      { zh: "理解协方差与相关系数", en: "Understand covariance and correlation" },
      { zh: "了解矩与切比雪夫不等式", en: "Know moments and Chebyshev's inequality" },
    ],
    outline: [
      { zh: "数学期望", en: "Mathematical expectation" },
      { zh: "方差与标准差", en: "Variance and standard deviation" },
      { zh: "协方差与相关系数", en: "Covariance and correlation" },
      { zh: "矩与母函数", en: "Moments and generating functions" },
      { zh: "切比雪夫不等式", en: "Chebyshev's inequality" },
    ],
  },
  {
    id: "p4", code: "PS4", moduleId: "m3", difficulty: 3, hours: 10, prereq: ["p3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "大数定律与中心极限定理", en: "LLN & Central Limit Theorem" },
    summary: {
      zh: "为什么样本均值会稳定、为什么正态分布无处不在——两条极限定理给出答案。",
      en: "Why sample averages stabilize and why the normal distribution is everywhere — two limit theorems answer both.",
    },
    objectives: [
      { zh: "理解依概率收敛与几种收敛性", en: "Understand convergence in probability and related modes" },
      { zh: "掌握(弱)大数定律的含义", en: "Grasp the (weak) law of large numbers" },
      { zh: "理解中心极限定理及其条件", en: "Understand the central limit theorem and its conditions" },
      { zh: "会用 CLT 做近似计算", en: "Use the CLT for approximate computation" },
    ],
    outline: [
      { zh: "随机变量序列的收敛", en: "Convergence of sequences of random variables" },
      { zh: "切比雪夫与辛钦大数定律", en: "Chebyshev and Khinchin laws of large numbers" },
      { zh: "伯努利大数定律", en: "Bernoulli's law of large numbers" },
      { zh: "中心极限定理", en: "The central limit theorem" },
      { zh: "正态近似的应用", en: "Applications of the normal approximation" },
    ],
  },

  /* ============ M4 离散数学 / Discrete Mathematics ============ */
  {
    id: "d1", code: "DM1", moduleId: "m4", difficulty: 1, hours: 8, prereq: [],
    nExamples: 5, nExercises: 6,
    title: { zh: "数理逻辑", en: "Mathematical Logic" },
    summary: {
      zh: "命题与谓词逻辑是严格推理的语法。掌握真值表、等价与推理规则。",
      en: "Propositional and predicate logic are the grammar of rigorous reasoning. Master truth tables, equivalences and inference.",
    },
    objectives: [
      { zh: "掌握命题联结词与真值表", en: "Master logical connectives and truth tables" },
      { zh: "理解逻辑等价与范式", en: "Understand logical equivalence and normal forms" },
      { zh: "掌握量词与谓词逻辑", en: "Master quantifiers and predicate logic" },
      { zh: "会进行基本的逻辑推理与证明", en: "Carry out basic logical inference and proofs" },
    ],
    outline: [
      { zh: "命题与联结词", en: "Propositions and connectives" },
      { zh: "真值表与逻辑等价", en: "Truth tables and equivalence" },
      { zh: "范式(析取/合取)", en: "Normal forms (DNF/CNF)" },
      { zh: "谓词与量词", en: "Predicates and quantifiers" },
      { zh: "推理规则与证明方法", en: "Inference rules and proof methods" },
    ],
  },
  {
    id: "d2", code: "DM2", moduleId: "m4", difficulty: 2, hours: 10, prereq: ["d1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "集合与关系", en: "Sets & Relations" },
    summary: {
      zh: "集合是数学的通用语言;关系与函数刻画元素之间的联系,等价关系与偏序尤为重要。",
      en: "Sets are the universal language of math; relations and functions capture how elements connect — equivalence relations and orders especially.",
    },
    objectives: [
      { zh: "掌握集合运算与基本恒等式", en: "Master set operations and identities" },
      { zh: "理解二元关系及其性质", en: "Understand binary relations and their properties" },
      { zh: "掌握等价关系与划分", en: "Master equivalence relations and partitions" },
      { zh: "理解偏序、函数与基数", en: "Understand partial orders, functions and cardinality" },
    ],
    outline: [
      { zh: "集合及其运算", en: "Sets and operations" },
      { zh: "二元关系与性质", en: "Binary relations and properties" },
      { zh: "等价关系与划分", en: "Equivalence relations and partitions" },
      { zh: "偏序关系与哈斯图", en: "Partial orders and Hasse diagrams" },
      { zh: "函数与基数", en: "Functions and cardinality" },
    ],
  },
  {
    id: "d3", code: "DM3", moduleId: "m4", difficulty: 2, hours: 10, prereq: ["d2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "图论基础", en: "Graph Theory" },
    summary: {
      zh: "用点和边为关系建模。掌握连通、路径、树与欧拉/哈密顿回路。",
      en: "Model relationships with vertices and edges. Master connectivity, paths, trees and Euler/Hamilton circuits.",
    },
    objectives: [
      { zh: "掌握图的基本概念与表示", en: "Master basic graph concepts and representations" },
      { zh: "理解通路、连通与最短路", en: "Understand walks, connectivity and shortest paths" },
      { zh: "掌握欧拉图与哈密顿图", en: "Master Euler and Hamiltonian graphs" },
      { zh: "理解树及其性质", en: "Understand trees and their properties" },
    ],
    outline: [
      { zh: "图的基本概念", en: "Basic concepts" },
      { zh: "图的矩阵表示", en: "Matrix representations" },
      { zh: "通路、回路与连通性", en: "Walks, circuits and connectivity" },
      { zh: "欧拉图与哈密顿图", en: "Euler and Hamiltonian graphs" },
      { zh: "树与生成树", en: "Trees and spanning trees" },
    ],
  },
  {
    id: "d4", code: "DM4", moduleId: "m4", difficulty: 3, hours: 10, prereq: ["d2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "组合与数论初步", en: "Combinatorics & Number Theory" },
    summary: {
      zh: "计数的艺术与整数的结构:排列组合、容斥、同余与最大公约数。",
      en: "The art of counting and the structure of integers: permutations, inclusion–exclusion, congruences and gcd.",
    },
    objectives: [
      { zh: "掌握排列、组合与二项式定理", en: "Master permutations, combinations and the binomial theorem" },
      { zh: "理解容斥原理与鸽巢原理", en: "Understand inclusion–exclusion and the pigeonhole principle" },
      { zh: "掌握整除、最大公约数与欧几里得算法", en: "Master divisibility, gcd and the Euclidean algorithm" },
      { zh: "理解同余与模运算", en: "Understand congruences and modular arithmetic" },
    ],
    outline: [
      { zh: "排列与组合", en: "Permutations and combinations" },
      { zh: "二项式定理", en: "The binomial theorem" },
      { zh: "容斥原理与鸽巢原理", en: "Inclusion–exclusion and pigeonhole" },
      { zh: "整除与最大公约数", en: "Divisibility and gcd" },
      { zh: "同余与模运算", en: "Congruences and modular arithmetic" },
    ],
  },
];

const TOTAL_HOURS = CHAPTERS.reduce((s, c) => s + c.hours, 0);
const TOTAL_EXAMPLES = CHAPTERS.reduce((s, c) => s + c.nExamples, 0);

window.MODULES = MODULES;
window.CHAPTERS = CHAPTERS;
window.TOTAL_HOURS = TOTAL_HOURS;
window.TOTAL_EXAMPLES = TOTAL_EXAMPLES;
