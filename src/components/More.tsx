'use client'

const certGroups = [
  {
    category: 'Machine Learning and Deep Learning',
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
    category: 'Data Science',
    certs: [
      { name: 'Tableau 10 A-Z: Hands-On Tableau Training For Data Science', link: 'https://www.udemy.com/certificate/UC-5G8UTYCL/' },
      { name: 'SQL for Data Science', link: 'https://coursera.org/share/609018da2b00ebb868a1c0ad7d76fb6' },
      { name: 'Probability Theory, Statistics and Exploratory Data Analysis', link: 'https://coursera.org/share/1581c00b43a2436de4e1cc4b60f88c5b' },
      { name: 'How to Win a Data Science Competition: Learn from Top Kagglers', link: 'https://coursera.org/share/90a1797d290fdf6a211f657ddf466412' },
    ],
  },
  {
    category: 'Software and Tools',
    certs: [
      { name: 'Building Conversational Experiences with Dialogflow', link: 'https://coursera.org/share/2ebd4b7f27a4b2615bd22d9e8ca86f55' },
      { name: 'Create Your First Chatbot with Rasa and Python', link: 'https://coursera.org/share/8bf3e41e606f12073c3c7753600209eb' },
      { name: 'Google Ads for Beginners', link: 'https://coursera.org/share/4402dd49aded4a23bf4889b69aaeeb62' },
    ],
  },
]

const HOBBIES = [
  'Soccer',
  'Algo Trading',
  'Cricket',
  'Chess',
  'Badminton',
  'Trekking',
  'Baking',
  'Photo Editing',
  'Video Editing',
  'Anime',
]

export function More() {
  return (
    <section
      id="more"
      style={{ backgroundColor: '#080808' }}
      className="py-16 px-6"
    >
      {/* Section label */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: '#8892a4',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
        }}
      >
        MORE —
      </p>

      {/* Certifications block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {certGroups.map((group) => (
          <div key={group.category}>
            {/* Row header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#fafafa',
                }}
              >
                {group.category}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#8892a4',
                }}
              >
                {group.certs.length} certs
              </span>
            </div>

            {/* Horizontally scrollable pill list */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: '0.25rem',
              } as React.CSSProperties}
            >
              {group.certs.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-pill"
                  style={{
                    flexShrink: 0,
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backgroundColor: '#080808',
                    color: '#8892a4',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'border-color 180ms ease, color 180ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = '#00e87a'
                    el.style.color = '#00e87a'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'rgba(255,255,255,0.12)'
                    el.style.color = '#8892a4'
                  }}
                >
                  {cert.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          margin: '2.5rem 0',
        }}
      />

      {/* Hobbies / Interests block */}
      <div>
        {/* Interests label */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: '#8892a4',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          INTERESTS
        </p>

        {/* Hobby tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          {HOBBIES.map((hobby) => (
            <span
              key={hobby}
              style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: '#080808',
                color: '#fafafa',
              }}
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
