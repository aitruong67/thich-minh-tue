interface CloudinaryLoaderParams {
  src: string
  width: number
  quality?: number
}

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderParams): string {
  const q = quality || 75

  // Cloudinary assets — use transformation URL
  if (src.startsWith('https://res.cloudinary.com')) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const params = [`f_auto`, `c_limit`, `w_${width}`, `q_${q}`]
    const paramsStr = params.join(',')
    const urlParts = src.split('/upload/')
    return `${urlParts[0]}/upload/${paramsStr}/${urlParts[1]}`
  }

  // Sanity CDN — use URL API to set/replace params (avoids duplicate ?w=)
  if (src.startsWith('https://cdn.sanity.io/')) {
    try {
      const url = new URL(src)
      url.searchParams.set('w', String(width))
      url.searchParams.set('q', String(q))
      url.searchParams.set('auto', 'format')
      url.searchParams.set('fit', 'max')
      return url.toString()
    } catch { /* fall through */ }
  }

  // Generic fallback for all other hosts
  const sep = src.includes('?') ? '&' : '?'
  return `${src}${sep}w=${width}&q=${q}`
}
