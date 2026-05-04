import { TiltCard } from '../TiltCard'

interface QuoteContent {
  text: string
  author: string
}

export function QuoteTile({ quote }: { quote: QuoteContent }) {
  return (
    <TiltCard className="tile col-span-1 p-3 flex flex-col justify-between overflow-hidden">
      <p
        className="text-[11px] leading-snug flex-1 flex items-center"
        style={{ color: 'var(--text)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>
      <p className="text-[10px] mt-1" style={{ color: 'var(--text-subtle)' }}>
        — {quote.author}
      </p>
    </TiltCard>
  )
}
