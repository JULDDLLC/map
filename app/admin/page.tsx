'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase, Pin } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, CheckCircle, XCircle, Eye, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminPage() {
  const [pins, setPins] = useState<Pin[]>([])
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    todayCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPins()
    fetchStats()
  }, [])

  const fetchPins = async () => {
    try {
      // Demo mode - return empty pins
      setPins([])
    } catch (error) {
      console.error('Error fetching pins:', error)
      toast.error('Failed to load pins')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Demo mode - return empty stats
      setStats({
        total: 0,
        approved: 0,
        pending: 0,
        todayCount: 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleApprove = async (pinId: string) => {
    try {
      const { error } = await supabase
        .from('pins')
        .update({ approved: true })
        .eq('id', pinId)

      if (error) throw error

      setPins(prev => prev.map(pin => 
        pin.id === pinId ? { ...pin, approved: true } : pin
      ))
      toast.success('Pin approved')
    } catch (error) {
      console.error('Error approving pin:', error)
      toast.error('Failed to approve pin')
    }
  }

  const handleReject = async (pinId: string) => {
    try {
      const { error } = await supabase
        .from('pins')
        .update({ approved: false })
        .eq('id', pinId)

      if (error) throw error

      setPins(prev => prev.map(pin => 
        pin.id === pinId ? { ...pin, approved: false } : pin
      ))
      toast.success('Pin rejected')
    } catch (error) {
      console.error('Error rejecting pin:', error)
      toast.error('Failed to reject pin')
    }
  }

  const handleDelete = async (pinId: string) => {
    if (!confirm('Are you sure you want to delete this pin?')) return

    try {
      const { error } = await supabase
        .from('pins')
        .delete()
        .eq('id', pinId)

      if (error) throw error

      setPins(prev => prev.filter(pin => pin.id !== pinId))
      toast.success('Pin deleted')
    } catch (error) {
      console.error('Error deleting pin:', error)
      toast.error('Failed to delete pin')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/60">Manage pins and view analytics</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Total Pins', value: stats.total, icon: Eye, color: 'text-blue-400' },
            { title: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-green-400' },
            { title: 'Pending', value: stats.pending, icon: XCircle, color: 'text-yellow-400' },
            { title: 'Today', value: stats.todayCount, icon: BarChart3, color: 'text-purple-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-white/60">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pins Table */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">All Pins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pins.map((pin) => (
                <motion.div
                  key={pin.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-white">{pin.nickname}</span>
                      <Badge variant={pin.approved ? 'default' : 'secondary'}>
                        {pin.approved ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60">
                      {pin.city}, {pin.state}
                    </p>
                    <p className="text-xs text-white/40">
                      {new Date(pin.created_at).toLocaleDateString()} • 
                      {pin.parent_email ? ' Has Email' : ' No Email'}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!pin.approved && (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(pin.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    
                    {pin.approved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(pin.id)}
                        className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(pin.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              
              {pins.length === 0 && (
                <div className="text-center py-12 text-white/60">
                  <Eye className="w-12 h-12 mx-auto mb-4" />
                  <p>No pins yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}