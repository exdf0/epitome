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
import { Search, Plus, Edit, Trash2, Loader2, X, Save, GripVertical } from 'lucide-react'
import { CLASS_IMAGES } from '@/constants/game-data'

interface ClassInfo {
  id: string
  class: string
  name: string
  description: string
  imageUrl?: string
  color?: string
  primaryStat: string
  secondaryStat?: string
  difficulty?: string
  playstyle: string[]
  strengths: string[]
  weaknesses: string[]
  statScaling?: Record<string, number>
  isActive: boolean
  sortOrder: number
}

interface ClassFormData {
  class: string
  name: string
  description: string
  imageUrl: string
  color: string
  primaryStat: string
  secondaryStat: string
  difficulty: string
  playstyle: string[]
  strengths: string[]
  weaknesses: string[]
  statScaling: Record<string, number>
  isActive: boolean
  sortOrder: number
}

const emptyForm: ClassFormData = {
  class: '',
  name: '',
  description: '',
  imageUrl: '',
  color: '#dc2626',
  primaryStat: 'STR',
  secondaryStat: '',
  difficulty: 'Medium',
  playstyle: [],
  strengths: [],
  weaknesses: [],
  statScaling: {},
  isActive: true,
  sortOrder: 0,
}

const classColors: Record<string, string> = {
  WARRIOR: 'bg-red-500/20 text-red-400 border-red-500/50',
  NINJA: 'bg-green-500/20 text-green-400 border-green-500/50',
  SHAMAN: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  NECROMANCER: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/50',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/50',
}

