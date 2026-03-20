import { supabase } from '@/integrations/supabase/client'
import { getProjects, getVideos } from '@/lib/storage'
import type { Project, Video } from '@/lib/storage'

const VALID_VIDEO_SECTIONS = ['conferences', 'corporate_ads', 'designs', 'our_work'] as const
type VideoSection = (typeof VALID_VIDEO_SECTIONS)[number]

const normalizeProject = (row: any): Project => ({
  id: row.id,
  title_en: row.title_en ?? '',
  title_ar: row.title_ar ?? '',
  category: row.category ?? '',
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
    section,
    vimeo_url: row.vimeo_url ?? '',
    thumbnail_url: row.thumbnail_url ?? '',
    display_order: row.display_order ?? 0,
    featured: row.featured ?? false,
    visible: row.visible ?? true,
    created_at: row.created_at ?? new Date().toISOString(),
  }
}

export async function fetchCloudProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Failed to load projects from backend:', error.message)
    return getProjects()
  }

  const projects = (data ?? []).map(normalizeProject)
  return projects.length > 0 ? projects : getProjects()
}

export async function createCloudProject(project: Omit<Project, 'id'>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      title_en: project.title_en,
      title_ar: project.title_ar,
      category: project.category,
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
    return getVideos()
  }

  const videos = (data ?? []).map(normalizeVideo)
  return videos.length > 0 ? videos : getVideos()
}

export async function createCloudVideo(video: Omit<Video, 'id' | 'created_at'>): Promise<Video> {
  const { data, error } = await supabase
    .from('videos')
    .insert({
      title_en: video.title_en,
      title_ar: video.title_ar,
      section: video.section,
      vimeo_url: video.vimeo_url || null,
      thumbnail_url: video.thumbnail_url || null,
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
