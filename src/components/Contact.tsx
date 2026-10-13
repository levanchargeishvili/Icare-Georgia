import { useRef } from 'react'
import { LuArrowUpRight, LuMapPin, LuMessagesSquare, LuPhone } from 'react-icons/lu'
import { gsap, useGSAP, revealIn, reduceMotion } from '../lib/gsap'
import { MAP_EMBED, MAPS_URL, PHONE, PHONE_LABEL } from '../lib/site'
import Magnetic from './Magnetic'
import Socials from './Socials'

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      revealIn(root.current!)
      if (reduceMotion) return
      const q = gsap.utils.selector(root)

      gsap.from(q('.contact-card'), {
        clipPath: 'inset(12% 8% 12% 8% round 40px)',
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
      gsap.from(q('.socials a'), {
        scale: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: q('.socials')[0], start: 'top 92%' },
      })
    },
    { scope: root },
  )

  return (
    <section id="contact" className="section contact" ref={root}>
      <div className="container">
        <div className="contact-card">
          <div className="contact-blob" aria-hidden="true" />
          <div className="contact-copy">
            <span className="chat-ico" data-reveal><LuMessagesSquare /></span>
            <h2 className="h2" data-split>კითხვები გაქვთ?</h2>
            <p className="lead" data-reveal="0.1">დაგვიკავშირდით და მიიღეთ უფასო კონსულტაცია.</p>

            <div data-reveal="0.2">
              <Magnetic strength={0.15}>
                <a href={`tel:${PHONE}`} className="phone-big">
                  <span className="phone-ico"><LuPhone /></span>
                  {PHONE_LABEL}
                </a>
              </Magnetic>
            </div>

            <div className="contact-social">
              <span>ან მოგვწერეთ სოციალურ ქსელებში</span>
              <Socials />
            </div>
          </div>

          <div className="contact-map" data-reveal="0.15">
            <iframe
              title="iCare Georgia — გლდანი მოლი"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="map-pill">
              <LuMapPin /> გლდანი მოლი • თბილისი <LuArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
