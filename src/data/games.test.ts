import { describe, it, expect } from 'vitest'
import { games } from './games'
import type { GameCategory, GameMechanism } from '@/types/game'

const VALID_CATEGORIES: GameCategory[] = ['德式', '美式', '聚会', '合作', '抽象']

const VALID_MECHANISMS: GameMechanism[] = [
  '工人放置', '骰子驱动', '引擎构筑', '拍卖', '卡牌驱动', '板块放置',
  '手牌管理', '资源管理', '区域控制', '合作', '轮抽', '谈判',
  '路线规划', '网格移动', '拼图', '记忆', '反应', '策略',
  '战斗', '卡牌管理', '探索', '派对', '推理', '淘汰'
]

describe('游戏数据完整性测试', () => {
  describe('必填字段测试', () => {
    it('所有游戏都应该有id字段', () => {
      games.forEach(game => {
        expect(game.id, `游戏 ${game.name || '未知'} 缺少id字段`).toBeDefined()
        expect(typeof game.id, `游戏 ${game.name} 的id应该是字符串`).toBe('string')
        expect(game.id.length, `游戏 ${game.name} 的id不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有name字段', () => {
      games.forEach(game => {
        expect(game.name, `游戏 ${game.id} 缺少name字段`).toBeDefined()
        expect(typeof game.name, `游戏 ${game.id} 的name应该是字符串`).toBe('string')
        expect(game.name.length, `游戏 ${game.id} 的name不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有nameEn字段', () => {
      games.forEach(game => {
        expect(game.nameEn, `游戏 ${game.id}(${game.name}) 缺少nameEn字段`).toBeDefined()
        expect(typeof game.nameEn, `游戏 ${game.id} 的nameEn应该是字符串`).toBe('string')
        expect(game.nameEn.length, `游戏 ${game.id} 的nameEn不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有description字段', () => {
      games.forEach(game => {
        expect(game.description, `游戏 ${game.id}(${game.name}) 缺少description字段`).toBeDefined()
        expect(typeof game.description, `游戏 ${game.id} 的description应该是字符串`).toBe('string')
        expect(game.description.length, `游戏 ${game.id} 的description不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有image字段', () => {
      games.forEach(game => {
        expect(game.image, `游戏 ${game.id}(${game.name}) 缺少image字段`).toBeDefined()
        expect(typeof game.image, `游戏 ${game.id} 的image应该是字符串`).toBe('string')
      })
    })

    it('所有游戏都应该有hasExpansions字段', () => {
      games.forEach(game => {
        expect(game.hasExpansions, `游戏 ${game.id}(${game.name}) 缺少hasExpansions字段`).toBeDefined()
        expect(typeof game.hasExpansions, `游戏 ${game.id} 的hasExpansions应该是布尔值`).toBe('boolean')
      })
    })

    it('所有游戏都应该有category数组', () => {
      games.forEach(game => {
        expect(Array.isArray(game.category), `游戏 ${game.id}(${game.name}) 的category应该是数组`).toBe(true)
        expect(game.category.length, `游戏 ${game.id}(${game.name}) 的category不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有mechanism数组', () => {
      games.forEach(game => {
        expect(Array.isArray(game.mechanism), `游戏 ${game.id}(${game.name}) 的mechanism应该是数组`).toBe(true)
        expect(game.mechanism.length, `游戏 ${game.id}(${game.name}) 的mechanism不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有setup数组', () => {
      games.forEach(game => {
        expect(Array.isArray(game.setup), `游戏 ${game.id}(${game.name}) 的setup应该是数组`).toBe(true)
        expect(game.setup.length, `游戏 ${game.id}(${game.name}) 的setup不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有turnActions对象', () => {
      games.forEach(game => {
        expect(game.turnActions, `游戏 ${game.id}(${game.name}) 缺少turnActions`).toBeDefined()
        expect(Array.isArray(game.turnActions.onYourTurn), `游戏 ${game.id} 的turnActions.onYourTurn应该是数组`).toBe(true)
        expect(game.turnActions.onYourTurn.length, `游戏 ${game.id} 的turnActions.onYourTurn不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有endConditions数组', () => {
      games.forEach(game => {
        expect(Array.isArray(game.endConditions), `游戏 ${game.id}(${game.name}) 的endConditions应该是数组`).toBe(true)
        expect(game.endConditions.length, `游戏 ${game.id}(${game.name}) 的endConditions不能为空`).toBeGreaterThan(0)
      })
    })

    it('所有游戏都应该有scoring对象', () => {
      games.forEach(game => {
        expect(game.scoring, `游戏 ${game.id}(${game.name}) 缺少scoring`).toBeDefined()
      })
    })

    it('所有游戏都应该有tips数组', () => {
      games.forEach(game => {
        expect(Array.isArray(game.tips), `游戏 ${game.id}(${game.name}) 的tips应该是数组`).toBe(true)
        expect(game.tips.length, `游戏 ${game.id}(${game.name}) 的tips不能为空`).toBeGreaterThan(0)
      })
    })
  })

  describe('category和mechanism有效性测试', () => {
    it('所有游戏的category都应该在允许范围内', () => {
      games.forEach(game => {
        game.category.forEach(cat => {
          expect(VALID_CATEGORIES, `游戏 ${game.id}(${game.name}) 的category "${cat}" 不在允许范围内`).toContain(cat)
        })
      })
    })

    it('所有游戏的mechanism都应该在允许范围内', () => {
      games.forEach(game => {
        game.mechanism.forEach(mech => {
          expect(VALID_MECHANISMS, `游戏 ${game.id}(${game.name}) 的mechanism "${mech}" 不在允许范围内`).toContain(mech)
        })
      })
    })
  })

  describe('卡牌数据测试', () => {
    it('有cards的游戏，每张卡牌都应该有value字段', () => {
      games.forEach(game => {
        if (game.cards && game.cards.length > 0) {
          game.cards.forEach((card, index) => {
            expect(card.value, `游戏 ${game.id}(${game.name}) 的第${index + 1}张卡牌 ${card.name} 缺少value字段`).toBeDefined()
            expect(typeof card.value, `游戏 ${game.id} 的卡牌 ${card.name} 的value应该是数字`).toBe('number')
          })
        }
      })
    })

    it('有cards的游戏，每张卡牌都应该有name字段', () => {
      games.forEach(game => {
        if (game.cards && game.cards.length > 0) {
          game.cards.forEach((card, index) => {
            expect(card.name, `游戏 ${game.id}(${game.name}) 的第${index + 1}张卡牌缺少name字段`).toBeDefined()
            expect(typeof card.name, `游戏 ${game.id} 的第${index + 1}张卡牌的name应该是字符串`).toBe('string')
          })
        }
      })
    })

    it('有cards的游戏，每张卡牌都应该有count字段', () => {
      games.forEach(game => {
        if (game.cards && game.cards.length > 0) {
          game.cards.forEach((card, index) => {
            expect(card.count, `游戏 ${game.id}(${game.name}) 的第${index + 1}张卡牌 ${card.name} 缺少count字段`).toBeDefined()
            expect(typeof card.count, `游戏 ${game.id} 的卡牌 ${card.name} 的count应该是数字`).toBe('number')
            expect(card.count, `游戏 ${game.id} 的卡牌 ${card.name} 的count应该大于0`).toBeGreaterThan(0)
          })
        }
      })
    })
  })

  describe('Token数据测试', () => {
    it('有tokens的游戏，每个token都应该有name和description', () => {
      games.forEach(game => {
        if (game.tokens && game.tokens.length > 0) {
          game.tokens.forEach((token, index) => {
            expect(token.name, `游戏 ${game.id}(${game.name}) 的第${index + 1}个token缺少name字段`).toBeDefined()
            expect(token.description, `游戏 ${game.id}(${game.name}) 的token ${token.name} 缺少description字段`).toBeDefined()
          })
        }
      })
    })
  })

  describe('setup数据测试', () => {
    it('所有setup都应该有playerCount和steps', () => {
      games.forEach(game => {
        game.setup.forEach((setup, index) => {
          expect(setup.playerCount, `游戏 ${game.id}(${game.name}) 的第${index + 1}个setup缺少playerCount`).toBeDefined()
          expect(Array.isArray(setup.steps), `游戏 ${game.id} 的setup ${setup.playerCount} 的steps应该是数组`).toBe(true)
          expect(setup.steps.length, `游戏 ${game.id} 的setup ${setup.playerCount} 的steps不能为空`).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('weight数据测试', () => {
    it('有weight的游戏，weight应该在合理范围内', () => {
      games.forEach(game => {
        if (game.weight !== undefined) {
          expect(game.weight, `游戏 ${game.id}(${game.name}) 的weight应该大于等于0`).toBeGreaterThanOrEqual(0)
          expect(game.weight, `游戏 ${game.id}(${game.name}) 的weight应该小于等于5`).toBeLessThanOrEqual(5)
        }
      })
    })
  })

  describe('数据唯一性测试', () => {
    it('所有游戏的id应该是唯一的', () => {
      const ids = games.map(g => g.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size, '存在重复的游戏id').toBe(ids.length)
    })
  })

  describe('可选字段测试', () => {
    it('有roundPhases的游戏，每个phase都应该有name和steps', () => {
      games.forEach(game => {
        if (game.roundPhases && game.roundPhases.length > 0) {
          game.roundPhases.forEach((phase, index) => {
            expect(phase.name, `游戏 ${game.id}(${game.name}) 的第${index + 1}个roundPhase缺少name`).toBeDefined()
            expect(Array.isArray(phase.steps), `游戏 ${game.id} 的roundPhase ${phase.name} 的steps应该是数组`).toBe(true)
            expect(phase.steps.length, `游戏 ${game.id} 的roundPhase ${phase.name} 的steps不能为空`).toBeGreaterThan(0)
          })
        }
      })
    })
  })
})
