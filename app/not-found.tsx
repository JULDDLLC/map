'use client'

import { motion } from 'framer-motion'
import { Home, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-8xl mb-4 float-animation">🐼</div>
          <motion.div
            className="text-6xl font-bold gradient-text mb-4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold text-white">Oops! Panda Got Lost!</h1>
          <p className="text-white/80 leading-relaxed">
            Looks like Panda wandered off the map and ended up in an unknown location. 
            Don't worry, we'll help you both find your way back to the adventure!
          </p>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-brand-cyan to-brand-gold hover:from-brand-gold hover:to-brand-pink text-black font-bold py-3 rounded-xl transition-all duration-300 hover-glow">
                <Home className="w-5 h-5 mr-2" />
                Return to Map
              </Button>
            </Link>

            <Link href="https://julddmedia.com">
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-white hover:bg-white/10 hover:border-brand-cyan"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Visit JULDD Media
              </Button>
            </Link>
          </div>

          <div className="text-sm text-white/60 space-y-2">
            <p>🗺️ Help Panda navigate back to the journey!</p>
            <p>🎨 Don't forget to collect your digital rewards!</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-xs text-white/40"
        >
          <p>Lost pages happen, but the adventure continues!</p>
          <p>Made with ❤️ by JULDD Media</p>
        </motion.div>
      </div>
    </div>
  )
}