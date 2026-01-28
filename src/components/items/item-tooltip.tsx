'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

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

// Helper to format stat value (handles both number and StatValue)
const formatStatValue = (value: number | StatValue): string => {
  if (typeof value === 'number') {
    return `${value}`
  }
  return value.min === value.max ? `${value.min}` : `${value.min}-${value.max}`
}

interface ItemTooltipProps {
  item: Item
  children: React.ReactNode
}

const rarityColors: Record<string, string> = {
  COMMON: '#9ca3af',
  UNCOMMON: '#4ade80',
  RARE: '#60a5fa',
  EPIC: '#c084fc',
  LEGENDARY: '#fb923c',
  MYTHIC: '#f87171',
}

const rarityNames: Record<string, string> = {
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  EPIC: 'Epic',
  LEGENDARY: 'Legendary',
  MYTHIC: 'Mythic',
}

const typeNames: Record<string, string> = {
  HELMET: 'Heavy Armor Head',
  WEAPON: 'Weapon',
  GLOVES: 'Bracelet',
  BOOTS: 'Boots',
  SHIELD: 'Shield',
  EARRING: 'Earring',
  ARMOR: 'Heavy Armor Chest',
  NECKLACE: 'Necklace',
}

const classNames: Record<string, string> = {
  WARRIOR: 'Warrior',
  NINJA: 'Ninja',
  SHAMAN: 'Shaman',
  NECROMANCER: 'Necromancer',
}

const statLabels: Record<string, string> = {
  hp: 'Max HP',
  mp: 'Max Mana',
  maxhp: 'Max HP',
  maxmp: 'Max Mana',
  attack: 'Phys Attack',
  physattack: 'Phys Attack',
  physicalattack: 'Phys Attack',
  defense: 'Phys Defense',
  physdefense: 'Phys Defense',
  physicaldefense: 'Phys Defense',
  magicattack: 'Magic Attack',
  magicdefense: 'Magic Defense',
  critrate: 'Crit Rate',
  critdamage: 'Crit Damage',
  criticalrate: 'Crit Rate',
  criticaldamage: 'Crit Damage',
  accuracy: 'Accuracy',
  evasion: 'Evasion',
  str: 'Strength',
  strength: 'Strength',
  dex: 'Dexterity',
  dexterity: 'Dexterity',
  int: 'Intelligence',
  intelligence: 'Intelligence',
  vig: 'Vigor',
  vigor: 'Vigor',
  mentality: 'Mentality',
  healingpower: 'Healing Power',
  healingcritchance: 'Healing Crit Chance',
  healingcritpower: 'Healing Crit Power',
  maxmana: 'Max Mana',
}

// Format stat name if not found in labels
const formatStatName = (stat: string): string => {
  const lowerStat = stat.toLowerCase()
  if (statLabels[lowerStat]) return statLabels[lowerStat]
  // Convert camelCase or snake_case to Title Case
  return stat
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase())
    .trim()
}

export function ItemTooltip({ item, children }: ItemTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const rarityColor = rarityColors[item.rarity] || rarityColors.COMMON

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let x = triggerRect.right + 12
      let y = triggerRect.top

      // Check if tooltip goes off right edge
      if (x + tooltipRect.width > viewportWidth - 20) {
        x = triggerRect.left - tooltipRect.width - 12
      }

      // Check if tooltip goes off bottom edge
      if (y + tooltipRect.height > viewportHeight - 20) {
        y = viewportHeight - tooltipRect.height - 20
      }

      // Check if tooltip goes off top edge
      if (y < 20) {
        y = 20
      }

      setPosition({ x, y })
    }
  }, [isVisible])

  const statsEntries = Object.entries(item.stats || {})

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="relative"
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-[100] pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <div
            className="min-w-[280px] max-w-[340px] rounded-md overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #1e2124 0%, #15171a 100%)',
              border: '1px solid #3a3f44',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header - Item Name, Type, Grade */}
            <div className="flex items-start gap-3 p-3 border-b border-[#3a3f44]">
              {/* Item Icon */}
              <div
                className="w-12 h-12 rounded flex-shrink-0 overflow-hidden"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid #3a3f44',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/game-images/placeholder.png'
                  }}
                />
              </div>

              {/* Name & Type */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-base leading-tight"
                  style={{ color: rarityColor }}
                >
                  {item.name}
                  {item.enhancementLevel && item.enhancementLevel > 0 && (
                    <span className="text-orange-400 ml-1">+{item.enhancementLevel}</span>
                  )}
                </h3>
                <p className="text-xs text-[#8a9199] mt-0.5">
                  {rarityNames[item.rarity]} · {item.requiredClass ? classNames[item.requiredClass] || item.requiredClass : 'All Classes'}
                </p>
              </div>

              {/* Grade */}
              <div className="text-right flex-shrink-0">
                <span className="text-xs text-[#6b7280]">Grade: </span>
                <span className="text-xs" style={{ color: rarityColor }}>{rarityNames[item.rarity]}</span>
              </div>
            </div>

            {/* Stats Section */}
            {statsEntries.length > 0 && (
              <div className="px-3 py-2 border-b border-[#3a3f44]">
                {statsEntries.map(([stat, value]) => (
                  <div key={stat} className="py-0.5">
                    <span className="text-white text-sm font-medium">{formatStatValue(value)}</span>
                    <span className="text-[#8a9199] text-sm ml-2">{formatStatName(stat)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Enchantments */}
            {item.enchantments && item.enchantments.length > 0 && (
              <div className="px-3 py-2 border-b border-[#3a3f44]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-xs font-medium text-purple-400">Enchantments</span>
                </div>
                {item.enchantments.map((ench) => (
                  <div key={ench.id} className="py-0.5">
                    <span className="text-purple-300 text-sm font-medium">+{ench.value}</span>
                    <span className="text-purple-200 text-sm ml-2">{formatStatName(ench.statKey)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer - Requirements */}
            <div className="px-3 py-2 bg-[#12141680]">
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Required Level - </span>
                <span className="text-[#d1d5db]">{item.requiredLevel || 1}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Item Level:</span>
                <span className="text-[#d1d5db]">{item.level || 1}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
