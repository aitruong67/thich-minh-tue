import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import { mockBiographyChapters } from '@/lib/mock'

function BiographyPage() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="pt-16">
      {/* Page header */}
      <header className="section-padding pb-0">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('page.biography.eyebrow')}</p>
            <h1 className="section-heading mb-0">{t('page.biography.heading')}</h1>
          </FadeIn>
        </div>
      </header>

      {/* Chapters */}
      <div className="max-w-6xl mx-auto">
        {mockBiographyChapters.map((chapter, i) => (
          <article
            key={chapter._id}
            className="section-padding border-b border-bark last:border-b-0"
            aria-labelledby={`chapter-${chapter._id}`}
          >
            <div className={`grid lg:grid-cols-2 gap-16 items-start ${i % 2 === 1 ? 'lg:flex lg:flex-row-reverse' : ''}`}>
              {/* Text */}
              <FadeIn delay={0.1}>
                <div>
                  <p className="font-ui text-label uppercase tracking-[0.12em] text-saffron mb-3">
                    {chapter.year}
                  </p>
                  <h2 id={`chapter-${chapter._id}`} className="font-display text-4xl text-parchment leading-tight mb-6">
                    {locale === 'vi' ? chapter.title_vi : chapter.title_en}
                  </h2>
                  <div className="font-body text-ash leading-relaxed space-y-4 mb-8">
                    {(locale === 'vi' ? chapter.body_vi : chapter.body_en)
                      .split('\n\n')
                      .map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                  </div>
                  {/* Pull quote */}
                  <blockquote className="border-l-2 border-saffron pl-6 py-2">
                    <p className="font-display text-xl text-parchment/80 italic leading-relaxed">
                      &ldquo;{locale === 'vi' ? chapter.pullQuote_vi : chapter.pullQuote_en}&rdquo;
                    </p>
                    <footer className="mt-2">
                      <cite className="font-ui text-label uppercase tracking-[0.12em] text-ash not-italic">
                        {t('page.biography.pullQuote')}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </FadeIn>

              {/* Image */}
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={chapter.imageUrl}
                    alt={locale === 'vi' ? chapter.imageAlt_vi : chapter.imageAlt_en}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return <BiographyPage />
}
