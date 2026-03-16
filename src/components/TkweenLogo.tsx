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
  const [uniqueId] = React.useState(() => 'tklogo-' + (++_logoCounter))
  const iconSize = size

  const icon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${uniqueId}-grad`}
          x1="20%" y1="0%"
          x2="80%" y2="100%"
        >
          <stop offset="0%"   stopColor="#2dd4bf"/>
          <stop offset="40%"  stopColor="#14b8a6"/>
          <stop offset="100%" stopColor="#1e40af"/>
        </linearGradient>
      </defs>

      <path
        d="
          M 22, 8
          C 14, 8  8, 14  8, 22
          L 8, 98
          C 8, 106  14, 112  22, 112
          C 26, 112  30, 110  33, 107
          L 108, 65
          C 114, 61  114, 59  114, 60
          C 114, 61  114, 59  108, 55
          L 33, 13
          C 30, 10  26, 8  22, 8
          Z
        "
        fill={`url(#${uniqueId}-grad)`}
      />

      <rect x="22" y="24" width="12" height="72" rx="3" fill="white"/>
      <rect x="22" y="24" width="38" height="13" rx="3" fill="white"/>
      <rect x="22" y="83" width="38" height="13" rx="3" fill="white"/>

      <circle cx="76" cy="60" r="9" fill="white" opacity="0.25"/>
      <circle cx="76" cy="60" r="6" fill="white" opacity="0.9"/>
    </svg>
  )

  if (!showText) return icon

  if (layout === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {icon}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: size * 0.38,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #2dd4bf 0%, #1e40af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            direction: 'rtl',
          }}>
            تكوين
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: size * 0.18,
            fontWeight: 400,
            color: '#2dd4bf',
            letterSpacing: '0.28em',
            marginTop: 1,
          }}>
            TKWEEN
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {icon}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{
          fontFamily: "'Tajawal', sans-serif",
          fontSize: size * 0.48,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #2dd4bf 0%, #1e40af 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          direction: 'rtl',
        }}>
          تكوين
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: size * 0.2,
          fontWeight: 300,
          color: '#2dd4bf',
          letterSpacing: '0.28em',
        }}>
          TKWEEN
        </span>
      </div>
    </div>
  )
}
