import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Save, Trash2, Plus } from 'lucide-react'
import { GRAD, GRAD_START, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { apiGetSettings, apiSaveSettings, DEFAULT_SETTINGS } from '@/lib/api'
import type { Settings } from '@/lib/api'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', background: BG,
  border: `1px solid ${BORDER}`, borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none',
}

export default function AdminSettings() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [saved, setSaved] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGetSettings().then(data => { setSettings(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  let heroImages: string[] = []
  try { heroImages = JSON.parse(settings.hero_images || '[]') } catch {}

  const persist = async (s: Settings, key: string) => {
    try {
      await apiSaveSettings({ ...s, visit_count: Number(s.visit_count) || 0 })
      setSaved(key)
      setTimeout(() => setSaved(null), 2000)
    } catch { alert('Failed to save settings.') }
  }

  const update = (key: string, value: string) => setSettings({ ...settings, [key]: value })

  const addHeroImage = () => {
    if (!newImageUrl.trim()) return
    const images = [...heroImages, newImageUrl.trim()]
    const updated = { ...settings, hero_images: JSON.stringify(images) }
    setSettings(updated)
    persist(updated, 'hero_images')
    setNewImageUrl('')
  }

  const removeHeroImage = (idx: number) => {
    const images = heroImages.filter((_, i) => i !== idx)
    const updated = { ...settings, hero_images: JSON.stringify(images) }
    setSettings(updated)
    persist(updated, 'hero_images')
  }

  const contactFields = [
    { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' },
    { key: 'whatsapp', label: 'WhatsApp' }, { key: 'address', label: 'Address' },
    { key: 'instagram', label: 'Instagram' }, { key: 'twitter', label: 'Twitter' }, { key: 'snapchat', label: 'Snapchat' },
  ]

  const SaveBtn = ({ k }: { k: string }) => (
    <button onClick={() => persist(settings, k)} style={{
      padding: '10px 14px',
      background: saved === k ? GRAD : `${GRAD_START}12`,
      border: 'none', borderRadius: 4, cursor: 'pointer',
      color: saved === k ? '#fff' : GRAD_START, transition: 'all 0.3s',
    }}><Save size={16}/></button>
  )

  if (loading) return <div style={{ textAlign: 'center', padding: 48, color: '#555' }}>Loading...</div>

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff', marginBottom: 24 }}>{t('admin_settings')}</h1>

      <div style={{ marginBottom: 24, padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 20 }}>{t('admin_contact_social')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {contactFields.map(f => (
            <div key={f.key} style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: '#555', fontSize: 12, display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input value={(settings as any)[f.key] || ''} onChange={e => update(f.key, e.target.value)} style={inputStyle}/>
              </div>
              <div style={{ alignSelf: 'flex-end' }}><SaveBtn k={f.key}/></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24, padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 20 }}>{t('admin_change_password')}</h2>
        <div style={{ display: 'flex', gap: 8, maxWidth: 400 }}>
          <input type="password" value={settings.admin_password} onChange={e => update('admin_password', e.target.value)} style={{ ...inputStyle, flex: 1 }}/>
          <SaveBtn k="admin_password"/>
        </div>
      </div>

      <div style={{ marginBottom: 24, padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 20 }}>{t('admin_visit_counter')}</h2>
        <div style={{ display: 'flex', gap: 8, maxWidth: 300, alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: 14 }}>Current: <strong style={{ color: '#fff' }}>{settings.visit_count}</strong></span>
          <input type="number" value={settings.visit_count} onChange={e => update('visit_count', e.target.value)} style={{ ...inputStyle, flex: 1 }}/>
          <SaveBtn k="visit_count"/>
        </div>
      </div>

      <div style={{ marginBottom: 24, padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 8 }}>{t('admin_hero_images')}</h2>
        <p style={{ color: '#444', fontSize: 12, marginBottom: 16 }}>Add direct image URLs (e.g. https://example.com/photo.jpg). These are stored in the database.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
          {heroImages.map((img, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              <img src={img} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}/>
              <button onClick={() => removeHeroImage(i)} style={{ position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: '50%', background: 'rgba(239,68,68,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={12} style={{ color: '#fff' }}/>
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, maxWidth: 500 }}>
          <input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" style={{ ...inputStyle, flex: 1 }}/>
          <button onClick={addHeroImage} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: GRAD, color: '#fff', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
            <Plus size={16}/> Add
          </button>
        </div>
      </div>

      <div style={{ padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 8 }}>Vimeo Access Token</h2>
        <p style={{ color: '#444', fontSize: 12, marginBottom: 16 }}>For private videos. Get it from developer.vimeo.com. Stored securely in the database.</p>
        <div style={{ display: 'flex', gap: 8, maxWidth: 500 }}>
          <input type="password" value={settings.vimeo_access_token || ''} onChange={e => update('vimeo_access_token', e.target.value)} placeholder="Enter Vimeo access token" style={{ ...inputStyle, flex: 1 }}/>
          <SaveBtn k="vimeo_access_token"/>
        </div>
      </div>
    </div>
  )
}
