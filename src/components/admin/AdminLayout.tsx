import { useEffect } from 'react'
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import TkweenLogo from '@/components/TkweenLogo'
import { LayoutDashboard, Film, Video, MessageSquare, Settings, LogOut, ExternalLink } from 'lucide-react'
import { GRAD, GRAD_START, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { supabase } from '@/integrations/supabase/client'

const links = [
  { path: '/admin/dashboard', icon: LayoutDashboard, key: 'admin_overview' },
  { path: '/admin/projects', icon: Film, key: 'admin_projects' },
  { path: '/admin/videos', icon: Video, key: 'admin_videos' },
  { path: '/admin/requests', icon: MessageSquare, key: 'admin_requests' },
  { path: '/admin/settings', icon: Settings, key: 'admin_settings' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, lang, setLang } = useLanguage()

  useEffect(() => {
    if (sessionStorage.getItem('tkween_admin') !== '1') navigate('/admin/login')
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    sessionStorage.removeItem('tkween_admin')
    navigate('/admin/login')
  }

  if (sessionStorage.getItem('tkween_admin') !== '1') return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: BG }}>
      <aside style={{
        width: 260, background: BG_SOFT, borderRight: `1px solid ${BORDER}`,
        display: 'flex', flexDirection: 'column',
      }} className="hidden lg:flex">
        <div style={{ padding: 24 }}>
          <TkweenLogo size={32} showText={true} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 12px', flex: 1 }}>
          {links.map(l => {
            const active = location.pathname === l.path || location.pathname.startsWith(l.path + '/')
            return (
              <Link key={l.path} to={l.path} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px', borderRadius: 8,
                color: active ? '#fff' : '#94a3b8',
                background: active ? GRAD : 'transparent',
                textDecoration: 'none', fontSize: 14,
                fontWeight: active ? 500 : 300, transition: 'all 0.2s',
              }}>
                <l.icon size={18} /> {t(l.key)}
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, padding: '10px', border: `1px solid ${GRAD_START}`,
            borderRadius: 8, background: `${GRAD_START}15`, color: GRAD_START,
            fontSize: 13, cursor: 'pointer', textDecoration: 'none', fontWeight: 500,
          }}>
            <ExternalLink size={16} /> {lang === 'ar' ? 'عرض الموقع' : 'View Site'}
          </a>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{
            width: '100%', padding: '8px', border: `1px solid ${BORDER}`,
            borderRadius: 8, background: 'transparent', color: '#94a3b8',
            fontSize: 13, cursor: 'pointer',
          }}>
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, padding: '8px', border: `1px solid ${BORDER}`,
            borderRadius: 8, background: 'transparent', color: '#ef4444',
            fontSize: 13, cursor: 'pointer',
          }}>
            <LogOut size={16} /> {t('admin_logout')}
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', height: 56, borderBottom: `1px solid ${BORDER}`,
        }} className="lg:hidden">
          <TkweenLogo size={28} showText={false} />
          <div style={{ display: 'flex', gap: 8 }}>
            {links.map(l => {
              const active = location.pathname === l.path
              return (
                <Link key={l.path} to={l.path} style={{
                  padding: 8, borderRadius: 6,
                  background: active ? GRAD : 'transparent',
                  color: active ? '#fff' : '#94a3b8',
                }}>
                  <l.icon size={18} />
                </Link>
              )
            })}
            <a href="/" target="_blank" rel="noopener noreferrer" style={{
              padding: 8, borderRadius: 6, background: `${GRAD_START}15`,
              color: GRAD_START, display: 'flex', alignItems: 'center',
            }}>
              <ExternalLink size={18} />
            </a>
            <button onClick={handleLogout} style={{
              padding: 8, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer',
            }}>
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main style={{ flex: 1, padding: '32px', overflowAuto: 'auto' } as React.CSSProperties}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
