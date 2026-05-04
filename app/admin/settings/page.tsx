import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveSettings } from '@/lib/actions'
import { SectionCard, FormField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

export default async function SettingsAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('site_settings').select('*').single()
  const settings = data ?? { instagram_url: siteData.social.instagram, github_url: siteData.social.github, linkedin_url: siteData.social.linkedin }

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Settings</h1>
      <form action={saveSettings} className="flex flex-col gap-5">
        <SectionCard title="Social links">
          <div className="flex flex-col gap-4">
            <FormField label="Instagram URL" name="instagram_url" defaultValue={settings.instagram_url ?? ''} placeholder="https://instagram.com/yourhandle" />
            <FormField label="GitHub URL"    name="github_url"    defaultValue={settings.github_url ?? ''}    placeholder="https://github.com/yourhandle" />
            <FormField label="LinkedIn URL"  name="linkedin_url"  defaultValue={settings.linkedin_url ?? ''}  placeholder="https://linkedin.com/in/yourhandle" />
          </div>
        </SectionCard>
        <div><SaveButton /></div>
      </form>
    </div>
  )
}
