import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';

interface Video {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  section: 'conferences' | 'corporate_ads' | 'designs' | 'our_work';
  vimeo_id: string;
  vimeo_url: string;
  thumbnail_url: string;
  duration: number;
  display_order: number;
  featured: boolean;
  visible: boolean;
}

const blankVideo = {
  title_en: '',
  title_ar: '',
  description_en: '',
  description_ar: '',
  section: 'conferences' as const,
  vimeo_id: '',
  vimeo_url: '',
  thumbnail_url: '',
  duration: 0,
  display_order: 0,
  featured: false,
  visible: true,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0a1e1a',
  border: '1px solid #1a3530',
  color: '#fff',
  padding: '10px 12px',
  fontSize: 13,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  borderRadius: 6,
};

const AdminVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeSection, setActiveSection] = useState<string>('conferences');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<Omit<Video, 'id'>>(blankVideo);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('videos').select('*').order('display_order');
    setVideos((data as Video[]) || []);
  };

  useEffect(() => { load(); }, []);

  const filteredVideos = videos.filter(v => v.section === activeSection);

  const openAdd = () => {
    setForm({ ...blankVideo, section: activeSection as any });
    setEditId(null);
    setModal(true);
  };

  const openEdit = (v: Video) => {
    const { id, ...rest } = v;
    setForm(rest);
    setEditId(id);
    setModal(true);
  };

  const fetchVimeoData = async (url: string) => {
    setFetching(true);
    try {
      const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setForm(prev => ({
        ...prev,
        vimeo_url: url,
        vimeo_id: url.split('/').pop()?.split('?')[0] || '',
        thumbnail_url: data.thumbnail_url || prev.thumbnail_url,
        title_en: data.title || prev.title_en,
        duration: data.duration || prev.duration,
      }));
    } catch {
      alert('Failed to fetch Vimeo data. Check URL.');
    } finally {
      setFetching(false);
    }
  };

  const save = async () => {
    setSaving(true);
    if (editId) {
      await supabase.from('videos').update(form).eq('id', editId);
    } else {
      await supabase.from('videos').insert([form]);
    }
    await load();
    setModal(false);
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    await supabase.from('videos').delete().eq('id', id);
    await load();
  };

  const toggle = async (id: string, field: 'featured' | 'visible') => {
    const current = videos.find(v => v.id === id);
    if (!current) return;
    await supabase.from('videos').update({ [field]: !current[field] }).eq('id', id);
    await load();
  };

  const sectionTabs = ['conferences', 'corporate_ads', 'designs', 'our_work'];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff' }}>Video Sections</h1>
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Manage videos for conferences, corporate ads, designs, and our work</p>
        </div>
        <button onClick={openAdd} style={{
          padding: '10px 20px', background: '#FF4500', border: 'none', color: '#fff',
          fontSize: 13, cursor: 'pointer', borderRadius: 6, fontWeight: 500,
        }}>+ ADD VIDEO</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6" style={{ borderBottom: '1px solid #1a3530' }}>
        {sectionTabs.map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{
            padding: '12px 24px',
            background: activeSection === s ? 'rgba(255,69,0,0.1)' : 'transparent',
            border: 'none',
            borderBottom: activeSection === s ? '2px solid #FF4500' : '2px solid transparent',
            color: activeSection === s ? '#FF4500' : '#94a3b8',
            fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit',
          }}>{s.replace('_', ' ').toUpperCase()}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['THUMB', 'TITLE', 'VIMEO ID', 'ORDER', 'FEATURED', 'VISIBLE', 'ACTIONS'].map(h => (
                <th key={h} style={{ padding: '10px 12px', color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', textAlign: 'left', borderBottom: '1px solid #1a3530' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map(v => (
              <tr key={v.id} style={{ borderBottom: '1px solid #1a3530' }}>
                <td style={{ padding: 8 }}>
                  {v.thumbnail_url ? <img src={v.thumbnail_url} alt="" style={{ width: 80, height: 45, objectFit: 'cover', borderRadius: 4 }} /> : <div style={{ width: 80, height: 45, background: '#1a3530', borderRadius: 4 }} />}
                </td>
                <td style={{ padding: 8 }}>
                  <div style={{ color: '#fff', fontSize: 13 }}>{v.title_en}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{v.title_ar}</div>
                </td>
                <td style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>{v.vimeo_id || '—'}</td>
                <td style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>{v.display_order}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => toggle(v.id, 'featured')} style={{
                    background: v.featured ? 'rgba(255,69,0,0.2)' : 'transparent',
                    border: `1px solid ${v.featured ? '#FF4500' : '#1a3530'}`,
                    color: v.featured ? '#FF4500' : '#555',
                    padding: '3px 8px', fontSize: 9, cursor: 'pointer', borderRadius: 4,
                  }}>{v.featured ? 'YES' : 'NO'}</button>
                </td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => toggle(v.id, 'visible')} style={{
                    background: v.visible ? 'rgba(255,69,0,0.2)' : 'transparent',
                    border: `1px solid ${v.visible ? '#FF4500' : '#1a3530'}`,
                    color: v.visible ? '#FF4500' : '#555',
                    padding: '3px 8px', fontSize: 9, cursor: 'pointer', borderRadius: 4,
                  }}>{v.visible ? 'SHOWN' : 'HIDDEN'}</button>
                </td>
                <td style={{ padding: 8 }}>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(v)} style={{ background: 'transparent', border: '1px solid #1a3530', color: '#94a3b8', padding: '5px 10px', fontSize: 10, cursor: 'pointer', borderRadius: 4 }}>EDIT</button>
                    <button onClick={() => del(v.id)} style={{ background: 'transparent', border: '1px solid #7f1d1d', color: '#f87171', padding: '5px 10px', fontSize: 10, cursor: 'pointer', borderRadius: 4 }}>DEL</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredVideos.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#555', fontSize: 13 }}>No videos in this section</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0d2420', border: '1px solid #1a3530', borderRadius: 12, padding: 32, width: '90%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: 18, fontWeight: 300, color: '#fff' }}>{editId ? 'Edit Video' : 'Add Video'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: 22, cursor: 'pointer' }}>×</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>TITLE (EN)</label>
                <input style={inputStyle} value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>TITLE (AR)</label>
                <input style={inputStyle} value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>DESCRIPTION (EN)</label>
                <textarea style={{ ...inputStyle, minHeight: 60 }} value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>DESCRIPTION (AR)</label>
                <textarea style={{ ...inputStyle, minHeight: 60 }} value={form.description_ar} onChange={e => setForm({ ...form, description_ar: e.target.value })} />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>SECTION</label>
                <select style={inputStyle} value={form.section} onChange={e => setForm({ ...form, section: e.target.value as any })}>
                  <option value="conferences">Conferences</option>
                  <option value="corporate_ads">Corporate Ads</option>
                  <option value="designs">Designs</option>
                  <option value="our_work">Our Work</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>DISPLAY ORDER</label>
                <input type="number" style={inputStyle} value={form.display_order} onChange={e => setForm({ ...form, display_order: +e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>VIMEO URL</label>
                <div className="flex gap-2">
                  <input style={{ ...inputStyle, flex: 1 }} value={form.vimeo_url} onChange={e => setForm({ ...form, vimeo_url: e.target.value })} placeholder="https://vimeo.com/123456789" />
                  <button onClick={() => fetchVimeoData(form.vimeo_url)} disabled={fetching || !form.vimeo_url} style={{
                    background: '#FF4500', border: 'none', color: '#fff', padding: '10px 20px',
                    fontSize: 11, cursor: fetching ? 'not-allowed' : 'pointer', opacity: fetching ? 0.5 : 1, borderRadius: 6,
                  }}>{fetching ? 'FETCHING...' : 'FETCH'}</button>
                </div>
                <p style={{ color: '#555', fontSize: 10, marginTop: 4 }}>Fetches title, thumbnail, and duration from Vimeo oEmbed</p>
              </div>
              <div className="md:col-span-2">
                <label style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>THUMBNAIL URL</label>
                <input style={inputStyle} value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} />
                {form.thumbnail_url && <img src={form.thumbnail_url} alt="preview" style={{ width: 120, height: 68, objectFit: 'cover', marginTop: 8, borderRadius: 4 }} />}
              </div>
              <div className="flex gap-6 items-center md:col-span-2">
                <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>Featured</span>
                </label>
                <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.visible} onChange={e => setForm({ ...form, visible: e.target.checked })} />
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>Visible</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} style={{
                flex: 1, background: '#FF4500', border: 'none', color: '#fff', padding: 13,
                fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', borderRadius: 6, opacity: saving ? 0.7 : 1,
              }}>{saving ? 'SAVING...' : 'SAVE VIDEO'}</button>
              <button onClick={() => setModal(false)} style={{
                background: 'transparent', border: '1px solid #1a3530', color: '#94a3b8',
                padding: '13px 22px', fontSize: 12, cursor: 'pointer', borderRadius: 6,
              }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVideos;
