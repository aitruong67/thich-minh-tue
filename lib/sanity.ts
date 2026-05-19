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

// Read-only client — no token, hits API directly (never stale CDN cache)
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
      {}
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

// Videos pinned to the top of the page in this exact order
const PINNED_VIDEO_IDS = [
  'c1702785-8f12-4851-a82e-b19cea3eddba', // Vô Sở Hữu Tập 9
  '4a5bd4b0-2649-416d-b415-7b0cf2bc6f9e', // Tập 8
  'de12ced5-c756-4072-a4aa-f329d59d829f', // Tập 7
  'e3026c31-89ec-49aa-adc7-69a837c9627c', // Tập 6
  '84e8708d-0af6-492b-a708-fb85f372a577', // Tập 5
  'dcc0a1de-3258-4f6d-a18d-90360b34b80b', // Tập 4
  'd880047a-4552-4292-a29d-0f9de77551b8', // Tập 3
  '0af25685-79bd-4acf-b148-d4638060c392', // Tập 2
  'a49a26fc-2d06-4b96-bbe0-a3fb0ebc59b9', // Tập 1
  '74f36d39-9a65-4a14-9b3e-0c14b6df8616', // Trailer
  '00c27772-6b68-4a8d-80bf-97b924d0b500', // TheoDauChanTran special film
]

// ─── Shared video projection & mapper ────────────────────────────────────────
const VIDEO_PROJECTION = `{
  _id, "slug": slug.current,
  title_vi, title_en, category, youtubeId,
  "videoUrl": videoFile.asset->url,
  thumbnailUrl, "thumbnailImageUrl": thumbnailImage.asset->url,
  description_vi, description_en, duration, date, tags, hasTranscript
}`

function mapVideo(doc: Record<string, unknown>): Video {
  return {
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
  }
}

// ─── Initial page load: pinned + first N non-pinned ───────────────────────────
export async function fetchVideos(limit = 24): Promise<{ videos: Video[]; total: number }> {
  try {
    const [pinnedDocs, nonPinnedDocs, total] = await Promise.all([
      readClient.fetch<Record<string, unknown>[]>(
        `*[_type == "video" && _id in $ids] ${VIDEO_PROJECTION}`,
        { ids: PINNED_VIDEO_IDS }
      ),
      readClient.fetch<Record<string, unknown>[]>(
        `*[_type == "video" && !(_id in $ids)] | order(date desc) [0...${limit}] ${VIDEO_PROJECTION}`,
        { ids: PINNED_VIDEO_IDS }
      ),
      readClient.fetch<number>(`count(*[_type == "video" && !(_id in $ids)])`, { ids: PINNED_VIDEO_IDS }),
    ])

    if (!pinnedDocs.length && !nonPinnedDocs.length) {
      return { videos: mockVideos, total: mockVideos.length }
    }

    const pinned = PINNED_VIDEO_IDS
      .map(id => pinnedDocs.find(d => d._id === id))
      .filter(Boolean)
      .map(d => ({ ...mapVideo(d!), pinned: true as const }))

    const rest = nonPinnedDocs.map(mapVideo)
    return { videos: [...pinned, ...rest], total: (total ?? 0) + pinned.length }
  } catch {
    return { videos: mockVideos, total: mockVideos.length }
  }
}

// ─── Load more non-pinned videos (for client pagination) ─────────────────────
export async function fetchMoreVideos(offset: number, limit = 24): Promise<{ videos: Video[]; hasMore: boolean }> {
  try {
    const [docs, total] = await Promise.all([
      readClient.fetch<Record<string, unknown>[]>(
        `*[_type == "video" && !(_id in $ids)] | order(date desc) [${offset}...${offset + limit}] ${VIDEO_PROJECTION}`,
        { ids: PINNED_VIDEO_IDS }
      ),
      readClient.fetch<number>(`count(*[_type == "video" && !(_id in $ids)])`, { ids: PINNED_VIDEO_IDS }),
    ])
    return { videos: docs.map(mapVideo), hasMore: (total ?? 0) > offset + limit }
  } catch {
    return { videos: [], hasMore: false }
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
        coverImage,
        coverImageUrl
      }`,
      {}
    )
    if (!docs?.length) return mockNews
    const sanityNews = docs.map((doc: Record<string, unknown>): NewsArticle => {
      // coverImage can be a Sanity image asset reference (Studio upload) or null.
      // coverImageUrl is a plain string URL (form upload via /api/upload).
      // Use urlFor() for asset references so Sanity's image pipeline resizes correctly.
      let coverImage = ''
      if (doc.coverImage && typeof doc.coverImage === 'object') {
        coverImage = urlFor(doc.coverImage as object).width(1200).url()
      } else if (doc.coverImageUrl && typeof doc.coverImageUrl === 'string') {
        coverImage = doc.coverImageUrl
      }
      return {
        _id: doc._id as string,
        slug: (doc.slug as string) ?? (doc._id as string),
        title: doc.title as string,
        excerpt: doc.excerpt as string,
        body_vi: (doc.body_vi as string) ?? '',
        body_en: (doc.body_en as string) ?? '',
        date: doc.date as string,
        coverImage,
        author: doc.author as string,
        readingTime: (doc.readingTime as number) ?? 5,
        tags: (doc.tags as string[]) ?? [],
        sourceUrl: doc.sourceUrl as string | undefined,
      }
    })
    // Always merge with mock news so curated articles are never lost.
    // Sanity community articles appear first; mock articles fill the rest (deduped by slug).
    const sanitySlugSet = new Set(sanityNews.map(n => n.slug))
    const dedupedMock   = mockNews.filter(m => !sanitySlugSet.has(m.slug))
    return [...sanityNews, ...dedupedMock]
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
      {}
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

// ─── Single news article by slug ────────────────────────────────────────────
export async function fetchNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const doc = await readClient.fetch<Record<string, unknown>>(
      `*[_type == "newsArticle" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        title, excerpt, body_vi, body_en, date, author,
        readingTime, tags, sourceUrl,
        coverImage, coverImageUrl
      }`,
      { slug }
    )
    if (!doc?._id) return null
    let coverImage = ''
    if (doc.coverImage && typeof doc.coverImage === 'object') {
      coverImage = urlFor(doc.coverImage as object).width(1200).url()
    } else if (doc.coverImageUrl && typeof doc.coverImageUrl === 'string') {
      coverImage = doc.coverImageUrl
    }
    return {
      _id: doc._id as string,
      slug: (doc.slug as string) ?? slug,
      title: doc.title as string,
      excerpt: (doc.excerpt as string) ?? '',
      body_vi: (doc.body_vi as string) ?? '',
      body_en: (doc.body_en as string) ?? '',
      date: doc.date as string,
      coverImage,
      author: (doc.author as string) ?? '',
      readingTime: (doc.readingTime as number) ?? 5,
      tags: (doc.tags as string[]) ?? [],
      sourceUrl: doc.sourceUrl as string | undefined,
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
