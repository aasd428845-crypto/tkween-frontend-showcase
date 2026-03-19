import type { CSSProperties } from 'react'

/* ── نظام الألوان المستخرج من شعار تكوين ──────────────────
   التدرج الرئيسي السينمائي: أزرق عميق → سماوي → فيروزي
   (مستخرج من النص العربي "تكوين" في الشعار)
   #1e40af → #0ea5e9 → #2dd4bf

   لكنة بسيطة فقط: مرجاني وردي (مثلث التشغيل الصغير)
   #f87060 / #e03d75
   ────────────────────────────────────────────────────── */

export const TEAL      = '#2dd4bf'
export const BLUE_DEEP = '#1e40af'
export const BLUE_MID  = '#0ea5e9'
export const CORAL     = '#f87060'   // لكنة صغيرة فقط
export const PINK      = '#e03d75'   // لكنة صغيرة فقط

/* التدرج الرئيسي السينمائي: فيروزي → سماوي → أزرق عميق */
export const GRAD       = 'linear-gradient(135deg, #2dd4bf 0%, #0ea5e9 50%, #1e40af 100%)'
export const GRAD_START = TEAL
export const GRAD_MID   = BLUE_MID
export const GRAD_END   = BLUE_DEEP

/* ألوان الخلفيات (أسود سينمائي نقي) */
export const BG      = '#060606'
export const BG_SOFT = '#0e0e0e'
export const CARD_BG = '#131313'
export const BORDER  = '#1a2a3a'   /* حافة زرقاء خفيفة جداً */

/* ── أنماط CSS جاهزة ──────────────────────────────────── */

export const gradText: CSSProperties = {
  background: GRAD,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export const gradBg: CSSProperties = { background: GRAD }

export const gradBorder = (bgColor = BG): CSSProperties => ({
  border: '1px solid transparent',
  background: `linear-gradient(${bgColor}, ${bgColor}) padding-box, ${GRAD} border-box`,
})

/* توهج وردي-برتقالي خفيف خلف الحدود */
export const WARM_GLOW = `0 0 12px rgba(248,112,96,0.25), 0 0 24px rgba(224,61,117,0.12)`
export const WARM_GLOW_HOVER = `0 0 18px rgba(248,112,96,0.4), 0 0 32px rgba(224,61,117,0.2)`

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
