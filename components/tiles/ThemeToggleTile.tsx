'use client'

import { TiltCard } from '../TiltCard'
import { ThemeToggle } from '../ThemeToggle'
import { useTheme } from '../ThemeProvider'

export function ThemeToggleTile() {
  const { theme } = useTheme()
  return (
    <TiltCard className="tile col-span-1 p-5 flex flex-col items-center justify-center gap-3 overflow-hidden">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
        style={{ background: 'var(--accent-bg)' }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
      <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
        {theme === 'dark' ? 'Dark' : 'Light'}
      </p>
      <ThemeToggle />
    </TiltCard>
  )
}
