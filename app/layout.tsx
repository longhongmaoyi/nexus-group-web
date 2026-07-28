import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'NEXUS LIFE GROUP | Building Spaces. Creating Life.',
    template: '%s | NEXUS LIFE GROUP',
  },
  description: 'Thoughtfully designed modular spaces for living, working, travelling and building stronger communities.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
