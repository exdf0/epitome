import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - List all active classes
export async function GET(request: NextRequest) {
  try {
    const classes = await prisma.classInfo.findMany({
      where: { isActive: true },
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

    return NextResponse.json(parsedClasses)
  } catch (error) {
    console.error('Error fetching classes:', error)
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 })
  }
}
