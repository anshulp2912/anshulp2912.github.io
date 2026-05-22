'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const education = [
  {
    school: 'North Carolina State University',
    degree: 'Masters of Computer Science',
    date: '2021 – 2022',
    details: ['CGPA: 4.0 / 4.0', 'Relevant Courses: Software Engineering, Artificial Intelligence, Database Management System, Computer Networks'],
  },
  {
    school: 'Nirma University',
    degree: 'Bachelor of Technology in Information Technology',
    date: '2016 – 2020',
    details: ['CGPA: 8.57 / 10.0', 'Relevant Courses: Linear Algebra, Data Structures, Theory of Computation, Design and Analysis of Algorithms, Machine Learning, Information Retrieval Systems, Deep Learning'],
  },
]

const publication = {
  title: 'IFSC: A Database for Indian Folk Songs Classification',
  venue: 'Advances in Intelligent Systems and Computing, Springer Singapore',
  description: 'Presented at the 25th International Symposium on Frontiers of Research in Speech and Music (FRSM 2020), jointly organized by National Institute of Technology, Silchar, India, during 8–9 October 2020.',
}

export function Education() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" ref={ref} className="relative py-28 px-6 bg-[#12121a] dot-grid">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Education</h2>
        </motion.div>

        <div className="space-y-6 mb-20">
          {education.map((ed, i) => (
            <motion.div
              key={i}
              className="glass glass-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.08)]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <h3 className="text-slate-100 font-semibold text-lg">{ed.school}</h3>
                <span className="text-emerald-400 font-semibold text-sm">{ed.date}</span>
              </div>
              <p className="text-slate-400 font-medium text-sm mb-3">{ed.degree}</p>
              {ed.details.map((d, j) => (
                <p key={j} className="text-slate-300 text-sm leading-7">{d}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Publication */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-heading">Publication</h2>
        </motion.div>

        <motion.div
          className="glass glass-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.08)]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-slate-100 font-semibold text-lg mb-1">{publication.title}</h3>
          <p className="text-emerald-400 font-medium text-sm mb-3">{publication.venue}</p>
          <p className="text-slate-300 text-sm leading-7">{publication.description}</p>
        </motion.div>
      </div>
    </section>
  )
}
