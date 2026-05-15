import { mockNews } from '@/lib/mock/news'

const SITE = 'https://minhtuedhutanga.org'

export async function GET() {
  const items = mockNews
    .filter(a => a.body_en || a.body_vi)
    .map(a => {
      const body = a.body_en || a.body_vi
      const escaped = body
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
      return `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${SITE}/en/news/${a.slug}</link>
      <guid isPermaLink="true">${SITE}/en/news/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <author>${a.author}</author>
      <description><![CDATA[${a.excerpt}]]></description>
      <content:encoded><![CDATA[${escaped}]]></content:encoded>
      ${a.coverImage ? `<enclosure url="${a.coverImage}" type="image/jpeg" length="0" />` : ''}
    </item>`
    }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Minh Tuệ Archive — News</title>
    <link>${SITE}</link>
    <description>International press coverage and updates on the pilgrimage of Minh Tuệ</description>
    <language>en</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE}/logo.png</url>
      <title>Minh Tuệ Archive</title>
      <link>${SITE}</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
