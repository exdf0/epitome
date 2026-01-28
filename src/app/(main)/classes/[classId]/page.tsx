'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'
import { ArrowLeft, Loader2, Zap, Shield, Target, Swords } from 'lucide-react'
import { CLASS_IMAGES } from '@/constants/game-data'
import { skillTrees } from '@/data/skillTrees'

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
  statScaling?: Record<string, number>
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

export default function ClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`/api/classes/${params.classId}`)
        if (response.ok) {
          const data = await response.json()
          setClassInfo(data)
        } else if (response.status === 404) {
          router.push('/classes')
        }
      } catch (error) {
        console.error('Error fetching class:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.classId) {
      fetchClass()
    }
  }, [params.classId, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  if (!classInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">Class not found</p>
          <Link href="/classes">
            <Button variant="secondary" className="mt-4">
              Back to Classes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const colors = classColorClasses[classInfo.class] || {
    text: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
  }
  const classImage = CLASS_IMAGES[classInfo.class as keyof typeof CLASS_IMAGES] || classInfo.imageUrl
  const classSkillTree = skillTrees[classInfo.class]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/classes" className="inline-flex items-center text-text-secondary hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Classes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Class Header */}
          <Card className={`border ${colors.border}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Class Image */}
                <div className={`w-full md:w-48 aspect-square ${colors.bg} rounded-lg flex items-center justify-center shrink-0`}>
                  {classImage ? (
                    <img
                      src={classImage}
                      alt={classInfo.name}
                      className="w-32 h-32 object-contain"
                    />
                  ) : (
                    <Swords className={`w-16 h-16 ${colors.text}`} />
                  )}
                </div>

                {/* Class Info */}
                <div className="flex-1">
                  <h1 className={`text-3xl font-bold ${colors.text} mb-2`}>
                    {classInfo.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {classInfo.playstyle?.map((style) => (
                      <Badge key={style} variant="default">
                        {style}
                      </Badge>
                    ))}
                    {classInfo.difficulty && (
                      <Badge variant={difficultyVariants[classInfo.difficulty] || 'warning'}>
                        {classInfo.difficulty}
                      </Badge>
                    )}
                  </div>
                  <p className="text-text-secondary">
                    {classInfo.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Zap className="w-5 h-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                {classInfo.strengths && classInfo.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {classInfo.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-text-secondary">
                        <span className="text-green-400 mt-1">+</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-muted">No strengths listed</p>
                )}
              </CardContent>
            </Card>

            {/* Weaknesses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Shield className="w-5 h-5" />
                  Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {classInfo.weaknesses && classInfo.weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {classInfo.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2 text-text-secondary">
                        <span className="text-red-400 mt-1">-</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-muted">No weaknesses listed</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills Preview */}
          {classSkillTree && classSkillTree.paths.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent-primary" />
                  Skill Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classSkillTree.paths.map((path) => (
                    <div key={path.id} className="p-4 bg-bg-tertiary rounded-lg">
                      <h4 className="font-semibold text-text-primary mb-2">{path.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.map((skill) => (
                          <Badge key={skill.id} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Primary Stat</span>
                <Badge variant="primary">{classInfo.primaryStat}</Badge>
              </div>
              {classInfo.secondaryStat && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Secondary Stat</span>
                  <Badge variant="secondary">{classInfo.secondaryStat}</Badge>
                </div>
              )}
              {classInfo.difficulty && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Difficulty</span>
                  <Badge variant={difficultyVariants[classInfo.difficulty] || 'warning'}>
                    {classInfo.difficulty}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stat Scaling */}
          {classInfo.statScaling && Object.keys(classInfo.statScaling).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Stat Scaling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(classInfo.statScaling).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="text-text-secondary uppercase">{stat}</span>
                      <span className="text-text-primary font-medium">{value}x</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Link href="/builds/planner">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Create Build
                </Button>
              </Link>
              <Link href={`/builds?class=${classInfo.class}`}>
                <Button className="w-full" variant="secondary">
                  View Builds
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
