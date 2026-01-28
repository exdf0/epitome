import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

// Helper to parse JSON fields
const parseBuild = (build: any) => ({
  ...build,
  tags: build.tags ? JSON.parse(build.tags) : [],
  statsAllocation: build.statsAllocation ? JSON.parse(build.statsAllocation) : {},
  equipment: build.equipment ? JSON.parse(build.equipment) : {},
  skillPoints: build.skillPoints ? JSON.parse(build.skillPoints) : {},
})

// GET /api/admin/builds - Get all builds with pagination
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const classFilter = searchParams.get('class')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    if (search) {
      where.title = { contains: search }
    }

    if (status === 'published') {
      where.isPublished = true
    } else if (status === 'draft') {
      where.isPublished = false
    }

    if (classFilter && classFilter !== 'all') {
      where.class = classFilter
    }

    const [builds, total] = await Promise.all([
      prisma.build.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      }),
      prisma.build.count({ where }),
    ])

    return NextResponse.json({
      builds: builds.map(parseBuild),
      total,
      hasMore: offset + builds.length < total,
    })
  } catch (error) {
    console.error('Error fetching builds:', error)
    return NextResponse.json(
      { error: 'Failed to fetch builds' },
      { status: 500 }
    )
  }
}
