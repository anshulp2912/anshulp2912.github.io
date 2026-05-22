'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const jobs = [
  {
    company: 'Amazon Web Services',
    role: 'Software Development Engineer II',
    date: 'October 2024 – April 2026',
    bullets: [
      "Architected Kiro's complete metering and billing infrastructure from zero, including API Gateway ingestion, DynamoDB aggregation with stream-based triggers, EventBridge-scheduled limit evaluation, and batch delivery to AWS Metering, scaling to 20,000 developers at re:Invent 2025 with zero billing incidents on launch day.",
      'Engineered a high-frequency throttling service using Lambda and Redis Serverless to enforce token usage limits across 5-minute and 1-hour windows, achieving p50 latency under 1ms after benchmarking Redis over DynamoDB\'s transactional write latency at throttle-check scale.',
      "Owned onboarding flows and 6 third-party integrations end-to-end as responsible for the full lifecycle of AWS's first autonomous AI development agent.",
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Software Development Engineer I',
    date: 'February 2023 – September 2024',
    bullets: [
      'Architected materialized view processing enhancements including reverse relationships, one-to-many views, and V2 rearchitecture with resource association integration, enabling complex document aggregation and resource link traversal for AWS CodeCatalyst teams while improving performance by 40%.',
      'Established full ownership of business metrics infrastructure by implementing cross-account S3 replication, operational tooling, monitoring, and event processing integration, ensuring reliable data pipeline operations for CodeCatalyst\'s business intelligence capabilities.',
      'Led operational excellence and mentorship initiatives through weekly 1:1s with new engineers, ORR/COE documentation, and intern project support including end-to-end tracing dashboard development, achieving 62% operational backlog reduction.',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Software Development Engineer Intern',
    date: 'May 2022 – August 2022',
    bullets: [
      'Utilized TypeScript to develop a JSON Schema Linter CLI, which provided authors with guidance on best practices and resulted in a 70% reduction in review labor hours.',
      'Developed a Java SDK and integration tests for the AWS CodeCatalyst Eventing System.',
    ],
  },
  {
    company: 'North Carolina State University',
    role: 'IT Assistant',
    date: 'August 2021 – December 2022',
    bullets: [
      'Assisted students, faculty, and staff with technical support and troubleshooting for computers, printers, and other hardware and software in the Student Center.',
      'Maintained inventory, configured equipment for events, and supported audio-visual systems.',
    ],
  },
  {
    company: 'CloudOffis',
    role: 'Associate Engineer',
    date: 'May 2020 – April 2021',
    bullets: [
      'Automated extraction of relevant data from SMSF documents, yielding up to 80% reduction of work time per document.',
      'Transformed classification model using Active Learning techniques to detect and sustain both concept drift and data drift.',
      'Implemented dynamic multiprocessing in the pipeline, achieving a 30% reduction in process time.',
    ],
  },
  {
    company: 'Knowarth Technologies',
    role: 'Machine Learning Intern',
    date: 'January 2020 – May 2020',
    bullets: [
      'Developed a multi-class classification model using Ensemble techniques for 1000+ unstructured SMSF documents distributed over 30 classes, attaining over 95% accuracy.',
      'Orchestrated migration of REST-based APIs to a cloud-based distributed system using AWS SQS and S3.',
      'Evaluated YOLOv3, YOLOv4, RetinaNet, CascadeNet, and Detectron2 for borderless table detection.',
    ],
  },
  {
    company: 'Knowarth Technologies',
    role: 'Project Intern',
    date: 'May 2019 – June 2019',
    bullets: [
      'Spearheaded a proof of concept model for extracting page location of keywords from Australian SMSF documents.',
      'Implemented a Flask Restplus API with Swagger UI connected to MySQL Database.',
    ],
  },
  {
    company: 'Speech Research Group, Nirma University',
    role: 'Research Assistant',
    date: 'January 2019 – May 2020',
    bullets: [
      'Worked on Speech Processing and Audio Analysis Research Projects using Machine Learning and Deep Learning under Professor Sapan Mankad.',
    ],
  },
]

function TimelineCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Dot */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#0a0a0f] z-10 mt-5"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.08, type: 'spring', stiffness: 400, damping: 20 }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="glass glass-hover rounded-2xl p-6 mb-8 flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.08)]"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-slate-100 font-semibold text-lg">{job.company}</h3>
            <p className="text-emerald-400 font-medium text-sm mt-0.5">{job.role}</p>
          </div>
          <span className="text-slate-400 text-sm font-medium whitespace-nowrap">{job.date}</span>
        </div>
        <ul className="space-y-2 mt-4">
          {job.bullets.map((b, i) => (
            <li key={i} className="text-slate-300 text-sm leading-7 pl-4 border-l border-emerald-500/20">
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export function Experience() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="section-heading">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[7px] top-5 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />

          {jobs.map((job, i) => (
            <TimelineCard key={i} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
