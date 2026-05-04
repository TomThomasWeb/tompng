import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: {
    default: 'Tom.PNG',
    template: '%s — Tom.PNG',
  },
  description: 'Photographer, web designer, and general creative based in Congleton, Cheshire.',
  metadataBase: new URL('https://tompng.co.uk'),
  openGraph: {
    title: 'Tom.PNG',
    description: 'Photographer, web designer, and general creative based in Congleton, Cheshire.',
    url: 'https://tompng.co.uk',
    siteName: 'Tom.PNG',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tom.PNG',
    description: 'Photographer, web designer, and general creative based in Congleton, Cheshire.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tompng.co.uk',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
