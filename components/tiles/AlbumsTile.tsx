'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import type { Album } from '@/types'

interface AlbumsTileProps {
  albums: Album[]
}

// Pre-defined note positions so no Math.random() in render
const NOTES = [
  { symbol: '♪', x: '20%',  delay: 0,    duration: 1.8, size: 14 },
  { symbol: '♫', x: '65%',  delay: 0.35, duration: 2.1, size: 11 },
  { symbol: '♩', x: '40%',  delay: 0.7,  duration: 1.6, size: 12 },
  { symbol: '♬', x: '80%',  delay: 1.0,  duration: 2.3, size: 10 },
  { symbol: '♪', x: '10%',  delay: 1.4,  duration: 1.9, size: 13 },
]

export function AlbumsTile({ albums }: AlbumsTileProps) {
  const [hovering, setHovering] = useState(false)

  return (
    <TiltCard
      className="tile col-span-2 p-5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ position: 'relative', overflow: 'visible' }}
    >
      {/* Floating music notes */}
      <AnimatePresence>
        {hovering && NOTES.map((note, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.7, 0], y: -55 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: note.x,
              bottom: '60%',
              fontSize: note.size,
              color: 'var(--accent)',
              pointerEvents: 'none',
              zIndex: 10,
              userSelect: 'none',
            }}
          >
            {note.symbol}
          </motion.span>
        ))}
      </AnimatePresence>

      <div className="flex items-center gap-1.5 mb-4">
        <Icon name="vinyl" size={10} style={{ color: 'var(--text-subtle)' }} />
        <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Fav albums
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {albums.slice(0, 3).map((album) => (
          <div key={album.id} className="flex items-center gap-3">
            <div
              className="rounded-md flex-shrink-0"
              style={{
                width: '38px',
                height: '38px',
                background: album.color_swatch,
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            />
            <div className="min-w-0">
              <p className="text-[14px] font-medium truncate" style={{ color: 'var(--text)' }}>{album.title}</p>
              <p className="text-[12px]" style={{ color: 'var(--text-subtle)' }}>{album.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </TiltCard>
  )
}
