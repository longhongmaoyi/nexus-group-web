'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const slides = [
  {
    src: '/images/hero-slide-01.jpg',
    alt: 'Futuristic modular residence overlooking a Canadian mountain lake',
    position: 'object-center',
  },
  {
    src: '/images/modular-living.jpg',
    alt: 'Modern black modular residence beside a mountain lake',
    position: 'object-center',
  },
  {
    src: '/images/commercial.jpg',
    alt: 'Modular resort cabins and guests gathered beside a lake',
    position: 'object-center',
  },
] as const

export function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          quality={100}
          sizes="100vw"
          className={`${slide.position} object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}
