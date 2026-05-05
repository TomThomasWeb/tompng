'use client'
import { GrowCard } from './GrowCard'
import { TiltCard } from './TiltCard'

interface SmallTileProps {
  children: React.ReactNode
  onClick?: () => void
  accentBg?: string
  accentBorder?: string
  gridColumn: string
  gridRow: string
  cardType?: 'tilt' | 'grow'
}

export function SmallTile({ children, onClick, accentBg, accentBorder, gridColumn, gridRow, cardType = 'grow' }: SmallTileProps) {
  const sharedStyle = {
    gridColumn,
    gridRow,
    background:  accentBg     ?? 'var(--glass-bg)',
    borderColor: accentBorder ?? 'var(--glass-border)',
    boxShadow:   'var(--glass-shadow)',
    cursor: onClick ? 'pointer' : undefined,
  }

  const sharedClass = "tile flex flex-col overflow-hidden"

  if (cardType === 'tilt') {
    return (
      <TiltCard className={sharedClass} onClick={onClick} style={sharedStyle}>
        {children}
      </TiltCard>
    )
  }

  return (
    <GrowCard className={sharedClass} onClick={onClick} style={sharedStyle}>
      {children}
    </GrowCard>
  )
}
