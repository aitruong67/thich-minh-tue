import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'

const timelineItems = [
  { year: '1981',       titleKey: 'bio.t1.title', descKey: 'bio.t1.desc' },
  { year: '2015',       titleKey: 'bio.t2.title', descKey: 'bio.t2.desc' },
  { year: '2018–2023',  titleKey: 'bio.t3.title', descKey: 'bio.t3.desc' },
  { year: '2024',       titleKey: 'bio.t4.title', descKey: 'bio.t4.desc' },
  { year: 'Dec 2024 —', titleKey: 'bio.t5.title', descKey: 'bio.t5.desc' },
]

export default function BiographyTimeline() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section aria-labelledby="biography-heading" className="section-padding bg-pearl">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: intro */}
          <FadeIn className="lg:sticky lg:top-32">
            <p className="section-label mb-4 flex items-center gap-2">
              <Lotus size={16} />
              {t('biography.eyebrow')}
            </p>
            <h2 id="biography-heading" className="section-heading mb-5">
              {t('biography.heading')}
            </h2>
            <p className="font-body text-ash leading-relaxed mb-8 text-base">
              {t('biography.intro')}
            </p>
            <Link href={`/${locale}/biography`} className="btn-ghost">
              {t('biography.cta')}
            </Link>
          </FadeIn>

          {/* Right: timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-saffron/60 via-bark to-transparent hidden sm:block" aria-hidden="true" />

            <ol className="space-y-0" aria-label="Biography timeline">
              {timelineItems.map(({ year, titleKey, descKey }, i) => (
                <FadeIn key={year} delay={i * 0.08} as="li">
                  <div className="flex gap-4 sm:gap-6 pb-8">
                    {/* Dot */}
                    <div className="flex-shrink-0 flex flex-col items-center pt-1 hidden sm:flex">
                      <div className={`w-[1.4rem] h-[1.4rem] rounded-full border-2 flex items-center justify-center z-10 ${
                        i === timelineItems.length - 1
                          ? 'border-ember bg-ember/20'
                          : 'border-saffron bg-pearl'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          i === timelineItems.length - 1 ? 'bg-ember' : 'bg-saffron'
                        }`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-8 ${i < timelineItems.length - 1 ? 'border-b border-bark' : ''}`}>
                      <span className={`font-ui text-label uppercase tracking-[0.14em] mb-2 block ${
                        i === timelineItems.length - 1 ? 'text-ember' : 'text-saffron'
                      }`}>
                        {year}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-parchment mb-2 leading-snug">
                        {t(titleKey)}
                      </h3>
                      <p className="font-body text-ash text-sm sm:text-base leading-relaxed">
                        {t(descKey)}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
