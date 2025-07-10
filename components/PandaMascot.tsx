'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PandaMascot() {
  const [isWaving, setIsWaving] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true)
      setTimeout(() => setIsWaving(false), 2000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-30 cursor-pointer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setIsWaving(true)
        setTimeout(() => setIsWaving(false), 2000)
      }}
    >
      <motion.div
        className="text-6xl float-animation"
        animate={{
          rotate: isWaving ? [0, 15, -15, 15, -15, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isWaving ? 3 : 0,
        }}
      >
        🐼
      </motion.div>
      
      <motion.div
        className="absolute -top-12 -left-8 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-black shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isWaving ? 1 : 0, y: isWaving ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        Hi there! 👋
      </motion.div>
    </motion.div>
  )
}