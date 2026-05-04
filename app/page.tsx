import { getSiteData } from '@/lib/db'
import { Nav } from '@/components/Nav'
import { HeroTile } from '@/components/tiles/HeroTile'
import { PhotoTile } from '@/components/tiles/PhotoTile'
import { GamesTile } from '@/components/tiles/GamesTile'
import { AlbumsTile } from '@/components/tiles/AlbumsTile'
import { NowTile } from '@/components/tiles/NowTile'
import { GearTile } from '@/components/tiles/GearTile'
import { FreelanceTile } from '@/components/tiles/FreelanceTile'
import { WritingTile } from '@/components/tiles/WritingTile'
import { BentoGrid } from '@/components/BentoGrid'

export default async function Home() {
  const { bio, photos, games, albums, now, gear, freelance, posts, social } = await getSiteData()

  return (
    <main
      className="min-h-screen px-5 py-8 md:px-8 md:py-10 lg:px-12"
      style={{ perspective: '1200px' }}
    >
      <Nav />

      <BentoGrid>
        <HeroTile bio={bio} />
        <PhotoTile photos={photos} />
        <GamesTile games={games} />
        <AlbumsTile albums={albums} />
        <NowTile now={now} />
        <GearTile gear={gear} />
        <FreelanceTile freelance={freelance} />
        <WritingTile posts={posts} />
      </BentoGrid>

      {/* Footer */}
      <footer className="mt-6 pt-4 flex justify-between items-center" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>
          tompng.co.uk
        </span>
        <div className="flex gap-4">
          {[
            { label: 'Instagram', href: social.instagram },
            { label: 'GitHub', href: social.github },
            { label: 'LinkedIn', href: social.linkedin },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] hover:opacity-60 transition-opacity"
              style={{ color: 'var(--text-subtle)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}
