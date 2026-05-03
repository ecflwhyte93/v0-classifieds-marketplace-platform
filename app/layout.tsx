import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'ALLURE - Meet. Connect. Ignite.',
  description: 'Premium classifieds marketplace for dating, companionship, and connections. Find verified profiles in your city.',
  keywords: ['dating', 'classifieds', 'personals', 'connections', 'meet people'],
  authors: [{ name: 'ALLURE' }],
  openGraph: {
    title: 'ALLURE - Meet. Connect. Ignite.',
    description: 'Premium classifieds marketplace for dating, companionship, and connections.',
    type: 'website',
    siteName: 'ALLURE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALLURE - Meet. Connect. Ignite.',
    description: 'Premium classifieds marketplace for dating, companionship, and connections.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
