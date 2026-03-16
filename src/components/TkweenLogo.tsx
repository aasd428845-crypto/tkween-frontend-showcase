interface TkweenLogoProps {
  size?: number
  showText?: boolean
  showSubtitle?: boolean
  layout?: 'horizontal' | 'vertical'
}

export default function TkweenLogo({
  size = 40,
  showText = true,
  showSubtitle,
  layout,
}: TkweenLogoProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a"/>
            <stop offset="100%" stopColor="#0a0a0a"/>
          </linearGradient>
        </defs>

        <path
          d="M12,8 C10,8 8,10 8,12 L8,88 C8,92 12,95 16,93 L90,55 C94,53 94,47 90,45 L16,7 C15,7.5 13,8 12,8 Z"
          fill="url(#triGrad)"
        />

        <rect x="16" y="18" width="10" height="64" fill="#000000" rx="1"/>
        <rect x="16" y="18" width="30" height="11" fill="#000000" rx="1"/>
        <rect x="16" y="71" width="30" height="11" fill="#000000" rx="1"/>

        <circle cx="68" cy="50" r="7" fill="#2dd4bf"/>
      </svg>

      {showText && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.15,
        }}>
          <span style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: size * 0.5,
            fontWeight: 700,
            color: '#ffffff',
            direction: 'rtl',
            letterSpacing: '0.02em',
          }}>
            تكوين
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: size * 0.2,
            fontWeight: 300,
            color: '#2dd4bf',
            letterSpacing: '0.3em',
          }}>
            TKWEEN
          </span>
        </div>
      )}
    </div>
  )
}
