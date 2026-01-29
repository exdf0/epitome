'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Menu, X, LogIn, LogOut, Shield, Search, ChevronDown, User, Star, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

const navItems = [
  {
    name: 'Database',
    href: '#',
    hasDropdown: true,
    children: [
      { name: 'Items', href: '/items' },
      { name: 'Mobs', href: '/mobs' },
      { name: 'Classes', href: '/classes' },
    ],
  },
  { name: 'Map', href: '/map' },
  { name: 'Planner', href: '/builds/planner' },
  { name: 'Builds', href: '/builds' },
  { name: 'Market', href: '/market' },
  {
    name: 'Guides',
    href: '/guides',
    hasDropdown: true,
    children: [
      { name: 'All Guides', href: '/guides' },
      { name: 'Beginner', href: '/guides?category=BEGINNER' },
      { name: 'Class Guides', href: '/guides?category=CLASS_GUIDE' },
    ],
  },
  {
    name: 'Tools',
    href: '/tools',
    hasDropdown: true,
    children: [
      { name: 'XP Table', href: '/tools/xp-table' },
      { name: 'All Tools', href: '/tools' },
    ],
  },
]

function NavDropdown({ item }: { item: typeof navItems[0] }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!item.hasDropdown) {
    return (
      <Link
        href={item.href}
        className="px-4 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
      >
        {item.name}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
      >
        {item.name}
        <ChevronDown className="w-4 h-4" />
      </Link>

      {isOpen && item.children && (
        <div className="absolute top-full left-0 py-2 bg-bg-secondary border border-border-primary rounded-lg shadow-xl min-w-[180px] z-50 animate-fade-in">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'MODERATOR'

  return (
    <header className="sticky top-0 z-[1000] w-full">
      {/* Unified Header */}
      <div className="border-b border-border-primary bg-[#1a1a1f]">
        <div className="container mx-auto px-4">
          {/* Top Row - Logo + User Actions */}
          <div className="flex items-center justify-between h-12 border-b border-border-primary/30">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">E</span>
              </div>
              <span className="text-lg font-black tracking-tight">
                <span className="text-text-primary">EPITOME</span>{' '}
                <span className="text-orange-500">C</span>
                <span className="text-text-primary">ODEX</span>
              </span>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Top Links */}
              <div className="hidden sm:flex items-center gap-3 text-xs mr-2">
                <a href="https://www.kickstarter.com/projects/epitomestudio/epitome-mmorpg" className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  Buy Game
                </a>
                <a href="https://discord.gg/3rSKhuEuts" className="text-text-muted hover:text-text-primary transition-colors">
                  Discord
                </a>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-border-primary"></div>

              {/* Favorites */}
              <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-bg-tertiary transition-colors">
                <Star className="w-4 h-4 text-text-muted hover:text-text-primary" />
              </button>

              {/* Admin Link */}
              {isAdmin && (
                <Link href="/admin" className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-bg-tertiary transition-colors">
                  <Shield className="w-4 h-4 text-text-muted hover:text-text-primary" />
                </Link>
              )}

              {/* Auth */}
              {status === 'loading' ? (
                <div className="w-8 h-8 rounded-lg bg-bg-tertiary animate-pulse" />
              ) : session ? (
                <div
                  className="relative"
                  onMouseEnter={() => setProfileMenuOpen(true)}
                  onMouseLeave={() => setProfileMenuOpen(false)}
                >
                  <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-bg-tertiary transition-colors border border-border-primary">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-6 h-6 rounded-md"
                      />
                    ) : (
                      <User className="w-4 h-4 text-text-muted" />
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {profileMenuOpen && (
                    <div className="absolute top-full right-0 pt-1 z-50">
                      <div className="py-2 bg-bg-secondary border border-border-primary rounded-lg shadow-xl min-w-[180px] animate-fade-in">
                        <div className="px-3 py-2 border-b border-border-primary">
                          <p className="text-sm font-semibold text-text-primary">{session.user.name}</p>
                          <p className="text-xs text-text-muted">{session.user.email}</p>
                        </div>
                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-red-400 hover:bg-bg-tertiary transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => signIn('discord')}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-border-primary hover:bg-bg-tertiary transition-colors"
                >
                  <User className="w-4 h-4 text-text-muted" />
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-8 w-8 p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Bottom Row - Navigation + Search */}
          <div className="flex items-center justify-between h-10">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {navItems.map((item) => (
                <NavDropdown key={item.name} item={item} />
              ))}
            </nav>

            {/* Search - Far Right */}
            <div className="hidden md:flex items-center relative ml-auto">
              <Search className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 w-48 h-8 bg-bg-tertiary border border-border-primary rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 transition-colors"
              />
              <span className="absolute right-2 text-xs text-text-muted border border-border-secondary rounded px-1.5 py-0.5 font-medium">
                /
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-primary bg-bg-secondary">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 w-full h-10 bg-bg-tertiary border border-border-primary rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50"
              />
            </div>

            {/* Mobile Nav */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-border-primary pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-border-primary">
              {session ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {session.user.image && (
                      <img src={session.user.image} alt="" className="w-8 h-8 rounded-lg" />
                    )}
                    <span className="text-sm text-text-primary font-semibold">{session.user.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => signIn('discord')} className="w-full h-10 text-sm font-semibold">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login with Discord
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
