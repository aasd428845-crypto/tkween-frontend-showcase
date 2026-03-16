import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import { gradText, BG, BORDER } from '@/lib/brand'

const PLACEHOLDER = [
  { id: 'd1', title_en: 'Motion Graphics Reel', title_ar: 'حزمة موشن جرافيك',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', vimeo_url: '' },
  { id: 'd2', title_en: 'Event Branding 2024', title_ar: 'هوية فعالية 2024',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', vimeo_url: '' },
  { id: 'd3', title_en: 'Digital Campaigns', title_ar: 'حملات رقمية',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', vimeo_url: '' },
]

export default function Designs() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [videos, setVideos] = useState(PLACEHOLDER)
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem('tkween_videos') || '[]')
      const filtered = all.filter((v: any) => v.section === 'designs' && v.visible)
        .sort((a: any, b: any) => a.display_order - b.display_order)
      if (filtered.length > 0) setVideos(filtered)
    } catch {}
  }, [])

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ padding: '48px 32px 24px', borderBottom: `1px solid ${BORDER}` }}>
          <span style={{ ...gradText, fontSize: 10, letterSpacing: '0.35em' }}>
            {isAr ? 'تكوين' : 'TKWEEN'}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 200, color: '#fff', marginTop: 8 }}>
            {isAr ? 'تصاميمنا' : 'Our Designs'}
          </h1>
        </div>
        {videos.map(v => (
          <VideoCard key={v.id}
            title={isAr ? (v as any).title_ar || v.title_en : v.title_en}
            thumbnail={v.thumbnail}
            videoUrl={(v as any).vimeo_url || ''}
            height="65vw"
            onClick={(v as any).vimeo_url ? () => setModal({ url: (v as any).vimeo_url, title: v.title_en }) : undefined}
          />
        ))}
      </div>
      {modal && <VideoModal url={modal.url} title={modal.title} onClose={() => setModal(null)}/>}
      <WhatsAppButton />
    </div>
  )
}
