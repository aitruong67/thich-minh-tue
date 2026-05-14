'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import type { Photo } from '@/lib/types'

const themes = ['pilgrimage', 'community', 'simplicity', 'spirituality', 'nature', 'teaching'] as const

export default function GalleryClient({ photos }: { photos: Photo[] }) {
  const t = useTranslations()
  const locale = useLocale()
  const [activeTheme, setActiveTheme] = useState<string>('all')

  const filtered = activeTheme === 'all'
    ? photos
    : photos.filter((p) => p.theme.includes(activeTheme))

  return (
    <div className="pt-16">
      <header className="section-padding pb-12">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('page.gallery.eyebrow')}</p>
            <h1 className="section-heading">{t('page.gallery.heading')}</h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-3 mt-8" role="group" aria-label="Filter by theme">
              <button
                onClick={() => setActiveTheme('all')}
                className={`font-ui text-label uppercase tracking-[0.12em] px-4 py-2 border transition-colors ${
                  activeTheme === 'all'
                    ? 'border-saffron bg-saffron text-ink'
                    : 'border-bark text-ash hover:border-saffron hover:text-saffron'
                }`}
                aria-pressed={activeTheme === 'all'}
              >
                {t('page.gallery.filterAll')}
              </button>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(theme)}
                  className={`font-ui text-label uppercase tracking-[0.12em] px-4 py-2 border transition-colors ${
                    activeTheme === theme
                      ? 'border-saffron bg-saffron text-ink'
                      : 'border-bark text-ash hover:border-saffron hover:text-saffron'
                  }`}
                  aria-pressed={activeTheme === theme}
                >
                  {t(`page.gallery.theme.${theme}`)}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </header>

      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="font-ui text-ash text-center py-24">No photos yet.</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((photo, i) => (
                <FadeIn key={photo._id} delay={i * 0.05} as="figure" className="break-inside-avoid">
                  <div className="relative overflow-hidden group">
                    <Image
                      src={photo.imageUrl}
                      alt={locale === 'vi' ? photo.alt_vi : photo.alt_en}
                      width={photo.width}
                      height={photo.height}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="font-display text-parchment text-lg leading-snug">
                          {locale === 'vi' ? photo.title_vi : photo.title_en}
                        </p>
                        <p className="font-ui text-label uppercase tracking-[0.12em] text-ash mt-1">
                          {photo.location} · {photo.year}
                        </p>
                      </div>
                    </div>
                  </div>
                  {photo.caption_vi && (
                    <figcaption className="font-ui text-label text-ash mt-2 tracking-wide">
                      {locale === 'vi' ? photo.caption_vi : photo.caption_en}
                    </figcaption>
                  )}
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
