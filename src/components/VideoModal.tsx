import { useEffect } from 'react'

interface VideoModalProps {
  url: string
  title?: string
  onClose: () => void
}

export default function VideoModal({ url, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const getEmbedUrl = (rawUrl: string) => {
    if (rawUrl.includes('vimeo.com')) {
      const id = rawUrl.split('/').filter(Boolean).pop()?.split('?')[0]
      return `https://player.vimeo.com/video/${id}?autoplay=1&color=FF5F57`
    }
    if (rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
      const id = rawUrl.includes('v=')
        ? rawUrl.split('v=')[1]?.split('&')[0]
        : rawUrl.split('/').pop()?.split('?')[0]
      return `https://www.youtube.com/embed/${id}?autoplay=1`
    }
    return null
  }

  const embedUrl = getEmbedUrl(url)

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: `rgba(0,0,0,0.96)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: 20, right: 24,
        background: 'none', border: 'none', color: '#fff', fontSize: 36, cursor: 'pointer', lineHeight: 1,
      }}>×</button>

      <div onClick={e => e.stopPropagation()} style={{ width: '92vw', maxWidth: 1000 }}>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          {embedUrl ? (
            <iframe src={embedUrl} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none',
            }} allowFullScreen allow="autoplay; fullscreen"/>
          ) : (
            <video src={url} controls autoPlay
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}/>
          )}
        </div>
        {title && <p style={{ color: '#888', fontSize: 13, marginTop: 12, textAlign: 'center' }}>{title}</p>}
      </div>
    </div>
  )
}
