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
  created_at?: string
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

export interface Settings {
  id?: number
  phone: string
  email: string
  whatsapp: string
  address: string
  instagram: string
  twitter: string
  snapchat: string
  admin_password: string
  visit_count: number | string
  hero_images: string
  vimeo_access_token?: string
}

const DEFAULT_SETTINGS: Settings = {
  phone: '0553120141',
  email: 'sales@tkweensa.com',
  whatsapp: '966553120141',
  address: 'الرياض، المملكة العربية السعودية',
  instagram: 'https://instagram.com/Tkweensa',
  twitter: 'https://twitter.com/Tkweensa',
  snapchat: 'https://snapchat.com/add/Tkweensa',
  admin_password: 'tkween2025',
  visit_count: 0,
  hero_images: JSON.stringify([
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
  ]),
}

async function apiFetch<T>(method: string, path: string, body?: any): Promise<T> {
  const res = await fetch('/api' + path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

/* ── AUTH ── */
export async function apiLogin(password: string): Promise<boolean> {
  try {
    await apiFetch<{ success: boolean }>('POST', '/auth/login', { password })
    return true
  } catch {
    return false
  }
}

/* ── VIDEOS ── */
export function apiGetVideos(section?: string): Promise<Video[]> {
  return apiFetch('GET', `/videos${section ? `?section=${section}` : ''}`)
}

export function apiCreateVideo(data: Omit<Video, 'id' | 'created_at'>): Promise<Video> {
  return apiFetch('POST', '/videos', data)
}

export function apiUpdateVideo(id: string, data: Partial<Omit<Video, 'id' | 'created_at'>>): Promise<Video> {
  return apiFetch('PUT', `/videos/${id}`, data)
}

export function apiDeleteVideo(id: string): Promise<{ success: boolean }> {
  return apiFetch('DELETE', `/videos/${id}`)
}

/* ── PROJECTS ── */
export function apiGetProjects(): Promise<Project[]> {
  return apiFetch('GET', '/projects')
}

export function apiCreateProject(data: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
  return apiFetch('POST', '/projects', data)
}

export function apiUpdateProject(id: string, data: Partial<Omit<Project, 'id' | 'created_at'>>): Promise<Project> {
  return apiFetch('PUT', `/projects/${id}`, data)
}

export function apiDeleteProject(id: string): Promise<{ success: boolean }> {
  return apiFetch('DELETE', `/projects/${id}`)
}

/* ── REQUESTS ── */
export function apiGetRequests(): Promise<Request[]> {
  return apiFetch('GET', '/requests')
}

export function apiCreateRequest(data: Omit<Request, 'id' | 'created_at' | 'status'>): Promise<Request> {
  return apiFetch('POST', '/requests', data)
}

export function apiUpdateRequest(id: string, data: { status: string }): Promise<Request> {
  return apiFetch('PUT', `/requests/${id}`, data)
}

export function apiDeleteRequest(id: string): Promise<{ success: boolean }> {
  return apiFetch('DELETE', `/requests/${id}`)
}

/* ── SETTINGS ── */
export function apiGetSettings(): Promise<Settings> {
  return apiFetch<Settings>('GET', '/settings').then(s => ({ ...DEFAULT_SETTINGS, ...s }))
}

export function apiSaveSettings(data: Partial<Settings>): Promise<Settings> {
  return apiFetch('PUT', '/settings', data)
}

export function apiIncrementVisit(): Promise<void> {
  return apiFetch('PATCH', '/settings/visit', {})
}

export { DEFAULT_SETTINGS }
