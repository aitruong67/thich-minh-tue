'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'

const PETITION_URL = 'https://www.change.org/TMTWalk4Peace'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const CONTENT = {
  vi: {
    urgentBadge: '⚠ Kêu Gọi Khẩn Cấp',
    heading: 'Bảo Vệ Quyền Bộ Hành Của Thầy Minh Tuệ',
    subheading: 'Một hành giả chân trần. Không điện thoại. Không tài sản. Không âm mưu. Chỉ là một con người bộ hành trong hòa bình.',
    situation: 'Tình Hình Hiện Tại',
    situationText: 'Tháng 6/2024, chính quyền Việt Nam cưỡng chế chấm dứt hành trình bộ hành của Thầy sau khi hàng triệu người theo dõi. Tháng 12/2024, Thầy tiếp tục cuộc hành trình quốc tế — nhưng Thái Lan đột ngột thu hồi gia hạn visa, buộc đoàn phải đi 2.500 km bằng xe buýt trong 48 giờ. Myanmar từ chối cho nhập cảnh. Mỗi bước Thầy đi đều đối mặt với rào cản của quyền lực nhà nước.',
    why: 'Tại Sao Điều Này Quan Trọng',
    whyPoints: [
      { icon: '🧘', title: 'Triết Lý Sống Thật', text: 'Thầy Minh Tuệ thực hành Dhutanga — truyền thống tu khổ hạnh Phật giáo 26 thế kỷ. Không tiền bạc, không tài sản, không quyền lực. Chỉ bước đi, khất thực, và sống trong khoảnh khắc hiện tại. Sự giản dị tuyệt đối này đã chạm đến hàng triệu trái tim trong thời đại vật chất hóa.' },
      { icon: '🌍', title: 'Tự Do Tôn Giáo Là Quyền Cơ Bản', text: 'Hành trình của Thầy không phải là phong trào chính trị. Đây là thực hành tâm linh cá nhân, hiền hòa và không gây hại. Bất kỳ chính phủ nào ngăn cản hành trình này đều vi phạm quyền tự do tôn giáo được bảo đảm bởi luật quốc tế.' },
      { icon: '💫', title: 'Truyền Cảm Hứng Toàn Cầu', text: 'Với 90 triệu lượt tìm kiếm vào tháng 5/2024 và 10-25 triệu lượt tìm kiếm hàng tháng, Thầy Minh Tuệ đã trở thành biểu tượng của lối sống chân thật trong thời đại nhiễu loạn. Hàng triệu người trên toàn thế giới cần thấy rằng sự thật vẫn có thể tồn tại.' },
    ],
    quote: '"Hãy để Người như một con nai hoang — tự do rong ruổi, thuần khiết, và trung thành với con đường thiêng liêng của Người."',
    quoteSource: '— Kiến nghị Change.org · 1.244+ chữ ký từ 33 quốc gia',
    statsTitle: 'Sức Mạnh Của Sự Ủng Hộ Toàn Cầu',
    stats: [
      { value: 1244, suffix: '+', label: 'Chữ ký kiến nghị' },
      { value: 33, suffix: '', label: 'Quốc gia ký tên' },
      { value: 90, suffix: 'M', label: 'Lượt tìm kiếm tháng 5/2024' },
      { value: 10, suffix: '+', label: 'Quốc gia bộ hành qua' },
    ],
    ctaTitle: 'Ký Kiến Nghị Ngay Hôm Nay',
    ctaBody: 'Kiến nghị "Global Call for Compassion: Let Thich Minh Tue Walk in Peace!" kêu gọi các chính phủ thế giới cấp visa tôn giáo và cho phép đoàn hành hương tiếp tục hành trình đến Ấn Độ một cách an toàn.',
    ctaButton: 'Ký Kiến Nghị Trên Change.org',
    ctaShare: 'Chia Sẻ Kiến Nghị',
    disclaimer: 'Kiến nghị được tạo ngày 27/3/2025 bởi EyeDrT trên Change.org. Đã xác minh 1.244 chữ ký.',
  },
  en: {
    urgentBadge: '⚠ Urgent Call to Action',
    heading: 'Protect Minh Tuệ\'s Right to Walk in Peace',
    subheading: 'A barefoot pilgrim. No phone. No possessions. No agenda. Just a human being walking in peace.',
    situation: 'The Current Situation',
    situationText: 'In June 2024, Vietnamese authorities forcibly ended his walk after millions followed him. In December 2024, he resumed internationally — but Thailand abruptly revoked visa extensions, forcing the group to travel 2,500 km by bus in 48 hours. Myanmar denied entry. Every step he takes is met with government barriers.',
    why: 'Why This Matters',
    whyPoints: [
      { icon: '🧘', title: 'A Philosophy of Radical Authenticity', text: 'Minh Tuệ practices Dhutanga — a 26-century-old Buddhist ascetic discipline. No money, no possessions, no power. Just walking, collecting alms, and living fully in the present moment. This absolute simplicity has touched millions of hearts in an age of material excess.' },
      { icon: '🌍', title: 'Religious Freedom Is a Basic Right', text: 'His pilgrimage is not a political movement. It is a peaceful, individual spiritual practice that harms no one. Any government that blocks this journey violates the right to religious freedom guaranteed by international law.' },
      { icon: '💫', title: 'A Global Source of Inspiration', text: 'With 90 million searches in May 2024 and 10–25 million monthly searches ongoing, Minh Tuệ has become a symbol of authentic living in a chaotic age. Millions worldwide need to see that truth can still exist freely.' },
    ],
    quote: '"Let him be a wild deer as he longs for — roaming free, untamed, and true to his sacred path."',
    quoteSource: '— Change.org Petition · 1,244+ signatures from 33 countries',
    statsTitle: 'The Power of Global Support',
    stats: [
      { value: 1244, suffix: '+', label: 'Petition signatures' },
      { value: 33, suffix: '', label: 'Countries represented' },
      { value: 90, suffix: 'M', label: 'Searches in May 2024' },
      { value: 10, suffix: '+', label: 'Countries walked through' },
    ],
    ctaTitle: 'Sign the Petition Today',
    ctaBody: 'The petition "Global Call for Compassion: Let Thich Minh Tue Walk in Peace!" calls on world governments to grant religious visas and allow the pilgrimage to continue safely to India.',
    ctaButton: 'Sign on Change.org',
    ctaShare: 'Share This Petition',
    disclaimer: 'Petition created March 27, 2025 by EyeDrT on Change.org. 1,244 verified signatures.',
  },
}

