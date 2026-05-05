'use client'
import { useState, useEffect } from 'react'
import { SmallTile } from '../SmallTile'

const BIRTH = new Date('1999-05-31T01:38:00Z')
function getAge() {
  const ms = Date.now() - BIRTH.getTime()
  const days = Math.floor(ms / 86400000)
  return { years: Math.floor(days / 365.25), days: Math.floor(days - Math.floor(days/365.25)*365.25) }
}

export function AgeCounterTile() {
  const [age, setAge] = useState(getAge)
  useEffect(() => { const t = setInterval(() => setAge(getAge()), 60000); return () => clearInterval(t) }, [])
  return (
    <SmallTile gridColumn="6 / 7" gridRow="5 / 6"
      accentBg="linear-gradient(160deg, var(--accent-bg) 0%, rgba(74,124,95,0.02) 100%)"
      accentBorder="var(--accent-border)">
      <div className="flex flex-col items-center justify-center h-full gap-0.5">
        <p className="text-[10px] uppercase tracking-widest" style={{ color:'var(--accent)' }}>Age</p>
        <p className="text-[36px] font-bold tabular-nums leading-none" style={{ color:'var(--accent-text)' }}>{age.years}</p>
        <p className="text-[10px]" style={{ color:'var(--text-muted)' }}>{age.days}d</p>
      </div>
    </SmallTile>
  )
}
