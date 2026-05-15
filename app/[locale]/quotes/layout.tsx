import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teachings & Quotes — Minh Tuệ Archive',
  description: 'Words of wisdom from Minh Tuệ\'s journey — teachings on compassion, simplicity, impermanence, walking, and freedom. Over 200 quotes in Vietnamese and English.',
  openGraph: { title: 'Teachings & Quotes — Minh Tuệ', description: 'Wisdom on compassion, simplicity, impermanence, walking, and freedom.' },
}

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
