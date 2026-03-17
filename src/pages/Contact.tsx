import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import { Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react'
import { gradText, GRAD, CORAL, TEAL, BG, BORDER } from '@/lib/brand'
import { getSettings } from '@/lib/storage'

export default function Contact() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const settings = getSettings()

  const items = [
    { icon: Phone, label: isAr ? 'الهاتف' : 'Phone', value: settings.phone || '0553120141', href: `tel:${settings.phone || '0553120141'}` },
    { icon: Mail, label: isAr ? 'البريد الإلكتروني' : 'Email', value: settings.email || 'sales@tkweensa.com', href: `mailto:${settings.email || 'sales@tkweensa.com'}` },
    { icon: Phone, label: isAr ? 'واتساب' : 'WhatsApp', value: settings.whatsapp || '966553120141', href: `https://wa.me/${settings.whatsapp || '966553120141'}` },
    { icon: MapPin, label: isAr ? 'العنوان' : 'Address', value: settings.address || (isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'), href: undefined },
  ]

  const social = [
    { icon: Instagram, label: 'Instagram', handle: settings.instagram ? settings.instagram.replace(/.*instagram\.com\//, '@') : '@Tkweensa', href: settings.instagram || 'https://instagram.com/Tkweensa' },
    { icon: Twitter, label: 'Twitter / X', handle: settings.twitter ? settings.twitter.replace(/.*twitter\.com\//, '@').replace(/.*x\.com\//, '@') : '@Tkweensa', href: settings.twitter || 'https://twitter.com/Tkweensa' },
  ]

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ padding: '80px 32px 60px', maxWidth: 800, margin: '0 auto' }}>
          <span style={{ ...gradText, fontSize: 10, letterSpacing: '0.35em' }}>
            {isAr ? 'تكوين' : 'TKWEEN'}
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 200, color: '#fff', marginTop: 12, marginBottom: 60 }}>
            {isAr ? 'تواصل معنا' : 'Contact Us'}
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {items.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '24px 0', borderBottom: `1px solid ${BORDER}`,
              }}>
                <item.icon size={20} style={{ color: CORAL, flexShrink: 0 }} />
                <div>
                  <p style={{ color: '#555', fontSize: 10, letterSpacing: '0.2em', marginBottom: 4 }}>
                    {item.label.toUpperCase()}
                  </p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                       rel="noopener noreferrer"
                       style={{ color: '#fff', fontSize: 18, fontWeight: 300, transition: 'all 0.2s' }}
                       onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, gradText)}
                       onMouseLeave={e => {
                         const el = e.currentTarget as HTMLElement
                         el.style.background = ''
                         el.style.setProperty('-webkit-background-clip', '')
                         el.style.setProperty('-webkit-text-fill-color', '')
                         el.style.backgroundClip = ''
                         el.style.color = '#fff'
                       }}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: '#fff', fontSize: 18, fontWeight: 300 }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 60 }}>
            <p style={{ ...gradText, fontSize: 10, letterSpacing: '0.35em', marginBottom: 32 }}>
              {isAr ? 'تابعنا' : 'FOLLOW US'}
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {social.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                   style={{
                     display: 'flex', alignItems: 'center', gap: 10,
                     padding: '14px 24px', border: `1px solid ${BORDER}`,
                     color: '#888', fontSize: 13, transition: 'all 0.3s',
                   }}
                   onMouseEnter={e => {
                     const el = e.currentTarget as HTMLElement
                     el.style.borderColor = '#FF5F57'
                     el.style.color = '#FF5F57'
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLElement
                     el.style.borderColor = BORDER
                     el.style.color = '#888'
                   }}>
                  <s.icon size={16} />
                  <span>{s.handle}</span>
                </a>
              ))}
            </div>
            {settings.snapchat && (
              <div style={{ marginTop: 16 }}>
                <a href={settings.snapchat} target="_blank" rel="noopener noreferrer"
                   style={{
                     display: 'inline-flex', alignItems: 'center', gap: 10,
                     padding: '14px 24px', border: `1px solid ${BORDER}`,
                     color: '#888', fontSize: 13, transition: 'all 0.3s',
                   }}
                   onMouseEnter={e => {
                     const el = e.currentTarget as HTMLElement
                     el.style.borderColor = '#FFFC00'
                     el.style.color = '#FFFC00'
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLElement
                     el.style.borderColor = BORDER
                     el.style.color = '#888'
                   }}>
                  <span>👻</span>
                  <span>{settings.snapchat.replace(/.*snapchat\.com\/add\//, '@')}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  )
}
