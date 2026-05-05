import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveBio } from '@/lib/actions'
import { SectionCard, FormField, TextareaField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

export default async function BioAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('bio_content').select('*').single()
  const bio = data ?? { bio_text: siteData.bio.short_bio, one_liners: siteData.bio.one_liners, profile_image: '', fun_facts: [] as string[] }

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Bio</h1>
      <form action={saveBio} className="flex flex-col gap-5">
        <SectionCard title="Short bio">
          <div className="flex flex-col gap-4">
            <FormField
              label="Profile image URL"
              name="profile_image"
              defaultValue={bio.profile_image ?? ''}
              placeholder="https://... (paste a URL to your photo)"
            />
            <TextareaField
              label="Bio text"
              name="bio_text"
              defaultValue={bio.bio_text}
              rows={3}
            />
          </div>
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
        <SectionCard title="Fun facts">
          <TextareaField
            label="Fun facts"
            name="fun_facts"
            defaultValue={(bio.fun_facts ?? []).join('\n')}
            rows={5}
            hint="One per line — shown as bullet points in the hero tile."
          />
        </SectionCard>
        <div><SaveButton /></div>
      </form>
    </div>
  )
}
