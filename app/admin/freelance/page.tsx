import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveFreelance } from '@/lib/actions'
import { SectionCard, FormField, TextareaField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

export default async function FreelanceAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('tt_content').select('*').single()
  const tt = data ?? siteData.freelance

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Tom Thomas Web &amp; Media</h1>
      <form action={saveFreelance} className="flex flex-col gap-5">
        <SectionCard title="Branding">
          <div className="flex flex-col gap-4">
            <FormField
              label="Logo URL"
              name="logo_url"
              defaultValue={(tt as typeof tt & { logo_url?: string }).logo_url ?? ''}
              placeholder="https://... (your logo image URL — leave blank to use text wordmark)"
            />
            <FormField
              label="Visit site button URL"
              name="cta_url"
              defaultValue={(tt as typeof tt & { cta_url?: string }).cta_url ?? 'https://tomthomas.uk'}
              placeholder="https://tomthomas.uk"
            />
          </div>
        </SectionCard>

        <SectionCard title="Content">
          <div className="flex flex-col gap-4">
            <TextareaField
              label="Description"
              name="description"
              defaultValue={tt.description}
              rows={3}
            />
            <TextareaField
              label="Services"
              name="services"
              defaultValue={Array.isArray(tt.services) ? tt.services.join('\n') : ''}
              rows={6}
              hint="One per line — shown as pills on the tile."
            />
            <FormField
              label="Projects completed"
              name="projects_count"
              type="number"
              defaultValue={String(tt.projects_count)}
            />
          </div>
        </SectionCard>

        <SectionCard title="Status">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="available"
              defaultChecked={tt.available}
              className="w-4 h-4 rounded"
              style={{ accentColor: 'var(--accent)' }}
            />
            <div>
              <p className="text-[13px]" style={{ color: 'var(--text)' }}>Showing as available</p>
              <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
                Shows the green "Available" badge on the tile
              </p>
            </div>
          </label>
        </SectionCard>

        <div><SaveButton /></div>
      </form>
    </div>
  )
}
