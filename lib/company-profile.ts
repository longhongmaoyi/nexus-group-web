import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

export const publishedContacts = [
  {
    key: 'canada',
    name: 'Mr. Lin Jian',
    role: t('Director', '董事', 'Directeur'),
    contactLabel: t('Canada contact', '加拿大联系人', 'Contact Canada'),
    email: 'leo@nexuslife.ca',
    phoneDisplay: '+1 416 846 3253',
    whatsappUrl: 'https://wa.me/14168463253',
    location: t(
      '125 Cartmel Drive, Markham, Ontario, Canada, L3S 1K8',
      '125 Cartmel Drive, Markham, Ontario, Canada, L3S 1K8',
      '125 Cartmel Drive, Markham, Ontario, Canada, L3S 1K8',
    ),
  },
  {
    key: 'china',
    name: 'Satya Sharma',
    role: t('General Manager', '总经理', 'Directeur général'),
    contactLabel: t('China sourcing contact', '中国采购联系人', 'Contact approvisionnement en Chine'),
    email: 'satya@nexuslife.ca',
    phoneDisplay: '+91 9517149685',
    whatsappUrl: 'https://wa.me/919517149685',
    location: t(
      'Yiwu International Trade City, Zhejiang, China',
      '中国浙江义乌国际商贸城',
      'Yiwu International Trade City, Zhejiang, Chine',
    ),
  },
]

export const companyContactNote = t(
  'These are the public contact points currently published by NEXUS. Project responsibilities, contracts and local professional roles are confirmed separately for each engagement.',
  '以上为 NEXUS 当前公开的联系方式。每个项目的责任、合同及本地专业角色将另行确认。',
  'Il s’agit des coordonnées publiques actuellement publiées par NEXUS. Les responsabilités, contrats et rôles professionnels locaux sont confirmés séparément pour chaque mandat.',
)
