import { useMemo, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Users, PlayCircle, PauseCircle, Trophy, Target, Lightbulb, Settings, AlertTriangle, Package, ChevronDown, ChevronUp, Globe, Hexagon, Layers, LayoutGrid } from 'lucide-react'
import { useState } from 'react'
import { games } from '@/data/games'
import { expansions } from '@/data/expansions'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Expansion, GameSetup } from '@/types/game'

function RuleSection({ 
  title, 
  icon: Icon, 
  children, 
  isExpansion = false,
  expansionName 
}: { 
  title: string
  icon: React.ElementType
  children: React.ReactNode
  isExpansion?: boolean
  expansionName?: string
}) {
  return (
    <section className={`rounded-xl p-6 border-2 ${
      isExpansion 
        ? 'bg-[#f5f5dc] border-amber-300' 
        : 'bg-white border-[#1a4731]/10'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-5 h-5 ${isExpansion ? 'text-amber-600' : 'text-[#1a4731]'}`} />
        <h2 className={`text-xl font-semibold ${isExpansion ? 'text-amber-700' : 'text-[#1a4731]'}`}>
          {title}
        </h2>
        {isExpansion && expansionName && (
          <span className="text-sm bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
            {expansionName}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

function SetupSection({ 
  setups, 
  isExpansion = false,
  expansionName,
  defaultExpanded = true
}: { 
  setups: GameSetup[]
  isExpansion?: boolean
  expansionName?: string
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  
  return (
    <div>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-[#1a4731]/60 mb-3 hover:text-[#1a4731] transition-colors"
      >
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {expanded ? '收起' : `展开 ${setups.length} 个人数配置`}
      </button>
      {expanded && (
        <div className="space-y-4">
          {setups.map((setup, index) => (
            <div key={index} className={`border-l-4 pl-4 ${
              isExpansion ? 'border-amber-400' : 'border-[#1a4731]/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Users className={`w-4 h-4 ${isExpansion ? 'text-amber-600' : 'text-[#1a4731]/60'}`} />
                <span className={`font-medium ${isExpansion ? 'text-amber-700' : 'text-[#1a4731]'}`}>
                  {setup.playerCount}
                </span>
              </div>
              <ul className="space-y-1">
                {setup.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-[#1a4731]/80 text-sm">
                    • {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type TabKey = 'setup' | 'flow' | 'scoring'

export default function RuleCardPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { language, toggleLanguage, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabKey>('setup')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const game = games.find(g => g.id === id)
  const enabledExpansionIds = searchParams.get('expansions')?.split(',').filter(Boolean) || []
  const enabledExpansions = enabledExpansionIds
    .map(eid => expansions.find(e => e.id === eid))
    .filter((e): e is Expansion => e !== undefined)

  const allConflicts = useMemo(() => {
    const conflicts: { expansion1: Expansion; expansion2: Expansion }[] = []
    for (let i = 0; i < enabledExpansions.length; i++) {
      for (let j = i + 1; j < enabledExpansions.length; j++) {
        const exp1 = enabledExpansions[i]
        const exp2 = enabledExpansions[j]
        if (
          exp1.conflictsWith?.includes(exp2.id) ||
          exp2.conflictsWith?.includes(exp1.id)
        ) {
          conflicts.push({ expansion1: exp1, expansion2: exp2 })
        }
      }
    }
    return conflicts
  }, [enabledExpansions])

  const combinedSetup = useMemo(() => {
    const setups: GameSetup[] = [...game?.setup || []]
    enabledExpansions.forEach(exp => {
      if (exp.setup) {
        exp.setup.forEach(s => {
          setups.push({
            ...s,
            isExpansion: true,
            expansionId: exp.id
          })
        })
      }
    })
    return setups
  }, [game, enabledExpansions])

  const combinedTurnActions = useMemo(() => {
    if (!game) return []

    const additions: { type: 'base' | string; source: string; onYourTurn?: string[]; outsideYourTurn?: string[] }[] = [
      { type: 'base', source: '基础规则', onYourTurn: game.turnActions.onYourTurn, outsideYourTurn: game.turnActions.outsideYourTurn }
    ]

    enabledExpansions.forEach(exp => {
      if (exp.turnActions?.additions) {
        additions.push({
          type: 'expansion',
          source: exp.name,
          onYourTurn: exp.turnActions.additions.onYourTurn,
          outsideYourTurn: exp.turnActions.additions.outsideYourTurn
        })
      }
    })

    return additions
  }, [game, enabledExpansions])

  const combinedEndConditions = useMemo(() => {
    const conditions: { text: string; source: 'base' | string }[] = [
      ...(game?.endConditions || []).map(c => ({ text: c, source: 'base' as const }))
    ]
    enabledExpansions.forEach(exp => {
      if (exp.endConditions) {
        exp.endConditions.forEach(c => {
          conditions.push({ text: c, source: exp.name })
        })
      }
    })
    return conditions
  }, [game, enabledExpansions])

  const combinedScoring = useMemo(() => {
    const duringGame: { text: string; source: 'base' | string }[] = [
      ...(game?.scoring?.duringGame || []).map(c => ({ text: c, source: 'base' as const }))
    ]
    const endGame: { text: string; source: 'base' | string }[] = [
      ...(game?.scoring?.endGame || []).map(c => ({ text: c, source: 'base' as const }))
    ]
    
    enabledExpansions.forEach(exp => {
      if (exp.scoring?.additions) {
        exp.scoring.additions.duringGame?.forEach(c => {
          duringGame.push({ text: c, source: exp.name })
        })
        exp.scoring.additions.endGame?.forEach(c => {
          endGame.push({ text: c, source: exp.name })
        })
      }
    })
    
    return { duringGame, endGame }
  }, [game, enabledExpansions])

  const combinedTips = useMemo(() => {
    const tips: { text: string; source: 'base' | string }[] = [
      ...(game?.tips || []).map(t => ({ text: t, source: 'base' as const }))
    ]
    enabledExpansions.forEach(exp => {
      if (exp.tips) {
        exp.tips.forEach(t => {
          tips.push({ text: t, source: exp.name })
        })
      }
    })
    return tips
  }, [game, enabledExpansions])

  if (!game) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#1a4731] text-lg mb-4">{t('未找到该桌游规则', 'Game rules not found')}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#1a4731] text-white rounded-lg hover:bg-[#1a4731]/90 transition-colors"
          >
            {t('返回首页', 'Back to Home')}
          </button>
        </div>
      </div>
    )
  }

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'setup', label: t('游戏设置', 'Game Setup'), icon: Settings },
    { key: 'flow', label: t('游戏流程', 'Game Flow'), icon: PlayCircle },
    { key: 'scoring', label: t('计分与条件', 'Scoring & Conditions'), icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5dc] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#1a4731] hover:text-[#1a4731]/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('返回首页', 'Back to Home')}</span>
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border-2 border-[#1a4731]/20 hover:border-[#1a4731]/40 transition-colors text-sm text-[#1a4731]"
          >
            <Globe className="w-4 h-4" />
            {language === 'zh' ? 'EN' : '中文'}
          </button>
        </div>

        <header className="mb-8">
          <div 
            className="w-full h-48 rounded-xl overflow-hidden mb-4 flex items-center justify-center text-center p-4 font-bold text-2xl leading-tight"
            style={{
              backgroundColor: game.category[0] === '德式' ? '#dbeafe' : 
                              game.category[0] === '美式' ? '#fee2e2' : 
                              game.category[0] === '聚会' ? '#f3e8ff' : 
                              game.category[0] === '合作' ? '#dcfce7' : 
                              game.category[0] === '抽象' ? '#f5f5f4' : 
                              '#e5e7eb',
              color: game.category[0] === '德式' ? '#1e40af' : 
                     game.category[0] === '美式' ? '#991b1b' : 
                     game.category[0] === '聚会' ? '#7c3aed' : 
                     game.category[0] === '合作' ? '#166534' : 
                     game.category[0] === '抽象' ? '#57534e' : 
                     '#374151'
            }}
          >
            <img
              src={game.image}
              alt={language === 'zh' ? game.name : game.nameEn}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  const span = parent.querySelector('.fallback-name') as HTMLElement
                  if (span) span.classList.remove('hidden')
                }
              }}
            />
            <span className="hidden fallback-name">
              {language === 'zh' ? game.name : game.nameEn}
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1a4731] mb-1">
            {language === 'zh' ? game.name : game.nameEn}
          </h1>
          <p className="text-lg text-[#1a4731]/50 mb-2">{language === 'zh' ? game.nameEn : game.name}</p>
          <p className="text-[#1a4731]/70">{language === 'zh' ? game.description : game.nameEn}</p>
          
          {enabledExpansions.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-sm text-[#1a4731]/60">已选扩展：</span>
              {enabledExpansions.map(exp => (
                <span key={exp.id} className="inline-flex items-center gap-1 text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded">
                  <Package className="w-3 h-3" />
                  {exp.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {allConflicts.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-400 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">⚠️ {t('扩展冲突警告', 'Expansion Conflict Warning')}</h3>
                <ul className="space-y-1">
                  {allConflicts.map((conflict, i) => (
                    <li key={i} className="text-sm text-amber-700">
                      <span className="font-medium">{conflict.expansion1.name}</span>
                      {' 与 '}
                      <span className="font-medium">{conflict.expansion2.name}</span>
                      {t(' 存在冲突，请仔细阅读规则说明', ' have conflicts, please read the rules carefully')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-[#1a4731] text-white border-[#1a4731]'
                    : 'bg-white text-[#1a4731] border-[#1a4731]/20 hover:border-[#1a4731]/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="space-y-6">
          {activeTab === 'setup' && (
            <>
              <RuleSection title={t('游戏设置', 'Game Setup')} icon={Settings}>
                <SetupSection setups={combinedSetup} />
              </RuleSection>

              {game.tokens && game.tokens.length > 0 && (
                <RuleSection title={t('Token对照表', 'Token Reference')} icon={Hexagon}>
                  <div className="space-y-3">
                    {game.tokens.map((token, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#1a4731]">{token.name}</span>
                          {token.nameEn && (
                            <span className="text-sm text-[#1a4731]/50">{token.nameEn}</span>
                          )}
                        </div>
                        <p className="text-sm text-[#1a4731]/70">{token.description}</p>
                      </div>
                    ))}
                  </div>
                </RuleSection>
              )}

              {game.cards && game.cards.length > 0 && (
                <RuleSection title={t('卡牌对照表', 'Card Reference')} icon={LayoutGrid}>
                  <div className="space-y-3">
                    {game.cards.map((card, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#1a4731]">{card.name}</span>
                          {card.nameEn && (
                            <span className="text-sm text-[#1a4731]/50">{card.nameEn}</span>
                          )}
                          <span className="text-xs bg-[#1a4731]/10 text-[#1a4731] px-2 py-0.5 rounded">
                            ×{card.count}
                          </span>
                        </div>
                        {card.description && (
                          <p className="text-sm text-[#1a4731]/70">{card.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </RuleSection>
              )}

              {game.roundPhases && game.roundPhases.length > 0 && (
                <RuleSection title={t('回合轮次', 'Round Phases')} icon={Layers}>
                  <div className="space-y-4">
                    {game.roundPhases.map((phase, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#1a4731]">{phase.name}</span>
                          {phase.description && (
                            <span className="text-sm text-[#1a4731]/50">{phase.description}</span>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {phase.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-[#1a4731]/80 text-sm">• {step}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </RuleSection>
              )}
            </>
          )}

          {activeTab === 'flow' && (
            <>
              <RuleSection title={t('回合操作', 'Turn Actions')} icon={PlayCircle}>
                <div className="space-y-4">
                  {combinedTurnActions.map((turn, idx) => (
                    <div key={idx} className={`border-l-4 pl-4 ${
                      turn.type === 'base' ? 'border-green-400' : 'border-amber-400'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${
                          turn.type === 'base' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></span>
                        <span className={`font-medium ${turn.type === 'base' ? 'text-[#1a4731]' : 'text-amber-700'}`}>
                          {turn.source}
                        </span>
                      </div>
                      
                      {turn.onYourTurn && turn.onYourTurn.length > 0 && (
                        <div className="mb-2">
                          <h4 className="text-sm font-medium text-[#1a4731]/70 mb-1">{t('自己回合', 'On Your Turn')}</h4>
                          <ul className="space-y-1">
                            {turn.onYourTurn.map((action, i) => (
                              <li key={i} className="text-[#1a4731]/80 text-sm">• {action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {turn.outsideYourTurn && turn.outsideYourTurn.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-[#1a4731]/70 mb-1">{t('回合外', 'Outside Your Turn')}</h4>
                          <ul className="space-y-1">
                            {turn.outsideYourTurn.map((action, i) => (
                              <li key={i} className="text-[#1a4731]/80 text-sm">• {action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </RuleSection>

              {game.roundPhases && game.roundPhases.length > 0 && (
                <RuleSection title={t('回合轮次', 'Round Phases')} icon={Layers}>
                  <div className="space-y-4">
                    {game.roundPhases.map((phase, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#1a4731]">{phase.name}</span>
                          {phase.description && (
                            <span className="text-sm text-[#1a4731]/50">{phase.description}</span>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {phase.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-[#1a4731]/80 text-sm">• {step}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </RuleSection>
              )}

              <RuleSection title={t('游戏提示', 'Tips')} icon={Lightbulb}>
                <ul className="space-y-2">
                  {combinedTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={tip.source === 'base' ? 'text-amber-500' : 'text-amber-600'}>★</span>
                      <span className={`text-sm ${tip.source === 'base' ? 'text-[#1a4731]/80' : 'text-amber-700'}`}>
                        {tip.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </RuleSection>
            </>
          )}

          {activeTab === 'scoring' && (
            <>
              <RuleSection title={t('结束条件', 'End Conditions')} icon={PauseCircle}>
                <ul className="space-y-2">
                  {combinedEndConditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={condition.source === 'base' ? 'text-[#1a4731]/40' : 'text-amber-400'}>
                        {condition.source === 'base' ? '◆' : '◈'}
                      </span>
                      <span className={`text-sm ${condition.source === 'base' ? 'text-[#1a4731]/80' : 'text-amber-700'}`}>
                        {condition.text}
                        {condition.source !== 'base' && (
                          <span className="text-xs text-amber-500 ml-1">[{condition.source}]</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </RuleSection>

              <RuleSection title={t('计分方式', 'Scoring')} icon={Trophy}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-[#1a4731] mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#1a4731]/60" />
                      {t('游戏过程中', 'During Game')}
                    </h3>
                    <ul className="space-y-1">
                      {combinedScoring.duringGame.map((item, index) => (
                        <li key={index} className="text-sm">
                          <span className={item.source === 'base' ? 'text-[#1a4731]/80' : 'text-amber-700'}>
                            • {item.text}
                            {item.source !== 'base' && (
                              <span className="text-xs text-amber-500 ml-1">[{item.source}]</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1a4731] mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#1a4731]/60" />
                      {t('终局计分', 'End Game')}
                    </h3>
                    <ul className="space-y-1">
                      {combinedScoring.endGame.map((item, index) => (
                        <li key={index} className="text-sm">
                          <span className={item.source === 'base' ? 'text-[#1a4731]/80' : 'text-amber-700'}>
                            • {item.text}
                            {item.source !== 'base' && (
                              <span className="text-xs text-amber-500 ml-1">[{item.source}]</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RuleSection>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
