'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Bell, 
  Lock, 
  Eye, 
  Moon, 
  Globe, 
  Shield, 
  Trash2,
  ChevronRight,
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    messageNotifications: true,
    showOnlineStatus: true,
    showLastSeen: true,
    darkMode: true,
    language: 'English',
    twoFactorAuth: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
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
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mt-4">
        <h2 className="px-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Notifications
        </h2>
        <div className="mt-2 divide-y divide-border bg-card">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
            </div>
            <Switch 
              checked={settings.pushNotifications}
              onCheckedChange={() => toggleSetting('pushNotifications')}
            />
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Message Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified for new messages</p>
              </div>
            </div>
            <Switch 
              checked={settings.messageNotifications}
              onCheckedChange={() => toggleSetting('messageNotifications')}
            />
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="mt-6">
        <h2 className="px-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Privacy
        </h2>
        <div className="mt-2 divide-y divide-border bg-card">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Eye className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Show Online Status</p>
                <p className="text-sm text-muted-foreground">Let others see when you&apos;re online</p>
              </div>
            </div>
            <Switch 
              checked={settings.showOnlineStatus}
              onCheckedChange={() => toggleSetting('showOnlineStatus')}
            />
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Show Last Seen</p>
                <p className="text-sm text-muted-foreground">Show when you were last active</p>
              </div>
            </div>
            <Switch 
              checked={settings.showLastSeen}
              onCheckedChange={() => toggleSetting('showLastSeen')}
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="mt-6">
        <h2 className="px-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Security
        </h2>
        <div className="mt-2 divide-y divide-border bg-card">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Two-Factor Auth</p>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
            </div>
            <Switch 
              checked={settings.twoFactorAuth}
              onCheckedChange={() => toggleSetting('twoFactorAuth')}
            />
          </div>
          <Link href="/settings/password" className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your password</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="mt-6">
        <h2 className="px-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Appearance
        </h2>
        <div className="mt-2 divide-y divide-border bg-card">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Moon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
            </div>
            <Switch 
              checked={settings.darkMode}
              onCheckedChange={() => toggleSetting('darkMode')}
            />
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Language</p>
                <p className="text-sm text-muted-foreground">{settings.language}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6">
        <h2 className="px-4 text-sm font-semibold uppercase tracking-wider text-destructive">
          Danger Zone
        </h2>
        <div className="mt-2 bg-card">
          <button className="flex w-full items-center gap-3 px-4 py-4 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-destructive">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
