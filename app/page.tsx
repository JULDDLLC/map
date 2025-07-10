'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import CustomCursor from '@/components/CustomCursor'
import InteractiveMap from '@/components/InteractiveMap'
import PinForm from '@/components/PinForm'
import RewardModal from '@/components/RewardModal'
import Leaderboard from '@/components/Leaderboard'
import PandaMascot from '@/components/PandaMascot'

const Ticker = dynamic(() => import('@/components/Ticker'), { ssr: false })

export default function Home() {
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [rewardData, setRewardData] = useState({
    nickname: '',
    city: '',
    state: '',
    hasEmail: false
  })

  const handlePinSuccess = (nickname: string, city: string, state: string, hasEmail: boolean = false) => {
    setRewardData({ nickname, city, state, hasEmail })
    setShowRewardModal(true)
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Ticker />
      <PandaMascot />
      <Toaster position="top-center" richColors />
      
      <main className="pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 gradient-text"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              Where's Panda? 🐼
            </motion.h1>
            <motion.p 
              className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Help Panda explore every corner of the USA! Pin your city and watch as Panda travels 
              from coast to coast, collecting memories and making friends along the way.
            </motion.p>
            <motion.div
              className="text-sm text-white/60 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>🎁 Instant digital rewards • 🗺️ Real-time journey tracking • 🏆 State leaderboards</p>
              <p className="text-xs">Julie sees you snooping in here. It's okay Panda approves ;)</p>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InteractiveMap />
          </motion.div>

          {/* Form and Leaderboard Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
                Add Your Pin! 📍
              </h2>
              <PinForm onSuccess={handlePinSuccess} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
                Top States 🏆
              </h2>
              <Leaderboard />
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              {
                icon: '🎨',
                title: 'Instant Rewards',
                description: 'Download unique coloring sheets and digital postcards right away!'
              },
              {
                icon: '🗺️',
                title: 'Real-Time Journey',
                description: 'Watch Panda travel across the USA as more kids join the adventure!'
              },
              {
                icon: '🏆',
                title: 'State Challenge',
                description: 'Help your state climb the leaderboard and become Panda\'s favorite!'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center hover-glow"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.footer
            className="text-center text-white/60 text-sm space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>Made with ❤️ by <span className="text-brand-cyan">JULDD Media</span></p>
            <div className="space-x-4">
              <a href="/terms" className="hover:text-brand-cyan transition-colors">Terms of Service</a>
              <a href="/privacy" className="hover:text-brand-cyan transition-colors">Privacy Policy</a>
              <a href="/admin" className="hover:text-brand-cyan transition-colors">Admin</a>
            </div>
          </motion.footer>
        </div>
      </main>

      <RewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        nickname={rewardData.nickname}
        city={rewardData.city}
        state={rewardData.state}
        hasEmail={rewardData.hasEmail}
      />
    </div>
  )
}