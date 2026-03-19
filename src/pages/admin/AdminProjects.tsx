import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, X } from 'lucide-react'
import { GRAD, GRAD_START, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { fetchProjects, addProject, updateProject, deleteProject } from '@/lib/supabase-data'
import type { TkweenProject } from '@/lib/supabase-data'

const emptyProject: TkweenProject = {
  id: '', title_en: '', title_ar: '', category: 'CONFERENCES',
  thumbnail: '', video_url: '', visible: true, featured: false, display_order: 1,
}

export default function AdminProjects() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<TkweenProject[]>([])
  const [modal, setModal] = useState<TkweenProject | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await fetchProjects()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleSave = async () => {
    if (!modal) return
    if (modal.id) {
      const { id, ...rest } = modal
      await updateProject(id, rest)
    } else {
      const { id, ...rest } = modal
      await addProject(rest)
    }
    setModal(null)
    await load()
  }

  const handleDelete = async (id: string) => {
    await deleteProject(id)
    setConfirmDelete(null)
    await load()
  }

  const toggleFeatured = async (id: string) => {
    const p = projects.find(x => x.id === id)
    if (p) { await updateProject(id, { featured: !p.featured }); await load() }
  }

  const toggleVisible = async (id: string) => {
    const p = projects.find(x => x.id === id)
    if (p) { await updateProject(id, { visible: !p.visible }); await load() }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', background: BG,
    border: `1px solid ${BORDER}`, borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none',
  }

  if (loading) return <p style={{ color: '#555', textAlign: 'center', padding: 48 }}>Loading...</p>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff' }}>{t('admin_projects')}</h1>
        <button onClick={() => setModal({ ...emptyProject })} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 20px', background: GRAD, color: '#fff', borderRadius: 4, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer',
        }}>
          <Plus size={16}/> {t('admin_add')}
        </button>
      </div>

      <div style={{ background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                {['Image', t('admin_title_en'), t('admin_title_ar'), t('admin_category'), 'Video', t('admin_featured'), t('admin_visible'), 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'start', color: '#555', fontSize: 12, fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.sort((a, b) => a.display_order - b.display_order).map(p => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td style={{ padding: '8px 16px' }}>
                    <img src={p.thumbnail} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 3 }}/>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{p.title_en}</td>
                  <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{p.title_ar}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 3, fontSize: 11, background: `${GRAD_START}18`, color: GRAD_START }}>{p.category}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: p.video_url ? GRAD_START : '#555', fontSize: 13 }}>{p.video_url ? '✓' : '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => toggleFeatured(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.featured ? '#f59e0b' : '#555' }}>
                      <Star size={18} fill={p.featured ? '#f59e0b' : 'none'}/>
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => toggleVisible(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.visible ? GRAD_START : '#555' }}>
                      {p.visible ? <Eye size={18}/> : <EyeOff size={18}/>}
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setModal({ ...p })} style={{ padding: 6, background: 'rgba(96,165,250,0.1)', border: 'none', borderRadius: 4, cursor: 'pointer', color: '#60a5fa' }}><Pencil size={14}/></button>
                      <button onClick={() => setConfirmDelete(p.id)} style={{ padding: 6, background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 4, cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(4,10,6,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setModal(null)}>
          <div style={{ width: '100%', maxWidth: 500, padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 8 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 300, color: '#fff' }}>{modal.id ? t('admin_edit') : t('admin_add')}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[{ key: 'title_en', label: t('admin_title_en') }, { key: 'title_ar', label: t('admin_title_ar') },
                { key: 'thumbnail', label: t('admin_thumbnail') + ' (URL)' }, { key: 'video_url', label: t('admin_video') + ' (URL)' }].map(f => (
                <div key={f.key}>
                  <label style={{ color: '#555', fontSize: 12, display: 'block', marginBottom: 4 }}>{f.label}</label>
                  <input value={(modal as any)[f.key]} onChange={e => setModal({ ...modal, [f.key]: e.target.value })} style={inputStyle}
                    placeholder={f.key === 'thumbnail' ? 'https://example.com/image.jpg' : f.key === 'video_url' ? 'https://vimeo.com/123456' : ''}/>
                </div>
              ))}
              <div>
                <label style={{ color: '#555', fontSize: 12, display: 'block', marginBottom: 4 }}>{t('admin_category')}</label>
                <select value={modal.category} onChange={e => setModal({ ...modal, category: e.target.value })} style={inputStyle}>
                  {['CONFERENCES', 'CORPORATE', 'BRAND', 'EVENTS'].map(c => <option key={c} value={c} style={{ background: BG_SOFT }}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: '#555', fontSize: 12, display: 'block', marginBottom: 4 }}>{t('admin_order')}</label>
                <input type="number" value={modal.display_order} onChange={e => setModal({ ...modal, display_order: +e.target.value })} style={inputStyle}/>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {[{ k: 'featured', l: t('admin_featured') }, { k: 'visible', l: t('admin_visible') }].map(f => (
                  <label key={f.k} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 13, cursor: 'pointer' }}>
                    <input type="checkbox" checked={(modal as any)[f.k]} onChange={e => setModal({ ...modal, [f.k]: e.target.checked })}/> {f.l}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={handleSave} style={{ flex: 1, padding: 10, background: GRAD, color: '#fff', borderRadius: 4, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' }}>{t('admin_save')}</button>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: 10, background: 'transparent', border: `1px solid ${BORDER}`, color: '#888', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}>{t('admin_cancel')}</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(4,10,6,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 8 }}>
            <p style={{ color: '#fff', marginBottom: 20 }}>{t('admin_confirm_delete')}</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => handleDelete(confirmDelete)} style={{ padding: '8px 20px', background: '#ef4444', color: '#fff', borderRadius: 4, border: 'none', cursor: 'pointer' }}>{t('admin_delete')}</button>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: '8px 20px', background: 'transparent', border: `1px solid ${BORDER}`, color: '#888', borderRadius: 4, cursor: 'pointer' }}>{t('admin_cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
