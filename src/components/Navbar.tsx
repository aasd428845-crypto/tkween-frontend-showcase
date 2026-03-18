import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TkweenLogo from './TkweenLogo'
import { useLanguage } from '@/context/LanguageContext'
import { GRAD, TEAL, CORAL, PINK, BG, BORDER, applyGradText, removeGradText } from '@/lib/brand'

const workLinks = [
  { href: '/conferences', labelAr: 'مؤتمراتنا', labelEn: 'Conferences' },
  { href: '/corporate-ads', labelAr: 'إعلانات الشركات', labelEn: 'Corporate Ads' },
  { href: '/designs', labelAr: 'تصاميمنا', labelEn: 'Designs' },
  { href: '/our-work', labelAr: 'أعمالنا', labelEn: 'Our Work' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const location = useLocation()
  const isAr = lang === 'ar'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '6px 32px',
        background: scrolled ? 'rgba(6,6,6,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : 'none',
        transition: 'all 0.3s',
      }}>
        <Link to="/"><TkweenLogo size={42} showText={false} /></Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
          <div style={{ position: 'relative' }}
               onMouseEnter={() => setWorkOpen(true)}
               onMouseLeave={() => setWorkOpen(false)}>
            <span style={{
              color: '#fff', fontSize: 11, letterSpacing: '0.15em',
              cursor: 'pointer', fontWeight: 300, paddingBottom: 2,
              borderBottom: '1px solid transparent', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => {
              applyGradText(e.currentTarget as HTMLElement)
            }}
            onMouseLeave={e => {
              removeGradText(e.currentTarget as HTMLElement, '#fff')
            }}>
              {isAr ? 'أعمالنا ▾' : 'WORK ▾'}
            </span>
            {workOpen && (
              <div style={{
                position: 'absolute', top: '100%',
                ...(isAr ? { right: 0 } : { left: 0 }),
                background: BG, border: `1px solid ${BORDER}`,
                padding: '8px 0', minWidth: 180, marginTop: 8,
              }}>
                {workLinks.map(l => (
                  <Link key={l.href} to={l.href} style={{
                    display: 'block', padding: '10px 20px',
                    color: '#888', fontSize: 12, letterSpacing: '0.1em', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => applyGradText(e.currentTarget as HTMLElement)}
                  onMouseLeave={e => removeGradText(e.currentTarget as HTMLElement, '#888')}>
                    {isAr ? l.labelAr : l.labelEn.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { label: 'Services', arLabel: 'خدماتنا', href: '/#services' },
            { label: 'About', arLabel: 'من نحن', href: '/#about' },
            { label: 'Clients', arLabel: 'عملاؤنا', href: '/#clients' },
            { label: 'Contact', arLabel: 'تواصل معنا', href: '/contact' },
          ].map(item => (
            <Link key={item.label} to={item.href} style={{
              color: '#fff', fontSize: 11, letterSpacing: '0.15em', fontWeight: 300, transition: 'all 0.2s',
            }}
            onMouseEnter={e => applyGradText(e.currentTarget as HTMLElement)}
            onMouseLeave={e => removeGradText(e.currentTarget as HTMLElement, '#fff')}>
              {isAr ? item.arLabel : item.label.toUpperCase()}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', overflow: 'hidden' }}>
            {(['en', 'ar'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '5px 10px', fontSize: 9, letterSpacing: '0.1em',
                border: lang === l ? `1px solid ${CORAL}` : `1px solid ${BORDER}`,
                cursor: 'pointer',
                background: lang === l ? GRAD : 'transparent',
                color: lang === l ? '#fff' : '#666',
                transition: 'all 0.2s',
              }}>{l.toUpperCase()}</button>
            ))}
          </div>

          <Link to="/quote" style={{
            border: '1px solid transparent',
            background: `linear-gradient(${BG}, ${BG}) padding-box, ${GRAD} border-box`,
            color: TEAL,
            padding: '7px 16px', fontSize: 10, letterSpacing: '0.15em',
            transition: 'all 0.3s', display: 'inline-block',
            boxShadow: '0 0 10px 1px rgba(248,112,96,0.18)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = GRAD
            el.style.color = '#fff'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = `linear-gradient(${BG}, ${BG}) padding-box, ${GRAD} border-box`
            el.style.color = TEAL
          }}>
            {isAr ? 'طلب عرض سعر' : 'GET A QUOTE'}
          </Link>

          <button onClick={() => setMenuOpen(true)} className="hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 22, height: 1, background: '#fff', display: 'block' }}/>
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: BG, zIndex: 200,
          display: 'flex', flexDirection: 'column',
          alignItems: isAr ? 'flex-end' : 'flex-start',
          justifyContent: 'center', padding: '0 48px',
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: 20,
            left: isAr ? 'auto' : 28, right: isAr ? 28 : 'auto',
            background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer',
          }}>×</button>

          <TkweenLogo size={52} showText={false} />
          <div style={{ height: 36 }}/>

          {[
            ...workLinks.map(l => ({ href: l.href, label: isAr ? l.labelAr : l.labelEn })),
            { href: '/contact', label: isAr ? 'تواصل معنا' : 'Contact' },
            { href: '/quote', label: isAr ? 'طلب عرض سعر' : 'Get a Quote' },
          ].map((link, i) => (
            <Link key={i} to={link.href} style={{
              display: 'block', padding: '14px 0',
              color: '#fff', fontSize: 24, fontWeight: 200,
              borderBottom: `1px solid ${BORDER}`,
              width: '100%', textAlign: isAr ? 'right' : 'left', transition: 'all 0.3s',
            }}
            onMouseEnter={e => applyGradText(e.currentTarget as HTMLElement)}
            onMouseLeave={e => removeGradText(e.currentTarget as HTMLElement, '#fff')}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hamburger { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  )
}
