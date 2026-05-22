'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const hobbies = [
  'Soccer', 'Algo Trading', 'Cricket', 'Chess', 'Badminton',
  'Trekking', 'Baking', 'Photo Editing', 'Video Editing', 'Anime',
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 400, damping: 18 },
  },
}

export function Hobbies() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="hobbies" ref={ref} className="relative py-28 px-6 bg-[#12121a] dot-grid">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Hobbies</h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {hobbies.map((hobby) => (
            <motion.span
              key={hobby}
              variants={item}
              className="px-5 py-2.5 text-sm font-medium text-slate-300 glass rounded-xl border border-white/7 cursor-default select-none transition-all duration-200 hover:bg-emerald-500 hover:text-[#0a0a0f] hover:border-emerald-500 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              {hobby}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
