import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'

const provinces = [
  'Kiên Giang', 'Tiền Giang', 'TP. Hồ Chí Minh', 'Bình Thuận',
  'Khánh Hòa', 'Bình Định', 'Quảng Ngãi', 'Đà Nẵng',
  'Thừa Thiên Huế', 'Hà Tĩnh', 'Nghệ An', 'Hà Nội',
]

export default function MapTeaser() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section aria-labelledby="map-teaser-heading" className="section-padding bg-pearl">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <FadeIn>
            <p className="section-label mb-4 flex items-center gap-2">
              <Lotus size={16} />
              {t('map.eyebrow')}
            </p>
            <h2 id="map-teaser-heading" className="section-heading mb-5">
              {t('map.heading')}
            </h2>
            <p className="font-body text-ash leading-relaxed mb-3 text-base">
              {t('map.description')}
            </p>
            <p className="font-ui text-label uppercase tracking-[0.12em] text-saffron mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-saffron inline-block" />
              {t('map.distance')}
            </p>
            <Link href={`/${locale}/journey`} className="btn-primary">
              {t('map.cta')}
            </Link>
          </FadeIn>

          {/* Route visualization */}
          <FadeIn delay={0.15}>
            <div className="bg-white rounded-xl border border-bark shadow-card overflow-hidden">
              <div className="px-5 py-4 border-b border-bark bg-pearl">
                <p className="font-ui text-label uppercase tracking-[0.12em] text-ash">
                  {t('map.routeLabel')}
                </p>
              </div>
              <div className="p-5 relative">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#8B1A1A" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                <ol className="relative space-y-1" aria-label={t('map.waypointsList')}>
                  {provinces.map((province, i) => {
                    const isFirst = i === 0
                    const isLast = i === provinces.length - 1
                    return (
                      <li key={province} className="flex items-center gap-3 group">
                        <div className="flex-shrink-0 flex items-center justify-center w-5">
                          {isFirst || isLast ? (
                            <div className={`w-3 h-3 rounded-full border-2 ${isFirst ? 'border-saffron bg-saffron/30' : 'border-ember bg-ember/30'}`} />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-bark" />
                          )}
                        </div>
                        <span className={`font-ui text-label uppercase tracking-[0.08em] flex-1 py-1.5 ${
                          isFirst ? 'text-saffron font-medium' : isLast ? 'text-ember font-medium' : 'text-ash'
                        }`}>
                          {province}
                        </span>
                        {(isFirst || isLast) && (
                          <span className={`font-ui text-[0.6rem] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            isFirst ? 'bg-saffron/10 text-saffron' : 'bg-ember/10 text-ember'
                          }`}>
                            {isFirst ? 'Start' : 'End'}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
