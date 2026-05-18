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

    // Send admin notification (non-blocking — never fails the submission)
    notifyAdmin({ submissionType, name: name.trim(), email: email.trim(), title: title.trim(), description: description?.trim() || '', id: doc._id })
      .catch(err => console.error('Admin notification failed:', err))

    return NextResponse.json({ success: true, id: doc._id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Submission failed'
    console.error('Submit error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ─── Admin email notification via Resend ──────────────────────────────────────
async function notifyAdmin({
  submissionType, name, email, title, description, id,
}: {
  submissionType: string
  name: string
  email: string
  title: string
  description: string
  id: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL
  const resendKey  = process.env.RESEND_API_KEY

  if (!adminEmail || !resendKey || resendKey === 'your-resend-api-key-here') return

  const typeEmoji = ({ article: '📝', photo: '🖼️', video: '🎥' } as Record<string, string>)[submissionType] ?? '📄'
  const dashboardUrl = 'https://minhtuedhutanga.org/admin'

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Minh Tuệ Archive <onboarding@resend.dev>',
      to: [adminEmail],
      subject: `${typeEmoji} New ${submissionType} pending: "${title}"`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#111;">
          <div style="background:#5C0F0F;padding:24px 28px;border-radius:12px 12px 0 0;">
            <p style="color:#C8960C;font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 6px;">Minh Tuệ Archive</p>
            <h1 style="color:#FEF8EE;font-size:20px;margin:0;font-weight:600;">New Submission Pending</h1>
          </div>
          <div style="background:#ffffff;padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <div style="display:inline-block;background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;padding:4px 10px;border-radius:20px;margin-bottom:16px;">
              ${typeEmoji} ${submissionType}
            </div>
            <h2 style="font-size:18px;margin:0 0 10px;color:#111;">${title}</h2>
            ${description ? `<p style="color:#4b5563;font-size:14px;line-height:1.6;margin:0 0 16px;">${description}</p>` : ''}
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#6b7280;">
                Submitted by <strong style="color:#111;">${name}</strong>
                &nbsp;·&nbsp;<a href="mailto:${email}" style="color:#5C0F0F;">${email}</a>
              </p>
            </div>
            <a href="${dashboardUrl}" style="display:inline-block;background:#C8960C;color:#000;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">
              Review in Dashboard →
            </a>
            <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">
              Doc ID: <code style="font-family:monospace;">${id}</code>
            </p>
          </div>
        </div>
      `,
    }),
  })
}
