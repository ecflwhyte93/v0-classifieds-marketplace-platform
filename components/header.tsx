'use client'

import { useState } from 'react'
import { SlidersHorizontal, Bell, MapPin, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'

interface HeaderProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const categories: Category[] = ['All', 'Dating', 'Companionship', 'Hookups', 'Friendship']

export function Header({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}: HeaderProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
      <div className="px-4 py-4">
        {/* Top Row: Logo & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-foreground">
              ALLURE
            </h1>
            <p className="text-xs tracking-wide text-muted-foreground">
              Meet. Connect. Ignite.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-border"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Filters"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="relative h-10 w-10 rounded-full border-border"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
            </Button>
            <Button
              variant="outline"
              className="flex h-10 items-center gap-2 rounded-full border-border px-4"
              aria-label="Select location"
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">All Cities</span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, city, or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 rounded-xl border-border bg-secondary pl-11 pr-10 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
