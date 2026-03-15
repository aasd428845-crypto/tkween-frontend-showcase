import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import { getRequests, saveRequests } from '@/data/defaults';
import type { TkweenRequest } from '@/data/defaults';
import { Search, Trash2, X } from 'lucide-react';

const AdminRequests = () => {
  const { t } = useLanguage();
  const [requests, setRequests] = useState(getRequests());
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<TkweenRequest | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const save = (r: TkweenRequest[]) => { setRequests(r); saveRequests(r); };

  const filtered = requests
    .filter(r => filter === 'ALL' || r.status === filter)
    .filter(r => !search || r.full_name.toLowerCase().includes(search.toLowerCase()) || r.organization.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const updateStatus = (id: string, status: TkweenRequest['status']) => {
    const updated = requests.map(r => r.id === id ? { ...r, status } : r);
    save(updated);
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const handleDelete = (id: string) => {
    save(requests.filter(r => r.id !== id));
    if (selected?.id === id) setSelected(null);
    setConfirmDelete(null);
  };

  const statuses = ['ALL', 'new', 'reviewed', 'contacted', 'closed'];
  const statusColors: Record<string, string> = { new: '#f59e0b', reviewed: '#60a5fa', contacted: '#2dd4bf', closed: '#94a3b8' };

  return (
    <AdminLayout>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff', marginBottom: 24 }}>{t('admin_requests')}</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '6px 16px', borderRadius: 6, border: filter === s ? 'none' : '1px solid #1a3530',
              background: filter === s ? '#2dd4bf' : 'transparent', color: filter === s ? '#0a1e1a' : '#94a3b8',
              fontSize: 13, cursor: 'pointer', fontWeight: filter === s ? 500 : 300 }}>
            {s === 'ALL' ? 'ALL' : t(`status_${s}`)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-6" style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 8, padding: '0 12px' }}>
        <Search size={16} style={{ color: '#94a3b8' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('admin_search')}
          style={{ flex: 1, padding: '10px 0', background: 'transparent', border: 'none', color: '#fff', fontSize: 14, outline: 'none' }} />
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1" style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12, overflow: 'hidden' }}>
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a3530' }}>
                  {['form_name', 'form_org', 'form_phone', 'status_new'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>{t(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={4} className="text-center" style={{ padding: 32, color: '#94a3b8' }}>No requests</td></tr>
                ) : filtered.map(r => (
                  <tr key={r.id} onClick={() => setSelected(r)} style={{ borderBottom: '1px solid #1a3530', cursor: 'pointer', background: selected?.id === r.id ? 'rgba(45,212,191,0.05)' : 'transparent' }}>
                    <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{r.full_name}</td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{r.organization}</td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{r.phone}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500,
                        background: `${statusColors[r.status]}20`, color: statusColors[r.status] }}>{t(`status_${r.status}`)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="hidden lg:block" style={{ width: 360, background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12, padding: 24, flexShrink: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontSize: 16, fontWeight: 400, color: '#fff' }}>{selected.full_name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            {[
              { label: 'form_org', value: selected.organization },
              { label: 'form_service', value: selected.service_type ? t(selected.service_type) : '-' },
              { label: 'form_date', value: selected.event_date || '-' },
              { label: 'form_location', value: selected.location || '-' },
              { label: 'form_phone', value: selected.phone },
              { label: 'form_email', value: selected.email || '-' },
            ].map(f => (
              <div key={f.label} className="mb-4">
                <span style={{ color: '#94a3b8', fontSize: 11, display: 'block', marginBottom: 2 }}>{t(f.label)}</span>
                <span style={{ color: '#fff', fontSize: 14 }}>{f.value}</span>
              </div>
            ))}
            {selected.details && (
              <div className="mb-6">
                <span style={{ color: '#94a3b8', fontSize: 11, display: 'block', marginBottom: 2 }}>{t('form_details')}</span>
                <p style={{ color: '#fff', fontSize: 14, lineHeight: 1.6 }}>{selected.details}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {(['new', 'reviewed', 'contacted', 'closed'] as const).map(s => (
                <button key={s} onClick={() => updateStatus(selected.id, s)}
                  style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: selected.status === s ? 500 : 300,
                    border: selected.status === s ? 'none' : '1px solid #1a3530',
                    background: selected.status === s ? statusColors[s] : 'transparent',
                    color: selected.status === s ? '#0a1e1a' : statusColors[s] }}>
                  {t(`status_${s}`)}
                </button>
              ))}
            </div>
            <button onClick={() => setConfirmDelete(selected.id)} className="flex items-center gap-2"
              style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: 13, cursor: 'pointer', marginTop: 8 }}>
              <Trash2 size={14} /> {t('admin_delete')}
            </button>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="flex items-center justify-center" style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)' }}>
          <div className="p-6" style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12 }}>
            <p style={{ color: '#fff', marginBottom: 16 }}>{t('admin_confirm_delete')}</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmDelete)} style={{ padding: '8px 20px', background: '#ef4444', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{t('admin_delete')}</button>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #1a3530', color: '#94a3b8', borderRadius: 8, cursor: 'pointer' }}>{t('admin_cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRequests;
