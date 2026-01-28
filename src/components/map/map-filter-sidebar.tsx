'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Skull, MapPin, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

// Marker type definitions
export const MARKER_TYPES = {
  // Spawns
  SPAWN_GENERAL: { label: 'General Mobs', category: 'spawns', icon: '/game-images/interactive-map/GeneralMob.webp' },
  SPAWN_MINI_BOSS: { label: 'Mini-Boss', category: 'spawns', icon: '/game-images/interactive-map/mini-boss.webp' },
  SPAWN_BOSS: { label: 'Boss', category: 'spawns', icon: '/game-images/interactive-map/boss.webp' },
  SPAWN_TAMEABLE: { label: 'Tameable Mobs', category: 'spawns', icon: '/game-images/interactive-map/GeneralMob.webp' },

  // Points of Interest
  POI_NODE: { label: 'Nodes', category: 'poi', icon: '/game-images/interactive-map/node.png' },
  POI_DUNGEON: { label: 'Dungeons', category: 'poi', icon: '/game-images/interactive-map/dungeon.png' },
  POI_SHRINE: { label: 'Shrines', category: 'poi', icon: '/game-images/interactive-map/shrine.png' },
  POI_DOMINATION: { label: 'Domination Zones', category: 'poi', icon: '/game-images/interactive-map/domination.png' },
  POI_QUEST: { label: 'Quests', category: 'poi', icon: '/game-images/interactive-map/quest.png' },
  POI_EVENT: { label: 'Events', category: 'poi', icon: '/game-images/interactive-map/event.png' },

  // NPCs
  NPC_QUEST_GIVER: { label: 'Quest Giver', category: 'npcs', icon: '/game-images/interactive-map/quest.png' },
  NPC_VENDOR: { label: 'Vendor/Merchant', category: 'npcs', icon: '/game-images/interactive-map/merchant.png' },
  NPC_BLACKSMITH: { label: 'Blacksmith', category: 'npcs', icon: '/game-images/interactive-map/blacksmith.png' },
  NPC_STABLEMAN: { label: 'Stableman', category: 'npcs', icon: '/game-images/interactive-map/stableman.png' },
  NPC_VAULTKEEPER: { label: 'Vaultkeeper', category: 'npcs', icon: '/game-images/interactive-map/vaultkeeper.png' },
  NPC_FISHERMAN: { label: 'Fisherman', category: 'npcs', icon: '/game-images/interactive-map/fisherman.png' },
  NPC_MASTER_TRADITION: { label: 'Master of Tradition', category: 'npcs', icon: '/game-images/interactive-map/master_of_tradition.png' },
  NPC_ARMOR_DEALER: { label: 'Armor Dealer', category: 'npcs', icon: '/game-images/interactive-map/armor_dealer.png' },
  NPC_WEAPON_DEALER: { label: 'Weapon Dealer', category: 'npcs', icon: '/game-images/interactive-map/weapon_dealer.png' },
  NPC_BIOLOGIST: { label: 'Biologist', category: 'npcs', icon: '/game-images/interactive-map/biologist.png' },
  NPC_BOTANIST: { label: 'Botanist', category: 'npcs', icon: '/game-images/interactive-map/botanist.png' },
  NPC_GEOLOGIST: { label: 'Geologist', category: 'npcs', icon: '/game-images/interactive-map/geologist.png' },
  NPC_ZOOLOGIST: { label: 'Zoologist', category: 'npcs', icon: '/game-images/interactive-map/zoologist.png' },
  NPC_HYDROLOGIST: { label: 'Hydrologist', category: 'npcs', icon: '/game-images/interactive-map/Hydrologis.png' },
} as const

export type MarkerType = keyof typeof MARKER_TYPES

interface FilterCategory {
  id: string
  label: string
  icon: any
  types: MarkerType[]
}

const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'spawns',
    label: 'Spawns',
    icon: Skull,
    types: ['SPAWN_GENERAL', 'SPAWN_MINI_BOSS', 'SPAWN_BOSS', 'SPAWN_TAMEABLE'],
  },
  {
    id: 'poi',
    label: 'Points of Interest',
    icon: MapPin,
    types: ['POI_NODE', 'POI_DUNGEON', 'POI_SHRINE', 'POI_DOMINATION', 'POI_QUEST', 'POI_EVENT'],
  },
  {
    id: 'npcs',
    label: 'NPCs',
    icon: Users,
    types: [
      'NPC_QUEST_GIVER',
      'NPC_VENDOR',
      'NPC_BLACKSMITH',
      'NPC_STABLEMAN',
      'NPC_VAULTKEEPER',
      'NPC_FISHERMAN',
      'NPC_MASTER_TRADITION',
      'NPC_ARMOR_DEALER',
      'NPC_WEAPON_DEALER',
      'NPC_BIOLOGIST',
      'NPC_BOTANIST',
      'NPC_GEOLOGIST',
      'NPC_ZOOLOGIST',
      'NPC_HYDROLOGIST',
    ],
  },
]

