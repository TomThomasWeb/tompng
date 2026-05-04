import Link from 'next/link'
import { getSiteData } from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing — Tom.PNG',
  description: 'Articles and notes from Tom Thomas.',
}

export default async function WritingPage() {
  const { posts } = await getSiteData()

  return (
    <main
      className="min-h-screen px-4 py-10 md:px-8 md:py-16 max-w-[680px] mx-auto"
      style={{ color: 'var(--text)' }}
    >
      <div className="mb-12">
        <Link
          href="/"
          className="text-[12px] hover:opacity-60 transition-opacity mb-6 inline-block"
          style={{ color: 'var(--text-subtle)' }}
        >
          ← Tom.PNG
        </Link>
        <h1
          className="text-[32px] font-bold mt-4"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--text)' }}
        >
          Writing
        </h1>
        <p className="text-[14px] mt-2" style={{ color: 'var(--text-muted)' }}>
          Things I&rsquo;ve written down.
        </p>
      </div>

      <div className="flex flex-col">
        {posts.length === 0 && (
          <p className="text-[14px]" style={{ color: 'var(--text-subtle)' }}>
            Nothing published yet.
          </p>
        )}
        {posts.map((post, i) => (
          <div key={post.id}>
            {i > 0 && (
              <div style={{ height: '1px', background: 'var(--border)', margin: '24px 0' }} />
            )}
            <Link href={`/writing/${post.slug}`} className="group block">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h2
                  className="text-[18px] font-semibold group-hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--text)' }}
                >
                  {post.title}
                </h2>
                <span
                  className="text-[12px] shrink-0 tabular-nums"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {post.reading_time} min
                </span>
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {post.subtitle}
              </p>
              <p className="text-[12px] mt-2" style={{ color: 'var(--text-subtle)' }}>
                {new Date(post.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
