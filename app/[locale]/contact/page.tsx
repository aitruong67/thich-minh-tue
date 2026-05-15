'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import Lotus from '@/components/ui/Lotus'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<Status>('idle')
  const [errorDetail, setErrorDetail] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xrejwonl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setErrorDetail(data?.error || data?.errors?.map((e: {message:string}) => e.message).join(', ') || `HTTP ${res.status}`)
        setStatus('error')
      }
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : 'Network error')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-transparent border border-bark text-parchment font-body text-sm px-4 py-3 rounded ' +
    'placeholder:text-ash/50 focus:outline-none focus:border-saffron transition-colors duration-200'

  const labelClass = 'block font-ui text-label uppercase tracking-[0.1em] text-ash mb-2'

  return (
    <div className="pt-16">
      {/* Header */}
      <header className="section-padding pb-12">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="section-label mb-4">{t('eyebrow')}</p>
            <h1 className="section-heading mb-5">{t('heading')}</h1>
            <p className="font-body text-ash leading-relaxed max-w-xl">{t('description')}</p>
          </FadeIn>
        </div>
      </header>

      {/* Form + Info grid */}
      <section className="section-padding pt-0 pb-24">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-14">

          {/* Contact info */}
          <FadeIn className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lotus size={20} />
                <p className="font-ui text-label uppercase tracking-[0.12em] text-saffron">{t('info.title')}</p>
              </div>
              <p className="font-body text-ash leading-relaxed text-sm">{t('info.body')}</p>
            </div>

            <div className="border-t border-bark pt-8 space-y-5">
              <div>
                <p className="font-ui text-label uppercase tracking-[0.12em] text-white/30 mb-1">{t('info.responseTime')}</p>
                <p className="font-body text-ash text-sm">{t('info.responseValue')}</p>
              </div>
              <div>
                <p className="font-ui text-label uppercase tracking-[0.12em] text-white/30 mb-1">{t('info.language')}</p>
                <p className="font-body text-ash text-sm">{t('info.languageValue')}</p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            {status === 'success' ? (
              <div className="border border-saffron/40 bg-saffron/5 rounded p-10 text-center">
                <Lotus size={32} className="mx-auto mb-4" />
                <h2 className="font-display text-2xl text-parchment mb-2">{t('success.heading')}</h2>
                <p className="font-body text-ash text-sm">{t('success.body')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>{t('form.name')}</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder={t('form.namePlaceholder')}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>{t('form.email')}</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder={t('form.emailPlaceholder')}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>{t('form.subject')}</label>
                  <input
                    id="subject" name="subject" type="text" required
                    value={form.subject} onChange={handleChange}
                    placeholder={t('form.subjectPlaceholder')}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>{t('form.message')}</label>
                  <textarea
                    id="message" name="message" required rows={6}
                    value={form.message} onChange={handleChange}
                    placeholder={t('form.messagePlaceholder')}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-body text-sm text-ember">
                    {t('error')}{errorDetail ? ` (${errorDetail})` : ''}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'submitting' ? t('form.sending') : t('form.send')}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
