'use client'

import { useState, useEffect } from 'react'
import { TiltCard } from '../TiltCard'
import { Icon, type IconName } from '../Icon'
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
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return { time, date }
}

const MAP_TILE = 'https://tile.openstreetmap.org/13/4046/2662.png'

const FIELDS: { key: keyof NowContent; label: string; icon: IconName }[] = [
  { key: 'working_on',    label: 'Working on',    icon: 'code'    },
  { key: 'reading',       label: 'Reading',        icon: 'book'    },
  { key: 'learning',      label: 'Learning',       icon: 'music'   },
  { key: 'shooting_with', label: 'Shooting with',  icon: 'camera'  },
]

export function NowTile({ now }: NowTileProps) {
  const { time, date } = useCongleton()

  return (
    <TiltCard className="tile col-span-2 overflow-hidden" id="now" style={{ minHeight: '200px' }}>
      <div className="flex h-full">

        {/* Left — activity fields */}
        <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
          <div className="flex items-center gap-1.5 mb-3">
            <Icon name="clock" size={10} style={{ color: 'var(--text-subtle)' }} />
            <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
              Now
            </p>
          </div>

          <div className="flex flex-col gap-2.5 flex-1 justify-center">
            {FIELDS.map(({ key, label, icon }) => (
              <div key={key}>
                <div className="flex items-center gap-1 mb-0.5">
                  <Icon name={icon} size={9} style={{ color: 'var(--accent)', opacity: 0.8 }} />
                  <p className="text-[10px]" style={{ color: 'var(--accent)' }}>{label}</p>
                </div>
                <p className="text-[11px] leading-snug truncate pl-[13px]" style={{ color: 'var(--text)' }}>
                  {now[key]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', background: 'var(--border)', flexShrink: 0 }} />

        {/* Right — Congleton map + clock */}
        <div className="relative overflow-hidden" style={{ width: '180px', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MAP_TILE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'var(--map-filter, grayscale(0.4) brightness(0.6) saturate(0.7))' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />

          {/* OSM attribution */}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-1 right-1 text-[8px] opacity-40 hover:opacity-80 z-10"
            style={{ color: '#fff' }}
          >
            © OSM
          </a>

          {/* Clock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-1">
            <div className="flex items-center gap-1">
              <Icon name="pin" size={9} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Congleton
              </p>
            </div>
            <p
              className="font-mono tabular-nums text-[20px] font-semibold leading-none"
              style={{ color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
            >
              {time}
            </p>
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {date}
            </p>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
