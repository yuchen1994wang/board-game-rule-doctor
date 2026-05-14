# web-project-workflow 经验整合 - 桌游规则助手项目

本文档整合了从桌游规则助手项目中总结的新经验，可补充到 web-project-workflow skill 中。

---

## 新增经验总结

### 9. 多步流程组件设计模式

**核心原则：** 使用状态机管理多步骤流程，提供清晰的视觉反馈

**适用场景：**
- 表单填写向导
- 多步骤上传流程
- AI分析/处理流程
- 游戏算分流程

**实现模式：**
```tsx
// PhotoScoringModal 风格的多步组件
const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload')

// 步骤切换逻辑
const nextStep = () => {
  if (step === 'upload') setStep('analyzing')
  if (step === 'analyzing') setStep('result')
}

// 可重置功能
const reset = () => setStep('upload')
```

**视觉反馈建议：**
- 每步骤有明确的标题和说明
- 处理步骤显示加载动画
- 完成步骤显示确认图标

---

### 10. 模态对话框组件最佳实践

**核心原则：** 模态框要有一致的视觉风格和交互模式

**设计要点：**
```tsx
// 标准模态框结构
<div
  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  onClick={(e) => {
    // 点击背景关闭
    if (e.target === e.currentTarget) onClose()
  }}
>
  <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
    {/* Header */}
    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
      <h2>标题</h2>
      <button onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
    </div>
    
    {/* Content (可滚动) */}
    <div className="flex-1 overflow-y-auto p-4">
      {/* 内容 */}
    </div>
    
    {/* Footer (可选) */}
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      {/* 按钮组 */}
    </div>
  </div>
</div>
```

**使用模式：**
- 每个功能独立一个状态：`showFeatureModal`
- 状态用 `useState` 管理，从父组件传递 `onClose`
- 关闭时清理状态（如输入内容）

---

### 11. 数据验证与自动检测模式

**核心原则：** 对数据进行完整性和一致性检查，提前发现问题

**适用场景：**
- 游戏规则数据检查
- 配置文件验证
- 用户输入验证

**实现思路：**
```typescript
// 1. 定义验证规则
interface ValidationResult {
  issues: ValidationIssue[]
  summary: { errors: number; warnings: number }
}

// 2. 检查每一项数据
function validateGame(game: Game): ValidationResult {
  const issues: ValidationIssue[] = []
  
  if (!game.setup) issues.push({ type: 'error', message: '缺少设置说明' })
  if (game.weight && (game.weight < 0 || game.weight > 5)) {
    issues.push({ type: 'warning', message: '重度值超出范围' })
  }
  
  return { issues, summary: { /* ... */ } }
}

// 3. 批量验证 + 展示结果
const results = await validateAllGames(games)
```

---

### 12. TypeScript类型定义最佳实践

**核心原则：** 类型定义要完整、清晰、可复用

**文件结构：**
```
types/
└── game.ts    # 所有相关类型集中定义
```

**类型组织模式：**
```typescript
// 1. 核心类型定义
interface Game {
  id: string
  name: string
  description: string
  weight?: number  // 可选字段标 ?
  mechanism: string[]
}

// 2. 联合类型和枚举
type TabKey = 'setup' | 'turnActions' | 'endConditions'
type FeedbackType = 'rule_error' | 'unclear' | 'missing' | 'other'

// 3. 类型守卫
function isGame(obj: unknown): obj is Game {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  )
}
```

---

### 13. AI模拟/演示功能实现模式

**核心原则：** 先实现模拟版本，后续可接入真实API

**适用场景：**
- AI规则助手
- AI图像识别
- 自动分析功能

**实现模式：**
```typescript
// 1. 模拟延迟（提供真实交互体验）
await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

// 2. 模拟数据生成
function simulateAIAnalysis(game: Game): ScoringResult {
  return {
    playerName: '玩家1',
    score: Math.floor(Math.random() * 100 + 50),
    details: [ /* ... */ ]
  }
}

// 3. 友好说明
<div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
  <p className="text-xs text-amber-700">
    ⚠️ 此为演示功能，实际需要接入专业API服务
  </p>
</div>
```

---

### 14. 多语言支持实现模式

**核心原则：** 使用 React Context 管理语言状态

**文件结构：**
```
contexts/
└── LanguageContext.tsx
```

