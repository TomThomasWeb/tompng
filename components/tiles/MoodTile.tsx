import { TiltCard } from '../TiltCard'
import type { MoodContent } from '@/types'

export function MoodTile({ mood }: { mood: MoodContent }) {
  return (
    <TiltCard className="tile col-span-1 p-5 flex flex-col justify-between overflow-hidden">
      <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
        Mood
      </p>

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <span style={{ fontSize: '48px', lineHeight: 1 }}>{mood.emoji}</span>
        <p className="text-[14px] font-medium text-center" style={{ color: 'var(--text)' }}>
          {mood.status}
        </p>
      </div>
    </TiltCard>
  )
}
