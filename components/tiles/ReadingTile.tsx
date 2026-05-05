import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import type { BookItem } from '@/types'

const STATUS_STYLES = {
  reading: { label:'Reading', bg:'var(--accent-bg)',      color:'var(--accent-text)'  },
  want:    { label:'Want',    bg:'var(--divider)',         color:'var(--text-subtle)'  },
  done:    { label:'Done',    bg:'rgba(80,160,80,0.12)',   color:'#50a050'             },
}

export function ReadingTile({ books }: { books: BookItem[] }) {
  return (
    <TiltCard className="tile flex flex-col" style={{ gridColumn:'6 / 9', gridRow:'6 / 7' }}>
      <div className="flex h-full px-5 py-4 gap-6 items-center">
        <div className="flex items-center gap-1.5 shrink-0">
          <Icon name="book" size={11} style={{ color:'var(--text-subtle)' }} />
          <p className="text-[11px] uppercase tracking-widest" style={{ color:'var(--text-subtle)' }}>Reading</p>
        </div>
        <div className="flex gap-5 flex-1 min-w-0">
          {books.slice(0,4).map(book => {
            const s = STATUS_STYLES[book.status]
            return (
              <div key={book.id} className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium" style={{ background:s.bg, color:s.color }}>{s.label}</span>
                <div className="min-w-0">
                  <p className="text-[12px] font-medium truncate" style={{ color:'var(--text)' }}>{book.title}</p>
                  <p className="text-[11px] truncate" style={{ color:'var(--text-subtle)' }}>{book.author}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </TiltCard>
  )
}
