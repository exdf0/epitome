'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, Input, Button, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Search, Plus, Edit, Trash2, Loader2, X, Save } from 'lucide-react'

interface Drop {
  itemId: string
  itemName: string
  itemSlug?: string
  dropRate: number
  rarity: string
  imageUrl?: string
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
  isActive: boolean
}

interface MobType {
  id: string
  name: string
  displayName: string
}

interface Item {
  id: string
  name: string
  slug: string
  rarity: string
  type: string
  imageUrl?: string
}

interface MobFormData {
  name: string
  slug: string
  description: string
  level: number
  xpReward: number
  respawnTime: number
  mobType: string
  category: string
  biome: string
  imageUrl: string
  stats: Record<string, number>
  drops: Drop[]
  archonDropMin: number
  archonDropMax: number
  isActive: boolean
}

const emptyForm: MobFormData = {
  name: '',
  slug: '',
  description: '',
  level: 1,
  xpReward: 0,
  respawnTime: 300,
  mobType: '',
  category: 'GENERAL',
  biome: '',
  imageUrl: '',
  stats: {},
  drops: [],
  archonDropMin: 0,
  archonDropMax: 0,
  isActive: true,
}

const categoryOptions = [
  { value: 'GENERAL', label: 'General' },
  { value: 'MINI_BOSS', label: 'Mini-Boss' },
  { value: 'BOSS', label: 'Boss' },
  { value: 'TAMEABLE', label: 'Tameable' },
]

const biomeOptions = [
  { value: 'MEADOW', label: 'Meadow' },
  { value: 'COAST', label: 'Coast' },
  { value: 'FOREST', label: 'Forest' },
  { value: 'FOOTHILL', label: 'Foothill' },
  { value: 'RED', label: 'Red' },
]

const categoryColors: Record<string, string> = {
  GENERAL: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  MINI_BOSS: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  BOSS: 'bg-red-500/20 text-red-400 border-red-500/50',
  TAMEABLE: 'bg-green-500/20 text-green-400 border-green-500/50',
}

const rarityColors: Record<string, string> = {
  COMMON: 'text-gray-400',
  UNCOMMON: 'text-green-400',
  RARE: 'text-blue-400',
  EPIC: 'text-purple-400',
  LEGENDARY: 'text-orange-400',
  MYTHIC: 'text-red-400',
}

const statOptions = [
  { id: 'hp', name: 'HP' },
  { id: 'attack', name: 'Attack' },
  { id: 'defense', name: 'Defense' },
  { id: 'magicAttack', name: 'Magic Attack' },
  { id: 'magicDefense', name: 'Magic Defense' },
]

