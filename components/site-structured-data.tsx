import { JsonLd } from '@/components/json-ld'
import { publishedContacts } from '@/lib/company-profile'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export function SiteStructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'NEXUS GROUP',
    url: SITE_URL,
    logo: `${SITE_URL}/images/nexus-header-logo.png`,
    description:
      'NEXUS coordinates globally sourced modular systems with Canadian project planning, documentation, delivery and local professional responsibilities.',
    contactPoint: publishedContacts.map((contact) => ({
      '@type': 'ContactPoint',
      name: contact.name,
      contactType: contact.key === 'canada' ? 'project enquiries' : 'global sourcing enquiries',
      telephone: contact.phoneDisplay,
      email: contact.email,
      availableLanguage: ['English', 'Chinese', 'French'],
    })),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['en-CA', 'zh-CN', 'fr-CA'],
  }

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  )
}
