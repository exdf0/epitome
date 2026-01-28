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
import { Search, Plus, ThumbsUp, ThumbsDown, Calendar, Trash2, User, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CLASS_IMAGES } from '@/constants/game-data'

interface Build {
  id: string
  title: string
  description?: string
  guide?: string
  class: string
  level: number
  tags: string[]
  statsAllocation: Record<string, number>
  equipment: Record<string, any>
  upvotes: number
  downvotes: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
  userId?: string
  user?: {
    id: string
    name?: string
    username?: string
    image?: string
  }
}

const classColorsFull = {
  WARRIOR: 'bg-red-500/20 text-red-400',
  NINJA: 'bg-green-500/20 text-green-400',
  SHAMAN: 'bg-blue-500/20 text-blue-400',
  NECROMANCER: 'bg-purple-500/20 text-purple-400',
}

export default function BuildsPage() {
  const { data: session } = useSession()
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const fetchBuilds = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (classFilter !== 'all') params.append('class', classFilter)
      if (tagFilter !== 'all') params.append('tag', tagFilter)
      if (searchQuery) params.append('search', searchQuery)
      params.append('sort', sortBy)

      const response = await fetch(`/api/builds?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setBuilds(data.builds)
      }
    } catch (error) {
      console.error('Error fetching builds:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuilds()
  }, [classFilter, tagFilter, sortBy])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBuilds()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleDeleteBuild = async (buildId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (confirm('Are you sure you want to delete this build?')) {
      try {
        const response = await fetch(`/api/builds/${buildId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setBuilds(builds.filter((b) => b.id !== buildId))
        }
      } catch (error) {
        console.error('Error deleting build:', error)
      }
    }
  }

  const userBuildsCount = builds.filter((b) => b.userId === session?.user?.id).length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Community Builds</h1>
          <p className="text-text-secondary">
            Discover and share character builds with the community.
          </p>
        </div>
        {session && (
          <Link href="/builds/planner" className="mt-4 md:mt-0">
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4" />
              Create Build
            </Button>
          </Link>
        )}
      </div>

      {/* User Builds Count */}
      {session && userBuildsCount > 0 && (
        <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
          <p className="text-orange-400">
            You have <span className="font-bold">{userBuildsCount}</span> published build{userBuildsCount !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6 bg-bg-secondary border-border-primary">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search builds..."
                className="pl-10 bg-bg-tertiary border-border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Class Filter */}
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full md:w-48 bg-bg-tertiary border-border-primary">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="WARRIOR">Warrior</SelectItem>
                <SelectItem value="NINJA">Ninja</SelectItem>
                <SelectItem value="SHAMAN">Shaman</SelectItem>
                <SelectItem value="NECROMANCER">Necromancer</SelectItem>
              </SelectContent>
            </Select>

            {/* Tag Filter */}
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-full md:w-48 bg-bg-tertiary border-border-primary">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="PvP">PvP</SelectItem>
                <SelectItem value="PvE">PvE</SelectItem>
                <SelectItem value="1v1">1v1</SelectItem>
                <SelectItem value="Mass War">Mass War</SelectItem>
                <SelectItem value="Leveling">Leveling</SelectItem>
                <SelectItem value="Farming">Farming</SelectItem>
                <SelectItem value="Boss">Boss</SelectItem>
                <SelectItem value="Tank">Tank</SelectItem>
                <SelectItem value="DPS">DPS</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-bg-tertiary border-border-primary">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="level">Highest Level</SelectItem>
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
      ) : builds.length > 0 ? (
        <div className="space-y-4">
          {builds.map((build) => {
            const classImage = CLASS_IMAGES[build.class as keyof typeof CLASS_IMAGES] || CLASS_IMAGES.WARRIOR
            const classColorFull = classColorsFull[build.class as keyof typeof classColorsFull] || classColorsFull.WARRIOR
            const isOwner = session?.user?.id === build.userId

            return (
              <Link key={build.id} href={`/builds/${build.id}`}>
                <Card className="hover:border-orange-500/50 transition-colors bg-bg-secondary border-border-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Class Image */}
                      <div className={`w-12 h-12 rounded-lg ${classColorFull} flex items-center justify-center shrink-0`}>
                        <img
                          src={classImage}
                          alt={build.class}
                          className="w-8 h-8 object-contain"
                        />
                      </div>

                      {/* Build Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-text-primary">
                                {build.title}
                              </h3>
                              {isOwner && (
                                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs">
                                  Your Build
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-muted mb-1">
                              <span>Level {build.level} {build.class}</span>
                              {(build.user?.username || build.user?.name) ? (
                                <>
                                  <span>·</span>
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {build.user.username || build.user.name}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span>·</span>
                                  <span className="text-text-muted italic">Anonymous</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary line-clamp-1">
                              {build.guide?.slice(0, 100) || build.description || 'No description'}
                            </p>
                          </div>

                          {/* Vote Score & Actions */}
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-green-400">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{build.upvotes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-red-400">
                                <ThumbsDown className="w-4 h-4" />
                                <span className="text-sm">{build.downvotes}</span>
                              </div>
                            </div>
                            {isOwner && (
                              <button
                                onClick={(e) => handleDeleteBuild(build.id, e)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-colors"
                                title="Delete build"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Tags & Meta */}
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`${classColorFull}`}>{build.class}</Badge>
                          {build.tags?.slice(0, 3).map((tag) => (
                            <Badge key={tag} className="bg-bg-tertiary text-text-secondary border-border-primary">
                              {tag}
                            </Badge>
                          ))}
                          {build.tags?.length > 3 && (
                            <Badge className="bg-bg-tertiary text-text-muted border-border-primary">
                              +{build.tags.length - 3}
                            </Badge>
                          )}
                          <span className="text-xs text-text-muted flex items-center gap-1 ml-auto">
                            <Calendar className="w-3 h-3" />
                            {new Date(build.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg mb-4">No builds found</p>
          <p className="text-text-secondary mb-6">Be the first to create a build!</p>
          {session && (
            <Link href="/builds/planner">
              <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4" />
                Create Build
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
