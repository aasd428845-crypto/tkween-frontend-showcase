import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [phase, setPhase] = useState<'show' | 'fadeout' | 'done'>('show')

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fadeout'), 1600)
    const doneTimer = setTimeout(() => setPhase('done'), 2400)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'fadeout' ? 0 : 1,
      transition: 'opacity 0.75s cubic-bezier(0.4,0,0.2,1)',
      pointerEvents: phase === 'fadeout' ? 'none' : 'all',
    }}>
      <img
        src="/tkween-logo-transparent.png"
        alt="TKWEEN"
        style={{
          width: 'min(260px, 55vw)',
          animation: 'splashLogo 1.1s cubic-bezier(0.16,1,0.3,1) forwards',
          mixBlendMode: 'screen',
        }}
      />
      <style>{`
        @keyframes splashLogo {
          0%   { opacity: 0; transform: scale(0.78); }
          55%  { opacity: 1; transform: scale(1.04); }
          80%  { transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
