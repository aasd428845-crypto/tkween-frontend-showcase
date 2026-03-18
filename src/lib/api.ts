import type { Video, Project, Settings, Request as TkweenRequest } from './storage'

const BASE = '/api'

async function call<T>(url: string, options?: RequestInit): Promise<T> {
  const isFormData = options?.body instanceof FormData
  const res = await fetch(url, {
    ...options,
    headers: isFormData ? undefined : { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API ${res.status}: ${text}`)
  }
  return res.json()
}

export function notifyUpdate() {
  window.dispatchEvent(new CustomEvent('tkween:update'))
}

// ── Videos ──────────────────────────────────────────────────────────

export const apiGetVideos = (section?: string) =>
  call<Video[]>(`${BASE}/videos${section ? `?section=${encodeURIComponent(section)}` : ''}`)

export const apiAddVideo = (v: Omit<Video, 'id' | 'created_at'>) =>
  call<Video>(`${BASE}/videos`, { method: 'POST', body: JSON.stringify(v) })

export const apiUpdateVideo = (id: string, data: Partial<Video>) =>
  call<Video>(`${BASE}/videos/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const apiDeleteVideo = (id: string) =>
  call<{ ok: boolean }>(`${BASE}/videos/${id}`, { method: 'DELETE' })

// ── Projects ─────────────────────────────────────────────────────────

export const apiGetProjects = () => call<Project[]>(`${BASE}/projects`)

export const apiAddProject = (p: Omit<Project, 'id'>) =>
  call<Project>(`${BASE}/projects`, { method: 'POST', body: JSON.stringify(p) })

export const apiUpdateProject = (id: string, data: Partial<Project>) =>
  call<Project>(`${BASE}/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const apiDeleteProject = (id: string) =>
  call<{ ok: boolean }>(`${BASE}/projects/${id}`, { method: 'DELETE' })

// ── Settings ─────────────────────────────────────────────────────────

export const apiGetSettings = () => call<Settings>(`${BASE}/settings`)

export const apiSaveSettings = (s: Partial<Settings>) =>
  call<Settings>(`${BASE}/settings`, { method: 'POST', body: JSON.stringify(s) })

// ── Requests ─────────────────────────────────────────────────────────

export const apiGetRequests = () => call<TkweenRequest[]>(`${BASE}/requests`)

export const apiAddRequest = (r: Omit<TkweenRequest, 'id' | 'created_at' | 'status'>) =>
  call<TkweenRequest>(`${BASE}/requests`, { method: 'POST', body: JSON.stringify(r) })

export const apiUpdateRequest = (id: string, data: Partial<TkweenRequest>) =>
  call<TkweenRequest>(`${BASE}/requests/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const apiDeleteRequest = (id: string) =>
  call<{ ok: boolean }>(`${BASE}/requests/${id}`, { method: 'DELETE' })

// ── File Upload ───────────────────────────────────────────────────────

export async function apiUploadFile(file: File): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE}/upload`, { method: 'POST', body: form })
  if (!res.ok) throw new Error('Upload failed')
  const { url } = await res.json()
  return url
}

// ── Auth ──────────────────────────────────────────────────────────────

export const apiLogin = (password: string) =>
  call<{ ok: boolean }>(`${BASE}/auth/login`, { method: 'POST', body: JSON.stringify({ password }) })

// ── Visits ───────────────────────────────────────────────────────────

export const apiIncrementVisits = () =>
  call<{ count: number }>(`${BASE}/visits/increment`, { method: 'POST' })
