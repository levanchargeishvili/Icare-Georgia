import { useRef } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { gsap, useGSAP, SplitText, revealIn, reduceMotion } from '../lib/gsap'
import Magnetic from './Magnetic'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      revealIn(root.current!)
      if (reduceMotion) return
      const q = gsap.utils.selector(root)

      // Words light up as the statement scrolls through the viewport.
      const split = SplitText.create(q('.statement'), { type: 'words', wordsClass: 'sw' })
      gsap.fromTo(split.words, { opacity: 0.12 }, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: q('.statement')[0], start: 'top 80%', end: 'bottom 45%', scrub: true },
      })

      gsap.fromTo(q('.about-img'), { clipPath: 'inset(20% 20% 20% 20% round 28px)', rotate: -6 }, {
        clipPath: 'inset(0% 0% 0% 0% round 28px)',
        rotate: 0,
        ease: 'none',
        scrollTrigger: { trigger: q('.about-img')[0], start: 'top 90%', end: 'center 55%', scrub: true },
      })
      gsap.fromTo(q('.about-img img'), { scale: 1.35, yPercent: -8 }, {
        scale: 1,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: q('.about-img')[0], start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to(q('.about-ring'), { rotate: 360, duration: 24, repeat: -1, ease: 'none' })
    },
    { scope: root },
  )

  return (
    <section id="about" className="section about" ref={root}>
      <div className="container">
        <div className="about-head">
          <span className="label" data-reveal>ჩვენ შესახებ</span>
          <span className="about-tag" data-reveal="0.1">შეკეთება • მოვლა • განახლება</span>
        </div>

        <div className="about-grid">
          <p className="statement">
            <span className="hl">ტექნოლოგია უფრო დიდხანს შენთან.</span> iCare Georgia – რადგან თქვენი მოწყობილობის
            საიმედოობა ჩვენთვის მთავარია.
          </p>

          <div className="about-side">
            <figure className="about-img">
              <img src="/images/promo.jpg" alt="თანამედროვე სმარტფონები" loading="lazy" />
            </figure>
            <svg className="about-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="ring-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text>
                <textPath href="#ring-path">iCare Georgia • Tech Service • Tbilisi • </textPath>
              </text>
            </svg>
            <div data-reveal="0.2">
              <Magnetic>
                <a href="#contact" className="btn btn-ghost">
                  დაგვიკავშირდით <LuArrowRight className="arrow" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
