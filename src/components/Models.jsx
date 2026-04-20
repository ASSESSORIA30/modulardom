import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const MODELS = [
  {
    id: 'atlas',
    code: 'MD—01',
    name: 'Atlas',
    size: '85 m²',
    price: 'Desde 189.000 €',
    tag: 'Edición esencial',
    description:
      'Monovolumen puro. Tres módulos alineados sobre plinto de acero patinado. Pensado para entornos donde el paisaje es el verdadero protagonista.',
    image:
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&q=90&w=1800',
  },
  {
    id: 'solar',
    code: 'MD—02',
    name: 'Solar',
    size: '142 m²',
    price: 'Desde 312.000 €',
    tag: 'Edición familiar',
    description:
      'Dos plantas en disposición L. Patio interior vidriado, cubierta fotovoltaica integrada y zócalo de piedra natural. Vivir en luz.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=90&w=1800',
  },
  {
    id: 'cantilever',
    code: 'MD—03',
    name: 'Cantilever',
    size: '210 m²',
    price: 'Desde 485.000 €',
    tag: 'Edición firma',
    description:
      'Volumen superior en voladizo de 4,2 metros. Concebido para parcelas con pendiente. Mirador panorámico y suite principal suspendida.',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=90&w=1800',
  },
  {
    id: 'kyoto',
    code: 'MD—04',
    name: 'Kyoto',
    size: '168 m²',
    price: 'Desde 395.000 €',
    tag: 'Edición wabi',
    description:
      'Inspirada en la sobriedad japonesa. Madera quemada al exterior, papel washi lacado, patio zen central y ofuro bajo claraboya.',
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=90&w=1800',
  },
]

export default function Models() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const trackRef = useRef(null)
  const pinContainerRef = useRef(null)

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

      // Horizontal scroll on desktop
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current
        const getDistance = () => track.scrollWidth - window.innerWidth + 80

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinContainerRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="models"
      ref={sectionRef}
      className="relative bg-navy-700 text-cream-200 overflow-hidden"
    >
      {/* Heading block */}
      <div className="pt-24 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="section-label text-cream-200/50">
              <span className="text-gold-400">02</span> / 07 — COLECCIÓN
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              ref={headingRef}
              className="font-display text-display leading-[0.95] tracking-tightest"
            >
              Cuatro arquetipos.
              <br />
              <em className="italic text-gold-400 font-light">Infinitas</em>{' '}
              configuraciones.
            </h2>
            <p className="mt-8 max-w-md text-cream-200/70 text-lg leading-relaxed">
              Una colección curada, no un catálogo. Cada modelo se adapta a tu
              parcela, a tu luz, a tu forma de vivir.
            </p>
          </div>
        </div>
      </div>

      {/* Pin container for horizontal scroll */}
      <div ref={pinContainerRef} className="relative">
        <div className="lg:h-screen overflow-hidden flex items-center">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-6 md:gap-10 px-6 md:px-12 lg:pr-32 lg:will-change-transform"
          >
            {MODELS.map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} />
            ))}
            {/* End card — CTA */}
            <div className="flex-shrink-0 w-full lg:w-[480px] flex flex-col justify-center gap-6 lg:pl-8 border-t lg:border-t-0 lg:border-l border-cream-200/10 pt-10 lg:pt-0">
              <div className="section-label text-gold-400">
                CONFIGURACIONES A MEDIDA
              </div>
              <h3 className="font-display text-4xl md:text-5xl tracking-tightest leading-[0.95]">
                ¿Ninguna encaja?
                <br />
                <em className="italic text-gold-400 font-light">
                  Diseñamos la tuya.
                </em>
              </h3>
              <p className="text-cream-200/70 leading-relaxed">
                Cada proyecto es un punto de partida. Cuéntanos cómo quieres
                vivir y nuestro estudio componerá la arquitectura que lo
                haga posible.
              </p>
              <button
                onClick={() => {
                  const target = document.querySelector('#contact')
                  if (window.lenis) {
                    window.lenis.scrollTo(target, { offset: -20, duration: 1.6 })
                  }
                }}
                className="inline-flex items-center gap-3 text-sm font-medium text-cream-200 link-underline self-start"
              >
                Iniciar un proyecto
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6 md:px-12 section-label text-cream-200/40 flex justify-between">
        <span>DESPLÁZATE PARA EXPLORAR</span>
        <span>04 MODELOS</span>
      </div>
    </section>
  )
}

function ModelCard({ model, index }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      )
    }, cardRef)
    return () => ctx.revert()
  }, [])

  return (
    <article
      ref={cardRef}
      data-cursor="view"
      className="group flex-shrink-0 w-full lg:w-[560px] cursor-view"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-500">
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <img
            src={model.image}
            alt={`Modelo ${model.name}`}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-700/60 via-transparent to-transparent" />

        {/* Top code */}
        <div className="absolute top-5 left-5 section-label text-cream-200/90">
          {model.code}
        </div>
        <div className="absolute top-5 right-5 section-label text-gold-400">
          {model.tag}
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-5xl md:text-6xl tracking-tightest leading-none">
              {model.name}
            </h3>
            <ArrowUpRight
              size={28}
              className="text-gold-400 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between gap-6">
        <p className="text-sm md:text-base text-cream-200/75 leading-relaxed max-w-sm">
          {model.description}
        </p>
        <div className="text-right flex-shrink-0 space-y-1">
          <div className="section-label text-cream-200/50">{model.size}</div>
          <div className="text-sm text-gold-400">{model.price}</div>
        </div>
      </div>
    </article>
  )
}
