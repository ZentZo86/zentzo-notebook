---
title: "放置游戏的数学（第一部分）：增长、成本与平衡"
date: 2026-02-01
category: 游戏开发
tags: [放置游戏, 游戏数学, 游戏平衡]
---

# 放置游戏的数学（第一部分）：增长、成本与平衡

> 原文作者：Anthony Pecorella (Kongregate)
> 原文链接：[The Math of Idle Games, Part I](https://blog.kongregate.com/the-math-of-idle-games-part-i/)

我以前做过几次关于放置游戏（Idle Games）的吸引力和一般机制的演讲，但如果你真的想做一个呢？理论和模式很好，但在其背后运行着一些复杂的数学。而且，你到底该如何平衡一个数值巨大到疯狂的游戏呢？

这篇文章是三部分系列的第一部分，详细介绍了我在[最近的一次演讲](http://www.slideshare.net/AnthonyPecorella/quest-for-progress-gdc-europe-2016?ref=blog.kongregate.com)中涵盖的主题。第一部分讨论了增长、成本、声望（Prestige）和生成器平衡的核心概念。[第二部分](https://blog.kongregate.com/the-math-of-idle-games-part-ii)将研究替代增长方法（特别是基于导数的增长）。[第三部分](https://blog.kongregate.com/the-math-of-idle-games-part-iii)将研究声望循环和平衡。

这些文章中产生的所有图表的模型都[以电子表格的形式提供](http://kon.gg/idle-math-spreadsheets?ref=blog.kongregate.com)。请随意复制、阅读、实验、扩展等！

让我们先定义一些术语，以便更轻松地讨论。

- **主要货币 (Primary Currency)**：这是被增加的主数值，通常是游戏的目标。通常是某种形式的金钱。
- **生成器 (Generator)**：游戏中生产主要货币的物品。生产速度或收入以“每秒货币数”来衡量。
- **主要交换货币 (Primary Exchange Currency)**：在某些情况下，生成器生产一种不同的货币，然后用于交换主要货币。例如，在《Clicker Heroes》中，生成器产生 DPS，然后通过杀死怪物转换为金钱。这种分离层可以让你对游戏中主要货币的增长有更多的控制，因为你可以随着时间的推移修改“汇率”。
- **乘数 (Multiplier)**：各种增加生成器能力的升级。这些可以是显式的升级、基于拥有的生成器数量等。其目的是（暂时）使产量接近或超过成本。
- **声望 (Prestige)**：重置游戏中的大多数元素（特别是生成器和乘数），但获得货币（声望货币）和/或持久的乘数以加速下一次进度。类似于“二周目（New Game+）”。

在最基础的层面，放置游戏是生产率和成本之间的跷跷板。在运行早期，你的生产率会超过成本，而最终成本将变得令人望而却步。这通常是通过让成本呈指数级增长而产量呈线性或多项式增长来实现的。用公式表示：

$cost_{next} = cost_{base} \times (rate_{growth})^{owned}$

$production_{total} = (production_{base} \times owned) \times multipliers$

以《AdVenture Capitalist》中的柠檬水摊（Lemonade Stands）为例，其 $rate_{growth} = 1.07$，$cost_{base} = 4^*$，且 $production_{base} = 1.67/sec$。所以如果你拥有 10 个柠檬水摊：

$cost_{next} = 4 \times (1.07)^{10} = 7.87$

同时，生产率为：

$production_{total} = (1.67 \times 10) \times 1 = 16.7 / sec$

$^*$技术上是 3.738，因为你免费获得了第一个，实际上第二个的成本是 4。

以下是《AdVenture Capitalist》的实际数值（感谢 AdCap 维基！）：

![AdCap Wiki Table](https://cdn1.kongcdn.com/assets/files/0001/8435/anthony_idle_1.png)

所以在早期，你每秒赚取的钱远超一个新生成器的成本。让我们以图表形式看看。请注意，当你拥有 25 和 50 个柠檬水摊时，速率会获得一个（可叠加的）x2 乘数。

![Growth Chart 1](https://cdn1.kongcdn.com/assets/files/0001/8436/anthony_idle_2.png)

如果使用对数尺度（log scale）的 y 轴，我们可以看到更宏观的图景。

![Growth Chart Log](https://cdn4.kongcdn.com/assets/files/0001/8437/anthony_idle_3.png)

在早期，你的生产率很高，你可以不断购买，乘数在你接近成本时把你拉回来。但最终成本变得压倒性，你为了买下一个生成器而必须等待的时间变得长得令人望而却步。

从数学上讲，指数增长（任何形式为 $n^x$，且 $n > 1$ 的函数）最终都会追上并远超任何多项式增长（$x^k$），无论 $k$ 有多大或 $n$ 有多小。在某些情况下这可能需要很长时间，但这就是平衡的作用所在。（如果你想了解快速增长函数的层级，请查看 Eclipse1agg 的[这篇文章](https://www.reddit.com/r/incremental_games/comments/2ztcfk/linear_polynomial_exponential_and_more_growth/?ref=blog.kongregate.com)，他是《True Exponential》的开发者。）

在这个例子中，一旦情况真正开始变慢，你就会考虑进行声望重置以乘以你的生产率。这样做看起来是这样的，每次成功的声望重置都会在图表上向上滑动。结果是，每次声望重置都允许玩家在落后之前深入成本曲线更远。

![Prestige Slopes](https://cdn1.kongcdn.com/assets/files/0001/8438/anthony_idle_4.png)

但那是单个生成器的情况。当你拥有多个生成器，每个都有不同的成本和速率时会发生什么？现在玩家面临关于投资什么的抉择，事情变得更加复杂。幸运的是，我们也可以模拟最优行为！在这个模型中，我们将“最优”定义为拥有最佳的“收入：成本比”，我们在每次购买机会时都确定这一点。

玩家不会完全遵循这个模型，因为最优选择对于人类来说通常过于繁琐。“买 1 个生成器 2，然后买 3 个生成器 1，然后买一个生成器 3，再买一个生成器 1”等等。相反，玩家通常批量购买以简化决策过程……或者是因为强迫症（总是保持在 100 的倍数）。但从长远来看，玩家会大致在这个范围内。

这是《AdVenture Capitalist》前 5 个生成器的样子，当你拥有 25 和 50 个生成器时会有 x2 乘数。你可以看到在 25 和 50 乘数生效时预期的购买峰值，因为它们在那时被暂时超额估值了。注意：这个模型将收入简化为每秒收入，而不是需要计时器完成，因此高端、较慢的生成器会被过度青睐。

![Optimal Purchase Cycles](https://cdn1.kongcdn.com/assets/files/0001/8439/anthony_idle_5.png)

然而，如果观察收入率的对数刻度，你会注意到，一旦可以购买，最新的生成器几乎总是占据主导地位。这对玩家来说并不是很有趣。这意味着旧的生成器基本上变得无关紧要，并消除了任何有趣的决定。即使较小的生成器在技术上是“最优”的，它们也可能不重要。例如，你可能可以用 5 货币买一个产生 10 货币/秒的柠檬水摊，或者用 7500 货币买一个产生 10000 货币/秒的洗车房。柠檬水摊是一个更好的交易，但作为玩家你不会“感觉”到影响，因此它看起来不值得购买，或者更准确地说，不值得花费精力去考虑购买。

![Income Dominance](https://cdn2.kongcdn.com/assets/files/0001/8447/anthony_idle_6.png)

然而，即使是这样一个简单的模型，我们也可以开始模拟各种生成器权重的转变。在上面的图像中，我们没有任何可购买的乘数升级，每个生成器都获得下表所示的相同倍数奖励（只有 Gen 1 达到 100）：

![Multiplier Table](https://cdn2.kongcdn.com/assets/files/0001/8444/anthony_idle_7.png)

如果我们修改这些数字并保持其他一切不变（包括仍然没有可购买的升级），我们可以创造一个非常不同的图景。我们将使用这些乘数值：

![Modified Multipliers](https://cdn4.kongcdn.com/assets/files/0001/8445/anthony_idle_8.png)

以及产生的收入图表：

![Resulting Income Graph](https://cdn3.kongcdn.com/assets/files/0001/8446/anthony_idle_9.png)

现在这变得有趣多了！随着你在游戏中的进展，不同的生成器占据优先地位，并对收入产生最大的影响。玩家可以尝试识别这些优先级（它们并不总是立竿见影的），这提供了更多的多样性和更少的预测性。如果你有可购买的升级，你就有更多的选项为玩家提供这类变化。

### 奖励内容！

在整理这些内容时，我推导出了两个非常有用的公式，可以让你免于使用冗长的 for 循环进行暴力计算。第一个公式计算批量购买生成器的成本，第二个公式计算用当前资金可以购买的最大生成器数量。这些公式仅适用于不具有变动成本或指数的简单指数增长，因此请确保你的特定应用适用。对于这两个公式，变量为：

- $n$ = 要购买的生成器数量
- $b$ = 基础价格
- $r$ = 价格增长率（指数）
- $k$ = 当前拥有的生成器数量
- $c$ = 拥有的货币量

$cost = b * \frac{r^k(r^n-1)}{r-1}$

$max = floor(log_r(\frac{c(r-1)}{b(r^k)}+1))$

或者，如果你的语言无法处理非标准底数的 $log$，你可以使用标准的 $log$ 或 $ln$ 并进行如下除法：

$max = floor(\frac{log(\frac{c(r-1)}{b(r^k)}+1)}{log(r)})$

如果你有任何问题、发现错误、决定对表格进行扩展，或有很棒的新放置游戏想要分享，请随时联系并发送电子邮件至 [anthony@kongregate.com](mailto:anthony@kongregate.com)。
