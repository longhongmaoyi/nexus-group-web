import type { MetadataRoute } from 'next'

import { sectionSlugs } from '@/lib/content'
import { locales } from '@/lib/i18n'
import { absoluteUrl, languageAlternates } from '@/lib/seo'

const highPriority = new Set([
  'about',
  'assembly-centre',
  'compliance-centre',
  'products',
  'industries',
  'projects',
  'contact',
])

const resourcePages = new Set([
  'buyer-resources',
  'technology-services',
  'workforce-camps',
  'commercial-kiosks',
  'multi-unit-builds',
  'oil-gas-energy',
  'indigenous-community-projects',
  'book-a-call',
  'supplier-application',
  'partner-application',
  'project-brief-guide',
  'landed-cost-guide',
  'delivery-timeline-guide',
  'document-checklist',
])

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...sectionSlugs]

  return paths.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, slug || undefined),
      changeFrequency: slug === 'news' ? 'weekly' : 'monthly',
      priority: !slug ? 1 : highPriority.has(slug) ? 0.85 : resourcePages.has(slug) ? 0.75 : 0.65,
      alternates: {
        languages: languageAlternates(slug || undefined),
      },
    })),
  )
}
