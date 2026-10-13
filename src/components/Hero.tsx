import { useRef } from 'react'
import { LuArrowRight, LuClock, LuCog, LuPhone, LuShieldCheck, LuZap } from 'react-icons/lu'
import { gsap, useGSAP, SplitText, introDone, reduceMotion, finePointer } from '../lib/gsap'
import { HOURS, PHONE, useOpenStatus } from '../lib/site'
import Magnetic from './Magnetic'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const open = useOpenStatus()

  useGSAP(
    () => {
      if (reduceMotion) return
      const q = gsap.utils.selector(root)
      let alive = true

      /* intro — built now (hidden under the preloader), played when it lifts */
      const split = SplitText.create(q('.hero-title .ln'), { type: 'words', wordsClass: 'w' })
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 1.2 } })
      tl.from(q('.eyebrow'), { y: 20, autoAlpha: 0 })
        .from(split.words, { yPercent: 120, rotate: 5, autoAlpha: 0, stagger: 0.09, duration: 1.4 }, '<0.1')
        .from(q('.underline path'), { strokeDashoffset: 1, duration: 1.3, ease: 'power3.inOut' }, '-=0.9')
        .from(q('.hero-lead, .hero-ctas .magnetic, .hero-feats li'), { y: 30, autoAlpha: 0, stagger: 0.07 }, '-=1.2')
        .from(q('.hv-card'), { clipPath: 'inset(100% 0% 0% 0% round 32px)', duration: 1.6, ease: 'expo.inOut' }, 0.15)
        .from(q('.hv-card img'), { scale: 1.4, duration: 2.2 }, '<')
        .from(q('.chip-in'), { scale: 0.5, autoAlpha: 0, stagger: 0.12, duration: 0.9, ease: 'back.out(1.8)' }, '-=1.1')
        .from(q('.scroll-cue'), { autoAlpha: 0, y: -10, duration: 0.8 }, '-=0.6')
      introDone.then(() => {
        if (alive) tl.play()
      })

      /* ambient float */
      gsap.to(q('.chip-in'), { y: -12, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.7 } })

      /* scroll parallax */
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('.hero-copy'), { yPercent: -18, autoAlpha: 0.2, ease: 'none', scrollTrigger: st })
      gsap.to(q('.hero-visual'), { yPercent: 12, ease: 'none', scrollTrigger: st })
      gsap.to(q('.hero-bg'), { yPercent: 25, ease: 'none', scrollTrigger: st })

      /* pointer tilt + depth */
      if (!finePointer) return () => { alive = false }
      const tilt = q('.hv-tilt')[0]
      gsap.set(tilt, { transformPerspective: 1100 })
      const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3' })
      const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3' })
      const chips = q('.chip').map((c) => {
        const depth = Number((c as HTMLElement).dataset.depth)
        return {
          depth,
          x: gsap.quickTo(c, 'x', { duration: 1, ease: 'power3' }),
          y: gsap.quickTo(c, 'y', { duration: 1, ease: 'power3' }),
        }
      })
      const move = (e: PointerEvent) => {
        const px = e.clientX / window.innerWidth - 0.5
        const py = e.clientY / window.innerHeight - 0.5
        rx(-py * 10)
        ry(px * 14)
        chips.forEach((c) => {
          c.x(px * c.depth)
          c.y(py * c.depth)
        })
      }
      root.current!.addEventListener('pointermove', move)
      return () => {
        alive = false
        root.current?.removeEventListener('pointermove', move)
      }
    },
    { scope: root },
  )

  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <div className="grid-lines" />
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="glow g3" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <i className="pulse" /> IPHONE • ANDROID • TECH SERVICE
          </span>
          <h1 className="hero-title">
            <span className="ln">თქვენი ტექნიკა</span>
            <span className="ln accent">
              საიმედო ხელშია
              <svg className="underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 14 C 60 4, 140 4, 297 10" pathLength={1} />
              </svg>
            </span>
          </h1>
          <p className="hero-lead">
            iCare Georgia – პროფესიონალური სერვის ცენტრი iPhone-ის, Android-ის და სხვა მოწყობილობების შეკეთებისთვის.
          </p>
          <div className="hero-ctas">
            <Magnetic>
              <a href="#services" className="btn btn-primary">
                სერვისების ნახვა <LuArrowRight className="arrow" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`tel:${PHONE}`} className="btn btn-ghost">
                <LuPhone /> დაგვიკავშირდით
              </a>
            </Magnetic>
          </div>
          <ul className="hero-feats">
            <li><LuShieldCheck /> ორიგინალი ნაწილები</li>
            <li><LuCog /> პროფესიონალი ტექნიკოსები</li>
            <li><LuClock /> სწრაფი მომსახურება</li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hv-tilt">
            <div className="hv-card">
              <img src="/images/hero-tech.jpg" alt="iCare Georgia-ს ტექნიკოსი iPhone-ს არემონტებს" />
              <div className="hv-shade" />
            </div>

            <div className="chip chip-a" data-depth="40">
              <div className="chip-in">
                <span className="chip-ico blue"><LuZap /></span>
                <span><strong>სწრაფი და ხარისხიანი</strong><small>მომსახურება</small></span>
              </div>
            </div>
            <div className="chip chip-b" data-depth="-50">
              <div className="chip-in">
                <span className={`status-dot${open ? ' is-open' : ''}`} />
                <span><strong>{open ? 'ახლა ღიაა' : 'ახლა დაკეტილია'}</strong><small>ყოველდღე {HOURS.label}</small></span>
              </div>
            </div>
            <div className="chip chip-c" data-depth="70">
              <div className="chip-in">
                <span className="chip-ico orange"><LuShieldCheck /></span>
                <span><strong>გარანტია</strong><small>ყველა სერვისზე</small></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#services" className="scroll-cue" aria-label="ქვემოთ გადასვლა">
        <span />
      </a>
    </section>
  )
}
