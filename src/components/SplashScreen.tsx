import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Total animation duration: 2.5s → then unmount and enable scrolling
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ''
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (done) return null

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
        pointerEvents: 'all',
      }}
    >
      <img
        src="/tkween-logo-transparent.png"
        alt="TKWEEN"
        style={{
          width: 'min(280px, 58vw)',
          animation: 'introLogo 2.5s cubic-bezier(.17,.67,.83,.67) forwards',
        }}
      />

      <style>{`
        @keyframes introLogo {
          0%   { opacity: 0; transform: scale(0.8); }
          50%  { opacity: 1; transform: scale(1.0); }
          80%  { opacity: 1; transform: scale(1.0); }
          100% { opacity: 0; transform: scale(1.0); }
        }
      `}</style>
    </div>
  )
}
