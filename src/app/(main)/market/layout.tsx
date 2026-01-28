import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Epitome Trade Market - Buy & Sell Items',
  description: 'Epitome Game trade market. Buy and sell items, weapons, armor, and equipment. Find the best deals from the Epitome community. Safe player-to-player trading.',
  keywords: [
    'Epitome Market', 'Epitome Trade', 'Epitome Buy Items', 'Epitome Sell Items',
    'Epitome Trading', 'Epitome Shop', 'Epitome Game Market', 'Epitome Marketplace',
    'Epitome Item Shop', 'Epitome Player Trade'
  ],
  openGraph: {
    title: 'Epitome Trade Market - Buy & Sell Items',
    description: 'Epitome Game trade market. Buy and sell items, weapons, armor, and equipment.',
  },
}

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
