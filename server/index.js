import express from 'express'
import cors from 'cors'
import pg from 'pg'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const { Pool } = pg
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tkween_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS tkween_projects (
      id TEXT PRIMARY KEY,
      title_en TEXT DEFAULT '',
      title_ar TEXT DEFAULT '',
      category TEXT DEFAULT '',
      thumbnail TEXT DEFAULT '',
      video_url TEXT DEFAULT '',
      visible BOOLEAN DEFAULT true,
      featured BOOLEAN DEFAULT false,
      display_order INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS tkween_videos (
      id TEXT PRIMARY KEY,
      title_en TEXT DEFAULT '',
      title_ar TEXT DEFAULT '',
      section TEXT DEFAULT 'conferences',
      vimeo_url TEXT DEFAULT '',
      thumbnail_url TEXT DEFAULT '',
      display_order INTEGER DEFAULT 0,
      featured BOOLEAN DEFAULT false,
      visible BOOLEAN DEFAULT true,
      created_at TEXT DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS tkween_requests (
      id TEXT PRIMARY KEY,
      full_name TEXT DEFAULT '',
      organization TEXT DEFAULT '',
      service_type TEXT DEFAULT '',
      event_date TEXT DEFAULT '',
      location TEXT DEFAULT '',
      details TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      email TEXT DEFAULT '',
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT ''
    );
  `)

  const { rows } = await pool.query('SELECT COUNT(*) FROM tkween_settings')
  if (parseInt(rows[0].count) === 0) {
    const defaults = [
      ['phone', '0553120141'],
      ['email', 'sales@tkweensa.com'],
      ['whatsapp', '966553120141'],
      ['address', 'الرياض، المملكة العربية السعودية'],
      ['instagram', 'https://instagram.com/Tkweensa'],
      ['twitter', 'https://twitter.com/Tkweensa'],
      ['snapchat', 'https://snapchat.com/add/Tkweensa'],
      ['admin_password', 'tkween2025'],
      ['visit_count', '0'],
      ['hero_images', JSON.stringify([
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=85',
      ])],
    ]
    for (const [k, v] of defaults) {
      await pool.query(
        'INSERT INTO tkween_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
        [k, v]
      )
    }
  }
}

const app = express()
app.use(cors())
app.use(express.json())

const uploadDir = path.join(__dirname, '../public/uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const diskStorage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  },
})
const upload = multer({ storage: diskStorage, limits: { fileSize: 50 * 1024 * 1024 } })

app.use('/uploads', express.static(uploadDir))

// ── VIDEOS ──────────────────────────────────────────────────────────

app.get('/api/videos', async (req, res) => {
  try {
    const { section } = req.query
    const q = section
      ? 'SELECT * FROM tkween_videos WHERE section=$1 ORDER BY display_order'
      : 'SELECT * FROM tkween_videos ORDER BY display_order'
    const { rows } = await pool.query(q, section ? [section] : [])
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.post('/api/videos', async (req, res) => {
  try {
    const {
      title_en = '', title_ar = '', section = 'conferences',
      vimeo_url = '', thumbnail_url = '', display_order = 0,
      featured = false, visible = true,
    } = req.body
    const id = Date.now().toString()
    const created_at = new Date().toISOString()
    await pool.query(
      'INSERT INTO tkween_videos (id,title_en,title_ar,section,vimeo_url,thumbnail_url,display_order,featured,visible,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [id, title_en, title_ar, section, vimeo_url, thumbnail_url, display_order, featured, visible, created_at]
    )
    const { rows } = await pool.query('SELECT * FROM tkween_videos WHERE id=$1', [id])
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.put('/api/videos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const fields = req.body
    const keys = Object.keys(fields)
    if (keys.length === 0) return res.status(400).json({ error: 'No fields' })
    const sets = keys.map((k, i) => `"${k}"=$${i + 2}`).join(', ')
    await pool.query(`UPDATE tkween_videos SET ${sets} WHERE id=$1`, [id, ...Object.values(fields)])
    const { rows } = await pool.query('SELECT * FROM tkween_videos WHERE id=$1', [id])
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.delete('/api/videos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tkween_videos WHERE id=$1', [req.params.id])
    res.json({ ok: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// ── PROJECTS ─────────────────────────────────────────────────────────

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tkween_projects ORDER BY display_order')
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.post('/api/projects', async (req, res) => {
  try {
    const {
      title_en = '', title_ar = '', category = '', thumbnail = '',
      video_url = '', visible = true, featured = false, display_order = 0,
    } = req.body
    const id = Date.now().toString()
    await pool.query(
      'INSERT INTO tkween_projects (id,title_en,title_ar,category,thumbnail,video_url,visible,featured,display_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [id, title_en, title_ar, category, thumbnail, video_url, visible, featured, display_order]
    )
    const { rows } = await pool.query('SELECT * FROM tkween_projects WHERE id=$1', [id])
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const fields = req.body
    const keys = Object.keys(fields)
    if (keys.length === 0) return res.status(400).json({ error: 'No fields' })
    const sets = keys.map((k, i) => `"${k}"=$${i + 2}`).join(', ')
    await pool.query(`UPDATE tkween_projects SET ${sets} WHERE id=$1`, [id, ...Object.values(fields)])
    const { rows } = await pool.query('SELECT * FROM tkween_projects WHERE id=$1', [id])
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tkween_projects WHERE id=$1', [req.params.id])
    res.json({ ok: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// ── SETTINGS ─────────────────────────────────────────────────────────

app.get('/api/settings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tkween_settings')
    const settings = {}
    for (const r of rows) settings[r.key] = r.value
    res.json(settings)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.post('/api/settings', async (req, res) => {
  try {
    for (const [k, v] of Object.entries(req.body)) {
      await pool.query(
        'INSERT INTO tkween_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value=$2',
        [k, String(v)]
      )
    }
    const { rows } = await pool.query('SELECT * FROM tkween_settings')
    const settings = {}
    for (const r of rows) settings[r.key] = r.value
    res.json(settings)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// ── REQUESTS ─────────────────────────────────────────────────────────

app.get('/api/requests', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tkween_requests ORDER BY created_at DESC')
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.post('/api/requests', async (req, res) => {
  try {
    const {
      full_name = '', organization = '', service_type = '',
      event_date = '', location = '', details = '', phone = '', email = '',
    } = req.body
    const id = Date.now().toString()
    const created_at = new Date().toISOString()
    await pool.query(
      'INSERT INTO tkween_requests (id,full_name,organization,service_type,event_date,location,details,phone,email,status,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
      [id, full_name, organization, service_type, event_date, location, details, phone, email, 'new', created_at]
    )
    const { rows } = await pool.query('SELECT * FROM tkween_requests WHERE id=$1', [id])
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.put('/api/requests/:id', async (req, res) => {
  try {
    const { id } = req.params
    const fields = req.body
    const keys = Object.keys(fields)
    if (keys.length === 0) return res.status(400).json({ error: 'No fields' })
    const sets = keys.map((k, i) => `"${k}"=$${i + 2}`).join(', ')
    await pool.query(`UPDATE tkween_requests SET ${sets} WHERE id=$1`, [id, ...Object.values(fields)])
    const { rows } = await pool.query('SELECT * FROM tkween_requests WHERE id=$1', [id])
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.delete('/api/requests/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tkween_requests WHERE id=$1', [req.params.id])
    res.json({ ok: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// ── FILE UPLOAD ───────────────────────────────────────────────────────

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

// ── HEALTH ────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }))

// ── START ─────────────────────────────────────────────────────────────

initDB()
  .then(() => {
    const PORT = process.env.API_PORT || 3001
    app.listen(PORT, () => console.log(`[TKWEEN API] Running on :${PORT}`))
  })
  .catch(err => {
    console.error('[TKWEEN API] DB init failed:', err)
    process.exit(1)
  })
