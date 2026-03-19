export interface TkweenSettings {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram: string;
  twitter: string;
  snapchat: string;
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

const defaultSettings: TkweenSettings = {
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

const defaultProjects: TkweenProject[] = [
  { id:"1", title_en:"Saudi Vision Forum 2024", title_ar:"منتدى رؤية السعودية 2024", category:"CONFERENCES", thumbnail:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", video_url:"", visible:true, featured:true, display_order:1 },
  { id:"2", title_en:"Aramco Annual Summit", title_ar:"قمة أرامكو السنوية", category:"CONFERENCES", thumbnail:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", video_url:"", visible:true, featured:false, display_order:2 },
  { id:"3", title_en:"NEOM Brand Campaign", title_ar:"حملة علامة نيوم", category:"CORPORATE", thumbnail:"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", video_url:"", visible:true, featured:false, display_order:3 },
  { id:"4", title_en:"Red Sea Film Series", title_ar:"سلسلة أفلام البحر الأحمر", category:"BRAND", thumbnail:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", video_url:"", visible:true, featured:true, display_order:4 },
  { id:"5", title_en:"Riyadh Season", title_ar:"موسم الرياض", category:"EVENTS", thumbnail:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80", video_url:"", visible:true, featured:false, display_order:5 },
  { id:"6", title_en:"Future Investment Forum", title_ar:"منتدى مستقبل الاستثمار", category:"CONFERENCES", thumbnail:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", video_url:"", visible:true, featured:false, display_order:6 }
];

export function getSettings(): TkweenSettings {
  const raw = localStorage.getItem('tkween_settings');
  if (!raw) {
    localStorage.setItem('tkween_settings', JSON.stringify(defaultSettings));
    return defaultSettings;
  }
  return JSON.parse(raw);
}

export function saveSettings(settings: TkweenSettings) {
  localStorage.setItem('tkween_settings', JSON.stringify(settings));
}

export function getProjects(): TkweenProject[] {
  const raw = localStorage.getItem('tkween_projects');
  if (!raw) {
    localStorage.setItem('tkween_projects', JSON.stringify(defaultProjects));
    return defaultProjects;
  }
  return JSON.parse(raw);
}

export function saveProjects(projects: TkweenProject[]) {
  localStorage.setItem('tkween_projects', JSON.stringify(projects));
}

export function getRequests(): TkweenRequest[] {
  const raw = localStorage.getItem('tkween_requests');
  if (!raw) {
    localStorage.setItem('tkween_requests', JSON.stringify([]));
    return [];
  }
  return JSON.parse(raw);
}

export function saveRequests(requests: TkweenRequest[]) {
  localStorage.setItem('tkween_requests', JSON.stringify(requests));
}

export function incrementVisitCount() {
  const s = getSettings();
  s.visit_count = String(Number(s.visit_count) + 1);
  saveSettings(s);
}
