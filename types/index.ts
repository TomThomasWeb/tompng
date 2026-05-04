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

export interface SiteData {
  bio: {
    one_liners: string[]
    short_bio: string
    profile_image?: string
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
}
