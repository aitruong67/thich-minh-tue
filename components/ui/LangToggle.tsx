'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'

export default function LangToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = () => {
    const nextLocale = locale === 'vi' ? 'en' : 'vi'
    const segments = pathname.split('/')
    segments[1] = nextLocale
    startTransition(() => router.push(segments.join('/')))
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="flex items-center gap-1 font-ui text-label uppercase tracking-[0.12em] text-white/60 hover:text-ember transition-colors disabled:opacity-40"
      aria-label={locale === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <span className={locale === 'vi' ? 'text-ember font-semibold' : ''}>VI</span>
      <span className="text-white/30">/</span>
      <span className={locale === 'en' ? 'text-ember font-semibold' : ''}>EN</span>
    </button>
  )
}
