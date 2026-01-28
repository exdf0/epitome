import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// Helper to parse JSON fields
const parseEnchantment = (enchantment: any) => ({
  ...enchantment,
  equipmentTypes: enchantment.equipmentTypes ? JSON.parse(enchantment.equipmentTypes) : [],
})

// GET /api/admin/enchantments - Get all enchantments with pagination
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const equipmentType = searchParams.get('equipmentType')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    if (search) {
      where.name = { contains: search }
    }

    // For equipmentType filter, we need to check if the type is in the JSON array
    // SQLite doesn't support JSON queries well, so we'll filter in memory
    let enchantments = await prisma.enchantment.findMany({
      where,
      orderBy: { name: 'asc' },
    })

    // Filter by equipment type if specified
    if (equipmentType) {
      enchantments = enchantments.filter((e) => {
        const types = JSON.parse(e.equipmentTypes || '[]')
        return types.includes(equipmentType)
      })
    }

    const total = enchantments.length
    const paginatedEnchantments = enchantments.slice(offset, offset + limit)

    return NextResponse.json({
      enchantments: paginatedEnchantments.map(parseEnchantment),
      total,
      hasMore: offset + paginatedEnchantments.length < total,
    })
  } catch (error) {
    console.error('Error fetching enchantments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enchantments' },
      { status: 500 }
    )
  }
}

// POST /api/admin/enchantments - Create new enchantment
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
      minValue,
      maxValue,
      statKey,
      equipmentTypes,
      imageUrl,
    } = body

    // Validation
    if (!name || !slug || minValue === undefined || maxValue === undefined || !statKey) {
      return NextResponse.json(
        { error: 'Name, slug, minValue, maxValue, and statKey are required' },
        { status: 400 }
      )
    }

    if (minValue > maxValue) {
      return NextResponse.json(
        { error: 'minValue cannot be greater than maxValue' },
        { status: 400 }
      )
    }

    const enchantment = await prisma.enchantment.create({
      data: {
        name,
        slug,
        description,
        minValue,
        maxValue,
        statKey,
        equipmentTypes: JSON.stringify(equipmentTypes || []),
        imageUrl,
      },
    })

    return NextResponse.json(parseEnchantment(enchantment), { status: 201 })
  } catch (error: any) {
    console.error('Error creating enchantment:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An enchantment with this slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create enchantment' },
      { status: 500 }
    )
  }
}
