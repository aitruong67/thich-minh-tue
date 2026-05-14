/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://thichminhtue.archive.vn',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  alternateRefs: [
    { href: 'https://thichminhtue.archive.vn/vi', hreflang: 'vi' },
    { href: 'https://thichminhtue.archive.vn/en', hreflang: 'en' },
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://thichminhdue.archive.vn/video-sitemap.xml',
      'https://thichminhdue.archive.vn/image-sitemap.xml',
    ],
  },
  exclude: ['/api/*'],
}
