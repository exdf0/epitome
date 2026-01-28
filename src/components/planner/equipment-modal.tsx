'use client'

import { useState, useEffect } from 'react'
import { X, Search, Loader2, Sparkles, Plus, Trash2, ChevronLeft } from 'lucide-react'
import { Input, Badge, Button } from '@/components/ui'

interface Enchantment {
  id: string
  name: string
  statKey: string
  value: number
  minValue?: number
  maxValue?: number
}

export interface StatValue {
  min: number
  max: number
}

export interface Item {
  id: string
  name: string
  type?: string
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC'
  level?: number
  requiredLevel?: number
  requiredClass?: string | null
  stats: Record<string, StatValue>
  image: string
  enchantments?: Enchantment[]
  isGear?: boolean
  enhancementLevel?: number
  enhancementBonuses?: Record<string, Record<string, StatValue | number>>
}

interface AvailableEnchantment {
  id: string
  name: string
  slug: string
  description?: string
  minValue: number
  maxValue: number
  statKey: string
  equipmentTypes: string[]
}

interface EquipmentModalProps {
  isOpen: boolean
  onClose: () => void
  slotType: string
  slotName: string
  onSelectItem: (item: Item | null) => void
  selectedItem: Item | null
}

const rarityColors: Record<string, string> = {
  COMMON: 'text-gray-400 border-gray-400',
  UNCOMMON: 'text-green-400 border-green-400',
  RARE: 'text-blue-400 border-blue-400',
  EPIC: 'text-purple-400 border-purple-400',
  LEGENDARY: 'text-orange-400 border-orange-400',
  MYTHIC: 'text-red-400 border-red-400',
}

const rarityBgColors: Record<string, string> = {
  COMMON: 'bg-gray-400/10',
  UNCOMMON: 'bg-green-400/10',
  RARE: 'bg-blue-400/10',
  EPIC: 'bg-purple-400/10',
  LEGENDARY: 'bg-orange-400/10',
  MYTHIC: 'bg-red-400/10',
}

const statNames: Record<string, string> = {
  str: 'Strength',
  dex: 'Dexterity',
  int: 'Intelligence',
  vig: 'Vigor',
  hp: 'HP',
  mp: 'MP',
  attack: 'Attack',
  defense: 'Defense',
  magicAttack: 'Magic Attack',
  magicDefense: 'Magic Defense',
  critRate: 'Crit Rate',
  critDamage: 'Crit Damage',
  moveSpeed: 'Move Speed',
  blockRate: 'Block Rate',
}

