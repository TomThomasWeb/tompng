'use client'
import { useState, useEffect } from 'react'
import { TiltCard } from '../TiltCard'

// Born 31 May 1999 at 2:38 AM BST = 01:38 UTC
const BIRTH = new Date('1999-05-31T01:38:00Z')

function getAge() {
  const now = new Date()
  const ms = now.getTime() - BIRTH.getTime()
  const totalDays = Math.floor(ms / 86400000)
  const years = Math.floor(totalDays / 365.25)
  const days = Math.floor(totalDays - years * 365.25)
  return { years, days }
}

export function AgeCounterTile() {
  const [age, setAge] = useState(getAge)

  useEffect(() => {
    const t = setInterval(() => setAge(getAge()), 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <TiltCard className="tile col-span-1 flex flex-col items-center justify-center gap-1 overflow-hidden">
      <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Age</p>
      <p className="text-[34px] font-bold tabular-nums leading-none" style={{ color: 'var(--text)' }}>{age.years}</p>
      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{age.days}d</p>
    </TiltCard>
  )
}
