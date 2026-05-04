'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard } from '../TiltCard'

interface HeroTileProps {
  bio: { one_liners: string[]; short_bio: string; profile_image?: string }
}

const PILLS = ['Photography', 'Web Design', 'Gaming', 'Music', 'Fencing']

const WAVES = [
  { x: '18%', delay: 0,    size: 22 },
  { x: '55%', delay: 0.3,  size: 18 },
  { x: '80%', delay: 0.6,  size: 20 },
  { x: '35%', delay: 0.9,  size: 16 },
]

export function HeroTile({ bio }: HeroTileProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIndex(i => (i + 1) % bio.one_liners.length); setVisible(true) }, 280)
    }, 4000)
    return () => clearInterval(interval)
  }, [bio.one_liners.length])

  return (
    <TiltCard
      className="tile col-span-2 row-span-2 p-6 flex flex-col justify-between overflow-visible"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ position: 'relative' }}
    >
      {/* Waving emoji hover effect */}
      <AnimatePresence>
        {hovering && WAVES.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: -50, rotate: [0, -20, 20, -10, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, delay: w.delay, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: w.x, bottom: '55%',
              fontSize: w.size, pointerEvents: 'none', zIndex: 10,
            }}
          >
            👋
          </motion.span>
        ))}
      </AnimatePresence>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            Congleton, Cheshire, UK
          </p>
          <h1
            className="text-[34px] font-bold leading-tight mb-3"
            style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}
          >
            Hey, I&apos;m Tom.
          </h1>
          <p className="text-[14px] leading-relaxed mb-3" style={{ color: 'var(--text-muted)', maxWidth: '280px' }}>
            {bio.short_bio}
          </p>
          <motion.p
            key={index}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.28 }}
            className="text-[13px]"
            style={{ color: 'var(--text-subtle)' }}
          >
            {bio.one_liners[index]}
          </motion.p>
        </div>

        {/* Square avatar with rounded corners */}
        {bio.profile_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bio.profile_image}
            alt="Tom Thomas"
            className="flex-shrink-0 object-cover"
            style={{ width: 96, height: 96, borderRadius: 12, border: '2px solid var(--border)', boxShadow: '0 0 0 4px var(--accent-bg)' }}
          />
        ) : (
          <div
            className="flex-shrink-0 flex items-center justify-center text-[28px] font-bold"
            style={{ width: 96, height: 96, borderRadius: 12, background: 'var(--accent-bg)', border: '2px solid var(--accent-border)', color: 'var(--accent-text)' }}
          >
            T
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] px-3 py-1 rounded-full border" style={{ color: 'var(--accent-text)', background: 'var(--accent-bg)', borderColor: 'var(--accent-border)' }}>Photography</span>
        {PILLS.slice(1).map(p => (
          <span key={p} className="text-[11px] px-3 py-1 rounded-full border" style={{ color: 'var(--text-subtle)', background: 'var(--divider)', borderColor: 'var(--border)' }}>{p}</span>
        ))}
      </div>
    </TiltCard>
  )
}
