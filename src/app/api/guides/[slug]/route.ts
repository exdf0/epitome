import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Get single guide by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const guide = await prisma.guide.findUnique({
      where: { slug: params.slug },
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

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 })
    }

    // Check if guide is published or user is the author
    const session = await getServerSession(authOptions)
    if (!guide.isPublished && guide.userId !== session?.user?.id) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 })
    }

    // Increment view count
    await prisma.guide.update({
      where: { id: guide.id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json(guide)
  } catch (error) {
    console.error('Error fetching guide:', error)
    return NextResponse.json({ error: 'Failed to fetch guide' }, { status: 500 })
  }
}

// PUT - Update guide
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const guide = await prisma.guide.findUnique({
      where: { slug: params.slug },
    })

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 })
    }

    // Only author or admin can update
    const isAdmin = session.user.role === 'ADMIN'
    if (guide.userId !== session.user.id && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, content, excerpt, category, isPublished, metaTitle, metaDescription } = body

    // If title changed, update slug
    let newSlug = guide.slug
    if (title && title !== guide.title) {
      const baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      newSlug = baseSlug
      let counter = 1
      while (await prisma.guide.findFirst({ where: { slug: newSlug, id: { not: guide.id } } })) {
        newSlug = `${baseSlug}-${counter}`
        counter++
      }
    }

    const updatedGuide = await prisma.guide.update({
      where: { id: guide.id },
      data: {
        ...(title !== undefined && { title }),
        ...(title !== undefined && { slug: newSlug }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(category !== undefined && { category }),
        ...(isPublished !== undefined && { isPublished }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
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

    return NextResponse.json(updatedGuide)
  } catch (error) {
    console.error('Error updating guide:', error)
    return NextResponse.json({ error: 'Failed to update guide' }, { status: 500 })
  }
}

// DELETE - Delete guide
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const guide = await prisma.guide.findUnique({
      where: { slug: params.slug },
    })

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 })
    }

    // Only author or admin can delete
    const isAdmin = session.user.role === 'ADMIN'
    if (guide.userId !== session.user.id && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.guide.delete({
      where: { id: guide.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guide:', error)
    return NextResponse.json({ error: 'Failed to delete guide' }, { status: 500 })
  }
}
