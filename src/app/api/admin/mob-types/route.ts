import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// GET /api/admin/mob-types - Get all mob types
export async function GET(request: NextRequest) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const mobTypes = await prisma.mobType.findMany({
      orderBy: { displayName: 'asc' },
    })

    return NextResponse.json({ mobTypes })
  } catch (error) {
    console.error('Error fetching mob types:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mob types' },
      { status: 500 }
    )
  }
}

// POST /api/admin/mob-types - Create new mob type
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

    const mobType = await prisma.mobType.create({
      data: {
        name: name.toUpperCase(),
        displayName,
      },
    })

    return NextResponse.json(mobType, { status: 201 })
  } catch (error: any) {
    console.error('Error creating mob type:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A mob type with this name already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create mob type' },
      { status: 500 }
    )
  }
}
