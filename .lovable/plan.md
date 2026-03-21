

# Plan: Complete TKWEEN Database Schema

## Current State

The database **already has** all 4 tables (`projects`, `videos`, `requests`, `settings`) with RLS enabled and working policies. The admin pages already use Supabase via `cloud-content.ts`. Most of what you requested is already done.

## What's Actually Missing

Only two small additions are needed:

### 1. Add `type` column to `projects` table
The `projects` table is missing the `type` column (`video` or `photo`). All other columns already exist.

**Migration:**
```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS type text DEFAULT 'video';
```

### 2. Seed default settings into `settings` table
Check if the `settings` table has the required keys (phone, email, whatsapp, address, instagram, twitter, snapchat, hero_images, visit_count). Insert any missing defaults.

### 3. Update code to use new `type` field
- Update `Project` interface in `storage.ts` to include `type: string`
- Update `cloud-content.ts` normalizer to include `type`
- Update `AdminProjects.tsx` add/edit modal to include a type selector (video/photo)
- Update `PublicSite.tsx` work grid to respect the type field

### What's Already Done (No Changes Needed)
- `videos` table — exists with all requested columns
- `requests` table — exists with all requested columns
- `settings` table — exists with key/value structure
- RLS policies — all tables have public read + authenticated write
- `AdminVideos.tsx` — already manages videos with 4 section tabs
- `AdminRequests.tsx` — already reads from Supabase via cloud-content
- `AdminSettings.tsx` — already manages settings
- All frontend pages fetch from Supabase

### Security Note
The request mentions storing `admin_password` and `vimeo_access_token` in the settings table. These were **intentionally removed** in a previous security fix. Admin auth now uses Supabase Auth (admin@tkween.com). We will NOT re-add these sensitive fields to the client-accessible settings table.

### Files Modified
- `src/lib/storage.ts` — add `type` to Project interface
- `src/lib/cloud-content.ts` — include `type` in normalizer and CRUD
- `src/pages/admin/AdminProjects.tsx` — add type selector in modal
- 1 database migration — add `type` column to projects

