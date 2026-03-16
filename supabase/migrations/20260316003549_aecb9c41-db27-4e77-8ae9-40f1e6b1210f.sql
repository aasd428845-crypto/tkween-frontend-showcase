-- Create videos table
CREATE TABLE public.videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text DEFAULT '',
  description_ar text DEFAULT '',
  section text NOT NULL CHECK (section IN ('conferences', 'corporate_ads', 'designs', 'our_work')),
  vimeo_id text DEFAULT '',
  vimeo_url text DEFAULT '',
  thumbnail_url text DEFAULT '',
  duration integer DEFAULT 0,
  display_order integer DEFAULT 0,
  featured boolean DEFAULT false,
  visible boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can read videos"
  ON public.videos FOR SELECT
  USING (true);

-- Allow authenticated users to manage videos
CREATE POLICY "Authenticated users can insert videos"
  ON public.videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON public.videos FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete videos"
  ON public.videos FOR DELETE
  TO authenticated
  USING (true);