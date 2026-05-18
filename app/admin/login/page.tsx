'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Lotus from '@/components/ui/Lotus'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid password')
      }
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Lotus size={36} className="text-ember" />
          </div>
          <h1 className="font-display text-3xl text-parchment mb-1">Admin Access</h1>
          <p className="font-ui text-label text-ash uppercase tracking-widest">Minh Tuệ Archive</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-ui text-label uppercase tracking-[0.12em] text-ash mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-bark/20 border border-bark text-parchment px-4 py-3 font-body focus:outline-none focus:border-saffron transition-colors"
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="font-ui text-label text-rose-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
