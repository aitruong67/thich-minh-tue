'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type SubmissionType = 'article' | 'photo' | 'video'
type Status = 'pending' | 'approved' | 'rejected'

interface Submission {
  _id: string
  submissionType: SubmissionType
  status: Status
  name: string
  email: string
  title: string
  description: string
  content: string
  mediaUrl: string
  youtubeUrl: string
  sourceUrl: string
  submittedAt: string
  reviewedAt?: string
  reviewNote?: string
}

interface Counts { pending: number; approved: number; rejected: number; total: number }

const TYPE_ICON: Record<SubmissionType, string> = { article: '📝', photo: '🖼️', video: '🎥' }
const TYPE_LABEL: Record<SubmissionType, string> = { article: 'Article', photo: 'Photo', video: 'Video' }
const STATUS_STYLE: Record<Status, string> = {
  pending:  'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [counts, setCounts]           = useState<Counts>({ pending: 0, approved: 0, rejected: 0, total: 0 })
  const [filter, setFilter]           = useState<'all' | Status>('pending')
  const [loading, setLoading]         = useState(true)
  const [actionId, setActionId]       = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<{ id: string; title: string } | null>(null)
  const [rejectNote, setRejectNote]   = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/submissions?status=${filter}`, { credentials: 'include' })
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setSubmissions(data.submissions || [])
      setCounts(data.counts || { pending: 0, approved: 0, rejected: 0, total: 0 })
    } finally {
      setLoading(false)
    }
  }, [filter, router])

  useEffect(() => { load() }, [load])

  async function review(id: string, action: 'approve' | 'reject', note = '') {
    setActionId(id)
    try {
      await fetch(`/api/admin/review/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action, note }),
      })
      setRejectModal(null)
      setRejectNote('')
      load()
    } finally {
      setActionId(null)
    }
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪷</span>
          <div>
            <h1 className="font-semibold text-gray-900 leading-tight">Minh Tuệ Archive</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/en" target="_blank" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            View site ↗
          </Link>
          <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 transition-colors">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Pending', value: counts.pending, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Approved', value: counts.approved, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
            { label: 'Rejected', value: counts.rejected, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
            { label: 'Total', value: counts.total, color: 'text-gray-700', bg: 'bg-white border-gray-200' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border rounded-lg p-4 text-center`}>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {(['pending', 'all', 'approved', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
                filter === f
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {f === 'all' ? `All (${counts.total})` : `${f} (${counts[f as Status] ?? 0})`}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading submissions…</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No {filter === 'all' ? '' : filter} submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map(sub => (
              <div key={sub._id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Type + status */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-lg">{TYPE_ICON[sub.submissionType]}</span>
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {TYPE_LABEL[sub.submissionType]}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded capitalize ${STATUS_STYLE[sub.status]}`}>
                        {sub.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 truncate">
                      {sub.title}
                    </h3>

                    {/* Meta */}
                    <p className="text-sm text-gray-500">
                      By <span className="font-medium text-gray-700">{sub.name}</span>
                      {' · '}<a href={`mailto:${sub.email}`} className="hover:underline">{sub.email}</a>
                      {' · '}{new Date(sub.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>

                    {/* Description preview */}
                    {sub.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{sub.description}</p>
                    )}

                    {/* Media links */}
                    {sub.youtubeUrl && (
                      <a href={sub.youtubeUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs text-blue-600 hover:underline">
                        ▶ {sub.youtubeUrl}
                      </a>
                    )}
                    {sub.mediaUrl && (
                      <a href={sub.mediaUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs text-blue-600 hover:underline">
                        🔗 {sub.mediaUrl}
                      </a>
                    )}

                    {/* Review note */}
                    {sub.reviewNote && (
                      <p className="mt-2 text-xs text-gray-500 italic">Note: {sub.reviewNote}</p>
                    )}
                  </div>

                  {/* Actions (pending only) */}
                  {sub.status === 'pending' && (
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => review(sub._id, 'approve')}
                        disabled={actionId === sub._id}
                        className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        {actionId === sub._id ? '…' : 'Approve'}
                      </button>
                      <button
                        onClick={() => setRejectModal({ id: sub._id, title: sub.title })}
                        disabled={actionId === sub._id}
                        className="px-4 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="font-semibold text-gray-900 text-lg mb-1">Reject Submission</h2>
            <p className="text-sm text-gray-500 mb-4 line-clamp-1">{rejectModal.title}</p>
            <textarea
              value={rejectNote}
              onChange={e => setRejectNote(e.target.value)}
              placeholder="Optional note for your records…"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-red-400 mb-4 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => review(rejectModal.id, 'reject', rejectNote)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => { setRejectModal(null); setRejectNote('') }}
                className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
