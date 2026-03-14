interface TkweenLogoProps {
  size?: number;
  color?: string;
  showText?: boolean;
  textColor?: string;
}

const TkweenLogo = ({ size = 48, color = 'hsl(347, 77%, 50%)', showText = true, textColor = 'white' }: TkweenLogoProps) => {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="32" cy="32" r="30" fill={color} opacity="0.15" />
        
        {/* Play triangle */}
        <path
          d="M24 16L52 32L24 48V16Z"
          fill={color}
        />
        
        {/* T-shape cutout */}
        <rect x="12" y="18" width="24" height="6" fill="hsl(0, 0%, 4%)" rx="1" />
        <rect x="20" y="18" width="8" height="28" fill="hsl(0, 0%, 4%)" rx="1" />
        
        {/* T letter overlay */}
        <rect x="13" y="19" width="22" height="4" fill={color} rx="1" />
        <rect x="21" y="19" width="6" height="26" fill={color} rx="1" />
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span
            className="text-xl font-bold tracking-[0.2em] leading-none"
            style={{ color: textColor }}
          >
            TKWEEN
          </span>
          <span
            className="text-[0.5rem] tracking-[0.15em] uppercase opacity-60"
            style={{ color: textColor }}
          >
            Media Production
          </span>
        </div>
      )}
    </div>
  );
};

export default TkweenLogo;
