'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/anshulp2912@gmail.com', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 px-6 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-slate-100 mb-3">Get in Touch</h2>
          <p className="text-slate-400 text-sm">Have a project or opportunity? I'd love to hear from you.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <input
            type="email"
            name="_replyto"
            placeholder="Your email"
            required
            className="w-full px-5 py-4 rounded-xl glass border border-white/10 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all bg-transparent"
          />
          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={5}
            className="w-full px-5 py-4 rounded-xl glass border border-white/10 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all bg-transparent resize-vertical"
          />

          <motion.button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="w-full py-4 rounded-xl font-semibold text-sm text-[#0a0a0f] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent ✓' : 'Send Message'}
          </motion.button>

          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
