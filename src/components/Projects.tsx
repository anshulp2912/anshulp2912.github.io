'use client'

import { useReducedMotion } from 'framer-motion'
import TiltCard from '@/components/TiltCard'
import ClipReveal from '@/components/ClipReveal'

const projects = [
  {
    title: 'Lekha — Portfolio Tracker',
    description:
      'Community-driven portfolio showcase for the Indian investing community, supporting NSE, BSE, NASDAQ, NYSE, and Crypto with a social follower model and serverless Deno Edge Functions.',
    link: 'https://lekha-in.vercel.app/',
  },
  {
    title: 'MachineHack Hackathons',
    description:
      'Notebooks for MachineHack competitions covering Regression, Classification, Time Series, and Range Prediction in ML and Deep Learning.',
    link: 'https://github.com/anshulp2912/Machine-hack-Codes',
  },
  {
    title: 'BOTAnshul',
    description:
      'Personalized chatbot resume using Rasa, deployed with Heroku Docker for 24×7 accessibility.',
    link: 'https://github.com/anshulp2912/BOTAnshul',
  },
  {
    title: 'automeans',
    description:
      'Python library automating scikit-learn K-Means Clustering by optimising cluster count selection.',
    link: 'https://github.com/anshulp2912/automeans',
  },
  {
    title: 'Handy Cricket',
    description:
      'Computer-vision cricket game using OpenCV and Keras to identify hand signals denoting runs scored.',
    link: 'https://github.com/anshulp2912/handy-cricket',
  },
  {
    title: 'Speaker Diarization',
    description:
      'Framework using pyAudioAnalysis and Hierarchical clustering to identify speakers in conversational audio.',
    link: 'https://github.com/anshulp2912/Speaker-Diarization',
  },
  {
    title: 'Slytherin: Genetic Algorithm Snake',
    description:
      'Genetic Algorithm implementation of Snake using pygame, evolving through generations.',
    link: 'https://github.com/anshulp2912/Slytherin-Game-using-Genetic-Algorithm',
  },
  {
    title: 'Named Entity Recognizer',
    description:
      'Custom NLP model using BiLSTM and BERT to classify text by person, location, money, time, and more.',
    link: 'https://github.com/anshulp2912/Named-Entity-Recognition-Guide',
  },
]

// ----- Card component -----

interface CardProps {
  title: string
  description: string
  link: string
  /** true = cream bg, false = ink bg */
  isCream: boolean
  /** featured = full-height left card, normal = standard mosaic card */
  variant: 'featured' | 'normal'
  delay?: number
  isMobile: boolean
}

function ProjectCard({ title, description, link, isCream, variant, delay = 0, isMobile }: CardProps) {
  const bg = isCream ? '#f0ece3' : '#080808'
  const titleColor = isCream ? '#080808' : '#fafafa'
  const descColor = isCream ? '#8892a4' : '#8892a4'
  const linkBg = isCream ? '#080808' : '#f0ece3'
  const linkText = isCream ? '#f0ece3' : '#080808'
  const minHeight = variant === 'featured' ? (isMobile ? '280px' : '100%') : isMobile ? '180px' : 'auto'

  const cardInner = (
    <div
      className="group relative flex flex-col justify-between p-8 rounded-none transition-all duration-200 hover:scale-[1.02] cursor-pointer w-full h-full"
      style={{
        backgroundColor: bg,
        minHeight,
        borderRadius: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px #00e87a'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Title */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: variant === 'featured' ? '2rem' : '1.1rem',
            lineHeight: 1.2,
            color: titleColor,
            margin: 0,
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.65,
            color: descColor,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      {/* Link button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginTop: '1.5rem',
          padding: '0.45rem 1rem',
          backgroundColor: linkBg,
          color: linkText,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textDecoration: 'none',
          borderRadius: 0,
          width: 'fit-content',
        }}
      >
        ↗ VIEW
      </a>
    </div>
  )

  const wrapped = isMobile ? (
    <ClipReveal delay={delay}>{cardInner}</ClipReveal>
  ) : (
    <TiltCard>{cardInner}</TiltCard>
  )

  return wrapped
}

// ----- Main section -----

export function Projects() {
  const prefersReducedMotion = useReducedMotion()
  // We pass isMobile=false for server render; tilt/clip logic is purely cosmetic
  // and TiltCard/ClipReveal both handle useReducedMotion internally.

  // Featured card (index 0)
  const featured = projects[0]
  // Mosaic cards (indices 1–4)
  const mosaic = projects.slice(1, 5)
  // Additional cards (index 5+)
  const extra = projects.slice(5)

  return (
    <section
      id="projects"
      className="relative py-24 px-6 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Giant ghost counter */}
      <div
        className="absolute top-0 right-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '10rem',
            lineHeight: 1,
            color: '#00e87a',
            opacity: 0.08,
            display: 'block',
          }}
        >
          03
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <p
          className="mb-10"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8892a4',
          }}
        >
          03 PROJECTS
        </p>

        {/* ---- Desktop bento grid (>= 1024px) ---- */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '2px',
          }}
        >
          {/* Featured card — spans 2 rows, col 1 */}
          <div style={{ gridRow: 'span 2', gridColumn: '1' }}>
            <ClipReveal delay={0} className="h-full">
              <TiltCard className="h-full">
                <ProjectCard
                  title={featured.title}
                  description={featured.description}
                  link={featured.link}
                  isCream={true}
                  variant="featured"
                  delay={0}
                  isMobile={false}
                />
              </TiltCard>
            </ClipReveal>
          </div>

          {/* Mosaic cards — 2×2 on the right */}
          {mosaic.map((project, i) => {
            // indices 1–4 in original array → i = 0..3 here
            // original index = i + 1; isCream = odd original index
            const originalIndex = i + 1
            const isCream = originalIndex % 2 !== 0
            return (
              <div key={project.title}>
                <ClipReveal delay={0.1 + i * 0.07}>
                  <TiltCard>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      isCream={isCream}
                      variant="normal"
                      delay={0.1 + i * 0.07}
                      isMobile={false}
                    />
                  </TiltCard>
                </ClipReveal>
              </div>
            )
          })}

          {/* Extra cards — continue same 3-col grid (each spans 1 col) */}
          {extra.map((project, i) => {
            const originalIndex = i + 5
            const isCream = originalIndex % 2 !== 0
            return (
              <div key={project.title}>
                <ClipReveal delay={0.35 + i * 0.07}>
                  <TiltCard>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      isCream={isCream}
                      variant="normal"
                      delay={0.35 + i * 0.07}
                      isMobile={false}
                    />
                  </TiltCard>
                </ClipReveal>
              </div>
            )
          })}
        </div>

        {/* ---- Mobile single column (< 1024px) ---- */}
        <div className="flex flex-col gap-px lg:hidden">
          {projects.map((project, i) => {
            const isCream = i % 2 !== 0
            const variant = i === 0 ? 'featured' : 'normal'
            return (
              <ClipReveal key={project.title} delay={i * 0.05}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  isCream={isCream}
                  variant={variant}
                  delay={i * 0.05}
                  isMobile={true}
                />
              </ClipReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
