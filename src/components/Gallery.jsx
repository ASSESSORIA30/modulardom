import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=90&w=1600',
    alt: 'Villa moderna sobre plinto de hormigón',
    caption: 'Atlas · Girona',
    span: 'col-span-12 md:col-span-8 aspect-[16/10]',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=90&w=1200',
    alt: 'Salón con ventanal a paisaje',
    caption: 'Solar · Ibiza',
    span: 'col-span-12 md:col-span-4 aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=90&w=1200',
    alt: 'Detalle de fachada en madera y hormigón',
    caption: 'Cantilever · Costa Brava',
    span: 'col-span-6 md:col-span-4 aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=90&w=1600',
    alt: 'Dormitorio principal con vistas',
    caption: 'Kyoto · Menorca',
    span: 'col-span-6 md:col-span-4 aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=90&w=1600',
    alt: 'Cocina integrada en madera',
    caption: 'Atlas · Mallorca',
    span: 'col-span-12 md:col-span-4 aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=90&w=1600',
    alt: 'Piscina de acero inoxidable al atardecer',
    caption: 'Solar · Tarragona',
    span: 'col-span-12 md:col-span-8 aspect-[16/10]',
  },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

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

      // Image reveals
      const items = sectionRef.current.querySelectorAll('[data-img]')
      items.forEach((item) => {
        const img = item.querySelector('img')
        gsap.fromTo(
          item,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        )
        // Parallax inside
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-cream-200 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-4">
            <div className="section-label text-navy-700/50">
              <span className="text-gold-400">05</span> / 07 — PORTFOLIO
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              ref={headingRef}
              className="font-display text-display leading-[0.95] tracking-tightest text-navy-700"
            >
              Casas que ya son{' '}
              <em className="italic text-gold-400 font-light">hogar</em>.
            </h2>
            <p className="mt-8 max-w-md text-navy-700/70 text-lg leading-relaxed">
              Una selección de proyectos entregados entre 2023 y 2026.
              Fotografía de Adrià Goula, Ana Amado y equipo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-6">
          {IMAGES.map((img, i) => (
            <figure
              key={i}
              data-img
              data-cursor="view"
              className={`relative overflow-hidden bg-navy-500 group cursor-view ${img.span}`}
            >
              <div className="absolute inset-0">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover will-change-transform transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-700/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-4 left-5 section-label text-cream-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
