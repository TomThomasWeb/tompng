'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from './supabase-server'

// ─── Bio ──────────────────────────────────────────────────

export async function saveBio(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const bio_text = formData.get('bio_text') as string
  const one_liners_raw = formData.get('one_liners') as string
  const one_liners = one_liners_raw.split('\n').map((s) => s.trim()).filter(Boolean)
  const profile_image = formData.get('profile_image') as string
  const fun_facts_raw = formData.get('fun_facts') as string
  const fun_facts = fun_facts_raw.split('\n').map((s) => s.trim()).filter(Boolean)

  const { data: existing } = await sb.from('bio_content').select('id').single()
  if (existing) {
    await sb.from('bio_content').update({ bio_text, one_liners, profile_image, fun_facts, updated_at: new Date().toISOString() }).eq('id', existing.id)
  } else {
    await sb.from('bio_content').insert({ bio_text, one_liners, profile_image, fun_facts })
  }
  revalidatePath('/')

}

// ─── Now ──────────────────────────────────────────────────

export async function saveNow(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const payload = {
    working_on:   formData.get('working_on') as string,
    reading:      formData.get('reading') as string,
    learning:     formData.get('learning') as string,
    shooting_with: formData.get('shooting_with') as string,
    location:     formData.get('location') as string,
    next_event:   formData.get('next_event') as string,
    updated_at:   new Date().toISOString(),
  }
  const { data: existing } = await sb.from('now_content').select('id').single()
  if (existing) {
    await sb.from('now_content').update(payload).eq('id', existing.id)
  } else {
    await sb.from('now_content').insert(payload)
  }
  revalidatePath('/')

}

// ─── Games ────────────────────────────────────────────────

export async function saveGames(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const count = Number(formData.get('count') ?? 6)

  for (let i = 0; i < count; i++) {
    const id        = formData.get(`game_id_${i}`) as string
    const name      = formData.get(`game_name_${i}`) as string
    const color     = formData.get(`game_color_${i}`) as string
    const note      = formData.get(`game_note_${i}`) as string
    const image_url = formData.get(`game_image_${i}`) as string
    const platform  = formData.get(`game_platform_${i}`) as string
    if (!name) continue

    const fullPayload = { name, dominant_color: color || '#4a7c5f', note: note || '', image_url: image_url || '', platform: platform || '', display_order: i }
    const basePayload = { name, dominant_color: color || '#4a7c5f', note: note || '', display_order: i }

    if (id) {
      const { error } = await sb.from('games').update(fullPayload).eq('id', id)
      if (error) await sb.from('games').update(basePayload).eq('id', id)
    } else {
      const { error } = await sb.from('games').insert(fullPayload)
      if (error) await sb.from('games').insert(basePayload)
    }
  }
  revalidatePath('/')
  revalidatePath('/admin/games')
}

// ─── Albums ───────────────────────────────────────────────

export async function saveAlbums(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const count = Number(formData.get('count') ?? 3)
  for (let i = 0; i < count; i++) {
    const id        = formData.get(`album_id_${i}`) as string
    const title     = formData.get(`album_title_${i}`) as string
    const artist    = formData.get(`album_artist_${i}`) as string
    const color     = formData.get(`album_color_${i}`) as string
    const image_url = formData.get(`album_image_${i}`) as string
    if (!title) continue

    const fullPayload = { title, artist, color_swatch: color || '#1a1a2a', image_url: image_url || '', display_order: i }
    const basePayload = { title, artist, color_swatch: color || '#1a1a2a', display_order: i }

    if (id) {
      const { error } = await sb.from('albums').update(fullPayload).eq('id', id)
      if (error) await sb.from('albums').update(basePayload).eq('id', id)
    } else {
      const { error } = await sb.from('albums').insert(fullPayload)
      if (error) await sb.from('albums').insert(basePayload)
    }
  }
  revalidatePath('/')
  revalidatePath('/admin/albums')
}

// ─── Gear ─────────────────────────────────────────────────

export async function saveGearItem(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const id    = formData.get('id') as string
  const payload = {
    brand:          formData.get('brand') as string,
    model:          formData.get('model') as string,
    verdict_badge:  formData.get('verdict_badge') as string,
    tooltip:        formData.get('tooltip') as string,
    display_order:  Number(formData.get('display_order') ?? 0),
  }
  if (id) {
    await sb.from('gear').update(payload).eq('id', id)
  } else {
    await sb.from('gear').insert(payload)
  }
  revalidatePath('/')

}

