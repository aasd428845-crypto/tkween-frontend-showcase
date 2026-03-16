import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import TkweenLogo from '@/components/TkweenLogo'

function getAdminPassword() {
  try {
    const s = JSON.parse(localStorage.getItem('tkween_settings') || '{}')
    return s.admin_password || 'tkween2025'
  } catch { return 'tkween2025' }
}

export default function AdminLogin() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === getAdminPassword()) {
      sessionStorage.setItem('tkween_admin', '1')
      navigate('/admin/dashboard')
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#000' }}>
      <div style={{ width: '100%', maxWidth: 360, padding: 32, background: '#0a0a0a', border: '1px solid #1c1c1c', borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <TkweenLogo size={52} showText={true} showSubtitle={true} layout="vertical"/>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: 24, fontSize: 18, fontWeight: 300, color: '#fff' }}>{t('admin_login')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t('admin_password')}
            style={{
              width: '100%', padding: '12px 16px', background: '#000',
              border: '1px solid #1c1c1c', borderRadius: 4, color: '#fff',
              fontSize: 14, outline: 'none', marginBottom: 16,
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#FF3B30')}
            onBlur={e => (e.currentTarget.style.borderColor = '#1c1c1c')}
          />
          {error && (
            <p style={{ color: '#ef4444', fontSize: 13, textAlign: 'center', marginBottom: 12 }}>
              {t('admin_wrong')}
            </p>
          )}
          <button type="submit" style={{
            width: '100%', padding: 12, background: '#FF3B30', color: '#fff',
            borderRadius: 4, fontSize: 14, fontWeight: 500, border: 'none',
            cursor: 'pointer', letterSpacing: '0.1em', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {t('admin_enter')}
          </button>
        </form>
      </div>
    </div>
  )
}
