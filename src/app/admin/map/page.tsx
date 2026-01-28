'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, Input, Button, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Plus, Edit, Trash2, Loader2, X, Save, MapPin } from 'lucide-react'
import { MARKER_TYPES, MarkerType } from '@/components/map/map-filter-sidebar'

// Dynamically import map component to avoid SSR issues with Leaflet
const GameMap = dynamic(() => import('@/components/map/game-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg-secondary flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
    </div>
  ),
})

interface Mob {
  id: string
  name: string
  slug: string
  level: number
  category: string
}

interface MapMarker {
  id: string
  name: string
  description?: string
  type: MarkerType
  x: number
  y: number
  iconUrl?: string
  mobId?: string
  mob?: Mob
  isActive: boolean
}

interface MarkerFormData {
  name: string
  description: string
  type: MarkerType
  x: number
  y: number
  iconUrl: string
  mobId: string
  isActive: boolean
}

const emptyForm: MarkerFormData = {
  name: '',
  description: '',
  type: 'SPAWN_GENERAL',
  x: 0,
  y: 0,
  iconUrl: '',
  mobId: '',
  isActive: true,
}

export default function AdminMapPage() {
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [mobs, setMobs] = useState<Mob[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTypes, setSelectedTypes] = useState<MarkerType[]>(
    Object.keys(MARKER_TYPES) as MarkerType[]
  )
  const [levelRange, setLevelRange] = useState<[number, number]>([1, 100])

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMarker, setEditingMarker] = useState<MapMarker | null>(null)
  const [formData, setFormData] = useState<MarkerFormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  // Click position for adding new markers
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)

  // Fetch markers
  const fetchMarkers = async () => {
    try {
      const response = await fetch('/api/admin/map-markers?limit=1000')
      if (response.ok) {
        const data = await response.json()
        setMarkers(data.markers)
      }
    } catch (error) {
      console.error('Error fetching markers:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch mobs for spawn markers
  const fetchMobs = async () => {
    try {
      const response = await fetch('/api/admin/mobs?limit=1000')
      if (response.ok) {
        const data = await response.json()
        setMobs(data.mobs)
      }
    } catch (error) {
      console.error('Error fetching mobs:', error)
    }
  }

  useEffect(() => {
    fetchMarkers()
    fetchMobs()
  }, [])

  // Handle map click
  const handleMapClick = (x: number, y: number) => {
    setClickPosition({ x, y })
    setEditingMarker(null)
    setFormData({
      ...emptyForm,
      x: Math.round(x),
      y: Math.round(y),
    })
    setIsModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (marker: MapMarker) => {
    setEditingMarker(marker)
    setClickPosition(null)
    setFormData({
      name: marker.name,
      description: marker.description || '',
      type: marker.type,
      x: marker.x,
      y: marker.y,
      iconUrl: marker.iconUrl || '',
      mobId: marker.mobId || '',
      isActive: marker.isActive,
    })
    setIsModalOpen(true)
  }

  // Handle form change
  const handleFormChange = (field: keyof MarkerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Save marker
  const handleSave = async () => {
    if (!formData.name || !formData.type) {
      alert('Name and type are required')
      return
    }

    setSaving(true)
    try {
      const url = editingMarker
        ? `/api/admin/map-markers/${editingMarker.id}`
        : '/api/admin/map-markers'
      const method = editingMarker ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsModalOpen(false)
        fetchMarkers()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save marker')
      }
    } catch (error) {
      console.error('Error saving marker:', error)
      alert('Failed to save marker')
    } finally {
      setSaving(false)
    }
  }

  // Delete marker
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this marker?')) return

    try {
      const response = await fetch(`/api/admin/map-markers/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchMarkers()
      } else {
        alert('Failed to delete marker')
      }
    } catch (error) {
      console.error('Error deleting marker:', error)
      alert('Failed to delete marker')
    }
  }

  // Check if type is a spawn type
  const isSpawnType = (type: string) => type.startsWith('SPAWN_')

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-primary bg-bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Map Markers Management</h1>
            <p className="text-text-secondary text-sm">
              Click on the map to add new markers. ({markers.length} markers total)
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-400">
              Click map to add marker
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Markers List */}
        <div className="w-80 border-r border-border-primary bg-bg-secondary overflow-y-auto">
          <div className="p-4 border-b border-border-primary">
            <h2 className="font-semibold text-text-primary">Markers</h2>
          </div>
          <div className="p-2 space-y-1">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
              </div>
            ) : markers.length === 0 ? (
              <div className="text-center py-8 text-text-muted text-sm">
                No markers yet. Click on the map to add one.
              </div>
            ) : (
              markers.map((marker) => (
                <div
                  key={marker.id}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-bg-tertiary group"
                >
                  <MapPin className="w-4 h-4 text-accent-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {marker.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {MARKER_TYPES[marker.type]?.label || marker.type}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => openEditModal(marker)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-400"
                      onClick={() => handleDelete(marker.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <GameMap
            markers={markers}
            selectedTypes={selectedTypes}
            levelRange={levelRange}
            onMapClick={handleMapClick}
            isAdmin={true}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-bg-secondary border border-border-primary rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-bg-secondary border-b border-border-primary p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                {editingMarker ? 'Edit Marker' : 'Add New Marker'}
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
              <div>
                <label className="text-sm text-text-secondary mb-2 block">Marker Name *</label>
                <Input
                  placeholder="Enter marker name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-text-secondary mb-2 block">Marker Type *</label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => handleFormChange('type', v as MarkerType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(MARKER_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mob selector for spawn types */}
              {isSpawnType(formData.type) && (
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Link to Mob</label>
                  <Select
                    value={formData.mobId || '_none'}
                    onValueChange={(v) => {
                      const value = v === '_none' ? '' : v
                      handleFormChange('mobId', value)
                      // Auto-fill name from mob if empty
                      if (!formData.name && value) {
                        const mob = mobs.find((m) => m.id === value)
                        if (mob) {
                          handleFormChange('name', mob.name)
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mob (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_none">None</SelectItem>
                      {mobs.map((mob) => (
                        <SelectItem key={mob.id} value={mob.id}>
                          {mob.name} (Lv. {mob.level})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">X Position</label>
                  <Input
                    type="number"
                    value={formData.x}
                    onChange={(e) => handleFormChange('x', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Y Position</label>
                  <Input
                    type="number"
                    value={formData.y}
                    onChange={(e) => handleFormChange('y', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-text-secondary mb-2 block">Custom Icon URL</label>
                <Input
                  placeholder="/game-images/interactive-map/..."
                  value={formData.iconUrl}
                  onChange={(e) => handleFormChange('iconUrl', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-text-secondary mb-2 block">Description</label>
                <textarea
                  className="w-full h-24 rounded-md border border-border-primary bg-bg-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleFormChange('isActive', e.target.checked)}
                    className="rounded border-border-primary bg-bg-tertiary"
                  />
                  <span className="text-sm text-text-secondary">Active (visible on map)</span>
                </label>
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
                {editingMarker ? 'Update Marker' : 'Add Marker'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
