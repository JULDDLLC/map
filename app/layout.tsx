import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Where\'s Panda? - Interactive USA Map Adventure',
  description: 'Join Panda on an epic journey across the United States! Pin your city, earn digital rewards, and help Panda explore every state. A fun, safe, interactive map experience for kids and families.',
  keywords: 'interactive map, kids activities, USA map, educational games, family fun, digital rewards, geography, states',
  authors: [{ name: 'JULDD Media' }],
  creator: 'JULDD Media',
  publisher: 'JULDD LLC',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Where\'s Panda? - Interactive USA Map Adventure',
    description: 'Join Panda on an epic journey across the United States! Pin your city, earn digital rewards, and help Panda explore every state.',
    url: 'https://map.julddmedia.com',
    siteName: 'Where\'s Panda?',
    images: [
      {
        url: 'https://map.julddmedia.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Where\'s Panda? Interactive Map',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where\'s Panda? - Interactive USA Map Adventure',
    description: 'Join Panda on an epic journey across the United States! Pin your city and earn digital rewards.',
    images: ['https://map.julddmedia.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Where\'s Panda?',
  description: 'Interactive USA map adventure for kids and families',
  url: 'https://map.julddmedia.com',
  applicationCategory: 'Educational',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'JULDD Media',
    url: 'https://julddmedia.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'JULDD LLC',
    url: 'https://julddmedia.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}