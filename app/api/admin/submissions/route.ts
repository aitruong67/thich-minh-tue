import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/adminAuth'
import { sanityClient } from '@/lib/sanity'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const status = req.nextUrl.searchParams.get('status') || 'all'
  const filter = status === 'all' ? '' : ` && status == "${status}"`

  const docs = await sanityClient.fetch(
    `*[_type == "submission"${filter}] | order(submittedAt desc) {
      _id, submissionType, status, name, email, title,
      description, content, mediaUrl, youtubeUrl, sourceUrl,
      submittedAt, reviewedAt, reviewNote
    }`
  )

  const counts = await sanityClient.fetch(`{
    "pending":  count(*[_type == "submission" && status == "pending"]),
    "approved": count(*[_type == "submission" && status == "approved"]),
    "rejected": count(*[_type == "submission" && status == "rejected"]),
    "total":    count(*[_type == "submission"])
  }`)

  return NextResponse.json({ submissions: docs, counts })
}
