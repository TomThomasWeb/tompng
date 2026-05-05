'use client'
import { TiltCard } from './TiltCard'

interface SmallTileProps {
  children: React.ReactNode
  onClick?: () => void
  accentBg?: string
  accentBorder?: string
  gridColumn: string
  gridRow: string
}

export function SmallTile({ children, onClick, accentBg, accentBorder, gridColumn, gridRow }: SmallTileProps) {
  return (
    <TiltCard
      className="tile flex flex-col overflow-hidden"
      onClick={onClick}
      style={{
        gridColumn,
        gridRow,
        background:  accentBg     ?? 'var(--glass-bg)',
        borderColor: accentBorder ?? 'var(--glass-border)',
        boxShadow:   'var(--glass-shadow)',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      {children}
    </TiltCard>
  )
}
