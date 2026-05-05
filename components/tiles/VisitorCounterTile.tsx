'use client'
import { useState, useEffect } from 'react'
import { SmallTile } from '../SmallTile'
import { incrementAndGetVisitorCount } from '@/lib/actions'

export function VisitorCounterTile() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => { incrementAndGetVisitorCount().then(setCount).catch(() => {}) }, [])

  return (
    <SmallTile gridColumn="7 / 8" gridRow="5 / 6" cardType="tilt"
      accentBg="linear-gradient(160deg, rgba(60,160,80,0.12) 0%, rgba(60,160,80,0.02) 100%)"
      accentBorder="rgba(60,160,80,0.2)">
      <div className="flex flex-col items-center justify-center h-full gap-1 p-1">
        <p className="text-[32px] font-bold tabular-nums leading-none" style={{ color: '#3ca050' }}>
          {count === null ? '—' : count.toLocaleString('en-GB')}
        </p>
        <p className="text-[11px] text-center leading-tight font-semibold" style={{ color: 'rgba(60,160,80,0.7)' }}>
          Site Visitors!
        </p>
      </div>
    </SmallTile>
  )
}
