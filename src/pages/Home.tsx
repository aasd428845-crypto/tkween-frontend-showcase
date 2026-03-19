import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import { GRAD, GRAD_CINEMATIC, MIXED_GRAD, TEAL, BG, BG_SOFT, BORDER, WARM_GRAD, GRAD_HOVER, gradText, cinematicText, warmGradText, applyGradText, removeGradText, getActiveGrad } from '@/lib/brand'
import TkweenLogo from '@/components/TkweenLogo'
import { getProjects, getHeroImages, getSettings } from '@/lib/storage'

const SERVICES = [
  { num: '01', ar: 'التصوير الفوتوغرافي', en: 'Photography',
    descAr: 'تصوير احترافي للفعاليات والمؤتمرات بجودة سينمائية.',
    descEn: 'Professional photography for events and conferences.' },
  { num: '02', ar: 'فيديو مُثبَّت', en: 'Stabilized Video',
    descAr: 'فيديو سينمائي سلس باستخدام أحدث معدات التثبيت.',
    descEn: 'Smooth cinematic video using advanced stabilization.' },
  { num: '03', ar: 'تصوير جوي', en: 'Aerial Drone',
    descAr: 'لقطات جوية مذهلة بطائرات درون احترافية.',
    descEn: 'Stunning aerial shots with professional drones.' },
  { num: '04', ar: 'تغطية مباشرة', en: 'Live Coverage',
    descAr: 'تغطية فعاليات حية بكاميرات متعددة وبث فوري.',
    descEn: 'Live event coverage with multi-camera broadcast.' },
]

const CLIENTS = [
  'وزارة الدفاع', 'وزارة التعليم', 'مؤسسة الأميرة العنود',
  'وزارة الصحة', 'التنفيذي', 'مركز المصالحة',
  'الموارد البشرية', 'IDWS', 'هيئة الحكومة الرقمية',
  'أصول', 'جمعية سُقيا', 'المعهد الملكي للفنون',
  'وزارة الصناعة', 'الصندوق الصناعي',
  'بنك الرياض', 'مجمع الملك سلمان للغة',
]

