'use client'
import { useState } from 'react'
import { GrowCard } from '../GrowCard'
import { Icon } from '../Icon'
import type { Game } from '@/types'

function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return `rgba(${r},${g},${b},${a})`
}

const PC: Record<string, {bg:string;color:string}> = {
  PC:     { bg:'rgba(120,180,255,0.14)', color:'#7ab4ff' },
  PS5:    { bg:'rgba(100,120,255,0.14)', color:'#8090ff' },
  PS4:    { bg:'rgba(100,120,255,0.14)', color:'#8090ff' },
  Xbox:   { bg:'rgba(80,200,100,0.14)',  color:'#50c864' },
  Switch: { bg:'rgba(255,80,80,0.14)',   color:'#ff6060' },
}

export function GamesTile({ games }: { games: Game[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <GrowCard
      className="tile flex flex-col"
      style={{ gridColumn: '6 / 9', gridRow: '1 / 3', backgroundColor: hovered !== null ? hexToRgba(games[hovered]?.dominant_color ?? '#4a7c5f', 0.1) : 'var(--surface)', transition: 'background-color 0.3s ease' } as React.CSSProperties}
    >
      <div className="flex flex-col h-full p-5">
        <div className="flex items-center gap-1.5 mb-4">
          <Icon name="gamepad" size={11} style={{ color: 'var(--text-subtle)' }} />
          <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Top games</p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-3 flex-1 content-center">
          {games.slice(0, 6).map((game, i) => {
            const pc = game.platform ? (PC[game.platform] ?? { bg:'var(--divider)', color:'var(--text-subtle)' }) : null
            return (
              <div key={game.id} className="flex items-center gap-3 cursor-default"
                   onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                {game.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={game.image_url} alt={game.name}
                    style={{ width:32, height:48, borderRadius:6, objectFit:'cover', flexShrink:0, border:`1px solid ${hexToRgba(game.dominant_color,0.3)}` }} />
                ) : (
                  <div style={{ width:32, height:48, borderRadius:6, flexShrink:0, background:hexToRgba(game.dominant_color,0.45), border:`1px solid ${hexToRgba(game.dominant_color,0.3)}` }} />
                )}
                <div className="min-w-0">
                  <p className="text-[13px] font-medium truncate leading-snug" style={{ color:'var(--text)' }}>{game.name}</p>
                  {game.platform && pc && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background:pc.bg, color:pc.color }}>{game.platform}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </GrowCard>
  )
}
