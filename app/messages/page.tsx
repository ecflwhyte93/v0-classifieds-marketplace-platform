'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Search, MoreVertical, Send, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockConversations } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const filteredConversations = mockConversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedConversation = selectedChat 
    ? mockConversations.find(c => c.id === selectedChat)
    : null

  if (selectedChat && selectedConversation) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        {/* Chat Header */}
        <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => setSelectedChat(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative h-10 w-10">
            <Image
              src={selectedConversation.participantPhoto}
              alt={selectedConversation.participantName}
              fill
              className="rounded-full object-cover"
            />
            {selectedConversation.isOnline && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">{selectedConversation.participantName}</h2>
            <p className="text-xs text-muted-foreground">
              {selectedConversation.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 space-y-4 p-4">
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
              <p className="text-sm text-secondary-foreground">
                Hey! Thanks for reaching out. How are you?
              </p>
              <span className="mt-1 block text-xs text-muted-foreground">10:30 AM</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3">
              <p className="text-sm text-primary-foreground">
                {"Hi! I'm doing great, thanks for asking. I saw your profile and thought we might have some things in common."}
              </p>
              <span className="mt-1 block text-xs text-primary-foreground/70">10:32 AM</span>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
              <p className="text-sm text-secondary-foreground">
                {selectedConversation.lastMessage}
              </p>
              <span className="mt-1 block text-xs text-muted-foreground">{selectedConversation.lastMessageTime}</span>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="sticky bottom-0 border-t border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="h-12 flex-1 rounded-full bg-secondary px-5"
            />
            <Button 
              className="h-12 w-12 rounded-full"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        </div>
        
        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-xl bg-secondary pl-11"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="divide-y divide-border">
        {filteredConversations.length > 0 ? (
          filteredConversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary/50"
            >
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={conversation.participantPhoto}
                  alt={conversation.participantName}
                  fill
                  className="rounded-full object-cover"
                />
                {conversation.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{conversation.participantName}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                </div>
                <p className={cn(
                  "mt-0.5 truncate text-sm",
                  conversation.unreadCount > 0 
                    ? "font-medium text-foreground" 
                    : "text-muted-foreground"
                )}>
                  {conversation.lastMessage}
                </p>
              </div>
              
              {conversation.unreadCount > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {conversation.unreadCount}
                </span>
              )}
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-foreground">No conversations</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Start a conversation by messaging someone
            </p>
            <Link href="/">
              <Button className="mt-4">Browse Profiles</Button>
            </Link>
          </div>
        )}
      </div>

    </div>
  )
}
