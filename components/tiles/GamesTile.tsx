'use client'

import { useState } from 'react'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import type { Game } from '@/types'

interface GamesTileProps {
  games: Game[]
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function GamesTile({ games }: GamesTileProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const bgColor =
    hovered !== null
      ? hexToRgba(games[hovered]?.dominant_color ?? '#4a7c5f', 0.12)
      : 'var(--surface)'

  return (
    <TiltCard
      className="tile col-span-2 md:col-span-1 p-4 md:p-[18px]"
      style={{ backgroundColor: bgColor, transition: 'background-color 0.3s ease' } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Icon name="gamepad" size={10} style={{ color: 'var(--text-subtle)' }} />
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Top games
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        {games.slice(0, 5).map((game, i) => (
          <div
            key={game.id}
            className="flex items-center gap-2 cursor-default"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Game art or colour swatch */}
            {game.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={game.image_url}
                alt={game.name}
                className="w-6 h-6 rounded-md flex-shrink-0 object-cover"
                style={{ border: `1px solid ${hexToRgba(game.dominant_color, 0.3)}` }}
              />
            ) : (
              <div
                className="w-6 h-6 rounded-md flex-shrink-0"
                style={{
                  background: hexToRgba(game.dominant_color, 0.5),
                  border: `1px solid ${hexToRgba(game.dominant_color, 0.3)}`,
                }}
              />
            )}
            <span className="text-[11px] truncate" style={{ color: 'var(--text)' }}>
              {game.name}
            </span>
          </div>
        ))}
      </div>
    </TiltCard>
  )
}
