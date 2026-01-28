'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, Badge, Button, Input } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { BookOpen, Clock, Eye, User, ArrowRight, Plus, Loader2, Search } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Guide {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  isPublished: boolean
  isFeatured: boolean
  viewCount: number
  createdAt: string
  user: {
    id: string
    name?: string
    username?: string
    image?: string
  }
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'CLASS_GUIDE', label: 'Class Guides' },
  { value: 'PVP', label: 'PvP' },
  { value: 'PVE', label: 'PvE' },
  { value: 'CRAFTING', label: 'Crafting' },
  { value: 'ECONOMY', label: 'Economy' },
  { value: 'ADVANCED', label: 'Advanced' },
]

const categoryColors: Record<string, string> = {
  BEGINNER: 'success',
  CLASS_GUIDE: 'primary',
  PVP: 'error',
  PVE: 'warning',
  CRAFTING: 'secondary',
  ECONOMY: 'default',
  ADVANCED: 'epic',
}

const categoryLabels: Record<string, string> = {
  BEGINNER: 'Beginner',
  CLASS_GUIDE: 'Class Guide',
  PVP: 'PvP',
  PVE: 'PvE',
  CRAFTING: 'Crafting',
  ECONOMY: 'Economy',
  ADVANCED: 'Advanced',
}

// Estimate read time based on content length
const estimateReadTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export default function GuidesPage() {
  const { data: session } = useSession()
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchGuides = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      if (searchQuery) params.append('search', searchQuery)

      const response = await fetch(`/api/guides?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setGuides(data)
      }
    } catch (error) {
      console.error('Error fetching guides:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuides()
  }, [categoryFilter])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGuides()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const featuredGuides = guides.filter((g) => g.isFeatured).slice(0, 2)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Guides</h1>
          <p className="text-text-secondary">
            Learn from community-written guides covering all aspects of Epitome.
          </p>
        </div>
        {session && (
          <Link href="/guides/create" className="mt-4 md:mt-0">
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4" />
              Write a Guide
            </Button>
          </Link>
        )}
      </div>

      {/* Featured Guides */}
      {featuredGuides.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredGuides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <Card className="h-full hover:border-accent-primary/50 transition-colors bg-gradient-to-br from-accent-primary/5 to-transparent">
                  <CardContent className="p-6">
                    <Badge variant={categoryColors[guide.category] as any} className="mb-3">
                      {categoryLabels[guide.category] || guide.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {guide.excerpt || guide.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {guide.user?.username || guide.user?.name || 'Anonymous'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {estimateReadTime(guide.content)} min
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {guide.viewCount.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <Card className="mb-6 bg-bg-secondary border-border-primary">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search guides..."
                className="pl-10 bg-bg-tertiary border-border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 bg-bg-tertiary border-border-primary">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted text-lg mb-2">No guides found</p>
          <p className="text-text-secondary mb-6">
            {session ? "Be the first to write a guide!" : "Login to write your first guide!"}
          </p>
          {session && (
            <Link href="/guides/create">
              <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4" />
                Write a Guide
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* All Guides Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              All Guides ({guides.length})
            </h2>
          </div>

          {/* Guides List */}
          <div className="space-y-4">
            {guides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <Card className="hover:border-accent-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={categoryColors[guide.category] as any}>
                            {categoryLabels[guide.category] || guide.category}
                          </Badge>
                          {guide.isFeatured && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-text-secondary mb-3 line-clamp-1">
                          {guide.excerpt || guide.content.substring(0, 150) + '...'}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {guide.user?.username || guide.user?.name || 'Anonymous'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {estimateReadTime(guide.content)} min read
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {guide.viewCount.toLocaleString()} views
                          </span>
                          <span className="text-text-muted">
                            {new Date(guide.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-text-muted shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
