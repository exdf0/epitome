// Stat calculations and formulas

import { CHARACTER_CLASSES } from './game-data'

export interface StatValues {
  vig: number
  int: number
  str: number
  dex: number
}

export interface CalculatedStats {
  hp: number
  mp: number
  attack: number
  magicAttack: number
  defense: number
  critRate: number
  critDamage: number
  attackSpeed: number
  moveSpeed: number
}

// Base stats for level 1 character
export const BASE_STATS: CalculatedStats = {
  hp: 100,
  mp: 50,
  attack: 10,
  magicAttack: 10,
  defense: 5,
  critRate: 5,
  critDamage: 150,
  attackSpeed: 100,
  moveSpeed: 100,
}

// Stat scaling per point for each class
export const CLASS_STAT_SCALING = {
  WARRIOR: {
    vig: { hp: 15, defense: 1.5 },
    int: { magicAttack: 0.5, mp: 2 },
    str: { attack: 3.0, critDamage: 0.5 },
    dex: { critRate: 0.15, attackSpeed: 0.8 },
  },
  NINJA: {
    vig: { hp: 10, defense: 0.8 },
    int: { magicAttack: 0.3, mp: 1.5 },
    str: { attack: 1.5, critDamage: 0.3 },
    dex: { attack: 2.5, critRate: 0.25, attackSpeed: 1.2 },
  },
  SHAMAN: {
    vig: { hp: 10, defense: 0.8 },
    int: { magicAttack: 3.0, mp: 5 },
    str: { attack: 0.5 },
    dex: { critRate: 0.1, attackSpeed: 0.5 },
  },
  NECROMANCER: {
    vig: { hp: 8, defense: 0.6 },
    int: { magicAttack: 2.5, mp: 6 },
    str: { attack: 0.3 },
    dex: { critRate: 0.12, attackSpeed: 0.4 },
  },
} as const

// Calculate derived stats from base stats and stat allocation
export function calculateStats(
  characterClass: keyof typeof CHARACTER_CLASSES,
  statValues: StatValues,
  level: number = 1
): CalculatedStats {
  const scaling = CLASS_STAT_SCALING[characterClass]

  const result: CalculatedStats = { ...BASE_STATS }

  // Apply level scaling
  result.hp += level * 10
  result.mp += level * 5
  result.attack += level * 2
  result.magicAttack += level * 2
  result.defense += level

  // Apply stat point allocations
  for (const [stat, value] of Object.entries(statValues)) {
    const statScaling = scaling[stat as keyof StatValues]
    if (statScaling) {
      for (const [derivedStat, multiplier] of Object.entries(statScaling)) {
        (result as any)[derivedStat] += value * multiplier
      }
    }
  }

  // Round all values
  for (const key of Object.keys(result) as (keyof CalculatedStats)[]) {
    result[key] = Math.round(result[key] * 100) / 100
  }

  return result
}

// Format stat value for display
export function formatStatValue(stat: string, value: number): string {
  switch (stat) {
    case 'critRate':
    case 'critDamage':
      return `${value}%`
    case 'hp':
    case 'mp':
    case 'attack':
    case 'magicAttack':
    case 'defense':
      return Math.floor(value).toLocaleString()
    case 'attackSpeed':
    case 'moveSpeed':
      return `${value}%`
    default:
      return String(value)
  }
}
