import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'

const stats = [
  { value: '120+', labelKey: 'media.videos', href: '/videos',  icon: '▶' },
  { value: '800+', labelKey: 'media.photos', href: '/gallery', icon: '◻' },
  { value: '200+', labelKey: 'media.quotes', href: '/quotes',  icon: '❝' },
  { value: '50+',  labelKey: 'media.articles', href: '/news',  icon: '✦' },
]

export default function MediaArchive() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section aria-labelledby="media-heading" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="section-label mb-4 justify-center flex items-center gap-2">
            <Lotus size={16} />
            {t('media.eyebrow')}
          </p>
          <h2 id="media-heading" className="section-heading">{t('media.heading')}</h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, labelKey, href, icon }, i) => (
            <FadeIn key={labelKey} delay={i * 0.08}>
              <Link
                href={`/${locale}${href}`}
                className="group flex flex-col items-center justify-center py-10 px-4 bg-pearl border border-bark rounded-xl
                           transition-all duration-300 hover:border-saffron hover:shadow-card-hover hover:-translate-y-1"
              >
                <span className="text-2xl text-bark group-hover:text-saffron transition-colors mb-3 font-display">
                  {icon}
                </span>
                <p className="font-display text-4xl sm:text-5xl text-saffron group-hover:text-crimson transition-colors mb-2 leading-none">
                  {value}
                </p>
                <p className="font-ui text-label uppercase tracking-[0.1em] text-ash group-hover:text-saffron transition-colors text-center leading-tight">
                  {t(labelKey)}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
