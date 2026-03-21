export interface Project {
  id: string
  title_en: string
  title_ar: string
  category: string
  type: string
  thumbnail: string
  video_url: string
  visible: boolean
  featured: boolean
  display_order: number
}

export interface Video {
  id: string
  title_en: string
  title_ar: string
  description_en?: string
  description_ar?: string
  section: 'conferences' | 'corporate_ads' | 'designs' | 'our_work'
  vimeo_id?: string
  vimeo_url: string
  thumbnail_url: string
  duration?: number
  display_order: number
  featured: boolean
  visible: boolean
  created_at: string
}

export interface Settings {
  phone: string
  email: string
  whatsapp: string
  address: string
  instagram: string
  twitter: string
  snapchat: string
  visit_count: string
  hero_images: string
  vimeo_access_token?: string
  admin_password?: string
}

export interface Request {
  id: string
  full_name: string
  organization: string
  service_type: string
  event_date: string
  location: string
  details: string
  phone: string
  email: string
  status: string
  created_at: string
}

export const DEFAULT_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
]

export const DEFAULT_SETTINGS: Settings = {
  phone: '0553120141',
  email: 'sales@tkweensa.com',
  whatsapp: '966553120141',
  address: 'الرياض، المملكة العربية السعودية',
  instagram: 'https://instagram.com/Tkweensa',
  twitter: 'https://twitter.com/Tkweensa',
  snapchat: 'https://snapchat.com/add/Tkweensa',
  visit_count: '0',
  hero_images: JSON.stringify(DEFAULT_HERO_IMAGES),
  vimeo_access_token: '',
}

export const DEFAULT_PROJECTS: Project[] = [
  { id: '1', title_en: 'Saudi Vision Forum 2024', title_ar: 'منتدى رؤية السعودية 2024',
    category: 'CONFERENCES', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    video_url: '', visible: true, featured: true, display_order: 1 },
  { id: '2', title_en: 'Aramco Annual Summit', title_ar: 'قمة أرامكو السنوية',
    category: 'CONFERENCES', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    video_url: '', visible: true, featured: false, display_order: 2 },
  { id: '3', title_en: 'NEOM Brand Campaign', title_ar: 'حملة علامة نيوم',
    category: 'CORPORATE', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    video_url: '', visible: true, featured: false, display_order: 3 },
  { id: '4', title_en: 'Red Sea Film Series', title_ar: 'سلسلة أفلام البحر الأحمر',
    category: 'BRAND', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    video_url: '', visible: true, featured: true, display_order: 4 },
]

export function parseHeroImages(raw: string | null | undefined): string[] {
  try {
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_HERO_IMAGES
  } catch {
    return DEFAULT_HERO_IMAGES
  }
}

export function mergeSettings(partial: Partial<Settings> | null | undefined): Settings {
  return {
    ...DEFAULT_SETTINGS,
    ...(partial || {}),
    hero_images: JSON.stringify(parseHeroImages(partial?.hero_images ?? DEFAULT_SETTINGS.hero_images)),
  }
}
