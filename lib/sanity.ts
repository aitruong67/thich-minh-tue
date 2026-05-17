import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { Photo, Video, NewsArticle, Quote } from '@/lib/types'
import { mockPhotos } from '@/lib/mock/photos'
import { mockVideos } from '@/lib/mock/videos'
import { mockNews } from '@/lib/mock/news'
import { mockQuotes } from '@/lib/mock/quotes'
import { mockBiographyChapters } from '@/lib/mock/biography'
import { mockWaypoints } from '@/lib/mock/waypoints'

// Write client — used by Studio and webhook routes (needs token)
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6bzvjl52',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Read-only client — no token, fetches only published public content
const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6bzvjl52',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: object) {
  return builder.image(source)
}

// ─── Photos ────────────────────────────────────────────────────────────────
export async function fetchPhotos(): Promise<Photo[]> {
  try {
    const docs = await readClient.fetch<Record<string, unknown>[]>(
      `*[_type == "photo"] | order(_createdAt desc) {
        _id,
        "slug": slug.current,
        title_vi, title_en,
        image,
        "dimensions": image.asset->metadata.dimensions,
        alt_vi, alt_en, caption_vi, caption_en,
        year, location, theme, source
      }`,
      {},
      { next: { revalidate: 60 } }
    )
    const sanityPhotos = (docs ?? []).map((doc: Record<string, unknown>): Photo => ({
      _id: doc._id as string,
      slug: (doc.slug as string) ?? (doc._id as string),
      title_vi: (doc.title_vi as string) ?? (doc.title_en as string),
      title_en: doc.title_en as string,
      imageUrl: doc.image
        ? urlFor(doc.image as object).width(1200).url()
        : (doc.source as string) ?? '',
      alt_vi: (doc.alt_vi as string) ?? (doc.title_vi as string) ?? (doc.title_en as string),
      alt_en: (doc.alt_en as string) ?? (doc.title_en as string),
      caption_vi: doc.caption_vi as string | undefined,
      caption_en: doc.caption_en as string | undefined,
      year: (doc.year as number) ?? new Date().getFullYear(),
      location: (doc.location as string) ?? '',
      theme: (doc.theme as string[]) ?? [],
      width: (doc.dimensions as { width: number } | undefined)?.width ?? 1200,
      height: (doc.dimensions as { height: number } | undefined)?.height ?? 800,
    }))
    const validPhotos = sanityPhotos.filter(p => p.imageUrl)
    return validPhotos.length ? validPhotos : mockPhotos
  } catch {
    return mockPhotos
  }
}

// ─── Videos ────────────────────────────────────────────────────────────────
export async function fetchVideos(): Promise<Video[]> {
  try {
    const docs = await readClient.fetch<Record<string, unknown>[]>(
      `*[_type == "video"] | order(date desc) {
        _id,
        "slug": slug.current,
        title_vi, title_en, category, youtubeId,
        "videoUrl": videoFile.asset->url,
        thumbnailUrl,
        "thumbnailImageUrl": thumbnailImage.asset->url,
        description_vi, description_en,
        duration, date, tags, hasTranscript
      }`,
      {},
      { next: { revalidate: 60 } }
    )
    const sanityVideos = (docs ?? []).map((doc: Record<string, unknown>): Video => ({
      _id: doc._id as string,
      slug: (doc.slug as string) ?? (doc._id as string),
      title_vi: doc.title_vi as string,
      title_en: doc.title_en as string,
      category: (doc.category as Video['category']) ?? 'news',
      youtubeId: doc.youtubeId as string | undefined,
      videoUrl: doc.videoUrl as string | undefined,
      thumbnailUrl: (doc.thumbnailUrl as string)
        ?? (doc.thumbnailImageUrl as string)
        ?? (doc.youtubeId ? `https://img.youtube.com/vi/${doc.youtubeId}/hqdefault.jpg` : undefined),
      description_vi: (doc.description_vi as string) ?? '',
      description_en: (doc.description_en as string) ?? '',
      duration: (doc.duration as string) ?? '',
      date: doc.date as string,
      tags: (doc.tags as string[]) ?? [],
      hasTranscript: (doc.hasTranscript as boolean) ?? false,
    }))
    return sanityVideos.length ? sanityVideos : mockVideos
  } catch {
    return mockVideos
  }
}

