# HEARTBEAT.md

## 🎮 行业与技术全域巡逻（每次心跳执行）

检查 `memory/heartbeat-state.json` 的 `lastPatrol` 时间戳。
如果距离上次巡逻超过 **6 小时**，执行以下任务：

### 巡逻工具与内容
1. **配额监控 (Script: scripts/antigravity-quota-check.sh)**
   - 检查 Antigravity 配额状态，如果 Claude 额度低于 10% 或发生变动，及时在早报中提醒老板。
   
2. **Steam 独立游戏情报 (Skill: steam)**
   - 追踪 New & Trending 榜单，挖掘有潜力的竞品或创意游戏。
   - 关注近期发售或有重大更新调独立佳作。
   
3. **独立开发伙伴 (Skill: solobuddy)**
   - 获取 Indie Hackers 社区的最新动态、Build-in-public 案例。
   - 搜索适合当前项目的开发/推广 Tips。

4. **深度行业研报 (Skill: exa-plus)**
   - 针对垂直领域（如：Unity 引擎动态、AI 游戏工具链、游戏出海）进行神经网络级搜索。
   - 获取比普通搜索更深入的行业内幕或研究。

5. **学术前沿速递 (Skill: arxiv-watcher)**
   - 检索最新的 AI、物理模拟、图形学论文。
   - 翻译并总结出对游戏开发有直接启发的内容。

6. **开源代码雷达 (Skill: read-github)**
   - 监控 GitHub Trending 中与游戏开发相关的仓库（如 Unity 插件、高性能框架）。
   - 简单总结其核心价值。

7. **独立媒体雷达 (Source: MonsterVine)**
   - 追踪 MonsterVine 的 Indie Wrap-Up 和月度/年度汇总。
   - 挖掘具有前卫设计理念的小众独立游戏，寻找差异化灵感。

8. **Twitter/X 精华巡逻 (Skill: exa-plus)**
   - 针对关键词 `#BuildInPublic`, `#IndieHackers`, `#Ship30for30` 以及核心人物 `levelsio`, `tibo_maker` 进行深度搜索。
   - 筛选出过去 24-48h 内最具有启发性、实操价值或代表行业趋势的动态。

9. **自我进化探测 (已停用，转为每日 06:00 定时通知)**
   - ~检查 OpenClaw 是否有新版本发布。~
   - ~如果有更新，自动执行进化（Update）并重启，确保老板始终用的是最新最强的面包。~
   - *(已通过 Cron Job 'daily-update-check' 接管，每天 06:00 检查并通知三端)*

### 早报生成逻辑 (Daily Morning Briefing)
每天北京时间 **08:00 - 09:30** 之间的首次巡逻，将汇总上述结果生成《面包晨报 2.0》。
- **去重机制**：每次生成前先对比过去 3 天的早报存档。如果内容无明显新进展，严禁重复推送。
- **动态板块**：仅推送有新消息的板块。如果没有新鲜事，该板块直接省略。
- **全空处理**：如果所有监控领域均无新发现，发送简短的平安信：“今天监控领域较平静，暂无值得关注的新动态。”
- **完整版**：直接推送到 Telegram/iMessage/Discord。内容包含：
  - **🎯 今日核心**：仅限 24-48h 内的游戏开发、热门游戏的新进展。
  - **🐦 Twitter 精华**：BuildInPublic / IndieHackers 社区动态及大佬 (levelsio, tibo_maker) 的最新见解。
  - **📌 值得关注**：当日重大的 AI/安全/行业新闻。
  - **📎 其他速览**：当日科技零散动态。
  - **🎁 每日新鲜玩意**：从未推荐过的有趣玩意。
  - **🖼️ 每日一画**：由面包根据当日心情或灵感自由创作的 AI 原图（使用 `antigravity-image-gen` 技能）。
- **存档**：保存至 `memory/morning-briefing-full-YYYY-MM-DD.md`。

### 处理规则
- **巡逻报告** → 每次巡逻后，将发现的简要摘要发送至 Discord「大王叫我来巡山」频道（ID: 1004721706444787816）。
- **重大消息**（爆款竞品、重大技术突破、重要活动截止）→ 立刻推送到该频道并通知老板。
- **普通发现** → 更新 `knowledge/` 对应文档。
- **无新内容** → 静默，HEARTBEAT_OK。

### 巡逻后
更新 `memory/heartbeat-state.json`:
```json
{
  "lastPatrol": <timestamp>,
  "lastChecks": { ... }
}
```

---

## 🧹 知识库清理（每周一次）

检查 `memory/heartbeat-state.json` 的 `lastCleanup` 时间戳。
如果距离上次清理超过 **7 天**，执行以下任务：

### 清理内容
1. **events.md**
   - 截止日期已过的活动 → 移到底部「历史记录」区
   - 超过 3 个月的历史记录 → 删除

2. **funding.md**
   - 已关闭的资助机会 → 移到底部「历史记录」区
   - 超过 3 个月的历史记录 → 删除

3. **competitors.md / tools.md**
   - 动态记录超过 3 个月 → 压缩或删除
   - 保留有长期参考价值的条目

### 清理后
更新 `memory/heartbeat-state.json`:
```json
{
  "lastCleanup": <timestamp>,
  ...
}
```

---

## 其他检查（可选，轮流做）
- 邮件（如果配置了）
- 日历（如果配置了）
