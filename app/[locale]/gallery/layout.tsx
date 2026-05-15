import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery — Minh Tuệ Archive',
  description: 'Curated photographs documenting Minh Tuệ\'s barefoot pilgrimage — portraits, community gatherings, international press coverage, and moments from Vietnam to Thailand, Malaysia, and beyond.',
  openGraph: { title: 'Photo Gallery — Minh Tuệ Archive', description: '20+ photographs from Buddhistdoor, Lion\'s Roar, RFA and international press.' },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
