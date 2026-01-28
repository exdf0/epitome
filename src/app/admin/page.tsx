import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import {
  Database,
  Users,
  Hammer,
  BookOpen,
  TrendingUp,
  Eye,
  ThumbsUp,
  FileText,
} from 'lucide-react'

// Demo stats - replace with actual database queries
const stats = [
  {
    name: 'Total Items',
    value: '1,234',
    change: '+12%',
    icon: Database,
  },
  {
    name: 'Total Users',
    value: '5,678',
    change: '+8%',
    icon: Users,
  },
  {
    name: 'Total Builds',
    value: '892',
    change: '+15%',
    icon: Hammer,
  },
  {
    name: 'Total Guides',
    value: '156',
    change: '+5%',
    icon: BookOpen,
  },
]

const recentActivity = [
  { type: 'user', message: 'New user registered: ShadowBlade', time: '5 minutes ago' },
  { type: 'build', message: 'New build published: "PvP Ninja Master"', time: '15 minutes ago' },
  { type: 'guide', message: 'Guide updated: "Beginner\'s Guide"', time: '1 hour ago' },
  { type: 'item', message: 'Item added: "Dragon Slayer"', time: '2 hours ago' },
  { type: 'user', message: 'User promoted to Moderator: WarriorMain', time: '3 hours ago' },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
        <p className="text-text-secondary">
          Welcome to the Epitome Codex admin panel.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat.name}</p>
                    <p className="text-3xl font-bold text-text-primary mt-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="text-text-muted ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-border-primary last:border-0 last:pb-0"
                >
                  <div className="w-2 h-2 rounded-full bg-accent-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{activity.message}</p>
                    <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/admin/items"
                className="p-4 rounded-lg bg-bg-tertiary hover:bg-bg-hover transition-colors text-center"
              >
                <Database className="w-8 h-8 text-accent-primary mx-auto mb-2" />
                <p className="text-sm text-text-primary font-medium">Add Item</p>
              </a>
              <a
                href="/admin/map"
                className="p-4 rounded-lg bg-bg-tertiary hover:bg-bg-hover transition-colors text-center"
              >
                <Eye className="w-8 h-8 text-accent-primary mx-auto mb-2" />
                <p className="text-sm text-text-primary font-medium">Add Marker</p>
              </a>
              <a
                href="/admin/guides"
                className="p-4 rounded-lg bg-bg-tertiary hover:bg-bg-hover transition-colors text-center"
              >
                <BookOpen className="w-8 h-8 text-accent-primary mx-auto mb-2" />
                <p className="text-sm text-text-primary font-medium">New Guide</p>
              </a>
              <a
                href="/admin/users"
                className="p-4 rounded-lg bg-bg-tertiary hover:bg-bg-hover transition-colors text-center"
              >
                <Users className="w-8 h-8 text-accent-primary mx-auto mb-2" />
                <p className="text-sm text-text-primary font-medium">Manage Users</p>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Top Builds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-accent-primary" />
              Top Builds This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'PvP Warrior Tank', votes: 245, class: 'Warrior' },
                { name: 'Speed Ninja Farmer', votes: 189, class: 'Ninja' },
                { name: 'Support Shaman', votes: 156, class: 'Shaman' },
              ].map((build, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-text-muted">#{index + 1}</span>
                    <div>
                      <p className="text-sm text-text-primary font-medium">{build.name}</p>
                      <p className="text-xs text-text-muted">{build.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{build.votes}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Guides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent-primary" />
              Popular Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Complete Beginner\'s Guide', views: 15420 },
                { name: 'Gold Farming Guide', views: 12100 },
                { name: 'Warrior Class Deep Dive', views: 8350 },
              ].map((guide, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
                >
                  <p className="text-sm text-text-primary font-medium">{guide.name}</p>
                  <div className="flex items-center gap-1 text-text-muted">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{guide.views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
