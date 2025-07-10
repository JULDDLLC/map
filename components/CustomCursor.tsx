'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.tagName === 'BUTTON' || 
                         target.tagName === 'A' || 
                         target.getAttribute('role') === 'button' ||
                         target.style.cursor === 'pointer' ||
                         target.closest('button') ||
                         target.closest('a')
      setIsPointer(isClickable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      className={`fixed w-5 h-5 rounded-full pointer-events-none z-50 ${
        isPointer ? 'bg-gradient-to-r from-brand-gold to-brand-pink scale-150' : 'bg-gradient-to-r from-brand-cyan to-brand-pink'
      }`}
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        boxShadow: isPointer 
          ? '0 0 20px rgba(255, 215, 0, 0.8)' 
          : '0 0 15px rgba(0, 255, 240, 0.8)'
      }}
      animate={{
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28
      }}
    />
  )
}