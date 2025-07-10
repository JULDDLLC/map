'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center text-brand-cyan hover:text-brand-gold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Link>
          <h1 className="text-4xl font-bold gradient-text mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 space-y-6"
        >
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/80 leading-relaxed">
              By accessing and using the "Where's Panda?" interactive map application (the "Service"), 
              you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              This Service is operated by JULDD Media, a division of JULDD LLC.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
            <p className="text-white/80 leading-relaxed">
              "Where's Panda?" is an interactive map application designed for kids and families to 
              participate in Panda's journey across the United States by pinning their city and state 
              locations. Users can earn digital rewards including coloring sheets and postcards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
            <div className="text-white/80 leading-relaxed space-y-2">
              <p>Users agree to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide accurate information when submitting pins</li>
                <li>Use appropriate language and content</li>
                <li>Not submit multiple pins from the same device/IP address</li>
                <li>Not attempt to manipulate or hack the system</li>
                <li>Respect other users and the community</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Privacy and Data Collection</h2>
            <p className="text-white/80 leading-relaxed">
              We collect minimal information: first name/nickname, city, state, and optionally 
              parent email for reward delivery. We do not collect precise location data, last names, 
              or other personal information. See our Privacy Policy for full details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Digital Rewards</h2>
            <p className="text-white/80 leading-relaxed">
              Digital rewards (coloring sheets, postcards) are provided "as is" for personal, 
              non-commercial use only. JULDD Media reserves the right to modify or discontinue 
              rewards at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Moderation</h2>
            <p className="text-white/80 leading-relaxed">
              All submitted content is subject to moderation and approval. JULDD Media reserves 
              the right to remove, modify, or reject any content that violates these terms or 
              is deemed inappropriate for our family-friendly platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer</h2>
            <p className="text-white/80 leading-relaxed">
              This Service is provided "as is" without warranties of any kind. JULDD Media and 
              JULDD LLC shall not be liable for any damages arising from the use of this Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
            <p className="text-white/80 leading-relaxed">
              For questions about these Terms of Service, please contact us through our main 
              website at julddmedia.com or via the contact information provided there.
            </p>
          </section>

          <section className="pt-6 border-t border-white/10">
            <p className="text-sm text-white/60 italic">
              These terms are subject to change without notice. Continued use of the Service 
              constitutes acceptance of any modifications.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}