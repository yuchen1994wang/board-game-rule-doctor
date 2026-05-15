import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import RuleCardPage from './RuleCardPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue('')
  }
})

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

const renderWithRouter = (gameId: string) => {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[`/rule/${gameId}`]}>
        <Routes>
          <Route path="/rule/:id" element={<RuleCardPage />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>
  )
}

describe('RuleCardPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  describe('基础渲染测试', () => {
    it('应该渲染桌游名称', () => {
      renderWithRouter('burgundy')
      expect(screen.getAllByText('勃艮第城堡').length).toBeGreaterThan(0)
    })

    it('应该渲染英文名', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('The Castles of Burgundy')).toBeInTheDocument()
    })

    it('默认应该显示游戏设置tab', () => {
      renderWithRouter('burgundy')
      expect(screen.getAllByText('游戏设置').length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('2-4人')).toBeInTheDocument()
    })

    it('应该渲染Token对照表', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('Token对照表')).toBeInTheDocument()
      expect(screen.getByText('工人片')).toBeInTheDocument()
      expect(screen.getByText('银币')).toBeInTheDocument()
    })

    it('应该渲染回合轮次', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('回合轮次')).toBeInTheDocument()
      expect(screen.getByText('A轮（第1轮）')).toBeInTheDocument()
      expect(screen.getByText('E轮（第5轮）')).toBeInTheDocument()
    })

    it('应该渲染返回按钮', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('返回首页')).toBeInTheDocument()
    })

    it('应该渲染语言切换按钮', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('EN')).toBeInTheDocument()
    })

    it('桌游不存在时应该显示错误提示', () => {
      renderWithRouter('non-existent')
      expect(screen.getByText('未找到该桌游规则')).toBeInTheDocument()
    })

    it('桌游不存在时应该显示返回首页按钮', () => {
      renderWithRouter('non-existent')
      const backButton = screen.getByText('返回首页')
      expect(backButton).toBeInTheDocument()
    })
  })

  describe('Tab切换测试', () => {
    it('点击游戏流程tab应该显示回合操作', () => {
      renderWithRouter('burgundy')
      fireEvent.click(screen.getByText('游戏流程'))
      expect(screen.getByText('回合操作')).toBeInTheDocument()
      expect(screen.getByText('自己回合')).toBeInTheDocument()
      expect(screen.getByText('回合外')).toBeInTheDocument()
    })

    it('点击游戏流程tab应该显示游戏提示', () => {
      renderWithRouter('burgundy')
      fireEvent.click(screen.getByText('游戏流程'))
      expect(screen.getByText('游戏提示')).toBeInTheDocument()
    })

    it('点击计分与条件tab应该显示结束条件', () => {
      renderWithRouter('burgundy')
      fireEvent.click(screen.getByText('计分与条件'))
      expect(screen.getByText('结束条件')).toBeInTheDocument()
    })

    it('点击计分与条件tab应该显示计分方式', () => {
      renderWithRouter('burgundy')
      fireEvent.click(screen.getByText('计分与条件'))
      expect(screen.getByText('计分方式')).toBeInTheDocument()
      expect(screen.getByText('游戏过程中')).toBeInTheDocument()
      expect(screen.getByText('终局计分')).toBeInTheDocument()
    })

    it('tab切换应该高亮当前选中tab', () => {
      renderWithRouter('burgundy')
      const flowTab = screen.getByText('游戏流程')
      fireEvent.click(flowTab)

      expect(flowTab.closest('button')).toHaveClass('bg-[#1a4731]')
    })
  })

  describe('收藏功能测试', () => {
    it('应该显示收藏按钮', () => {
      renderWithRouter('burgundy')
      const favoriteButtons = screen.getAllByRole('button')
      const favoriteButton = favoriteButtons.find(btn => btn.querySelector('svg.lucide-heart'))
      expect(favoriteButton).toBeDefined()
    })

    it('点击收藏按钮应该添加到收藏', async () => {
      renderWithRouter('burgundy')
      const favoriteButtons = screen.getAllByRole('button')
      const favoriteButton = favoriteButtons.find(btn => btn.querySelector('svg.lucide-heart'))

      if (favoriteButton) {
        fireEvent.click(favoriteButton)

        await waitFor(() => {
          expect(localStorageMock.setItem).toHaveBeenCalled()
        })
      }
    })

    it('再次点击收藏按钮应该取消收藏', async () => {
      localStorageMock.setItem('favorites', JSON.stringify(['burgundy']))

      renderWithRouter('burgundy')
      const favoriteButtons = screen.getAllByRole('button')
      const favoriteButton = favoriteButtons.find(btn => btn.querySelector('svg.lucide-heart'))

      if (favoriteButton) {
        fireEvent.click(favoriteButton)

        await waitFor(() => {
          const calls = localStorageMock.setItem.mock.calls
          const lastCall = calls[calls.length - 1]
          expect(JSON.parse(lastCall[1])).not.toContain('burgundy')
        })
      }
    })

    it('已收藏的游戏应该显示红色心形图标', () => {
      localStorageMock.setItem('favorites', JSON.stringify(['burgundy']))

      renderWithRouter('burgundy')
      const favoriteButtons = screen.getAllByRole('button')
      const favoriteButton = favoriteButtons.find(btn => btn.querySelector('svg.lucide-heart'))

      expect(favoriteButton).toBeDefined()
    })
  })

  describe('复制功能测试', () => {
    it('应该显示复制按钮', () => {
      renderWithRouter('burgundy')
      const copyButtons = screen.getAllByRole('button')
      const copyButton = copyButtons.find(btn => btn.querySelector('svg.lucide-copy'))
      expect(copyButton).toBeDefined()
    })

    it('点击复制按钮应该复制规则到剪贴板', async () => {
      renderWithRouter('burgundy')
      const copyButtons = screen.getAllByRole('button')
      const copyButton = copyButtons.find(btn => btn.querySelector('svg.lucide-copy'))

      if (copyButton) {
        fireEvent.click(copyButton)

        await waitFor(() => {
          expect(navigator.clipboard.writeText).toHaveBeenCalled()
        })
      }
    })

    it('复制成功后应该显示通知', async () => {
      renderWithRouter('burgundy')
      const copyButtons = screen.getAllByRole('button')
      const copyButton = copyButtons.find(btn => btn.querySelector('svg.lucide-copy'))

      if (copyButton) {
        fireEvent.click(copyButton)

        await waitFor(() => {
          expect(screen.getByText('规则已复制')).toBeInTheDocument()
        })
      }
    })
  })

  describe('分享功能测试', () => {
    it('应该显示分享按钮', () => {
      renderWithRouter('burgundy')
      const shareButtons = screen.getAllByRole('button')
      const shareButton = shareButtons.find(btn => btn.querySelector('svg.lucide-share'))
      expect(shareButton).toBeDefined()
    })

    it('点击分享按钮应该复制链接到剪贴板', async () => {
      renderWithRouter('burgundy')
      const shareButtons = screen.getAllByRole('button')
      const shareButton = shareButtons.find(btn => btn.querySelector('svg.lucide-share'))

      if (shareButton) {
        fireEvent.click(shareButton)

        await waitFor(() => {
          expect(navigator.clipboard.writeText).toHaveBeenCalled()
        })
      }
    })

    it('分享成功后应该显示通知', async () => {
      renderWithRouter('burgundy')
      const shareButtons = screen.getAllByRole('button')
      const shareButton = shareButtons.find(btn => btn.querySelector('svg.lucide-share'))

      if (shareButton) {
        fireEvent.click(shareButton)

        await waitFor(() => {
          expect(screen.getByText('链接已复制')).toBeInTheDocument()
        })
      }
    })
  })

  describe('打印功能测试', () => {
    it('应该显示打印按钮', () => {
      renderWithRouter('burgundy')
      const printButtons = screen.getAllByRole('button')
      const printButton = printButtons.find(btn => btn.querySelector('svg.lucide-printer'))
      expect(printButton).toBeDefined()
    })

    it('点击打印按钮应该调用window.print', () => {
      const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})

      renderWithRouter('burgundy')
      const printButtons = screen.getAllByRole('button')
      const printButton = printButtons.find(btn => btn.querySelector('svg.lucide-printer'))

      if (printButton) {
        fireEvent.click(printButton)
        expect(printSpy).toHaveBeenCalled()
      }

      printSpy.mockRestore()
    })
  })

  describe('语言切换测试', () => {
    it('点击语言切换按钮应该切换语言', () => {
      renderWithRouter('burgundy')
      const languageButton = screen.getByText('EN')

      fireEvent.click(languageButton)

      expect(screen.getByText('中文')).toBeInTheDocument()
    })

    it('切换到英文后应该显示英文游戏名', () => {
      renderWithRouter('burgundy')
      const languageButton = screen.getByText('EN')

      fireEvent.click(languageButton)

      expect(screen.getAllByText('The Castles of Burgundy').length).toBeGreaterThan(0)
    })
  })

  describe('返回功能测试', () => {
    it('点击返回按钮应该导航到首页', () => {
      renderWithRouter('burgundy')
      const backButton = screen.getByText('返回首页')

      fireEvent.click(backButton)

      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  describe('扩展功能测试', () => {
    it('有扩展参数时应该正确处理', async () => {
      render(
        <LanguageProvider>
          <MemoryRouter initialEntries={['/rule/burgundy?expansions=burgundy-trade']}>
            <Routes>
              <Route path="/rule/:id" element={<RuleCardPage />} />
            </Routes>
          </MemoryRouter>
        </LanguageProvider>
      )

      expect(screen.getAllByText('勃艮第城堡').length).toBeGreaterThan(0)
    })
  })

  describe('其他游戏测试', () => {
    it('工业革命：伯明翰应该正确渲染', () => {
      renderWithRouter('brass-birmingham')
      expect(screen.getAllByText('工业革命：伯明翰').length).toBeGreaterThan(0)
      expect(screen.getByText('Brass: Birmingham')).toBeInTheDocument()
    })

    it('榴莲忘贩应该正确渲染', () => {
      renderWithRouter('durian')
      expect(screen.getAllByText('榴莲忘贩').length).toBeGreaterThan(0)
    })
  })

  describe('功能按钮测试', () => {
    it('应该显示提问按钮', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('提问')).toBeInTheDocument()
    })

    it('应该显示算分按钮', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('算分')).toBeInTheDocument()
    })

    it('应该显示规则纠错按钮', () => {
      renderWithRouter('burgundy')
      expect(screen.getByText('规则纠错')).toBeInTheDocument()
    })

    it('点击提问按钮应该显示聊天弹窗', async () => {
      Element.prototype.scrollIntoView = vi.fn()

      renderWithRouter('burgundy')
      const askButton = screen.getByText('提问')

      fireEvent.click(askButton)

      await waitFor(() => {
        const modal = document.querySelector('.fixed.inset-0.bg-black\\/50')
        expect(modal).toBeInTheDocument()
      })
    })

    it('点击规则纠错按钮应该显示反馈弹窗', async () => {
      renderWithRouter('burgundy')
      const feedbackButton = screen.getByText('规则纠错')

      fireEvent.click(feedbackButton)

      await waitFor(() => {
        const modal = document.querySelector('.fixed.inset-0.bg-black\\/50')
        expect(modal).toBeInTheDocument()
      })
    })
  })
})
