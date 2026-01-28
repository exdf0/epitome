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
import { Search, Plus, Edit, Trash2, Loader2, X, Save, Sparkles } from 'lucide-react'

interface Enchantment {
  id: string
  name: string
  slug: string
  description?: string
  minValue: number
  maxValue: number
  statKey: string
  equipmentTypes: string[]
  imageUrl?: string
}

interface EnchantmentFormData {
  name: string
  slug: string
  description: string
  minValue: number
  maxValue: number
  statKey: string
  equipmentTypes: string[]
  imageUrl: string
}

const emptyForm: EnchantmentFormData = {
  name: '',
  slug: '',
  description: '',
  minValue: 1,
  maxValue: 10,
  statKey: 'str',
  equipmentTypes: [],
  imageUrl: '',
}

const statOptions = [
  { id: 'str', name: 'Strength (STR)' },
  { id: 'dex', name: 'Dexterity (DEX)' },
  { id: 'int', name: 'Intelligence (INT)' },
  { id: 'vig', name: 'Vigor (VIG)' },
  { id: 'hp', name: 'HP' },
  { id: 'mp', name: 'MP' },
  { id: 'attack', name: 'Attack' },
  { id: 'defense', name: 'Defense' },
  { id: 'magicAttack', name: 'Magic Attack' },
  { id: 'magicDefense', name: 'Magic Defense' },
  { id: 'critRate', name: 'Crit Rate' },
  { id: 'critDamage', name: 'Crit Damage' },
  { id: 'moveSpeed', name: 'Move Speed' },
  { id: 'blockRate', name: 'Block Rate' },
]

const equipmentTypeOptions = [
  { id: 'HELMET', name: 'Helmet' },
  { id: 'WEAPON', name: 'Weapon' },
  { id: 'ARMOR', name: 'Armor' },
  { id: 'GLOVES', name: 'Gloves' },
  { id: 'BOOTS', name: 'Boots' },
  { id: 'SHIELD', name: 'Shield' },
  { id: 'EARRING', name: 'Earring' },
  { id: 'NECKLACE', name: 'Necklace' },
]

