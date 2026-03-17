

# Rebranding TKWEEN to Match Original Logo

## Analysis of the uploaded logo

The logo shows a **play-button triangle** with a gradient from **coral/salmon pink** (#E8637A / #F06B7A) at the top to **deep red** (#C23A5C) at the bottom. The triangle has a **T cutout** inside. Below it, "تكوين" is written in a **teal-to-blue gradient** (#2dd4bf → #1e3a8a), with a small **pink triangle** accent. "TKWEEN" appears in teal, and subtitles in muted teal/blue tones.

### Extracted color palette:
- **Pink/Red** (triangle): `#E8637A` → `#C23A5C`
- **Teal**: `#2dd4bf`
- **Deep Blue**: `#1e3a8a`
- **Brand gradient for text/UI**: `linear-gradient(135deg, #E8637A 0%, #2dd4bf 50%, #1e3a8a 100%)`

## Plan

### 1. Copy logo image to project
Copy the uploaded image to `src/assets/tkween-logo.png` for use in the navbar.

### 2. Update `TkweenLogo.tsx`
Replace the SVG-only component with one that displays the actual logo image (`import logo from '@/assets/tkween-logo.png'`). Keep `size` prop for scaling. For navbar use, show the image at appropriate height. For full display (login page), show larger with subtitle.

### 3. Update `src/lib/brand.ts` — new color palette
```
GRAD = 'linear-gradient(135deg, #E8637A 0%, #2dd4bf 50%, #1e3a8a 100%)'
GRAD_START = '#E8637A'   (pink/coral)
GRAD_MID = '#2dd4bf'     (teal)
GRAD_END = '#1e3a8a'     (deep blue)
```

### 4. Update `src/index.css` — CSS variables
Update `:root` variables to match the new tri-color gradient. Update `--accent` to `#2dd4bf`, add `--accent-pink: #E8637A`. Background stays dark black (`#000000` / `#0a0a0a`).

### 5. Update `src/pages/PublicSite.tsx`
Replace all ~30 occurrences of `#FF4500` with the new brand colors:
- Accent labels/tags → teal `#2dd4bf`
- Buttons/CTAs → gradient background
- Hover borders → gradient border style
- Stats numbers → gradient text
- Hero subtitle → gradient text
- WhatsApp button → gradient background instead of green

### 6. Update `src/components/VideoSections.tsx`
Replace `#FF4500` references with brand teal/gradient.

### 7. Update `src/pages/ContactFull.tsx`
Replace `#FF4500` with brand colors.

### 8. Update `src/components/Navbar.tsx`
Already uses `brand.ts` imports — will automatically pick up new gradient. Verify quote button uses gradient.

### 9. Update `src/components/WhatsAppButton.tsx`
Change from green `#25d366` to a gradient circle matching the brand identity.

### 10. Fix build errors
- Make `title` optional in `VideoModal.tsx` (remove from required props or default it)
- This fixes the TS2741 errors in `VideoSections.tsx` line 122 and `PublicSite.tsx` line 216

### 11. Update admin pages accent colors
Admin pages use `GRAD_START` from `brand.ts` — they'll automatically update. The `#FF4500` hardcoded in `AdminVideos.tsx` and other admin files needs replacement with brand imports.

### Files modified:
- `src/assets/tkween-logo.png` (new — copied from upload)
- `src/components/TkweenLogo.tsx`
- `src/lib/brand.ts`
- `src/index.css`
- `src/pages/PublicSite.tsx`
- `src/components/VideoSections.tsx`
- `src/components/VideoModal.tsx`
- `src/pages/ContactFull.tsx`
- `src/components/WhatsAppButton.tsx`
- `src/pages/admin/AdminVideos.tsx` (replace hardcoded `#FF4500`)

