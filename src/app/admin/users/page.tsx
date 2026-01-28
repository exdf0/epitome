'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, Input, Button, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Search, Shield, ShieldAlert, User, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

interface UserData {
  id: string
  username: string
  email: string | null
  name: string | null
  image: string | null
  role: string
  buildsCount: number
  joinedAt: string
}

interface Stats {
  totalUsers: number
  admins: number
  moderators: number
  newThisWeek: number
}

const roleIcons = {
  ADMIN: Shield,
  MODERATOR: ShieldAlert,
  USER: User,
}

const roleColors = {
  ADMIN: 'error',
  MODERATOR: 'warning',
  USER: 'default',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, admins: 0, moderators: 0, newThisWeek: 0 })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [updatingRole, setUpdatingRole] = useState<string | null>(null)

  const limit = 20

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy,
      })
      if (searchQuery) params.set('search', searchQuery)
      if (roleFilter !== 'all') params.set('role', roleFilter)

      const res = await fetch(`/api/admin/users?${params}`)
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
        setTotal(data.total)
        setHasMore(data.hasMore)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [offset, sortBy, roleFilter])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0)
      fetchUsers()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (newRole === 'select') return

    setUpdatingRole(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })

      if (res.ok) {
        // Update local state
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        )
        // Refresh stats
        fetchUsers()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to update role')
      }
    } catch (error) {
      console.error('Error updating role:', error)
      alert('Failed to update role')
    } finally {
      setUpdatingRole(null)
    }
  }

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchUsers()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  const startIndex = offset + 1
  const endIndex = Math.min(offset + users.length, total)

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Users Management</h1>
        <p className="text-text-secondary">
          View and manage user accounts and permissions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-text-primary">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-text-secondary">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-text-primary">{stats.admins}</p>
            <p className="text-sm text-text-secondary">Admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-text-primary">{stats.moderators}</p>
            <p className="text-sm text-text-secondary">Moderators</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{stats.newThisWeek}</p>
            <p className="text-sm text-text-secondary">New This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setOffset(0) }}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MODERATOR">Moderator</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setOffset(0) }}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-builds">Most Builds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary bg-bg-tertiary">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">User</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Builds</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Joined</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const RoleIcon = roleIcons[user.role as keyof typeof roleIcons] || User
                    return (
                      <tr
                        key={user.id}
                        className="border-b border-border-primary/50 hover:bg-bg-tertiary/50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.username}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                                <span className="text-sm font-medium text-accent-primary">
                                  {user.username[0]?.toUpperCase() || '?'}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-text-primary">
                              {user.username}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-text-secondary">{user.email || '-'}</td>
                        <td className="py-3 px-4">
                          <Badge variant={roleColors[user.role as keyof typeof roleColors] as any} className="gap-1">
                            <RoleIcon className="w-3 h-3" />
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-text-primary">{user.buildsCount}</td>
                        <td className="py-3 px-4 text-text-secondary">{user.joinedAt}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Select
                              value="select"
                              onValueChange={(v) => handleRoleChange(user.id, v)}
                              disabled={updatingRole === user.id}
                            >
                              <SelectTrigger className="w-32 h-8">
                                {updatingRole === user.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <SelectValue placeholder="Change Role" />
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="select" disabled>Change Role</SelectItem>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="MODERATOR">Moderator</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            {user.role !== 'ADMIN' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 h-8"
                                onClick={() => handleDeleteUser(user.id, user.username)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-text-muted">
            Showing {startIndex}-{endIndex} of {total.toLocaleString()} users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - limit))}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasMore}
              onClick={() => setOffset(offset + limit)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