export async function deleteGearItem(id: string) {
  const sb = await createSupabaseServerClient()
  await sb.from('gear').delete().eq('id', id)
  revalidatePath('/')

}

// ─── Freelance / TT ───────────────────────────────────────

export async function saveFreelance(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const services_raw = formData.get('services') as string
  const payload = {
    description:    formData.get('description') as string,
    services:       services_raw.split('\n').map((s) => s.trim()).filter(Boolean),
    projects_count: Number(formData.get('projects_count') ?? 0),
    available:      formData.get('available') === 'on',
    cta_url:        formData.get('cta_url') as string || 'https://tomthomas.uk',
    logo_url:       formData.get('logo_url') as string || '',
    updated_at:     new Date().toISOString(),
  }
  const { data: existing } = await sb.from('tt_content').select('id').single()
  if (existing) {
    await sb.from('tt_content').update(payload).eq('id', existing.id)
  } else {
    await sb.from('tt_content').insert(payload)
  }
  revalidatePath('/')

}

// ─── Posts ────────────────────────────────────────────────

export async function savePost(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const id    = formData.get('id') as string
  const title = formData.get('title') as string
  const body  = formData.get('body') as string
  const words = body.trim().split(/\s+/).length
  const payload = {
    title,
    subtitle:     formData.get('subtitle') as string,
    body,
    slug:         formData.get('slug') as string,
    reading_time: Math.max(1, Math.round(words / 200)),
    published_at: formData.get('published_at') as string || new Date().toISOString(),
  }
  if (id) {
    await sb.from('posts').update(payload).eq('id', id)
  } else {
    await sb.from('posts').insert(payload)
  }
  revalidatePath('/')
  revalidatePath('/writing')

}

export async function deletePost(id: string) {
  const sb = await createSupabaseServerClient()
  await sb.from('posts').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/writing')

}

// ─── Settings ─────────────────────────────────────────────

export async function saveSettings(formData: FormData) {
  const sb = await createSupabaseServerClient()
  const payload = {
    instagram_url: formData.get('instagram_url') as string,
    github_url:    formData.get('github_url') as string,
    linkedin_url:  formData.get('linkedin_url') as string,
    whatsapp_url:  formData.get('whatsapp_url') as string,
    facebook_url:  formData.get('facebook_url') as string,
  }
  const { data: existing } = await sb.from('site_settings').select('id').single()
  if (existing) {
    // Try with all fields, fall back to original fields if new columns don't exist yet
    const { error } = await sb.from('site_settings').update(payload).eq('id', existing.id)
    if (error) {
      const { instagram_url, github_url, linkedin_url } = payload
      await sb.from('site_settings').update({ instagram_url, github_url, linkedin_url }).eq('id', existing.id)
    }
  } else {
    await sb.from('site_settings').insert(payload)
  }
  revalidatePath('/')
  revalidatePath('/admin/settings')
}

// ─── Photos ───────────────────────────────────────────────

export async function savePhotoRecord(url: string, caption: string, location: string, display_order: number) {
  const sb = await createSupabaseServerClient()
  await sb.from('photos').insert({ url, caption, location, display_order })
  revalidatePath('/')

}

export async function deletePhoto(id: string, url: string) {
  const sb = await createSupabaseServerClient()
  // Delete from storage
  const path = url.split('/photos/')[1]
  if (path) await sb.storage.from('photos').remove([path])
  // Delete from DB
  await sb.from('photos').delete().eq('id', id)
  revalidatePath('/')

}

export async function updatePhotoMeta(id: string, caption: string, location: string) {
  const sb = await createSupabaseServerClient()
  await sb.from('photos').update({ caption, location }).eq('id', id)
  revalidatePath('/')

}

// ─── Visitor counter ──────────────────────────────────────

export async function incrementAndGetVisitorCount(): Promise<number> {
  const sb = await createSupabaseServerClient()
  const { data: current } = await sb.from('visit_counts').select('id, count').single()
  if (current) {
    const newCount = (current.count ?? 0) + 1
    await sb.from('visit_counts').update({ count: newCount }).eq('id', current.id)
    return newCount
  } else {
    await sb.from('visit_counts').insert({ count: 1 })
    return 1
  }
}
