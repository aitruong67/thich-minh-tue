'use client'

import { useState, useRef } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Lotus from '@/components/ui/Lotus'

type SubmissionType = 'article' | 'photo' | 'video'
type UploadStatus = 'idle' | 'uploading' | 'done' | 'error'

const TYPES = [
  {
    id: 'article' as SubmissionType,
    icon: '📝',
    label_en: 'Article',     label_vi: 'Bài viết',
    desc_en: 'Share a story, report or reflection',
    desc_vi: 'Chia sẻ câu chuyện, bài báo hoặc suy ngẫm',
  },
  {
    id: 'photo' as SubmissionType,
    icon: '🖼️',
    label_en: 'Photo',       label_vi: 'Hình ảnh',
    desc_en: 'Upload a photo from your device',
    desc_vi: 'Tải ảnh từ thiết bị của bạn lên',
  },
  {
    id: 'video' as SubmissionType,
    icon: '🎥',
    label_en: 'Video',       label_vi: 'Video',
    desc_en: 'Upload a video or share a YouTube link',
    desc_vi: 'Tải video lên hoặc chia sẻ link YouTube',
  },
]

const fadeUp = {
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

// ─── File upload zone ────────────────────────────────────────────────────────
function FileUploadZone({
  accept, maxLabel, icon, hint_en, hint_vi, isVi, onUploaded,
}: {
  accept: string
  maxLabel: string
  icon: string
  hint_en: string
  hint_vi: string
  isVi: boolean
  onUploaded: (url: string) => void
}) {
  const inputRef                    = useRef<HTMLInputElement>(null)
  const [dragging, setDragging]     = useState(false)
  const [status, setStatus]         = useState<UploadStatus>('idle')
  const [progress, setProgress]     = useState(0)
  const [preview, setPreview]       = useState<string | null>(null)
  const [filename, setFilename]     = useState<string | null>(null)
  const [errorMsg, setErrorMsg]     = useState('')

  async function handleFile(file: File) {
    setFilename(file.name)
    setStatus('uploading')
    setProgress(0)
    setErrorMsg('')

    // Local image preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = e => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }

    // Fake progress animation
    let pct = 0
    const ticker = setInterval(() => {
      pct = Math.min(pct + 8, 85)
      setProgress(pct)
    }, 250)

    try {
      const fd = new FormData()
      fd.append('file', file)
      const res  = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      clearInterval(ticker)
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setProgress(100)
      setStatus('done')
      onUploaded(data.url)
    } catch (err: unknown) {
      clearInterval(ticker)
      setProgress(0)
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed')
    }
  }

  function reset() {
    setStatus('idle'); setPreview(null); setFilename(null)
    setProgress(0); setErrorMsg(''); onUploaded('')
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  if (status === 'done') {
    return (
      <div className="border border-saffron/40 bg-saffron/5 rounded-lg p-4 flex items-center gap-4">
        {preview
          ? <img src={preview} alt="" className="w-14 h-14 object-cover rounded flex-shrink-0" />
          : <span className="text-3xl flex-shrink-0">🎞️</span>}
        <div className="flex-1 min-w-0">
          <p className="font-ui text-label uppercase tracking-widest text-saffron mb-0.5">
            ✓ {isVi ? 'Đã tải lên thành công' : 'Uploaded successfully'}
          </p>
          <p className="font-body text-ash text-sm truncate">{filename}</p>
        </div>
        <button type="button" onClick={reset}
          className="text-ash/40 hover:text-rose-400 transition-colors text-lg leading-none flex-shrink-0">
          ✕
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        className={`relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer ${
          dragging ? 'border-saffron bg-saffron/5 scale-[1.01]' : 'border-bark hover:border-saffron/50 hover:bg-bark/5'
        } ${status === 'error' ? 'border-rose-500/50' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => status !== 'uploading' && inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept={accept} className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

        <div className="py-10 px-6 text-center">
          {status === 'uploading' ? (
            <>
              <p className="font-ui text-label uppercase tracking-widest text-ash mb-4">
                {isVi ? 'Đang tải lên…' : 'Uploading…'} <span className="text-saffron">{filename}</span>
              </p>
              <div className="w-full max-w-xs mx-auto bg-bark rounded-full h-1.5 overflow-hidden">
                <div className="bg-saffron h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }} />
              </div>
              <p className="font-ui text-[0.6rem] uppercase tracking-widest text-ash/40 mt-3">{progress}%</p>
            </>
          ) : (
            <>
              <span className="text-4xl mb-4 block">{icon}</span>
              <p className="font-display text-parchment text-lg mb-1">
                {isVi ? hint_vi : hint_en}
              </p>
              <p className="font-ui text-[0.6rem] uppercase tracking-widest text-ash/50 mb-3">
                {isVi ? 'Kéo thả vào đây hoặc nhấn để chọn' : 'Drag & drop here, or click to browse'}
              </p>
              <p className="font-ui text-[0.55rem] uppercase tracking-widest text-ash/30">
                Max {maxLabel}
              </p>
              {status === 'error' && (
                <p className="mt-3 font-ui text-label text-rose-400">{errorMsg}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function SubmitPage() {
  const locale = useLocale()
  const isVi   = locale === 'vi'

  const [step, setStep]       = useState<1 | 2 | 3>(1)
  const [type, setType]       = useState<SubmissionType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [videoTab, setVideoTab] = useState<'youtube' | 'upload'>('youtube')

  const [form, setForm] = useState({
    name: '', email: '', title: '', description: '',
    content: '', mediaUrl: '', youtubeUrl: '', sourceUrl: '',
  })

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!type) return
    setError('')
    setLoading(true)
    try {
      const payload = {
        submissionType: type,
        ...form,
        // For video: prefer uploaded URL if present, otherwise YouTube
        youtubeUrl: videoTab === 'youtube' ? form.youtubeUrl : '',
        mediaUrl: videoTab === 'upload' ? form.mediaUrl : (type === 'photo' ? form.mediaUrl : ''),
      }
      const res  = await fetch('/api/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setStep(3)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink pt-16">
      <div className="h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <Lotus size={32} className="mx-auto mb-5 text-ember" />
          <p className="section-label mb-3">
            {isVi ? 'Đóng góp cộng đồng' : 'Community contribution'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-parchment leading-tight">
            {isVi ? 'Gửi Nội Dung' : 'Submit Content'}
          </h1>
          <p className="font-body text-ash mt-4 max-w-md mx-auto leading-relaxed">
            {isVi
              ? 'Chia sẻ bài viết, hình ảnh hoặc video về Thầy Minh Tuệ. Mỗi nội dung sẽ được xem xét trước khi đăng.'
              : 'Share an article, photo or video about Thầy Minh Tuệ. Each submission is reviewed before publication.'}
          </p>
        </div>

        {/* Progress dots */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-ui text-[0.65rem] transition-colors ${
                  step >= s ? 'bg-saffron text-ink' : 'bg-bark text-ash'
                }`}>{s}</div>
                {s < 2 && <div className={`w-12 h-px ${step > s ? 'bg-saffron' : 'bg-bark'}`} />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Choose type ── */}
          {step === 1 && (
            <motion.div key="step1" {...fadeUp}>
              <p className="font-ui text-label uppercase tracking-[0.14em] text-ash text-center mb-6">
                {isVi ? 'Bạn muốn gửi gì?' : 'What would you like to submit?'}
              </p>
              <div className="grid gap-4">
                {TYPES.map(t => (
                  <button key={t.id} onClick={() => { setType(t.id); setStep(2) }}
                    className="flex items-center gap-5 p-6 border border-bark hover:border-saffron/50 hover:bg-bark/10 rounded-lg transition-all duration-200 text-left group">
                    <span className="text-4xl flex-shrink-0">{t.icon}</span>
                    <div>
                      <p className="font-display text-xl text-parchment group-hover:text-saffron transition-colors">
                        {isVi ? t.label_vi : t.label_en}
                      </p>
                      <p className="font-body text-ash text-sm mt-0.5">
                        {isVi ? t.desc_vi : t.desc_en}
                      </p>
                    </div>
                    <span className="ml-auto text-bark group-hover:text-saffron transition-colors text-xl">›</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Fill details ── */}
          {step === 2 && type && (
            <motion.div key="step2" {...fadeUp}>
              <div className="flex items-center gap-3 mb-8">
                <button onClick={() => setStep(1)}
                  className="text-ash hover:text-parchment transition-colors font-ui text-label uppercase tracking-widest">
                  ← {isVi ? 'Quay lại' : 'Back'}
                </button>
                <span className="text-bark">·</span>
                <span className="font-ui text-label uppercase tracking-widest text-saffron">
                  {TYPES.find(t => t.id === type)?.[isVi ? 'label_vi' : 'label_en']}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={isVi ? 'Họ tên *' : 'Full name *'}>
                    <input value={form.name} onChange={set('name')} required
                      className="input-field" placeholder={isVi ? 'Nguyễn Văn A' : 'Your name'} />
                  </Field>
                  <Field label={isVi ? 'Email *' : 'Email *'}>
                    <input type="email" value={form.email} onChange={set('email')} required
                      className="input-field" placeholder="you@example.com" />
                  </Field>
                </div>

                {/* Title */}
                <Field label={isVi ? 'Tiêu đề *' : 'Title *'}>
                  <input value={form.title} onChange={set('title')} required
                    className="input-field" placeholder={isVi ? 'Tiêu đề nội dung…' : 'Content title…'} />
                </Field>

                {/* Description */}
                <Field label={isVi ? 'Mô tả ngắn' : 'Short description'}>
                  <textarea value={form.description} onChange={set('description')} rows={2}
                    className="input-field resize-none"
                    placeholder={isVi ? 'Tóm tắt ngắn gọn…' : 'A brief summary…'} />
                </Field>

                {/* ── ARTICLE ── */}
                {type === 'article' && (
                  <>
                    <Field label={isVi ? 'Nội dung bài viết *' : 'Article content *'}>
                      <textarea value={form.content} onChange={set('content')} required rows={8}
                        className="input-field resize-y"
                        placeholder={isVi ? 'Viết nội dung bài viết ở đây…' : 'Write your article here…'} />
                    </Field>
                    <Field label={isVi ? 'Hình ảnh bìa' : 'Cover image (optional)'}>
                      <FileUploadZone
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        maxLabel="20 MB"
                        icon="🖼️"
                        hint_en="Drop a cover image here"
                        hint_vi="Kéo ảnh bìa vào đây"
                        isVi={isVi}
                        onUploaded={url => setForm(p => ({ ...p, mediaUrl: url }))}
                      />
                      <details className="mt-3">
                        <summary className="font-ui text-[0.6rem] uppercase tracking-widest text-ash/50 cursor-pointer hover:text-ash transition-colors">
                          {isVi ? 'Hoặc dùng đường dẫn URL' : 'Or use an image URL instead'}
                        </summary>
                        <div className="mt-2">
                          <input value={form.mediaUrl} onChange={set('mediaUrl')}
                            className="input-field" placeholder="https://…" type="url" />
                        </div>
                      </details>
                    </Field>
                    <Field label={isVi ? 'Nguồn tham khảo' : 'Source URL (optional)'}>
                      <input value={form.sourceUrl} onChange={set('sourceUrl')}
                        className="input-field" placeholder="https://…" type="url" />
                    </Field>
                  </>
                )}

                {/* ── PHOTO ── */}
                {type === 'photo' && (
                  <>
                    <Field label={isVi ? 'Tải ảnh lên *' : 'Upload photo *'}>
                      <FileUploadZone
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        maxLabel="20 MB"
                        icon="🖼️"
                        hint_en="Drop your photo here"
                        hint_vi="Kéo ảnh vào đây"
                        isVi={isVi}
                        onUploaded={url => setForm(p => ({ ...p, mediaUrl: url }))}
                      />
                      {/* URL fallback */}
                      <details className="mt-3">
                        <summary className="font-ui text-[0.6rem] uppercase tracking-widest text-ash/50 cursor-pointer hover:text-ash transition-colors">
                          {isVi ? 'Hoặc dùng đường dẫn URL' : 'Or use an image URL instead'}
                        </summary>
                        <div className="mt-2">
                          <input value={form.mediaUrl} onChange={set('mediaUrl')}
                            className="input-field" placeholder="https://…" type="url" />
                        </div>
                      </details>
                    </Field>
                    <Field label={isVi ? 'Địa điểm chụp' : 'Location (optional)'}>
                      <input value={form.sourceUrl} onChange={set('sourceUrl')}
                        className="input-field" placeholder={isVi ? 'Vd: Bodh Gaya, Ấn Độ' : 'e.g. Bodh Gaya, India'} />
                    </Field>
                  </>
                )}

                {/* ── VIDEO ── */}
                {type === 'video' && (
                  <>
                    {/* Tab switcher */}
                    <Field label={isVi ? 'Chọn cách chia sẻ *' : 'How to share *'}>
                      <div className="flex rounded-lg overflow-hidden border border-bark mb-4">
                        <button type="button" onClick={() => setVideoTab('youtube')}
                          className={`flex-1 py-2.5 font-ui text-label uppercase tracking-[0.1em] transition-colors ${
                            videoTab === 'youtube' ? 'bg-saffron text-ink' : 'text-ash hover:text-parchment'
                          }`}>
                          ▶ YouTube URL
                        </button>
                        <button type="button" onClick={() => setVideoTab('upload')}
                          className={`flex-1 py-2.5 font-ui text-label uppercase tracking-[0.1em] transition-colors border-l border-bark ${
                            videoTab === 'upload' ? 'bg-saffron text-ink' : 'text-ash hover:text-parchment'
                          }`}>
                          📤 {isVi ? 'Tải file lên' : 'Upload file'}
                        </button>
                      </div>

                      <AnimatePresence mode="wait">
                        {videoTab === 'youtube' ? (
                          <motion.div key="yt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <input value={form.youtubeUrl} onChange={set('youtubeUrl')}
                              required={videoTab === 'youtube'}
                              className="input-field" placeholder="https://youtube.com/watch?v=…" type="url" />
                          </motion.div>
                        ) : (
                          <motion.div key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <FileUploadZone
                              accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
                              maxLabel="200 MB"
                              icon="🎬"
                              hint_en="Drop your video file here"
                              hint_vi="Kéo file video vào đây"
                              isVi={isVi}
                              onUploaded={url => setForm(p => ({ ...p, mediaUrl: url }))}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Field>

                    <Field label={isVi ? 'Mô tả chi tiết' : 'Full description'}>
                      <textarea value={form.content} onChange={set('content')} rows={4}
                        className="input-field resize-none"
                        placeholder={isVi ? 'Nội dung video nói về gì…' : 'What the video is about…'} />
                    </Field>
                  </>
                )}

                {error && (
                  <p className="font-ui text-label text-rose-400 text-center">{error}</p>
                )}

                <button type="submit" disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading
                    ? (isVi ? 'Đang gửi…' : 'Submitting…')
                    : (isVi ? 'Gửi nội dung' : 'Submit for review')}
                </button>

                <p className="text-center font-ui text-[0.6rem] text-ash/40 uppercase tracking-widest">
                  {isVi
                    ? 'Nội dung sẽ được xem xét trước khi đăng lên trang'
                    : 'Your submission will be reviewed before publication'}
                </p>
              </form>
            </motion.div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === 3 && (
            <motion.div key="step3" {...fadeUp} className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="font-display text-3xl text-parchment mb-4">
                {isVi ? 'Cảm ơn bạn!' : 'Thank you!'}
              </h2>
              <p className="font-body text-ash leading-relaxed max-w-sm mx-auto mb-2">
                {isVi
                  ? 'Nội dung của bạn đã được gửi thành công và đang chờ xem xét.'
                  : 'Your submission has been received and is awaiting review.'}
              </p>
              <p className="font-body text-ash/60 text-sm leading-relaxed max-w-sm mx-auto mb-10">
                {isVi
                  ? 'Sau khi được duyệt, nội dung sẽ xuất hiện trên trang web.'
                  : 'Once approved by our team, it will appear on the site.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setStep(1); setType(null); setVideoTab('youtube')
                    setForm({ name:'', email:'', title:'', description:'', content:'', mediaUrl:'', youtubeUrl:'', sourceUrl:'' })
                  }}
                  className="btn-primary"
                >
                  {isVi ? 'Gửi thêm' : 'Submit another'}
                </button>
                <a href={`/${locale}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-bark text-ash font-ui text-label uppercase tracking-[0.12em] rounded hover:border-ash/40 transition-colors">
                  {isVi ? 'Về trang chủ' : 'Back to home'}
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-ui text-label uppercase tracking-[0.12em] text-ash mb-2">{label}</label>
      {children}
    </div>
  )
}
