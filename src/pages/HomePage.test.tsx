import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import HomePage from './HomePage'

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <LanguageProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </LanguageProvider>
  )
}

describe('HomePage', () => {
  it('应该渲染搜索输入框', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByPlaceholderText('搜索桌游名称...')).toBeInTheDocument()
  })

  it('应该渲染桌游列表', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText('勃艮第城堡')).toBeInTheDocument()
    expect(screen.getByText('工业革命：伯明翰')).toBeInTheDocument()
    expect(screen.getByText('榴莲忘贩')).toBeInTheDocument()
    expect(screen.getByText('双城之间')).toBeInTheDocument()
    expect(screen.getByText('物种演化')).toBeInTheDocument()
  })

  it('搜索功能应该过滤桌游列表', () => {
    renderWithRouter(<HomePage />)
    const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

    fireEvent.change(searchInput, { target: { value: '勃艮第' } })

    expect(screen.getByText('勃艮第城堡')).toBeInTheDocument()
    expect(screen.queryByText('工业革命：伯明翰')).not.toBeInTheDocument()
    expect(screen.queryByText('榴莲忘贩')).not.toBeInTheDocument()
  })

  it('搜索无结果时应该显示提示', () => {
    renderWithRouter(<HomePage />)
    const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

    fireEvent.change(searchInput, { target: { value: '不存在的游戏' } })

    expect(screen.getByText('未找到匹配的桌游')).toBeInTheDocument()
  })

  it('点击有扩展的桌游应该显示扩展选择弹窗', () => {
    renderWithRouter(<HomePage />)

    const evolutionCard = screen.getByText('物种演化')
    fireEvent.click(evolutionCard)

    expect(screen.getByText('选择要使用的扩展')).toBeInTheDocument()
  })

  it('应该显示有扩展的标签', () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByText('物种演化')).toBeInTheDocument()
    expect(screen.getAllByText('有扩展').length).toBeGreaterThan(0)
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

  it('应该支持英文搜索', () => {
    renderWithRouter(<HomePage />)
    const searchInput = screen.getByPlaceholderText('搜索桌游名称...')

    fireEvent.change(searchInput, { target: { value: 'Brass' } })

    expect(screen.getByText('工业革命：伯明翰')).toBeInTheDocument()
  })

  it('应该渲染语言切换按钮', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText('EN')).toBeInTheDocument()
  })
})
