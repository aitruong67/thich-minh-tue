'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Lotus from '@/components/ui/Lotus'
import { mockQuotes } from '@/lib/mock'
import type { Quote } from '@/lib/types'

// ─── Theme helpers ────────────────────────────────────────────────────────────
const THEME_COLOR: Record<string, string> = {
  compassion:   'text-rose-400',
  simplicity:   'text-emerald-400',
  impermanence: 'text-blue-400',
  walking:      'text-amber-400',
  freedom:      'text-violet-400',
}
const THEME_BORDER: Record<string, string> = {
  compassion:   'border-rose-500/40',
  simplicity:   'border-emerald-500/40',
  impermanence: 'border-blue-500/40',
  walking:      'border-amber-500/40',
  freedom:      'border-violet-500/40',
}
const THEME_GLOW: Record<string, string> = {
  compassion:   'from-rose-900/50',
  simplicity:   'from-emerald-900/50',
  impermanence: 'from-blue-900/50',
  walking:      'from-amber-900/50',
  freedom:      'from-violet-900/50',
}
const THEME_LABEL_VI: Record<string, string> = {
  compassion: 'Từ bi', simplicity: 'Giản dị', impermanence: 'Vô thường',
  walking: 'Bước chân', freedom: 'Tự do',
}

// ─── Moods ────────────────────────────────────────────────────────────────────
const MOODS = [
  { id: 'restless',   symbol: '〜', label_en: 'Restless',       label_vi: 'Bất an',          desc_en: "Mind won't quiet",    desc_vi: 'Tâm không yên',          theme: 'freedom'      as Quote['theme'] },
  { id: 'heavy',      symbol: '◦',  label_en: 'Heavy-hearted',  label_vi: 'Nặng lòng',        desc_en: 'Carrying something',  desc_vi: 'Đang gánh nặng',         theme: 'compassion'   as Quote['theme'] },
  { id: 'seeking',    symbol: '✦',  label_en: 'Seeking peace',  label_vi: 'Tìm bình yên',     desc_en: 'Looking for stillness', desc_vi: 'Tìm sự tĩnh lặng',    theme: 'simplicity'   as Quote['theme'] },
  { id: 'journey',    symbol: '→',  label_en: 'On a journey',   label_vi: 'Đang trên đường',  desc_en: 'Moving through life', desc_vi: 'Đang đi qua cuộc sống', theme: 'walking'      as Quote['theme'] },
  { id: 'reflective', symbol: '◌',  label_en: 'Reflective',     label_vi: 'Suy ngẫm',         desc_en: 'Thinking about time', desc_vi: 'Nghĩ về thời gian',      theme: 'impermanence' as Quote['theme'] },
]

type ThemeFilter = 'all' | Quote['theme'] | 'verified'
const FILTERS: ThemeFilter[] = ['all', 'verified', 'compassion', 'simplicity', 'impermanence', 'walking', 'freedom']

