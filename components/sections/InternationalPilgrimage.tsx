import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'

const countries = [
  { name_vi: 'Việt Nam',  name_en: 'Vietnam',    flag: '🇻🇳', note_en: 'Origin',                 note_vi: 'Xuất phát' },
  { name_vi: 'Lào',       name_en: 'Laos',        flag: '🇱🇦', note_en: 'Transit',                note_vi: 'Quá cảnh' },
  { name_vi: 'Thái Lan',  name_en: 'Thailand',    flag: '🇹🇭', note_en: 'Transit',                note_vi: 'Quá cảnh' },
  { name_vi: 'Malaysia',  name_en: 'Malaysia',    flag: '🇲🇾', note_en: 'Transit',                note_vi: 'Quá cảnh' },
  { name_vi: 'Sri Lanka', name_en: 'Sri Lanka',   flag: '🇱🇰', note_en: 'Sacred Buddhist isle',  note_vi: 'Đảo Phật giáo thiêng liêng' },
  { name_vi: 'Ấn Độ',    name_en: 'India',        flag: '🇮🇳', note_en: 'Buddha\'s homeland',    note_vi: 'Quê hương Đức Phật' },
  { name_vi: 'Nepal',     name_en: 'Nepal',        flag: '🇳🇵', note_en: 'Lumbini — Buddha\'s birthplace', note_vi: 'Lumbini — Nơi Đức Phật đản sinh' },
]

export default function InternationalPilgrimage() {
  const t = useTranslations('international')
  const locale = useLocale()

  return (
    <section
      aria-labelledby="international-heading"
      className="section-padding bg-pearl border-y border-bark"
      style={{  }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <FadeIn>
            <p className="section-label mb-4 flex items-center gap-2">
              <Lotus size={16} />
              {t('eyebrow')}
            </p>
            <h2 id="international-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-parchment leading-tight mb-6">
              {t('heading')}
            </h2>
            <p className="font-body text-ash leading-relaxed mb-8 text-base">
              {t('description')}
            </p>
            <Link href={`/${locale}/journey`} className="btn-primary">
              {t('cta')}
            </Link>
          </FadeIn>

          {/* Country route cards */}
          <FadeIn delay={0.15}>
            <p className="font-ui text-label uppercase tracking-[0.14em] text-ash/70 mb-5">
              {t('route')} · 12 Dec 2024
            </p>
            <ol className="space-y-2">
              {countries.map((country, i) => (
                <li
                  key={country.name_en}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg border transition-colors ${
                    i === 0
                      ? 'border-saffron/40 bg-saffron/10'
                      : i === countries.length - 1
                      ? 'border-ember/40 bg-ember/10'
                      : 'border-bark bg-white/80'
                  }`}
                >
                  <span className="text-xl flex-shrink-0 w-8 text-center">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <span className={`font-ui text-label uppercase tracking-[0.1em] block ${
                      i === 0 ? 'text-saffron' : i === countries.length - 1 ? 'text-ember' : 'text-parchment'
                    }`}>
                      {locale === 'vi' ? country.name_vi : country.name_en}
                    </span>
                    <span className="font-ui text-[0.6rem] uppercase tracking-[0.08em] text-ash/60 truncate block">
                      {locale === 'vi' ? country.note_vi : country.note_en}
                    </span>
                  </div>
                  {i < countries.length - 1 && (
                    <span className="text-bark text-xs flex-shrink-0">↓</span>
                  )}
                  {i === countries.length - 1 && (
                    <span className="font-ui text-[0.6rem] text-ember uppercase tracking-widest flex-shrink-0">Goal</span>
                  )}
                </li>
              ))}
            </ol>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
