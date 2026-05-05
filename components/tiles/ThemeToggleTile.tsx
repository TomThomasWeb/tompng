'use client'
import { SmallTile } from '../SmallTile'
import { useTheme } from '../ThemeProvider'

export function ThemeToggleTile() {
  const { theme, toggleTheme } = useTheme()
  return (
    <SmallTile onClick={toggleTheme} gridColumn="3 / 4" gridRow="4 / 5">
      <div className="flex flex-col items-center justify-center h-full gap-1.5">
        <span style={{ fontSize:30, lineHeight:1 }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
        <p className="text-[10px] uppercase tracking-widest" style={{ color:'var(--text-subtle)' }}>
          {theme === 'dark' ? 'Dark' : 'Light'}
        </p>
      </div>
    </SmallTile>
  )
}
