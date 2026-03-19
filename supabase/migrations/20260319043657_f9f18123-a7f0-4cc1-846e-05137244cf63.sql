
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'CONFERENCES',
  thumbnail TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  visible BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  organization TEXT DEFAULT '',
  service_type TEXT DEFAULT '',
  event_date TEXT DEFAULT '',
  location TEXT DEFAULT '',
  details TEXT DEFAULT '',
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table (key-value)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Projects: public read, auth write
CREATE POLICY "Anyone can read projects" ON projects FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- Requests: public insert (for contact form), auth read/update/delete
CREATE POLICY "Anyone can insert requests" ON requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can read requests" ON requests FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can update requests" ON requests FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete requests" ON requests FOR DELETE TO authenticated USING (true);

-- Settings: public read, auth write
CREATE POLICY "Anyone can read settings" ON settings FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can insert settings" ON settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update settings" ON settings FOR UPDATE TO authenticated USING (true);
