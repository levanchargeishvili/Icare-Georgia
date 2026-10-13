import { useRef, useState } from 'react'
import { LuMenu, LuPhone, LuX } from 'react-icons/lu'
import { gsap, useGSAP, ScrollTrigger, introDone, lockScroll, reduceMotion } from '../lib/gsap'
import { NAV, PHONE, PHONE_LABEL } from '../lib/site'
import Magnetic from './Magnetic'
import Socials from './Socials'

export default function Nav() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  // Section tracking, hide-on-scroll, progress bar, entrance.
  useGSAP(
    () => {
      const bar = root.current!.querySelector('.nav-bar')
      NAV.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActive(id),
        })
      })

      ScrollTrigger.create({
        start: 40,
        end: 'max',
        toggleClass: { targets: root.current!, className: 'is-scrolled' },
      })

      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

      if (!reduceMotion) {
        gsap.set(bar, { autoAlpha: 0, y: -30 })
        introDone.then(() => {
          gsap.to(bar, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.5 })
        })
      }
    },
    { scope: root },
  )

  // Sliding pill under the active link.
  useGSAP(
    () => {
      const link = root.current!.querySelector<HTMLElement>(`.nav-link[data-id="${active}"]`)
      if (!link) return
      gsap.to('.nav-ind', {
        x: link.offsetLeft,
        width: link.offsetWidth,
        duration: 0.6,
        ease: 'expo.out',
      })
    },
    { scope: root, dependencies: [active] },
  )

  // Full-screen mobile menu.
  useGSAP(
    () => {
      const menu = root.current!.querySelector('.menu')
      if (open) {
        lockScroll(true)
        gsap.timeline()
          .set(menu, { visibility: 'visible' })
          .fromTo(menu, { clipPath: 'circle(0% at calc(100% - 44px) 46px)' }, { clipPath: 'circle(150% at calc(100% - 44px) 46px)', duration: 0.9, ease: 'expo.inOut' })
          .from('.menu-link', { yPercent: 110, autoAlpha: 0, stagger: 0.07, duration: 0.8, ease: 'expo.out' }, '-=0.45')
          .from('.menu-foot', { autoAlpha: 0, y: 20, duration: 0.6 }, '-=0.5')
      } else if (menu && getComputedStyle(menu).visibility === 'visible') {
        lockScroll(false)
        gsap.timeline()
          .to(menu, { clipPath: 'circle(0% at calc(100% - 44px) 46px)', duration: 0.7, ease: 'expo.inOut' })
          .set(menu, { visibility: 'hidden' })
      }
    },
    { scope: root, dependencies: [open] },
  )

  return (
    <header className="nav" ref={root}>
      <div className="progress" />
      <div className="container">
        <div className="nav-bar">
          <a href="#home" className="brand" aria-label="iCare Georgia">
            <img src="/images/logo.png" alt="" width={38} height={38} />
            <span>
              iCare Georgia
              <small>სერვის ცენტრი</small>
            </span>
          </a>

          <nav className="nav-links" aria-label="მთავარი ნავიგაცია">
            <span className="nav-ind" />
            {NAV.map(({ id, label }) => (
              <a key={id} href={`#${id}`} data-id={id} className={`nav-link${active === id ? ' is-active' : ''}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="nav-cta-wrap">
              <Magnetic>
                <a href={`tel:${PHONE}`} className="btn btn-primary nav-cta">
                  <LuPhone /> დაგვიკავშირდით
                </a>
              </Magnetic>
            </div>
            <button
              className="burger"
              aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <LuX /> : <LuMenu />}
            </button>
          </div>
        </div>
      </div>

      <div className="menu" onClick={(e) => (e.target as Element).closest('a') && setOpen(false)}>
        <nav className="container">
          {NAV.map(({ id, label }, i) => (
            <div className="menu-row" key={id}>
              <a href={`#${id}`} className="menu-link">
                <span className="menu-idx">0{i + 1}</span>
                {label}
              </a>
            </div>
          ))}
          <div className="menu-foot">
            <a href={`tel:${PHONE}`} className="btn btn-primary">
              <LuPhone /> {PHONE_LABEL}
            </a>
            <Socials />
          </div>
        </nav>
      </div>
    </header>
  )
}
