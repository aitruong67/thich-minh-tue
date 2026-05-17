import createNextIntlPlugin from 'next-intl/plugin'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    loader: 'custom',
    loaderFile: './lib/cloudinaryLoader.ts',
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.buddhistdoor.net' },
      { protocol: 'https', hostname: 'teahouse.buddhistdoor.net' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'srilankabrief.org' },
      { protocol: 'https', hostname: 'www.rfa.org' },
      { protocol: 'https', hostname: 'www.benarnews.org' },
      { protocol: 'https', hostname: 'images2.thanhnien.vn' },
      { protocol: 'https', hostname: 'thanhnien.mediacdn.vn' },
      { protocol: 'https', hostname: 'vcdn1-english.vnecdn.net' },
      { protocol: 'https', hostname: 'image.vietnamnews.vn' },
      { protocol: 'https', hostname: 'idn.dantri.com.vn' },
      { protocol: 'https', hostname: 'apicms.thestar.com.my' },
      { protocol: 'https', hostname: 'www.lionsroar.com' },
      { protocol: 'https', hostname: 'www.phanthien.com' },
      { protocol: 'https', hostname: 'images.teepublic.com' },
    ],
  },
  transpilePackages: ['@formatjs/intl-localematcher', 'negotiator'],
  serverExternalPackages: ['@sanity/client', '@sanity/image-url', 'sanity'],
  experimental: {
    optimizePackageImports: ['framer-motion', 'yet-another-react-lightbox'],
  },
  webpack: (config, { nextRuntime, webpack }) => {
    if (nextRuntime === 'edge') {
      config.plugins.push(
        new webpack.DefinePlugin({ __dirname: JSON.stringify('/') })
      )
    }
    return config
  },
}

export default withNextIntl(nextConfig)
