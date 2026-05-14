import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, AlertTriangle, AlertCircle, Info, CheckCircle, Shield } from 'lucide-react'
import { games } from '@/data/games'
import { useLanguage } from '@/contexts/LanguageContext'
import { validateAllGames, validateGameRule, type RuleValidationResult } from '@/utils/ruleValidator'
import { getStoredFeedback, type FeedbackItem } from '@/components/RuleFeedbackModal'

export default function RuleValidationPage() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const [results, setResults] = useState<RuleValidationResult[]>([])
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'auto' | 'feedback'>('auto')

  const runValidation = useCallback(async () => {
    setIsChecking(true)
    const validationResults = await validateAllGames(games)
    setResults(validationResults)
    setIsChecking(false)
  }, [])

  useEffect(() => {
    runValidation()
    setFeedback(getStoredFeedback())
  }, [runValidation])

  const selectedResult = results.find(r => r.gameId === selectedGame)

  const totalIssues = results.reduce((sum, r) => sum + r.summary.total, 0)
  const totalErrors = results.reduce((sum, r) => sum + r.summary.errors, 0)
  const totalWarnings = results.reduce((sum, r) => sum + r.summary.warnings, 0)
  const totalInfo = results.reduce((sum, r) => sum + r.summary.info, 0)

  return (
    <div className="min-h-screen bg-[#f5f5dc] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#1a4731] hover:text-[#1a4731]/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('返回首页', 'Back to Home')}</span>
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#1a4731]" />
            <span className="font-semibold text-[#1a4731]">
              {language === 'zh' ? '规则校验中心' : 'Rule Validation Center'}
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="text-2xl font-bold text-[#1a4731]">{games.length}</div>
            <div className="text-sm text-[#1a4731]/60">
              {language === 'zh' ? '游戏总数' : 'Total Games'}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-red-200">
            <div className="text-2xl font-bold text-red-600">{totalErrors}</div>
            <div className="text-sm text-red-600/60">
              {language === 'zh' ? '错误' : 'Errors'}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-amber-200">
            <div className="text-2xl font-bold text-amber-600">{totalWarnings}</div>
            <div className="text-sm text-amber-600/60">
              {language === 'zh' ? '警告' : 'Warnings'}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{totalInfo}</div>
            <div className="text-sm text-blue-600/60">
              {language === 'zh' ? '提示' : 'Info'}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('auto')}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium text-sm transition-colors ${
              activeTab === 'auto'
                ? 'bg-[#1a4731] text-white border-[#1a4731]'
                : 'bg-white text-[#1a4731] border-gray-200 hover:border-[#1a4731]/40'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />
              {language === 'zh' ? '自动校验' : 'Auto Validation'}
              {totalIssues > 0 && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalIssues}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium text-sm transition-colors ${
              activeTab === 'feedback'
                ? 'bg-[#1a4731] text-white border-[#1a4731]'
                : 'bg-white text-[#1a4731] border-gray-200 hover:border-[#1a4731]/40'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {language === 'zh' ? '用户反馈' : 'User Feedback'}
              {feedback.length > 0 && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                  {feedback.length}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Auto Validation Tab */}
        {activeTab === 'auto' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a4731]">
                {language === 'zh' ? '自动校验结果' : 'Auto Validation Results'}
              </h2>
              <button
                onClick={runValidation}
                disabled={isChecking}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a4731] text-white rounded-lg hover:bg-[#1a4731]/90 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
                {language === 'zh' ? '重新校验' : 'Re-check'}
              </button>
            </div>

            {isChecking ? (
              <div className="bg-white rounded-xl p-12 text-center border-2 border-gray-200">
                <RefreshCw className="w-8 h-8 text-[#1a4731] animate-spin mx-auto mb-4" />
                <p className="text-[#1a4731]/70">
                  {language === 'zh' ? '正在校验所有游戏规则...' : 'Validating all game rules...'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {/* Game List */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-[#1a4731]/60 mb-2">
                    {language === 'zh' ? '游戏列表' : 'Game List'}
                  </h3>
                  {results.map(result => (
                    <button
                      key={result.gameId}
                      onClick={() => setSelectedGame(result.gameId)}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                        selectedGame === result.gameId
                          ? 'border-[#1a4731] bg-[#1a4731]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1a4731]">{result.gameName}</span>
                        <div className="flex items-center gap-1">
                          {result.summary.errors > 0 && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                              {result.summary.errors}
                            </span>
                          )}
                          {result.summary.warnings > 0 && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              {result.summary.warnings}
                            </span>
                          )}
                          {result.summary.info > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {result.summary.info}
                            </span>
                          )}
                          {result.summary.total === 0 && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Issue Details */}
                <div>
                  <h3 className="text-sm font-medium text-[#1a4731]/60 mb-2">
                    {language === 'zh' ? '问题详情' : 'Issue Details'}
                  </h3>
                  {selectedResult ? (
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                      <h4 className="font-semibold text-[#1a4731] mb-4">
                        {selectedResult.gameName}
                      </h4>
                      {selectedResult.issues.length === 0 ? (
                        <div className="text-center py-8">
                          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="text-green-600">
                            {language === 'zh' ? '未发现明显问题' : 'No issues found'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedResult.issues.map((issue, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border-l-4 ${
                                issue.type === 'error'
                                  ? 'bg-red-50 border-red-400'
                                  : issue.type === 'warning'
                                  ? 'bg-amber-50 border-amber-400'
                                  : 'bg-blue-50 border-blue-400'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {issue.type === 'error' ? (
                                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                ) : issue.type === 'warning' ? (
                                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-[#1a4731]">
                                    {issue.message}
                                  </div>
                                  {issue.suggestion && (
                                    <div className="text-xs text-[#1a4731]/60 mt-1">
                                      💡 {issue.suggestion}
                                    </div>
                                  )}
                                  {issue.bggReference && (
                                    <div className="text-xs text-blue-600 mt-1">
                                      📚 {issue.bggReference}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 text-center">
                      <p className="text-[#1a4731]/50">
                        {language === 'zh' ? '选择左侧游戏查看详情' : 'Select a game to view details'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a4731]">
                {language === 'zh' ? '用户反馈列表' : 'User Feedback List'}
              </h2>
              <button
                onClick={() => setFeedback(getStoredFeedback())}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a4731] text-white rounded-lg hover:bg-[#1a4731]/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                {language === 'zh' ? '刷新' : 'Refresh'}
              </button>
            </div>

            {feedback.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border-2 border-gray-200">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <p className="text-[#1a4731]/70">
                  {language === 'zh' ? '暂无用户反馈' : 'No user feedback yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {feedback.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-medium text-[#1a4731]">{item.gameName}</span>
                        <span className="text-sm text-[#1a4731]/50 ml-2">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : item.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status === 'pending'
                          ? (language === 'zh' ? '待处理' : 'Pending')
                          : item.status === 'confirmed'
                          ? (language === 'zh' ? '已确认' : 'Confirmed')
                          : (language === 'zh' ? '已拒绝' : 'Rejected')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-[#1a4731]/10 text-[#1a4731] px-2 py-0.5 rounded">
                        {item.typeLabel}
                      </span>
                    </div>
                    <p className="text-sm text-[#1a4731]/80">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
