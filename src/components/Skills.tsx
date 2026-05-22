'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C++',
  'AWS CDK', 'Lambda', 'DynamoDB', 'S3', 'SQS', 'SNS',
  'CloudFormation', 'CloudWatch', 'ECS Fargate', 'KMS',
  'Docker', 'CI/CD Pipelines', 'Node.js', 'Express.js', 'Flask',
  'Next.js', 'React', 'Jest', 'REST APIs', 'GraphQL',
  'Machine Learning', 'Deep Learning', 'Natural Language Processing',
  'TensorFlow', 'Keras', 'Pandas', 'NumPy',
  'PostgreSQL', 'NoSQL', 'Redis', 'Supabase', 'Deno',
  'Git', 'Claude Code', 'Kiro', 'Gemini',
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 20 },
  },
}

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 bg-[#12121a] dot-grid">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Skills</h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={item}
              className="px-4 py-2 text-sm font-medium text-slate-300 glass rounded-lg border border-white/7 cursor-default select-none transition-all duration-200 hover:bg-emerald-500 hover:text-[#0a0a0f] hover:border-emerald-500 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
