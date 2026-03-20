import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'fadeout' | 'done'>('in')

  useEffect(() => {
    // Logo animates in:   0 → 950ms
    // Hold fully visible: 950ms → 1700ms
    // Overlay fades out:  1700ms → 2600ms  ← site is revealed here
    // Unmount:            2600ms
    const holdTimer  = setTimeout(() => setPhase('hold'),    950)
    const fadeTimer  = setTimeout(() => setPhase('fadeout'), 1700)
    const doneTimer  = setTimeout(() => setPhase('done'),    2650)
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
        background: '#060606',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: phase === 'fadeout' ? 'opacity 0.9s ease-out' : 'none',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      <img
        src="/tkween-logo-transparent.png"
        alt="TKWEEN"
        style={{
          width: 'min(280px, 58vw)',
          animation: 'splashLogoIn 0.95s cubic-bezier(0.0, 0.0, 0.2, 1.0) forwards',
        }}
      />

      <style>{`
        @keyframes splashLogoIn {
          0%   { opacity: 0; transform: scale(0.82); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
