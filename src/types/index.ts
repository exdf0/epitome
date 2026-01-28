import type { Role, ItemType, Rarity, CharacterClass, EquipmentSlot, MarkerType, GuideCategory } from '@prisma/client'

// Re-export Prisma enums
export { Role, ItemType, Rarity, CharacterClass, EquipmentSlot, MarkerType, GuideCategory }

// ==================== STATS ====================

export interface Stats {
  str?: number
  dex?: number
  int?: number
  wis?: number
  con?: number
  hp?: number
  mp?: number
  attack?: number
  defense?: number
  critRate?: number
  critDamage?: number
}

// ==================== ITEMS ====================

export interface ItemStats extends Stats {
  [key: string]: number | undefined
}

export interface DropSource {
  mobName: string
  dropRate: number
  location?: string
}

export interface CraftMaterial {
  itemId: string
  itemName: string
  quantity: number
}

export interface CraftRecipe {
  materials: CraftMaterial[]
  npcName?: string
  goldCost?: number
}

// ==================== BUILDS ====================

export interface StatsAllocation {
  str: number
  dex: number
  int: number
  wis: number
  con: number
}

export type BuildTag = 'PvP' | 'PvE' | '1v1' | 'Mass War' | 'Leveling' | 'Farming'

// ==================== SKILL ====================

export interface SkillEffect {
  damage?: number
  healing?: number
  duration?: number
  cooldown?: number
  manaCost?: number
  scaling?: Partial<Record<keyof Stats, number>>
}

// ==================== MAP ====================

export interface MarkerMetadata {
  level?: number
  respawnTime?: number
  drops?: string[]
  notes?: string
}

// ==================== FILTERS ====================

export interface ItemFilters {
  search?: string
  type?: ItemType
  rarity?: Rarity
  minLevel?: number
  maxLevel?: number
  class?: CharacterClass
}

export interface BuildFilters {
  search?: string
  class?: CharacterClass
  tags?: BuildTag[]
  sortBy?: 'newest' | 'popular' | 'rating'
}

// ==================== PAGINATION ====================

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
