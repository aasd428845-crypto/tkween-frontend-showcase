import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import TkweenLogo from '@/components/TkweenLogo';
import { getSettings } from '@/data/defaults';

const AdminLogin = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = getSettings();
    if (password === settings.admin_password) {
      sessionStorage.setItem('tkween_admin', '1');
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: '#0a1e1a' }}>
      <div className="w-full max-w-sm p-8" style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 16 }}>
        <div className="flex justify-center mb-8">
          <TkweenLogo size={48} showText={true} />
        </div>
        <h2 className="text-center mb-6" style={{ fontSize: 20, fontWeight: 300, color: '#fff' }}>{t('admin_login')}</h2>
        <form onSubmit={handleSubmit}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('admin_password')}
            style={{ width: '100%', padding: '12px 16px', background: '#0a1e1a', border: '1px solid #1a3530', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', marginBottom: 16 }}
            onFocus={e => (e.currentTarget.style.borderColor = '#2dd4bf')} onBlur={e => (e.currentTarget.style.borderColor = '#1a3530')} />
          {error && <p className="text-center mb-3" style={{ color: '#ef4444', fontSize: 13 }}>{t('admin_wrong')}</p>}
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#2dd4bf', color: '#0a1e1a', borderRadius: 8, fontSize: 15, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            {t('admin_enter')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
