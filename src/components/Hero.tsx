'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const name = 'Anshul Patel'
const subtitle = 'Software Development Engineer · Cloud Infrastructure · Full-Stack'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.4 },
  },
}

const charVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 11, stiffness: 120 },
  },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: '10%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 450,
            height: 450,
            bottom: '10%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.6, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Animated name */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
          aria-label={name}
        >
          {name.split('').map((char, i) =>
            char === ' ' ? (
              <span key={i} className="inline-block w-[0.25em]" />
            ) : (
              <motion.span
                key={i}
                variants={charVariant}
                className="inline-block gradient-text"
              >
                {char}
              </motion.span>
            )
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-slate-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/images/resume.pdf"
          download="Anshul_resume.pdf"
          className="inline-block relative overflow-hidden px-8 py-4 rounded-full border-2 border-emerald-500 text-emerald-400 font-semibold text-sm tracking-wide group"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="relative z-10 group-hover:text-[#0a0a0f] transition-colors duration-300">
            Download Resume
          </span>
          <motion.div
            className="absolute inset-0 bg-emerald-500"
            initial={{ x: '-101%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </motion.a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-11 h-11 rounded-full border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll down"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  )
}
