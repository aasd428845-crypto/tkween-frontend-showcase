import { supabase } from '@/integrations/supabase/client'
import {
  DEFAULT_SETTINGS,
  mergeSettings,
  parseHeroImages,
  type Project,
  type Request,
  type Settings,
  type Video,
} from '@/lib/storage'

const VALID_VIDEO_SECTIONS = ['conferences', 'corporate_ads', 'designs', 'our_work'] as const
type VideoSection = (typeof VALID_VIDEO_SECTIONS)[number]

const normalizeProject = (row: any): Project => ({
  id: row.id,
  title_en: row.title_en ?? '',
  title_ar: row.title_ar ?? '',
  category: row.category ?? '',
  type: row.type ?? 'video',
  thumbnail: row.thumbnail ?? '',
  video_url: row.video_url ?? '',
  visible: row.visible ?? true,
  featured: row.featured ?? false,
  display_order: row.display_order ?? 0,
})

const normalizeVideo = (row: any): Video => {
  const section = VALID_VIDEO_SECTIONS.includes(row.section as VideoSection)
    ? (row.section as VideoSection)
    : 'conferences'

  return {
    id: row.id,
    title_en: row.title_en ?? '',
    title_ar: row.title_ar ?? '',
    description_en: row.description_en ?? '',
    description_ar: row.description_ar ?? '',
    section,
    vimeo_id: row.vimeo_id ?? '',
    vimeo_url: row.vimeo_url ?? '',
    thumbnail_url: row.thumbnail_url ?? '',
    duration: row.duration ?? 0,
    display_order: row.display_order ?? 0,
    featured: row.featured ?? false,
    visible: row.visible ?? true,
    created_at: row.created_at ?? new Date().toISOString(),
  }
}

const normalizeRequest = (row: any): Request => ({
  id: row.id,
  full_name: row.full_name ?? '',
  organization: row.organization ?? '',
  service_type: row.service_type ?? '',
  event_date: row.event_date ?? '',
  location: row.location ?? '',
  details: row.details ?? '',
  phone: row.phone ?? '',
  email: row.email ?? '',
  status: row.status ?? 'new',
  created_at: row.created_at ?? new Date().toISOString(),
})

export async function fetchCloudProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Failed to load projects from backend:', error.message)
    return []
  }

  return (data ?? []).map(normalizeProject)
}

export async function createCloudProject(project: Omit<Project, 'id'>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      title_en: project.title_en,
      title_ar: project.title_ar,
      category: project.category,
      type: project.type,
      thumbnail: project.thumbnail,
      video_url: project.video_url,
      visible: project.visible,
      featured: project.featured,
      display_order: project.display_order,
    })
    .select('*')
    .single()

  if (error) throw error
  return normalizeProject(data)
}

export async function updateCloudProject(id: string, updates: Partial<Omit<Project, 'id'>>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return normalizeProject(data)
}

export async function deleteCloudProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function fetchCloudVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('section', { ascending: true })
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Failed to load videos from backend:', error.message)
    return []
  }

  return (data ?? []).map(normalizeVideo)
}

export async function createCloudVideo(video: Omit<Video, 'id' | 'created_at'>): Promise<Video> {
  const { data, error } = await supabase
    .from('videos')
    .insert({
      title_en: video.title_en,
      title_ar: video.title_ar,
      description_en: video.description_en ?? '',
      description_ar: video.description_ar ?? '',
      section: video.section,
      vimeo_id: video.vimeo_id || null,
      vimeo_url: video.vimeo_url || null,
      thumbnail_url: video.thumbnail_url || null,
      duration: video.duration ?? 0,
      display_order: video.display_order,
      featured: video.featured,
      visible: video.visible,
    })
    .select('*')
    .single()

  if (error) throw error
  return normalizeVideo(data)
}

export async function updateCloudVideo(
  id: string,
  updates: Partial<Omit<Video, 'id' | 'created_at'>>,
): Promise<Video> {
  const payload = {
    ...updates,
    ...(updates.vimeo_url !== undefined ? { vimeo_url: updates.vimeo_url || null } : {}),
    ...(updates.vimeo_id !== undefined ? { vimeo_id: updates.vimeo_id || null } : {}),
    ...(updates.thumbnail_url !== undefined ? { thumbnail_url: updates.thumbnail_url || null } : {}),
  }

  const { data, error } = await supabase
    .from('videos')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return normalizeVideo(data)
}

export async function deleteCloudVideo(id: string): Promise<void> {
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) throw error
}

export async function fetchCloudSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from('settings')
    .select('key, value')

  if (error) {
    console.error('Failed to load settings from backend:', error.message)
    return DEFAULT_SETTINGS
  }

  const partial: Partial<Settings> = {}
  for (const row of data ?? []) {
    partial[row.key as keyof Settings] = row.value as never
  }

  return mergeSettings(partial)
}

export async function saveCloudSetting(key: keyof Settings, value: string): Promise<void> {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) throw error
}

export async function saveCloudSettings(partial: Partial<Settings>): Promise<void> {
  const rows = Object.entries(partial)
    .filter(([, value]) => typeof value === 'string')
    .map(([key, value]) => ({ key, value: value as string }))

  if (rows.length === 0) return

  const { error } = await supabase
    .from('settings')
    .upsert(rows, { onConflict: 'key' })

  if (error) throw error
}

export async function incrementCloudVisitCount(): Promise<void> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'visit_count')
    .maybeSingle()

  if (error) {
    console.error('Failed to read visit count:', error.message)
    return
  }

  const current = Number(data?.value ?? '0')
  const next = Number.isFinite(current) ? String(current + 1) : '1'

  try {
    await saveCloudSetting('visit_count', next)
  } catch (saveError) {
    console.error('Failed to increment visit count:', saveError)
  }
}

export async function fetchCloudHeroImages(): Promise<string[]> {
  const settings = await fetchCloudSettings()
  return parseHeroImages(settings.hero_images)
}

type NewRequestPayload = Omit<Request, 'id' | 'status' | 'created_at'>

export async function createCloudRequest(request: NewRequestPayload): Promise<Request> {
  const { data, error } = await supabase
    .from('requests')
    .insert({
      full_name: request.full_name,
      organization: request.organization,
      service_type: request.service_type,
      event_date: request.event_date,
      location: request.location,
      details: request.details,
      phone: request.phone,
      email: request.email,
      status: 'new',
    })
    .select('*')
    .single()

  if (error) throw error
  return normalizeRequest(data)
}

export async function fetchCloudRequests(): Promise<Request[]> {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load requests from backend:', error.message)
    return []
  }

  return (data ?? []).map(normalizeRequest)
}

export async function updateCloudRequest(id: string, updates: Partial<Request>): Promise<Request> {
  const { data, error } = await supabase
    .from('requests')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return normalizeRequest(data)
}

export async function deleteCloudRequest(id: string): Promise<void> {
  const { error } = await supabase
    .from('requests')
    .delete()
    .eq('id', id)

  if (error) throw error
}
