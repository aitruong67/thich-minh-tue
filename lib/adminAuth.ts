import crypto from 'crypto'

const SALT = 'minhtue_archive_2025'

export function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD || 'minhtue-admin-2025'
  return crypto.createHash('sha256').update(password + SALT).digest('hex')
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false
  return token === getExpectedToken()
}

export function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&\n?#]{11})/
  )
  return match ? match[1] : null
}
