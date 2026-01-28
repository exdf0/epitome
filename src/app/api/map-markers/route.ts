import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper to parse JSON fields
const parseMarker = (marker: any) => ({
  ...marker,
  metadata: marker.metadata ? JSON.parse(marker.metadata) : null,
  mob: marker.mob
    ? {
        ...marker.mob,
        stats: marker.mob.stats ? JSON.parse(marker.mob.stats) : {},
        drops: marker.mob.drops ? JSON.parse(marker.mob.drops) : [],
      }
    : null,
})

// GET /api/map-markers - Get all active markers (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Filter by marker types (comma-separated)
    const types = searchParams.get('types')
    const minLevel = searchParams.get('minLevel')
    const maxLevel = searchParams.get('maxLevel')

    const where: any = {
      isActive: true,
    }

    // Filter by types
    if (types) {
      const typeArray = types.split(',').filter(Boolean)
      if (typeArray.length > 0) {
        where.type = { in: typeArray }
      }
    }

    // For spawn markers, we can filter by mob level
    // This is a more complex query that needs to handle both direct markers and mob-related markers

    const markers = await prisma.mapMarker.findMany({
      where,
      include: {
        mob: {
          select: {
            id: true,
            name: true,
            slug: true,
            level: true,
            xpReward: true,
            respawnTime: true,
            mobType: true,
            category: true,
            imageUrl: true,
            stats: true,
            drops: true,
          },
        },
      },
    })

    // Apply level filter on mob markers if specified
    let filteredMarkers = markers
    if (minLevel || maxLevel) {
      const min = minLevel ? parseInt(minLevel) : 0
      const max = maxLevel ? parseInt(maxLevel) : 999

      filteredMarkers = markers.filter((marker) => {
        // If marker has a mob, check mob level
        if (marker.mob) {
          return marker.mob.level >= min && marker.mob.level <= max
        }
        // If marker has level in metadata, check that
        if (marker.metadata) {
          try {
            const meta = JSON.parse(marker.metadata)
            if (meta.level) {
              return meta.level >= min && meta.level <= max
            }
            if (meta.levelRange) {
              return meta.levelRange.max >= min && meta.levelRange.min <= max
            }
          } catch {
            // Ignore parse errors
          }
        }
        // If no level info, include marker
        return true
      })
    }

    return NextResponse.json({
      markers: filteredMarkers.map(parseMarker),
      total: filteredMarkers.length,
    })
  } catch (error) {
    console.error('Error fetching map markers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch map markers' },
      { status: 500 }
    )
  }
}
