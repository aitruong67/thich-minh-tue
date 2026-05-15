import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minh Tuệ Archive — Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
