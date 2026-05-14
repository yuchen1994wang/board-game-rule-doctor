import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Package, Globe, Users, Scale } from 'lucide-react'
import { games } from '@/data/games'
import ExpansionModal from '@/components/ExpansionModal'
import { useLanguage } from '@/contexts/LanguageContext'

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
  const { language, toggleLanguage, t } = useLanguage()
  const navigate = useNavigate()

  const filteredGames = games
    .filter(game =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (b.weight || 0) - (a.weight || 0))

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
    <div className="min-h-screen bg-[#f5f5dc] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-3xl font-serif font-bold text-[#1a4731]">
              {t('桌游规则助手', 'Board Game Rules')}
            </h1>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border-2 border-[#1a4731]/20 hover:border-[#1a4731]/40 transition-colors text-sm text-[#1a4731]"
            >
              <Globe className="w-4 h-4" />
              {language === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
          <p className="text-[#1a4731]/70">{t('快速查阅常见桌游规则', 'Quick reference for board game rules')}</p>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a4731]/50" />
          <input
            type="text"
            placeholder={t('搜索桌游名称...', 'Search board games...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#1a4731]/20 bg-white focus:border-[#1a4731] focus:outline-none transition-colors text-[#1a4731] placeholder-[#1a4731]/40"
          />
        </div>

        <div className="space-y-3">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game.id)}
                className="w-full text-left p-4 bg-white rounded-xl border-2 border-[#1a4731]/10 hover:border-[#1a4731]/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center text-center p-1 font-bold text-sm leading-tight relative"
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#1a4731] text-lg">
                        {language === 'zh' ? game.name : game.nameEn}
                      </h3>
                      {game.hasExpansions && (
                        <span className="inline-flex items-center gap-1 text-xs bg-[#1a4731]/10 text-[#1a4731] px-2 py-0.5 rounded">
                          <Package className="w-3 h-3" />
                          {t('有扩展', 'Expansions')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#1a4731]/60 mt-0.5">
                      {language === 'zh' ? game.description : game.nameEn}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      {game.category.map(cat => (
                        <span
                          key={cat}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[cat] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {cat}
                        </span>
                      ))}
                      {game.mechanism
                        .filter(mech => ['德式', '美式', '聚会', '合作', '抽象'].includes(mech))
                        .map(mech => (
                          <span
                            key={mech}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${mechanismColors[mech] || 'bg-gray-100 text-gray-700'}`}
                          >
                            {mech}
                          </span>
                        ))}
                      {game.mechanism
                        .filter(mech => !['德式', '美式', '聚会', '合作', '抽象'].includes(mech))
                        .map(mech => (
                          <span
                            key={mech}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${mechanismColors[mech] || 'bg-gray-100 text-gray-700'}`}
                          >
                            {mech}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      {game.playerCount && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#1a4731]/60">
                          <Users className="w-3 h-3" />
                          {game.playerCount}
                        </span>
                      )}
                      {game.weight && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#1a4731]/60">
                          <Scale className="w-3 h-3" />
                          BGG {game.weight.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12">
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
