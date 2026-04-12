'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { ProfileCard } from '@/components/profile-card'
import { BottomNav } from '@/components/bottom-nav'
import { mockProfiles } from '@/lib/mock-data'
import type { Category } from '@/lib/types'
import type { FilterState } from '@/components/filters-panel'

const defaultFilters: FilterState = {
  ageRange: [18, 50],
  distance: 50,
  verifiedOnly: false,
  onlineOnly: false,
  hasPhotos: true,
  sortBy: 'newest',
}

export function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All Cities')
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockProfiles.filter(p => p.isFavorite).map(p => p.id))
  )

  const filteredProfiles = useMemo(() => {
    let profiles = mockProfiles.filter(profile => {
      // Category filter
      if (selectedCategory !== 'All' && profile.category !== selectedCategory) {
        return false
      }

      // Location filter
      if (selectedLocation !== 'All Cities') {
        if (!profile.location.includes(selectedLocation.split(',')[0])) {
          return false
        }
      }

      // Age filter
      if (profile.age < filters.ageRange[0] || profile.age > filters.ageRange[1]) {
        return false
      }

      // Verified filter
      if (filters.verifiedOnly && !profile.isVerified) {
        return false
      }

      // Online filter
      if (filters.onlineOnly && !profile.isOnline) {
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

    // Sort profiles
    switch (filters.sortBy) {
      case 'rating':
        profiles = profiles.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        profiles = profiles.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      default:
        break
    }

    return profiles
  }, [selectedCategory, searchQuery, selectedLocation, filters])

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
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <main className="px-4">
        {/* Results Count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {filteredProfiles.length} ads available
          {selectedLocation !== 'All Cities' && ` in ${selectedLocation.split(',')[0]}`}
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
