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
  visit_count: string
  hero_images: string
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

const DEFAULT_SETTINGS: Settings = {
  phone: '0553120141',
  email: 'sales@tkweensa.com',
  whatsapp: '966553120141',
  address: 'الرياض، المملكة العربية السعودية',
  instagram: 'https://instagram.com/Tkweensa',
  twitter: 'https://twitter.com/Tkweensa',
  snapchat: 'https://snapchat.com/add/Tkweensa',
  visit_count: '0',
  hero_images: JSON.stringify([
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
  ]),
}

const DEFAULT_PROJECTS: Project[] = [
  { id: '1', title_en: 'Saudi Vision Forum 2024', title_ar: 'منتدى رؤية السعودية 2024',
    category: 'CONFERENCES', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    video_url: '', visible: true, featured: true, display_order: 1 },
  { id: '2', title_en: 'Aramco Annual Summit', title_ar: 'قمة أرامكو السنوية',
    category: 'CONFERENCES', thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    video_url: '', visible: true, featured: false, display_order: 2 },
  { id: '3', title_en: 'NEOM Brand Campaign', title_ar: 'حملة علامة نيوم',
    category: 'CORPORATE', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    video_url: '', visible: true, featured: false, display_order: 3 },
  { id: '4', title_en: 'Red Sea Film Series', title_ar: 'سلسلة أفلام البحر الأحمر',
    category: 'BRAND', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    video_url: '', visible: true, featured: true, display_order: 4 },
]

/* ── SETTINGS ── */
export function getSettings(): Settings {
  try {
    const raw = localStorage.getItem('tkween_settings')
    if (!raw) {
      localStorage.setItem('tkween_settings', JSON.stringify(DEFAULT_SETTINGS))
      return DEFAULT_SETTINGS
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(s: Partial<Settings>) {
  const current = getSettings()
  const updated = { ...current, ...s }
  localStorage.setItem('tkween_settings', JSON.stringify(updated))
  return updated
}

export function updateSetting(key: keyof Settings, value: string) {
  const s = getSettings()
  s[key] = value
  localStorage.setItem('tkween_settings', JSON.stringify(s))
}

/* ── PROJECTS ── */
export function getProjects(): Project[] {
  try {
    const raw = localStorage.getItem('tkween_projects')
    if (!raw) {
      localStorage.setItem('tkween_projects', JSON.stringify(DEFAULT_PROJECTS))
      return DEFAULT_PROJECTS
    }
    const parsed = JSON.parse(raw)
    return parsed.length > 0 ? parsed : DEFAULT_PROJECTS
  } catch {
    return DEFAULT_PROJECTS
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem('tkween_projects', JSON.stringify(projects))
}

export function addProject(p: Omit<Project, 'id'>) {
  const projects = getProjects()
  const newP = { ...p, id: Date.now().toString() }
  projects.push(newP)
  saveProjects(projects)
  return newP
}

export function updateProject(id: string, data: Partial<Project>) {
  const projects = getProjects().map(p => p.id === id ? { ...p, ...data } : p)
  saveProjects(projects)
}

export function deleteProject(id: string) {
  saveProjects(getProjects().filter(p => p.id !== id))
}

/* ── VIDEOS ── */
export function getVideos(): Video[] {
  try {
    const raw = localStorage.getItem('tkween_videos')
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveVideos(videos: Video[]) {
  localStorage.setItem('tkween_videos', JSON.stringify(videos))
}

export function addVideo(v: Omit<Video, 'id' | 'created_at'>) {
  const videos = getVideos()
  const newV = { ...v, id: Date.now().toString(), created_at: new Date().toISOString() }
  videos.push(newV)
  saveVideos(videos)
  return newV
}

export function updateVideo(id: string, data: Partial<Video>) {
  saveVideos(getVideos().map(v => v.id === id ? { ...v, ...data } : v))
}

export function deleteVideo(id: string) {
  saveVideos(getVideos().filter(v => v.id !== id))
}

/* ── REQUESTS ── */
export function getRequests(): Request[] {
  try {
    const raw = localStorage.getItem('tkween_requests')
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function saveRequests(requests: Request[]) {
  localStorage.setItem('tkween_requests', JSON.stringify(requests))
}

export function addRequest(r: Omit<Request, 'id' | 'created_at' | 'status'>) {
  const requests = getRequests()
  const newR = { ...r, id: Date.now().toString(), status: 'new', created_at: new Date().toISOString() }
  requests.push(newR)
  saveRequests(requests)
  return newR
}

export function updateRequest(id: string, data: Partial<Request>) {
  saveRequests(getRequests().map(r => r.id === id ? { ...r, ...data } : r))
}

export function deleteRequest(id: string) {
  saveRequests(getRequests().filter(r => r.id !== id))
}

/* ── HERO IMAGES ── */
export function getHeroImages(): string[] {
  try {
    const s = getSettings()
    return JSON.parse(s.hero_images)
  } catch {
    return [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
    ]
  }
}
