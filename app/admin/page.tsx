'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type SubmissionType = 'article' | 'photo' | 'video'
type Status = 'pending' | 'approved' | 'rejected'
type Filter = 'pending' | 'approved' | 'rejected' | 'all'

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

// ─── helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function ytId(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/)([^&?/]{11})/)
  return m ? m[1] : null
}

// ─── nav items ────────────────────────────────────────────────────────────────
const NAV: { label: string; filter: Filter; icon: React.ReactNode }[] = [
  { filter: 'pending',  label: 'Pending',  icon: <ClockIcon /> },
  { filter: 'approved', label: 'Approved', icon: <CheckIcon /> },
  { filter: 'rejected', label: 'Rejected', icon: <XIcon /> },
  { filter: 'all',      label: 'All',      icon: <GridIcon /> },
]

// ─── main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [counts, setCounts]           = useState<Counts>({ pending: 0, approved: 0, rejected: 0, total: 0 })
  const [filter, setFilter]           = useState<Filter>('pending')
  const [loading, setLoading]         = useState(true)
  const [actionId, setActionId]       = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<{ id: string; title: string } | null>(null)
  const [rejectNote, setRejectNote]   = useState('')
  const [expanded, setExpanded]       = useState<string | null>(null)

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
      await load()
    } finally {
      setActionId(null)
    }
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const pendingCount = counts.pending

  return (
    <div className="flex h-screen bg-[#0f0f13] overflow-hidden">

      {/* ── SIDEBAR ──────────────────────────────────────────────────────────── */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r border-white/[0.06] bg-[#141418]">

        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-base">
              🪷
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Minh Tuệ</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-white/25 text-[10px] uppercase tracking-widest px-2 mb-3">Submissions</p>
          {NAV.map(({ filter: f, label, icon }) => {
            const count = f === 'all' ? counts.total : counts[f as Status] ?? 0
            const active = filter === f
            return (
              <button key={f} onClick={() => setFilter(f)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                  active
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}>
                <span className={`w-4 h-4 flex-shrink-0 ${active ? 'text-amber-400' : 'text-white/30 group-hover:text-white/50'}`}>
                  {icon}
                </span>
                <span className="text-sm font-medium flex-1">{label}</span>
                {count > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    f === 'pending' && count > 0
                      ? 'bg-amber-500 text-black'
                      : active ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white/40'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-0.5">
          <Link href="/en" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all text-sm">
            <ExternalIcon />
            View site
          </Link>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm">
            <LogoutIcon />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 h-14 flex items-center justify-between px-6 border-b border-white/[0.06] bg-[#141418]">
          <div className="flex items-center gap-3">
            <h1 className="text-white font-semibold capitalize">
              {filter === 'all' ? 'All Submissions' : `${filter} Submissions`}
            </h1>
            {pendingCount > 0 && filter !== 'pending' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black">
                {pendingCount} pending
              </span>
            )}
          </div>
          <button onClick={load}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
            <RefreshIcon />
            Refresh
          </button>
        </header>

        {/* Stats row */}
        <div className="flex-shrink-0 grid grid-cols-4 gap-px border-b border-white/[0.06] bg-white/[0.04]">
          {[
            { label: 'Pending',  value: counts.pending,  color: 'text-amber-400',  dot: 'bg-amber-400' },
            { label: 'Approved', value: counts.approved, color: 'text-emerald-400', dot: 'bg-emerald-400' },
            { label: 'Rejected', value: counts.rejected, color: 'text-red-400',    dot: 'bg-red-400' },
            { label: 'Total',    value: counts.total,    color: 'text-white/70',   dot: 'bg-white/30' },
          ].map(s => (
            <div key={s.label} className="bg-[#141418] px-6 py-4">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                <span className="text-white/40 text-xs uppercase tracking-widest">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold ${s.color} tabular-nums`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Submission list */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/5 rounded-xl h-24 animate-pulse" />
              ))}
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-4">
                {filter === 'pending' ? '⏳' : filter === 'approved' ? '✓' : filter === 'rejected' ? '✗' : '📋'}
              </div>
              <p className="text-white/50 text-base">No {filter === 'all' ? '' : filter} submissions yet</p>
              <p className="text-white/25 text-sm mt-1">They&apos;ll appear here when submitted</p>
            </div>
          ) : (
            <div className="space-y-3 max-w-4xl">
              {submissions.map(sub => (
                <SubmissionCard
                  key={sub._id}
                  sub={sub}
                  actionId={actionId}
                  expanded={expanded === sub._id}
                  onToggle={() => setExpanded(expanded === sub._id ? null : sub._id)}
                  onApprove={() => review(sub._id, 'approve')}
                  onReject={() => setRejectModal({ id: sub._id, title: sub.title })}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── REJECT MODAL ──────────────────────────────────────────────────────── */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#1c1c22] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <XIcon className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold">Reject Submission</h2>
                <p className="text-white/40 text-xs truncate max-w-xs">{rejectModal.title}</p>
              </div>
            </div>
            <textarea
              value={rejectNote}
              onChange={e => setRejectNote(e.target.value)}
              placeholder="Optional note for your records…"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 mb-4 resize-none"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => review(rejectModal.id, 'reject', rejectNote)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => { setRejectModal(null); setRejectNote('') }}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 py-2.5 rounded-xl text-sm transition-colors"
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

// ─── Submission card ──────────────────────────────────────────────────────────
function SubmissionCard({
  sub, actionId, expanded, onToggle, onApprove, onReject,
}: {
  sub: Submission
  actionId: string | null
  expanded: boolean
  onToggle: () => void
  onApprove: () => void
  onReject: () => void
}) {
  const busy    = actionId === sub._id
  const yt      = sub.youtubeUrl ? ytId(sub.youtubeUrl) : null
  const isPhoto = sub.submissionType === 'photo' && sub.mediaUrl

  const TYPE_COLOR: Record<SubmissionType, string> = {
    article: 'bg-blue-500/15 text-blue-400',
    photo:   'bg-purple-500/15 text-purple-400',
    video:   'bg-rose-500/15 text-rose-400',
  }
  const STATUS_COLOR: Record<string, string> = {
    pending:  'bg-amber-500/15 text-amber-400',
    approved: 'bg-emerald-500/15 text-emerald-400',
    rejected: 'bg-red-500/15 text-red-400',
  }
  const TYPE_ICON: Record<SubmissionType, string> = { article: '📝', photo: '🖼️', video: '🎥' }

  return (
    <div className={`bg-[#1a1a20] border rounded-xl overflow-hidden transition-all duration-200 ${
      expanded ? 'border-amber-500/30' : 'border-white/[0.07] hover:border-white/[0.12]'
    }`}>
      {/* Card header */}
      <div className="flex items-start gap-4 p-4 cursor-pointer" onClick={onToggle}>

        {/* Thumbnail */}
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
          {yt ? (
            <Image
              src={`https://img.youtube.com/vi/${yt}/mqdefault.jpg`}
              alt="" width={64} height={64} className="object-cover w-full h-full"
              unoptimized
            />
          ) : isPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sub.mediaUrl} alt="" className="object-cover w-full h-full" />
          ) : (
            <span className="text-2xl">{TYPE_ICON[sub.submissionType]}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md ${TYPE_COLOR[sub.submissionType]}`}>
              {sub.submissionType}
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md ${STATUS_COLOR[sub.status]}`}>
              {sub.status}
            </span>
          </div>
          <h3 className="text-white font-medium text-sm leading-snug truncate mb-1">
            {sub.title}
          </h3>
          <p className="text-white/40 text-xs">
            <span className="text-white/60">{sub.name}</span>
            {' · '}{sub.email}
            {' · '}{timeAgo(sub.submittedAt)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-2">
          {sub.status === 'pending' && (
            <>
              <button
                onClick={e => { e.stopPropagation(); onApprove() }}
                disabled={busy}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                {busy ? '…' : 'Approve'}
              </button>
              <button
                onClick={e => { e.stopPropagation(); onReject() }}
                disabled={busy}
                className="px-3 py-1.5 bg-white/10 hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50 text-white/60 text-xs font-semibold rounded-lg transition-colors"
              >
                Reject
              </button>
            </>
          )}
          <button
            onClick={e => { e.stopPropagation(); onToggle() }}
            className={`w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/60 transition-all ${expanded ? 'rotate-180' : ''}`}
          >
            <ChevronIcon />
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-white/[0.06] mt-0">
          <div className="pt-4 space-y-3">
            {sub.description && (
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Description</p>
                <p className="text-white/60 text-sm leading-relaxed">{sub.description}</p>
              </div>
            )}
            {sub.content && sub.submissionType === 'article' && (
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Content preview</p>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-4">{sub.content}</p>
              </div>
            )}
            {(sub.youtubeUrl || sub.mediaUrl) && (
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Media</p>
                {sub.youtubeUrl && (
                  <a href={sub.youtubeUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm transition-colors">
                    <span>▶</span>
                    <span className="truncate">{sub.youtubeUrl}</span>
                  </a>
                )}
                {sub.mediaUrl && (
                  <a href={sub.mediaUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm transition-colors">
                    <span>🔗</span>
                    <span className="truncate">{sub.mediaUrl}</span>
                  </a>
                )}
              </div>
            )}
            {sub.reviewNote && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <p className="text-red-400 text-xs font-medium mb-0.5">Reject note</p>
                <p className="text-white/50 text-sm">{sub.reviewNote}</p>
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <p className="text-white/20 text-xs">
                ID: <span className="font-mono">{sub._id}</span>
              </p>
              {sub.reviewedAt && (
                <p className="text-white/20 text-xs">
                  Reviewed {timeAgo(sub.reviewedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function ClockIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function CheckIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg> }
function XIcon({ className = 'w-4 h-4' }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }
function GridIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> }
function ExternalIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> }
function LogoutIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> }
function RefreshIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg> }
function ChevronIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><polyline points="6 9 12 15 18 9"/></svg> }
