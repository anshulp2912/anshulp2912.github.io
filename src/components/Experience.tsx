'use client'

import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import TiltCard from '@/components/TiltCard'
import ClipReveal from '@/components/ClipReveal'

// ─── Data ────────────────────────────────────────────────────────────────────

const jobs = [
  {
    company: 'Amazon Web Services',
    role: 'Software Development Engineer II',
    date: 'Oct 2024 – Apr 2026',
    bullets: [
      "Architected Kiro's complete metering and billing infrastructure from zero, including API Gateway ingestion, DynamoDB aggregation with stream-based triggers, EventBridge-scheduled limit evaluation, and batch delivery to AWS Metering, scaling to 20,000 developers at re:Invent 2025 with zero billing incidents on launch day.",
      'Engineered a high-frequency throttling service using Lambda and Redis Serverless to enforce token usage limits across 5-minute and 1-hour windows, achieving p50 latency under 1ms.',
      "Owned onboarding flows and 6 third-party integrations end-to-end for AWS's first autonomous AI development agent.",
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Software Development Engineer I',
    date: 'Feb 2023 – Sep 2024',
    bullets: [
      'Architected materialized view processing enhancements including reverse relationships, one-to-many views, and V2 rearchitecture, enabling complex document aggregation for AWS CodeCatalyst teams while improving performance by 40%.',
      'Established full ownership of business metrics infrastructure by implementing cross-account S3 replication, operational tooling, monitoring, and event processing integration.',
      'Led operational excellence and mentorship initiatives, achieving 62% operational backlog reduction.',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'SDE Intern',
    date: 'May 2022 – Aug 2022',
    bullets: [
      'Developed a JSON Schema Linter CLI in TypeScript, resulting in 70% reduction in review labor hours.',
      'Developed a Java SDK and integration tests for the AWS CodeCatalyst Eventing System.',
    ],
  },
  {
    company: 'CloudOffis',
    role: 'Associate Engineer',
    date: 'May 2020 – Apr 2021',
    bullets: [
      'Automated extraction from SMSF documents, yielding up to 80% reduction in work time per document.',
      'Transformed classification model using Active Learning to detect concept drift and data drift.',
      'Implemented dynamic multiprocessing, achieving 30% reduction in process time.',
    ],
  },
  {
    company: 'Knowarth Technologies',
    role: 'Machine Learning Intern',
    date: 'Jan 2020 – May 2020',
    bullets: [
      'Developed a multi-class classification model using Ensemble techniques for 1000+ SMSF documents across 30 classes, attaining over 95% accuracy.',
      'Orchestrated migration of REST APIs to a cloud-based distributed system using AWS SQS and S3.',
    ],
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

interface JobCardProps {
  job: (typeof jobs)[0]
  index: number
  isDesktop: boolean
}

function JobCard({ job, index, isDesktop }: JobCardProps) {
  const cardContent = (
    <div
      style={{
        width: isDesktop ? 'clamp(320px, 40vw, 480px)' : '100%',
        flexShrink: 0,
      }}
    >
      {/* Cream header strip */}
      <div
        style={{
          background: '#f0ece3',
          padding: '1rem 1.5rem',
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: '#080808',
            fontSize: '1.1rem',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {job.role}
        </p>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            color: '#080808',
            fontSize: '0.85rem',
            margin: '0.25rem 0 0',
          }}
        >
          {job.company}
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#8892a4',
            fontSize: '0.75rem',
            margin: '0.5rem 0 0',
            textAlign: 'right',
          }}
        >
          {job.date}
        </p>
      </div>

      {/* Ink body */}
      <div
        style={{
          background: '#080808',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem 1.5rem',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {job.bullets.map((bullet, i) => (
            <li
              key={i}
              style={{
                borderLeft: '2px solid #00e87a',
                paddingLeft: '1rem',
                fontFamily: "'Inter', sans-serif",
                color: '#fafafa',
                fontSize: '0.875rem',
                lineHeight: '1.75',
              }}
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  if (isDesktop) {
    // Desktop: TiltCard wraps the card; ClipReveal is not used (horizontal scroll context)
    return (
      <TiltCard>
        {cardContent}
      </TiltCard>
    )
  }

  // Mobile: ClipReveal on each card, no TiltCard
  return (
    <ClipReveal delay={index * 0.1} className="w-full">
      {cardContent}
    </ClipReveal>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Experience() {
  const prefersReduced = useReducedMotion()

  // The outer section — needs enough height to drive horizontal scroll on desktop
  // N cards × 100vh gives enough scroll range; we add one extra vh for breathing room
  const CARD_COUNT = jobs.length

  // Ref for the sticky container (scroll parent for useScroll)
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress [0,1] to an x translation that slides the track fully left
  // We translate from 0 to -(totalWidth - viewport).
  // We approximate: (CARD_COUNT - 1) cards × ~(clamp(320,40vw,480) + gap) pixels.
  // Using a CSS variable-free approach: translate as a percentage of track width
  // useTransform to a string so we can express it in vw units
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(CARD_COUNT - 1) * 42}vw`]
  )

  // On reduced motion or SSR, disable the transform
  const xValue = prefersReduced ? '0vw' : xTranslate

  return (
    <>
      {/* ── Desktop layout ─────────────────────────────────────────────── */}
      <div
        ref={sectionRef}
        id="experience"
        className="hidden lg:block"
        style={{
          height: `${CARD_COUNT * 100}vh`,
          background: '#080808',
        }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Section label */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: '#8892a4',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              zIndex: 10,
            }}
          >
            02 Experience
          </div>

          {/* Horizontal card track */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              paddingLeft: '5vw',
            }}
          >
            <motion.div
              ref={trackRef}
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2vw',
                x: xValue,
              }}
            >
              {jobs.map((job, i) => (
                <JobCard key={i} job={job} index={i} isDesktop={true} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ──────────────────────────────────────────────── */}
      <section
        id="experience"
        className="lg:hidden"
        style={{
          background: '#080808',
          padding: '4rem 1.25rem',
        }}
      >
        {/* Section label */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: '#8892a4',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '2rem',
          }}
        >
          02 Experience
        </div>

        {/* Vertical stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} index={i} isDesktop={false} />
          ))}
        </div>
      </section>
    </>
  )
}
