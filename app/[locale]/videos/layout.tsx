import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos — Minh Tuệ Archive',
  description: 'Documentary videos of Minh Tuệ\'s pilgrimage — RFA interviews, walking footage through Thailand, community gatherings, and international press coverage. 120+ videos archived.',
  openGraph: { title: 'Documentary Videos — Minh Tuệ Archive', description: 'Pilgrimage footage, interviews and press coverage from Vietnam to India.' },
}

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
