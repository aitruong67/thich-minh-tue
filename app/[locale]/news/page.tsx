import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { mockNews } from '@/lib/mock'
import type { NewsArticle } from '@/lib/types'

function ArticleWrapper({ article, locale, children }: { article: NewsArticle; locale: string; children: React.ReactNode }) {
  const hasBody = !!(article.body_vi || article.body_en)
  if (hasBody) {
    return (
      <Link href={`/${locale}/news/${article.slug}`} className="block">
        {children}
      </Link>
    )
  }
  if (article.sourceUrl) {
    return (
      <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="block">
        {children}
      </a>
    )
  }
  return <>{children}</>
}

function NewsPage() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="pt-16">
      {/* Page header */}
      <header className="section-padding pb-12">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('page.news.eyebrow')}</p>
            <h1 className="section-heading">{t('page.news.heading')}</h1>
          </FadeIn>
        </div>
      </header>

      {/* Article grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Featured article */}
          <FadeIn>
            <ArticleWrapper article={mockNews[0]} locale={locale}>
              <article className="grid lg:grid-cols-2 gap-0 border border-bark mb-8 group">
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <Image
                    src={mockNews[0].coverImage}
                    alt={mockNews[0].title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <time
                        dateTime={mockNews[0].date}
                        className="font-ui text-label uppercase tracking-[0.12em] text-ash"
                      >
                        {new Date(mockNews[0].date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </time>
                      <span className="font-ui text-label uppercase tracking-[0.12em] text-ash">
                        {mockNews[0].readingTime} {t('page.news.minRead')}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl text-parchment leading-tight mb-4">
                      {mockNews[0].title}
                    </h2>
                    <p className="font-body text-ash leading-relaxed mb-6">
                      {mockNews[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-label uppercase tracking-[0.12em] text-ash">
                      {t('page.news.by')} {mockNews[0].author}
                    </span>
                    <span className="font-ui text-label uppercase tracking-[0.12em] text-saffron group-hover:text-parchment transition-colors">
                      {t('page.news.readMore')} →
                    </span>
                  </div>
                </div>
              </article>
            </ArticleWrapper>
          </FadeIn>

          {/* Remaining articles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockNews.slice(1).map((article, i) => (
              <FadeIn key={article._id} delay={i * 0.06} as="article">
                <ArticleWrapper article={article} locale={locale}>
                  <div className="flex flex-col h-full border border-bark hover:border-saffron/40 transition-colors group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <time
                          dateTime={article.date}
                          className="font-ui text-label uppercase tracking-[0.12em] text-ash"
                        >
                          {new Date(article.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </time>
                        <span className="text-bark">·</span>
                        <span className="font-ui text-label uppercase tracking-[0.12em] text-ash">
                          {article.readingTime} {t('page.news.minRead')}
                        </span>
                      </div>
                      <h2 className="font-display text-xl text-parchment leading-snug mb-3 flex-1">
                        {article.title}
                      </h2>
                      <p className="font-body text-ash text-sm leading-relaxed mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-bark">
                        <span className="font-ui text-label uppercase tracking-[0.12em] text-ash">
                          {t('page.news.by')} {article.author}
                        </span>
                        <span className="font-ui text-label uppercase tracking-[0.12em] text-saffron group-hover:text-parchment transition-colors">
                          {t('page.news.readMore')} →
                        </span>
                      </div>
                    </div>
                  </div>
                </ArticleWrapper>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Page() {
  return <NewsPage />
}
