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
  dropSources: item.dropSources ? JSON.parse(item.dropSources) : [],
  craftRecipe: item.craftRecipe ? JSON.parse(item.craftRecipe) : null,
  enhancementBonuses: item.enhancementBonuses ? JSON.parse(item.enhancementBonuses) : {},
  enhancementMaterials: item.enhancementMaterials ? JSON.parse(item.enhancementMaterials) : {},
})

// GET /api/items/[slug] - Get single item by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const item = await prisma.item.findUnique({
      where: { slug: params.slug },
    })

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json(parseItem(item))
  } catch (error) {
    console.error('Error fetching item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    )
  }
}
