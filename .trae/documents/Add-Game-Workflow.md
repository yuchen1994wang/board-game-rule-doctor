# 新增桌游标准流程

## 1. 数据收集

收集以下信息：
- **中文名** / **英文名** (BGG官方名)
- **BGG图片URL** (从 BGG 获取 `picXXXX.jpg`)
- **游戏简介** (1-2句话)
- **分类** (德式/美式/聚会/合作/抽象) — 主分类放第一个
- **机制** (从17种中选择)
- **是否有扩展** (true/false)
- **支持人数**

## 2. 编辑 `src/data/games.ts`

在数组末尾添加新游戏对象：

```typescript
{
  id: '唯一标识',
  name: '中文名',
  nameEn: 'English Name',
  description: '简介',
  image: 'https://cf.geekdo-images.com/.../picXXXX.jpg',
  hasExpansions: false, // 或 true
  category: ['德式'], // 主分类放第一个
  mechanism: ['工人放置', '资源管理'],
  setup: [{
    playerCount: '2-4人',
    steps: ['步骤1', '步骤2', '...']
  }],
  turnActions: {
    onYourTurn: ['行动1', '行动2', '...'],
    outsideYourTurn: ['行动1', '...']
  },
  endConditions: ['结束条件1', '...'],
  scoring: {
    duringGame: ['过程中得分1', '...'],
    endGame: ['终局计分1', '...']
  },
  tips: ['提示1', '提示2', '...'],
  // 可选：Token对照表
  tokens: [
    { name: 'token名', description: '用途说明' },
    // ...
  ],
  // 可选：卡牌对照表
  cards: [
    { name: '卡牌类型名', count: 数量, description?: '描述' },
    // ...
  ],
  // 可选：回合轮次
  roundPhases: [
    {
      name: '第1轮',
      description: '阶段描述',
      steps: ['步骤1', '步骤2']
    },
    // ...
  ]
}
```

## 3. 如有扩展，编辑 `src/data/expansions.ts`

```typescript
{
  id: '游戏id-扩展名',
  gameId: '游戏id',
  name: '扩展中文名',
  nameEn: 'Expansion Name',
  shortDesc: '一句话描述',
  description: '详细描述',
  image: '图片URL',
  playerCount: '人数说明',
  conflictsWith: ['冲突扩展id'], // 可选
  setup: [...],
  turnActions: { additions: { onYourTurn: [...] } },
  scoring: { additions: { duringGame: [...], endGame: [...] } },
  tips: [...]
}
```

## 4. 运行测试

```bash
npx vitest run
npm run check
```

## 5. 验证清单

- [ ] 类型检查通过 (`npm run check`)
- [ ] 所有测试通过 (`npx vitest run`)
- [ ] BGG图片URL可访问
- [ ] 分类顺序：主分类在前
- [ ] hasExpansions与实际一致
- [ ] Token对照表完整（如有）
- [ ] 卡牌对照表完整（如有）
- [ ] 回合轮次准确（如有）
