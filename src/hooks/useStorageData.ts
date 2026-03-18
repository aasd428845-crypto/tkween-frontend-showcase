import { useState, useEffect, useCallback } from 'react'
import { getVideos, getProjects, getHeroImages, getSettings, type Video, type Project, type Settings } from '@/lib/storage'
import { apiGetVideos, apiGetProjects, apiGetSettings } from '@/lib/api'

function useStorageEvent(loader: () => void) {
  useEffect(() => {
    window.addEventListener('tkween:update', loader)
    window.addEventListener('storage', loader)
    return () => {
      window.removeEventListener('tkween:update', loader)
      window.removeEventListener('storage', loader)
    }
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
      const data = getVideos()
        .filter(v => v.section === section && v.visible)
        .sort((a, b) => a.display_order - b.display_order)
        .map(v => ({ ...v, thumbnail: v.thumbnail_url || '' }))
      setVideos(data.length > 0 ? data : placeholder)
    }
  }, [section])

  useEffect(() => { load() }, [load])
  useStorageEvent(load)

  return videos
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  const load = useCallback(async () => {
    try {
      const data = await apiGetProjects()
      setProjects(data as Project[])
    } catch {
      setProjects(getProjects())
    }
  }, [])

  useEffect(() => { load() }, [load])
  useStorageEvent(load)

  return projects
}

export function useHeroImages() {
  const [images, setImages] = useState<string[]>([])

  const load = useCallback(async () => {
    try {
      const s = await apiGetSettings()
      let imgs: string[] = []
      try { imgs = JSON.parse((s as any).hero_images || '[]') } catch {}
      setImages(imgs.length > 0 ? imgs : getHeroImages())
    } catch {
      setImages(getHeroImages())
    }
  }, [])

  useEffect(() => { load() }, [load])
  useStorageEvent(load)

  return images
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(getSettings())

  const load = useCallback(async () => {
    try {
      const data = await apiGetSettings()
      setSettings(data as Settings)
    } catch {
      setSettings(getSettings())
    }
  }, [])

  useEffect(() => { load() }, [load])
  useStorageEvent(load)

  return settings
}
