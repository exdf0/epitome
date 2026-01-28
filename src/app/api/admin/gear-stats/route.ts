import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// GET /api/admin/gear-stats - Get all gear stats
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const gearStats = await prisma.gearStat.findMany({
      orderBy: { displayName: 'asc' },
    })

    return NextResponse.json({ gearStats })
  } catch (error) {
    console.error('Error fetching gear stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gear stats' },
      { status: 500 }
    )
  }
}

// POST /api/admin/gear-stats - Create new gear stat
export async function POST(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const body = await request.json()
    const { name, displayName } = body

    if (!name || !displayName) {
      return NextResponse.json(
        { error: 'Name and displayName are required' },
        { status: 400 }
      )
    }

    const gearStat = await prisma.gearStat.create({
      data: {
        name: name.toLowerCase(),
        displayName,
      },
    })

    return NextResponse.json(gearStat, { status: 201 })
  } catch (error: any) {
    console.error('Error creating gear stat:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A gear stat with this name already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create gear stat' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/gear-stats - Delete a gear stat
export async function DELETE(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Stat ID is required' },
        { status: 400 }
      )
    }

    await prisma.gearStat.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gear stat:', error)
    return NextResponse.json(
      { error: 'Failed to delete gear stat' },
      { status: 500 }
    )
  }
}