export function EquipmentModal({ isOpen, onClose, slotType, slotName, onSelectItem, selectedItem }: EquipmentModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Enchantment states
  const [step, setStep] = useState<'item' | 'enchantment'>('item')
  const [tempSelectedItem, setTempSelectedItem] = useState<Item | null>(null)
  const [availableEnchantments, setAvailableEnchantments] = useState<AvailableEnchantment[]>([])
  const [itemEnchantments, setItemEnchantments] = useState<Enchantment[]>([])
  const [loadingEnchantments, setLoadingEnchantments] = useState(false)

  // Enhancement level state
  const [enhancementLevel, setEnhancementLevel] = useState(0)
  const enhancementLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // Fetch items from API when modal opens
  useEffect(() => {
    if (isOpen && slotType) {
      setLoading(true)
      setError(null)
      setStep('item')
      setTempSelectedItem(null)
      setItemEnchantments(selectedItem?.enchantments || [])
      setEnhancementLevel(selectedItem?.enhancementLevel || 0)

      fetch(`/api/items?type=${slotType}&isGear=true`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const transformedItems = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              type: item.type,
              rarity: item.rarity,
              level: item.level,
              requiredLevel: item.requiredLevel,
              requiredClass: item.requiredClass,
              stats: item.stats || {},
              image: item.imageUrl || `/game-images/equipment/siluet/${slotType.toLowerCase()}.webp`,
              isGear: item.isGear,
              enhancementBonuses: item.enhancementBonuses || {},
            }))
            setItems(transformedItems)
          } else {
            setItems([])
          }
        })
        .catch(err => {
          console.error('Error fetching items:', err)
          setError('Failed to load items')
          setItems([])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isOpen, slotType])

  // Fetch enchantments when moving to enchantment step
  useEffect(() => {
    if (step === 'enchantment' && slotType) {
      setLoadingEnchantments(true)
      fetch(`/api/enchantments?type=${slotType}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setAvailableEnchantments(data)
          } else {
            setAvailableEnchantments([])
          }
        })
        .catch(err => {
          console.error('Error fetching enchantments:', err)
          setAvailableEnchantments([])
        })
        .finally(() => {
          setLoadingEnchantments(false)
        })
    }
  }, [step, slotType])

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRarity = !selectedRarity || item.rarity === selectedRarity
    return matchesSearch && matchesRarity
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle item selection - move to enchantment step
  const handleItemSelect = (item: Item) => {
    setTempSelectedItem(item)
    // Keep existing enchantments and enhancement level if same item, otherwise reset
    if (selectedItem?.id === item.id) {
      setItemEnchantments(selectedItem.enchantments || [])
      setEnhancementLevel(selectedItem.enhancementLevel || 0)
    } else {
      setItemEnchantments([])
      setEnhancementLevel(0)
    }
    setStep('enchantment')
  }

  // Calculate total stats with enhancement bonuses
  const getTotalStats = (item: Item, enhLevel: number): Record<string, StatValue> => {
    // Deep copy base stats
    const base: Record<string, StatValue> = {}
    Object.entries(item.stats || {}).forEach(([stat, value]) => {
      base[stat] = { min: value.min, max: value.max }
    })

    // Add enhancement bonuses (adds to both min and max)
    if (item.enhancementBonuses && enhLevel > 0) {
      for (let lvl = 1; lvl <= enhLevel; lvl++) {
        const bonuses = item.enhancementBonuses[lvl.toString()] || {}
        Object.entries(bonuses).forEach(([stat, bonus]) => {
          // Handle both number and StatValue formats
          const bonusMin = typeof bonus === 'number' ? bonus : bonus.min
          const bonusMax = typeof bonus === 'number' ? bonus : bonus.max
          if (base[stat]) {
            base[stat].min += bonusMin
            base[stat].max += bonusMax
          } else {
            base[stat] = { min: bonusMin, max: bonusMax }
          }
        })
      }
    }

    return base
  }

  // Check if item has enhancement data
  const hasEnhancementData = (item: Item) => {
    return item.isGear && Object.keys(item.enhancementBonuses || {}).length > 0
  }

  // Add enchantment to item
  const addEnchantment = (ench: AvailableEnchantment) => {
    // Check if already added
    if (itemEnchantments.some(e => e.id === ench.id)) return

    setItemEnchantments(prev => [
      ...prev,
      {
        id: ench.id,
        name: ench.name,
        statKey: ench.statKey,
        value: ench.minValue,
        minValue: ench.minValue,
        maxValue: ench.maxValue,
      }
    ])
  }

  // Remove enchantment from item
  const removeEnchantment = (enchId: string) => {
    setItemEnchantments(prev => prev.filter(e => e.id !== enchId))
  }

  // Update enchantment value
  const updateEnchantmentValue = (enchId: string, value: number) => {
    setItemEnchantments(prev => prev.map(e =>
      e.id === enchId ? { ...e, value } : e
    ))
  }

  // Confirm selection with enchantments and enhancement level
  const handleConfirm = () => {
    if (tempSelectedItem) {
      const totalStats = getTotalStats(tempSelectedItem, enhancementLevel)
      onSelectItem({
        ...tempSelectedItem,
        stats: totalStats,
        enchantments: itemEnchantments.length > 0 ? itemEnchantments : undefined,
        enhancementLevel: hasEnhancementData(tempSelectedItem) ? enhancementLevel : undefined,
      })
    }
    onClose()
  }

  // Go back to item selection
  const goBackToItems = () => {
    setStep('item')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-bg-secondary border border-border-primary rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <div className="flex items-center gap-4">
            {step === 'enchantment' && (
              <button
                onClick={goBackToItems}
                className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-muted" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                {step === 'item' ? `Select ${slotName}` : 'Add Enchantments'}
              </h2>
              <p className="text-text-muted mt-1">
                {step === 'item'
                  ? `Choose an item for your ${slotName.toLowerCase()} slot`
                  : `Add enchantments to ${tempSelectedItem?.name}`
                }
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
          >
            <X className="w-6 h-6 text-text-muted" />
          </button>
        </div>

        {step === 'item' ? (
          <>
            {/* Filters */}
            <div className="p-6 border-b border-border-primary space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg bg-bg-tertiary border-border-primary"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedRarity(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !selectedRarity
                      ? 'bg-orange-500 text-white'
                      : 'bg-bg-tertiary text-text-secondary hover:bg-bg-hover'
                  }`}
                >
                  All
                </button>
                {['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'].map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setSelectedRarity(rarity)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedRarity === rarity
                        ? `${rarityBgColors[rarity]} ${rarityColors[rarity]} border ${rarityColors[rarity]}`
                        : 'bg-bg-tertiary text-text-secondary hover:bg-bg-hover'
                    }`}
                  >
                    {rarity.charAt(0) + rarity.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Items Grid */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {selectedItem && (
                <button
                  onClick={() => {
                    onSelectItem(null)
                    onClose()
                  }}
                  className="w-full mb-4 p-4 rounded-xl border-2 border-dashed border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Remove Current Item
                </button>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-12 text-text-muted">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p>Loading items...</p>
                </div>
              )}

              {error && !loading && (
                <div className="text-center py-12 text-red-400">
                  <p className="text-lg">{error}</p>
                  <p className="text-sm mt-2 text-text-muted">Please try again later</p>
                </div>
              )}

              {!loading && !error && filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                        selectedItem?.id === item.id
                          ? `${rarityBgColors[item.rarity]} ${rarityColors[item.rarity]}`
                          : 'bg-bg-tertiary border-border-primary hover:border-border-secondary'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-lg border-2 ${rarityColors[item.rarity]} ${rarityBgColors[item.rarity]} flex items-center justify-center flex-shrink-0`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `/game-images/equipment/siluet/${slotType.toLowerCase()}.webp`
                          }}
                        />
                      </div>

                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold ${rarityColors[item.rarity]}`}>{item.name}</span>
                          <Badge className={`text-xs ${rarityBgColors[item.rarity]} ${rarityColors[item.rarity]}`}>
                            {item.rarity}
                          </Badge>
                        </div>
                        <p className="text-text-muted text-sm mb-2">Level {item.requiredLevel || item.level} Required</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(item.stats).map(([stat, value]) => {
                            const statVal = value as StatValue
                            const display = statVal.min === statVal.max
                              ? `+${statVal.min}`
                              : `${statVal.min}-${statVal.max}`
                            return (
                              <span key={stat} className="text-xs bg-bg-hover px-2 py-1 rounded text-text-secondary">
                                {display} {statNames[stat] || stat}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : !loading && !error && (
                <div className="text-center py-12 text-text-muted">
                  <p className="text-lg">No items found</p>
                  <p className="text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Enchantment Step */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Selected Item Preview */}
              {tempSelectedItem && (
                <div className={`flex items-center gap-4 p-4 rounded-xl border-2 mb-6 ${rarityBgColors[tempSelectedItem.rarity]} ${rarityColors[tempSelectedItem.rarity]}`}>
                  <div className={`w-14 h-14 rounded-lg border-2 ${rarityColors[tempSelectedItem.rarity]} flex items-center justify-center`}>
                    <img
                      src={tempSelectedItem.image}
                      alt={tempSelectedItem.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <span className={`font-bold ${rarityColors[tempSelectedItem.rarity]}`}>
                      {tempSelectedItem.name}
                      {enhancementLevel > 0 && (
                        <span className="text-orange-400 ml-1">+{enhancementLevel}</span>
                      )}
                    </span>
                    <p className="text-text-muted text-sm">Level {tempSelectedItem.requiredLevel || tempSelectedItem.level}</p>
                  </div>
                </div>
              )}

              {/* Enhancement Level Selector */}
              {tempSelectedItem && hasEnhancementData(tempSelectedItem) && (
                <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                  <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    Enhancement Level
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {enhancementLevels.map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setEnhancementLevel(lvl)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          enhancementLevel === lvl
                            ? 'bg-orange-500 text-white'
                            : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                        }`}
                      >
                        +{lvl}
                      </button>
                    ))}
                  </div>

                  {/* Stats Preview with Enhancement */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(getTotalStats(tempSelectedItem, enhancementLevel)).map(([stat, value]) => {
                      const baseValue = tempSelectedItem.stats[stat] || { min: 0, max: 0 }
                      const bonusMin = value.min - baseValue.min
                      const bonusMax = value.max - baseValue.max
                      const hasBonus = bonusMin > 0 || bonusMax > 0

                      // Display format
                      const displayValue = value.min === value.max
                        ? `+${value.min}`
                        : `${value.min}-${value.max}`

                      const displayBonus = bonusMin === bonusMax
                        ? `+${bonusMin}`
                        : `+${bonusMin}-${bonusMax}`

                      return (
                        <div key={stat} className="px-3 py-2 bg-bg-secondary rounded-lg">
                          <span className="text-sm text-text-secondary">{statNames[stat] || stat}: </span>
                          <span className="font-medium text-text-primary">{displayValue}</span>
                          {hasBonus && (
                            <span className="text-orange-400 text-xs ml-1">({displayBonus})</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Current Enchantments */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Current Enchantments
                </h3>

                {itemEnchantments.length === 0 ? (
                  <p className="text-text-muted text-sm py-4 text-center border border-dashed border-border-primary rounded-lg">
                    No enchantments added yet. Add enchantments from below.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {itemEnchantments.map((ench) => (
                      <div
                        key={ench.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30"
                      >
                        <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-purple-300">{ench.name}</span>
                            <button
                              onClick={() => removeEnchantment(ench.id)}
                              className="p-1 rounded hover:bg-red-500/20 text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-text-muted">
                              {statNames[ench.statKey] || ench.statKey}:
                            </span>
                            <input
                              type="range"
                              min={ench.minValue || 1}
                              max={ench.maxValue || 10}
                              value={ench.value}
                              onChange={(e) => updateEnchantmentValue(ench.id, parseInt(e.target.value))}
                              className="flex-1 accent-purple-500"
                            />
                            <span className="text-sm font-bold text-purple-400 w-8 text-right">
                              +{ench.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Available Enchantments */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Available Enchantments</h3>

                {loadingEnchantments ? (
                  <div className="flex items-center justify-center py-8 text-text-muted">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    <span>Loading enchantments...</span>
                  </div>
                ) : availableEnchantments.length === 0 ? (
                  <p className="text-text-muted text-sm py-4 text-center">
                    No enchantments available for this equipment type.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableEnchantments.map((ench) => {
                      const isAdded = itemEnchantments.some(e => e.id === ench.id)
                      return (
                        <button
                          key={ench.id}
                          onClick={() => !isAdded && addEnchantment(ench)}
                          disabled={isAdded}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                            isAdded
                              ? 'bg-bg-tertiary/50 border-border-primary opacity-50 cursor-not-allowed'
                              : 'bg-bg-tertiary border-border-primary hover:border-purple-500/50 hover:bg-purple-500/10'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-text-primary truncate">{ench.name}</div>
                            <div className="text-xs text-text-muted">
                              {statNames[ench.statKey] || ench.statKey}: {ench.minValue}-{ench.maxValue}
                            </div>
                          </div>
                          {!isAdded && (
                            <Plus className="w-5 h-5 text-purple-400 flex-shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-primary flex justify-end gap-3">
              <Button variant="secondary" onClick={goBackToItems}>
                Back
              </Button>
              <Button onClick={handleConfirm} className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Confirm Selection
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export type { Enchantment }
