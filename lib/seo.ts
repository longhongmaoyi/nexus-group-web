import type { Metadata } from 'next'

import { locales, type Locale } from '@/lib/i18n'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nexuslife.ca').replace(/\/+$/, '')
export const SITE_NAME = 'NEXUS LIFE GROUP'
export const DEFAULT_SOCIAL_IMAGE = '/images/nexus-lakeside-community-hero-v1.jpg'

export const languageTags: Record<Locale, string> = {
  en: 'en-CA',
  zh: 'zh-CN',
  fr: 'fr-CA',
}

export const openGraphLocales: Record<Locale, string> = {
  en: 'en_CA',
  zh: 'zh_CN',
  fr: 'fr_CA',
}

export function localePath(locale: Locale, slug?: string) {
  return `/${locale}${slug ? `/${slug}` : ''}`
}

export function absoluteUrl(locale: Locale, slug?: string) {
  return `${SITE_URL}${localePath(locale, slug)}`
}

export function languageAlternates(slug?: string) {
  const languages: Record<string, string> = {}

  for (const locale of locales) {
    languages[languageTags[locale]] = absoluteUrl(locale, slug)
  }

  languages['x-default'] = absoluteUrl('en', slug)
  return languages
}

export function compactDescription(value: string, maximum = 165) {
  const clean = value.replace(/\s+/g, ' ').trim()
  if (clean.length <= maximum) return clean

  const shortened = clean.slice(0, maximum - 1)
  const lastBoundary = Math.max(shortened.lastIndexOf('. '), shortened.lastIndexOf(' '))

  return `${shortened.slice(0, lastBoundary > 90 ? lastBoundary : maximum - 1).trim()}…`
}

export function buildPageMetadata({
  locale,
  slug,
  title,
  description,
  image = DEFAULT_SOCIAL_IMAGE,
}: {
  locale: Locale
  slug?: string
  title: string
  description: string
  image?: string
}): Metadata {
  const canonical = absoluteUrl(locale, slug)
  const conciseDescription = compactDescription(description)

  return {
    title,
    description: conciseDescription,
    alternates: {
      canonical,
      languages: languageAlternates(slug),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description: conciseDescription,
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => openGraphLocales[item]),
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: conciseDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}
