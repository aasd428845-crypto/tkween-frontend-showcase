interface TkweenLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

const TkweenLogo = ({ size = 48, showText = true, className = '' }: TkweenLogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main play triangle */}
        <path d="M8 4L76 40L8 76V4Z" fill="#0a1e1a" stroke="#2dd4bf" strokeWidth="1.5" />
        {/* ك bracket cutout - left bar */}
        <rect x="18" y="20" width="4" height="40" rx="2" fill="#ffffff" />
        {/* ك top bar */}
        <rect x="18" y="20" width="24" height="4" rx="2" fill="#ffffff" />
        {/* ك bottom bar */}
        <rect x="18" y="56" width="24" height="4" rx="2" fill="#ffffff" />
        {/* ك middle curve */}
        <path d="M22 38C30 38 36 34 40 28" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Teal accent dot */}
        <circle cx="52" cy="40" r="5" fill="#2dd4bf" />
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 700, fontSize: size * 0.4, color: '#ffffff', lineHeight: 1.1 }}>
            تكوين
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: size * 0.22, color: '#94a3b8', letterSpacing: '0.2em', lineHeight: 1 }}>
            TKWEEN
          </span>
        </div>
      )}
    </div>
  );
};

export default TkweenLogo;
