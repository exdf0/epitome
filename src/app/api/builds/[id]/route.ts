import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Helper to parse JSON fields from SQLite
const parseBuild = (build: any) => ({
  ...build,
  tags: JSON.parse(build.tags || '[]'),
  statsAllocation: JSON.parse(build.statsAllocation || '{}'),
  equipment: build.equipment ? JSON.parse(build.equipment) : null,
  skillPoints: JSON.parse(build.skillPoints || '{}'),
})

// GET /api/builds/[id] - Get a single build
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const build = await prisma.build.findUnique({
      where: { id },
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

    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(parseBuild(build))
  } catch (error) {
    console.error('Error fetching build:', error)
    return NextResponse.json(
      { error: 'Failed to fetch build' },
      { status: 500 }
    )
  }
}

// PUT /api/builds/[id] - Update a build
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    const existingBuild = await prisma.build.findUnique({
      where: { id },
    })

    if (!existingBuild) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      )
    }

    // Check ownership (if build has an owner)
    if (existingBuild.userId && existingBuild.userId !== session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const body = await request.json()

    const build = await prisma.build.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        guide: body.guide,
        class: body.class,
        level: body.level,
        tags: JSON.stringify(body.tags || []),
        statsAllocation: JSON.stringify(body.statsAllocation || {}),
        equipment: body.equipment ? JSON.stringify(body.equipment) : null,
        skillPoints: JSON.stringify(body.skillPoints || {}),
        skillPath: body.skillPath || null,
        isPublished: body.isPublished,
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

    return NextResponse.json(parseBuild(build))
  } catch (error) {
    console.error('Error updating build:', error)
    return NextResponse.json(
      { error: 'Failed to update build' },
      { status: 500 }
    )
  }
}

// DELETE /api/builds/[id] - Delete a build
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    const existingBuild = await prisma.build.findUnique({
      where: { id },
    })

    if (!existingBuild) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      )
    }

    // Check ownership (if build has an owner)
    if (existingBuild.userId && existingBuild.userId !== session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    await prisma.build.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting build:', error)
    return NextResponse.json(
      { error: 'Failed to delete build' },
      { status: 500 }
    )
  }
}
