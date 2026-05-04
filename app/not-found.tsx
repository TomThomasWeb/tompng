import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <p
        className="text-[120px] font-bold leading-none mb-2 select-none"
        style={{
          color: 'var(--border)',
          fontFamily: 'Georgia, serif',
        }}
      >
        404
      </p>

      <h1
        className="text-[24px] font-semibold mb-3"
        style={{ fontFamily: 'Georgia, serif', color: 'var(--text)' }}
      >
        Nothing here.
      </h1>

      <p
        className="text-[15px] max-w-sm leading-relaxed mb-10"
        style={{ color: 'var(--text-muted)' }}
      >
        This page doesn&rsquo;t exist. Either the link is broken, something moved, or you
        typed it wrong — no judgement.
      </p>

      <div className="flex flex-col items-center gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full text-[14px] font-medium transition-opacity hover:opacity-80"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          Back home
        </Link>
        <Link
          href="/writing"
          className="text-[13px] hover:opacity-60 transition-opacity"
          style={{ color: 'var(--text-subtle)' }}
        >
          Or read something →
        </Link>
      </div>

      <p
        className="absolute bottom-8 text-[11px] uppercase tracking-widest"
        style={{ color: 'var(--text-subtle)', opacity: 0.3 }}
      >
        tompng.co.uk
      </p>
    </main>
  )
}
