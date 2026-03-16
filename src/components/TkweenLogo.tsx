interface TkweenLogoProps {
  size?: number;
  dark?: boolean;
  showText?: boolean;
  className?: string;
}

const TkweenLogo = ({ size = 44, dark = false, showText = true, className = '' }: TkweenLogoProps) => {
  const gradientId = `redGradient-${size}`;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="100%" stopColor="#8B0000" />
          </linearGradient>
        </defs>
        {/* Outer play triangle with red gradient */}
        <path d="M8 4L76 40L8 76V4Z" fill={`url(#${gradientId})`} />
        {/* White cutout forming ك bracket shape */}
        <rect x="18" y="20" width="4" height="40" rx="2" fill="#ffffff" />
        <rect x="18" y="20" width="24" height="4" rx="2" fill="#ffffff" />
        <rect x="18" y="56" width="24" height="4" rx="2" fill="#ffffff" />
        <path d="M22 38C30 38 36 34 40 28" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Accent dot with lighter red */}
        <circle cx="52" cy="40" r="5" fill="#FF4500" />
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
