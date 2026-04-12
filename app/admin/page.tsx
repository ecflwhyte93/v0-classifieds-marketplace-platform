'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Flame, Users, FileText, MessageSquare, Flag, DollarSign, 
  TrendingUp, Eye, Star, Shield, LogOut, Settings, BarChart3,
  UserCheck, UserX, Clock, AlertTriangle, CheckCircle2, XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockProfiles } from '@/lib/mock-data'

interface AdminAuth {
  email: string
  role: string
  loginTime: string
}

interface Stats {
  totalUsers: number
  activeAds: number
  pendingReviews: number
  reports: number
  revenue: number
  newUsers24h: number
}

interface Report {
  id: string
  type: 'spam' | 'inappropriate' | 'scam' | 'harassment'
  reportedUser: string
  reportedBy: string
  createdAt: string
  status: 'pending' | 'resolved' | 'dismissed'
}

const mockReports: Report[] = [
  { id: '1', type: 'spam', reportedUser: 'user123', reportedBy: 'Sophia', createdAt: '2 hours ago', status: 'pending' },
  { id: '2', type: 'inappropriate', reportedUser: 'user456', reportedBy: 'Valentina', createdAt: '5 hours ago', status: 'pending' },
  { id: '3', type: 'scam', reportedUser: 'user789', reportedBy: 'Jade', createdAt: '1 day ago', status: 'resolved' },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<AdminAuth | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'ads' | 'reports' | 'revenue'>('overview')
  const [stats] = useState<Stats>({
    totalUsers: 12847,
    activeAds: 3256,
    pendingReviews: 47,
    reports: 12,
    revenue: 45890,
    newUsers24h: 234
  })

  useEffect(() => {
    const stored = localStorage.getItem('adminAuth')
    if (!stored) {
      router.push('/admin/login')
      return
    }
    setAuth(JSON.parse(stored))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Flame className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">ALLURE</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {[
              { id: 'overview', icon: BarChart3, label: 'Overview' },
              { id: 'users', icon: Users, label: 'Users' },
              { id: 'ads', icon: FileText, label: 'Listings' },
              { id: 'reports', icon: Flag, label: 'Reports', badge: stats.reports },
              { id: 'revenue', icon: DollarSign, label: 'Revenue' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTab === item.id ? 'bg-primary-foreground/20' : 'bg-destructive text-destructive-foreground'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User */}
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">{auth.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Active Listings', value: stats.activeAds.toLocaleString(), icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10' },
                { label: 'Pending Reviews', value: stats.pendingReviews, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'Open Reports', value: stats.reports, icon: Flag, color: 'text-red-500', bg: 'bg-red-500/10' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg ${stat.bg} p-3`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue (This Month)</p>
                  <p className="text-3xl font-bold text-foreground">${stats.revenue.toLocaleString()}</p>
                  <p className="flex items-center gap-1 text-sm text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    +12.5% from last month
                  </p>
                </div>
                <div className="rounded-lg bg-green-500/10 p-4">
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* New Users */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">New Users (24h)</h3>
                <div className="space-y-3">
                  {mockProfiles.slice(0, 4).map((profile) => (
                    <div key={profile.id} className="flex items-center gap-3">
                      <img
                        src={profile.photos[0]}
                        alt={profile.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">{profile.location}</p>
                      </div>
                      <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-500">
                        New
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reports */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Recent Reports</h3>
                <div className="space-y-3">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center gap-3">
                      <div className={`rounded-full p-2 ${
                        report.status === 'pending' ? 'bg-amber-500/10' : 
                        report.status === 'resolved' ? 'bg-green-500/10' : 'bg-muted'
                      }`}>
                        <AlertTriangle className={`h-4 w-4 ${
                          report.status === 'pending' ? 'text-amber-500' : 
                          report.status === 'resolved' ? 'text-green-500' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground capitalize">{report.type}</p>
                        <p className="text-xs text-muted-foreground">Reported by {report.reportedBy}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs capitalize ${
                        report.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                        report.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">User Management</h2>
                <p className="text-muted-foreground">{stats.totalUsers.toLocaleString()} total users</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export</Button>
                <Button size="sm" className="bg-primary">Add User</Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rating</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProfiles.map((profile) => (
                      <tr key={profile.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={profile.photos[0]}
                              alt={profile.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-foreground">{profile.name}, {profile.age}</p>
                              <p className="text-xs text-muted-foreground">ID: {profile.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{profile.location}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                            {profile.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {profile.isVerified && (
                              <span className="flex items-center gap-1 text-xs text-green-500">
                                <UserCheck className="h-3 w-3" /> Verified
                              </span>
                            )}
                            {profile.isOnline && (
                              <span className="h-2 w-2 rounded-full bg-green-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {profile.rating}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <UserX className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Listing Management</h2>
                <p className="text-muted-foreground">{stats.activeAds.toLocaleString()} active listings</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Pending ({stats.pendingReviews})</Button>
                <Button variant="outline" size="sm">Flagged</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockProfiles.map((profile) => (
                <div key={profile.id} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={profile.photos[0]}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                    {profile.isFeatured && (
                      <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{profile.name}, {profile.age}</h3>
                      {profile.isVerified && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{profile.location}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Reports & Moderation</h2>
              <p className="text-muted-foreground">{stats.reports} open reports</p>
            </div>

            <div className="rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {mockReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${
                        report.type === 'scam' ? 'bg-red-500/10' :
                        report.type === 'spam' ? 'bg-amber-500/10' :
                        report.type === 'harassment' ? 'bg-purple-500/10' : 'bg-blue-500/10'
                      }`}>
                        <Flag className={`h-5 w-5 ${
                          report.type === 'scam' ? 'text-red-500' :
                          report.type === 'spam' ? 'text-amber-500' :
                          report.type === 'harassment' ? 'text-purple-500' : 'text-blue-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium capitalize text-foreground">{report.type} Report</p>
                        <p className="text-sm text-muted-foreground">
                          {report.reportedUser} reported by {report.reportedBy}
                        </p>
                        <p className="text-xs text-muted-foreground">{report.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-sm capitalize ${
                        report.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                        report.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                      }`}>
                        {report.status}
                      </span>
                      {report.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-green-500 hover:text-green-500">
                            Resolve
                          </Button>
                          <Button size="sm" variant="outline" className="text-muted-foreground">
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Revenue Analytics</h2>
              <p className="text-muted-foreground">Financial overview and transactions</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { label: 'Total Revenue', value: '$45,890', change: '+12.5%', positive: true },
                { label: 'VIP Subscriptions', value: '$32,450', change: '+8.2%', positive: true },
                { label: 'Featured Listings', value: '$13,440', change: '+18.7%', positive: true },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">Recent Transactions</h3>
              <div className="space-y-3">
                {[
                  { user: 'Sophia', type: 'VIP Monthly', amount: '$29.99', date: '2 hours ago' },
                  { user: 'Valentina', type: 'Featured Listing', amount: '$9.99', date: '5 hours ago' },
                  { user: 'Jade', type: 'VIP Weekly', amount: '$12.99', date: '1 day ago' },
                  { user: 'Celeste', type: 'VIP Yearly', amount: '$199.99', date: '1 day ago' },
                  { user: 'Luna', type: 'Featured Listing', amount: '$9.99', date: '2 days ago' },
                ].map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div>
                      <p className="font-medium text-foreground">{tx.user}</p>
                      <p className="text-sm text-muted-foreground">{tx.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-500">{tx.amount}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
