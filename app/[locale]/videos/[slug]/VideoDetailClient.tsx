'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import type { Video } from '@/lib/types'

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label_en: string; label_vi: string }> = {
  pilgrimage: { bg: 'bg-amber-100',  text: 'text-amber-800',  label_en: 'Pilgrimage', label_vi: 'Hành hương' },
  teaching:   { bg: 'bg-green-100',  text: 'text-green-800',  label_en: 'Teaching',   label_vi: 'Giáo pháp'  },
  interview:  { bg: 'bg-blue-100',   text: 'text-blue-800',   label_en: 'Interview',  label_vi: 'Phỏng vấn'  },
  news:       { bg: 'bg-purple-100', text: 'text-purple-800', label_en: 'News',       label_vi: 'Tin tức'    },
}

interface Props {
  video: Video
  related: Video[]
  locale: string
}

export default function VideoDetailClient({ video, related, locale }: Props) {
  const t = useTranslations()
  const [playing, setPlaying] = useState(false)

  const title = locale === 'vi' ? video.title_vi : video.title_en
  const description = locale === 'vi' ? video.description_vi : video.description_en
  const cat = CATEGORY_STYLES[video.category] ?? CATEGORY_STYLES.news

  const dateStr = new Date(video.date).toLocaleDateString(
    locale === 'vi' ? 'vi-VN' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Back bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 md:px-12 lg:px-24 py-4">
        <Link
          href={`/${locale}/videos`}
          className="inline-flex items-center gap-2 font-ui text-label uppercase tracking-[0.12em] text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {locale === 'vi' ? 'Quay lại video' : 'Back to videos'}
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10">
        <FadeIn>
          {/* Player */}
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-8 shadow-xl">
            {video.videoUrl ? (
              <video
                src={video.videoUrl}
                controls
                className="absolute inset-0 w-full h-full"
                poster={video.thumbnailUrl}
                preload="metadata"
              />
            ) : video.youtubeId && playing ? (
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
                {video.thumbnailUrl && (
                  <Image
                    src={video.thumbnailUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
                  <div className="bg-red-600 rounded-full p-5 group-hover:scale-110 transition-transform shadow-2xl">
                    <svg className="w-10 h-10 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`font-ui text-[0.65rem] uppercase tracking-[0.12em] px-3 py-1 rounded-full font-semibold ${cat.bg} ${cat.text}`}>
              {locale === 'vi' ? cat.label_vi : cat.label_en}
            </span>
            <time dateTime={video.date} className="font-ui text-label uppercase tracking-[0.12em] text-gray-500">
              {dateStr}
            </time>
            {video.duration && (
              <span className="font-ui text-label uppercase tracking-[0.12em] text-gray-400">{video.duration}</span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-tight mb-5">
            {title}
          </h1>

          <p className="font-body text-gray-600 leading-relaxed mb-8 max-w-3xl text-base sm:text-lg">
            {description}
          </p>

          {video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {video.tags.map(tag => (
                <span key={tag} className="font-ui text-[0.65rem] uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {video.youtubeId && (
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white font-ui text-label uppercase tracking-[0.12em] rounded hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {locale === 'vi' ? 'Xem trên YouTube' : 'Watch on YouTube'}
            </a>
          )}
        </FadeIn>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-6xl mx-auto">
            <p className="font-ui text-label uppercase tracking-[0.14em] text-gray-500 mb-8">
              {locale === 'vi' ? 'Video liên quan' : 'Related videos'}
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(v => (
                <FadeIn key={v._id} as="article">
                  <Link href={`/${locale}/videos/${v.slug}`} className="group flex flex-col bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={v.thumbnailUrl ?? (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : '')}
                        alt={locale === 'vi' ? v.title_vi : v.title_en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-gray-900 text-sm leading-snug group-hover:text-amber-700 transition-colors">
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
