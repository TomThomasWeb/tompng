'use client'
import { useState, useEffect } from 'react'
import { SmallTile } from '../SmallTile'

const BIRTH = new Date('1999-05-31T01:38:00Z')

function getDetailedAge() {
  const now = new Date()
  let years  = now.getUTCFullYear() - BIRTH.getUTCFullYear()
  let months = now.getUTCMonth()    - BIRTH.getUTCMonth()
  let days   = now.getUTCDate()     - BIRTH.getUTCDate()
  let hours  = now.getUTCHours()    - BIRTH.getUTCHours()

  if (hours  < 0) { hours  += 24; days--  }
  if (days   < 0) {
    months--
    const daysInPrevMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0)).getUTCDate()
    days += daysInPrevMonth
  }
  if (months < 0) { months += 12; years-- }

  return { years, months, days, hours }
}

export function AgeCounterTile() {
  const [age, setAge] = useState(getDetailedAge)
  useEffect(() => {
    const t = setInterval(() => setAge(getDetailedAge()), 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <SmallTile gridColumn="6 / 7" gridRow="5 / 6" cardType="grow"
      accentBg="linear-gradient(160deg, var(--accent-bg) 0%, rgba(74,124,95,0.02) 100%)"
      accentBorder="var(--accent-border)">
      <div className="flex flex-col items-center justify-center h-full gap-0.5 px-1">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>I am</p>
        <p className="text-[42px] font-bold tabular-nums leading-none" style={{ color: 'var(--accent-text)' }}>
          {age.years}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>{age.months}m</span>
          <span className="text-[9px]" style={{ color: 'var(--border)' }}>·</span>
          <span className="text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>{age.days}d</span>
          <span className="text-[9px]" style={{ color: 'var(--border)' }}>·</span>
          <span className="text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>{age.hours}h</span>
        </div>
        <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>old</p>
      </div>
    </SmallTile>
  )
}
