import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      submissionType, name, email, title,
      description, content, mediaUrl, youtubeUrl, sourceUrl,
    } = body

    if (!submissionType || !name?.trim() || !email?.trim() || !title?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const doc = await sanityClient.create({
      _type: 'submission',
      submissionType,
      status: 'pending',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      title: title.trim(),
      description: description?.trim() || '',
      content: content?.trim() || '',
      mediaUrl: mediaUrl?.trim() || '',
      youtubeUrl: youtubeUrl?.trim() || '',
      sourceUrl: sourceUrl?.trim() || '',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, id: doc._id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Submission failed'
    console.error('Submit error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
