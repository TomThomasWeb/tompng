import { MetadataRoute } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { siteData } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://tompng.co.uk'

  let posts = siteData.posts
  try {
    const sb = await createSupabaseServerClient()
    const { data } = await sb.from('posts').select('slug, published_at')
    if (data?.length) posts = data as typeof posts
  } catch {}

  const postEntries = posts.map((post) => ({
    url: `${base}/writing/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/writing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...postEntries,
  ]
}
