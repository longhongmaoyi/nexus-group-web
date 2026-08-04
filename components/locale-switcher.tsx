'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'

import { localeName, locales, type Locale } from '@/lib/i18n'

export function LocaleSwitcher({
  locale,
  dark = false,
  compact = false,
}: {
  locale: Locale
  dark?: boolean
  compact?: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()

  function changeLocale(nextLocale: Locale) {
    const segments = pathname.split('/')
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = nextLocale
      router.push(segments.join('/') || `/${nextLocale}`)
      return
    }
    router.push(`/${nextLocale}`)
  }

  const compactClass = dark
    ? 'border-white/35 bg-black/10 text-white'
    : 'border-slate-200 bg-white text-slate-700'

  return (
    <label
      className={compact
        ? `relative inline-grid h-10 w-10 shrink-0 place-items-center border ${compactClass}`
        : `inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold ${dark ? 'border-white/25 text-white' : 'border-slate-200 text-slate-700'}`}
      title="Language"
    >
      <Languages className={compact ? 'h-4.5 w-4.5' : 'h-4 w-4'} aria-hidden="true" />
      <span className="sr-only">Language: {localeName(locale)}</span>
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        className={compact
          ? 'absolute inset-0 h-full w-full cursor-pointer opacity-0'
          : 'cursor-pointer bg-transparent outline-none'}
        aria-label="Select language"
      >
        {locales.map((item) => (
          <option key={item} value={item} className="text-ink">
            {localeName(item)}
          </option>
        ))}
      </select>
    </label>
  )
}
