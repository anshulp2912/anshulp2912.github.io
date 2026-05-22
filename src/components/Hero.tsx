'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'

const STATS = [
  { prefix: '> ', text: 'SDE II @ AWS' },
  { prefix: '> ', text: '3 yrs cloud infra' },
  { prefix: '> ', text: '20K+ devs at launch' },
  { prefix: '> ', text: '40% perf improvement' },
]

export function Hero() {
  const prefersReduced = useReducedMotion()
  const [scrolledPast, setScrolledPast] = useState(false)
  const [visibleStats, setVisibleStats] = useState<number[]>(
    prefersReduced ? STATS.map((_, i) => i) : []
  )
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolledPast(latest > 100)
  })

  useEffect(() => {
    if (prefersReduced) {
      setVisibleStats(STATS.map((_, i) => i))
      return
    }
    const timers = STATS.map((_, i) =>
      setTimeout(
        () => setVisibleStats((prev) => [...prev, i]),
        800 + i * 500
      )
    )
    return () => timers.forEach(clearTimeout)
  }, [prefersReduced])

  const panelAnim = prefersReduced
    ? {}
    : {
        initial: { clipPath: 'inset(0% 100% 0% 0%)' },
        animate: { clipPath: 'inset(0% 0% 0% 0%)' },
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }

  const wordAnim = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { clipPath: 'inset(100% 0% 0% 0%)' },
          animate: { clipPath: 'inset(0% 0% 0% 0%)' },
          transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay },
        }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full flex flex-col lg:flex-row"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Left panel: cream ─────────────────────────────────────── */}
      <motion.div
        className="noise-overlay flex-none lg:w-[45%] w-full flex flex-col justify-center px-10 py-16 lg:py-0 lg:min-h-screen"
        style={{ backgroundColor: '#f0ece3' }}
        {...panelAnim}
      >
        <div className="flex flex-col gap-2">
          {/* Name: ANSHUL */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              {...wordAnim(0.3)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                lineHeight: 1,
                color: '#080808',
                margin: 0,
              }}
            >
              ANSHUL
            </motion.h1>
          </div>

          {/* Name: PATEL */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              {...wordAnim(0.4)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                lineHeight: 1,
                color: '#080808',
                margin: 0,
              }}
            >
              PATEL
            </motion.h1>
          </div>

          {/* Role subtitle */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReduced ? { duration: 0 } : { delay: 0.65, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: '#8892a4',
              marginTop: '0.75rem',
            }}
          >
            Software Development Engineer
          </motion.p>

          {/* Resume button */}
          <motion.a
            href="/Anshul_Patel_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0 } : { delay: 0.75, duration: 0.45 }}
            whileHover={prefersReduced ? {} : { backgroundColor: '#f0ece3', color: '#080808' }}
            style={{
              display: 'inline-block',
              marginTop: '2rem',
              alignSelf: 'flex-start',
              padding: '0.65rem 1.5rem',
              backgroundColor: '#080808',
              color: '#f0ece3',
              border: '1px solid #080808',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background-color 200ms ease, color 200ms ease',
            }}
          >
            Download Resume ↗
          </motion.a>
        </div>
      </motion.div>

      {/* ── Right panel: ink ──────────────────────────────────────── */}
      <div
        className="flex-1 w-full flex items-center justify-center px-8 py-16 lg:py-0 lg:min-h-screen relative overflow-hidden"
        style={{ backgroundColor: '#080808' }}
      >
        {/* Neon glow orb */}
        <motion.div
          aria-hidden="true"
          animate={prefersReduced ? {} : { scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,232,122,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Terminal card */}
        <div
          className="relative z-10 w-full max-w-md rounded-lg overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: '#080808',
          }}
        >
          {/* Emerald top bar */}
          <div
            style={{
              height: 4,
              backgroundColor: '#00e87a',
              borderRadius: '8px 8px 0 0',
            }}
          />

          {/* Terminal content */}
          <div className="p-6 flex flex-col gap-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={prefersReduced ? false : { opacity: 0 }}
                animate={{ opacity: visibleStats.includes(i) ? 1 : 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: '#00e87a' }}>{stat.prefix}</span>
                <span style={{ color: '#fafafa' }}>{stat.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReduced
            ? {}
            : {
                opacity: scrolledPast ? 0 : 1,
                y: scrolledPast ? 8 : [0, 10, 0],
              }
        }
        transition={
          prefersReduced
            ? { duration: 0 }
            : scrolledPast
            ? { duration: 0.3 }
            : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }
        initial={prefersReduced ? false : { opacity: 0 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '1.25rem',
          color: '#8892a4',
          pointerEvents: 'none',
          zIndex: 20,
          opacity: prefersReduced ? 1 : undefined,
        }}
      >
        ↓
      </motion.div>
    </section>
  )
}
