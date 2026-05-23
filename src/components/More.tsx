'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const certGroups = [
  {
    counter: '01',
    category: 'Machine Learning & Deep Learning',
    certs: [
      { name: 'Machine Learning A-Z™: Hands-On Python & R In Data Science', link: 'https://www.udemy.com/certificate/UC-UOB36YIQ/' },
      { name: 'Deep Learning A-Z™: Hands-On Artificial Neural Networks', link: 'https://www.udemy.com/certificate/UC-LYEBNNMI/' },
      { name: 'Build Basic Generative Adversarial Networks (GANs)', link: 'https://coursera.org/share/18885224c465c4215877bee2e5982fed' },
      { name: 'Getting Started with AWS Machine Learning', link: 'https://coursera.org/share/1b29f6b81c060c595702c5eeed28ac2e' },
      { name: 'Named Entity Recognition using LSTMs with Keras', link: 'https://coursera.org/share/a8c70a6090209a78de6f175969776954' },
      { name: 'Object Detection with Amazon Sagemaker', link: 'https://coursera.org/share/0026384556818f612d3e6b574b016358' },
      { name: 'Fundamentals of Reinforcement Learning', link: 'https://coursera.org/share/a772828165bc316ae4eb0f62ced93d0b' },
      { name: 'Deep Reinforcement Learning: Hands-on AI Tutorial in Python', link: 'https://www.udemy.com/certificate/UC-0f502c5c-6eee-438f-aa2c-1481aa920865/' },
    ],
  },
  {
    counter: '02',
    category: 'Data Science',
    certs: [
      { name: 'Tableau 10 A-Z: Hands-On Tableau Training For Data Science', link: 'https://www.udemy.com/certificate/UC-5G8UTYCL/' },
      { name: 'SQL for Data Science', link: 'https://coursera.org/share/609018da2b00ebb868a1c0ad7d76fb6' },
      { name: 'Probability Theory, Statistics and Exploratory Data Analysis', link: 'https://coursera.org/share/1581c00b43a2436de4e1cc4b60f88c5b' },
      { name: 'How to Win a Data Science Competition: Learn from Top Kagglers', link: 'https://coursera.org/share/90a1797d290fdf6a211f657ddf466412' },
    ],
  },
  {
    counter: '03',
    category: 'Software & Tools',
    certs: [
      { name: 'Building Conversational Experiences with Dialogflow', link: 'https://coursera.org/share/2ebd4b7f27a4b2615bd22d9e8ca86f55' },
      { name: 'Create Your First Chatbot with Rasa and Python', link: 'https://coursera.org/share/8bf3e41e606f12073c3c7753600209eb' },
      { name: 'Google Ads for Beginners', link: 'https://coursera.org/share/4402dd49aded4a23bf4889b69aaeeb62' },
    ],
  },
]

const HOBBIES = [
  'Soccer', 'Algo Trading', 'Cricket', 'Chess', 'Badminton',
  'Trekking', 'Baking', 'Photo Editing', 'Video Editing', 'Anime',
]

function CertRow({ group, index }: { group: typeof certGroups[0]; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.5rem, 2vw, 1.5rem)',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {/* Counter */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-neon)',
            letterSpacing: '0.08em',
            flexShrink: 0,
            width: '2rem',
          }}
        >
          {group.counter}
        </span>

        {/* Category name */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
            color: open ? 'var(--color-white)' : 'var(--color-slate)',
            flex: 1,
            transition: 'color 0.25s ease',
          }}
        >
          {group.category}
        </span>

        {/* Count badge — hidden on small screens */}
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-slate)',
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          {group.certs.length} certs
        </span>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{
            display: 'block',
            width: '20px',
            height: '20px',
            flexShrink: 0,
            color: open ? 'var(--color-neon)' : 'var(--color-slate)',
            transition: 'color 0.25s ease',
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" d="M8 2v12M2 8h12" />
          </svg>
        </motion.span>
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                gap: '0.5rem',
                paddingBottom: '2rem',
              }}
            >
              {group.certs.map((cert, i) => (
                <motion.a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,232,122,0.4)'
                    e.currentTarget.style.backgroundColor = 'rgba(0,232,122,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-neon)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-slate)',
                      lineHeight: 1.5,
                    }}
                  >
                    {cert.name}
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      flexShrink: 0,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-neon)',
                      opacity: 0.7,
                    }}
                  >
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function More() {
  return (
    <section
      id="more"
      style={{ backgroundColor: 'var(--color-ink)' }}
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-16"
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--color-slate)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            06 — CREDENTIALS
          </p>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--color-white)',
            marginBottom: '3rem',
            lineHeight: 1.1,
          }}
        >
          15 certifications
          <br />
          <span style={{ color: 'var(--color-slate)', fontWeight: 400, fontSize: '0.55em' }}>
            across ML, data science, and software
          </span>
        </h2>

        {/* Accordion rows */}
        {certGroups.map((group, i) => (
          <CertRow key={group.category} group={group} index={i} />
        ))}

        {/* Last border */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

        {/* Interests */}
        <div style={{ marginTop: '3.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--color-slate)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            INTERESTS
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {HOBBIES.map((hobby) => (
              <span
                key={hobby}
                style={{
                  padding: '0.35rem 0.9rem',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-body)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--color-white)',
                  letterSpacing: '0.02em',
                }}
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
