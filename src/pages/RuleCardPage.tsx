import { useMemo, useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Users, PlayCircle, PauseCircle, Trophy, Target, Lightbulb, Settings, AlertTriangle, Package, ChevronDown, ChevronUp, Globe, Hexagon, Layers, LayoutGrid, Flag, MessageCircle, Camera, Heart, Copy, Share, Printer } from 'lucide-react'
import { games } from '@/data/games'
import { expansions } from '@/data/expansions'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/hooks/useTheme'
import RuleFeedbackModal from '@/components/RuleFeedbackModal'
import GameChatModal from '@/components/GameChatModal'
import PhotoScoringModal from '@/components/PhotoScoringModal'
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
    <section className={`rounded-xl p-4 sm:p-5 lg:p-6 border-2 ${
      isExpansion 
        ? 'bg-[#f5f5dc] dark:bg-amber-950/30 border-amber-300 dark:border-amber-600/50' 
        : 'bg-white dark:bg-gray-800 border-[#1a4731]/10 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isExpansion ? 'text-amber-600 dark:text-amber-400' : 'text-[#1a4731] dark:text-green-400'}`} />
        <h2 className={`text-lg sm:text-xl font-semibold ${isExpansion ? 'text-amber-700 dark:text-amber-300' : 'text-[#1a4731] dark:text-green-400'}`}>
          {title}
        </h2>
        {isExpansion && expansionName && (
          <span className="text-xs sm:text-sm bg-amber-200 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded">
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
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#1a4731]/60 dark:text-gray-400 mb-2 sm:mb-3 hover:text-[#1a4731] dark:hover:text-green-400 transition-colors"
      >
        {expanded ? <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        {expanded ? '收起' : `展开 ${setups.length} 个人数配置`}
      </button>
      {expanded && (
        <div className="space-y-3 sm:space-y-4">
          {setups.map((setup, index) => (
            <div key={index} className={`border-l-4 pl-3 sm:pl-4 ${
              isExpansion ? 'border-amber-400 dark:border-amber-600/50' : 'border-[#1a4731]/20 dark:border-gray-700'
            }`}>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <Users className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isExpansion ? 'text-amber-600 dark:text-amber-400' : 'text-[#1a4731]/60 dark:text-gray-500'}`} />
                <span className={`font-medium text-sm sm:text-base ${isExpansion ? 'text-amber-700 dark:text-amber-300' : 'text-[#1a4731] dark:text-gray-200'}`}>
                  {setup.playerCount}
                </span>
              </div>
              <ul className="space-y-0.5 sm:space-y-1">
                {setup.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-[#1a4731]/80 dark:text-gray-300 text-xs sm:text-sm">
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
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState<TabKey>('setup')
  const [showFeedback, setShowFeedback] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showPhotoScoring, setShowPhotoScoring] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [copyNotification, setCopyNotification] = useState<string | null>(null)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorited(favorites.includes(id))
  }, [id])

  useEffect(() => {
    if (copyNotification) {
      const timer = setTimeout(() => setCopyNotification(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [copyNotification])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFavorited) {
      const newFavorites = favorites.filter((fid: string) => fid !== id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorited(false)
    } else {
      favorites.push(id)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorited(true)
    }
  }

  const copyRulesToClipboard = async () => {
    if (!game) return
    
    const rulesText = [
      `${language === 'zh' ? game.name : game.nameEn}`,
      `${language === 'zh' ? game.nameEn : game.name}`,
      '',
      language === 'zh' ? game.description : game.nameEn,
      '',
      '---',
      '',
      t('游戏设置', 'Game Setup'),
      '---',
      ...(game.setup || []).map(s => `${s.playerCount}: ${s.steps.join(', ')}`),
      '',
    ]
    
    if (game.turnActions?.onYourTurn) {
      rulesText.push(
        '',
        t('回合操作', 'Turn Actions'),
        '---',
        t('自己回合', 'On Your Turn'),
        ...game.turnActions.onYourTurn,
      )
    }
    
    if (game.turnActions?.outsideYourTurn) {
      rulesText.push(
        '',
        t('回合外', 'Outside Your Turn'),
        ...game.turnActions.outsideYourTurn,
      )
    }
    
    if (game.endConditions) {
      rulesText.push(
        '',
        t('结束条件', 'End Conditions'),
        '---',
        ...game.endConditions,
      )
    }
    
    if (game.scoring?.duringGame) {
      rulesText.push(
        '',
        t('游戏过程中计分', 'Scoring During Game'),
        '---',
        ...game.scoring.duringGame,
      )
    }
    
    if (game.scoring?.endGame) {
      rulesText.push(
        '',
        t('终局计分', 'End Game Scoring'),
        '---',
        ...game.scoring.endGame,
      )
    }
    
    try {
      await navigator.clipboard.writeText(rulesText.join('\n'))
      setCopyNotification(language === 'zh' ? '规则已复制' : 'Rules copied')
    } catch (err) {
      alert(language === 'zh' ? '复制失败' : 'Failed to copy')
    }
  }

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyNotification(language === 'zh' ? '链接已复制' : 'Link copied')
    } catch (err) {
      alert(language === 'zh' ? '复制失败' : 'Failed to copy')
    }
  }

  const handlePrint = () => {
    window.print()
  }

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
    if (!game || !game.turnActions) return []

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
      <div className="min-h-screen bg-[#f5f5dc] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#1a4731] dark:text-green-400 text-lg mb-4">{t('未找到该桌游规则', 'Game rules not found')}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#1a4731] dark:bg-green-600 text-white rounded-lg hover:bg-[#1a4731]/90 dark:hover:bg-green-600/80 transition-colors"
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
    <div className="min-h-screen bg-[#f5f5dc] dark:bg-gray-900 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl lg:max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1 sm:gap-2 text-[#1a4731] dark:text-green-400 hover:text-[#1a4731]/70 dark:hover:text-green-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm sm:text-base">{t('返回首页', 'Back to Home')}</span>
            </button>
            <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2 ml-1 sm:ml-2 lg:ml-4">
              <button
                onClick={toggleFavorite}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                  isFavorited 
                    ? 'bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                } border-2 ${
                  isFavorited 
                    ? 'border-red-300 dark:border-red-700' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                title={isFavorited ? (language === 'zh' ? '取消收藏' : 'Remove from favorites') : (language === 'zh' ? '收藏' : 'Add to favorites')}
              >
                <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'text-red-500 dark:text-red-400 fill-red-500 dark:fill-red-400' : 'text-gray-600 dark:text-gray-400'}`} />
              </button>
              <button
                onClick={copyRulesToClipboard}
                className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                title={language === 'zh' ? '复制规则' : 'Copy rules'}
              >
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={copyShareLink}
                className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                title={language === 'zh' ? '分享链接' : 'Share link'}
              >
                <Share className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                title={language === 'zh' ? '打印规则' : 'Print rules'}
              >
                <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setShowChat(true)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors text-xs sm:text-sm text-blue-700 dark:text-blue-400"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">{language === 'zh' ? '提问' : 'Ask'}</span>
            </button>
            <button
              onClick={() => setShowPhotoScoring(true)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors text-xs sm:text-sm text-purple-700 dark:text-purple-400"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">{language === 'zh' ? '算分' : 'Score'}</span>
            </button>
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors text-xs sm:text-sm text-amber-700 dark:text-amber-400"
            >
              <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">{language === 'zh' ? '规则纠错' : 'Feedback'}</span>
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-gray-800 rounded-lg border-2 border-[#1a4731]/20 dark:border-gray-700 hover:border-[#1a4731]/40 dark:hover:border-gray-600 transition-colors text-xs sm:text-sm text-[#1a4731] dark:text-green-400"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {language === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
        </div>

        <header className="mb-6 sm:mb-8">
          <div 
            className="w-full h-32 sm:h-40 lg:h-48 rounded-xl overflow-hidden mb-3 sm:mb-4 flex items-center justify-center text-center p-3 sm:p-4 font-bold text-lg sm:text-xl lg:text-2xl leading-tight"
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1a4731] dark:text-green-400 mb-1">
            {language === 'zh' ? game.name : game.nameEn}
          </h1>
          <p className="text-base sm:text-lg text-[#1a4731]/50 dark:text-gray-500 mb-2">{language === 'zh' ? game.nameEn : game.name}</p>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
            {game.category.map(cat => (
              <span
                key={cat}
                className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${
                  cat === '德式' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' :
                  cat === '美式' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400' :
                  cat === '聚会' ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400' :
                  cat === '合作' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' :
                  cat === '抽象' ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' :
                  'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat}
              </span>
            ))}
            {game.mechanism.slice(0, 4).map(mech => (
              <span
                key={mech}
                className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium bg-[#1a4731]/10 dark:bg-green-900/30 text-[#1a4731] dark:text-green-400"
              >
                {mech}
              </span>
            ))}
          </div>
          <p className="text-sm sm:text-base text-[#1a4731]/70 dark:text-gray-400">{language === 'zh' ? game.description : game.nameEn}</p>
          
          {enabledExpansions.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-sm text-[#1a4731]/60 dark:text-gray-500">已选扩展：</span>
              {enabledExpansions.map(exp => (
                <span key={exp.id} className="inline-flex items-center gap-1 text-sm bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-2 py-1 rounded">
                  <Package className="w-3 h-3" />
                  {exp.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {allConflicts.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-400 dark:border-amber-600/50 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">⚠️ {t('扩展冲突警告', 'Expansion Conflict Warning')}</h3>
                <ul className="space-y-1">
                  {allConflicts.map((conflict, i) => (
                    <li key={i} className="text-sm text-amber-700 dark:text-amber-400">
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

        <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 sm:pb-0 -mx-3 sm:mx-0 px-3 sm:px-0 scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 sm:px-4 rounded-lg border-2 transition-colors text-xs sm:text-sm font-medium ${
                  isActive
                    ? 'bg-[#1a4731] dark:bg-green-600 text-white border-[#1a4731] dark:border-green-600'
                    : 'bg-white dark:bg-gray-800 text-[#1a4731] dark:text-green-400 border-[#1a4731]/20 dark:border-gray-700 hover:border-[#1a4731]/40 dark:hover:border-gray-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="space-y-4 sm:space-y-6">
          {activeTab === 'setup' && (
            <>
              {game.background && (
                <RuleSection title={t('游戏背景', 'Game Background')} icon={Globe}>
                  <p className="text-xs sm:text-sm text-[#1a4731]/80 dark:text-gray-300 leading-relaxed">{game.background}</p>
                </RuleSection>
              )}

              <RuleSection title={t('游戏设置', 'Game Setup')} icon={Settings}>
                <SetupSection setups={combinedSetup} />
              </RuleSection>

              {game.tokens && game.tokens.length > 0 && (
                <RuleSection title={t('Token对照表', 'Token Reference')} icon={Hexagon}>
                  <div className="space-y-2 sm:space-y-3">
                    {game.tokens.map((token, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 dark:border-gray-700 pl-3 sm:pl-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                          <span className="font-semibold text-sm sm:text-base text-[#1a4731] dark:text-green-400">{token.name}</span>
                          {token.nameEn && (
                            <span className="text-xs sm:text-sm text-[#1a4731]/50 dark:text-gray-500">{token.nameEn}</span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#1a4731]/70 dark:text-gray-400">{token.description}</p>
                      </div>
                    ))}
                  </div>
                </RuleSection>
              )}

              {game.cards && game.cards.length > 0 && (
                <RuleSection title={t('卡牌对照表', 'Card Reference')} icon={LayoutGrid}>
                  <div className="space-y-2 sm:space-y-3">
                    {game.cards.map((card, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 dark:border-gray-700 pl-3 sm:pl-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                          <span className="font-semibold text-sm sm:text-base text-[#1a4731] dark:text-green-400">{card.name}</span>
                          {card.nameEn && (
                            <span className="text-xs sm:text-sm text-[#1a4731]/50 dark:text-gray-500">{card.nameEn}</span>
                          )}
                          <span className="text-xs bg-[#1a4731]/10 dark:bg-green-900/30 text-[#1a4731] dark:text-green-400 px-1.5 sm:px-2 py-0.5 rounded">
                            ×{card.count}
                          </span>
                        </div>
                        {card.description && (
                          <p className="text-xs sm:text-sm text-[#1a4731]/70 dark:text-gray-400">{card.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </RuleSection>
              )}

              {game.roundPhases && game.roundPhases.length > 0 && (
                <RuleSection title={t('回合轮次', 'Round Phases')} icon={Layers}>
                  <div className="space-y-3 sm:space-y-4">
                    {game.roundPhases.map((phase, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 dark:border-gray-700 pl-3 sm:pl-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                          <span className="font-semibold text-sm sm:text-base text-[#1a4731] dark:text-green-400">{phase.name}</span>
                          {phase.description && (
                            <span className="text-xs sm:text-sm text-[#1a4731]/50 dark:text-gray-500">{phase.description}</span>
                          )}
                        </div>
                        <ul className="space-y-0.5 sm:space-y-1">
                          {phase.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-[#1a4731]/80 dark:text-gray-300 text-xs sm:text-sm">• {step}</li>
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
                <div className="space-y-3 sm:space-y-4">
                  {combinedTurnActions.map((turn, idx) => (
                    <div key={idx} className={`border-l-4 pl-3 sm:pl-4 ${
                      turn.type === 'base' ? 'border-green-400 dark:border-green-600/50' : 'border-amber-400 dark:border-amber-600/50'
                    }`}>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                          turn.type === 'base' ? 'bg-green-500 dark:bg-green-600' : 'bg-amber-500 dark:bg-amber-600'
                        }`}></span>
                        <span className={`font-medium text-sm sm:text-base ${turn.type === 'base' ? 'text-[#1a4731] dark:text-green-400' : 'text-amber-700 dark:text-amber-300'}`}>
                          {turn.source}
                        </span>
                      </div>
                      
                      {turn.onYourTurn && turn.onYourTurn.length > 0 && (
                        <div className="mb-1.5 sm:mb-2">
                          <h4 className="text-xs sm:text-sm font-medium text-[#1a4731]/70 dark:text-gray-400 mb-0.5 sm:mb-1">{t('自己回合', 'On Your Turn')}</h4>
                          <ul className="space-y-0.5 sm:space-y-1">
                            {turn.onYourTurn.map((action, i) => (
                              <li key={i} className="text-[#1a4731]/80 dark:text-gray-300 text-xs sm:text-sm">• {action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {turn.outsideYourTurn && turn.outsideYourTurn.length > 0 && (
                        <div>
                          <h4 className="text-xs sm:text-sm font-medium text-[#1a4731]/70 dark:text-gray-400 mb-0.5 sm:mb-1">{t('回合外', 'Outside Your Turn')}</h4>
                          <ul className="space-y-0.5 sm:space-y-1">
                            {turn.outsideYourTurn.map((action, i) => (
                              <li key={i} className="text-[#1a4731]/80 dark:text-gray-300 text-xs sm:text-sm">• {action}</li>
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
                  <div className="space-y-3 sm:space-y-4">
                    {game.roundPhases.map((phase, index) => (
                      <div key={index} className="border-l-4 border-[#1a4731]/20 dark:border-gray-700 pl-3 sm:pl-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                          <span className="font-semibold text-sm sm:text-base text-[#1a4731] dark:text-green-400">{phase.name}</span>
                          {phase.description && (
                            <span className="text-xs sm:text-sm text-[#1a4731]/50 dark:text-gray-500">{phase.description}</span>
                          )}
                        </div>
                        <ul className="space-y-0.5 sm:space-y-1">
                          {phase.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-[#1a4731]/80 dark:text-gray-300 text-xs sm:text-sm">• {step}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </RuleSection>
              )}

              <RuleSection title={t('游戏提示', 'Tips')} icon={Lightbulb}>
                <ul className="space-y-1.5 sm:space-y-2">
                  {combinedTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                      <span className={tip.source === 'base' ? 'text-amber-500 dark:text-amber-400' : 'text-amber-600 dark:text-amber-500'}>★</span>
                      <span className={`text-xs sm:text-sm ${tip.source === 'base' ? 'text-[#1a4731]/80 dark:text-gray-300' : 'text-amber-700 dark:text-amber-400'}`}>
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
                <ul className="space-y-1.5 sm:space-y-2">
                  {combinedEndConditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                      <span className={condition.source === 'base' ? 'text-[#1a4731]/40 dark:text-gray-600' : 'text-amber-400 dark:text-amber-500'}>
                        {condition.source === 'base' ? '◆' : '◈'}
                      </span>
                      <span className={`text-xs sm:text-sm ${condition.source === 'base' ? 'text-[#1a4731]/80 dark:text-gray-300' : 'text-amber-700 dark:text-amber-400'}`}>
                        {condition.text}
                        {condition.source !== 'base' && (
                          <span className="text-xs text-amber-500 dark:text-amber-600 ml-1">[{condition.source}]</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </RuleSection>

              <RuleSection title={t('计分方式', 'Scoring')} icon={Trophy}>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-[#1a4731] dark:text-green-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                      <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a4731]/60 dark:text-gray-600" />
                      {t('游戏过程中', 'During Game')}
                    </h3>
                    <ul className="space-y-0.5 sm:space-y-1">
                      {combinedScoring.duringGame.map((item, index) => (
                        <li key={index} className="text-xs sm:text-sm">
                          <span className={item.source === 'base' ? 'text-[#1a4731]/80 dark:text-gray-300' : 'text-amber-700 dark:text-amber-400'}>
                            • {item.text}
                            {item.source !== 'base' && (
                              <span className="text-xs text-amber-500 dark:text-amber-600 ml-1">[{item.source}]</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-[#1a4731] dark:text-green-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                      <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a4731]/60 dark:text-gray-600" />
                      {t('终局计分', 'End Game')}
                    </h3>
                    <ul className="space-y-0.5 sm:space-y-1">
                      {combinedScoring.endGame.map((item, index) => (
                        <li key={index} className="text-xs sm:text-sm">
                          <span className={item.source === 'base' ? 'text-[#1a4731]/80 dark:text-gray-300' : 'text-amber-700 dark:text-amber-400'}>
                            • {item.text}
                            {item.source !== 'base' && (
                              <span className="text-xs text-amber-500 dark:text-amber-600 ml-1">[{item.source}]</span>
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

        {showFeedback && (
          <RuleFeedbackModal
            gameId={game.id}
            gameName={language === 'zh' ? game.name : game.nameEn}
            onClose={() => setShowFeedback(false)}
          />
        )}

        {showChat && (
          <GameChatModal
            game={game}
            onClose={() => setShowChat(false)}
          />
        )}

        {showPhotoScoring && (
          <PhotoScoringModal
            game={game}
            onClose={() => setShowPhotoScoring(false)}
          />
        )}

        {copyNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
            {copyNotification}
          </div>
        )}
      </div>
      
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          
          button, a {
            display: none !important;
          }
          
          .print-hide {
            display: none !important;
          }
          
          .min-h-screen {
            min-height: auto !important;
          }
          
          .py-4, .sm\\:py-6, .lg\\:py-8 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          
          .px-3, .sm\\:px-4, .lg\\:px-6 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          
          .bg-\\[\\#f5f5dc\\] {
            background: white !important;
          }
          
          .dark\\:bg-gray-900 {
            background: white !important;
          }
          
          .rounded-xl, .rounded-lg, .rounded-full {
            border-radius: 0 !important;
          }
          
          .border-2 {
            border-width: 1px !important;
            border-color: #ddd !important;
          }
          
          .shadow-lg {
            box-shadow: none !important;
          }
          
          * {
            color: black !important;
          }
          
          h1, h2, h3 {
            color: black !important;
          }
          
          .dark\\:text-green-400 {
            color: black !important;
          }
          
          .dark\\:text-gray-300 {
            color: #333 !important;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
