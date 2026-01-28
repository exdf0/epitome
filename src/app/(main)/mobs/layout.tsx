import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Epitome Mob Database - Monsters, Bosses & Spawn Locations',
  description: 'Complete Epitome Game mob database. Find all monsters, mini-bosses, and bosses with stats, drops, spawn locations, and respawn times. Plan your farming routes in Epitome.',
  keywords: [
    'Epitome Mobs', 'Epitome Monsters', 'Epitome Bosses', 'Epitome Mini Boss',
    'Epitome Spawn Locations', 'Epitome Drops', 'Epitome Farming', 'Epitome Game Mobs',
    'Epitome Monster Guide', 'Epitome Boss Guide'
  ],
  openGraph: {
    title: 'Epitome Mob Database - Monsters, Bosses & Spawn Locations',
    description: 'Complete Epitome Game mob database. Find all monsters, bosses with stats, drops, and spawn locations.',
  },
}

export default function MobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
