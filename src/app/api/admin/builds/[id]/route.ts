import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

// PUT /api/admin/builds/[id] - Update build (publish/unpublish, etc)
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

    const existingBuild = await prisma.build.findUnique({ where: { id } })
    if (!existingBuild) {
      return NextResponse.json({ error: 'Build not found' }, { status: 404 })
    }

    const { isPublished, title, description } = body

    const build = await prisma.build.update({
      where: { id },
      data: {
        ...(isPublished !== undefined && { isPublished }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
      },
    })

    return NextResponse.json(build)
  } catch (error) {
    console.error('Error updating build:', error)
    return NextResponse.json(
      { error: 'Failed to update build' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/builds/[id] - Delete build
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

    const existingBuild = await prisma.build.findUnique({ where: { id } })
    if (!existingBuild) {
      return NextResponse.json({ error: 'Build not found' }, { status: 404 })
    }

    // Delete related votes first
    await prisma.vote.deleteMany({ where: { buildId: id } })

    // Delete the build
    await prisma.build.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting build:', error)
    return NextResponse.json(
      { error: 'Failed to delete build' },
      { status: 500 }
    )
  }
}
