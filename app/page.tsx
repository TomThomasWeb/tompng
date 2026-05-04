import { getSiteData } from '@/lib/db'
import { getMoodAndBooks } from '@/lib/db'
import { Nav } from '@/components/Nav'
import { HeroTile } from '@/components/tiles/HeroTile'
import { PhotoTile } from '@/components/tiles/PhotoTile'
import { GamesTile } from '@/components/tiles/GamesTile'
import { AlbumsTile } from '@/components/tiles/AlbumsTile'
import { NowTile } from '@/components/tiles/NowTile'
import { GearTile } from '@/components/tiles/GearTile'
import { FreelanceTile } from '@/components/tiles/FreelanceTile'
import { WeatherTile } from '@/components/tiles/WeatherTile'
import { MoodTile } from '@/components/tiles/MoodTile'
import { ReadingTile } from '@/components/tiles/ReadingTile'
import { ThemeToggleTile } from '@/components/tiles/ThemeToggleTile'
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
    const data = await res.json()
    return data.current_weather ?? null
  } catch {
    return null
  }
}

export default async function Home() {
  const [siteData, { mood, books }, weather] = await Promise.all([
    getSiteData(),
    getMoodAndBooks(),
    fetchWeather(),
  ])

  const { bio, photos, games, albums, now, gear, freelance } = siteData

  return (
    <main
      className="flex flex-col px-4 py-4 md:px-6 md:py-5 lg:px-10 md:h-dvh md:overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <Nav />
      <div className="flex-1 min-h-0">
        <BentoGrid>
          {/* Row 1-2 */}
          <HeroTile bio={bio} />
          <PhotoTile photos={photos} />
          {/* Row 3 */}
          <GamesTile games={games} />
          <AlbumsTile albums={albums} />
          <NowTile now={now} />
          {/* Row 4 */}
          <WeatherTile weather={weather} />
          <MoodTile mood={mood} />
          <ReadingTile books={books} />
          {/* Row 5 */}
          <GearTile gear={gear} />
          <FreelanceTile freelance={freelance} />
          <ThemeToggleTile />
        </BentoGrid>
      </div>
    </main>
  )
}
