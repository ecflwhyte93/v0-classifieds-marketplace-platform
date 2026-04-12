'use client'

import { useState } from 'react'
import { MapPin, Search, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface LocationDialogProps {
  open: boolean
  onClose: () => void
  selectedLocation: string
  onLocationChange: (location: string) => void
}

const popularCities = [
  'All Cities',
  'New York, NY',
  'Los Angeles, CA',
  'Miami, FL',
  'Chicago, IL',
  'Austin, TX',
  'Seattle, WA',
  'San Francisco, CA',
  'Las Vegas, NV',
  'Atlanta, GA',
  'Denver, CO',
]

export function LocationDialog({ open, onClose, selectedLocation, onLocationChange }: LocationDialogProps) {
  const [searchQuery, setSearchQuery] = useState('')

  if (!open) return null

  const filteredCities = popularCities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (city: string) => {
    onLocationChange(city)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative z-50 w-full max-w-md rounded-t-2xl bg-card p-6 shadow-xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Select Location</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cities..."
            className="pl-10"
          />
        </div>

        {/* Cities List */}
        <div className="mt-4 max-h-64 space-y-1 overflow-y-auto">
          {filteredCities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition-colors",
                selectedLocation === city
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-secondary"
              )}
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{city}</span>
              </div>
              {selectedLocation === city && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No cities found
          </p>
        )}
      </div>
    </div>
  )
}
