import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveGames } from '@/lib/actions'
import { SectionCard, FormField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

export default async function GamesAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('games').select('*').order('display_order')
  const games = data?.length ? data : siteData.games

  // Pad to 5 slots
  const slots = Array.from({ length: 5 }, (_, i) => games[i] ?? null)

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Games</h1>
      <form action={saveGames}>
        <input type="hidden" name="ids" value={games.map((g) => g.id).join(',')} />
        <div className="flex flex-col gap-4">
          {slots.map((game, i) => (
            <SectionCard key={i} title={`Game ${i + 1}`}>
              <input type="hidden" name={`game_id_${i}`} value={game?.id ?? ''} />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Name"
                  name={`game_name_${i}`}
                  defaultValue={game?.name ?? ''}
                  placeholder="Game title"
                />
                <FormField
                  label="Dominant colour"
                  name={`game_color_${i}`}
                  type="color"
                  defaultValue={game?.dominant_color ?? '#4a7c5f'}
                />
              </div>
              <div className="mt-3">
                <FormField
                  label="Note (optional)"
                  name={`game_note_${i}`}
                  defaultValue={game?.note ?? ''}
                  placeholder="e.g. 300+ hours and still going"
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
