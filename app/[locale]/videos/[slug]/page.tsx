'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, use } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { mockVideos } from '@/lib/mock'
import FadeIn from '@/components/ui/FadeIn'
import CategoryTag from '@/components/ui/CategoryTag'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export default function VideoDetailPage({ params }: Props) {
  const { locale, slug } = use(params)
  const t = useTranslations()
  const [playing, setPlaying] = useState(false)

  const video = mockVideos.find(v => v.slug === slug)
  if (!video) notFound()

  const title = locale === 'vi' ? video.title_vi : video.title_en
  const description = locale === 'vi' ? video.description_vi : video.description_en

  const related = mockVideos
    .filter(v => v._id !== video._id && v.category === video.category)
    .slice(0, 3)

  const dateStr = new Date(video.date).toLocaleDateString(
    locale === 'vi' ? 'vi-VN' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <div className="pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10">
        {/* Back */}
        <Link
          href={`/${locale}/videos`}
          className="inline-flex items-center gap-2 font-ui text-label uppercase tracking-[0.12em] text-ash hover:text-saffron transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {locale === 'vi' ? 'Quay lại video' : 'Back to videos'}
        </Link>

        <FadeIn>
          {/* Video player */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-8 shadow-2xl">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full group"
                aria-label={`${t('page.videos.watch')}: ${title}`}
              >
                <Image
                  src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={title}
                  fill
                  className="object-cover group-hover:opacity-80 transition-opacity"
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                  <div className="bg-crimson/90 rounded-full p-5 group-hover:scale-110 transition-transform shadow-xl">
                    <svg className="w-10 h-10 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Meta + title */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <CategoryTag label={t(`page.videos.${video.category}`)} variant={video.category} />
            <time dateTime={video.date} className="font-ui text-label uppercase tracking-[0.12em] text-ash">
              {dateStr}
            </time>
            {video.duration && (
              <span className="font-ui text-label uppercase tracking-[0.12em] text-ash">{video.duration}</span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-parchment leading-tight mb-6">
            {title}
          </h1>

          <p className="font-body text-ash leading-relaxed mb-8 max-w-3xl">
            {description}
          </p>

          {/* Tags */}
          {video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {video.tags.map(tag => (
                <span key={tag} className="font-ui text-[0.65rem] uppercase tracking-[0.12em] px-3 py-1 border border-bark text-ash">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* YouTube link */}
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            {locale === 'vi' ? 'Xem trên YouTube' : 'Watch on YouTube'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </FadeIn>
      </div>

      {/* Related videos */}
      {related.length > 0 && (
        <section className="border-t border-bark bg-pearl px-4 sm:px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-6xl mx-auto">
            <p className="section-label mb-8">
              {locale === 'vi' ? 'Video liên quan' : 'Related videos'}
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(v => (
                <FadeIn key={v._id} as="article">
                  <Link href={`/${locale}/videos/${v.slug}`} className="group flex flex-col border border-bark hover:border-saffron/40 transition-colors">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={v.thumbnailUrl || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                        alt={locale === 'vi' ? v.title_vi : v.title_en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <div className="bg-crimson/80 rounded-full p-3">
                          <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-base text-parchment leading-snug group-hover:text-saffron transition-colors">
                        {locale === 'vi' ? v.title_vi : v.title_en}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
