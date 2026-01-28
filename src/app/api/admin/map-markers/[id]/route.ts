import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

// Helper to parse JSON fields
const parseMarker = (marker: any) => ({
  ...marker,
  metadata: marker.metadata ? JSON.parse(marker.metadata) : null,
})

// GET /api/admin/map-markers/[id] - Get single marker
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
    const marker = await prisma.mapMarker.findUnique({
      where: { id },
      include: {
        mob: {
          select: {
            id: true,
            name: true,
            slug: true,
            level: true,
            category: true,
            xpReward: true,
            respawnTime: true,
            mobType: true,
            drops: true,
            stats: true,
          },
        },
      },
    })

    if (!marker) {
      return NextResponse.json({ error: 'Marker not found' }, { status: 404 })
    }

    return NextResponse.json(parseMarker(marker))
  } catch (error) {
    console.error('Error fetching marker:', error)
    return NextResponse.json(
      { error: 'Failed to fetch marker' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/map-markers/[id] - Update marker
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
      description,
      type,
      x,
      y,
      iconUrl,
      mobId,
      metadata,
      isActive,
    } = body

    // Check if marker exists
    const existingMarker = await prisma.mapMarker.findUnique({ where: { id } })
    if (!existingMarker) {
      return NextResponse.json({ error: 'Marker not found' }, { status: 404 })
    }

    const marker = await prisma.mapMarker.update({
      where: { id },
      data: {
        name,
        description,
        type,
        x: x !== undefined ? parseFloat(x) : existingMarker.x,
        y: y !== undefined ? parseFloat(y) : existingMarker.y,
        iconUrl,
        mobId: mobId !== undefined ? (mobId || null) : existingMarker.mobId,
        metadata: metadata ? JSON.stringify(metadata) : null,
        isActive: isActive !== undefined ? isActive : existingMarker.isActive,
      },
      include: {
        mob: {
          select: {
            id: true,
            name: true,
            slug: true,
            level: true,
            category: true,
          },
        },
      },
    })

    return NextResponse.json(parseMarker(marker))
  } catch (error: any) {
    console.error('Error updating marker:', error)
    return NextResponse.json(
      { error: 'Failed to update marker' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/map-markers/[id] - Delete marker
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

    // Check if marker exists
    const existingMarker = await prisma.mapMarker.findUnique({ where: { id } })
    if (!existingMarker) {
      return NextResponse.json({ error: 'Marker not found' }, { status: 404 })
    }

    await prisma.mapMarker.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting marker:', error)
    return NextResponse.json(
      { error: 'Failed to delete marker' },
      { status: 500 }
    )
  }
}
