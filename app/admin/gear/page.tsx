import { createSupabaseServerClient } from '@/lib/supabase-server'
import { saveGearItem, deleteGearItem } from '@/lib/actions'
import { SectionCard, FormField, SelectField, SaveButton, DangerButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'

const BADGE_OPTIONS = [
  { value: 'daily driver', label: 'Daily driver' },
  { value: 'weekend kit',  label: 'Weekend kit'  },
  { value: 'new arrival',  label: 'New arrival'  },
  { value: 'in the bag',   label: 'In the bag'   },
]

export default async function GearAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('gear').select('*').order('display_order')
  const gear = data?.length ? data : siteData.gear

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Gear</h1>
      <div className="flex flex-col gap-4">
        {gear.map((item, i) => (
          <SectionCard key={item.id} title={`${item.brand} ${item.model}`}>
            <form action={saveGearItem} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="display_order" value={i} />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Brand" name="brand" defaultValue={item.brand} />
                <FormField label="Model" name="model" defaultValue={item.model} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Verdict badge"
                  name="verdict_badge"
                  defaultValue={item.verdict_badge}
                  options={BADGE_OPTIONS}
                />
              </div>
              <FormField label="Tooltip" name="tooltip" defaultValue={item.tooltip} placeholder="One-line take on this piece of gear" />
              <div className="flex gap-3">
                <SaveButton label="Update" />
                <form action={deleteGearItem.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg text-[12px] transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(180,60,60,0.12)', color: '#b44040', border: '1px solid rgba(180,60,60,0.2)' }}
                  >
                    Remove
                  </button>
                </form>
              </div>
            </form>
          </SectionCard>
        ))}

        {/* Add new gear item */}
        <SectionCard title="Add new item">
          <form action={saveGearItem} className="flex flex-col gap-4">
            <input type="hidden" name="id" value="" />
            <input type="hidden" name="display_order" value={gear.length} />
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Brand" name="brand" placeholder="e.g. Sony" />
              <FormField label="Model" name="model" placeholder="e.g. RX100 VII" />
            </div>
            <SelectField label="Verdict badge" name="verdict_badge" defaultValue="daily driver" options={BADGE_OPTIONS} />
            <FormField label="Tooltip" name="tooltip" placeholder="One-line take on this gear" />
            <div><SaveButton label="Add item" /></div>
          </form>
        </SectionCard>
      </div>
    </div>
  )
}
