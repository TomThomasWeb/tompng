'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

function SunIcon() {
  return (
    <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M13 10A6 6 0 016 3a6.5 6.5 0 100 10 6 6 0 007-3z" />
    </svg>
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex-shrink-0"
      style={{ width: '44px', height: '24px' }}
    >
      {/* Track */}
      <div
        className="absolute inset-0 rounded-full transition-colors duration-300"
        style={{
          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
        }}
      />

      {/* Sliding thumb */}
      <motion.div
        animate={{ x: isDark ? 2 : 22 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-[2px] flex items-center justify-center rounded-full"
        style={{
          width: '18px',
          height: '18px',
          background: isDark ? '#1e2a24' : '#fff',
          border: `1px solid ${isDark ? 'var(--accent-border)' : 'rgba(0,0,0,0.1)'}`,
          color: isDark ? 'var(--accent-text)' : '#f5a623',
        }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </button>
  )
}
