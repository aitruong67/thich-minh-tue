import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { mockNews } from '@/lib/mock'
import { fetchNewsBySlug, fetchNews } from '@/lib/sanity'
import ArticleDetail from './ArticleDetail'

export const dynamicParams = true  // allow community slugs not in static params

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

// Pre-render static pages for mock articles that have body content
export function generateStaticParams() {
  return mockNews
    .filter(a => a.body_vi || a.body_en)
    .map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = mockNews.find(a => a.slug === slug) ?? await fetchNewsBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      images: article.coverImage ? [{ url: article.coverImage }] : [],
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params

  // Check mock first (fast), then Sanity (for community articles)
  let article = mockNews.find(a => a.slug === slug) ?? null
  if (!article) article = await fetchNewsBySlug(slug)

  if (!article || (!article.body_vi && !article.body_en)) notFound()

  // Related: other articles with body content
  const allNews = await fetchNews()
  const related = allNews
    .filter(a => a._id !== article!._id && (a.body_vi || a.body_en))
    .slice(0, 3)

  return <ArticleDetail article={article} related={related} locale={locale} />
}
