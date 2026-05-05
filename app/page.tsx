import { getSiteData } from '@/lib/db'
import { getMoodAndBooks } from '@/lib/db'
import { Nav } from '@/components/Nav'
import { HeroTile } from '@/components/tiles/HeroTile'
import { SocialsTile } from '@/components/tiles/SocialsTile'
import { NowTile } from '@/components/tiles/NowTile'
import { ThemeToggleTile } from '@/components/tiles/ThemeToggleTile'
import { WeatherTile } from '@/components/tiles/WeatherTile'
import { MoodTile } from '@/components/tiles/MoodTile'
import { PhotoTile } from '@/components/tiles/PhotoTile'
import { GamesTile } from '@/components/tiles/GamesTile'
import { AlbumsTile } from '@/components/tiles/AlbumsTile'
import { AgeCounterTile } from '@/components/tiles/AgeCounterTile'
import { VisitorCounterTile } from '@/components/tiles/VisitorCounterTile'
import { MapTile } from '@/components/tiles/MapTile'
import { ReadingTile } from '@/components/tiles/ReadingTile'
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

  const { bio, photos, games, albums, now, social } = siteData

  return (
    <main
      className="flex flex-col px-3 py-3 md:px-4 md:py-4 md:h-dvh md:overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <Nav />
      <div className="flex-1 min-h-0">
        <BentoGrid>
          <HeroTile bio={bio} />
          <SocialsTile social={{ instagram: social.instagram, linkedin: social.linkedin }} />
          <NowTile now={now} />
          <ThemeToggleTile />
          <WeatherTile weather={weather} />
          <MoodTile mood={mood} />
          <PhotoTile photos={photos} />
          <GamesTile games={games} />
          <AlbumsTile albums={albums} />
          <AgeCounterTile />
          <VisitorCounterTile />
          <MapTile />
          <ReadingTile books={books} />
        </BentoGrid>
      </div>
    </main>
  )
}
