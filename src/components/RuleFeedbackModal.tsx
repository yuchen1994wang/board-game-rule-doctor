import { useState, useEffect, useRef } from 'react'
import { X, AlertTriangle, Send, CheckCircle, MessageSquare, FileText, HelpCircle, Plus, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/hooks/useTheme'

interface RuleFeedbackModalProps {
  gameId: string
  gameName: string
  onClose: () => void
}

export type FeedbackType = 'rule_error' | 'unclear' | 'missing' | 'suggestion' | 'other'

export interface FeedbackItem {
  id: string
  gameId: string
  gameName: string
  type: FeedbackType
  typeLabel: string
  description: string
  rating: number
  timestamp: number
  status: 'pending' | 'confirmed' | 'rejected'
}

const FEEDBACK_STORAGE_KEY = 'boardgame_rule_feedback'

export function getStoredFeedback(): FeedbackItem[] {
  try {
    const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addFeedback(feedback: Omit<FeedbackItem, 'id' | 'timestamp' | 'status'>): FeedbackItem {
  const newFeedback: FeedbackItem = {
    ...feedback,
    id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    status: 'pending'
  }
  const allFeedback = getStoredFeedback()
  allFeedback.push(newFeedback)
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(allFeedback))
  return newFeedback
}

const feedbackTypes: { key: FeedbackType; label: string; labelEn: string; icon: React.ElementType; description: string }[] = [
  {
    key: 'rule_error',
    label: '规则错误',
    labelEn: 'Rule Error',
    icon: AlertTriangle,
    description: '规则描述与官方规则不符'
  },
  {
    key: 'unclear',
    label: '描述不清',
    labelEn: 'Unclear Description',
    icon: HelpCircle,
    description: '规则描述模糊或难以理解'
  },
  {
    key: 'missing',
    label: '缺少内容',
    labelEn: 'Missing Content',
    icon: Plus,
    description: '缺少重要规则或细节'
  },
  {
    key: 'suggestion',
    label: '优化建议',
    labelEn: 'Improvement Suggestion',
    icon: MessageSquare,
    description: '对规则描述的改进建议'
  },
  {
    key: 'other',
    label: '其他问题',
    labelEn: 'Other',
    icon: FileText,
    description: '其他类型的反馈'
  }
]

export default function RuleFeedbackModal({ gameId, gameName, onClose }: RuleFeedbackModalProps) {
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null)
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { language } = useLanguage()
  const { isDark } = useTheme()

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isVisible && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  const handleSubmit = () => {
    setValidationError('')
    
    if (!selectedType) {
      setValidationError(language === 'zh' ? '请选择问题类型' : 'Please select an issue type')
      return
    }
    
    if (!description.trim()) {
      setValidationError(language === 'zh' ? '请输入详细描述' : 'Please enter a detailed description')
      textareaRef.current?.focus()
      return
    }
    
    if (description.trim().length < 10) {
      setValidationError(language === 'zh' ? '描述至少需要10个字符' : 'Description must be at least 10 characters')
      textareaRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    const typeInfo = feedbackTypes.find(t => t.key === selectedType)!

    setTimeout(() => {
      addFeedback({
        gameId,
        gameName,
        type: selectedType,
        typeLabel: language === 'zh' ? typeInfo.label : typeInfo.labelEn,
        description: description.trim(),
        rating
      })
      setIsSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (submitted) {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#1a4731] mb-2">
            {language === 'zh' ? '反馈已提交' : 'Feedback Submitted'}
          </h3>
          <p className="text-[#1a4731]/70 mb-6">
            {language === 'zh'
              ? '感谢您的反馈！我们会尽快核实并修正规则。'
              : 'Thank you for your feedback! We will verify and correct the rules soon.'}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1a4731] text-white rounded-lg hover:bg-[#1a4731]/90 transition-colors"
          >
            {language === 'zh' ? '关闭' : 'Close'}
          </button>
        </div>
      </div>
    )
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
                {language === 'zh' ? '规则纠错' : 'Rule Feedback'}
              </h2>
              <p className="text-sm text-[#1a4731]/60 mt-1">
                {language === 'zh' ? `游戏：${gameName}` : `Game: ${gameName}`}
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
          {/* 问题类型选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1a4731] mb-3">
              {language === 'zh' ? '选择问题类型' : 'Select Issue Type'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {feedbackTypes.map(type => {
                const Icon = type.icon
                const isSelected = selectedType === type.key
                return (
                  <button
                    key={type.key}
                    onClick={() => setSelectedType(type.key)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-[#1a4731] bg-[#1a4731]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#1a4731]' : 'text-gray-400'}`} />
                    <div className="font-medium text-sm text-[#1a4731]">
                      {language === 'zh' ? type.label : type.labelEn}
                    </div>
                    <div className="text-xs text-[#1a4731]/50 mt-1">
                      {type.description}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 详细描述 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1a4731] mb-3">
              {language === 'zh' ? '详细描述' : 'Detailed Description'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                language === 'zh'
                  ? '请详细描述问题，例如：\n- 错误的规则内容是什么\n- 正确的规则应该是什么\n- 参考来源（如BGG、规则书页码等）'
                  : 'Please describe the issue in detail...'
              }
              className="w-full h-32 p-4 rounded-xl border-2 border-gray-200 focus:border-[#1a4731] focus:outline-none resize-none text-sm text-[#1a4731] placeholder-[#1a4731]/30"
            />
          </div>

          {/* 提示信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <FileText className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              {language === 'zh'
                ? '您的反馈将帮助我们改进规则准确性。我们会参考BGG官方规则进行核实。'
                : 'Your feedback helps us improve rule accuracy. We will verify against BGG official rules.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleSubmit}
            disabled={!selectedType || !description.trim() || isSubmitting}
            className="w-full py-3 bg-[#1a4731] text-white rounded-xl font-semibold hover:bg-[#1a4731]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {language === 'zh' ? '提交中...' : 'Submitting...'}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {language === 'zh' ? '提交反馈' : 'Submit Feedback'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
