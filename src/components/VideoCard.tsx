import { useState } from 'react'
import { gradText, GRAD, TEAL } from '@/lib/brand'

interface VideoCardProps {
  title: string
  category?: string
  thumbnail: string
  videoUrl?: string
  height?: string
  onClick?: () => void
}

export default function VideoCard({
  title, category, thumbnail, videoUrl, height = '56vw', onClick,
}: VideoCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', width: '100%', height,
        overflow: 'hidden', background: '#111',
        cursor: onClick ? 'pointer' : 'default', display: 'block',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.8s ease',
        filter: hovered ? 'brightness(0.65)' : 'brightness(0.82)',
      }}/>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(6,6,6,0.82) 0%, transparent 55%)',
      }}/>

      {videoUrl && hovered && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 66, height: 66, borderRadius: '50%',
          background: GRAD,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 32px rgba(248,112,96,0.5)',
          transition: 'all 0.3s',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
            <polygon points="5,2 19,11 5,20"/>
          </svg>
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px 24px 24px',
      }}>
        {category && (
          <span style={{
            display: 'block', fontSize: 10, letterSpacing: '0.25em',
            marginBottom: 6, fontWeight: 400, ...gradText,
          }}>
            {category.toUpperCase()}
          </span>
        )}
        <h3 style={{
          color: '#fff', fontSize: 'clamp(16px, 2.5vw, 22px)',
          fontWeight: 300, lineHeight: 1.3,
        }}>
          {title}
        </h3>
      </div>
    </div>
  )
}
