import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import { getProjects, saveProjects } from '@/data/defaults';
import type { TkweenProject } from '@/data/defaults';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, X } from 'lucide-react';

const emptyProject: TkweenProject = { id: '', title_en: '', title_ar: '', category: 'CONFERENCES', thumbnail: '', video_url: '', visible: true, featured: false, display_order: 1 };

const AdminProjects = () => {
  const { t, lang } = useLanguage();
  const [projects, setProjects] = useState(getProjects());
  const [modal, setModal] = useState<TkweenProject | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const save = (p: TkweenProject[]) => { setProjects(p); saveProjects(p); };

  const handleSave = () => {
    if (!modal) return;
    let updated: TkweenProject[];
    if (modal.id) {
      updated = projects.map(p => p.id === modal.id ? modal : p);
    } else {
      updated = [...projects, { ...modal, id: Date.now().toString() }];
    }
    save(updated);
    setModal(null);
  };

  const handleDelete = (id: string) => { save(projects.filter(p => p.id !== id)); setConfirmDelete(null); };
  const toggleFeatured = (id: string) => save(projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  const toggleVisible = (id: string) => save(projects.map(p => p.id === id ? { ...p, visible: !p.visible } : p));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff' }}>{t('admin_projects')}</h1>
        <button onClick={() => setModal({ ...emptyProject })} className="flex items-center gap-2"
          style={{ padding: '8px 20px', background: '#2dd4bf', color: '#0a1e1a', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> {t('admin_add')}
        </button>
      </div>

      <div style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12, overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a3530' }}>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>Image</th>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>{t('admin_title_en')}</th>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>{t('admin_title_ar')}</th>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>{t('admin_category')}</th>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>Video</th>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>{t('admin_featured')}</th>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>{t('admin_visible')}</th>
                <th style={{ padding: '12px 16px', textAlign: 'start', color: '#94a3b8', fontSize: 12, fontWeight: 400 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.sort((a, b) => a.display_order - b.display_order).map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1a3530' }}>
                  <td style={{ padding: '8px 16px' }}>
                    <img src={p.thumbnail} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                  </td>
                  <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{p.title_en}</td>
                  <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{p.title_ar}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, background: 'rgba(45,212,191,0.1)', color: '#2dd4bf' }}>{p.category}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: p.video_url ? '#2dd4bf' : '#94a3b8', fontSize: 13 }}>{p.video_url ? '✓' : '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => toggleFeatured(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.featured ? '#f59e0b' : '#94a3b8' }}>
                      <Star size={18} fill={p.featured ? '#f59e0b' : 'none'} />
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => toggleVisible(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.visible ? '#2dd4bf' : '#94a3b8' }}>
                      {p.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div className="flex gap-2">
                      <button onClick={() => setModal({ ...p })} style={{ padding: 6, background: 'rgba(96,165,250,0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#60a5fa' }}>
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setConfirmDelete(p.id)} style={{ padding: 6, background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#ef4444' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {modal && (
        <div className="flex items-center justify-center" style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)' }} onClick={() => setModal(null)}>
          <div className="w-full max-w-lg p-6" style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 16 }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontSize: 18, fontWeight: 300, color: '#fff' }}>{modal.id ? t('admin_edit') : t('admin_add')}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { key: 'title_en', label: 'admin_title_en' }, { key: 'title_ar', label: 'admin_title_ar' },
                { key: 'thumbnail', label: 'admin_thumbnail' }, { key: 'video_url', label: 'admin_video' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 4 }}>{t(f.label)}</label>
                  <input value={(modal as any)[f.key]} onChange={e => setModal({ ...modal, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#0a1e1a', border: '1px solid #1a3530', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 4 }}>{t('admin_category')}</label>
                <select value={modal.category} onChange={e => setModal({ ...modal, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#0a1e1a', border: '1px solid #1a3530', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }}>
                  {['CONFERENCES', 'CORPORATE', 'BRAND', 'EVENTS'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 4 }}>{t('admin_order')}</label>
                <input type="number" value={modal.display_order} onChange={e => setModal({ ...modal, display_order: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: '#0a1e1a', border: '1px solid #1a3530', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2" style={{ color: '#94a3b8', fontSize: 13, cursor: 'pointer' }}>
                  <input type="checkbox" checked={modal.featured} onChange={e => setModal({ ...modal, featured: e.target.checked })} /> {t('admin_featured')}
                </label>
                <label className="flex items-center gap-2" style={{ color: '#94a3b8', fontSize: 13, cursor: 'pointer' }}>
                  <input type="checkbox" checked={modal.visible} onChange={e => setModal({ ...modal, visible: e.target.checked })} /> {t('admin_visible')}
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} style={{ flex: 1, padding: '10px', background: '#2dd4bf', color: '#0a1e1a', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' }}>{t('admin_save')}</button>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid #1a3530', color: '#94a3b8', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>{t('admin_cancel')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="flex items-center justify-center" style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)' }}>
          <div className="p-6" style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12 }}>
            <p style={{ color: '#fff', marginBottom: 16 }}>{t('admin_confirm_delete')}</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmDelete)} style={{ padding: '8px 20px', background: '#ef4444', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14 }}>{t('admin_delete')}</button>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #1a3530', color: '#94a3b8', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>{t('admin_cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjects;
