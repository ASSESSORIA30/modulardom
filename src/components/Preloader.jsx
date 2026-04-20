import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const containerRef = useRef(null)
  const barRef = useRef(null)
  const labelRef = useRef(null)
  const brandRef = useRef(null)

  useEffect(() => {
    let current = 0
    const duration = 2200 // total ms
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress)
      current = Math.round(eased * 100)
      setCount(current)

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased})`
      }

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        // Exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete?.()
          },
        })
        tl.to(labelRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.7,
          ease: 'expo.inOut',
        })
          .to(
            brandRef.current,
            {
              y: -40,
              opacity: 0,
              duration: 0.7,
              ease: 'expo.inOut',
            },
            '<0.05'
          )
          .to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 1.1,
              ease: 'expo.inOut',
            },
            '<0.2'
          )
      }
    }
    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-navy-700 text-cream-200 flex flex-col justify-between p-6 md:p-12"
    >
      <div className="flex justify-between items-start">
        <div ref={brandRef} className="font-display text-2xl md:text-3xl tracking-tighter-2">
          ModularDom<span className="text-gold-400">.</span>
        </div>
        <div className="section-label text-cream-200/60">
          EST. 2024 / BCN
        </div>
      </div>

      <div ref={labelRef} className="flex items-end justify-between">
        <div>
          <div className="section-label text-gold-400 mb-3">CARGANDO EXPERIENCIA</div>
          <div className="font-display text-[18vw] md:text-[12vw] leading-none tracking-tightest">
            {String(count).padStart(3, '0')}
          </div>
        </div>
        <div className="hidden md:block text-right max-w-xs">
          <div className="section-label text-cream-200/50 mb-2">01 — 07</div>
          <p className="text-sm text-cream-200/70 leading-relaxed">
            Diseñando espacios que redefinen la idea de hogar.
          </p>
        </div>
      </div>

      <div className="relative w-full h-[1px] bg-cream-200/15 overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 bg-gold-400 preloader-bar"
        />
      </div>
    </div>
  )
}
