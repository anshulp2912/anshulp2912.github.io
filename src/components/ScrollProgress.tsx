'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #10b981, #14b8a6)',
      }}
    />
  )
}
