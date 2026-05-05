'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaticCard } from '../StaticCard'
import { Icon } from '../Icon'
import type { Album } from '@/types'

const NOTES = [
  { symbol:'♪', x:'18%', delay:0,   duration:1.8, size:16 },
  { symbol:'♫', x:'62%', delay:0.4, duration:2.1, size:13 },
  { symbol:'♩', x:'40%', delay:0.8, duration:1.6, size:14 },
  { symbol:'♬', x:'78%', delay:1.1, duration:2.0, size:12 },
  { symbol:'♪', x:'8%',  delay:1.5, duration:1.9, size:15 },
]

export function AlbumsTile({ albums }: { albums: Album[] }) {
  const [hovering, setHovering] = useState(false)

  return (
    <StaticCard
      className="tile flex flex-col"
      style={{ gridColumn:'6 / 9', gridRow:'3 / 5', position:'relative', overflow:'visible' } as React.CSSProperties}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence>
        {hovering && NOTES.map((n, i) => (
          <motion.span key={i}
            initial={{ opacity:0, y:0 }}
            animate={{ opacity:[0, 0.7, 0], y:-60 }}
            exit={{ opacity:0 }}
            transition={{ duration:n.duration, delay:n.delay, repeat:Infinity, ease:'easeOut' }}
            style={{ position:'absolute', left:n.x, bottom:'65%', fontSize:n.size, color:'var(--accent)', pointerEvents:'none', zIndex:10, userSelect:'none' }}
          >{n.symbol}</motion.span>
        ))}
      </AnimatePresence>

      <div className="flex flex-col h-full p-5">
        <div className="flex items-center gap-1.5 mb-5">
          <Icon name="vinyl" size={11} style={{ color:'var(--text-subtle)' }} />
          <p className="text-[11px] uppercase tracking-widest" style={{ color:'var(--text-subtle)' }}>Favourite albums</p>
        </div>

        <div className="flex flex-col gap-4 flex-1 justify-center">
          {albums.slice(0,3).map(album => (
            <div key={album.id} className="flex items-center gap-4">
              <div style={{ width:56, height:56, borderRadius:8, background:album.color_swatch, border:'1px solid rgba(255,255,255,0.07)', flexShrink:0 }} />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold truncate" style={{ color:'var(--text)' }}>{album.title}</p>
                <p className="text-[12px]" style={{ color:'var(--text-subtle)' }}>{album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  )
}
