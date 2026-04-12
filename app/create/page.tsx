'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, X, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { BottomNav } from '@/components/bottom-nav'
import { cn } from '@/lib/utils'

const categories = ['Dating', 'Companionship', 'Hookups', 'Friendship']

export default function CreateAdPage() {
  const [formData, setFormData] = useState({
    displayName: '',
    age: '',
    location: '',
    category: '',
    headline: '',
    bio: '',
    tags: '',
  })
  const [photos, setPhotos] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Ad created successfully! (Demo mode)')
  }

  const handlePhotoUpload = () => {
    // Simulated photo upload
    const demoPhotos = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop',
    ]
    if (photos.length < 4) {
      setPhotos([...photos, demoPhotos[photos.length % 2]])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-background/95 px-4 py-4 backdrop-blur-sm">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-foreground">Create Ad</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-4">
        {/* Photos Section */}
        <div>
          <Label className="text-base font-semibold">Photos</Label>
          <p className="mt-1 text-sm text-muted-foreground">Add up to 4 photos</p>
          
          <div className="mt-3 grid grid-cols-4 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                <img src={photo} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {photos.length < 4 && (
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border bg-secondary/50 transition-colors hover:border-primary hover:bg-secondary"
              >
                <Camera className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="Your name or alias"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="mt-2 h-12"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="21"
                min={18}
                max={99}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="mt-2 h-12"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2 h-12"
                required
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <Label className="text-base font-semibold">Category</Label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFormData({ ...formData, category })}
                className={cn(
                  "rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors",
                  formData.category === category
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary text-secondary-foreground hover:border-muted-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Headline */}
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            placeholder="Catchy headline for your ad"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="mt-2 h-12"
            maxLength={100}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {formData.headline.length}/100 characters
          </p>
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio">About You</Label>
          <Textarea
            id="bio"
            placeholder="Tell people about yourself..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-2 min-h-[120px] resize-none"
            maxLength={500}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {formData.bio.length}/500 characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Interests / Tags</Label>
          <Input
            id="tags"
            placeholder="Travel, Music, Fitness (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="mt-2 h-12"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" className="h-14 w-full rounded-xl text-base font-semibold">
            Create Ad
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            By creating an ad, you agree to our Terms of Service and Community Guidelines
          </p>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}
