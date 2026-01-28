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

// GET /api/admin/mobs/[id] - Get single mob
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
    const mob = await prisma.mob.findUnique({
      where: { id },
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

// PUT /api/admin/mobs/[id] - Update mob
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
      isActive,
    } = body

    // Check if mob exists
    const existingMob = await prisma.mob.findUnique({ where: { id } })
    if (!existingMob) {
      return NextResponse.json({ error: 'Mob not found' }, { status: 404 })
    }

    const mob = await prisma.mob.update({
      where: { id },
      data: {
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
        stats: stats ? JSON.stringify(stats) : null,
        drops: drops ? JSON.stringify(drops) : null,
        archonDropMin: archonDropMin !== undefined ? archonDropMin : existingMob.archonDropMin,
        archonDropMax: archonDropMax !== undefined ? archonDropMax : existingMob.archonDropMax,
        isActive: isActive !== undefined ? isActive : existingMob.isActive,
      },
    })

    return NextResponse.json(parseMob(mob))
  } catch (error: any) {
    console.error('Error updating mob:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A mob with this slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update mob' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/mobs/[id] - Delete mob
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

    // Check if mob exists
    const existingMob = await prisma.mob.findUnique({ where: { id } })
    if (!existingMob) {
      return NextResponse.json({ error: 'Mob not found' }, { status: 404 })
    }

    await prisma.mob.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting mob:', error)
    return NextResponse.json(
      { error: 'Failed to delete mob' },
      { status: 500 }
    )
  }
}
