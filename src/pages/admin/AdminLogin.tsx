import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import TkweenLogo from '@/components/TkweenLogo'
import { GRAD, CORAL, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { supabase } from '@/integrations/supabase/client'

export default function AdminLogin() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(true)
      setLoading(false)
      setTimeout(() => setError(false), 3000)
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: BG }}>
      <div style={{ width: '100%', maxWidth: 360, padding: 32, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <TkweenLogo size={52} showText={true} showSubtitle={false} />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: 24, fontSize: 18, fontWeight: 300, color: '#fff' }}>{t('admin_login')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('admin_email') || 'Email'}
            style={{
              width: '100%', padding: '12px 16px', background: BG,
              border: `1px solid ${BORDER}`, borderRadius: 4, color: '#fff',
              fontSize: 14, outline: 'none', marginBottom: 12, transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = CORAL)}
            onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t('admin_password')}
            style={{
              width: '100%', padding: '12px 16px', background: BG,
              border: `1px solid ${BORDER}`, borderRadius: 4, color: '#fff',
              fontSize: 14, outline: 'none', marginBottom: 16, transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = CORAL)}
            onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
          />
          {error && (
            <p style={{ color: '#ef4444', fontSize: 13, textAlign: 'center', marginBottom: 12 }}>
              {t('admin_wrong')}
            </p>
          )}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: 12, background: GRAD, color: '#fff',
            borderRadius: 4, fontSize: 14, fontWeight: 500, border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.1em', transition: 'opacity 0.2s',
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {loading ? '...' : t('admin_enter')}
          </button>
        </form>
      </div>
    </div>
  )
}
