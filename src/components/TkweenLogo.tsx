export default function TkweenLogo() {
  const gradientStart = '#0f5b99'
  const gradientEnd = '#2dd4bf'
  const pinkAccent = '#f43f5e'

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg width="70" height="60" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
          <mask id="mask-t">
            <rect width="100" height="100" fill="white" />
            <rect x="30" y="20" width="35" height="11" rx="2" fill="black" />
            <rect x="42" y="20" width="11" height="38" rx="2" fill="black" />
          </mask>
        </defs>
        <path
          d="M10,5 L95,42.5 L10,80 Z"
          fill="url(#logoGradient)"
          mask="url(#mask-t)"
        />
      </svg>

      <div className="flex flex-col items-center mt-[-3px]">
        <div className="flex items-center gap-[2px]">
          <svg width="9" height="9" viewBox="0 0 10 10">
            <path d="M1,1 L9,5 L1,9 Z" fill={pinkAccent} />
          </svg>
          <span className="text-3xl font-bold font-['Tajawal'] text-white tracking-tight">تكوين</span>
        </div>

        <span className="text-[10px] font-bold text-white tracking-[0.5em] mt-1 mb-2">
          TKWEEN
        </span>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#2dd4bf] to-transparent mb-1" />

        <span className="text-[7px] font-['Tajawal'] text-gray-300 font-light tracking-widest mb-[1px]">
          شركة تكوين للإنتاج الفني
        </span>
        <span className="text-[6px] text-gray-400 tracking-[0.2em] uppercase">
          For Media Production
        </span>
      </div>
    </div>
  )
}
