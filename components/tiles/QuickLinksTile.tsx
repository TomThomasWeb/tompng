import { SmallTile } from '../SmallTile'

interface QuickLink { label: string; url: string; emoji: string }

const DEFAULT_LINKS: QuickLink[] = [
  { label: 'Tom Thomas', url: 'https://tomthomas.uk',        emoji: '🌐' },
  { label: 'Alps',       url: 'https://alpsltd.co.uk',       emoji: '🏔' },
  { label: 'GitHub',     url: 'https://github.com/',          emoji: '💻' },
  { label: 'Circle',     url: 'https://circle.tomthomas.app', emoji: '⭕' },
]

export function QuickLinksTile({ links = DEFAULT_LINKS }: { links?: QuickLink[] }) {
  return (
    <SmallTile>
      <div className="flex flex-col h-full p-3">
        <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-subtle)' }}>Links</p>
        <div className="flex flex-col gap-1.5 flex-1 justify-center">
          {links.slice(0, 4).map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              <span style={{ fontSize: 11 }}>{link.emoji}</span>
              <span className="text-[11px] font-medium truncate" style={{ color: 'var(--text)' }}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </SmallTile>
  )
}
