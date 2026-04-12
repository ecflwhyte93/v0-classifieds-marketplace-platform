'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Settings, 
  Heart, 
  Star, 
  Eye, 
  Edit, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/bottom-nav'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: Heart, label: 'My Favorites', href: '/favorites', count: 12 },
  { icon: Star, label: 'My Reviews', href: '/reviews', count: 8 },
  { icon: Eye, label: 'Who Viewed Me', href: '/views', count: 24 },
  { icon: Edit, label: 'Edit Profile', href: '/profile/edit' },
  { icon: Shield, label: 'Verification', href: '/verification', badge: 'Verified' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', href: '/support' },
]

export default function ProfilePage() {
  const [isVip] = useState(false)

  // Demo user data
  const user = {
    name: 'Alex Johnson',
    username: '@alexj',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    adsCount: 3,
    rating: 4.8,
    reviewCount: 15,
    isVerified: true,
    memberSince: 'January 2024',
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background px-4 pb-6 pt-8">
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-primary/20">
              <Image
                src={user.photo}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.username}</p>
            <div className="mt-1 flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-foreground">{user.rating}</span>
              <span className="text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{user.adsCount}</p>
            <p className="text-xs text-muted-foreground">Active Ads</p>
          </div>
          <div className="rounded-xl bg-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Profile Views</p>
          </div>
          <div className="rounded-xl bg-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Favorites</p>
          </div>
        </div>
      </div>

      {/* VIP Upgrade Banner */}
      {!isVip && (
        <div className="mx-4 mt-4 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-orange-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
              <Crown className="h-6 w-6 text-background" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Upgrade to VIP</h3>
              <p className="text-sm text-muted-foreground">Get featured & unlimited messages</p>
            </div>
            <Button size="sm" className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-background hover:from-amber-500 hover:to-orange-600">
              Upgrade
            </Button>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="mt-6 divide-y divide-border">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="flex-1 font-medium text-foreground">{item.label}</span>
            {item.count !== undefined && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
                {item.count}
              </span>
            )}
            {item.badge && (
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-sm font-medium text-primary">
                {item.badge}
              </span>
            )}
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-6 px-4">
        <Button 
          variant="outline" 
          className="h-12 w-full gap-2 rounded-xl border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Member since {user.memberSince}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          ALLURE v1.0.0
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
