# TKWEEN Media Production Website

A bilingual (Arabic/English) media production company website for TKWEEN, built with Vite + React + TypeScript + Tailwind CSS + Express + PostgreSQL.

## Architecture

- **Frontend**: React + Vite + TypeScript
- **Backend**: Express.js API server (TypeScript, tsx runtime)
- **Database**: PostgreSQL (Replit built-in, via DATABASE_URL)
- **Styling**: Tailwind CSS + inline styles with CSS custom properties
- **Routing**: React Router v6
- **State**: All data fetched from PostgreSQL via REST API — no localStorage
- **Fonts**: Inter (EN) + Tajawal (AR) from Google Fonts
- **Vite Port**: 5000
- **API Port**: 3001 (proxied via Vite `/api` → `localhost:3001`)

## Replit Setup

- Run command: `npm run dev` (runs both Vite + Express concurrently)
- Vite dev server starts on port 5000
- Express API starts on port 3001
- Requires: `DATABASE_URL` environment variable (auto-set by Replit PostgreSQL)
- Database tables created automatically on first startup

## Design System

- Background: `#000000` / `#040A06`
- Card/panel: `#0a0f0b` / `#111814`
- Border: `#1a2a1e`
- Accent: Coral `#FF5F57`, Teal `#2DD4BF`
- Gradient: coral→teal
- Text: `#ffffff` / `#888888`

## Database Tables

| Table | Purpose |
|-------|---------|
| `videos` | Video content per section (conferences, corporate_ads, designs, our_work) |
| `projects` | Featured projects on homepage |
| `requests` | Quote requests from public form |
| `settings` | Site settings: contact, password, hero images, Vimeo token |

## API Routes (Express on port 3001)

| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/auth/login | Admin password verification |
| GET | /api/videos | All videos (optional ?section= filter) |
| POST | /api/videos | Create video (vimeo_url stored as string) |
| PUT | /api/videos/:id | Update video |
| DELETE | /api/videos/:id | Delete video |
| GET | /api/projects | All projects |
| POST | /api/projects | Create project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/requests | All requests |
| POST | /api/requests | Submit quote request |
| PUT | /api/requests/:id | Update request status |
| DELETE | /api/requests/:id | Delete request |
| GET | /api/settings | Get site settings |
| PUT | /api/settings | Update settings |
| PATCH | /api/settings/visit | Increment visit counter |

## Routing Structure

### Public Routes
- `/` — Home (hero slideshow from DB, featured work from DB)
- `/conferences` — Conference coverage videos (from DB)
- `/corporate-ads` — Corporate ads videos (from DB)
- `/designs` — Design work videos (from DB)
- `/our-work` — General work videos (from DB)
- `/contact` — Contact info (from DB settings)
- `/quote` — Quote request form (saves to DB)

### Admin Routes
- `/admin/login` — Password login (verified via API)
- `/admin/dashboard` — Overview stats from DB
- `/admin/projects` — Manage projects (thumbnail = direct URL, video = Vimeo URL)
- `/admin/videos` — Manage videos (vimeo_url stored as string in DB)
- `/admin/requests` — View & manage quote requests from DB
- `/admin/settings` — Contact info, password, hero image URLs, Vimeo token

## Key Files

| File | Purpose |
|------|---------|
| `server/index.ts` | Express API server with all routes + DB init |
| `src/lib/api.ts` | Frontend async API client + TypeScript interfaces |
| `src/lib/storage.ts` | Re-exports types from api.ts (backward compat) |
| `src/App.tsx` | Routes — public + nested admin |
| `src/context/LanguageContext.tsx` | Bilingual EN/AR translations |
| `src/components/VideoModal.tsx` | Vimeo/YouTube/HTML5 video modal |

## Admin Access

- URL: `/admin/login`
- Default password: `tkween2025` (stored in DB `settings` table)
- Session stored in `sessionStorage.tkween_admin = '1'`

## Video / Image URL Policy

- **Vimeo URLs**: Stored as plain text strings in `videos.vimeo_url`. VideoModal extracts the video ID and builds the embed URL.
- **Thumbnail URLs**: Direct image URLs stored in `videos.thumbnail_url` / `projects.thumbnail`. No file uploads.
- **Hero Images**: Array of direct image URLs stored as JSON string in `settings.hero_images`.
- **Auto-fill**: Admin Videos page has "AUTO-FILL" button that calls Vimeo oEmbed API to auto-populate thumbnail + title from a Vimeo URL.
