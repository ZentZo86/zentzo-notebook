# Superpowers Skills 完整攻略

> 📅 记录日期：2026-02-05
> 🧠 来源：[obra/superpowers](https://github.com/obra/superpowers)

本文档总结了 AI 编程助手（Agent）的 **11 个“超能力”技能** 及其标准工作流。面包已经完成了安装（并根据老板指示剔除了不适用的 3 项）。

---

## 快速参考表

### 已安装 Skills (11个)
| Skill | 触发命令 | 一句话描述 | 类型 |
|-------|----------|-----------|------|
| brainstorming | `/brainstorming` | 创意工作前，一次问一个问题，探索意图和设计 | 流程 |
| systematic-debugging | `/systematic-debugging` | 四阶段调试法，找到根因才能修复 | 流程 |
| receiving-code-review | `/receiving-code-review` | 收到 review 时：技术验证 > 表演性同意 | 协作 |
| writing-skills | `/writing-skills` | 如何写好 AI Agent Skills（元指南）| 元技能 |
| writing-plans | (自动触发) | 写详细实施计划，假设执行者零上下文 | 流程 |
| test-driven-development | (自动触发) | RED-GREEN-REFACTOR，铁律无例外 | 方法论 |
| executing-plans | (自动触发) | 加载计划，分批执行，每批后报告 | 流程 |
| verification-before-completion | (自动触发) | 没有验证证据就不能声称完成 | 方法论 |
| subagent-driven-development | (自动触发) | 每任务一个子代理，两阶段 review | 协作 |
| dispatching-parallel-agents | (自动触发) | 多独立任务并行调度代理 | 协作 |
| requesting-code-review | (自动触发) | 完成任务后调度 code-reviewer 子代理 | 协作 |

---

## 第一章：核心流程

### 1. brainstorming（头脑风暴）
**核心原则：一次只问一个问题。**
- **理解想法**：检查现状，聚焦目的与约束。
- **探索方案**：提出 2-3 个方案及其权衡，推荐方案置顶。
- **呈现设计**：分段呈现，确认后再继续。
- **文档化**：写入 `docs/plans/` 并提交。

### 2. systematic-debugging（系统性调试）
**铁律：没有根因调查 = 不能提出修复方案。**
1. **调查**：阅读错误信息、稳定复现、检查日志、追踪数据流。
2. **分析**：对比能工作的代码，识别差异。
3. **假设**：形成单一假设，进行最小化验证。
4. **修复**：创建失败测试，实现单一修复，验证。
*3次失败规则：连续3次修复失败必须停下来质疑架构。*

### 3. test-driven-development（TDD）
**铁律：没有先写失败测试，就不能写生产代码。**
- **RED**：写一个刚好能失败的测试（确认测对了东西）。
- **GREEN**：写刚好能让测试通过的最小代码。
- **REFACTOR**：清理代码，确保测试依然绿色。

---

## 第二章：完整工作流程图

```mermaid
graph TD
    A[开始新功能/Bug修复] --> B{创意工作?}
    B -- Yes --> C[/brainstorming]
    C --> D[writing-plans]
    B -- No --> E{Bug调试?}
    E -- Yes --> F[/systematic-debugging]
    D --> H[实现阶段]
    F --> H
    H --> I{遵循 TDD?}
    I -- Yes --> J[RED -> GREEN -> REFACTOR]
    J --> K[验证证据]
    K --> L[完成汇报]
```

---

## 附录：与 OpenCode 的对应关系

- **Skill 工具**：`/skill-name` 斜杠命令。
- **Task 调度**：`delegate_task()` 相当于子代理派发。
- **Todo 追踪**：`todowrite` 用于记录实施计划进度。
