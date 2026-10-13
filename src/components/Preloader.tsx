import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, lockScroll, finishIntro, reduceMotion } from '../lib/gsap'

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduceMotion) return
      const el = root.current!
      const num = el.querySelector('.pl-num')!
      const counter = { v: 0 }
      let alive = true
      lockScroll(true)

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          lockScroll(false)
          gsap.set(el, { display: 'none' })
          finishIntro()
          ScrollTrigger.refresh()
        },
      })

      tl.from('.pl-logo', { scale: 0, rotate: -120, duration: 0.9, ease: 'back.out(1.7)' })
        .from('.pl-word span', { yPercent: 110, stagger: 0.04, duration: 0.7, ease: 'expo.out' }, '-=0.5')
        .to(counter, {
          v: 100,
          duration: 1.1,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        }, 0.2)
        .to('.pl-bar i', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.2)
        .to('.pl-inner', { y: -40, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, '+=0.1')
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.2')

      // Wait for the web fonts (capped) so the hero splits measure real glyphs.
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(() => {
        if (alive) tl.play()
      })

      return () => {
        alive = false
        lockScroll(false)
      }
    },
    { scope: root },
  )

  if (reduceMotion) return null

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-inner">
        <img className="pl-logo" src="/images/logo.png" alt="" />
        <div className="pl-word">
          {'iCare Georgia'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </div>
        <div className="pl-meta">
          <div className="pl-bar"><i /></div>
          <span className="pl-num">000</span>
        </div>
      </div>
    </div>
  )
}
