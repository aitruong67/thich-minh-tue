import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  const footerLinks = [
    { href: `/${locale}/biography`, label: t('nav.biography') },
    { href: `/${locale}/gallery`,   label: t('nav.gallery') },
    { href: `/${locale}/videos`,    label: t('nav.videos') },
    { href: `/${locale}/quotes`,    label: t('nav.quotes') },
    { href: `/${locale}/journey`,   label: t('nav.journey') },
    { href: `/${locale}/news`,      label: t('nav.news') },
    { href: `/${locale}/contact`,   label: t('nav.contact') },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200" role="contentinfo">
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-14 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="Minh Tuệ Archive"
                  width={280}
                  height={112}
                  className="h-24 w-auto object-contain"
                />
              </div>
              <p className="font-body text-gray-500 text-sm leading-relaxed max-w-xs">
                {t('footer.description')}
              </p>
            </div>

            {/* Links */}
            <div className="lg:col-span-2">
              <p className="font-ui text-label uppercase tracking-[0.14em] text-gray-400 mb-5">
                Archive
              </p>
              <nav aria-label={t('footer.navAriaLabel')}>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3" role="list">
                  {footerLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="font-ui text-label uppercase tracking-[0.1em] text-gray-500 hover:text-saffron transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-3 h-px bg-gray-300 group-hover:bg-saffron/60 transition-colors" aria-hidden="true" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Social + petition row */}
          <div className="border-t border-gray-200 pt-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-ui text-[0.6rem] uppercase tracking-[0.14em] text-gray-400">Follow</span>
              <a href="https://www.facebook.com/groups/tmtwalk4peace" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="text-gray-400 hover:text-saffron transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@TMTWalk" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="text-gray-400 hover:text-saffron transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://www.change.org/TMTWalk4Peace" target="_blank" rel="noopener noreferrer" aria-label="Sign the petition"
                className="font-ui text-[0.6rem] uppercase tracking-[0.12em] text-saffron hover:text-crimson transition-colors border border-saffron/40 hover:border-saffron px-3 py-1 rounded-full ml-2">
                ✍ Sign petition
              </a>
            </div>
            <address className="not-italic font-ui text-[0.6rem] text-gray-400 uppercase tracking-[0.14em]">
              {t('footer.location')}
            </address>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-ui text-[0.6rem] text-gray-400 uppercase tracking-[0.14em] text-center sm:text-left">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <p className="font-ui text-[0.6rem] text-gray-300 uppercase tracking-[0.12em]">
              Non-profit · Educational use only
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
