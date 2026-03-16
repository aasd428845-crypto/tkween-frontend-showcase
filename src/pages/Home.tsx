import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
]

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

const PLACEHOLDER_PROJECTS = [
  { id: '1', title_en: 'Saudi Vision Forum 2024', title_ar: 'منتدى رؤية السعودية 2024',
    category: 'CONFERENCES', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', video_url: '' },
  { id: '2', title_en: 'Aramco Annual Summit', title_ar: 'قمة أرامكو السنوية',
    category: 'CONFERENCES', thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', video_url: '' },
  { id: '3', title_en: 'NEOM Brand Campaign', title_ar: 'حملة علامة نيوم',
    category: 'CORPORATE', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', video_url: '' },
  { id: '4', title_en: 'Red Sea Film Series', title_ar: 'سلسلة أفلام البحر الأحمر',
    category: 'BRAND', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', video_url: '' },
]

export default function Home() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [heroIdx, setHeroIdx] = useState(0)
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % HERO_IMAGES.length), 6000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('tkween_settings') || '{}')
      s.visit_count = String((parseInt(s.visit_count || '0')) + 1)
      localStorage.setItem('tkween_settings', JSON.stringify(s))
    } catch {}
  }, [])

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {HERO_IMAGES.map((src, i) => (
          <div key={src} style={{
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)',
        }}/>
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          <span style={{ color: '#FF3B30', fontSize: 10, letterSpacing: '0.4em', marginBottom: 24 }}>
            {isAr ? 'مؤسسة تكوين للإنتاج الإعلامي' : 'TKWEEN FOR MEDIA PRODUCTION'}
          </span>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 200, lineHeight: 1.1, color: '#fff', marginBottom: 8,
          }}>
            {isAr ? 'نُكوّن اللقطة' : 'We Frame the Shot'}
          </h1>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 200, lineHeight: 1.1,
            color: 'rgba(255,255,255,0.6)', marginBottom: 36,
          }}>
            {isAr ? 'لتتحدث الصورة' : 'So the Image Speaks'}
          </h2>
          <Link to="/our-work" style={{
            border: '1px solid #FF3B30', color: '#FF3B30',
            padding: '12px 36px', fontSize: 11, letterSpacing: '0.2em',
            transition: 'all 0.3s', display: 'inline-block',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#FF3B30'
            ;(e.currentTarget as HTMLElement).style.color = '#fff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.color = '#FF3B30'
          }}>
            {isAr ? 'شاهد أعمالنا' : 'VIEW OUR WORK'}
          </Link>
        </div>
        <div style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 10,
        }}>
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} style={{
              width: i === heroIdx ? 28 : 6, height: 2,
              background: i === heroIdx ? '#FF3B30' : 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s',
            }}/>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section style={{ background: '#000', paddingTop: 2 }}>
        <div style={{ padding: '60px 32px 20px' }}>
          <p style={{ color: '#FF3B30', fontSize: 10, letterSpacing: '0.35em', marginBottom: 8 }}>
            {isAr ? '——— أبرز أعمالنا ———' : '——— FEATURED WORK ———'}
          </p>
        </div>
        {PLACEHOLDER_PROJECTS.map(p => (
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
      <section style={{ padding: '80px 32px', background: '#000', borderTop: '1px solid #1c1c1c' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ color: '#FF3B30', fontSize: 10, letterSpacing: '0.35em', marginBottom: 48 }}>
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
              padding: '22px 0', borderBottom: '1px solid #1c1c1c',
              color: '#fff', fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              fontWeight: 200, letterSpacing: '0.04em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF3B30'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#fff'}>
              <span>{isAr ? item.ar : item.en}</span>
              <span style={{ fontSize: 20, opacity: 0.4 }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '80px 32px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ color: '#FF3B30', fontSize: 10, letterSpacing: '0.35em', marginBottom: 52 }}>
            {isAr ? 'خدماتنا' : 'OUR SERVICES'}
          </p>
          {SERVICES.map((s, i) => (
            <div key={s.num} style={{
              display: 'flex', gap: 36, alignItems: 'flex-start',
              padding: '32px 0',
              borderBottom: i < SERVICES.length - 1 ? '1px solid #1c1c1c' : 'none',
            }}>
              <span style={{
                fontSize: 80, fontWeight: 200, lineHeight: 1,
                color: 'rgba(255,59,48,0.06)', minWidth: 80, flexShrink: 0,
              }}>{s.num}</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 300, color: '#fff', marginBottom: 10 }}>
                  {isAr ? s.ar : s.en}
                </h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>
                  {isAr ? s.descAr : s.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '60px 32px', borderTop: '1px solid #1c1c1c', borderBottom: '1px solid #1c1c1c' }}>
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
              <div style={{ fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 200, color: '#FF3B30' }}>
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
      <section id="clients" style={{ padding: '80px 32px', background: '#000' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ color: '#FF3B30', fontSize: 10, letterSpacing: '0.35em', textAlign: 'center', marginBottom: 48 }}>
            {isAr ? 'عملاؤنا' : 'OUR CLIENTS'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {CLIENTS.map((c, i) => (
              <div key={i} style={{
                border: '1px solid #1c1c1c', padding: '20px 12px',
                textAlign: 'center', fontSize: 12, color: '#555',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FF3B30'
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#1c1c1c'
                ;(e.currentTarget as HTMLElement).style.color = '#555'
              }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '40px 32px 28px', borderTop: '1px solid #1c1c1c',
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
              color: '#444', fontSize: 11, letterSpacing: '0.12em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF3B30'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#444'}>
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
