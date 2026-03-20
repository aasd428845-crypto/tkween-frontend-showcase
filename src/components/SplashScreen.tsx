import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [phase, setPhase] = useState<'drawing' | 'hold' | 'fadeout' | 'done'>('drawing')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Drawing:  0 → 1800ms  (clip-path circle expands from center)
    // Hold:     1800 → 2300ms
    // Fade out: 2300 → 3100ms
    // Done:     3100ms
    const holdTimer  = setTimeout(() => setPhase('hold'),    1800)
    const fadeTimer  = setTimeout(() => setPhase('fadeout'), 2300)
    const doneTimer  = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 3150)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: phase === 'fadeout' ? 'opacity 0.8s ease-out' : 'none',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      <img
        src="/tkween-logo-transparent.png"
        alt="TKWEEN"
        style={{
          width: 'min(280px, 58vw)',
          animation: 'logoReveal 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      />

      <style>{`
        @keyframes logoReveal {
          0%   { clip-path: circle(0%   at 50% 50%); }
          100% { clip-path: circle(100% at 50% 50%); }
        }
      `}</style>
    </div>
  )
}
