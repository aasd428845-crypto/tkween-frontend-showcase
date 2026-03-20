import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [phase, setPhase] = useState<'intro' | 'hold' | 'fadeout' | 'done'>('intro')

  useEffect(() => {
    // Logo animates in: 0 → 900ms
    // Hold fully visible: 900ms → 1800ms
    // Overlay fades out: 1800ms → 2600ms
    // Done (unmount): 2600ms
    const holdTimer    = setTimeout(() => setPhase('hold'),    900)
    const fadeTimer    = setTimeout(() => setPhase('fadeout'), 1800)
    const doneTimer    = setTimeout(() => setPhase('done'),    2700)
    return () => {
      clearTimeout(holdTimer)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(6,6,6,0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: phase === 'fadeout' ? 'opacity 0.85s ease-out' : 'none',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      <img
        src="/tkween-logo-transparent.png"
        alt="TKWEEN"
        style={{
          width: 'min(280px, 58vw)',
          animation: 'splashLogoIn 0.9s cubic-bezier(0.0, 0.0, 0.2, 1.0) forwards',
        }}
      />

      <style>{`
        @keyframes splashLogoIn {
          0%   { opacity: 0; transform: scale(0.82); }
          100% { opacity: 1; transform: scale(1);    }
        }
      `}</style>
    </div>
  )
}
