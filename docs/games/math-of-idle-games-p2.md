
# 放置游戏的数学（第二部分）：导数型增长

> 原文作者：Anthony Pecorella (Kongregate)
> 原文链接：[The Math of Idle Games, Part II](https://blog.kongregate.com/the-math-of-idle-games-part-ii)

几周前，在三部分系列的[第一部分](https://blog.kongregate.com/the-math-of-idle-games-part-i)中，我们研究了快速增长放置游戏背后的一些标准数学，主要关注了指数增长和多项式增长之间的关系，以及一些检查和调整各种生成器平衡的方法。

在第二部分中，我们将探索除了目前绝大多数放置游戏都在使用的《Cookie Clicker》模式之外的另一种增长选择。（[第三部分](https://blog.kongregate.com/the-math-of-idle-games-part-iii)将研究声望循环和平衡。）

在“标准”模型中，有一种主要货币 ($\color{ForestGreen}{货币}$) 和一堆生成器 ($\color{Cerulean}{Gen 1}$, $\color{BurntOrange}{Gen 2}$ 等) 来生产该货币。在《AdVenture Capitalist》中，这些是产生现金的投资。在《Clicker Heroes》中，这些是产生伤害的英雄，伤害随后被转换为金钱。

但谁说生成器必须生产主要货币呢？如果生成器生产其他生成器，像这样会发生什么？

![Derivative Chain](https://cdn3.kongcdn.com/assets/files/0001/8771/chrome_2016-10-28_14-33-49.jpg)

你有一个单一的生成器生产 $\color{ForestGreen}{货币}$，然后是一连串的生成器生产上一级的生成器。所以 $\color{Cerulean}{Gen 1}$ 是生成货币的速率。$\color{BurntOrange}{Gen 2}$ 是生成 $\color{Cerulean}{Gen 1}$ 的速率，以此类推。有人开始有微积分的心理阴影了吗？很好，因为你应该有：这些就是导数（Derivatives）！ (注：如果你不懂或不记得微积分，别担心——你马上就能学会！)

假设一个单一生成器 ($\color{Cerulean}{Gen 1}$) 每秒生产一个货币（y 轴代表总货币，x 轴代表总时间）。我们将用绿色表示现金，用蓝色表示单一的 $\color{Cerulean}{Gen 1}$ 生成器。因此，随着时间的推移，$\color{Cerulean}{Gen 1}$ 的数量不会改变，每秒我们获得 1 个货币。

![Linear Growth](https://cdn4.kongcdn.com/assets/files/0001/8770/chrome_2016-10-28_14-33-38.jpg)

现在假设我们有一个单一的 $\color{BurntOrange}{Gen 2}$，它每秒生产 1 个 $\color{Cerulean}{Gen 1}$。现在的图表是什么样子的？

首先，我们需要澄清在看这种离散问题的连续图表时的一个奇特之处。一个 $\color{Cerulean}{Gen 1}$ 在一秒钟内会产生恰好 1 个货币。但如果那个 $\color{Cerulean}{Gen 1}$ 正是在那一秒钟被生产出来的呢？它不会产生一整个货币点，而只会产生半个。你可以认为 $\color{Cerulean}{Gen 1}$ 在它被创建的那一秒钟只“存在了一半”，即使这听起来不太合理，但如果你能接受这个规则，那么一切都会以数学那种美丽的方式对齐。交代完这点，让我们来看看奇迹。

在时间 $t=0$ 时，我们有一个永远不会改变的单一 $\color{BurntOrange}{Gen 2}$，没有 $\color{Cerulean}{Gen 1}$，也没有货币。

$t=1$ 时，仍然是单一的 $\color{BurntOrange}{Gen 2}$，现在有一个 $\color{Cerulean}{Gen 1}$（由 $\color{BurntOrange}{Gen 2}$ 生产），以及那个正在生成的 $\color{Cerulean}{Gen 1}$ 生产的 0.5 货币。

$t=2$ 时，我们增加到了 2 个 $\color{Cerulean}{Gen 1}$，其中一个产生一整个货币（在 $t=1$ 创建的那个），另一个产生半个货币。加上之前的半个，我们在 $t=2$ 时拥有 2 个货币。

![Parabolic Growth](https://cdn1.kongcdn.com/assets/files/0001/8773/chrome_2016-10-28_14-46-03.jpg)

现在让我们画出图表！

那个货币图表看起来非常像抛物线，不是吗？它实际上是 $y = \frac{x^2}{2}$。对于记得积分的人来说，这个方程看起来会很熟悉，它是 $y = x$ 的积分（产生蓝色斜线的方程）。在这里简单总结一下微积分课程：

![Derivative Integration Chart](https://cdn1.kongcdn.com/assets/files/0001/8772/chrome_2016-10-28_14-44-19.jpg)

**导数是变化率。** 在这种增长模型中，每个生成器代表下一级生成器的变化率，因此可以被视为导数。因为这些是按序列排列的，我们可以有效地从起点开始不断取积分，看看随着生成器层级变高，增长会变成什么样。一系列积分如下：

$1, x, \frac{x^2}{2}, \frac{x^3}{6}, \frac{x^4}{24}, ..., \frac{x^n}{n!}$

所以如果我们有 4 层生成器，从一个单一的 $Gen 4$ 开始，货币将以 $\frac{x^4}{24}$ 的速度增长，在时间 $t$，所有生成器的总数将是 $1$ + $t$ + $\frac{t^2}{2}$ + $\frac{t^3}{6}$。

而且，为了完成我们的闭环，让我们快速看一下高等微积分的一个例子。一种无限求和的级数被称为泰勒级数（Taylor Series），有一个非常相关的特定情况：

$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} > \sum_{n=0}^{m} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \dots + \frac{x^m}{m!}$

换句话说，随着我们拥有越来越多层级的生成器（随着 $m$ 增加），我们趋近于 $e^x$，也就是……指数增长！

好了，上面都是理论数学——这到底有什么用？我们学到了，建立一条生成器链开始趋近于指数增长，这意味着它将拥有很多我们在指数型游戏中使用过的属性。此外，由于你不会拥有无限的生成器，你总是会最终落后于真正的指数增长，因此成本（以指数级）仍将按照我们的预期超过产量（以导数型增长）。我也发现这“感觉”很好——当你获得更多层级时，你可以看到较低层级的数量变得真正庞大——这就像拥有多个《AdVenture Capitalist》游戏在一起工作！

已经有一些游戏这样做，最典型的莫过于名字非常贴切的[《Derivative Clicker》](http://gzgreg.github.io/DerivativeClicker/?ref=blog.kongregate.com)（作者：gzgreg）。注意，单一的“研究生”（Gen 3）每跳一次产生一个“本科生”（Gen 2），而产生的“高中生”（Gen 1，产生美金）的数量增加得非常快——先是 10，然后是 11，然后是 12，以此类推，因为本科生数量在增加。正如我们上面设定的一样。

![Derivative Clicker GIF](https://cdn3.kongcdn.com/assets/files/0001/8742/tumblr_mhpp3g0gYM1r5rl88o1_500.gif)

我们可以查看[《Derivative Clicker》的代码](https://github.com/gzgreg/DerivativeClicker/tree/gh-pages?ref=blog.kongregate.com)来了解更多，确实成本是使用基础指数函数计算的。例如，高中生的成本是 $5 \times 1.1^n$。所以仍然是指数成本，而增长是次指数级（sub-exponentially）的，这非常完美！

Cirrial 的[《Shark Game》](http://cirri.al/sharks/?ref=blog.kongregate.com)（如果你没玩过，这是一个极好的放置游戏）也利用了生成器生产生成器的机制；例如，护士鲨产生收获鱼类的鲨鱼。

要解决的主要平衡问题之一是如何保持低层级生成器的购买意义。正如你在上面的 gif 中看到的，我每秒都在免费获得大量的高中生。为什么我还要手动购买更多？答案可能是你确实不需要买，你可以这样设计你的游戏，但如果你想保持它们的相关性，gzgreg 的解决方案非常优雅。

![gzgreg solution gif](https://cdn4.kongcdn.com/assets/files/0001/8748/2016-10-27_14-41-14.gif)

注意，上图中的每个生成器都有两个数字：总拥有数，以及括号里的数字，即实际购买数。生成器的成本是基于购买数而不是拥有数计算的。但更重要的是，他创建了“层级加成”（tier boosts）。例如，每个购买的 1 级建筑（如高中生）会提升所有 1 级建筑 0.05% 的产量。这意味着即使我已经拥有数十亿个高中生，手动购买更多仍然有价值，这创造了一种拥有大量可能且具有影响力的资源花费方式的感觉。

关于这个话题的最后一点。我上面列出的是导数系统的最简单版本，但作为游戏设计师，你拥有更多的灵活性，你应该开放地探索这个空间。例如，这里是《Derivative Clicker》的一般成本和生产图表。注意它有两种货币，并且生成器相互依赖生产，这为游戏过程创造了一些极好的相互作用。

![Derivative Clicker Chart](https://cdn1.kongcdn.com/assets/files/0001/8746/Pasted_image_at_2016_10_27_05_29_PM.png)

所以我鼓励你在游戏中探索不同类型的进度。标准的所有生成器都贡献给主要货币的进度固然强大且伟大，但也可以与这种基于导数的生成器概念结合使用。

制作生成器。在它们之间连线。看看会发生什么！也许一个生成器可以产生多种货币。或者多个生成器。或者甚至是[更多的放置游戏](http://www.kongregate.com/games/kongregate/idleplex?ref=blog.kongregate.com)。世界就在你手中，玩得开心。:)

如果你有任何问题、发现错误或有很棒的新放置游戏想要分享，请随时通过 [anthony@kongregate.com](mailto:anthony@kongregate.com) 联系我。
