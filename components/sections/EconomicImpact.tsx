'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import FadeIn from '@/components/ui/FadeIn'

const SSRN_URL = 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6750739'

const stats = [
  { value: '$280M', labelKey: 'stat1' },
  { value: '>$1B', labelKey: 'stat2' },
  { value: '100–180M', labelKey: 'stat3' },
  { value: '$0', labelKey: 'stat4' },
]

const slides = [
  { src: '/impact-hbr.png',      alt: 'HBR: The Monk Who Generated $280M by Owning Nothing' },
  { src: '/impact-vi.png',       alt: 'Cuộc Hành Hương Quốc Tế — Tác Động Kinh Tế >$1 Tỷ USD' },
  { src: '/impact-analysis.png', alt: 'Economic Impact Analysis: Trust Shifts, Capital Follows' },
  { src: '/impact-chart.png',    alt: 'Vietnam Overseas Remittance Trend 2015–2025' },
]

const labels = [
  'HBR Analysis',
  'Impact Report (VI)',
  'Full Analysis',
  'Remittance Trend',
]

export default function EconomicImpact() {
  const t = useTranslations('impact')
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <section className="relative bg-gray-50 overflow-hidden">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#d97706 1px, transparent 1px), linear-gradient(90deg, #d97706 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative section-padding">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-ui text-label uppercase tracking-[0.16em] text-amber-600 mb-4">
                {t('eyebrow')}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-parchment leading-tight mb-5">
                {t('heading1')}{' '}
                <span className="text-amber-600">{t('headingAccent')}</span>
                <br />
                {t('heading2')}
              </h2>
              <p className="font-body text-ash leading-relaxed max-w-2xl mx-auto">
                {t('description')}
              </p>
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px border-gray-200 rounded-xl overflow-hidden mb-14">
              {stats.map(({ value, labelKey }) => (
                <div key={labelKey} className="bg-white px-6 py-8 text-center">
                  <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-amber-600 font-bold mb-2">
                    {value}
                  </p>
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.14em] text-ash">
                    {t(labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Infographic grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {slides.map((slide, i) => (
              <FadeIn key={slide.src} delay={i * 0.08}>
                <button
                  onClick={() => { setIndex(i); setOpen(true) }}
                  className="group relative w-full aspect-[3/4] overflow-hidden rounded-lg border border-white/10 hover:border-amber-400/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label={`View ${labels[i]}`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  {/* Label */}
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <p className="font-ui text-[0.6rem] uppercase tracking-[0.12em] text-amber-300/80">
                      {labels[i]}
                    </p>
                  </div>
                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 bg-black/50 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border border-bark rounded-xl p-6 bg-white">
              <div>
                <p className="font-ui text-label uppercase tracking-[0.12em] text-amber-600 mb-1">
                  {t('ctaLabel')}
                </p>
                <p className="font-body text-ash text-sm max-w-lg">
                  {t('ctaBody')}
                </p>
              </div>
              <a
                href={SSRN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-ui text-label uppercase tracking-[0.12em] rounded hover:bg-amber-300 transition-colors duration-200"
              >
                {t('ctaButton')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
      />
    </section>
  )
}
