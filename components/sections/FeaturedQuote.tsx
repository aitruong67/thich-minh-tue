import { useLocale } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'
import type { Quote } from '@/lib/types'

interface FeaturedQuoteProps {
  quote: Quote
}

export default function FeaturedQuote({ quote }: FeaturedQuoteProps) {
  const locale = useLocale()

  return (
    <section
      aria-label="Featured quote"
      className="section-padding"
      style={{ background: 'linear-gradient(135deg, #FDF3E3 0%, #FEF8EE 100%)' }}
    >
      <FadeIn>
        <div className="max-w-4xl mx-auto text-center">
          {/* Lotus icon */}
          <div className="flex justify-center mb-8 opacity-60">
            <Lotus size={40} />
          </div>

          <blockquote>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl text-parchment italic leading-relaxed mb-8 text-balance">
              &ldquo;{locale === 'vi' ? quote.text_vi : quote.text_en}&rdquo;
            </p>
            {quote.source && (
              <footer>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="w-12 h-px bg-ember/50" />
                  <cite className="font-ui text-label uppercase tracking-[0.16em] text-ember not-italic">
                    {quote.source}
                  </cite>
                  <div className="w-12 h-px bg-ember/50" />
                </div>
              </footer>
            )}
          </blockquote>
        </div>
      </FadeIn>
    </section>
  )
}
