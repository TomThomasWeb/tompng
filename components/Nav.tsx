'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { label: 'photos',  href: '#photos'   },
  { label: 'work',    href: '#work'     },
  { label: 'writing', href: '/writing'  },
  { label: 'now',     href: '/now'      },
]

function FireNationOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
      style={{ background: 'rgba(12, 3, 3, 0.97)', cursor: 'pointer' }}
      onClick={onDone}
    >
      {/* Fire Nation emblem — simple SVG flame */}
      <motion.svg
        viewBox="0 0 80 100"
        width="80"
        height="100"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ marginBottom: '24px' }}
      >
        <path
          d="M40 5 C40 5 60 25 58 45 C56 60 65 65 65 65 C65 65 55 55 45 65 C42 68 40 75 40 80
             C40 80 38 68 35 65 C25 55 15 65 15 65 C15 65 24 60 22 45 C20 25 40 5 40 5 Z"
          fill="#C0392B"
          stroke="#E74C3C"
          strokeWidth="1"
        />
        <path
          d="M40 30 C40 30 50 42 49 52 C48 59 52 63 52 63 C52 63 46 57 42 63
             C41 65 40 68 40 72 C40 72 39 65 38 63 C34 57 28 63 28 63
             C28 63 32 59 31 52 C30 42 40 30 40 30 Z"
          fill="#E67E22"
          opacity="0.8"
        />
        <circle cx="40" cy="52" r="5" fill="#F39C12" opacity="0.9" />
      </motion.svg>

      <motion.p
        className="text-[11px] uppercase tracking-[0.35em] mb-2"
        style={{ color: '#8B1A1A' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        The Fire Nation
      </motion.p>

      <motion.p
        className="text-[28px] font-bold"
        style={{ color: '#C0392B', fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        Zuko &amp; Azula
      </motion.p>

      <motion.p
        className="text-[13px] mt-3 text-center max-w-xs"
        style={{ color: '#7a3a2a' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        &ldquo;I don&rsquo;t need luck, I don&rsquo;t want it.
        I&rsquo;ve always had to struggle and fight and that&rsquo;s made me strong.&rdquo;
      </motion.p>

      <motion.p
        className="text-[10px] mt-6 uppercase tracking-widest"
        style={{ color: '#3a1a1a' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        — Zuko
      </motion.p>

      <motion.p
        className="absolute bottom-8 text-[10px] uppercase tracking-widest"
        style={{ color: '#3a1a1a' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        click anywhere to restore honour
      </motion.p>
    </motion.div>
  )
}

export function Nav() {
  const [fireNation, setFireNation] = useState(false)
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleLogoClick = () => {
    clickCount.current += 1

    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 700)

    if (clickCount.current >= 3) {
      clickCount.current = 0
      if (clickTimer.current) clearTimeout(clickTimer.current)
      setFireNation(true)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex items-center justify-between mb-5 px-1"
      >
        <button
          onClick={handleLogoClick}
          className="text-[13px] font-semibold tracking-wide select-none bg-transparent border-0 p-0 cursor-pointer"
          aria-label="Tom.PNG home"
        >
          <span style={{ color: 'var(--text)' }}>Tom</span>
          <span style={{ color: 'var(--accent)' }}>.PNG</span>
        </button>

        <div className="flex items-center gap-4">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[12px] transition-colors duration-150 hover:opacity-80"
              style={{ color: 'var(--text-subtle)' }}
            >
              {label}
            </a>
          ))}

          <ThemeToggle />
        </div>
      </motion.nav>

      <AnimatePresence>
        {fireNation && (
          <FireNationOverlay onDone={() => setFireNation(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
