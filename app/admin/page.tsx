import Link from 'next/link'

const SECTIONS = [
  { href: '/admin/bio',       label: 'Bio',         desc: 'Short bio and rotating one-liners' },
  { href: '/admin/photos',    label: 'Photography', desc: 'Upload and manage photos' },
  { href: '/admin/games',     label: 'Games',       desc: 'Your top 5 games' },
  { href: '/admin/albums',    label: 'Albums',      desc: 'Favourite albums' },
  { href: '/admin/now',       label: 'Now',         desc: 'What you\'re currently up to' },
  { href: '/admin/gear',      label: 'Gear',        desc: 'Your camera and tech kit' },
  { href: '/admin/freelance', label: 'Tom Thomas',  desc: 'Freelance tile content' },
  { href: '/admin/writing',   label: 'Writing',     desc: 'Blog posts' },
  { href: '/admin/settings',  label: 'Settings',    desc: 'Social links and site config' },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold mb-1" style={{ color: 'var(--text)' }}>
          Dashboard
        </h1>
        <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
          Pick a section to edit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SECTIONS.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="block rounded-xl p-5 transition-opacity hover:opacity-75"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-[14px] font-medium mb-1" style={{ color: 'var(--text)' }}>{label}</p>
            <p className="text-[12px]" style={{ color: 'var(--text-subtle)' }}>{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
