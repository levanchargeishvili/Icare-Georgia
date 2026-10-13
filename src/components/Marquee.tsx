import { useRef } from 'react'
import { FaApple } from 'react-icons/fa6'
import { gsap, useGSAP, ScrollTrigger, reduceMotion } from '../lib/gsap'

const BRANDS = ['iPhone', 'Samsung', 'Xiaomi', 'Huawei', 'OPPO', 'vivo', 'OnePlus', 'realme', 'Google', 'Sony']
const TAGS = ['ეკრანის შეცვლა', 'ბატარეის შეცვლა', 'დიაგნოსტიკა', 'ორიგინალი ნაწილები', 'გარანტია', 'სწრაფი მომსახურება']

function Row({ items, variant }: { items: string[]; variant: 'brands' | 'tags' }) {
  const copy = (k: string) =>
    items.map((t) => (
      <span className="mq-item" key={k + t}>
        {variant === 'brands' && t === 'iPhone' && <FaApple />}
        {t}
        <i className="mq-sep">✦</i>
      </span>
    ))
  return (
    <div className={`mq-row mq-${variant}`}>
      <div className="mq-track">
        <div className="mq-set">{copy('a')}</div>
        <div className="mq-set" aria-hidden="true">{copy('b')}</div>
      </div>
    </div>
  )
}

export default function Marquee() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduceMotion) return
      const [a, b] = gsap.utils.toArray<HTMLElement>('.mq-track')
      const loops = [
        gsap.to(a, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 }),
        gsap.fromTo(b, { xPercent: -50 }, { xPercent: 0, duration: 30, ease: 'none', repeat: -1 }),
      ]
      // Only run the belts while they're on screen.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => loops.forEach((t) => (self.isActive ? t.play() : t.pause())),
      })
    },
    { scope: root },
  )

  return (
    <section className="marquee" ref={root} aria-label="ბრენდები">
      <Row items={BRANDS} variant="brands" />
      <Row items={TAGS} variant="tags" />
    </section>
  )
}
