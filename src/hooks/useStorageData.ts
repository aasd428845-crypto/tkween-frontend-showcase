import { useState, useEffect, useCallback } from 'react'
import { getVideos, getProjects, getHeroImages, type Video, type Project } from '@/lib/storage'

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
  const load = useCallback(() =>
    getVideos()
      .filter(v => v.section === section && v.visible)
      .sort((a, b) => a.display_order - b.display_order)
      .map(v => ({ ...v, thumbnail: v.thumbnail_url || '' })),
    [section]
  )

  const [videos, setVideos] = useState<any[]>(() => {
    const data = load()
    return data.length > 0 ? data : placeholder
  })

  const reload = useCallback(() => {
    const data = load()
    setVideos(data.length > 0 ? data : placeholder)
  }, [load, placeholder])

  useStorageEvent(reload)

  return videos
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(getProjects)

  const reload = useCallback(() => setProjects(getProjects()), [])
  useStorageEvent(reload)

  return projects
}

export function useHeroImages() {
  const [images, setImages] = useState<string[]>(getHeroImages)

  const reload = useCallback(() => setImages(getHeroImages()), [])
  useStorageEvent(reload)

  return images
}
