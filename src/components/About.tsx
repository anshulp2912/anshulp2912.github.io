'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const paragraphs = [
  "I'm a Software Development Engineer with experience building scalable cloud infrastructure and full-stack applications. Most recently at Amazon Web Services in New York, I led core product infrastructure for Kiro — AWS's autonomous AI development agent — enjoying the challenge of bridging cutting-edge AI with practical developer tools.",
  "My expertise spans full-stack development with TypeScript, Python, and Java, along with deep experience in AWS cloud infrastructure including CDK, Lambda, DynamoDB, and distributed systems. I've architected solutions that improved performance by 40% and scaled platforms to support 20,000+ users at launch.",
  "I'm passionate about Machine Learning, NLP, and building side projects that solve real problems. I hold a Master's in Computer Science from NC State University (4.0 GPA) and love mentoring engineers and driving operational excellence initiatives.",
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 px-6 bg-[#12121a] dot-grid"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="section-heading text-left">About Me</h2>
          </motion.div>

          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="text-slate-300 leading-8 text-[1.05rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
