import GalleryClient from './GalleryClient'
import { mockPhotos } from '@/lib/mock/photos'

export default function GalleryPage() {
  return <GalleryClient photos={mockPhotos} />
}
