import type { CSSProperties } from 'react'

/* ── الألوان المستخرجة من شعار تكوين ─────────────────────────
   #f87060  → أحمر-مرجاني (قمة المثلث)
   #e03d75  → وردي-ماجنتا (أسفل المثلث / أيقونة التشغيل)
   #2dd4bf  → فيروزي (نص TKWEEN ويمين نص تكوين)
   #1d4ed8  → أزرق داكن (يسار النص العربي)
   ───────────────────────────────────────────────────────── */

export const CORAL     = '#f87060'
export const PINK      = '#e03d75'
export const TEAL      = '#2dd4bf'
export const BLUE_DEEP = '#1d4ed8'

export const GRAD_START = CORAL
export const GRAD_MID   = PINK
export const GRAD_END   = TEAL

export const GRAD      = 'linear-gradient(135deg, #f87060 0%, #e03d75 45%, #2dd4bf 100%)'
export const GRAD_TEXT = 'linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 50%, #2dd4bf 100%)'

export const BG      = '#060606'
export const BG_SOFT = '#0e0e0e'
export const CARD_BG = '#131313'
export const BORDER  = '#1e1e1e'

export const gradText: CSSProperties = {
  background: GRAD,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export const gradTextBlue: CSSProperties = {
  background: GRAD_TEXT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export const gradBg: CSSProperties = { background: GRAD }

export const gradBorder = (bgColor = BG): CSSProperties => ({
  border: '1px solid transparent',
  background: `linear-gradient(${bgColor}, ${bgColor}) padding-box, ${GRAD} border-box`,
})

export function applyGradText(el: HTMLElement) {
  el.style.background = GRAD
  el.style.setProperty('-webkit-background-clip', 'text')
  el.style.setProperty('-webkit-text-fill-color', 'transparent')
  el.style.backgroundClip = 'text'
  el.style.color = ''
}

export function removeGradText(el: HTMLElement, resetColor = '#fff') {
  el.style.background = ''
  el.style.setProperty('-webkit-background-clip', '')
  el.style.setProperty('-webkit-text-fill-color', '')
  el.style.backgroundClip = ''
  el.style.color = resetColor
}

export function applyGradBg(el: HTMLElement) {
  el.style.background = GRAD
  el.style.color = '#fff'
}

export function removeGradBg(el: HTMLElement, resetBg = 'transparent', resetColor = TEAL) {
  el.style.background = resetBg
  el.style.color = resetColor
}
