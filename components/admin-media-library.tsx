'use client'

import { upload } from '@vercel/blob/client'
import { Archive, Check, ImageIcon, RefreshCw, Search, Upload } from 'lucide-react'
import { FormEvent, useEffect, useMemo, useState } from 'react'

type MediaAsset = {
  id: string
  url: string
  originalName: string
  contentType: string
  sizeBytes: number
  altEn: string
  altZh: string
  altFr: string
  status: 'ACTIVE' | 'ARCHIVED'
  createdAt: string
  _count: { references: number }
}

type MediaResponse = {
  assets: MediaAsset[]
  uploadEnabled: boolean
  limits: { maxBytes: number; contentTypes: string[] }
}

const emptyResponse: MediaResponse = {
  assets: [],
  uploadEnabled: false,
  limits: { maxBytes: 10 * 1024 * 1024, contentTypes: ['image/avif', 'image/jpeg', 'image/png', 'image/webp'] },
}

export function AdminMediaLibrary() {
  const [data, setData] = useState<MediaResponse>(emptyResponse)
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [alt, setAlt] = useState({ en: '', zh: '', fr: '' })

  async function load() {
    const response = await fetch('/api/admin/media')
    const result = await response.json()
    if (response.ok) setData(result)
    else setMessage(result.error || 'Media library is unavailable.')
  }

  useEffect(() => { void load() }, [])

  const assets = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return data.assets
    return data.assets.filter((asset) =>
      [asset.originalName, asset.altEn, asset.altZh, asset.altFr].some((value) => value.toLowerCase().includes(normalized)),
    )
  }, [data.assets, query])

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!file) return setMessage('Choose an image first.')
    setBusy(true)
    setMessage('')
    try {
      const safeName = file.name
        .normalize('NFKD')
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/^-+/, '')
        .slice(0, 120) || 'image'
      await upload(`cms/${Date.now()}-${safeName}`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/media/upload',
        clientPayload: JSON.stringify({
          originalName: file.name,
          contentType: file.type,
          sizeBytes: file.size,
          alt,
        }),
      })
      setMessage('Upload completed. The media record may take a few seconds to appear.')
      setFile(null)
      setAlt({ en: '', zh: '', fr: '' })
      window.setTimeout(() => void load(), 1500)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  async function updateAsset(asset: MediaAsset) {
    setBusy(true)
    const response = await fetch(`/api/admin/media/${asset.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ altEn: asset.altEn, altZh: asset.altZh, altFr: asset.altFr }),
    })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) return setMessage(result.error || 'Update failed.')
    setData((current) => ({ ...current, assets: current.assets.map((item) => item.id === asset.id ? result : item) }))
    setMessage('Alt text saved.')
  }

  async function archiveAsset(asset: MediaAsset) {
    if (!window.confirm(`Archive ${asset.originalName}? The stored file will be preserved.`)) return
    setBusy(true)
    const response = await fetch(`/api/admin/media/${asset.id}/archive`, { method: 'POST' })
    const result = await response.json()
    setBusy(false)
    if (!response.ok) return setMessage(result.error || 'Archive failed.')
    setData((current) => ({ ...current, assets: current.assets.filter((item) => item.id !== asset.id) }))
    setMessage('Image archived. Its stored file was preserved.')
  }

  const changeAsset = (id: string, key: 'altEn' | 'altZh' | 'altFr', value: string) => {
    setData((current) => ({
      ...current,
      assets: current.assets.map((asset) => asset.id === id ? { ...asset, [key]: value } : asset),
    }))
  }

  return (
    <div className="space-y-7">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Secure public images</p>
            <h2 className="mt-2 text-2xl font-bold">Upload to the NEXUS media library</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">AVIF, JPEG, PNG or WebP only. Maximum 10 MB. Alt text is required in all three website languages.</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${data.uploadEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
            {data.uploadEnabled ? 'Uploads enabled' : 'Uploads need Vercel Blob setup'}
          </span>
        </div>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <input
            type="file"
            accept={data.limits.contentTypes.join(',')}
            disabled={!data.uploadEnabled || busy}
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm"
          />
          <div className="grid gap-3 lg:grid-cols-3">
            {(['en', 'zh', 'fr'] as const).map((locale) => (
              <label key={locale} className="text-xs font-bold text-slate-500">
                Alt text · {locale.toUpperCase()}
                <input
                  value={alt[locale]}
                  onChange={(event) => setAlt((current) => ({ ...current, [locale]: event.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal text-ink"
                  required
                  maxLength={300}
                />
              </label>
            ))}
          </div>
          <button disabled={!data.uploadEnabled || busy || !file} className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white disabled:opacity-40">
            <Upload className="h-4 w-4" />Upload image
          </button>
        </form>
      </section>

      {message && <p role="status" className="rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-blue-950">{message}</p>}

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Media assets</h2>
            <p className="mt-1 text-sm text-slate-500">{data.assets.length} active image{data.assets.length === 1 ? '' : 's'}</p>
          </div>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4">
              <Search className="h-4 w-4 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search media" className="w-44 bg-transparent py-2.5 text-sm outline-none" />
            </label>
            <button onClick={() => void load()} aria-label="Refresh media" className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
        {assets.length === 0 ? (
          <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            <ImageIcon className="mx-auto h-8 w-8" />
            <p className="mt-3 text-sm">No matching media assets.</p>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {assets.map((asset) => (
              <article key={asset.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt={asset.altEn} className="aspect-[16/9] w-full bg-slate-100 object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{asset.originalName}</h3>
                      <p className="mt-1 text-xs text-slate-500">{asset.contentType} · {(asset.sizeBytes / 1024 / 1024).toFixed(2)} MB · {asset._count.references} references</p>
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(asset.url).then(() => setMessage('Media URL copied.'))} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold">Copy URL</button>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {(['altEn', 'altZh', 'altFr'] as const).map((key) => (
                      <input key={key} aria-label={key} value={asset[key]} onChange={(event) => changeAsset(asset.id, key, event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button disabled={busy} onClick={() => updateAsset(asset)} className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-bold text-white disabled:opacity-40"><Check className="h-3.5 w-3.5" />Save alt text</button>
                    <button disabled={busy} onClick={() => archiveAsset(asset)} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold disabled:opacity-40"><Archive className="h-3.5 w-3.5" />Archive safely</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
