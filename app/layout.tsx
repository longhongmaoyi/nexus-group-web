import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'NEXUS GROUP | Modular Living Infrastructure',
    template: '%s | NEXUS GROUP',
  },
  description: 'Integrated modular living, hospitality, commercial and industrial solutions with Canadian assembly.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
