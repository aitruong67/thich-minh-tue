import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora, Be_Vietnam_Pro } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import '../globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thichminhtue.archive.vn'),
  title: {
    template: '%s · Minh Tuệ Archive',
    default: 'Minh Tuệ — Lưu Trữ Hành Trình Tâm Linh',
  },
  description:
    'Tư liệu lưu trữ về hành trình của Thầy Minh Tuệ — nhà sư Theravāda đã đi bộ suốt chiều dài Việt Nam, truyền cảm hứng cho hàng triệu người.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: ['en_US'],
    siteName: 'Minh Tuệ Archive',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${cormorant.variable} ${lora.variable} ${beVietnam.variable}`}>
      <head>
        <link rel="alternate" hrefLang="vi" href={`https://thichminhtue.archive.vn/vi`} />
        <link rel="alternate" hrefLang="en" href={`https://thichminhtue.archive.vn/en`} />
        <link rel="alternate" hrefLang="x-default" href={`https://thichminhtue.archive.vn/vi`} />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          {locale === 'vi' ? 'Chuyển đến nội dung chính' : 'Skip to main content'}
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
