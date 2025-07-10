'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold gradient-text mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 space-y-6"
        >
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <div className="text-white/80 leading-relaxed space-y-2">
              <p>We collect minimal information to provide our service:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Required:</strong> First name/nickname, city, and state</li>
                <li><strong>Optional:</strong> Parent email address (for reward delivery only)</li>
                <li><strong>Automatic:</strong> IP address and device information (for duplicate prevention)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. What We DON'T Collect</h2>
            <div className="text-white/80 leading-relaxed space-y-2">
              <p>We prioritize privacy and safety:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>No last names or full names</li>
                <li>No precise location data or GPS coordinates</li>
                <li>No phone numbers or addresses</li>
                <li>No social media profiles</li>
                <li>No tracking cookies or advertising identifiers</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <div className="text-white/80 leading-relaxed space-y-2">
              <p>Your information is used exclusively for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Displaying your pin on the interactive map</li>
                <li>Sending digital rewards via email (if provided)</li>
                <li>Preventing duplicate submissions</li>
                <li>Generating aggregate statistics (anonymized)</li>
                <li>Moderating content for appropriateness</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
            <p className="text-white/80 leading-relaxed">
              We do not sell, trade, or share your personal information with third parties. 
              The only information visible to other users is your first name/nickname and 
              city/state combination on the public map.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Email Communication</h2>
            <p className="text-white/80 leading-relaxed">
              If you provide a parent email address, we may send:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-white/80">
              <li>Digital reward delivery (coloring sheets, postcards)</li>
              <li>Occasional updates about new features or rewards</li>
              <li>You can unsubscribe from emails at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <p className="text-white/80 leading-relaxed">
              We implement appropriate security measures to protect your information, including 
              encryption, secure servers, and regular security audits. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
            <p className="text-white/80 leading-relaxed">
              Our service is designed for families with children. We comply with COPPA (Children's 
              Online Privacy Protection Act) by collecting minimal information and requiring parental 
              consent for any email communication with children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
            <p className="text-white/80 leading-relaxed">
              We retain your information only as long as necessary to provide our service. 
              You may request deletion of your pin and associated data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Your Rights</h2>
            <div className="text-white/80 leading-relaxed space-y-2">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of email communications</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="text-white/80 leading-relaxed">
              If you have questions about this Privacy Policy or would like to exercise your rights, 
              please contact JULDD Media through our main website at julddmedia.com.
            </p>
          </section>

          <section className="pt-6 border-t border-white/10">
            <p className="text-sm text-white/60 italic">
              This Privacy Policy may be updated periodically. We will notify users of any 
              significant changes via email or through our website.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}