import { TiltCard } from '../TiltCard'

interface SocialLinks { instagram?: string; linkedin?: string; whatsapp?: string; facebook?: string }

export function SocialsTile({ social }: { social: SocialLinks }) {
  const links = [
    { name: 'LinkedIn',  url: social.linkedin  ?? '#', color: '#0077b5',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
    { name: 'Instagram', url: social.instagram ?? '#', color: '#c13584',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/></svg> },
    { name: 'WhatsApp',  url: social.whatsapp  ?? '#', color: '#25d366',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.312A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg> },
    { name: 'Facebook',  url: social.facebook  ?? '#', color: '#1877f2',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  ]

  return (
    <TiltCard className="tile" style={{ gridColumn: '1 / 3', gridRow: '6 / 7' }}>
      <div className="flex items-center justify-around h-full px-6">
        {links.map(({ name, url, color, icon }) => (
          <a key={name} href={url === '#' ? undefined : url} target="_blank" rel="noopener noreferrer"
             className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </div>
            <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>{name}</p>
          </a>
        ))}
      </div>
    </TiltCard>
  )
}
