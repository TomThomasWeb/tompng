'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TiltCard } from '../TiltCard'

interface HeroTileProps {
  bio: {
    one_liners: string[]
    short_bio: string
    profile_image?: string
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
    <TiltCard className="tile col-span-2 row-span-2 p-7 flex flex-col justify-between">
      <div className="flex-1 flex flex-col">

        {/* Top row: location + avatar */}
        <div className="flex items-start justify-between mb-6">
          <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: 'var(--accent)' }}>
            Congleton, Cheshire, UK
          </p>

          {/* Avatar */}
          {bio.profile_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bio.profile_image}
              alt="Tom Thomas"
              className="w-[72px] h-[72px] rounded-full object-cover flex-shrink-0"
              style={{
                border: '2px solid var(--border)',
                boxShadow: '0 0 0 4px var(--accent-bg)',
              }}
            />
          ) : (
            <div
              className="w-[72px] h-[72px] rounded-full flex-shrink-0 flex items-center justify-center text-[22px] font-semibold"
              style={{
                background: 'var(--accent-bg)',
                border: '2px solid var(--accent-border)',
                color: 'var(--accent-text)',
              }}
            >
              T
            </div>
          )}
        </div>

        {/* Name + bio */}
        <h1
          className="text-[32px] font-bold leading-tight mb-4"
          style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}
        >
          Hey, I&apos;m Tom.
        </h1>

        <p
          className="text-[13px] leading-relaxed mb-4"
          style={{ color: 'var(--text-muted)', maxWidth: '300px' }}
        >
          {bio.short_bio}
        </p>

        <motion.p
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          className="text-[12px]"
          style={{ color: 'var(--text-subtle)' }}
        >
          {bio.one_liners[index]}
        </motion.p>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 pt-5">
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
