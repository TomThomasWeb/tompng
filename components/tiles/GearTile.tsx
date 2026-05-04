'use client'

import { useState } from 'react'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import type { GearItem, VerdictBadge } from '@/types'

interface GearTileProps {
  gear: GearItem[]
}

const BADGE_STYLES: Record<VerdictBadge, { bg: string; color: string }> = {
  'daily driver': { bg: 'var(--accent-bg)', color: 'var(--accent-text)' },
  'weekend kit':  { bg: 'rgba(255,255,255,0.05)', color: 'var(--text-subtle)' },
  'new arrival':  { bg: 'rgba(180,140,60,0.12)', color: '#b08c3c' },
  'in the bag':   { bg: 'rgba(255,255,255,0.05)', color: 'var(--text-subtle)' },
}

export function GearTile({ gear }: GearTileProps) {
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <TiltCard className="tile col-span-2 p-5" id="work">
      <div className="flex items-center gap-1.5 mb-4">
        <Icon name="wrench" size={10} style={{ color: 'var(--text-subtle)' }} />
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Gear
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {gear.map((item) => {
          const badge = BADGE_STYLES[item.verdict_badge]
          return (
            <div
              key={item.id}
              className="flex items-center gap-2.5 cursor-default relative group"
              onMouseEnter={() => setTooltip(item.id)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Icon placeholder */}
              <div
                className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[9px]"
                style={{
                  background: 'var(--divider)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-subtle)',
                }}
              >
                ▣
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="text-[11px] font-medium" style={{ color: 'var(--text)' }}>
                    {item.model}
                  </p>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full"
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {item.verdict_badge}
                  </span>
                </div>
                <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>
                  {item.brand}
                </p>
              </div>

              {/* Tooltip */}
              {tooltip === item.id && (
                <div
                  className="absolute -top-9 left-0 z-10 px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap pointer-events-none"
                  style={{
                    background: 'var(--text)',
                    color: 'var(--bg)',
                  }}
                >
                  {item.tooltip}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </TiltCard>
  )
}