export default function GlobalSupport() {
  const locale = useLocale()
  const c = CONTENT[locale as 'vi' | 'en'] ?? CONTENT.en
  const shareUrl = encodeURIComponent(PETITION_URL)
  const shareText = encodeURIComponent(locale === 'vi'
    ? 'Hãy ký kiến nghị bảo vệ quyền bộ hành của Thầy Minh Tuệ! #TMTWalk4Peace'
    : 'Sign the petition to protect Minh Tuệ\'s right to walk in peace! #TMTWalk4Peace')

  return (
    <section className="bg-[#0c0c10] text-white overflow-hidden">

      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      {/* Urgent badge */}
      <div className="flex justify-center pt-10 pb-4">
        <FadeIn>
          <span className="inline-flex items-center gap-2 font-ui text-[0.65rem] uppercase tracking-[0.16em] text-red-400 border border-red-500/40 px-4 py-2 rounded-full bg-red-500/10 animate-pulse">
            {c.urgentBadge}
          </span>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pb-20">

        {/* Hero heading */}
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5 max-w-4xl mx-auto">
              {c.heading}
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              {c.subheading}
            </p>
          </div>
        </FadeIn>

        {/* Situation box */}
        <FadeIn delay={0.1}>
          <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-6 sm:p-8 mb-12">
            <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-red-400 mb-3">{c.situation}</p>
            <p className="font-body text-white/75 leading-relaxed">{c.situationText}</p>
          </div>
        </FadeIn>

        {/* Why it matters — 3 cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {c.whyPoints.map((pt, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="border border-white/10 rounded-xl p-6 bg-white/[0.03] h-full">
                <span className="text-2xl mb-4 block">{pt.icon}</span>
                <h3 className="font-display text-white text-base leading-snug mb-3">{pt.title}</h3>
                <p className="font-body text-white/55 text-sm leading-relaxed">{pt.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Pull quote */}
        <FadeIn delay={0.2}>
          <blockquote className="text-center mb-14 px-4">
            <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white/90 italic leading-relaxed mb-4 max-w-3xl mx-auto">
              {c.quote}
            </p>
            <cite className="font-ui text-[0.65rem] uppercase tracking-[0.14em] text-white/35 not-italic">
              {c.quoteSource}
            </cite>
          </blockquote>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="mb-14">
            <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-white/35 text-center mb-6">{c.statsTitle}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden">
              {c.stats.map(({ value, suffix, label }) => (
                <div key={label} className="bg-[#0c0c10] px-6 py-8 text-center">
                  <p className="font-display text-3xl sm:text-4xl text-red-400 font-bold mb-2">
                    <Counter target={value} suffix={suffix} />
                  </p>
                  <p className="font-ui text-[0.6rem] uppercase tracking-[0.12em] text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA box */}
        <FadeIn delay={0.15}>
          <div className="border border-white/15 rounded-2xl overflow-hidden">
            {/* Top section */}
            <div className="bg-white/[0.04] p-8 sm:p-10 text-center border-b border-white/10">
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">{c.ctaTitle}</h3>
              <p className="font-body text-white/60 leading-relaxed max-w-2xl mx-auto mb-8">
                {c.ctaBody}
              </p>

              {/* Primary CTA */}
              <a
                href={PETITION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-ui text-sm uppercase tracking-[0.12em] rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-600/30 mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                {c.ctaButton}
              </a>

              {/* Share row */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <span className="font-ui text-[0.6rem] uppercase tracking-[0.14em] text-white/30">{c.ctaShare}:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-colors rounded-lg"
                  aria-label="Share on X"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.918l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-colors rounded-lg"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="px-8 py-4 text-center">
              <p className="font-ui text-[0.58rem] uppercase tracking-[0.12em] text-white/20">{c.disclaimer}</p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </section>
  )
}
