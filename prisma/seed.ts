import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const items = [
  // HELMET
  { name: 'Iron Helmet', slug: 'iron-helmet', type: 'HELMET', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { defense: 15, hp: 50 }, imageUrl: '/game-images/items/helmets/iron-helmet.webp' },
  { name: 'Steel Helmet', slug: 'steel-helmet', type: 'HELMET', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { defense: 30, hp: 100 }, imageUrl: '/game-images/items/helmets/steel-helmet.webp' },
  { name: 'Mithril Helmet', slug: 'mithril-helmet', type: 'HELMET', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { defense: 50, hp: 200 }, imageUrl: '/game-images/items/helmets/mithril-helmet.webp' },
  { name: 'Dragon Helmet', slug: 'dragon-helmet', type: 'HELMET', rarity: 'EPIC', level: 50, requiredLevel: 50, stats: { defense: 80, hp: 350 }, imageUrl: '/game-images/items/helmets/dragon-helmet.webp' },
  { name: 'Abyssal Crown', slug: 'abyssal-crown', type: 'HELMET', rarity: 'LEGENDARY', level: 70, requiredLevel: 70, stats: { defense: 120, hp: 500 }, imageUrl: '/game-images/items/helmets/abyssal-crown.webp' },

  // WEAPON
  { name: 'Iron Sword', slug: 'iron-sword', type: 'WEAPON', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { attack: 25 }, imageUrl: '/game-images/items/weapons/iron-sword.webp' },
  { name: 'Steel Blade', slug: 'steel-blade', type: 'WEAPON', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { attack: 50 }, imageUrl: '/game-images/items/weapons/steel-blade.webp' },
  { name: 'Mithril Sword', slug: 'mithril-sword', type: 'WEAPON', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { attack: 85 }, imageUrl: '/game-images/items/weapons/mithril-sword.webp' },
  { name: 'Dragon Slayer', slug: 'dragon-slayer', type: 'WEAPON', rarity: 'EPIC', level: 50, requiredLevel: 50, stats: { attack: 130 }, imageUrl: '/game-images/items/weapons/dragon-slayer.webp' },
  { name: 'Abyssal Edge', slug: 'abyssal-edge', type: 'WEAPON', rarity: 'LEGENDARY', level: 70, requiredLevel: 70, stats: { attack: 200 }, imageUrl: '/game-images/items/weapons/abyssal-edge.webp' },

  // GLOVES
  { name: 'Leather Bracelet', slug: 'leather-bracelet', type: 'GLOVES', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { attack: 5, critRate: 1 }, imageUrl: '/game-images/items/gloves/leather-bracelet.webp' },
  { name: 'Steel Bracelet', slug: 'steel-bracelet', type: 'GLOVES', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { attack: 10, critRate: 2 }, imageUrl: '/game-images/items/gloves/steel-bracelet.webp' },
  { name: 'Mithril Bracelet', slug: 'mithril-bracelet', type: 'GLOVES', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { attack: 20, critRate: 3 }, imageUrl: '/game-images/items/gloves/mithril-bracelet.webp' },

  // BOOTS
  { name: 'Leather Boots', slug: 'leather-boots', type: 'BOOTS', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { defense: 8, moveSpeed: 5 }, imageUrl: '/game-images/items/boots/leather-boots.webp' },
  { name: 'Steel Boots', slug: 'steel-boots', type: 'BOOTS', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { defense: 15, moveSpeed: 8 }, imageUrl: '/game-images/items/boots/steel-boots.webp' },
  { name: 'Mithril Boots', slug: 'mithril-boots', type: 'BOOTS', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { defense: 25, moveSpeed: 12 }, imageUrl: '/game-images/items/boots/mithril-boots.webp' },

  // SHIELD
  { name: 'Wooden Shield', slug: 'wooden-shield', type: 'SHIELD', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { defense: 20, blockRate: 5 }, imageUrl: '/game-images/items/shields/wooden-shield.webp' },
  { name: 'Iron Shield', slug: 'iron-shield', type: 'SHIELD', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { defense: 40, blockRate: 8 }, imageUrl: '/game-images/items/shields/iron-shield.webp' },
  { name: 'Tower Shield', slug: 'tower-shield', type: 'SHIELD', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { defense: 70, blockRate: 12 }, imageUrl: '/game-images/items/shields/tower-shield.webp' },

  // EARRING
  { name: 'Silver Earring', slug: 'silver-earring', type: 'EARRING', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { magicAttack: 10, mp: 30 }, imageUrl: '/game-images/items/earrings/silver-earring.webp' },
  { name: 'Gold Earring', slug: 'gold-earring', type: 'EARRING', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { magicAttack: 20, mp: 60 }, imageUrl: '/game-images/items/earrings/gold-earring.webp' },
  { name: 'Diamond Earring', slug: 'diamond-earring', type: 'EARRING', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { magicAttack: 35, mp: 100 }, imageUrl: '/game-images/items/earrings/diamond-earring.webp' },

  // ARMOR
  { name: 'Leather Armor', slug: 'leather-armor', type: 'ARMOR', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { defense: 25, hp: 80 }, imageUrl: '/game-images/items/armors/leather-armor.webp' },
  { name: 'Chain Mail', slug: 'chain-mail', type: 'ARMOR', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { defense: 50, hp: 150 }, imageUrl: '/game-images/items/armors/chain-mail.webp' },
  { name: 'Plate Armor', slug: 'plate-armor', type: 'ARMOR', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { defense: 85, hp: 250 }, imageUrl: '/game-images/items/armors/plate-armor.webp' },
  { name: 'Dragon Armor', slug: 'dragon-armor', type: 'ARMOR', rarity: 'EPIC', level: 50, requiredLevel: 50, stats: { defense: 130, hp: 400 }, imageUrl: '/game-images/items/armors/dragon-armor.webp' },

  // NECKLACE
  { name: 'Bronze Necklace', slug: 'bronze-necklace', type: 'NECKLACE', rarity: 'COMMON', level: 10, requiredLevel: 10, stats: { hp: 50, mp: 30 }, imageUrl: '/game-images/items/necklaces/bronze-necklace.webp' },
  { name: 'Silver Necklace', slug: 'silver-necklace', type: 'NECKLACE', rarity: 'UNCOMMON', level: 20, requiredLevel: 20, stats: { hp: 100, mp: 60 }, imageUrl: '/game-images/items/necklaces/silver-necklace.webp' },
  { name: 'Gold Necklace', slug: 'gold-necklace', type: 'NECKLACE', rarity: 'RARE', level: 35, requiredLevel: 35, stats: { hp: 180, mp: 100 }, imageUrl: '/game-images/items/necklaces/gold-necklace.webp' },
]

async function main() {
  console.log('Seeding database...')

  for (const item of items) {
    const existingItem = await prisma.item.findUnique({
      where: { slug: item.slug }
    })

    if (!existingItem) {
      await prisma.item.create({
        data: {
          name: item.name,
          slug: item.slug,
          type: item.type,
          rarity: item.rarity,
          level: item.level,
          requiredLevel: item.requiredLevel,
          imageUrl: item.imageUrl,
          stats: JSON.stringify(item.stats),
        }
      })
      console.log(`Created: ${item.name}`)
    } else {
      console.log(`Skipped (exists): ${item.name}`)
    }
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
