import { useLocale } from 'next-intl'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'

// Update this manually when location changes
const CURRENT = {
  location_vi: 'Ấn Độ — Hướng về Bồ Đề Đạo Tràng',
  location_en: 'India — Toward Bodh Gaya',
  detail_vi: 'Sau hành trình qua Lào, Thái Lan, Malaysia và Sri Lanka, đoàn đã đặt chân đến Ấn Độ. Đích đến tiếp theo là Bồ Đề Đạo Tràng (Bodh Gaya) — nơi Đức Phật chứng ngộ.',
  detail_en: 'After walking through Laos, Thailand, Malaysia, and Sri Lanka, the group has arrived in India. The next destination is Bodh Gaya — the site of the Buddha\'s enlightenment.',
  lastUpdate: '2025-03-15',
  status_vi: 'Đang bộ hành',
  status_en: 'Walking',
  daysSince: '94', // days since Dec 12, 2024 departure
  countriesVisited: 5,
}

export default function PilgrimageTracker() {
  const locale = useLocale()

  const dateStr = new Date(CURRENT.lastUpdate).toLocaleDateString(
    locale === 'vi' ? 'vi-VN' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <section className="section-padding border-y border-bark/60 bg-ink">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Status */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <Lotus size={18} />
              <p className="section-label">
                {locale === 'vi' ? 'Vị trí hiện tại' : 'Current location'}
              </p>
              {/* Live pulse dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-ui text-[0.6rem] uppercase tracking-[0.12em] text-green-500">
                {locale === 'vi' ? CURRENT.status_vi : CURRENT.status_en}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl text-parchment leading-tight mb-4">
              {locale === 'vi' ? CURRENT.location_vi : CURRENT.location_en}
            </h2>
            <p className="font-body text-ash leading-relaxed mb-6">
              {locale === 'vi' ? CURRENT.detail_vi : CURRENT.detail_en}
            </p>
            <p className="font-ui text-[0.65rem] uppercase tracking-[0.12em] text-ash/50 flex items-center gap-2">
              <span className="w-4 h-px bg-bark inline-block" />
              {locale === 'vi' ? `Cập nhật lần cuối: ${dateStr}` : `Last updated: ${dateStr}`}
            </p>
          </FadeIn>

          {/* Stats + route */}
          <FadeIn delay={0.12}>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: CURRENT.daysSince, label: locale === 'vi' ? 'Ngày bộ hành' : 'Days walking' },
                { value: String(CURRENT.countriesVisited), label: locale === 'vi' ? 'Quốc gia' : 'Countries' },
                { value: '2,700+', label: locale === 'vi' ? 'km quốc tế' : 'km international' },
              ].map(({ value, label }) => (
                <div key={label} className="border border-bark p-4 text-center rounded">
                  <p className="font-display text-2xl sm:text-3xl text-saffron mb-1">{value}</p>
                  <p className="font-ui text-[0.6rem] uppercase tracking-[0.1em] text-ash">{label}</p>
                </div>
              ))}
            </div>

            {/* Mini route */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              {['🇻🇳', '🇱🇦', '🇹🇭', '🇲🇾', '🇱🇰', '🇮🇳'].map((flag, i, arr) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-xl">{flag}</span>
                  {i < arr.length - 1 && <span className="text-bark text-xs">→</span>}
                </span>
              ))}
              <span className="font-ui text-[0.6rem] text-ash uppercase tracking-wider ml-1">
                {locale === 'vi' ? '→ Nepal' : '→ Nepal'}
              </span>
            </div>

            <Link href={`/${locale}/journey`} className="btn-ghost">
              {locale === 'vi' ? 'Xem toàn bộ hành trình' : 'View full journey timeline'}
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
