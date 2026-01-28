import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

// GET /api/admin/users - Get all users with pagination
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    if (search) {
      where.OR = [
        { username: { contains: search } },
        { email: { contains: search } },
        { name: { contains: search } },
      ]
    }

    if (role && role !== 'all') {
      where.role = role
    }

    // Determine sort order
    let orderBy: any = { createdAt: 'desc' }
    if (sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' }
    } else if (sortBy === 'most-builds') {
      orderBy = { builds: { _count: 'desc' } }
    }

    const [users, total, stats] = await Promise.all([
      prisma.user.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy,
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          image: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              builds: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
      // Get stats
      Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: 'ADMIN' } }),
        prisma.user.count({ where: { role: 'MODERATOR' } }),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
        }),
      ]),
    ])

    const formattedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username || user.name || 'Unknown',
      image: user.image,
      role: user.role,
      buildsCount: user._count.builds,
      joinedAt: user.createdAt.toISOString().split('T')[0],
    }))

    return NextResponse.json({
      users: formattedUsers,
      total,
      hasMore: offset + users.length < total,
      stats: {
        totalUsers: stats[0],
        admins: stats[1],
        moderators: stats[2],
        newThisWeek: stats[3],
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
