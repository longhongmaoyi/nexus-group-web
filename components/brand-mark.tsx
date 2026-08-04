import Image from 'next/image'
import Link from 'next/link'

export function BrandMark({
  href = '/en',
  adaptive = false,
  compactOnMobile = false,
}: {
  href?: string
  adaptive?: boolean
  compactOnMobile?: boolean
}) {
  const mobileSize = compactOnMobile
    ? 'h-7 max-w-[145px] sm:h-9 sm:max-w-[205px]'
    : 'h-8 max-w-[180px] sm:h-9 sm:max-w-[205px]'

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center ${adaptive ? 'mix-blend-difference' : ''}`}
      aria-label="NEXUS GROUP home"
    >
      <Image
        src="/images/nexus-header-logo.png"
        alt="NEXUS GROUP"
        width={2181}
        height={415}
        priority
        unoptimized
        sizes={compactOnMobile
          ? '(max-width: 640px) 145px, (max-width: 1280px) 205px, 220px'
          : '(max-width: 640px) 180px, (max-width: 1280px) 205px, 220px'}
        className={`w-auto object-contain xl:h-10 xl:max-w-[220px] ${mobileSize} ${adaptive ? 'brightness-0 invert' : ''}`}
      />
    </Link>
  )
}
