import type { CSSProperties } from 'react'

/* ── نظام الألوان المستخرج من شعار تكوين ──────────────────
   نص "تكوين": أزرق عميق (#1e40af) → سماوي (#0ea5e9) → فيروزي (#2dd4bf)
   مثلث التشغيل: مرجاني (#f87060) → وردي (#e03d75)
   ────────────────────────────────────────────────────── */

export const TEAL      = '#2dd4bf'
export const BLUE_DEEP = '#1e40af'
export const BLUE_MID  = '#0ea5e9'
export const CORAL     = '#f87060'
export const PINK      = '#e03d75'
export const ORANGE    = '#f97316'

/* التدرج الرئيسي – أفقي من الأزرق العميق إلى الفيروزي (مطابق لنص الشعار) */
export const GRAD = 'linear-gradient(90deg, #1e40af 0%, #0ea5e9 50%, #2dd4bf 100%)'

/* تدرج سينمائي دافئ – يبدأ بلمسة برتقالية ثم ينتقل للتيل والأزرق */
export const GRAD_CINEMATIC = 'linear-gradient(90deg, #f97316 0%, #f87060 8%, #2dd4bf 45%, #0ea5e9 72%, #1e40af 100%)'

/* تدرج مختلط للحدود – برتقالي واضح في الزاوية العلوية → فيروزي → أزرق */
export const MIXED_GRAD = 'linear-gradient(135deg, #f87060 0%, #f97316 20%, #2dd4bf 55%, #1e40af 100%)'

/* تدرج الهوية الدافئة: أحمر → برتقالي (مثلث الشعار) */
export const WARM_GRAD = 'linear-gradient(135deg, #f87060 0%, #f97316 100%)'

export const GRAD_START = TEAL
export const GRAD_MID   = BLUE_MID
export const GRAD_END   = BLUE_DEEP

/* ألوان الخلفيات */
export const BG      = '#060606'
export const BG_SOFT = '#0e0e0e'
export const CARD_BG = '#131313'
export const BORDER  = '#1a2a3a'

/* ── أنماط CSS جاهزة ──────────────────────────────────── */

/* تدرج النص الرئيسي (أزرق عميق → فيروزي) */
export const gradText: CSSProperties = {
  background: GRAD,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

/* تدرج نص سينمائي دافئ (لمسة برتقالية + تيل + أزرق) */
export const cinematicText: CSSProperties = {
  background: GRAD_CINEMATIC,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

/* تدرج النص الدافئ (أحمر → برتقالي) */
export const warmGradText: CSSProperties = {
  background: WARM_GRAD,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export const gradBg: CSSProperties = { background: GRAD }

/* حدود متدرجة مختلطة (برتقالي → فيروزي) */
export const gradBorder = (bgColor = BG): CSSProperties => ({
  border: '1px solid transparent',
  background: `linear-gradient(${bgColor}, ${bgColor}) padding-box, ${MIXED_GRAD} border-box`,
})

/* حدود متدرجة رئيسية */
export const pureBorder = (bgColor = BG): CSSProperties => ({
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
