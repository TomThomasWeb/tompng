import { createSupabaseServerClient } from './supabase-server'
import { siteData } from './data'
import type { SiteData } from '@/types'

// Fetch all site data from Supabase, falling back to static data
// when tables are empty (before admin panel has been used)
export async function getSiteData(): Promise<SiteData> {
  try {
    const sb = await createSupabaseServerClient()

    const [
      { data: bio },
      { data: photos },
      { data: games },
      { data: albums },
      { data: now },
      { data: gear },
      { data: tt },
      { data: posts },
      { data: settings },
    ] = await Promise.all([
      sb.from('bio_content').select('*').single(),
      sb.from('photos').select('*').order('display_order'),
      sb.from('games').select('*').order('display_order'),
      sb.from('albums').select('*').order('display_order'),
      sb.from('now_content').select('*').single(),
      sb.from('gear').select('*').order('display_order'),
      sb.from('tt_content').select('*').single(),
      sb.from('posts').select('*').order('published_at', { ascending: false }),
      sb.from('site_settings').select('*').single(),
    ])

    return {
      bio: bio
        ? { one_liners: bio.one_liners, short_bio: bio.bio_text, profile_image: bio.profile_image ?? '', fun_facts: bio.fun_facts ?? [] }
        : siteData.bio,
      photos:   photos?.length   ? photos   : siteData.photos,
      games:    games?.length    ? games    : siteData.games,
      albums:   albums?.length   ? albums   : siteData.albums,
      now:      now              ? now      : siteData.now,
      gear:     gear?.length     ? gear     : siteData.gear,
      freelance: tt ? {
        description:    tt.description,
        services:       tt.services,
        projects_count: tt.projects_count,
        available:      tt.available,
      } : siteData.freelance,
      posts:  posts?.length  ? posts  : siteData.posts,
      social: settings ? {
        instagram: settings.instagram_url,
        github:    settings.github_url,
        linkedin:  settings.linkedin_url,
      } : siteData.social,
      mood:  siteData.mood,
      books: siteData.books,
      quote: siteData.quote,
    }
  } catch {
    // If Supabase isn't configured, return static data
    return siteData
  }
}

export async function getMoodAndBooks() {
  try {
    const sb = await createSupabaseServerClient()
    const [{ data: mood }, { data: books }] = await Promise.all([
      sb.from('mood_content').select('*').single(),
      sb.from('books').select('*').order('display_order'),
    ])
    return {
      mood: mood ?? { emoji: '🎯', status: 'Building things' },
      books: books ?? [],
    }
  } catch {
    return {
      mood: { emoji: '🎯', status: 'Building things' },
      books: [] as import('@/types').BookItem[],
    }
  }
}
