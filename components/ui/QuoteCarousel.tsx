'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLocale } from 'next-intl'
import type { Quote } from '@/lib/types'

interface QuoteCarouselProps {
  quotes: Quote[]
}

export default function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % quotes.length)
  }, [quotes.length])

  useEffect(() => {
    if (prefersReduced) return
    const interval = setInterval(advance, 5000)
    return () => clearInterval(interval)
  }, [advance, prefersReduced])

  const current = quotes[activeIndex]

  return (
    <section
      aria-label="Quote carousel"
      className="section-padding bg-pearl border-y border-bark"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current._id}
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReduced ? {} : { opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-display text-2xl md:text-3xl text-parchment italic leading-relaxed mb-6 text-balance px-4">
                &ldquo;{locale === 'vi' ? current.text_vi : current.text_en}&rdquo;
              </p>
              {current.source && (
                <footer>
                  <cite className="font-ui text-label uppercase tracking-[0.12em] text-ash not-italic">
                    — {current.source}
                  </cite>
                </footer>
              )}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Quote navigation">
          {quotes.map((q, i) => (
            <button
              key={q._id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Quote ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-saffron w-4' : 'bg-ash hover:bg-parchment/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
