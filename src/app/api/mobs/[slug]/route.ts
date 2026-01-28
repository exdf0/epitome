import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Helper to parse JSON fields
const parseMob = (mob: any) => ({
  ...mob,
  stats: mob.stats ? JSON.parse(mob.stats) : {},
  drops: mob.drops ? JSON.parse(mob.drops) : [],
})

// GET /api/mobs/[slug] - Get single mob by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const mob = await prisma.mob.findUnique({
      where: {
        slug,
        isActive: true,
      },
    })

    if (!mob) {
      return NextResponse.json({ error: 'Mob not found' }, { status: 404 })
    }

    return NextResponse.json(parseMob(mob))
  } catch (error) {
    console.error('Error fetching mob:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mob' },
      { status: 500 }
    )
  }
}
