import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveNow } from '@/lib/actions'
import { SectionCard, FormField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

export default async function NowAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('now_content').select('*').single()
  const now = data ?? { ...siteData.now, location: '', next_event: '' }

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Now</h1>
      <form action={saveNow} className="flex flex-col gap-5">
        <SectionCard title="Current activity">
          <div className="flex flex-col gap-4">
            <FormField label="Working on"   name="working_on"   defaultValue={now.working_on} />
            <FormField label="Reading"      name="reading"      defaultValue={now.reading} />
            <FormField label="Learning"     name="learning"     defaultValue={now.learning} />
            <FormField label="Shooting with" name="shooting_with" defaultValue={now.shooting_with} />
            <FormField label="Location"     name="location"     defaultValue={now.location ?? ''} placeholder="e.g. Congleton, Cheshire" />
            <FormField label="Next event"   name="next_event"   defaultValue={now.next_event ?? ''} placeholder="e.g. Fencing club, 7pm Thursday" />
          </div>
        </SectionCard>
        <div><SaveButton /></div>
      </form>
    </div>
  )
}
