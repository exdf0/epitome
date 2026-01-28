'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Input, Button, Badge } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { Save, Share, RotateCcw, Plus, Minus, ChevronDown, Check, Copy, Link, Sparkles } from 'lucide-react'
import { EquipmentModal, type Item } from '@/components/planner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getSkillTree } from '@/data/skillTrees'
import { ItemTooltip } from '@/components/items/item-tooltip'
import { CLASS_IMAGES, SKILL_EVOLUTION, getSkillEvolutionLevel } from '@/constants/game-data'

const classes = [
  { value: 'WARRIOR', label: 'Warrior', image: CLASS_IMAGES.WARRIOR, color: 'bg-red-500/20 border-red-500/50 text-red-400' },
  { value: 'NINJA', label: 'Ninja', image: CLASS_IMAGES.NINJA, color: 'bg-green-500/20 border-green-500/50 text-green-400' },
  { value: 'SHAMAN', label: 'Shaman', image: CLASS_IMAGES.SHAMAN, color: 'bg-blue-500/20 border-blue-500/50 text-blue-400' },
  { value: 'NECROMANCER', label: 'Necromancer', image: CLASS_IMAGES.NECROMANCER, color: 'bg-purple-500/20 border-purple-500/50 text-purple-400' },
]

// Helper function to get skill icon based on points
const getSkillIcon = (baseIcon: string, points: number): string => {
  const level = getSkillEvolutionLevel(points)
  const suffix = SKILL_EVOLUTION.LEVELS[level].suffix

  // If no points, return basic version (will be displayed grayed out)
  if (level === 'NONE') {
    return `${baseIcon}_basic.png`
  }

  return `${baseIcon}${suffix}.png`
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

const availableTags = ['PvP', 'PvE', '1v1', 'Mass War', 'Leveling', 'Farming', 'Boss', 'Tank', 'DPS', 'Support']

// API helper functions
const saveBuildToAPI = async (buildData: {
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
  isPublished: boolean
  id?: string
}) => {
  const url = buildData.id ? `/api/builds/${buildData.id}` : '/api/builds'
  const method = buildData.id ? 'PUT' : 'POST'

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildData),
  })

  if (!response.ok) {
    throw new Error('Failed to save build')
  }

  return response.json()
}


