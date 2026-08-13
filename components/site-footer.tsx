import Link from 'next/link'
import { Mail, MapPin, MessageCircle } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { publishedContacts } from '@/lib/company-profile'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const groups = [
  {
    title: t('Explore', '探索', 'Explorer'),
    links: [
      { slug: 'solutions', label: t('Solutions', '解决方案', 'Solutions') },
      { slug: 'assembly-centre', label: t('How We Deliver', '交付方式', 'Notre approche') },
      { slug: 'projects', label: t('Current Work', '当前项目', 'Travaux en cours') },
      { slug: 'compliance', label: t('Compliance Centre', '合规中心', 'Centre de conformité') },
      { slug: 'buyer-resources', label: t('Resources', '资源', 'Ressources') },
    ],
  },
  {
    title: t('Company', '公司', 'Entreprise'),
    links: [
      { slug: 'about', label: t('About NEXUS', '关于 NEXUS', 'À propos de NEXUS') },
      { slug: 'suppliers', label: t('Suppliers', '供应商', 'Fournisseurs') },
      { slug: 'contact', label: t('Contact', '联系', 'Contact') },
      { slug: 'portal', label: t('Client Portal', '客户门户', 'Portail client') },
      { slug: 'privacy', label: t('Privacy & Data Use', '隐私与数据使用', 'Confidentialité et données') },
    ],
  },
]

const copy = {
  body: t(
    'Modular project coordination from supplier information and shipping to Canadian site preparation, assembly and handover.',
    '从供应商信息和运输，到加拿大场地准备、组装及移交的模块化项目协调。',
    'Coordination de projets modulaires, des renseignements fournisseurs et du transport jusqu’au site canadien, à l’assemblage et à la remise.',
  ),
  contact: t('Public Contacts', '公开联系方式', 'Coordonnées publiques'),
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  return (
    <footer className="border-t border-white/10 bg-[#06191d] text-white">
      <div className="mx-auto grid max-w-[1760px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_0.75fr_1.55fr] lg:gap-7 lg:px-12">
        <div>
          <BrandMark href={`/${locale}`} adaptive />
          <p className="mt-4 max-w-lg text-base leading-7 text-white/64">{localized(copy.body)}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title.en}>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-brand-frost">{localized(group.title)}</h3>
              <div className="mt-3 grid gap-2.5">
                {group.links.map((item) => (
                  <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-[0.94rem] text-white/64 hover:text-white">{localized(item.label)}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-7">
          <h2 className="text-xl font-semibold">{localized(copy.contact)}</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2 md:gap-0">
            {publishedContacts.map((contact, index) => (
              <address key={contact.key} className={`min-w-0 not-italic ${index ? 'border-t border-white/10 pt-4 md:border-l md:border-t-0 md:py-0 md:pl-5' : 'md:pr-5'}`}>
                <p className="text-base font-semibold text-white">{contact.name}</p>
                <p className="mt-0.5 text-sm font-medium text-brand-frost">{localized(contact.role)}</p>
                <div className="mt-2 grid gap-1.5 text-sm leading-5 text-white/68">
                  <a href={`mailto:${contact.email}`} className="flex items-start gap-2 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-frost" /><span>{contact.email}</span></a>
                  <a href={contact.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-frost" /><span>{contact.phoneDisplay}</span></a>
                  <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-frost" /><span>{localized(contact.location)}</span></p>
                </div>
              </address>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1760px] flex-col gap-2 px-5 py-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} NEXUS LIFE GROUP. All rights reserved.</span>
          <span>English · 中文 · Français</span>
        </div>
      </div>
    </footer>
  )
}
