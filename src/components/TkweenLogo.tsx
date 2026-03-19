export default function TkweenLogo({
  size = 44,
  showText = true,
  showSubtitle = false,
  animate = false,
}: {
  size?: number
  showText?: boolean
  showSubtitle?: boolean
  animate?: boolean
}) {
  const animClass = animate ? 'logo-entrance' : ''

  if (!showText) {
    return (
      <img
        src="/tkween-logo-transparent.png"
        alt="TKWEEN"
        className={animClass}
        style={{
          width: size * 1.4,
          height: size * 1.4,
          objectFit: 'contain',
          display: 'block',
          mixBlendMode: 'screen',
        }}
      />
    )
  }

  return (
    <div className={animClass} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src="/tkween-logo-transparent.png"
        alt="TKWEEN Logo"
        style={{
          width: size * 2.8,
          height: size * 2.8,
          objectFit: 'contain',
          display: 'block',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
