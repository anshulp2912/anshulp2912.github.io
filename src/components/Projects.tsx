'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'Lekha - Portfolio Tracker',
    image: '/images/investnotes.png',
    description: 'Community-driven portfolio showcase for the Indian investing community, supporting NSE, BSE, NASDAQ, NYSE, and Crypto with a social follower model for portfolio discovery, using Next.js 14, TypeScript, Supabase PostgreSQL, Tailwind CSS, and serverless Deno Edge Functions.',
    link: 'https://lekha-in.vercel.app/',
    linkLabel: 'View Project',
  },
  {
    title: 'MachineHack Hackathons',
    image: '/images/machine_hack.png',
    description: 'Notebooks of various MachineHack Hackathons covering Regression, Classification, Time Series, and Range Prediction problems in Machine Learning and Deep Learning.',
    link: 'https://github.com/anshulp2912/Machine-hack-Codes',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'BOTAnshul',
    image: '/images/BOTAnshul.png',
    description: 'Personalized chatbot resume using Python\'s open-source library Rasa, deployed using Heroku Docker services for 24×7 accessibility from anywhere in the world.',
    link: 'https://github.com/anshulp2912/BOTAnshul',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'automeans',
    image: '/images/automeans.png',
    description: 'Python library for automating the scikit-learn K-Means Clustering Algorithm by optimising the selection of the number of clusters.',
    link: 'https://github.com/anshulp2912/automeans',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Handy Cricket',
    image: '/images/handcricket.png',
    description: 'Computer-vision cricket game using OpenCV and Keras to identify hand signals denoting runs scored, played against the computer.',
    link: 'https://github.com/anshulp2912/handy-cricket',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'PhotoEditor using OpenCV',
    image: '/images/photoeditor.png',
    description: 'Apply Instagram-like filters or adjust images using OpenCV Python Library, with a Gradio UI for easy sharing.',
    link: 'https://github.com/anshulp2912/PhotoEditor-OpenCV',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Speaker Diarization',
    image: '/images/speaker-diarization.jpg',
    description: 'Framework using pyAudioAnalysis and Hierarchical clustering to identify the number of speakers and segment their speech in conversational audio, evaluated on the ICSI Meeting and AMI corpus.',
    link: 'https://github.com/anshulp2912/Speaker-Diarization',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Slytherin: Genetic Algorithm Snake',
    image: '/images/slytherin.jpg',
    description: 'Genetic Algorithm implementation of the Snake game using pygame, evolving through generations to outperform human players.',
    link: 'https://github.com/anshulp2912/Slytherin-Game-using-Genetic-Algorithm',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'AMBeats: Android Music Player',
    image: '/images/AMBeats.jpg',
    description: 'Android music player with a collaborative filtering Recommender System — users like songs, which are compared with similar users to generate new recommendations using Machine Learning.',
    link: 'https://github.com/anshulp2912/AMBeats',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Playback Attack Detection',
    image: '/images/ASVspoof.jpg',
    description: 'Research project extracting cepstral features from the ASVSpoof 2017 benchmark dataset to analyze which features best determine genuine vs. spoofed speech.',
    link: 'https://github.com/anshulp2912/ASVspoof-audio-prediction-',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Next-Word Prediction',
    image: '/images/next-word-prediction.jpg',
    description: 'N-gram probabilistic model that predicts the next possible words based on user input, trained on text from multiple storybooks.',
    link: 'https://github.com/anuj200199/Text-Prediction',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Named Entity Recognizer Guide',
    image: '/images/NER.jpg',
    description: 'Custom NLP model using Bidirectional LSTM and BERT to classify text by person, location, money, time, date and more, with a Gradio demo.',
    link: 'https://github.com/anshulp2912/Named-Entity-Recognition-Guide',
    linkLabel: 'View on GitHub',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="glass glass-hover rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.08)]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: 'easeOut' }}
    >
      {/* Image */}
      <div className="sm:w-52 flex-shrink-0 overflow-hidden bg-[#1a1a24]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-44 sm:h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center p-6 flex-1">
        <h3 className="text-slate-100 font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-slate-300 text-sm leading-7 mb-4 flex-1">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-sm border border-emerald-500/40 rounded-lg px-4 py-2 w-fit hover:bg-emerald-500 hover:text-[#0a0a0f] hover:border-emerald-500 transition-all duration-200"
        >
          {project.linkLabel}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Projects</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
