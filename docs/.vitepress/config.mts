import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ZentZo的笔记本",
  description: "游戏开发、独立游戏、调研资料",
  lang: 'zh-CN',
  
  themeConfig: {
    logo: '📚',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '🎮 游戏调研', link: '/games/' },
      { text: '🤖 AI 研究', link: '/ai/' },
      { text: '📖 学习笔记', link: '/learning/' },
      { text: '📝 综合笔记', link: '/notes/' }
    ],

    sidebar: {
      '/games/': [
        {
          text: '🎮 游戏调研',
          items: [
            { text: '增量游戏调研：Rusty\'s Retirement', link: '/games/rustys-retirement' },
            { text: 'Feed the Reactor 核心系统深度拆解', link: '/games/feed-the-reactor-deep-analysis' },
            { text: 'Feed the Reactor 系统结构与深度拆解', link: '/games/feed-the-reactor-deep-dive' },
            { text: 'Feed the Reactor 快速调研报告', link: '/games/feed-the-reactor-quick-report' },
            { text: 'WorldBox 深度调研', link: '/games/worldbox-deep-research' },
            { text: '放置游戏的数学（第一部分）', link: '/games/math-of-idle-games-p1' },
            { text: '放置游戏的数学（第二部分）', link: '/games/math-of-idle-games-p2' },
            { text: '放置游戏的数学（第三部分）', link: '/games/math-of-idle-games-p3' },
            { text: '增量游戏数值开发与 Godot 实现', link: '/games/incremental-math-godot-guide' },
            { text: '枪火重生 Build 机制深度调研', link: '/games/gunfire-rebirth-build-mechanics' },
            { text: 'Roboquest Build 机制深度调研', link: '/games/roboquest-build-mechanics' }
          ]
        }
      ],
      '/ai/': [
        {
          text: '🤖 AI 研究',
          items: [
            { text: 'Google Project Genie 深度研究', link: '/ai/google-project-genie-deep-dive' }
          ]
        }
      ],
      '/learning/': [
        {
          text: '📖 学习笔记',
          items: [
            // 学习笔记将在这里添加
          ]
        }
      ],
      '/notes/': [
        {
          text: '📝 综合笔记',
          items: [
            { text: 'Superpowers Skills 完整攻略 (14个)', link: '/notes/superpowers-skills-guide' },
            { text: 'Incremental Games 品类调研', link: '/notes/incremental-games-research-2026' },
            { text: 'Paddle Paddle Paddle 独立游戏拆解', link: '/notes/paddle-paddle-paddle-analysis' },
            { text: 'WorldBox 调研报告', link: '/notes/worldbox-research-collect-info-async' },
            { text: 'AI 监控系统反思', link: '/notes/watchdog-reflection-20260201' },
            { text: '欢迎来到我的笔记本', link: '/notes/welcome' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZentZo86/zentzo-notebook' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    outline: {
      label: '目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '多语言'
  },

  markdown: {
    math: true
  },

  lastUpdated: true
})
