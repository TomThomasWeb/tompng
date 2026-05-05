export interface Photo {
  id: string
  url: string
  caption: string
  location: string
  display_order: number
}

export interface Game {
  id: string
  display_order: number
  name: string
  dominant_color: string
  note?: string
  image_url?: string
  platform?: string
}

export interface Album {
  id: string
  display_order: number
  title: string
  artist: string
  color_swatch: string
}

export interface NowContent {
  working_on: string
  reading: string
  learning: string
  shooting_with: string
  location?: string
  next_event?: string
}

export type VerdictBadge = 'daily driver' | 'weekend kit' | 'new arrival' | 'in the bag'

export interface GearItem {
  id: string
  display_order: number
  brand: string
  model: string
  verdict_badge: VerdictBadge
  tooltip: string
}

export interface Post {
  id: string
  slug: string
  title: string
  subtitle: string
  body: string
  reading_time: number
  published_at: string
}

export interface MoodContent {
  emoji: string
  status: string
  updated_at?: string
}

export interface BookItem {
  id: string
  title: string
  author: string
  status: 'reading' | 'want' | 'done'
  display_order: number
}

export interface WeatherData {
  temperature: number
  weathercode: number
  windspeed: number
  is_day: number
}

export interface SiteData {
  bio: {
    one_liners: string[]
    short_bio: string
    profile_image?: string
    fun_facts?: string[]
  }
  photos: Photo[]
  games: Game[]
  albums: Album[]
  now: NowContent
  gear: GearItem[]
  freelance: {
    description: string
    services: string[]
    projects_count: number
    available: boolean
  }
  posts: Post[]
  social: {
    instagram: string
    github: string
    linkedin: string
  }
  mood: MoodContent
  books: BookItem[]
  quote: { text: string; author: string }
}
