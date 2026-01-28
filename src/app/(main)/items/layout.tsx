import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Epitome Item Database - All Items, Weapons, Armor & Equipment',
  description: 'Complete Epitome Game item database. Browse all weapons, armor, accessories, and consumables. Filter by type, rarity, level, and stats. Find the best gear for your Epitome character.',
  keywords: [
    'Epitome Items', 'Epitome Database', 'Epitome Weapons', 'Epitome Armor',
    'Epitome Equipment', 'Epitome Gear', 'Epitome Game Items', 'Epitome Legendary',
    'Epitome Epic Items', 'Epitome Rare Items'
  ],
  openGraph: {
    title: 'Epitome Item Database - All Items, Weapons, Armor & Equipment',
    description: 'Complete Epitome Game item database. Browse all weapons, armor, accessories, and consumables.',
  },
}

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
