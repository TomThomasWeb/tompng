import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveAlbums } from '@/lib/actions'
import { SectionCard, FormField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

export default async function AlbumsAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('albums').select('*').order('display_order')
  const albums = data?.length ? data : siteData.albums
  const slots = Array.from({ length: 3 }, (_, i) => albums[i] ?? null)

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Albums</h1>
      <form action={saveAlbums}>
        <input type="hidden" name="count" value="3" />
        <div className="flex flex-col gap-4">
          {slots.map((album, i) => (
            <SectionCard key={i} title={`Album ${i + 1}`}>
              <input type="hidden" name={`album_id_${i}`} value={album?.id ?? ''} />

              {/* Art preview */}
              {album?.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={album.image_url}
                  alt={album.title ?? ''}
                  className="w-16 h-16 rounded-lg object-cover mb-3"
                  style={{ border: '1px solid var(--border)' }}
                />
              )}

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Title"  name={`album_title_${i}`}  defaultValue={album?.title ?? ''}  placeholder="Album name" />
                  <FormField label="Artist" name={`album_artist_${i}`} defaultValue={album?.artist ?? ''} placeholder="Artist name" />
                </div>
                <FormField
                  label="Album art URL"
                  name={`album_image_${i}`}
                  defaultValue={album?.image_url ?? ''}
                  placeholder="https://... (paste album art image URL)"
                />
                <FormField
                  label="Colour swatch (fallback if no art)"
                  name={`album_color_${i}`}
                  type="color"
                  defaultValue={album?.color_swatch ?? '#1a1a2a'}
                />
              </div>
            </SectionCard>
          ))}
        </div>
        <div className="mt-5"><SaveButton /></div>
      </form>
    </div>
  )
}
