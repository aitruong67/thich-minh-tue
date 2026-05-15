'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { NewsArticle } from '@/lib/types'
import FadeIn from '@/components/ui/FadeIn'

interface Props {
  article: NewsArticle
  related: NewsArticle[]
  locale: string
}

function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-ui text-label uppercase tracking-[0.12em] text-gray-500">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Share on X"
        className="p-2 border border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900 transition-colors rounded"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.918l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="p-2 border border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900 transition-colors rounded"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="p-2 border border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900 transition-colors rounded"
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
    </div>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-gray-200">
      <div className="h-full bg-amber-500 transition-all duration-75" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default function ArticleDetail({ article, related, locale }: Props) {
  const t = useTranslations('page.news')
  const body = locale === 'vi' ? (article.body_vi || article.body_en) : (article.body_en || article.body_vi)
  const paragraphs = body.split('\n\n').filter(Boolean)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const dateStr = new Date(article.date).toLocaleDateString(
    locale === 'vi' ? 'vi-VN' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <>
      <ReadingProgress />

      <div className="pt-16 bg-white min-h-screen">

        {/* Back link */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 md:px-12 lg:px-24 py-4">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 font-ui text-label uppercase tracking-[0.12em] text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {locale === 'vi' ? 'Quay lại tin tức' : 'Back to news'}
          </Link>
        </div>

        {/* Hero image */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12">
          <FadeIn>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-5 text-gray-500">
              <time dateTime={article.date} className="font-ui text-label uppercase tracking-[0.12em]">
                {dateStr}
              </time>
              <span className="text-gray-300">·</span>
              <span className="font-ui text-label uppercase tracking-[0.12em]">
                {t('by')} {article.author}
              </span>
              <span className="text-gray-300">·</span>
              <span className="font-ui text-label uppercase tracking-[0.12em]">
                {article.readingTime} {t('minRead')}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="font-body text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-amber-400 pl-5 italic bg-amber-50 py-4 pr-4 rounded-r">
              {article.excerpt}
            </p>

            {/* Share */}
            <div className="mb-8">
              <ShareButtons title={article.title} url={pageUrl} />
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 mb-10" />

            {/* Body */}
            <div>
              {paragraphs.map((p, i) => (
                <p key={i} className="font-body text-gray-700 leading-[1.9] mb-6 text-base sm:text-lg">
                  {p}
                </p>
              ))}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
                {article.tags.map(tag => (
                  <span key={tag}
                    className="font-ui text-[0.65rem] uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Source link */}
            {article.sourceUrl && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-ui text-label uppercase tracking-[0.12em] text-amber-700 hover:text-gray-900 transition-colors"
                >
                  {locale === 'vi' ? 'Xem bài gốc' : 'Read original article'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Share bottom */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <ShareButtons title={article.title} url={pageUrl} />
            </div>
          </FadeIn>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-6xl mx-auto">
              <p className="font-ui text-label uppercase tracking-[0.14em] text-gray-500 mb-8">
                {locale === 'vi' ? 'Bài viết liên quan' : 'Related articles'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(rel => (
                  <FadeIn key={rel._id} as="article">
                    <Link
                      href={`/${locale}/news/${rel.slug}`}
                      className="group flex flex-col bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all overflow-hidden h-full"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <time dateTime={rel.date} className="font-ui text-label uppercase tracking-[0.1em] text-gray-400 mb-2 block">
                          {new Date(rel.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </time>
                        <h3 className="font-display text-gray-900 text-base leading-snug group-hover:text-amber-700 transition-colors">
                          {rel.title}
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
    </>
  )
}
