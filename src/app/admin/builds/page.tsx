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
import { Search, Trash2, Loader2, Eye, EyeOff, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react'
import Link from 'next/link'

interface Build {
  id: string
  title: string
  description?: string
  class: string
  level: number
  isPublished: boolean
  upvotes: number
  downvotes: number
  createdAt: string
  user?: {
    id: string
    name?: string
    username?: string
  }
}

const classColors: Record<string, string> = {
  WARRIOR: 'bg-red-500/20 text-red-400 border-red-500/50',
  NINJA: 'bg-green-500/20 text-green-400 border-green-500/50',
  SHAMAN: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  NECROMANCER: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
}

export default function AdminBuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [classFilter, setClassFilter] = useState('all')
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Fetch builds
  const fetchBuilds = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      if (searchQuery) params.set('search', searchQuery)
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (classFilter !== 'all') params.set('class', classFilter)

      const response = await fetch(`/api/admin/builds?${params}`)
      if (response.ok) {
        const data = await response.json()
        setBuilds(data.builds)
        setTotal(data.total)
      }
    } catch (error) {
      console.error('Error fetching builds:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuilds()
  }, [offset, statusFilter, classFilter])

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0)
      fetchBuilds()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Toggle publish status
  const togglePublish = async (build: Build) => {
    setActionLoading(build.id)
    try {
      const response = await fetch(`/api/admin/builds/${build.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !build.isPublished }),
      })

      if (response.ok) {
        fetchBuilds()
      } else {
        alert('Failed to update build')
      }
    } catch (error) {
      console.error('Error updating build:', error)
      alert('Failed to update build')
    } finally {
      setActionLoading(null)
    }
  }

  // Delete build
  const handleDelete = async (id: string) => {
    setActionLoading(id)
    try {
      const response = await fetch(`/api/admin/builds/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeleteConfirm(null)
        fetchBuilds()
      } else {
        alert('Failed to delete build')
      }
    } catch (error) {
      console.error('Error deleting build:', error)
      alert('Failed to delete build')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Builds Management</h1>
          <p className="text-text-secondary">
            Manage user-submitted builds. ({total} builds)
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search builds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="WARRIOR">Warrior</SelectItem>
                <SelectItem value="NINJA">Ninja</SelectItem>
                <SelectItem value="SHAMAN">Shaman</SelectItem>
                <SelectItem value="NECROMANCER">Necromancer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Builds Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : builds.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No builds found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary bg-bg-tertiary">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Author</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Class</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Level</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Votes</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Created</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {builds.map((build) => (
                    <tr
                      key={build.id}
                      className="border-b border-border-primary/50 hover:bg-bg-tertiary/50"
                    >
                      <td className="py-3 px-4">
                        <Link
                          href={`/builds/${build.id}`}
                          className="font-medium text-text-primary hover:text-orange-400 flex items-center gap-2"
                        >
                          {build.title}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {build.user?.username || build.user?.name || 'Anonymous'}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={classColors[build.class] || 'bg-gray-500/20 text-gray-400'}>
                          {build.class}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-text-primary">{build.level}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-green-400">
                            <ThumbsUp className="w-3 h-3" />
                            {build.upvotes}
                          </span>
                          <span className="flex items-center gap-1 text-red-400">
                            <ThumbsDown className="w-3 h-3" />
                            {build.downvotes}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={build.isPublished
                          ? 'bg-green-500/20 text-green-400 border-green-500/50'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                        }>
                          {build.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-text-muted text-sm">
                        {new Date(build.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => togglePublish(build)}
                            disabled={actionLoading === build.id}
                            title={build.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {actionLoading === build.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : build.isPublished ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          {deleteConfirm === build.id ? (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-400"
                                onClick={() => handleDelete(build.id)}
                                disabled={actionLoading === build.id}
                              >
                                {actionLoading === build.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  'Confirm'
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8"
                                onClick={() => setDeleteConfirm(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-300"
                              onClick={() => setDeleteConfirm(build.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-text-muted">
          Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} builds
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - limit))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={offset + limit >= total}
            onClick={() => setOffset(offset + limit)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
