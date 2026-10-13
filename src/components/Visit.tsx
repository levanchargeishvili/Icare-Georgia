import { useRef } from 'react'
import { LuClock, LuGem, LuHeadset, LuMapPin, LuNavigation, LuShield, LuUsers } from 'react-icons/lu'
import { gsap, useGSAP, revealIn, reduceMotion } from '../lib/gsap'
import { HOURS, MAPS_URL, useOpenStatus } from '../lib/site'
import Magnetic from './Magnetic'

const ADVANTAGES = [
  { title: 'გარანტია', text: 'ყველა სერვისზე', Icon: LuShield },
  { title: 'ხარისხიანი ნაწილები', text: 'ორიგინალი / შესაბამისი', Icon: LuGem },
  { title: 'გამოცდილი', text: 'სპეციალისტები', Icon: LuUsers },
  { title: 'მხარდაჭერა', text: 'სერვისის შემდეგაც', Icon: LuHeadset },
]

export default function Visit() {
  const root = useRef<HTMLElement>(null)
  const open = useOpenStatus()

  useGSAP(
    () => {
      revealIn(root.current!)
      if (reduceMotion) return
      const q = gsap.utils.selector(root)

      gsap.from(q('.bento > *'), {
        y: 70,
        scale: 0.94,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.bento')[0], start: 'top 80%' },
      })
      gsap.fromTo(q('.loc-img img'), { yPercent: -10, scale: 1.2 }, {
        yPercent: 10,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: q('.loc')[0], start: 'top bottom', end: 'bottom top', scrub: true },
      })
      q('.adv').forEach((tile) => {
        const icon = tile.querySelector('.adv-ico')
        tile.addEventListener('pointerenter', () =>
          gsap.fromTo(icon, { rotate: -20, scale: 0.8 }, { rotate: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' }),
        )
      })
    },
    { scope: root },
  )

  return (
    <section className="section visit" ref={root}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="label" data-reveal>ფილიალი</span>
            <h2 className="h2" data-split>
              მოგვინახულეთ <span className="grad">გლდანი მოლში</span>
            </h2>
          </div>
        </div>

        <div className="bento">
          <article className="loc">
            <div className="loc-img">
              <img src="/images/store.jpg" alt="iCare Georgia-ს მაღაზია გლდანი მოლში" loading="lazy" />
              <span className={`loc-status${open ? ' is-open' : ''}`}>
                <span className="status-dot" /> {open ? 'ახლა ღიაა' : 'ახლა დაკეტილია'}
              </span>
            </div>
            <div className="loc-body">
              <h3><LuMapPin /> გლდანი მოლი • თბილისი</h3>
              <p>
                მოგვინახულეთ ჩვენს ფიზიკურ მაღაზიაში – iCare Georgia გლდანი მოლში. მიიღეთ პროფესიონალური
                კონსულტაცია და სერვისის გარანტია.
              </p>
              <div className="loc-foot">
                <Magnetic>
                  <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <LuNavigation /> როგორ მოვიდე?
                  </a>
                </Magnetic>
                <div className="hours">
                  <LuClock />
                  <span>
                    <small>ყოველდღე</small>
                    <strong>{HOURS.label}</strong>
                  </span>
                </div>
              </div>
            </div>
          </article>

          {ADVANTAGES.map(({ title, text, Icon }) => (
            <div className="adv" key={title} data-cursor>
              <span className="adv-ico"><Icon /></span>
              <div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
