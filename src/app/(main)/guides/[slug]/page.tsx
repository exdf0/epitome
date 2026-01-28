'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { ArrowLeft, Clock, Eye, User, Calendar, Edit, Trash2, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Guide {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  isPublished: boolean
  isFeatured: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
  userId: string
  user: {
    id: string
    name?: string
    username?: string
    image?: string
  }
}

const categoryColors: Record<string, string> = {
  BEGINNER: 'success',
  CLASS_GUIDE: 'primary',
  PVP: 'error',
  PVE: 'warning',
  CRAFTING: 'secondary',
  ECONOMY: 'default',
  ADVANCED: 'epic',
}

const categoryLabels: Record<string, string> = {
  BEGINNER: 'Beginner',
  CLASS_GUIDE: 'Class Guide',
  PVP: 'PvP',
  PVE: 'PvE',
  CRAFTING: 'Crafting',
  ECONOMY: 'Economy',
  ADVANCED: 'Advanced',
}

// Estimate read time based on content length
const estimateReadTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// Simple markdown to HTML converter
const renderMarkdown = (content: string): string => {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-text-primary mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-text-primary mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold text-text-primary">$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-orange-400 hover:text-orange-300 underline">$1</a>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gim, '<pre class="bg-bg-tertiary p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gim, '<code class="bg-bg-tertiary px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-text-secondary">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-text-secondary">$1</li>')
    // Paragraphs
    .replace(/\n\n/gim, '</p><p class="text-text-secondary mb-4">')
    // Line breaks
    .replace(/\n/gim, '<br/>')
}

export default function GuideDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [guide, setGuide] = useState<Guide | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetch(`/api/guides/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setGuide(data)
        } else if (response.status === 404) {
          router.push('/guides')
        }
      } catch (error) {
        console.error('Error fetching guide:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchGuide()
    }
  }, [params.slug, router])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this guide?')) return

    setDeleting(true)
    try {
      const response = await fetch(`/api/guides/${guide?.slug}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        router.push('/guides')
      } else {
        alert('Failed to delete guide')
      }
    } catch (error) {
      console.error('Error deleting guide:', error)
      alert('Failed to delete guide')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">Guide not found</p>
          <Link href="/guides">
            <Button variant="secondary" className="mt-4">
              Back to Guides
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isAuthor = session?.user?.id === guide.userId
  const isAdmin = session?.user?.role === 'ADMIN'
  const canEdit = isAuthor || isAdmin

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/guides" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Guides
      </Link>

      {/* Guide Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={categoryColors[guide.category] as any}>
            {categoryLabels[guide.category] || guide.category}
          </Badge>
          {guide.isFeatured && (
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
              Featured
            </Badge>
          )}
          {!guide.isPublished && (
            <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">
              Draft
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          {guide.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {guide.user?.username || guide.user?.name || 'Anonymous'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(guide.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {estimateReadTime(guide.content)} min read
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {guide.viewCount.toLocaleString()} views
          </span>
        </div>

        {/* Edit/Delete Actions */}
        {canEdit && (
          <div className="flex items-center gap-2">
            <Link href={`/guides/${guide.slug}/edit`}>
              <Button variant="secondary" size="sm" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 text-red-400 hover:text-red-300"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Guide Content */}
      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: `<p class="text-text-secondary mb-4">${renderMarkdown(guide.content)}</p>`
            }}
          />
        </CardContent>
      </Card>

      {/* Author Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {guide.user?.image ? (
              <img
                src={guide.user.image}
                alt={guide.user.username || guide.user.name || 'Author'}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center">
                <User className="w-6 h-6 text-text-muted" />
              </div>
            )}
            <div>
              <p className="text-text-muted text-sm">Written by</p>
              <p className="text-text-primary font-semibold">
                {guide.user?.username || guide.user?.name || 'Anonymous'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
