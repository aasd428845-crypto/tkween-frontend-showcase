import { useState } from 'react'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import { warmGradText, WARM_GRAD, BG, BORDER } from '@/lib/brand'
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
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)

  const saved = getVideos()
    .filter((v: any) => v.section === 'conferences' && v.visible)
    .sort((a: any, b: any) => a.display_order - b.display_order)
    .map((v: any) => ({ ...v, thumbnail: v.thumbnail_url || v.thumbnail || '' }))

  const videos = saved.length > 0 ? saved : PLACEHOLDER

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ padding: '48px 32px 24px' }}>
          <span style={{ ...warmGradText, fontSize: 10, letterSpacing: '0.35em' }}>
            {isAr ? 'تكوين' : 'TKWEEN'}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 200, color: '#fff', marginTop: 8 }}>
            {isAr ? 'تغطية المؤتمرات' : 'Conference Coverage'}
          </h1>
        </div>
        <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
        {videos.map((v: any) => (
          <VideoCard key={v.id}
            title={isAr ? v.title_ar || v.title_en : v.title_en}
            thumbnail={v.thumbnail}
            videoUrl={v.vimeo_url || ''}
            height="65vw"
            onClick={v.vimeo_url ? () => setModal({ url: v.vimeo_url, title: isAr ? v.title_ar || v.title_en : v.title_en }) : undefined}
          />
        ))}
      </div>
      {modal && <VideoModal url={modal.url} title={modal.title} onClose={() => setModal(null)}/>}
      <WhatsAppButton />
    </div>
  )
}
