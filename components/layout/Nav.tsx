'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import LangToggle from '@/components/ui/LangToggle'
import SearchModal from '@/components/ui/SearchModal'

const navLinks = [
  { href: '/',          labelKey: 'nav.home' },
  { href: '/biography', labelKey: 'nav.biography' },
  { href: '/gallery',   labelKey: 'nav.gallery' },
  { href: '/videos',    labelKey: 'nav.videos' },
  { href: '/quotes',    labelKey: 'nav.quotes' },
  { href: '/journey',   labelKey: 'nav.journey' },
  { href: '/news',      labelKey: 'nav.news' },
  { href: '/submit',    labelKey: 'nav.submit' },
  { href: '/contact',   labelKey: 'nav.contact' },
]

export default function Nav() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) => {
    const localizedHref = `/${locale}${href === '/' ? '' : href}`
    return href === '/'
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(localizedHref)
  }

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-crimson/95 backdrop-blur-md shadow-lg' : 'bg-crimson'
      }`}
    >
      {/* Top accent bar — desktop only */}
      <div className="hidden md:flex items-center justify-between bg-[#3D0808] border-b border-white/10 px-6 md:px-12 lg:px-24 py-1.5">
        <p className="font-ui text-[0.6rem] uppercase tracking-[0.14em] text-white/40">
          Tư liệu lưu trữ phi lợi nhuận · Non-profit archive
        </p>
        <LangToggle />
      </div>

      {/* Main nav bar */}
      <nav
        aria-label={t('nav.ariaLabel')}
        className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 h-14 md:h-16"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex-shrink-0 group"
          aria-label="Minh Tuệ Archive — Trang chủ"
        >
          <Image
            src="/logo.png"
            alt="Minh Tuệ Archive"
            width={200}
            height={80}
            className="h-12 md:h-14 w-auto object-contain transition-opacity group-hover:opacity-90"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map(({ href, labelKey }) => (
            <li key={href}>
              <Link
                href={`/${locale}${href === '/' ? '' : href}`}
                className={`
                  relative px-3 py-5 block font-ui text-label uppercase tracking-[0.1em] transition-colors duration-200 whitespace-nowrap
                  ${isActive(href) ? 'text-ember' : 'text-white/75 hover:text-white'}
                `}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {t(labelKey)}
                {isActive(href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-ember rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="text-white/75 hover:text-white transition-colors p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="md:hidden">
            <LangToggle />
          </div>
          <button
            className="lg:hidden text-white hover:text-ember transition-colors p-2 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#3D0808] border-t border-white/10 px-4 sm:px-6 pb-4">
          <ul className="flex flex-col divide-y divide-white/10" role="list">
            {navLinks.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={`/${locale}${href === '/' ? '' : href}`}
                  className={`
                    flex items-center gap-3 py-4 font-ui text-label uppercase tracking-[0.12em] transition-colors
                    ${isActive(href) ? 'text-ember' : 'text-white/75 hover:text-white'}
                  `}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {isActive(href) && <span className="w-1 h-4 bg-ember rounded-full flex-shrink-0" />}
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
