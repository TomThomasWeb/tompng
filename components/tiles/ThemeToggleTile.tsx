'use client'
import { TiltCard } from '../TiltCard'
import { useTheme } from '../ThemeProvider'

export function ThemeToggleTile() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <TiltCard
      className="tile col-span-1 flex flex-col items-center justify-center gap-2 overflow-hidden cursor-pointer select-none"
      onClick={toggleTheme}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{isDark ? '🌙' : '☀️'}</span>
      <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
        {isDark ? 'Dark' : 'Light'}
      </p>
    </TiltCard>
  )
}
