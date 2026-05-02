'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Crown, Check, Sparkles, Star, Eye, MessageCircle, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Plan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  isPopular?: boolean
}

const plans: Plan[] = [
  {
    id: 'weekly',
    name: 'Weekly',
    price: 9.99,
    period: 'week',
    features: [
      'Featured profile placement',
      'Unlimited messages',
      'See who viewed you',
      'Priority support',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: 29.99,
    period: 'month',
    features: [
      'Featured profile placement',
      'Unlimited messages',
      'See who viewed you',
      'Priority support',
      'Profile boost 2x/week',
      'Badge on profile',
    ],
    isPopular: true,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 199.99,
    period: 'year',
    features: [
      'Featured profile placement',
      'Unlimited messages',
      'See who viewed you',
      'Priority support',
      'Profile boost daily',
      'VIP badge on profile',
      'Early access to features',
      'Save 44%',
    ],
  },
]

const benefits = [
  {
    icon: Sparkles,
    title: 'Featured Placement',
    description: 'Your profile appears at the top of search results',
  },
  {
    icon: MessageCircle,
    title: 'Unlimited Messages',
    description: 'Connect with anyone without restrictions',
  },
  {
    icon: Eye,
    title: 'See Who Viewed You',
    description: 'Know exactly who is interested in your profile',
  },
  {
    icon: Zap,
    title: 'Profile Boosts',
    description: 'Get extra visibility when you need it most',
  },
]

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpgrade = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    alert('Upgrade successful! You are now a VIP member.')
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
          <h1 className="text-xl font-bold text-foreground">Upgrade to VIP</h1>
        </div>
      </div>

      {/* Hero */}
      <div className="px-4 py-6 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
          <Crown className="h-10 w-10 text-background" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Unlock Premium Features</h2>
        <p className="mt-2 text-muted-foreground">
          Get more matches, more visibility, and more connections
        </p>
      </div>

      {/* Benefits */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-xl bg-card p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="mt-8 px-4">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Choose Your Plan</h3>
        <div className="space-y-3">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "relative w-full rounded-xl border-2 p-4 text-left transition-all",
                selectedPlan === plan.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              {plan.isPopular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Billed {plan.period === 'week' ? 'weekly' : plan.period === 'month' ? 'monthly' : 'annually'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">${plan.price}</p>
                  <p className="text-xs text-muted-foreground">/{plan.period}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 px-4">
        <Button
          className="h-14 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-lg font-semibold text-background hover:from-amber-500 hover:to-orange-600"
          onClick={handleUpgrade}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Upgrade Now
            </span>
          )}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Cancel anytime. Secure payment.
        </p>
      </div>

      {/* Testimonials */}
      <div className="mt-8 px-4">
        <h3 className="mb-4 text-lg font-semibold text-foreground">What VIPs Say</h3>
        <div className="space-y-3">
          <div className="rounded-xl bg-card p-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-sm text-foreground">
              &ldquo;VIP totally changed my experience. I get so many more matches now!&rdquo;
            </p>
            <p className="mt-2 text-xs text-muted-foreground">- Sarah, VIP since 2024</p>
          </div>
          <div className="rounded-xl bg-card p-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-sm text-foreground">
              &ldquo;The featured placement alone is worth it. Best investment I made.&rdquo;
            </p>
            <p className="mt-2 text-xs text-muted-foreground">- Mike, VIP since 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}
