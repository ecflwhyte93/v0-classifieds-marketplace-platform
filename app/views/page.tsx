'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Eye, Crown, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/bottom-nav'

const mockViews = [
  {
    id: '1',
    name: 'Emily',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    time: '2 hours ago',
    isBlurred: false,
  },
  {
    id: '2',
    name: 'Jessica',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    time: '5 hours ago',
    isBlurred: false,
  },
  {
    id: '3',
    name: '???',
    photo: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop',
    time: 'Yesterday',
    isBlurred: true,
  },
  {
    id: '4',
    name: '???',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
    time: 'Yesterday',
    isBlurred: true,
  },
  {
    id: '5',
    name: '???',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    time: '2 days ago',
    isBlurred: true,
  },
]

export default function ViewsPage() {
  const unlockedCount = mockViews.filter(v => !v.isBlurred).length
  const lockedCount = mockViews.filter(v => v.isBlurred).length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Who Viewed Me</h1>
            <p className="text-sm text-muted-foreground">{mockViews.length} total views</p>
          </div>
        </div>
      </div>

      {/* VIP Banner */}
      {lockedCount > 0 && (
        <div className="mx-4 mt-4 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-orange-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
              <Crown className="h-6 w-6 text-background" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                {lockedCount} hidden viewers
              </h3>
              <p className="text-sm text-muted-foreground">Upgrade to VIP to see everyone</p>
            </div>
            <Button size="sm" className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-background hover:from-amber-500 hover:to-orange-600" asChild>
              <Link href="/upgrade">Unlock</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Views List */}
      <div className="mt-4 divide-y divide-border">
        {mockViews.map((view) => (
          <div key={view.id} className="flex items-center gap-4 px-4 py-4">
            <div className="relative">
              <div className={`relative h-14 w-14 overflow-hidden rounded-full ${view.isBlurred ? 'blur-sm' : ''}`}>
                <Image
                  src={view.photo}
                  alt={view.name}
                  fill
                  className="object-cover"
                />
              </div>
              {view.isBlurred && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${view.isBlurred ? 'text-muted-foreground' : 'text-foreground'}`}>
                {view.name}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                <span>Viewed {view.time}</span>
              </div>
            </div>
            {!view.isBlurred && (
              <Link href={`/profile/${view.id}`}>
                <Button variant="outline" size="sm" className="rounded-full">
                  View
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
