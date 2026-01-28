import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/auth'

// GET - Get single class
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const classInfo = await prisma.classInfo.findUnique({
      where: { id: params.id },
    })

    if (!classInfo) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    // Parse JSON fields
    const parsedClass = {
      ...classInfo,
      playstyle: classInfo.playstyle ? JSON.parse(classInfo.playstyle) : [],
      strengths: classInfo.strengths ? JSON.parse(classInfo.strengths) : [],
      weaknesses: classInfo.weaknesses ? JSON.parse(classInfo.weaknesses) : [],
      statScaling: classInfo.statScaling ? JSON.parse(classInfo.statScaling) : {},
    }

    return NextResponse.json(parsedClass)
  } catch (error) {
    console.error('Error fetching class:', error)
    return NextResponse.json({ error: 'Failed to fetch class' }, { status: 500 })
  }
}

// PUT - Update class
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      description,
      imageUrl,
      color,
      primaryStat,
      secondaryStat,
      difficulty,
      playstyle,
      strengths,
      weaknesses,
      statScaling,
      sortOrder,
      isActive,
    } = body

    const updatedClass = await prisma.classInfo.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(color !== undefined && { color }),
        ...(primaryStat !== undefined && { primaryStat }),
        ...(secondaryStat !== undefined && { secondaryStat }),
        ...(difficulty !== undefined && { difficulty }),
        ...(playstyle !== undefined && { playstyle: JSON.stringify(playstyle) }),
        ...(strengths !== undefined && { strengths: JSON.stringify(strengths) }),
        ...(weaknesses !== undefined && { weaknesses: JSON.stringify(weaknesses) }),
        ...(statScaling !== undefined && { statScaling: JSON.stringify(statScaling) }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json(updatedClass)
  } catch (error) {
    console.error('Error updating class:', error)
    return NextResponse.json({ error: 'Failed to update class' }, { status: 500 })
  }
}

// DELETE - Delete class
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.classInfo.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting class:', error)
    return NextResponse.json({ error: 'Failed to delete class' }, { status: 500 })
  }
}
