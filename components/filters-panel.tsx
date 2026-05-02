'use client'

import { useState } from 'react'
import { X, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export interface FilterState {
  ageRange: [number, number]
  distance: number
  verifiedOnly: boolean
  onlineOnly: boolean
  hasPhotos: boolean
  sortBy: 'newest' | 'rating' | 'distance'
}

interface FiltersPanelProps {
  open: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const defaultFilters: FilterState = {
  ageRange: [18, 50],
  distance: 50,
  verifiedOnly: false,
  onlineOnly: false,
  hasPhotos: true,
  sortBy: 'newest',
}

export function FiltersPanel({ open, onClose, filters, onFiltersChange }: FiltersPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  if (!open) return null

  const handleApply = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    setLocalFilters(defaultFilters)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative z-50 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-card p-6 shadow-xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1 text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Age Range */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className="font-medium text-foreground">Age Range</label>
            <span className="text-sm text-muted-foreground">
              {localFilters.ageRange[0]} - {localFilters.ageRange[1]}
            </span>
          </div>
          <div className="mt-4 px-1">
            <Slider
              value={localFilters.ageRange}
              onValueChange={(value) => setLocalFilters(prev => ({ ...prev, ageRange: value as [number, number] }))}
              min={18}
              max={65}
              step={1}
            />
          </div>
        </div>

        {/* Distance */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className="font-medium text-foreground">Distance</label>
            <span className="text-sm text-muted-foreground">
              {localFilters.distance === 100 ? 'Unlimited' : `${localFilters.distance} miles`}
            </span>
          </div>
          <div className="mt-4 px-1">
            <Slider
              value={[localFilters.distance]}
              onValueChange={(value) => setLocalFilters(prev => ({ ...prev, distance: value[0] }))}
              min={5}
              max={100}
              step={5}
            />
          </div>
        </div>

        {/* Toggle Filters */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Verified Only</p>
              <p className="text-sm text-muted-foreground">Show only verified profiles</p>
            </div>
            <Switch
              checked={localFilters.verifiedOnly}
              onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, verifiedOnly: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Online Now</p>
              <p className="text-sm text-muted-foreground">Show only online users</p>
            </div>
            <Switch
              checked={localFilters.onlineOnly}
              onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, onlineOnly: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Has Photos</p>
              <p className="text-sm text-muted-foreground">Must have at least one photo</p>
            </div>
            <Switch
              checked={localFilters.hasPhotos}
              onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, hasPhotos: checked }))}
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="mt-6">
          <label className="font-medium text-foreground">Sort By</label>
          <div className="mt-3 flex gap-2">
            {[
              { value: 'newest', label: 'Newest' },
              { value: 'rating', label: 'Top Rated' },
              { value: 'distance', label: 'Nearest' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setLocalFilters(prev => ({ ...prev, sortBy: option.value as FilterState['sortBy'] }))}
                className={cn(
                  "flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors",
                  localFilters.sortBy === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-8">
          <Button className="h-12 w-full rounded-xl" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
