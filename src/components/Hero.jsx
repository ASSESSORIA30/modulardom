import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

// Lazy-load the 3D scene so the initial page paint is instant.
// The heavy Three.js chunk only downloads AFTER the rest of the page is interactive.
const ModularHouse3D = lazy(() => import('./ModularHouse3D'))

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const metaRef = useRef(null)
  const ctaRef = useRef(null)
  const sideRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitType(titleRef.current, {
        types: 'lines,words',
        lineClass: 'reveal-line',
      })

      gsap.set(split.words, { yPercent: 110 })
      gsap.set([subtitleRef.current, metaRef.current, ctaRef.current, sideRef.current], {
        opacity: 0,
        y: 30,
      })
      gsap.set(canvasWrapRef.current, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.3 })
      tl.to(split.words, {
        yPercent: 0,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.06,
      })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=1')
        .to(metaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.8')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.7')
        .to(sideRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.7')
        // 3D fades in last
        .to(canvasWrapRef.current, { opacity: 1, duration: 1.8, ease: 'power2.out' }, '-=0.5')

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollRef.current = self.progress
        },
      })

      gsap.to(titleRef.current, {
        yPercent: -20,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-cream-200 arch-grid"
    >
      {/* 3D house layer — lazy loaded, fades in after content */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <ModularHouse3D scrollRef={scrollRef} className="w-full h-full" />
        </Suspense>
      </div>

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 pt-28 md:pt-32 px-6 md:px-12 z-10 pointer-events-none">
        <div className="flex justify-between items-start section-label text-navy-700/50">
          <span>CASAS MODULARES / ARQUITECTURA DE AUTOR</span>
          <span className="hidden md:inline">BARCELONA — MADRID — LISBOA</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <h1
              ref={titleRef}
              className="font-display text-hero leading-[0.9] tracking-tightest text-navy-700"
            >
              Diseñamos
              <br />
              el futuro de
              <br />
              tu <em className="italic text-gold-400 font-light">hogar.</em>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-8 md:mt-10 max-w-md text-base md:text-lg text-navy-700/70 leading-relaxed"
            >
              Arquitectura modular fabricada con precisión milimétrica.
              Entregada en semanas. Concebida para una vida sin compromisos.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:pb-4">
            <div ref={metaRef} className="space-y-6 lg:text-right">
              <div>
                <div className="section-label text-navy-700/50">Tiempo de entrega</div>
                <div className="font-display text-4xl md:text-5xl text-navy-700 mt-1 tracking-tighter">
                  12<span className="text-gold-400">/</span>16
                  <span className="text-base font-sans text-navy-700/60 ml-2">
                    semanas
                  </span>
                </div>
              </div>
              <div>
                <div className="section-label text-navy-700/50">Proyectos entregados</div>
                <div className="font-display text-4xl md:text-5xl text-navy-700 mt-1 tracking-tighter">
                  247<span className="text-gold-400">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={ctaRef}
          className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
        >
          <button
            onClick={() => {
              const target = document.querySelector('#models')
              if (window.lenis) {
                window.lenis.scrollTo(target, { offset: -20, duration: 1.6 })
              }
            }}
            className="btn-primary group"
          >
            <span>Descubre tu casa</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>

          <button
            onClick={() => {
              const target = document.querySelector('#about')
              if (window.lenis) {
                window.lenis.scrollTo(target, { offset: -20, duration: 1.6 })
              }
            }}
            className="flex items-center gap-3 text-sm font-medium text-navy-700 link-underline"
          >
            <span className="w-8 h-8 rounded-full border border-navy-700/30 flex items-center justify-center">
              <ArrowDown size={12} />
            </span>
            Descubre el concepto
          </button>
        </div>

        <div
          ref={sideRef}
          className="mt-12 md:mt-20 pt-6 border-t border-navy-700/10 flex flex-col md:flex-row justify-between gap-4 text-xs md:text-sm text-navy-700/60"
        >
          <span className="section-label">EDICIÓN 2026 / COLECCIÓN ATLAS</span>
          <span className="section-label">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400 mr-2 animate-shimmer" />
            DISPONIBLE PARA RESERVA
          </span>
        </div>
      </div>
    </section>
  )
}
