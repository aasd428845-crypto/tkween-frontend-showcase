export default function TkweenLogo({
  size = 44,
  showText = true,
  layout = 'horizontal',
}: {
  size?: number
  showText?: boolean
  layout?: 'horizontal' | 'vertical'
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: layout === 'vertical' ? 'column' : 'row',
      alignItems: 'center',
      gap: layout === 'vertical' ? 8 : 10,
    }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF3B30"/>
            <stop offset="50%" stopColor="#D62828"/>
            <stop offset="100%" stopColor="#8B0000"/>
          </linearGradient>
        </defs>
        <polygon points="6,4 96,50 6,96" fill="url(#tkGrad)"/>
        <rect x="8" y="10" width="11" height="80" fill="#000000"/>
        <rect x="8" y="10" width="36" height="13" fill="#000000"/>
        <rect x="8" y="77" width="36" height="13" fill="#000000"/>
        <circle cx="66" cy="50" r="7" fill="#FF3B30" opacity="0.9"/>
      </svg>

      {showText && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.1,
          textAlign: layout === 'vertical' ? 'center' : 'right',
        }}>
          <span style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: size * 0.48,
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
            color: '#FF3B30',
            letterSpacing: '0.28em',
          }}>
            TKWEEN
          </span>
        </div>
      )}
    </div>
  )
}
