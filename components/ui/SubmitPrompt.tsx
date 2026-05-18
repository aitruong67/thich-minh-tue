'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Lotus from '@/components/ui/Lotus'

const STORAGE_KEY  = 'mt-submit-prompt-dismissed'
const DISMISS_DAYS = 7
const SHOW_DELAY   = 8000 // 8 seconds

const TYPES = [
  { icon: '📝', label_en: 'Article', label_vi: 'Bài viết' },
  { icon: '🖼️', label_en: 'Photo',   label_vi: 'Hình ảnh' },
  { icon: '🎥', label_en: 'Video',   label_vi: 'Video' },
]

export default function SubmitPrompt() {
  const pathname = usePathname()
  const locale   = useLocale()
  const isVi     = locale === 'vi'

  const [visible, setVisible]   = useState(false)
  const [mounted, setMounted]   = useState(false)

  // Avoid hydration mismatch
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return

    // Never show on admin, studio, or submit pages
    if (!pathname) return
    if (['/admin', '/studio', '/submit'].some(p => pathname.includes(p))) return

    // Check localStorage dismissal
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const daysSince = (Date.now() - parseInt(raw, 10)) / 86400000
        if (daysSince < DISMISS_DAYS) return
      }
    } catch { /* ignore */ }

    const t = setTimeout(() => setVisible(true), SHOW_DELAY)
    return () => clearTimeout(t)
  }, [mounted, pathname])

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, Date.now().toString()) } catch { /* ignore */ }
    setVisible(false)
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop (mobile) */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] sm:hidden"
            onClick={dismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: 16,  scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
          >
            {/* Top accent bar */}
            <div className="h-0.5 bg-gradient-to-r from-ember via-saffron to-ember" />

            <div className="bg-ink border border-bark/40 rounded-b-2xl">
              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-4 pb-3">
                <div className="flex items-center gap-2.5">
                  <Lotus size={18} className="text-ember flex-shrink-0 mt-0.5" />
                  <p className="font-display text-parchment text-base leading-snug">
                    {isVi ? 'Bạn muốn chia sẻ không?' : 'Want to contribute?'}
                  </p>
                </div>
                <button
                  onClick={dismiss}
                  aria-label="Dismiss"
                  className="text-ash/40 hover:text-ash transition-colors text-xl leading-none flex-shrink-0 ml-3 -mt-0.5"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="px-5 pb-2">
                <p className="font-body text-ash text-sm leading-relaxed">
                  {isVi
                    ? 'Bạn có ảnh, video hoặc bài viết về hành trình của Thầy Minh Tuệ? Cùng nhau lưu giữ những khoảnh khắc này.'
                    : 'Have a photo, video or article about Thầy Minh Tuệ\'s journey? Help preserve these moments with the community.'}
                </p>
              </div>

              {/* Type cards */}
              <div className="grid grid-cols-3 gap-2 px-5 pt-3 pb-4">
                {TYPES.map(t => (
                  <Link
                    key={t.label_en}
                    href={`/${locale}/submit`}
                    onClick={dismiss}
                    className="flex flex-col items-center gap-1.5 py-3 border border-bark hover:border-saffron/50 hover:bg-bark/10 rounded-xl transition-all duration-200 group"
                  >
                    <span className="text-2xl leading-none">{t.icon}</span>
                    <span className="font-ui text-[0.58rem] uppercase tracking-widest text-ash group-hover:text-parchment transition-colors">
                      {isVi ? t.label_vi : t.label_en}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Dismiss link */}
              <div className="border-t border-bark/30 px-5 py-3 flex items-center justify-between">
                <Link href={`/${locale}/submit`} onClick={dismiss}
                  className="font-ui text-[0.6rem] uppercase tracking-widest text-saffron hover:text-ember transition-colors">
                  {isVi ? 'Gửi ngay →' : 'Submit now →'}
                </Link>
                <button onClick={dismiss}
                  className="font-ui text-[0.6rem] uppercase tracking-widest text-ash/40 hover:text-ash/60 transition-colors">
                  {isVi ? 'Để sau' : 'Maybe later'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
