import { notFound } from 'next/navigation'
import { fetchVideoBySlug } from '@/lib/sanity'
import { mockVideos } from '@/lib/mock'
import VideoDetailClient from './VideoDetailClient'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamic = 'force-dynamic'

export default async function VideoDetailPage({ params }: Props) {
  const { locale, slug } = await params

  // Check Sanity first, then fall back to mock data
  let video = await fetchVideoBySlug(slug)
  if (!video) {
    video = mockVideos.find(v => v.slug === slug) ?? null
  }
  if (!video) notFound()

  const related = mockVideos
    .filter(v => v._id !== video!._id && v.category === video!.category)
    .slice(0, 3)

  return <VideoDetailClient video={video} related={related} locale={locale} />
}
