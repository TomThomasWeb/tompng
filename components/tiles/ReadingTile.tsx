import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import type { BookItem } from '@/types'

const STATUS_STYLES = {
  reading: { label: 'Reading',  bg: 'var(--accent-bg)',      color: 'var(--accent-text)'  },
  want:    { label: 'Want',     bg: 'var(--divider)',         color: 'var(--text-subtle)'  },
  done:    { label: 'Done',     bg: 'rgba(80,160,80,0.12)',   color: '#50a050'             },
}

export function ReadingTile({ books }: { books: BookItem[] }) {
  return (
    <TiltCard className="tile col-span-2 p-5 flex flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        <Icon name="book" size={11} style={{ color: 'var(--text-subtle)' }} />
        <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Reading list
        </p>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 justify-center">
        {books.slice(0, 4).map((book) => {
          const s = STATUS_STYLES[book.status]
          return (
            <div key={book.id} className="flex items-center gap-3">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                style={{ background: s.bg, color: s.color }}
              >
                {s.label}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: 'var(--text)' }}>
                  {book.title}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
                  {book.author}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </TiltCard>
  )
}
