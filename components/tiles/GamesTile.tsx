'use client'

import { useState } from 'react'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import type { Game } from '@/types'

function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return `rgba(${r},${g},${b},${a})`
}

const PLATFORM_COLORS: Record<string, { bg: string; color: string }> = {
  PC:     { bg: 'rgba(120,180,255,0.14)', color: '#7ab4ff' },
  PS5:    { bg: 'rgba(100,120,255,0.14)', color: '#8090ff' },
  PS4:    { bg: 'rgba(100,120,255,0.14)', color: '#8090ff' },
  Xbox:   { bg: 'rgba(80,200,100,0.14)',  color: '#50c864' },
  Switch: { bg: 'rgba(255,80,80,0.14)',   color: '#ff6060' },
}

export function GamesTile({ games }: { games: Game[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <TiltCard
      className="tile col-span-2 p-5 overflow-hidden"
      style={{ backgroundColor: hovered !== null ? hexToRgba(games[hovered]?.dominant_color ?? '#4a7c5f', 0.1) : 'var(--surface)', transition: 'background-color 0.3s ease' } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Icon name="gamepad" size={11} style={{ color: 'var(--text-subtle)' }} />
        <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Top games</p>
      </div>

      {/* 2 columns × 3 rows of portrait art */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        {games.slice(0, 6).map((game, i) => {
          const pc = game.platform ? (PLATFORM_COLORS[game.platform] ?? { bg: 'var(--divider)', color: 'var(--text-subtle)' }) : null
          return (
            <div
              key={game.id}
              className="flex items-center gap-2.5 cursor-default"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Portrait art (2:3 ratio) */}
              {game.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={game.image_url}
                  alt={game.name}
                  className="flex-shrink-0 object-cover"
                  style={{ width: 28, height: 42, borderRadius: 5, border: `1px solid ${hexToRgba(game.dominant_color, 0.3)}` }}
                />
              ) : (
                <div
                  className="flex-shrink-0"
                  style={{ width: 28, height: 42, borderRadius: 5, background: hexToRgba(game.dominant_color, 0.5), border: `1px solid ${hexToRgba(game.dominant_color, 0.3)}` }}
                />
              )}
              <div className="min-w-0">
                <p className="text-[12px] font-medium truncate leading-snug" style={{ color: 'var(--text)' }}>{game.name}</p>
                {game.platform && pc && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: pc.bg, color: pc.color }}>{game.platform}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </TiltCard>
  )
}
