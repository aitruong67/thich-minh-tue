'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
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

const THEME_ACCENT: Record<string, string> = {
  pilgrimage:    'bg-amber-500',
  community:     'bg-green-600',
  portrait:      'bg-orange-600',
  international: 'bg-blue-600',
  media:         'bg-purple-600',
}

const THEME_TEXT: Record<string, string> = {
  pilgrimage:    'text-amber-700',
  community:     'text-green-700',
  portrait:      'text-orange-700',
  international: 'text-blue-700',
  media:         'text-purple-700',
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

  const openAt = (i: number) => { setLightboxIndex(i); setLightboxOpen(true) }
  const photoIndex = (photo: Photo) => filtered.findIndex(p => p._id === photo._id)
  const col = (n: number, total: number) => filtered.filter((_, i) => i % total === n)

  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* Header — light */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="font-ui text-label uppercase tracking-[0.14em] text-amber-600 mb-3">
              {locale === 'vi' ? 'Hình ảnh lưu trữ' : 'Photo archive'}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-4">
              {locale === 'vi' ? 'Những Khoảnh Khắc Trên Con Đường' : 'Moments Along the Road'}
            </h1>
            <p className="font-body text-gray-600 max-w-2xl leading-relaxed">
              {locale === 'vi'
                ? 'Bộ sưu tập hình ảnh từ các nguồn báo chí quốc tế — ghi lại hành trình lịch sử của Thầy Minh Tuệ qua Việt Nam và nhiều quốc gia trên thế giới.'
                : 'A curated collection from international press sources — documenting the historic pilgrimage of Minh Tuệ across Vietnam and the world.'}
            </p>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mt-8" role="group" aria-label="Filter by theme">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`font-ui text-label uppercase tracking-[0.1em] px-4 py-2 rounded-full border transition-all duration-200 ${
                    filter === f
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
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

      {/* Count bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 md:px-12 lg:px-24 py-3">
        <div className="max-w-6xl mx-auto">
          <p className="font-ui text-[0.65rem] uppercase tracking-[0.12em] text-gray-500">
            {filtered.length} {locale === 'vi' ? 'hình ảnh' : 'photos'}
            {filter !== 'all' && ` · ${FILTER_LABELS[filter][locale as 'vi' | 'en']}`}
          </p>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-10">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center font-body text-gray-500 py-24">
              {locale === 'vi' ? 'Không có ảnh.' : 'No photos found.'}
            </p>
          ) : (
            <>
              {/* 2-col mobile */}
              <div className="grid grid-cols-2 gap-4 md:hidden">
                {[col(0, 2), col(1, 2)].map((column, ci) => (
                  <div key={ci} className="flex flex-col gap-4">
                    {column.map(photo => (
                      <GalleryCard key={photo._id} photo={photo} locale={locale}
                        index={photoIndex(photo)} onOpen={openAt} />
                    ))}
                  </div>
                ))}
              </div>

              {/* 3-col desktop */}
              <div className="hidden md:grid grid-cols-3 gap-6">
                {[col(0, 3), col(1, 3), col(2, 3)].map((column, ci) => (
                  <div key={ci} className="flex flex-col gap-6">
                    {column.map(photo => (
                      <GalleryCard key={photo._id} photo={photo} locale={locale}
                        index={photoIndex(photo)} onOpen={openAt} />
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Attribution */}
          <p className="mt-14 font-ui text-[0.6rem] uppercase tracking-[0.12em] text-gray-400 text-center leading-relaxed">
            {locale === 'vi'
              ? 'Ảnh từ: Buddhistdoor Global · Lion\'s Roar · Radio Free Asia · VnExpress · FULCRUM/ISEAS · The Star Malaysia · Tea House Buddhistdoor'
              : 'Photos from: Buddhistdoor Global · Lion\'s Roar · Radio Free Asia · VnExpress · FULCRUM/ISEAS · The Star Malaysia · Tea House Buddhistdoor'}
            <br />
            <span className="text-gray-300">
              {locale === 'vi' ? 'Chỉ sử dụng cho mục đích phi thương mại và giáo dục.' : 'Used for non-commercial, educational purposes only.'}
            </span>
          </p>
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
    <button
      onClick={() => onOpen(index)}
      className="group w-full text-left bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      aria-label={`View: ${title}`}
    >
        {/* Image */}
        <div
          className="relative overflow-hidden bg-gray-100"
          style={{ paddingTop: `${(1 / aspectRatio) * 100}%` }}
        >
          <Image
            src={photo.imageUrl}
            alt={locale === 'vi' ? photo.alt_vi : photo.alt_en}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
          />
          {/* Subtle expand indicator on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Coloured theme bar */}
        <div className={`h-0.5 w-full ${THEME_ACCENT[theme] || 'bg-amber-500'}`} />

        {/* Text — always visible */}
        <div className="p-3 sm:p-4">
          {/* Theme + location row */}
          <div className="flex items-center justify-between mb-1.5">
            <span className={`font-ui text-[0.6rem] uppercase tracking-[0.12em] font-semibold ${THEME_TEXT[theme] || 'text-amber-700'}`}>
              {THEME_LABEL[theme]?.[locale as 'vi' | 'en'] ?? theme}
            </span>
            {photo.year && (
              <span className="font-ui text-[0.6rem] text-gray-400 uppercase tracking-wider">
                {photo.year}
              </span>
            )}
          </div>

          {/* Title */}
          <p className="font-display text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 mb-1">
            {title}
          </p>

          {/* Location */}
          {photo.location && (
            <p className="font-ui text-[0.6rem] text-gray-400 uppercase tracking-wider">
              {photo.location}
            </p>
          )}

          {/* Caption — on larger cards only */}
          {caption && (
            <p className="mt-2 font-body text-gray-500 text-xs leading-relaxed line-clamp-2 border-t border-gray-100 pt-2">
              {caption}
            </p>
          )}
        </div>
      </button>
  )
}
