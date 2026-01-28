import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Helper to parse JSON fields from SQLite
const parseBuild = (build: any) => ({
  ...build,
  tags: JSON.parse(build.tags || '[]'),
  statsAllocation: JSON.parse(build.statsAllocation || '{}'),
  equipment: build.equipment ? JSON.parse(build.equipment) : null,
  skillPoints: JSON.parse(build.skillPoints || '{}'),
})

// GET /api/builds - Get all published builds
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get('class')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'newest'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      isPublished: true,
    }

    if (classFilter && classFilter !== 'all') {
      where.class = classFilter
    }

    if (search) {
      where.title = {
        contains: search,
      }
    }

    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'oldest') {
      orderBy = { createdAt: 'asc' }
    } else if (sort === 'popular') {
      orderBy = { upvotes: 'desc' }
    } else if (sort === 'level') {
      orderBy = { level: 'desc' }
    }

    let builds = await prisma.build.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
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
    })

    // Parse JSON fields
    builds = builds.map(parseBuild)

    // Filter by tag (done in JS since SQLite doesn't support array contains)
    if (tag && tag !== 'all') {
      builds = builds.filter((build: any) => build.tags.includes(tag))
    }

    const total = await prisma.build.count({ where })

    return NextResponse.json({
      builds,
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

// POST /api/builds - Create a new build
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      description,
      guide,
      class: characterClass,
      level,
      tags,
      statsAllocation,
      equipment,
      skillPoints,
      skillPath,
      isPublished = true,
    } = body

    if (!title || !characterClass) {
      return NextResponse.json(
        { error: 'Title and class are required' },
        { status: 400 }
      )
    }

    // Auth required
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const build = await prisma.build.create({
      data: {
        title,
        description,
        guide,
        class: characterClass,
        level: level || 1,
        tags: JSON.stringify(tags || []),
        statsAllocation: JSON.stringify(statsAllocation || { vig: 0, int: 0, str: 0, dex: 0 }),
        equipment: equipment ? JSON.stringify(equipment) : null,
        skillPoints: JSON.stringify(skillPoints || {}),
        skillPath: skillPath || null,
        isPublished,
        userId,
      },
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
    })

    return NextResponse.json(parseBuild(build), { status: 201 })
  } catch (error) {
    console.error('Error creating build:', error)
    return NextResponse.json(
      { error: 'Failed to create build' },
      { status: 500 }
    )
  }
}
