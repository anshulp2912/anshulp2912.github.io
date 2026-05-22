'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'

const CENTER = { x: 250, y: 215 }

const NODES = [
  // inner hexagon
  { id: 0, label: 'TypeScript', x: 338, y: 128 },
  { id: 1, label: 'AWS',        x: 388, y: 215 },
  { id: 2, label: 'Python',     x: 338, y: 302 },
  { id: 3, label: 'Next.js',    x: 162, y: 302 },
  { id: 4, label: 'React',      x: 112, y: 215 },
  { id: 5, label: 'Node.js',    x: 162, y: 128 },
  // outer ring
  { id: 6,  label: 'Lambda',     x: 415, y:  95 },
  { id: 7,  label: 'DynamoDB',   x: 455, y: 215 },
  { id: 8,  label: 'Redis',      x: 392, y: 348 },
  { id: 9,  label: 'Docker',     x: 108, y: 345 },
  { id: 10, label: 'TensorFlow', x:  45, y: 215 },
  { id: 11, label: 'S3',         x:  85, y:  95 },
  { id: 12, label: 'CDK',        x: 250, y:  52 },
  { id: 13, label: 'PostgreSQL', x: 250, y: 378 },
]

const EDGES: [number, number][] = [
  // center → inner
  [-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4], [-1, 5],
  // inner ring
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  // inner → outer
  [0, 6], [0, 12], [1, 6], [1, 7],
  [2, 7], [2, 8], [3, 8], [3, 9],
  [4, 9], [4, 10], [5, 10], [5, 11], [5, 12],
  [2, 13], [3, 13],
]

function getPoint(id: number) {
  return id === -1 ? CENTER : NODES.find((n) => n.id === id)!
}

function labelAnchor(x: number): { anchor: 'start' | 'end' | 'middle'; dx: number } {
  if (x > 270) return { anchor: 'start', dx: 9 }
  if (x < 230) return { anchor: 'end',   dx: -9 }
  return { anchor: 'middle', dx: 0 }
}

