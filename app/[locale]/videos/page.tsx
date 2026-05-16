import { fetchVideos } from '@/lib/sanity'
import VideosClient from './VideosClient'

export const revalidate = 60

export default async function VideosPage() {
  const videos = await fetchVideos()
  return <VideosClient videos={videos} />
}
