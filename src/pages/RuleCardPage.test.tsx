import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import RuleCardPage from './RuleCardPage'

const renderWithRouter = (gameId: string) => {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[`/game/${gameId}`]}>
        <Routes>
          <Route path="/game/:id" element={<RuleCardPage />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>
  )
}

describe('RuleCardPage', () => {
  it('应该渲染桌游名称', () => {
    renderWithRouter('burgundy')
    expect(screen.getByText('勃艮第城堡')).toBeInTheDocument()
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
})
