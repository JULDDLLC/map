'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

const PROFANITY_FILTER = [
  'damn', 'hell', 'stupid', 'idiot', 'hate', 'kill', 'die', 'dead', 'murder', 'weapon',
  'drug', 'sex', 'porn', 'naked', 'violence', 'blood', 'gore', 'scary', 'fear'
]

interface PinFormProps {
  onSuccess: (nickname: string, city: string, state: string) => void
}

export default function PinForm({ onSuccess }: PinFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nickname: '',
    city: '',
    state: '',
    parentEmail: ''
  })

  const containsProfanity = (text: string) => {
    return PROFANITY_FILTER.some(word => 
      text.toLowerCase().includes(word.toLowerCase())
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate inputs
      if (!formData.nickname || !formData.city || !formData.state) {
        toast.error('Please fill in all required fields')
        return
      }

      // Check for profanity
      if (containsProfanity(formData.nickname) || containsProfanity(formData.city)) {
        toast.error('Please use appropriate language')
        return
      }

      // Get IP address for duplicate prevention
      const ipResponse = await fetch('https://api.ipify.org?format=json')
      const { ip } = await ipResponse.json()

      // Check if IP already has a pin
      const { data: existingPins } = await supabase
        .from('pins')
        .select('id')
        .eq('ip_address', ip)
        .limit(1)

      if (existingPins && existingPins.length > 0) {
        toast.error('You can only submit one pin per device')
        return
      }

      // Insert new pin
      const { error } = await supabase
        .from('pins')
        .insert([{
          nickname: formData.nickname,
          city: formData.city,
          state: formData.state,
          parent_email: formData.parentEmail || null,
          ip_address: ip,
          user_agent: navigator.userAgent,
          approved: true // Auto-approve for now
        }])

      if (error) {
        throw error
      }

      // Success callback
      onSuccess(formData.nickname, formData.city, formData.state)
      
      // Reset form
      setFormData({
        nickname: '',
        city: '',
        state: '',
        parentEmail: ''
      })

      toast.success(`Welcome to Panda's journey, ${formData.nickname}!`)

    } catch (error) {
      console.error('Error submitting pin:', error)
      toast.error('Failed to submit pin. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card p-6 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="nickname" className="text-white mb-2 block">
            Your First Name/Nickname *
          </Label>
          <Input
            id="nickname"
            type="text"
            value={formData.nickname}
            onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
            placeholder="Enter your first name"
            required
            maxLength={50}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-cyan"
          />
        </div>

        <div>
          <Label htmlFor="city" className="text-white mb-2 block">
            City *
          </Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Enter your city"
            required
            maxLength={100}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-cyan"
          />
        </div>

        <div>
          <Label htmlFor="state" className="text-white mb-2 block">
            State *
          </Label>
          <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-brand-cyan">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              {US_STATES.map(state => (
                <SelectItem key={state} value={state} className="text-white hover:bg-white/10">
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="email" className="text-white mb-2 block">
            Parent Email (Optional - for digital rewards)
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.parentEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
            placeholder="parent@example.com"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-cyan"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-brand-cyan to-brand-gold hover:from-brand-gold hover:to-brand-pink text-black font-bold py-3 rounded-xl transition-all duration-300 hover-glow disabled:opacity-50"
        >
          {loading ? 'Adding Pin...' : 'Help Panda Visit My City! 🐼'}
        </Button>
      </div>

      <p className="text-xs text-white/60 mt-4 text-center">
        * One pin per device. By submitting, you agree to our{' '}
        <a href="/terms" className="text-brand-cyan hover:underline">Terms of Service</a> and{' '}
        <a href="/privacy" className="text-brand-cyan hover:underline">Privacy Policy</a>.
      </p>
    </motion.form>
  )
}