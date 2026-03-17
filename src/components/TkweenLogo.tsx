import React from 'react'

let _logoCounter = 0

export default function TkweenLogo({
  size = 44,
  showText = true,
  showSubtitle = false,
}: {
  size?: number
  showText?: boolean
  showSubtitle?: boolean
}) {
  const [uid] = React.useState(() => 'tklogo-' + (++_logoCounter))

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uid}-g`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#2dd4bf"/>
          <stop offset="50%"  stopColor="#14b8a6"/>
          <stop offset="100%" stopColor="#1e3a8a"/>
        </linearGradient>
        <mask id={`${uid}-m`}>
          <rect width="100" height="100" fill="white"/>
          <rect x="22" y="24" width="40" height="13" rx="3" fill="black"/>
          <rect x="36" y="24" width="13" height="40" rx="3" fill="black"/>
        </mask>
      </defs>
      <path
        d="M 14,4 C 7,4 4,7 4,14 L 4,86 C 4,93 7,96 14,96
           C 19,96 24,94 28,90 L 92,56
           C 97,53 97,47 92,44 L 28,10
           C 24,6 19,4 14,4 Z"
        fill={`url(#${uid}-g)`}
        mask={`url(#${uid}-m)`}
      />
    </svg>
  )

  if (!showText) return icon

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      {icon}

      {/* Arabic "تكوين" with small red play triangle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, direction: 'rtl' }}>
        <span style={{
          fontFamily: "'Tajawal', sans-serif",
          fontSize: size * 0.65,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #2dd4bf 0%, #0ea5e9 50%, #1e3a8a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}>تكوين</span>
        <svg width={size * 0.14} height={size * 0.14} viewBox="0 0 10 10">
          <path d="M1,1 L9,5 L1,9 Z" fill="#f43f5e"/>
        </svg>
      </div>

      {/* TKWEEN */}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: size * 0.2,
        fontWeight: 600,
        color: '#14b8a6',
        letterSpacing: '0.35em',
        marginTop: -2,
      }}>TKWEEN</span>

      {/* Subtitles — only on full/login version */}
      {showSubtitle && (
        <>
          <div style={{
            width: size * 1.6,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #2dd4bf80, transparent)',
            marginTop: 4,
          }}/>
          <span style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: size * 0.14,
            color: '#94a3b8',
            letterSpacing: '0.05em',
            marginTop: 3,
          }}>شركة تكوين للإنتاج الفني</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: size * 0.12,
            color: '#64748b',
            letterSpacing: '0.12em',
            marginTop: 1,
          }}>| For Media Production |</span>
        </>
      )}
    </div>
  )
}
