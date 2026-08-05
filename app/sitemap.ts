import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { absoluteUrl, languageAlternates } from '@/lib/seo'

const indexablePaths = [
  '', 'solutions', 'assembly-centre', 'projects', 'compliance', 'buyer-resources',
  'project-brief-guide', 'landed-cost-guide', 'delivery-timeline-guide',
  'document-checklist', 'suppliers', 'about', 'contact',
] as const

const highPriority = new Set(['', 'solutions', 'assembly-centre', 'projects', 'compliance', 'about', 'contact'])

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, slug || undefined),
      changeFrequency: slug === 'buyer-resources' ? 'weekly' : 'monthly',
      priority: !slug ? 1 : highPriority.has(slug) ? 0.85 : 0.72,
      alternates: { languages: languageAlternates(slug || undefined) },
    })),
  )
}
