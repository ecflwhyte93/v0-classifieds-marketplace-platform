'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Star, MapPin, BadgeCheck, MessageCircle, Share2, Flag, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockProfiles } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default function ProfileDetailPage({ params }: ProfilePageProps) {
  const { id } = use(params)
  const profile = mockProfiles.find(p => p.id === id)

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Profile not found</h1>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    )
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
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-background/95 px-4 py-4 backdrop-blur-sm">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground">
            <Flag className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Photo */}
      <div className="relative mx-4 aspect-[3/4] overflow-hidden rounded-2xl">
        <Image
          src={profile.photos[0]}
          alt={profile.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Featured Badge */}
        {profile.isFeatured && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            FEATURED
          </div>
        )}

        {/* Online Status */}
        {profile.isOnline && (
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Online now
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pt-4">
        {/* Name & Verification */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">
            {profile.name}, {profile.age}
          </h1>
          {profile.isVerified && (
            <BadgeCheck className="h-6 w-6 text-primary" />
          )}
        </div>

        {/* Location */}
        <div className="mt-1 flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{profile.location}</span>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < Math.floor(profile.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="font-medium text-foreground">{profile.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({profile.reviewCount} reviews)</span>
        </div>

        {/* Category Badge */}
        <div className="mt-4">
          <span className={cn(
            "inline-block rounded-full border px-4 py-1.5 text-sm font-medium",
            getCategoryColor(profile.category)
          )}>
            {profile.category}
          </span>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground">About</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Tags */}
        {profile.tags && profile.tags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground">Interests</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
          <Link href={`/messages?chat=${profile.id}`} className="flex-1">
            <Button className="h-14 w-full gap-2 rounded-xl text-base font-semibold">
              <MessageCircle className="h-5 w-5" />
              Message
            </Button>
          </Link>
          <Button
            variant="outline"
            className="h-14 w-14 rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
