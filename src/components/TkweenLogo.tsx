import React from 'react'
import logo from '@/assets/tkween-logo.png'

export default function TkweenLogo({
  size = 44,
  showText = true,
  showSubtitle = false,
}: {
  size?: number
  showText?: boolean
  showSubtitle?: boolean
}) {
  return (
    <img
      src={logo}
      alt="TKWEEN"
      style={{
        height: size,
        width: 'auto',
        objectFit: 'contain',
      }}
    />
  )
}
