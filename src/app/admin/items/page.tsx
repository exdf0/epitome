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
  requiredClass?: string | null
  enhancementBonuses?: Record<string, Record<string, StatValue>>
  enhancementMaterials?: Record<string, EnhancementMaterial[]>
}

interface ItemFormData {
  name: string
  slug: string
  description: string
  type: string
  rarity: string
  level: number
  imageUrl: string
  isGear: boolean
  requiredLevel: number
  requiredClass: string
  stats: Record<string, StatValue>
  enhancementBonuses: Record<string, Record<string, StatValue>>
  enhancementMaterials: Record<string, EnhancementMaterial[]>
}

interface GearStat {
  id: string
  name: string
  displayName: string
}

const emptyForm: ItemFormData = {
  name: '',
  slug: '',
  description: '',
  type: 'WEAPON',
  rarity: 'COMMON',
  level: 1,
  imageUrl: '',
  isGear: true,
  requiredLevel: 1,
  requiredClass: 'ALL',
  stats: {},
  enhancementBonuses: {},
  enhancementMaterials: {},
}

// Class options for items
const classOptions = [
  { value: 'ALL', label: 'All Classes' },
  { value: 'WARRIOR', label: 'Warrior' },
  { value: 'NINJA', label: 'Ninja' },
  { value: 'SHAMAN', label: 'Shaman' },
  { value: 'NECROMANCER', label: 'Necromancer' },
]

const rarityColors: Record<string, string> = {
  COMMON: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  UNCOMMON: 'bg-green-500/20 text-green-400 border-green-500/50',
  RARE: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  EPIC: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  LEGENDARY: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  MYTHIC: 'bg-red-500/20 text-red-400 border-red-500/50',
}


// Gear types (can be enhanced)
const gearTypes = ['WEAPON', 'HELMET', 'ARMOR', 'GLOVES', 'BOOTS', 'SHIELD', 'EARRING', 'NECKLACE', 'RING']

// All type options
const typeOptions = [
  { value: 'WEAPON', label: 'Weapon', isGear: true },
  { value: 'HELMET', label: 'Helmet', isGear: true },
  { value: 'ARMOR', label: 'Armor', isGear: true },
  { value: 'GLOVES', label: 'Gloves', isGear: true },
  { value: 'BOOTS', label: 'Boots', isGear: true },
  { value: 'SHIELD', label: 'Shield', isGear: true },
  { value: 'EARRING', label: 'Earring', isGear: true },
  { value: 'NECKLACE', label: 'Necklace', isGear: true },
  { value: 'RING', label: 'Ring', isGear: true },
  { value: 'MATERIAL', label: 'Material', isGear: false },
  { value: 'CONSUMABLE', label: 'Consumable', isGear: false },
  { value: 'QUEST', label: 'Quest Item', isGear: false },
  { value: 'ENHANCEMENT', label: 'Enhancement Material', isGear: false },
  { value: 'OTHER', label: 'Other', isGear: false },
]

