import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// PUT /api/admin/mob-types/[id] - Update mob type
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
    const { name, displayName } = body

    const mobType = await prisma.mobType.update({
      where: { id },
      data: {
        name: name?.toUpperCase(),
        displayName,
      },
    })

    return NextResponse.json(mobType)
  } catch (error: any) {
    console.error('Error updating mob type:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Mob type not found' }, { status: 404 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A mob type with this name already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update mob type' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/mob-types/[id] - Delete mob type
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

    await prisma.mobType.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting mob type:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Mob type not found' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to delete mob type' },
      { status: 500 }
    )
  }
}
