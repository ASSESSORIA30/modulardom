import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import {
  Clock,
  Leaf,
  Compass,
  Scale,
  Shield,
  Sparkles,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const BENEFITS = [
  {
    icon: Clock,
    metric: '70%',
    title: 'Más rápido',
    description:
      'Mientras una obra tradicional consume 12 a 18 meses, nosotros entregamos tu casa en 12 a 16 semanas. Sin paradas por clima, sin imprevistos.',
    large: true,
  },
  {
    icon: Leaf,
    metric: 'A+',
    title: 'Eficiencia energética certificada',
    description:
      'Aerotermia, triple vidrio, aislamiento continuo y fotovoltaica integrada. Tu factura energética, casi simbólica.',
  },
  {
    icon: Compass,
    metric: '100%',
    title: 'Personalización milimétrica',
    description:
      'Desde la orientación hasta el tirador de la puerta: cada decisión es tuya, cada acabado firmado por nuestro estudio.',
  },
  {
    icon: Scale,
    metric: '—35%',
    title: 'Frente a obra tradicional',
    description:
      'Construimos en atelier, sin sobrecostes imprevistos. Precio cerrado, presupuesto garantizado.',
  },
  {
    icon: Shield,
    metric: '20 años',
    title: 'Garantía estructural',
    description:
      'Cada módulo se fabrica bajo norma CTE y UNE-EN ISO 9001. Respaldo total, tranquilidad absoluta.',
    large: true,
  },
  {
    icon: Sparkles,
    metric: '∞',
    title: 'Ampliable en el futuro',
    description:
      'Añade un módulo, un ala, una planta. Tu casa crece cuando tu vida lo hace.',
  },
]

export default function Benefits() {
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

      // Card reveals with stagger
      const cards = sectionRef.current.querySelectorAll('[data-benefit]')
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: {
          amount: 0.5,
          from: 'start',
          grid: 'auto',
        },
        ease: 'expo.out',
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-navy-700 text-cream-200 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-4">
            <div className="section-label text-cream-200/50">
              <span className="text-gold-400">04</span> / 07 — POR QUÉ MODULARDOM
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              ref={headingRef}
              className="font-display text-display leading-[0.95] tracking-tightest"
            >
              Seis razones.
              <br />
              <em className="italic text-gold-400 font-light">Cero</em>{' '}
              concesiones.
            </h2>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitCard({ icon: Icon, metric, title, description, large }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
    gsap.to(ref.current, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1000,
      duration: 0.6,
      ease: 'power2.out',
    })
  }
  const handleLeave = () => {
    gsap.to(ref.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'expo.out',
    })
  }

  return (
    <article
      ref={ref}
      data-benefit
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className={`group relative p-8 md:p-10 bg-navy-800 border border-cream-200/[0.07] rounded-sm overflow-hidden transition-colors duration-500 hover:border-gold-400/30 ${
        large ? 'md:col-span-2' : ''
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative flex items-start justify-between mb-8 md:mb-12">
        <div className="w-11 h-11 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-700 transition-colors duration-500">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div className="font-display text-5xl md:text-6xl tracking-tightest text-gold-400 leading-none">
          {metric}
        </div>
      </div>

      <h3 className="relative font-display text-2xl md:text-3xl tracking-tighter-2 leading-tight mb-3">
        {title}
      </h3>
      <p className="relative text-cream-200/70 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </article>
  )
}
