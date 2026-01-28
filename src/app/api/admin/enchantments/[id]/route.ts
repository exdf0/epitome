import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkIsAdmin } from '@/lib/admin'

// Helper to parse JSON fields
const parseEnchantment = (enchantment: any) => ({
  ...enchantment,
  equipmentTypes: enchantment.equipmentTypes ? JSON.parse(enchantment.equipmentTypes) : [],
})

// GET /api/admin/enchantments/[id] - Get single enchantment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { id } = await params
    const enchantment = await prisma.enchantment.findUnique({ where: { id } })

    if (!enchantment) {
      return NextResponse.json({ error: 'Enchantment not found' }, { status: 404 })
    }

    return NextResponse.json(parseEnchantment(enchantment))
  } catch (error) {
    console.error('Error fetching enchantment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enchantment' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/enchantments/[id] - Update enchantment
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const existingEnchantment = await prisma.enchantment.findUnique({ where: { id } })
    if (!existingEnchantment) {
      return NextResponse.json({ error: 'Enchantment not found' }, { status: 404 })
    }

    const {
      name,
      slug,
      description,
      minValue,
      maxValue,
      statKey,
      equipmentTypes,
      imageUrl,
    } = body

    // Validation
    if (minValue !== undefined && maxValue !== undefined && minValue > maxValue) {
      return NextResponse.json(
        { error: 'minValue cannot be greater than maxValue' },
        { status: 400 }
      )
    }

    const enchantment = await prisma.enchantment.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        minValue,
        maxValue,
        statKey,
        equipmentTypes: equipmentTypes ? JSON.stringify(equipmentTypes) : undefined,
        imageUrl,
      },
    })

    return NextResponse.json(parseEnchantment(enchantment))
  } catch (error: any) {
    console.error('Error updating enchantment:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An enchantment with this slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update enchantment' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/enchantments/[id] - Delete enchantment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await checkIsAdmin()
  if (!authCheck.isAdmin) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { id } = await params

    const existingEnchantment = await prisma.enchantment.findUnique({ where: { id } })
    if (!existingEnchantment) {
      return NextResponse.json({ error: 'Enchantment not found' }, { status: 404 })
    }

    await prisma.enchantment.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting enchantment:', error)
    return NextResponse.json(
      { error: 'Failed to delete enchantment' },
      { status: 500 }
    )
  }
}
