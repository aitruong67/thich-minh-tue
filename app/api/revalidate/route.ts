import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

const PATHS = [
  '/vi/videos', '/en/videos',
  '/vi/gallery', '/en/gallery',
  '/vi/news', '/en/news',
  '/vi/quotes', '/en/quotes',
  '/vi', '/en',
]

function handle(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    for (const path of PATHS) revalidatePath(path)
    revalidateTag('sanity')
    return NextResponse.json({ revalidated: true, paths: PATHS })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}

export const GET = handle
export const POST = handle
