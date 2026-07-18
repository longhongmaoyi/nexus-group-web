export const locales = ['en', 'zh', 'fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localeName(locale: Locale) {
  return {
    en: 'English',
    zh: '中文',
    fr: 'Français',
  }[locale]
}

export type LocalizedText = Record<Locale, string>

export function pick<T extends LocalizedText>(value: T, locale: Locale) {
  return value[locale]
}
