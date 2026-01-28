import { Metadata } from 'next'
import { Header } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Epitome Interactive Map - World Map with Mobs, NPCs & POIs',
  description: 'Interactive Epitome Game world map. Find mob spawn locations, NPCs, dungeons, resource nodes, and points of interest. Plan your adventure with our detailed map.',
  keywords: [
    'Epitome Map', 'Epitome World Map', 'Epitome Interactive Map', 'Epitome Spawn Locations',
    'Epitome NPC Locations', 'Epitome Dungeon Map', 'Epitome Game Map', 'Epitome POI',
    'Epitome Boss Location', 'Epitome Resource Map'
  ],
  openGraph: {
    title: 'Epitome Interactive Map - World Map with Mobs, NPCs & POIs',
    description: 'Interactive Epitome Game world map. Find mob spawns, NPCs, dungeons, and points of interest.',
  },
}

export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