export default function AdminEnchantmentsPage() {
  const [enchantments, setEnchantments] = useState<Enchantment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEnchantment, setEditingEnchantment] = useState<Enchantment | null>(null)
  const [formData, setFormData] = useState<EnchantmentFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Fetch enchantments
  const fetchEnchantments = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      if (searchQuery) params.set('search', searchQuery)

      const response = await fetch(`/api/admin/enchantments?${params}`)
      if (response.ok) {
        const data = await response.json()
        setEnchantments(data.enchantments)
        setTotal(data.total)
      }
    } catch (error) {
      console.error('Error fetching enchantments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnchantments()
  }, [offset])

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0)
      fetchEnchantments()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Open add modal
  const openAddModal = () => {
    setEditingEnchantment(null)
    setFormData(emptyForm)
    setIsModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (enchantment: Enchantment) => {
    setEditingEnchantment(enchantment)
    setFormData({
      name: enchantment.name,
      slug: enchantment.slug,
      description: enchantment.description || '',
      minValue: enchantment.minValue,
      maxValue: enchantment.maxValue,
      statKey: enchantment.statKey,
      equipmentTypes: enchantment.equipmentTypes || [],
      imageUrl: enchantment.imageUrl || '',
    })
    setIsModalOpen(true)
  }

  // Handle form change
  const handleFormChange = (field: keyof EnchantmentFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      // Auto-generate slug when name changes
      if (field === 'name' && !editingEnchantment) {
        newData.slug = generateSlug(value)
      }
      return newData
    })
  }

  // Toggle equipment type
  const toggleEquipmentType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      equipmentTypes: prev.equipmentTypes.includes(type)
        ? prev.equipmentTypes.filter((t) => t !== type)
        : [...prev.equipmentTypes, type],
    }))
  }

  // Save enchantment
  const handleSave = async () => {
    if (!formData.name || !formData.slug || !formData.statKey) {
      alert('Name, slug, and stat are required')
      return
    }

    if (formData.minValue > formData.maxValue) {
      alert('Min value cannot be greater than max value')
      return
    }

    if (formData.equipmentTypes.length === 0) {
      alert('Please select at least one equipment type')
      return
    }

    setSaving(true)
    try {
      const url = editingEnchantment
        ? `/api/admin/enchantments/${editingEnchantment.id}`
        : '/api/admin/enchantments'
      const method = editingEnchantment ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsModalOpen(false)
        fetchEnchantments()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save enchantment')
      }
    } catch (error) {
      console.error('Error saving enchantment:', error)
      alert('Failed to save enchantment')
    } finally {
      setSaving(false)
    }
  }

  // Delete enchantment
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/enchantments/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeleteConfirm(null)
        fetchEnchantments()
      } else {
        alert('Failed to delete enchantment')
      }
    } catch (error) {
      console.error('Error deleting enchantment:', error)
      alert('Failed to delete enchantment')
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            Enchantments Management
          </h1>
          <p className="text-text-secondary">
            Create and manage enchantments that can be applied to equipment. ({total} enchantments)
          </p>
        </div>
        <Button onClick={openAddModal} className="gap-2 mt-4 md:mt-0">
          <Plus className="w-4 h-4" />
          Add Enchantment
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Search enchantments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Enchantments Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          ) : enchantments.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No enchantments found. Create your first enchantment!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary bg-bg-tertiary">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Stat</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Range</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Equipment Types</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enchantments.map((enchantment) => (
                    <tr
                      key={enchantment.id}
                      className="border-b border-border-primary/50 hover:bg-bg-tertiary/50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          <div>
                            <span className="font-medium text-text-primary">{enchantment.name}</span>
                            {enchantment.description && (
                              <p className="text-xs text-text-muted truncate max-w-xs">
                                {enchantment.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                          {statOptions.find((s) => s.id === enchantment.statKey)?.name || enchantment.statKey}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-text-primary">
                        <span className="text-green-400">{enchantment.minValue}</span>
                        <span className="text-text-muted mx-1">-</span>
                        <span className="text-orange-400">{enchantment.maxValue}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {enchantment.equipmentTypes.slice(0, 3).map((type) => (
                            <Badge key={type} className="text-xs bg-bg-tertiary text-text-secondary">
                              {type}
                            </Badge>
                          ))}
                          {enchantment.equipmentTypes.length > 3 && (
                            <Badge className="text-xs bg-bg-tertiary text-text-muted">
                              +{enchantment.equipmentTypes.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditModal(enchantment)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {deleteConfirm === enchantment.id ? (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-400"
                                onClick={() => handleDelete(enchantment.id)}
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
                              onClick={() => setDeleteConfirm(enchantment.id)}
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
      {total > limit && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-text-muted">
            Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} enchantments
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
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-bg-secondary border border-border-primary rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-bg-secondary border-b border-border-primary p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                {editingEnchantment ? 'Edit Enchantment' : 'Add New Enchantment'}
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
                  <label className="text-sm text-text-secondary mb-2 block">Enchantment Name *</label>
                  <Input
                    placeholder="e.g. Zeka Bonusu"
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
                  <label className="text-sm text-text-secondary mb-2 block">Stat Key *</label>
                  <Select
                    value={formData.statKey}
                    onValueChange={(v) => handleFormChange('statKey', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statOptions.map((stat) => (
                        <SelectItem key={stat.id} value={stat.id}>
                          {stat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Min Value</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.minValue}
                      onChange={(e) => handleFormChange('minValue', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Max Value</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.maxValue}
                      onChange={(e) => handleFormChange('maxValue', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Description</label>
                  <textarea
                    className="w-full h-20 rounded-md border border-border-primary bg-bg-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter enchantment description"
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Image URL</label>
                  <Input
                    placeholder="/game-images/enchantments/..."
                    value={formData.imageUrl}
                    onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                  />
                </div>

                {/* Equipment Types Selection */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-3 block">
                    Equipment Types (Select which items can have this enchantment) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {equipmentTypeOptions.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => toggleEquipmentType(type.id)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          formData.equipmentTypes.includes(type.id)
                            ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                            : 'border-border-primary bg-bg-tertiary text-text-secondary hover:border-border-secondary'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                  {formData.equipmentTypes.length > 0 && (
                    <p className="text-xs text-text-muted mt-2">
                      Selected: {formData.equipmentTypes.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-bg-secondary border-t border-border-primary p-4 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="gap-2 bg-purple-600 hover:bg-purple-700">
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingEnchantment ? 'Update Enchantment' : 'Add Enchantment'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
