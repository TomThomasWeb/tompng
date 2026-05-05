import type { SiteData } from '@/types'

// ─────────────────────────────────────────────────────────
// Site content — edit here until the admin panel is built.
// Phase 3 will replace these with Supabase DB reads.
// ─────────────────────────────────────────────────────────

export const siteData: SiteData = {
  bio: {
    one_liners: [
      'photographer / web designer / fencer / cat dad',
      'making things on the internet since forever',
      'always got a camera on me',
      'based in congleton, cheshire',
      'team dark mode (mostly)',
      'owned by two cats named zuko and azula',
    ],
    short_bio:
      "Photographer, web designer, and general creative. I work at Alps by day and build things the rest of the time.",
    profile_image: '',
    fun_facts: [
      'Cat dad to Zuko and Azula',
      'Competitive fencer',
      'Learning piano (slowly)',
    ],
  },

  photos: [
    // Replace with real Supabase Storage URLs after first upload
    { id: '1', url: '/photos/photo-1.jpg', caption: 'Caption here', location: 'Cheshire', display_order: 1 },
    { id: '2', url: '/photos/photo-2.jpg', caption: 'Caption here', location: 'Cheshire', display_order: 2 },
    { id: '3', url: '/photos/photo-3.jpg', caption: 'Caption here', location: 'Cheshire', display_order: 3 },
    { id: '4', url: '/photos/photo-4.jpg', caption: 'Caption here', location: 'Peak District', display_order: 4 },
    { id: '5', url: '/photos/photo-5.jpg', caption: 'Caption here', location: 'Congleton', display_order: 5 },
    { id: '6', url: '/photos/photo-6.jpg', caption: 'Caption here', location: 'Cheshire', display_order: 6 },
  ],

  games: [
    // Update with your actual top 5 and their dominant colours
    { id: '1', display_order: 1, name: 'Your Game 1', dominant_color: '#4a7c5f', note: '', platform: 'PC' },
    { id: '2', display_order: 2, name: 'Your Game 2', dominant_color: '#8b3a3a', note: '', platform: 'PS5' },
    { id: '3', display_order: 3, name: 'Your Game 3', dominant_color: '#3a5a8b', note: '', platform: 'PC' },
    { id: '4', display_order: 4, name: 'Your Game 4', dominant_color: '#7a5a2a', note: '', platform: 'Switch' },
    { id: '5', display_order: 5, name: 'Your Game 5', dominant_color: '#5a3a7a', note: '', platform: 'PC' },
    { id: '6', display_order: 6, name: 'Your Game 6', dominant_color: '#3a2a5a', note: '', platform: 'Xbox' },
  ],

  albums: [
    // Update with your actual favourites
    { id: '1', display_order: 1, title: 'Your Favourite Album', artist: 'Artist Name', color_swatch: '#2a1a2a' },
    { id: '2', display_order: 2, title: 'Another Great Album', artist: 'Artist Name', color_swatch: '#1a2a1a' },
    { id: '3', display_order: 3, title: 'One More Classic', artist: 'Artist Name', color_swatch: '#1a1a2a' },
  ],

  now: {
    working_on: 'Alps broker tools + Circle app',
    reading: 'Fractured Healer — Chris Norris',
    learning: 'Piano (slowly)',
    shooting_with: 'DJI Osmo Pocket 3',
    location: 'Congleton, Cheshire',
    next_event: '',
  },

  gear: [
    {
      id: '1',
      display_order: 1,
      brand: 'DJI',
      model: 'Osmo Pocket 3',
      verdict_badge: 'daily driver',
      tooltip: 'Still the best pocket camera ever made.',
    },
    {
      id: '2',
      display_order: 2,
      brand: 'Insta360',
      model: 'Ace Pro 2',
      verdict_badge: 'weekend kit',
      tooltip: 'An action camera that thinks it\'s a cinema camera.',
    },
    {
      id: '3',
      display_order: 3,
      brand: 'Sony',
      model: 'RX100 VII',
      verdict_badge: 'in the bag',
      tooltip: 'The ultimate pocket zoom. No compromises.',
    },
    {
      id: '4',
      display_order: 4,
      brand: 'DJI',
      model: 'Mic 3',
      verdict_badge: 'daily driver',
      tooltip: 'Tiny transmitter, massive audio upgrade.',
    },
    {
      id: '5',
      display_order: 5,
      brand: 'reMarkable',
      model: 'Paper Pro 2',
      verdict_badge: 'daily driver',
      tooltip: 'Changed how I think and plan. Genuinely.',
    },
    {
      id: '6',
      display_order: 6,
      brand: 'Lenovo',
      model: 'Yoga Slim 7i',
      verdict_badge: 'daily driver',
      tooltip: 'The Aura Edition is some of the nicest hardware I\'ve owned.',
    },
    {
      id: '7',
      display_order: 7,
      brand: 'BenQ',
      model: 'PD2705U',
      verdict_badge: 'new arrival',
      tooltip: 'The monitor I should have bought years ago.',
    },
    {
      id: '8',
      display_order: 8,
      brand: 'Anker',
      model: 'Nano 13-in-1',
      verdict_badge: 'new arrival',
      tooltip: 'One cable, everything connected. Satisfying.',
    },
  ],

  freelance: {
    description:
      'Web design, video production, photography, and marketing for small businesses across Cheshire and the North West.',
    services: ['Web Design', 'Video', 'Photography', 'Social Media', 'Marketing'],
    projects_count: 24,
    available: true,
  },

  posts: [
    {
      id: '1',
      slug: 'setting-up-a-home-office',
      title: 'Setting up a home office',
      subtitle: 'NAS, monitors, docks — the rabbit hole',
      body: '',
      reading_time: 4,
      published_at: '2025-04-01',
    },
    {
      id: '2',
      slug: 'six-months-osmo-pocket-3',
      title: 'Six months with the Osmo Pocket 3',
      subtitle: 'Still impressed, genuinely',
      body: '',
      reading_time: 5,
      published_at: '2025-03-01',
    },
    {
      id: '3',
      slug: 'building-circle',
      title: 'Building Circle: solo dev lessons',
      subtitle: 'Firebase, Firestore, and patience',
      body: '',
      reading_time: 6,
      published_at: '2025-02-01',
    },
  ],

  social: {
    instagram: 'https://instagram.com/',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
  },

  mood: {
    emoji: '🎯',
    status: 'Building things',
  },

  books: [
    { id: '1', title: 'Fractured Healer', author: 'Chris Norris', status: 'reading' as const, display_order: 1 },
    { id: '2', title: 'Your Next Book', author: 'Author Name', status: 'want' as const, display_order: 2 },
    { id: '3', title: 'A Finished Read', author: 'Author Name', status: 'done' as const, display_order: 3 },
  ],

  quote: {
    text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese proverb',
  },
}
