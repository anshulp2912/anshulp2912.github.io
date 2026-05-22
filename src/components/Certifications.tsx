'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const certGroups = [
  {
    category: 'Machine Learning and Deep Learning',
    certs: [
      { name: 'Machine Learning A-Z™: Hands-On Python & R In Data Science', issuer: 'Udemy', link: 'https://www.udemy.com/certificate/UC-UOB36YIQ/' },
      { name: 'Deep Learning A-Z™: Hands-On Artificial Neural Networks', issuer: 'Udemy', link: 'https://www.udemy.com/certificate/UC-LYEBNNMI/' },
      { name: 'Build Basic Generative Adversarial Networks (GANs)', issuer: 'Coursera', link: 'https://coursera.org/share/18885224c465c4215877bee2e5982fed' },
      { name: 'Getting Started with AWS Machine Learning', issuer: 'Coursera', link: 'https://coursera.org/share/1b29f6b81c060c595702c5eeed28ac2e' },
      { name: 'Named Entity Recognition using LSTMs with Keras', issuer: 'Coursera', link: 'https://coursera.org/share/a8c70a6090209a78de6f175969776954' },
      { name: 'Object Detection with Amazon Sagemaker', issuer: 'Coursera', link: 'https://coursera.org/share/0026384556818f612d3e6b574b016358' },
      { name: 'Fundamentals of Reinforcement Learning', issuer: 'Coursera', link: 'https://coursera.org/share/a772828165bc316ae4eb0f62ced93d0b' },
      { name: 'Deep Reinforcement Learning: Hands-on AI Tutorial in Python', issuer: 'Udemy', link: 'https://www.udemy.com/certificate/UC-0f502c5c-6eee-438f-aa2c-1481aa920865/' },
    ],
  },
  {
    category: 'Data Science',
    certs: [
      { name: 'Tableau 10 A-Z: Hands-On Tableau Training For Data Science', issuer: 'Udemy', link: 'https://www.udemy.com/certificate/UC-5G8UTYCL/' },
      { name: 'SQL for Data Science', issuer: 'Coursera', link: 'https://coursera.org/share/609018da2b00ebb868a1c0ad7d76fb6' },
      { name: 'Probability Theory, Statistics and Exploratory Data Analysis', issuer: 'Coursera', link: 'https://coursera.org/share/1581c00b43a2436de4e1cc4b60f88c5b' },
      { name: 'How to Win a Data Science Competition: Learn from Top Kagglers', issuer: 'Coursera', link: 'https://coursera.org/share/90a1797d290fdf6a211f657ddf466412' },
    ],
  },
  {
    category: 'Software and Tools',
    certs: [
      { name: 'Building Conversational Experiences with Dialogflow', issuer: 'Coursera', link: 'https://coursera.org/share/2ebd4b7f27a4b2615bd22d9e8ca86f55' },
      { name: 'Create Your First Chatbot with Rasa and Python', issuer: 'Coursera', link: 'https://coursera.org/share/8bf3e41e606f12073c3c7753600209eb' },
      { name: 'Google Ads for Beginners', issuer: 'Coursera', link: 'https://coursera.org/share/4402dd49aded4a23bf4889b69aaeeb62' },
    ],
  },
]

export function Certifications() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" ref={ref} className="relative py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Certifications</h2>
        </motion.div>

        <div className="space-y-6">
          {certGroups.map((group, gi) => (
            <motion.div
              key={gi}
              className="glass glass-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.08)]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1, ease: 'easeOut' }}
            >
              <h3 className="text-slate-100 font-semibold text-base text-center mb-4 pb-3 border-b border-white/10">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.certs.map((cert, ci) => (
                  <li key={ci}>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-slate-300 text-sm leading-6 hover:text-emerald-400 transition-colors group"
                    >
                      <span className="text-emerald-500 mt-1 flex-shrink-0">›</span>
                      <span>{cert.name}</span>
                      <span className="text-slate-500 flex-shrink-0">— {cert.issuer}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
