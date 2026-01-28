import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://epitomecodex.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Epitome Codex - Epitome Game Wiki, Database & Build Planner',
    template: '%s | Epitome Codex - Epitome Game Wiki',
  },
  description: 'The ultimate Epitome Game wiki, database, and build planner. Find all Epitome items, mobs, classes, interactive map, guides, and community builds. Your complete Epitome MMORPG companion.',
  keywords: [
    'Epitome', 'Epitome Game', 'Epitome MMORPG', 'Epitome Wiki', 'Epitome Database',
    'Epitome Build', 'Epitome Guide', 'Epitome Items', 'Epitome Classes', 'Epitome Map',
    'Epitome Warrior', 'Epitome Ninja', 'Epitome Shaman', 'Epitome Necromancer',
    'Epitome Codex', 'Epitome Build Planner', 'Epitome Mobs', 'Epitome Drops',
    'Epitome Equipment', 'Epitome Skills', 'Epitome Market'
  ],
  authors: [{ name: 'Epitome Codex Community' }],
  creator: 'Epitome Codex',
  publisher: 'Epitome Codex',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Epitome Codex',
    title: 'Epitome Codex - Epitome Game Wiki, Database & Build Planner',
    description: 'The ultimate Epitome Game wiki, database, and build planner. Find all Epitome items, mobs, classes, interactive map, guides, and community builds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Epitome Codex - Epitome Game Wiki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epitome Codex - Epitome Game Wiki, Database & Build Planner',
    description: 'The ultimate Epitome Game wiki, database, and build planner. Your complete Epitome MMORPG companion.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'gaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
