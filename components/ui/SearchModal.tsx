'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { mockNews } from '@/lib/mock/news'
import { mockVideos } from '@/lib/mock/videos'
import { mockQuotes } from '@/lib/mock/quotes'

interface Result {
  type: 'news' | 'video' | 'quote'
  id: string
  title: string
  excerpt: string
  href: string
  image?: string
}

function search(query: string, locale: string): Result[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()

  const newsResults: Result[] = mockNews
    .filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
    .slice(0, 4)
    .map(a => ({
      type: 'news',
      id: a._id,
      title: a.title,
      excerpt: a.excerpt,
      href: (a.body_vi || a.body_en) ? `/${locale}/news/${a.slug}` : (a.sourceUrl || `/${locale}/news`),
      image: a.coverImage,
    }))

  const videoResults: Result[] = mockVideos
    .filter(v => {
      const title = locale === 'vi' ? v.title_vi : v.title_en
      const desc = locale === 'vi' ? v.description_vi : v.description_en
      return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
    })
    .slice(0, 3)
    .map(v => ({
      type: 'video',
      id: v._id,
      title: locale === 'vi' ? v.title_vi : v.title_en,
      excerpt: locale === 'vi' ? v.description_vi : v.description_en,
      href: `/${locale}/videos/${v.slug}`,
      image: v.thumbnailUrl,
    }))

  const quoteResults: Result[] = mockQuotes
    .filter(q2 => {
      const text = locale === 'vi' ? q2.text_vi : q2.text_en
      return text.toLowerCase().includes(q)
    })
    .slice(0, 3)
    .map(q2 => ({
      type: 'quote',
      id: q2._id,
      title: locale === 'vi' ? q2.text_vi.slice(0, 80) + '…' : q2.text_en.slice(0, 80) + '…',
      excerpt: q2.source || '',
      href: `/${locale}/quotes`,
    }))

  return [...newsResults, ...videoResults, ...quoteResults]
}

const TYPE_LABEL: Record<string, string> = { news: 'News', video: 'Video', quote: 'Quote' }
const TYPE_LABEL_VI: Record<string, string> = { news: 'Tin tức', video: 'Video', quote: 'Trích dẫn' }

interface Props { onClose: () => void }

export default function SearchModal({ onClose }: Props) {
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    setResults(search(query, locale))
  }, [query, locale])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const placeholder = locale === 'vi' ? 'Tìm kiếm tin tức, video, trích dẫn…' : 'Search news, videos, quotes…'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={locale === 'vi' ? 'Tìm kiếm' : 'Search'}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel — light theme */}
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent font-body text-gray-800 placeholder:text-gray-400 focus:outline-none text-lg"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-ui uppercase tracking-widest">
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto bg-gray-50">
          {query.trim() === '' ? (
            <p className="font-body text-gray-400 text-sm text-center py-10">
              {locale === 'vi' ? 'Nhập để tìm kiếm…' : 'Start typing to search…'}
            </p>
          ) : results.length === 0 ? (
            <p className="font-body text-gray-400 text-sm text-center py-10">
              {locale === 'vi' ? 'Không tìm thấy kết quả' : 'No results found'}
            </p>
          ) : (
            <ul role="list">
              {results.map(r => (
                <li key={r.id}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-white transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {r.image && (
                      <div className="relative w-14 h-10 flex-shrink-0 overflow-hidden rounded">
                        <Image src={r.image} alt="" fill className="object-cover" sizes="56px" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-ui text-[0.6rem] uppercase tracking-[0.14em] text-crimson">
                          {locale === 'vi' ? TYPE_LABEL_VI[r.type] : TYPE_LABEL[r.type]}
                        </span>
                      </div>
                      <p className="font-display text-gray-800 text-sm leading-snug line-clamp-2">{r.title}</p>
                      {r.excerpt && (
                        <p className="font-body text-gray-500 text-xs leading-snug mt-1 line-clamp-1">{r.excerpt}</p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
