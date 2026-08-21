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
    id: "m9",
    code: "F1",
    zh: "数与式",
    en: "Numbers & Expressions",
    accent: "primary",
    level: 1,
    tagline: {
      zh: "代数的地基:把数和式子玩熟。",
      en: "The bedrock of algebra: get fluent with numbers and expressions.",
    },
    description: {
      zh: "从有理数、比例与百分数,到整式、因式分解、分式与二次根式。这是初中代数的根,后面所有方程、函数都从这里长出来。",
      en: "From rational numbers, ratios and percentages to polynomials, factoring, fractions and radicals. The root of middle-school algebra, from which every later equation and function grows.",
    },
  },
  {
    id: "m10",
    code: "F2",
    zh: "方程与不等式",
    en: "Equations & Inequalities",
    accent: "primary",
    level: 1,
    tagline: {
      zh: "几元几次方程,还有不等式。",
      en: "Equations of various kinds — and inequalities.",
    },
    description: {
      zh: "一元一次方程、二元/三元一次方程组、一元二次方程,以及一元一次与一元二次不等式。把「未知数」从文字题里解出来。",
      en: "Linear equations, systems in two or three unknowns, quadratic equations, and linear/quadratic inequalities. Solving for the unknown, from word problems to formulas.",
    },
  },
  {
    id: "m11",
    code: "F3",
    zh: "函数与几何",
    en: "Functions & Geometry",
    accent: "primary",
    level: 2,
    tagline: {
      zh: "用函数看变化,用几何看形状。",
      en: "Functions for change, geometry for shape.",
    },
    description: {
      zh: "一次函数、二次函数,以及三角形、勾股定理、相似与圆。函数把代数与图象连起来,几何训练严谨推理——都是高中与大学数学的门槛。",
      en: "Linear and quadratic functions, plus triangles, the Pythagorean theorem, similarity and circles. Functions tie algebra to graphs, geometry trains rigorous reasoning — both are the threshold to higher math.",
    },
  },
  {
    id: "m12",
    code: "F4",
    zh: "高中专项",
    en: "High-School Topics",
    accent: "primary",
    level: 2,
    tagline: {
      zh: "指对数、三角、数列——高中三大主力。",
      en: "Exponentials, trig and sequences — the high-school workhorses.",
    },
    description: {
      zh: "指数与对数、三角函数、三角恒等变换与解三角形、数列。高中数学的核心工具,直接通往微积分、复变与统计。",
      en: "Exponentials and logarithms, trigonometric functions, identities and solving triangles, and sequences. The core high-school toolkit, leading straight into calculus, complex analysis and statistics.",
    },
  },
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
      zh: "从极限出发,理解导数如何刻画瞬时变化、积分如何累积总量,再到多元微分、重积分、曲线曲面积分与无穷级数。这是几乎所有后续数学与工程的地基。",
      en: "Starting from limits, see how derivatives capture instantaneous change, how integrals accumulate totals, then on to multivariable differentiation, multiple integrals, line & surface integrals and infinite series. The bedrock of almost everything that follows.",
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
  {
    id: "m5",
    code: "M5",
    zh: "常微分方程",
    en: "Differential Equations",
    accent: "primary",
    level: 2,
    tagline: {
      zh: "用方程刻画「变化的规律」。",
      en: "Equations that describe how things change.",
    },
    description: {
      zh: "从一阶方程到高阶线性方程、方程组与拉普拉斯变换。微分方程把导数与未知函数联系起来,是物理、工程与建模的通用语言。",
      en: "From first-order equations to higher-order linear ones, systems, and the Laplace transform. Differential equations link derivatives to an unknown function — the common language of physics, engineering and modeling.",
    },
  },
  {
    id: "m6",
    code: "M6",
    zh: "复变函数",
    en: "Complex Analysis",
    accent: "primary",
    level: 3,
    tagline: {
      zh: "把微积分搬到复平面,世界忽然变简单。",
      en: "Move calculus to the complex plane and the world gets simpler.",
    },
    description: {
      zh: "复数与复变函数、解析函数与柯西-黎曼方程、复积分与柯西定理、级数与留数。解析性带来惊人的刚性,留数定理还能算实积分。",
      en: "Complex numbers and functions, analytic functions and the Cauchy–Riemann equations, complex integration and Cauchy's theorem, series and residues. Analyticity brings startling rigidity — and residues even evaluate real integrals.",
    },
  },
  {
    id: "m7",
    code: "M7",
    zh: "数理统计",
    en: "Mathematical Statistics",
    accent: "primary",
    level: 3,
    tagline: {
      zh: "从数据反推背后的概率规律。",
      en: "Inferring the probability behind the data.",
    },
    description: {
      zh: "抽样分布、参数估计、假设检验、回归与方差分析。概率论正向建模,统计反向推断——这是数据科学的方法论核心。",
      en: "Sampling distributions, estimation, hypothesis testing, regression and ANOVA. Probability models forward; statistics infers backward — the methodological core of data science.",
    },
  },
  {
    id: "m8",
    code: "M8",
    zh: "最优化",
    en: "Optimization",
    accent: "accent",
    level: 3,
    tagline: {
      zh: "在约束之下,找到最好的那个解。",
      en: "Finding the best solution under constraints.",
    },
    description: {
      zh: "凸集与凸函数、无约束与约束最优化、KKT 条件、线性规划与对偶。几乎所有「学习」与「决策」问题,最终都化归为一个最优化问题。",
      en: "Convex sets and functions, unconstrained and constrained optimization, the KKT conditions, linear programming and duality. Almost every learning or decision problem reduces, in the end, to an optimization problem.",
    },
  },
  {
    id: "m13",
    code: "KY",
    zh: "考研高频题型",
    en: "Exam Question Types",
    accent: "accent",
    level: 3,
    tagline: {
      zh: "把考点拆成题型,把公式追到出处。",
      en: "Turn exam topics into question types — and trace every formula to its source.",
    },
    description: {
      zh: "面向硕士研究生入学考试(数学一/二/三)的高频题型手册。按高等数学、线性代数、概率统计三大板块分类,逐一梳理常考题型的问法、解题套路与易错点;每种方法都标注其所依据的定理、公式或公理的出处——历史来源(何人、何时提出)加上本站对应章节,做到「知其然,更知其所以然」。",
      en: "A handbook of high-frequency question types for China's postgraduate entrance exam in mathematics (Papers I/II/III). Organized into calculus, linear algebra, and probability & statistics, it lays out — for each common question type — how it is asked, the solution routine, and the usual pitfalls. Every method cites the source of the theorem, formula, or axiom it rests on — the historical origin (who, and when) plus the matching chapter on this site — so you learn not just how, but why.",
    },
  },
];

