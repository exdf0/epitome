'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Sword, Loader2, Sparkles, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'

interface EnhancementMaterial {
  itemId: string
  itemName: string
  quantity: number
}

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
  isGear: boolean
  stats: Record<string, StatValue>
  requiredLevel?: number
  requiredClass?: string
  dropSources?: Array<{
    mobName: string
    dropRate: number
    location?: string
  }>
  enhancementBonuses?: Record<string, Record<string, number>>
  enhancementMaterials?: Record<string, EnhancementMaterial[]>
}

const enhancementLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

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

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedEnhancement, setSelectedEnhancement] = useState(0)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setItem(data)
        } else if (response.status === 404) {
          router.push('/items')
        }
      } catch (error) {
        console.error('Error fetching item:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchItem()
    }
  }, [params.slug, router])

  // Calculate total stats with enhancement bonuses
  const totalStats = useMemo((): Record<string, StatValue> => {
    if (!item) return {}

    // Deep copy base stats
    const base: Record<string, StatValue> = {}
    Object.entries(item.stats || {}).forEach(([stat, value]) => {
      base[stat] = { min: value.min, max: value.max }
    })

    // Add enhancement bonuses up to selected level (adds to both min and max)
    for (let lvl = 1; lvl <= selectedEnhancement; lvl++) {
      const bonuses = item.enhancementBonuses?.[lvl.toString()] || {}
      Object.entries(bonuses).forEach(([stat, bonus]) => {
        if (base[stat]) {
          base[stat].min += bonus
          base[stat].max += bonus
        } else {
          base[stat] = { min: bonus, max: bonus }
        }
      })
    }

    return base
  }, [item, selectedEnhancement])

  // Check if item has enhancement data
  const hasEnhancementData = useMemo(() => {
    if (!item?.isGear) return false
    const hasBonuses = Object.keys(item.enhancementBonuses || {}).length > 0
    const hasMaterials = Object.keys(item.enhancementMaterials || {}).length > 0
    return hasBonuses || hasMaterials
  }, [item])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">Item not found</p>
          <Link href="/items">
            <Button variant="secondary" className="mt-4">
              Back to Items
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/items" className="inline-flex items-center text-text-secondary hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Items
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Item Image */}
                <div className="w-full md:w-48 aspect-square bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-24 h-24 bg-bg-hover rounded-lg"></div>'
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-bg-hover rounded-lg" />
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className={`text-2xl font-bold text-rarity-${getRarityVariant(item.rarity)}`}>
                        {item.name}
                        {item.isGear && selectedEnhancement > 0 && (
                          <span className="text-orange-400 ml-2">+{selectedEnhancement}</span>
                        )}
                      </h1>
                      <p className="text-text-secondary">{item.type}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={getRarityVariant(item.rarity)} className="text-sm">
                        {item.rarity}
                      </Badge>
                      {item.isGear && (
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                          Gear
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Enhancement Level Selector */}
                  {item.isGear && hasEnhancementData && (
                    <div className="mb-4 p-3 bg-bg-tertiary rounded-lg">
                      <label className="text-sm text-text-secondary mb-2 block">Enhancement Level</label>
                      <div className="flex flex-wrap gap-1">
                        {enhancementLevels.map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setSelectedEnhancement(lvl)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                              selectedEnhancement === lvl
                                ? 'bg-orange-500 text-white'
                                : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover'
                            }`}
                          >
                            +{lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.description && (
                    <p className="text-text-secondary mb-4">
                      {item.description}
                    </p>
                  )}

                  {/* Requirements */}
                  <div className="flex flex-wrap gap-2">
                    {item.requiredLevel && (
                      <Badge variant="default">
                        Required Level: {item.requiredLevel}
                      </Badge>
                    )}
                    {item.requiredClass && (
                      <Badge variant="default">
                        Class: {item.requiredClass}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          {Object.keys(totalStats).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-accent-primary" />
                  Item Stats
                  {selectedEnhancement > 0 && (
                    <span className="text-sm font-normal text-orange-400">
                      (+{selectedEnhancement} Enhanced)
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(totalStats).map(([stat, value]) => {
                    const baseValue = item.stats[stat] || { min: 0, max: 0 }
                    const bonusMin = value.min - baseValue.min
                    const bonusMax = value.max - baseValue.max
                    const hasBonus = bonusMin > 0 || bonusMax > 0

                    // Display format: single value or range
                    const displayValue = value.min === value.max
                      ? `+${value.min}`
                      : `${value.min}-${value.max}`

                    // Bonus display
                    const displayBonus = bonusMin === bonusMax
                      ? `+${bonusMin}`
                      : `+${bonusMin}-${bonusMax}`

                    return (
                      <div key={stat} className="bg-bg-tertiary rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-accent-primary">
                          {displayValue}
                          {hasBonus && (
                            <span className="text-sm text-orange-400 ml-1">
                              ({displayBonus})
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-text-secondary uppercase">
                          {stat}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Drop Sources */}
          {item.dropSources && item.dropSources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent-primary" />
                  Drop Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {item.dropSources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-text-primary">{source.mobName}</p>
                        {source.location && (
                          <p className="text-sm text-text-secondary">{source.location}</p>
                        )}
                      </div>
                      <Badge variant="warning">
                        {(source.dropRate * 100).toFixed(1)}% Drop
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Enhancement Materials */}
          {item.isGear && hasEnhancementData && Object.keys(item.enhancementMaterials || {}).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  Enhancement Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancementLevels.filter(lvl => lvl > 0).map((lvl) => {
                    const materials = item.enhancementMaterials?.[lvl.toString()] || []
                    if (materials.length === 0) return null

                    return (
                      <div
                        key={lvl}
                        className={`p-4 rounded-lg border ${
                          selectedEnhancement === lvl - 1
                            ? 'bg-orange-500/10 border-orange-500/50'
                            : 'bg-bg-tertiary border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-text-primary">
                            +{lvl - 1} → +{lvl}
                          </span>
                          {selectedEnhancement === lvl - 1 && (
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                              Next Upgrade
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {materials.map((mat, idx) => (
                            <Link
                              key={idx}
                              href={`/items/${mat.itemId}`}
                              className="flex items-center gap-2 px-3 py-2 bg-bg-secondary rounded-lg hover:bg-bg-hover transition-colors"
                            >
                              <Package className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-primary">{mat.itemName}</span>
                              <span className="text-orange-400 font-medium">x{mat.quantity}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Item Level</span>
                <span className="font-medium text-text-primary">{item.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Type</span>
                <span className="font-medium text-text-primary">{item.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Rarity</span>
                <span className={`font-medium text-rarity-${getRarityVariant(item.rarity)}`}>
                  {item.rarity}
                </span>
              </div>
              {item.requiredLevel && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Required Level</span>
                  <span className="font-medium text-text-primary">{item.requiredLevel}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Link href="/builds/planner">
                <Button className="w-full" variant="secondary">
                  Add to Build
                </Button>
              </Link>
              <Link href="/map">
                <Button className="w-full" variant="outline">
                  View on Map
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
