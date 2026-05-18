export interface Video {
  _id: string
  slug: string
  title_vi: string
  title_en: string
  category: 'teaching' | 'interview' | 'pilgrimage' | 'news'
  duration: string
  youtubeId?: string        // optional — use for YouTube videos
  videoUrl?: string         // optional — use for self-hosted videos
  description_vi: string
  description_en: string
  tags: string[]
  date: string
  hasTranscript: boolean
  transcript?: TranscriptEntry[]
  pinned?: boolean
  mapLocation?: { lat: number; lng: number; name: string }
  thumbnailUrl?: string
}

export interface TranscriptEntry {
  time: number
  text_vi: string
  text_en: string
}

export interface Photo {
  _id: string
  slug: string
  title_vi: string
  title_en: string
  imageUrl: string
  alt_vi: string
  alt_en: string
  year: number
  location: string
  theme: string[]
  caption_vi?: string
  caption_en?: string
  width: number
  height: number
}

export interface Quote {
  _id: string
  text_vi: string
  text_en: string
  theme: 'compassion' | 'simplicity' | 'impermanence' | 'walking' | 'freedom'
  source?: string
  date?: string
  verified?: boolean   // true = confirmed direct quote from a named interview/source
}

export interface NewsArticle {
  _id: string
  slug: string
  title: string
  excerpt: string
  body_vi: string
  body_en: string
  date: string
  coverImage: string
  author: string
  readingTime: number
  tags: string[]
  sourceUrl?: string
}

export interface BiographyChapter {
  _id: string
  year: string
  title_vi: string
  title_en: string
  body_vi: string
  body_en: string
  pullQuote_vi: string
  pullQuote_en: string
  imageUrl: string
  imageAlt_vi: string
  imageAlt_en: string
}

export interface MapWaypoint {
  _id: string
  name_vi: string
  name_en: string
  lat: number
  lng: number
  date: string
  description_vi: string
  description_en: string
  photos: string[]
  province: string
  distanceFromStart?: number
}
