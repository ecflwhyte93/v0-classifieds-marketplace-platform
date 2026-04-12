'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, MapPin, BadgeCheck, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Profile } from '@/lib/types'

interface ProfileCardProps {
  profile: Profile
  onFavoriteToggle?: (id: string) => void
}

export function ProfileCard({ profile, onFavoriteToggle }: ProfileCardProps) {
  const [isFavorite, setIsFavorite] = useState(profile.isFavorite)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    onFavoriteToggle?.(profile.id)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Dating':
        return 'bg-primary/20 text-primary border-primary/30'
      case 'Companionship':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'Hookups':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Friendship':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Link href={`/profile/${profile.id}`}>
      <div className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <Image
            src={profile.photos[0]}
            alt={profile.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Featured Badge */}
          {profile.isFeatured && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
              <Sparkles className="h-3 w-3" />
              FEATURED
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={cn(
              "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
              isFavorite 
                ? "bg-primary text-primary-foreground" 
                : "bg-background/80 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
          </button>

          {/* Online Indicator */}
          {profile.isOnline && (
            <div className="absolute top-3 right-14 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Name & Verification */}
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {profile.name}, {profile.age}
            </h3>
            {profile.isVerified && (
              <BadgeCheck className="h-4 w-4 text-primary" />
            )}
          </div>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(profile.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({profile.reviewCount})
            </span>
          </div>

          {/* Location & Category */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="truncate max-w-[80px]">{profile.location}</span>
            </div>
            <span className={cn(
              "rounded-full border px-2 py-0.5 text-xs font-medium",
              getCategoryColor(profile.category)
            )}>
              {profile.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
