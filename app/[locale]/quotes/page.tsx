'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import QuoteCarousel from '@/components/ui/QuoteCarousel'
import CategoryTag from '@/components/ui/CategoryTag'
import { mockQuotes } from '@/lib/mock'
import type { Quote } from '@/lib/types'

type Theme = 'all' | Quote['theme']
const themes: Theme[] = ['all', 'compassion', 'simplicity', 'impermanence', 'walking', 'freedom']

export default function QuotesPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [activeTheme, setActiveTheme] = useState<Theme>('all')

  const filtered = activeTheme === 'all'
    ? mockQuotes
    : mockQuotes.filter((q) => q.theme === activeTheme)

  return (
    <div className="pt-16">
      {/* Page header */}
      <header className="section-padding pb-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('page.quotes.eyebrow')}</p>
            <h1 className="section-heading">{t('page.quotes.heading')}</h1>
          </FadeIn>
        </div>
      </header>

      {/* Carousel */}
      <QuoteCarousel quotes={mockQuotes.slice(0, 7)} />

      {/* Filter + grid */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Filter bar */}
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-12" role="group" aria-label="Filter by theme">
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
                  {t(`page.quotes.${theme}`)}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Quote cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((quote, i) => {
              const text = locale === 'vi' ? quote.text_vi : quote.text_en
              const shareText = encodeURIComponent(`"${text}" — Minh Tuệ`)
              const shareUrl = encodeURIComponent('https://minhtuedhutanga.com')
              return (
                <FadeIn key={quote._id} delay={i * 0.04} as="article">
                  <blockquote className="h-full border border-bark p-8 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-display text-4xl text-saffron/30 leading-none">&ldquo;</span>
                      <CategoryTag label={t(`page.quotes.${quote.theme}`)} variant={quote.theme} />
                    </div>
                    <p className="font-display text-xl text-parchment italic leading-relaxed flex-1 mb-6">
                      {text}
                    </p>
                    <footer className="flex items-center justify-between mt-auto">
                      {quote.source ? (
                        <cite className="font-ui text-label uppercase tracking-[0.12em] text-ash not-italic">
                          — {quote.source}
                        </cite>
                      ) : <span />}
                      <div className="flex items-center gap-2">
                        <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                          target="_blank" rel="noopener noreferrer" aria-label="Share on X"
                          className="p-1.5 text-ash/40 hover:text-saffron transition-colors">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.918l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`}
                          target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
                          className="p-1.5 text-ash/40 hover:text-saffron transition-colors">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      </div>
                    </footer>
                  </blockquote>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
