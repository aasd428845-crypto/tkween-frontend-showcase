export default function TkweenLogo({
  size = 44,
  showText = true,
  showSubtitle = false,
}: {
  size?: number
  showText?: boolean
  showSubtitle?: boolean
}) {
  if (!showText) {
    return (
      <img
        src="/tkween-logo.jpeg"
        alt="TKWEEN"
        style={{
          width: size * 1.1,
          height: size * 1.1,
          objectFit: 'contain',
          borderRadius: 6,
        }}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src="/tkween-logo.jpeg"
        alt="TKWEEN Logo"
        style={{
          width: size * 2.4,
          height: size * 2.4,
          objectFit: 'contain',
        }}
      />
      {showSubtitle && (
        <div style={{ textAlign: 'center', marginTop: -size * 0.3 }}>
          <p style={{
            fontSize: size * 0.13,
            color: '#94a3b8',
            letterSpacing: '0.06em',
            fontFamily: "'Tajawal', sans-serif",
            margin: 0,
          }}>شركة تكوين للإنتاج الفني</p>
          <p style={{
            fontSize: size * 0.11,
            color: '#64748b',
            letterSpacing: '0.14em',
            margin: 0,
          }}>| For Media Production |</p>
        </div>
      )}
    </div>
  )
}
