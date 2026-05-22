'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const prefersReduced = useReducedMotion()

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 })

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rawRotateY.set(dx * 12)
    rawRotateX.set(-dy * 12)
  }

  const onMouseLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <div
      className={className}
      style={{ perspective: '1200px' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
