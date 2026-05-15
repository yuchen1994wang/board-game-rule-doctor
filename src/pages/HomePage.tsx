import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Package, Globe, Users, Scale, Moon, Sun, X, Filter, ArrowUpDown } from 'lucide-react'
import { games } from '@/data/games'
import ExpansionModal from '@/components/ExpansionModal'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/hooks/useTheme'

type SortOption = 'weight' | 'name' | 'playerCount'

const CATEGORIES = ['德式', '美式', '聚会', '合作', '抽象']
const MECHANISMS = ['工人放置', '骰子驱动', '引擎构筑', '拍卖', '卡牌驱动', '板块放置', '手牌管理', '资源管理', '区域控制', '合作', '轮抽', '谈判', '路线规划', '网格移动', '拼图', '记忆', '反应']
const PLAYER_COUNT_OPTIONS = [
  { label: '1人', value: '1', min: 1, max: 1 },
  { label: '2人', value: '2', min: 2, max: 2 },
  { label: '3人', value: '3', min: 3, max: 3 },
  { label: '4人', value: '4', min: 4, max: 4 },
  { label: '5人', value: '5', min: 5, max: 5 },
  { label: '6人', value: '6', min: 6, max: 6 },
  { label: '7人', value: '7', min: 7, max: 7 },
  { label: '8人', value: '8', min: 8, max: 8 },
  { label: '8+人', value: '8+', min: 8, max: 20 }
]
const WEIGHT_OPTIONS = [
  { label: '轻量 <2.0', value: 'light', min: 0, max: 1.99 },
  { label: '中量 2.0-3.0', value: 'medium', min: 2.0, max: 3.0 },
  { label: '重量 >3.0', value: 'heavy', min: 3.01, max: 10 }
]

const categoryColors: Record<string, string> = {
  '德式': 'bg-blue-100 text-blue-700',
  '美式': 'bg-red-100 text-red-700',
  '聚会': 'bg-purple-100 text-purple-700',
  '合作': 'bg-green-100 text-green-700',
  '抽象': 'bg-gray-100 text-gray-700',
}

