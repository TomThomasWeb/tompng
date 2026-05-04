'use client'
import { SmallTile } from '../SmallTile'
import { useTheme } from '../ThemeProvider'

export function ThemeToggleTile() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <SmallTile onClick={toggleTheme}>
      <div className="flex flex-col items-center justify-center h-full gap-1.5">
        <span style={{ fontSize: 32, lineHeight: 1 }}>{isDark ? '🌙' : '☀️'}</span>
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          {isDark ? 'Dark' : 'Light'}
        </p>
      </div>
    </SmallTile>
  )
}
