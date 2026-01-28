'use client'

import { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Skull, Heart, Swords, Shield, Clock, Sparkles, MapPin, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'

interface Drop {
  itemId: string
  itemName: string
  dropRate: number
  rarity: string
}

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
  drops: Drop[]
  archonDropMin: number
  archonDropMax: number
}

const categoryOptions: Record<string, string> = {
  GENERAL: 'General',
  MINI_BOSS: 'Mini-Boss',
  BOSS: 'Boss',
  TAMEABLE: 'Tameable',
}

const biomeOptions: Record<string, string> = {
  MEADOW: 'Meadow',
  COAST: 'Coast',
  FOREST: 'Forest',
  FOOTHILL: 'Foothill',
  RED: 'Red',
}

const categoryColors: Record<string, string> = {
  GENERAL: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  MINI_BOSS: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
  BOSS: 'bg-red-500/20 text-red-300 border-red-500/50',
  TAMEABLE: 'bg-green-500/20 text-green-300 border-green-500/50',
}

const rarityColors: Record<string, string> = {
  COMMON: 'text-gray-400',
  UNCOMMON: 'text-green-400',
  RARE: 'text-blue-400',
  EPIC: 'text-purple-400',
  LEGENDARY: 'text-orange-400',
  MYTHIC: 'text-red-400',
}

const statIcons: Record<string, any> = {
  hp: Heart,
  attack: Swords,
  defense: Shield,
  magicAttack: Sparkles,
  magicDefense: Shield,
}

const statNames: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  magicAttack: 'Magic Attack',
  magicDefense: 'Magic Defense',
}

function formatRespawnTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${mins}m`
}

export default function MobDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [mob, setMob] = useState<Mob | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchMob = async () => {
      try {
        const response = await fetch(`/api/mobs/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setMob(data)
        } else if (response.status === 404) {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching mob:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchMob()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  if (error || !mob) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/mobs" className="inline-flex items-center text-text-secondary hover:text-text-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Mobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Mob Image */}
                <div className="w-full md:w-48 aspect-square bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                  {mob.imageUrl ? (
                    <img
                      src={mob.imageUrl}
                      alt={mob.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                  ) : null}
                  <Skull className={`w-24 h-24 text-text-muted ${mob.imageUrl ? 'hidden' : ''}`} />
                </div>

                {/* Mob Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-text-primary">
                        {mob.name}
                      </h1>
                      <p className="text-text-secondary">{mob.mobType}</p>
                    </div>
                    <Badge className={categoryColors[mob.category]}>
                      {categoryOptions[mob.category] || mob.category}
                    </Badge>
                  </div>

                  {mob.description && (
                    <p className="text-text-secondary mb-4">
                      {mob.description}
                    </p>
                  )}

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default" className="bg-orange-500/20 text-orange-300 border-orange-500/50">
                      Level {mob.level}
                    </Badge>
                    <Badge variant="default" className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                      {mob.xpReward} XP
                    </Badge>
                    {(mob.archonDropMin > 0 || mob.archonDropMax > 0) && (
                      <Badge variant="default" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50 flex items-center gap-1">
                        <img src="/game-images/currency/archon.png" alt="Archon" className="w-3 h-3" />
                        {mob.archonDropMin === mob.archonDropMax
                          ? mob.archonDropMin
                          : `${mob.archonDropMin}-${mob.archonDropMax}`}
                      </Badge>
                    )}
                    {mob.biome && (
                      <Badge variant="default" className="bg-green-500/20 text-green-300 border-green-500/50">
                        {biomeOptions[mob.biome] || mob.biome}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          {mob.stats && Object.keys(mob.stats).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-accent-primary" />
                  Combat Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(mob.stats).map(([stat, value]) => {
                    const Icon = statIcons[stat] || Swords
                    return (
                      <div key={stat} className="bg-bg-tertiary rounded-lg p-4 text-center">
                        <Icon className="w-6 h-6 mx-auto mb-2 text-accent-primary" />
                        <p className="text-2xl font-bold text-text-primary">
                          {value.toLocaleString()}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {statNames[stat] || stat}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Drops */}
          {mob.drops && mob.drops.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-primary" />
                  Possible Drops ({mob.drops.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mob.drops.map((drop, index) => (
                    <Link
                      key={index}
                      href={`/items/${drop.itemId}`}
                      className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg hover:bg-bg-hover transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-bg-secondary rounded flex items-center justify-center">
                          <Sparkles className={`w-5 h-5 ${rarityColors[drop.rarity] || 'text-text-muted'}`} />
                        </div>
                        <span className={`font-medium ${rarityColors[drop.rarity] || 'text-text-primary'}`}>
                          {drop.itemName}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-bg-secondary text-text-secondary">
                          {drop.rarity}
                        </Badge>
                        <Badge variant="warning">
                          {drop.dropRate}%
                        </Badge>
                      </div>
                    </Link>
                  ))}
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
                <span className="text-text-secondary">Level</span>
                <span className="font-medium text-orange-400">{mob.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">XP Reward</span>
                <span className="font-medium text-blue-400">{mob.xpReward}</span>
              </div>
              {(mob.archonDropMin > 0 || mob.archonDropMax > 0) && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Archon Drop</span>
                  <span className="font-medium text-yellow-400 flex items-center gap-1">
                    <img src="/game-images/currency/archon.png" alt="Archon" className="w-4 h-4" />
                    {mob.archonDropMin === mob.archonDropMax
                      ? mob.archonDropMin
                      : `${mob.archonDropMin}-${mob.archonDropMax}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">Respawn Time</span>
                <span className="font-medium text-text-primary flex items-center gap-1">
                  <Clock className="w-4 h-4 text-text-muted" />
                  {formatRespawnTime(mob.respawnTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Category</span>
                <span className="font-medium text-text-primary">
                  {categoryOptions[mob.category] || mob.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Type</span>
                <span className="font-medium text-text-primary">{mob.mobType}</span>
              </div>
              {mob.biome && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Biome</span>
                  <span className="font-medium text-green-400">
                    {biomeOptions[mob.biome] || mob.biome}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Link href={`/map?mob=${mob.id}`}>
                <Button className="w-full" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
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
