import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = window.matchMedia('(pointer: fine)').matches

/* ---------- smooth scroll (Lenis driven by the GSAP ticker) ---------- */

const lenis = reduceMotion ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function scrollToTarget(target: string | number) {
  const dest = target === '#home' ? 0 : target
  if (lenis) {
    lenis.scrollTo(dest, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
    return
  }
  if (typeof dest === 'number') window.scrollTo({ top: dest, behavior: 'smooth' })
  else document.querySelector(dest)?.scrollIntoView({ behavior: 'smooth' })
}

export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked)
  if (locked) lenis?.stop()
  else lenis?.start()
}

/* ---------- intro gate: preloader resolves, sections play their entrances ---------- */

let resolveIntro: () => void = () => {}
export const introDone = new Promise<void>((resolve) => {
  resolveIntro = resolve
})
export const finishIntro = () => resolveIntro()
if (reduceMotion) finishIntro()

/* ---------- shared scroll reveals: [data-split] headings, [data-reveal] blocks ---------- */

export function revealIn(scope: Element) {
  if (reduceMotion) return

  scope.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'w' })
    gsap.from(split.words, {
      yPercent: 90,
      autoAlpha: 0,
      rotate: 3,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    })
  })

  scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 48,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'power3.out',
      delay: Number(el.dataset.reveal || 0),
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })
  })
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
