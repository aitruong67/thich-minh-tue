import { fetchVideos } from '@/lib/sanity'
import VideosClient from './VideosClient'

export const revalidate = 60

export default async function VideosPage() {
  const { videos, total } = await fetchVideos(24)
  return <VideosClient initialVideos={videos} total={total} pageSize={24} />
}
