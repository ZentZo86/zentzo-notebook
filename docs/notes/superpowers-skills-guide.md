# Superpowers Skills 完整攻略

> 来源：[obra/superpowers](https://github.com/obra/superpowers)
> 安装日期：2026-02-05
> 共计 14 个 Skills，已安装 11 个

---

## 快速参考表

### 已安装 Skills
| Skill | 触发命令 | 一句话描述 | 类型 |
|-------|----------|-----------|------|
| brainstorming | `/brainstorming` | 创意工作前，一次问一个问题，探索意图和设计 | 流程 |
| systematic-debugging | `/systematic-debugging` | 四阶段调试法，找到根因才能修复 | 流程 |
| receiving-code-review | `/receiving-code-review` | 收到 review 时：技术验证 > 表演性同意 | 协作 |
| using-git-worktrees | `/using-git-worktrees` | 用 Git worktrees 隔离开发环境 | 工具 |
| finishing-a-development-branch | `/finishing-a-development-branch` | 分支开发完成后的标准收尾流程 | 流程 |
| writing-skills | `/writing-skills` | 如何写好 AI Agent Skills（元指南）| 元技能 |
| writing-plans | (自动匹配) | 写详细实施计划，假设执行者零上下文 | 流程 |
| test-driven-development | (自动匹配) | RED-GREEN-REFACTOR，铁律无例外 | 方法论 |
| executing-plans | (自动匹配) | 加载计划，分批执行，每批后报告 | 流程 |
| subagent-driven-development | (自动匹配) | 每任务一个子代理，两阶段 review | 协作 |
| requesting-code-review | (自动匹配) | 完成任务后调度 code-reviewer 子代理 | 协作 |

### 未安装 Skills (由于功能重叠或不适用)
| Skill | 一句话描述 | 类型 | 与 OpenCode 重叠度 |
|-------|-----------|------|-------------------|
| verification-before-completion | 没有验证证据就不能声称完成 | 方法论 | 高 - OpenCode 已内置 |
| dispatching-parallel-agents | 多独立任务并行调度代理 | 协作 | 高 - OpenCode 已内置 |
| using-superpowers | 任何对话开始时检查是否有 skill 适用 | 元技能 | 高 - OpenCode 已内置 |

---

## 第一章：已安装 Skills

### 1. brainstorming（头脑风暴）
**是什么**：把模糊的想法转化为完整设计和规格的协作流程。
**什么时候用**：
- 创建新功能之前
- 构建新组件之前
- 添加新功能或修改行为之前
- 任何"创意工作"开始之前

**核心流程**：
```
理解想法 → 探索方案 → 呈现设计 → 文档化
```

**1. 理解想法阶段**
- 先检查项目现状（文件、文档、最近提交）
- **一次只问一个问题**（核心原则）
- 优先用多选题，开放式问题也可以
- 聚焦：目的、约束、成功标准

**2. 探索方案阶段**
- 提出 2-3 个不同方案及其权衡
- 带上推荐方案和理由
- 推荐方案放在第一个

**3. 呈现设计阶段**
- 分段呈现（每段 200-300 字）
- 每段结束后确认"到目前为止对不对"
- 覆盖：架构、组件、数据流、错误处理、测试

**4. 设计完成后**
- 写入 `docs/plans/YYYY-MM-DD-<topic>-design.md`
- 提交到 git

**关键原则**：
- **一次一个问题** — 不要用多个问题轰炸用户
- **多选优先** — 比开放式问题更容易回答
- **YAGNI 无情** — 从设计中删除不必要的功能
- **探索替代方案** — 总是提出 2-3 个方案再决定

**效果**：
- 避免"我以为你要的是这个"的返工
- 设计阶段就发现问题，而不是实现一半才发现
- 产出可复用的设计文档

---

### 2. systematic-debugging（系统性调试）
**是什么**：四阶段根因调试法。核心理念：**没找到根因就不能尝试修复**。
**什么时候用**：
- 任何 bug、测试失败、意外行为
- **尤其是**：时间紧迫时（越急越容易乱试）
- "明显的快速修复"诱惑出现时
- 已经尝试了多次修复但没成功时

**铁律**：
```
没有根因调查 = 不能提出修复方案
```

**四阶段流程**：

#### 阶段 1：根因调查
1. **仔细阅读错误信息** — 不要跳过，读完整的堆栈
2. **稳定复现** — 能可靠触发吗？步骤是什么？
3. **检查最近改动** — git diff、最近提交、新依赖
4. **多组件系统：加诊断日志**
```
对每个组件边界：
- 记录进入组件的数据
- 记录离开组件的数据
- 验证环境/配置传播
```
5. **追踪数据流** — 坏值从哪来？一直往上追到源头

#### 阶段 2：模式分析
1. **找到能工作的例子** — 代码库里有没有类似的、能用的代码
2. **对照参考实现** — 完整阅读，不要略读
3. **识别差异** — 能工作的 vs 坏掉的，有什么不同
4. **理解依赖** — 需要什么配置、环境、前置条件

#### 阶段 3：假设与测试
1. **形成单一假设** — "我认为 X 是根因，因为 Y"
2. **最小化测试** — 做最小的改动来验证假设
3. **验证后再继续** — 有效？进入阶段 4。无效？形成新假设

#### 阶段 4：实现
1. **创建失败测试用例** — 必须有测试才能修复
2. **实现单一修复** — 只修根因，不要"顺便改进"
3. **验证修复** — 测试通过了？其他测试没挂？
4. **如果修复不生效** — 回到阶段 1 重新分析

**3 次失败规则**：
> **如果连续 3 次修复都失败：停下来质疑架构**
这意味着可能不是 bug，而是**架构问题**。需要讨论是否要重构而不是继续打补丁。

**红旗（停下来！）**：
听到自己说这些就要警觉：
- "先快速修一下，之后再调查"
- "试试改 X 看行不行"
- "一次改多个地方，跑测试"
- "应该是 X 吧，让我修了它"
- "再试一次"（已经试了 2+ 次时）
**所有这些 = 回到阶段 1**

**效果**：
- 系统性方法：15-30 分钟解决
- 乱试方法：2-3 小时还在抓狂
- 首次修复成功率：95% vs 40%
- 引入新 bug：几乎为零 vs 常见

---

### 3. receiving-code-review（接收代码审查）
**是什么**：收到 code review 反馈时的正确应对方式。核心理念：**技术正确性 > 社交舒适**。
**什么时候用**：
- 收到 code review 反馈时
- 反馈不清楚或技术上有疑问时
- **在实现建议之前**（先验证）

**禁止的回应**：
❌ "你说得太对了！"（明确禁止）
❌ "好观点！" / "很棒的反馈！"（表演性）
❌ "让我现在就实现"（在验证之前）

**正确的回应模式**：
```
1. 读：完整读完反馈，不要急着反应
2. 理解：用自己的话复述需求（或提问）
3. 验证：对照代码库现实检查
4. 评估：对这个代码库技术上合理吗？
5. 回应：技术确认 或 有理由的反驳
6. 实现：一次一项，每项都测试
```

**处理不清楚的反馈**：
```
如果任何一项不清楚：
停下 — 先不要实现任何东西
问清楚不清楚的那些项
为什么：项目可能相关。部分理解 = 错误实现。
```

**例子**：
```
用户："修复 1-6"
你理解 1,2,3,6。不清楚 4,5。
❌ 错误：先实现 1,2,3,6，之后再问 4,5
✅ 正确："我理解 1,2,3,6。继续之前需要澄清 4 和 5。"
```

**什么时候反驳**：
反驳的时机：
- 建议会破坏现有功能
- 审查者缺少完整上下文
- 违反 YAGNI（没用到的功能）
- 对这个技术栈不正确
- 有历史/兼容性原因
- 与之前的架构决策冲突

**怎么反驳**：
- 用技术理由，不要防御性
- 问具体问题
- 引用能工作的测试/代码

**承认正确反馈**：
✅ "修了。[简述改了什么]"
✅ "好发现 - [具体问题]。在 [位置] 修了。"
✅ [直接修，代码说明一切]
❌ 任何感谢表达
❌ 任何表扬审查者

**为什么不感谢**：行动说话。直接修。代码本身就表明你听到了反馈。

---

### 4. using-git-worktrees（使用 Git Worktrees）
**是什么**：用 Git worktrees 创建隔离的工作空间，可以同时在多个分支 work 而不用切换。
**什么时候用**：
- 开始需要隔离的功能开发
- 执行实施计划之前
- 需要同时处理多个分支

**目录选择流程**：
```
1. 检查现有目录
   ls -d .worktrees 2>/dev/null # 首选（隐藏）
   ls -d worktrees 2>/dev/null  # 备选
2. 如果没有，检查 CLAUDE.md/AGENTS.md 是否有偏好设置
3. 如果都没有，问用户：
   - .worktrees/（项目本地，隐藏）
   - ~/.config/superpowers/worktrees/<project>/（全局位置）
```

**安全验证**：
项目本地目录必须验证被 gitignore：
```bash
git check-ignore -q .worktrees 2>/dev/null
```
如果没被忽略：
1. 添加到 .gitignore
2. 提交改动
3. 继续创建 worktree

**创建步骤**：
```bash
# 1. 检测项目名
project=$(basename "$(git rev-parse --show-toplevel)")

# 2. 创建 worktree
git worktree add ".worktrees/$BRANCH_NAME" -b "$BRANCH_NAME"
cd ".worktrees/$BRANCH_NAME"

# 3. 运行项目设置
npm install / cargo build / pip install -r requirements.txt

# 4. 验证测试基线通过
npm test / cargo test / pytest

# 5. 报告位置
echo "Worktree ready at $(pwd)"
```

**快速参考**：
| 情况 | 动作 |
|------|------|
| `.worktrees/` 存在 | 使用它（验证被忽略）|
| `worktrees/` 存在 | 使用 it（验证被忽略）|
| 两个都存在 | 使用 `.worktrees/` |
| 都不存在 | 检查配置 → 问用户 |
| 目录没被忽略 | 加到 .gitignore + 提交 |
| 基线测试失败 | 报告失败 + 询问 |

**效果**：
- 多个分支可以同时打开，互不干扰
- 切换工作内容不需要 stash/checkout
- 每个 worktree 有独立的 node_modules/target 等

---

### 5. finishing-a-development-branch（完成开发分支）
**是什么**：开发完成后的标准收尾流程：验证测试 → 呈现选项 → 执行选择 → 清理。
**什么时候用**：
- 实现完成，所有测试通过
- 需要决定如何整合工作

**流程**：

#### 步骤 1：验证测试
```bash
npm test / cargo test / pytest / go test ./...
```
**如果测试失败**：停下。必须先修复才能继续。

#### 步骤 2：确定基分支
```bash
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
```

#### 步骤 3：呈现 4 个选项
```
实现完成。你想怎么做？
1. 本地合并回 <base-branch>
2. 推送并创建 Pull Request
3. 保持分支现状（我之后处理）
4. 丢弃这个工作
```

#### 步骤 4：执行选择
| 选项 | 合并 | 推送 | 保留 Worktree | 清理分支 |
|------|------|------|---------------|----------|
| 1. 本地合并 | ✓ | - | - | ✓ |
| 2. 创建 PR | - | ✓ | ✓ | - |
| 3. 保持现状 | - | - | ✓ | - |
| 4. 丢弃 | - | - | - | ✓ (强制) |

**选项 4 需要确认**：
```
这将永久删除：
- 分支 <name>
- 所有提交：<commit-list>
- Worktree at <path>
输入 'discard' 确认。
```

#### 步骤 5：清理 Worktree
选项 1、4 清理 worktree；选项 2、3 保留。

**效果**：
- 标准化的分支收尾，不会遗漏步骤
- 防止意外删除（选项 4 需要确认）
- 与 worktrees 配合使用，完整的工作流闭环

---

### 6. writing-skills（编写 Skills）
**是什么**：如何编写 AI Agent Skills 的元指南。核心理念：**写 Skills 就是对流程文档做 TDD**。
**什么时候用**：
- 创建新 skills
- 编辑现有 skills
- 验证 skills 在部署前能工作

**什么时候该创建 Skill**：
**创建**：
- 技术对你来说不是直觉上就明显的
- 你会跨项目再次引用
- 模式广泛适用（不是项目特定的）
- 别人会受益

**不创建**：
- 一次性解决方案
- 其他地方已有完善文档的标准实践
- 项目特定的约定（放 CLAUDE.md/AGENTS.md）

**Skill 类型**：
| 类型 | 例子 | 描述 |
|------|------|------|
| Technique | condition-based-waiting | 有步骤的具体方法 |
| Pattern | flatten-with-flags | 思考问题的方式 |
| Reference | API 文档 | API 文档、语法指南 |

**SKILL.md 结构**：
```markdown
---
name: skill-name-with-hyphens
description: Use when [具体触发条件和症状]
---
# Skill Name
## Overview
这是什么？1-2 句核心原则。
## When to Use
症状和用例的 bullet list
什么时候不用
## Core Pattern（技术/模式类）
Before/after 代码对比
## Quick Reference
扫读用的表格或 bullets
## Common Mistakes
什么会出错 + 修复
## Real-World Impact（可选）
具体结果
```

**铁律（同 TDD）**：
```
没有失败测试就不能写 Skill
```

**RED-GREEN-REFACTOR 循环**：
1. **RED（写失败测试）**：
   - 创建压力场景
   - **没有** skill 的情况下运行 — 记录基线行为
   - 识别合理化/失败模式
2. **GREEN（写最小 Skill）**：
   - 写 skill 来解决那些具体的合理化
   - **带** skill 运行 — 验证 agent 现在遵守
3. **REFACTOR（堵住漏洞）**：
   - Agent 找到新的合理化？加明确的反制
   - 重新测试直到无懈可击

**关于 Description 的关键规则**：
**Description = 什么时候用，不是 Skill 做什么**
```yaml
# ❌ 错误：总结了工作流 — agent 可能只按 description 执行
description: Use when executing plans - dispatches subagent per task with code review between tasks
# ✅ 正确：只有触发条件，没有工作流总结
description: Use when executing implementation plans with independent tasks in the current session
```
**为什么重要**：测试发现当 description 总结工作流时，agent 可能按 description 执行而不是读完整 skill。

---

## 第二章：其他重要技能

### 2.1 计划与执行类

#### writing-plans（编写计划）
**是什么**：写详细的实施计划，假设执行者对代码库零上下文、品味可疑。
**核心理念**：计划要详细到"按部就班就能完成"的程度。

#### executing-plans（执行计划）
**是什么**：加载计划文件，批量执行任务，每批后报告等待反馈。
**核心理念**：批量执行 + 检查点 = 质量保障。

### 2.2 开发方法类

#### test-driven-development（TDD）
**是什么**：先写测试，看它失败，再写最小代码让它通过。
**铁律**：**没有先写失败测试，就不能写生产代码。**

### 2.3 协作类

#### subagent-driven-development（子代理驱动开发）
**是什么**：每任务派发一个新子代理，两阶段 review（规格符合 + 代码质量）。

#### requesting-code-review（请求代码审查）
**是什么**：完成任务后调度 code-reviewer 子代理，在问题扩散前捕获。

---

## 第三章：完整工作流程图

### 功能开发完整流程
```
开始新功能开发
    │
    ▼
┌─────────────────┐
│ /brainstorming  │ ← 探索意图、设计
└────────┬────────┘
    │
    设计确认
    ▼
┌─────────────────────────┐
│     writing-plans       │ ← 写详细计划
└────────────┬────────────┘
    │
    ▼
┌─────────────────────────┐
│  /using-git-worktrees   │ ← 创建隔离环境
└────────────┬────────────┘
    │
    ▼
┌──────────────┐
│   开始实现   │
└──────┬───────┘
    │
┌────────────┴────────────┐
│ test-driven-development │ ← TDD 循环
│ RED → GREEN → REFACTOR  │
└────────────┬────────────┘
    │
┌────────┴────────┐
│    遇到 bug？    │
└────────┬────────┘
    │
    yes
    ▼
┌──────────────────────────┐
│  /systematic-debugging   │ ← 四阶段根因调试
└────────────┬─────────────┘
    │
    ▼
┌──────────────┐
│   继续实现   │
└──────┬───────┘
    │
    完成
    ▼
┌─────────────────────────────────────┐
│   /finishing-a-development-branch   │ ← 合并/PR/保留/丢弃
└─────────────────────────────────────┘
```

---

## 第四章：与 OpenCode 的对应关系

### 工具对照表
| Superpowers 概念 | OpenCode 工具 |
|------------------|---------------|
| Skill tool | `/skill-name` 斜杠命令 |
| Task tool | `delegate_task()` |
| TodoWrite | `todowrite` |
| Read file | `read` |
| Edit file | `edit` |
| WebFetch | `webfetch` |
| 子代理 | `delegate_task(category=..., load_skills=[...])` |
| Session 继续 | `session_id` 参数 |

---

## 附录

### 触发 Skills
在 OpenCode 中直接使用斜杠命令：
- `/brainstorming` — 头脑风暴
- `/systematic-debugging` — 系统性调试
- `/receiving-code-review` — 接收代码审查
- `/using-git-worktrees` — Git Worktrees
- `/finishing-a-development-branch` — 完成分支
- `/writing-skills` — 编写 Skills

### 来源与更新
**Skills 仓库**：https://github.com/obra/superpowers
