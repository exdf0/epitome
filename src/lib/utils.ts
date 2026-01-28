import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    COMMON: 'text-rarity-common',
    UNCOMMON: 'text-rarity-uncommon',
    RARE: 'text-rarity-rare',
    EPIC: 'text-rarity-epic',
    LEGENDARY: 'text-rarity-legendary',
    MYTHIC: 'text-rarity-mythic',
  }
  return colors[rarity] || 'text-text-primary'
}

export function getClassColor(characterClass: string): string {
  const colors: Record<string, string> = {
    WARRIOR: 'text-class-warrior',
    NINJA: 'text-class-ninja',
    SHAMAN: 'text-class-shaman',
    NECROMANCER: 'text-class-necromancer',
  }
  return colors[characterClass] || 'text-text-primary'
}
