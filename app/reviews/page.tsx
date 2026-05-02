'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/bottom-nav'

const mockReviews = [
  {
    id: '1',
    reviewerName: 'Michael',
    reviewerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Amazing person! Great conversation and very genuine.',
    date: '2 days ago',
  },
  {
    id: '2',
    reviewerName: 'David',
    reviewerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Highly recommend! Very friendly and easy to talk to.',
    date: '1 week ago',
  },
  {
    id: '3',
    reviewerName: 'James',
    reviewerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4,
    comment: 'Had a great time. Would definitely meet again.',
    date: '2 weeks ago',
  },
  {
    id: '4',
    reviewerName: 'Robert',
    reviewerPhoto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Exactly as described. Professional and punctual.',
    date: '3 weeks ago',
  },
]

export default function ReviewsPage() {
  const avgRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length

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
          <h1 className="text-xl font-bold text-foreground">My Reviews</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
            <div className="mt-1 flex items-center justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(avgRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on {mockReviews.length} reviews
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-border">
        {mockReviews.map((review) => (
          <div key={review.id} className="px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={review.reviewerPhoto}
                  alt={review.reviewerName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{review.reviewerName}</p>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
