import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { siteData } from '@/lib/data'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Not found — Tom.PNG' }
  return {
    title: `${post.title} — Tom.PNG`,
    description: post.subtitle,
  }
}

async function getPost(slug: string) {
  try {
    const sb = await createSupabaseServerClient()
    const { data } = await sb.from('posts').select('*').eq('slug', slug).single()
    if (data) return data
  } catch {}
  return siteData.posts.find((p) => p.slug === slug) ?? null
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const paragraphs = post.body
    ? post.body.split('\n\n').filter(Boolean)
    : []

  return (
    <main
      className="min-h-screen px-4 py-10 md:px-8 md:py-16 max-w-[680px] mx-auto"
      style={{ color: 'var(--text)' }}
    >
      {/* Back */}
      <Link
        href="/writing"
        className="text-[12px] hover:opacity-60 transition-opacity mb-10 inline-block"
        style={{ color: 'var(--text-subtle)' }}
      >
        ← Writing
      </Link>

      {/* Header */}
      <header className="mt-6 mb-10">
        <h1
          className="text-[32px] md:text-[40px] font-bold leading-tight mb-4"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--text)' }}
        >
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="text-[18px] leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            {post.subtitle}
          </p>
        )}
        <div
          className="flex items-center gap-3 text-[13px]"
          style={{ color: 'var(--text-subtle)' }}
        >
          <span>
            {new Date(post.published_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{post.reading_time} min read</span>
        </div>
      </header>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '40px' }} />

      {/* Body */}
      <article className="prose-custom">
        {paragraphs.length > 0 ? (
          paragraphs.map((para: string, i) => (
            <p
              key={i}
              className="text-[16px] leading-[1.8] mb-6"
              style={{ color: 'var(--text)' }}
            >
              {para}
            </p>
          ))
        ) : (
          <p className="text-[14px]" style={{ color: 'var(--text-subtle)' }}>
            Nothing here yet.
          </p>
        )}
      </article>

      {/* Footer */}
      <div
        className="mt-16 pt-8 flex justify-between items-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <Link
          href="/writing"
          className="text-[13px] hover:opacity-60 transition-opacity"
          style={{ color: 'var(--text-subtle)' }}
        >
          ← All posts
        </Link>
        <Link
          href="/"
          className="text-[13px] hover:opacity-60 transition-opacity"
          style={{ color: 'var(--text-subtle)' }}
        >
          Tom.PNG
        </Link>
      </div>
    </main>
  )
}
