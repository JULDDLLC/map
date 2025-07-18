'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Trophy, MapPin } from 'lucide-react'

interface StateStats {
  state: string
  count: number
  rank: number
}

export default function Leaderboard() {
  const [stats, setStats] = useState<StateStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    
    // Real-time updates disabled in demo mode
    // const channel = supabase
    //   .channel('pins')
    //   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pins' }, () => {
    //     fetchStats()
    //   })
    //   .subscribe()

    // return () => {
    //   supabase.removeChannel(channel)
    // }
  }, [])

  const fetchStats = async () => {
    try {
      // Demo mode - return empty stats
      setStats([])
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-brand-gold'
    if (rank === 2) return 'text-gray-300'
    if (rank === 3) return 'text-orange-400'
    return 'text-brand-cyan'
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return '🏆'
  }

  if (loading) {
    return (
      <div className="glass-card p-6 w-full max-w-md mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-white/10 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="glass-card p-6 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-center mb-6">
        <Trophy className="w-6 h-6 text-brand-gold mr-2" />
        <h2 className="text-xl font-bold gradient-text">State Leaderboard</h2>
      </div>

      {stats.length === 0 ? (
        <div className="text-center text-white/60">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p>No pins yet! Be the first to help Panda explore!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.state}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getRankIcon(stat.rank)}</span>
                <div>
                  <p className="font-medium text-white">{stat.state}</p>
                  <p className="text-sm text-white/60">{stat.count} pins</p>
                </div>
              </div>
              <div className={`text-lg font-bold ${getRankColor(stat.rank)}`}>
                #{stat.rank}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center text-xs text-white/60">
        <p>🏆 Top 10 states by pin count</p>
        <p>Updated in real-time!</p>
      </div>
    </motion.div>
  )
}