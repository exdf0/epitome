import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/builds/[id]/vote - Get user's vote on a build
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ userVote: null })
    }

    const vote = await prisma.vote.findUnique({
      where: {
        userId_buildId: {
          userId: session.user.id,
          buildId: id,
        },
      },
    })

    return NextResponse.json({
      userVote: vote ? (vote.value === 1 ? 'up' : 'down') : null,
    })
  } catch (error) {
    console.error('Error getting vote:', error)
    return NextResponse.json({ userVote: null })
  }
}

// POST /api/builds/[id]/vote - Vote on a build
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to vote' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { type } = body // 'up' or 'down'

    if (!type || !['up', 'down'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      )
    }

    const existingBuild = await prisma.build.findUnique({
      where: { id },
    })

    if (!existingBuild) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      )
    }

    const voteValue = type === 'up' ? 1 : -1

    // Check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_buildId: {
          userId: session.user.id,
          buildId: id,
        },
      },
    })

    let upvoteDelta = 0
    let downvoteDelta = 0

    if (existingVote) {
      if (existingVote.value === voteValue) {
        // Same vote - remove it (toggle off)
        await prisma.vote.delete({
          where: { id: existingVote.id },
        })

        if (voteValue === 1) {
          upvoteDelta = -1
        } else {
          downvoteDelta = -1
        }
      } else {
        // Different vote - update it
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { value: voteValue },
        })

        if (voteValue === 1) {
          // Changed from down to up
          upvoteDelta = 1
          downvoteDelta = -1
        } else {
          // Changed from up to down
          upvoteDelta = -1
          downvoteDelta = 1
        }
      }
    } else {
      // New vote
      await prisma.vote.create({
        data: {
          userId: session.user.id,
          buildId: id,
          value: voteValue,
        },
      })

      if (voteValue === 1) {
        upvoteDelta = 1
      } else {
        downvoteDelta = 1
      }
    }

    // Update build vote counts
    const build = await prisma.build.update({
      where: { id },
      data: {
        upvotes: { increment: upvoteDelta },
        downvotes: { increment: downvoteDelta },
      },
    })

    // Ensure counts don't go negative (safety check)
    if (build.upvotes < 0 || build.downvotes < 0) {
      await prisma.build.update({
        where: { id },
        data: {
          upvotes: Math.max(0, build.upvotes),
          downvotes: Math.max(0, build.downvotes),
        },
      })
    }

    // Get current user vote status
    const currentVote = await prisma.vote.findUnique({
      where: {
        userId_buildId: {
          userId: session.user.id,
          buildId: id,
        },
      },
    })

    return NextResponse.json({
      upvotes: Math.max(0, build.upvotes),
      downvotes: Math.max(0, build.downvotes),
      userVote: currentVote ? (currentVote.value === 1 ? 'up' : 'down') : null,
    })
  } catch (error) {
    console.error('Error voting on build:', error)
    return NextResponse.json(
      { error: 'Failed to vote on build' },
      { status: 500 }
    )
  }
}
