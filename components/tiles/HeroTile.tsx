'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaticCard } from '../StaticCard'

interface HeroTileProps {
  bio: { one_liners: string[]; short_bio: string; profile_image?: string; fun_facts?: string[] }
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
    <StaticCard
      className="tile flex flex-col overflow-visible"
      style={{ gridColumn: '1 / 3', gridRow: '1 / 6', position: 'relative' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Waving emojis — hover only */}
      <AnimatePresence>
        {hovering && WAVES.map((w, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.9, 0], y: -45, rotate: [0, -20, 20, -10, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, delay: w.delay, repeat: Infinity }}
            style={{ position: 'absolute', left: w.x, bottom: '38%', fontSize: w.size, pointerEvents: 'none', zIndex: 10 }}
          >👋</motion.span>
        ))}
      </AnimatePresence>

      <div className="flex flex-col h-full p-6 gap-4">

        {/* Top: avatar left, name/location right */}
        <div className="flex items-start gap-4">
          {bio.profile_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bio.profile_image} alt="Tom Thomas"
              style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', flexShrink: 0, border: '2px solid var(--border)', boxShadow: '0 0 0 4px var(--accent-bg)' }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: 12, flexShrink: 0, background: 'var(--accent-bg)', border: '2px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: 'var(--accent-text)' }}>T</div>
          )}
          <div className="min-w-0 pt-1">
            <h1 className="text-[28px] font-bold leading-tight" style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
              Hey, I&apos;m Tom.
            </h1>
            <p className="text-[11px] uppercase tracking-widest mt-1" style={{ color: 'var(--accent)' }}>
              Congleton, Cheshire, UK
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {bio.short_bio}
        </p>

        {/* Rotating one-liner */}
        <motion.p key={index} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.28 }}
          className="text-[13px]" style={{ color: 'var(--text-subtle)', minHeight: '20px' }}>
          {bio.one_liners[index]}
        </motion.p>

        {/* Fun facts */}
        {bio.fun_facts && bio.fun_facts.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-subtle)' }}>
              Fun facts
            </p>
            <div className="flex flex-col gap-1.5">
              {bio.fun_facts.slice(0, 4).map((fact, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: 'var(--accent)', fontSize: 10, marginTop: 3 }}>▸</span>
                  <p className="text-[12px] leading-snug" style={{ color: 'var(--text-muted)' }}>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] px-3 py-1 rounded-full border" style={{ color: 'var(--accent-text)', background: 'var(--accent-bg)', borderColor: 'var(--accent-border)' }}>Photography</span>
          {PILLS.slice(1).map(p => (
            <span key={p} className="text-[11px] px-3 py-1 rounded-full border" style={{ color: 'var(--text-subtle)', background: 'var(--divider)', borderColor: 'var(--border)' }}>{p}</span>
          ))}
        </div>
      </div>
    </StaticCard>
  )
}
