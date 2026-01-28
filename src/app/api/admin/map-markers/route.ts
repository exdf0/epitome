import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// Helper to parse JSON fields
const parseMarker = (marker: any) => ({
  ...marker,
  metadata: marker.metadata ? JSON.parse(marker.metadata) : null,
})

// GET /api/admin/map-markers - Get all markers with pagination
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    if (search) {
      where.name = { contains: search }
    }

    if (type && type !== 'all') {
      where.type = type
    }

    const [markers, total] = await Promise.all([
      prisma.mapMarker.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
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
      }),
      prisma.mapMarker.count({ where }),
    ])

    return NextResponse.json({
      markers: markers.map(parseMarker),
      total,
      hasMore: offset + markers.length < total,
    })
  } catch (error) {
    console.error('Error fetching map markers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch map markers' },
      { status: 500 }
    )
  }
}

// POST /api/admin/map-markers - Create new marker
export async function POST(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
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

    if (!name || !type || x === undefined || y === undefined) {
      return NextResponse.json(
        { error: 'Name, type, x, and y are required' },
        { status: 400 }
      )
    }

    const marker = await prisma.mapMarker.create({
      data: {
        name,
        description,
        type,
        x: parseFloat(x),
        y: parseFloat(y),
        iconUrl,
        mobId: mobId || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
        isActive: isActive !== undefined ? isActive : true,
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

    return NextResponse.json(parseMarker(marker), { status: 201 })
  } catch (error: any) {
    console.error('Error creating map marker:', error)
    return NextResponse.json(
      { error: 'Failed to create map marker' },
      { status: 500 }
    )
  }
}
