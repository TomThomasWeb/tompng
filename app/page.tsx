import { getSiteData } from '@/lib/db'
import { getMoodAndBooks } from '@/lib/db'
import { Nav } from '@/components/Nav'
import { HeroTile } from '@/components/tiles/HeroTile'
import { PhotoTile } from '@/components/tiles/PhotoTile'
import { GamesTile } from '@/components/tiles/GamesTile'
import { AlbumsTile } from '@/components/tiles/AlbumsTile'
import { NowTile } from '@/components/tiles/NowTile'
import { WeatherTile } from '@/components/tiles/WeatherTile'
import { MoodTile } from '@/components/tiles/MoodTile'
import { ThemeToggleTile } from '@/components/tiles/ThemeToggleTile'
import { AgeCounterTile } from '@/components/tiles/AgeCounterTile'
import { VisitorCounterTile } from '@/components/tiles/VisitorCounterTile'
import { QuoteTile } from '@/components/tiles/QuoteTile'
import { MapTile } from '@/components/tiles/MapTile'
import { QuickLinksTile } from '@/components/tiles/QuickLinksTile'
import { ReadingTile } from '@/components/tiles/ReadingTile'
import { SocialsTile } from '@/components/tiles/SocialsTile'
import { BentoGrid } from '@/components/BentoGrid'
import type { WeatherData } from '@/types'

export const revalidate = 1800

async function fetchWeather(): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=53.1635&longitude=-2.2160&current_weather=true',
      { next: { revalidate: 1800 } }
    )
    if (!res.ok) return null
    return (await res.json()).current_weather ?? null
  } catch { return null }
}

export default async function Home() {
  const [siteData, { mood, books }, weather] = await Promise.all([
    getSiteData(),
    getMoodAndBooks(),
    fetchWeather(),
  ])

  const { bio, photos, games, albums, now, social, quote } = siteData

  return (
    <main
      className="flex flex-col px-3 py-3 md:px-5 md:py-4 lg:px-8 md:h-dvh md:overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <Nav />
      <div className="flex-1 min-h-0">
        <BentoGrid>
          {/* Row 1-2: Hero + Photo */}
          <HeroTile bio={bio} />
          <PhotoTile photos={photos} />

          {/* Row 3: Games + Albums + Now */}
          <GamesTile games={games} />
          <AlbumsTile albums={albums} />
          <NowTile now={now} />

          {/* Row 4: 8 small tiles */}
          <WeatherTile weather={weather} />
          <MoodTile mood={mood} />
          <ThemeToggleTile />
          <AgeCounterTile />
          <VisitorCounterTile />
          <QuoteTile quote={quote} />
          <MapTile />
          <QuickLinksTile />

          {/* Row 5: Reading + Socials */}
          <ReadingTile books={books} />
          <SocialsTile social={{
            instagram: social.instagram,
            linkedin:  social.linkedin,
          }} />
        </BentoGrid>
      </div>
    </main>
  )
}
