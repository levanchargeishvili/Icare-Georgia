import { useRef } from 'react'
import { gsap, useGSAP, finePointer, reduceMotion } from '../lib/gsap'

/** Trailing ring that grows over interactive elements (mouse only). */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!finePointer || reduceMotion) return
    const el = ring.current!
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
    let shown = false

    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      if (!shown) {
        shown = true
        gsap.to(el, { autoAlpha: 1, duration: 0.3 })
      }
    }
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element).closest('a, button, [data-cursor]')
      el.classList.toggle('is-hover', !!hit)
    }
    const leave = () => {
      shown = false
      gsap.to(el, { autoAlpha: 0, duration: 0.3 })
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  })

  if (!finePointer || reduceMotion) return null
  return <div className="cursor" ref={ring} aria-hidden="true" />
}
