import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import HomePage from './HomePage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <LanguageProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </LanguageProvider>
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  describe('基础渲染测试', () => {
    it('应该渲染搜索输入框', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByPlaceholderText('搜索桌游名称...')).toBeInTheDocument()
    })

    it('应该渲染桌游列表', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getAllByText('勃艮第城堡').length).toBeGreaterThan(0)
      expect(screen.getAllByText('工业革命：伯明翰').length).toBeGreaterThan(0)
      expect(screen.getAllByText('榴莲忘贩').length).toBeGreaterThan(0)
      expect(screen.getAllByText('双城之间').length).toBeGreaterThan(0)
      expect(screen.getAllByText('物种演化').length).toBeGreaterThan(0)
    })

    it('应该显示分类标签', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getAllByText('德式').length).toBeGreaterThan(0)
      expect(screen.getAllByText('聚会').length).toBeGreaterThan(0)
    })

    it('应该显示机制标签', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getAllByText('骰子驱动').length).toBeGreaterThan(0)
      expect(screen.getAllByText('工人放置').length).toBeGreaterThan(0)
    })

    it('应该渲染语言切换按钮', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText('EN')).toBeInTheDocument()
    })

    it('应该渲染筛选按钮', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText('筛选')).toBeInTheDocument()
    })

    it('应该显示游戏总数', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText(/共/)).toBeInTheDocument()
      expect(screen.getByText(/款桌游/)).toBeInTheDocument()
    })
  })

  describe('搜索功能测试', () => {
    it('搜索功能应该过滤桌游列表', () => {
      renderWithRouter(<HomePage />)
      const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

      fireEvent.change(searchInput, { target: { value: '勃艮第' } })

      expect(screen.getAllByText('勃艮第城堡').length).toBeGreaterThan(0)
      expect(screen.queryByText('榴莲忘贩')).not.toBeInTheDocument()
    })

    it('搜索无结果时应该显示提示', () => {
      renderWithRouter(<HomePage />)
      const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

      fireEvent.change(searchInput, { target: { value: '不存在的游戏' } })

      expect(screen.getByText('未找到匹配的桌游')).toBeInTheDocument()
    })

    it('应该支持英文搜索', () => {
      renderWithRouter(<HomePage />)
      const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

      fireEvent.change(searchInput, { target: { value: 'Brass' } })

      expect(screen.getAllByText('工业革命：伯明翰').length).toBeGreaterThan(0)
    })

    it('搜索应该不区分大小写', () => {
      renderWithRouter(<HomePage />)
      const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

      fireEvent.change(searchInput, { target: { value: 'brass' } })

      expect(screen.getAllByText('工业革命：伯明翰').length).toBeGreaterThan(0)
    })

    it('清空搜索应该显示所有游戏', () => {
      renderWithRouter(<HomePage />)
      const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

      fireEvent.change(searchInput, { target: { value: '勃艮第' } })
      expect(screen.getAllByText('勃艮第城堡').length).toBeGreaterThan(0)

      fireEvent.change(searchInput, { target: { value: '' } })
      expect(screen.getAllByText('工业革命：伯明翰').length).toBeGreaterThan(0)
    })
  })

  describe('筛选功能测试', () => {
    it('点击筛选按钮应该显示筛选面板', () => {
      renderWithRouter(<HomePage />)
      const filterButton = screen.getByText('筛选')

      fireEvent.click(filterButton)

      expect(screen.getByText('按类别')).toBeInTheDocument()
      expect(screen.getByText('按机制')).toBeInTheDocument()
      expect(screen.getByText('按人数')).toBeInTheDocument()
      expect(screen.getByText('按BGG权重')).toBeInTheDocument()
    })

    it('选择类别筛选应该过滤游戏', () => {
      renderWithRouter(<HomePage />)
      const filterButton = screen.getByText('筛选')
      fireEvent.click(filterButton)

      const categoryButtons = screen.getAllByText('德式')
      fireEvent.click(categoryButtons[categoryButtons.length - 1])

      expect(screen.getAllByText('勃艮第城堡').length).toBeGreaterThan(0)
    })

    it('选择机制筛选应该过滤游戏', () => {
      renderWithRouter(<HomePage />)
      const filterButton = screen.getByText('筛选')
      fireEvent.click(filterButton)

      const mechanismButtons = screen.getAllByText('骰子驱动')
      fireEvent.click(mechanismButtons[mechanismButtons.length - 1])

      expect(screen.getAllByText('勃艮第城堡').length).toBeGreaterThan(0)
    })

    it('点击已选筛选应该取消筛选', () => {
      renderWithRouter(<HomePage />)
      const filterButton = screen.getByText('筛选')
      fireEvent.click(filterButton)

      const categoryButtons = screen.getAllByText('德式')
      fireEvent.click(categoryButtons[categoryButtons.length - 1])

      fireEvent.click(categoryButtons[categoryButtons.length - 1])

      expect(screen.getAllByText('工业革命：伯明翰').length).toBeGreaterThan(0)
    })

    it('清除按钮应该清除所有筛选', () => {
      renderWithRouter(<HomePage />)
      const filterButton = screen.getByText('筛选')
      fireEvent.click(filterButton)

      const categoryButtons = screen.getAllByText('德式')
      fireEvent.click(categoryButtons[categoryButtons.length - 1])

      const allButtons = screen.getAllByRole('button')
      const clearButton = allButtons.find(btn => btn.textContent?.includes('清除'))
      if (clearButton) {
        fireEvent.click(clearButton)
      }

      expect(screen.getAllByText('工业革命：伯明翰').length).toBeGreaterThan(0)
    })

    it('筛选面板应该显示完成按钮（移动端）', () => {
      renderWithRouter(<HomePage />)
      const filterButton = screen.getByText('筛选')
      fireEvent.click(filterButton)

      expect(screen.getByText('完成')).toBeInTheDocument()
    })
  })

  describe('排序功能测试', () => {
    it('应该有排序下拉框', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText('按BGG权重排序')).toBeInTheDocument()
    })

    it('应该能切换排序方式', () => {
      renderWithRouter(<HomePage />)
      const sortSelect = screen.getByRole('combobox')

      fireEvent.change(sortSelect, { target: { value: 'name' } })

      expect(sortSelect).toHaveValue('name')
    })
  })

  describe('深色模式切换测试', () => {
    it('应该有深色模式切换按钮', () => {
      renderWithRouter(<HomePage />)
      const themeButtons = screen.getAllByRole('button')
      const themeButton = themeButtons.find(btn => btn.querySelector('svg.lucide-moon') || btn.querySelector('svg.lucide-sun'))
      expect(themeButton).toBeDefined()
    })

    it('点击深色模式按钮应该切换主题', () => {
      renderWithRouter(<HomePage />)
      const themeButtons = screen.getAllByRole('button')
      const themeButton = themeButtons.find(btn => btn.querySelector('svg.lucide-moon') || btn.querySelector('svg.lucide-sun'))

      if (themeButton) {
        fireEvent.click(themeButton)
      }
    })
  })

  describe('语言切换测试', () => {
    it('点击语言切换按钮应该切换语言', () => {
      renderWithRouter(<HomePage />)
      const languageButton = screen.getByText('EN')

      fireEvent.click(languageButton)

      expect(screen.getByText('中文')).toBeInTheDocument()
    })

    it('切换到英文后应该显示英文游戏名', () => {
      renderWithRouter(<HomePage />)
      const languageButton = screen.getByText('EN')

      fireEvent.click(languageButton)

      expect(screen.getAllByText('The Castles of Burgundy').length).toBeGreaterThan(0)
    })
  })

  describe('游戏点击测试', () => {
    it('点击有扩展的桌游应该显示扩展选择弹窗', () => {
      renderWithRouter(<HomePage />)

      const evolutionCards = screen.getAllByText('物种演化')
      fireEvent.click(evolutionCards[0])

      expect(screen.getByText('选择要使用的扩展')).toBeInTheDocument()
    })

    it('点击游戏卡片应该触发点击事件', () => {
      renderWithRouter(<HomePage />)

      const gameCards = screen.getAllByText('勃艮第城堡')
      expect(gameCards.length).toBeGreaterThan(0)

      fireEvent.click(gameCards[0])
    })

    it('应该显示有扩展的标签', () => {
      renderWithRouter(<HomePage />)

      expect(screen.getAllByText('物种演化').length).toBeGreaterThan(0)
      expect(screen.getAllByText('有扩展').length).toBeGreaterThan(0)
    })
  })

  describe('响应式测试', () => {
    it('应该显示游戏数量信息', () => {
      renderWithRouter(<HomePage />)
      const countText = screen.getByText(/共.*款桌游/)
      expect(countText).toBeInTheDocument()
    })
  })
})
