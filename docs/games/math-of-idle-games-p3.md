---
title: "放置游戏的数学（第三部分）：声望循环与平衡"
date: 2026-02-01
category: 游戏开发
tags: [放置游戏, 游戏数学, 声望, 游戏平衡]
---

# 放置游戏的数学（第三部分）：声望循环与平衡

> 原文作者：Anthony Pecorella (Kongregate)
> 原文链接：[The Math of Idle Games, Part III](https://blog.kongregate.com/the-math-of-idle-games-part-iii)

这个分为三部分的系列旨在将我的 [MIGS 2016 幻灯片](http://www.slideshare.net/AnthonyPecorella/the-rise-and-rise-of-idle-games-68916528?ref=blog.kongregate.com)拆解成详细但易懂的视角，探讨放置（Idle）和增量（Incremental）游戏背后的数学和机制。这些章节大量借用了一组[电子表格模型](http://kon.gg/idle-math-spreadsheets?ref=blog.kongregate.com)，我已经开放供大家研究。

在[第一部分](https://blog.kongregate.com/the-math-of-idle-games-part-i)中，我们研究了快速增长放置游戏背后的一些标准数学，主要是指数增长和多项式增长之间的关系，以及调整生成器平衡的方法。

在[第二部分](https://blog.kongregate.com/the-math-of-idle-games-part-ii)中，我们探索了《Cookie Clicker》指数模型之外的增长选项，以及生成器交互的其他方式。

现在，在最后一部分，我们将研究“声望循环”（Prestige Loops），包括分析现实案例背后的设计，以及如何改变它们以保持对玩家的吸引力。

重置游戏以获得加成从而继续进展的能力，通常被称为“声望（Prestige）”，是大多数现代放置游戏的核心机制之一，最初由 Orteil 的《Cookie Clicker》普及（甚至可能是其构思的）。从高层次来看，这些系统有两个主要目的：

1.  **创造“攀登天梯”的效果**：这是放置游戏如此引人引人入胜的重要原因。它让玩家能够带着巨大的加成重置，给人一种力量感和进步感。这类似于“发射类游戏”（如《Burrito Bison: Launcha Libre》或《Curl Up and Fly》），玩家尽可能走得远，然后升级，再次发射。
2.  **将增长限制在一个更可控的数值内**：对于开发者来说，这可以提供一个更稳定的数值来锁定进度和升级，因为这里的增长会更慢。

注意：我以前曾错误地将其称为“取对数（Taking a log）”。大多数声望实际上是分数指数（例如平方根或立方根），而不是数学上的对数函数，所以增长在某些情况下仍然非常大。《Clicker Heroes》是一个例外，它确实具有类似对数的效果。也就是说，有些游戏后来增加了确实大幅限制数值的系统，例如《Realm Grinder》的“转生（Reincarnations）”和《AdVenture Capitalist》的“超级美金（Mega Bucks）”。

声望货币的产生量可以根据多种因素计算，包括（但不限于）：
- **最大收益 (Max earnings)**: 《Realm Grinder》
- **终生总收益 (Lifetime earnings)**: 《Cookie Clicker》, 《AdVenture Capitalist》
- **自上次重置后的收益 (Earnings since last reset)**: 《Egg, Inc.》
- **自上次重置后购买的升级数量**: 《Clicker Heroes》

这些主要分为两类：**终生统计数据**和**自重置以来数据**。这种根本差异会以重大方式引导一般的重置行为。让我们深入探讨每个例子。公式变量如下：
- $\Delta p$ = 待获得的声望货币
- $p$ = 总声望货币
- $c_L$ = 终生货币
- $c_M$ = 最大货币
- $c_R$ = 本次运行赚取的货币

### Realm Grinder
**首先是 Realm Grinder:** ![Gems](https://cdn3.kongcdn.com/assets/files/0001/9389/Gems.png)

$p = \frac{\sqrt{1 + 8 \cdot\frac{c_M}{10^{12}}} - 1}{2}$

这看起来是一个非常奇怪的公式，但实际上非常简单。为什么？因为对于 $p$ 所需的 $c_M$ 方程是：
$c_M=10^{12}\cdot\frac{p(p+1)}{2}$

你应该认得这是求和公式。现在我们需要解出 $p$。让我们看看……
$p^2+p-\frac{2c_M}{10^{12}}=0$

是的，没错。你要在现实世界（工作中/爱好中）使用**求根公式（Quadratic formula）**了！我打赌你从没想过真的会用到它。代入公式，你就会得到上面那个第一个方程。

![SMBC Comic](http://www.smbc-comics.com/comics/1479054311-20161113.png)

由于这个公式是基于赚取的最大货币的平方根，这意味着如果你在同一点重置，你几乎不会获得更多的声望货币。要使声望货币翻倍，玩家需要赚取相当于上一次运行 4 倍的收益。

### AdVenture Capitalist
这里同样使用了平方根，但这次是基于终生收益。假设我们想在每次运行中使声望货币翻倍，我们需要比上次运行多赚多少？这取决于你对之前运行的假设，但很可能在 3x 到 4x 的范围内。然而，一个根本的区别是，你可以不断在同一个点重置并获得货币。尽管如此，每次获得的货币量都会减少，这意味着玩家需要取得进展才能获得明显的收益。

### Cookie Clicker
![Cookie Clicker](https://cdn2.kongcdn.com/assets/files/0001/9390/2015-07-10_00002.jpg)

它也基于终生收益，但使用的是立方根，这意味着要使声望货币翻倍，玩家需要赚取大约 8 倍于上次运行的收益。

### 独立于之前表现的系统
另一方面，有些系统对之前的表现是不可知的——就声望货币计算而言，每次运行都是独立事件。这意味着如果你连续几次在同一个点重置，你每次都会获得相同数量的货币。

![Egg Inc](https://cdn4.kongcdn.com/assets/files/0001/9391/Hco.png)

这类系统的平衡方式大不相同。它们计算声望货币的曲线非常平缓（也就是说，在一次运行中走得更远，收益会迅速递减）。

### Egg, Inc.
$\Delta p = (\frac{c_R}{10^6})^{0.14}$

这大约是 $1/7$ 的指数。在《Realm Grinder》中翻倍需要 4 倍于上一次的收益，而《Egg, Inc.》则需要 128 ($2^7$) 倍！这可能是出于多种设计原因，但我认为最明显的一个原因是促使玩家更积极地玩游戏，并减少时间对进度的影响。或者相反，是在一个限制离线收益的系统中加速进度。

### 平衡与变化
一旦你为你的游戏确定了一种方法（或者甚至如果你想疯狂一点，使用几种声望货币），你该如何平衡它？

![Prestige Comparison Chart](https://cdn2.kongcdn.com/assets/files/0001/9393/chrome_2017-01-12_17-45-57.png)

就像你想让一次运行中的进展变得有些“坎坷”（有快有慢）一样，你也可能希望在声望重置中加入类似的变化。这种变化大部分来自于乘数/升级与获得声望货币速度之间的相互作用。

![Spreadsheet Screenshot](https://cdn4.kongcdn.com/assets/files/0001/9386/chrome_2017-01-12_16-08-25.png)

每个时间点命中 0 时都是声望重置。

![Sawtooth Graph](https://cdn4.kongcdn.com/assets/files/0001/9388/EXCEL_2017-01-12_16-34-32.png)

### 结语
以上就是三篇充满方程式、图表和电子表格的博客文章。虽然我希望这些对任何开发放置游戏的人来说都是有用的工具，但我认为核心的收获是：

- 放置游戏不仅仅只有《Cookie Clicker》和《Clicker Heroes》这两种最常见的模型，还有更多样化的可能性。特别是，思考生成器之间相互作用的方式。画一个流程图，然后把箭头打乱。
- 平衡进度很难。电子表格模型可以提供帮助，但需要大量的迭代，而且你有很多工具可以使用。
- 设计游戏时，确定“乐趣”在哪里并专注于此。是揭开新功能？收集成堆的成就？还是优化声望循环？大数值本身的离奇感已经基本消失了，但仍然有很多机会让玩家感到惊喜和愉悦。

至此，我们将结束这个放置数学博客系列。我希望它们对你有所帮助，如有任何问题或想分享酷酷的游戏，请随时联系。:)

如果你想联系我，请发送邮件至 [anthony@kongregate.com](mailto:anthony@kongregate.com)。
