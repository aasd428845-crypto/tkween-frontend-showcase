import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'en' | 'ar';

const translations = {
  en: {
    nav_home: 'Home',
    nav_portfolio: 'Portfolio',
    nav_about: 'About',
    nav_services: 'Services',
    nav_contact: 'Contact',
    hero_tagline: 'Crafting Visual Stories That Move Audiences',
    hero_subtitle: 'Professional media production for conferences, corporate campaigns, and artistic projects.',
    hero_cta: 'View Our Work',
    portfolio_title: 'Our Portfolio',
    portfolio_subtitle: 'A selection of our finest productions across conferences, corporate films, and creative campaigns.',
    about_title: 'About TKWEEN',
    about_description: 'TKWEEN is a leading media production company specializing in high-quality video production, conference coverage, corporate advertising, and artistic content creation. With a team of seasoned professionals, we bring stories to life through cinematic excellence.',
    services_title: 'Our Services',
    service_conferences: 'Conference Coverage',
    service_conferences_desc: 'Full-scale event filming with multi-camera setups, live streaming, and post-production editing.',
    service_corporate: 'Corporate Advertising',
    service_corporate_desc: 'Brand storytelling through compelling commercial content that resonates with your audience.',
    service_artistic: 'Artistic Production',
    service_artistic_desc: 'Creative filmmaking, music videos, documentaries, and short films with cinematic quality.',
    service_post: 'Post-Production',
    service_post_desc: 'Color grading, motion graphics, sound design, and VFX to elevate your content.',
    footer_rights: '© 2025 TKWEEN Media Production. All rights reserved.',
    footer_tagline: 'For Media Production',
    contact_email: 'info@tkween.com',
    contact_phone: '+966 50 000 0000',
    watch: 'Watch',
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_portfolio: 'أعمالنا',
    nav_about: 'من نحن',
    nav_services: 'خدماتنا',
    nav_contact: 'تواصل',
    hero_tagline: 'نصنع قصصاً بصرية تحرّك الجماهير',
    hero_subtitle: 'إنتاج إعلامي احترافي للمؤتمرات والحملات المؤسسية والمشاريع الفنية.',
    hero_cta: 'شاهد أعمالنا',
    portfolio_title: 'أعمالنا',
    portfolio_subtitle: 'مجموعة مختارة من أفضل إنتاجاتنا في المؤتمرات والأفلام المؤسسية والحملات الإبداعية.',
    about_title: 'عن تكوين',
    about_description: 'تكوين هي شركة رائدة في الإنتاج الإعلامي متخصصة في إنتاج الفيديو عالي الجودة، تغطية المؤتمرات، الإعلانات المؤسسية، وإنشاء المحتوى الفني. بفريق من المحترفين المتمرسين، نحيي القصص من خلال التميز السينمائي.',
    services_title: 'خدماتنا',
    service_conferences: 'تغطية المؤتمرات',
    service_conferences_desc: 'تصوير شامل للفعاليات بكاميرات متعددة وبث مباشر ومونتاج احترافي.',
    service_corporate: 'الإعلانات المؤسسية',
    service_corporate_desc: 'سرد قصص العلامات التجارية من خلال محتوى إعلاني مؤثر يتواصل مع جمهورك.',
    service_artistic: 'الإنتاج الفني',
    service_artistic_desc: 'صناعة أفلام إبداعية وفيديوهات موسيقية ووثائقيات وأفلام قصيرة بجودة سينمائية.',
    service_post: 'ما بعد الإنتاج',
    service_post_desc: 'تصحيح ألوان، رسوم متحركة، تصميم صوتي، ومؤثرات بصرية لرفع مستوى المحتوى.',
    footer_rights: '© 2025 تكوين للإنتاج الإعلامي. جميع الحقوق محفوظة.',
    footer_tagline: 'للإنتاج الإعلامي',
    contact_email: 'info@tkween.com',
    contact_phone: '+966 50 000 0000',
    watch: 'شاهد',
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('tkween-lang');
    return (stored === 'ar' || stored === 'en') ? stored : 'en';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('tkween-lang', newLang);
  };

  const t = (key: string): string => {
    return (translations[lang] as Record<string, string>)[key] || key;
  };

  const isRTL = lang === 'ar';

  useEffect(() => {
    document.body.classList.toggle('lang-ar', isRTL);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
