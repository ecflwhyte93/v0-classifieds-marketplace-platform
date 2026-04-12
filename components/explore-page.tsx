'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { ProfileCard } from '@/components/profile-card'
import { BottomNav } from '@/components/bottom-nav'
import { mockProfiles } from '@/lib/mock-data'
import type { Category } from '@/lib/types'

export function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockProfiles.filter(p => p.isFavorite).map(p => p.id))
  )

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      // Category filter
      if (selectedCategory !== 'All' && profile.category !== selectedCategory) {
        return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          profile.name.toLowerCase().includes(query) ||
          profile.location.toLowerCase().includes(query) ||
          profile.category.toLowerCase().includes(query) ||
          profile.tags?.some(tag => tag.toLowerCase().includes(query))
        )
      }

      return true
    })
  }, [selectedCategory, searchQuery])

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

  const profilesWithFavorites = filteredProfiles.map(profile => ({
    ...profile,
    isFavorite: favorites.has(profile.id)
  }))

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="px-4">
        {/* Results Count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {filteredProfiles.length} ads available
        </p>

        {/* Profile Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {profilesWithFavorites.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-foreground">No profiles found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