**实现模式：**
```tsx
// 1. Context 定义
type Language = 'zh' | 'en'
interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (zh: string, en: string) => string
}

// 2. 使用函数处理字符串
{t('返回首页', 'Back to Home')}

// 3. 切换按钮
<button onClick={toggleLanguage}>
  <Globe className="w-4 h-4" />
  {language === 'zh' ? 'EN' : '中文'}
</button>
```

---

### 15. 用户反馈收集模式

**核心原则：** 简化用户操作，同时收集足够信息

**设计要点：**
1. **分类选择**：让用户选择问题类型（错误/不清楚/缺少/其他）
2. **详细描述**：提供输入框记录具体问题
3. **数据持久化**：存储在 localStorage，方便后续查看
4. **管理后台**：查看和处理反馈

**实现示例：**
```typescript
// 数据结构
interface FeedbackItem {
  id: string
  gameId: string
  gameName: string
  type: FeedbackType
  typeLabel: string
  description: string
  timestamp: number
  status: 'pending' | 'confirmed' | 'rejected'
}

// 存储方法
function addFeedback(feedback: Omit<FeedbackItem, 'id' | 'timestamp' | 'status'>) {
  const newFeedback = { ...feedback, id: generateId(), timestamp: Date.now(), status: 'pending' }
  const all = getStoredFeedback()
  all.push(newFeedback)
  localStorage.setItem('feedback', JSON.stringify(all))
}
```

---

### 16. 功能按钮组设计模式

**核心原则：** 功能分类用不同颜色，保持视觉统一

**颜色系统：**
| 功能 | 颜色 | 示例 |
|------|------|------|
| 主要操作 | 品牌色（[1a4731]） | 返回、下一步 |
| AI/提问 | 蓝色 | 💬 提问 |
| 算分/分析 | 紫色 | 📷 算分 |
| 反馈/纠错 | 琥珀色 | 🚩 规则纠错 |
| 设置/语言 | 中性色 | 🌐 语言 |

**实现示例：**
```tsx
<div className="flex items-center gap-2">
  {/* 提问 - 蓝色 */}
  <button className="border-2 border-blue-200 text-blue-700 hover:border-blue-400">
    💬 提问
  </button>
  
  {/* 算分 - 紫色 */}
  <button className="border-2 border-purple-200 text-purple-700 hover:border-purple-400">
    📷 算分
  </button>
  
  {/* 纠错 - 琥珀色 */}
  <button className="border-2 border-amber-200 text-amber-700 hover:border-amber-400">
    🚩 规则纠错
  </button>
  
  {/* 设置 - 中性色 */}
  <button className="border-2 border-gray-200 text-gray-700 hover:border-gray-400">
    🌐 语言
  </button>
</div>
```

---

### 17. 项目结构最佳实践

**推荐目录结构：**
```
src/
├── components/       # 可复用UI组件
│   ├── RuleFeedbackModal.tsx
│   ├── GameChatModal.tsx
│   ├── PhotoScoringModal.tsx
│   └── ...
├── pages/            # 页面组件
│   ├── HomePage.tsx
│   ├── RuleCardPage.tsx
│   └── RuleValidationPage.tsx
├── contexts/         # React Context
│   └── LanguageContext.tsx
├── data/             # 静态数据
│   ├── games.ts
│   └── expansions.ts
├── types/            # TypeScript类型
│   └── game.ts
├── utils/            # 工具函数
│   └── ruleValidator.ts
├── App.tsx           # 路由配置
└── main.tsx          # 应用入口
```

---

### 18. 渐进式功能开发模式

**核心原则：** 先实现核心功能，再逐步增强

**分级策略：**
1. **Level 1（MVP）**：功能可用，无特殊效果
2. **Level 2（优化）**：添加加载状态、错误处理
3. **Level 3（完整）**：添加动画、音效、完整体验

**示例流程：**
```
提问功能:
1. Level 1: 弹出对话框，可以输入问题
2. Level 2: 添加AI模拟回答，显示加载状态
3. Level 3: 添加历史对话、快捷问题建议
```

---

## 项目参考文件

以下是桌游规则助手项目中的相关实现：

- [RuleFeedbackModal.tsx](../src/components/RuleFeedbackModal.tsx](../src/components/RuleFeedbackModal.tsx) - 用户反馈组件
- [GameChatModal.tsx](../src/components/GameChatModal.tsx) - AI问答组件
- [PhotoScoringModal.tsx](../src/components/PhotoScoringModal.tsx) - 拍照算分组件
- [LanguageContext.tsx](../src/contexts/LanguageContext.tsx) - 多语言Context
- [ruleValidator.ts](../src/utils/ruleValidator.ts) - 规则验证工具
