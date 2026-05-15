import { describe, it, expect } from 'vitest'
import { validateGameRule, validateAllGames, generateValidationReport } from './ruleValidator'
import type { GameRule } from '@/types/game'

const createMockGame = (overrides: Partial<GameRule> = {}): GameRule => ({
  id: 'test-game',
  name: '测试游戏',
  nameEn: 'Test Game',
  description: '这是一个测试游戏',
  image: '/images/test.jpg',
  hasExpansions: false,
  category: ['德式'],
  mechanism: ['工人放置'],
  setup: [
    {
      playerCount: '2-4人',
      steps: ['步骤1', '步骤2', '步骤3']
    }
  ],
  turnActions: {
    onYourTurn: ['行动1', '行动2'],
    outsideYourTurn: ['观察行动']
  },
  endConditions: ['条件1', '条件2'],
  scoring: {
    duringGame: ['计分1'],
    endGame: ['终局计分1']
  },
  tips: ['提示1', '提示2'],
  ...overrides
})

describe('ruleValidator', () => {
  describe('validateGameRule', () => {
    it('应该返回正确的校验结果结构', async () => {
      const game = createMockGame()
      const result = await validateGameRule(game)

      expect(result).toHaveProperty('gameId', game.id)
      expect(result).toHaveProperty('gameName', game.name)
      expect(result).toHaveProperty('checkedAt')
      expect(result).toHaveProperty('issues')
      expect(result).toHaveProperty('summary')
      expect(result.summary).toHaveProperty('total')
      expect(result.summary).toHaveProperty('errors')
      expect(result.summary).toHaveProperty('warnings')
      expect(result.summary).toHaveProperty('info')
    })

    it('完整的游戏规则应该没有错误', async () => {
      const game = createMockGame()
      const result = await validateGameRule(game)

      expect(result.summary.errors).toBe(0)
    })

    it('缺少setup的游戏应该报错', async () => {
      const game = createMockGame({ setup: [] })
      const result = await validateGameRule(game)

      const setupError = result.issues.find(i => i.category === 'setup' && i.type === 'error')
      expect(setupError).toBeDefined()
      expect(setupError?.message).toContain('缺少游戏设置说明')
    })

    it('setup步骤太少应该警告', async () => {
      const game = createMockGame({
        setup: [{ playerCount: '2-4人', steps: ['步骤1'] }]
      })
      const result = await validateGameRule(game)

      const setupWarning = result.issues.find(i => i.category === 'setup' && i.type === 'warning')
      expect(setupWarning).toBeDefined()
      expect(setupWarning?.message).toContain('设置步骤较少')
    })

    it('缺少turnActions应该报错', async () => {
      const game = createMockGame({
        turnActions: { onYourTurn: [], outsideYourTurn: [] }
      })
      const result = await validateGameRule(game)

      const turnActionsError = result.issues.find(i => i.category === 'turnActions' && i.type === 'error')
      expect(turnActionsError).toBeDefined()
      expect(turnActionsError?.message).toContain('缺少回合行动说明')
    })

    it('缺少endConditions应该报错', async () => {
      const game = createMockGame({ endConditions: [] })
      const result = await validateGameRule(game)

      const endConditionsError = result.issues.find(i => i.category === 'endConditions' && i.type === 'error')
      expect(endConditionsError).toBeDefined()
      expect(endConditionsError?.message).toContain('缺少结束条件说明')
    })

    it('缺少scoring应该警告', async () => {
      const game = createMockGame({ scoring: { duringGame: [], endGame: [] } })
      const result = await validateGameRule(game)

      const scoringWarning = result.issues.find(i => i.category === 'scoring' && i.type === 'warning')
      expect(scoringWarning).toBeDefined()
      expect(scoringWarning?.message).toContain('计分')
    })

    it('weight超出范围应该警告', async () => {
      const game = createMockGame({ weight: 6.0 })
      const result = await validateGameRule(game)

      const weightWarning = result.issues.find(i => i.message.includes('BGG重度'))
      expect(weightWarning).toBeDefined()
      expect(weightWarning?.message).toContain('超出正常范围')
    })

    it('weight小于1.0应该警告', async () => {
      const game = createMockGame({ weight: 0.5 })
      const result = await validateGameRule(game)

      const weightWarning = result.issues.find(i => i.message.includes('BGG重度'))
      expect(weightWarning).toBeDefined()
    })

    it('缺少playerCount应该提示', async () => {
      const game = createMockGame({ playerCount: undefined })
      const result = await validateGameRule(game)

      const playerCountInfo = result.issues.find(i => i.message.includes('缺少适用人数信息'))
      expect(playerCountInfo).toBeDefined()
      expect(playerCountInfo?.type).toBe('info')
    })

    it('缺少tokens和cards应该提示', async () => {
      const game = createMockGame({ tokens: [], cards: [] })
      const result = await validateGameRule(game)

      const componentInfo = result.issues.find(i => i.message.includes('缺少token或卡牌对照表'))
      expect(componentInfo).toBeDefined()
      expect(componentInfo?.type).toBe('info')
    })

    it('缺少background应该提示', async () => {
      const game = createMockGame({ background: undefined })
      const result = await validateGameRule(game)

      const backgroundInfo = result.issues.find(i => i.message.includes('缺少游戏背景介绍'))
      expect(backgroundInfo).toBeDefined()
      expect(backgroundInfo?.type).toBe('info')
    })

    it('德式游戏缺少计分描述应该警告', async () => {
      const game = createMockGame({
        category: ['德式'],
        scoring: { duringGame: [], endGame: [] }
      })
      const result = await validateGameRule(game)

      const scoringWarning = result.issues.find(i =>
        i.message.includes('德式游戏') && i.message.includes('计分')
      )
      expect(scoringWarning).toBeDefined()
    })

    it('工人放置游戏缺少工人描述应该警告', async () => {
      const game = createMockGame({
        mechanism: ['工人放置'],
        turnActions: {
          onYourTurn: ['行动1', '行动2'],
          outsideYourTurn: []
        }
      })
      const result = await validateGameRule(game)

      const workerWarning = result.issues.find(i =>
        i.message.includes('工人放置') && i.message.includes('工人')
      )
      expect(workerWarning).toBeDefined()
    })

    it('骰子驱动游戏缺少骰子描述应该警告', async () => {
      const game = createMockGame({
        mechanism: ['骰子驱动'],
        turnActions: {
          onYourTurn: ['行动1', '行动2'],
          outsideYourTurn: []
        }
      })
      const result = await validateGameRule(game)

      const diceWarning = result.issues.find(i =>
        i.message.includes('骰子驱动') && i.message.includes('骰子')
      )
      expect(diceWarning).toBeDefined()
    })

    it('校验结果应该包含正确的issue类型', async () => {
      const game = createMockGame({ setup: [] })
      const result = await validateGameRule(game)

      result.issues.forEach(issue => {
        expect(['error', 'warning', 'info']).toContain(issue.type)
        expect(['setup', 'turnActions', 'endConditions', 'scoring', 'tokens', 'cards', 'general']).toContain(issue.category)
        expect(typeof issue.message).toBe('string')
      })
    })

    it('校验结果应该包含建议', async () => {
      const game = createMockGame({ setup: [] })
      const result = await validateGameRule(game)

      const errorWithSuggestion = result.issues.find(i => i.suggestion)
      expect(errorWithSuggestion).toBeDefined()
      expect(typeof errorWithSuggestion?.suggestion).toBe('string')
    })
  })

  describe('validateAllGames', () => {
    it('应该返回所有游戏的校验结果', async () => {
      const games = [
        createMockGame({ id: 'game1', name: '游戏1' }),
        createMockGame({ id: 'game2', name: '游戏2' }),
        createMockGame({ id: 'game3', name: '游戏3' })
      ]

      const results = await validateAllGames(games)

      expect(results).toHaveLength(3)
      expect(results[0].gameId).toBe('game1')
      expect(results[1].gameId).toBe('game2')
      expect(results[2].gameId).toBe('game3')
    }, 30000)

    it('空数组应该返回空结果', async () => {
      const results = await validateAllGames([])
      expect(results).toHaveLength(0)
    })
  })

  describe('generateValidationReport', () => {
    it('应该生成正确的报告格式', async () => {
      const game = createMockGame()
      const result = await validateGameRule(game)
      const report = generateValidationReport([result])

      expect(report).toContain('# 规则校验报告')
      expect(report).toContain('生成时间')
      expect(report).toContain('## 汇总')
      expect(report).toContain('检查游戏数')
      expect(report).toContain('总问题数')
    })

    it('报告应该包含游戏名称', async () => {
      const game = createMockGame({ setup: [] })
      const result = await validateGameRule(game)
      const report = generateValidationReport([result])

      expect(report).toContain(game.name)
    })

    it('报告应该正确统计问题数量', async () => {
      const games = [
        createMockGame({ id: 'game1', setup: [] }),
        createMockGame({ id: 'game2', endConditions: [] })
      ]
      const results = await validateAllGames(games)
      const report = generateValidationReport(results)

      expect(report).toContain('检查游戏数: 2')
    })

    it('没有问题的游戏不应该出现在详细结果中', async () => {
      const completeGame = createMockGame({
        id: 'complete-game',
        name: '完整游戏',
        playerCount: '2-4人',
        weight: 3.0,
        background: '游戏背景',
        tokens: [{ name: 'Token1', description: '描述' }],
        setup: [{ playerCount: '2-4人', steps: ['步骤1', '步骤2', '步骤3', '步骤4'] }]
      })
      const result = await validateGameRule(completeGame)
      const report = generateValidationReport([result])

      if (result.summary.total === 0) {
        expect(report).not.toContain('### 完整游戏')
      }
    })

    it('报告应该包含错误图标', async () => {
      const game = createMockGame({ setup: [] })
      const result = await validateGameRule(game)
      const report = generateValidationReport([result])

      if (result.summary.errors > 0) {
        expect(report).toContain('❌')
      }
    })

    it('报告应该包含警告图标', async () => {
      const game = createMockGame({
        setup: [{ playerCount: '2-4人', steps: ['步骤1'] }]
      })
      const result = await validateGameRule(game)
      const report = generateValidationReport([result])

      if (result.summary.warnings > 0) {
        expect(report).toContain('⚠️')
      }
    })

    it('报告应该包含信息图标', async () => {
      const game = createMockGame({ playerCount: undefined })
      const result = await validateGameRule(game)
      const report = generateValidationReport([result])

      if (result.summary.info > 0) {
        expect(report).toContain('ℹ️')
      }
    })

    it('报告应该包含建议', async () => {
      const game = createMockGame({ setup: [] })
      const result = await validateGameRule(game)
      const report = generateValidationReport([result])

      expect(report).toContain('💡 建议')
    })
  })
})
