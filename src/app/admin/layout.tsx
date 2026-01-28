import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/layout/admin-sidebar'
import { isCurrentUserAdmin } from '@/lib/admin'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Redirect if not authenticated
  if (!session) {
    redirect('/login')
  }

  // Check if user is admin (by Discord ID or role)
  const isAdmin = await isCurrentUserAdmin()
  if (!isAdmin) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-bg-primary">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
