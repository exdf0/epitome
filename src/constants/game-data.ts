// Game constants and static data

export const CHARACTER_CLASSES = {
  WARRIOR: {
    name: 'Warrior',
    description: 'Frontline melee fighter with high defense and powerful attacks.',
    primaryStat: 'STR',
    secondaryStat: 'CON',
    color: '#dc2626', // red
  },
  NINJA: {
    name: 'Ninja',
    description: 'Agile assassin specializing in quick strikes and evasion.',
    primaryStat: 'DEX',
    secondaryStat: 'STR',
    color: '#16a34a', // green
  },
  SHAMAN: {
    name: 'Shaman',
    description: 'Versatile spellcaster with healing and elemental abilities.',
    primaryStat: 'INT',
    secondaryStat: 'WIS',
    color: '#2563eb', // blue
  },
  NECROMANCER: {
    name: 'Necromancer',
    description: 'Dark mage commanding undead minions and draining life force.',
    primaryStat: 'INT',
    secondaryStat: 'WIS',
    color: '#7c3aed', // purple
  },
} as const

// Class images - stored in /public/game-images/classess/
export const CLASS_IMAGES = {
  WARRIOR: '/game-images/classess/warrior.png',
  NINJA: '/game-images/classess/ninja.png',
  SHAMAN: '/game-images/classess/shaman.png',
  NECROMANCER: '/game-images/classess/necromancer.png',
} as const

// Skill evolution system
// 0 points = no skill (gray/locked)
// 1-14 points = basic
// 15-24 points = developed
// 25-34 points = master
// 35-45 points = perfect (max)
export const SKILL_EVOLUTION = {
  MAX_POINTS: 45,
  LEVELS: {
    NONE: { min: 0, max: 0, suffix: '', label: 'Locked' },
    BASIC: { min: 1, max: 14, suffix: '_basic', label: 'Basic' },
    DEVELOPED: { min: 15, max: 24, suffix: '_developed', label: 'Developed' },
    MASTER: { min: 25, max: 34, suffix: '_master', label: 'Master' },
    PERFECT: { min: 35, max: 45, suffix: '_perfect', label: 'Perfect' },
  },
} as const

// Helper function to get skill evolution level based on points
export const getSkillEvolutionLevel = (points: number): keyof typeof SKILL_EVOLUTION.LEVELS => {
  if (points <= 0) return 'NONE'
  if (points <= 14) return 'BASIC'
  if (points <= 24) return 'DEVELOPED'
  if (points <= 34) return 'MASTER'
  return 'PERFECT'
}

// Helper function to get skill icon path based on points
export const getSkillIconPath = (baseIconPath: string, points: number): string => {
  const level = getSkillEvolutionLevel(points)
  const suffix = SKILL_EVOLUTION.LEVELS[level].suffix

  // If no points, return a locked/gray version or the basic version
  if (level === 'NONE') {
    // Return basic version but it will be displayed grayed out
    return baseIconPath.replace('.png', '_basic.png')
  }

  // Replace the file extension with the evolution suffix
  return baseIconPath.replace('.png', `${suffix}.png`)
}

export const ITEM_TYPES = {
  WEAPON: 'Weapon',
  HELMET: 'Helmet',
  ARMOR: 'Armor',
  GLOVES: 'Gloves',
  BOOTS: 'Boots',
  SHIELD: 'Shield',
  ACCESSORY: 'Accessory',
  CONSUMABLE: 'Consumable',
  MATERIAL: 'Material',
  QUEST: 'Quest',
} as const

export const RARITIES = {
  COMMON: { name: 'Common', color: '#9ca3af' },
  UNCOMMON: { name: 'Uncommon', color: '#22c55e' },
  RARE: { name: 'Rare', color: '#3b82f6' },
  EPIC: { name: 'Epic', color: '#a855f7' },
  LEGENDARY: { name: 'Legendary', color: '#f59e0b' },
  MYTHIC: { name: 'Mythic', color: '#ef4444' },
} as const

export const EQUIPMENT_SLOTS = {
  WEAPON: 'Weapon',
  HELMET: 'Helmet',
  ARMOR: 'Armor',
  GLOVES: 'Gloves',
  BOOTS: 'Boots',
  SHIELD: 'Shield',
  RING_1: 'Ring 1',
  RING_2: 'Ring 2',
  NECKLACE: 'Necklace',
  EARRING: 'Earring',
} as const

export const STATS = {
  vig: { name: 'Vigor', abbr: 'VIG', description: 'Increases HP and defense' },
  int: { name: 'Intelligence', abbr: 'INT', description: 'Increases magical attack power and MP' },
  str: { name: 'Strength', abbr: 'STR', description: 'Increases physical attack power' },
  dex: { name: 'Dexterity', abbr: 'DEX', description: 'Increases attack speed and critical rate' },
} as const

export const BUILD_TAGS = [
  'PvP',
  'PvE',
  '1v1',
  'Mass War',
  'Leveling',
  'Farming',
] as const

export const GUIDE_CATEGORIES = {
  BEGINNER: 'Beginner',
  CLASS_GUIDE: 'Class Guide',
  PVP: 'PvP',
  PVE: 'PvE',
  CRAFTING: 'Crafting',
  ECONOMY: 'Economy',
  ADVANCED: 'Advanced',
} as const

export const MARKER_TYPES = {
  MOB_SPAWN: { name: 'Mob Spawn', icon: 'skull', color: '#ef4444' },
  NPC: { name: 'NPC', icon: 'user', color: '#3b82f6' },
  BOSS: { name: 'Boss', icon: 'crown', color: '#f59e0b' },
  DUNGEON: { name: 'Dungeon', icon: 'door', color: '#8b5cf6' },
  TOWN: { name: 'Town', icon: 'home', color: '#22c55e' },
  SHOP: { name: 'Shop', icon: 'store', color: '#06b6d4' },
  QUEST: { name: 'Quest', icon: 'scroll', color: '#eab308' },
  RESOURCE: { name: 'Resource', icon: 'gem', color: '#ec4899' },
  POI: { name: 'Point of Interest', icon: 'flag', color: '#6366f1' },
} as const
