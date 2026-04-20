import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Encuentro',
    duration: '1 — 2 semanas',
    description:
      'Visitamos tu parcela y escuchamos cómo imaginas vivir. Después, una reunión en nuestro atelier para trazar las primeras líneas maestras.',
    keywords: ['Consulta', 'Visita técnica', 'Briefing'],
  },
  {
    number: '02',
    title: 'Diseño',
    duration: '4 — 6 semanas',
    description:
      'Nuestro estudio desarrolla el proyecto completo: planimetría, renders hiperrealistas, selección de materiales y pliego técnico. Iteramos hasta que cada centímetro sea tuyo.',
    keywords: ['Anteproyecto', 'Renders 3D', 'Memoria'],
  },
  {
    number: '03',
    title: 'Fabricación',
    duration: '6 — 8 semanas',
    description:
      'Construimos los módulos en nuestra planta de Sabadell bajo condiciones controladas. Cero intemperie, cero improvisación, tolerancia milimétrica.',
    keywords: ['Atelier', 'Control de calidad', 'Seguimiento en directo'],
  },
  {
    number: '04',
    title: 'Instalación',
    duration: '2 — 5 días',
    description:
      'La casa viaja en camión y se ensambla en tu terreno. En menos de una semana tienes las llaves, la luz entrando por las ventanas y un café en la cocina.',
    keywords: ['Cimentación', 'Transporte', 'Entrega llave en mano'],
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const lineRef = useRef(null)
  const stepsWrapRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitType(headingRef.current, {
        types: 'lines,words',
        lineClass: 'reveal-line',
      })
      gsap.set(split.words, { yPercent: 110 })
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(split.words, {
            yPercent: 0,
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.04,
          })
        },
      })

      // Animated vertical line fills as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: stepsWrapRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.8,
          },
        }
      )

      // Step reveals
      const steps = stepsWrapRef.current.querySelectorAll('[data-step]')
      steps.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-cream-200 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-28">
          <div className="col-span-12 md:col-span-4">
            <div className="section-label text-navy-700/50">
              <span className="text-gold-400">03</span> / 07 — PROCESO
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              ref={headingRef}
              className="font-display text-display leading-[0.95] tracking-tightest text-navy-700"
            >
              De la primera
              <br />
              conversación a las{' '}
              <em className="italic text-gold-400 font-light">llaves</em>.
            </h2>
            <p className="mt-8 max-w-md text-navy-700/70 text-lg leading-relaxed">
              Cuatro etapas. Un único interlocutor. Cero sorpresas.
              Transparencia radical en cada decisión.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div ref={stepsWrapRef} className="relative pl-4 md:pl-0">
          {/* Animated line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-navy-700/10 -translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold-400 -translate-x-1/2 origin-top"
          />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              data-step
              className={`relative py-10 md:py-20 grid grid-cols-12 gap-4 md:gap-8 items-start ${
                i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
              }`}
            >
              {/* Dot on line */}
              <div className="absolute left-4 md:left-1/2 top-10 md:top-20 w-3 h-3 rounded-full bg-gold-400 -translate-x-1/2 ring-4 ring-cream-200" />

              {/* Number */}
              <div
                className={`col-span-12 md:col-span-6 ${
                  i % 2 === 0 ? 'md:text-right md:pr-20' : 'md:pl-20'
                } pl-8 md:pl-0`}
              >
                <div className="section-label text-navy-700/40 mb-3">
                  ETAPA {step.number}
                </div>
                <h3 className="font-display text-6xl md:text-8xl leading-none tracking-tightest text-navy-700">
                  {step.title}
                </h3>
                <div className="mt-4 text-gold-400 text-sm font-mono tracking-widest">
                  {step.duration}
                </div>
              </div>

              {/* Content */}
              <div
                className={`col-span-12 md:col-span-6 ${
                  i % 2 === 0 ? 'md:pl-20' : 'md:pr-20 md:text-right'
                } pl-8 md:pl-20`}
              >
                <p className="text-lg md:text-xl leading-relaxed text-navy-700/80">
                  {step.description}
                </p>
                <div
                  className={`mt-6 flex flex-wrap gap-2 ${
                    i % 2 === 0 ? '' : 'md:justify-end'
                  }`}
                >
                  {step.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-2 px-3 py-1.5 border border-navy-700/15 rounded-full text-xs text-navy-700/70"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold-400" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
