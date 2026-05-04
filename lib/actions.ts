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

  const { data: existing } = await sb.from('bio_content').select('id').single()
  if (existing) {
    await sb.from('bio_content').update({ bio_text, one_liners, profile_image, updated_at: new Date().toISOString() }).eq('id', existing.id)
  } else {
    await sb.from('bio_content').insert({ bio_text, one_liners, profile_image })
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
  const ids = (formData.get('ids') as string).split(',').filter(Boolean)

  await sb.from('games').delete().not('id', 'in', `(${ids.map(() => '?').join(',')})`)

  for (let i = 0; i < 5; i++) {
    const id   = formData.get(`game_id_${i}`) as string
    const name = formData.get(`game_name_${i}`) as string
    const color = formData.get(`game_color_${i}`) as string
    const note  = formData.get(`game_note_${i}`) as string
    if (!name) continue
    const image_url = formData.get(`game_image_${i}`) as string
    const payload = { name, dominant_color: color || '#4a7c5f', note: note || '', image_url: image_url || '', display_order: i }
    if (id) {
      await sb.from('games').upsert({ id, ...payload })
    } else {
      await sb.from('games').insert(payload)
    }
  }
  revalidatePath('/')

}

// ─── Albums ───────────────────────────────────────────────

export async function saveAlbums(formData: FormData) {
  const sb = await createSupabaseServerClient()
  for (let i = 0; i < 3; i++) {
    const id     = formData.get(`album_id_${i}`) as string
    const title  = formData.get(`album_title_${i}`) as string
    const artist = formData.get(`album_artist_${i}`) as string
    const color  = formData.get(`album_color_${i}`) as string
    if (!title) continue
    const payload = { title, artist, color_swatch: color || '#1a1a2a', display_order: i }
    if (id) {
      await sb.from('albums').upsert({ id, ...payload })
    } else {
      await sb.from('albums').insert(payload)
    }
  }
  revalidatePath('/')

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
  }
  const { data: existing } = await sb.from('site_settings').select('id').single()
  if (existing) {
    await sb.from('site_settings').update(payload).eq('id', existing.id)
  } else {
    await sb.from('site_settings').insert(payload)
  }
  revalidatePath('/')

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
