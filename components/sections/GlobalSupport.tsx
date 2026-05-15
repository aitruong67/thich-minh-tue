'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'

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

const supporters = [
  { value: 1238, suffix: '+', labelKey: 'stat1' },
  { value: 33, suffix: '', labelKey: 'stat2' },
  { value: 100, suffix: 'M+', labelKey: 'stat3' },
  { value: 10, suffix: '+', labelKey: 'stat4' },
]

export default function GlobalSupport() {
  const t = useTranslations('support')

  return (
    <section className="section-padding bg-crimson/5 border-y border-crimson/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <Lotus size={20} />
              <p className="section-label">{t('eyebrow')}</p>
            </div>
            <h2 className="section-heading mb-5">{t('heading')}</h2>
            <p className="font-body text-ash leading-relaxed mb-3">{t('description')}</p>
            <p className="font-ui text-label uppercase tracking-[0.12em] text-saffron flex items-center gap-2">
              <span className="w-4 h-px bg-saffron inline-block" />
              {t('source')}
            </p>
          </FadeIn>

          {/* Stats grid */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {supporters.map(({ value, suffix, labelKey }) => (
                <div key={labelKey} className="border border-bark p-6 text-center">
                  <p className="font-display text-4xl sm:text-5xl text-saffron font-bold mb-2">
                    <Counter target={value} suffix={suffix} />
                  </p>
                  <p className="font-ui text-label uppercase tracking-[0.1em] text-ash">
                    {t(labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
