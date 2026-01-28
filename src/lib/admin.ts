import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get admin Discord IDs from environment variable
const getAdminDiscordIds = (): string[] => {
  const ids = process.env.ADMIN_DISCORD_IDS || ''
  return ids.split(',').map(id => id.trim()).filter(Boolean)
}

// Check if a Discord ID is an admin
export const isAdminDiscordId = (discordId: string | null | undefined): boolean => {
  if (!discordId) return false
  const adminIds = getAdminDiscordIds()
  return adminIds.includes(discordId)
}

// Check if the current session user is an admin
export const checkIsAdmin = async (): Promise<{
  isAdmin: boolean
  session: any
  error?: string
  status?: number
}> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { isAdmin: false, session: null, error: 'Unauthorized', status: 401 }
  }

  // Get user's Discord ID from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { discordId: true, role: true }
  })

  // Check if user's Discord ID is in admin list
  const isAdmin = isAdminDiscordId(user?.discordId) || user?.role === 'ADMIN'

  if (!isAdmin) {
    return { isAdmin: false, session, error: 'Forbidden', status: 403 }
  }

  return { isAdmin: true, session }
}

// For use in server components (like admin layout)
export const isCurrentUserAdmin = async (): Promise<boolean> => {
  const result = await checkIsAdmin()
  return result.isAdmin
}
