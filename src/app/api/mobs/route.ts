import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Helper to parse JSON fields
const parseMob = (mob: any) => ({
  ...mob,
  stats: mob.stats ? JSON.parse(mob.stats) : {},
  drops: mob.drops ? JSON.parse(mob.drops) : [],
})

// GET /api/mobs - Get all mobs (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const mobType = searchParams.get('mobType')
    const biome = searchParams.get('biome')
    const minLevel = searchParams.get('minLevel')
    const maxLevel = searchParams.get('maxLevel')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      isActive: true,
    }

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

    // Level range filter
    if (minLevel || maxLevel) {
      where.level = {}
      if (minLevel) {
        where.level.gte = parseInt(minLevel)
      }
      if (maxLevel) {
        where.level.lte = parseInt(maxLevel)
      }
    }

    const [mobs, total] = await Promise.all([
      prisma.mob.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { level: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          level: true,
          xpReward: true,
          respawnTime: true,
          mobType: true,
          category: true,
          biome: true,
          imageUrl: true,
          stats: true,
          drops: true,
          archonDropMin: true,
          archonDropMax: true,
        },
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
