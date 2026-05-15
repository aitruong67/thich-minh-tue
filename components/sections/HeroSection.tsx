'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import Lotus from '@/components/ui/Lotus'

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const prefersReduced = useReducedMotion()
  const stagger = prefersReduced ? 0 : 0.15

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-start overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #3D0808 0%, #5C0F0F 45%, #420B0B 100%)' }}
        aria-hidden="true"
      />

      {/* Hero photo — full bleed on mobile, right half on desktop */}
      <div className="absolute inset-0 lg:left-[45%]" aria-hidden="true">
        <Image
          src="https://cdn.sanity.io/images/2woffqfn/production/80963d152424ad61f25a759934f995e831ceb7db-872x1200.jpg"
          alt="Minh Tuệ"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
        {/* Mobile: heavier overlay over full photo */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, #3D0808 30%, rgba(61,8,8,0.75) 70%, rgba(61,8,8,0.5) 100%)' }}
        />
        {/* Desktop: fade from left */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, #3D0808 0%, rgba(61,8,8,0.6) 50%, rgba(61,8,8,0.1) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #420B0B 0%, transparent 35%)' }}
        />
      </div>

      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{ background: 'radial-gradient(ellipse 40% 55% at 30% 45%, rgba(200,150,12,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Lotus watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] pointer-events-none opacity-[0.04] hidden md:block"
        aria-hidden="true"
      >
        <Lotus size={560} className={prefersReduced ? '' : 'animate-spin-slow'} />
      </div>

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-ember/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-28 md:pt-32 pb-16">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-[52%]">

          {/* Eyebrow */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: stagger * 0 }}
            className="flex items-center gap-2.5 mb-6"
          >
            <Lotus size={18} />
            <p className="font-ui text-label uppercase tracking-[0.14em] text-ember">
              {t('eyebrow')}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1
            id="hero-heading"
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: stagger * 1 }}
            className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 tracking-tight"
          >
            {t('titleLine1')}
            <br />
            <em className="text-ember not-italic block">{t('titleLine2')}</em>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: stagger * 2 }}
            className="font-body text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: stagger * 3 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <Link href={`/${locale}/biography`} className="btn-primary">
              {t('ctaPrimary')}
            </Link>
            <Link
              href={`/${locale}/journey`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-ember/70 text-ember
                         font-ui text-label uppercase tracking-[0.12em] rounded transition-all duration-300
                         hover:bg-ember hover:text-crimson hover:-translate-y-0.5"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: stagger * 4 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/10 pt-10"
          >
            {[
              { value: '2,100+', label: t('stat1') },
              { value: '10M+',   label: t('stat2') },
              { value: '2015',   label: t('stat3') },
            ].map(({ value, label }) => (
              <div key={label} className="stat-chip">
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-ember leading-none">{value}</p>
                <p className="font-ui text-[0.6rem] sm:text-label uppercase tracking-[0.1em] text-white/45 text-center leading-tight mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-ui text-[0.6rem] uppercase tracking-[0.16em] text-white/30">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}
