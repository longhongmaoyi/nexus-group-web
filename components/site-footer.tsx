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
      { slug: 'products', label: t('Solutions', '解决方案', 'Solutions') },
      { slug: 'industries', label: t('Industries', '行业', 'Secteurs') },
      { slug: 'projects', label: t('Projects & Proof', '项目与证据', 'Projets et preuves') },
      { slug: 'technology-services', label: t('Technology Services', '技术服务', 'Services technologiques') },
      { slug: 'buyer-resources', label: t('Resources', '资源', 'Ressources') },
    ],
  },
  {
    title: t('NEXUS', 'NEXUS', 'NEXUS'),
    links: [
      { slug: 'assembly-centre', label: t('How We Deliver', '交付方式', 'Notre approche') },
      { slug: 'compliance', label: t('Compliance Centre', '合规中心', 'Centre de conformité') },
      { slug: 'suppliers', label: t('Suppliers', '供应商', 'Fournisseurs') },
      { slug: 'news', label: t('Guides & Insights', '指南与洞察', 'Guides et analyses') },
      { slug: 'about', label: t('About NEXUS', '关于 NEXUS', 'À propos de NEXUS') },
    ],
  },
]

const copy = {
  body: t(
    'We connect the factory, the project information and the site—and we say clearly what still needs an answer.',
    '我们连接工厂、项目信息及现场，并清楚说明仍需解决的问题。',
    'Nous relions l’usine, l’information du projet et le site, et nous indiquons clairement ce qui reste à régler.',
  ),
  contact: t('Public Contacts', '公开联系方式', 'Coordonnées publiques'),
  privacy: t('Privacy & Data Use', '隐私与数据使用', 'Confidentialité et données'),
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
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#b8d683]">{localized(group.title)}</h3>
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
                <p className="mt-0.5 text-sm font-medium text-[#b8d683]">{localized(contact.role)}</p>
                <div className="mt-2 grid gap-1.5 text-sm leading-5 text-white/68">
                  <a href={`mailto:${contact.email}`} className="flex items-start gap-2 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>{contact.email}</span></a>
                  <a href={contact.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>{contact.phoneDisplay}</span></a>
                  <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>{localized(contact.location)}</span></p>
                </div>
              </address>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1760px] flex-col gap-2 px-5 py-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} NEXUS LIFE GROUP. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1"><Link href={`/${locale}/privacy`} className="hover:text-white">{localized(copy.privacy)}</Link><span>English · 中文 · Français</span></span>
        </div>
      </div>
    </footer>
  )
}
