import { createSupabaseServerClient } from '@/lib/supabase-server'
import { SectionCard, FormField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

async function saveMood(formData: FormData) {
  'use server'
  const { createSupabaseServerClient: create } = await import('@/lib/supabase-server')
  const { revalidatePath } = await import('next/cache')
  const sb = await create()
  const payload = { emoji: formData.get('emoji') as string, status: formData.get('status') as string, updated_at: new Date().toISOString() }
  const { data: ex } = await sb.from('mood_content').select('id').single()
  if (ex) { await sb.from('mood_content').update(payload).eq('id', ex.id) }
  else { await sb.from('mood_content').insert(payload) }
  revalidatePath('/')
}

export default async function MoodAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('mood_content').select('*').single()
  const mood = data ?? siteData.mood
  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Mood / Status</h1>
      {mood.emoji && <div className="text-center text-[64px] mb-4">{mood.emoji}</div>}
      <form action={saveMood} className="flex flex-col gap-5">
        <SectionCard title="Current mood">
          <div className="flex flex-col gap-4">
            <FormField label="Emoji (paste one)" name="emoji" defaultValue={mood.emoji} placeholder="🎯" />
            <FormField label="Status text" name="status" defaultValue={mood.status} placeholder="Building things" />
          </div>
        </SectionCard>
        <div><SaveButton /></div>
      </form>
    </div>
  )
}
