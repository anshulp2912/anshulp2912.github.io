'use client'

import React from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface ClipRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export default function ClipReveal({ children, className, delay = 0, stagger = false }: ClipRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '0px', once: true })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  if (stagger && typeof children === 'string') {
    const words = children.split(' ')
    return (
      <div ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.25em' }}>
        {words.map((word, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(100% 0% 0% 0%)' }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: delay + i * 0.06,
              }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(100% 0% 0% 0%)' }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
