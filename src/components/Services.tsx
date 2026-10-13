import { useRef } from 'react'
import { LuArrowUpRight, LuBatteryFull, LuSmartphone, LuStethoscope } from 'react-icons/lu'
import { gsap, useGSAP, ScrollTrigger, revealIn, reduceMotion, finePointer } from '../lib/gsap'
import { PHONE } from '../lib/site'
import { BatteryArt, DiagArt, ScreenArt } from './ServiceArt'

const SERVICES = [
  {
    key: 'screen',
    title: 'ეკრანის შეცვლა',
    text: 'ორიგინალი და ხარისხიანი ეკრანების შეცვლა iPhone-ის, Android-ის და სხვა მოდელებზე.',
    Icon: LuSmartphone,
    Art: ScreenArt,
  },
  {
    key: 'battery',
    title: 'ბატარეის შეცვლა',
    text: 'შეინარჩუნეთ თქვენი მოწყობილობის ენერგია ახალი, უსაფრთხო ბატარეით.',
    Icon: LuBatteryFull,
    Art: BatteryArt,
  },
  {
    key: 'diag',
    title: 'დიაგნოსტიკა',
    text: 'სრული დიაგნოსტიკა და ხარვეზების ზუსტი გამოვლენა პროფესიონალი სპეციალისტებისგან.',
    Icon: LuStethoscope,
    Art: DiagArt,
  },
]

/** A looping illustration timeline that only runs while its card is on screen. */
function inViewLoop(card: Element, repeatDelay: number) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay, paused: true })
  ScrollTrigger.create({
    trigger: card,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  })
  return tl
}

export default function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      revealIn(root.current!)
      if (reduceMotion) return
      const q = gsap.utils.selector(root)
      const [screen, battery, diag] = q('.svc')

      gsap.from(q('.svc'), {
        y: 120,
        autoAlpha: 0,
        rotateX: -18,
        transformPerspective: 1000,
        transformOrigin: '50% 0%',
        stagger: 0.14,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.svc-grid')[0], start: 'top 82%' },
      })

      /* screen: crack → shake → fresh panel sweeps up → check */
      {
        const s = gsap.utils.selector(screen)
        inViewLoop(screen, 0.6)
          .set(s('.cracks path'), { strokeDasharray: 1, strokeDashoffset: 1, autoAlpha: 1 })
          .set(s('.fresh'), { scaleY: 0, transformOrigin: '50% 100%', autoAlpha: 1 })
          .set(s('.fresh-orb'), { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' })
          .set(s('.check'), { scale: 0, autoAlpha: 0, transformOrigin: '158px 38px' })
          .to(s('.cracks path'), { strokeDashoffset: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' }, 0.2)
          .to(s('.phone'), { x: 3, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' }, 0.2)
          .to(s('.fresh'), { scaleY: 1, duration: 1, ease: 'power3.inOut' }, '+=0.7')
          .to(s('.fresh-orb'), { autoAlpha: 0.35, scale: 1, duration: 0.8 }, '-=0.4')
          .set(s('.cracks path'), { autoAlpha: 0 })
          .to(s('.check'), { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.4)' }, '-=0.2')
          .to(s('.fresh, .fresh-orb, .check'), { autoAlpha: 0, duration: 0.4 }, '+=1.4')
      }

      /* battery: charge from red to green with a live percentage */
      {
        const s = gsap.utils.selector(battery)
        const pct = s('.pct')[0]
        const level = { v: 8 }
        const write = () => (pct.textContent = `${Math.round(level.v)}%`)
        inViewLoop(battery, 0.9)
          .set(s('.lvl'), { scaleX: 0.08, transformOrigin: '0% 50%', fill: '#ff5a5f' })
          .set(level, { v: 8, onComplete: write })
          .to(s('.bolt'), { scale: 1.25, transformOrigin: '50% 50%', duration: 0.22, yoyo: true, repeat: 5 }, 0)
          .to(s('.lvl'), { scaleX: 1, duration: 2.4, ease: 'power1.inOut' }, 0.1)
          .to(level, { v: 100, duration: 2.4, ease: 'power1.inOut', onUpdate: write }, 0.1)
          .to(s('.lvl'), { fill: '#ffad1f', duration: 1.2, ease: 'none' }, 0.1)
          .to(s('.lvl'), { fill: '#34d399', duration: 1.2, ease: 'none' }, 1.3)
          .to({}, { duration: 1 })
      }

      /* diagnostics: travelling pulse + scan line + status dots */
      {
        const s = gsap.utils.selector(diag)
        inViewLoop(diag, 0)
          .fromTo(s('.pulse-line'), { strokeDasharray: '0.3 0.7', strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 0)
          .fromTo(s('.scan'), { y: 0 }, { y: 88, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
          .fromTo(s('.dots circle'), { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 0.3, stagger: 0.3, yoyo: true, repeat: 1 }, 0)
      }

      /* pointer spotlight + tilt */
      if (!finePointer) return
      const cleanups = q('.svc-in').map((card) => {
        const el = card as HTMLElement
        gsap.set(el, { transformPerspective: 900 })
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' })
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' })
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          el.style.setProperty('--mx', `${x * 100}%`)
          el.style.setProperty('--my', `${y * 100}%`)
          rx((0.5 - y) * 8)
          ry((x - 0.5) * 10)
        }
        const leave = () => {
          rx(0)
          ry(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })
      return () => cleanups.forEach((fn) => fn())
    },
    { scope: root },
  )

  return (
    <section id="services" className="section services" ref={root}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="label" data-reveal>სერვისები</span>
            <h2 className="h2" data-split>
              სწრაფი და <span className="grad">ხარისხიანი</span> მომსახურება
            </h2>
          </div>
          <p className="lead" data-reveal="0.15">
            ვემსახურებით iPhone-ს, Android-ს და სხვა მოწყობილობებს — ორიგინალი ნაწილებით და პროფესიონალი ტექნიკოსებით.
          </p>
        </div>

        <div className="svc-grid">
          {SERVICES.map(({ key, title, text, Icon, Art }, i) => (
            <article className="svc" key={key}>
              <div className="svc-in">
                <div className="svc-glow" />
                <div className="svc-top">
                  <span className="svc-num">0{i + 1}</span>
                  <span className="svc-ico"><Icon /></span>
                </div>
                <div className="svc-art"><Art /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href={`tel:${PHONE}`} className="svc-link">
                  დაგვიკავშირდით <span className="svc-arrow"><LuArrowUpRight /></span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
