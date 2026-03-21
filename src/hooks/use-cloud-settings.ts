import { useCallback, useEffect, useState } from 'react'
import { fetchCloudSettings } from '@/lib/cloud-content'
import { DEFAULT_SETTINGS, type Settings } from '@/lib/storage'

export function useCloudSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const cloudSettings = await fetchCloudSettings()
      setSettings(cloudSettings)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { settings, loading, refresh, setSettings }
}
