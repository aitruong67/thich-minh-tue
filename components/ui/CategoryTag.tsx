import { clsx } from 'clsx'

type TagVariant = 'teaching' | 'interview' | 'pilgrimage' | 'news' | 'compassion' | 'simplicity' | 'impermanence' | 'walking' | 'freedom'

interface CategoryTagProps {
  label: string
  variant?: TagVariant
  className?: string
}

const variantStyles: Record<TagVariant, string> = {
  teaching: 'border-moss text-moss',
  interview: 'border-saffron text-saffron',
  pilgrimage: 'border-ember text-ember',
  news: 'border-parchment/40 text-parchment/60',
  compassion: 'border-ember text-ember',
  simplicity: 'border-saffron text-saffron',
  impermanence: 'border-ash text-ash',
  walking: 'border-moss text-moss',
  freedom: 'border-parchment/40 text-parchment/60',
}

export default function CategoryTag({ label, variant, className }: CategoryTagProps) {
  return (
    <span
      className={clsx(
        'inline-block border font-ui text-label uppercase tracking-[0.12em] px-2 py-0.5',
        variant ? variantStyles[variant] : 'border-saffron/40 text-saffron/60',
        className
      )}
    >
      {label}
    </span>
  )
}
