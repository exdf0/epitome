import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Epitome Classes Guide - Warrior, Ninja, Shaman & Necromancer',
  description: 'Complete guide to all Epitome Game classes. Learn about Warrior, Ninja, Shaman, and Necromancer skills, stats, playstyles, strengths and weaknesses. Choose the best class for your playstyle.',
  keywords: [
    'Epitome Classes', 'Epitome Warrior', 'Epitome Ninja', 'Epitome Shaman',
    'Epitome Necromancer', 'Epitome Class Guide', 'Epitome Skills', 'Epitome Build',
    'Epitome Game Classes', 'Epitome Class Comparison'
  ],
  openGraph: {
    title: 'Epitome Classes Guide - Warrior, Ninja, Shaman & Necromancer',
    description: 'Complete guide to all Epitome Game classes. Learn about skills, stats, and playstyles.',
  },
}

export default function ClassesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
