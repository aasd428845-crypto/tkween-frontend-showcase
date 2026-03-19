import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import TkweenLogo from '@/components/TkweenLogo';
import VideoModal from '@/components/VideoModal';
import VideoSections from '@/components/VideoSections';
import { fetchSettings, fetchProjects, addRequest, incrementVisitCount } from '@/lib/supabase-data';
import type { TkweenSettings, TkweenProject } from '@/lib/supabase-data';
import { Menu, X, Play, Camera, Video, Plane, Radio, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const clients = [
  'Saudi Aramco', 'NEOM', 'Saudi Tourism', 'Riyadh Season',
  'STC', 'SABIC', 'Red Sea Film', 'Vision 2030',
  'Ministry of Culture', 'General Entertainment', 'Diriyah Gate', 'AlUla',
  'Saudi Airlines', 'Al Rajhi Bank', 'Mobily', 'Zain KSA',
];

const DEFAULT_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
];

const PublicSite = () => {
  const { lang, setLang, t } = useLanguage();
  const [settings, setSettings] = useState<TkweenSettings | null>(null);
  const [projects, setProjects] = useState<TkweenProject[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>(DEFAULT_HERO_IMAGES);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', organization: '', service_type: '', event_date: '', location: '', details: '', phone: '', email: '' });

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    incrementVisitCount();
    (async () => {
      const [s, p] = await Promise.all([fetchSettings(), fetchProjects()]);
      setSettings(s);
      setProjects(p.filter(x => x.visible).sort((a, b) => a.display_order - b.display_order));
      try { setHeroImages(JSON.parse(s.hero_images)); } catch {}
    })();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRequest(formData);
    setFormSent(true);
    setFormData({ full_name: '', organization: '', service_type: '', event_date: '', location: '', details: '', phone: '', email: '' });
    setTimeout(() => setFormSent(false), 4000);
  };

  const navLinks = [
    { key: 'nav_home', href: '#home' }, { key: 'nav_work', href: '#work' },
    { key: 'nav_services', href: '#services' }, { key: 'nav_about', href: '#about' },
    { key: 'nav_clients', href: '#clients' }, { key: 'nav_contact', href: '#contact' },
  ];

  const services = [
    { num: '01', icon: Camera, titleKey: 'svc1_title', descKey: 'svc1_desc' },
    { num: '02', icon: Video, titleKey: 'svc2_title', descKey: 'svc2_desc' },
    { num: '03', icon: Plane, titleKey: 'svc3_title', descKey: 'svc3_desc' },
    { num: '04', icon: Radio, titleKey: 'svc4_title', descKey: 'svc4_desc' },
  ];

  const stats = [
    { value: 150, suffix: '+', key: 'stats_projects' },
    { value: 8, suffix: '+', key: 'stats_years' },
    { value: 50, suffix: '+', key: 'stats_clients' },
    { value: 16, suffix: '', key: 'stats_orgs' },
  ];

  const values = ['val1', 'val2', 'val3', 'val4', 'val5'];

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1a1a1a' : 'none',
        transition: 'all 0.3s',
      }}>
        <div className="flex items-center justify-between px-4 lg:px-8" style={{ maxWidth: 1400, margin: '0 auto', height: 72 }}>
          <TkweenLogo size={40} showText={true} />
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.key} href={l.href} style={{ color: '#999', fontSize: 13, textDecoration: 'none', transition: 'color 0.3s', fontWeight: 300, letterSpacing: '0.05em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF4500')} onMouseLeave={e => (e.currentTarget.style.color = '#999')}>
                {t(l.key)}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              style={{ padding: '6px 16px', border: '1px solid #333', borderRadius: 4, background: 'transparent', color: '#999', fontSize: 12, cursor: 'pointer', letterSpacing: '0.1em' }}>
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <a href="#contact" style={{ padding: '8px 20px', background: '#FF4500', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.1em' }}>
              {t('nav_quote')}
            </a>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden px-4 pb-4" style={{ background: 'rgba(0,0,0,0.98)' }}>
            {navLinks.map(l => (
              <a key={l.key} href={l.href} onClick={() => setMenuOpen(false)} className="block py-2" style={{ color: '#999', textDecoration: 'none', fontSize: 15 }}>{t(l.key)}</a>
            ))}
            <div className="flex gap-3 mt-3">
              <button onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMenuOpen(false); }}
                style={{ padding: '6px 16px', border: '1px solid #333', borderRadius: 4, background: 'transparent', color: '#999', fontSize: 12, cursor: 'pointer' }}>
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <a href="#contact" onClick={() => setMenuOpen(false)} style={{ padding: '8px 20px', background: '#FF4500', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 500, textDecoration: 'none' }}>
                {t('nav_quote')}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {heroImages.map((img, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: heroIdx === i ? 1 : 0, transition: 'opacity 1.5s ease-in-out',
          }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))' }} />
        <div className="flex flex-col items-center justify-center text-center px-4" style={{ position: 'relative', zIndex: 2, height: '100%' }}>
          <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.4em', fontWeight: 400, marginBottom: 20 }}>{t('hero_tag')}</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 200, lineHeight: 1.1, marginBottom: 8 }}>{t('hero_main')}</h1>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 200, color: '#FF4500', marginBottom: 24 }}>{t('hero_sub')}</h2>
          <p style={{ color: '#999', fontSize: 15, maxWidth: 550, marginBottom: 40, fontWeight: 300, lineHeight: 1.8 }}>{t('hero_desc')}</p>
          <a href="#work" style={{ padding: '14px 40px', background: '#FF4500', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.15em', transition: 'opacity 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {t('hero_cta')}
          </a>
          <div className="flex gap-2 mt-10">
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{ width: heroIdx === i ? 32 : 8, height: 3, borderRadius: 2, background: heroIdx === i ? '#FF4500' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div style={{ padding: '80px 0 20px', textAlign: 'center' }}>
          <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em' }}>SELECTED WORK</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, marginTop: 12 }}>{t('work_title')}</h2>
        </div>
        {projects.map(p => (
          <div key={p.id} className="work-card" onClick={() => p.video_url && setVideoModal(p.video_url)}
            style={{
              width: '100%', height: '56vw', minHeight: 400, maxHeight: 700,
              backgroundImage: `url(${p.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center',
              position: 'relative', cursor: p.video_url ? 'pointer' : 'default',
              borderBottom: '1px solid #1a1a1a', overflow: 'hidden',
            }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: 'clamp(24px, 4vw, 60px)',
            }}>
              <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.15em' }}>{p.category}</span>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, marginTop: 8 }}>
                {lang === 'en' ? p.title_en : p.title_ar}
              </h3>
            </div>
            {p.video_url && (
              <div className="play-icon" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,69,0,0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.3s',
              }}>
                <Play size={28} style={{ color: '#fff', marginLeft: 3 }} />
              </div>
            )}
          </div>
        ))}
      </section>

      {/* VIDEO SECTIONS from database */}
      <VideoSections />

      {/* VIDEO MODAL */}
      {videoModal && <VideoModal url={videoModal} title="" onClose={() => setVideoModal(null)} />}

      {/* SERVICES */}
      <section id="services" style={{ background: '#0a0a0a', paddingTop: 100, paddingBottom: 80 }}>
        <div className="px-4 lg:px-8" style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="text-center mb-16">
            <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em' }}>WHAT WE DO</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, marginTop: 12 }}>{t('services_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(svc => (
              <div key={svc.num} className="flex gap-6 p-6" style={{ border: '1px solid #1a1a1a', borderRadius: 8, transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF4500')} onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}>
                <span style={{ fontSize: 64, fontWeight: 200, color: 'rgba(255,69,0,0.15)', lineHeight: 1 }}>{svc.num}</span>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <svc.icon size={22} style={{ color: '#FF4500' }} />
                    <h3 style={{ fontSize: 20, fontWeight: 400 }}>{t(svc.titleKey)}</h3>
                  </div>
                  <p style={{ color: '#999', fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>{t(svc.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ background: '#000', paddingTop: 80, paddingBottom: 80, borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-8" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 200, color: '#FF4500', opacity: statsVisible ? 1 : 0, transform: statsVisible ? 'scale(1)' : 'scale(0.5)', transition: `all 0.6s ease-out ${i * 0.15}s` }}>
                {statsVisible ? s.value : 0}{s.suffix}
              </div>
              <p style={{ color: '#999', fontSize: 14, marginTop: 8 }}>{t(s.key)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-4 lg:px-8" style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 100, paddingBottom: 80 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80" alt="About TKWEEN" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <div>
            <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em' }}>WHO WE ARE</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, marginTop: 12, marginBottom: 24 }}>{t('about_title')}</h2>
            <p style={{ color: '#999', fontSize: 15, lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>{t('about_p1')}</p>
            <p style={{ color: '#999', fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>{t('about_p2')}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-16">
          {values.map(v => (
            <div key={v} className="text-center p-6" style={{ border: '1px solid #1a1a1a', borderRadius: 6 }}>
              <span style={{ color: '#FF4500', fontSize: 15, fontWeight: 400 }}>{t(v)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" style={{ background: '#0a0a0a', paddingTop: 80, paddingBottom: 80 }}>
        <div className="px-4 lg:px-8" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="text-center mb-12">
            <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em' }}>TRUSTED BY</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, marginTop: 12 }}>{t('clients_title')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clients.map(c => (
              <div key={c} className="text-center p-5" style={{ border: '1px solid #1a1a1a', borderRadius: 6, transition: 'border-color 0.3s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF4500')} onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}>
                <span style={{ color: '#999', fontSize: 14, fontWeight: 300 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-4 lg:px-8" style={{ maxWidth: 800, margin: '0 auto', paddingTop: 100, paddingBottom: 80 }}>
        <div className="text-center mb-12">
          <span style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em' }}>GET IN TOUCH</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, marginTop: 12 }}>{t('contact_title')}</h2>
          <p style={{ color: '#999', marginTop: 8 }}>{t('contact_subtitle')}</p>
        </div>
        {formSent && <div className="text-center p-4 mb-6" style={{ background: 'rgba(255,69,0,0.1)', border: '1px solid #FF4500', borderRadius: 6, color: '#FF4500' }}>{t('form_success')}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'full_name', label: 'form_name', type: 'text' },
            { key: 'organization', label: 'form_org', type: 'text' },
            { key: 'phone', label: 'form_phone', type: 'tel' },
            { key: 'email', label: 'form_email', type: 'email' },
            { key: 'event_date', label: 'form_date', type: 'date' },
            { key: 'location', label: 'form_location', type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ color: '#999', fontSize: 11, display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>{t(f.label)}</label>
              <input type={f.type} required={f.key === 'full_name' || f.key === 'phone'}
                value={(formData as any)[f.key]} onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none' }}
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <label style={{ color: '#999', fontSize: 11, display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>{t('form_service')}</label>
            <select value={formData.service_type} onChange={e => setFormData({ ...formData, service_type: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none' }}>
              <option value="">{t('form_service')}</option>
              {['form_svc_photo','form_svc_video','form_svc_aerial','form_svc_live','form_svc_other'].map(s => (
                <option key={s} value={s}>{t(s)}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label style={{ color: '#999', fontSize: 11, display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>{t('form_details')}</label>
            <textarea rows={4} value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical' }}
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" style={{ width: '100%', padding: 14, background: '#FF4500', color: '#fff', borderRadius: 4, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}>
              {t('nav_quote')}
            </button>
          </div>
        </form>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '40px 0', textAlign: 'center' }}>
        <TkweenLogo size={32} showText={true} />
        <div className="flex justify-center gap-6 mt-6">
          {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#666' }}><Instagram size={18} /></a>}
          {settings?.twitter && <a href={settings.twitter} target="_blank" rel="noopener noreferrer" style={{ color: '#666' }}><Twitter size={18} /></a>}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {settings?.phone && <a href={`tel:${settings.phone}`} style={{ color: '#666', fontSize: 13 }}><Phone size={14} className="inline mr-1" />{settings.phone}</a>}
          {settings?.email && <a href={`mailto:${settings.email}`} style={{ color: '#666', fontSize: 13 }}><Mail size={14} className="inline mr-1" />{settings.email}</a>}
        </div>
        <p style={{ color: '#333', fontSize: 12, marginTop: 24 }}>© {new Date().getFullYear()} TKWEEN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicSite;
