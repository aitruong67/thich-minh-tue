import type { Metadata } from 'next'
import NewsClient from './NewsClient'

export const metadata: Metadata = {
  title: 'News & Articles — Minh Tuệ Archive',
  description: 'International press coverage of Minh Tuệ — BBC, Radio Free Asia, Buddhistdoor Global, Lion\'s Roar, AsiaNews and more. Full archive of journalism documenting his pilgrimage.',
  openGraph: { title: 'News & Articles — Minh Tuệ Archive', description: 'International press coverage from BBC, RFA, Buddhistdoor, Lion\'s Roar and more.' },
}

export default function Page() {
  return <NewsClient />
}