export default function AdminMobsPage() {
  const [mobs, setMobs] = useState<Mob[]>([])
  const [mobTypes, setMobTypes] = useState<MobType[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [mobTypeFilter, setMobTypeFilter] = useState('all')
  const [biomeFilter, setBiomeFilter] = useState('all')
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMob, setEditingMob] = useState<Mob | null>(null)
  const [formData, setFormData] = useState<MobFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Mob Type Modal
  const [isMobTypeModalOpen, setIsMobTypeModalOpen] = useState(false)
  const [newMobTypeName, setNewMobTypeName] = useState('')
  const [newMobTypeDisplay, setNewMobTypeDisplay] = useState('')

  // Item search for drops
  const [itemSearch, setItemSearch] = useState('')
  const [searchedItems, setSearchedItems] = useState<Item[]>([])
  const [searchingItems, setSearchingItems] = useState(false)

  // Fetch mobs
  const fetchMobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      if (searchQuery) params.set('search', searchQuery)
      if (categoryFilter !== 'all') params.set('category', categoryFilter)
      if (mobTypeFilter !== 'all') params.set('mobType', mobTypeFilter)
      if (biomeFilter !== 'all') params.set('biome', biomeFilter)

      const response = await fetch(`/api/admin/mobs?${params}`)
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

  // Fetch mob types
  const fetchMobTypes = async () => {
    try {
      const response = await fetch('/api/admin/mob-types')
      if (response.ok) {
        const data = await response.json()
        setMobTypes(data.mobTypes || [])
      }
    } catch (error) {
      console.error('Error fetching mob types:', error)
    }
  }

  useEffect(() => {
    fetchMobs()
    fetchMobTypes()
  }, [offset, categoryFilter, mobTypeFilter, biomeFilter])

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0)
      fetchMobs()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Search items for drops
  const searchItems = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchedItems([])
      return
    }
    setSearchingItems(true)
    try {
      const response = await fetch(`/api/admin/items?search=${encodeURIComponent(query)}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setSearchedItems(data.items)
      }
    } catch (error) {
      console.error('Error searching items:', error)
    } finally {
      setSearchingItems(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      searchItems(itemSearch)
    }, 300)
    return () => clearTimeout(timer)
  }, [itemSearch])

  // Open add modal
  const openAddModal = () => {
    setEditingMob(null)
    setFormData(emptyForm)
    setIsModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (mob: Mob) => {
    setEditingMob(mob)
    setFormData({
      name: mob.name,
      slug: mob.slug,
      description: mob.description || '',
      level: mob.level,
      xpReward: mob.xpReward,
      respawnTime: mob.respawnTime,
      mobType: mob.mobType,
      category: mob.category,
      biome: mob.biome || '',
      imageUrl: mob.imageUrl || '',
      stats: mob.stats || {},
      drops: mob.drops || [],
      archonDropMin: mob.archonDropMin || 0,
      archonDropMax: mob.archonDropMax || 0,
      isActive: mob.isActive,
    })
    setIsModalOpen(true)
  }

  // Handle form change
  const handleFormChange = (field: keyof MobFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle stat change
  const handleStatChange = (statId: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [statId]: value },
    }))
  }

  // Remove stat
  const removeStat = (statId: string) => {
    setFormData((prev) => {
      const newStats = { ...prev.stats }
      delete newStats[statId]
      return { ...prev, stats: newStats }
    })
  }

  // Add drop
  const addDrop = (item: Item) => {
    if (formData.drops.some((d) => d.itemId === item.id)) return
    setFormData((prev) => ({
      ...prev,
      drops: [...prev.drops, {
        itemId: item.id,
        itemName: item.name,
        itemSlug: item.slug,
        dropRate: 5,
        rarity: item.rarity,
        imageUrl: item.imageUrl
      }],
    }))
    setItemSearch('')
    setSearchedItems([])
  }

  // Update drop rate
  const updateDropRate = (itemId: string, rate: number) => {
    setFormData((prev) => ({
      ...prev,
      drops: prev.drops.map((d) => (d.itemId === itemId ? { ...d, dropRate: rate } : d)),
    }))
  }

  // Remove drop
  const removeDrop = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      drops: prev.drops.filter((d) => d.itemId !== itemId),
    }))
  }

  // Save mob
  const handleSave = async () => {
    if (!formData.name || !formData.mobType || !formData.category) {
      alert('Name, mob type, and category are required')
      return
    }

    setSaving(true)
    try {
      const url = editingMob
        ? `/api/admin/mobs/${editingMob.id}`
        : '/api/admin/mobs'
      const method = editingMob ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsModalOpen(false)
        fetchMobs()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save mob')
      }
    } catch (error) {
      console.error('Error saving mob:', error)
      alert('Failed to save mob')
    } finally {
      setSaving(false)
    }
  }

  // Delete mob
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/mobs/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeleteConfirm(null)
        fetchMobs()
      } else {
        alert('Failed to delete mob')
      }
    } catch (error) {
      console.error('Error deleting mob:', error)
      alert('Failed to delete mob')
    }
  }

  // Add new mob type
  const handleAddMobType = async () => {
    if (!newMobTypeName || !newMobTypeDisplay) {
      alert('Both name and display name are required')
      return
    }

    try {
      const response = await fetch('/api/admin/mob-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newMobTypeName, displayName: newMobTypeDisplay }),
      })

      if (response.ok) {
        setIsMobTypeModalOpen(false)
        setNewMobTypeName('')
        setNewMobTypeDisplay('')
        fetchMobTypes()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add mob type')
      }
    } catch (error) {
      console.error('Error adding mob type:', error)
      alert('Failed to add mob type')
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Mobs Management</h1>
          <p className="text-text-secondary">
            Add, edit, and manage mobs in the database. ({total} mobs)
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="secondary" onClick={() => setIsMobTypeModalOpen(true)}>
            Manage Types
          </Button>
          <Button onClick={openAddModal} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Mob
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search mobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={mobTypeFilter} onValueChange={setMobTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Mob Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {mobTypes.map((type) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={biomeFilter} onValueChange={setBiomeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Biome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Biomes</SelectItem>
                {biomeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mobs Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : mobs.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No mobs found. Add your first mob!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary bg-bg-tertiary">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Mob</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Level</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">XP</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Archon</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Biome</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Drops</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mobs.map((mob) => (
                    <tr
                      key={mob.id}
                      className="border-b border-border-primary/50 hover:bg-bg-tertiary/50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {mob.imageUrl && (
                            <img
                              src={mob.imageUrl}
                              alt={mob.name}
                              className="w-10 h-10 rounded object-cover border border-border-primary"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          )}
                          <span className="font-medium text-text-primary">{mob.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-primary">{mob.level}</td>
                      <td className="py-3 px-4 text-text-secondary">{mob.xpReward}</td>
                      <td className="py-3 px-4 text-text-secondary">
                        {mob.archonDropMin > 0 || mob.archonDropMax > 0 ? (
                          <span className="flex items-center gap-1">
                            <img src="/game-images/currency/archon.png" alt="" className="w-3 h-3" />
                            {mob.archonDropMin}-{mob.archonDropMax}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={categoryColors[mob.category]}>
                          {categoryOptions.find((c) => c.value === mob.category)?.label || mob.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {mobTypes.find((t) => t.name === mob.mobType)?.displayName || mob.mobType}
                      </td>
                      <td className="py-3 px-4 text-text-muted">
                        {biomeOptions.find((b) => b.value === mob.biome)?.label || mob.biome || '-'}
                      </td>
                      <td className="py-3 px-4 text-text-muted">
                        {mob.drops?.length || 0} items
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditModal(mob)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {deleteConfirm === mob.id ? (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-400"
                                onClick={() => handleDelete(mob.id)}
                              >
                                Confirm
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8"
                                onClick={() => setDeleteConfirm(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-300"
                              onClick={() => setDeleteConfirm(mob.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={offset + limit >= total}
            onClick={() => setOffset(offset + limit)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-bg-secondary border border-border-primary rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-bg-secondary border-b border-border-primary p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                {editingMob ? 'Edit Mob' : 'Add New Mob'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Basic Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm text-text-secondary mb-2 block">Mob Name *</label>
                    <Input
                      placeholder="Enter mob name"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm text-text-secondary mb-2 block">Slug (URL-friendly)</label>
                    <Input
                      placeholder="auto-generated-from-name"
                      value={formData.slug}
                      onChange={(e) => handleFormChange('slug', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Level</label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={formData.level}
                      onChange={(e) => handleFormChange('level', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">XP Reward</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.xpReward}
                      onChange={(e) => handleFormChange('xpReward', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm text-text-secondary mb-2 block">
                      <span className="flex items-center gap-2">
                        <img src="/game-images/currency/archon.png" alt="Archon" className="w-4 h-4" />
                        Archon Drop (Min - Max)
                      </span>
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={formData.archonDropMin}
                        onChange={(e) => handleFormChange('archonDropMin', parseInt(e.target.value) || 0)}
                      />
                      <span className="text-text-muted">-</span>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Max"
                        value={formData.archonDropMax}
                        onChange={(e) => handleFormChange('archonDropMax', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Respawn Time (seconds)</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.respawnTime}
                      onChange={(e) => handleFormChange('respawnTime', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Category *</label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) => handleFormChange('category', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Mob Type *</label>
                    <Select
                      value={formData.mobType}
                      onValueChange={(v) => handleFormChange('mobType', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {mobTypes.map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Biome</label>
                    <Select
                      value={formData.biome}
                      onValueChange={(v) => handleFormChange('biome', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select biome" />
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

                  <div className="col-span-2">
                    <label className="text-sm text-text-secondary mb-2 block">Image URL</label>
                    <Input
                      placeholder="/game-images/mobs/..."
                      value={formData.imageUrl}
                      onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm text-text-secondary mb-2 block">Description</label>
                    <textarea
                      className="w-full h-24 rounded-md border border-border-primary bg-bg-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter mob description"
                      value={formData.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => handleFormChange('isActive', e.target.checked)}
                        className="rounded border-border-primary bg-bg-tertiary"
                      />
                      <span className="text-sm text-text-secondary">Active (visible on site)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Stats</h3>
                <div className="space-y-2">
                  {Object.entries(formData.stats).map(([statId, value]) => (
                    <div key={statId} className="flex items-center gap-2">
                      <span className="w-32 text-sm text-text-primary">
                        {statOptions.find((s) => s.id === statId)?.name || statId}
                      </span>
                      <Input
                        type="number"
                        className="w-24"
                        value={value}
                        onChange={(e) => handleStatChange(statId, parseInt(e.target.value) || 0)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400"
                        onClick={() => removeStat(statId)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <Select
                    value=""
                    onValueChange={(v) => {
                      if (v && !formData.stats[v]) {
                        handleStatChange(v, 0)
                      }
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add stat..." />
                    </SelectTrigger>
                    <SelectContent>
                      {statOptions
                        .filter((s) => !formData.stats[s.id])
                        .map((stat) => (
                          <SelectItem key={stat.id} value={stat.id}>
                            {stat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Drops Section */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Drops ({formData.drops.length} items)
                </h3>
                <div className="space-y-4">
                  {/* Item search - at top */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      placeholder="Search database items to add as drop..."
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      className="pl-10"
                    />
                    {searchingItems && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-text-muted" />
                      </div>
                    )}
                    {searchedItems.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-bg-secondary border border-border-primary rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
                        {searchedItems.map((item) => (
                          <button
                            key={item.id}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-tertiary text-sm text-text-primary border-b border-border-primary/50 last:border-0"
                            onClick={() => addDrop(item)}
                            disabled={formData.drops.some(d => d.itemId === item.id)}
                          >
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt="" className="w-8 h-8 object-contain rounded" />
                            ) : (
                              <div className="w-8 h-8 bg-bg-tertiary rounded flex items-center justify-center text-text-muted text-xs">?</div>
                            )}
                            <div className="flex-1 text-left">
                              <span className={rarityColors[item.rarity] || 'text-text-primary'}>
                                {item.name}
                              </span>
                              <span className="text-text-muted text-xs ml-2">({item.type})</span>
                            </div>
                            {formData.drops.some(d => d.itemId === item.id) && (
                              <span className="text-xs text-green-400">Added</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Drop list */}
                  {formData.drops.length > 0 ? (
                    <div className="space-y-2 border border-border-primary rounded-lg p-3 bg-bg-tertiary/50">
                      {formData.drops.map((drop) => (
                        <div key={drop.itemId} className="flex items-center gap-3 bg-bg-secondary p-3 rounded-lg">
                          {drop.imageUrl ? (
                            <img src={drop.imageUrl} alt="" className="w-10 h-10 object-contain rounded" />
                          ) : (
                            <div className="w-10 h-10 bg-bg-tertiary rounded flex items-center justify-center text-text-muted">?</div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-medium ${rarityColors[drop.rarity] || 'text-text-primary'}`}>
                              {drop.itemName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-text-muted">Drop %:</label>
                            <Input
                              type="number"
                              className="w-20 h-8"
                              min="0.01"
                              max="100"
                              step="0.01"
                              value={drop.dropRate}
                              onChange={(e) => updateDropRate(drop.itemId, parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => removeDrop(drop.itemId)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-text-muted border border-dashed border-border-primary rounded-lg">
                      No drops added. Search for items above to add them.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-bg-secondary border-t border-border-primary p-4 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingMob ? 'Update Mob' : 'Add Mob'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mob Type Management Modal */}
      {isMobTypeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobTypeModalOpen(false)}
          />
          <div className="relative bg-bg-secondary border border-border-primary rounded-xl w-full max-w-md m-4">
            <div className="border-b border-border-primary p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Manage Mob Types</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobTypeModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {/* Existing types */}
              <div className="space-y-2">
                <label className="text-sm text-text-secondary">Existing Types</label>
                {mobTypes.length === 0 ? (
                  <p className="text-text-muted text-sm">No mob types defined yet.</p>
                ) : (
                  <div className="space-y-1">
                    {mobTypes.map((type) => (
                      <div key={type.id} className="flex items-center justify-between bg-bg-tertiary p-2 rounded-md">
                        <span className="text-text-primary text-sm">{type.displayName}</span>
                        <span className="text-text-muted text-xs">{type.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add new type */}
              <div className="border-t border-border-primary pt-4 space-y-3">
                <label className="text-sm text-text-secondary">Add New Type</label>
                <Input
                  placeholder="Internal name (e.g., HUMANOID)"
                  value={newMobTypeName}
                  onChange={(e) => setNewMobTypeName(e.target.value.toUpperCase())}
                />
                <Input
                  placeholder="Display name (e.g., Humanoid)"
                  value={newMobTypeDisplay}
                  onChange={(e) => setNewMobTypeDisplay(e.target.value)}
                />
                <Button onClick={handleAddMobType} className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Mob Type
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
