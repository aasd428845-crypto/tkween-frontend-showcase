import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, X } from 'lucide-react'
import { GRAD, GRAD_START, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { getProjects, saveProjects } from '@/lib/storage'
import { apiGetProjects, apiAddProject, apiUpdateProject, apiDeleteProject, notifyUpdate } from '@/lib/api'
import type { Project as TkweenProject } from '@/lib/storage'

const emptyProject: TkweenProject = {
  id: '', title_en: '', title_ar: '', category: 'CONFERENCES',
  thumbnail: '', video_url: '', visible: true, featured: false, display_order: 1,
}

export default function AdminProjects() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<TkweenProject[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<TkweenProject | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const reload = async () => {
    try {
      const data = await apiGetProjects()
      setProjects(data as TkweenProject[])
    } catch {
      setProjects(getProjects())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { reload() }, [])
  useEffect(() => {
    window.addEventListener('tkween:update', reload)
    return () => window.removeEventListener('tkween:update', reload)
  }, [])

  const handleSave = async () => {
    if (!modal) return
    setSaving(true)
    try {
      if (modal.id) {
        const { id, ...data } = modal
        const updated = await apiUpdateProject(id, data)
        setProjects(prev => prev.map(p => p.id === id ? (updated as TkweenProject) : p))
      } else {
        const { id: _id, ...data } = modal
        const created = await apiAddProject(data)
        setProjects(prev => [...prev, created as TkweenProject])
      }
      notifyUpdate()
      setModal(null)
    } catch {
      const updated: TkweenProject[] = modal.id
        ? projects.map(p => p.id === modal.id ? modal : p)
        : [...projects, { ...modal, id: Date.now().toString() }]
      setProjects(updated)
      saveProjects(updated)
      setModal(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    setConfirmDelete(null)
    try {
      await apiDeleteProject(id)
      notifyUpdate()
    } catch {
      const updated = projects.filter(p => p.id !== id)
      saveProjects(updated)
    }
  }

  const toggleField = async (id: string, field: 'featured' | 'visible') => {
    const proj = projects.find(p => p.id === id)
    if (!proj) return
    const newVal = !proj[field]
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: newVal } : p))
    try {
      await apiUpdateProject(id, { [field]: newVal })
      notifyUpdate()
    } catch {
      const updated = projects.map(p => p.id === id ? { ...p, [field]: newVal } : p)
      saveProjects(updated)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', background: BG,
    border: `1px solid ${BORDER}`, borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none',
  }

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

      {loading ? (
        <div style={{ padding: 48, textAlign: 'center', color: '#555', fontSize: 13 }}>Loading...</div>
      ) : (
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
                      <button onClick={() => toggleField(p.id, 'featured')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.featured ? '#f59e0b' : '#555' }}>
                        <Star size={18} fill={p.featured ? '#f59e0b' : 'none'}/>
                      </button>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => toggleField(p.id, 'visible')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.visible ? GRAD_START : '#555' }}>
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
                {projects.length === 0 && (
                  <tr><td colSpan={8} style={{ padding: 32, textAlign: 'center', color: '#555' }}>No projects yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                { key: 'thumbnail', label: t('admin_thumbnail') }, { key: 'video_url', label: t('admin_video') }].map(f => (
                <div key={f.key}>
                  <label style={{ color: '#555', fontSize: 12, display: 'block', marginBottom: 4 }}>{f.label}</label>
                  <input value={(modal as any)[f.key]} onChange={e => setModal({ ...modal, [f.key]: e.target.value })} style={inputStyle}/>
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
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: 10, background: GRAD, color: '#fff', borderRadius: 4, fontSize: 14, fontWeight: 500, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : t('admin_save')}
              </button>
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
