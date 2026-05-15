import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Minh Tuệ Archive',
  description: 'Get in touch with the Minh Tuệ Archive — share your story, contribute to the archive, or ask a question. We respond in Vietnamese and English.',
  openGraph: { title: 'Contact Minh Tuệ Archive', description: 'Share stories, contribute photos, or get in touch with the archive team.' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
