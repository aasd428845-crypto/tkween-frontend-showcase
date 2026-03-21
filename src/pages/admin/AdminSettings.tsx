import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Save, Plus, Trash2 } from 'lucide-react'
import { GRAD, GRAD_START, BG, BG_SOFT, BORDER } from '@/lib/brand'
import { fetchCloudSettings, saveCloudSettings } from '@/lib/cloud-content'
import { DEFAULT_SETTINGS, type Settings as TkweenSettings } from '@/lib/storage'

const inputStyle: CSSProperties = {
  width: '100%', padding: '10px 14px', background: BG,
  border: `1px solid ${BORDER}`, borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none',
}

export default function AdminSettings() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<TkweenSettings>(DEFAULT_SETTINGS)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [saved, setSaved] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const cloudSettings = await fetchCloudSettings()
        if (!cancelled) setSettings(cloudSettings)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => { cancelled = true }
  }, [])

  const heroImages = useMemo(() => {
    try {
      const parsed = JSON.parse(settings.hero_images || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }, [settings.hero_images])

  const saveField = async (key: keyof TkweenSettings) => {
    try {
      await saveCloudSettings({ [key]: (settings[key] ?? '') as string })
      setSaved(key)
      setTimeout(() => setSaved(null), 2000)
    } catch {
      alert('Failed to save setting. Please try again.')
    }
  }

  const update = (key: keyof TkweenSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const addHeroImage = async () => {
    if (!newImageUrl.trim()) return
    const images = [...heroImages, newImageUrl.trim()]
    const hero_images = JSON.stringify(images)

    try {
      await saveCloudSettings({ hero_images })
      setSettings(prev => ({ ...prev, hero_images }))
      setNewImageUrl('')
    } catch {
      alert('Failed to add image. Please try again.')
    }
  }

  const removeHeroImage = async (idx: number) => {
    const images = heroImages.filter((_, i) => i !== idx)
    const hero_images = JSON.stringify(images)

    try {
      await saveCloudSettings({ hero_images })
      setSettings(prev => ({ ...prev, hero_images }))
    } catch {
      alert('Failed to remove image. Please try again.')
    }
  }

  const contactFields: Array<{ key: keyof TkweenSettings; label: string }> = [
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'address', label: 'Address' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'twitter', label: 'Twitter' },
    { key: 'snapchat', label: 'Snapchat' },
  ]

  const SaveBtn = ({ k }: { k: keyof TkweenSettings }) => (
    <button onClick={() => void saveField(k)} style={{
      padding: '10px 14px',
      background: saved === k ? GRAD : `${GRAD_START}12`,
      border: 'none', borderRadius: 4, cursor: 'pointer',
      color: saved === k ? '#fff' : GRAD_START, transition: 'all 0.3s',
    }}><Save size={16}/></button>
  )

  if (loading) {
    return <p style={{ color: '#888' }}>Loading settings...</p>
  }

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
                <input value={(settings[f.key] ?? '') as string} onChange={e => update(f.key, e.target.value)} style={inputStyle}/>
              </div>
              <div style={{ alignSelf: 'flex-end' }}><SaveBtn k={f.key}/></div>
            </div>
          ))}
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
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 12 }}>Vimeo Integration</h2>
        <p style={{ color: '#666', fontSize: 12, marginBottom: 12 }}>Token is stored in backend settings (not exposed publicly).</p>
        <div style={{ display: 'flex', gap: 8, maxWidth: 700 }}>
          <input
            value={settings.vimeo_access_token ?? ''}
            onChange={e => update('vimeo_access_token', e.target.value)}
            placeholder="Vimeo Access Token"
            style={{ ...inputStyle, flex: 1 }}
          />
          <SaveBtn k="vimeo_access_token"/>
        </div>
      </div>

      <div style={{ marginBottom: 24, padding: 24, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, color: GRAD_START, marginBottom: 20 }}>{t('admin_hero_images')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
          {heroImages.map((img, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              <img src={img} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}/>
              <button onClick={() => void removeHeroImage(i)} style={{ position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: '50%', background: 'rgba(239,68,68,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={12} style={{ color: '#fff' }}/>
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, maxWidth: 500 }}>
          <input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder={t('admin_add_image')} style={{ ...inputStyle, flex: 1 }}/>
          <button onClick={() => void addHeroImage()} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: GRAD, color: '#fff', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
            <Plus size={16}/> Add
          </button>
        </div>
      </div>
    </div>
  )
}
