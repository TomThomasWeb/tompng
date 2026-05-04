'use client'

import { useState } from 'react'
import { TiltCard } from '../TiltCard'
import type { Album } from '@/types'

interface AlbumsTileProps {
  albums: Album[]
}

function VinylDisc({ color }: { color: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="vinyl-spinning">
      <circle cx="26" cy="26" r="25" fill="#111" stroke="#222" strokeWidth="1" />
      <circle cx="26" cy="26" r="20" fill="none" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="26" cy="26" r="15" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="26" cy="26" r="10" fill="none" stroke="#1a1a1a" strokeWidth="1" />
      <circle cx="26" cy="26" r="5" fill={color} opacity="0.8" />
      <circle cx="26" cy="26" r="2" fill="#111" />
    </svg>
  )
}

function EQBars({ color }: { color: string }) {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`w-[3px] rounded-sm eq-bar-${n}`}
          style={{ background: color, height: '8px' }}
        />
      ))}
    </div>
  )
}

export function AlbumsTile({ albums }: AlbumsTileProps) {
  const [hovering, setHovering] = useState(false)
  const activeAlbum = albums[0]

  return (
    <TiltCard
      className="tile col-span-1 p-4"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Fav albums
        </p>
        {hovering && (
          <div className="flex items-center gap-2">
            <VinylDisc color={activeAlbum?.color_swatch ?? '#4a7c5f'} />
            <EQBars color="var(--accent)" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {albums.slice(0, 3).map((album) => (
          <div key={album.id} className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded flex-shrink-0"
              style={{ background: album.color_swatch, border: '1px solid rgba(255,255,255,0.06)' }}
            />
            <div className="min-w-0">
              <p className="text-[11px] truncate" style={{ color: 'var(--text)' }}>
                {album.title}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>
                {album.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TiltCard>
  )
}
