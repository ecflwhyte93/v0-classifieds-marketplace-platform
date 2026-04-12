'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProfileCard } from '@/components/profile-card'
import { BottomNav } from '@/components/bottom-nav'
import { mockProfiles } from '@/lib/mock-data'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockProfiles.filter(p => p.isFavorite).map(p => p.id))
  )

  const favoriteProfiles = mockProfiles
    .filter(p => favorites.has(p.id))
    .map(p => ({ ...p, isFavorite: true }))

  const handleFavoriteToggle = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

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
            <h1 className="text-xl font-bold text-foreground">My Favorites</h1>
            <p className="text-sm text-muted-foreground">{favoriteProfiles.length} saved</p>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <main className="px-4">
        {favoriteProfiles.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {favoriteProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-foreground">No favorites yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tap the heart icon on profiles to save them here
            </p>
            <Link href="/">
              <Button className="mt-4 rounded-full" variant="outline">
                Explore Profiles
              </Button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
