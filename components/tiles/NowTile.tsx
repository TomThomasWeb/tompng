'use client'

import { useState, useEffect } from 'react'
import { TiltCard } from '../TiltCard'
import type { NowContent } from '@/types'

interface NowTileProps {
  now: NowContent
}

function useCongleton() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
      setDate(
        now.toLocaleDateString('en-GB', {
          timeZone: 'Europe/London',
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return { time, date }
}

const fields: { key: keyof NowContent; label: string }[] = [
  { key: 'working_on', label: 'Working on' },
  { key: 'reading', label: 'Reading' },
  { key: 'learning', label: 'Learning' },
  { key: 'shooting_with', label: 'Shooting with' },
]

export function NowTile({ now }: NowTileProps) {
  const { time, date } = useCongleton()

  return (
    <TiltCard className="tile col-span-2 md:col-span-1 p-4" id="now">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Now
        </p>
        <div className="text-right">
          <p className="text-[13px] font-mono tabular-nums" style={{ color: 'var(--text)' }}>
            {time}
          </p>
          <p className="text-[9px] mt-0.5" style={{ color: 'var(--text-subtle)' }}>
            {date}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <p className="text-[10px] mb-0.5" style={{ color: 'var(--accent)' }}>
              {label}
            </p>
            <p className="text-[11px] leading-snug" style={{ color: 'var(--text)' }}>
              {now[key]}
            </p>
          </div>
        ))}
      </div>
    </TiltCard>
  )
}
