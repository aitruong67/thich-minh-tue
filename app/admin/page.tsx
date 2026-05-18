'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────
type SubmissionType = 'article' | 'photo' | 'video'
type Status         = 'pending' | 'approved' | 'rejected'
type StatusFilter   = Status | 'all'
type TypeFilter     = SubmissionType | 'all'

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
  language?: string
  submittedAt: string
  reviewedAt?: string
  reviewNote?: string
}

interface Counts { pending: number; approved: number; rejected: number; total: number }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function ytThumb(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/)([^&?/]{11})/)
  return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null
}

// ─── Constants ────────────────────────────────────────────────────────────────
const TYPE_META: Record<SubmissionType, { label: string; color: string; dot: string }> = {
  article: { label: 'Article', color: 'text-blue-400 bg-blue-400/10',   dot: 'bg-blue-400' },
  photo:   { label: 'Photo',   color: 'text-violet-400 bg-violet-400/10', dot: 'bg-violet-400' },
  video:   { label: 'Video',   color: 'text-rose-400 bg-rose-400/10',   dot: 'bg-rose-400' },
}
const STATUS_META: Record<Status, { label: string; color: string }> = {
  pending:  { label: 'Pending',  color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  approved: { label: 'Approved', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  rejected: { label: 'Rejected', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter()

  const [all,         setAll]         = useState<Submission[]>([])
  const [counts,      setCounts]      = useState<Counts>({ pending: 0, approved: 0, rejected: 0, total: 0 })
  const [statusFilter,setStatusFilter]= useState<StatusFilter>('pending')
  const [typeFilter,  setTypeFilter]  = useState<TypeFilter>('all')
  const [search,      setSearch]      = useState('')
  const [loading,     setLoading]     = useState(true)
  const [selected,    setSelected]    = useState<Submission | null>(null)
  const [actionId,    setActionId]    = useState<string | null>(null)
  const [rejectNote,  setRejectNote]  = useState('')
  const [showReject,  setShowReject]  = useState<Submission | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/submissions?status=all', { credentials: 'include' })
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setAll(data.submissions || [])
      setCounts(data.counts || { pending: 0, approved: 0, rejected: 0, total: 0 })
    } finally { setLoading(false) }
  }, [router])

  useEffect(() => { load() }, [load])

  // Keyboard: / to focus search, Escape to close panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault(); searchRef.current?.focus()
      }
      if (e.key === 'Escape') { setSelected(null); setShowReject(null) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  async function review(id: string, action: 'approve' | 'reject', note = '') {
    setActionId(id)
    try {
      await fetch(`/api/admin/review/${id}`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, note }),
      })
      setShowReject(null); setRejectNote('')
      if (selected?._id === id) setSelected(null)
      await load()
    } finally { setActionId(null) }
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  // Filtering
  const filtered = all.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    if (typeFilter !== 'all' && s.submissionType !== typeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!s.title.toLowerCase().includes(q) && !s.name.toLowerCase().includes(q) && !s.email.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">

      {/* ── TOP BAR ──────────────────────────────────────────────────────────── */}
      <header className="h-14 flex-shrink-0 flex items-center gap-4 px-5 border-b border-white/[0.06] bg-[#0f0f17]">
        {/* Brand */}
        <div className="flex items-center gap-2.5 mr-2">
          <span className="text-lg">🪷</span>
          <span className="font-semibold text-sm text-white/80 hidden sm:block">Minh Tuệ</span>
          <span className="text-white/20 hidden sm:block">·</span>
          <span className="text-xs text-white/30 hidden sm:block uppercase tracking-widest">Admin</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xs relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 w-3.5 h-3.5" />
          <input
            ref={searchRef}
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search title, name, email…"
            className="w-full bg-white/5 border border-white/8 rounded-lg pl-9 pr-8 py-1.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50">
              <XSmallIcon className="w-3 h-3" />
            </button>
          )}
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/15 text-[10px] font-mono hidden sm:block" style={{ display: search ? 'none' : '' }}>/</span>
        </div>

        {/* Stat chips */}
        <div className="flex items-center gap-2 ml-auto">
          {counts.pending > 0 && (
            <button onClick={() => setStatusFilter('pending')}
              className="hidden sm:flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/25 rounded-full px-3 py-1 text-xs font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {counts.pending} pending
            </button>
          )}
        </div>

        {/* Actions */}
        <button onClick={load} title="Refresh"
          className="p-2 text-white/30 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5">
          <RefreshIcon className="w-4 h-4" />
        </button>
        <Link href="/en" target="_blank"
          className="hidden sm:flex p-2 text-white/30 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5" title="View site">
          <ExternalIcon className="w-4 h-4" />
        </Link>
        <button onClick={logout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
          <LogoutIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Out</span>
        </button>
      </header>

      {/* ── FILTER BAR ───────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center justify-between gap-4 px-5 py-2.5 border-b border-white/[0.05] bg-[#0d0d15]">
        {/* Status tabs */}
        <div className="flex items-center gap-0.5">
          {(['pending','all','approved','rejected'] as StatusFilter[]).map(f => {
            const count = f === 'all' ? counts.total : counts[f as Status] ?? 0
            return (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  statusFilter === f
                    ? 'bg-white/10 text-white'
                    : 'text-white/35 hover:text-white/60 hover:bg-white/5'
                }`}>
                {f === 'all' ? 'All' : f}
                {count > 0 && (
                  <span className={`ml-1.5 tabular-nums ${
                    f === 'pending' && count > 0 ? 'text-amber-400 font-bold' : 'text-white/30'
                  }`}>{count}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Type pills */}
        <div className="flex items-center gap-1.5">
          {(['all','article','photo','video'] as TypeFilter[]).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                typeFilter === t
                  ? t === 'all'
                    ? 'bg-white/15 text-white'
                    : `${TYPE_META[t as SubmissionType].color} border border-current/20`
                  : 'text-white/30 hover:text-white/50 hover:bg-white/5'
              }`}>
              {t === 'all' ? 'All types' : TYPE_META[t as SubmissionType].label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN AREA ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Table */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${selected ? 'lg:mr-[420px]' : ''}`}>

          {/* Column headers */}
          {!loading && filtered.length > 0 && (
            <div className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 px-5 py-2 bg-[#0d0d15] border-b border-white/[0.04]">
              <div className="w-20 font-ui text-[10px] uppercase tracking-widest text-white/20">Type</div>
              <div className="font-ui text-[10px] uppercase tracking-widest text-white/20">Submission</div>
              <div className="w-28 font-ui text-[10px] uppercase tracking-widest text-white/20 hidden md:block">Submitted</div>
              <div className="w-24 font-ui text-[10px] uppercase tracking-widest text-white/20 hidden sm:block">Status</div>
              <div className="w-28 font-ui text-[10px] uppercase tracking-widest text-white/20 text-right">Actions</div>
            </div>
          )}

          {loading ? (
            <div className="p-8 space-y-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-14 rounded-lg bg-white/[0.03] animate-pulse" style={{ opacity: 1 - i * 0.15 }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <span className="text-5xl opacity-20">
                {search ? '🔍' : statusFilter === 'pending' ? '⏳' : statusFilter === 'approved' ? '✓' : '○'}
              </span>
              <p className="text-white/30 text-sm">
                {search ? `No results for "${search}"` : `No ${statusFilter === 'all' ? '' : statusFilter} submissions`}
              </p>
              {search && (
                <button onClick={() => setSearch('')} className="text-xs text-amber-400 hover:text-amber-300">
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filtered.map(sub => {
                const tm = TYPE_META[sub.submissionType]
                const sm = STATUS_META[sub.status]
                const thumb = sub.youtubeUrl ? ytThumb(sub.youtubeUrl) : sub.mediaUrl || null
                const busy  = actionId === sub._id
                const isSelected = selected?._id === sub._id

                return (
                  <div key={sub._id}
                    onClick={() => setSelected(isSelected ? null : sub)}
                    className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 items-center px-5 py-3 cursor-pointer transition-all duration-100 group ${
                      isSelected ? 'bg-amber-500/8 border-l-2 border-amber-500' : 'hover:bg-white/[0.025] border-l-2 border-transparent'
                    }`}>

                    {/* Type */}
                    <div className="w-20 flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tm.dot}`} />
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tm.color}`}>
                        {tm.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex items-center gap-3 pr-4">
                      {/* Thumbnail */}
                      {thumb ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={thumb} alt="" className="w-9 h-9 object-cover rounded flex-shrink-0 opacity-70 group-hover:opacity-90 transition-opacity" />
                      ) : (
                        <div className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-base flex-shrink-0">
                          {sub.submissionType === 'article' ? '📝' : sub.submissionType === 'photo' ? '🖼️' : '🎥'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white/85 truncate leading-tight">{sub.title}</p>
                        <p className="text-[11px] text-white/35 truncate mt-0.5">
                          {sub.name}
                          <span className="text-white/20 mx-1">·</span>
                          {sub.email}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="w-28 hidden md:block">
                      <span className="text-xs text-white/30">{timeAgo(sub.submittedAt)}</span>
                    </div>

                    {/* Status */}
                    <div className="w-24 hidden sm:block">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sm.color}`}>
                        {sm.label}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="w-28 flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      {sub.status === 'pending' ? (
                        <>
                          <button onClick={() => review(sub._id, 'approve')} disabled={busy}
                            className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 hover:text-white text-[11px] font-semibold rounded-md transition-all disabled:opacity-40">
                            {busy ? '…' : 'Approve'}
                          </button>
                          <button onClick={() => { setShowReject(sub) }} disabled={busy}
                            className="p-1.5 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all disabled:opacity-40">
                            <XSmallIcon className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-white/15 italic pr-1">
                          {sub.reviewedAt ? timeAgo(sub.reviewedAt) : '—'}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Footer count */}
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-white/[0.04]">
              <p className="text-[11px] text-white/20">
                Showing {filtered.length} {filtered.length === 1 ? 'submission' : 'submissions'}
                {search && ` matching "${search}"`}
              </p>
            </div>
          )}
        </div>

        {/* ── DETAIL PANEL ──────────────────────────────────────────────────── */}
        {selected && (
          <div className="fixed right-0 top-0 bottom-0 w-full lg:w-[420px] bg-[#0f0f18] border-l border-white/[0.07] flex flex-col z-40 shadow-2xl">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${TYPE_META[selected.submissionType].color}`}>
                  {TYPE_META[selected.submissionType].label}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[selected.status].color}`}>
                  {STATUS_META[selected.status].label}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 text-white/30 hover:text-white/70 hover:bg-white/5 rounded-lg transition-all">
                <XSmallIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

              {/* Thumbnail */}
              {(selected.youtubeUrl || selected.mediaUrl) && (
                <div className="rounded-lg overflow-hidden bg-white/5 aspect-video relative">
                  {selected.youtubeUrl && ytThumb(selected.youtubeUrl) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={ytThumb(selected.youtubeUrl)!} alt="" className="w-full h-full object-cover" />
                  ) : selected.mediaUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={selected.mediaUrl} alt="" className="w-full h-full object-cover" />
                  ) : null}
                  {selected.youtubeUrl && (
                    <a href={selected.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-900 ml-0.5" />
                      </div>
                    </a>
                  )}
                </div>
              )}

              {/* Title */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Title</p>
                <h2 className="text-base font-semibold text-white leading-snug">{selected.title}</h2>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-2 bg-white/[0.03] rounded-lg px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/35 text-xs">Submitter</span>
                  <span className="text-white/70 font-medium">{selected.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/35 text-xs">Email</span>
                  <a href={`mailto:${selected.email}`} className="text-amber-400 text-xs hover:underline">{selected.email}</a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/35 text-xs">Submitted</span>
                  <span className="text-white/50 text-xs">{new Date(selected.submittedAt).toLocaleString('en-GB', { day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit' })}</span>
                </div>
                {selected.language && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/35 text-xs">Language</span>
                    <span className="text-white/50 text-xs uppercase">{selected.language}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {selected.description && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Description</p>
                  <p className="text-sm text-white/55 leading-relaxed">{selected.description}</p>
                </div>
              )}

              {/* Content preview */}
              {selected.content && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">Content</p>
                  <div className="bg-white/[0.03] rounded-lg px-4 py-3 max-h-48 overflow-y-auto">
                    <p className="text-sm text-white/50 leading-relaxed whitespace-pre-wrap">{selected.content}</p>
                  </div>
                </div>
              )}

              {/* Links */}
              {(selected.youtubeUrl || selected.mediaUrl || selected.sourceUrl) && (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">Links</p>
                  {selected.youtubeUrl && (
                    <a href={selected.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                      <span className="opacity-60">▶</span>
                      <span className="truncate">{selected.youtubeUrl}</span>
                    </a>
                  )}
                  {selected.mediaUrl && (
                    <a href={selected.mediaUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                      <span className="opacity-60">🔗</span>
                      <span className="truncate">{selected.mediaUrl}</span>
                    </a>
                  )}
                  {selected.sourceUrl && (
                    <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-white/30 hover:text-white/50 transition-colors">
                      <span className="opacity-60">↗</span>
                      <span className="truncate">{selected.sourceUrl}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Review note */}
              {selected.reviewNote && (
                <div className="bg-red-500/8 border border-red-500/15 rounded-lg px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-1.5">Reject note</p>
                  <p className="text-sm text-white/40">{selected.reviewNote}</p>
                </div>
              )}

              <p className="text-[10px] text-white/15 font-mono">{selected._id}</p>
            </div>

            {/* Panel actions */}
            {selected.status === 'pending' && (
              <div className="flex-shrink-0 flex gap-3 px-5 py-4 border-t border-white/[0.07]">
                <button onClick={() => review(selected._id, 'approve')} disabled={!!actionId}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-semibold text-sm py-2.5 rounded-xl transition-colors">
                  {actionId === selected._id ? 'Publishing…' : '✓ Approve & Publish'}
                </button>
                <button onClick={() => setShowReject(selected)} disabled={!!actionId}
                  className="flex-1 bg-white/5 hover:bg-red-500/15 hover:text-red-400 disabled:opacity-40 text-white/50 font-semibold text-sm py-2.5 rounded-xl transition-all">
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── REJECT MODAL ──────────────────────────────────────────────────────── */}
      {showReject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={e => e.target === e.currentTarget && setShowReject(null)}>
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 text-sm">✕</div>
              <div>
                <h3 className="text-white font-semibold text-sm">Reject submission</h3>
                <p className="text-white/35 text-xs truncate max-w-[200px]">{showReject.title}</p>
              </div>
            </div>
            <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)} autoFocus
              placeholder="Optional note for your records…" rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 mb-4 resize-none"
            />
            <div className="flex gap-3">
              <button onClick={() => review(showReject._id, 'reject', rejectNote)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                Confirm Reject
              </button>
              <button onClick={() => { setShowReject(null); setRejectNote('') }}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white/50 font-semibold text-sm py-2.5 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function SearchIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
}
function XSmallIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className}><path d="M18 6 6 18M6 6l12 12"/></svg>
}
function RefreshIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
}
function ExternalIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
}
function LogoutIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
}
