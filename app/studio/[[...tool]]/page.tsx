'use client'

import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then(mod => mod.NextStudio),
  { ssr: false, loading: () => <p style={{ padding: 24, fontFamily: 'sans-serif' }}>Loading Studio…</p> }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
