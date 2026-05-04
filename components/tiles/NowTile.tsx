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
  { key: 'working_on',    label: 'On',       icon: 'code'   },
  { key: 'reading',       label: 'Reading',  icon: 'book'   },
  { key: 'learning',      label: 'Learning', icon: 'music'  },
  { key: 'shooting_with', label: 'Shooting', icon: 'camera' },
]

export function NowTile({ now }: { now: NowContent }) {
  const time = useCongleton()
  return (
    <TiltCard className="tile col-span-2 p-5 flex flex-col overflow-hidden" id="now">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Icon name="clock" size={11} style={{ color: 'var(--text-subtle)' }} />
          <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Now</p>
        </div>
        <span className="text-[12px] font-mono tabular-nums" style={{ color: 'var(--text-subtle)' }}>{time}</span>
      </div>
      <div className="flex flex-col gap-2.5 flex-1 justify-center">
        {FIELDS.map(({ key, label, icon }) => (
          <div key={key}>
            <div className="flex items-center gap-1 mb-0.5">
              <Icon name={icon} size={9} style={{ color: 'var(--accent)', opacity: 0.8 }} />
              <p className="text-[10px]" style={{ color: 'var(--accent)' }}>{label}</p>
            </div>
            <p className="text-[12px] leading-tight truncate pl-[13px]" style={{ color: 'var(--text)' }}>{now[key]}</p>
          </div>
        ))}
      </div>
    </TiltCard>
  )
}
