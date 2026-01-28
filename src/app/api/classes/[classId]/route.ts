import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET - Get single class by class ID (e.g., "warrior", "ninja")
export async function GET(
  request: NextRequest,
  { params }: { params: { classId: string } }
) {
  try {
    // Convert to uppercase for database lookup
    const classKey = params.classId.toUpperCase()

    const classInfo = await prisma.classInfo.findUnique({
      where: { class: classKey },
    })

    if (!classInfo || !classInfo.isActive) {
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
