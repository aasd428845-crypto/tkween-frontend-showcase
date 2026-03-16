interface TkweenLogoProps {
  size?: number
  color?: string
  accentColor?: string
  textColor?: string
}

export default function TkweenLogo({
  size = 65,
  color = '#2dd4bf',
  accentColor = '#f43f5e',
  textColor = '#ffffff',
}: TkweenLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 100 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg mb-2"
      >
        <path d="M10,5 L90,42.5 L10,80 Z" fill={color} />
        <rect x="25" y="24" width="30" height="11" rx="2" fill="#0a1e1a" />
        <rect x="35" y="24" width="10" height="36" rx="2" fill="#0a1e1a" />
      </svg>

      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-1.5 justify-center mb-1">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
            <path d="M1,1 L9,5 L1,9 Z" fill={accentColor} />
          </svg>
          <span
            style={{ color: textColor }}
            className="text-3xl font-bold font-['Tajawal'] leading-none tracking-wide"
          >
            تكوين
          </span>
        </div>

        <span
          style={{ color: textColor }}
          className="text-[0.7rem] font-bold tracking-[0.45em] ml-1.5 leading-none mb-2"
        >
          TKWEEN
        </span>

        <div
          className="w-full h-[1px] mb-1.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, transparent)`
          }}
        />

        <span className="text-[0.5rem] font-['Tajawal'] text-gray-300 tracking-wider mb-0.5">
          شركة تكوين للإنتاج الفني
        </span>
        <span className="text-[0.45rem] text-gray-400 tracking-[0.15em] uppercase">
          For Media Production
        </span>
      </div>
    </div>
  )
}
