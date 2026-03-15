import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import TkweenLogo from './TkweenLogo';
import { LayoutDashboard, Film, MessageSquare, Settings, LogOut } from 'lucide-react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    if (sessionStorage.getItem('tkween_admin') !== '1') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('tkween_admin');
    navigate('/admin/login');
  };

  const links = [
    { path: '/admin/dashboard', icon: LayoutDashboard, key: 'admin_overview' },
    { path: '/admin/projects', icon: Film, key: 'admin_projects' },
    { path: '/admin/requests', icon: MessageSquare, key: 'admin_requests' },
    { path: '/admin/settings', icon: Settings, key: 'admin_settings' },
  ];

  if (sessionStorage.getItem('tkween_admin') !== '1') return null;

  return (
    <div className="flex" style={{ minHeight: '100vh', background: '#0a1e1a' }}>
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col" style={{ width: 260, background: '#071512', borderRight: '1px solid #1a3530' }}>
        <div className="p-6">
          <TkweenLogo size={32} showText={true} />
        </div>
        <nav className="flex flex-col gap-1 px-3 flex-1">
          {links.map(l => {
            const active = location.pathname === l.path;
            return (
              <Link key={l.path} to={l.path} className="flex items-center gap-3 px-4 py-3" style={{
                borderRadius: 8, color: active ? '#2dd4bf' : '#94a3b8', background: active ? 'rgba(45,212,191,0.1)' : 'transparent',
                textDecoration: 'none', fontSize: 14, fontWeight: active ? 500 : 300, transition: 'all 0.2s'
              }}>
                <l.icon size={18} /> {t(l.key)}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="w-full flex items-center justify-center gap-2 py-2 mb-2"
            style={{ border: '1px solid #1a3530', borderRadius: 8, background: 'transparent', color: '#94a3b8', fontSize: 13, cursor: 'pointer' }}>
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2"
            style={{ border: '1px solid #1a3530', borderRadius: 8, background: 'transparent', color: '#ef4444', fontSize: 13, cursor: 'pointer' }}>
            <LogOut size={16} /> {t('admin_logout')}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex items-center justify-between p-4" style={{ borderBottom: '1px solid #1a3530' }}>
          <TkweenLogo size={28} showText={false} />
          <div className="flex gap-2">
            {links.map(l => {
              const active = location.pathname === l.path;
              return (
                <Link key={l.path} to={l.path} style={{ padding: '8px', borderRadius: 6, background: active ? 'rgba(45,212,191,0.1)' : 'transparent', color: active ? '#2dd4bf' : '#94a3b8' }}>
                  <l.icon size={18} />
                </Link>
              );
            })}
            <button onClick={handleLogout} style={{ padding: 8, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
