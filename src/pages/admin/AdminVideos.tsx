import { useState } from 'react'
import { GRAD, GRAD_START, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { getVideos, saveVideos } from '@/lib/storage'

interface Video {
  id: string
  title_en: string
  title_ar: string
  section: 'conferences' | 'corporate_ads' | 'designs' | 'our_work'
  vimeo_url: string
  thumbnail_url: string
  display_order: number
  featured: boolean
  visible: boolean
}

const SECTIONS = ['conferences', 'corporate_ads', 'designs', 'our_work'] as const
const SECTION_LABELS: Record<string, string> = {
  conferences: 'CONFERENCES', corporate_ads: 'CORPORATE ADS', designs: 'DESIGNS', our_work: 'OUR WORK',
}

const blank: Omit<Video, 'id'> = {
  title_en: '', title_ar: '', section: 'conferences',
  vimeo_url: '', thumbnail_url: '', display_order: 0, featured: false, visible: true,
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: BG, border: `1px solid ${BORDER}`, color: '#fff',
  padding: '10px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit', borderRadius: 4,
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>(() => getVideos() as Video[])
  const [tab, setTab] = useState<string>('conferences')
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<Omit<Video, 'id'>>(blank)
  const [editId, setEditId] = useState<string | null>(null)
  const [fetching, setFetching] = useState(false)

  const filtered = videos.filter(v => v.section === tab).sort((a, b) => a.display_order - b.display_order)

  const openAdd = () => { setForm({ ...blank, section: tab as any }); setEditId(null); setModal(true) }
  const openEdit = (v: Video) => { const { id, ...rest } = v; setForm(rest); setEditId(id); setModal(true) }

  const fetchVimeo = async () => {
    if (!form.vimeo_url) return
    setFetching(true)
    try {
      const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(form.vimeo_url)}`)
      const data = await res.json()
      setForm(prev => ({ ...prev, thumbnail_url: data.thumbnail_url || prev.thumbnail_url, title_en: prev.title_en || data.title || '' }))
    } catch { alert('Failed to fetch Vimeo data.') } finally { setFetching(false) }
  }

  const handleSave = () => {
    const now = new Date().toISOString()
    const updated = editId
      ? videos.map(v => v.id === editId ? { ...form, id: editId, created_at: (v as any).created_at || now } : v)
      : [...videos, { ...form, id: Date.now().toString(), created_at: now }]
    setVideos(updated); saveVideos(updated as any); setModal(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this video?')) return
    const updated = videos.filter(v => v.id !== id)
    setVideos(updated); saveVideos(updated as any)
  }

  const toggle = (id: string, field: 'featured' | 'visible') => {
    const updated = videos.map(v => v.id === id ? { ...v, [field]: !v[field] } : v)
    setVideos(updated); saveVideos(updated as any)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff' }}>Video Sections</h1>
          <p style={{ color: '#666', fontSize: 13, marginTop: 4 }}>Manage videos stored locally</p>
        </div>
        <button onClick={openAdd} style={{
          padding: '10px 20px', background: GRAD, border: 'none',
          color: '#fff', fontSize: 13, cursor: 'pointer', borderRadius: 4, fontWeight: 500,
        }}>+ ADD VIDEO</button>
      </div>

      <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}`, marginBottom: 24 }}>
        {SECTIONS.map(s => (
          <button key={s} onClick={() => setTab(s)} style={{
            padding: '12px 20px', background: 'transparent', border: 'none',
            borderBottom: tab === s ? `2px solid ${GRAD_START}` : '2px solid transparent',
            color: tab === s ? GRAD_START : '#666',
            fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit',
          }}>{SECTION_LABELS[s]}</button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['THUMB', 'TITLE', 'VIMEO', 'ORDER', 'FEATURED', 'VISIBLE', 'ACTIONS'].map(h => (
                <th key={h} style={{ padding: '10px 12px', color: '#555', fontSize: 10, letterSpacing: '0.1em', textAlign: 'left', borderBottom: `1px solid ${BORDER}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => (
              <tr key={v.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <td style={{ padding: 8 }}>
                  {v.thumbnail_url
                    ? <img src={v.thumbnail_url} alt="" style={{ width: 80, height: 45, objectFit: 'cover', borderRadius: 2 }}/>
                    : <div style={{ width: 80, height: 45, background: BG_SOFT, borderRadius: 2 }}/>}
                </td>
                <td style={{ padding: 8 }}>
                  <div style={{ color: '#fff', fontSize: 13 }}>{v.title_en}</div>
                  <div style={{ color: '#555', fontSize: 11 }}>{v.title_ar}</div>
                </td>
                <td style={{ padding: 8, color: '#555', fontSize: 11 }}>{v.vimeo_url ? '✓ linked' : '—'}</td>
                <td style={{ padding: 8, color: '#555', fontSize: 12 }}>{v.display_order}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => toggle(v.id, 'featured')} style={{
                    background: v.featured ? `${GRAD_START}20` : 'transparent',
                    border: `1px solid ${v.featured ? GRAD_START : BORDER}`,
                    color: v.featured ? GRAD_START : '#444',
                    padding: '3px 8px', fontSize: 9, cursor: 'pointer', borderRadius: 3,
                  }}>{v.featured ? 'YES' : 'NO'}</button>
                </td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => toggle(v.id, 'visible')} style={{
                    background: v.visible ? `${GRAD_START}20` : 'transparent',
                    border: `1px solid ${v.visible ? GRAD_START : BORDER}`,
                    color: v.visible ? GRAD_START : '#444',
                    padding: '3px 8px', fontSize: 9, cursor: 'pointer', borderRadius: 3,
                  }}>{v.visible ? 'SHOWN' : 'HIDDEN'}</button>
                </td>
                <td style={{ padding: 8 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(v)} style={{
                      background: 'transparent', border: `1px solid ${BORDER}`,
                      color: '#888', padding: '5px 10px', fontSize: 10, cursor: 'pointer', borderRadius: 3,
                    }}>EDIT</button>
                    <button onClick={() => handleDelete(v.id)} style={{
                      background: 'transparent', border: '1px solid #500',
                      color: '#f87171', padding: '5px 10px', fontSize: 10, cursor: 'pointer', borderRadius: 3,
                    }}>DEL</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 48, textAlign: 'center', color: '#333', fontSize: 13 }}>
                No videos in this section
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(4,10,6,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 32, width: '90%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 300, color: '#fff' }}>{editId ? 'Edit Video' : 'Add Video'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: '#555', fontSize: 24, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[{ k: 'title_en', l: 'TITLE (EN)' }, { k: 'title_ar', l: 'TITLE (AR)' }].map(f => (
                <div key={f.k}>
                  <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>{f.l}</label>
                  <input style={inputStyle} value={(form as any)[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}/>
                </div>
              ))}
              <div>
                <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>SECTION</label>
                <select style={inputStyle} value={form.section} onChange={e => setForm({ ...form, section: e.target.value as any })}>
                  <option value="conferences">Conferences</option>
                  <option value="corporate_ads">Corporate Ads</option>
                  <option value="designs">Designs</option>
                  <option value="our_work">Our Work</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>DISPLAY ORDER</label>
                <input type="number" style={inputStyle} value={form.display_order} onChange={e => setForm({ ...form, display_order: +e.target.value })}/>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>VIMEO URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input style={{ ...inputStyle, flex: 1 }} value={form.vimeo_url}
                    onChange={e => setForm({ ...form, vimeo_url: e.target.value })} placeholder="https://vimeo.com/123456789"/>
                  <button onClick={fetchVimeo} disabled={fetching || !form.vimeo_url} style={{
                    background: GRAD, border: 'none', color: '#fff',
                    padding: '10px 16px', fontSize: 11, cursor: fetching ? 'not-allowed' : 'pointer',
                    opacity: fetching || !form.vimeo_url ? 0.5 : 1, borderRadius: 4, whiteSpace: 'nowrap',
                  }}>{fetching ? 'FETCHING...' : 'FETCH'}</button>
                </div>
                <p style={{ color: '#333', fontSize: 10, marginTop: 4 }}>Auto-fills thumbnail from Vimeo oEmbed</p>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ color: '#555', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>THUMBNAIL URL</label>
                <input style={inputStyle} value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })}/>
                {form.thumbnail_url && <img src={form.thumbnail_url} alt="preview" style={{ width: 120, height: 68, objectFit: 'cover', marginTop: 8, borderRadius: 3 }}/>}
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 24 }}>
                {[{ k: 'featured', l: 'Featured' }, { k: 'visible', l: 'Visible' }].map(f => (
                  <label key={f.k} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={(form as any)[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.checked })}/>
                    <span style={{ color: '#888', fontSize: 13 }}>{f.l}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={handleSave} style={{ flex: 1, background: GRAD, border: 'none', color: '#fff', padding: 13, fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', borderRadius: 4 }}>SAVE VIDEO</button>
              <button onClick={() => setModal(false)} style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: '#888', padding: '13px 20px', fontSize: 12, cursor: 'pointer', borderRadius: 4 }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
