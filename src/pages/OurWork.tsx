import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import { gradText, BG, BORDER } from '@/lib/brand'
import { getVideos } from '@/lib/storage'

const PLACEHOLDER = [
  { id: 'w1', title_en: 'Red Sea Film Series', title_ar: 'سلسلة أفلام البحر الأحمر',
    thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', vimeo_url: '' },
  { id: 'w2', title_en: 'Riyadh Season Coverage', title_ar: 'تغطية موسم الرياض',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', vimeo_url: '' },
  { id: 'w3', title_en: 'Vision 2030 Documentary', title_ar: 'وثائقي رؤية 2030',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', vimeo_url: '' },
]

export default function OurWork() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [videos, setVideos] = useState(PLACEHOLDER)
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    try {
      const filtered = getVideos().filter((v: any) => v.section === 'our_work' && v.visible)
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((v: any) => ({ ...v, thumbnail: v.thumbnail_url || v.thumbnail || '' }))
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
            {isAr ? 'أعمالنا' : 'Our Work'}
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