// ─── Main page ────────────────────────────────────────────────────────────────
export default function QuotesPage() {
  const locale = useLocale()
  const isVi   = locale === 'vi'

  // Hero
  const [heroIdx, setHeroIdx]   = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Mood picker
  const [activeMood, setActiveMood]     = useState<string | null>(null)
  const [moodQuote, setMoodQuote]       = useState<Quote | null>(null)
  const [quoteVisible, setQuoteVisible] = useState(false)

  // Flip cards
  const [flipped, setFlipped] = useState<Set<string>>(new Set())
  const [saved, setSaved]     = useState<Set<string>>(new Set())
  const [filter, setFilter]   = useState<ThemeFilter>('all')

  // Load saved from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mt-teachings')
      if (raw) setSaved(new Set(JSON.parse(raw)))
    } catch { /* ignore */ }
  }, [])

  // Hero auto-advance
  useEffect(() => {
    if (isPaused) return
    const t = setInterval(() => setHeroIdx(i => (i + 1) % mockQuotes.length), 6000)
    return () => clearInterval(t)
  }, [isPaused])

  const pickMood = useCallback((mood: typeof MOODS[0]) => {
    setActiveMood(mood.id)
    setQuoteVisible(false)
    const pool = mockQuotes.filter(q => q.theme === mood.theme)
    setMoodQuote(pool[Math.floor(Math.random() * pool.length)])
    setTimeout(() => setQuoteVisible(true), 120)
  }, [])

  const pickAnother = useCallback(() => {
    const mood = MOODS.find(m => m.id === activeMood)
    if (!mood) return
    setQuoteVisible(false)
    setTimeout(() => {
      const pool = mockQuotes.filter(q => q.theme === mood.theme && q._id !== moodQuote?._id)
      setMoodQuote(pool[Math.floor(Math.random() * pool.length)] ?? moodQuote)
      setQuoteVisible(true)
    }, 300)
  }, [activeMood, moodQuote])

  const toggleFlip = (id: string) => setFlipped(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const toggleSave = useCallback((id: string) => setSaved(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    try { localStorage.setItem('mt-teachings', JSON.stringify([...next])) } catch { /* ignore */ }
    return next
  }), [])

  const filtered    = filter === 'all' ? mockQuotes
    : filter === 'verified' ? mockQuotes.filter(q => q.verified)
    : mockQuotes.filter(q => q.theme === filter)
  const savedQuotes = mockQuotes.filter(q => saved.has(q._id))
  const heroQuote   = mockQuotes[heroIdx]

  return (
    <div className="pt-16 bg-ink min-h-screen">

      {/* ═══ SECTION 1: HERO CAROUSEL ═══════════════════════════════════════════ */}
      <section
        className="relative min-h-[72vh] flex flex-col items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Lotus watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]" aria-hidden="true">
          <Lotus size={580} className="animate-spin-slow" />
        </div>

        {/* Theme glow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroQuote.theme}
            className={`absolute inset-0 bg-gradient-to-br ${THEME_GLOW[heroQuote.theme]} via-transparent to-transparent`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.p
            className="font-ui text-label uppercase tracking-[0.18em] text-ember mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            {isVi ? 'Lời Dạy' : 'Teachings'}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`inline-block font-ui text-label uppercase tracking-[0.14em] mb-6 ${THEME_COLOR[heroQuote.theme]}`}>
                {isVi ? THEME_LABEL_VI[heroQuote.theme] : heroQuote.theme}
              </span>
              <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-parchment italic leading-[1.3] mb-8">
                &ldquo;{isVi ? heroQuote.text_vi : heroQuote.text_en}&rdquo;
              </blockquote>
              {heroQuote.source && (
                <cite className="font-ui text-label uppercase tracking-[0.14em] text-ash/60 not-italic">
                  — {heroQuote.source}
                </cite>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setHeroIdx(i => (i - 1 + mockQuotes.length) % mockQuotes.length)}
              className="w-8 h-8 flex items-center justify-center text-ash/40 hover:text-saffron transition-colors text-2xl leading-none"
              aria-label="Previous quote"
            >
              ‹
            </button>
            <div className="flex items-center gap-2">
              {mockQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === heroIdx ? 'w-5 h-1.5 bg-saffron' : 'w-1.5 h-1.5 bg-bark hover:bg-ash'
                  }`}
                  aria-label={`Go to quote ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setHeroIdx(i => (i + 1) % mockQuotes.length)}
              className="w-8 h-8 flex items-center justify-center text-ash/40 hover:text-saffron transition-colors text-2xl leading-none"
              aria-label="Next quote"
            >
              ›
            </button>
          </div>
          <p className="font-ui text-[0.6rem] uppercase tracking-[0.14em] text-ash/25 mt-3">
            {isVi ? 'Hover để dừng · Nhấn để điều hướng' : 'Hover to pause · Click to navigate'}
          </p>
        </div>
      </section>

      {/* ═══ SECTION 2: MOOD PICKER ═════════════════════════════════════════════ */}
      <section className="section-padding border-t border-bark/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">{isVi ? 'Tương tác' : 'Interactive'}</p>
            <h2 className="font-display text-3xl md:text-4xl text-parchment leading-tight">
              {isVi ? 'Hôm Nay Bạn Cảm Thấy Thế Nào?' : 'How Are You Feeling Today?'}
            </h2>
            <p className="font-body text-ash mt-3 max-w-md mx-auto leading-relaxed">
              {isVi
                ? 'Chọn trạng thái của bạn và nhận một lời dạy phù hợp từ Thầy Minh Tuệ.'
                : 'Pick your current state and receive a matching teaching from Minh Tuệ.'}
            </p>
          </div>

          {/* Mood cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
            {MOODS.map(mood => (
              <button
                key={mood.id}
                onClick={() => pickMood(mood)}
                className={`relative flex flex-col items-center gap-3 p-5 border rounded-lg transition-all duration-300 text-center group ${
                  activeMood === mood.id
                    ? `${THEME_BORDER[mood.theme]} bg-bark/20 scale-[1.04]`
                    : 'border-bark hover:border-ash/40 hover:bg-bark/10'
                }`}
              >
                <span className={`font-display text-3xl leading-none transition-colors duration-300 ${
                  activeMood === mood.id
                    ? THEME_COLOR[mood.theme]
                    : 'text-ash/50 group-hover:text-ash'
                }`}>
                  {mood.symbol}
                </span>
                <div>
                  <p className={`font-display text-sm leading-tight mb-1 transition-colors ${
                    activeMood === mood.id ? 'text-parchment' : 'text-ash group-hover:text-parchment'
                  }`}>
                    {isVi ? mood.label_vi : mood.label_en}
                  </p>
                  <p className="font-ui text-[0.58rem] uppercase tracking-widest text-ash/40 leading-tight">
                    {isVi ? mood.desc_vi : mood.desc_en}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Quote reveal */}
          <AnimatePresence mode="wait">
            {moodQuote && quoteVisible && (
              <motion.div
                key={moodQuote._id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`border ${THEME_BORDER[moodQuote.theme]} bg-bark/10 rounded-lg p-8 md:p-12`}
              >
                <div className="flex justify-center mb-8">
                  <Lotus size={28} className={THEME_COLOR[moodQuote.theme]} />
                </div>

                <blockquote className="font-display text-xl md:text-3xl text-parchment italic leading-relaxed text-center mb-4">
                  &ldquo;{isVi ? moodQuote.text_vi : moodQuote.text_en}&rdquo;
                </blockquote>

                <p className="font-body text-ash/45 text-sm italic text-center mb-6 max-w-xl mx-auto">
                  {isVi ? moodQuote.text_en : moodQuote.text_vi}
                </p>

                {moodQuote.source && (
                  <cite className={`block text-center font-ui text-label uppercase tracking-[0.14em] not-italic mb-4 ${THEME_COLOR[moodQuote.theme]}`}>
                    — {moodQuote.source}
                  </cite>
                )}
                {moodQuote.verified && (
                  <p className="text-center font-ui text-[0.58rem] uppercase tracking-widest text-emerald-400 mb-6">
                    ✓ {isVi ? 'Lời nói trực tiếp được xác minh' : 'Verified direct quote'}
                  </p>
                )}

                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <button
                    onClick={pickAnother}
                    className="font-ui text-label uppercase tracking-[0.12em] text-ash hover:text-parchment transition-colors border border-bark hover:border-ash/40 px-5 py-2.5 rounded"
                  >
                    {isVi ? 'Lời dạy khác' : 'Another teaching'}
                  </button>
                  <button
                    onClick={() => toggleSave(moodQuote._id)}
                    className={`flex items-center gap-2 font-ui text-label uppercase tracking-[0.12em] transition-colors ${
                      saved.has(moodQuote._id) ? 'text-saffron' : 'text-ash/50 hover:text-saffron'
                    }`}
                  >
                    <Lotus size={13} />
                    {saved.has(moodQuote._id)
                      ? (isVi ? 'Đã lưu' : 'Saved')
                      : (isVi ? 'Lưu lại' : 'Save this')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ SECTION 3: FLIP CARDS ══════════════════════════════════════════════ */}
      <section className="section-padding border-t border-bark/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="section-label mb-2">{isVi ? 'Khám phá' : 'Explore'}</p>
              <h2 className="font-display text-3xl md:text-4xl text-parchment">
                {isVi ? 'Lật Thẻ · Hai Ngôn Ngữ' : 'Flip the Card · Two Languages'}
              </h2>
              <p className="font-body text-ash/60 text-sm mt-2">
                {isVi
                  ? 'Nhấn vào thẻ để xem bản dịch · Lưu những lời dạy chạm đến bạn'
                  : 'Click any card to reveal the translation · Save teachings that resonate'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-ui text-label uppercase tracking-[0.1em] px-3 py-1.5 border text-xs transition-colors ${
                    filter === f
                      ? f === 'verified'
                        ? 'border-emerald-400 bg-emerald-400 text-ink'
                        : 'border-saffron bg-saffron text-ink'
                      : f === 'verified'
                        ? 'border-emerald-600/50 text-emerald-400 hover:border-emerald-400'
                        : 'border-bark text-ash hover:border-ash/50 hover:text-parchment'
                  }`}
                >
                  {f === 'all' ? (isVi ? 'Tất cả' : 'All')
                    : f === 'verified' ? (isVi ? '✓ Xác thực' : '✓ Verified')
                    : (isVi ? THEME_LABEL_VI[f] : f)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(quote => (
              <FlipCard
                key={quote._id}
                quote={quote}
                isVi={isVi}
                isFlipped={flipped.has(quote._id)}
                isSaved={saved.has(quote._id)}
                onFlip={() => toggleFlip(quote._id)}
                onSave={() => toggleSave(quote._id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center font-body text-ash py-20">
              {isVi ? 'Không có lời dạy nào.' : 'No teachings found.'}
            </p>
          )}
        </div>
      </section>

      {/* ═══ SECTION 4: SAVED SCROLL ════════════════════════════════════════════ */}
      <AnimatePresence>
        {savedQuotes.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="section-padding border-t border-saffron/20 bg-saffron/[0.04]"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Lotus size={20} className="text-saffron" />
                <h2 className="font-display text-2xl md:text-3xl text-parchment">
                  {isVi ? 'Cuộn Lời Dạy Của Bạn' : 'Your Teaching Scroll'}
                </h2>
                <span className="font-ui text-label text-saffron/70">({savedQuotes.length})</span>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {savedQuotes.map(quote => (
                  <motion.div
                    key={quote._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`flex-none w-72 snap-start border ${THEME_BORDER[quote.theme]} bg-ink rounded-lg p-6 flex flex-col`}
                  >
                    <span className={`font-ui text-[0.58rem] uppercase tracking-widest mb-4 ${THEME_COLOR[quote.theme]}`}>
                      {isVi ? THEME_LABEL_VI[quote.theme] : quote.theme}
                    </span>
                    <p className="font-display text-parchment italic leading-relaxed text-base flex-1">
                      &ldquo;{isVi ? quote.text_vi : quote.text_en}&rdquo;
                    </p>
                    {quote.source && (
                      <cite className="font-ui text-[0.58rem] uppercase tracking-widest text-ash/40 not-italic mt-3 block">
                        — {quote.source}
                      </cite>
                    )}
                    <button
                      onClick={() => toggleSave(quote._id)}
                      className="mt-4 self-start font-ui text-[0.58rem] uppercase tracking-widest text-ash/30 hover:text-rose-400 transition-colors"
                    >
                      {isVi ? '× Xóa' : '× Remove'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  )
}

// ─── FlipCard ─────────────────────────────────────────────────────────────────
function FlipCard({
  quote, isVi, isFlipped, isSaved, onFlip, onSave,
}: {
  quote: Quote
  isVi: boolean
  isFlipped: boolean
  isSaved: boolean
  onFlip: () => void
  onSave: () => void
}) {
  const frontText = isVi ? quote.text_vi : quote.text_en
  const backText  = isVi ? quote.text_en : quote.text_vi
  const backLang  = isVi ? 'English' : 'Tiếng Việt'

  return (
    <div className="h-56 sm:h-60" style={{ perspective: '1200px' }}>
      <div
        role="button"
        tabIndex={0}
        aria-label={isVi ? 'Nhấn để xem bản dịch' : 'Click to see translation'}
        onClick={onFlip}
        onKeyDown={e => e.key === 'Enter' && onFlip()}
        className="relative w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 border border-bark bg-ink p-5 flex flex-col rounded"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`font-ui text-[0.58rem] uppercase tracking-widest ${THEME_COLOR[quote.theme]}`}>
                {isVi ? THEME_LABEL_VI[quote.theme] : quote.theme}
              </span>
              {quote.verified && (
                <span className="font-ui text-[0.5rem] uppercase tracking-widest text-emerald-400 border border-emerald-600/50 px-1 py-0.5 rounded-sm">
                  {isVi ? 'Xác thực' : 'Verified'}
                </span>
              )}
            </div>
            <span className="font-ui text-[0.52rem] uppercase tracking-widest text-ash/30">
              {isVi ? 'Nhấn để dịch →' : 'Tap to flip →'}
            </span>
          </div>
          <p className="font-display text-parchment italic leading-relaxed flex-1 text-base sm:text-lg line-clamp-4">
            {frontText}
          </p>
          {quote.source && (
            <cite className="font-ui text-[0.52rem] uppercase tracking-widest text-ash/35 not-italic mt-3 block truncate">
              — {quote.source}
            </cite>
          )}
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 border ${THEME_BORDER[quote.theme]} bg-bark/10 p-5 flex flex-col rounded`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-ui text-[0.52rem] uppercase tracking-widest text-ash/40">
              {backLang}
            </span>
            <button
              onClick={e => { e.stopPropagation(); onSave() }}
              className={`flex items-center gap-1.5 font-ui text-[0.52rem] uppercase tracking-widest transition-colors ${
                isSaved ? 'text-saffron' : 'text-ash/35 hover:text-saffron'
              }`}
            >
              <Lotus size={10} />
              {isSaved ? (isVi ? 'Đã lưu' : 'Saved') : (isVi ? 'Lưu' : 'Save')}
            </button>
          </div>
          <p className="font-display text-parchment/80 italic leading-relaxed flex-1 text-sm sm:text-base line-clamp-4">
            {backText}
          </p>
          <button
            onClick={e => { e.stopPropagation(); onFlip() }}
            className="mt-3 self-start font-ui text-[0.52rem] uppercase tracking-widest text-ash/30 hover:text-ash transition-colors"
          >
            ← {isVi ? 'Lật lại' : 'Flip back'}
          </button>
        </div>
      </div>
    </div>
  )
}
