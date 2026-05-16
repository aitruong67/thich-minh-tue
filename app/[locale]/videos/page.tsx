import { fetchVideos } from '@/lib/sanity'
import VideosClient from './VideosClient'

export const dynamic = 'force-dynamic'

export default async function VideosPage() {
  const videos = await fetchVideos()
  return <VideosClient videos={videos} />
}