interface MapFilterSidebarProps {
  selectedTypes: MarkerType[]
  onTypesChange: (types: MarkerType[]) => void
  levelRange: [number, number]
  onLevelRangeChange: (range: [number, number]) => void
}

export function MapFilterSidebar({
  selectedTypes,
  onTypesChange,
  levelRange,
  onLevelRangeChange,
}: MapFilterSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['spawns', 'poi', 'npcs'])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleType = (type: MarkerType) => {
    onTypesChange(
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
    )
  }

  const toggleAllInCategory = (category: FilterCategory) => {
    const allSelected = category.types.every((type) => selectedTypes.includes(type))
    if (allSelected) {
      onTypesChange(selectedTypes.filter((t) => !category.types.includes(t)))
    } else {
      const newTypes = [...selectedTypes]
      category.types.forEach((type) => {
        if (!newTypes.includes(type)) {
          newTypes.push(type)
        }
      })
      onTypesChange(newTypes)
    }
  }

  const selectAll = () => {
    onTypesChange(Object.keys(MARKER_TYPES) as MarkerType[])
  }

  const deselectAll = () => {
    onTypesChange([])
  }

  return (
    <div className="w-72 bg-bg-secondary border-r border-border-primary h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border-primary">
        <h2 className="text-lg font-bold text-text-primary mb-3">Map Filters</h2>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="flex-1 text-xs px-2 py-1 bg-bg-tertiary hover:bg-bg-hover text-text-secondary rounded transition-colors"
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className="flex-1 text-xs px-2 py-1 bg-bg-tertiary hover:bg-bg-hover text-text-secondary rounded transition-colors"
          >
            Deselect All
          </button>
        </div>
      </div>

      {/* Level Range Filter (for spawns) */}
      <div className="p-4 border-b border-border-primary">
        <h3 className="text-sm font-medium text-text-primary mb-3">Level Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="100"
            value={levelRange[0]}
            onChange={(e) => onLevelRangeChange([parseInt(e.target.value) || 1, levelRange[1]])}
            className="w-16 px-2 py-1 bg-bg-tertiary border border-border-primary rounded text-text-primary text-sm"
          />
          <span className="text-text-muted">-</span>
          <input
            type="number"
            min="1"
            max="100"
            value={levelRange[1]}
            onChange={(e) => onLevelRangeChange([levelRange[0], parseInt(e.target.value) || 100])}
            className="w-16 px-2 py-1 bg-bg-tertiary border border-border-primary rounded text-text-primary text-sm"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="p-2">
        {FILTER_CATEGORIES.map((category) => {
          const isExpanded = expandedCategories.includes(category.id)
          const selectedCount = category.types.filter((t) => selectedTypes.includes(t)).length
          const allSelected = selectedCount === category.types.length
          const someSelected = selectedCount > 0 && !allSelected
          const CategoryIcon = category.icon

          return (
            <div key={category.id} className="mb-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-bg-tertiary rounded-md transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                )}
                <CategoryIcon className="w-4 h-4 text-accent-primary" />
                <span className="flex-1 text-left text-sm font-medium text-text-primary">
                  {category.label}
                </span>
                <span className="text-xs text-text-muted">
                  {selectedCount}/{category.types.length}
                </span>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected
                  }}
                  onChange={() => toggleAllInCategory(category)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded border-border-primary bg-bg-tertiary accent-accent-primary"
                />
              </button>

              {/* Category Items */}
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {category.types.map((type) => {
                    const typeInfo = MARKER_TYPES[type]
                    const isSelected = selectedTypes.includes(type)

                    return (
                      <label
                        key={type}
                        className={cn(
                          'flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors',
                          isSelected ? 'bg-bg-tertiary' : 'hover:bg-bg-tertiary/50'
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleType(type)}
                          className="w-4 h-4 rounded border-border-primary bg-bg-tertiary accent-accent-primary"
                        />
                        {typeInfo.icon && (
                          <img
                            src={typeInfo.icon}
                            alt=""
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        <span className={cn(
                          'text-sm',
                          isSelected ? 'text-text-primary' : 'text-text-secondary'
                        )}>
                          {typeInfo.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