const mechanismColors: Record<string, string> = {
  '工人放置': 'bg-amber-100 text-amber-700',
  '骰子驱动': 'bg-orange-100 text-orange-700',
  '引擎构筑': 'bg-emerald-100 text-emerald-700',
  '拍卖': 'bg-rose-100 text-rose-700',
  '卡牌驱动': 'bg-indigo-100 text-indigo-700',
  '板块放置': 'bg-teal-100 text-teal-700',
  '手牌管理': 'bg-cyan-100 text-cyan-700',
  '资源管理': 'bg-lime-100 text-lime-700',
  '区域控制': 'bg-violet-100 text-violet-700',
  '合作': 'bg-green-100 text-green-700',
  '轮抽': 'bg-pink-100 text-pink-700',
  '谈判': 'bg-yellow-100 text-yellow-700',
  '路线规划': 'bg-sky-100 text-sky-700',
  '网格移动': 'bg-fuchsia-100 text-fuchsia-700',
  '拼图': 'bg-stone-100 text-stone-700',
  '记忆': 'bg-orange-100 text-orange-700',
  '反应': 'bg-red-100 text-red-700',
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMechanisms, setSelectedMechanisms] = useState<string[]>([])
  const [selectedPlayerCounts, setSelectedPlayerCounts] = useState<string[]>([])
  const [selectedWeights, setSelectedWeights] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('weight')
  const [showFilters, setShowFilters] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const parsePlayerCount = (playerCount: string): { min: number; max: number } | null => {
    const match = playerCount.match(/(\d+)-(\d+)/)
    if (match) return { min: parseInt(match[1]), max: parseInt(match[2]) }
    const singleMatch = playerCount.match(/(\d+)/)
    if (singleMatch) return { min: parseInt(singleMatch[1]), max: parseInt(singleMatch[1]) }
    return null
  }

  const filteredGames = games
    .filter(game => {
      const nameMatch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       game.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      
      const categoryMatch = selectedCategories.length === 0 || 
                           game.category.some(cat => selectedCategories.includes(cat))
      
      // 机制是"且"逻辑：选中的所有机制都必须包含
      const mechanismMatch = selectedMechanisms.length === 0 || 
                            selectedMechanisms.every(mech => game.mechanism.includes(mech as typeof game.mechanism[number]))
      
      // 人数是"或"逻辑：任一选中的人数匹配即可
      let playerCountMatch = true
      if (selectedPlayerCounts.length > 0) {
        const gamePlayerRange = parsePlayerCount(game.playerCount || '')
        if (gamePlayerRange) {
          playerCountMatch = selectedPlayerCounts.some(pcValue => {
            const option = PLAYER_COUNT_OPTIONS.find(p => p.value === pcValue)
            if (!option) return false
            if (pcValue === '8+') {
              return gamePlayerRange.max >= 8
            }
            return gamePlayerRange.max >= option.min && gamePlayerRange.min <= option.max
          })
        } else {
          playerCountMatch = false
        }
      }
      
      // BGG权重是"或"逻辑：任一选中的权重范围匹配即可
      let weightMatch = true
      if (selectedWeights.length > 0) {
        weightMatch = selectedWeights.some(wValue => {
          const option = WEIGHT_OPTIONS.find(w => w.value === wValue)
          if (!option || !game.weight) return false
          return game.weight >= option.min && game.weight <= option.max
        })
      }
      
      return nameMatch && categoryMatch && mechanismMatch && playerCountMatch && weightMatch
    })
    .sort((a, b) => {
      if (sortBy === 'weight') {
        return (b.weight || 0) - (a.weight || 0)
      } else if (sortBy === 'name') {
        const nameA = language === 'zh' ? a.name : a.nameEn
        const nameB = language === 'zh' ? b.name : b.nameEn
        return nameA.localeCompare(nameB)
      } else if (sortBy === 'playerCount') {
        const rangeA = parsePlayerCount(a.playerCount || '0')
        const rangeB = parsePlayerCount(b.playerCount || '0')
        const avgA = rangeA ? (rangeA.min + rangeA.max) / 2 : 0
        const avgB = rangeB ? (rangeB.min + rangeB.max) / 2 : 0
        return avgB - avgA
      }
      return 0
    })

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleMechanismToggle = (mechanism: string) => {
    setSelectedMechanisms(prev => 
      prev.includes(mechanism) 
        ? prev.filter(m => m !== mechanism)
        : [...prev, mechanism]
    )
  }

  const handlePlayerCountToggle = (value: string) => {
    setSelectedPlayerCounts(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const handleWeightToggle = (value: string) => {
    setSelectedWeights(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const removeFilter = (type: string, value?: string) => {
    if (type === 'category' && value) {
      setSelectedCategories(prev => prev.filter(c => c !== value))
    } else if (type === 'mechanism' && value) {
      setSelectedMechanisms(prev => prev.filter(m => m !== value))
    } else if (type === 'playerCount' && value) {
      setSelectedPlayerCounts(prev => prev.filter(v => v !== value))
    } else if (type === 'weight' && value) {
      setSelectedWeights(prev => prev.filter(v => v !== value))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedMechanisms([])
    setSelectedPlayerCounts([])
    setSelectedWeights([])
    setSearchQuery('')
    setSortBy('weight')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedMechanisms.length > 0 || 
                          selectedPlayerCounts.length > 0 || selectedWeights.length > 0 || searchQuery

  const handleGameClick = (gameId: string) => {
    const game = games.find(g => g.id === gameId)
    if (game?.hasExpansions) {
      setSelectedGame(gameId)
    } else {
      navigate(`/rule/${gameId}`)
    }
  }

  const handleCloseModal = () => {
    setSelectedGame(null)
  }

  return (
    <div className="min-h-screen bg-[#f5f5dc] dark:bg-gray-900 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1a4731] dark:text-green-400">
              {t('桌游规则助手', 'Board Game Rules')}
            </h1>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-gray-800 rounded-lg border-2 border-[#1a4731]/20 hover:border-[#1a4731]/40 transition-colors text-xs sm:text-sm text-[#1a4731] dark:text-green-400"
              >
                {theme === 'dark' ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-gray-800 rounded-lg border-2 border-[#1a4731]/20 hover:border-[#1a4731]/40 transition-colors text-xs sm:text-sm text-[#1a4731] dark:text-green-400"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#1a4731]/70 dark:text-gray-400">{t('快速查阅常见桌游规则', 'Quick reference for board game rules')}</p>
        </header>

        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#1a4731]/50 dark:text-gray-400" />
          <input
            type="text"
            placeholder={t('搜索桌游名称...', 'Search board games...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border-2 border-[#1a4731]/20 bg-white dark:bg-gray-800 focus:border-[#1a4731] focus:outline-none transition-colors text-sm sm:text-base text-[#1a4731] dark:text-gray-100 placeholder-[#1a4731]/40 dark:placeholder-gray-500"
          />
        </div>

        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-[#1a4731]/20 hover:border-[#1a4731]/40 transition-colors text-sm text-[#1a4731] dark:text-green-400"
            >
              <Filter className="w-4 h-4" />
              {t('筛选', 'Filters')}
              {(selectedCategories.length > 0 || selectedMechanisms.length > 0 || selectedPlayerCounts.length > 0 || selectedWeights.length > 0) && (
                <span className="bg-[#1a4731] dark:bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {selectedCategories.length + selectedMechanisms.length + selectedPlayerCounts.length + selectedWeights.length}
                </span>
              )}
            </button>
            
            <div className="relative flex-1">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a4731]/50 dark:text-gray-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-[#1a4731]/20 focus:border-[#1a4731] focus:outline-none transition-colors text-sm text-[#1a4731] dark:text-green-400 appearance-none cursor-pointer"
              >
                <option value="weight">{t('按BGG权重排序', 'Sort by BGG Weight')}</option>
                <option value="name">{t('按字母顺序', 'Sort by Name')}</option>
                <option value="playerCount">{t('按人数范围', 'Sort by Player Count')}</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 dark:bg-red-900/30 rounded-lg border-2 border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-sm text-red-600 dark:text-red-400"
              >
                <X className="w-4 h-4" />
                {t('清除', 'Clear')}
              </button>
            )}
          </div>

          {showFilters && (
            <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
              <div 
                className="absolute inset-0 bg-black/50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl lg:rounded-xl lg:border-2 border-[#1a4731]/20 p-4 sm:p-6 lg:p-4 space-y-4 max-h-[80vh] overflow-y-auto lg:max-h-none lg:overflow-visible">
                <div className="flex items-center justify-between lg:hidden mb-2">
                  <h3 className="text-lg font-semibold text-[#1a4731] dark:text-green-400">{t('筛选条件', 'Filters')}</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#1a4731] dark:text-gray-400" />
                  </button>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-[#1a4731] dark:text-green-400 mb-2">
                    {t('按类别', 'By Category')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryToggle(cat)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategories.includes(cat)
                            ? 'bg-[#1a4731] dark:bg-green-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1a4731] dark:text-green-400 mb-2">
                    {t('按机制', 'By Mechanism')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {MECHANISMS.map(mech => (
                      <button
                        key={mech}
                        onClick={() => handleMechanismToggle(mech)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedMechanisms.includes(mech)
                            ? 'bg-[#1a4731] dark:bg-green-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {mech}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1a4731] dark:text-green-400 mb-2">
                    {t('按人数', 'By Player Count')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {PLAYER_COUNT_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handlePlayerCountToggle(option.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedPlayerCounts.includes(option.value)
                            ? 'bg-[#1a4731] dark:bg-green-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#1a4731] dark:text-green-400 mb-2">
                    {t('按BGG权重', 'By BGG Weight')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {WEIGHT_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleWeightToggle(option.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedWeights.includes(option.value)
                            ? 'bg-[#1a4731] dark:bg-green-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 bg-[#1a4731] dark:bg-green-600 text-white rounded-lg font-medium lg:hidden"
                >
                  {t('完成', 'Done')}
                </button>
              </div>
            </div>
          )}

          {(selectedCategories.length > 0 || selectedMechanisms.length > 0 || selectedPlayerCounts.length > 0 || selectedWeights.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(cat => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm"
                >
                  {cat}
                  <button
                    onClick={() => removeFilter('category', cat)}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedMechanisms.map(mech => (
                <span
                  key={mech}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs sm:text-sm"
                >
                  {mech}
                  <button
                    onClick={() => removeFilter('mechanism', mech)}
                    className="hover:bg-amber-200 dark:hover:bg-amber-800 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedPlayerCounts.map(pc => (
                <span
                  key={pc}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs sm:text-sm"
                >
                  {PLAYER_COUNT_OPTIONS.find(p => p.value === pc)?.label}
                  <button
                    onClick={() => removeFilter('playerCount', pc)}
                    className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedWeights.map(w => (
                <span
                  key={w}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm"
                >
                  {WEIGHT_OPTIONS.find(opt => opt.value === w)?.label}
                  <button
                    onClick={() => removeFilter('weight', w)}
                    className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="text-xs sm:text-sm text-[#1a4731]/60 dark:text-gray-400 mb-3 sm:mb-4">
          {t('共', 'Total')} {filteredGames.length} {t('款桌游', 'games')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game.id)}
                className="text-left p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-[#1a4731]/10 hover:border-[#1a4731]/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center text-center p-1 font-bold text-xs sm:text-sm leading-tight relative bg-gray-200 dark:bg-gray-700 animate-pulse"
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
                      alt={game.name}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement
                        target.classList.remove('opacity-0')
                        target.parentElement?.classList.remove('animate-pulse')
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.classList.remove('animate-pulse')
                          const span = parent.querySelector('.fallback-name') as HTMLElement
                          if (span) span.classList.remove('hidden')
                        }
                      }}
                    />
                    <span className="hidden fallback-name">
                      {language === 'zh' ? game.name : game.nameEn}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#1a4731] dark:text-green-400 text-sm sm:text-base lg:text-lg">
                        {language === 'zh' ? game.name : game.nameEn}
                      </h3>
                      {game.hasExpansions && (
                        <span className="inline-flex items-center gap-1 text-xs bg-[#1a4731]/10 dark:bg-green-900 dark:text-green-300 text-[#1a4731] px-1.5 sm:px-2 py-0.5 rounded">
                          <Package className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {t('有扩展', 'Expansions')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#1a4731]/60 dark:text-gray-400 mt-0.5 line-clamp-2">
                      {language === 'zh' ? game.description : game.nameEn}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2 flex-wrap">
                      {game.category.slice(0, 2).map(cat => (
                        <span
                          key={cat}
                          className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${categoryColors[cat] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {cat}
                        </span>
                      ))}
                      {game.mechanism
                        .slice(0, 3)
                        .map(mech => (
                          <span
                            key={mech}
                            className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${mechanismColors[mech] || 'bg-gray-100 text-gray-700'}`}
                          >
                            {mech}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5">
                      {game.playerCount && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#1a4731]/60 dark:text-gray-400">
                          <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {game.playerCount}
                        </span>
                      )}
                      {game.weight && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#1a4731]/60 dark:text-gray-400">
                          <Scale className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          BGG {game.weight.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#1a4731]/60">{t('未找到匹配的桌游', 'No matching games found')}</p>
            </div>
          )}
        </div>
      </div>

      {selectedGame && (
        <ExpansionModal 
          gameId={selectedGame} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  )
}
