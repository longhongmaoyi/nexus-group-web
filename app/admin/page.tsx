'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Boxes, FileText, FolderKanban, Languages, LayoutDashboard, MessageSquareText, Settings, Users } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'

type AdminLocale = 'en' | 'zh'

const copy = {
  en: {
    title: 'NEXUS Admin', subtitle: 'English / Chinese content operations', overview: 'Overview', products: 'Products', projects: 'Projects', news: 'News', suppliers: 'Suppliers', inquiries: 'Inquiries', settings: 'Settings', status: 'Foundation status', cards: [
      ['Frontend languages', 'English · Chinese · French'], ['Admin languages', 'English · Chinese'], ['CMS collections', 'Products · Projects · News · Suppliers'], ['Inquiry workflow', 'Database-ready API'],
    ], notice: 'Authentication is intentionally not enabled in this foundation. Add secure admin login before any public deployment.', view: 'View website'
  },
  zh: {
    title: 'NEXUS 管理后台', subtitle: '中英文内容运营', overview: '概览', products: '产品', projects: '项目', news: '新闻', suppliers: '供应商', inquiries: '询价', settings: '设置', status: '基础架构状态', cards: [
      ['前台语言', '英文 · 中文 · 法文'], ['后台语言', '英文 · 中文'], ['CMS 内容集合', '产品 · 项目 · 新闻 · 供应商'], ['询价流程', '数据库 API 已预留'],
    ], notice: '此基础版本暂未启用身份验证。任何公开部署前必须增加安全的后台登录。', view: '查看网站'
  }
} as const

export default function AdminPage() {
  const [locale, setLocale] = useState<AdminLocale>('en')
  const c = copy[locale]
  const nav = [
    [c.overview, LayoutDashboard], [c.products, Boxes], [c.projects, FolderKanban], [c.news, FileText], [c.suppliers, Users], [c.inquiries, MessageSquareText], [c.settings, Settings],
  ] as const

  return (
    <main className="min-h-screen bg-slate-100 text-ink lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="bg-ink p-6 text-white lg:min-h-screen">
        <div className="rounded-2xl bg-white p-3"><BrandMark href="/en" /></div>
        <p className="mt-5 text-sm font-bold">{c.title}</p>
        <p className="mt-1 text-xs text-white/50">{c.subtitle}</p>
        <nav className="mt-8 grid gap-1">
          {nav.map(([label, Icon], index) => <button key={label} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold ${index === 0 ? 'bg-white text-ink' : 'text-white/65 hover:bg-white/10 hover:text-white'}`}><Icon className="h-4 w-4" />{label}</button>)}
        </nav>
      </aside>
      <section className="p-5 sm:p-8 lg:p-12">
        <div className="mx-auto max-w-6xl">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="eyebrow">NEXUS GROUP</p><h1 className="mt-2 text-4xl font-bold tracking-tight">{c.overview}</h1></div>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold"><Languages className="h-4 w-4" /><select value={locale} onChange={(e) => setLocale(e.target.value as AdminLocale)} className="bg-transparent outline-none"><option value="en">English</option><option value="zh">中文</option></select></label>
              <Link href="/en" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">{c.view}</Link>
            </div>
          </header>
          <div className="mt-10 rounded-4xl bg-white p-7 shadow-soft sm:p-9">
            <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-nexus-100"><LayoutDashboard className="h-6 w-6 text-forest" /></span><div><h2 className="text-2xl font-bold">{c.status}</h2><p className="text-sm text-slate-500">Next.js 14.2.35 · Prisma 6.7.0 · PostgreSQL · Tailwind CSS</p></div></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{c.cards.map(([label, value]) => <div key={label} className="rounded-3xl bg-slate-50 p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p><p className="mt-4 text-lg font-bold leading-7">{value}</p></div>)}</div>
          </div>
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-6 text-amber-900">{c.notice}</div>
        </div>
      </section>
    </main>
  )
}
