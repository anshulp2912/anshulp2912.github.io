'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function Cursor() {
  const prefersReduced = useReducedMotion()
  const [isTouch, setIsTouch] = useState<boolean | null>(null)
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const x = useSpring(rawX, { stiffness: 150, damping: 15 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (prefersReduced || isTouch) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 10)
      rawY.set(e.clientY - 10)
    }

    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-magnetic]')) setHovered(true)
    }

    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-magnetic]')) setHovered(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter, true)
    document.addEventListener('mouseleave', onLeave, true)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter, true)
      document.removeEventListener('mouseleave', onLeave, true)
    }
  }, [prefersReduced, isTouch, rawX, rawY])

  if (prefersReduced || isTouch === null || isTouch) return null

  return (
    <motion.div
      style={{
        x,
        y,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '50%',
        border: '2px solid #00e87a',
        backgroundColor: hovered ? 'rgba(16,185,129,0.2)' : 'transparent',
      }}
      animate={{
        width: hovered ? 80 : 20,
        height: hovered ? 80 : 20,
        marginLeft: hovered ? -30 : 0,
        marginTop: hovered ? -30 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    />
  )
}
