'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAV_ITEMS = [
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
  const [scrolled, setScrolled] = useState(false)
  const prefersReduced = useReducedMotion()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      // rootMargin creates a horizontal band at the center of the viewport.
      // threshold: 0 fires as soon as any part of the section enters that band.
      // This handles very tall sections (e.g. Experience at 500vh) correctly.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const handleLinkClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Desktop top bar */}
      <nav
        aria-label="Primary navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2.5rem',
          height: '56px',
          backgroundColor: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
        className="hidden lg:flex"
      >
        {/* Wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--color-white)',
            letterSpacing: '0.04em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          AP
          <span style={{ color: 'var(--color-neon)', marginLeft: '2px' }}>.</span>
        </button>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV_ITEMS.map(({ label, id }) => {
            const isActive = activeId === id
            return (
              <button
                key={id}
                onClick={() => handleLinkClick(id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-neon)' : 'var(--color-slate)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem 0',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'var(--color-neon)',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 right-5 z-50 lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer p-0"
        aria-label="Open navigation menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ display: 'block', width: '24px', height: '2px', backgroundColor: 'var(--color-neon)' }}
          />
        ))}
      </button>

      {/* Mobile full-screen overlay */}
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
                      : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }
                  }
                >
                  <button
                    onClick={() => handleLinkClick(id)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                      lineHeight: 1,
                      color: activeId === id ? 'var(--color-neon)' : 'var(--color-white)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.1em 0',
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
