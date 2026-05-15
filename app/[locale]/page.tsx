import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import BiographyTimeline from '@/components/sections/BiographyTimeline'
import FeaturedQuote from '@/components/sections/FeaturedQuote'
import InternationalPilgrimage from '@/components/sections/InternationalPilgrimage'
import MediaArchive from '@/components/sections/MediaArchive'
import MapTeaser from '@/components/sections/MapTeaser'
import EconomicImpact from '@/components/sections/EconomicImpact'
import GlobalSupport from '@/components/sections/GlobalSupport'
import { mockQuotes } from '@/lib/mock'

interface HomeProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })
  return {
    title: 'Minh Tuệ — Lưu Trữ Hành Trình Tâm Linh',
    description: t('description'),
  }
}

export default function HomePage() {
  const featuredQuote = mockQuotes.find((q) => q._id === 'q6') ?? mockQuotes[0]

  return (
    <>
      <HeroSection />
      <BiographyTimeline />
      <FeaturedQuote quote={featuredQuote} />
      <EconomicImpact />
      <GlobalSupport />
      <InternationalPilgrimage />
      <MediaArchive />
      <MapTeaser />
    </>
  )
}
