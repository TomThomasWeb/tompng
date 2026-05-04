'use client'
import { useState, useEffect } from 'react'
import { TiltCard } from '../TiltCard'
import { Icon, type IconName } from '../Icon'
import type { NowContent } from '@/types'

function useCongleton() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    const up = () => {
      const n = new Date()
      setTime(n.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setDate(n.toLocaleDateString('en-GB', { timeZone: 'Europe/London', weekday: 'short', day: 'numeric', month: 'short' }))
    }
    up(); const t = setInterval(up, 1000); return () => clearInterval(t)
  }, [])
  return { time, date }
}

const FIELDS: { key: keyof NowContent; label: string; icon: IconName }[] = [
  { key: 'working_on',    label: 'Working on',   icon: 'code'   },
  { key: 'reading',       label: 'Reading',       icon: 'book'   },
  { key: 'learning',      label: 'Learning',      icon: 'music'  },
  { key: 'shooting_with', label: 'Shooting with', icon: 'camera' },
]

const MAP_TILE = 'https://tile.openstreetmap.org/13/4046/2662.png'

export function NowTile({ now }: { now: NowContent }) {
  const { time, date } = useCongleton()

  return (
    <TiltCard className="tile col-span-4 overflow-hidden" id="now">
      <div className="flex h-full">

        {/* Left — activity fields */}
        <div className="flex-1 flex flex-col justify-between p-5 min-w-0">
          <div className="flex items-center gap-1.5">
            <Icon name="clock" size={11} style={{ color: 'var(--text-subtle)' }} />
            <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Now</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1 content-center py-3">
            {FIELDS.map(({ key, label, icon }) => (
              <div key={key}>
                <div className="flex items-center gap-1 mb-1">
                  <Icon name={icon} size={10} style={{ color: 'var(--accent)', opacity: 0.8 }} />
                  <p className="text-[11px]" style={{ color: 'var(--accent)' }}>{label}</p>
                </div>
                <p className="text-[14px] leading-snug font-medium" style={{ color: 'var(--text)' }}>{now[key]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', background: 'var(--border)', flexShrink: 0 }} />

        {/* Right — map + clock */}
        <div className="relative overflow-hidden" style={{ width: '40%', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MAP_TILE}
            alt="Congleton map"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'var(--map-filter, grayscale(0.4) brightness(0.6) saturate(0.7))' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
            <div className="flex items-center gap-1">
              <Icon name="pin" size={9} style={{ color: 'rgba(255,255,255,0.7)' }} />
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.7)' }}>Congleton</p>
            </div>
            <p className="font-mono tabular-nums text-[22px] font-semibold leading-none" style={{ color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>{time}</p>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{date}</p>
          </div>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer"
             className="absolute bottom-1 right-1 text-[8px] opacity-30 z-10" style={{ color: '#fff' }}>© OSM</a>
        </div>

      </div>
    </TiltCard>
  )
}
