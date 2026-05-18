import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit Content — Minh Tuệ Archive',
  description: 'Share an article, photo, or video related to Thầy Minh Tuệ\'s journey. All submissions are reviewed before publication.',
}

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
