import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, extractYoutubeId } from '@/lib/adminAuth'
import { sanityClient } from '@/lib/sanity'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get('admin_token')?.value
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const { action, note } = await req.json()

  if (!['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const sub = await sanityClient.getDocument(id)
  if (!sub || sub._type !== 'submission') {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  }

  // Update submission status
  await sanityClient.patch(id).set({
    status: action === 'approve' ? 'approved' : 'rejected',
    reviewedAt: new Date().toISOString(),
    reviewNote: note?.trim() || '',
  }).commit()

  // On approve: publish as real content
  if (action === 'approve') {
    await publishContent(sub)
  }

  return NextResponse.json({ success: true })
}

async function publishContent(sub: Record<string, unknown>) {
  try {
    const baseSlug = String(sub.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60)

    let draft: { _id: string } | null = null

    if (sub.submissionType === 'video') {
      const ytId = extractYoutubeId(String(sub.youtubeUrl || ''))
      if (!ytId) return
      draft = await sanityClient.create({
        _type: 'video',
        slug: { _type: 'slug', current: `community-${baseSlug}` },
        title_vi: sub.title,
        title_en: sub.title,
        category: 'news',
        youtubeId: ytId,
        description_vi: sub.description || '',
        description_en: sub.description || '',
        date: new Date().toISOString().split('T')[0],
        tags: ['cộng đồng', 'user-submitted'],
        hasTranscript: false,
        thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      })
    }

    if (sub.submissionType === 'photo' && sub.mediaUrl) {
      draft = await sanityClient.create({
        _type: 'photo',
        slug: { _type: 'slug', current: `community-${baseSlug}` },
        title_vi: String(sub.title),
        title_en: String(sub.title),
        source: sub.mediaUrl,
        year: new Date().getFullYear(),
        location: 'Unknown',
        theme: ['community'],
      })
    }

    if (sub.submissionType === 'article') {
      const wordCount = String(sub.content || '').split(/\s+/).length
      draft = await sanityClient.create({
        _type: 'newsArticle',
        slug: { _type: 'slug', current: `community-${baseSlug}` },
        title: sub.title,
        excerpt: String(sub.description || sub.content || '').slice(0, 200),
        body_vi: sub.content || '',
        body_en: sub.content || '',
        date: new Date().toISOString().split('T')[0],
        author: sub.name,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
        tags: ['cộng đồng'],
        sourceUrl: sub.sourceUrl || undefined,
        coverImage: sub.mediaUrl || undefined,
      })
    }

    if (draft) {
      const publishedId = draft._id.replace(/^drafts\./, '')
      await sanityClient.action({
        type: 'sanity.action.document.publish',
        draftId: draft._id,
        publishedId,
      })
    }
  } catch (err) {
    console.error('Failed to publish approved content:', err)
  }
}
