'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, Input, Button, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

const categories = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'CLASS_GUIDE', label: 'Class Guide' },
  { value: 'PVP', label: 'PvP' },
  { value: 'PVE', label: 'PvE' },
  { value: 'CRAFTING', label: 'Crafting' },
  { value: 'ECONOMY', label: 'Economy' },
  { value: 'ADVANCED', label: 'Advanced' },
]

export default function CreateGuidePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'BEGINNER',
    isPublished: false,
  })

  // Redirect if not logged in
  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (publish: boolean) => {
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    if (!formData.content.trim()) {
      alert('Please enter content')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isPublished: publish,
        }),
      })

      if (response.ok) {
        const guide = await response.json()
        router.push(`/guides/${guide.slug}`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create guide')
      }
    } catch (error) {
      console.error('Error creating guide:', error)
      alert('Failed to create guide')
    } finally {
      setSaving(false)
    }
  }

  // Simple markdown to HTML converter for preview
  const renderMarkdown = (content: string): string => {
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-text-primary mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-text-primary mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold text-text-primary">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-orange-400 hover:text-orange-300 underline">$1</a>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-bg-tertiary p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
      .replace(/`([^`]+)`/gim, '<code class="bg-bg-tertiary px-1.5 py-0.5 rounded text-sm">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-text-secondary">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-text-secondary">$1</li>')
      .replace(/\n\n/gim, '</p><p class="text-text-secondary mb-4">')
      .replace(/\n/gim, '<br/>')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/guides" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Guides
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Write a Guide</h1>
          <p className="text-text-secondary">
            Share your knowledge with the Epitome community.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            variant="secondary"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          {showPreview ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {formData.title || 'Untitled Guide'}
                </h2>
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: formData.content
                      ? `<p class="text-text-secondary mb-4">${renderMarkdown(formData.content)}</p>`
                      : '<p class="text-text-muted">No content yet...</p>'
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Title *</label>
                  <Input
                    placeholder="Enter a descriptive title for your guide"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">
                    Short Description (optional)
                  </label>
                  <Input
                    placeholder="A brief summary of what this guide covers"
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Content *</label>
                  <textarea
                    className="w-full min-h-[400px] rounded-md border border-border-primary bg-bg-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                    placeholder="Write your guide content here...

You can use Markdown formatting:
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*

- bullet point
1. numbered list

[link text](url)
`inline code`

```
code block
```"
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                  />
                </div>

                {/* Markdown Help */}
                <div className="text-xs text-text-muted space-y-1 p-3 bg-bg-tertiary rounded-lg">
                  <p className="font-semibold text-text-secondary mb-2">Markdown Tips:</p>
                  <p><code className="bg-bg-secondary px-1 rounded"># Heading</code> for headers</p>
                  <p><code className="bg-bg-secondary px-1 rounded">**bold**</code> for bold text</p>
                  <p><code className="bg-bg-secondary px-1 rounded">*italic*</code> for italic text</p>
                  <p><code className="bg-bg-secondary px-1 rounded">[text](url)</code> for links</p>
                  <p><code className="bg-bg-secondary px-1 rounded">- item</code> for bullet lists</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish Card */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-text-primary">Publish</h3>

              {/* Category */}
              <div>
                <label className="text-sm text-text-secondary mb-2 block">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => handleChange('category', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Info */}
              <div className="text-sm text-text-muted">
                <p>Author: {session?.user?.name || session?.user?.email}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleSubmit(true)}
                  disabled={saving}
                  className="w-full gap-2 bg-orange-500 hover:bg-orange-600"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Publish Guide
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleSubmit(false)}
                  disabled={saving}
                  className="w-full"
                >
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-text-primary mb-3">Writing Tips</h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>• Use clear headings to organize content</li>
                <li>• Include step-by-step instructions</li>
                <li>• Add examples where helpful</li>
                <li>• Keep paragraphs short and readable</li>
                <li>• Review before publishing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
