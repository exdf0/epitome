'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Database,
  Map,
  Hammer,
  BookOpen,
  Users,
  Settings,
  ArrowLeft,
  Sparkles,
  Skull,
  Swords,
} from 'lucide-react'

const adminNavItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Items',
    href: '/admin/items',
    icon: Database,
  },
  {
    name: 'Classes',
    href: '/admin/classes',
    icon: Swords,
  },
  {
    name: 'Mobs',
    href: '/admin/mobs',
    icon: Skull,
  },
  {
    name: 'Enchantments',
    href: '/admin/enchantments',
    icon: Sparkles,
  },
  {
    name: 'Map Markers',
    href: '/admin/map',
    icon: Map,
  },
  {
    name: 'Builds',
    href: '/admin/builds',
    icon: Hammer,
  },
  {
    name: 'Guides',
    href: '/admin/guides',
    icon: BookOpen,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-bg-secondary border-r border-border-primary">
      {/* Header */}
      <div className="p-4 border-b border-border-primary">
        <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Site</span>
        </Link>
        <h1 className="text-xl font-bold text-text-primary mt-4">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
