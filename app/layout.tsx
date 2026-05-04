import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Tom.PNG',
  description:
    'Photographer, web designer, and general creative based in Congleton, Cheshire.',
  openGraph: {
    title: 'Tom.PNG',
    description: 'Photographer, web designer, and general creative based in Congleton, Cheshire.',
    url: 'https://tompng.co.uk',
    siteName: 'Tom.PNG',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
