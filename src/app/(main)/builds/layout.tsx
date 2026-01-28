import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Epitome Builds - Community Build Planner & Guides',
  description: 'Discover and share the best Epitome Game builds. Use our build planner to create Warrior, Ninja, Shaman, and Necromancer builds. Find skill trees, equipment setups, and stat distributions.',
  keywords: [
    'Epitome Builds', 'Epitome Build Planner', 'Epitome Warrior Build', 'Epitome Ninja Build',
    'Epitome Shaman Build', 'Epitome Necromancer Build', 'Epitome Skill Build',
    'Epitome Game Builds', 'Epitome Best Build', 'Epitome Meta Build'
  ],
  openGraph: {
    title: 'Epitome Builds - Community Build Planner & Guides',
    description: 'Discover and share the best Epitome Game builds. Create and plan your perfect character build.',
  },
}

export default function BuildsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
