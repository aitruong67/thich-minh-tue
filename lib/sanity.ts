import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { Photo } from '@/lib/types'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'stub',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)
function urlFor(source: object) {
  return builder.image(source)
}

export async function fetchVideos() {
  const { mockVideos } = await import('@/lib/mock')
  return mockVideos
}

export async function fetchPhotos(): Promise<Photo[]> {
  const docs = await sanityClient.fetch(
    `*[_type == "photo"] | order(_createdAt desc) {
      _id,
      "slug": slug.current,
      title_vi,
      title_en,
      image,
      "dimensions": image.asset->metadata.dimensions,
      alt_vi,
      alt_en,
      caption_vi,
      caption_en,
      year,
      location,
      theme
    }`
  )

  if (!docs || docs.length === 0) return []

  return docs.map((doc: {
    _id: string
    slug: string
    title_vi?: string
    title_en: string
    image: object
    dimensions?: { width: number; height: number }
    alt_vi?: string
    alt_en?: string
    caption_vi?: string
    caption_en?: string
    year?: number
    location?: string
    theme?: string[]
  }): Photo => ({
    _id: doc._id,
    slug: doc.slug ?? doc._id,
    title_vi: doc.title_vi ?? doc.title_en,
    title_en: doc.title_en,
    imageUrl: urlFor(doc.image).width(1200).url(),
    alt_vi: doc.alt_vi ?? doc.title_vi ?? doc.title_en,
    alt_en: doc.alt_en ?? doc.title_en,
    caption_vi: doc.caption_vi,
    caption_en: doc.caption_en,
    year: doc.year ?? new Date().getFullYear(),
    location: doc.location ?? '',
    theme: doc.theme ?? [],
    width: doc.dimensions?.width ?? 1200,
    height: doc.dimensions?.height ?? 800,
  }))
}

export async function fetchQuotes() {
  const { mockQuotes } = await import('@/lib/mock')
  return mockQuotes
}

export async function fetchNews() {
  const { mockNews } = await import('@/lib/mock')
  return mockNews
}

export async function fetchBiographyChapters() {
  const { mockBiographyChapters } = await import('@/lib/mock')
  return mockBiographyChapters
}

export async function fetchWaypoints() {
  const { mockWaypoints } = await import('@/lib/mock')
  return mockWaypoints
}
