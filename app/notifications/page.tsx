'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, MessageCircle, Star, Eye, Crown, Trash2, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  type: 'like' | 'message' | 'review' | 'view' | 'vip' | 'system'
  title: string
  body: string
  photo?: string
  time: string
  isRead: boolean
  link?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Sophia',
    body: 'Looking forward to meeting you!',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    time: '2 min ago',
    isRead: false,
    link: '/messages',
  },
  {
    id: '2',
    type: 'like',
    title: 'Valentina favorited your profile',
    body: 'Check out their profile',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    time: '1 hour ago',
    isRead: false,
    link: '/profile/2',
  },
  {
    id: '3',
    type: 'view',
    title: 'New profile view',
    body: 'Someone viewed your profile',
    time: '3 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'review',
    title: 'New 5-star review',
    body: 'Jade left you a positive review',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    time: 'Yesterday',
    isRead: true,
    link: '/reviews',
  },
  {
    id: '5',
    type: 'vip',
    title: 'VIP Sale: 50% Off',
    body: 'Upgrade now and get featured placement',
    time: '2 days ago',
    isRead: true,
    link: '/upgrade',
  },
  {
    id: '6',
    type: 'system',
    title: 'Profile verified',
    body: 'Your identity has been verified successfully',
    time: '1 week ago',
    isRead: true,
  },
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return <Heart className="h-5 w-5 text-primary" />
    case 'message':
      return <MessageCircle className="h-5 w-5 text-blue-500" />
    case 'review':
      return <Star className="h-5 w-5 text-amber-400" />
    case 'view':
      return <Eye className="h-5 w-5 text-green-500" />
    case 'vip':
      return <Crown className="h-5 w-5 text-amber-500" />
    default:
      return <CheckCheck className="h-5 w-5 text-muted-foreground" />
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-border">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "relative flex gap-3 px-4 py-4 transition-colors",
              !notification.isRead && "bg-primary/5"
            )}
            onClick={() => markAsRead(notification.id)}
          >
            {/* Icon or Photo */}
            <div className="shrink-0">
              {notification.photo ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={notification.photo}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  {getNotificationIcon(notification.type)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {notification.link ? (
                <Link href={notification.link} className="block">
                  <p className="font-medium text-foreground">{notification.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{notification.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                </Link>
              ) : (
                <>
                  <p className="font-medium text-foreground">{notification.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{notification.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                </>
              )}
            </div>

            {/* Unread indicator & Delete */}
            <div className="flex shrink-0 items-center gap-2">
              {!notification.isRead && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteNotification(notification.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <CheckCheck className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground">All caught up!</p>
          <p className="mt-1 text-sm text-muted-foreground">No new notifications</p>
        </div>
      )}
    </div>
  )
}
