import { useEffect } from 'react';

interface VideoModalProps {
  url: string;
  onClose: () => void;
}

const VideoModal = ({ url, onClose }: VideoModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const getEmbedUrl = () => {
    if (url.includes('vimeo.com')) {
      const id = url.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.includes('youtu.be')
        ? url.split('/').pop()?.split('?')[0]
        : new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();
  const isDirectVideo = url.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.95)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '90%', maxWidth: 1000, aspectRatio: '16/9', position: 'relative' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: -40, right: 0,
          background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer',
        }}>×</button>
        {embedUrl && (
          <iframe src={embedUrl} style={{ width: '100%', height: '100%', border: 'none', borderRadius: 4 }}
            allow="autoplay; fullscreen" allowFullScreen />
        )}
        {isDirectVideo && (
          <video controls autoPlay style={{ width: '100%', height: '100%' }}>
            <source src={url} />
          </video>
        )}
        {!embedUrl && !isDirectVideo && (
          <p style={{ color: '#fff', textAlign: 'center' }}>Unsupported video URL</p>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
