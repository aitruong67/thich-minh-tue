'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'

export default function NewsletterSignup() {
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')

  const label = locale === 'vi'
    ? { heading: 'Theo dõi hành trình', desc: 'Nhận thông báo khi có cập nhật mới về hành trình của Thầy Minh Tuệ.', placeholder: 'email@cua-ban.com', btn: 'Đăng ký', ok: 'Đã đăng ký! Cảm ơn bạn.', err: 'Có lỗi xảy ra. Vui lòng thử lại.' }
    : { heading: 'Follow the journey', desc: 'Get notified when new updates from Minh Tuệ\'s pilgrimage are posted.', placeholder: 'your@email.com', btn: 'Subscribe', ok: 'Subscribed! Thank you.', err: 'Something went wrong. Please try again.' }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch('https://formspree.io/f/xrejwonl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'Newsletter signup — Minh Tuệ Archive' }),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setEmail('')
    } catch {
      setStatus('err')
    }
  }

  return (
    <div className="border-t border-white/8 pt-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <p className="font-display text-parchment text-lg mb-1">{label.heading}</p>
          <p className="font-body text-white/40 text-sm">{label.desc}</p>
        </div>
        {status === 'ok' ? (
          <p className="font-ui text-label uppercase tracking-[0.1em] text-saffron">{label.ok}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={label.placeholder}
              className="bg-white/8 border border-white/15 text-parchment placeholder:text-white/30 font-body text-sm px-4 py-2 rounded focus:outline-none focus:border-saffron/60 transition-colors w-52"
            />
            <button type="submit" className="btn-primary flex-shrink-0 py-2">
              {label.btn}
            </button>
          </form>
        )}
      </div>
      {status === 'err' && <p className="font-body text-sm text-ember mt-2">{label.err}</p>}
    </div>
  )
}
