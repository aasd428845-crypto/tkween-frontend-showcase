import { supabase } from '@/integrations/supabase/client'

// ── SETTINGS ──
export interface TkweenSettings {
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

const DEFAULT_SETTINGS: TkweenSettings = {
  phone: '0553120141',
  email: 'sales@tkweensa.com',
  whatsapp: '966553120141',
  address: 'الرياض، المملكة العربية السعودية',
  instagram: 'https://instagram.com/Tkweensa',
  twitter: 'https://twitter.com/Tkweensa',
  snapchat: 'https://snapchat.com/add/Tkweensa',
  admin_password: 'tkween2025',
  visit_count: '0',
  hero_images: JSON.stringify([
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
  ]),
}

export async function fetchSettings(): Promise<TkweenSettings> {
  const { data } = await supabase.from('settings').select('key, value')
  if (!data || data.length === 0) return DEFAULT_SETTINGS
  const map: Record<string, string> = {}
  data.forEach((row: any) => { map[row.key] = row.value })
  return { ...DEFAULT_SETTINGS, ...map } as TkweenSettings
}

export async function saveSetting(key: string, value: string) {
  const { error } = await supabase.from('settings').upsert({ key, value }, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}

export async function saveSettingsBatch(settings: Partial<TkweenSettings>) {
  const rows = Object.entries(settings).map(([key, value]) => ({ key, value: String(value) }))
  const { error } = await supabase.from('settings').upsert(rows, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}

export async function incrementVisitCount() {
  const { data } = await supabase.from('settings').select('value').eq('key', 'visit_count').single()
  const current = data ? parseInt(data.value) || 0 : 0
  await supabase.from('settings').upsert({ key: 'visit_count', value: String(current + 1) }, { onConflict: 'key' })
}

// ── PROJECTS ──
export interface TkweenProject {
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

export async function fetchProjects(): Promise<TkweenProject[]> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
  return (data || []) as TkweenProject[]
}

export async function addProject(p: Omit<TkweenProject, 'id'>) {
  const { data, error } = await supabase.from('projects').insert(p).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateProject(id: string, updates: Partial<TkweenProject>) {
  const { error } = await supabase.from('projects').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ── REQUESTS ──
export interface TkweenRequest {
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

export async function fetchRequests(): Promise<TkweenRequest[]> {
  const { data } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false })
  return (data || []) as TkweenRequest[]
}

export async function addRequest(r: Omit<TkweenRequest, 'id' | 'status' | 'created_at'>) {
  const { data } = await supabase.from('requests').insert({ ...r, status: 'new' }).select().single()
  return data
}

export async function updateRequest(id: string, updates: Partial<TkweenRequest>) {
  await supabase.from('requests').update(updates).eq('id', id)
}

export async function deleteRequest(id: string) {
  await supabase.from('requests').delete().eq('id', id)
}

// ── VIDEOS ──
export interface TkweenVideo {
  id: string
  title_en: string
  title_ar: string
  section: string
  vimeo_url: string | null
  vimeo_id: string | null
  thumbnail_url: string | null
  display_order: number | null
  featured: boolean | null
  visible: boolean | null
  description_en: string | null
  description_ar: string | null
  duration: number | null
  created_at: string | null
}

export async function fetchVideos(): Promise<TkweenVideo[]> {
  const { data } = await supabase
    .from('videos')
    .select('*')
    .order('display_order', { ascending: true })
  return (data || []) as TkweenVideo[]
}

export async function addVideo(v: Omit<TkweenVideo, 'id' | 'created_at'>) {
  const { data, error } = await supabase.from('videos').insert(v).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateVideo(id: string, updates: Partial<TkweenVideo>) {
  const { error } = await supabase.from('videos').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteVideo(id: string) {
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
