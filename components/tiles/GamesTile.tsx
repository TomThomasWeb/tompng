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

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  'PC':     { bg: 'rgba(120,180,255,0.12)', text: '#7ab4ff' },
  'PS5':    { bg: 'rgba(100,120,255,0.12)', text: '#6478ff' },
  'PS4':    { bg: 'rgba(100,120,255,0.12)', text: '#6478ff' },
  'Xbox':   { bg: 'rgba(80,200,120,0.12)',  text: '#50c878' },
  'Switch': { bg: 'rgba(255,80,80,0.12)',   text: '#ff5050' },
}

function PlatformTag({ platform }: { platform: string }) {
  const colors = PLATFORM_COLORS[platform] ?? { bg: 'var(--divider)', text: 'var(--text-subtle)' }
  return (
    <span
      className="text-[8px] px-1.5 py-0.5 rounded font-medium flex-shrink-0"
      style={{ background: colors.bg, color: colors.text }}
    >
      {platform}
    </span>
  )
}

export function GamesTile({ games }: GamesTileProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const bgColor =
    hovered !== null
      ? hexToRgba(games[hovered]?.dominant_color ?? '#4a7c5f', 0.12)
      : 'var(--surface)'

  return (
    <TiltCard
      className="tile col-span-2 md:col-span-1 p-5 md:p-6"
      style={{ backgroundColor: bgColor, transition: 'background-color 0.3s ease' } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5 mb-4">
        <Icon name="gamepad" size={10} style={{ color: 'var(--text-subtle)' }} />
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Top games
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {games.slice(0, 5).map((game, i) => (
          <div
            key={game.id}
            className="flex items-center gap-3 cursor-default"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Art or colour swatch — larger now */}
            {game.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={game.image_url}
                alt={game.name}
                className="rounded-lg flex-shrink-0 object-cover"
                style={{
                  width: '38px',
                  height: '38px',
                  border: `1px solid ${hexToRgba(game.dominant_color, 0.35)}`,
                }}
              />
            ) : (
              <div
                className="rounded-lg flex-shrink-0"
                style={{
                  width: '38px',
                  height: '38px',
                  background: hexToRgba(game.dominant_color, 0.45),
                  border: `1px solid ${hexToRgba(game.dominant_color, 0.3)}`,
                }}
              />
            )}

            {/* Name + platform */}
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium truncate leading-tight" style={{ color: 'var(--text)' }}>
                {game.name}
              </p>
              {game.platform && (
                <div className="mt-1">
                  <PlatformTag platform={game.platform} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </TiltCard>
  )
}