function Constellation({ reduced }: { reduced: boolean }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (reduced) { setPhase(2); return }
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [reduced])

  return (
    <svg
      viewBox="0 0 500 430"
      width="100%"
      height="100%"
      style={{ maxWidth: 480, display: 'block' }}
      aria-hidden="true"
    >
      {/* Edges */}
      {phase >= 1 && EDGES.map(([a, b], i) => {
        const p1 = getPoint(a)
        const p2 = getPoint(b)
        const isCenterEdge = a === -1
        return (
          <motion.line
            key={i}
            x1={p1.x} y1={p1.y}
            x2={p2.x} y2={p2.y}
            stroke={isCenterEdge ? 'rgba(0,232,122,0.25)' : 'rgba(255,255,255,0.07)'}
            strokeWidth={isCenterEdge ? 1 : 0.75}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
          />
        )
      })}

      {/* Center node */}
      {phase >= 1 && (
        <>
          <motion.circle
            cx={CENTER.x} cy={CENTER.y} r={18}
            fill="rgba(0,232,122,0.12)"
            stroke="#00e87a"
            strokeWidth={1}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Pulse ring */}
          {!reduced && (
            <motion.circle
              cx={CENTER.x} cy={CENTER.y} r={18}
              fill="none"
              stroke="#00e87a"
              strokeWidth={1}
              animate={{ r: [18, 36], opacity: [0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <motion.text
            x={CENTER.x} y={CENTER.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#00e87a"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 7, fontWeight: 600 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            AP
          </motion.text>
        </>
      )}

      {/* Skill nodes */}
      {phase >= 2 && NODES.map((node, i) => {
        const { anchor, dx } = labelAnchor(node.x)
        const isInner = node.id <= 5
        const dy = node.y > 340 ? 16 : node.y < 80 ? -10 : 0
        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              reduced
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, i % 2 === 0 ? -3 : 3, 0],
                  }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.35, delay: i * 0.05 },
                    scale:   { duration: 0.35, delay: i * 0.05, ease: [0.76, 0, 0.24, 1] },
                    y:       { duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                  }
            }
            style={{ transformOrigin: `${node.x}px ${node.y}px`, cursor: 'default' }}
          >
            {/* Node dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isInner ? 4.5 : 3}
              fill={isInner ? '#00e87a' : 'rgba(0,232,122,0.5)'}
            />
            {isInner && (
              <circle
                cx={node.x}
                cy={node.y}
                r={8}
                fill="rgba(0,232,122,0.08)"
                stroke="rgba(0,232,122,0.2)"
                strokeWidth={0.75}
              />
            )}
            {/* Label */}
            <text
              x={node.x + dx}
              y={node.y + dy}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill={isInner ? '#fafafa' : '#8892a4'}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: isInner ? 9.5 : 8,
                fontWeight: isInner ? 600 : 400,
              }}
            >
              {node.label}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}

export function Hero() {
  const prefersReduced = useReducedMotion()
  const [scrolledPast, setScrolledPast] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolledPast(latest > 100)
  })

  const panelAnim = prefersReduced
    ? {}
    : {
        initial: { clipPath: 'inset(0% 100% 0% 0%)' },
        animate: { clipPath: 'inset(0% 0% 0% 0%)' },
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }

  const wordAnim = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { clipPath: 'inset(100% 0% 0% 0%)' },
          animate: { clipPath: 'inset(0% 0% 0% 0%)' },
          transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay },
        }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full flex flex-col lg:flex-row"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Left panel: cream ─────────────────────────────── */}
      <motion.div
        className="noise-overlay flex-none lg:w-[45%] w-full flex flex-col justify-center px-10 py-16 lg:py-0 lg:min-h-screen"
        style={{ backgroundColor: '#f0ece3' }}
        {...panelAnim}
      >
        <div className="flex flex-col gap-2">
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              {...wordAnim(0.3)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                lineHeight: 1,
                color: '#080808',
                margin: 0,
              }}
            >
              ANSHUL
            </motion.h1>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              {...wordAnim(0.4)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                lineHeight: 1,
                color: '#080808',
                margin: 0,
              }}
            >
              PATEL
            </motion.h1>
          </div>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReduced ? { duration: 0 } : { delay: 0.65, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: '#8892a4',
              marginTop: '0.75rem',
            }}
          >
            Software Development Engineer
          </motion.p>

          <motion.a
            href="/Anshul_Patel_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0 } : { delay: 0.75, duration: 0.45 }}
            whileHover={prefersReduced ? {} : { backgroundColor: '#f0ece3', color: '#080808' }}
            style={{
              display: 'inline-block',
              marginTop: '2rem',
              alignSelf: 'flex-start',
              padding: '0.65rem 1.5rem',
              backgroundColor: '#080808',
              color: '#f0ece3',
              border: '1px solid #080808',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background-color 200ms ease, color 200ms ease',
            }}
          >
            Download Resume ↗
          </motion.a>
        </div>
      </motion.div>

      {/* ── Right panel: constellation ─────────────────────── */}
      <div
        className="flex-1 w-full flex items-center justify-center px-6 py-16 lg:py-0 lg:min-h-screen relative overflow-hidden"
        style={{ backgroundColor: '#080808' }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,232,122,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <Constellation reduced={!!prefersReduced} />
      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReduced
            ? {}
            : {
                opacity: scrolledPast ? 0 : 1,
                y: scrolledPast ? 8 : [0, 10, 0],
              }
        }
        transition={
          prefersReduced
            ? { duration: 0 }
            : scrolledPast
            ? { duration: 0.3 }
            : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }
        initial={prefersReduced ? false : { opacity: 0 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '1.25rem',
          color: '#8892a4',
          pointerEvents: 'none',
          zIndex: 20,
          opacity: prefersReduced ? 1 : undefined,
        }}
      >
        ↓
      </motion.div>
    </section>
  )
}
