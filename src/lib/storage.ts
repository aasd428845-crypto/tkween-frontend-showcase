export interface Project {
  id: string
  title_en: string
  title_ar: string
  category: string
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
  section: 'conferences' | 'corporate_ads' | 'designs' | 'our_work'
  vimeo_url: string
  thumbnail_url: string
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
  admin_password: string
  visit_count: string
  hero_images: string
  vimeo_access_token?: string
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
