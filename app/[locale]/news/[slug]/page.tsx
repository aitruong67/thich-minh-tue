import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { mockNews } from '@/lib/mock'
import ArticleDetail from './ArticleDetail'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

// Only generate static pages for articles that have body content
export function generateStaticParams() {
  return mockNews
    .filter(a => a.body_vi || a.body_en)
    .map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = mockNews.find(a => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      images: [{ url: article.coverImage }],
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const article = mockNews.find(a => a.slug === slug)

  if (!article || (!article.body_vi && !article.body_en)) notFound()

  const related = mockNews
    .filter(a => a._id !== article._id && (a.body_vi || a.body_en))
    .slice(0, 3)

  return <ArticleDetail article={article} related={related} locale={locale} />
}
