'use client'

import Marquee from '@/components/Marquee'

const row1 = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C++',
  'Node.js', 'Express.js', 'Flask', 'Next.js', 'React',
  'REST APIs', 'GraphQL', 'Jest', 'Docker',
]

const row2 = [
  'AWS CDK', 'Lambda', 'DynamoDB', 'S3', 'SQS', 'SNS',
  'CloudFormation', 'CloudWatch', 'ECS Fargate', 'KMS',
  'Redis', 'CI/CD Pipelines', 'Supabase', 'Deno',
]

const row3 = [
  'Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow', 'Keras',
  'Pandas', 'NumPy', 'PostgreSQL', 'NoSQL', 'Scikit-learn',
  'PyTorch', 'Jupyter',
]

interface TagProps {
  label: string
}

function Tag({ label }: TagProps) {
  return (
    <span
      className="
        inline-block
        px-4 py-2
        text-xs sm:text-sm
        mx-2
        cursor-default select-none
        transition-all duration-200
        flex-shrink-0
        whitespace-nowrap
      "
      style={{
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '4px',
        background: '#080808',
        color: '#8892a4',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLSpanElement
        el.style.background = '#00e87a'
        el.style.color = '#080808'
        el.style.border = '1px solid #00e87a'
        el.style.boxShadow = '0 0 12px rgba(0,232,122,0.4)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLSpanElement
        el.style.background = '#080808'
        el.style.color = '#8892a4'
        el.style.border = '1px solid rgba(255,255,255,0.12)'
        el.style.boxShadow = 'none'
      }}
    >
      {label}
    </span>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Ghost counter */}
      <span
        className="absolute top-8 right-8 select-none pointer-events-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(6rem, 20vw, 14rem)',
          lineHeight: 1,
          color: '#ffffff',
          opacity: 0.06,
        }}
        aria-hidden="true"
      >
        04
      </span>

      {/* Section header */}
      <div className="mb-10">
        <p
          className="uppercase mb-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: '#8892a4',
          }}
        >
          04 SKILLS
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1rem',
            color: '#00e87a',
          }}
        >
          40+ technologies
        </p>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-4">
        {/* Row 1 – Languages & Frameworks, left */}
        <Marquee direction="left" speed={40}>
          {row1.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Marquee>

        {/* Row 2 – AWS & Cloud, right */}
        <Marquee direction="right" speed={40}>
          {row2.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Marquee>

        {/* Row 3 – ML & Data, left — hidden on mobile */}
        <div className="hidden sm:block">
          <Marquee direction="left" speed={40}>
            {row3.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
