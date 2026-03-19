import express from 'express'
import cors from 'cors'
import pg from 'pg'
import path from 'path'
import fs from 'fs'

const IS_PROD = process.env.NODE_ENV === 'production'
const DIST_PATH = path.join(process.cwd(), 'dist')

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const app = express()
app.use(cors())
app.use(express.json())

async function initDB() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title_en text NOT NULL DEFAULT '',
        title_ar text NOT NULL DEFAULT '',
        section text NOT NULL DEFAULT 'conferences',
        vimeo_url text DEFAULT '',
        thumbnail_url text DEFAULT '',
        display_order integer DEFAULT 0,
        featured boolean DEFAULT false,
        visible boolean DEFAULT true,
        created_at timestamp with time zone DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS projects (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title_en text NOT NULL DEFAULT '',
        title_ar text NOT NULL DEFAULT '',
        category text NOT NULL DEFAULT 'CONFERENCES',
        thumbnail text DEFAULT '',
        video_url text DEFAULT '',
        visible boolean DEFAULT true,
        featured boolean DEFAULT false,
        display_order integer DEFAULT 0,
        created_at timestamp with time zone DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS requests (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        full_name text NOT NULL DEFAULT '',
        organization text DEFAULT '',
        service_type text DEFAULT '',
        event_date text DEFAULT '',
        location text DEFAULT '',
        details text DEFAULT '',
        phone text NOT NULL DEFAULT '',
        email text DEFAULT '',
        status text DEFAULT 'new',
        created_at timestamp with time zone DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS settings (
        id integer PRIMARY KEY DEFAULT 1,
        phone text DEFAULT '0553120141',
        email text DEFAULT 'sales@tkweensa.com',
        whatsapp text DEFAULT '966553120141',
        address text DEFAULT 'الرياض، المملكة العربية السعودية',
        instagram text DEFAULT 'https://instagram.com/Tkweensa',
        twitter text DEFAULT 'https://twitter.com/Tkweensa',
        snapchat text DEFAULT 'https://snapchat.com/add/Tkweensa',
        admin_password text DEFAULT 'tkween2025',
        visit_count integer DEFAULT 0,
        hero_images text DEFAULT '["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85","https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85","https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85"]',
        vimeo_access_token text DEFAULT ''
      );

      INSERT INTO settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
    `)
    console.log('Database initialized')
  } finally {
    client.release()
  }
}

/* ── AUTH ── */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { password } = req.body
    const result = await pool.query('SELECT admin_password FROM settings WHERE id = 1')
    const row = result.rows[0]
    if (row && password === row.admin_password) {
      res.json({ success: true })
    } else {
      res.status(401).json({ error: 'Invalid password' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── VIDEOS ── */
app.get('/api/videos', async (req, res) => {
  try {
    const { section } = req.query
    let query = 'SELECT * FROM videos'
    const params: any[] = []
    if (section) {
      query += ' WHERE section = $1'
      params.push(section)
    }
    query += ' ORDER BY display_order ASC, created_at DESC'
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/videos', async (req, res) => {
  try {
    const { title_en, title_ar, section, vimeo_url, thumbnail_url, display_order, featured, visible } = req.body
    const result = await pool.query(
      `INSERT INTO videos (title_en, title_ar, section, vimeo_url, thumbnail_url, display_order, featured, visible)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title_en, title_ar, section, vimeo_url || '', thumbnail_url || '', display_order || 0, featured ?? false, visible ?? true]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/api/videos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title_en, title_ar, section, vimeo_url, thumbnail_url, display_order, featured, visible } = req.body
    const result = await pool.query(
      `UPDATE videos SET title_en=$1, title_ar=$2, section=$3, vimeo_url=$4, thumbnail_url=$5, display_order=$6, featured=$7, visible=$8
       WHERE id=$9 RETURNING *`,
      [title_en, title_ar, section, vimeo_url || '', thumbnail_url || '', display_order || 0, featured ?? false, visible ?? true, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/api/videos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM videos WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── PROJECTS ── */
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY display_order ASC, created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/projects', async (req, res) => {
  try {
    const { title_en, title_ar, category, thumbnail, video_url, visible, featured, display_order } = req.body
    const result = await pool.query(
      `INSERT INTO projects (title_en, title_ar, category, thumbnail, video_url, visible, featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title_en, title_ar, category, thumbnail || '', video_url || '', visible ?? true, featured ?? false, display_order || 0]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title_en, title_ar, category, thumbnail, video_url, visible, featured, display_order } = req.body
    const result = await pool.query(
      `UPDATE projects SET title_en=$1, title_ar=$2, category=$3, thumbnail=$4, video_url=$5, visible=$6, featured=$7, display_order=$8
       WHERE id=$9 RETURNING *`,
      [title_en, title_ar, category, thumbnail || '', video_url || '', visible ?? true, featured ?? false, display_order || 0, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── REQUESTS ── */
app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM requests ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/requests', async (req, res) => {
  try {
    const { full_name, organization, service_type, event_date, location, details, phone, email } = req.body
    const result = await pool.query(
      `INSERT INTO requests (full_name, organization, service_type, event_date, location, details, phone, email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [full_name, organization || '', service_type || '', event_date || '', location || '', details || '', phone, email || '']
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/api/requests/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const result = await pool.query(
      'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/api/requests/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM requests WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── SETTINGS ── */
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM settings WHERE id = 1')
    res.json(result.rows[0] || {})
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/api/settings', async (req, res) => {
  try {
    const { phone, email, whatsapp, address, instagram, twitter, snapchat, admin_password, visit_count, hero_images, vimeo_access_token } = req.body
    const result = await pool.query(
      `UPDATE settings SET phone=$1, email=$2, whatsapp=$3, address=$4, instagram=$5, twitter=$6, snapchat=$7,
       admin_password=$8, visit_count=$9, hero_images=$10, vimeo_access_token=$11
       WHERE id=1 RETURNING *`,
      [phone, email, whatsapp, address, instagram, twitter, snapchat, admin_password, visit_count || 0, hero_images, vimeo_access_token || '']
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.patch('/api/settings/visit', async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE settings SET visit_count = visit_count + 1 WHERE id = 1 RETURNING visit_count',
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

if (IS_PROD) {
  console.log('Serving static files from:', DIST_PATH, '| exists:', fs.existsSync(DIST_PATH))
  app.use(express.static(DIST_PATH))
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'))
  })
}

initDB().then(() => {
  const PORT = IS_PROD ? (parseInt(process.env.PORT || '5000')) : 3001
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT} [${IS_PROD ? 'production' : 'development'}]`))
}).catch(err => {
  console.error('Failed to initialize DB:', err)
  process.exit(1)
})
