import { useState, useEffect, useRef } from 'react'
import { X, Send, MessageCircle, Bot, User, Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { GameRule } from '@/types/game'

interface GameChatModalProps {
  game: GameRule
  onClose: () => void
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// 模拟AI回答生成
function generateAnswer(game: GameRule, question: string): string {
  const q = question.toLowerCase()

  // 根据问题类型匹配回答
  if (q.includes('人数') || q.includes('几人') || q.includes('玩家')) {
    return `${game.name}支持${game.playerCount || '未指定人数'}。${game.setup.map(s => s.playerCount).join('、')}都有不同的配置。`
  }

  if (q.includes('时间') || q.includes('多久') || q.includes('时长')) {
    const timeTip = game.tips.find(t => t.includes('分钟') || t.includes('小时'))
    return timeTip || `${game.name}的游戏时长通常在60-120分钟之间，具体取决于玩家数量和熟悉程度。`
  }

  if (q.includes('设置') || q.includes('准备') || q.includes('怎么开始')) {
    const setupSteps = game.setup[0]?.steps.slice(0, 3).join('\n• ') || ''
    return `游戏设置步骤（${game.setup[0]?.playerCount}）：\n• ${setupSteps}\n... 共${game.setup[0]?.steps.length || 0}个步骤`
  }

  if (q.includes('回合') || q.includes('行动') || q.includes('做什么')) {
    const actions = game.turnActions.onYourTurn.slice(0, 3).join('\n• ') || ''
    return `在你的回合，你可以：\n• ${actions}\n... 等共${game.turnActions.onYourTurn.length}种行动`
  }

  if (q.includes('结束') || q.includes('怎么赢') || q.includes('胜利')) {
    return `游戏结束条件：\n• ${game.endConditions.join('\n• ')}`
  }

  if (q.includes('分数') || q.includes('计分') || q.includes('得分')) {
    const scoring = [
      ...(game.scoring.duringGame || []),
      ...(game.scoring.endGame || [])
    ].slice(0, 3).join('\n• ') || ''
    return `计分方式：\n• ${scoring}\n... 详见计分标签页`
  }

  if (q.includes('token') || q.includes('标记') || q.includes('组件')) {
    if (game.tokens && game.tokens.length > 0) {
      const tokens = game.tokens.slice(0, 3).map(t => `${t.name}：${t.description}`).join('\n• ') || ''
      return `主要组件：\n• ${tokens}\n... 共${game.tokens.length}种token`
    }
    return `${game.name}没有token对照表，主要使用卡牌进行游戏。`
  }

  if (q.includes('卡牌') || q.includes('卡片')) {
    if (game.cards && game.cards.length > 0) {
      const cards = game.cards.slice(0, 3).map(c => `${c.name}（${c.count}张）`).join('\n• ') || ''
      return `卡牌类型：\n• ${cards}\n... 共${game.cards.length}种卡牌`
    }
    return `${game.name}没有详细的卡牌对照表。`
  }

  if (q.includes('策略') || q.includes('技巧') || q.includes('怎么玩')) {
    const tips = game.tips.slice(0, 3).join('\n• ') || ''
    return `游戏策略提示：\n• ${tips}\n... 详见提示标签页`
  }

  if (q.includes('背景') || q.includes('主题') || q.includes('故事')) {
    return game.background || `${game.name}是一款${game.category.join('、')}类型的桌游，采用${game.mechanism.join('、')}机制。`
  }

  if (q.includes('重度') || q.includes('难度') || q.includes('复杂')) {
    return `${game.name}的BGG重度为${game.weight?.toFixed(1) || '未评分'}（满分5.0）。${
      game.weight && game.weight >= 4.0 ? '这是一款重度策略游戏，适合有经验的玩家。' :
      game.weight && game.weight >= 3.0 ? '这是一款中等策略游戏，适合有一定经验的玩家。' :
      game.weight && game.weight >= 2.0 ? '这是一款轻中策略游戏，适合新手和休闲玩家。' :
      '这是一款轻度游戏，非常适合新手入门。'
    }`
  }

  if (q.includes('扩展') || q.includes('扩充')) {
    return game.hasExpansions
      ? `${game.name}有扩展包，可以在首页选择游戏时勾选扩展来查看扩展规则。`
      : `${game.name}目前没有扩展包。`
  }

  // 默认回答
  return `关于${game.name}的"${question}"，根据现有规则信息：\n\n${game.description}\n\n如果您想了解更具体的规则细节，建议查看对应标签页的内容，或使用更具体的关键词提问（如"回合行动"、"计分方式"、"游戏设置"等）。`
}

export default function GameChatModal({ game, onClose }: GameChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `你好！我是${game.name}的规则助手。你可以问我关于游戏规则的问题，比如：\n• 游戏怎么设置？\n• 回合可以做什么？\n• 怎么计分？\n• 有什么策略技巧？`,
      timestamp: Date.now()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // 模拟AI思考延迟
    setTimeout(() => {
      const answer = generateAnswer(game, userMessage.content)
      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: answer,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800 + Math.random() * 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#1a4731]">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-semibold text-white text-sm">
                {language === 'zh' ? `${game.name} 规则助手` : `${game.nameEn} Rule Assistant`}
              </h3>
              <p className="text-white/60 text-xs">
                {language === 'zh' ? '基于游戏规则回答您的问题' : 'Answer questions based on game rules'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#1a4731] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  message.role === 'user'
                    ? 'bg-[#1a4731] text-white rounded-br-md'
                    : 'bg-white text-[#1a4731] border border-gray-200 rounded-bl-md shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-amber-700" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#1a4731] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                <Loader2 className="w-4 h-4 text-[#1a4731] animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'zh' ? '输入您的问题...' : 'Ask a question...'}
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#1a4731] focus:outline-none text-sm text-[#1a4731] placeholder-[#1a4731]/30"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 bg-[#1a4731] text-white rounded-xl hover:bg-[#1a4731]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {language === 'zh' ? 'AI回答基于游戏规则，仅供参考' : 'AI answers are based on game rules for reference only'}
          </p>
        </div>
      </div>
    </div>
  )
}
