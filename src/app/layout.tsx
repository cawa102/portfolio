import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SITE_CONFIG } from '@/lib/constants'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: ['AI agent', 'security engineer', 'portfolio', 'penetration testing', 'Claude Code', 'cybersecurity'],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  openGraph: {
    title: SITE_CONFIG.title,
    description: "CyberSecurity Master's student building AI-powered security tools.",
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: "CyberSecurity Master's student building AI-powered security tools.",
    images: ['/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_CONFIG.fullName,
  alternateName: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  sameAs: [
    'https://github.com/cawa102',
    'https://www.linkedin.com/in/kyosuke-kawai-68919b389',
    'https://medium.com/@ccawa102',
  ],
  jobTitle: "CyberSecurity Master's Student",
  knowsAbout: ['AI Agent Development', 'Penetration Testing', 'Full-Stack Development'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-cyan focus:px-4 focus:py-2 focus:text-bg-primary focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
