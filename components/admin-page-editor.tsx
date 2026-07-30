'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUp, Eye, Plus, Save, Send, Trash2 } from 'lucide-react'
import { sectionTypes, type CmsItem, type CmsPageDraft, type CmsSectionContent, type CmsSectionDraft } from '@/lib/cms-types'
import { locales, localeName, type Locale, type LocalizedText } from '@/lib/i18n'

const emptyLocalized = (): LocalizedText => ({ en: '', zh: '', fr: '' })
const emptyContent = (): CmsSectionContent => ({ title: emptyLocalized(), body: emptyLocalized(), items: [] })

function updateLocalized(value: LocalizedText, locale: Locale, next: string) {
  return { ...value, [locale]: next }
}

function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: LocalizedText
  onChange: (value: LocalizedText) => void
  multiline?: boolean
}) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 p-4">
      <legend className="px-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</legend>
      <div className="grid gap-3 lg:grid-cols-3">
        {locales.map((locale) => (
          <label key={locale} className="text-xs font-bold text-slate-500">
            {localeName(locale)}
            {multiline ? (
              <textarea value={value[locale]} onChange={(event) => onChange(updateLocalized(value, locale, event.target.value))} rows={4} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal text-ink outline-none focus:border-forest" />
            ) : (
              <input value={value[locale]} onChange={(event) => onChange(updateLocalized(value, locale, event.target.value))} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal text-ink outline-none focus:border-forest" />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function AdminPageEditor({ initialPage }: { initialPage: CmsPageDraft }) {
  const [page, setPage] = useState(initialPage)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const changeSection = (index: number, next: CmsSectionDraft) => {
    setPage((current) => ({ ...current, sections: current.sections.map((section, itemIndex) => itemIndex === index ? next : section) }))
  }

  const moveSection = (index: number, delta: number) => {
    const target = index + delta
    if (target < 0 || target >= page.sections.length) return
    const sections = [...page.sections]
    ;[sections[index], sections[target]] = [sections[target], sections[index]]
    setPage({ ...page, sections: sections.map((section, position) => ({ ...section, position })) })
  }

  const removeSection = (index: number) => {
    if (page.sections.length === 1 || !window.confirm('Remove this section from the draft?')) return
    setPage({ ...page, sections: page.sections.filter((_, itemIndex) => itemIndex !== index).map((section, position) => ({ ...section, position })) })
  }

  const addSection = () => {
    const position = page.sections.length
    setPage({
      ...page,
      sections: [...page.sections, {
        key: `content-${Date.now()}`,
        type: 'CONTENT',
        position,
        enabled: true,
        content: emptyContent(),
      }],
    })
  }

  async function save(showMessage = true) {
    setBusy(true)
    setMessage('')
    const response = await fetch(`/api/admin/pages/${page.slug}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(page),
    })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) {
      setMessage(`Save failed: ${result.error || 'Unknown error'}`)
      return false
    }
    setPage(result)
    if (showMessage) setMessage('Draft saved. The public website is unchanged.')
    return true
  }

  async function publish() {
    if (!window.confirm('Publish this complete draft to the live website?')) return
    if (!(await save(false))) return
    setBusy(true)
    const response = await fetch(`/api/admin/pages/${page.slug}/publish`, { method: 'POST' })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) {
      setMessage(`Publish failed: ${result.error || 'Unknown error'}`)
      return
    }
    setPage((current) => ({ ...current, status: 'PUBLISHED', publishedAt: result.snapshot.publishedAt }))
    setMessage('Published successfully. The live page cache has been refreshed.')
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-ink sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="sticky top-0 z-30 -mx-4 flex flex-col gap-4 border-b border-slate-200 bg-slate-100/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/admin" aria-label="Back to pages" className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white"><ArrowLeft className="h-4 w-4" /></Link>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{page.slug} · {page.status}</p>
              <h1 className="text-2xl font-bold">{page.label.en}</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/admin/preview/en/${page.slug}`} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold"><Eye className="h-4 w-4" />Preview draft</Link>
            <button onClick={() => save()} disabled={busy} className="inline-flex items-center gap-2 rounded-full border border-ink bg-white px-4 py-2.5 text-sm font-bold disabled:opacity-50"><Save className="h-4 w-4" />Save draft</button>
            <button onClick={publish} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"><Send className="h-4 w-4" />Publish</button>
          </div>
        </header>

        {message && <p role="status" className={`mt-6 rounded-2xl p-4 text-sm font-semibold ${message.includes('failed') ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'}`}>{message}</p>}

        <section className="mt-7 space-y-5 rounded-3xl bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold">Page metadata</h2>
          <LocalizedField label="Admin label" value={page.label} onChange={(label) => setPage({ ...page, label })} />
          <LocalizedField label="SEO title" value={page.seoTitle} onChange={(seoTitle) => setPage({ ...page, seoTitle })} />
          <LocalizedField label="Meta description" value={page.seoDescription} multiline onChange={(seoDescription) => setPage({ ...page, seoDescription })} />
        </section>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div><h2 className="text-2xl font-bold">Approved page sections</h2><p className="mt-1 text-sm text-slate-500">Use the arrows to reorder. Styling remains controlled by the NEXUS design system.</p></div>
          <button onClick={addSection} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-bold text-white"><Plus className="h-4 w-4" />Add section</button>
        </div>

        <div className="mt-5 space-y-5">
          {page.sections.map((section, index) => (
            <SectionEditor
              key={section.key}
              section={section}
              index={index}
              count={page.sections.length}
              onChange={(next) => changeSection(index, next)}
              onMove={(delta) => moveSection(index, delta)}
              onRemove={() => removeSection(index)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function SectionEditor({
  section,
  index,
  count,
  onChange,
  onMove,
  onRemove,
}: {
  section: CmsSectionDraft
  index: number
  count: number
  onChange: (section: CmsSectionDraft) => void
  onMove: (delta: number) => void
  onRemove: () => void
}) {
  const setContent = (content: CmsSectionContent) => onChange({ ...section, content })
  const items = section.content.items || []
  const setItem = (itemIndex: number, item: CmsItem) => setContent({ ...section.content, items: items.map((current, index) => index === itemIndex ? item : current) })
  const addItem = () => setContent({ ...section.content, items: [...items, { title: emptyLocalized(), body: emptyLocalized() }] })
  const removeItem = (itemIndex: number) => setContent({ ...section.content, items: items.filter((_, index) => index !== itemIndex) })

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xs font-black">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <input aria-label="Section key" value={section.key} onChange={(event) => onChange({ ...section, key: event.target.value })} className="font-bold outline-none" />
            <div className="mt-1 flex items-center gap-3">
              <select value={section.type} onChange={(event) => onChange({ ...section, type: event.target.value as CmsSectionDraft['type'] })} className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold">
                {sectionTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" checked={section.enabled} onChange={(event) => onChange({ ...section, enabled: event.target.checked })} />Enabled</label>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <button disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move section up" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
          <button disabled={index === count - 1} onClick={() => onMove(1)} aria-label="Move section down" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
          <button onClick={onRemove} aria-label="Remove section" className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-700"><Trash2 className="h-4 w-4" /></button>
        </div>
      </header>

      <div className="mt-6 space-y-4">
        <LocalizedField label="Eyebrow (optional)" value={section.content.eyebrow || emptyLocalized()} onChange={(eyebrow) => setContent({ ...section.content, eyebrow })} />
        <LocalizedField label="Title" value={section.content.title} onChange={(title) => setContent({ ...section.content, title })} />
        <LocalizedField label="Body" value={section.content.body} multiline onChange={(body) => setContent({ ...section.content, body })} />
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-xs font-bold text-slate-500">Media reference
            <input placeholder="/images/example.jpg" value={section.content.image || ''} onChange={(event) => setContent({ ...section.content, image: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal text-ink" />
          </label>
          <label className="text-xs font-bold text-slate-500">CTA destination
            <input placeholder="/en/contact" value={section.content.ctaHref || ''} onChange={(event) => setContent({ ...section.content, ctaHref: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal text-ink" />
          </label>
        </div>
        <LocalizedField label="CTA label (optional)" value={section.content.ctaLabel || emptyLocalized()} onChange={(ctaLabel) => setContent({ ...section.content, ctaLabel })} />
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center justify-between"><h3 className="text-sm font-bold">Section items</h3><button onClick={addItem} className="inline-flex items-center gap-1 text-xs font-bold text-forest"><Plus className="h-3.5 w-3.5" />Add item</button></div>
        <div className="mt-4 space-y-4">
          {items.map((item, itemIndex) => (
            <div key={itemIndex} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex justify-end"><button onClick={() => removeItem(itemIndex)} className="text-xs font-bold text-red-700">Remove item</button></div>
              <div className="mt-2 space-y-3">
                <LocalizedField label={`Item ${itemIndex + 1} title`} value={item.title} onChange={(title) => setItem(itemIndex, { ...item, title })} />
                <LocalizedField label={`Item ${itemIndex + 1} body`} value={item.body} multiline onChange={(body) => setItem(itemIndex, { ...item, body })} />
                <div className="grid gap-3 md:grid-cols-3">
                  <input aria-label="Item image" placeholder="/images/example.jpg" value={item.image || ''} onChange={(event) => setItem(itemIndex, { ...item, image: event.target.value })} className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  <input aria-label="Item link" placeholder="/en/products" value={item.href || ''} onChange={(event) => setItem(itemIndex, { ...item, href: event.target.value })} className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  <input aria-label="Item value" placeholder="Optional value" value={item.value || ''} onChange={(event) => setItem(itemIndex, { ...item, value: event.target.value })} className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
