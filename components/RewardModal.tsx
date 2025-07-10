'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Download, Mail, Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface RewardModalProps {
  isOpen: boolean
  onClose: () => void
  nickname: string
  city: string
  state: string
  hasEmail: boolean
}

export default function RewardModal({ isOpen, onClose, nickname, city, state, hasEmail }: RewardModalProps) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      // In a real app, this would generate and download a coloring sheet
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Coloring sheet downloaded!')
    } catch (error) {
      toast.error('Failed to download coloring sheet')
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${nickname} helped Panda visit ${city}, ${state}!`,
          text: `I just helped Panda visit ${city}, ${state} on the Where's Panda interactive map!`,
          url: window.location.href
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `I just helped Panda visit ${city}, ${state} on the Where's Panda interactive map! Check it out at ${window.location.href}`
      )
      toast.success('Share link copied to clipboard!')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold gradient-text">
            🎉 Welcome to Panda's Journey! 🐼
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4 float-animation">🐼</div>
            <p className="text-lg text-white mb-2">
              Thanks <span className="font-bold text-brand-gold">{nickname}</span>!
            </p>
            <p className="text-white/80">
              Panda is now exploring <span className="font-bold text-brand-cyan">{city}, {state}</span>!
            </p>
          </motion.div>

          <div className="space-y-3">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-gradient-to-r from-brand-gold to-brand-pink hover:from-brand-pink hover:to-brand-gold text-black font-bold py-3 rounded-xl transition-all duration-300 hover-glow"
            >
              <Download className="w-5 h-5 mr-2" />
              {downloading ? 'Preparing...' : 'Download Coloring Sheet'}
            </Button>

            {hasEmail && (
              <motion.div
                className="flex items-center justify-center space-x-2 text-sm text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Mail className="w-4 h-4" />
                <span>Bonus rewards sent to your email!</span>
              </motion.div>
            )}

            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 hover:border-brand-cyan"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Your Panda Visit!
            </Button>
          </div>

          <div className="text-center text-xs text-white/60">
            <p>🎨 More coloring sheets and rewards coming soon!</p>
            <p>🌟 Keep exploring with Panda!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}