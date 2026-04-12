export interface Profile {
  id: string
  name: string
  age: number
  location: string
  category: 'Dating' | 'Companionship' | 'Hookups' | 'Friendship'
  photos: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isOnline: boolean
  isFeatured: boolean
  isFavorite: boolean
  bio?: string
  tags?: string[]
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  isRead: boolean
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantPhoto: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
}

export interface User {
  id: string
  email: string
  username: string
  fullName: string
  role: 'user' | 'admin'
  isVip: boolean
  createdAt: string
}

export type Category = 'All' | 'Dating' | 'Companionship' | 'Hookups' | 'Friendship'