const CHAPTERS = [
  /* ============ F1 数与式 / Numbers & Expressions ============ */
  {
    id: "n1", code: "NA1", moduleId: "m9", difficulty: 1, hours: 6, prereq: [],
    nExamples: 5, nExercises: 6,
    title: { zh: "有理数与实数", en: "Rational & Real Numbers" },
    summary: {
      zh: "把数从自然数一路扩到实数,弄清相反数、绝对值与四则运算。",
      en: "Extend numbers from the naturals to the reals; nail down opposites, absolute value and the four operations.",
    },
    objectives: [
      { zh: "理解有理数与无理数的区别", en: "Distinguish rational from irrational numbers" },
      { zh: "掌握相反数与绝对值", en: "Master opposites and absolute value" },
      { zh: "熟练有理数的四则运算与乘方", en: "Compute fluently with the four operations and powers" },
      { zh: "理解实数与数轴", en: "Understand the reals and the number line" },
    ],
    outline: [
      { zh: "数的扩充:整数、有理数、实数", en: "Extending numbers: integers, rationals, reals" },
      { zh: "相反数与绝对值", en: "Opposites and absolute value" },
      { zh: "有理数的四则运算", en: "Arithmetic of rational numbers" },
      { zh: "乘方与科学记数法", en: "Powers and scientific notation" },
      { zh: "实数、数轴与估算", en: "Reals, the number line and estimation" },
    ],
  },
  {
    id: "n2", code: "NA2", moduleId: "m9", difficulty: 1, hours: 6, prereq: ["n1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "比、比例与百分数", en: "Ratio, Proportion & Percentage" },
    summary: {
      zh: "用比和比例描述「成倍数的关系」,并用百分数解决利率、折扣、浓度问题。",
      en: "Describe proportional relationships with ratios, and use percentages for interest, discounts and concentration.",
    },
    objectives: [
      { zh: "理解比与比例及其性质", en: "Understand ratios, proportions and their properties" },
      { zh: "掌握百分数与百分点", en: "Master percentages and percentage points" },
      { zh: "会按比例分配", en: "Divide quantities in a given ratio" },
      { zh: "解决利率/折扣/浓度等应用题", en: "Solve interest, discount and mixture problems" },
    ],
    outline: [
      { zh: "比与比的化简", en: "Ratios and simplifying ratios" },
      { zh: "比例及其基本性质", en: "Proportions and their basic property" },
      { zh: "百分数与百分点", en: "Percentages and percentage points" },
      { zh: "按比例分配", en: "Proportional division" },
      { zh: "应用:利率、折扣、浓度", en: "Applications: interest, discount, concentration" },
    ],
  },
  {
    id: "n3", code: "NA3", moduleId: "m9", difficulty: 1, hours: 8, prereq: ["n2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "整式与因式分解", en: "Polynomials & Factoring" },
    summary: {
      zh: "整式的运算与乘法公式,以及把多项式「拆成乘积」的因式分解。",
      en: "Operations and special products for polynomials, and factoring — writing a polynomial as a product.",
    },
    objectives: [
      { zh: "掌握整式的加减乘", en: "Add, subtract and multiply polynomials" },
      { zh: "熟练幂的运算法则", en: "Apply the laws of exponents" },
      { zh: "掌握平方差与完全平方公式", en: "Use the difference-of-squares and perfect-square formulas" },
      { zh: "掌握常用因式分解方法", en: "Factor using the common techniques" },
    ],
    outline: [
      { zh: "单项式、多项式与整式", en: "Monomials, polynomials and integral expressions" },
      { zh: "幂的运算", en: "Laws of exponents" },
      { zh: "整式乘法与乘法公式", en: "Polynomial multiplication and special products" },
      { zh: "因式分解:提公因式", en: "Factoring: common factors" },
      { zh: "因式分解:公式法与十字相乘", en: "Factoring: formulas and the cross method" },
    ],
  },
  {
    id: "n4", code: "NA4", moduleId: "m9", difficulty: 2, hours: 8, prereq: ["n3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "分式与二次根式", en: "Fractions & Radicals" },
    summary: {
      zh: "把代数式当分数和根号来运算:约分、通分、化简与分母有理化。",
      en: "Compute with algebraic fractions and radicals: reduce, combine, simplify and rationalize.",
    },
    objectives: [
      { zh: "掌握分式的基本性质与约分", en: "Master the basic property of fractions and reduction" },
      { zh: "熟练分式的四则运算", en: "Compute with algebraic fractions" },
      { zh: "掌握二次根式的化简与运算", en: "Simplify and compute with square roots" },
      { zh: "会分母有理化", en: "Rationalize denominators" },
    ],
    outline: [
      { zh: "分式及其基本性质", en: "Algebraic fractions and their basic property" },
      { zh: "分式的运算", en: "Operations on fractions" },
      { zh: "二次根式与化简", en: "Square roots and simplification" },
      { zh: "根式的运算", en: "Operations on radicals" },
      { zh: "分母有理化", en: "Rationalizing the denominator" },
    ],
  },

  /* ============ F2 方程与不等式 / Equations & Inequalities ============ */
  {
    id: "e1", code: "EQ1", moduleId: "m10", difficulty: 1, hours: 6, prereq: ["n3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "一元一次方程", en: "Linear Equations in One Variable" },
    summary: {
      zh: "等式的性质、解方程的步骤,以及用方程把文字题翻译成数学。",
      en: "Properties of equality, the steps to solve, and turning word problems into equations.",
    },
    objectives: [
      { zh: "理解方程与等式的性质", en: "Understand equations and properties of equality" },
      { zh: "掌握解一元一次方程的步骤", en: "Master the steps for solving linear equations" },
      { zh: "会去分母、去括号、移项", en: "Clear denominators, brackets and transpose terms" },
      { zh: "列方程解应用题", en: "Set up equations for word problems" },
    ],
    outline: [
      { zh: "方程与等式的性质", en: "Equations and properties of equality" },
      { zh: "解一元一次方程", en: "Solving a linear equation" },
      { zh: "含分母的方程", en: "Equations with denominators" },
      { zh: "列方程解应用题", en: "Modeling with equations" },
      { zh: "行程、工程、和差倍问题", en: "Rate, work and part-whole problems" },
    ],
  },
  {
    id: "e2", code: "EQ2", moduleId: "m10", difficulty: 2, hours: 8, prereq: ["e1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "二元、三元一次方程组", en: "Systems of Linear Equations" },
    summary: {
      zh: "多个未知数、多个方程:用消元法把方程组化简、求解。",
      en: "Several unknowns, several equations: solve a system by elimination.",
    },
    objectives: [
      { zh: "理解二元一次方程组及其解", en: "Understand a system in two unknowns and its solution" },
      { zh: "掌握代入消元法", en: "Master substitution" },
      { zh: "掌握加减消元法", en: "Master elimination by addition" },
      { zh: "会解三元一次方程组并应用", en: "Solve and apply three-variable systems" },
    ],
    outline: [
      { zh: "二元一次方程与方程组", en: "Two-variable equations and systems" },
      { zh: "代入消元法", en: "Solving by substitution" },
      { zh: "加减消元法", en: "Solving by elimination" },
      { zh: "三元一次方程组", en: "Three-variable systems" },
      { zh: "方程组的应用", en: "Applications of systems" },
    ],
  },
  {
    id: "e3", code: "EQ3", moduleId: "m10", difficulty: 2, hours: 8, prereq: ["e1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "一元二次方程", en: "Quadratic Equations" },
    summary: {
      zh: "二次方程的四种解法、判别式,以及根与系数的韦达关系。",
      en: "Four ways to solve a quadratic, the discriminant, and Vieta's relations between roots and coefficients.",
    },
    objectives: [
      { zh: "掌握配方法、公式法、因式分解法", en: "Solve by completing the square, the formula and factoring" },
      { zh: "理解判别式与根的情况", en: "Use the discriminant to count real roots" },
      { zh: "掌握根与系数的关系(韦达)", en: "Master Vieta's formulas" },
      { zh: "列一元二次方程解应用题", en: "Model problems with quadratics" },
    ],
    outline: [
      { zh: "一元二次方程的概念", en: "What a quadratic equation is" },
      { zh: "配方法", en: "Completing the square" },
      { zh: "求根公式与判别式", en: "The quadratic formula and discriminant" },
      { zh: "因式分解法", en: "Solving by factoring" },
      { zh: "韦达定理与应用", en: "Vieta's formulas and applications" },
    ],
  },
  {
    id: "e4", code: "EQ4", moduleId: "m10", difficulty: 2, hours: 7, prereq: ["e1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "不等式与不等式组", en: "Inequalities" },
    summary: {
      zh: "不等式的性质,解一元一次/二次不等式,并在数轴上表示解集。",
      en: "Properties of inequalities, solving linear and quadratic ones, and picturing solution sets on the number line.",
    },
    objectives: [
      { zh: "掌握不等式的性质", en: "Master the properties of inequalities" },
      { zh: "解一元一次不等式与不等式组", en: "Solve linear inequalities and systems" },
      { zh: "解一元二次不等式", en: "Solve quadratic inequalities" },
      { zh: "在数轴上表示解集", en: "Represent solution sets on the number line" },
    ],
    outline: [
      { zh: "不等式及其性质", en: "Inequalities and their properties" },
      { zh: "一元一次不等式", en: "Linear inequalities" },
      { zh: "一元一次不等式组", en: "Systems of linear inequalities" },
      { zh: "一元二次不等式", en: "Quadratic inequalities" },
      { zh: "含绝对值的不等式初步", en: "A first look at absolute-value inequalities" },
    ],
  },

  /* ============ F3 函数与几何 / Functions & Geometry ============ */
  {
    id: "f1", code: "FG1", moduleId: "m11", difficulty: 1, hours: 7, prereq: ["e1"], viz: ["proportion", "proportionRatio", "proportionRealWorld", "proportionThroughPoint", "proportionFamily", "linear"],
    nExamples: 5, nExercises: 6,
    title: { zh: "一次函数", en: "Linear Functions" },
    summary: {
      zh: "函数是「变量之间的对应」;一次函数是一条直线,k 和 b 决定它的样子。",
      en: "A function is a correspondence between variables; a linear function is a line, shaped by its slope k and intercept b.",
    },
    objectives: [
      { zh: "理解函数与函数图象", en: "Understand functions and their graphs" },
      { zh: "掌握一次函数的图象与性质", en: "Master the graph and properties of a linear function" },
      { zh: "用待定系数法求解析式", en: "Find the formula by undetermined coefficients" },
      { zh: "理解一次函数与方程、不等式的联系", en: "Relate linear functions to equations and inequalities" },
    ],
    outline: [
      { zh: "变量、函数与图象", en: "Variables, functions and graphs" },
      { zh: "正比例函数", en: "Direct proportion" },
      { zh: "一次函数的图象与性质(k、b)", en: "Graph and properties (slope and intercept)" },
      { zh: "待定系数法求解析式", en: "Finding the formula" },
      { zh: "一次函数与方程、不等式", en: "Links to equations and inequalities" },
    ],
  },
  {
    id: "f2", code: "FG2", moduleId: "m11", difficulty: 2, hours: 8, prereq: ["e3"], viz: "quadratic",
    nExamples: 5, nExercises: 6,
    title: { zh: "二次函数", en: "Quadratic Functions" },
    summary: {
      zh: "抛物线:顶点、对称轴与最值,以及它和一元二次方程的关系。",
      en: "The parabola: vertex, axis of symmetry and extremum — and its link to the quadratic equation.",
    },
    objectives: [
      { zh: "掌握二次函数的图象与性质", en: "Master the graph and properties of a quadratic" },
      { zh: "会求顶点、对称轴与最值", en: "Find the vertex, axis and extreme value" },
      { zh: "用配方与待定系数求解析式", en: "Find the formula by completing the square / coefficients" },
      { zh: "理解二次函数与一元二次方程的关系", en: "Relate the parabola to the quadratic equation" },
    ],
    outline: [
      { zh: "二次函数的图象(抛物线)", en: "The graph: a parabola" },
      { zh: "顶点式与对称轴", en: "Vertex form and the axis of symmetry" },
      { zh: "开口、增减性与最值", en: "Opening, monotonicity and extremum" },
      { zh: "待定系数法", en: "Determining the coefficients" },
      { zh: "二次函数与方程/不等式", en: "Links to equations and inequalities" },
    ],
  },
  {
    id: "f3", code: "FG3", moduleId: "m11", difficulty: 1, hours: 7, prereq: [],
    nExamples: 5, nExercises: 6,
    title: { zh: "三角形与勾股定理", en: "Triangles & the Pythagorean Theorem" },
    summary: {
      zh: "三角形的边角关系、全等的判定,以及直角三角形的勾股定理。",
      en: "Sides and angles of triangles, tests for congruence, and the Pythagorean theorem for right triangles.",
    },
    objectives: [
      { zh: "掌握三角形的内角和与边角关系", en: "Master the angle sum and side–angle relations" },
      { zh: "理解全等三角形的判定", en: "Understand the congruence tests" },
      { zh: "掌握勾股定理及其逆定理", en: "Master the Pythagorean theorem and its converse" },
      { zh: "了解等腰与等边三角形", en: "Know isosceles and equilateral triangles" },
    ],
    outline: [
      { zh: "三角形的边角关系与内角和", en: "Sides, angles and the angle sum" },
      { zh: "全等三角形的判定", en: "Congruence tests (SSS/SAS/ASA/AAS/HL)" },
      { zh: "等腰与等边三角形", en: "Isosceles and equilateral triangles" },
      { zh: "勾股定理", en: "The Pythagorean theorem" },
      { zh: "勾股定理的逆定理与应用", en: "The converse and applications" },
    ],
  },
  {
    id: "f4", code: "FG4", moduleId: "m11", difficulty: 2, hours: 8, prereq: ["f3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "圆与相似", en: "Circles & Similarity" },
    summary: {
      zh: "相似三角形把「形状相同」量化,圆则有一套漂亮的角与线的定理。",
      en: "Similar triangles quantify “same shape”; circles come with an elegant set of angle and line theorems.",
    },
    objectives: [
      { zh: "掌握相似三角形的判定与性质", en: "Master the tests and properties of similar triangles" },
      { zh: "理解平行线分线段成比例", en: "Understand the proportional-segments theorem" },
      { zh: "掌握圆的基本性质与圆周角定理", en: "Master circle properties and the inscribed-angle theorem" },
      { zh: "了解切线、弧长与扇形面积", en: "Know tangents, arc length and sector area" },
    ],
    outline: [
      { zh: "相似三角形的判定与性质", en: "Tests and properties of similar triangles" },
      { zh: "平行线分线段成比例", en: "Proportional segments from parallels" },
      { zh: "圆的基本概念与性质", en: "Basic concepts and properties of circles" },
      { zh: "圆周角定理", en: "The inscribed-angle theorem" },
      { zh: "切线、弧长与扇形面积", en: "Tangents, arc length and sector area" },
    ],
  },

  /* ============ F4 高中专项 / High-School Topics ============ */
  {
    id: "h1", code: "HS1", moduleId: "m12", difficulty: 2, hours: 8, prereq: ["n4"], viz: "explog",
    nExamples: 5, nExercises: 6,
    title: { zh: "指数与对数", en: "Exponentials & Logarithms" },
    summary: {
      zh: "指数函数与对数函数互为反函数;掌握它们的运算法则、图象与性质。",
      en: "Exponential and logarithmic functions are inverses; master their laws, graphs and properties.",
    },
    objectives: [
      { zh: "掌握分数指数幂与指数运算", en: "Master fractional exponents and the laws of exponents" },
      { zh: "掌握对数运算法则", en: "Master the laws of logarithms" },
      { zh: "理解指数函数与对数函数互为反函数", en: "Understand exp and log as inverse functions" },
      { zh: "会解简单的指数、对数方程与不等式", en: "Solve simple exponential and logarithmic equations/inequalities" },
    ],
    outline: [
      { zh: "指数与指数运算(分数指数幂)", en: "Exponents and fractional powers" },
      { zh: "指数函数的图象与性质", en: "The exponential function: graph and properties" },
      { zh: "对数与对数运算法则", en: "Logarithms and their laws" },
      { zh: "对数函数的图象与性质", en: "The logarithmic function: graph and properties" },
      { zh: "指数对数方程与不等式", en: "Exponential and logarithmic equations/inequalities" },
    ],
  },
  {
    id: "h2", code: "HS2", moduleId: "m12", difficulty: 2, hours: 10, prereq: ["f3"], viz: "trig",
    nExamples: 5, nExercises: 6,
    title: { zh: "三角函数", en: "Trigonometric Functions" },
    summary: {
      zh: "用单位圆定义任意角的三角函数,理解它们的周期图象与正弦型变换。",
      en: "Define trig functions for any angle via the unit circle; understand their periodic graphs and sinusoidal transforms.",
    },
    objectives: [
      { zh: "理解弧度制与任意角", en: "Understand radians and angles of any size" },
      { zh: "掌握三角函数的定义与同角关系", en: "Master the definitions and the Pythagorean identity" },
      { zh: "掌握三角函数的图象与性质", en: "Master the graphs and properties of trig functions" },
      { zh: "理解 y=A sin(ωx+φ) 的图象变换", en: "Understand the transforms of y=A·sin(ωx+φ)" },
    ],
    outline: [
      { zh: "角与弧度制", en: "Angles and radian measure" },
      { zh: "任意角三角函数的定义(单位圆)", en: "Trig functions via the unit circle" },
      { zh: "同角关系与诱导公式", en: "The Pythagorean identity and reduction formulas" },
      { zh: "正弦、余弦、正切的图象与性质", en: "Graphs and properties of sin, cos, tan" },
      { zh: "函数 y=A sin(ωx+φ)", en: "The function y=A·sin(ωx+φ)" },
    ],
  },
  {
    id: "h3", code: "HS3", moduleId: "m12", difficulty: 3, hours: 8, prereq: ["h2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "三角恒等变换与解三角形", en: "Trig Identities & Triangles" },
    summary: {
      zh: "和差倍角公式用于化简求值;正弦、余弦定理用于解三角形。",
      en: "Sum/difference and double-angle formulas simplify expressions; the law of sines and cosines solve triangles.",
    },
    objectives: [
      { zh: "掌握两角和差与二倍角公式", en: "Master the sum/difference and double-angle formulas" },
      { zh: "会化简与求值三角式", en: "Simplify and evaluate trigonometric expressions" },
      { zh: "掌握正弦定理与余弦定理", en: "Master the laws of sines and cosines" },
      { zh: "会解三角形并求面积", en: "Solve triangles and find areas" },
    ],
    outline: [
      { zh: "两角和与差的公式", en: "Sum and difference formulas" },
      { zh: "二倍角公式", en: "Double-angle formulas" },
      { zh: "三角函数式的化简与求值", en: "Simplifying and evaluating expressions" },
      { zh: "正弦定理与余弦定理", en: "The laws of sines and cosines" },
      { zh: "解三角形与面积", en: "Solving triangles and areas" },
    ],
  },
  {
    id: "h4", code: "HS4", moduleId: "m12", difficulty: 2, hours: 8, prereq: ["n3"], viz: "sequence",
    nExamples: 5, nExercises: 6,
    title: { zh: "数列", en: "Sequences & Series" },
    summary: {
      zh: "等差与等比数列的通项与求和,以及错位相减、裂项等求和技巧。",
      en: "General terms and sums of arithmetic and geometric sequences, plus summation tricks.",
    },
    objectives: [
      { zh: "理解数列与通项公式", en: "Understand sequences and general-term formulas" },
      { zh: "掌握等差数列及其求和", en: "Master arithmetic sequences and their sums" },
      { zh: "掌握等比数列及其求和", en: "Master geometric sequences and their sums" },
      { zh: "会用错位相减、裂项等求和方法", en: "Use shifting-subtraction and telescoping to sum series" },
    ],
    outline: [
      { zh: "数列的概念与通项", en: "Sequences and the general term" },
      { zh: "等差数列", en: "Arithmetic sequences" },
      { zh: "等差数列求和", en: "Sums of arithmetic sequences" },
      { zh: "等比数列与求和", en: "Geometric sequences and their sums" },
      { zh: "数列求和的常用方法", en: "Common summation techniques" },
    ],
  },

  /* ============ M1 高等数学 / Calculus ============ */
  {
    id: "g1", code: "MA1", moduleId: "m1", difficulty: 1, hours: 10, prereq: ["f2"],
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
    id: "g2", code: "MA2", moduleId: "m1", difficulty: 2, hours: 12, prereq: ["g1"], viz: "derivative",
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
    id: "g3", code: "MA3", moduleId: "m1", difficulty: 2, hours: 14, prereq: ["g2"], viz: "riemann",
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
    id: "g4", code: "MA4", moduleId: "m1", difficulty: 3, hours: 12, prereq: ["g3", "h4"],
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
  {
    id: "g5", code: "MA5", moduleId: "m1", difficulty: 2, hours: 14, prereq: ["g2"],
    viz: ["partialSlice", "gradientField"],
    nExamples: 6, nExercises: 6,
    title: { zh: "多元函数微分学", en: "Multivariable Differential Calculus" },
    summary: {
      zh: "把导数推广到多元:偏导数、全微分、链式法则,直到梯度与条件极值。",
      en: "Extending the derivative to several variables: partial derivatives, the total differential, the chain rule, and on to gradients and constrained extrema.",
    },
    objectives: [
      { zh: "理解多元函数的极限、连续与偏导数", en: "Understand limits, continuity and partial derivatives of several variables" },
      { zh: "掌握全微分及其与偏导数的关系", en: "Master the total differential and its link to partial derivatives" },
      { zh: "熟练多元复合函数与隐函数求导", en: "Differentiate composite and implicit multivariable functions" },
      { zh: "会用梯度与拉格朗日乘数法求(条件)极值", en: "Use the gradient and Lagrange multipliers for (constrained) extrema" },
    ],
    outline: [
      { zh: "多元函数、极限与连续", en: "Functions of several variables, limits and continuity" },
      { zh: "偏导数", en: "Partial derivatives" },
      { zh: "全微分", en: "The total differential" },
      { zh: "多元复合函数与隐函数求导", en: "Chain rule and implicit differentiation" },
      { zh: "方向导数与梯度", en: "Directional derivatives and the gradient" },
      { zh: "极值与条件极值(拉格朗日乘数法)", en: "Extrema and constrained extrema (Lagrange multipliers)" },
    ],
  },
  {
    id: "g6", code: "MA6", moduleId: "m1", difficulty: 2, hours: 12, prereq: ["g3"],
    viz: ["doubleRiemann", "orderSwap"],
    nExamples: 6, nExercises: 6,
    title: { zh: "重积分", en: "Multiple Integrals" },
    summary: {
      zh: "把定积分推广到平面与空间:二重、三重积分的计算(直角/极坐标)与应用。",
      en: "Extending the definite integral to the plane and space: double and triple integrals (rectangular / polar) and their applications.",
    },
    objectives: [
      { zh: "理解二重积分的概念与性质", en: "Understand the concept and properties of the double integral" },
      { zh: "掌握直角坐标下化二重积分为累次积分并会交换次序", en: "Reduce a double integral to iterated integrals and swap the order" },
      { zh: "掌握极坐标下二重积分的计算", en: "Evaluate double integrals in polar coordinates" },
      { zh: "了解三重积分与重积分的几何/物理应用", en: "Know triple integrals and the geometric/physical applications" },
    ],
    outline: [
      { zh: "二重积分的概念与性质", en: "The double integral: concept and properties" },
      { zh: "直角坐标下的二重积分(累次积分)", en: "Double integrals in rectangular coordinates (iterated integrals)" },
      { zh: "交换积分次序", en: "Swapping the order of integration" },
      { zh: "极坐标下的二重积分", en: "Double integrals in polar coordinates" },
      { zh: "三重积分简介", en: "A first look at triple integrals" },
      { zh: "重积分的应用(体积、质量、形心)", en: "Applications (volume, mass, centroid)" },
    ],
  },
  {
    id: "g7", code: "MA7", moduleId: "m1", difficulty: 3, hours: 14, prereq: ["g6"],
    viz: "greenTheorem",
    nExamples: 6, nExercises: 6,
    title: { zh: "曲线积分与曲面积分", en: "Line & Surface Integrals" },
    summary: {
      zh: "把积分搬到曲线与曲面上:两类曲线/曲面积分,以及格林、高斯、斯托克斯三大公式。",
      en: "Integrate along curves and over surfaces: the two kinds of line/surface integrals, and the theorems of Green, Gauss and Stokes.",
    },
    objectives: [
      { zh: "掌握两类曲线积分的定义与计算(参数化)", en: "Master both kinds of line integral and compute them by parametrization" },
      { zh: "会用格林公式,并判断平面曲线积分的路径无关性", en: "Use Green's theorem and test path independence" },
      { zh: "掌握两类曲面积分的定义与计算(投影法)", en: "Master both kinds of surface integral via projection" },
      { zh: "理解高斯公式与斯托克斯公式及其应用", en: "Understand the Gauss and Stokes theorems and their uses" },
    ],
    outline: [
      { zh: "第一类曲线积分(对弧长)", en: "Line integrals w.r.t. arc length (first kind)" },
      { zh: "第二类曲线积分(对坐标)", en: "Line integrals w.r.t. coordinates (second kind)" },
      { zh: "格林公式与路径无关", en: "Green's theorem and path independence" },
      { zh: "第一类与第二类曲面积分", en: "Surface integrals of the first and second kind" },
      { zh: "高斯公式(散度定理)", en: "The Gauss (divergence) theorem" },
      { zh: "斯托克斯公式", en: "Stokes' theorem" },
    ],
  },

  /* ============ M2 线性代数 / Linear Algebra ============ */
  {
    id: "a1", code: "LA1", moduleId: "m2", difficulty: 1, hours: 8, prereq: ["e2"],
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
    id: "p2", code: "PS2", moduleId: "m3", difficulty: 2, hours: 12, prereq: ["p1", "g3"], viz: "normal",
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
    viz: ["permSlots", "combSelect", "permVsComb", "pascalTriangle"],
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

  /* ============ M5 常微分方程 / Differential Equations ============ */
  {
    id: "o1", code: "ODE1", moduleId: "m5", difficulty: 2, hours: 10, prereq: ["g3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "一阶微分方程", en: "First-Order ODEs" },
    summary: {
      zh: "识别方程类型并选对解法:可分离变量、齐次、一阶线性与伯努利方程。",
      en: "Recognize the type and pick the method: separable, homogeneous, linear and Bernoulli equations.",
    },
    objectives: [
      { zh: "理解微分方程的阶、解与通解/特解", en: "Understand order, solutions, and general vs particular solutions" },
      { zh: "掌握可分离变量与齐次方程", en: "Solve separable and homogeneous equations" },
      { zh: "掌握一阶线性方程的积分因子法", en: "Use the integrating factor for first-order linear ODEs" },
      { zh: "了解伯努利方程与初值问题", en: "Know Bernoulli equations and initial-value problems" },
    ],
    outline: [
      { zh: "基本概念:阶、解、通解", en: "Basics: order, solutions, general solution" },
      { zh: "可分离变量方程", en: "Separable equations" },
      { zh: "齐次方程", en: "Homogeneous equations" },
      { zh: "一阶线性方程与积分因子", en: "Linear equations and integrating factors" },
      { zh: "伯努利方程与初值问题", en: "Bernoulli equations and IVPs" },
    ],
  },
  {
    id: "o2", code: "ODE2", moduleId: "m5", difficulty: 2, hours: 12, prereq: ["o1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "高阶线性微分方程", en: "Higher-Order Linear ODEs" },
    summary: {
      zh: "线性方程解的结构 = 齐次通解 + 一个特解;常系数情形靠特征方程。",
      en: "A linear ODE's solution = homogeneous general solution + one particular solution; constant coefficients hinge on the characteristic equation.",
    },
    objectives: [
      { zh: "理解线性微分方程解的结构与叠加原理", en: "Understand solution structure and superposition" },
      { zh: "用特征方程求常系数齐次方程通解", en: "Solve constant-coefficient homogeneous ODEs via the characteristic equation" },
      { zh: "处理复根与重根情形", en: "Handle complex and repeated roots" },
      { zh: "用待定系数法/常数变易法求特解", en: "Find particular solutions by undetermined coefficients / variation of parameters" },
    ],
    outline: [
      { zh: "线性方程解的结构", en: "Structure of the solution" },
      { zh: "常系数齐次方程与特征方程", en: "Constant-coefficient homogeneous equations" },
      { zh: "复根与重根", en: "Complex and repeated roots" },
      { zh: "待定系数法", en: "Method of undetermined coefficients" },
      { zh: "常数变易法", en: "Variation of parameters" },
    ],
  },
  {
    id: "o3", code: "ODE3", moduleId: "m5", difficulty: 3, hours: 12, prereq: ["o2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "微分方程组与相平面", en: "Systems & the Phase Plane" },
    summary: {
      zh: "把高阶方程化为一阶方程组,用特征值法求解,并在相平面上看稳定性。",
      en: "Turn higher-order equations into first-order systems, solve by eigenvalues, and read stability off the phase plane.",
    },
    objectives: [
      { zh: "把高阶方程化为一阶方程组", en: "Convert higher-order equations to first-order systems" },
      { zh: "用特征值-特征向量解线性常系数方程组", en: "Solve linear constant-coefficient systems via eigenvalues" },
      { zh: "理解相平面、轨线与平衡点", en: "Understand the phase plane, trajectories and equilibria" },
      { zh: "判断平衡点的类型与稳定性", en: "Classify equilibria and their stability" },
    ],
    outline: [
      { zh: "一阶线性方程组", en: "First-order linear systems" },
      { zh: "特征值-特征向量解法", en: "The eigenvalue method" },
      { zh: "相平面与轨线", en: "Phase plane and trajectories" },
      { zh: "平衡点的分类与稳定性", en: "Classification and stability of equilibria" },
      { zh: "线性化与应用", en: "Linearization and applications" },
    ],
  },
  {
    id: "o4", code: "ODE4", moduleId: "m5", difficulty: 3, hours: 10, prereq: ["o2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "拉普拉斯变换", en: "The Laplace Transform" },
    summary: {
      zh: "把微分方程变成代数方程:变换、求解、再逆变换回去。",
      en: "Turn a differential equation into an algebraic one: transform, solve, then invert.",
    },
    objectives: [
      { zh: "掌握拉普拉斯变换的定义与基本性质", en: "Master the definition and key properties of the Laplace transform" },
      { zh: "用变换把初值问题化为代数方程", en: "Reduce IVPs to algebraic equations via the transform" },
      { zh: "掌握逆变换与部分分式", en: "Invert transforms using partial fractions" },
      { zh: "处理阶跃函数与冲激", en: "Handle step functions and impulses" },
    ],
    outline: [
      { zh: "定义与存在性", en: "Definition and existence" },
      { zh: "基本性质(线性、微分、位移)", en: "Key properties (linearity, derivative, shift)" },
      { zh: "逆变换与部分分式", en: "Inverse transform and partial fractions" },
      { zh: "求解初值问题", en: "Solving initial-value problems" },
      { zh: "阶跃函数与 δ 函数", en: "Step and delta functions" },
    ],
  },

  /* ============ M6 复变函数 / Complex Analysis ============ */
  {
    id: "z1", code: "CA1", moduleId: "m6", difficulty: 2, hours: 8, prereq: ["g2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "复数与复变函数", en: "Complex Numbers & Functions" },
    summary: {
      zh: "复数的代数与几何、欧拉公式,以及复变函数作为复平面之间的映射。",
      en: "The algebra and geometry of complex numbers, Euler's formula, and complex functions as maps between planes.",
    },
    objectives: [
      { zh: "熟练复数的模、辐角与运算", en: "Work fluently with modulus, argument and operations" },
      { zh: "掌握欧拉公式与复指数", en: "Master Euler's formula and the complex exponential" },
      { zh: "理解复对数与复幂的多值性", en: "Understand the multivaluedness of complex log and powers" },
      { zh: "把复变函数看成映射", en: "See a complex function as a mapping" },
    ],
    outline: [
      { zh: "复数及其几何表示", en: "Complex numbers and their geometry" },
      { zh: "欧拉公式与复指数", en: "Euler's formula and the complex exponential" },
      { zh: "复对数与复幂", en: "Complex logarithm and powers" },
      { zh: "复变函数与映射", en: "Complex functions and mappings" },
      { zh: "极限与连续", en: "Limits and continuity" },
    ],
  },
  {
    id: "z2", code: "CA2", moduleId: "m6", difficulty: 3, hours: 10, prereq: ["z1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "解析函数", en: "Analytic Functions" },
    summary: {
      zh: "复可导比实可导强得多:柯西-黎曼方程,以及解析与调和的联系。",
      en: "Complex differentiability is far stronger than real: the Cauchy–Riemann equations and the link to harmonic functions.",
    },
    objectives: [
      { zh: "区分复可导与解析", en: "Distinguish complex-differentiable from analytic" },
      { zh: "掌握柯西-黎曼方程", en: "Master the Cauchy–Riemann equations" },
      { zh: "理解调和函数与共轭调和", en: "Understand harmonic and conjugate-harmonic functions" },
      { zh: "熟悉初等解析函数", en: "Know the elementary analytic functions" },
    ],
    outline: [
      { zh: "复导数与可导性", en: "The complex derivative" },
      { zh: "柯西-黎曼方程", en: "The Cauchy–Riemann equations" },
      { zh: "解析函数的定义与判定", en: "Analytic functions: definition and tests" },
      { zh: "调和函数与共轭调和函数", en: "Harmonic and conjugate-harmonic functions" },
      { zh: "初等解析函数", en: "Elementary analytic functions" },
    ],
  },
  {
    id: "z3", code: "CA3", moduleId: "m6", difficulty: 3, hours: 12, prereq: ["z2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "复积分与柯西定理", en: "Complex Integration & Cauchy's Theorem" },
    summary: {
      zh: "解析函数沿闭路的积分为零,而柯西积分公式让函数值由边界决定。",
      en: "An analytic function integrates to zero around a loop, and Cauchy's formula fixes interior values from the boundary.",
    },
    objectives: [
      { zh: "掌握复积分的定义与计算", en: "Compute complex line integrals" },
      { zh: "理解柯西-古萨基本定理", en: "Understand the Cauchy–Goursat theorem" },
      { zh: "掌握柯西积分公式", en: "Master the Cauchy integral formula" },
      { zh: "了解解析函数的高阶导数公式", en: "Know the formula for higher derivatives" },
    ],
    outline: [
      { zh: "复积分的定义与性质", en: "Complex integrals: definition and properties" },
      { zh: "柯西-古萨基本定理", en: "The Cauchy–Goursat theorem" },
      { zh: "复合闭路与路径变形", en: "Composite contours and deformation" },
      { zh: "柯西积分公式", en: "The Cauchy integral formula" },
      { zh: "解析函数的无穷可导性", en: "Infinite differentiability of analytic functions" },
    ],
  },
  {
    id: "z4", code: "CA4", moduleId: "m6", difficulty: 3, hours: 12, prereq: ["z3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "级数与留数", en: "Series & Residues" },
    summary: {
      zh: "洛朗级数刻画奇点,留数定理把围道积分变成「数留数」,还能算实积分。",
      en: "Laurent series capture singularities; the residue theorem turns contour integrals into summing residues — and even evaluates real integrals.",
    },
    objectives: [
      { zh: "掌握泰勒与洛朗级数展开", en: "Master Taylor and Laurent expansions" },
      { zh: "识别孤立奇点的类型", en: "Classify isolated singularities" },
      { zh: "掌握留数定理", en: "Master the residue theorem" },
      { zh: "会用留数计算实积分", en: "Evaluate real integrals via residues" },
    ],
    outline: [
      { zh: "复级数与泰勒展开", en: "Complex series and Taylor expansion" },
      { zh: "洛朗级数", en: "Laurent series" },
      { zh: "孤立奇点的分类", en: "Classifying isolated singularities" },
      { zh: "留数与留数定理", en: "Residues and the residue theorem" },
      { zh: "用留数计算实积分", en: "Real integrals via residues" },
    ],
  },

  /* ============ M7 数理统计 / Mathematical Statistics ============ */
  {
    id: "s1", code: "MS1", moduleId: "m7", difficulty: 2, hours: 10, prereq: ["p4"],
    nExamples: 5, nExercises: 6,
    title: { zh: "抽样与抽样分布", en: "Sampling & Sampling Distributions" },
    summary: {
      zh: "样本、统计量,以及由正态总体导出的 χ²、t、F 三大抽样分布。",
      en: "Samples, statistics, and the three sampling distributions from a normal population: χ², t and F.",
    },
    objectives: [
      { zh: "理解总体、样本与统计量", en: "Understand population, sample and statistic" },
      { zh: "掌握样本均值与样本方差的性质", en: "Know the properties of the sample mean and variance" },
      { zh: "认识 χ²、t、F 分布", en: "Recognize the χ², t and F distributions" },
      { zh: "掌握正态总体的抽样分布定理", en: "Master the sampling theorems for a normal population" },
    ],
    outline: [
      { zh: "总体与样本", en: "Population and sample" },
      { zh: "统计量与经验分布", en: "Statistics and the empirical distribution" },
      { zh: "χ² 分布", en: "The χ² distribution" },
      { zh: "t 分布与 F 分布", en: "The t and F distributions" },
      { zh: "正态总体的抽样分布", en: "Sampling distributions for a normal population" },
    ],
  },
  {
    id: "s2", code: "MS2", moduleId: "m7", difficulty: 3, hours: 12, prereq: ["s1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "参数估计", en: "Parameter Estimation" },
    summary: {
      zh: "用样本估计未知参数:矩估计、极大似然,以及带置信度的区间估计。",
      en: "Estimate unknown parameters from data: moments, maximum likelihood, and confidence intervals.",
    },
    objectives: [
      { zh: "掌握矩估计与极大似然估计", en: "Master the method of moments and MLE" },
      { zh: "理解无偏性、有效性与相合性", en: "Understand unbiasedness, efficiency and consistency" },
      { zh: "掌握区间估计与置信区间", en: "Master interval estimation and confidence intervals" },
      { zh: "会做正态总体参数的区间估计", en: "Build CIs for normal-population parameters" },
    ],
    outline: [
      { zh: "点估计:矩估计法", en: "Point estimation: method of moments" },
      { zh: "极大似然估计", en: "Maximum likelihood estimation" },
      { zh: "估计量的评价标准", en: "Criteria for estimators" },
      { zh: "区间估计与置信区间", en: "Interval estimation and confidence intervals" },
      { zh: "正态总体参数的区间估计", en: "CIs for normal-population parameters" },
    ],
  },
  {
    id: "s3", code: "MS3", moduleId: "m7", difficulty: 3, hours: 12, prereq: ["s2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "假设检验", en: "Hypothesis Testing" },
    summary: {
      zh: "用数据对一个命题做出「拒绝/不拒绝」的判断,并权衡两类错误。",
      en: "Decide whether to reject a claim from data, weighing the two kinds of error.",
    },
    objectives: [
      { zh: "理解假设检验的逻辑与两类错误", en: "Understand the logic of testing and the two error types" },
      { zh: "掌握正态总体均值/方差的检验", en: "Test the mean and variance of a normal population" },
      { zh: "理解 p 值与显著性水平", en: "Understand p-values and significance levels" },
      { zh: "了解拟合优度与独立性检验", en: "Know goodness-of-fit and independence tests" },
    ],
    outline: [
      { zh: "假设检验的基本思想", en: "The idea of hypothesis testing" },
      { zh: "两类错误与检验功效", en: "Two error types and power" },
      { zh: "均值的检验(u/t 检验)", en: "Tests for the mean (z/t tests)" },
      { zh: "方差的检验(χ²/F 检验)", en: "Tests for variance (χ²/F tests)" },
      { zh: "拟合优度与独立性检验", en: "Goodness-of-fit and independence tests" },
    ],
  },
  {
    id: "s4", code: "MS4", moduleId: "m7", difficulty: 3, hours: 10, prereq: ["s3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "回归与方差分析", en: "Regression & ANOVA" },
    summary: {
      zh: "用最小二乘拟合关系,用方差分析比较多组均值。",
      en: "Fit relationships by least squares; compare several group means with ANOVA.",
    },
    objectives: [
      { zh: "掌握一元线性回归与最小二乘", en: "Master simple linear regression and least squares" },
      { zh: "理解回归系数的检验与预测", en: "Test regression coefficients and make predictions" },
      { zh: "理解相关系数", en: "Understand the correlation coefficient" },
      { zh: "掌握单因素方差分析", en: "Master one-way ANOVA" },
    ],
    outline: [
      { zh: "一元线性回归模型", en: "The simple linear regression model" },
      { zh: "最小二乘估计", en: "Least-squares estimation" },
      { zh: "回归的显著性检验", en: "Significance tests for regression" },
      { zh: "预测与相关", en: "Prediction and correlation" },
      { zh: "单因素方差分析", en: "One-way ANOVA" },
    ],
  },

  /* ============ M8 最优化 / Optimization ============ */
  {
    id: "k1", code: "OPT1", moduleId: "m8", difficulty: 2, hours: 10, prereq: ["a3"],
    nExamples: 5, nExercises: 6,
    title: { zh: "凸集与凸函数", en: "Convex Sets & Functions" },
    summary: {
      zh: "凸性是最优化「好解」的根源:凸问题里局部最优就是全局最优。",
      en: "Convexity is what makes optimization tractable: in a convex problem, local optima are global.",
    },
    objectives: [
      { zh: "掌握凸集与凸函数的定义与判定", en: "Master definitions and tests for convex sets and functions" },
      { zh: "理解凸性与全局最优的关系", en: "Understand why convexity yields global optimality" },
      { zh: "掌握一阶/二阶凸性判据", en: "Use first- and second-order convexity criteria" },
      { zh: "了解保凸运算", en: "Know convexity-preserving operations" },
    ],
    outline: [
      { zh: "凸集与凸组合", en: "Convex sets and combinations" },
      { zh: "凸函数的定义", en: "Definition of a convex function" },
      { zh: "一阶与二阶判定条件", en: "First- and second-order conditions" },
      { zh: "保凸运算", en: "Operations that preserve convexity" },
      { zh: "凸优化问题的标准形", en: "The standard form of a convex program" },
    ],
  },
  {
    id: "k2", code: "OPT2", moduleId: "m8", difficulty: 3, hours: 12, prereq: ["k1"], viz: "gradient",
    nExamples: 5, nExercises: 6,
    title: { zh: "无约束最优化", en: "Unconstrained Optimization" },
    summary: {
      zh: "用梯度找下降方向,用一阶/二阶条件判最优:梯度下降与牛顿法。",
      en: "Descend along the gradient, certify optima by first/second-order conditions: gradient descent and Newton's method.",
    },
    objectives: [
      { zh: "掌握最优性的一阶/二阶条件", en: "Master first- and second-order optimality conditions" },
      { zh: "理解梯度下降及其收敛", en: "Understand gradient descent and its convergence" },
      { zh: "掌握牛顿法与拟牛顿思想", en: "Know Newton and quasi-Newton methods" },
      { zh: "了解线搜索与步长选择", en: "Understand line search and step sizes" },
    ],
    outline: [
      { zh: "最优性条件", en: "Optimality conditions" },
      { zh: "梯度下降法", en: "Gradient descent" },
      { zh: "步长与线搜索", en: "Step size and line search" },
      { zh: "牛顿法与拟牛顿法", en: "Newton and quasi-Newton methods" },
      { zh: "收敛性与条件数", en: "Convergence and conditioning" },
    ],
  },
  {
    id: "k3", code: "OPT3", moduleId: "m8", difficulty: 3, hours: 12, prereq: ["k2"],
    nExamples: 5, nExercises: 6,
    title: { zh: "约束最优化与 KKT", en: "Constrained Optimization & KKT" },
    summary: {
      zh: "拉格朗日乘子与 KKT 条件,把约束问题的最优性刻画清楚。",
      en: "Lagrange multipliers and the KKT conditions characterize optimality under constraints.",
    },
    objectives: [
      { zh: "掌握拉格朗日乘子法", en: "Master the method of Lagrange multipliers" },
      { zh: "理解 KKT 条件", en: "Understand the KKT conditions" },
      { zh: "了解拉格朗日对偶与强/弱对偶", en: "Know Lagrangian duality and weak/strong duality" },
      { zh: "会建立并分析约束问题", en: "Formulate and analyze constrained problems" },
    ],
    outline: [
      { zh: "等式约束与拉格朗日乘子", en: "Equality constraints and Lagrange multipliers" },
      { zh: "不等式约束", en: "Inequality constraints" },
      { zh: "KKT 条件", en: "The KKT conditions" },
      { zh: "拉格朗日对偶", en: "Lagrangian duality" },
      { zh: "对偶间隙与强对偶", en: "Duality gap and strong duality" },
    ],
  },
  {
    id: "k4", code: "OPT4", moduleId: "m8", difficulty: 3, hours: 10, prereq: ["k1"],
    nExamples: 5, nExercises: 6,
    title: { zh: "线性规划与对偶", en: "Linear Programming & Duality" },
    summary: {
      zh: "在多面体的顶点上找最优:单纯形法,以及优雅的 LP 对偶。",
      en: "Optimize over the vertices of a polyhedron: the simplex method and the elegant LP duality.",
    },
    objectives: [
      { zh: "掌握线性规划的标准形与几何", en: "Master the standard form and geometry of LP" },
      { zh: "理解单纯形法的思想", en: "Understand the idea of the simplex method" },
      { zh: "掌握 LP 对偶与互补松弛", en: "Master LP duality and complementary slackness" },
      { zh: "了解灵敏度与整数规划简介", en: "Know sensitivity analysis and a glimpse of integer programming" },
    ],
    outline: [
      { zh: "线性规划的标准形", en: "Standard form of LP" },
      { zh: "可行域与基本可行解", en: "Feasible region and basic feasible solutions" },
      { zh: "单纯形法", en: "The simplex method" },
      { zh: "对偶问题", en: "The dual problem" },
      { zh: "互补松弛与灵敏度", en: "Complementary slackness and sensitivity" },
    ],
  },

  /* ============ KY 考研高频题型 / Exam Question Types ============ */
  {
    id: "ky1", code: "KY1", moduleId: "m13", difficulty: 3, hours: 10, prereq: ["g1"],
    nExamples: 6, nExercises: 6,
    title: { zh: "高数 · 极限与连续题型", en: "Calculus · Limits & Continuity" },
    summary: {
      zh: "求极限是高数第一大考点。系统归纳七类求极限方法、无穷小阶的比较、由极限定参数与间断点分类。",
      en: "Computing limits is the first big exam topic. A systematic tour of the seven limit techniques, comparing orders of infinitesimals, finding parameters from a limit, and classifying discontinuities.",
    },
    objectives: [
      { zh: "掌握求极限的七种主要方法及其适用场景", en: "Master the seven main methods for limits and when to use each" },
      { zh: "会用等价无穷小、洛必达法则与泰勒公式处理未定式", en: "Handle indeterminate forms with equivalents, L'Hôpital and Taylor" },
      { zh: "掌握无穷小阶的比较与「由极限确定参数」题", en: "Compare orders of infinitesimals and solve parameter-from-limit problems" },
      { zh: "会判断连续性并对间断点分类", en: "Test continuity and classify discontinuities" },
    ],
    outline: [
      { zh: "题型1:七种求极限方法总览", en: "Type 1: the seven limit techniques" },
      { zh: "题型2:1^∞ 型与两个重要极限", en: "Type 2: 1^∞ forms and the two standard limits" },
      { zh: "题型3:等价无穷小与泰勒展开求极限", en: "Type 3: equivalents and Taylor expansion" },
      { zh: "题型4:无穷小阶的比较与定参数", en: "Type 4: orders of infinitesimals and finding parameters" },
      { zh: "题型5:连续性与间断点分类", en: "Type 5: continuity and types of discontinuity" },
    ],
  },
  {
    id: "ky2", code: "KY2", moduleId: "m13", difficulty: 3, hours: 10, prereq: ["g2"],
    nExamples: 6, nExercises: 6,
    title: { zh: "高数 · 微分中值定理与导数应用", en: "Calculus · Mean-Value Theorems & Applications" },
    summary: {
      zh: "中值定理证明题是高数难点。梳理构造辅助函数、不等式证明、单调极值与凹凸作图等高频题型。",
      en: "Mean-value-theorem proofs are a calculus hurdle. Auxiliary-function construction, inequality proofs, monotonicity and extrema, and curve-sketching.",
    },
    objectives: [
      { zh: "掌握导数定义与分段/抽象函数可导性的判断", en: "Judge differentiability of piecewise and abstract functions from the definition" },
      { zh: "会用罗尔/拉格朗日/柯西/泰勒定理构造辅助函数证明", en: "Prove statements by constructing auxiliary functions for Rolle / Lagrange / Cauchy / Taylor" },
      { zh: "掌握不等式证明的四种主要方法", en: "Master the four main routes to proving inequalities" },
      { zh: "会做单调、极值、最值、凹凸、拐点与渐近线的综合题", en: "Handle combined problems on monotonicity, extrema, concavity, inflections and asymptotes" },
    ],
    outline: [
      { zh: "题型1:导数定义与可导性判定", en: "Type 1: the derivative definition and differentiability" },
      { zh: "题型2:中值定理证明与辅助函数构造", en: "Type 2: mean-value-theorem proofs and auxiliary functions" },
      { zh: "题型3:不等式证明的四种方法", en: "Type 3: four ways to prove inequalities" },
      { zh: "题型4:单调性、极值与最值", en: "Type 4: monotonicity, extrema and global extrema" },
      { zh: "题型5:凹凸、拐点、渐近线与作图", en: "Type 5: concavity, inflections, asymptotes and sketching" },
      { zh: "题型6:方程根的个数", en: "Type 6: counting the roots of an equation" },
    ],
  },
  {
    id: "ky3", code: "KY3", moduleId: "m13", difficulty: 3, hours: 12, prereq: ["g3"],
    nExamples: 6, nExercises: 6,
    title: { zh: "高数 · 积分与级数题型", en: "Calculus · Integrals & Series" },
    summary: {
      zh: "积分计算与级数是必考大题。归纳凑微分/换元/分部、对称性、反常积分、几何应用与级数敛散。",
      en: "Integration and series are exam staples. Substitution and by-parts, symmetry tricks, improper integrals, geometric applications, and series convergence.",
    },
    objectives: [
      { zh: "熟练不定积分四大方法(凑微分、换元、分部、有理函数)", en: "Fluently apply the four integration methods (recognition, substitution, by-parts, partial fractions)" },
      { zh: "会用奇偶对称性、周期性与区间再现公式算定积分", en: "Use symmetry, periodicity and the reflection trick for definite integrals" },
      { zh: "掌握变限积分求导与反常积分的敛散判定", en: "Differentiate variable-limit integrals and test improper integrals" },
      { zh: "会用定积分求面积/体积/弧长,判别级数敛散并求幂级数和函数", en: "Find area/volume/arc length; test series and sum power series" },
    ],
    outline: [
      { zh: "题型1:不定积分的四种方法", en: "Type 1: the four integration methods" },
      { zh: "题型2:定积分的对称性与区间再现", en: "Type 2: symmetry and the reflection trick" },
      { zh: "题型3:变限积分求导", en: "Type 3: differentiating a variable-limit integral" },
      { zh: "题型4:反常积分的敛散与计算", en: "Type 4: improper integrals" },
      { zh: "题型5:定积分的几何应用", en: "Type 5: geometric applications" },
      { zh: "题型6:级数敛散判别与幂级数求和", en: "Type 6: series convergence and power-series sums" },
    ],
  },
  {
    id: "ky4", code: "KY4", moduleId: "m13", difficulty: 3, hours: 10, prereq: ["a2"],
    nExamples: 6, nExercises: 6,
    title: { zh: "线代 · 行列式、矩阵与方程组", en: "Linear Algebra · Determinants, Matrices & Systems" },
    summary: {
      zh: "线代第一大板块。行列式计算技巧、矩阵求逆与秩、含参数方程组解的判定与结构。",
      en: "The first linear-algebra block: determinant techniques, inverses and rank, and the solution structure of (parametrized) linear systems.",
    },
    objectives: [
      { zh: "掌握行列式的五种计算方法", en: "Master five ways to evaluate a determinant" },
      { zh: "会用伴随矩阵与初等变换求逆、求秩", en: "Find inverses and rank via the adjugate and row reduction" },
      { zh: "掌握含参数线性方程组解的判定与结构", en: "Decide and describe the solutions of a parametrized system" },
      { zh: "会求向量组的秩与极大线性无关组", en: "Find the rank and a maximal independent subset of a vector family" },
    ],
    outline: [
      { zh: "题型1:行列式的五种算法", en: "Type 1: five determinant techniques" },
      { zh: "题型2:矩阵方程与求逆", en: "Type 2: matrix equations and inverses" },
      { zh: "题型3:秩的计算与证明", en: "Type 3: computing and proving rank" },
      { zh: "题型4:方程组解的判定与结构(含参数)", en: "Type 4: existence and structure of solutions, with parameters" },
      { zh: "题型5:向量组线性相关性与极大无关组", en: "Type 5: dependence and maximal independent sets" },
    ],
  },
  {
    id: "ky5", code: "KY5", moduleId: "m13", difficulty: 3, hours: 10, prereq: ["a4"],
    nExamples: 6, nExercises: 6,
    title: { zh: "线代 · 特征值、相似与二次型", en: "Linear Algebra · Eigenvalues, Similarity & Quadratic Forms" },
    summary: {
      zh: "线代第二大板块与压轴。特征值性质、相似对角化、实对称正交对角化、二次型化标准形与正定判定。",
      en: "The second linear-algebra block: eigenvalue properties, diagonalization, orthogonal diagonalization, reducing quadratic forms, and positive-definiteness.",
    },
    objectives: [
      { zh: "掌握特征值/向量的求法与常用性质(迹、行列式、矩阵的幂)", en: "Find eigenpairs and use their properties (trace, determinant, powers)" },
      { zh: "掌握相似对角化的判定与可逆矩阵 P 的求法", en: "Decide diagonalizability and find the transition matrix P" },
      { zh: "会对实对称矩阵作正交对角化", en: "Orthogonally diagonalize a real symmetric matrix" },
      { zh: "会用配方法与正交变换化二次型为标准形并判定正定性", en: "Reduce quadratic forms by completing the square / orthogonal change and test positive-definiteness" },
    ],
    outline: [
      { zh: "题型1:特征值与特征向量的求法与性质", en: "Type 1: eigenvalues/vectors and their properties" },
      { zh: "题型2:相似与对角化", en: "Type 2: similarity and diagonalization" },
      { zh: "题型3:实对称矩阵的正交对角化", en: "Type 3: orthogonal diagonalization of a symmetric matrix" },
      { zh: "题型4:二次型化标准形", en: "Type 4: reducing a quadratic form to standard form" },
      { zh: "题型5:正定二次型的判定", en: "Type 5: testing a positive-definite form" },
    ],
  },
  {
    id: "ky6", code: "KY6", moduleId: "m13", difficulty: 3, hours: 12, prereq: ["p2"],
    nExamples: 6, nExercises: 6,
    title: { zh: "概率统计 · 高频题型", en: "Probability & Statistics · Question Types" },
    summary: {
      zh: "概率统计板块。古典概型、条件概率与贝叶斯、分布与数字特征、大数定律/中心极限,以及参数估计与假设检验。",
      en: "The probability block: classical probability, conditional/Bayes, distributions and moments, LLN/CLT, plus estimation and hypothesis testing.",
    },
    objectives: [
      { zh: "熟练古典/几何概型与条件概率、全概率、贝叶斯公式", en: "Handle classical/geometric probability and the conditional, total-probability and Bayes formulas" },
      { zh: "掌握一维与二维随机变量的分布、边缘分布与独立性", en: "Work with one- and two-dimensional distributions, marginals and independence" },
      { zh: "会算期望、方差、协方差与相关系数", en: "Compute expectation, variance, covariance and correlation" },
      { zh: "掌握大数定律/中心极限定理的应用与矩估计、极大似然估计", en: "Apply the LLN/CLT and carry out method-of-moments and maximum-likelihood estimation" },
    ],
    outline: [
      { zh: "题型1:古典概型与几何概型", en: "Type 1: classical and geometric probability" },
      { zh: "题型2:条件概率、全概率与贝叶斯公式", en: "Type 2: conditional, total probability and Bayes" },
      { zh: "题型3:随机变量的分布与数字特征", en: "Type 3: distributions and numerical characteristics" },
      { zh: "题型4:二维随机变量与独立性", en: "Type 4: bivariate random variables and independence" },
      { zh: "题型5:大数定律与中心极限定理", en: "Type 5: the LLN and the central limit theorem" },
      { zh: "题型6:参数估计与假设检验", en: "Type 6: parameter estimation and hypothesis testing" },
    ],
  },
  {
    id: "ky7", code: "KY7", moduleId: "m13", difficulty: 3, hours: 12, prereq: ["g5"],
    nExamples: 6, nExercises: 6,
    title: { zh: "高数 · 多元微分与重积分题型", en: "Calculus · Multivariable & Multiple Integrals" },
    summary: {
      zh: "多元微积分是数一/二/三的必考大题。偏导全微分、复合与隐函数、方向导数与梯度、条件极值,以及二重积分计算。",
      en: "Multivariable calculus is a guaranteed long-answer topic. Partials and total differential, chain/implicit rules, gradients, constrained extrema, and evaluating double integrals.",
    },
    objectives: [
      { zh: "熟练偏导数、全微分与多元复合/隐函数求导", en: "Fluently handle partials, the total differential, and chain/implicit differentiation" },
      { zh: "掌握方向导数与梯度的计算及几何意义", en: "Compute directional derivatives and gradients and read their geometry" },
      { zh: "会求多元函数的极值与条件极值(拉格朗日乘数法)", en: "Find extrema and constrained extrema (Lagrange multipliers)" },
      { zh: "熟练直角/极坐标二重积分与交换积分次序", en: "Evaluate double integrals (rectangular/polar) and swap the order" },
    ],
    outline: [
      { zh: "题型1:偏导数与全微分的计算", en: "Type 1: partial derivatives and the total differential" },
      { zh: "题型2:多元复合函数与隐函数求导", en: "Type 2: chain rule and implicit differentiation" },
      { zh: "题型3:方向导数与梯度", en: "Type 3: directional derivatives and the gradient" },
      { zh: "题型4:极值与条件极值(拉格朗日乘数法)", en: "Type 4: extrema and constrained extrema (Lagrange)" },
      { zh: "题型5:二重积分的计算(直角/极坐标/交换次序)", en: "Type 5: evaluating double integrals (rectangular/polar/swap)" },
      { zh: "题型6:二重积分的对称性与应用", en: "Type 6: symmetry and applications of double integrals" },
    ],
  },
  {
    id: "ky8", code: "KY8", moduleId: "m13", difficulty: 3, hours: 10, prereq: ["o2"],
    nExamples: 6, nExercises: 6,
    title: { zh: "高数 · 微分方程题型", en: "Calculus · Differential Equations" },
    summary: {
      zh: "微分方程在数一/二/三都考。识别一阶方程类型、可降阶方程,以及二阶常系数齐次与非齐次的通解与特解。",
      en: "Differential equations appear in all three papers. Identifying first-order types, reducible higher-order equations, and the general/particular solutions of constant-coefficient second-order ODEs.",
    },
    objectives: [
      { zh: "会识别并求解各类一阶方程(可分离/齐次/线性/伯努利)", en: "Recognize and solve first-order types (separable/homogeneous/linear/Bernoulli)" },
      { zh: "掌握可降阶高阶方程的解法", en: "Solve reducible higher-order equations" },
      { zh: "掌握二阶常系数齐次方程的特征方程法", en: "Use the characteristic equation for constant-coefficient homogeneous ODEs" },
      { zh: "会用待定系数法求二阶常系数非齐次方程的特解", en: "Find particular solutions by undetermined coefficients" },
    ],
    outline: [
      { zh: "题型1:一阶方程的识别与求解", en: "Type 1: recognizing and solving first-order equations" },
      { zh: "题型2:可降阶的高阶方程", en: "Type 2: reducible higher-order equations" },
      { zh: "题型3:二阶常系数齐次方程(特征方程)", en: "Type 3: constant-coefficient homogeneous equations" },
      { zh: "题型4:二阶常系数非齐次方程(待定系数)", en: "Type 4: constant-coefficient non-homogeneous equations" },
      { zh: "题型5:微分方程的几何与物理应用", en: "Type 5: geometric and physical applications" },
      { zh: "题型6:欧拉方程与综合题", en: "Type 6: Euler equations and mixed problems" },
    ],
  },
  {
    id: "ky9", code: "KY9", moduleId: "m13", difficulty: 3, hours: 10, prereq: ["g7"],
    nExamples: 6, nExercises: 6,
    title: { zh: "高数 · 曲线曲面积分题型", en: "Calculus · Line & Surface Integrals" },
    summary: {
      zh: "数一专属大题。两类曲线积分、格林公式与路径无关、两类曲面积分,以及高斯、斯托克斯公式。",
      en: "A Paper-I long-answer staple. Both kinds of line integral, Green's theorem and path independence, surface integrals, and the Gauss and Stokes theorems.",
    },
    objectives: [
      { zh: "熟练两类曲线积分的参数化计算", en: "Fluently parametrize and compute both kinds of line integral" },
      { zh: "会用格林公式并判断路径无关、求势函数", en: "Apply Green's theorem, test path independence and find potentials" },
      { zh: "熟练两类曲面积分的投影计算", en: "Compute both kinds of surface integral by projection" },
      { zh: "会用高斯公式与斯托克斯公式求通量与环量", en: "Use Gauss and Stokes for flux and circulation" },
    ],
    outline: [
      { zh: "题型1:第一类曲线积分(对弧长)", en: "Type 1: line integrals w.r.t. arc length" },
      { zh: "题型2:第二类曲线积分与格林公式", en: "Type 2: line integrals w.r.t. coordinates and Green's theorem" },
      { zh: "题型3:路径无关与势函数", en: "Type 3: path independence and potential functions" },
      { zh: "题型4:第一类曲面积分", en: "Type 4: surface integrals of the first kind" },
      { zh: "题型5:第二类曲面积分与高斯公式", en: "Type 5: surface integrals of the second kind and Gauss" },
      { zh: "题型6:斯托克斯公式与空间曲线积分", en: "Type 6: Stokes' theorem and space curves" },
    ],
  },
];

const TOTAL_HOURS = CHAPTERS.reduce((s, c) => s + c.hours, 0);
const TOTAL_EXAMPLES = CHAPTERS.reduce((s, c) => s + c.nExamples, 0);

window.MODULES = MODULES;
window.CHAPTERS = CHAPTERS;
window.TOTAL_HOURS = TOTAL_HOURS;
window.TOTAL_EXAMPLES = TOTAL_EXAMPLES;
