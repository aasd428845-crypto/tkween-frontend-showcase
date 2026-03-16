import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import { gradText, BG, BORDER } from '@/lib/brand'
import { getVideos } from '@/lib/storage'

const PLACEHOLDER = [
  { id: 'c1', title_en: 'Saudi Vision Forum 2024', title_ar: 'منتدى رؤية السعودية 2024',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', vimeo_url: '' },
  { id: 'c2', title_en: 'Future Investment Forum', title_ar: 'منتدى مستقبل الاستثمار',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', vimeo_url: '' },
  { id: 'c3', title_en: 'Aramco Annual Summit', title_ar: 'قمة أرامكو السنوية',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', vimeo_url: '' },
]

export default function Conferences() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [videos, setVideos] = useState(PLACEHOLDER)
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    const filtered = getVideos()
      .filter(v => v.section === 'conferences' && v.visible)
      .sort((a, b) => a.display_order - b.display_order)
      .map(v => ({ ...v, thumbnail: (v as any).thumbnail_url || (v as any).thumbnail || '' }))
    if (filtered.length > 0) setVideos(filtered as any)
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
            {isAr ? 'تغطية المؤتمرات' : 'Conference Coverage'}
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
