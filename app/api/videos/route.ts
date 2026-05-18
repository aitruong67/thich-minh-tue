import { NextRequest, NextResponse } from 'next/server'
import { fetchMoreVideos } from '@/lib/sanity'

export async function GET(req: NextRequest) {
  const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0', 10)
  const limit  = parseInt(req.nextUrl.searchParams.get('limit')  || '24', 10)
  const data   = await fetchMoreVideos(offset, limit)
  return NextResponse.json(data)
}
