'use client'
import { TiltCard } from './TiltCard'

interface SmallTileProps {
  children: React.ReactNode
  onClick?: () => void
  accentBg?: string
  accentBorder?: string
}

// Shared wrapper for all small (col-span-1) tiles
// Applies the glass treatment as inline styles so it overrides .tile background
export function SmallTile({ children, onClick, accentBg, accentBorder }: SmallTileProps) {
  return (
    <TiltCard
      className="tile col-span-1 flex flex-col overflow-hidden"
      onClick={onClick}
      style={{
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
