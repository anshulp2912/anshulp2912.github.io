'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const prefersReduced = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const EMAIL = 'anshulp2912@gmail.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement('textarea')
      el.value = EMAIL
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Clip-path reveal animation (skipped if reduced motion)
  const headlineVariants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
        visible: {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 lg:py-32 px-4 sm:px-6 overflow-hidden text-center"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(0,232,122,0.08) 0%, #080808 60%)',
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-10">
        {/* Headline */}
        <motion.h2
          variants={headlineVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            color: '#fafafa',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          LET&apos;S WORK TOGETHER
        </motion.h2>

        {/* Email — click to copy */}
        <motion.div
          className="relative flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={handleCopyEmail}
            aria-label="Copy email address"
            className="transition-colors duration-200 cursor-pointer"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
              color: '#8892a4',
              background: 'none',
              border: 'none',
              padding: '4px 8px',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#00e87a')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#8892a4')
            }
          >
            {EMAIL}
          </button>

          {/* Toast */}
          <motion.div
            aria-live="polite"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '110%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#080808',
              border: '1px solid #00e87a',
              color: '#00e87a',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.72rem',
              padding: '4px 14px',
              borderRadius: '6px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Copied!
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center flex-wrap"
          style={{ gap: '1.5rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { label: 'GitHub', href: 'https://github.com/anshulp2912' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/anshulp2912' },
            { label: 'Email', href: `mailto:${EMAIL}` },
          ].map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              whileHover={{
                backgroundColor: '#00e87a',
                color: '#080808',
                boxShadow: '0 0 20px rgba(0,232,122,0.4)',
              }}
              transition={{ duration: 0.15 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '48px',
                minHeight: '48px',
                padding: '0 20px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.8rem',
                color: '#00e87a',
                background: '#080808',
                border: '1px solid rgba(0,232,122,0.3)',
                borderRadius: '4px',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              {label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