export default function Home() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const activeGrad = getActiveGrad(lang)

  const heroImages = getHeroImages()
  const projects = getProjects()
    .filter(p => p.visible)
    .sort((a, b) => a.display_order - b.display_order)

  const [heroIdx, setHeroIdx] = useState(0)
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    if (heroImages.length === 0) return
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroImages.length), 6000)
    return () => clearInterval(t)
  }, [heroImages.length])

  useEffect(() => {
    try {
      const s = getSettings()
      const updated = { ...s, visit_count: String((parseInt(s.visit_count || '0')) + 1) }
      localStorage.setItem('tkween_settings', JSON.stringify(updated))
    } catch {}
  }, [])

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {heroImages.map((src, i) => (
          <div key={src + i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === heroIdx ? 1 : 0,
            transform: i === heroIdx ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 1.4s ease, transform 1.4s ease',
          }}/>
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,6,6,0.15) 0%, rgba(6,6,6,0.88) 100%)',
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 85% 100%, rgba(248,112,96,0.13) 0%, transparent 55%), radial-gradient(ellipse at 15% 100%, rgba(249,115,22,0.09) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          {/* شعار متحرك */}
          <div style={{ marginBottom: 16 }}>
            <TkweenLogo size={52} showText={false} animate={true} />
          </div>

          <h1 className="hero-h1-anim" style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 200, lineHeight: 1.1, marginBottom: 8,
            background: GRAD_CINEMATIC,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {isAr ? 'نُكوّن اللقطة' : 'We Frame the Shot'}
          </h1>
          <h2 className="hero-h2-anim" style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 200, lineHeight: 1.1, marginBottom: 36,
            background: GRAD,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            opacity: 0.7,
          }}>
            {isAr ? 'لتتحدث الصورة' : 'So the Image Speaks'}
          </h2>
          <Link to="/our-work" className="hero-btn-anim" style={{
            background: activeGrad,
            color: '#fff',
            padding: '13px 38px', fontSize: 11, letterSpacing: '0.2em',
            transition: 'all 0.3s', display: 'inline-block',
            borderRadius: 28,
            boxShadow: '0 0 24px rgba(30,64,175,0.35)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = GRAD_HOVER
            el.style.boxShadow = '0 0 36px rgba(14,165,233,0.5)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = activeGrad
            el.style.boxShadow = '0 0 24px rgba(30,64,175,0.35)'
          }}>
            {isAr ? 'شاهد أعمالنا' : 'VIEW OUR WORK'}
          </Link>
        </div>
        {heroImages.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 28, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: 8, zIndex: 10,
          }}>
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{
                width: i === heroIdx ? 28 : 6, height: 2,
                background: i === heroIdx ? GRAD : 'rgba(255,255,255,0.25)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s',
              }}/>
            ))}
          </div>
        )}
      </section>

      {/* FEATURED WORK */}
      <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
      <section style={{ background: BG, paddingTop: 2 }}>
        <div style={{ padding: '60px 32px 20px' }}>
          <p style={{ ...warmGradText, fontSize: 10, letterSpacing: '0.35em', marginBottom: 8 }}>
            {isAr ? '——— أبرز أعمالنا ———' : '——— FEATURED WORK ———'}
          </p>
        </div>
        {projects.map(p => (
          <VideoCard
            key={p.id}
            title={isAr ? p.title_ar : p.title_en}
            category={p.category}
            thumbnail={p.thumbnail}
            videoUrl={p.video_url}
            height="60vw"
            onClick={p.video_url ? () => setModal({ url: p.video_url, title: isAr ? p.title_ar : p.title_en }) : undefined}
          />
        ))}
      </section>

      {/* BROWSE BY SECTION */}
      <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
      <section style={{ padding: '80px 32px', background: BG }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ ...warmGradText, fontSize: 10, letterSpacing: '0.35em', marginBottom: 48 }}>
            {isAr ? 'تصفح حسب القسم' : 'BROWSE BY SECTION'}
          </p>
          {[
            { href: '/conferences', ar: 'مؤتمراتنا', en: 'Conference Coverage' },
            { href: '/corporate-ads', ar: 'إعلانات الشركات', en: 'Corporate Ads' },
            { href: '/designs', ar: 'تصاميمنا', en: 'Our Designs' },
            { href: '/our-work', ar: 'أعمالنا', en: 'Our Work' },
          ].map(item => (
            <Link key={item.href} to={item.href} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '22px 0', borderBottom: `1px solid ${BORDER}`,
              color: '#fff', fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              fontWeight: 200, letterSpacing: '0.04em', transition: 'all 0.3s',
            }}
            onMouseEnter={e => applyGradText(e.currentTarget as HTMLElement)}
            onMouseLeave={e => removeGradText(e.currentTarget as HTMLElement, '#fff')}>
              <span>{isAr ? item.ar : item.en}</span>
              <span style={{ fontSize: 20, opacity: 0.4 }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
      <section id="services" style={{ padding: '80px 32px', background: BG_SOFT }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ ...warmGradText, fontSize: 10, letterSpacing: '0.35em', marginBottom: 52 }}>
            {isAr ? 'خدماتنا' : 'OUR SERVICES'}
          </p>
          {SERVICES.map((s, i) => (
            <div key={s.num} style={{
              display: 'flex', gap: 36, alignItems: 'flex-start',
              padding: '32px 0',
              borderBottom: i < SERVICES.length - 1 ? `1px solid ${BORDER}` : 'none',
            }}>
              <span style={{
                fontSize: 80, fontWeight: 200, lineHeight: 1,
                background: GRAD, WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: 0.15, minWidth: 80, flexShrink: 0,
              }}>{s.num}</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 300, color: '#fff', marginBottom: 10 }}>
                  {isAr ? s.ar : s.en}
                </h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>
                  {isAr ? s.descAr : s.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
      <section style={{ padding: '60px 32px' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 20, textAlign: 'center',
        }}>
          {[
            { n: '+150', ar: 'مشروع منجز', en: 'Projects' },
            { n: '+8', ar: 'سنوات خبرة', en: 'Years' },
            { n: '+50', ar: 'عميل راضٍ', en: 'Clients' },
            { n: '16', ar: 'مؤسسة', en: 'Organizations' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{
                fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 200,
                background: GRAD, WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {s.n}
              </div>
              <p style={{ color: '#555', fontSize: 11, letterSpacing: '0.1em', marginTop: 8 }}>
                {isAr ? s.ar : s.en.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
      <section id="clients" style={{ padding: '80px 32px', background: BG }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ ...warmGradText, fontSize: 10, letterSpacing: '0.35em', textAlign: 'center', marginBottom: 48 }}>
            {isAr ? 'عملاؤنا' : 'OUR CLIENTS'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {CLIENTS.map((c, i) => (
              <div key={i} style={{
                padding: '22px 16px',
                textAlign: 'center', fontSize: 13, color: '#444',
                letterSpacing: '0.03em',
                transition: 'color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444' }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ height: 1, background: WARM_GRAD, opacity: 0.4 }} />
      <footer style={{
        padding: '40px 32px 28px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 20,
      }}>
        <p style={{ color: '#333', fontSize: 11 }}>
          © 2025 تكوين للإنتاج الإعلامي. جميع الحقوق محفوظة.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: isAr ? 'تواصل معنا' : 'Contact', href: '/contact' },
            { label: isAr ? 'طلب عرض سعر' : 'Get a Quote', href: '/quote' },
          ].map(l => (
            <Link key={l.href} to={l.href} style={{
              color: '#444', fontSize: 11, letterSpacing: '0.12em', transition: 'all 0.3s',
            }}
            onMouseEnter={e => applyGradText(e.currentTarget as HTMLElement)}
            onMouseLeave={e => removeGradText(e.currentTarget as HTMLElement, '#444')}>
              {l.label}
            </Link>
          ))}
        </div>
      </footer>

      {modal && <VideoModal url={modal.url} title={modal.title} onClose={() => setModal(null)}/>}
      <WhatsAppButton />
    </div>
  )
}
