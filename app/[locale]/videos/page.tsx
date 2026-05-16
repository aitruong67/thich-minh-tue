'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import CategoryTag from '@/components/ui/CategoryTag'
import { mockVideos } from '@/lib/mock'

type Category = 'all' | 'pilgrimage' | 'teaching' | 'interview' | 'news'
const categories: Category[] = ['all', 'pilgrimage', 'teaching', 'interview', 'news']

export default function VideosPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [active, setActive] = useState<Category>('all')

  const filtered = active === 'all' ? mockVideos : mockVideos.filter((v) => v.category === active)

  return (
    <div className="pt-16">
      {/* Page header */}
      <header className="section-padding pb-12">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('page.videos.eyebrow')}</p>
            <h1 className="section-heading">{t('page.videos.heading')}</h1>
          </FadeIn>

          {/* Category filter */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-3 mt-8" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`font-ui text-label uppercase tracking-[0.12em] px-4 py-2 border transition-colors ${
                    active === cat
                      ? 'border-saffron bg-saffron text-ink'
                      : 'border-bark text-ash hover:border-saffron hover:text-saffron'
                  }`}
                  aria-pressed={active === cat}
                >
                  {t(`page.videos.${cat}`)}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Video grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((video, i) => (
              <FadeIn key={video._id} delay={i * 0.05} as="article">
                <Link href={`/${locale}/videos/${video.slug}`} className="flex flex-col h-full border border-bark hover:border-saffron/40 transition-colors group">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-bark/30">
                    {(video.thumbnailUrl || video.youtubeId) ? (
                      <Image
                        src={video.thumbnailUrl ?? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={locale === 'vi' ? video.title_vi : video.title_en}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-bark/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-bark" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    )}
                    {/* Duration badge — only shown when available */}
                    {video.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/70 font-ui text-label text-white px-2 py-0.5">
                        {video.duration}
                      </span>
                    )}
                    {/* YouTube play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <svg className="w-14 h-14 text-white drop-shadow-lg" viewBox="0 0 68 48" fill="currentColor" aria-hidden="true">
                        <path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.8 0 34 0 34 0S12.2 0 7.4 1.7C4.6 2.5 2.4 4.8 1.5 7.7 0 12.5 0 24 0 24s0 11.5 1.5 16.3c.8 2.9 3 5.2 5.9 6C12.2 48 34 48 34 48s21.8 0 26.6-1.7c2.9-.8 5.1-3.1 5.9-6C68 35.5 68 24 68 24s0-11.5-1.5-16.3z"/>
                        <path d="M27 34l18-10-18-10v20z" fill="#5C0F0F"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryTag label={t(`page.videos.${video.category}`)} variant={video.category} />
                      {video.hasTranscript && (
                        <span className="font-ui text-label text-ash tracking-wide">
                          {t('page.videos.transcript')}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-xl text-parchment leading-snug mb-3 flex-1">
                      {locale === 'vi' ? video.title_vi : video.title_en}
                    </h2>
                    <p className="font-body text-ash text-sm leading-relaxed mb-4 line-clamp-3">
                      {locale === 'vi' ? video.description_vi : video.description_en}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-ui text-label uppercase tracking-[0.12em] text-ash">
                        {new Date(video.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </span>
                      <span className="font-ui text-label uppercase tracking-[0.12em] text-saffron group-hover:text-parchment transition-colors">
                        {t('page.videos.watch')} →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
