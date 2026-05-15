/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://minhtuedhutanga.org',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  alternateRefs: [
    { href: 'https://minhtuedhutanga.org/vi', hreflang: 'vi' },
    { href: 'https://minhtuedhutanga.org/en', hreflang: 'en' },
  ],
  exclude: ['/api/*'],
}
