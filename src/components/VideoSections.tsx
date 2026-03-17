import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import VideoModal from './VideoModal';

interface Video {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  section: string;
  vimeo_url: string | null;
  thumbnail_url: string | null;
  featured: boolean | null;
  visible: boolean;
  display_order: number;
}

const sectionTitles: Record<string, { en: string; ar: string }> = {
  conferences: { en: 'Conference Coverage', ar: 'تغطية المؤتمرات' },
  corporate_ads: { en: 'Corporate Ads', ar: 'الإعلانات' },
  designs: { en: 'Our Designs', ar: 'تصاميمنا' },
  our_work: { en: 'Our Work', ar: 'أعمالنا' },
};

function loadVideos(): Video[] {
  try {
    return JSON.parse(localStorage.getItem('tkween_videos') || '[]');
  } catch {
    return [];
  }
}

const VideoSections = () => {
  const { lang } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = loadVideos()
    .filter(v => v.visible)
    .sort((a, b) => a.display_order - b.display_order);

  const grouped = videos.reduce((acc, video) => {
    if (!acc[video.section]) acc[video.section] = [];
    acc[video.section].push(video);
    return acc;
  }, {} as Record<string, Video[]>);

  const sections = ['conferences', 'corporate_ads', 'designs', 'our_work'];

  if (videos.length === 0) return null;

  return (
    <div>
      {sections.map(section => {
        const sectionVideos = grouped[section] || [];
        if (sectionVideos.length === 0) return null;
        const titles = sectionTitles[section];

        return (
          <div key={section}>
            <div style={{ padding: '60px 0 20px', textAlign: 'center' }}>
              <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em', fontWeight: 400 }}>
                {titles.en.toUpperCase()}
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, color: '#fff', marginTop: 8 }}>
                {lang === 'ar' ? titles.ar : titles.en}
              </h2>
            </div>
            {sectionVideos.map(video => (
              <div
                key={video.id}
                className="work-card"
                onClick={() => video.vimeo_url && setSelectedVideo(video.vimeo_url)}
                style={{
                  width: '100%',
                  height: '56vw',
                  minHeight: 400,
                  maxHeight: 700,
                  backgroundImage: `url(${video.thumbnail_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  cursor: video.vimeo_url ? 'pointer' : 'default',
                  borderBottom: '1px solid #1a1a1a',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: 'clamp(24px, 4vw, 60px)',
                }}>
                  <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.15em' }}>
                    {titles.en.toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, color: '#fff', marginTop: 8 }}>
                    {lang === 'ar' ? video.title_ar : video.title_en}
                  </h3>
                  {video.description_en && (
                    <p style={{ color: '#999', fontSize: 14, marginTop: 8, maxWidth: 500 }}>
                      {lang === 'ar' ? video.description_ar : video.description_en}
                    </p>
                  )}
                </div>
                {video.vimeo_url && (
                  <div className="play-icon" style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(255,69,0,0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.3s',
                    fontSize: 28, color: '#fff',
                  }}>▶</div>
                )}
              </div>
            ))}
          </div>
        );
      })}
      {selectedVideo && <VideoModal url={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
};

export default VideoSections;
