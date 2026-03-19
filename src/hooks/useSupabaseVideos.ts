import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Video {
  id: string;
  title_en: string;
  title_ar: string;
  section: string;
  vimeo_url: string | null;
  thumbnail_url: string | null;
  display_order: number;
  featured: boolean | null;
  visible: boolean | null;
}

export function useSupabaseVideos(section: string) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('videos')
      .select('*')
      .eq('section', section)
      .eq('visible', true)
      .order('display_order')
      .then(({ data }) => {
        if (data) setVideos(data as Video[]);
        setLoading(false);
      });
  }, [section]);

  return { videos, loading };
}
