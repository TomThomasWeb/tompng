import { TiltCard } from '../TiltCard'

interface FreelanceData {
  description: string
  services: string[]
  projects_count: number
  available: boolean
  cta_url?: string
  logo_url?: string
}

export function FreelanceTile({ freelance }: { freelance: FreelanceData }) {
  const url = freelance.cta_url || 'https://tomthomas.uk'

  return (
    <TiltCard className="tile flex flex-col" style={{ gridColumn: '6 / 9', gridRow: '6 / 7' }}>
      <div className="flex items-center h-full px-6 gap-6">

        {/* Logo or wordmark */}
        <div className="shrink-0">
          {freelance.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={freelance.logo_url}
              alt="Tom Thomas Web & Media"
              style={{ height: 44, width: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <div>
              <p className="text-[17px] font-bold leading-tight" style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
                Tom Thomas
              </p>
              <p className="text-[11px]" style={{ color: 'var(--accent)' }}>Web &amp; Media</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)', margin: '12px 0', flexShrink: 0 }} />

        {/* Description */}
        <p className="text-[12px] leading-relaxed flex-1 min-w-0" style={{ color: 'var(--text-muted)' }}>
          {freelance.description}
        </p>

        {/* CTA button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-lg text-[12px] font-semibold transition-opacity hover:opacity-85"
          style={{ background: 'var(--accent)', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Visit site →
        </a>

      </div>
    </TiltCard>
  )
}
