# TKWEEN Media Production Website

A bilingual (Arabic/English) media production company website for TKWEEN, built with Vite + React + TypeScript + Tailwind CSS + shadcn/ui.

## Architecture

- **Frontend only** — pure Vite + React SPA (no Express server)
- **Supabase** — used for the `videos` table (Vimeo-linked video management)
- **localStorage** — used for settings, projects, and contact requests (client-side persistence)
- **Admin panel** — password-protected via sessionStorage; accessible at `/admin/login`

## Key Pages

- `/` — Public site (hero, work, video sections, services, about, clients, contact)
- `/contact` — Full contact page
- `/admin/login` — Admin login (password stored in localStorage settings)
- `/admin/dashboard` — Overview stats
- `/admin/projects` — Manage portfolio projects (localStorage)
- `/admin/requests` — Manage contact/quote requests (localStorage)
- `/admin/videos` — Manage Vimeo video sections (Supabase)
- `/admin/settings` — Site settings: contact info, hero images, password (localStorage)

## Environment Variables

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon/public key (safe for browser use; RLS enabled)

## Running

```bash
npm run dev
```

Runs on port 5000.

## Stack

- Vite 5, React 18, TypeScript
- Tailwind CSS, shadcn/ui (Radix UI components)
- React Router DOM v6
- Supabase JS client
- TanStack Query
