import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper to parse JSON fields
const parseEnchantment = (enchantment: any) => ({
  id: enchantment.id,
  name: enchantment.name,
  slug: enchantment.slug,
  description: enchantment.description,
  minValue: enchantment.minValue,
  maxValue: enchantment.maxValue,
  statKey: enchantment.statKey,
  equipmentTypes: enchantment.equipmentTypes ? JSON.parse(enchantment.equipmentTypes) : [],
  imageUrl: enchantment.imageUrl,
})

// GET /api/enchantments - Get enchantments (public endpoint)
// Supports filtering by equipment type
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // Equipment type filter

    // Fetch all enchantments
    let enchantments = await prisma.enchantment.findMany({
      orderBy: { name: 'asc' },
    })

    // Filter by equipment type if specified
    if (type) {
      enchantments = enchantments.filter((e) => {
        const types = JSON.parse(e.equipmentTypes || '[]')
        return types.includes(type)
      })
    }

    return NextResponse.json(enchantments.map(parseEnchantment))
  } catch (error) {
    console.error('Error fetching enchantments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enchantments' },
      { status: 500 }
    )
  }
}
