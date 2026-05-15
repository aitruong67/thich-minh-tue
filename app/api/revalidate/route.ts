import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    // Revalidate all content-driven pages
    revalidatePath('/vi/gallery')
    revalidatePath('/en/gallery')
    revalidatePath('/vi/videos')
    revalidatePath('/en/videos')
    revalidatePath('/vi/news')
    revalidatePath('/en/news')
    revalidatePath('/vi/quotes')
    revalidatePath('/en/quotes')
    revalidatePath('/vi')
    revalidatePath('/en')
    return NextResponse.json({ revalidated: true })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
