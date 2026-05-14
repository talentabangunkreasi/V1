import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'PT Talenta Bangun Kreasi | Furnitur & Konstruksi Modern',
  description: 'PT Talenta Bangun Kreasi - Perusahaan furnitur dan konstruksi terdepan dengan desain modern dan kualitas premium. Custom furniture, interior design, dan konstruksi rumah impian Anda.',
  keywords: ['furnitur', 'konstruksi', 'custom furniture', 'interior design', 'rumah modern', 'PT Talenta Bangun Kreasi'],
  authors: [{ name: 'PT Talenta Bangun Kreasi' }],
  creator: 'PT Talenta Bangun Kreasi',
  publisher: 'PT Talenta Bangun Kreasi',
  openGraph: {
    title: 'PT Talenta Bangun Kreasi | Furnitur & Konstruksi Modern',
    description: 'Perusahaan furnitur dan konstruksi terdepan dengan desain modern dan kualitas premium.',
    type: 'website',
    locale: 'id_ID',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f4ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a1a' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
