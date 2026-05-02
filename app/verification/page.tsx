'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Camera, CreditCard, CheckCircle, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const verificationSteps = [
  {
    id: 'photo',
    title: 'Photo Verification',
    description: 'Take a selfie to verify your identity',
    icon: Camera,
    status: 'completed' as const,
  },
  {
    id: 'id',
    title: 'ID Verification',
    description: 'Upload a government-issued ID',
    icon: CreditCard,
    status: 'completed' as const,
  },
  {
    id: 'phone',
    title: 'Phone Verification',
    description: 'Verify your phone number',
    icon: Shield,
    status: 'pending' as const,
  },
]

export default function VerificationPage() {
  const [isUploading, setIsUploading] = useState(false)
  const completedSteps = verificationSteps.filter(s => s.status === 'completed').length

  const handleVerifyPhone = async () => {
    setIsUploading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    alert('Verification code sent to your phone!')
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
          <h1 className="text-xl font-bold text-foreground">Verification</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-lg font-semibold text-foreground">
          {completedSteps === verificationSteps.length ? 'Fully Verified' : 'Verification Status'}
        </h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {completedSteps}/{verificationSteps.length} steps completed
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {verificationSteps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "h-2 w-12 rounded-full",
                step.status === 'completed' ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mx-4 rounded-xl bg-card p-4">
        <h3 className="font-semibold text-foreground">Why verify?</h3>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>Get a verified badge on your profile</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>Build trust with other members</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>Get more profile views and messages</span>
          </li>
        </ul>
      </div>

      {/* Steps */}
      <div className="mt-6 space-y-3 px-4">
        {verificationSteps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "rounded-xl border p-4",
              step.status === 'completed' 
                ? "border-primary/30 bg-primary/5" 
                : "border-border bg-card"
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                step.status === 'completed' ? "bg-primary/20" : "bg-secondary"
              )}>
                {step.status === 'completed' ? (
                  <CheckCircle className="h-6 w-6 text-primary" />
                ) : (
                  <step.icon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{step.title}</h4>
                  {step.status === 'completed' && (
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                {step.status === 'pending' && (
                  <Button 
                    className="mt-3" 
                    size="sm"
                    onClick={handleVerifyPhone}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Start Verification
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
