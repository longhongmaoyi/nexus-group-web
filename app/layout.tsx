import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/app/globals.css'
import { SiteStructuredData } from '@/components/site-structured-data'
import { DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'

const defaultDescription =
  'NEXUS helps clients define modular project needs, compare globally sourced systems and coordinate the work required for responsible delivery in Canada.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'NEXUS LIFE GROUP | Modular Projects from Source to Site',
    template: '%s | NEXUS LIFE GROUP',
  },
  description: defaultDescription,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: 'NEXUS LIFE GROUP | Modular Projects from Source to Site',
    description: defaultDescription,
    images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: 'NEXUS modular project concept' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS LIFE GROUP | Modular Projects from Source to Site',
    description: defaultDescription,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteStructuredData />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
