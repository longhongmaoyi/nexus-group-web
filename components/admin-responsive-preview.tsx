'use client'

import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { useState } from 'react'
import { locales, localeName, type Locale } from '@/lib/i18n'

const devices = [
  { key: 'desktop', label: 'Desktop', width: 1440, icon: Monitor },
  { key: 'tablet', label: 'Tablet', width: 820, icon: Tablet },
  { key: 'mobile', label: 'Mobile', width: 390, icon: Smartphone },
] as const

export function AdminResponsivePreview({ slug }: { slug: string }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [device, setDevice] = useState<(typeof devices)[number]['key']>('desktop')
  const selected = devices.find((item) => item.key === device) || devices[0]

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-20 flex flex-col gap-3 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Private multilingual draft preview</p>
          <h1 className="mt-1 font-bold">{slug}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-full border border-white/15 p-1">
            {locales.map((item) => (
              <button key={item} onClick={() => setLocale(item)} className={`rounded-full px-3 py-2 text-xs font-bold ${locale === item ? 'bg-white text-slate-950' : 'text-white/70'}`}>
                {localeName(item)}
              </button>
            ))}
          </div>
          <div className="flex rounded-full border border-white/15 p-1">
            {devices.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.key} onClick={() => setDevice(item.key)} aria-label={item.label} className={`grid h-9 w-9 place-items-center rounded-full ${device === item.key ? 'bg-white text-slate-950' : 'text-white/70'}`}>
                  <Icon className="h-4 w-4" />
                </button>
              )
            })}
          </div>
        </div>
      </header>
      <div className="overflow-auto px-3 py-6">
        <div className="mx-auto overflow-hidden rounded-2xl bg-white shadow-2xl transition-[width] duration-300" style={{ width: `min(100%, ${selected.width}px)` }}>
          <iframe
            key={`${locale}-${device}`}
            title={`${localeName(locale)} ${selected.label} draft preview`}
            src={`/admin/preview/${locale}/${slug}`}
            className="h-[calc(100vh-9rem)] w-full bg-white"
          />
        </div>
      </div>
    </main>
  )
}
