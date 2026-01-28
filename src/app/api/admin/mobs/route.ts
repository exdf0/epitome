import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

// Helper to parse JSON fields
const parseMob = (mob: any) => ({
  ...mob,
  stats: mob.stats ? JSON.parse(mob.stats) : {},
  drops: mob.drops ? JSON.parse(mob.drops) : [],
})

// GET /api/admin/mobs - Get all mobs with pagination
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const mobType = searchParams.get('mobType')
    const biome = searchParams.get('biome')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    if (search) {
      where.name = { contains: search }
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (mobType && mobType !== 'all') {
      where.mobType = mobType
    }

    if (biome && biome !== 'all') {
      where.biome = biome
    }

    const [mobs, total] = await Promise.all([
      prisma.mob.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { level: 'asc' },
      }),
      prisma.mob.count({ where }),
    ])

    return NextResponse.json({
      mobs: mobs.map(parseMob),
      total,
      hasMore: offset + mobs.length < total,
    })
  } catch (error) {
    console.error('Error fetching mobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mobs' },
      { status: 500 }
    )
  }
}

// POST /api/admin/mobs - Create new mob
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
      level,
      xpReward,
      respawnTime,
      mobType,
      category,
      biome,
      imageUrl,
      stats,
      drops,
      archonDropMin,
      archonDropMax,
    } = body

    if (!name || !mobType || !category) {
      return NextResponse.json(
        { error: 'Name, mobType, and category are required' },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const mobSlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const mob = await prisma.mob.create({
      data: {
        name,
        slug: mobSlug,
        description,
        level: level || 1,
        xpReward: xpReward || 0,
        respawnTime: respawnTime || 300,
        mobType,
        category,
        biome,
        imageUrl,
        stats: stats ? JSON.stringify(stats) : null,
        drops: drops ? JSON.stringify(drops) : null,
        archonDropMin: archonDropMin || 0,
        archonDropMax: archonDropMax || 0,
      },
    })

    return NextResponse.json(parseMob(mob), { status: 201 })
  } catch (error: any) {
    console.error('Error creating mob:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A mob with this slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create mob' },
      { status: 500 }
    )
  }
}
