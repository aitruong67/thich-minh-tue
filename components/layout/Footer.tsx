import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import Lotus from '@/components/ui/Lotus'

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
    <footer className="bg-[#1a0606]" role="contentinfo">
      <div className="h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-14 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Lotus size={32} />
                <span className="font-display text-xl text-ember italic">
                  Minh Tuệ
                </span>
              </div>
              <p className="font-body text-white/45 text-sm leading-relaxed max-w-xs">
                {t('footer.description')}
              </p>
            </div>

            {/* Links */}
            <div className="lg:col-span-2">
              <p className="font-ui text-label uppercase tracking-[0.14em] text-white/30 mb-5">
                Archive
              </p>
              <nav aria-label={t('footer.navAriaLabel')}>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3" role="list">
                  {footerLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="font-ui text-label uppercase tracking-[0.1em] text-white/45 hover:text-ember transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-3 h-px bg-white/20 group-hover:bg-ember/60 transition-colors" aria-hidden="true" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-ui text-[0.6rem] text-white/25 uppercase tracking-[0.14em] text-center sm:text-left">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <address className="not-italic font-ui text-[0.6rem] text-white/25 uppercase tracking-[0.14em]">
              {t('footer.location')}
            </address>
          </div>
        </div>
      </div>
    </footer>
  )
}
