import Image from 'next/image'
import Link from 'next/link'

export function BrandMark({
  href = '/en',
  adaptive = false,
}: {
  href?: string
  adaptive?: boolean
}) {
  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center ${adaptive ? 'mix-blend-difference' : ''}`}
      aria-label="NEXUS GROUP home"
    >
      <Image
        src="/images/nexus-header-logo.png"
        alt="NEXUS GROUP — North America Modular Living Infrastructure"
        width={2181}
        height={415}
        priority
        unoptimized
        sizes="(max-width: 640px) 180px, (max-width: 1280px) 205px, 220px"
        className={`h-8 w-auto max-w-[180px] object-contain sm:h-9 sm:max-w-[205px] xl:h-10 xl:max-w-[220px] ${adaptive ? 'brightness-0 invert' : ''}`}
      />
    </Link>
  )
}
