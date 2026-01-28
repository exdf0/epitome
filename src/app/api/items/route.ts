import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper to parse JSON fields
const parseItem = (item: any) => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  description: item.description,
  type: item.type,
  rarity: item.rarity,
  level: item.level,
  imageUrl: item.imageUrl,
  isGear: item.isGear,
  stats: item.stats ? JSON.parse(item.stats) : {},
  requiredLevel: item.requiredLevel,
  requiredClass: item.requiredClass,
  enhancementBonuses: item.enhancementBonuses ? JSON.parse(item.enhancementBonuses) : {},
  enhancementMaterials: item.enhancementMaterials ? JSON.parse(item.enhancementMaterials) : {},
})

// GET /api/items - Get items (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const rarity = searchParams.get('rarity')
    const search = searchParams.get('search')
    const isGearParam = searchParams.get('isGear')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}

    // Handle isGear filter
    if (isGearParam === 'true') {
      where.isGear = true
    } else if (isGearParam === 'false') {
      where.isGear = false
    }

    if (type) {
      where.type = type
    }

    if (rarity) {
      where.rarity = rarity
    }

    if (search) {
      // SQLite LIKE is case-insensitive by default for ASCII
      where.name = { contains: search }
    }

    const items = await prisma.item.findMany({
      where,
      take: limit,
      orderBy: [
        { rarity: 'desc' },
        { level: 'desc' },
      ],
    })

    return NextResponse.json(items.map(parseItem))
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}
