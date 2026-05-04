import Link from 'next/link'
import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { siteData } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Now — Tom.PNG',
  description: 'What Tom Thomas is currently focused on.',
}

const MAP_TILE = 'https://tile.openstreetmap.org/13/4046/2662.png'

const FIELD_DETAIL: Record<string, string> = {
  working_on:   'The project or thing taking most of my focus right now.',
  reading:      'What I have open or on my nightstand.',
  learning:     'Something I am actively trying to get better at.',
  shooting_with: 'The camera or kit I am reaching for most.',
}

export default async function NowPage() {
  let now = siteData.now
  let updatedAt: string | null = null

  try {
    const sb = await createSupabaseServerClient()
    const { data } = await sb.from('now_content').select('*').single()
    if (data) {
      now = data
      updatedAt = data.updated_at ?? null
    }
  } catch {}

  const formatted = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const fields = [
    { key: 'working_on'   as const, label: 'Working on'   },
    { key: 'reading'      as const, label: 'Reading'       },
    { key: 'learning'     as const, label: 'Learning'      },
    { key: 'shooting_with' as const, label: 'Shooting with' },
  ]

  return (
    <main
      className="min-h-screen px-6 py-10 md:px-8 md:py-16 max-w-[640px] mx-auto"
      style={{ color: 'var(--text)' }}
    >
      {/* Back */}
      <Link
        href="/"
        className="text-[12px] hover:opacity-60 transition-opacity inline-block mb-10"
        style={{ color: 'var(--text-subtle)' }}
      >
        ← Tom.PNG
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1
          className="text-[42px] font-bold mb-3 leading-none"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--text)' }}
        >
          Now
        </h1>
        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          What I&rsquo;m currently focused on. Inspired by{' '}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            style={{ color: 'var(--accent-text)', borderBottom: '1px solid var(--accent-border)' }}
          >
            Derek Sivers&rsquo; /now page
          </a>{' '}
          concept.
        </p>
        {formatted && (
          <p className="text-[12px] mt-3" style={{ color: 'var(--text-subtle)' }}>
            Last updated {formatted}
          </p>
        )}
      </div>

      {/* Fields */}
      <div className="flex flex-col">
        {fields.map(({ key, label }, i) => (
          <div key={key}>
            {i > 0 && (
              <div
                style={{ height: '1px', background: 'var(--border)', margin: '36px 0' }}
              />
            )}
            <p
              className="text-[11px] uppercase tracking-widest mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {label}
            </p>
            <p
              className="text-[24px] font-semibold leading-snug mb-2"
              style={{ fontFamily: 'Georgia, serif', color: 'var(--text)' }}
            >
              {now[key]}
            </p>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {FIELD_DETAIL[key]}
            </p>
          </div>
        ))}
      </div>

      {/* Location */}
      <div
        className="mt-14 rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border)' }}
      >
        <div className="relative h-[160px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MAP_TILE}
            alt="Map of Congleton"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'var(--map-filter, grayscale(0.4) brightness(0.6) saturate(0.7))' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-[10px] uppercase tracking-[0.25em] mb-1"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Based in
            </p>
            <p
              className="text-[22px] font-semibold"
              style={{ color: '#fff', fontFamily: 'Georgia, serif' }}
            >
              Congleton, Cheshire
            </p>
          </div>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 text-[8px] opacity-30 hover:opacity-70"
            style={{ color: '#fff' }}
          >
            © OSM
          </a>
        </div>
        <div
          className="px-5 py-4 flex justify-between items-center"
          style={{ background: 'var(--surface)' }}
        >
          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
            Congleton, Cheshire, UK
          </p>
          <a
            href="https://www.openstreetmap.org/?mlat=53.1635&mlon=-2.2160"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] hover:opacity-70 transition-opacity"
            style={{ color: 'var(--accent-text)' }}
          >
            Open map →
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-14 pt-6 flex justify-between items-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <Link
          href="/"
          className="text-[13px] hover:opacity-60 transition-opacity"
          style={{ color: 'var(--text-subtle)' }}
        >
          ← Tom.PNG
        </Link>
        <Link
          href="/writing"
          className="text-[13px] hover:opacity-60 transition-opacity"
          style={{ color: 'var(--text-subtle)' }}
        >
          Writing →
        </Link>
      </div>
    </main>
  )
}
