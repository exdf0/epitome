'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, Input, Badge, Button } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Search, Filter, Loader2, Skull, ChevronLeft, ChevronRight } from 'lucide-react'

interface Mob {
  id: string
  name: string
  slug: string
  description?: string
  level: number
  xpReward: number
  respawnTime: number
  mobType: string
  category: string
  biome?: string
  imageUrl?: string
  stats: Record<string, number>
  drops: any[]
  archonDropMin: number
  archonDropMax: number
}

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'GENERAL', label: 'General' },
  { value: 'MINI_BOSS', label: 'Mini-Boss' },
  { value: 'BOSS', label: 'Boss' },
  { value: 'TAMEABLE', label: 'Tameable' },
]

const biomeOptions = [
  { value: 'all', label: 'All Biomes' },
  { value: 'MEADOW', label: 'Meadow' },
  { value: 'COAST', label: 'Coast' },
  { value: 'FOREST', label: 'Forest' },
  { value: 'FOOTHILL', label: 'Foothill' },
  { value: 'RED', label: 'Red' },
]

const categoryColors: Record<string, string> = {
  GENERAL: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  MINI_BOSS: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
  BOSS: 'bg-red-500/20 text-red-300 border-red-500/50',
  TAMEABLE: 'bg-green-500/20 text-green-300 border-green-500/50',
}

const biomeColors: Record<string, string> = {
  MEADOW: 'text-green-400',
  COAST: 'text-blue-400',
  FOREST: 'text-emerald-400',
  FOOTHILL: 'text-amber-400',
  RED: 'text-red-400',
}

export default function MobsPage() {
  const [mobs, setMobs] = useState<Mob[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [biomeFilter, setBiomeFilter] = useState('all')
  const [minLevel, setMinLevel] = useState('')
  const [maxLevel, setMaxLevel] = useState('')
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  const fetchMobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      if (searchQuery) params.set('search', searchQuery)
      if (categoryFilter !== 'all') params.set('category', categoryFilter)
      if (biomeFilter !== 'all') params.set('biome', biomeFilter)
      if (minLevel) params.set('minLevel', minLevel)
      if (maxLevel) params.set('maxLevel', maxLevel)

      const response = await fetch(`/api/mobs?${params}`)
      if (response.ok) {
        const data = await response.json()
        setMobs(data.mobs)
        setTotal(data.total)
      }
    } catch (error) {
      console.error('Error fetching mobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMobs()
  }, [offset, categoryFilter, biomeFilter, minLevel, maxLevel])

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0)
      fetchMobs()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleFilterChange = () => {
    setOffset(0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Mobs Database</h1>
        <p className="text-text-secondary">
          Browse and search through all mobs in Epitome. {total > 0 && `(${total} mobs)`}
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  placeholder="Search mobs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); handleFilterChange(); }}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Biome Filter */}
              <Select value={biomeFilter} onValueChange={(v) => { setBiomeFilter(v); handleFilterChange(); }}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Biome" />
                </SelectTrigger>
                <SelectContent>
                  {biomeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level Range */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-text-secondary">Level Range:</span>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  className="w-20"
                  min="1"
                  max="100"
                  value={minLevel}
                  onChange={(e) => { setMinLevel(e.target.value); handleFilterChange(); }}
                />
                <span className="text-text-muted">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="w-20"
                  min="1"
                  max="100"
                  value={maxLevel}
                  onChange={(e) => { setMaxLevel(e.target.value); handleFilterChange(); }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : mobs.length === 0 ? (
        /* Empty State */
        <Card className="p-12 text-center">
          <Skull className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No mobs found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your filters or search terms.
          </p>
        </Card>
      ) : (
        <>
          {/* Mobs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mobs.map((mob) => (
              <Link key={mob.id} href={`/mobs/${mob.slug}`}>
                <Card className="h-full hover:border-accent-primary/50 transition-colors cursor-pointer group">
                  <CardContent className="p-4">
                    {/* Mob Image */}
                    <div className="w-full aspect-square bg-bg-tertiary rounded-md mb-3 flex items-center justify-center overflow-hidden">
                      {mob.imageUrl ? (
                        <img
                          src={mob.imageUrl}
                          alt={mob.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <Skull className={`w-16 h-16 text-text-muted ${mob.imageUrl ? 'hidden' : ''}`} />
                    </div>

                    {/* Mob Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                        {mob.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <Badge className={categoryColors[mob.category]}>
                          {categoryOptions.find((c) => c.value === mob.category)?.label || mob.category}
                        </Badge>
                        <span className="text-sm font-medium text-orange-400">
                          Lv. {mob.level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>{mob.mobType}</span>
                        {mob.biome && (
                          <span className={biomeColors[mob.biome] || 'text-text-muted'}>
                            {biomeOptions.find((b) => b.value === mob.biome)?.label || mob.biome}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-secondary pt-1">
                        <span>{mob.xpReward} XP</span>
                        {(mob.archonDropMin > 0 || mob.archonDropMax > 0) && (
                          <span className="flex items-center gap-1">
                            <img src="/game-images/currency/archon.png" alt="Archon" className="w-3 h-3" />
                            {mob.archonDropMin === mob.archonDropMax
                              ? mob.archonDropMin
                              : `${mob.archonDropMin}-${mob.archonDropMax}`}
                          </span>
                        )}
                        <span>{mob.drops?.length || 0} drops</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-text-muted">
              Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} mobs
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={offset === 0}
                onClick={() => setOffset(Math.max(0, offset - limit))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={offset + limit >= total}
                onClick={() => setOffset(offset + limit)}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
