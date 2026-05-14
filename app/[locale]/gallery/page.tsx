import { fetchPhotos } from '@/lib/sanity'
import GalleryClient from './GalleryClient'

export default async function GalleryPage() {
  const photos = await fetchPhotos()
  return <GalleryClient photos={photos} />
}
