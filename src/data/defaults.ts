export interface TkweenSettings {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram: string;
  twitter: string;
  snapchat: string;
  admin_password: string;
  visit_count: string;
  hero_images: string;
}

export interface TkweenProject {
  id: string;
  title_en: string;
  title_ar: string;
  category: string;
  thumbnail: string;
  video_url: string;
  visible: boolean;
  featured: boolean;
  display_order: number;
}

export interface TkweenRequest {
  id: string;
  full_name: string;
  organization: string;
  service_type: string;
  event_date: string;
  location: string;
  details: string;
  phone: string;
  email: string;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  created_at: string;
}

export const defaultSettings: TkweenSettings = {
  phone: "0553120141",
  email: "sales@tkweensa.com",
  whatsapp: "966553120141",
  address: "الرياض، المملكة العربية السعودية",
  instagram: "https://instagram.com/Tkweensa",
  twitter: "https://twitter.com/Tkweensa",
  snapchat: "https://snapchat.com/add/Tkweensa",
  admin_password: "tkween2025",
  visit_count: "0",
  hero_images: JSON.stringify([
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85",
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1920&q=85",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85"
  ])
};