const statOptions = ['STR', 'DEX', 'INT', 'WIS', 'CON', 'VIG']

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<ClassInfo | null>(null)
  const [formData, setFormData] = useState<ClassFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Array inputs
  const [newPlaystyle, setNewPlaystyle] = useState('')
  const [newStrength, setNewStrength] = useState('')
  const [newWeakness, setNewWeakness] = useState('')

  // Fetch classes
  const fetchClasses = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)

      const response = await fetch(`/api/admin/classes?${params}`)
      if (response.ok) {
        const data = await response.json()
        setClasses(data.classes || [])
      }
    } catch (error) {
      console.error('Error fetching classes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchClasses()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Open add modal
  const openAddModal = () => {
    setEditingClass(null)
    setFormData(emptyForm)
    setNewPlaystyle('')
    setNewStrength('')
    setNewWeakness('')
    setIsModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (cls: ClassInfo) => {
    setEditingClass(cls)
    setFormData({
      class: cls.class,
      name: cls.name,
      description: cls.description || '',
      imageUrl: cls.imageUrl || '',
      color: cls.color || '#dc2626',
      primaryStat: cls.primaryStat,
      secondaryStat: cls.secondaryStat || '',
      difficulty: cls.difficulty || 'Medium',
      playstyle: cls.playstyle || [],
      strengths: cls.strengths || [],
      weaknesses: cls.weaknesses || [],
      statScaling: cls.statScaling || {},
      isActive: cls.isActive,
      sortOrder: cls.sortOrder,
    })
    setNewPlaystyle('')
    setNewStrength('')
    setNewWeakness('')
    setIsModalOpen(true)
  }

  // Handle form change
  const handleFormChange = (field: keyof ClassFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Array handlers
  const addPlaystyle = () => {
    if (newPlaystyle.trim() && !formData.playstyle.includes(newPlaystyle.trim())) {
      handleFormChange('playstyle', [...formData.playstyle, newPlaystyle.trim()])
      setNewPlaystyle('')
    }
  }

  const removePlaystyle = (item: string) => {
    handleFormChange('playstyle', formData.playstyle.filter((s) => s !== item))
  }

  const addStrength = () => {
    if (newStrength.trim() && !formData.strengths.includes(newStrength.trim())) {
      handleFormChange('strengths', [...formData.strengths, newStrength.trim()])
      setNewStrength('')
    }
  }

  const removeStrength = (item: string) => {
    handleFormChange('strengths', formData.strengths.filter((s) => s !== item))
  }

  const addWeakness = () => {
    if (newWeakness.trim() && !formData.weaknesses.includes(newWeakness.trim())) {
      handleFormChange('weaknesses', [...formData.weaknesses, newWeakness.trim()])
      setNewWeakness('')
    }
  }

  const removeWeakness = (item: string) => {
    handleFormChange('weaknesses', formData.weaknesses.filter((s) => s !== item))
  }

  // Save class
  const handleSave = async () => {
    if (!formData.class || !formData.name || !formData.primaryStat) {
      alert('Class ID, name, and primary stat are required')
      return
    }

    setSaving(true)
    try {
      const url = editingClass
        ? `/api/admin/classes/${editingClass.id}`
        : '/api/admin/classes'
      const method = editingClass ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsModalOpen(false)
        fetchClasses()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save class')
      }
    } catch (error) {
      console.error('Error saving class:', error)
      alert('Failed to save class')
    } finally {
      setSaving(false)
    }
  }

  // Delete class
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/classes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeleteConfirm(null)
        fetchClasses()
      } else {
        alert('Failed to delete class')
      }
    } catch (error) {
      console.error('Error deleting class:', error)
      alert('Failed to delete class')
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Classes Management</h1>
          <p className="text-text-secondary">
            Add, edit, and manage character classes. ({classes.length} classes)
          </p>
        </div>
        <Button onClick={openAddModal} className="gap-2 mt-4 md:mt-0">
          <Plus className="w-4 h-4" />
          Add Class
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          No classes found. Add your first class!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls) => {
            const colorClass = classColors[cls.class] || 'bg-gray-500/20 text-gray-400 border-gray-500/50'
            const diffColor = difficultyColors[cls.difficulty || 'Medium'] || difficultyColors.Medium
            const classImage = CLASS_IMAGES[cls.class as keyof typeof CLASS_IMAGES]

            return (
              <Card key={cls.id} className={`border ${cls.isActive ? '' : 'opacity-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Class Image */}
                    <div className={`w-16 h-16 rounded-lg ${colorClass.split(' ')[0]} flex items-center justify-center shrink-0`}>
                      {classImage ? (
                        <img
                          src={classImage}
                          alt={cls.name}
                          className="w-12 h-12 object-contain"
                        />
                      ) : cls.imageUrl ? (
                        <img
                          src={cls.imageUrl}
                          alt={cls.name}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold">{cls.name[0]}</span>
                      )}
                    </div>

                    {/* Class Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-text-primary text-lg">{cls.name}</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditModal(cls)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {deleteConfirm === cls.id ? (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-400"
                                onClick={() => handleDelete(cls.id)}
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
                              onClick={() => setDeleteConfirm(cls.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge className={colorClass}>{cls.class}</Badge>
                        <Badge className={diffColor}>{cls.difficulty || 'Medium'}</Badge>
                        {!cls.isActive && (
                          <Badge className="bg-gray-500/20 text-gray-400">Inactive</Badge>
                        )}
                      </div>

                      <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                        {cls.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-text-muted">
                          Primary: <span className="text-text-primary">{cls.primaryStat}</span>
                        </span>
                        {cls.secondaryStat && (
                          <span className="text-text-muted">
                            Secondary: <span className="text-text-primary">{cls.secondaryStat}</span>
                          </span>
                        )}
                      </div>

                      {cls.playstyle && cls.playstyle.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cls.playstyle.map((style) => (
                            <Badge key={style} variant="secondary" className="text-xs">
                              {style}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
              <h2 className="text-xl font-bold text-text-primary">
                {editingClass ? 'Edit Class' : 'Add New Class'}
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
                {/* Class ID */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Class ID *</label>
                  <Input
                    placeholder="WARRIOR"
                    value={formData.class}
                    onChange={(e) => handleFormChange('class', e.target.value.toUpperCase())}
                    disabled={!!editingClass}
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Display Name *</label>
                  <Input
                    placeholder="Warrior"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                  />
                </div>

                {/* Primary Stat */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Primary Stat *</label>
                  <Select
                    value={formData.primaryStat}
                    onValueChange={(v) => handleFormChange('primaryStat', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statOptions.map((stat) => (
                        <SelectItem key={stat} value={stat}>
                          {stat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Secondary Stat */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Secondary Stat</label>
                  <Select
                    value={formData.secondaryStat || 'none'}
                    onValueChange={(v) => handleFormChange('secondaryStat', v === 'none' ? '' : v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {statOptions.map((stat) => (
                        <SelectItem key={stat} value={stat}>
                          {stat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Difficulty</label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(v) => handleFormChange('difficulty', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Sort Order</label>
                  <Input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => handleFormChange('sortOrder', parseInt(e.target.value) || 0)}
                  />
                </div>

                {/* Image URL */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Image URL</label>
                  <Input
                    placeholder="/game-images/classess/warrior.png"
                    value={formData.imageUrl}
                    onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                  />
                </div>

                {/* Color */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Class Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => handleFormChange('color', e.target.value)}
                      className="w-12 h-10 rounded border border-border-primary cursor-pointer"
                    />
                    <Input
                      value={formData.color}
                      onChange={(e) => handleFormChange('color', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Description</label>
                  <textarea
                    className="w-full h-24 rounded-md border border-border-primary bg-bg-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter class description"
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                  />
                </div>

                {/* Playstyle Tags */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Playstyle Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.playstyle.map((style) => (
                      <Badge key={style} className="gap-1">
                        {style}
                        <button
                          type="button"
                          onClick={() => removePlaystyle(style)}
                          className="hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Tank, Melee DPS"
                      value={newPlaystyle}
                      onChange={(e) => setNewPlaystyle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPlaystyle())}
                    />
                    <Button type="button" variant="secondary" onClick={addPlaystyle}>
                      Add
                    </Button>
                  </div>
                </div>

                {/* Strengths */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Strengths</label>
                  <div className="space-y-1 mb-2">
                    {formData.strengths.map((str) => (
                      <div key={str} className="flex items-center gap-2 text-sm text-green-400">
                        <span>+ {str}</span>
                        <button
                          type="button"
                          onClick={() => removeStrength(str)}
                          className="hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., High base defense and HP"
                      value={newStrength}
                      onChange={(e) => setNewStrength(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStrength())}
                    />
                    <Button type="button" variant="secondary" onClick={addStrength}>
                      Add
                    </Button>
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="col-span-2">
                  <label className="text-sm text-text-secondary mb-2 block">Weaknesses</label>
                  <div className="space-y-1 mb-2">
                    {formData.weaknesses.map((weak) => (
                      <div key={weak} className="flex items-center gap-2 text-sm text-red-400">
                        <span>- {weak}</span>
                        <button
                          type="button"
                          onClick={() => removeWeakness(weak)}
                          className="hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Low mobility"
                      value={newWeakness}
                      onChange={(e) => setNewWeakness(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addWeakness())}
                    />
                    <Button type="button" variant="secondary" onClick={addWeakness}>
                      Add
                    </Button>
                  </div>
                </div>

                {/* Is Active */}
                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleFormChange('isActive', e.target.checked)}
                      className="w-4 h-4 rounded border-border-primary"
                    />
                    <span className="text-sm text-text-secondary">Class is active (visible on public pages)</span>
                  </label>
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
                {editingClass ? 'Update Class' : 'Add Class'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
