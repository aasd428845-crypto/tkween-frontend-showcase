import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import VideoModal from './VideoModal'
import { GRAD, WARM_GRAD } from '@/lib/brand'
import { fetchCloudVideos } from '@/lib/cloud-content'
import type { Video } from '@/lib/storage'

const sectionTitles: Record<string, { en: string; ar: string }> = {
  conferences: { en: 'Conference Coverage', ar: 'تغطية المؤتمرات' },
  corporate_ads: { en: 'Corporate Ads', ar: 'الإعلانات' },
  designs: { en: 'Our Designs', ar: 'تصاميمنا' },
  our_work: { en: 'Our Work', ar: 'أعمالنا' },
}

function getVimeoEmbedUrl(url: string | null): string | null {
  if (!url || !url.includes('vimeo.com')) return null
  const id = url.split('/').filter(Boolean).pop()?.split('?')[0]
  if (!id) return null
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&controls=0`
}

export default function VideoSections() {
  const { lang } = useLanguage()
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const cloudVideos = await fetchCloudVideos()
      if (!cancelled) setVideos(cloudVideos.filter(v => v.visible).sort((a, b) => a.display_order - b.display_order))
    }
    void load()
    return () => { cancelled = true }
  }, [])

  const grouped = videos.reduce((acc, video) => {
    if (!acc[video.section]) acc[video.section] = []
    acc[video.section].push(video)
    return acc
  }, {} as Record<string, Video[]>)

  const sections = ['conferences', 'corporate_ads', 'designs', 'our_work']
  if (videos.length === 0) return null

  return (
    <div>
      {sections.map(section => {
        const sectionVideos = grouped[section] || []
        if (sectionVideos.length === 0) return null
        const titles = sectionTitles[section]

        return (
          <div key={section}>
            <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
            <div style={{ padding: '60px 0 20px', textAlign: 'center' }}>
              <span style={{ fontSize: 11, letterSpacing: '0.2em', fontWeight: 400, background: WARM_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{titles.en.toUpperCase()}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, color: '#fff', marginTop: 8 }}>{lang === 'ar' ? titles.ar : titles.en}</h2>
            </div>

            {sectionVideos.map(video => {
              const embedUrl = getVimeoEmbedUrl(video.vimeo_url)
              const videoTitle = lang === 'ar' ? video.title_ar : video.title_en

              return (
                <div
                  key={video.id}
                  onClick={() => video.vimeo_url && setSelectedVideo({ url: video.vimeo_url, title: videoTitle })}
                  style={{ width: '100%', height: '56vw', minHeight: 400, maxHeight: 700, position: 'relative', cursor: video.vimeo_url ? 'pointer' : 'default', borderBottom: '1px solid #1a1a1a', overflow: 'hidden', background: '#111' }}
                >
                  {embedUrl ? (
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                      <iframe src={embedUrl} allow="autoplay; fullscreen" title={videoTitle} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '177.78%', minHeight: '100%', width: '177.78%', border: 'none', pointerEvents: 'none' }} />
                    </div>
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${video.thumbnail_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  )}

                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px, 4vw, 60px)' }}>
                    <span style={{ fontSize: 11, letterSpacing: '0.15em', background: WARM_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{titles.en.toUpperCase()}</span>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, color: '#fff', marginTop: 8 }}>{videoTitle}</h3>
                    {video.description_en && (
                      <p style={{ color: '#999', fontSize: 14, marginTop: 8, maxWidth: 500 }}>{lang === 'ar' ? video.description_ar : video.description_en}</p>
                    )}
                  </div>

                  {video.vimeo_url && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 66, height: 66, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(248,112,96,0.5)' }}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="white"><polygon points="5,2 19,11 5,20"/></svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}

      {selectedVideo && <VideoModal url={selectedVideo.url} title={selectedVideo.title} onClose={() => setSelectedVideo(null)} />}
    </div>
  )
}
