import Cursor from '../src/components/Cursor'
import { Navigation } from '../src/components/Navigation'
import { Hero } from '../src/components/Hero'
import { About } from '../src/components/About'
import { Experience } from '../src/components/Experience'
import { Projects } from '../src/components/Projects'
import { Skills } from '../src/components/Skills'
import { Education } from '../src/components/Education'
import { More } from '../src/components/More'
import { Contact } from '../src/components/Contact'
import { Footer } from '../src/components/Footer'

export default function Home() {
  return (
    <main>
      <Cursor />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <More />
      <Contact />
      <Footer />
    </main>
  )
}
