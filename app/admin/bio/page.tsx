import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveBio } from '@/lib/actions'
import { SectionCard, TextareaField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

export default async function BioAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('bio_content').select('*').single()
  const bio = data ?? { bio_text: siteData.bio.short_bio, one_liners: siteData.bio.one_liners }

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Bio</h1>
      <form action={saveBio} className="flex flex-col gap-5">
        <SectionCard title="Short bio">
          <TextareaField
            label="Bio text"
            name="bio_text"
            defaultValue={bio.bio_text}
            rows={3}
          />
        </SectionCard>
        <SectionCard title="Rotating one-liners">
          <TextareaField
            label="One-liners"
            name="one_liners"
            defaultValue={bio.one_liners.join('\n')}
            rows={8}
            hint="One per line — these cycle in the hero tile every 4 seconds."
          />
        </SectionCard>
        <div><SaveButton /></div>
      </form>
    </div>
  )
}
