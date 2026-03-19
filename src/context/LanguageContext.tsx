import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'en' | 'ar';

const translations: Record<string, Record<string, string>> = {
  en: {
    nav_home: 'Home', nav_work: 'Our Work', nav_services: 'Services', nav_about: 'About',
    nav_clients: 'Clients', nav_contact: 'Contact', nav_quote: 'Get a Quote',
    hero_tag: 'TKWEEN MEDIA PRODUCTION', hero_main: 'We Create Visual Stories',
    hero_sub: 'That Move Audiences', hero_desc: 'Professional media production for conferences, corporate campaigns, and creative projects across Saudi Arabia.',
    hero_cta: 'Explore Our Work',
    work_title: 'Our Work', work_subtitle: 'A showcase of our finest productions',
    filter_all: 'All', filter_conferences: 'Conferences', filter_corporate: 'Corporate',
    filter_brand: 'Brand', filter_events: 'Events',
    services_title: 'Our Services', services_subtitle: 'End-to-end media production solutions',
    svc1_title: 'Photography', svc1_desc: 'Professional photography for events, products, and corporate needs with cinematic quality.',
    svc2_title: 'Stabilized Video', svc2_desc: 'Smooth, cinematic video production using industry-leading stabilization equipment.',
    svc3_title: 'Aerial Drone', svc3_desc: 'Breathtaking aerial footage captured with professional-grade drones and licensed pilots.',
    svc4_title: 'Live Coverage', svc4_desc: 'Multi-camera live event coverage with real-time switching and streaming capabilities.',
    stats_projects: 'Projects Completed', stats_years: 'Years Experience', stats_clients: 'Happy Clients', stats_orgs: 'Organizations',
    about_title: 'About TKWEEN', about_p1: 'TKWEEN is a leading Saudi media production company specializing in high-quality video production, conference coverage, corporate advertising, and artistic content creation.',
    about_p2: 'With a team of seasoned professionals and state-of-the-art equipment, we bring stories to life through cinematic excellence. Our commitment to quality and creativity has made us a trusted partner for major organizations across the Kingdom.',
    val1: 'Creativity', val2: 'Quality', val3: 'Innovation', val4: 'Reliability', val5: 'Excellence',
    clients_title: 'Our Clients', clients_subtitle: 'Trusted by leading organizations',
    contact_title: 'Get in Touch', contact_subtitle: 'Tell us about your project and we\'ll get back to you within 24 hours.',
    form_name: 'Full Name', form_org: 'Organization', form_service: 'Service Type',
    form_date: 'Event Date', form_location: 'Location', form_details: 'Project Details',
    form_phone: 'Phone', form_email: 'Email', form_submit: 'Send Request',
    form_success: 'Your request has been submitted successfully!',
    form_svc_photo: 'Photography', form_svc_video: 'Video Production', form_svc_aerial: 'Aerial Drone',
    form_svc_live: 'Live Coverage', form_svc_other: 'Other',
    footer_desc: 'Professional media production company based in Riyadh, Saudi Arabia.',
    footer_quick: 'Quick Links', footer_follow: 'Follow Us', footer_rights: '© 2025 TKWEEN Media Production. All rights reserved.',
    admin_login: 'Admin Login', admin_email: 'Email', admin_password: 'Password', admin_enter: 'Login',
    admin_wrong: 'Incorrect password', admin_overview: 'Overview', admin_projects: 'Projects & Videos',
    admin_requests: 'Client Requests', admin_settings: 'Site Settings', admin_videos: 'Video Sections', admin_logout: 'Logout',
    admin_total_projects: 'Total Projects', admin_total_requests: 'Total Requests',
    admin_new_requests: 'New Requests', admin_visits: 'Visit Count',
    admin_recent: 'Recent Requests', admin_add: 'Add Project', admin_edit: 'Edit',
    admin_delete: 'Delete', admin_save: 'Save', admin_cancel: 'Cancel',
    admin_confirm_delete: 'Are you sure you want to delete this?',
    admin_title_en: 'Title (EN)', admin_title_ar: 'Title (AR)', admin_category: 'Category',
    admin_thumbnail: 'Thumbnail URL', admin_video: 'Video URL', admin_featured: 'Featured',
    admin_visible: 'Visible', admin_order: 'Display Order',
    admin_contact_social: 'Contact & Social', admin_change_password: 'Change Password',
    admin_visit_counter: 'Visit Counter', admin_hero_images: 'Hero Background Images',
    admin_add_image: 'Add Image URL', admin_search: 'Search...',
    status_new: 'New', status_reviewed: 'Reviewed', status_contacted: 'Contacted', status_closed: 'Closed',
  },
  ar: {
    nav_home: 'الرئيسية', nav_work: 'أعمالنا', nav_services: 'خدماتنا', nav_about: 'من نحن',
    nav_clients: 'عملاؤنا', nav_contact: 'تواصل', nav_quote: 'طلب عرض سعر',
    hero_tag: 'تكوين للإنتاج الإعلامي', hero_main: 'نصنع قصصاً بصرية',
    hero_sub: 'تحرّك الجماهير', hero_desc: 'إنتاج إعلامي احترافي للمؤتمرات والحملات المؤسسية والمشاريع الإبداعية في المملكة العربية السعودية.',
    hero_cta: 'استكشف أعمالنا',
    work_title: 'أعمالنا', work_subtitle: 'عرض لأفضل إنتاجاتنا',
    filter_all: 'الكل', filter_conferences: 'مؤتمرات', filter_corporate: 'مؤسسي',
    filter_brand: 'علامات تجارية', filter_events: 'فعاليات',
    services_title: 'خدماتنا', services_subtitle: 'حلول إنتاج إعلامي متكاملة',
    svc1_title: 'التصوير الفوتوغرافي', svc1_desc: 'تصوير احترافي للفعاليات والمنتجات والاحتياجات المؤسسية بجودة سينمائية.',
    svc2_title: 'فيديو مُثبّت', svc2_desc: 'إنتاج فيديو سينمائي سلس باستخدام أحدث معدات التثبيت.',
    svc3_title: 'تصوير جوي', svc3_desc: 'لقطات جوية مذهلة بطائرات درون احترافية وطيارين مرخصين.',
    svc4_title: 'تغطية مباشرة', svc4_desc: 'تغطية فعاليات حية بكاميرات متعددة مع تبديل وبث فوري.',
    stats_projects: 'مشروع مكتمل', stats_years: 'سنوات خبرة', stats_clients: 'عميل سعيد', stats_orgs: 'مؤسسة',
    about_title: 'عن تكوين', about_p1: 'تكوين هي شركة رائدة في الإنتاج الإعلامي السعودي متخصصة في إنتاج الفيديو عالي الجودة وتغطية المؤتمرات والإعلانات المؤسسية وإنشاء المحتوى الفني.',
    about_p2: 'بفريق من المحترفين المتمرسين ومعدات متطورة، نحيي القصص من خلال التميز السينمائي. التزامنا بالجودة والإبداع جعلنا شريكاً موثوقاً للمؤسسات الكبرى في المملكة.',
    val1: 'الإبداع', val2: 'الجودة', val3: 'الابتكار', val4: 'الموثوقية', val5: 'التميز',
    clients_title: 'عملاؤنا', clients_subtitle: 'موثوقون من قبل المؤسسات الرائدة',
    contact_title: 'تواصل معنا', contact_subtitle: 'أخبرنا عن مشروعك وسنعود إليك خلال 24 ساعة.',
    form_name: 'الاسم الكامل', form_org: 'المؤسسة', form_service: 'نوع الخدمة',
    form_date: 'تاريخ الفعالية', form_location: 'الموقع', form_details: 'تفاصيل المشروع',
    form_phone: 'الهاتف', form_email: 'البريد الإلكتروني', form_submit: 'إرسال الطلب',
    form_success: 'تم إرسال طلبك بنجاح!',
    form_svc_photo: 'تصوير فوتوغرافي', form_svc_video: 'إنتاج فيديو', form_svc_aerial: 'تصوير جوي',
    form_svc_live: 'تغطية مباشرة', form_svc_other: 'أخرى',
    footer_desc: 'شركة إنتاج إعلامي احترافية مقرها الرياض، المملكة العربية السعودية.',
    footer_quick: 'روابط سريعة', footer_follow: 'تابعنا', footer_rights: '© 2025 تكوين للإنتاج الإعلامي. جميع الحقوق محفوظة.',
    admin_login: 'تسجيل دخول المدير', admin_email: 'البريد الإلكتروني', admin_password: 'كلمة المرور', admin_enter: 'دخول',
    admin_wrong: 'كلمة المرور غير صحيحة', admin_overview: 'نظرة عامة', admin_projects: 'المشاريع والفيديو',
    admin_requests: 'طلبات العملاء', admin_settings: 'إعدادات الموقع', admin_videos: 'أقسام الفيديو', admin_logout: 'خروج',
    admin_total_projects: 'إجمالي المشاريع', admin_total_requests: 'إجمالي الطلبات',
    admin_new_requests: 'طلبات جديدة', admin_visits: 'عدد الزيارات',
    admin_recent: 'الطلبات الأخيرة', admin_add: 'إضافة مشروع', admin_edit: 'تعديل',
    admin_delete: 'حذف', admin_save: 'حفظ', admin_cancel: 'إلغاء',
    admin_confirm_delete: 'هل أنت متأكد من الحذف؟',
    admin_title_en: 'العنوان (EN)', admin_title_ar: 'العنوان (AR)', admin_category: 'التصنيف',
    admin_thumbnail: 'رابط الصورة', admin_video: 'رابط الفيديو', admin_featured: 'مميز',
    admin_visible: 'مرئي', admin_order: 'ترتيب العرض',
    admin_contact_social: 'التواصل والسوشال', admin_change_password: 'تغيير كلمة المرور',
    admin_visit_counter: 'عداد الزيارات', admin_hero_images: 'صور الخلفية الرئيسية',
    admin_add_image: 'إضافة رابط صورة', admin_search: 'بحث...',
    status_new: 'جديد', status_reviewed: 'تمت المراجعة', status_contacted: 'تم التواصل', status_closed: 'مغلق',
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
    return translations[lang]?.[key] || key;
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
