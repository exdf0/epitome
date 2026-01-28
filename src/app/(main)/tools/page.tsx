import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { Calculator, TrendingUp, Coins, Clock, ArrowRight } from 'lucide-react'

const tools = [
  {
    name: 'XP Table',
    description: 'Calculate experience requirements for each level and find optimal leveling spots.',
    href: '/tools/xp-table',
    icon: TrendingUp,
  },
  {
    name: 'Damage Calculator',
    description: 'Calculate your damage output based on stats, equipment, and skills.',
    href: '/tools/damage-calc',
    icon: Calculator,
    comingSoon: true,
  },
  {
    name: 'Gold Calculator',
    description: 'Estimate gold earnings from different farming methods and locations.',
    href: '/tools/gold-calc',
    icon: Coins,
    comingSoon: true,
  },
  {
    name: 'Cooldown Timer',
    description: 'Track skill cooldowns and boss respawn timers.',
    href: '/tools/timers',
    icon: Clock,
    comingSoon: true,
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Tools</h1>
        <p className="text-text-secondary">
          Helpful calculators and utilities for Epitome players.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isComingSoon = tool.comingSoon

          return (
            <Link
              key={tool.name}
              href={isComingSoon ? '#' : tool.href}
              className={isComingSoon ? 'cursor-not-allowed' : ''}
            >
              <Card className={`h-full transition-colors ${
                isComingSoon
                  ? 'opacity-60'
                  : 'hover:border-accent-primary/50'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {tool.name}
                        </h3>
                        {isComingSoon && (
                          <span className="text-xs bg-bg-tertiary text-text-muted px-2 py-0.5 rounded">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {tool.description}
                      </p>
                    </div>
                    {!isComingSoon && (
                      <ArrowRight className="w-5 h-5 text-text-muted shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
