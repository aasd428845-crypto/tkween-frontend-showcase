import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Save, Trash2, Plus } from 'lucide-react'
import { GRAD, GRAD_START, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { apiGetSettings, apiSaveSettings, apiUploadFile, notifyUpdate } from '@/lib/api'
import type { Settings as TkweenSettings } from '@/lib/storage'

const DEFAULT_SETTINGS: TkweenSettings = {
  phone: '0553120141', email: 'sales@tkweensa.com', whatsapp: '966553120141',
  address: 'الرياض، المملكة العربية السعودية', instagram: 'https://instagram.com/Tkweensa',
  twitter: 'https://twitter.com/Tkweensa', snapchat: 'https://snapchat.com/add/Tkweensa',
  admin_password: 'tkween2025', visit_count: '0', hero_images: '[]',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', background: BG,
  border: `1px solid ${BORDER}`, borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none',
}

export default function AdminSettings() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<TkweenSettings>(DEFAULT_SETTINGS)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [saved, setSaved] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const heroUploadRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    apiGetSettings().then(data => setSettings(data as TkweenSettings)).catch(() => {})
  }, [])

  let heroImages: string[] = []
  try { heroImages = JSON.parse(settings.hero_images || '[]') } catch {}

  const persist = async (s: TkweenSettings, key: string) => {
    setSaving(key)
    try {
      const updated = await apiSaveSettings(s)
      setSettings(updated as TkweenSettings)
      notifyUpdate()
    } catch {
      setSettings(s)
    } finally {
      setSaving(null)
      setSaved(key)
      setTimeout(() => setSaved(null), 2000)
    }
  }

  const update = (key: string, value: string) => setSettings(s => ({ ...s, [key]: value }))

  const addHeroImage = async () => {
    if (!newImageUrl.trim()) return
    const images = [...heroImages, newImageUrl.trim()]
    const updated = { ...settings, hero_images: JSON.stringify(images) }
    setNewImageUrl('')
    await persist(updated, 'hero_images')
  }

  const removeHeroImage = async (idx: number) => {
    const images = heroImages.filter((_, i) => i !== idx)
    const updated = { ...settings, hero_images: JSON.stringify(images) }
    await persist(updated, 'hero_images')
  }

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await apiUploadFile(file)
      const images = [...heroImages, url]
      const updated = { ...settings, hero_images: JSON.stringify(images) }
      await persist(updated, 'hero_images')
    } catch { alert('Upload failed') } finally {
      setUploading(false)
      if (heroUploadRef.current) heroUploadRef.current.value = ''
    }
  }

  const contactFields = [
    { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' },
    { key: 'whatsapp', label: 'WhatsApp' }, { key: 'address', label: 'Address' },
    { key: 'instagram', label: 'Instagram' }, { key: 'twitter', label: 'Twitter' }, { key: 'snapchat', label: 'Snapchat' },
  ]

  const SaveBtn = ({ k }: { k: string }) => (
    <button onClick={() => persist(settings, k)} disabled={saving === k} style={{
      padding: '10px 14px',
      background: saved === k ? GRAD : `${GRAD_START}12`,
      border: 'none', borderRadius: 4, cursor: saving === k ? 'not-allowed' : 'pointer',
      color: saved === k ? '#fff' : GRAD_START, transition: 'all 0.3s', opacity: saving === k ? 0.6 : 1,
    }}><Save size={16}/></button>
  )

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
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 20 }}>{t('admin_hero_images')}</h2>
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
        <div style={{ display: 'flex', gap: 8, maxWidth: 500, marginBottom: 12 }}>
          <input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder={t('admin_add_image')} style={{ ...inputStyle, flex: 1 }}/>
          <button onClick={addHeroImage} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: GRAD, color: '#fff', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
            <Plus size={16}/> Add URL
          </button>
        </div>
        <div>
          <input ref={heroUploadRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleHeroUpload}/>
          <button onClick={() => heroUploadRef.current?.click()} disabled={uploading} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
            background: 'transparent', border: `1px solid ${BORDER}`, color: '#888',
            borderRadius: 4, cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.6 : 1, fontSize: 13,
          }}>
            {uploading ? 'Uploading...' : '↑ Upload Image File'}
          </button>
        </div>
      </div>

      <div style={{ padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 8 }}>Vimeo Access Token</h2>
        <p style={{ color: '#444', fontSize: 12, marginBottom: 16 }}>For private videos. Get it from developer.vimeo.com</p>
        <div style={{ display: 'flex', gap: 8, maxWidth: 500 }}>
          <input type="password" value={(settings as any).vimeo_access_token || ''} onChange={e => update('vimeo_access_token', e.target.value)} placeholder="Enter Vimeo access token" style={{ ...inputStyle, flex: 1 }}/>
          <SaveBtn k="vimeo_access_token"/>
        </div>
      </div>
    </div>
  )
}
