'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { ArrowLeft, ThumbsUp, ThumbsDown, Share, Check, User, Loader2, ChevronDown } from 'lucide-react'
import { getSkillTree } from '@/data/skillTrees'
import { ItemTooltip } from '@/components/items/item-tooltip'
import { CLASS_IMAGES, SKILL_EVOLUTION, getSkillEvolutionLevel } from '@/constants/game-data'

interface Enchantment {
  id: string
  name: string
  statKey: string
  value: number
}

interface StatValue {
  min: number
  max: number
}

interface Item {
  id: string
  name: string
  type?: string
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC'
  level?: number
  requiredLevel?: number
  requiredClass?: string | null
  stats: Record<string, number | StatValue>
  image: string
  enchantments?: Enchantment[]
  enhancementLevel?: number
}

interface Build {
  id: string
  title: string
  description?: string
  guide?: string
  class: string
  level: number
  tags: string[]
  statsAllocation: Record<string, number>
  equipment: Record<string, Item | null>
  skillPoints?: Record<string, number>
  skillPath?: string
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

const classColors = {
  WARRIOR: 'bg-red-500/20 border-red-500/50 text-red-400',
  NINJA: 'bg-green-500/20 border-green-500/50 text-green-400',
  SHAMAN: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
  NECROMANCER: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
}

const equipmentSlots = {
  leftColumn: [
    { id: 'HELMET', name: 'Helmet', icon: 'helmet.png', scale: 1 },
    { id: 'WEAPON', name: 'Weapon', icon: 'sword.png', scale: 1.3 },
    { id: 'GLOVES', name: 'Bracelet', icon: 'bracelet.png', scale: 1 },
    { id: 'BOOTS', name: 'Boots', icon: 'shoes.png', scale: 1 },
  ],
  rightColumn: [
    { id: 'SHIELD', name: 'Shield', icon: 'shield.png', scale: 1 },
    { id: 'EARRING', name: 'Earring', icon: 'earring.png', scale: 1 },
    { id: 'ARMOR', name: 'Armor', icon: 'armor.png', scale: 1.3 },
    { id: 'NECKLACE', name: 'Necklace', icon: 'necklace.png', scale: 1 },
  ],
}

const stats = [
  { id: 'vig', name: 'Vigor', abbr: 'VIG', icon: '/game-images/stats/Vigor.png' },
  { id: 'int', name: 'Intelligence', abbr: 'INT', icon: '/game-images/stats/Inteligence.png' },
  { id: 'str', name: 'Strength', abbr: 'STR', icon: '/game-images/stats/Strenght.png' },
  { id: 'dex', name: 'Dexterity', abbr: 'DEX', icon: '/game-images/stats/Dex.png' },
]

export default function BuildDetailPage() {
  const params = useParams()
  const [build, setBuild] = useState<Build | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [voting, setVoting] = useState(false)
  const [selectedSkillPath, setSelectedSkillPath] = useState<string>('')
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    const fetchBuild = async () => {
      try {
        const response = await fetch(`/api/builds/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setBuild(data)
          // Set default skill path based on build's class
          const tree = getSkillTree(data.class)
          if (tree && tree.paths.length > 0) {
            setSelectedSkillPath(data.skillPath || tree.paths[0].id)
          }
        }
      } catch (error) {
        console.error('Error fetching build:', error)
      } finally {
        setLoading(false)
      }
    }

    // Fetch user's vote status
    const fetchUserVote = async () => {
      try {
        const response = await fetch(`/api/builds/${params.id}/vote`)
        if (response.ok) {
          const data = await response.json()
          setUserVote(data.userVote)
        }
      } catch (error) {
        console.error('Error fetching user vote:', error)
      }
    }

    fetchBuild()
    fetchUserVote()
  }, [params.id])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleVote = async (type: 'up' | 'down') => {
    if (voting || !build) return
    setVoting(true)

    try {
      const response = await fetch(`/api/builds/${params.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      })

      if (response.ok) {
        const data = await response.json()
        setBuild({
          ...build,
          upvotes: data.upvotes,
          downvotes: data.downvotes,
        })
        setUserVote(data.userVote)
      } else if (response.status === 401) {
        alert('Please login to vote')
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVoting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  if (!build) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Build Not Found</h1>
          <p className="text-text-secondary mb-8">The build you're looking for doesn't exist or has been removed.</p>
          <Link href="/builds">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Builds
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const classImage = CLASS_IMAGES[build.class as keyof typeof CLASS_IMAGES] || CLASS_IMAGES.WARRIOR
  const classColor = classColors[build.class as keyof typeof classColors] || classColors.WARRIOR

  // Helper function to get skill icon based on points
  const getSkillIcon = (baseIcon: string, points: number): string => {
    const level = getSkillEvolutionLevel(points)
    const suffix = SKILL_EVOLUTION.LEVELS[level].suffix
    if (level === 'NONE') {
      return `${baseIcon}_basic.png`
    }
    return `${baseIcon}${suffix}.png`
  }

  // Calculate equipment stats including enchantments (using max values for display)
  const equipment = (build.equipment || {}) as Record<string, Item | null>
  const equipmentStats = Object.values(equipment).reduce(
    (acc, item) => {
      if (item && item.stats) {
        // Add base item stats (handle both old number format and new StatValue format)
        Object.entries(item.stats).forEach(([stat, value]) => {
          const statValue = typeof value === 'number' ? value : (value as StatValue).max
          acc[stat] = (acc[stat] || 0) + statValue
        })
        // Add enchantment stats
        if (item.enchantments) {
          item.enchantments.forEach((ench) => {
            acc[ench.statKey] = (acc[ench.statKey] || 0) + ench.value
          })
        }
      }
      return acc
    },
    {} as Record<string, number>
  )

  // Calculate final stats
  const buildStats = (build.statsAllocation || { vig: 0, int: 0, str: 0, dex: 0 }) as Record<string, number>
  const calculatedStats = {
    HP: 1000 + (buildStats.vig || 0) * 15 + (equipmentStats.hp || 0),
    MP: 500 + (buildStats.int || 0) * 5 + (equipmentStats.mp || 0),
    'Attack Power': 100 + (buildStats.str || 0) * 3 + (equipmentStats.attack || 0),
    'Magic Attack': 100 + (buildStats.int || 0) * 3 + (equipmentStats.magicAttack || 0),
    Defense: 50 + (buildStats.vig || 0) * 1.5 + (equipmentStats.defense || 0),
    'Crit Rate': 5 + Math.floor((buildStats.dex || 0) * 0.2) + (equipmentStats.critRate || 0),
  }

  // Get skill tree for this class
  const currentSkillTree = getSkillTree(build.class)
  const currentPath = currentSkillTree?.paths.find(p => p.id === selectedSkillPath)
  const skillPoints = build.skillPoints || {}
  const totalSkillPoints = Object.values(skillPoints).reduce((a, b) => a + b, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-text-primary">Home</Link>
        <span>&gt;</span>
        <Link href="/builds" className="hover:text-text-primary">Builds</Link>
        <span>&gt;</span>
        <span className="text-text-primary">{build.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Equipment & Class Info */}
        <div className="lg:col-span-3">
          <Card className="bg-bg-secondary border-border-primary">
            <CardContent className="p-3">
              {/* Equipment Slots */}
              <div className="flex items-center justify-center gap-2">
                {/* Left Column Slots */}
                <div className="flex flex-col gap-1.5 items-end">
                  {equipmentSlots.leftColumn.map((slot) => {
                    const item = equipment[slot.id]

                    const slotContent = (
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        {item ? (
                          <>
                            {/* Background - freeslot.png */}
                            <img
                              src="/game-images/equipment/new/freeslot.png"
                              alt="Slot background"
                              className="absolute inset-0 w-full h-full object-contain"
                            />
                            {/* Item image on top */}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="relative w-11 h-11 object-contain z-10"
                              onError={(e) => {
                                e.currentTarget.src = `/game-images/equipment/new/${slot.icon}`
                              }}
                            />
                            {/* Check mark */}
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center z-20">
                              <Check className="w-2 h-2 text-white" />
                            </div>
                          </>
                        ) : (
                          /* Empty slot - show slot icon */
                          <img
                            src={`/game-images/equipment/new/${slot.icon}`}
                            alt={slot.name}
                            className="object-contain opacity-70"
                            style={{ width: `${56 * slot.scale}px`, height: `${56 * slot.scale}px` }}
                          />
                        )}
                      </div>
                    )

                    return item ? (
                      <ItemTooltip key={slot.id} item={{ ...item, type: slot.id }}>
                        {slotContent}
                      </ItemTooltip>
                    ) : (
                      <div key={slot.id} title={slot.name}>
                        {slotContent}
                      </div>
                    )
                  })}
                </div>

                {/* Center Character Silhouette */}
                <div className="flex items-center justify-center">
                  <img
                    src="/game-images/siluet.svg"
                    alt="Character"
                    className="w-24 h-auto object-contain opacity-40"
                    onError={(e) => {
                      e.currentTarget.outerHTML = `
                        <svg viewBox="0 0 100 160" class="w-24 h-auto opacity-40" fill="currentColor">
                          <ellipse cx="50" cy="20" rx="15" ry="18" />
                          <path d="M35 38 L25 80 L35 80 L30 140 L45 140 L50 100 L55 140 L70 140 L65 80 L75 80 L65 38 Z" />
                        </svg>
                      `
                    }}
                  />
                </div>

                {/* Right Column Slots */}
                <div className="flex flex-col gap-1.5 items-start">
                  {equipmentSlots.rightColumn.map((slot) => {
                    const item = equipment[slot.id]

                    const slotContent = (
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        {item ? (
                          <>
                            {/* Background - freeslot.png */}
                            <img
                              src="/game-images/equipment/new/freeslot.png"
                              alt="Slot background"
                              className="absolute inset-0 w-full h-full object-contain"
                            />
                            {/* Item image on top */}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="relative w-11 h-11 object-contain z-10"
                              onError={(e) => {
                                e.currentTarget.src = `/game-images/equipment/new/${slot.icon}`
                              }}
                            />
                            {/* Check mark */}
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center z-20">
                              <Check className="w-2 h-2 text-white" />
                            </div>
                          </>
                        ) : (
                          /* Empty slot - show slot icon */
                          <img
                            src={`/game-images/equipment/new/${slot.icon}`}
                            alt={slot.name}
                            className="object-contain opacity-70"
                            style={{ width: `${56 * slot.scale}px`, height: `${56 * slot.scale}px` }}
                          />
                        )}
                      </div>
                    )

                    return item ? (
                      <ItemTooltip key={slot.id} item={{ ...item, type: slot.id }}>
                        {slotContent}
                      </ItemTooltip>
                    ) : (
                      <div key={slot.id} title={slot.name}>
                        {slotContent}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Class Info */}
              <div className="mt-4">
                <div className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border-2 text-sm ${classColor}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={classImage}
                      alt={build.class}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-semibold">{build.class}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Build Title */}
              <div className="mt-3 px-3 py-2.5 bg-bg-tertiary border border-border-primary rounded-lg">
                <span className="text-sm text-text-primary font-semibold">{build.title}</span>
              </div>

              {/* Level */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-text-secondary text-sm">Level:</span>
                <span className="font-mono text-text-primary text-lg font-bold">{build.level}</span>
              </div>

              {/* Author */}
              {(build.user?.username || build.user?.name) && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Author:</span>
                  <span className="text-text-primary text-sm flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {build.user.username || build.user.name}
                  </span>
                </div>
              )}

              {/* Equipment Stats Summary */}
              {Object.keys(equipmentStats).length > 0 && (
                <div className="mt-4 p-3 bg-bg-tertiary rounded-lg">
                  <h4 className="text-xs font-semibold text-text-secondary mb-2">Equipment Bonus</h4>
                  <div className="space-y-0.5">
                    {Object.entries(equipmentStats).map(([stat, value]) => (
                      <div key={stat} className="flex items-center gap-1 text-xs">
                        <span className="text-text-muted">
                          {stat.charAt(0).toUpperCase() + stat.slice(1).replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <span className="text-green-400">+{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-9">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full bg-transparent border-b-2 border-border-primary rounded-none justify-start gap-0 h-auto p-0">
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-8 py-4 text-lg text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Details
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-8 py-4 text-lg text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Stats
              </TabsTrigger>
              <TabsTrigger value="skills" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-8 py-4 text-lg text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Skill Tree
              </TabsTrigger>
              <TabsTrigger value="guide" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-8 py-4 text-lg text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Guide
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-8">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
                {build.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {build.tags?.map((tag) => (
                  <Badge key={tag} className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Vote & Share */}
              <div className="flex items-center gap-3 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote('up')}
                  disabled={voting}
                  className={`gap-2 ${userVote === 'up' ? 'bg-green-500/20 border-green-500' : ''}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${userVote === 'up' ? 'text-green-400 fill-green-400' : 'text-green-400'}`} />
                  <span>{build.upvotes}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote('down')}
                  disabled={voting}
                  className={`gap-2 ${userVote === 'down' ? 'bg-red-500/20 border-red-500' : ''}`}
                >
                  <ThumbsDown className={`w-4 h-4 ${userVote === 'down' ? 'text-red-400 fill-red-400' : 'text-red-400'}`} />
                  <span>{build.downvotes}</span>
                </Button>
                <Button variant="outline" onClick={handleShare} className="gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Share className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Share'}
                </Button>
              </div>

              {/* Description */}
              <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
                <p>{build.description || 'No description provided.'}</p>
              </div>

              {/* Meta Info */}
              <div className="mt-8 text-sm text-text-muted">
                Created: {new Date(build.createdAt).toLocaleDateString()}
                {build.updatedAt !== build.createdAt && (
                  <> | Updated: {new Date(build.updatedAt).toLocaleDateString()}</>
                )}
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Stat Points */}
                <Card className="bg-bg-secondary border-border-primary">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl">Stat Points</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 pt-0">
                    <div className="flex justify-between text-lg p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary">Total Points:</span>
                      <span className="text-orange-500 font-bold text-xl">
                        {Object.values(buildStats).reduce((a, b) => a + b, 0)} / {build.level * 5}
                      </span>
                    </div>

                    {stats.map((stat) => (
                      <div key={stat.id} className="flex items-center justify-between p-4 bg-bg-tertiary rounded-xl">
                        <div className="flex items-center gap-3">
                          <img
                            src={stat.icon}
                            alt={stat.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                          <div>
                            <span className="font-bold text-text-primary text-lg">{stat.abbr}</span>
                            <span className="text-text-muted text-base ml-2">({stat.name})</span>
                          </div>
                        </div>
                        <span className="font-mono text-text-primary text-xl font-bold">
                          {buildStats[stat.id] || 0}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Calculated Stats */}
                <Card className="bg-bg-secondary border-border-primary">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl">Calculated Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-6 pt-0">
                    {Object.entries(calculatedStats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between p-4 bg-bg-tertiary rounded-xl">
                        <span className="text-text-secondary text-lg">{stat}</span>
                        <span className="text-text-primary font-semibold text-lg">
                          {stat === 'Crit Rate' ? `${value}%` : Math.floor(value)}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Build Tags */}
              <Card className="bg-bg-secondary border-border-primary mt-8">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl">Build Tags</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-wrap gap-3">
                    {build.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-5 py-2.5 rounded-lg text-base font-medium bg-orange-500 text-white"
                      >
                        {tag}
                      </span>
                    ))}
                    {(!build.tags || build.tags.length === 0) && (
                      <span className="text-text-muted">No tags selected</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-8">
              <Card className="bg-bg-secondary border-border-primary">
                <CardHeader className="p-6 flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Skill Tree - {build.class}</CardTitle>
                  <span className="text-sm text-text-muted">
                    Total Points: <span className="text-orange-500 font-bold">{totalSkillPoints}</span>
                  </span>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {currentSkillTree && currentSkillTree.paths.length > 0 ? (
                    <>
                      {/* Skill Path Selection */}
                      <div className="flex gap-3 mb-6">
                        {currentSkillTree.paths.map((path) => (
                          <button
                            key={path.id}
                            onClick={() => setSelectedSkillPath(path.id)}
                            className={`flex-1 px-6 py-4 rounded-xl border-2 font-semibold text-lg transition-all ${
                              selectedSkillPath === path.id
                                ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                                : 'bg-bg-tertiary border-border-primary text-text-secondary hover:border-border-secondary'
                            }`}
                          >
                            {path.name}
                          </button>
                        ))}
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentPath?.skills.map((skill) => {
                          const points = skillPoints[skill.id] || 0
                          const evolutionLevel = getSkillEvolutionLevel(points)
                          const evolutionInfo = SKILL_EVOLUTION.LEVELS[evolutionLevel]
                          const skillIcon = getSkillIcon(skill.baseIcon, points)

                          // Evolution level colors
                          const evolutionColors: Record<string, string> = {
                            NONE: 'text-text-muted',
                            BASIC: 'text-green-400',
                            DEVELOPED: 'text-blue-400',
                            MASTER: 'text-purple-400',
                            PERFECT: 'text-orange-400',
                          }

                          // Evolution level border colors
                          const borderColors: Record<string, string> = {
                            NONE: 'border-border-primary',
                            BASIC: 'border-green-500',
                            DEVELOPED: 'border-blue-500',
                            MASTER: 'border-purple-500',
                            PERFECT: 'border-orange-500',
                          }

                          // Evolution level card background colors
                          const cardBgColors: Record<string, string> = {
                            NONE: 'bg-bg-tertiary border-border-primary',
                            BASIC: 'bg-green-500/10 border-green-500/50',
                            DEVELOPED: 'bg-blue-500/10 border-blue-500/50',
                            MASTER: 'bg-purple-500/10 border-purple-500/50',
                            PERFECT: 'bg-orange-500/10 border-orange-500/50',
                          }

                          return (
                            <div
                              key={skill.id}
                              className={`p-4 rounded-xl border-2 transition-all ${cardBgColors[evolutionLevel]}`}
                            >
                              <div className="flex items-start gap-4">
                                {/* Skill Icon */}
                                <div className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 ${borderColors[evolutionLevel]}`}>
                                  <img
                                    src={skillIcon}
                                    alt={skill.name}
                                    className={`w-full h-full object-cover ${points === 0 ? 'grayscale opacity-50' : ''}`}
                                    onError={(e) => {
                                      e.currentTarget.src = '/game-images/placeholder.png'
                                    }}
                                  />
                                </div>

                                {/* Skill Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-text-primary truncate">{skill.name}</h4>
                                    {points > 0 && (
                                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${evolutionColors[evolutionLevel]} bg-bg-tertiary`}>
                                        {evolutionInfo.label}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-orange-400 mb-1">{skill.abilityType}</p>
                                  <p className="text-xs text-text-muted line-clamp-2 cursor-help" title={skill.description}>{skill.description}</p>
                                </div>
                              </div>

                              {/* Point Display */}
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-primary">
                                <span className={`font-mono font-bold ${evolutionColors[evolutionLevel]}`}>
                                  {points}/{skill.maxPoints} points
                                </span>

                                {/* Progress Bar with evolution segments */}
                                <div className="flex-1 ml-4 h-2 bg-bg-primary rounded-full overflow-hidden relative">
                                  {/* Evolution thresholds markers */}
                                  <div className="absolute inset-0 flex">
                                    <div className="w-[31%] border-r border-bg-secondary/50" />
                                    <div className="w-[22%] border-r border-bg-secondary/50" />
                                    <div className="w-[22%] border-r border-bg-secondary/50" />
                                    <div className="flex-1" />
                                  </div>
                                  <div
                                    className={`h-full transition-all ${
                                      evolutionLevel === 'PERFECT' ? 'bg-orange-500' :
                                      evolutionLevel === 'MASTER' ? 'bg-purple-500' :
                                      evolutionLevel === 'DEVELOPED' ? 'bg-blue-500' :
                                      evolutionLevel === 'BASIC' ? 'bg-green-500' : 'bg-gray-500'
                                    }`}
                                    style={{ width: `${(points / skill.maxPoints) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="min-h-[400px] bg-bg-tertiary rounded-xl flex items-center justify-center">
                      <p className="text-text-muted text-lg">Skill tree for {build.class} coming soon...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guide Tab */}
            <TabsContent value="guide" className="mt-8">
              <Card className="bg-bg-secondary border-border-primary">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl">Build Guide</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {build.guide ? (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-text-secondary whitespace-pre-wrap text-lg leading-relaxed">{build.guide}</p>
                    </div>
                  ) : (
                    <div className="min-h-[200px] bg-bg-tertiary rounded-xl flex items-center justify-center">
                      <p className="text-text-muted text-lg">No guide provided for this build.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
