import { ScrollProgress } from '@/components/ScrollProgress'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Education } from '@/components/Education'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Certifications } from '@/components/Certifications'
import { Hobbies } from '@/components/Hobbies'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Certifications />
      <Hobbies />
      <Contact />
      <Footer />
    </main>
  )
}
