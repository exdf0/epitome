import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/market - Get all trade listings with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const itemType = searchParams.get('itemType')
    const rarity = searchParams.get('rarity')
    const currency = searchParams.get('currency')
    const status = searchParams.get('status') || 'ACTIVE'
    const sortBy = searchParams.get('sortBy') || 'newest'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    // Status filter
    if (status !== 'all') {
      where.status = status
    }

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { itemName: { contains: search } },
        { description: { contains: search } },
      ]
    }

    // Item type filter
    if (itemType && itemType !== 'all') {
      where.itemType = itemType
    }

    // Rarity filter
    if (rarity && rarity !== 'all') {
      where.itemRarity = rarity
    }

    // Currency filter
    if (currency && currency !== 'all') {
      where.priceCurrency = currency
    }

    // Determine sort order
    let orderBy: any = { createdAt: 'desc' }
    if (sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' }
    } else if (sortBy === 'price-low') {
      orderBy = { priceAmount: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { priceAmount: 'desc' }
    } else if (sortBy === 'most-viewed') {
      orderBy = { viewCount: 'desc' }
    }

    const [listings, total] = await Promise.all([
      prisma.tradeListing.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy,
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      }),
      prisma.tradeListing.count({ where }),
    ])

    const formattedListings = listings.map((listing) => ({
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
      viewCount: listing.viewCount,
      commentsCount: listing._count.comments,
      seller: listing.seller,
      createdAt: listing.createdAt.toISOString(),
    }))

    return NextResponse.json({
      listings: formattedListings,
      total,
      hasMore: offset + listings.length < total,
    })
  } catch (error) {
    console.error('Error fetching trade listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trade listings' },
      { status: 500 }
    )
  }
}

// POST /api/market - Create a new trade listing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      itemId,
      itemName,
      itemType,
      itemRarity,
      itemImage,
      isGear,
      enhancementLevel,
      enchantments,
      priceAmount,
      priceCurrency,
    } = body

    // Validation
    if (!title || !itemName || !itemType || !itemRarity || !priceAmount || !priceCurrency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['ARCHON', 'PREMIUM'].includes(priceCurrency)) {
      return NextResponse.json(
        { error: 'Invalid currency. Must be ARCHON or PREMIUM' },
        { status: 400 }
      )
    }

    const listing = await prisma.tradeListing.create({
      data: {
        title,
        description: description || null,
        itemId: itemId || null,
        itemName,
        itemType,
        itemRarity,
        itemImage: itemImage || null,
        isGear: isGear || false,
        enhancementLevel: enhancementLevel || 0,
        enchantments: JSON.stringify(enchantments || []),
        priceAmount,
        priceCurrency,
        sellerId: session.user.id,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({
      id: listing.id,
      title: listing.title,
      itemName: listing.itemName,
      priceAmount: listing.priceAmount,
      priceCurrency: listing.priceCurrency,
      seller: listing.seller,
      createdAt: listing.createdAt.toISOString(),
    })
  } catch (error) {
    console.error('Error creating trade listing:', error)
    return NextResponse.json(
      { error: 'Failed to create trade listing' },
      { status: 500 }
    )
  }
}
