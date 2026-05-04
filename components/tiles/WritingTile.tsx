import { TiltCard } from '../TiltCard'
import type { Post } from '@/types'

interface WritingTileProps {
  posts: Post[]
}

export function WritingTile({ posts }: WritingTileProps) {
  return (
    <TiltCard className="tile col-span-2 md:col-span-4 p-5" id="writing">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Writing
        </p>
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
          <a
            key={post.id}
            href={`/writing/${post.slug}`}
            className="group block"
          >
            <div className="flex items-start justify-between mb-1">
              <p
                className="text-[13px] font-medium group-hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                {post.title}
              </p>
              <span
                className="text-[10px] ml-2 flex-shrink-0"
                style={{ color: 'var(--text-subtle)' }}
              >
                {post.reading_time} min
              </span>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
              {post.subtitle}
            </p>
            {i < 2 && (
              <div
                className="mt-4 md:hidden"
                style={{ height: '1px', background: 'var(--divider)' }}
              />
            )}
          </a>
        ))}
      </div>
    </TiltCard>
  )
}
