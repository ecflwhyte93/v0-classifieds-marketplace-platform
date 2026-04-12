'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Camera, Plus, X, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    username: 'alexj',
    bio: 'Looking for genuine connections and good conversations.',
    location: 'New York, NY',
    category: 'Dating',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    ],
    tags: ['Travel', 'Music', 'Fitness'],
  })
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    alert('Profile saved successfully!')
  }

  const addTag = () => {
    if (newTag.trim() && !profile.tags.includes(newTag.trim())) {
      setProfile(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setProfile(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const removePhoto = (index: number) => {
    setProfile(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </div>

      {/* Photos Section */}
      <div className="px-4 py-4">
        <Label className="text-sm font-semibold text-foreground">Photos</Label>
        <p className="mt-1 text-xs text-muted-foreground">Add up to 6 photos</p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {profile.photos.map((photo, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {profile.photos.length < 6 && (
            <button className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 transition-colors hover:bg-secondary">
              <div className="flex flex-col items-center gap-1">
                <Camera className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4 px-4 py-4">
        <div>
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
              className="pl-7"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={profile.location}
            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
            className="mt-2"
            placeholder="City, State"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={profile.category}
            onChange={(e) => setProfile(prev => ({ ...prev, category: e.target.value }))}
            className="mt-2 flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Dating">Dating</option>
            <option value="Companionship">Companionship</option>
            <option value="Hookups">Hookups</option>
            <option value="Friendship">Friendship</option>
          </select>
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            className="mt-2 min-h-24"
            placeholder="Tell others about yourself..."
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {profile.bio.length}/500 characters
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 py-4">
        <Label>Interests & Tags</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1.5 text-sm font-medium text-primary"
            >
              {tag}
              <button onClick={() => removeTag(tag)}>
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag..."
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button variant="outline" onClick={addTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
