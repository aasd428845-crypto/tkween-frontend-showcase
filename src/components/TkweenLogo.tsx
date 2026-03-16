import React from 'react'

let _logoCounter = 0

export default function TkweenLogo({
  size = 44,
  showText = true,
  layout = 'horizontal',
}: {
  size?: number
  showText?: boolean
  layout?: 'horizontal' | 'vertical'
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
        {/* Teal top → dark blue bottom, matching the reference */}
        <linearGradient id={`${uid}-g`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#2dd4bf"/>
          <stop offset="50%"  stopColor="#14b8a6"/>
          <stop offset="100%" stopColor="#1e3a8a"/>
        </linearGradient>
        {/* Mask: white everything, black T shape = T is cut out */}
        <mask id={`${uid}-m`}>
          <rect width="100" height="100" fill="white"/>
          {/* Horizontal bar of T */}
          <rect x="22" y="24" width="40" height="13" rx="3" fill="black"/>
          {/* Vertical stem of T */}
          <rect x="36" y="24" width="13" height="40" rx="3" fill="black"/>
        </mask>
      </defs>

      {/*
        Play button shape: rounded left edge, pointed right tip.
        Matches the reference image outline.
      */}
      <path
        d="
          M 14,4
          C 7,4 4,7 4,14
          L 4,86
          C 4,93 7,96 14,96
          C 19,96 24,94 28,90
          L 92,56
          C 97,53 97,47 92,44
          L 28,10
          C 24,6 19,4 14,4 Z
        "
        fill={`url(#${uid}-g)`}
        mask={`url(#${uid}-m)`}
      />
    </svg>
  )

  if (!showText) return icon

  /* ── VERTICAL layout — matches the reference brand image ── */
  if (layout === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {icon}

        {/* Arabic "تكوين" with embedded red play dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, direction: 'rtl' }}>
          <span style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: size * 0.72,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #2dd4bf 0%, #0ea5e9 50%, #1e3a8a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}>تكوين</span>
          {/* Small red play triangle — the accent */}
          <svg width={size * 0.14} height={size * 0.14} viewBox="0 0 10 10">
            <path d="M1,1 L9,5 L1,9 Z" fill="#f43f5e"/>
          </svg>
        </div>

        {/* TKWEEN */}
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: size * 0.22,
          fontWeight: 600,
          color: '#14b8a6',
          letterSpacing: '0.35em',
          marginTop: -6,
        }}>TKWEEN</span>

        {/* Thin teal separator */}
        <div style={{
          width: size * 1.4,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #2dd4bf80, transparent)',
          marginTop: 2,
        }}/>

        {/* Subtitles */}
        <span style={{
          fontFamily: "'Tajawal', sans-serif",
          fontSize: size * 0.14,
          color: '#94a3b8',
          letterSpacing: '0.05em',
          marginTop: 2,
        }}>شركة تكوين للإنتاج الفني</span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: size * 0.12,
          color: '#64748b',
          letterSpacing: '0.12em',
          marginTop: 1,
        }}>| For Media Production |</span>
      </div>
    )
  }

  /* ── HORIZONTAL layout — for navbar / sidebar ── */
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {icon}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, direction: 'rtl' }}>
          <span style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: size * 0.5,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #2dd4bf 0%, #0ea5e9 50%, #1e3a8a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.01em',
          }}>تكوين</span>
          <svg width={size * 0.13} height={size * 0.13} viewBox="0 0 10 10">
            <path d="M1,1 L9,5 L1,9 Z" fill="#f43f5e"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: size * 0.2,
          fontWeight: 500,
          color: '#14b8a6',
          letterSpacing: '0.28em',
          marginTop: 1,
        }}>TKWEEN</span>
      </div>
    </div>
  )
}
