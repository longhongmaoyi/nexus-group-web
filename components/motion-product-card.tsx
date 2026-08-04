'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'

export type MotionProductCardProps = {
  number: string
  title: string
  description: string
  facts: string[]
  image: string
  href: string
  cta: string
}

export function MotionProductCard({ number, title, description, facts, image, href, cta }: MotionProductCardProps) {
  return (
    <Link
      href={href}
      className="motion-product-card group relative isolate flex min-h-[31rem] overflow-hidden bg-[#101719] text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4ba3d3] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f1e9]"
      aria-label={`${title}. ${cta}`}
    >
      <Image
        src={image}
        alt=""
        fill
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="motion-product-image object-cover"
      />
      <span className="motion-product-shade absolute inset-0" aria-hidden="true" />

      <span className="relative flex w-full flex-col p-6 sm:p-7">
        <span className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white/72">
          <span>NEXUS / {number}</span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/10 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-45 group-focus-visible:rotate-45">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>

        <span className="motion-product-content mt-auto block">
          <span className="motion-product-title block max-w-[16ch] text-[2rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[2.25rem]">
            {title}
          </span>
          <span className="motion-product-details mt-5 block border-t border-white/30 pt-5">
            <span className="block max-w-md text-sm leading-6 text-white/78">{description}</span>
            <span className="mt-4 grid gap-2">
              {facts.map((fact) => (
                <span key={fact} className="flex items-start gap-2 text-xs leading-5 text-white/72">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#75bfe8]" aria-hidden="true" />
                  {fact}
                </span>
              ))}
            </span>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
              {cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
