'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const navLinks = ['photos', 'work', 'writing', 'now']

export function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-center justify-between mb-5 px-1"
    >
      <div className="text-[13px] font-semibold tracking-wide select-none">
        <span style={{ color: 'var(--text)' }}>Tom</span>
        <span style={{ color: 'var(--accent)' }}>.PNG</span>
      </div>

      <div className="flex items-center gap-4">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="text-[12px] transition-colors duration-150 hover:opacity-80"
            style={{ color: 'var(--text-subtle)' }}
          >
            {link}
          </a>
        ))}

        <button
          onClick={toggleTheme}
          className="text-[11px] px-3 py-1 rounded-full border transition-all duration-150 hover:opacity-80"
          style={{
            color: 'var(--accent-text)',
            background: 'var(--accent-bg)',
            borderColor: 'var(--accent-border)',
          }}
        >
          {theme === 'dark' ? '◑ light' : '◑ dark'}
        </button>
      </div>
    </motion.nav>
  )
}
