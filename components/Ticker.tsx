'use client'

import { useEffect, useState } from 'react'
import { supabase, Pin } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function Ticker() {
  const [pins, setPins] = useState<Pin[]>([])
  const [totalPins, setTotalPins] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set window width after component mounts
    setWindowWidth(window.innerWidth)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    
    fetchRecentPins()
    
    // Real-time updates disabled in demo mode
    // const channel = supabase
    //   .channel('pins')
    //   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pins' }, (payload) => {
    //     const newPin = payload.new as Pin
    //     if (newPin.approved) {
    //       setPins(prev => [newPin, ...prev.slice(0, 9)])
    //       setTotalPins(prev => prev + 1)
    //     }
    //   })
    //   .subscribe()

    return () => {
      window.removeEventListener('resize', handleResize)
      // supabase.removeChannel(channel)
    }
  }, [])

  const fetchRecentPins = async () => {
    // Demo mode - return empty pins
    setPins([])
    setTotalPins(0)
  }

  const tickerItems = pins.map(pin => 
    `🐼 Panda visited ${pin.city}, ${pin.state}!`
  )

  if (totalPins > 0) {
    tickerItems.unshift(`🗺️ ${totalPins} cities visited so far!`)
  }

  // Don't render until we have window width
  if (windowWidth === 0) {
    return null
  }
  return (
    <motion.div 
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-brand-cyan/20 via-brand-gold/20 to-brand-pink/20 backdrop-blur-md border-b border-white/10 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-hidden whitespace-nowrap py-2">
        <motion.div 
          className="inline-block text-sm font-medium text-white"
          animate={{ x: [windowWidth, -windowWidth] }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {tickerItems.join(' • ')}
        </motion.div>
      </div>
    </motion.div>
  )
}