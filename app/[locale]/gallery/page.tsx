import GalleryClient from './GalleryClient'
import { fetchPhotos } from '@/lib/sanity'

export const revalidate = 60

export default async function GalleryPage() {
  const photos = await fetchPhotos()
  return <GalleryClient photos={photos} />
}
