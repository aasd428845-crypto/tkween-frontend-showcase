interface TkweenLogoProps {
  size?: number
  showText?: boolean
  showSubtitle?: boolean
  layout?: 'horizontal' | 'vertical'
}

export default function TkweenLogo({
  size = 44,
  showText = true,
  showSubtitle = false,
  layout = 'horizontal',
}: TkweenLogoProps) {
  const isVertical = layout === 'vertical'
  const iconSize = size
  const arabicSize = size * 0.56
  const tkweenSize = size * 0.19
  const subtitleSize = size * 0.12

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: 'center',
      gap: isVertical ? size * 0.14 : size * 0.2,
      direction: 'ltr',
    }}>
      {/* ─── ICON ──────────────────────────────────── */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          {/* Play-button icon gradient: coral-red → hot-pink (top → bottom) */}
          <linearGradient id="tkIconGrad" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%"   stopColor="#FF5F57" />
            <stop offset="100%" stopColor="#FF3F9D" />
          </linearGradient>
        </defs>

        {/*
          evenodd compound path:
          Outer = right-pointing play button triangle (flat left side)
          Inner = T letterform cutout (crossbar at top + vertical stem)
          The T hole lets the background show through, making the T visible.
        */}
        <path
          fillRule="evenodd"
          d="
            M 12 5
            L 88 50
            L 12 95
            Z

            M 19 15
            L 60 15
            L 60 31
            L 45 31
            L 45 80
            L 31 80
            L 31 31
            L 19 31
            Z
          "
          fill="url(#tkIconGrad)"
        />
      </svg>

      {/* ─── TEXT ──────────────────────────────────── */}
      {showText && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isVertical ? 'center' : 'flex-start',
          lineHeight: 1.05,
          gap: 1,
        }}>
          {/* Arabic "تكوين" — gradient from coral-red (right) to teal (left), RTL */}
          <span style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: arabicSize,
            fontWeight: 900,
            lineHeight: 1,
            direction: 'rtl',
            background: 'linear-gradient(to left, #FF5F57 0%, #FF3F9D 45%, #00B4D8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
          }}>
            تكوين
          </span>

          {/* TKWEEN in teal */}
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: tkweenSize,
            fontWeight: 400,
            letterSpacing: '0.32em',
            color: '#00B4D8',
            display: 'block',
            paddingLeft: 2,
          }}>
            TKWEEN
          </span>

          {/* Subtitle — only shown when requested (large renderings) */}
          {showSubtitle && (
            <>
              <span style={{
                fontFamily: "'Tajawal', sans-serif",
                fontSize: subtitleSize,
                fontWeight: 300,
                color: '#777',
                direction: 'rtl',
                letterSpacing: '0.04em',
                marginTop: size * 0.04,
                display: 'block',
              }}>
                شركة تكوين للإنتاج الفني
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: subtitleSize * 0.88,
                fontWeight: 300,
                color: '#777',
                letterSpacing: '0.1em',
                display: 'block',
              }}>
                For Media Production
              </span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
