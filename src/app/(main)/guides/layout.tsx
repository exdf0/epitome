import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Epitome Guides - Beginner to Advanced Game Guides',
  description: 'Comprehensive Epitome Game guides for beginners and advanced players. Learn leveling strategies, boss tactics, farming routes, class guides, and game mechanics.',
  keywords: [
    'Epitome Guide', 'Epitome Beginner Guide', 'Epitome Leveling Guide', 'Epitome Boss Guide',
    'Epitome Farming Guide', 'Epitome Tips', 'Epitome Tricks', 'Epitome Game Guide',
    'Epitome Strategy', 'Epitome Tutorial'
  ],
  openGraph: {
    title: 'Epitome Guides - Beginner to Advanced Game Guides',
    description: 'Comprehensive Epitome Game guides. Learn leveling strategies, boss tactics, and game mechanics.',
  },
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
