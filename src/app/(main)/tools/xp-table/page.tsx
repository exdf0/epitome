'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Input, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { Search, TrendingUp, Loader2 } from 'lucide-react'

interface Mob {
  id: string
  name: string
  slug: string
  level: number
  xpReward: number
  biome?: string
  category: string
}

// XP table data (game formula)
const xpTable = Array.from({ length: 100 }, (_, i) => {
  const level = i + 1
  const xpRequired = Math.floor(100 * Math.pow(level, 2.5))
  const totalXp = Array.from({ length: level }, (_, j) =>
    Math.floor(100 * Math.pow(j + 1, 2.5))
  ).reduce((a, b) => a + b, 0)

  return {
    level,
    xpRequired,
    totalXp,
    statPoints: 5,
    skillPoints: level % 5 === 0 ? 1 : 0,
  }
})

const biomeLabels: Record<string, string> = {
  MEADOW: 'Meadow',
  COAST: 'Coast',
  FOREST: 'Forest',
  FOOTHILL: 'Foothill',
  RED: 'Red',
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toLocaleString()
}

export default function XpTablePage() {
  const [searchLevel, setSearchLevel] = useState('')
  const [mobSearch, setMobSearch] = useState('')
  const [mobs, setMobs] = useState<Mob[]>([])
  const [loadingMobs, setLoadingMobs] = useState(true)

  // Calculator state
  const [currentLevel, setCurrentLevel] = useState('')
  const [targetLevel, setTargetLevel] = useState('')
  const [selectedMob, setSelectedMob] = useState('')
  const [killsPerMinute, setKillsPerMinute] = useState('10')

  // Fetch mobs from database
  useEffect(() => {
    const fetchMobs = async () => {
      try {
        const response = await fetch('/api/mobs?limit=500')
        if (response.ok) {
          const data = await response.json()
          // Sort by level
          const sortedMobs = (data.mobs || []).sort((a: Mob, b: Mob) => a.level - b.level)
          setMobs(sortedMobs)
        }
      } catch (error) {
        console.error('Error fetching mobs:', error)
      } finally {
        setLoadingMobs(false)
      }
    }
    fetchMobs()
  }, [])

  const filteredXpTable = searchLevel
    ? xpTable.filter((row) => row.level.toString().includes(searchLevel))
    : xpTable

  const filteredMobs = mobSearch
    ? mobs.filter((mob) =>
        mob.name.toLowerCase().includes(mobSearch.toLowerCase())
      )
    : mobs

  // Calculator results
  const calculatorResults = useMemo(() => {
    const current = parseInt(currentLevel) || 1
    const target = parseInt(targetLevel) || 1
    const kpm = parseFloat(killsPerMinute) || 10
    const mob = mobs.find(m => m.id === selectedMob)

    if (current >= target || !mob) {
      return { xpNeeded: 0, mobsToKill: 0, estimatedTime: '0' }
    }

    // Calculate total XP needed
    let xpNeeded = 0
    for (let lvl = current; lvl < target; lvl++) {
      const xpRow = xpTable.find(r => r.level === lvl + 1)
      if (xpRow) {
        xpNeeded += xpRow.xpRequired
      }
    }

    const mobsToKill = Math.ceil(xpNeeded / mob.xpReward)
    const totalMinutes = mobsToKill / kpm

    let estimatedTime = ''
    if (totalMinutes < 60) {
      estimatedTime = `${Math.ceil(totalMinutes)} minutes`
    } else if (totalMinutes < 1440) {
      const hours = Math.floor(totalMinutes / 60)
      const mins = Math.ceil(totalMinutes % 60)
      estimatedTime = `${hours}h ${mins}m`
    } else {
      const days = Math.floor(totalMinutes / 1440)
      const hours = Math.ceil((totalMinutes % 1440) / 60)
      estimatedTime = `${days}d ${hours}h`
    }

    return { xpNeeded, mobsToKill, estimatedTime }
  }, [currentLevel, targetLevel, selectedMob, killsPerMinute, mobs])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">XP Table</h1>
        <p className="text-text-secondary">
          Experience requirements for each level and mob XP rewards.
        </p>
      </div>

      <Tabs defaultValue="levels">
        <TabsList className="mb-6">
          <TabsTrigger value="levels">Level Requirements</TabsTrigger>
          <TabsTrigger value="mobs">Mob XP</TabsTrigger>
          <TabsTrigger value="calculator">XP Calculator</TabsTrigger>
        </TabsList>

        {/* Level Requirements Tab */}
        <TabsContent value="levels">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent-primary" />
                  Level XP Requirements
                </CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    placeholder="Search level..."
                    value={searchLevel}
                    onChange={(e) => setSearchLevel(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-primary">
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Level</th>
                      <th className="text-right py-3 px-4 text-text-secondary font-medium">XP Required</th>
                      <th className="text-right py-3 px-4 text-text-secondary font-medium">Total XP</th>
                      <th className="text-right py-3 px-4 text-text-secondary font-medium">Stat Points</th>
                      <th className="text-right py-3 px-4 text-text-secondary font-medium">Skill Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredXpTable.slice(0, 50).map((row) => (
                      <tr
                        key={row.level}
                        className="border-b border-border-primary/50 hover:bg-bg-tertiary/50"
                      >
                        <td className="py-3 px-4">
                          <Badge variant={row.level % 10 === 0 ? 'primary' : 'default'}>
                            {row.level}
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4 font-mono text-text-primary">
                          {formatNumber(row.xpRequired)}
                        </td>
                        <td className="text-right py-3 px-4 font-mono text-text-secondary">
                          {formatNumber(row.totalXp)}
                        </td>
                        <td className="text-right py-3 px-4 text-text-primary">
                          +{row.statPoints}
                        </td>
                        <td className="text-right py-3 px-4 text-text-primary">
                          {row.skillPoints > 0 ? `+${row.skillPoints}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredXpTable.length > 50 && (
                <p className="text-center text-text-muted text-sm mt-4">
                  Showing first 50 results. Use search to find specific levels.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mob XP Tab */}
        <TabsContent value="mobs">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Mob XP Rewards ({mobs.length} mobs)</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    placeholder="Search mob..."
                    value={mobSearch}
                    onChange={(e) => setMobSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingMobs ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                </div>
              ) : filteredMobs.length === 0 ? (
                <div className="text-center py-8 text-text-muted">
                  {mobs.length === 0 ? 'No mobs in database. Add mobs from Admin panel.' : 'No mobs found.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-primary">
                        <th className="text-left py-3 px-4 text-text-secondary font-medium">Mob Name</th>
                        <th className="text-right py-3 px-4 text-text-secondary font-medium">Level</th>
                        <th className="text-right py-3 px-4 text-text-secondary font-medium">XP Reward</th>
                        <th className="text-left py-3 px-4 text-text-secondary font-medium">Biome</th>
                        <th className="text-left py-3 px-4 text-text-secondary font-medium">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMobs.slice(0, 100).map((mob) => (
                        <tr
                          key={mob.id}
                          className="border-b border-border-primary/50 hover:bg-bg-tertiary/50"
                        >
                          <td className="py-3 px-4 text-text-primary font-medium">
                            <a href={`/mobs/${mob.slug}`} className="hover:text-accent-primary transition-colors">
                              {mob.name}
                            </a>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge variant="default">{mob.level}</Badge>
                          </td>
                          <td className="text-right py-3 px-4 font-mono text-accent-primary">
                            {formatNumber(mob.xpReward)}
                          </td>
                          <td className="py-3 px-4 text-text-secondary">
                            {mob.biome ? biomeLabels[mob.biome] || mob.biome : '-'}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={mob.category === 'BOSS' ? 'error' : mob.category === 'MINI_BOSS' ? 'warning' : 'default'}>
                              {mob.category.replace('_', ' ')}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredMobs.length > 100 && (
                    <p className="text-center text-text-muted text-sm mt-4">
                      Showing first 100 results. Use search to find specific mobs.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* XP Calculator Tab */}
        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>XP Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Current Level</label>
                  <Input
                    type="number"
                    placeholder="1"
                    min="1"
                    max="99"
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Target Level</label>
                  <Input
                    type="number"
                    placeholder="100"
                    min="2"
                    max="100"
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Mob to Farm</label>
                  {loadingMobs ? (
                    <div className="flex items-center gap-2 text-text-muted">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading mobs...
                    </div>
                  ) : mobs.length === 0 ? (
                    <p className="text-text-muted text-sm">No mobs in database</p>
                  ) : (
                    <Select value={selectedMob} onValueChange={setSelectedMob}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a mob" />
                      </SelectTrigger>
                      <SelectContent>
                        {mobs.map((mob) => (
                          <SelectItem key={mob.id} value={mob.id}>
                            {mob.name} (Lv.{mob.level}) - {formatNumber(mob.xpReward)} XP
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div>
                  <label className="text-sm text-text-secondary mb-2 block">Kills per Minute</label>
                  <Input
                    type="number"
                    placeholder="10"
                    min="1"
                    max="100"
                    value={killsPerMinute}
                    onChange={(e) => setKillsPerMinute(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-bg-tertiary rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">XP Needed</p>
                  <p className="text-2xl font-bold text-accent-primary">
                    {calculatorResults.xpNeeded > 0 ? formatNumber(calculatorResults.xpNeeded) : '--'}
                  </p>
                </div>
                <div className="p-4 bg-bg-tertiary rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">Mobs to Kill</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {calculatorResults.mobsToKill > 0 ? formatNumber(calculatorResults.mobsToKill) : '--'}
                  </p>
                </div>
                <div className="p-4 bg-bg-tertiary rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">Estimated Time</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {calculatorResults.xpNeeded > 0 ? calculatorResults.estimatedTime : '--'}
                  </p>
                </div>
                {calculatorResults.xpNeeded > 0 && selectedMob && (
                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <p className="text-sm text-orange-300">
                      At {killsPerMinute} kills/min, you need to farm for approximately {calculatorResults.estimatedTime} to reach level {targetLevel}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
