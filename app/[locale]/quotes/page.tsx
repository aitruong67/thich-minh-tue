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
            {filtered.map((quote, i) => (
              <FadeIn key={quote._id} delay={i * 0.04} as="article">
                <blockquote className="h-full border border-bark p-8 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-display text-4xl text-saffron/30 leading-none">&ldquo;</span>
                    <CategoryTag label={t(`page.quotes.${quote.theme}`)} variant={quote.theme} />
                  </div>
                  <p className="font-display text-xl text-parchment italic leading-relaxed flex-1 mb-6">
                    {locale === 'vi' ? quote.text_vi : quote.text_en}
                  </p>
                  {quote.source && (
                    <footer>
                      <cite className="font-ui text-label uppercase tracking-[0.12em] text-ash not-italic">
                        — {quote.source}
                      </cite>
                    </footer>
                  )}
                </blockquote>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
