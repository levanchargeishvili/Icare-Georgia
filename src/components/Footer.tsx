import { useRef } from 'react'
import { LuArrowUp, LuMapPin } from 'react-icons/lu'
import { gsap, useGSAP, SplitText, reduceMotion } from '../lib/gsap'
import { NAV } from '../lib/site'
import Magnetic from './Magnetic'
import Socials from './Socials'

export default function Footer() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduceMotion) return
      const q = gsap.utils.selector(root)
      const split = SplitText.create(q('.footer-word'), { type: 'chars', charsClass: 'fc' })
      gsap.from(split.chars, {
        yPercent: 110,
        rotate: 8,
        stagger: 0.035,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.footer-word')[0], start: 'top 95%' },
      })
    },
    { scope: root },
  )

  return (
    <footer className="footer" ref={root}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo.png" alt="" width={44} height={44} />
            <div>
              <strong>iCare Georgia</strong>
              <span>ტექნიკის სერვის ცენტრი</span>
            </div>
          </div>
          <nav className="footer-nav" aria-label="ფუტერის ნავიგაცია">
            {NAV.map(({ id, label }) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
          <div className="footer-right">
            <Socials />
            <span className="footer-loc"><LuMapPin /> გლდანი მოლი • თბილისი</span>
          </div>
        </div>

        <div className="footer-word" aria-hidden="true">iCare Georgia</div>

        <div className="footer-bottom">
          <p>© 2026 iCare Georgia. ყველა უფლება დაცულია.</p>
          <Magnetic>
            <a href="#home" className="to-top" aria-label="ზემოთ დაბრუნება">
              <LuArrowUp />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
