import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

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
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
