// XP Table - Experience requirements for each level

export interface XpTableEntry {
  level: number
  xpRequired: number
  totalXp: number
  statPoints: number
  skillPoints: number
}

// Generate XP table for levels 1-100
export const XP_TABLE: XpTableEntry[] = Array.from({ length: 100 }, (_, i) => {
  const level = i + 1
  // Formula: 100 * level^2.5 (adjust based on actual game data)
  const xpRequired = Math.floor(100 * Math.pow(level, 2.5))
  const totalXp = Array.from({ length: level }, (_, j) =>
    Math.floor(100 * Math.pow(j + 1, 2.5))
  ).reduce((a, b) => a + b, 0)

  return {
    level,
    xpRequired,
    totalXp,
    statPoints: 5, // Points per level
    skillPoints: level % 5 === 0 ? 1 : 0, // Skill point every 5 levels
  }
})

// Helper to get XP required for a specific level
export function getXpForLevel(level: number): number {
  if (level < 1 || level > 100) return 0
  return XP_TABLE[level - 1].xpRequired
}

// Helper to get total XP to reach a level
export function getTotalXpForLevel(level: number): number {
  if (level < 1 || level > 100) return 0
  return XP_TABLE[level - 1].totalXp
}

// Helper to calculate XP needed between two levels
export function getXpBetweenLevels(fromLevel: number, toLevel: number): number {
  if (fromLevel >= toLevel) return 0
  const fromXp = fromLevel > 0 ? getTotalXpForLevel(fromLevel) : 0
  const toXp = getTotalXpForLevel(toLevel)
  return toXp - fromXp
}

// Example mob XP data
export interface MobXpEntry {
  name: string
  level: number
  xpReward: number
  location: string
}

export const MOB_XP_DATA: MobXpEntry[] = [
  { name: 'Goblin', level: 5, xpReward: 50, location: 'Forest' },
  { name: 'Wolf', level: 10, xpReward: 120, location: 'Plains' },
  { name: 'Orc', level: 20, xpReward: 350, location: 'Mountains' },
  { name: 'Skeleton', level: 30, xpReward: 800, location: 'Dungeon' },
  { name: 'Demon', level: 40, xpReward: 1500, location: 'Dark Temple' },
  { name: 'Dark Knight', level: 50, xpReward: 2500, location: 'Castle' },
  { name: 'Elemental', level: 60, xpReward: 4500, location: 'Elemental Plane' },
  { name: 'Wyvern', level: 70, xpReward: 8000, location: 'Sky Fortress' },
  { name: 'Dragon', level: 80, xpReward: 15000, location: "Dragon's Lair" },
  { name: 'Ancient Dragon', level: 90, xpReward: 30000, location: 'Volcanic Peak' },
  { name: 'World Boss', level: 100, xpReward: 100000, location: 'End Zone' },
]