export default function BuildPlannerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?callbackUrl=/builds/planner')
    }
  }, [status, router])
  const [selectedClass, setSelectedClass] = useState<string>('WARRIOR')
  const [buildName, setBuildName] = useState('')
  const [level, setLevel] = useState(10)
  const [isPublic, setIsPublic] = useState(true)
  const [statPoints, setStatPoints] = useState({
    vig: 0,
    int: 0,
    str: 0,
    dex: 0,
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [guide, setGuide] = useState('')

  const [equipment, setEquipment] = useState<Record<string, Item | null>>({
    HELMET: null,
    WEAPON: null,
    GLOVES: null,
    BOOTS: null,
    SHIELD: null,
    EARRING: null,
    ARMOR: null,
    NECKLACE: null,
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ id: string; name: string } | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null)

  // Skill Tree State
  const [selectedSkillPath, setSelectedSkillPath] = useState<string>('path_of_body')
  const [skillPoints, setSkillPoints] = useState<Record<string, number>>({})
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // Get current class skill tree
  const currentSkillTree = getSkillTree(selectedClass)
  const currentPath = currentSkillTree?.paths.find(p => p.id === selectedSkillPath)
  const totalSkillPoints = Object.values(skillPoints).reduce((a, b) => a + b, 0)
  const maxTotalSkillPoints = 270 // 6 skills * 45 max points each (evolution system)

  // Reset skill points when class changes
  useEffect(() => {
    setSkillPoints({})
    const tree = getSkillTree(selectedClass)
    if (tree && tree.paths.length > 0) {
      setSelectedSkillPath(tree.paths[0].id)
    }
  }, [selectedClass])

  const totalPoints = level * 5
  const totalAllocated = Object.values(statPoints).reduce((a, b) => a + b, 0)
  const remainingPoints = totalPoints - totalAllocated

  // Stat adjustment - now 1 by 1
  const adjustStat = (stat: keyof typeof statPoints, delta: number) => {
    const newValue = statPoints[stat] + delta
    if (newValue >= 0 && totalAllocated + delta <= totalPoints) {
      setStatPoints((prev) => ({ ...prev, [stat]: newValue }))
    }
  }

  const resetStats = () => {
    setStatPoints({ vig: 0, int: 0, str: 0, dex: 0 })
  }

  const adjustLevel = (delta: number) => {
    const newLevel = level + delta
    if (newLevel >= 1 && newLevel <= 20) {
      setLevel(newLevel)
    }
  }

  // Tag toggle
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const openEquipmentModal = (slotId: string, slotName: string) => {
    setSelectedSlot({ id: slotId, name: slotName })
    setModalOpen(true)
  }

  const handleSelectItem = (item: Item | null) => {
    if (selectedSlot) {
      setEquipment((prev) => ({ ...prev, [selectedSlot.id]: item }))
    }
  }

  // Calculate equipment stats including enchantments (using max values for display)
  const equipmentStats = Object.values(equipment).reduce(
    (acc, item) => {
      if (item) {
        // Add base item stats (use max value for calculations)
        Object.entries(item.stats).forEach(([stat, value]) => {
          // Handle both old format (number) and new format (StatValue with min/max)
          const statValue = typeof value === 'number' ? value : (value as { min: number; max: number }).max
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

  // Calculate enchantment stats separately for display
  const enchantmentStats = Object.values(equipment).reduce(
    (acc, item) => {
      if (item?.enchantments) {
        item.enchantments.forEach((ench) => {
          acc[ench.statKey] = (acc[ench.statKey] || 0) + ench.value
        })
      }
      return acc
    },
    {} as Record<string, number>
  )

  // Skill point adjustment (max 45 with evolution system)
  const adjustSkillPoint = (skillId: string, delta: number) => {
    const currentPoints = skillPoints[skillId] || 0
    const newValue = currentPoints + delta
    if (newValue >= 0 && newValue <= SKILL_EVOLUTION.MAX_POINTS) {
      setSkillPoints((prev) => ({ ...prev, [skillId]: newValue }))
    }
  }

  const resetSkillPoints = () => {
    setSkillPoints({})
  }

  const handleSaveBuild = async () => {
    if (!buildName.trim()) {
      alert('Please enter a build name')
      return
    }

    setSaveStatus('saving')

    try {
      const savedBuild = await saveBuildToAPI({
        id: currentBuildId || undefined,
        title: buildName,
        class: selectedClass,
        level,
        isPublished: isPublic,
        statsAllocation: statPoints,
        equipment,
        skillPoints,
        skillPath: selectedSkillPath,
        tags: selectedTags,
        guide,
      })

      setCurrentBuildId(savedBuild.id)

      const url = `${window.location.origin}/builds/${savedBuild.id}`
      setShareUrl(url)

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      console.error('Error saving build:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const handleShare = async () => {
    let url = shareUrl

    if (!url) {
      // Save first if not saved
      if (!currentBuildId) {
        await handleSaveBuild()
        return
      }
      url = `${window.location.origin}/builds/${currentBuildId}`
      setShareUrl(url)
    }

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

  const selectedClassData = classes.find((c) => c.value === selectedClass)

  const renderEquipmentSlot = (slot: { id: string; name: string; icon: string; scale: number }) => {
    const equippedItem = equipment[slot.id]

    const slotButton = (
      <button
        onClick={() => openEquipmentModal(slot.id, slot.name)}
        className="relative w-14 h-14 transition-all hover:scale-105 hover:cursor-pointer flex items-center justify-center"
      >
        {equippedItem ? (
          <>
            {/* Background - freeslot.png */}
            <img
              src="/game-images/equipment/new/freeslot.png"
              alt="Slot background"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Item image on top */}
            <img
              src={equippedItem.image}
              alt={equippedItem.name}
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
            className="object-contain opacity-70 hover:opacity-100 transition-opacity"
            style={{ width: `${56 * slot.scale}px`, height: `${56 * slot.scale}px` }}
          />
        )}
      </button>
    )

    return equippedItem ? (
      <ItemTooltip key={slot.id} item={{ ...equippedItem, type: slot.id }}>
        {slotButton}
      </ItemTooltip>
    ) : (
      <div key={slot.id} title={slot.name}>
        {slotButton}
      </div>
    )
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-text-primary">Planner</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <Card className="bg-bg-secondary border-border-primary">
            <CardContent className="p-3">
              <div className="flex items-center justify-center gap-2">
                <div className="flex flex-col gap-1.5 items-end">
                  {equipmentSlots.leftColumn.map((slot) => renderEquipmentSlot(slot))}
                </div>

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

                <div className="flex flex-col gap-1.5 items-start">
                  {equipmentSlots.rightColumn.map((slot) => renderEquipmentSlot(slot))}
                </div>
              </div>

              <div className="mt-4">
                <button
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border-2 text-sm ${selectedClassData?.color} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    {selectedClassData && (
                      <img
                        src={selectedClassData.image}
                        alt={selectedClassData.label}
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    <span className="font-semibold">{selectedClassData?.label || 'Select Class'}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3">
                <Input
                  placeholder="Build Name"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  className="bg-bg-tertiary border-border-primary h-10 text-sm px-3"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-text-secondary text-sm">Level:</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => adjustLevel(-1)} disabled={level <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-mono text-text-primary text-lg font-bold">{level}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => adjustLevel(1)} disabled={level >= 20}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-text-secondary text-sm">Public:</span>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`w-11 h-6 rounded-full transition-colors ${isPublic ? 'bg-orange-500' : 'bg-bg-tertiary border border-border-primary'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${isPublic ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Build Tags */}
              <div className="mt-4">
                <span className="text-text-secondary text-sm block mb-2">Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-bg-hover'
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>

              {Object.keys(equipmentStats).length > 0 && (
                <div className="mt-4 p-3 bg-bg-tertiary rounded-lg">
                  <h4 className="text-xs font-semibold text-text-secondary mb-2">Equipment Bonus</h4>
                  <div className="space-y-0.5">
                    {Object.entries(equipmentStats).map(([stat, value]) => {
                      const enchValue = enchantmentStats[stat] || 0
                      const baseValue = value - enchValue
                      return (
                        <div key={stat} className="flex items-center gap-1 text-xs">
                          <span className="text-text-muted">{stat.charAt(0).toUpperCase() + stat.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-green-400">+{baseValue}</span>
                          {enchValue > 0 && (
                            <span className="text-purple-400">(+{enchValue})</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {Object.keys(enchantmentStats).length > 0 && (
                    <p className="text-xs text-purple-400 mt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Purple = enchantments
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-9">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full bg-transparent border-b border-border-primary rounded-none justify-start gap-0 h-auto p-0">
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-4 py-2 text-sm text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Details
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-4 py-2 text-sm text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Stats
              </TabsTrigger>
              <TabsTrigger value="skills" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-4 py-2 text-sm text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Skill Tree
              </TabsTrigger>
              <TabsTrigger value="guide" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-4 py-2 text-sm text-text-secondary data-[state=active]:text-text-primary font-semibold">
                Guide
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
                Epitome Character Planner
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {classes.map((cls) => {
                  const isSelected = selectedClass === cls.value
                  return (
                    <button
                      key={cls.value}
                      onClick={() => setSelectedClass(cls.value)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all ${
                        isSelected ? cls.color + ' ring-2 ring-offset-2 ring-offset-bg-primary' : 'bg-bg-secondary border-border-primary hover:border-border-secondary'
                      }`}
                    >
                      <img
                        src={cls.image}
                        alt={cls.label}
                        className={`w-10 h-10 object-contain ${isSelected ? '' : 'opacity-50 grayscale'}`}
                      />
                      <span className={`font-semibold text-lg ${isSelected ? '' : 'text-text-secondary'}`}>{cls.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
                <p>Our interactive character planner allows you to choose your gear and skill trees, and calculates stats based on your choices.</p>
                <p>Make sure to write a description or guide. If you plan to share this build, make sure this is as detailed as possible.</p>
              </div>

              {shareUrl && (
                <div className="mt-6 p-4 bg-bg-tertiary rounded-xl">
                  <div className="flex items-center gap-3">
                    <Link className="w-5 h-5 text-orange-500" />
                    <span className="text-text-secondary text-sm">Share URL:</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="text" readOnly value={shareUrl} className="flex-1 bg-bg-secondary border border-border-primary rounded-lg px-4 py-2 text-text-primary text-sm" />
                    <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-10">
                <Button onClick={handleSaveBuild} disabled={saveStatus === 'saving'} className="gap-3 bg-orange-500 hover:bg-orange-600 h-14 px-8 text-lg font-semibold disabled:opacity-50">
                  {saveStatus === 'saving' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : saveStatus === 'saved' ? (
                    <>
                      <Check className="w-5 h-5" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Build
                    </>
                  )}
                </Button>
                <Button variant="secondary" onClick={handleShare} className="gap-3 h-14 px-8 text-lg font-semibold">
                  {copied ? <Check className="w-5 h-5" /> : <Share className="w-5 h-5" />}
                  {copied ? 'Link Copied!' : 'Share'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-bg-secondary border-border-primary">
                  <CardHeader className="flex flex-row items-center justify-between p-6">
                    <CardTitle className="text-xl">Stat Points</CardTitle>
                    <Button variant="ghost" size="sm" onClick={resetStats} className="gap-2 text-base">
                      <RotateCcw className="w-5 h-5" />
                      Reset
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 pt-0">
                    <div className="flex justify-between text-lg p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary">Remaining Points:</span>
                      <span className="text-orange-500 font-bold text-xl">{remainingPoints}</span>
                    </div>

                    {stats.map((stat) => (
                      <div key={stat.id} className="flex items-center justify-between gap-4 p-4 bg-bg-tertiary rounded-xl">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={stat.icon}
                            alt={stat.name}
                            className="w-8 h-8 object-contain flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-text-primary text-lg">{stat.abbr}</span>
                            <span className="text-text-muted text-sm ml-1 hidden sm:inline">({stat.name})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => adjustStat(stat.id as keyof typeof statPoints, -1)}
                            disabled={statPoints[stat.id as keyof typeof statPoints] < 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-mono text-text-primary text-lg font-bold">
                            {statPoints[stat.id as keyof typeof statPoints]}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => adjustStat(stat.id as keyof typeof statPoints, 1)}
                            disabled={remainingPoints < 1}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-bg-secondary border-border-primary">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl">Calculated Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-6 pt-0">
                    <div className="flex justify-between p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary text-lg">HP</span>
                      <span className="text-text-primary font-semibold text-lg">{1000 + statPoints.vig * 15 + (equipmentStats.hp || 0)}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary text-lg">MP</span>
                      <span className="text-text-primary font-semibold text-lg">{500 + statPoints.int * 5 + (equipmentStats.mp || 0)}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary text-lg">Attack Power</span>
                      <span className="text-text-primary font-semibold text-lg">{100 + statPoints.str * 3 + (equipmentStats.attack || 0)}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary text-lg">Magic Attack</span>
                      <span className="text-text-primary font-semibold text-lg">{100 + statPoints.int * 3 + (equipmentStats.magicAttack || 0)}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary text-lg">Defense</span>
                      <span className="text-text-primary font-semibold text-lg">{50 + statPoints.vig * 1.5 + (equipmentStats.defense || 0)}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-bg-tertiary rounded-xl">
                      <span className="text-text-secondary text-lg">Crit Rate</span>
                      <span className="text-text-primary font-semibold text-lg">{5 + Math.floor(statPoints.dex * 0.2) + (equipmentStats.critRate || 0)}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </TabsContent>

            <TabsContent value="skills" className="mt-8">
              <Card className="bg-bg-secondary border-border-primary">
                <CardHeader className="p-6 flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Skill Tree - {selectedClassData?.label}</CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-muted">
                      Total Points: <span className="text-orange-500 font-bold">{totalSkillPoints}</span> / {maxTotalSkillPoints}
                    </span>
                    <Button variant="ghost" size="sm" onClick={resetSkillPoints} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {/* Skill Path Selection */}
                  {currentSkillTree && currentSkillTree.paths.length > 0 ? (
                    <>
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
                          const isMaxed = points >= skill.maxPoints
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
                              className={`p-4 rounded-xl border-2 transition-all relative ${cardBgColors[evolutionLevel]}`}
                              onMouseEnter={() => setHoveredSkill(skill.id)}
                              onMouseLeave={() => setHoveredSkill(null)}
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
                                  <p className="text-xs text-text-muted line-clamp-2" title={skill.description}>{skill.description}</p>
                                </div>
                              </div>

                              {/* Full description tooltip on hover */}
                              {hoveredSkill === skill.id && skill.description.length > 80 && (
                                <div className="absolute left-0 right-0 top-full mt-1 z-50 p-3 bg-bg-secondary border border-border-primary rounded-lg shadow-xl">
                                  <p className="text-xs text-text-muted">{skill.description}</p>
                                </div>
                              )}

                              {/* Point Allocation */}
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-primary">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => adjustSkillPoint(skill.id, -1)}
                                    disabled={points <= 0}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className={`w-14 text-center font-mono font-bold ${evolutionColors[evolutionLevel]}`}>
                                    {points}/{skill.maxPoints}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => adjustSkillPoint(skill.id, 1)}
                                    disabled={isMaxed}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>

                                {/* Progress Bar with evolution segments */}
                                <div className="flex-1 ml-4 h-2 bg-bg-primary rounded-full overflow-hidden relative">
                                  {/* Evolution thresholds markers */}
                                  <div className="absolute inset-0 flex">
                                    <div className="w-[31%] border-r border-bg-secondary/50" /> {/* 0-14 (14/45 = 31%) */}
                                    <div className="w-[22%] border-r border-bg-secondary/50" /> {/* 15-24 (10/45 = 22%) */}
                                    <div className="w-[22%] border-r border-bg-secondary/50" /> {/* 25-34 (10/45 = 22%) */}
                                    <div className="flex-1" /> {/* 35-45 */}
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
                      <p className="text-text-muted text-lg">Skill tree for {selectedClassData?.label} coming soon...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guide" className="mt-8">
              <Card className="bg-bg-secondary border-border-primary">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl">Build Guide</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <textarea
                    placeholder="Write your build guide here... Explain your stat choices, equipment recommendations, playstyle tips, etc."
                    value={guide}
                    onChange={(e) => setGuide(e.target.value)}
                    className="w-full h-80 bg-bg-tertiary border border-border-primary rounded-xl p-5 text-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 resize-none"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedSlot && (
        <EquipmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          slotType={selectedSlot.id}
          slotName={selectedSlot.name}
          onSelectItem={handleSelectItem}
          selectedItem={equipment[selectedSlot.id]}
        />
      )}
    </div>
  )
}
