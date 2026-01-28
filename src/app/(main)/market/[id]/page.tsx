'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from '@/components/ui'
import { ArrowLeft, Eye, MessageCircle, Loader2, Send, User, Clock, Trash2, Check, X } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Enchantment {
  id: string
  name: string
  statKey: string
  value: number
}

interface Comment {
  id: string
  content: string
  user: {
    id: string
    name?: string
    username?: string
    image?: string
  }
  createdAt: string
}

interface TradeListing {
  id: string
  title: string
  description?: string
  itemId?: string
  itemName: string
  itemType: string
  itemRarity: string
  itemImage?: string
  isGear: boolean
  enhancementLevel: number
  enchantments: Enchantment[]
  priceAmount: number
  priceCurrency: string
  status: string
  viewCount: number
  seller: {
    id: string
    name?: string
    username?: string
    image?: string
  }
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

const rarityColors: Record<string, string> = {
  COMMON: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  UNCOMMON: 'bg-green-500/20 text-green-400 border-green-500/50',
  RARE: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  EPIC: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  LEGENDARY: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  MYTHIC: 'bg-red-500/20 text-red-400 border-red-500/50',
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/50',
  SOLD: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  CANCELLED: 'bg-red-500/20 text-red-400 border-red-500/50',
}

export default function ListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [listing, setListing] = useState<TradeListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/market/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setListing(data)
        } else if (response.status === 404) {
          router.push('/market')
        }
      } catch (error) {
        console.error('Error fetching listing:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.id, router])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || !session) return

    setSubmittingComment(true)
    try {
      const response = await fetch(`/api/market/${params.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText }),
      })

      if (response.ok) {
        const newComment = await response.json()
        setListing((prev) =>
          prev ? { ...prev, comments: [newComment, ...prev.comments] } : prev
        )
        setCommentText('')
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!listing || !session) return

    setUpdatingStatus(true)
    try {
      const response = await fetch(`/api/market/${listing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setListing((prev) => (prev ? { ...prev, status: newStatus } : prev))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleDelete = async () => {
    if (!listing || !session) return
    if (!confirm('Are you sure you want to delete this listing?')) return

    try {
      const response = await fetch(`/api/market/${listing.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/market')
      }
    } catch (error) {
      console.error('Error deleting listing:', error)
    }
  }

  const formatPrice = (amount: number, currency: string) => {
    return (
      <span className="flex items-center gap-2">
        <img
          src={`/game-images/currency/${currency.toLowerCase()}.png`}
          alt={currency}
          className="w-6 h-6"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <span className="text-2xl font-bold text-orange-400">{amount.toLocaleString()}</span>
        <span className="text-text-muted">{currency}</span>
      </span>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Listing Not Found</h1>
          <Link href="/market">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Market
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = session?.user?.id === listing.seller.id
  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'MODERATOR'

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-text-primary">Home</Link>
        <span>&gt;</span>
        <Link href="/market" className="hover:text-text-primary">Trade Market</Link>
        <span>&gt;</span>
        <span className="text-text-primary truncate">{listing.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Item Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Item Image */}
                <div className="w-full md:w-64 aspect-square bg-bg-tertiary rounded-xl flex items-center justify-center relative shrink-0">
                  {listing.itemImage ? (
                    <img
                      src={listing.itemImage}
                      alt={listing.itemName}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-4xl text-text-muted">?</span>
                    </div>
                  )}
                  {listing.isGear && listing.enhancementLevel > 0 && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white text-lg font-bold rounded-lg">
                      +{listing.enhancementLevel}
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-text-primary">{listing.itemName}</h1>
                      <p className="text-text-secondary">{listing.title}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={rarityColors[listing.itemRarity]}>
                        {listing.itemRarity}
                      </Badge>
                      <Badge className={statusColors[listing.status]}>
                        {listing.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="p-4 bg-bg-tertiary rounded-xl">
                    <p className="text-sm text-text-muted mb-1">Price</p>
                    {formatPrice(listing.priceAmount, listing.priceCurrency)}
                  </div>

                  {/* Enchantments */}
                  {listing.enchantments.length > 0 && (
                    <div>
                      <p className="text-sm text-text-muted mb-2">Enchantments</p>
                      <div className="flex flex-wrap gap-2">
                        {listing.enchantments.map((ench, i) => (
                          <Badge key={i} className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                            {ench.name}: +{ench.value} {ench.statKey}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {listing.description && (
                    <div>
                      <p className="text-sm text-text-muted mb-2">Description</p>
                      <p className="text-text-secondary">{listing.description}</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-text-muted pt-4 border-t border-border-primary">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {listing.viewCount} views
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {listing.comments.length} comments
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(listing.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader className="p-4 border-b border-border-primary">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments ({listing.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {/* Comment Form */}
              {session ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <div className="flex gap-3">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt=""
                        className="w-10 h-10 rounded-full shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-text-muted" />
                      </div>
                    )}
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={submittingComment}
                      />
                      <Button
                        type="submit"
                        disabled={!commentText.trim() || submittingComment}
                        className="shrink-0"
                      >
                        {submittingComment ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-6 p-4 bg-bg-tertiary rounded-lg text-center">
                  <p className="text-text-muted">
                    <Link href="/api/auth/signin" className="text-orange-400 hover:underline">
                      Sign in
                    </Link>
                    {' '}to leave a comment
                  </p>
                </div>
              )}

              {/* Comments List */}
              {listing.comments.length === 0 ? (
                <p className="text-center text-text-muted py-8">No comments yet</p>
              ) : (
                <div className="space-y-4">
                  {listing.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      {comment.user.image ? (
                        <img
                          src={comment.user.image}
                          alt=""
                          className="w-10 h-10 rounded-full shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center shrink-0">
                          <span className="text-sm">
                            {(comment.user.username || comment.user.name || '?')[0]}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-text-primary text-sm">
                            {comment.user.username || comment.user.name || 'Anonymous'}
                          </span>
                          <span className="text-xs text-text-muted">
                            {timeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Seller Info & Actions */}
        <div className="space-y-6">
          {/* Seller Card */}
          <Card>
            <CardHeader className="p-4 border-b border-border-primary">
              <CardTitle className="text-lg">Seller</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {listing.seller.image ? (
                  <img
                    src={listing.seller.image}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center">
                    <User className="w-6 h-6 text-text-muted" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-text-primary">
                    {listing.seller.username || listing.seller.name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-text-muted">Seller</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Owner Actions */}
          {(isOwner || isAdmin) && (
            <Card>
              <CardHeader className="p-4 border-b border-border-primary">
                <CardTitle className="text-lg">Manage Listing</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {listing.status === 'ACTIVE' && (
                  <>
                    <Button
                      className="w-full gap-2 bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange('SOLD')}
                      disabled={updatingStatus}
                    >
                      <Check className="w-4 h-4" />
                      Mark as Sold
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => handleStatusChange('CANCELLED')}
                      disabled={updatingStatus}
                    >
                      <X className="w-4 h-4" />
                      Cancel Listing
                    </Button>
                  </>
                )}
                {listing.status !== 'ACTIVE' && (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handleStatusChange('ACTIVE')}
                    disabled={updatingStatus}
                  >
                    Reactivate Listing
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Listing
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Back to Market */}
          <Link href="/market">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Market
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
