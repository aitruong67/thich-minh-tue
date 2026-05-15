/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://minhtuedhutanga.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  alternateRefs: [
    { href: 'https://minhtuedhutanga.com/vi', hreflang: 'vi' },
    { href: 'https://minhtuedhutanga.com/en', hreflang: 'en' },
  ],
  exclude: ['/api/*'],
}
