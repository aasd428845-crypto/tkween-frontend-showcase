import type { CSSProperties } from 'react'

export const GRAD = 'linear-gradient(135deg, #E8637A 0%, #2dd4bf 50%, #1e3a8a 100%)'
export const GRAD_START = '#E8637A'
export const GRAD_MID = '#2dd4bf'
export const GRAD_END = '#1e3a8a'

export const BG = '#000000'
export const BG_SOFT = '#0a0a0a'
export const CARD_BG = '#111111'
export const BORDER = '#1a1a1a'

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

export function removeGradBg(el: HTMLElement, resetBg = 'transparent', resetColor = GRAD_START) {
  el.style.background = resetBg
  el.style.color = resetColor
}
