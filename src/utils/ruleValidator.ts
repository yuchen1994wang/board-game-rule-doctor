import type { GameRule } from '@/types/game'

export interface RuleValidationResult {
  gameId: string
  gameName: string
  checkedAt: number
  issues: ValidationIssue[]
  summary: {
    total: number
    errors: number
    warnings: number
    info: number
  }
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info'
  category: 'setup' | 'turnActions' | 'endConditions' | 'scoring' | 'tokens' | 'cards' | 'general'
  message: string
  suggestion?: string
  bggReference?: string
}

// 模拟AI自动比对BGG规则
export async function validateGameRule(game: GameRule): Promise<RuleValidationResult> {
  const issues: ValidationIssue[] = []

  // 模拟异步校验过程
  await new Promise(resolve => setTimeout(resolve, 1500))

  // 1. 检查setup完整性
  if (!game.setup || game.setup.length === 0) {
    issues.push({
      type: 'error',
      category: 'setup',
      message: '缺少游戏设置说明',
      suggestion: '请补充游戏设置步骤'
    })
  } else {
    game.setup.forEach((setup, idx) => {
      if (!setup.steps || setup.steps.length < 3) {
        issues.push({
          type: 'warning',
          category: 'setup',
          message: `${setup.playerCount} 的设置步骤较少（${setup.steps?.length || 0}步），可能不够详细`,
          suggestion: '建议补充更多设置细节，如token摆放位置、起始资源等'
        })
      }
    })
  }

  // 2. 检查turnActions
  if (!game.turnActions?.onYourTurn || game.turnActions.onYourTurn.length === 0) {
    issues.push({
      type: 'error',
      category: 'turnActions',
      message: '缺少回合行动说明',
      suggestion: '请补充玩家回合可以执行的行动'
    })
  }

  // 3. 检查endConditions
  if (!game.endConditions || game.endConditions.length === 0) {
    issues.push({
      type: 'error',
      category: 'endConditions',
      message: '缺少结束条件说明',
      suggestion: '请补充游戏结束条件'
    })
  }

  // 4. 检查scoring
  if (!game.scoring?.duringGame && !game.scoring?.endGame) {
    issues.push({
      type: 'warning',
      category: 'scoring',
      message: '缺少计分方式说明',
      suggestion: '请补充游戏中和终局的计分方式'
    })
  }

  // 5. 检查weight合理性
  if (game.weight !== undefined) {
    if (game.weight < 1.0 || game.weight > 5.0) {
      issues.push({
        type: 'warning',
        category: 'general',
        message: `BGG重度 ${game.weight} 超出正常范围（1.0-5.0）`,
        suggestion: '请核实BGG重度数值'
      })
    }
  }

  // 6. 检查playerCount
  if (!game.playerCount) {
    issues.push({
      type: 'info',
      category: 'general',
      message: '缺少适用人数信息',
      suggestion: '建议补充游戏支持的人数范围'
    })
  }

  // 7. 检查tokens和cards
  const hasTokens = game.tokens && game.tokens.length > 0
  const hasCards = game.cards && game.cards.length > 0

  if (!hasTokens && !hasCards) {
    issues.push({
      type: 'info',
      category: 'general',
      message: '缺少token或卡牌对照表',
      suggestion: '建议添加游戏组件对照表，帮助玩家识别组件'
    })
  }

  // 8. 检查背景描述
  if (!game.background) {
    issues.push({
      type: 'info',
      category: 'general',
      message: '缺少游戏背景介绍',
      suggestion: '建议添加游戏背景，提升用户体验'
    })
  }

  // 9. 基于游戏特定规则的智能检查（模拟BGG比对）
  const bggIssues = await simulateBGGComparison(game)
  issues.push(...bggIssues)

  const errors = issues.filter(i => i.type === 'error').length
  const warnings = issues.filter(i => i.type === 'warning').length
  const info = issues.filter(i => i.type === 'info').length

  return {
    gameId: game.id,
    gameName: game.name,
    checkedAt: Date.now(),
    issues,
    summary: {
      total: issues.length,
      errors,
      warnings,
      info
    }
  }
}

// 模拟与BGG官方规则比对
async function simulateBGGComparison(game: GameRule): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = []

  // 这里模拟一些基于常见错误的智能检测
  // 实际实现时，可以通过BGG API获取官方规则进行比对

  // 检查常见规则错误模式
  const allText = [
    ...(game.setup?.flatMap(s => s.steps) || []),
    ...(game.turnActions?.onYourTurn || []),
    ...(game.turnActions?.outsideYourTurn || []),
    ...(game.endConditions || []),
    ...(game.scoring?.duringGame || []),
    ...(game.scoring?.endGame || []),
    ...(game.tips || [])
  ].join(' ').toLowerCase()

  // 检查是否提到常见遗漏规则
  if (game.category.includes('德式') && !allText.includes('分数') && !allText.includes('得分')) {
    issues.push({
      type: 'warning',
      category: 'scoring',
      message: '德式游戏但未明确提及计分方式',
      suggestion: '德式游戏通常有详细的计分系统，请检查是否完整',
      bggReference: '建议参考BGG上该游戏的计分规则'
    })
  }

  if (game.mechanism.includes('工人放置') && !allText.includes('工人')) {
    issues.push({
      type: 'warning',
      category: 'turnActions',
      message: '标注为工人放置机制但未提及工人',
      suggestion: '请检查回合行动中是否描述了工人放置的具体规则',
      bggReference: 'BGG规则书中通常有详细的工人放置说明'
    })
  }

  if (game.mechanism.includes('骰子驱动') && !allText.includes('骰子')) {
    issues.push({
      type: 'warning',
      category: 'turnActions',
      message: '标注为骰子驱动但未提及骰子',
      suggestion: '请检查是否描述了骰子的使用方式',
      bggReference: '请核实骰子驱动的具体机制'
    })
  }

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  return issues
}

// 批量校验所有游戏
export async function validateAllGames(games: GameRule[]): Promise<RuleValidationResult[]> {
  const results: RuleValidationResult[] = []

  for (const game of games) {
    const result = await validateGameRule(game)
    results.push(result)
  }

  return results
}

// 生成校验报告
export function generateValidationReport(results: RuleValidationResult[]): string {
  const totalIssues = results.reduce((sum, r) => sum + r.summary.total, 0)
  const totalErrors = results.reduce((sum, r) => sum + r.summary.errors, 0)
  const totalWarnings = results.reduce((sum, r) => sum + r.summary.warnings, 0)

  let report = `# 规则校验报告\n\n`
  report += `生成时间: ${new Date().toLocaleString()}\n\n`
  report += `## 汇总\n\n`
  report += `- 检查游戏数: ${results.length}\n`
  report += `- 总问题数: ${totalIssues}\n`
  report += `- 错误: ${totalErrors}\n`
  report += `- 警告: ${totalWarnings}\n\n`

  report += `## 详细结果\n\n`

  results.forEach(result => {
    if (result.summary.total > 0) {
      report += `### ${result.gameName}\n\n`
      result.issues.forEach(issue => {
        const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️'
        report += `${icon} **${issue.category}**: ${issue.message}\n`
        if (issue.suggestion) {
          report += `   💡 建议: ${issue.suggestion}\n`
        }
        if (issue.bggReference) {
          report += `   📚 参考: ${issue.bggReference}\n`
        }
        report += `\n`
      })
    }
  })

  return report
}
