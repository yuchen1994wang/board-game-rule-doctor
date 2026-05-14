import { useState, useRef, useCallback } from 'react'
import { X, Camera, Upload, Loader2, Trophy, RotateCcw, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { GameRule } from '@/types/game'

interface PhotoScoringModalProps {
  game: GameRule
  onClose: () => void
}

interface ScoringResult {
  playerName: string
  score: number
  details: { category: string; points: number }[]
}

// 模拟AI视觉分析
function simulateAIAnalysis(game: GameRule): Promise<ScoringResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟不同游戏的计分结果
      const mockResults: ScoringResult[] = [
        {
          playerName: '玩家1',
          score: 127,
          details: [
            { category: '建筑分数', points: 45 },
            { category: '资源剩余', points: 23 },
            { category: '成就奖励', points: 30 },
            { category: '区域奖励', points: 29 }
          ]
        },
        {
          playerName: '玩家2',
          score: 115,
          details: [
            { category: '建筑分数', points: 38 },
            { category: '资源剩余', points: 31 },
            { category: '成就奖励', points: 25 },
            { category: '区域奖励', points: 21 }
          ]
        },
        {
          playerName: '玩家3',
          score: 98,
          details: [
            { category: '建筑分数', points: 32 },
            { category: '资源剩余', points: 18 },
            { category: '成就奖励', points: 28 },
            { category: '区域奖励', points: 20 }
          ]
        }
      ]
      resolve(mockResults)
    }, 2500)
  })
}

export default function PhotoScoringModal({ game, onClose }: PhotoScoringModalProps) {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [results, setResults] = useState<ScoringResult[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguage()

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleCameraCapture = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const startAnalysis = useCallback(async () => {
    if (!previewImage) return
    setStep('analyzing')

    try {
      const analysisResults = await simulateAIAnalysis(game)
      setResults(analysisResults)
      setStep('result')
    } catch {
      setStep('upload')
    }
  }, [previewImage, game])

  const handleReset = useCallback(() => {
    setPreviewImage(null)
    setResults([])
    setStep('upload')
  }, [])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1a4731]">
                {language === 'zh' ? '📷 拍照算分' : 'Photo Scoring'}
              </h2>
              <p className="text-sm text-[#1a4731]/60 mt-1">
                {language === 'zh' ? `游戏：${game.name}` : `Game: ${game.nameEn}`}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'upload' && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div
                onClick={handleCameraCapture}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#1a4731] hover:bg-[#1a4731]/5 transition-colors cursor-pointer"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-[#1a4731] font-medium mb-2">
                      {language === 'zh' ? '点击拍照或上传图片' : 'Click to take photo or upload'}
                    </p>
                    <p className="text-sm text-[#1a4731]/50">
                      {language === 'zh'
                        ? '拍摄游戏终局版图，AI将自动识别并计算分数'
                        : 'Take a photo of the final board state'}
                    </p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  {language === 'zh' ? '拍照提示' : 'Photo Tips'}
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• {language === 'zh' ? '确保版图完整可见' : 'Ensure the full board is visible'}</li>
                  <li>• {language === 'zh' ? '光线充足，避免阴影' : 'Good lighting, avoid shadows'}</li>
                  <li>• {language === 'zh' ? '从正上方拍摄' : 'Shoot from directly above'}</li>
                  <li>• {language === 'zh' ? '确保所有玩家组件清晰可见' : 'All player components clearly visible'}</li>
                </ul>
              </div>

              {/* Action Buttons */}
              {previewImage && (
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {language === 'zh' ? '重新拍摄' : 'Retake'}
                  </button>
                  <button
                    onClick={startAnalysis}
                    className="flex-1 py-3 bg-[#1a4731] text-white rounded-xl font-medium hover:bg-[#1a4731]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                    {language === 'zh' ? '开始算分' : 'Start Scoring'}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'analyzing' && (
            <div className="text-center py-12">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-[#1a4731]/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-[#1a4731] rounded-full border-t-transparent animate-spin" />
                <Loader2 className="absolute inset-0 w-12 h-12 text-[#1a4731] animate-spin m-auto" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a4731] mb-2">
                {language === 'zh' ? 'AI正在分析版图...' : 'AI is analyzing the board...'}
              </h3>
              <p className="text-sm text-[#1a4731]/60">
                {language === 'zh'
                  ? '识别组件位置、计算玩家分数'
                  : 'Identifying components and calculating scores'}
              </p>

              {/* Progress Steps */}
              <div className="mt-8 space-y-3 max-w-xs mx-auto">
                {[
                  language === 'zh' ? '识别版图边界' : 'Detecting board edges',
                  language === 'zh' ? '分析玩家组件' : 'Analyzing player components',
                  language === 'zh' ? '计算分数' : 'Calculating scores'
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-[#1a4731]/60">
                    <div className="w-6 h-6 rounded-full bg-[#1a4731]/10 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-[#1a4731]" />
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-6">
              {/* Winner Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4 text-center">
                <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-amber-800">
                  {language === 'zh' ? '🏆 获胜者' : '🏆 Winner'}
                </h3>
                <p className="text-2xl font-bold text-amber-600">
                  {results[0]?.playerName} - {results[0]?.score} {language === 'zh' ? '分' : 'pts'}
                </p>
              </div>

              {/* Score Table */}
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-[#1a4731]">
                        {language === 'zh' ? '玩家' : 'Player'}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-[#1a4731]">
                        {language === 'zh' ? '总分' : 'Total'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} className={index === 0 ? 'bg-amber-50/50' : ''}>
                        <td className="px-4 py-3 text-sm text-[#1a4731]">
                          <div className="flex items-center gap-2">
                            {index === 0 && <Trophy className="w-4 h-4 text-amber-500" />}
                            {result.playerName}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-[#1a4731] text-right">
                          {result.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Score Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#1a4731]">
                  {language === 'zh' ? '分数明细' : 'Score Details'}
                </h4>
                {results.map((result, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="font-medium text-sm text-[#1a4731] mb-2">
                      {result.playerName}
                    </div>
                    <div className="space-y-1">
                      {result.details.map((detail, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-[#1a4731]/60">{detail.category}</span>
                          <span className="font-medium text-[#1a4731]">+{detail.points}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-700">
                  ⚠️ {language === 'zh'
                    ? '此为演示功能，实际AI视觉识别需要接入专业的图像识别服务。当前结果为模拟数据。'
                    : 'This is a demo feature. Actual AI vision requires professional image recognition services.'}
                </p>
              </div>

              {/* Action */}
              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#1a4731] text-white rounded-xl font-medium hover:bg-[#1a4731]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                {language === 'zh' ? '再算一局' : 'Score Another Game'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