// ─── News ───────────────────────────────────────────────────────────────────
export async function fetchNews(): Promise<NewsArticle[]> {
  try {
    const docs = await readClient.fetch<Record<string, unknown>[]>(
      `*[_type == "newsArticle"] | order(date desc) {
        _id,
        "slug": slug.current,
        title, excerpt, body_vi, body_en, date, author,
        readingTime, tags, sourceUrl,
        "coverImage": coalesce(
          coverImage.asset->url,
          coverImageUrl
        )
      }`,
      {},
      { next: { revalidate: 60 } }
    )
    if (!docs?.length) return mockNews
    return docs.map((doc: Record<string, unknown>): NewsArticle => ({
      _id: doc._id as string,
      slug: (doc.slug as string) ?? (doc._id as string),
      title: doc.title as string,
      excerpt: doc.excerpt as string,
      body_vi: (doc.body_vi as string) ?? '',
      body_en: (doc.body_en as string) ?? '',
      date: doc.date as string,
      coverImage: (doc.coverImage as string) ?? '',
      author: doc.author as string,
      readingTime: (doc.readingTime as number) ?? 5,
      tags: (doc.tags as string[]) ?? [],
      sourceUrl: doc.sourceUrl as string | undefined,
    }))
  } catch {
    return mockNews
  }
}

// ─── Quotes ─────────────────────────────────────────────────────────────────
export async function fetchQuotes(): Promise<Quote[]> {
  try {
    const docs = await readClient.fetch<Record<string, unknown>[]>(
      `*[_type == "quote"] | order(_createdAt desc) {
        _id, text_vi, text_en, theme, source, date
      }`,
      {},
      { next: { revalidate: 60 } }
    )
    if (!docs?.length) return mockQuotes
    return docs.map((doc: Record<string, unknown>): Quote => ({
      _id: doc._id as string,
      text_vi: doc.text_vi as string,
      text_en: doc.text_en as string,
      theme: doc.theme as Quote['theme'],
      source: doc.source as string | undefined,
      date: doc.date as string | undefined,
    }))
  } catch {
    return mockQuotes
  }
}

// ─── Single video by slug ───────────────────────────────────────────────────
export async function fetchVideoBySlug(slug: string): Promise<Video | null> {
  try {
    const doc = await readClient.fetch<Record<string, unknown>>(
      `*[_type == "video" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        title_vi, title_en, category, youtubeId,
        "videoUrl": videoFile.asset->url,
        thumbnailUrl,
        "thumbnailImageUrl": thumbnailImage.asset->url,
        description_vi, description_en,
        duration, date, tags, hasTranscript
      }`,
      { slug }
    )
    if (!doc?._id) return null
    return {
      _id: doc._id as string,
      slug: doc.slug as string,
      title_vi: doc.title_vi as string,
      title_en: doc.title_en as string,
      category: (doc.category as Video['category']) ?? 'news',
      youtubeId: doc.youtubeId as string | undefined,
      videoUrl: doc.videoUrl as string | undefined,
      thumbnailUrl: (doc.thumbnailUrl as string)
        ?? (doc.thumbnailImageUrl as string)
        ?? (doc.youtubeId ? `https://img.youtube.com/vi/${doc.youtubeId}/hqdefault.jpg` : undefined),
      description_vi: (doc.description_vi as string) ?? '',
      description_en: (doc.description_en as string) ?? '',
      duration: (doc.duration as string) ?? '',
      date: doc.date as string,
      tags: (doc.tags as string[]) ?? [],
      hasTranscript: (doc.hasTranscript as boolean) ?? false,
    }
  } catch {
    return null
  }
}

// ─── Biography & Waypoints (still mock — add schemas later) ─────────────────
export async function fetchBiographyChapters() {
  return mockBiographyChapters
}

export async function fetchWaypoints() {
  return mockWaypoints
}
