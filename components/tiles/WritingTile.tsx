'use client'

import { useState, useEffect, useRef } from 'react'
import { Icon } from '../Icon'
import { TiltCard } from '../TiltCard'
import type { Post } from '@/types'

interface WritingTileProps {
  posts: Post[]
}

function TypewriterTitle({ text, delay = 0 }: { text: string; delay?: number }) {
  const [chars, setChars] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let i = chars
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setChars(i)
        if (i >= text.length) clearInterval(interval)
      }, 38)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  return (
    <span ref={ref}>
      {text.slice(0, chars)}
      {started && chars < text.length && (
        <span style={{ opacity: 0.4, fontWeight: 300 }}>|</span>
      )}
      {!started && '\u00A0'}
    </span>
  )
}

export function WritingTile({ posts }: WritingTileProps) {
  return (
    <TiltCard className="tile col-span-2 md:col-span-4 p-6" id="writing">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <Icon name="pen" size={10} style={{ color: 'var(--text-subtle)' }} />
          <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
            Writing
          </p>
        </div>
        <a
          href="/writing"
          className="text-[10px] hover:opacity-60 transition-opacity"
          style={{ color: 'var(--accent-text)' }}
        >
          All posts →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.slice(0, 3).map((post, i) => (
          <a key={post.id} href={`/writing/${post.slug}`} className="group block">
            <div className="flex items-start justify-between mb-1">
              <p
                className="text-[13px] font-medium"
                style={{ color: 'var(--text)' }}
              >
                <TypewriterTitle text={post.title} delay={i * 180} />
              </p>
              <span className="text-[10px] ml-2 flex-shrink-0" style={{ color: 'var(--text-subtle)' }}>
                {post.reading_time} min
              </span>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
              {post.subtitle}
            </p>
            {i < 2 && (
              <div className="mt-4 md:hidden" style={{ height: '1px', background: 'var(--divider)' }} />
            )}
          </a>
        ))}
      </div>
    </TiltCard>
  )
}
