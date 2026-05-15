import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-ui text-label uppercase tracking-[0.16em] text-saffron mb-4">404</p>
      <h1 className="font-display text-4xl sm:text-5xl text-parchment leading-tight mb-4">
        Page Not Found
      </h1>
      <p className="font-body text-ash max-w-md leading-relaxed mb-8">
        The path you are looking for does not exist — like all things, it has passed.
        <br />
        <span className="text-ash/50 text-sm italic mt-2 block">Trang này không tồn tại.</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/vi" className="btn-primary">
          Return Home (VI)
        </Link>
        <Link href="/en" className="btn-ghost">
          Return Home (EN)
        </Link>
      </div>
    </div>
  )
}
