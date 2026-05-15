import type { MetadataRoute } from 'next'
import { mockNews } from '@/lib/mock/news'

const BASE = 'https://minhtuedhutanga.org'
const LOCALES = ['vi', 'en']

const staticPages = [
  '',           // home
  '/biography',
  '/gallery',
  '/videos',
  '/quotes',
  '/journey',
  '/news',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages for each locale
  const pages: MetadataRoute.Sitemap = staticPages.flatMap(path =>
    LOCALES.map(locale => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? 'daily' : 'weekly',
      priority: path === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(l => [l, `${BASE}/${l}${path}`])
        ),
      },
    }))
  )

  // News article detail pages (articles with body content)
  const newsPages: MetadataRoute.Sitemap = mockNews
    .filter(a => a.body_vi || a.body_en)
    .flatMap(article =>
      LOCALES.map(locale => ({
        url: `${BASE}/${locale}/news/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    )

  return [...pages, ...newsPages]
}
