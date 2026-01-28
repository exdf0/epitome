'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Database,
  Map,
  Hammer,
  BookOpen,
  Calculator,
  Users,
} from 'lucide-react'

const navItems = [
  {
    name: 'Items',
    href: '/items',
    icon: Database,
  },
  {
    name: 'Map',
    href: '/map',
    icon: Map,
  },
  {
    name: 'Builds',
    href: '/builds',
    icon: Hammer,
  },
  {
    name: 'Guides',
    href: '/guides',
    icon: BookOpen,
  },
  {
    name: 'Tools',
    href: '/tools',
    icon: Calculator,
  },
  {
    name: 'Classes',
    href: '/classes',
    icon: Users,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-bg-tertiary text-text-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
            )}
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-bg-tertiary text-text-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
            )}
          >
            <Icon className="w-5 h-5" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
