'use client'
import { useState, useEffect } from 'react'
import { TiltCard } from '../TiltCard'
import { Icon, type IconName } from '../Icon'
import type { NowContent } from '@/types'

function useCongleton() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const up = () => setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    up(); const t = setInterval(up, 1000); return () => clearInterval(t)
  }, [])
  return time
}

const FIELDS: { key: keyof NowContent; label: string; icon: IconName }[] = [
  { key: 'working_on',    label: 'Working on',   icon: 'code'   },
  { key: 'reading',       label: 'Reading',       icon: 'book'   },
  { key: 'learning',      label: 'Learning',      icon: 'music'  },
  { key: 'shooting_with', label: 'Shooting with', icon: 'camera' },
]

export function NowTile({ now }: { now: NowContent }) {
  const time = useCongleton()

  return (
    <TiltCard className="tile flex flex-col" style={{ gridColumn: '3 / 6', gridRow: '1 / 4' }} id="now">
      <div className="flex flex-col h-full p-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="clock" size={12} style={{ color: 'var(--text-subtle)' }} />
            <p className="text-[12px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Now</p>
          </div>
          <span className="text-[14px] font-mono tabular-nums" style={{ color: 'var(--text-subtle)' }}>{time}</span>
        </div>

        {/* 2×2 fields — fill remaining space */}
        <div className="grid grid-cols-2 gap-5 flex-1 content-center">
          {FIELDS.map(({ key, label, icon }) => (
            <div key={key} className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon name={icon} size={11} style={{ color: 'var(--accent)', opacity: 0.9 }} />
                <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{label}</p>
              </div>
              <p className="text-[17px] font-semibold leading-snug" style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
                {now[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </TiltCard>
  )
}
