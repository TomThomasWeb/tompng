import { SmallTile } from '../SmallTile'
import type { MoodContent } from '@/types'

export function MoodTile({ mood }: { mood: MoodContent }) {
  return (
    <SmallTile>
      <div className="flex flex-col items-center justify-center h-full gap-1.5 p-2">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Mood</p>
        <span style={{ fontSize: 36, lineHeight: 1 }}>{mood.emoji}</span>
        <p className="text-[11px] font-medium text-center leading-tight" style={{ color: 'var(--text)' }}>
          {mood.status}
        </p>
      </div>
    </SmallTile>
  )
}
