import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// Helper to parse JSON fields
const parseItem = (item: any) => ({
  ...item,
  stats: item.stats ? JSON.parse(item.stats) : {},
  dropSources: item.dropSources ? JSON.parse(item.dropSources) : null,
  craftRecipe: item.craftRecipe ? JSON.parse(item.craftRecipe) : null,
  enhancementBonuses: item.enhancementBonuses ? JSON.parse(item.enhancementBonuses) : {},
  enhancementMaterials: item.enhancementMaterials ? JSON.parse(item.enhancementMaterials) : {},
})

// GET /api/admin/items/[id] - Get single item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { id } = await params
    const item = await prisma.item.findUnique({ where: { id } })

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

// PUT /api/admin/items/[id] - Update item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const existingItem = await prisma.item.findUnique({ where: { id } })
    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

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

    const item = await prisma.item.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        type,
        rarity,
        level,
        imageUrl,
        isGear: isGear !== undefined ? isGear : existingItem.isGear,
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

    return NextResponse.json(parseItem(item))
  } catch (error: any) {
    console.error('Error updating item:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An item with this slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/items/[id] - Delete item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { id } = await params

    const existingItem = await prisma.item.findUnique({ where: { id } })
    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await prisma.item.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting item:', error)
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}