const enhancementLevels = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function AdminItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  // Gear stats (dynamic, from database)
  const [gearStats, setGearStats] = useState<GearStat[]>([])

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [formData, setFormData] = useState<ItemFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Gear Stats Modal
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [newStatName, setNewStatName] = useState('')
  const [newStatDisplayName, setNewStatDisplayName] = useState('')

  // Enhancement material search
  const [materialSearch, setMaterialSearch] = useState('')
  const [materialSearchResults, setMaterialSearchResults] = useState<Item[]>([])
  const [searchingMaterials, setSearchingMaterials] = useState(false)
  const [activeMaterialLevel, setActiveMaterialLevel] = useState<string | null>(null)

  // Active enhancement tab
  const [activeEnhancementTab, setActiveEnhancementTab] = useState<'bonuses' | 'materials'>('bonuses')

  // Fetch items
  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      if (searchQuery) params.set('search', searchQuery)
      if (typeFilter !== 'all') params.set('type', typeFilter)
      if (rarityFilter !== 'all') params.set('rarity', rarityFilter)

      const response = await fetch(`/api/admin/items?${params}`)
      if (response.ok) {
        const data = await response.json()
        setItems(data.items)
        setTotal(data.total)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch gear stats
  const fetchGearStats = async () => {
    try {
      const response = await fetch('/api/admin/gear-stats')
      if (response.ok) {
        const data = await response.json()
        setGearStats(data.gearStats || [])
      }
    } catch (error) {
      console.error('Error fetching gear stats:', error)
    }
  }

  useEffect(() => {
    fetchItems()
    fetchGearStats()
  }, [offset, typeFilter, rarityFilter])

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0)
      fetchItems()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Open add modal
  const openAddModal = () => {
    setEditingItem(null)
    setFormData(emptyForm)
    setIsModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (item: Item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description || '',
      type: item.type,
      rarity: item.rarity,
      level: item.level,
      imageUrl: item.imageUrl || '',
      isGear: item.isGear ?? gearTypes.includes(item.type),
      requiredLevel: item.requiredLevel || 1,
      requiredClass: item.requiredClass || 'ALL',
      stats: item.stats || {},
      enhancementBonuses: item.enhancementBonuses || {},
      enhancementMaterials: item.enhancementMaterials || {},
    })
    setActiveEnhancementTab('bonuses')
    setIsModalOpen(true)
  }

  // Search materials for enhancement
  const searchMaterials = async (query: string) => {
    if (!query || query.length < 2) {
      setMaterialSearchResults([])
      return
    }
    setSearchingMaterials(true)
    try {
      const response = await fetch(`/api/admin/items?search=${encodeURIComponent(query)}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        // Filter out current item being edited
        setMaterialSearchResults(data.items.filter((i: Item) => i.id !== editingItem?.id))
      }
    } catch (error) {
      console.error('Error searching materials:', error)
    } finally {
      setSearchingMaterials(false)
    }
  }

  // Debounced material search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeMaterialLevel) {
        searchMaterials(materialSearch)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [materialSearch, activeMaterialLevel])

  // Handle enhancement bonus change
  const handleEnhancementBonusChange = (level: string, statId: string, field: 'min' | 'max', value: number) => {
    setFormData((prev) => {
      const currentStat = prev.enhancementBonuses[level]?.[statId] || { min: 0, max: 0 }
      return {
        ...prev,
        enhancementBonuses: {
          ...prev.enhancementBonuses,
          [level]: {
            ...(prev.enhancementBonuses[level] || {}),
            [statId]: {
              ...currentStat,
              [field]: value,
            },
          },
        },
      }
    })
  }

  const addEnhancementBonusStat = (level: string, statId: string) => {
    setFormData((prev) => ({
      ...prev,
      enhancementBonuses: {
        ...prev.enhancementBonuses,
        [level]: {
          ...(prev.enhancementBonuses[level] || {}),
          [statId]: { min: 0, max: 0 },
        },
      },
    }))
  }

  // Remove enhancement bonus stat
  const removeEnhancementBonusStat = (level: string, statId: string) => {
    setFormData((prev) => {
      const newBonuses = { ...prev.enhancementBonuses }
      if (newBonuses[level]) {
        delete newBonuses[level][statId]
        if (Object.keys(newBonuses[level]).length === 0) {
          delete newBonuses[level]
        }
      }
      return { ...prev, enhancementBonuses: newBonuses }
    })
  }

  // Add enhancement material
  const addEnhancementMaterial = (level: string, item: Item, quantity: number = 1) => {
    setFormData((prev) => {
      const currentMaterials = prev.enhancementMaterials[level] || []
      const existingIndex = currentMaterials.findIndex((m) => m.itemId === item.id)

      if (existingIndex >= 0) {
        // Update quantity if already exists
        const updated = [...currentMaterials]
        updated[existingIndex].quantity += quantity
        return {
          ...prev,
          enhancementMaterials: {
            ...prev.enhancementMaterials,
            [level]: updated,
          },
        }
      }

      return {
        ...prev,
        enhancementMaterials: {
          ...prev.enhancementMaterials,
          [level]: [...currentMaterials, { itemId: item.id, itemName: item.name, quantity }],
        },
      }
    })
    setMaterialSearch('')
    setMaterialSearchResults([])
    setActiveMaterialLevel(null)
  }

  // Update material quantity
  const updateMaterialQuantity = (level: string, itemId: string, quantity: number) => {
    setFormData((prev) => {
      const materials = prev.enhancementMaterials[level] || []
      return {
        ...prev,
        enhancementMaterials: {
          ...prev.enhancementMaterials,
          [level]: materials.map((m) => m.itemId === itemId ? { ...m, quantity } : m),
        },
      }
    })
  }

  // Remove enhancement material
  const removeEnhancementMaterial = (level: string, itemId: string) => {
    setFormData((prev) => {
      const materials = (prev.enhancementMaterials[level] || []).filter((m) => m.itemId !== itemId)
      const newMaterials = { ...prev.enhancementMaterials }
      if (materials.length === 0) {
        delete newMaterials[level]
      } else {
        newMaterials[level] = materials
      }
      return { ...prev, enhancementMaterials: newMaterials }
    })
  }

  // Handle form change
  const handleFormChange = (field: keyof ItemFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Add new stat with default min-max
  const addStat = (statId: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [statId]: { min: 0, max: 0 } },
    }))
  }

  // Handle stat min change
  const handleStatMinChange = (statId: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statId]: { ...prev.stats[statId], min: value },
      },
    }))
  }

  // Handle stat max change
  const handleStatMaxChange = (statId: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statId]: { ...prev.stats[statId], max: value },
      },
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

  // Save item
  const handleSave = async () => {
    if (!formData.name || !formData.type || !formData.rarity) {
      alert('Name, type, and rarity are required')
      return
    }

    setSaving(true)
    try {
      const url = editingItem
        ? `/api/admin/items/${editingItem.id}`
        : '/api/admin/items'
      const method = editingItem ? 'PUT' : 'POST'

      // Convert 'ALL' to null for requiredClass
      const dataToSend = {
        ...formData,
        requiredClass: formData.requiredClass === 'ALL' ? null : formData.requiredClass,
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        setIsModalOpen(false)
        fetchItems()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save item')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Failed to save item')
    } finally {
      setSaving(false)
    }
  }

  // Delete item
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/items/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeleteConfirm(null)
        fetchItems()
      } else {
        alert('Failed to delete item')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item')
    }
  }

  // Add new gear stat
  const handleAddGearStat = async () => {
    if (!newStatName || !newStatDisplayName) {
      alert('Both name and display name are required')
      return
    }

    try {
      const response = await fetch('/api/admin/gear-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newStatName, displayName: newStatDisplayName }),
      })

      if (response.ok) {
        setNewStatName('')
        setNewStatDisplayName('')
        fetchGearStats()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add gear stat')
      }
    } catch (error) {
      console.error('Error adding gear stat:', error)
      alert('Failed to add gear stat')
    }
  }

  // Delete gear stat
  const handleDeleteGearStat = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/gear-stats?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchGearStats()
      } else {
        alert('Failed to delete gear stat')
      }
    } catch (error) {
      console.error('Error deleting gear stat:', error)
      alert('Failed to delete gear stat')
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Items Management</h1>
          <p className="text-text-secondary">
            Add, edit, and manage items in the database. ({total} items)
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="secondary" onClick={() => setIsStatsModalOpen(true)}>
            Manage Stats
          </Button>
          <Button onClick={openAddModal} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Item
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
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="gear">⚔️ All Gear</SelectItem>
                <SelectItem value="other">📦 Other Items</SelectItem>
                {typeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="COMMON">Common</SelectItem>
                <SelectItem value="UNCOMMON">Uncommon</SelectItem>
                <SelectItem value="RARE">Rare</SelectItem>
                <SelectItem value="EPIC">Epic</SelectItem>
                <SelectItem value="LEGENDARY">Legendary</SelectItem>
                <SelectItem value="MYTHIC">Mythic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No items found. Add your first item!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary bg-bg-tertiary">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Type</th>
                    <th className="text-center py-3 px-4 text-text-secondary font-medium">Gear</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Rarity</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Level</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Stats</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border-primary/50 hover:bg-bg-tertiary/50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-10 h-10 rounded object-cover border border-border-primary"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          )}
                          <span className="font-medium text-text-primary">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">{item.type}</td>
                      <td className="py-3 px-4 text-center">
                        {item.isGear ? (
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">⚔️</Badge>
                        ) : (
                          <span className="text-text-muted">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={rarityColors[item.rarity]}>
                          {item.rarity}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-text-primary">{item.level}</td>
                      <td className="py-3 px-4 text-text-muted text-sm">
                        {Object.entries(item.stats || {}).slice(0, 2).map(([k, v]) => {
                          const statVal = v as StatValue
                          const display = statVal.min === statVal.max
                            ? statVal.min
                            : `${statVal.min}-${statVal.max}`
                          return <span key={k} className="mr-2">{k}: {display}</span>
                        })}
                        {Object.keys(item.stats || {}).length > 2 && '...'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditModal(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {deleteConfirm === item.id ? (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-400"
                                onClick={() => handleDelete(item.id)}
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
                              onClick={() => setDeleteConfirm(item.id)}
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
          Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} items
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
          <div className="relative bg-bg-secondary border border-border-primary rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-bg-secondary border-b border-border-primary p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Item Name *</label>
                  <Input
                    placeholder="Enter item name"
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
                  <label className="text-sm text-text-secondary mb-2 block">Type *</label>
                  <Select
                    value={formData.type}
                    onValueChange={(v) => {
                      handleFormChange('type', v)
                      // Auto-set isGear based on type
                      const typeOption = typeOptions.find((t) => t.value === v)
                      if (typeOption) {
                        handleFormChange('isGear', typeOption.isGear)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="px-2 py-1 text-xs text-text-muted font-semibold">Gear (Enhanceable)</div>
                      {typeOptions.filter((t) => t.isGear).map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                      <div className="px-2 py-1 text-xs text-text-muted font-semibold mt-2">Other Items</div>
                      {typeOptions.filter((t) => !t.isGear).map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Rarity *</label>
                  <Select
                    value={formData.rarity}
                    onValueChange={(v) => handleFormChange('rarity', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COMMON">Common</SelectItem>
                      <SelectItem value="UNCOMMON">Uncommon</SelectItem>
                      <SelectItem value="RARE">Rare</SelectItem>
                      <SelectItem value="EPIC">Epic</SelectItem>
                      <SelectItem value="LEGENDARY">Legendary</SelectItem>
                      <SelectItem value="MYTHIC">Mythic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Item Level</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.level}
                    onChange={(e) => handleFormChange('level', parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Required Level</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.requiredLevel}
                    onChange={(e) => handleFormChange('requiredLevel', parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Required Class</label>
                  <Select
                    value={formData.requiredClass}
                    onValueChange={(v) => handleFormChange('requiredClass', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class..." />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map((opt) => (
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
                    placeholder="/game-images/items/..."
                    value={formData.imageUrl}
                    onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Description</label>
                  <textarea
                    className="w-full h-24 rounded-md border border-border-primary bg-bg-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter item description"
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                  />
                </div>

                {/* Stats Section */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Base Stats (+0)</label>
                  <p className="text-xs text-text-muted mb-3">Enter min-max range for each stat (e.g., 16-22 for variable damage)</p>
                  <div className="space-y-2">
                    {Object.entries(formData.stats).map(([statId, value]) => (
                      <div key={statId} className="flex items-center gap-2">
                        <span className="w-32 text-sm text-text-primary">
                          {gearStats.find((s) => s.name === statId)?.displayName || statId}
                        </span>
                        <Input
                          type="number"
                          className="w-20"
                          placeholder="Min"
                          value={value?.min ?? 0}
                          onChange={(e) => handleStatMinChange(statId, parseInt(e.target.value) || 0)}
                        />
                        <span className="text-text-muted">-</span>
                        <Input
                          type="number"
                          className="w-20"
                          placeholder="Max"
                          value={value?.max ?? 0}
                          onChange={(e) => handleStatMaxChange(statId, parseInt(e.target.value) || 0)}
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

                    {gearStats.length === 0 ? (
                      <p className="text-sm text-text-muted py-2">
                        No stats defined yet. Click "Manage Stats" to add stats.
                      </p>
                    ) : (
                      <Select
                        value={undefined}
                        onValueChange={(v) => {
                          if (v && !formData.stats[v]) {
                            addStat(v)
                          }
                        }}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Add stat..." />
                        </SelectTrigger>
                        <SelectContent>
                          {gearStats
                            .filter((s) => !formData.stats[s.name])
                            .map((stat) => (
                              <SelectItem key={stat.id} value={stat.name}>
                                {stat.displayName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                {/* Enhancement System - Only for Gear */}
                {formData.isGear && (
                  <div className="col-span-2 border-t border-border-primary pt-4 mt-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Enhancement System (+1 to +9)</h3>
                      <div className="flex gap-2">
                        <Button
                          variant={activeEnhancementTab === 'bonuses' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setActiveEnhancementTab('bonuses')}
                        >
                          Stat Bonuses
                        </Button>
                        <Button
                          variant={activeEnhancementTab === 'materials' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setActiveEnhancementTab('materials')}
                        >
                          Materials
                        </Button>
                      </div>
                    </div>

                    {/* Enhancement Bonuses Tab */}
                    {activeEnhancementTab === 'bonuses' && (
                      <div className="space-y-4">
                        <p className="text-sm text-text-muted">
                          Define stat bonuses for each enhancement level. These bonuses are added to base stats.
                        </p>
                        <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                          {enhancementLevels.map((level) => (
                            <div key={level} className="p-3 bg-bg-tertiary rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-orange-400">+{level} Bonuses</span>
                                <span className="text-xs text-text-muted">
                                  {Object.keys(formData.enhancementBonuses[level] || {}).length} stats
                                </span>
                              </div>
                              <div className="space-y-2">
                                {Object.entries(formData.enhancementBonuses[level] || {}).map(([statId, value]) => (
                                  <div key={statId} className="flex items-center gap-2">
                                    <span className="w-24 text-xs text-text-secondary truncate">
                                      {gearStats.find((s) => s.name === statId)?.displayName || statId}
                                    </span>
                                    <Input
                                      type="number"
                                      className="w-16 h-7 text-sm"
                                      placeholder="Min"
                                      value={value.min}
                                      onChange={(e) => handleEnhancementBonusChange(level, statId, 'min', parseInt(e.target.value) || 0)}
                                    />
                                    <span className="text-text-muted text-xs">-</span>
                                    <Input
                                      type="number"
                                      className="w-16 h-7 text-sm"
                                      placeholder="Max"
                                      value={value.max}
                                      onChange={(e) => handleEnhancementBonusChange(level, statId, 'max', parseInt(e.target.value) || 0)}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-red-400"
                                      onClick={() => removeEnhancementBonusStat(level, statId)}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                                {gearStats.length > 0 && (
                                  <Select
                                    value={undefined}
                                    onValueChange={(v) => {
                                      if (v && !(formData.enhancementBonuses[level] || {})[v]) {
                                        addEnhancementBonusStat(level, v)
                                      }
                                    }}
                                  >
                                    <SelectTrigger className="w-36 h-7 text-xs">
                                      <SelectValue placeholder="Add stat..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {gearStats
                                        .filter((s) => !(formData.enhancementBonuses[level] || {})[s.name])
                                        .map((stat) => (
                                          <SelectItem key={stat.id} value={stat.name}>
                                            {stat.displayName}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Enhancement Materials Tab */}
                    {activeEnhancementTab === 'materials' && (
                      <div className="space-y-4">
                        <p className="text-sm text-text-muted">
                          Define required materials for each enhancement level.
                        </p>
                        <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                          {enhancementLevels.map((level) => (
                            <div key={level} className="p-3 bg-bg-tertiary rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-orange-400">+{level} Materials</span>
                                <span className="text-xs text-text-muted">
                                  {(formData.enhancementMaterials[level] || []).length} items
                                </span>
                              </div>
                              <div className="space-y-2">
                                {/* Existing materials */}
                                {(formData.enhancementMaterials[level] || []).map((mat) => (
                                  <div key={mat.itemId} className="flex items-center gap-2 bg-bg-secondary p-2 rounded">
                                    <span className="flex-1 text-sm text-text-primary truncate">{mat.itemName}</span>
                                    <span className="text-xs text-text-muted">x</span>
                                    <Input
                                      type="number"
                                      className="w-16 h-7 text-sm"
                                      min="1"
                                      value={mat.quantity}
                                      onChange={(e) => updateMaterialQuantity(level, mat.itemId, parseInt(e.target.value) || 1)}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-red-400"
                                      onClick={() => removeEnhancementMaterial(level, mat.itemId)}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}

                                {/* Add material button/search */}
                                {activeMaterialLevel === level ? (
                                  <div className="relative">
                                    <Input
                                      placeholder="Search items..."
                                      className="h-8 text-sm"
                                      value={materialSearch}
                                      onChange={(e) => setMaterialSearch(e.target.value)}
                                      autoFocus
                                    />
                                    {searchingMaterials && (
                                      <div className="absolute right-2 top-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-text-muted" />
                                      </div>
                                    )}
                                    {materialSearchResults.length > 0 && (
                                      <div className="absolute z-10 w-full mt-1 bg-bg-secondary border border-border-primary rounded-md shadow-lg max-h-40 overflow-y-auto">
                                        {materialSearchResults.map((item) => (
                                          <button
                                            key={item.id}
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-bg-tertiary flex items-center gap-2"
                                            onClick={() => addEnhancementMaterial(level, item)}
                                          >
                                            {item.imageUrl && (
                                              <img src={item.imageUrl} alt="" className="w-5 h-5 rounded object-cover" />
                                            )}
                                            <span className="text-text-primary">{item.name}</span>
                                            <Badge className={`ml-auto text-xs ${rarityColors[item.rarity]}`}>
                                              {item.rarity}
                                            </Badge>
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="mt-1 text-xs"
                                      onClick={() => {
                                        setActiveMaterialLevel(null)
                                        setMaterialSearch('')
                                        setMaterialSearchResults([])
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full h-7 text-xs"
                                    onClick={() => setActiveMaterialLevel(level)}
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add Material
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                {editingItem ? 'Update Item' : 'Add Item'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Stats Modal */}
      {isStatsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsStatsModalOpen(false)}
          />
          <div className="relative bg-bg-secondary border border-border-primary rounded-xl w-full max-w-md m-4">
            <div className="border-b border-border-primary p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Manage Gear Stats</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsStatsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {/* Existing stats */}
              <div className="space-y-2">
                <label className="text-sm text-text-secondary">Existing Stats</label>
                {gearStats.length === 0 ? (
                  <p className="text-text-muted text-sm py-2">No gear stats defined yet.</p>
                ) : (
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {gearStats.map((stat) => (
                      <div key={stat.id} className="flex items-center justify-between bg-bg-tertiary p-2 rounded-md">
                        <div>
                          <span className="text-text-primary text-sm">{stat.displayName}</span>
                          <span className="text-text-muted text-xs ml-2">({stat.name})</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteGearStat(stat.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add new stat */}
              <div className="border-t border-border-primary pt-4 space-y-3">
                <label className="text-sm text-text-secondary">Add New Stat</label>
                <Input
                  placeholder="Internal name (e.g., attack, defense)"
                  value={newStatName}
                  onChange={(e) => setNewStatName(e.target.value.toLowerCase().replace(/\s/g, ''))}
                />
                <Input
                  placeholder="Display name (e.g., Attack, Defense)"
                  value={newStatDisplayName}
                  onChange={(e) => setNewStatDisplayName(e.target.value)}
                />
                <Button onClick={handleAddGearStat} className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Gear Stat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
