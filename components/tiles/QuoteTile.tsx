import { SmallTile } from '../SmallTile'

interface QuoteContent { text: string; author: string }

export function QuoteTile({ quote }: { quote: QuoteContent }) {
  return (
    <SmallTile>
      <div className="relative flex flex-col justify-between h-full p-3 pt-2">
        {/* Giant editorial quote mark */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: 2, left: 6,
            fontSize: 56, lineHeight: 1,
            color: 'var(--accent)', opacity: 0.22,
            fontFamily: 'Georgia, serif',
            userSelect: 'none', pointerEvents: 'none',
          }}
        >
          &ldquo;
        </span>

        <p
          className="flex-1 flex items-center pt-5 leading-snug"
          style={{
            fontSize: 11,
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            color: 'var(--text)',
            lineHeight: 1.5,
          }}
        >
          {quote.text}
        </p>
        <p className="text-[10px] mt-1" style={{ color: 'var(--text-subtle)' }}>
          — {quote.author}
        </p>
      </div>
    </SmallTile>
  )
}
