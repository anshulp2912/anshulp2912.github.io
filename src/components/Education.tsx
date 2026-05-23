'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const prefersReducedMotion = useReducedMotion()

  const clipPathInitial = prefersReducedMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
  const clipPathFinal = 'inset(0% 0% 0% 0%)'

  return (
    <section
      id="education"
      className="noise-overlay relative py-16 lg:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: '#f0ece3' }}
    >
      {/* Giant ghost counter — desktop only */}
      <div
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '10rem',
            lineHeight: 1,
            color: '#080808',
            opacity: 0.08,
            display: 'block',
          }}
        >
          05
        </span>
      </div>

      {/* Clip-path wipe reveal */}
      <motion.div
        ref={ref}
        initial={{ clipPath: clipPathInitial }}
        animate={isInView ? { clipPath: clipPathFinal } : { clipPath: clipPathInitial }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Degree blocks: side-by-side on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Block 1: NC State University */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
                lineHeight: 1.1,
                color: '#080808',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              NC State University
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '1rem',
                color: '#080808',
                margin: 0,
              }}
            >
              M.S. Computer Science
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#8892a4',
                margin: 0,
              }}
            >
              4.0 GPA · 2021–2022
            </p>
          </div>

          {/* Block 2: Nirma University */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
                lineHeight: 1.1,
                color: '#080808',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Nirma University
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '1rem',
                color: '#080808',
                margin: 0,
              }}
            >
              B.Tech Computer Engineering
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#8892a4',
                margin: 0,
              }}
            >
              2016–2020
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
