import type { Locale, LocalizedText } from '@/lib/i18n'

export const sectionTypes = ['HERO', 'FEATURE_GRID', 'PROCESS', 'CONTENT', 'PROJECT', 'CTA'] as const
export type CmsSectionType = (typeof sectionTypes)[number]

export type CmsItem = {
  title: LocalizedText
  body: LocalizedText
  image?: string
  href?: string
  value?: string
}

export type CmsSectionContent = {
  eyebrow?: LocalizedText
  title: LocalizedText
  body: LocalizedText
  image?: string
  ctaLabel?: LocalizedText
  ctaHref?: string
  items?: CmsItem[]
}

export type CmsSectionDraft = {
  id?: string
  key: string
  type: CmsSectionType
  position: number
  enabled: boolean
  content: CmsSectionContent
}

export type CmsPageDraft = {
  id: string
  slug: string
  pageType: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  label: LocalizedText
  seoTitle: LocalizedText
  seoDescription: LocalizedText
  sections: CmsSectionDraft[]
  publishedAt: string | null
  updatedAt: string
}

export type CmsPageSnapshot = Omit<CmsPageDraft, 'id' | 'status' | 'publishedAt' | 'updatedAt'> & {
  version: 1
  publishedAt: string
}

export function localizedCms(value: LocalizedText | undefined, locale: Locale, fallback = '') {
  return value?.[locale]?.trim() || value?.en?.trim() || fallback
}
