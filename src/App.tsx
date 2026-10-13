import { useEffect } from 'react'
import { scrollToTarget } from './lib/gsap'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Process from './components/Process'
import About from './components/About'
import Visit from './components/Visit'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Route every in-page anchor through the smooth scroller.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash === '#') return
      e.preventDefault()
      scrollToTarget(hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <About />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
