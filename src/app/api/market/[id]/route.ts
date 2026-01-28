import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/market/[id] - Get single trade listing
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const listing = await prisma.tradeListing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
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
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Increment view count
    await prisma.tradeListing.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      itemId: listing.itemId,
      itemName: listing.itemName,
      itemType: listing.itemType,
      itemRarity: listing.itemRarity,
      itemImage: listing.itemImage,
      isGear: listing.isGear,
      enhancementLevel: listing.enhancementLevel,
      enchantments: JSON.parse(listing.enchantments || '[]'),
      priceAmount: listing.priceAmount,
      priceCurrency: listing.priceCurrency,
      status: listing.status,
      viewCount: listing.viewCount + 1,
      seller: listing.seller,
      comments: listing.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        user: comment.user,
        createdAt: comment.createdAt.toISOString(),
      })),
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching trade listing:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trade listing' },
      { status: 500 }
    )
  }
}

// PUT /api/market/[id] - Update trade listing (status change, etc.)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status, title, description, priceAmount, priceCurrency } = body

    // Check ownership
    const listing = await prisma.tradeListing.findUnique({
      where: { id },
      select: { sellerId: true },
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.sellerId !== session.user.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    // Validate status
    if (status && !['ACTIVE', 'SOLD', 'CANCELLED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (title) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (priceAmount) updateData.priceAmount = priceAmount
    if (priceCurrency) updateData.priceCurrency = priceCurrency

    const updated = await prisma.tradeListing.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      title: updated.title,
      priceAmount: updated.priceAmount,
      priceCurrency: updated.priceCurrency,
    })
  } catch (error) {
    console.error('Error updating trade listing:', error)
    return NextResponse.json(
      { error: 'Failed to update trade listing' },
      { status: 500 }
    )
  }
}

// DELETE /api/market/[id] - Delete trade listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Check ownership or admin
    const listing = await prisma.tradeListing.findUnique({
      where: { id },
      select: { sellerId: true },
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const isAdmin = session.user.role === 'ADMIN' || session.user.role === 'MODERATOR'
    if (listing.sellerId !== session.user.id && !isAdmin) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    await prisma.tradeListing.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting trade listing:', error)
    return NextResponse.json(
      { error: 'Failed to delete trade listing' },
      { status: 500 }
    )
  }
}
