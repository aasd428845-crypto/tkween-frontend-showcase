import type { CSSProperties } from 'react'

export const GRAD = 'linear-gradient(135deg, #2dd4bf 0%, #1a9e8f 50%, #0f6e60 100%)'
export const GRAD_START = '#2dd4bf'
export const GRAD_MID = '#1a9e8f'
export const GRAD_END = '#0f6e60'

export const BG = '#040a06'
export const BG_SOFT = '#0a130c'
export const CARD_BG = '#111814'
export const BORDER = '#1c231e'

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
