'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const NAV_ITEMS = [
  { href: '/admin',           label: 'Dashboard',   icon: '▦' },
  { href: '/admin/bio',       label: 'Bio',          icon: '◉' },
  { href: '/admin/photos',    label: 'Photography',  icon: '▣' },
  { href: '/admin/games',     label: 'Games',        icon: '◈' },
  { href: '/admin/albums',    label: 'Albums',       icon: '◎' },
  { href: '/admin/now',       label: 'Now',          icon: '◷' },
  { href: '/admin/gear',      label: 'Gear',         icon: '◫' },
  { href: '/admin/freelance', label: 'Tom Thomas',   icon: '◐' },
  { href: '/admin/writing',   label: 'Writing',      icon: '◧' },
  { href: '/admin/mood',      label: 'Mood',         icon: '◉' },
  { href: '/admin/reading',   label: 'Reading',      icon: '◫' },
  { href: '/admin/settings',  label: 'Settings',     icon: '◌' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <aside
      className="w-52 shrink-0 h-screen sticky top-0 flex flex-col"
      style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
    >
      <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="text-[14px] font-semibold">
          <span style={{ color: 'var(--text)' }}>Tom</span>
          <span style={{ color: 'var(--accent)' }}>.PNG</span>
        </div>
        <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-subtle)' }}>Admin panel</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-2.5 px-5 py-2.5 text-[13px] transition-colors duration-100',
                active ? 'font-medium' : 'hover:opacity-70'
              )}
              style={{
                color: active ? 'var(--accent-text)' : 'var(--text-muted)',
                background: active ? 'var(--accent-bg)' : 'transparent',
              }}
            >
              <span className="text-[12px] opacity-70">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <a
          href="/"
          target="_blank"
          className="text-[11px] hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-subtle)' }}
        >
          ↗ View site
        </a>
      </div>
    </aside>
  )
}
