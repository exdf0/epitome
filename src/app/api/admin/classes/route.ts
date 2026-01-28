import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/auth'

// GET - List all classes
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const classes = await prisma.classInfo.findMany({
      orderBy: { sortOrder: 'asc' },
    })

    // Parse JSON fields
    const parsedClasses = classes.map((cls) => ({
      ...cls,
      playstyle: cls.playstyle ? JSON.parse(cls.playstyle) : [],
      strengths: cls.strengths ? JSON.parse(cls.strengths) : [],
      weaknesses: cls.weaknesses ? JSON.parse(cls.weaknesses) : [],
      statScaling: cls.statScaling ? JSON.parse(cls.statScaling) : {},
    }))

    return NextResponse.json({ classes: parsedClasses })
  } catch (error) {
    console.error('Error fetching classes:', error)
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 })
  }
}

// POST - Create new class
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      class: classKey,
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

    if (!classKey || !name || !description || !primaryStat) {
      return NextResponse.json(
        { error: 'Class key, name, description, and primary stat are required' },
        { status: 400 }
      )
    }

    const newClass = await prisma.classInfo.create({
      data: {
        class: classKey.toUpperCase(),
        name,
        description,
        imageUrl: imageUrl || null,
        color: color || null,
        primaryStat,
        secondaryStat: secondaryStat || null,
        difficulty: difficulty || null,
        playstyle: playstyle ? JSON.stringify(playstyle) : null,
        strengths: strengths ? JSON.stringify(strengths) : null,
        weaknesses: weaknesses ? JSON.stringify(weaknesses) : null,
        statScaling: statScaling ? JSON.stringify(statScaling) : null,
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(newClass, { status: 201 })
  } catch (error: any) {
    console.error('Error creating class:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Class with this key already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 })
  }
}
