# 桌游规则助手 (Board Game Rule Doctor)

快速查阅常见桌游规则的 Web 应用，帮助玩家在游戏过程中快速回顾规则要点，减少查阅规则书的时间。

## ✨ 功能特性

- 🎮 **56+ 款热门桌游规则** - 涵盖德式、美式、聚会、合作、抽象等多种类型
- 🔍 **智能搜索** - 支持中英文游戏名称搜索
- 🎯 **多维度筛选** - 按分类、机制、人数、重度筛选游戏
- 🌙 **深色模式** - 保护眼睛，支持系统主题跟随
- ⭐ **收藏功能** - 标记常用游戏，快速访问
- 📤 **分享功能** - 一键分享游戏规则链接
- 🖨️ **打印友好** - 优化的打印样式，方便制作规则速查卡
- 📝 **规则纠错** - 发现错误可提交反馈
- 🌐 **多语言支持** - 中英文界面切换
- 📱 **响应式设计** - 完美适配桌面和移动设备

## 🛠️ 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router
- **状态管理**: Zustand
- **图标**: Lucide React
- **测试**: Vitest + Testing Library

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物位于 `dist` 目录。

### 部署到 GitHub Pages

```bash
npm run build
npm run deploy
```

## 📁 项目结构

```
board-game-rule-doctor/
├── public/
│   └── images/          # 游戏封面图片
├── src/
│   ├── components/      # 可复用组件
│   │   ├── Empty.tsx
│   │   ├── ExpansionModal.tsx
│   │   ├── GameChatModal.tsx
│   │   ├── PhotoScoringModal.tsx
│   │   └── RuleFeedbackModal.tsx
│   ├── contexts/        # React Context
│   │   └── LanguageContext.tsx
│   ├── data/            # 游戏数据
│   │   ├── games.ts     # 游戏规则数据
│   │   └── expansions.ts # 扩展数据
│   ├── hooks/           # 自定义 Hooks
│   │   └── useTheme.ts
│   ├── pages/           # 页面组件
│   │   ├── Home.tsx
│   │   ├── HomePage.tsx
│   │   ├── RuleCardPage.tsx
│   │   └── RuleValidationPage.tsx
│   ├── types/           # TypeScript 类型定义
│   │   └── game.ts
│   ├── utils/           # 工具函数
│   │   └── ruleValidator.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .trae/
│   └── documents/       # 项目文档
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### 关键文件说明

| 文件 | 说明 |
|------|------|
| `src/data/games.ts` | 游戏规则核心数据，包含所有游戏的规则信息 |
| `src/data/expansions.ts` | 游戏扩展数据 |
| `src/types/game.ts` | 游戏数据类型定义 |
| `src/pages/RuleCardPage.tsx` | 规则卡片页面，展示游戏详细规则 |
| `src/pages/HomePage.tsx` | 首页，游戏列表和搜索功能 |

## 🤝 贡献指南

### 添加新游戏

1. 收集游戏信息（中英文名、BGG图片、简介、分类、机制等）
2. 编辑 `src/data/games.ts`，在数组末尾添加新游戏对象
3. 如有扩展，编辑 `src/data/expansions.ts`
4. 运行测试和类型检查：

```bash
npm run check
npm test
```

### 数据格式

游戏数据遵循 `GameRule` 接口定义，主要字段：

```typescript
{
  id: string;           // 唯一标识
  name: string;         // 中文名
  nameEn: string;       // 英文名
  description: string;  // 简介
  image: string;        // 封面图片URL
  hasExpansions: boolean;
  category: GameCategory[];  // 分类：德式/美式/聚会/合作/抽象
  mechanism: GameMechanism[]; // 机制标签
  setup: GameSetup[];        // 设置步骤
  turnActions: TurnActions;  // 回合行动
  endConditions: string[];   // 结束条件
  scoring: Scoring;          // 计分方式
  tips: string[];            // 提示
  tokens?: TokenReference[]; // Token对照表（可选）
  cards?: CardReference[];   // 卡牌对照表（可选）
  roundPhases?: RoundPhase[]; // 回合轮次（可选）
}
```

详细流程请参考 [Add-Game-Workflow.md](.trae/documents/Add-Game-Workflow.md)。

### 提交 PR

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/new-game`)
3. 提交更改 (`git commit -m 'Add game: 游戏名称'`)
4. 推送到分支 (`git push origin feature/new-game`)
5. 创建 Pull Request

## 📜 许可证

[MIT License](LICENSE)

## 🙏 致谢

- 游戏数据和图片来源于 [BoardGameGeek (BGG)](https://boardgamegeek.com/)
- 感谢所有开源项目的贡献者

---

Made with ❤️ for board game lovers
