'use client'
import { useState, useEffect } from 'react'
import { TiltCard } from '../TiltCard'
import { incrementAndGetVisitorCount } from '@/lib/actions'

export function VisitorCounterTile() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    incrementAndGetVisitorCount().then(setCount).catch(() => {})
  }, [])

  const display = count === null ? '...' : count.toLocaleString('en-GB')

  return (
    <TiltCard className="tile col-span-1 flex flex-col items-center justify-center gap-1 overflow-hidden">
      <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Visitors</p>
      <p className="text-[24px] font-bold tabular-nums leading-none" style={{ color: 'var(--text)' }}>{display}</p>
    </TiltCard>
  )
}
