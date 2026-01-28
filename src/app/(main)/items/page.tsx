'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, Input, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Search, Filter, Loader2, Sword, Package } from 'lucide-react'

interface StatValue {
  min: number
  max: number
}

interface Item {
  id: string
  name: string
  slug: string
  description?: string
  type: string
  rarity: string
  level: number
  imageUrl?: string
  stats: Record<string, StatValue>
  requiredLevel?: number
  requiredClass?: string
  isGear: boolean
}

// Item types for filtering
const itemTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'WEAPON', label: 'Weapons' },
  { value: 'HELMET', label: 'Helmets' },
  { value: 'ARMOR', label: 'Armor' },
  { value: 'GLOVES', label: 'Gloves' },
  { value: 'BOOTS', label: 'Boots' },
  { value: 'SHIELD', label: 'Shields' },
  { value: 'EARRING', label: 'Earrings' },
  { value: 'NECKLACE', label: 'Necklaces' },
  { value: 'ACCESSORY', label: 'Accessories' },
  { value: 'CONSUMABLE', label: 'Consumables' },
  { value: 'MATERIAL', label: 'Materials' },
]

const rarities = [
  { value: 'all', label: 'All Rarities' },
  { value: 'COMMON', label: 'Common', color: 'common' },
  { value: 'UNCOMMON', label: 'Uncommon', color: 'uncommon' },
  { value: 'RARE', label: 'Rare', color: 'rare' },
  { value: 'EPIC', label: 'Epic', color: 'epic' },
  { value: 'LEGENDARY', label: 'Legendary', color: 'legendary' },
  { value: 'MYTHIC', label: 'Mythic', color: 'mythic' },
]

function getRarityVariant(rarity: string) {
  const variants: Record<string, 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'> = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary',
    MYTHIC: 'mythic',
  }
  return variants[rarity] || 'common'
}

// Category tabs
const categories = [
  { id: 'gear', label: 'Gear', icon: Sword },
  { id: 'other', label: 'Other Items', icon: Package },
]

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [category, setCategory] = useState<'gear' | 'other'>('gear')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (typeFilter !== 'all') params.append('type', typeFilter)
      if (rarityFilter !== 'all') params.append('rarity', rarityFilter)
      if (searchQuery) params.append('search', searchQuery)
      params.append('isGear', category === 'gear' ? 'true' : 'false')
      params.append('limit', '100')

      const response = await fetch(`/api/items?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [typeFilter, rarityFilter, category])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Item Database</h1>
        <p className="text-text-secondary">
          Browse and search through all items in Epitome. ({items.length} items)
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as 'gear' | 'other')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                category === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="mb-6 bg-bg-secondary border-border-primary">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search items..."
                className="pl-10 bg-bg-tertiary border-border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48 bg-bg-tertiary border-border-primary">
                <SelectValue placeholder="Item Type" />
              </SelectTrigger>
              <SelectContent>
                {itemTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rarity Filter */}
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="w-full md:w-48 bg-bg-tertiary border-border-primary">
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent>
                {rarities.map((rarity) => (
                  <SelectItem key={rarity.value} value={rarity.value}>
                    {rarity.label}
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
      ) : items.length === 0 ? (
        <Card className="p-12 text-center">
          <Filter className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No items found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your filters or search terms.
          </p>
        </Card>
      ) : (
        /* Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link key={item.id} href={`/items/${item.slug}`}>
              <Card className="h-full hover:border-accent-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  {/* Item Image */}
                  <div className="w-full aspect-square bg-bg-tertiary rounded-md mb-3 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.parentElement!.innerHTML = '<div class="w-16 h-16 bg-bg-hover rounded-md"></div>'
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-bg-hover rounded-md" />
                    )}
                  </div>

                  {/* Item Info */}
                  <div className="space-y-2">
                    <h3 className={`font-semibold text-rarity-${getRarityVariant(item.rarity)}`}>
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Badge variant={getRarityVariant(item.rarity)}>
                        {item.rarity}
                      </Badge>
                      <span className="text-sm text-text-secondary">
                        Lv. {item.level}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">
                      {item.type}
                    </p>
                    {/* Stats Preview */}
                    {Object.keys(item.stats || {}).length > 0 && (
                      <div className="text-xs text-text-muted pt-1 border-t border-border-primary">
                        {Object.entries(item.stats).slice(0, 3).map(([key, value]) => {
                          // Handle both old number format and new StatValue format
                          const displayValue = typeof value === 'number'
                            ? `+${value}`
                            : (value as StatValue).min === (value as StatValue).max
                              ? `+${(value as StatValue).min}`
                              : `${(value as StatValue).min}-${(value as StatValue).max}`
                          return (
                            <span key={key} className="mr-2">
                              {key}: {displayValue}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
