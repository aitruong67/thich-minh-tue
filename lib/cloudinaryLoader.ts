interface CloudinaryLoaderParams {
  src: string
  width: number
  quality?: number
}

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderParams): string {
  if (src.startsWith('https://res.cloudinary.com')) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const params = [`f_auto`, `c_limit`, `w_${width}`, `q_${quality || 'auto'}`]
    const paramsStr = params.join(',')
    const urlParts = src.split('/upload/')
    return `${urlParts[0]}/upload/${paramsStr}/${urlParts[1]}`
  }
  // Fallback for non-Cloudinary images (Unsplash, etc.)
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}&q=${quality || 75}`
}
