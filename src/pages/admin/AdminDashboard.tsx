import AdminLayout from '@/components/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import { getProjects, getRequests, getSettings } from '@/data/defaults';
import { Film, MessageSquare, Bell, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const { t, lang } = useLanguage();
  const projects = getProjects();
  const requests = getRequests();
  const settings = getSettings();
  const newReqs = requests.filter(r => r.status === 'new');

  const cards = [
    { icon: Film, label: 'admin_total_projects', value: projects.length, color: '#2dd4bf' },
    { icon: MessageSquare, label: 'admin_total_requests', value: requests.length, color: '#60a5fa' },
    { icon: Bell, label: 'admin_new_requests', value: newReqs.length, color: '#f59e0b' },
    { icon: Eye, label: 'admin_visits', value: settings.visit_count, color: '#a78bfa' },
  ];

  const recent = [...requests].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8);

  return (
    <AdminLayout>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff', marginBottom: 24 }}>{t('admin_overview')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="p-5" style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12 }}>
            <div className="flex items-center gap-3 mb-3">
              <c.icon size={20} style={{ color: c.color }} />
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{t(c.label)}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 200, color: '#fff' }}>{c.value}</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 300, color: '#fff', marginBottom: 16 }}>{t('admin_recent')}</h2>
      <div style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12, overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a3530' }}>
                {['form_name', 'form_org', 'form_service', 'form_phone', 'status_new'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr><td colSpan={5} className="text-center" style={{ padding: 32, color: '#94a3b8' }}>No requests yet</td></tr>
              ) : recent.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1a3530' }}>
                  <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{r.full_name}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{r.organization}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{r.service_type ? t(r.service_type) : '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{r.phone}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 500,
                      background: r.status === 'new' ? 'rgba(245,158,11,0.15)' : r.status === 'reviewed' ? 'rgba(96,165,250,0.15)' : r.status === 'contacted' ? 'rgba(45,212,191,0.15)' : 'rgba(148,163,184,0.15)',
                      color: r.status === 'new' ? '#f59e0b' : r.status === 'reviewed' ? '#60a5fa' : r.status === 'contacted' ? '#2dd4bf' : '#94a3b8'
                    }}>{t(`status_${r.status}`)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
