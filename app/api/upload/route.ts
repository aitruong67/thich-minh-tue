import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export const runtime = 'nodejs'

const MAX_IMAGE_SIZE = 20 * 1024 * 1024  // 20 MB
const MAX_VIDEO_SIZE = 200 * 1024 * 1024 // 200 MB

const ACCEPTED = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo',
]

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ACCEPTED.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      )
    }

    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE

    if (file.size > maxSize) {
      const limit = isImage ? '20 MB' : '200 MB'
      return NextResponse.json(
        { error: `File too large. Maximum size is ${limit}.` },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const assetType = isImage ? 'image' : 'file'

    const asset = await sanityClient.assets.upload(assetType, buffer, {
      filename: file.name,
      contentType: file.type,
    })

    return NextResponse.json({
      url: asset.url,
      assetId: asset._id,
      mediaType: isImage ? 'image' : 'video',
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    console.error('Upload error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
