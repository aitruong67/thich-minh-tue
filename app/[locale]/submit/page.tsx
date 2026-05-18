'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Lotus from '@/components/ui/Lotus'

type SubmissionType = 'article' | 'photo' | 'video'

const TYPES = [
  {
    id: 'article' as SubmissionType,
    icon: '📝',
    label_en: 'Article',
    label_vi: 'Bài viết',
    desc_en: 'Share a story, report or reflection',
    desc_vi: 'Chia sẻ câu chuyện, bài báo hoặc suy ngẫm',
  },
  {
    id: 'photo' as SubmissionType,
    icon: '🖼️',
    label_en: 'Photo',
    label_vi: 'Hình ảnh',
    desc_en: 'Submit a photo from the journey',
    desc_vi: 'Gửi ảnh từ hành trình của Thầy',
  },
  {
    id: 'video' as SubmissionType,
    icon: '🎥',
    label_en: 'Video',
    label_vi: 'Video',
    desc_en: 'Share a YouTube video',
    desc_vi: 'Chia sẻ video từ YouTube',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

export default function SubmitPage() {
  const locale = useLocale()
  const isVi = locale === 'vi'

  const [step, setStep]             = useState<1 | 2 | 3>(1)
  const [type, setType]             = useState<SubmissionType | null>(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  const [form, setForm] = useState({
    name: '', email: '', title: '', description: '',
    content: '', mediaUrl: '', youtubeUrl: '', sourceUrl: '',
  })

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  function selectType(t: SubmissionType) {
    setType(t)
    setStep(2)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!type) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionType: type, ...form }),
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
      {/* Top accent */}
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

        {/* Progress indicator */}
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
                  <button
                    key={t.id}
                    onClick={() => selectType(t.id)}
                    className="flex items-center gap-5 p-6 border border-bark hover:border-saffron/50 hover:bg-bark/10 rounded-lg transition-all duration-200 text-left group"
                  >
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
                <button
                  onClick={() => setStep(1)}
                  className="text-ash hover:text-parchment transition-colors font-ui text-label uppercase tracking-widest"
                >
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
                    placeholder={isVi ? 'Tóm tắt ngắn gọn về nội dung…' : 'A brief summary…'} />
                </Field>

                {/* Type-specific fields */}
                {type === 'article' && (
                  <>
                    <Field label={isVi ? 'Nội dung bài viết *' : 'Article content *'}>
                      <textarea value={form.content} onChange={set('content')} required rows={8}
                        className="input-field resize-y"
                        placeholder={isVi ? 'Viết nội dung bài viết ở đây…' : 'Write your article here…'} />
                    </Field>
                    <Field label={isVi ? 'Hình ảnh (URL)' : 'Cover image (URL)'}>
                      <input value={form.mediaUrl} onChange={set('mediaUrl')}
                        className="input-field" placeholder="https://…" type="url" />
                    </Field>
                    <Field label={isVi ? 'Nguồn tham khảo (URL)' : 'Source URL (optional)'}>
                      <input value={form.sourceUrl} onChange={set('sourceUrl')}
                        className="input-field" placeholder="https://…" type="url" />
                    </Field>
                  </>
                )}

                {type === 'photo' && (
                  <>
                    <Field label={isVi ? 'Đường dẫn ảnh *' : 'Image URL *'}>
                      <input value={form.mediaUrl} onChange={set('mediaUrl')} required
                        className="input-field" placeholder="https://…" type="url" />
                      <p className="font-ui text-[0.6rem] text-ash/50 mt-1 uppercase tracking-widest">
                        {isVi ? 'Dán link ảnh trực tiếp từ web' : 'Paste a direct image link from the web'}
                      </p>
                    </Field>
                    <Field label={isVi ? 'Nguồn / Nơi chụp' : 'Source / Location'}>
                      <input value={form.sourceUrl} onChange={set('sourceUrl')}
                        className="input-field" placeholder={isVi ? 'Vd: Bodh Gaya, Ấn Độ' : 'e.g. Bodh Gaya, India'} />
                    </Field>
                  </>
                )}

                {type === 'video' && (
                  <>
                    <Field label={isVi ? 'Đường dẫn YouTube *' : 'YouTube URL *'}>
                      <input value={form.youtubeUrl} onChange={set('youtubeUrl')} required
                        className="input-field" placeholder="https://youtube.com/watch?v=…" type="url" />
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

                <p className="text-center font-ui text-[0.6rem] text-ash/50 uppercase tracking-widest">
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
              <p className="font-body text-ash leading-relaxed max-w-sm mx-auto mb-3">
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
                  onClick={() => { setStep(1); setType(null); setForm({ name:'', email:'', title:'', description:'', content:'', mediaUrl:'', youtubeUrl:'', sourceUrl:'' }) }}
                  className="btn-primary"
                >
                  {isVi ? 'Gửi thêm' : 'Submit another'}
                </button>
                <a href={`/${locale}`} className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-bark text-ash font-ui text-label uppercase tracking-[0.12em] rounded hover:border-ash/40 transition-colors">
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
      <label className="block font-ui text-label uppercase tracking-[0.12em] text-ash mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
