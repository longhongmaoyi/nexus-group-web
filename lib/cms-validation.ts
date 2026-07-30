import { sectionTypes, type CmsPageDraft, type CmsSectionContent, type CmsSectionDraft } from '@/lib/cms-types'
import { locales, type LocalizedText } from '@/lib/i18n'

const clean = (value: unknown, max = 5000) => String(value ?? '').trim().slice(0, max)

function localized(value: unknown, max: number, required = true): LocalizedText {
  const record = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const result = Object.fromEntries(locales.map((locale) => [locale, clean(record[locale], max)])) as LocalizedText
  if (required && locales.some((locale) => !result[locale])) throw new Error('English, Chinese and French fields are required.')
  return result
}

function mediaPath(value: unknown) {
  const result = clean(value, 500)
  if (!result) return undefined
  if (!result.startsWith('/images/') && !/^https:\/\/[a-z0-9.-]+\/.+/i.test(result)) {
    throw new Error('Media must use /images/... or a secure HTTPS URL.')
  }
  return result
}

function mediaId(value: unknown) {
  const result = clean(value, 80)
  if (!result) return undefined
  if (!/^c[a-z0-9]{8,}$/i.test(result)) throw new Error('Invalid media asset reference.')
  return result
}

function content(value: unknown): CmsSectionContent {
  const record = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const rawItems = Array.isArray(record.items) ? record.items.slice(0, 12) : []
  return {
    eyebrow: record.eyebrow ? localized(record.eyebrow, 120, false) : undefined,
    title: localized(record.title, 180),
    body: localized(record.body, 3000),
    image: mediaPath(record.image),
    mediaId: mediaId(record.mediaId),
    ctaLabel: record.ctaLabel ? localized(record.ctaLabel, 80, false) : undefined,
    ctaHref: clean(record.ctaHref, 300) || undefined,
    items: rawItems.map((item) => {
      const entry = item && typeof item === 'object' ? item as Record<string, unknown> : {}
      return {
        title: localized(entry.title, 160),
        body: localized(entry.body, 1000),
        image: mediaPath(entry.image),
        mediaId: mediaId(entry.mediaId),
        href: clean(entry.href, 300) || undefined,
        value: clean(entry.value, 40) || undefined,
      }
    }),
  }
}

export function validateSectionInput(value: unknown, fallbackPosition = 0): CmsSectionDraft {
  const entry = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const key = clean(entry.key, 80).toLowerCase().replace(/[^a-z0-9-]/g, '-')
  const type = clean(entry.type, 40)
  if (!key) throw new Error('Every section needs a key.')
  if (!sectionTypes.includes(type as CmsSectionDraft['type'])) throw new Error(`Unsupported section type: ${type}`)
  return {
    id: clean(entry.id, 80) || undefined,
    key,
    type: type as CmsSectionDraft['type'],
    position: Number.isInteger(entry.position) ? Number(entry.position) : fallbackPosition,
    enabled: entry.enabled !== false,
    content: content(entry.content),
  }
}

export function validatePageInput(value: unknown): Pick<CmsPageDraft, 'label' | 'seoTitle' | 'seoDescription' | 'sections'> {
  const record = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const rawSections = Array.isArray(record.sections) ? record.sections : []
  if (!rawSections.length || rawSections.length > 30) throw new Error('A page must contain between 1 and 30 sections.')
  const keys = new Set<string>()
  const sections: CmsSectionDraft[] = rawSections.map((raw, position) => {
    const section = validateSectionInput(raw, position)
    if (keys.has(section.key)) throw new Error('Every section needs a unique key.')
    keys.add(section.key)
    return { ...section, position }
  })
  return {
    label: localized(record.label, 120),
    seoTitle: localized(record.seoTitle, 180),
    seoDescription: localized(record.seoDescription, 500),
    sections,
  }
}
