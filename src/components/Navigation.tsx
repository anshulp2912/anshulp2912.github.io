'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Hero', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Education', id: 'education' },
  { label: 'More', id: 'more' },
  { label: 'Contact', id: 'contact' },
]

export function Navigation() {
  const [activeId, setActiveId] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
    })

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const handleLinkClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className="fixed left-6 top-0 bottom-0 z-50 hidden lg:flex flex-col justify-center gap-6 pointer-events-auto"
        aria-label="Primary navigation"
      >
        {NAV_ITEMS.map(({ label, id }) => {
          const isActive = activeId === id
          return (
            <button
              key={id}
              onClick={() => handleLinkClick(id)}
              className="flex items-center gap-2 group bg-transparent border-none cursor-pointer p-0"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              aria-label={`Navigate to ${label}`}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-neon)' : 'var(--color-slate)',
                  transition: 'color 0.25s ease',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  backgroundColor: isActive ? 'var(--color-neon)' : 'var(--color-slate)',
                  transition: 'background-color 0.25s ease',
                }}
              />
            </button>
          )
        })}
      </nav>

      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-5 right-5 z-50 lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer p-0"
        aria-label="Open navigation menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--color-neon)',
            }}
          />
        ))}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 lg:hidden flex flex-col items-center justify-center"
            style={{ backgroundColor: 'var(--color-ink)', zIndex: 100 }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-0"
              aria-label="Close navigation menu"
              style={{ color: 'var(--color-neon)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="flex flex-col items-center gap-4" aria-label="Mobile navigation">
              {NAV_ITEMS.map(({ label, id }, index) => (
                <motion.div
                  key={id}
                  initial={prefersReduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }
                  }
                >
                  <button
                    onClick={() => handleLinkClick(id)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                      lineHeight: 1,
                      color: activeId === id ? 'var(--color-neon)' : 'var(--color-white)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.15em 0',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {label}
                  </button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
