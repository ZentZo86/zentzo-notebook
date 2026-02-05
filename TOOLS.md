# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics - the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## API Keys 备用

### Brave Search
- **付费 Pro key（当前使用）**: `BSA_wO8uaBQ7BkyCN93cY07VS9q5op0` - 专业版
- **免费 key（备用）**: `BSAt85NUR7KNR4jQDVplKQnchv8R9Kz` - 每月 2000 次

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

### Chrome 控制方案 (重要：避坑指南)
- **方案 A (插件模式)**: OpenClaw Browser Relay 插件。
  - **注意**: 该插件**不在 Chrome 商店**！需开启"开发者模式"，从本地路径加载。
  - **本地路径**: `/opt/homebrew/lib/node_modules/openclaw/assets/chrome-extension/`
- **方案 B (直接连接 + 持久化 - 推荐)**: 端口 9223。
  - **优势**: **无需安装插件**，登录状态持久化保存。
  - **启动命令**: `chrome-persistent`（脚本位于 `~/bin/chrome-persistent`）
  - **Profile 目录**: `~/.openclaw/chrome-profiles/master`
  - **配置名**: `master-chrome-direct`
  - **首次使用**: 运行 `chrome-persistent`，手动登录各网站，之后登录状态会自动保留。

---

### itch.io API (⚠️ 禁止用浏览器！)
- **API Key**: `KQmbWTwnzkoYFqfxOkfiixwzBhkoKGVHRyRY55Xm`
- **账号**: zentzo (ID: 994251)
- **⛔ 重要**: itch.io 在持久化浏览器里被 ban，**必须用 API 访问**，不能用 Chrome！
- **用法**: 
  ```bash
  curl -H "Authorization: Bearer <KEY>" "https://itch.io/api/1/key/me"
  curl -H "Authorization: Bearer <KEY>" "https://itch.io/api/1/key/my-owned-keys"
  ```

---

Add whatever helps you do your job. This is your cheat sheet.
