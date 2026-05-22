'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Navigation() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY + 120
      for (const { href } of links) {
        const id = href.slice(1)
        const el = document.getElementById(id)
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActive(id)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <nav className="glass rounded-2xl px-2 py-2 hidden md:flex gap-1 pointer-events-auto">
          {links.map(({ href, label }) => {
            const id = href.slice(1)
            const isActive = active === id
            return (
              <a
                key={href}
                href={href}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                  isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            )
          })}
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden fixed right-4 top-4 glass rounded-xl p-3 text-emerald-400 pointer-events-auto"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 bottom-0 w-64 bg-[#12121a] border-l border-white/10 p-6 pt-16 flex flex-col gap-2"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl font-medium transition-colors"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
