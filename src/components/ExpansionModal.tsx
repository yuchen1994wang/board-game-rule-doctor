import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ChevronRight, AlertTriangle, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { games } from '@/data/games'
import { expansions } from '@/data/expansions'

interface ExpansionModalProps {
  gameId: string
  onClose: () => void
}

export default function ExpansionModal({ gameId, onClose }: ExpansionModalProps) {
  const [selectedExpansions, setSelectedExpansions] = useState<string[]>([])
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null)
  const navigate = useNavigate()
  
  const game = games.find(g => g.id === gameId)
  const gameExpansions = expansions.filter(e => e.gameId === gameId)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const toggleExpansion = (expansionId: string) => {
    setSelectedExpansions(prev => 
      prev.includes(expansionId)
        ? prev.filter(id => id !== expansionId)
        : [...prev, expansionId]
    )
  }

  const toggleDesc = (expansionId: string) => {
    setExpandedDesc(prev => prev === expansionId ? null : expansionId)
  }

  const getConflicts = (expansionId: string): string[] => {
    const expansion = expansions.find(e => e.id === expansionId)
    if (!expansion?.conflictsWith) return []
    
    return expansion.conflictsWith.filter(id => 
      selectedExpansions.includes(id)
    )
  }

  const handleConfirm = () => {
    const params = selectedExpansions.length > 0 
      ? `?expansions=${selectedExpansions.join(',')}`
      : ''
    navigate(`/game/${gameId}${params}`)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!game) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1a4731]">
                {game.name}
              </h2>
              <p className="text-sm text-[#1a4731]/60 mt-1">
                选择要使用的扩展
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {gameExpansions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#1a4731]/60">
                该游戏暂无扩展
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {gameExpansions.map(expansion => {
                const isSelected = selectedExpansions.includes(expansion.id)
                const conflicts = getConflicts(expansion.id)
                const hasConflict = conflicts.length > 0
                const isDescExpanded = expandedDesc === expansion.id

                return (
                  <div
                    key={expansion.id}
                    className={`rounded-xl border-2 transition-all overflow-hidden ${
                      isSelected
                        ? 'border-[#1a4731] bg-[#1a4731]/5'
                        : 'border-gray-200'
                    } ${hasConflict ? 'border-amber-400 bg-amber-50/50' : ''}`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleExpansion(expansion.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                            isSelected
                              ? 'bg-[#1a4731] border-[#1a4731]'
                              : 'border-gray-300 hover:border-[#1a4731]'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[#1a4731]">
                              {expansion.name}
                            </span>
                            {expansion.conflictsWith && expansion.conflictsWith.length > 0 && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                                存在冲突
                              </span>
                            )}
                            {expansion.playerCount && (
                              <span className="inline-flex items-center gap-1 text-xs bg-[#1a4731]/10 text-[#1a4731] px-2 py-0.5 rounded">
                                <Users className="w-3 h-3" />
                                {expansion.playerCount}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#1a4731]/70 mt-1">
                            {expansion.shortDesc}
                          </p>
                          
                          {hasConflict && (
                            <div className="flex items-center gap-1 mt-2 text-amber-600">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs">
                                与 {conflicts.map(c => expansions.find(e => e.id === c)?.name).join('、')} 存在冲突
                              </span>
                            </div>
                          )}
                          
                          {expansion.description && (
                            <button
                              onClick={() => toggleDesc(expansion.id)}
                              className="flex items-center gap-1 mt-2 text-xs text-[#1a4731]/60 hover:text-[#1a4731] transition-colors"
                            >
                              {isDescExpanded ? (
                                <>
                                  <ChevronUp className="w-3 h-3" />
                                  收起详情
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3" />
                                  查看详情
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        {expansion.image && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <img
                              src={expansion.image}
                              alt={expansion.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          </div>
                        )}
                      </div>
                      
                      {isDescExpanded && expansion.description && (
                        <div className="mt-3 pt-3 border-t border-[#1a4731]/10">
                          <p className="text-sm text-[#1a4731]/80 leading-relaxed">
                            {expansion.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleConfirm}
            disabled={selectedExpansions.some(id => getConflicts(id).length > 0)}
            className="w-full py-3 bg-[#1a4731] text-white rounded-xl font-semibold hover:bg-[#1a4731]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedExpansions.length === 0 ? '查看基础规则' : `查看规则 (已选 ${selectedExpansions.length} 个扩展)`}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
