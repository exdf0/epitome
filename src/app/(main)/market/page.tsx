'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, Input, Button, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Search, Plus, Eye, MessageCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface TradeListing {
  id: string
  title: string
  description?: string
  itemName: string
  itemType: string
  itemRarity: string
  itemImage?: string
  isGear: boolean
  enhancementLevel: number
  enchantments: Array<{ id: string; name: string; statKey: string; value: number }>
  priceAmount: number
  priceCurrency: string
  status: string
  viewCount: number
  commentsCount: number
  seller: {
    id: string
    name?: string
    username?: string
    image?: string
  }
  createdAt: string
}

const rarityColors: Record<string, string> = {
  COMMON: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  UNCOMMON: 'bg-green-500/20 text-green-400 border-green-500/50',
  RARE: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  EPIC: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  LEGENDARY: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  MYTHIC: 'bg-red-500/20 text-red-400 border-red-500/50',
}

const itemTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'WEAPON', label: 'Weapon' },
  { value: 'HELMET', label: 'Helmet' },
  { value: 'ARMOR', label: 'Armor' },
  { value: 'GLOVES', label: 'Gloves' },
  { value: 'BOOTS', label: 'Boots' },
  { value: 'SHIELD', label: 'Shield' },
  { value: 'EARRING', label: 'Earring' },
  { value: 'NECKLACE', label: 'Necklace' },
  { value: 'ACCESSORY', label: 'Accessory' },
  { value: 'CONSUMABLE', label: 'Consumable' },
  { value: 'MATERIAL', label: 'Material' },
]

const rarities = [
  { value: 'all', label: 'All Rarities' },
  { value: 'COMMON', label: 'Common' },
  { value: 'UNCOMMON', label: 'Uncommon' },
  { value: 'RARE', label: 'Rare' },
  { value: 'EPIC', label: 'Epic' },
  { value: 'LEGENDARY', label: 'Legendary' },
  { value: 'MYTHIC', label: 'Mythic' },
]

const currencies = [
  { value: 'all', label: 'All Currencies' },
  { value: 'ARCHON', label: 'Archon' },
  { value: 'PREMIUM', label: 'Premium' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'most-viewed', label: 'Most Viewed' },
]

export default function MarketPage() {
  const { data: session } = useSession()
  const [listings, setListings] = useState<TradeListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [itemType, setItemType] = useState('all')
  const [rarity, setRarity] = useState('all')
  const [currency, setCurrency] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const limit = 20

  const fetchListings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy,
      })
      if (searchQuery) params.set('search', searchQuery)
      if (itemType !== 'all') params.set('itemType', itemType)
      if (rarity !== 'all') params.set('rarity', rarity)
      if (currency !== 'all') params.set('currency', currency)

      const res = await fetch(`/api/market?${params}`)
      if (res.ok) {
        const data = await res.json()
        setListings(data.listings)
        setTotal(data.total)
        setHasMore(data.hasMore)
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [offset, sortBy, itemType, rarity, currency])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0)
      fetchListings()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const formatPrice = (amount: number, curr: string) => {
    return (
      <span className="flex items-center gap-1">
        <img
          src={`/game-images/currency/${curr.toLowerCase()}.png`}
          alt={curr}
          className="w-4 h-4"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <span className="font-bold">{amount.toLocaleString()}</span>
      </span>
    )
  }

  const startIndex = offset + 1
  const endIndex = Math.min(offset + listings.length, total)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
        <Link href="/" className="hover:text-text-primary">Home</Link>
        <span>&gt;</span>
        <span className="text-text-primary">Trade Market</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Trade Market</h1>
          <p className="text-text-secondary text-sm mt-1">
            Buy and sell items with other players
          </p>
        </div>
        {session && (
          <Link href="/market/create">
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4" />
              Create Listing
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={itemType} onValueChange={(v) => { setItemType(v); setOffset(0) }}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Item Type" />
              </SelectTrigger>
              <SelectContent>
                {itemTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={rarity} onValueChange={(v) => { setRarity(v); setOffset(0) }}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent>
                {rarities.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={currency} onValueChange={(v) => { setCurrency(v); setOffset(0) }}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setOffset(0) }}>
              <SelectTrigger className="w-full md:w-44">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : listings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-text-muted">No listings found</p>
            {session && (
              <Link href="/market/create">
                <Button className="mt-4 gap-2">
                  <Plus className="w-4 h-4" />
                  Create First Listing
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((listing) => (
            <Link key={listing.id} href={`/market/${listing.id}`}>
              <Card className="h-full hover:border-orange-500/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  {/* Item Image */}
                  <div className="relative aspect-square bg-bg-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {listing.itemImage ? (
                      <img
                        src={listing.itemImage}
                        alt={listing.itemName}
                        className="w-3/4 h-3/4 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-bg-secondary rounded-lg flex items-center justify-center">
                        <span className="text-2xl text-text-muted">?</span>
                      </div>
                    )}
                    {/* Enhancement Level */}
                    {listing.isGear && listing.enhancementLevel > 0 && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">
                        +{listing.enhancementLevel}
                      </div>
                    )}
                  </div>

                  {/* Item Info */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-text-primary text-sm line-clamp-1">
                        {listing.itemName}
                      </h3>
                      <Badge className={`text-xs shrink-0 ${rarityColors[listing.itemRarity]}`}>
                        {listing.itemRarity}
                      </Badge>
                    </div>

                    {/* Enchantments Preview */}
                    {listing.enchantments.length > 0 && (
                      <div className="text-xs text-purple-400">
                        +{listing.enchantments.length} enchantment{listing.enchantments.length > 1 ? 's' : ''}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-primary">
                      <div className="text-lg text-orange-400">
                        {formatPrice(listing.priceAmount, listing.priceCurrency)}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {listing.viewCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {listing.commentsCount}
                      </span>
                    </div>

                    {/* Seller */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border-primary">
                      {listing.seller.image ? (
                        <img
                          src={listing.seller.image}
                          alt={listing.seller.username || listing.seller.name || 'Seller'}
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-bg-tertiary flex items-center justify-center">
                          <span className="text-xs">{(listing.seller.username || listing.seller.name || '?')[0]}</span>
                        </div>
                      )}
                      <span className="text-xs text-text-muted truncate">
                        {listing.seller.username || listing.seller.name || 'Anonymous'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-text-muted">
            Showing {startIndex}-{endIndex} of {total.toLocaleString()} listings
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
              disabled={!hasMore}
              onClick={() => setOffset(offset + limit)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
