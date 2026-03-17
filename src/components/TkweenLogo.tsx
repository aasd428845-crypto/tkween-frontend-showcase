export default function TkweenLogo({
  size = 44,
  showText = true,
  showSubtitle = false,
}: {
  size?: number
  showText?: boolean
  showSubtitle?: boolean
}) {
  const imgStyle: React.CSSProperties = {
    objectFit: 'contain',
    /* mix-blend-mode: screen يجعل الأسود شفافاً تماماً
       ويدمج الشعار مع أي خلفية داكنة بشكل نظيف */
    mixBlendMode: 'screen',
  }

  if (!showText) {
    return (
      <img
        src="/tkween-logo.jpeg"
        alt="TKWEEN"
        style={{ ...imgStyle, width: size * 1.3, height: size * 1.3 }}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src="/tkween-logo.jpeg"
        alt="TKWEEN Logo"
        style={{ ...imgStyle, width: size * 2.6, height: size * 2.6 }}
      />
      {showSubtitle && (
        <div style={{ textAlign: 'center', marginTop: -size * 0.25 }}>
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
