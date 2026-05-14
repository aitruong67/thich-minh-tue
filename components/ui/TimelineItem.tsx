import FadeIn from './FadeIn'

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLast?: boolean
  delay?: number
}

export default function TimelineItem({ year, title, description, isLast = false, delay = 0 }: TimelineItemProps) {
  return (
    <FadeIn delay={delay} className="relative flex gap-8 pb-12">
      {/* Left: year + line */}
      <div className="flex flex-col items-center flex-shrink-0 w-20">
        <div className="w-3 h-3 rounded-full bg-saffron ring-2 ring-saffron/30 flex-shrink-0 mt-1" aria-hidden="true" />
        {!isLast && <div className="w-px flex-1 bg-bark mt-2" aria-hidden="true" />}
      </div>

      {/* Right: content */}
      <div className="flex-1 pb-4">
        <time
          className="font-ui text-label uppercase tracking-[0.12em] text-saffron mb-2 block"
          dateTime={year}
        >
          {year}
        </time>
        <h3 className="font-display text-xl text-parchment mb-3">{title}</h3>
        <p className="font-body text-ash leading-relaxed text-sm">{description}</p>
      </div>
    </FadeIn>
  )
}
