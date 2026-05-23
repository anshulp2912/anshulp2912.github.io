'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const pullQuote = '"I build the infra no one sees, for the products everyone uses."'

const paragraphs = [
  "I'm an SDE II at Amazon Web Services, where I architect cloud infrastructure that powers developer tools used by tens of thousands of engineers. My work lives at the intersection of distributed systems, performance engineering, and product thinking.",
  "Before that, I built materialized view systems, business metrics pipelines, and led operational excellence initiatives at AWS CodeCatalyst. I hold an M.S. in Computer Science from NC State (4.0 GPA) and love working on problems that require both deep systems knowledge and thoughtful product design.",
  "Outside of work, I explore algorithmic trading, contribute to open-source ML tools, and build community products like Lekha — a portfolio tracker for the Indian investing community.",
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const clipPathInitial = prefersReducedMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
  const clipPathFinal = 'inset(0% 0% 0% 0%)'

  return (
    <section
      id="about"
      className="relative py-16 lg:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Giant section counter — desktop only */}
      <div
        className="hidden lg:block absolute left-0 top-1/2 pointer-events-none select-none"
        style={{
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '12rem',
            lineHeight: 1,
            color: '#00e87a',
            opacity: 0.15,
            display: 'block',
          }}
        >
          01
        </span>
      </div>

      {/* Animated two-column content block */}
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
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">
          {/* Left column: pull quote (~40%) */}
          <div className="lg:w-[40%] flex-shrink-0">
            <blockquote>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  lineHeight: 1.3,
                  color: '#f0ece3',
                  margin: 0,
                }}
              >
                {pullQuote}
              </p>
            </blockquote>
          </div>

          {/* Right column: body paragraphs (~60%) */}
          <div className="lg:w-[60%] flex flex-col gap-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#8892a4',
                  lineHeight: 1.75,
                  margin: 0,
                  fontSize: '1rem',
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
