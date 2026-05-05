'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard } from '../TiltCard'

interface HeroTileProps {
  bio: { one_liners: string[]; short_bio: string; profile_image?: string }
}

const PILLS = ['Photography', 'Web Design', 'Gaming', 'Music', 'Fencing']

const WAVES = [
  { x: '15%', delay: 0,   size: 20 },
  { x: '60%', delay: 0.4, size: 16 },
  { x: '35%', delay: 0.8, size: 18 },
]

export function HeroTile({ bio }: HeroTileProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIndex(i => (i + 1) % bio.one_liners.length); setVisible(true) }, 280)
    }, 4000)
    return () => clearInterval(t)
  }, [bio.one_liners.length])

  return (
    <TiltCard
      className="tile flex flex-col overflow-visible"
      style={{ gridColumn: '1 / 3', gridRow: '1 / 6', position: 'relative' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence>
        {hovering && WAVES.map((w, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.9, 0], y: -45, rotate: [0, -20, 20, -10, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, delay: w.delay, repeat: Infinity }}
            style={{ position: 'absolute', left: w.x, bottom: '40%', fontSize: w.size, pointerEvents: 'none', zIndex: 10 }}
          >👋</motion.span>
        ))}
      </AnimatePresence>

      <div className="flex flex-col h-full p-6 gap-4">
        {/* Avatar — centred, prominent */}
        <div className="flex justify-center pt-2">
          {bio.profile_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bio.profile_image} alt="Tom Thomas"
              style={{ width: 110, height: 110, borderRadius: 16, objectFit: 'cover', border: '2px solid var(--border)', boxShadow: '0 0 0 5px var(--accent-bg)' }} />
          ) : (
            <div style={{ width: 110, height: 110, borderRadius: 16, background: 'var(--accent-bg)', border: '2px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: 'var(--accent-text)' }}>T</div>
          )}
        </div>

        {/* Name */}
        <div>
          <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Congleton, Cheshire, UK
          </p>
          <h1 className="text-[30px] font-bold leading-tight mb-3" style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
            Hey, I&apos;m Tom.
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {bio.short_bio}
          </p>
        </div>

        {/* Rotating one-liner */}
        <motion.p key={index} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.28 }}
          className="text-[12px]" style={{ color: 'var(--text-subtle)', minHeight: '18px' }}>
          {bio.one_liners[index]}
        </motion.p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] px-3 py-1 rounded-full border" style={{ color: 'var(--accent-text)', background: 'var(--accent-bg)', borderColor: 'var(--accent-border)' }}>
            Photography
          </span>
          {PILLS.slice(1).map(p => (
            <span key={p} className="text-[11px] px-3 py-1 rounded-full border" style={{ color: 'var(--text-subtle)', background: 'var(--divider)', borderColor: 'var(--border)' }}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  )
}
