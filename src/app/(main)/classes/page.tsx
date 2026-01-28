'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, Badge } from '@/components/ui'
import { ArrowRight, Loader2 } from 'lucide-react'
import { CLASS_IMAGES } from '@/constants/game-data'

interface ClassInfo {
  id: string
  class: string
  name: string
  description: string
  imageUrl?: string
  color?: string
  primaryStat: string
  secondaryStat?: string
  difficulty?: string
  playstyle: string[]
  strengths: string[]
  weaknesses: string[]
}

const classColorClasses: Record<string, { text: string; bg: string; border: string }> = {
  WARRIOR: {
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
  NINJA: {
    text: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
  SHAMAN: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  NECROMANCER: {
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
}

const difficultyVariants: Record<string, 'success' | 'warning' | 'error'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/api/classes')
        if (response.ok) {
          const data = await response.json()
          setClasses(data)
        }
      } catch (error) {
        console.error('Error fetching classes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Character Classes</h1>
        <p className="text-text-secondary">
          Learn about the unique classes in Epitome and find the one that fits your playstyle.
        </p>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted">No classes available yet.</p>
        </div>
      ) : (
        <>
          {/* Classes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {classes.map((cls) => {
              const colors = classColorClasses[cls.class] || {
                text: 'text-gray-400',
                bg: 'bg-gray-500/10',
                border: 'border-gray-500/30',
              }
              const classImage = CLASS_IMAGES[cls.class as keyof typeof CLASS_IMAGES] || cls.imageUrl

              return (
                <Link key={cls.id} href={`/classes/${cls.class.toLowerCase()}`}>
                  <Card className={`h-full border ${colors.border} hover:border-opacity-60 transition-colors`}>
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                          {classImage ? (
                            <img
                              src={classImage}
                              alt={cls.name}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <span className={`text-2xl font-bold ${colors.text}`}>
                              {cls.name[0]}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h2 className={`text-2xl font-bold ${colors.text} mb-1`}>
                            {cls.name}
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {cls.playstyle?.map((style) => (
                              <Badge key={style} variant="default">
                                {style}
                              </Badge>
                            ))}
                            {cls.difficulty && (
                              <Badge variant={difficultyVariants[cls.difficulty] || 'warning'}>
                                {cls.difficulty}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary mb-4 line-clamp-2">
                        {cls.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-text-muted text-sm">Primary:</span>
                          <Badge variant="primary">{cls.primaryStat}</Badge>
                        </div>
                        {cls.secondaryStat && (
                          <div className="flex items-center gap-2">
                            <span className="text-text-muted text-sm">Secondary:</span>
                            <Badge variant="secondary">{cls.secondaryStat}</Badge>
                          </div>
                        )}
                      </div>

                      {/* Strengths Preview */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {cls.strengths?.slice(0, 2).map((strength) => (
                            <span key={strength} className="text-xs text-text-muted">
                              + {strength}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className={`w-5 h-5 ${colors.text}`} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Comparison Table */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-primary">
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Class</th>
                      <th className="text-center py-3 px-4 text-text-secondary font-medium">Primary Stat</th>
                      <th className="text-center py-3 px-4 text-text-secondary font-medium">Role</th>
                      <th className="text-center py-3 px-4 text-text-secondary font-medium">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((cls) => {
                      const colors = classColorClasses[cls.class] || {
                        text: 'text-gray-400',
                        bg: 'bg-gray-500/10',
                        border: 'border-gray-500/30',
                      }
                      const classImage = CLASS_IMAGES[cls.class as keyof typeof CLASS_IMAGES] || cls.imageUrl

                      return (
                        <tr key={cls.id} className="border-b border-border-primary/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {classImage ? (
                                <img
                                  src={classImage}
                                  alt={cls.name}
                                  className="w-6 h-6 object-contain"
                                />
                              ) : (
                                <span className={`w-5 h-5 ${colors.text}`}>●</span>
                              )}
                              <span className={`font-medium ${colors.text}`}>{cls.name}</span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4">
                            <Badge variant="primary">{cls.primaryStat}</Badge>
                          </td>
                          <td className="text-center py-3 px-4">
                            {cls.playstyle?.join(' / ') || '-'}
                          </td>
                          <td className="text-center py-3 px-4">
                            {cls.difficulty && (
                              <Badge variant={difficultyVariants[cls.difficulty] || 'warning'}>
                                {cls.difficulty}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
