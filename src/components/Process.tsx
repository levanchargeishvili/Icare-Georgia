import { useRef } from 'react'
import { LuMessagesSquare, LuShieldCheck, LuStethoscope, LuWrench } from 'react-icons/lu'
import { gsap, useGSAP, revealIn, reduceMotion } from '../lib/gsap'

const STEPS = [
  { title: 'დაგვიკავშირდით', text: 'დარეკეთ ან მოგვწერეთ — კონსულტაცია უფასოა.', Icon: LuMessagesSquare },
  { title: 'დიაგნოსტიკა', text: 'სპეციალისტი ზუსტად ადგენს ხარვეზს.', Icon: LuStethoscope },
  { title: 'შეკეთება', text: 'ვიყენებთ ორიგინალ ან შესაბამის ხარისხიან ნაწილებს.', Icon: LuWrench },
  { title: 'გარანტია', text: 'მოწყობილობას გიბრუნებთ გარანტიით.', Icon: LuShieldCheck },
]

export default function Process() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      revealIn(root.current!)
      if (reduceMotion) return
      const q = gsap.utils.selector(root)
      const nodes = q('.step-node')
      const mm = gsap.matchMedia()

      mm.add({ wide: '(min-width: 900px)', narrow: '(max-width: 899px)' }, (ctx) => {
        const wide = ctx.conditions!.wide
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q('.steps')[0], start: wide ? 'top 70%' : 'top 75%', end: wide ? 'bottom 55%' : 'bottom 60%', scrub: 0.6 },
        })
        tl.fromTo(q('.steps-fill'), wide ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none', duration: 1 }, 0)
        nodes.forEach((node, i) => {
          const at = (i / (nodes.length - 1)) * 0.96
          tl.fromTo(node, { backgroundColor: '#0d1322', borderColor: 'rgba(255,255,255,.1)', color: '#8e98ad', scale: 1 },
            { backgroundColor: '#2f7bff', borderColor: '#5aa2ff', color: '#ffffff', scale: 1.08, duration: 0.04, ease: 'none' }, at)
        })
      })

      gsap.from(q('.step'), {
        y: 50,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: q('.steps')[0], start: 'top 85%' },
      })
    },
    { scope: root },
  )

  return (
    <section className="section process" ref={root}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="label" data-reveal>პროცესი</span>
            <h2 className="h2" data-split>
              როგორ <span className="grad">ვმუშაობთ</span>
            </h2>
          </div>
          <p className="lead" data-reveal="0.15">
            გამჭვირვალე პროცესი პირველი ზარიდან მოწყობილობის დაბრუნებამდე.
          </p>
        </div>

        <ol className="steps">
          <span className="steps-track"><span className="steps-fill" /></span>
          {STEPS.map(({ title, text, Icon }, i) => (
            <li className="step" key={title}>
              <span className="step-node"><Icon /></span>
              <span className="step-idx">ნაბიჯი 0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
