'use client'
import { useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { SmallTile } from '../SmallTile'
import { useTheme } from '../ThemeProvider'

export function ThemeToggleTile() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const controls = useAnimationControls()

  const handleClick = async () => {
    // Quick bounce sequence on click
    await controls.start({
      scale: [1, 0.82, 1.18, 0.95, 1],
      rotate: [0, -8, 8, -3, 0],
      transition: { duration: 0.45, ease: 'easeInOut' }
    })
    toggleTheme()
  }

  return (
    <SmallTile gridColumn="3 / 4" gridRow="4 / 5" cardType="grow" onClick={handleClick}>
      <div className="flex flex-col items-center justify-center h-full gap-1.5">
        <motion.span animate={controls} style={{ fontSize: 30, lineHeight: 1, display: 'block' }}>
          {isDark ? '🌙' : '☀️'}
        </motion.span>
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          {isDark ? 'Dark' : 'Light'}
        </p>
      </div>
    </SmallTile>
  )
}
