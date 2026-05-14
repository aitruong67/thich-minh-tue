import { useTranslations, useLocale } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import { mockWaypoints } from '@/lib/mock'

function JourneyPage() {
  const t = useTranslations()
  const locale = useLocale()

  const lastWaypoint = mockWaypoints[mockWaypoints.length - 1]
  const totalKm = lastWaypoint.distanceFromStart ?? 2100

  return (
    <div className="pt-16">
      {/* Page header */}
      <header className="section-padding pb-12">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('page.journey.eyebrow')}</p>
            <h1 className="section-heading mb-8">{t('page.journey.heading')}</h1>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-12 pt-8 border-t border-bark">
              {[
                { value: `${totalKm.toLocaleString()} km`, label: t('page.journey.totalDistance') },
                { value: mockWaypoints.length.toString(), label: t('page.journey.waypoints') },
                { value: '7', label: t('page.journey.months') },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-4xl text-saffron">{value}</p>
                  <p className="font-ui text-label uppercase tracking-[0.12em] text-ash mt-1">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Waypoint timeline */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-4xl mx-auto">
          <ol className="relative" aria-label="Journey timeline">
            {/* Vertical line */}
            <div className="absolute left-[1.375rem] top-0 bottom-0 w-px bg-bark" aria-hidden="true" />

            {mockWaypoints.map((wp, i) => {
              const isFirst = i === 0
              const isLast = i === mockWaypoints.length - 1
              return (
                <FadeIn key={wp._id} delay={i * 0.06} as="li">
                  <div className="relative flex gap-8 pb-12 last:pb-0">
                    {/* Dot */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-full border-2 flex items-center justify-center ${
                        isFirst || isLast
                          ? 'border-saffron bg-ink'
                          : 'border-bark bg-ink'
                      }`}
                      aria-hidden="true"
                    >
                      <span className={`w-3 h-3 rounded-full ${isFirst || isLast ? 'bg-saffron' : 'bg-ash'}`} />
                    </div>

                    {/* Content */}
                    <article className="flex-1 pt-1 pb-4 border-b border-bark/40 last:border-b-0">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span className="font-ui text-label uppercase tracking-[0.12em] text-saffron">
                          {new Date(wp.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })}
                        </span>
                        {wp.distanceFromStart != null && (
                          <span className="font-ui text-label uppercase tracking-[0.12em] text-ash">
                            {wp.distanceFromStart.toLocaleString()} {t('page.journey.kmFromStart')}
                          </span>
                        )}
                        {isFirst && (
                          <span className="font-ui text-label uppercase tracking-[0.12em] text-saffron border border-saffron px-2 py-0.5">
                            {t('page.journey.departure')}
                          </span>
                        )}
                        {isLast && (
                          <span className="font-ui text-label uppercase tracking-[0.12em] text-saffron border border-saffron px-2 py-0.5">
                            {t('page.journey.arrival')}
                          </span>
                        )}
                      </div>
                      <h2 className="font-display text-2xl text-parchment leading-tight mb-3">
                        {locale === 'vi' ? wp.name_vi : wp.name_en}
                      </h2>
                      <p className="font-body text-ash leading-relaxed">
                        {locale === 'vi' ? wp.description_vi : wp.description_en}
                      </p>
                    </article>
                  </div>
                </FadeIn>
              )
            })}
          </ol>
        </div>
      </section>
    </div>
  )
}

export default function Page() {
  return <JourneyPage />
}
