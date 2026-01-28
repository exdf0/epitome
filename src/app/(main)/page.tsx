import Link from 'next/link'
import Image from 'next/image'
import {
  Database,
  Map,
  Hammer,
  BookOpen,
  Calculator,
  Users,
  ArrowRight,
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { CLASS_IMAGES } from '@/constants/game-data'

const features = [
  {
    name: 'Item Database',
    description: 'Browse all items with advanced filtering by type, rarity, and stats.',
    href: '/items',
    icon: Database,
  },
  {
    name: 'Interactive Map',
    description: 'Explore the world map with mob spawns, NPCs, and points of interest.',
    href: '/map',
    icon: Map,
  },
  {
    name: 'Build Planner',
    description: 'Create, share, and discover character builds with the community.',
    href: '/builds',
    icon: Hammer,
  },
  {
    name: 'Guides',
    description: 'Learn from beginner guides to advanced class strategies.',
    href: '/guides',
    icon: BookOpen,
  },
  {
    name: 'XP Calculator',
    description: 'Calculate experience requirements and optimal leveling paths.',
    href: '/tools/xp-table',
    icon: Calculator,
  },
  {
    name: 'Class Info',
    description: 'Detailed information about all character classes and their abilities.',
    href: '/classes',
    icon: Users,
  },
]

const classes = [
  {
    name: 'Warrior',
    key: 'WARRIOR' as const,
    description: 'Frontline melee fighter with high defense and powerful attacks.',
    color: 'text-class-warrior',
    bgColor: 'bg-class-warrior/10',
    borderColor: 'border-class-warrior/30',
    primaryStat: 'STR',
  },
  {
    name: 'Ninja',
    key: 'NINJA' as const,
    description: 'Agile assassin specializing in quick strikes and evasion.',
    color: 'text-class-ninja',
    bgColor: 'bg-class-ninja/10',
    borderColor: 'border-class-ninja/30',
    primaryStat: 'DEX',
  },
  {
    name: 'Shaman',
    key: 'SHAMAN' as const,
    description: 'Versatile spellcaster with healing and elemental abilities.',
    color: 'text-class-shaman',
    bgColor: 'bg-class-shaman/10',
    borderColor: 'border-class-shaman/30',
    primaryStat: 'INT',
  },
  {
    name: 'Necromancer',
    key: 'NECROMANCER' as const,
    description: 'Dark mage commanding undead minions and draining life force.',
    color: 'text-class-necromancer',
    bgColor: 'bg-class-necromancer/10',
    borderColor: 'border-class-necromancer/30',
    primaryStat: 'INT',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              Community Database
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Epitome Codex
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8">
              The ultimate database, build planner, and tool collection for Epitome MMORPG.
              Explore items, plan your builds, and master the game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/items">
                <Button size="lg" className="w-full sm:w-auto">
                  <Database className="w-5 h-5 mr-2" />
                  Browse Items
                </Button>
              </Link>
              <Link href="/builds/planner">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Hammer className="w-5 h-5 mr-2" />
                  Build Planner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.name} href={feature.href}>
                  <Card className="h-full hover:border-accent-primary/50 transition-colors group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Character Classes
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Choose your path and master one of the four unique classes in Epitome.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((cls) => (
              <Link key={cls.name} href={`/classes/${cls.name.toLowerCase()}`}>
                <Card className={`h-full border ${cls.borderColor} hover:border-opacity-60 transition-colors group`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-24 h-24 rounded-full ${cls.bgColor} flex items-center justify-center mx-auto mb-4 overflow-hidden`}>
                      <Image
                        src={CLASS_IMAGES[cls.key]}
                        alt={cls.name}
                        width={80}
                        height={80}
                        className="object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className={`text-lg font-semibold ${cls.color} mb-2`}>
                      {cls.name}
                    </h3>
                    <Badge variant="default" className="mb-3">
                      Primary: {cls.primaryStat}
                    </Badge>
                    <p className="text-sm text-text-secondary">
                      {cls.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <Card className="border-accent-primary/30 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Join the Community
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto mb-8">
                Sign in with Discord to create and share your builds, save your favorite items,
                and contribute to the community knowledge base.
              </p>
              <Button size="lg">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
