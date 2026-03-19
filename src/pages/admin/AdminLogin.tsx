import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import TkweenLogo from '@/components/TkweenLogo'
import { GRAD, CORAL, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { apiLogin } from '@/lib/api'

export default function AdminLogin() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const ok = await apiLogin(password)
    setLoading(false)
    if (ok) {
      sessionStorage.setItem('tkween_admin', '1')
      navigate('/admin/dashboard')
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
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
            cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.1em',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
          }}>
            {loading ? '...' : t('admin_enter')}
          </button>
        </form>
      </div>
    </div>
  )
}
