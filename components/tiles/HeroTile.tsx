'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TiltCard } from '../TiltCard'

interface HeroTileProps {
  bio: {
    one_liners: string[]
    short_bio: string
  }
}

const PILLS = ['Photography', 'Web Design', 'Gaming', 'Music', 'Fencing']

export function HeroTile({ bio }: HeroTileProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % bio.one_liners.length)
        setVisible(true)
      }, 280)
    }, 4000)
    return () => clearInterval(interval)
  }, [bio.one_liners.length])

  return (
    <TiltCard className="tile col-span-2 row-span-2 p-6 flex flex-col justify-between min-h-[310px]">
      <div>
        <p
          className="text-[10px] uppercase tracking-widest mb-3"
          style={{ color: 'var(--accent)' }}
        >
          Congleton, Cheshire, UK
        </p>

        <h1
          className="text-[30px] font-bold leading-tight mb-3"
          style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}
        >
          Hey, I&apos;m Tom.
        </h1>

        <p
          className="text-[12px] leading-relaxed max-w-[280px] mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          {bio.short_bio}
        </p>

        <motion.p
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          className="text-[11px]"
          style={{ color: 'var(--text-subtle)' }}
        >
          {bio.one_liners[index]}
        </motion.p>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <span
          className="text-[10px] px-3 py-1 rounded-full border"
          style={{
            color: 'var(--accent-text)',
            background: 'var(--accent-bg)',
            borderColor: 'var(--accent-border)',
          }}
        >
          Photography
        </span>
        {PILLS.slice(1).map((pill) => (
          <span
            key={pill}
            className="text-[10px] px-3 py-1 rounded-full border"
            style={{
              color: 'var(--text-subtle)',
              background: 'var(--divider)',
              borderColor: 'var(--border)',
            }}
          >
            {pill}
          </span>
        ))}
      </div>
    </TiltCard>
  )
}
