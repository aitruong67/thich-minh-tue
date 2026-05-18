import { NextRequest, NextResponse } from 'next/server'
import { getExpectedToken } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const expected = process.env.ADMIN_PASSWORD || 'minhtue-admin-2025'

    if (!password || password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = getExpectedToken()
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_token', '', { maxAge: 0, path: '/' })
  return res
}
