import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { deletePost } from '@/lib/actions'
import { siteData } from '@/lib/data'

export default async function WritingAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('posts').select('*').order('published_at', { ascending: false })
  const posts = data?.length ? data : siteData.posts

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-semibold" style={{ color: 'var(--text)' }}>Writing</h1>
        <Link
          href="/admin/writing/new"
          className="px-4 py-2 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-80"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          + New post
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {posts.length === 0 && (
          <p className="text-[13px]" style={{ color: 'var(--text-subtle)' }}>No posts yet.</p>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-start justify-between rounded-xl p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium mb-0.5" style={{ color: 'var(--text)' }}>
                {post.title}
              </p>
              <p className="text-[12px]" style={{ color: 'var(--text-subtle)' }}>
                {post.subtitle}
              </p>
              <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-subtle)', opacity: 0.6 }}>
                {post.reading_time} min read &middot; {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <Link
                href={`/admin/writing/${post.id}`}
                className="text-[12px] px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                style={{ background: 'var(--divider)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                Edit
              </Link>
              <form action={deletePost.bind(null, post.id)}>
                <button
                  type="submit"
                  className="text-[12px] px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(180,60,60,0.12)', color: '#b44040', border: '1px solid rgba(180,60,60,0.2)' }}
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
