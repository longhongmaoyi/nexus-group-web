'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUp, Copy, Eye, GripVertical, History, ImageIcon, LayoutTemplate, Plus, Save, Send, Trash2 } from 'lucide-react'
import { sectionTypes, type CmsItem, type CmsPageDraft, type CmsSectionContent, type CmsSectionDraft } from '@/lib/cms-types'
import { locales, localeName, type Locale, type LocalizedText } from '@/lib/i18n'

const emptyLocalized = (): LocalizedText => ({ en: '', zh: '', fr: '' })
const emptyContent = (): CmsSectionContent => ({ title: emptyLocalized(), body: emptyLocalized(), items: [] })

type MediaChoice = {
  id: string
  url: string
  originalName: string
  altEn: string
}

type TemplateChoice = {
  id: string
  name: string
  description: string | null
  sectionType: CmsSectionDraft['type']
  content: CmsSectionContent
}

type Publication = {
  id: string
  version: number
  note: string | null
  sourcePublicationId: string | null
  createdAt: string
  publishedBy: { email: string } | null
}

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
  const [media, setMedia] = useState<MediaChoice[]>([])
  const [templates, setTemplates] = useState<TemplateChoice[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const loadSupportingData = useCallback(async () => {
    const [mediaResponse, templateResponse, publicationResponse] = await Promise.all([
      fetch('/api/admin/media'),
      fetch('/api/admin/templates'),
      fetch(`/api/admin/pages/${initialPage.slug}/publications`),
    ])
    if (mediaResponse.ok) setMedia((await mediaResponse.json()).assets)
    if (templateResponse.ok) setTemplates(await templateResponse.json())
    if (publicationResponse.ok) setPublications(await publicationResponse.json())
  }, [initialPage.slug])

  useEffect(() => { void loadSupportingData() }, [loadSupportingData])

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

  const moveSectionTo = (source: number, target: number) => {
    if (source === target || source < 0 || target < 0 || source >= page.sections.length || target >= page.sections.length) return
    const sections = [...page.sections]
    const [moved] = sections.splice(source, 1)
    sections.splice(target, 0, moved)
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

  const addTemplate = () => {
    const template = templates.find((item) => item.id === selectedTemplate)
    if (!template) return
    const position = page.sections.length
    setPage({
      ...page,
      sections: [...page.sections, {
        key: `${template.sectionType.toLowerCase()}-${Date.now()}`,
        type: template.sectionType,
        position,
        enabled: true,
        content: structuredClone(template.content),
      }],
    })
    setMessage(`Added “${template.name}” to the draft.`)
  }

  async function saveTemplate(section: CmsSectionDraft) {
    const name = window.prompt('Template name')
    if (!name?.trim()) return
    setBusy(true)
    const response = await fetch('/api/admin/templates', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, description: `Saved from ${page.slug}`, section }),
    })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) return setMessage(`Template failed: ${result.error || 'Unknown error'}`)
    setMessage('Reusable section template created.')
    await loadSupportingData()
  }

  async function duplicatePage() {
    const slug = window.prompt('New page URL slug (for example: mining-solutions)')
    if (!slug?.trim()) return
    setBusy(true)
    const response = await fetch(`/api/admin/pages/${page.slug}/duplicate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) return setMessage(`Duplicate failed: ${result.error || 'Unknown error'}`)
    window.location.href = `/admin/pages/${result.slug}`
  }

  async function rollback(publication: Publication) {
    if (!window.confirm(`Publish a new rollback version based on version ${publication.version}? Draft content will remain unchanged.`)) return
    setBusy(true)
    const response = await fetch(`/api/admin/pages/${page.slug}/publications/${publication.id}/rollback`, { method: 'POST' })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) return setMessage(`Rollback failed: ${result.error || 'Unknown error'}`)
    setMessage(`Rollback published as version ${result.version}.`)
    await loadSupportingData()
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
    const note = window.prompt('Optional publication note', '') || ''
    setBusy(true)
    const response = await fetch(`/api/admin/pages/${page.slug}/publish`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ note }),
    })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) {
      setMessage(`Publish failed: ${result.error || 'Unknown error'}`)
      return
    }
    setPage((current) => ({ ...current, status: 'PUBLISHED', publishedAt: result.snapshot.publishedAt }))
    setMessage(`Published successfully as version ${result.publication.version}. The live page cache has been refreshed.`)
    await loadSupportingData()
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
            <button onClick={duplicatePage} disabled={busy} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold disabled:opacity-50"><Copy className="h-4 w-4" />Duplicate</button>
            <Link href={`/admin/pages/${page.slug}/preview`} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold"><Eye className="h-4 w-4" />Responsive preview</Link>
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
          <div><h2 className="text-2xl font-bold">Approved page sections</h2><p className="mt-1 text-sm text-slate-500">Drag on desktop or use the position control on touch devices. Styling remains protected by the NEXUS design system.</p></div>
          <div className="flex flex-wrap justify-end gap-2">
            <select value={selectedTemplate} onChange={(event) => setSelectedTemplate(event.target.value)} className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold">
              <option value="">Choose template</option>
              {templates.map((template) => <option key={template.id} value={template.id}>{template.name}</option>)}
            </select>
            <button onClick={addTemplate} disabled={!selectedTemplate} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-forest bg-white px-4 py-2.5 text-sm font-bold text-forest disabled:opacity-40"><LayoutTemplate className="h-4 w-4" />Add template</button>
            <button onClick={addSection} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-bold text-white"><Plus className="h-4 w-4" />Blank section</button>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {page.sections.map((section, index) => (
            <SectionEditor
              key={section.key}
              section={section}
              index={index}
              count={page.sections.length}
              media={media}
              onChange={(next) => changeSection(index, next)}
              onMove={(delta) => moveSection(index, delta)}
              onMoveTo={(target) => moveSectionTo(index, target)}
              onRemove={() => removeSection(index)}
              onSaveTemplate={() => saveTemplate(section)}
              dragging={dragIndex === index}
              onDragStart={() => setDragIndex(index)}
              onDragEnd={() => setDragIndex(null)}
              onDrop={() => {
                if (dragIndex !== null) moveSectionTo(dragIndex, index)
                setDragIndex(null)
              }}
            />
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-forest" />
            <div>
              <h2 className="text-xl font-bold">Publish history</h2>
              <p className="mt-1 text-sm text-slate-500">Every publish and rollback creates a new immutable version.</p>
            </div>
          </div>
          {publications.length === 0 ? (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">This page has not been published through the versioned Release 1 workflow yet.</p>
          ) : (
            <div className="mt-5 divide-y divide-slate-200">
              {publications.map((publication) => (
                <div key={publication.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold">Version {publication.version}{publication.sourcePublicationId ? ' · rollback' : ''}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(publication.createdAt).toLocaleString()} · {publication.publishedBy?.email || 'System'}{publication.note ? ` · ${publication.note}` : ''}</p>
                  </div>
                  <button disabled={busy || publication.version === publications[0]?.version} onClick={() => rollback(publication)} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold disabled:opacity-40">Publish rollback</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function SectionEditor({
  section,
  index,
  count,
  media,
  onChange,
  onMove,
  onMoveTo,
  onRemove,
  onSaveTemplate,
  dragging,
  onDragStart,
  onDragEnd,
  onDrop,
}: {
  section: CmsSectionDraft
  index: number
  count: number
  media: MediaChoice[]
  onChange: (section: CmsSectionDraft) => void
  onMove: (delta: number) => void
  onMoveTo: (target: number) => void
  onRemove: () => void
  onSaveTemplate: () => void
  dragging: boolean
  onDragStart: () => void
  onDragEnd: () => void
  onDrop: () => void
}) {
  const setContent = (content: CmsSectionContent) => onChange({ ...section, content })
  const items = section.content.items || []
  const setItem = (itemIndex: number, item: CmsItem) => setContent({ ...section.content, items: items.map((current, index) => index === itemIndex ? item : current) })
  const addItem = () => setContent({ ...section.content, items: [...items, { title: emptyLocalized(), body: emptyLocalized() }] })
  const removeItem = (itemIndex: number) => setContent({ ...section.content, items: items.filter((_, index) => index !== itemIndex) })
  const selectMedia = (assetId: string, apply: (asset?: MediaChoice) => void) => apply(media.find((asset) => asset.id === assetId))

  return (
    <article
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => { event.preventDefault(); onDrop() }}
      className={`rounded-3xl border bg-white p-5 shadow-sm transition sm:p-7 ${dragging ? 'border-forest opacity-60' : 'border-slate-200'}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            title="Drag to reorder"
            className="cursor-grab rounded-lg p-1 text-slate-300 active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5" aria-hidden="true" />
          </span>
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
          <label className="sr-only" htmlFor={`position-${section.key}`}>Section position</label>
          <select id={`position-${section.key}`} value={index} onChange={(event) => onMoveTo(Number(event.target.value))} className="mr-1 rounded-full border border-slate-200 px-2 text-xs font-bold">
            {Array.from({ length: count }, (_, position) => <option key={position} value={position}>Position {position + 1}</option>)}
          </select>
          <button disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move section up" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
          <button disabled={index === count - 1} onClick={() => onMove(1)} aria-label="Move section down" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
          <button onClick={onRemove} aria-label="Remove section" className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-700"><Trash2 className="h-4 w-4" /></button>
          <button onClick={onSaveTemplate} aria-label="Save as reusable template" className="grid h-9 w-9 place-items-center rounded-full border border-blue-200 text-blue-700"><LayoutTemplate className="h-4 w-4" /></button>
        </div>
      </header>

      <div className="mt-6 space-y-4">
        <LocalizedField label="Eyebrow (optional)" value={section.content.eyebrow || emptyLocalized()} onChange={(eyebrow) => setContent({ ...section.content, eyebrow })} />
        <LocalizedField label="Title" value={section.content.title} onChange={(title) => setContent({ ...section.content, title })} />
        <LocalizedField label="Body" value={section.content.body} multiline onChange={(body) => setContent({ ...section.content, body })} />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="text-xs font-bold text-slate-500">Media
            <div className="mt-1.5 grid gap-2">
              <select value={section.content.mediaId || ''} onChange={(event) => selectMedia(event.target.value, (asset) => setContent({ ...section.content, mediaId: asset?.id, image: asset?.url || section.content.image }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal text-ink">
                <option value="">Choose from media library</option>
                {media.map((asset) => <option key={asset.id} value={asset.id}>{asset.originalName}</option>)}
              </select>
              <label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-slate-400" />
                <input aria-label="Section media URL" placeholder="/images/example.jpg" value={section.content.image || ''} onChange={(event) => setContent({ ...section.content, image: event.target.value, mediaId: undefined })} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal text-ink" />
              </label>
            </div>
          </div>
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
                  <div className="grid gap-2">
                    <select aria-label="Item media library image" value={item.mediaId || ''} onChange={(event) => selectMedia(event.target.value, (asset) => setItem(itemIndex, { ...item, mediaId: asset?.id, image: asset?.url || item.image }))} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Media library</option>
                      {media.map((asset) => <option key={asset.id} value={asset.id}>{asset.originalName}</option>)}
                    </select>
                    <input aria-label="Item image" placeholder="/images/example.jpg" value={item.image || ''} onChange={(event) => setItem(itemIndex, { ...item, image: event.target.value, mediaId: undefined })} className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
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
