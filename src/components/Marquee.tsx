'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface MarqueeProps {
  children: React.ReactNode
  direction?: 'left' | 'right'
  speed?: number
  className?: string
}

export default function Marquee({ children, direction = 'left', speed = 30, className }: MarqueeProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <div
        className={className}
        style={{
          overflow: 'hidden',
          display: 'flex',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>{children}</div>
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <motion.div
        style={{ display: 'flex', flexWrap: 'nowrap', willChange: 'transform' }}
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
