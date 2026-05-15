import Link from 'next/link'

interface Crumb { label: string; href?: string }

interface Props {
  crumbs: Crumb[]
  locale: string
}

export default function Breadcrumb({ crumbs, locale }: Props) {
  const home = locale === 'vi' ? 'Trang chủ' : 'Home'

  const all: Crumb[] = [{ label: home, href: `/${locale}` }, ...crumbs]

  return (
    <nav aria-label="Breadcrumb" className="px-4 sm:px-6 md:px-12 lg:px-24 py-4 border-b border-bark/40">
      <ol className="flex flex-wrap items-center gap-1.5 max-w-6xl mx-auto" role="list">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-bark text-xs" aria-hidden="true">›</span>}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="font-ui text-[0.65rem] uppercase tracking-[0.1em] text-ash hover:text-saffron transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="font-ui text-[0.65rem] uppercase tracking-[0.1em] text-saffron"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
