'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, MessageCircle, FileText, Shield, CreditCard, HelpCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const faqCategories = [
  { icon: MessageCircle, label: 'Messaging', count: 8 },
  { icon: Shield, label: 'Safety & Privacy', count: 12 },
  { icon: CreditCard, label: 'Billing & VIP', count: 6 },
  { icon: FileText, label: 'Account & Profile', count: 10 },
]

const popularFaqs = [
  { q: 'How do I verify my profile?', link: '/support/verify' },
  { q: 'How do I cancel my VIP subscription?', link: '/support/cancel-vip' },
  { q: 'How do I report a user?', link: '/support/report' },
  { q: 'Why was my account suspended?', link: '/support/suspended' },
]

export default function SupportPage() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return
    setIsSending(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSending(false)
    setMessage('')
    setShowContactForm(false)
    alert('Message sent! We\'ll get back to you within 24 hours.')
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <HelpCircle className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="h-12 pl-11"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Browse Topics
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {faqCategories.map((cat) => (
            <button
              key={cat.label}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 text-center transition-colors hover:bg-secondary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <cat.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-foreground">{cat.label}</span>
              <span className="text-xs text-muted-foreground">{cat.count} articles</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular FAQs */}
      <div className="mt-6 px-4">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Popular Questions
        </h2>
        <div className="divide-y divide-border rounded-xl bg-card">
          {popularFaqs.map((faq) => (
            <button
              key={faq.q}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/50"
            >
              <span className="font-medium text-foreground">{faq.q}</span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-6 px-4">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Still Need Help?
        </h2>
        {showContactForm ? (
          <div className="rounded-xl bg-card p-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue..."
              className="min-h-32"
            />
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowContactForm(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={handleSendMessage}
                disabled={isSending || !message.trim()}
              >
                {isSending ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowContactForm(true)}
            className="flex w-full items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Contact Support</p>
              <p className="text-sm text-muted-foreground">We&apos;ll respond within 24 hours</p>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
