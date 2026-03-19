import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import { warmGradText, WARM_GRAD, BG, BORDER } from '@/lib/brand'
import { fetchVideos } from '@/lib/supabase-data'

const PLACEHOLDER = [
  { id: 'ca1', title_en: 'NEOM Brand Campaign', title_ar: 'حملة علامة نيوم',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', vimeo_url: '' },
  { id: 'ca2', title_en: 'STC Corporate Film', title_ar: 'فيلم شركة STC',
    thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', vimeo_url: '' },
  { id: 'ca3', title_en: 'Aramco Commercial', title_ar: 'إعلان أرامكو',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', vimeo_url: '' },
]

export default function CorporateAds() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)
  const [videos, setVideos] = useState<any[]>(PLACEHOLDER)

  useEffect(() => {
    fetchVideos().then(data => {
      const filtered = data
        .filter(v => v.section === 'corporate_ads' && v.visible)
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        .map(v => ({ ...v, thumbnail: v.thumbnail_url || '' }))
      if (filtered.length > 0) setVideos(filtered)
    })
  }, [])

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ padding: '48px 32px 24px' }}>
          <span style={{ ...warmGradText, fontSize: 10, letterSpacing: '0.35em' }}>
            {isAr ? 'تكوين' : 'TKWEEN'}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 200, color: '#fff', marginTop: 8 }}>
            {isAr ? 'إعلانات الشركات' : 'Corporate Ads'}
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
