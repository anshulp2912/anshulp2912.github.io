'use client'

export function Footer() {
  return (
    <footer
      className="px-6"
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
      }}
    >
      <div
        className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"
        style={{ gap: '0.5rem' }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: '#8892a4',
          }}
        >
          © 2026 Anshul Patel
        </span>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: '#8892a4',
          }}
        >
          Built with Next.js + Framer Motion
        </span>
      </div>
    </footer>
  )
}
