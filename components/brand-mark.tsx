import Image from 'next/image'
import Link from 'next/link'

export function BrandMark({ href = '/en' }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center"
      aria-label="NEXUS GROUP home"
    >
      <Image
        src="/images/nexus-header-logo.png"
        alt="NEXUS GROUP — North America Modular Living Infrastructure"
        width={2181}
        height={415}
        priority
        unoptimized
        sizes="(max-width: 640px) 220px, (max-width: 1280px) 270px, 300px"
        className="h-10 w-auto max-w-[220px] object-contain sm:h-11 sm:max-w-[270px] xl:h-12 xl:max-w-[300px]"
      />
    </Link>
  )
}
