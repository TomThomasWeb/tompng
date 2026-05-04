// Reusable admin form components

export function FormField({
  label,
  name,
  type = 'text',
  defaultValue = '',
  placeholder = '',
  required = false,
}: {
  label: string
  name: string
  type?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
}) {
  const base =
    'w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors duration-150'
  const style = {
    background: 'var(--divider)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
  } as React.CSSProperties

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={base}
        style={style}
      />
    </div>
  )
}

export function TextareaField({
  label,
  name,
  defaultValue = '',
  placeholder = '',
  rows = 4,
  hint,
}: {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  rows?: number
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
        {label}
      </label>
      {hint && <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>{hint}</p>}
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-y transition-colors duration-150"
        style={{
          background: 'var(--divider)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
      />
    </div>
  )
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string
  name: string
  defaultValue?: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
        style={{
          background: 'var(--divider)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <h2 className="text-[11px] uppercase tracking-widest mb-5" style={{ color: 'var(--text-subtle)' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export function SaveButton({ label = 'Save changes' }: { label?: string }) {
  return (
    <button
      type="submit"
      className="px-4 py-2 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-80"
      style={{
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
      }}
    >
      {label}
    </button>
  )
}

export function DangerButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-[12px] transition-opacity hover:opacity-80"
      style={{
        background: 'rgba(180,60,60,0.12)',
        color: '#b44040',
        border: '1px solid rgba(180,60,60,0.2)',
      }}
    >
      {label}
    </button>
  )
}
