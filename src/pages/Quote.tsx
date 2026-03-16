import { useState } from 'react'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 0',
  background: 'transparent', border: 'none',
  borderBottom: '1px solid #2a2a2a',
  color: '#fff', fontSize: 15, outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

export default function Quote() {
  const { lang, t } = useLanguage()
  const isAr = lang === 'ar'
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '', organization: '', phone: '', email: '',
    event_date: '', location: '', service_type: '', details: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const reqs = JSON.parse(localStorage.getItem('tkween_requests') || '[]')
      reqs.push({
        ...formData,
        id: Date.now().toString(),
        status: 'new',
        created_at: new Date().toISOString(),
      })
      localStorage.setItem('tkween_requests', JSON.stringify(reqs))
    } catch {}
    setSent(true)
    setFormData({ full_name: '', organization: '', phone: '', email: '',
      event_date: '', location: '', service_type: '', details: '' })
    setTimeout(() => setSent(false), 5000)
  }

  const fields = [
    { key: 'full_name', label: t('form_name'), type: 'text', required: true },
    { key: 'organization', label: t('form_org'), type: 'text', required: false },
    { key: 'phone', label: t('form_phone'), type: 'tel', required: true },
    { key: 'email', label: t('form_email'), type: 'email', required: false },
    { key: 'event_date', label: t('form_date'), type: 'date', required: false },
    { key: 'location', label: t('form_location'), type: 'text', required: false },
  ]

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ padding: '80px 32px 60px', maxWidth: 700, margin: '0 auto' }}>
          <span style={{ color: '#FF3B30', fontSize: 10, letterSpacing: '0.35em' }}>
            {isAr ? 'تكوين' : 'TKWEEN'}
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 200, color: '#fff', marginTop: 12, marginBottom: 12 }}>
            {isAr ? 'طلب عرض سعر' : 'Get a Quote'}
          </h1>
          <p style={{ color: '#555', fontSize: 14, marginBottom: 52 }}>
            {isAr ? 'أخبرنا عن مشروعك وسنعود إليك خلال 24 ساعة.' : 'Tell us about your project and we\'ll get back to you within 24 hours.'}
          </p>

          {sent && (
            <div style={{
              padding: '16px 20px', border: '1px solid #FF3B30',
              color: '#FF3B30', fontSize: 14, marginBottom: 32,
            }}>
              {isAr ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' : 'Your request has been submitted! We\'ll be in touch soon.'}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
              {fields.map(f => (
                <div key={f.key} style={{ marginBottom: 32 }}>
                  <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
                    {f.label.toUpperCase()}{f.required && ' *'}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={(formData as any)[f.key]}
                    onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = '#FF3B30')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = '#2a2a2a')}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
                {t('form_service').toUpperCase()}
              </label>
              <select
                value={formData.service_type}
                onChange={e => setFormData({ ...formData, service_type: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#FF3B30')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = '#2a2a2a')}
              >
                <option value="" style={{ background: '#111' }}>{t('form_service')}</option>
                {[
                  { key: 'form_svc_photo', value: 'form_svc_photo' },
                  { key: 'form_svc_video', value: 'form_svc_video' },
                  { key: 'form_svc_aerial', value: 'form_svc_aerial' },
                  { key: 'form_svc_live', value: 'form_svc_live' },
                  { key: 'form_svc_other', value: 'form_svc_other' },
                ].map(s => (
                  <option key={s.key} value={s.key} style={{ background: '#111' }}>{t(s.key)}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 48 }}>
              <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
                {t('form_details').toUpperCase()}
              </label>
              <textarea
                rows={5}
                value={formData.details}
                onChange={e => setFormData({ ...formData, details: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical', borderBottom: '1px solid #2a2a2a' }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#FF3B30')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = '#2a2a2a')}
              />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '16px', background: '#FF3B30',
              border: 'none', color: '#fff', fontSize: 11,
              letterSpacing: '0.2em', cursor: 'pointer', transition: 'opacity 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {isAr ? 'إرسال الطلب' : 'SEND REQUEST'}
            </button>
          </form>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  )
}
