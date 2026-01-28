import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// Gear types
const gearTypes = ['WEAPON', 'HELMET', 'ARMOR', 'GLOVES', 'BOOTS', 'SHIELD', 'EARRING', 'NECKLACE', 'RING']

// Helper to parse JSON fields
const parseItem = (item: any) => ({
  ...item,
  stats: item.stats ? JSON.parse(item.stats) : {},
  dropSources: item.dropSources ? JSON.parse(item.dropSources) : null,
  craftRecipe: item.craftRecipe ? JSON.parse(item.craftRecipe) : null,
  enhancementBonuses: item.enhancementBonuses ? JSON.parse(item.enhancementBonuses) : {},
  enhancementMaterials: item.enhancementMaterials ? JSON.parse(item.enhancementMaterials) : {},
})

// GET /api/admin/items - Get all items with pagination
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type')
    const rarity = searchParams.get('rarity')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    if (search) {
      where.name = { contains: search }
    }

    if (type && type !== 'all') {
      if (type === 'gear') {
        where.isGear = true
      } else if (type === 'other') {
        where.isGear = false
      } else {
        where.type = type
      }
    }

    if (rarity && rarity !== 'all') {
      where.rarity = rarity
    }

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.item.count({ where }),
    ])

    return NextResponse.json({
      items: items.map(parseItem),
      total,
      hasMore: offset + items.length < total,
    })
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

// POST /api/admin/items - Create new item
export async function POST(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const body = await request.json()
    const {
      name,
      slug,
      description,
      type,
      rarity,
      level,
      imageUrl,
      isGear,
      stats,
      requiredLevel,
      requiredClass,
      dropSources,
      craftRecipe,
      enhancementBonuses,
      enhancementMaterials,
    } = body

    if (!name || !type || !rarity) {
      return NextResponse.json(
        { error: 'Name, type, and rarity are required' },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const itemSlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    // Determine isGear based on type if not explicitly set
    const itemIsGear = isGear !== undefined ? isGear : gearTypes.includes(type)

    const item = await prisma.item.create({
      data: {
        name,
        slug: itemSlug,
        description,
        type,
        rarity,
        level: level || 1,
        imageUrl,
        isGear: itemIsGear,
        stats: stats ? JSON.stringify(stats) : null,
        requiredLevel,
        requiredClass,
        dropSources: dropSources ? JSON.stringify(dropSources) : null,
        craftRecipe: craftRecipe ? JSON.stringify(craftRecipe) : null,
        enhancementBonuses: enhancementBonuses && Object.keys(enhancementBonuses).length > 0
          ? JSON.stringify(enhancementBonuses) : null,
        enhancementMaterials: enhancementMaterials && Object.keys(enhancementMaterials).length > 0
          ? JSON.stringify(enhancementMaterials) : null,
      },
    })

    return NextResponse.json(parseItem(item), { status: 201 })
  } catch (error: any) {
    console.error('Error creating item:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An item with this slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}
