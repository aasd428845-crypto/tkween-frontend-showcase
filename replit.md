# TKWEEN Media Production Website

A bilingual (Arabic/English) media production company website for TKWEEN, built with Vite + React + TypeScript + Tailwind CSS.

## Architecture

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + inline styles with CSS custom properties
- **Routing**: React Router v6 (wouter not used — react-router-dom)
- **State**: localStorage for all data (videos, projects, requests, settings)
- **Fonts**: Inter (EN) + Tajawal (AR) from Google Fonts
- **Port**: 5000

## Design System

- Background: `#000000` (pure black)
- Card/panel: `#0a0a0a` / `#111111`
- Border: `#1c1c1c`
- Accent: `#FF3B30` (red — NOT orange, NOT teal)
- Accent dark: `#D62828`
- Text: `#ffffff` / `#888888`

## Routing Structure

### Public Routes
- `/` — Home (hero slideshow, featured work, section links, services, stats, clients)
- `/conferences` — Conference coverage videos
- `/corporate-ads` — Corporate ads videos
- `/designs` — Design work videos
- `/our-work` — General work videos
- `/contact` — Contact info (phone, email, WhatsApp, social)
- `/quote` — Quote request form (saves to localStorage `tkween_requests`)

### Admin Routes (nested under AdminLayout)
- `/admin/login` — Password login (default: `tkween2025`)
- `/admin/dashboard` — Overview stats, recent requests
- `/admin/projects` — Manage showcase projects (localStorage `tkween_projects`)
- `/admin/videos` — Manage video sections (localStorage `tkween_videos`) with Vimeo oEmbed
- `/admin/requests` — View & manage quote requests (localStorage `tkween_requests`)
- `/admin/settings` — Contact info, password, hero images, Vimeo token

## Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Routes — public + nested admin |
| `src/index.css` | CSS variables, fonts, scrollbar |
| `src/context/LanguageContext.tsx` | Bilingual EN/AR translations |
| `src/components/Navbar.tsx` | Fixed navbar, WORK dropdown, lang switcher |
| `src/components/TkweenLogo.tsx` | SVG logo with gradient red |
| `src/components/VideoCard.tsx` | Full-width video card with hover |
| `src/components/VideoModal.tsx` | Vimeo/YouTube/HTML5 video modal |
| `src/components/WhatsAppButton.tsx` | Fixed WhatsApp CTA |
| `src/components/admin/AdminLayout.tsx` | Admin layout with `<Outlet>` for nested routes |
| `src/pages/admin/AdminVideos.tsx` | localStorage-based video manager |

## localStorage Keys

| Key | Content |
|-----|---------|
| `tkween_videos` | Array of video objects per section |
| `tkween_projects` | Featured projects shown on homepage |
| `tkween_requests` | Quote requests from form |
| `tkween_settings` | Site settings: password, contact, hero images |
| `tkween-lang` | User language preference (`en` or `ar`) |

## Admin Access

- URL: `/admin/login`
- Default password: `tkween2025`
- Password stored in localStorage `tkween_settings.admin_password`
- Session stored in `sessionStorage.tkween_admin = '1'`

## WhatsApp

Number: `966553120141` (hardcoded in WhatsAppButton component)
