import { useState, useEffect, useCallback } from 'react'
import { apiGetVideos, apiGetProjects, apiGetSettings } from '@/lib/api'
import type { Video, Project, Settings } from '@/lib/storage'

const DEFAULT_SETTINGS: Settings = {
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
  ]),
}

function useServerEvent(loader: () => void) {
  useEffect(() => {
    window.addEventListener('tkween:update', loader)
    return () => window.removeEventListener('tkween:update', loader)
  }, [loader])
}

export function useSectionVideos(section: Video['section'], placeholder: any[] = []) {
  const [videos, setVideos] = useState<any[]>(placeholder)

  const load = useCallback(async () => {
    try {
      const data = await apiGetVideos(section)
      const filtered = (data as Video[])
        .filter(v => v.visible)
        .sort((a, b) => a.display_order - b.display_order)
        .map(v => ({ ...v, thumbnail: v.thumbnail_url || '' }))
      setVideos(filtered.length > 0 ? filtered : placeholder)
    } catch {
      setVideos(placeholder)
    }
  }, [section])

  useEffect(() => { load() }, [load])
  useServerEvent(load)

  return videos
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  const load = useCallback(async () => {
    try {
      const data = await apiGetProjects()
      setProjects(data as Project[])
    } catch {
      setProjects([])
    }
  }, [])

  useEffect(() => { load() }, [load])
  useServerEvent(load)

  return projects
}

export function useHeroImages() {
  const [images, setImages] = useState<string[]>([])

  const load = useCallback(async () => {
    try {
      const s = await apiGetSettings()
      let imgs: string[] = []
      try { imgs = JSON.parse((s as any).hero_images || '[]') } catch {}
      setImages(imgs)
    } catch {
      setImages([])
    }
  }, [])

  useEffect(() => { load() }, [load])
  useServerEvent(load)

  return images
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  const load = useCallback(async () => {
    try {
      const data = await apiGetSettings()
      setSettings(data as Settings)
    } catch {
      setSettings(DEFAULT_SETTINGS)
    }
  }, [])

  useEffect(() => { load() }, [load])
  useServerEvent(load)

  return settings
}
