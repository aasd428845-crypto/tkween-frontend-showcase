import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import { getSettings, saveSettings } from '@/data/defaults';
import { Save, Trash2, Plus } from 'lucide-react';

const AdminSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState(getSettings());
  const [newImageUrl, setNewImageUrl] = useState('');
  const [saved, setSaved] = useState<string | null>(null);

  const heroImages: string[] = JSON.parse(settings.hero_images);

  const saveField = (key: string) => {
    saveSettings(settings);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const updateSetting = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const addHeroImage = () => {
    if (!newImageUrl.trim()) return;
    const images = [...heroImages, newImageUrl.trim()];
    const updated = { ...settings, hero_images: JSON.stringify(images) };
    setSettings(updated);
    saveSettings(updated);
    setNewImageUrl('');
  };

  const removeHeroImage = (idx: number) => {
    const images = heroImages.filter((_, i) => i !== idx);
    const updated = { ...settings, hero_images: JSON.stringify(images) };
    setSettings(updated);
    saveSettings(updated);
  };

  const contactFields = [
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'address', label: 'Address' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'twitter', label: 'Twitter' },
    { key: 'snapchat', label: 'Snapchat' },
  ];

  return (
    <AdminLayout>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff', marginBottom: 24 }}>{t('admin_settings')}</h1>

      {/* Contact & Social */}
      <div className="mb-8 p-6" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 400, color: '#FF4500', marginBottom: 20 }}>{t('admin_contact_social')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactFields.map(f => (
            <div key={f.key} className="flex gap-2">
              <div className="flex-1">
                <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input value={(settings as any)[f.key]} onChange={e => updateSetting(f.key, e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: '#000', border: '1px solid #1a1a1a', borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <button onClick={() => saveField(f.key)} className="self-end"
                style={{ padding: '10px 14px', background: saved === f.key ? '#FF4500' : 'rgba(255,69,0,0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: saved === f.key ? '#fff' : '#FF4500', transition: 'all 0.3s' }}>
                <Save size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Password */}
      <div className="mb-8 p-6" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 400, color: '#FF4500', marginBottom: 20 }}>{t('admin_change_password')}</h2>
        <div className="flex gap-2 max-w-md">
          <input type="password" value={settings.admin_password} onChange={e => updateSetting('admin_password', e.target.value)}
            style={{ flex: 1, padding: '10px 14px', background: '#000', border: '1px solid #1a1a1a', borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none' }} />
          <button onClick={() => saveField('admin_password')}
            style={{ padding: '10px 14px', background: saved === 'admin_password' ? '#FF4500' : 'rgba(255,69,0,0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: saved === 'admin_password' ? '#fff' : '#FF4500' }}>
            <Save size={16} />
          </button>
        </div>
      </div>

      {/* Visit Counter */}
      <div className="mb-8 p-6" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 400, color: '#FF4500', marginBottom: 20 }}>{t('admin_visit_counter')}</h2>
        <div className="flex gap-2 max-w-md items-center">
          <span style={{ color: '#94a3b8', fontSize: 14 }}>Current: <strong style={{ color: '#fff' }}>{settings.visit_count}</strong></span>
          <input type="number" value={settings.visit_count} onChange={e => updateSetting('visit_count', e.target.value)}
            style={{ flex: 1, padding: '10px 14px', background: '#000', border: '1px solid #1a1a1a', borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none' }} />
          <button onClick={() => saveField('visit_count')}
            style={{ padding: '10px 14px', background: saved === 'visit_count' ? '#FF4500' : 'rgba(255,69,0,0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: saved === 'visit_count' ? '#fff' : '#FF4500' }}>
            <Save size={16} />
          </button>
        </div>
      </div>

      {/* Hero Images */}
      <div className="mb-8 p-6" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 400, color: '#FF4500', marginBottom: 20 }}>{t('admin_hero_images')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {heroImages.map((img, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid #1a1a1a' }}>
              <img src={img} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
              <button onClick={() => removeHeroImage(i)}
                style={{ position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: '50%', background: 'rgba(239,68,68,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={14} style={{ color: '#fff' }} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 max-w-lg">
          <input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder={t('admin_add_image')}
            style={{ flex: 1, padding: '10px 14px', background: '#000', border: '1px solid #1a1a1a', borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none' }} />
          <button onClick={addHeroImage} className="flex items-center gap-2"
            style={{ padding: '10px 16px', background: '#FF4500', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {/* Vimeo Access Token */}
      <div className="p-6" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 400, color: '#FF4500', marginBottom: 8 }}>Vimeo Access Token</h2>
        <p style={{ color: '#555', fontSize: 12, marginBottom: 16 }}>For private videos/upload. Get it from developer.vimeo.com</p>
        <div className="flex gap-2 max-w-lg">
          <input type="password" value={(settings as any).vimeo_access_token || ''} onChange={e => updateSetting('vimeo_access_token', e.target.value)}
            style={{ flex: 1, padding: '10px 14px', background: '#000', border: '1px solid #1a1a1a', borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none' }}
            placeholder="Enter Vimeo access token" />
          <button onClick={() => saveField('vimeo_access_token')}
            style={{ padding: '10px 14px', background: saved === 'vimeo_access_token' ? '#FF4500' : 'rgba(255,69,0,0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: saved === 'vimeo_access_token' ? '#fff' : '#FF4500' }}>
            <Save size={16} />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
