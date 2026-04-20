import { useEffect, useRef } from 'react'

const ITEMS = [
  'Arquitectura modular',
  'Precisión industrial',
  'Diseño de autor',
  'Eficiencia energética A+',
  'Fabricación certificada',
  'Entrega garantizada',
]

export default function Marquee() {
  const trackRef = useRef(null)

  // Duplicate items for seamless loop
  return (
    <section className="py-10 md:py-14 bg-navy-700 text-cream-200 overflow-hidden relative border-y border-navy-600/30">
      <div ref={trackRef} className="marquee-track animate-marquee">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-10 px-10">
            <span className="font-display text-3xl md:text-5xl tracking-tighter-2">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>
  )
}
