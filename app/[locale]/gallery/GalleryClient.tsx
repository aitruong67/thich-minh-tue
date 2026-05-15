'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import FadeIn from '@/components/ui/FadeIn'
import type { Photo } from '@/lib/types'

type Filter = 'all' | 'pilgrimage' | 'community' | 'portrait' | 'international' | 'media'
const FILTERS: Filter[] = ['all', 'pilgrimage', 'community', 'portrait', 'international', 'media']

const FILTER_LABELS: Record<Filter, { en: string; vi: string }> = {
  all:           { en: 'All',           vi: 'Tất cả' },
  pilgrimage:    { en: 'Pilgrimage',    vi: 'Hành hương' },
  community:     { en: 'Community',     vi: 'Cộng đồng' },
  portrait:      { en: 'Portrait',      vi: 'Chân dung' },
  international: { en: 'International', vi: 'Quốc tế' },
  media:         { en: 'Press & Media', vi: 'Báo chí' },
}

const THEME_COLOR: Record<string, string> = {
  pilgrimage: 'text-saffron', community: 'text-green-400',
  portrait: 'text-ember', international: 'text-blue-400', media: 'text-purple-400',
}
const THEME_LABEL: Record<string, { en: string; vi: string }> = {
  pilgrimage:    { en: 'Pilgrimage',    vi: 'Hành hương' },
  community:     { en: 'Community',     vi: 'Cộng đồng' },
  portrait:      { en: 'Portrait',      vi: 'Chân dung' },
  international: { en: 'International', vi: 'Quốc tế' },
  media:         { en: 'Press',         vi: 'Báo chí' },
}

interface Props { photos: Photo[] }

export default function GalleryClient({ photos }: Props) {
  const t = useTranslations('page.gallery')
  const locale = useLocale()
  const [filter, setFilter] = useState<Filter>('all')
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const filtered = useMemo(
    () => filter === 'all' ? photos : photos.filter(p => p.theme.includes(filter)),
    [photos, filter]
  )

  const slides = filtered.map(p => ({
    src: p.imageUrl,
    alt: locale === 'vi' ? p.alt_vi : p.alt_en,
    title: locale === 'vi' ? p.title_vi : p.title_en,
    description: locale === 'vi' ? (p.caption_vi || '') : (p.caption_en || ''),
  }))

  const openAt = (index: number) => { setLightboxIndex(index); setLightboxOpen(true) }
  const photoIndex = (photo: Photo) => filtered.findIndex(p => p._id === photo._id)

  const col = (n: number, total: number) => filtered.filter((_, i) => i % total === n)

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <header className="section-padding pb-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('eyebrow')}</p>
            <h1 className="section-heading mb-4">{t('heading')}</h1>
            <p className="font-body text-ash max-w-2xl leading-relaxed">
              {locale === 'vi'
                ? 'Bộ sưu tập hình ảnh từ các nguồn báo chí quốc tế — ghi lại hành trình bộ hành lịch sử của Thầy Minh Tuệ qua Việt Nam và nhiều quốc gia trên thế giới.'
                : 'A curated collection of photographs from international press sources — documenting the historic pilgrimage of Minh Tuệ across Vietnam and the world.'}
            </p>
          </FadeIn>

          {/* Filter bar */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mt-8" role="group" aria-label="Filter by theme">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`font-ui text-label uppercase tracking-[0.1em] px-4 py-2 border transition-all duration-200 ${
                    filter === f
                      ? 'border-saffron bg-saffron text-ink'
                      : 'border-bark text-ash hover:border-saffron hover:text-saffron'
                  }`}
                >
                  {FILTER_LABELS[f][locale as 'vi' | 'en']}
                  {f !== 'all' && (
                    <span className="ml-1.5 opacity-50 text-xs">
                      ({photos.filter(p => p.theme.includes(f)).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Masonry */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center font-body text-ash py-24">
              {locale === 'vi' ? 'Không có ảnh.' : 'No photos found.'}
            </p>
          ) : (
            <>
              {/* 2-col on mobile */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                {[col(0, 2), col(1, 2)].map((column, ci) => (
                  <div key={ci} className="flex flex-col gap-3">
                    {column.map(photo => (
                      <GalleryCard key={photo._id} photo={photo} locale={locale} index={photoIndex(photo)} onOpen={openAt} />
                    ))}
                  </div>
                ))}
              </div>

              {/* 3-col on desktop */}
              <div className="hidden md:grid grid-cols-3 gap-4">
                {[col(0, 3), col(1, 3), col(2, 3)].map((column, ci) => (
                  <div key={ci} className="flex flex-col gap-4">
                    {column.map(photo => (
                      <GalleryCard key={photo._id} photo={photo} locale={locale} index={photoIndex(photo)} onOpen={openAt} />
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Attribution */}
          <FadeIn>
            <p className="mt-12 font-ui text-[0.6rem] uppercase tracking-[0.12em] text-white/25 text-center leading-relaxed">
              {locale === 'vi'
                ? 'Ảnh từ: Buddhistdoor Global · Lion\'s Roar · Radio Free Asia · VnExpress · FULCRUM/ISEAS · The Star Malaysia · Tea House Buddhistdoor'
                : 'Photos from: Buddhistdoor Global · Lion\'s Roar · Radio Free Asia · VnExpress · FULCRUM/ISEAS · The Star Malaysia · Tea House Buddhistdoor'}
              <br />
              {locale === 'vi' ? 'Chỉ sử dụng cho mục đích phi thương mại và giáo dục.' : 'Used for non-commercial, educational purposes only.'}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Captions]}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.97)' } }}
        captions={{ descriptionTextAlign: 'center', descriptionMaxLines: 4 }}
      />
    </div>
  )
}

function GalleryCard({ photo, locale, index, onOpen }: {
  photo: Photo; locale: string; index: number; onOpen: (i: number) => void
}) {
  const title = locale === 'vi' ? photo.title_vi : photo.title_en
  const caption = locale === 'vi' ? photo.caption_vi : photo.caption_en
  const theme = photo.theme[0]
  const aspectRatio = photo.width / photo.height

  return (
    <FadeIn>
      <button
        onClick={() => onOpen(index)}
        className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-lg"
        aria-label={`View: ${title}`}
      >
        {/* Image container preserving natural aspect ratio */}
        <div
          className="relative overflow-hidden rounded-lg bg-bark/20"
          style={{ paddingTop: `${(1 / aspectRatio) * 100}%` }}
        >
          <Image
            src={photo.imageUrl}
            alt={locale === 'vi' ? photo.alt_vi : photo.alt_en}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Expand icon */}
          <div className="absolute top-2 right-2 bg-black/60 rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>

          {/* Theme badge */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className={`font-ui text-[0.55rem] uppercase tracking-[0.12em] bg-black/60 px-2 py-0.5 rounded ${THEME_COLOR[theme] || 'text-saffron'}`}>
              {THEME_LABEL[theme]?.[locale as 'vi' | 'en'] ?? theme}
            </span>
          </div>

          {/* Info overlay */}
          <div className="absolute bottom-0 inset-x-0 p-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="font-display text-white text-sm leading-snug line-clamp-2 mb-1">{title}</p>
            {photo.location && (
              <p className="font-ui text-[0.58rem] text-white/50 uppercase tracking-wider">
                {photo.location} · {photo.year}
              </p>
            )}
          </div>
        </div>

        {/* Caption snippet — visible on mobile without hover */}
        {caption && (
          <p className="mt-2 px-0.5 font-body text-ash/50 text-xs leading-relaxed line-clamp-2 sm:hidden">
            {caption}
          </p>
        )}
      </button>
    </FadeIn>
  )
}
