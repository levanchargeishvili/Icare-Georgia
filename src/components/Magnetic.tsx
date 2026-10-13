import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, finePointer, reduceMotion } from '../lib/gsap'

/** Pulls its child toward the pointer and springs back on leave. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!finePointer || reduceMotion) return
    const el = ref.current!
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - r.left - r.width / 2) * strength)
      yTo((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  })

  return (
    <span className="magnetic" ref={ref}>
      {children}
    </span>
  )
}
