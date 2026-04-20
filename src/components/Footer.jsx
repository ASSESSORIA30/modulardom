import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const megaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        megaRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: megaRef.current,
            start: 'top 85%',
          },
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative bg-navy-800 text-cream-200 pt-20 md:pt-32 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Mega brand */}
        <div ref={megaRef} className="text-center md:text-left pb-8 md:pb-12 border-b border-cream-200/10">
          <div className="font-display text-[22vw] md:text-[18vw] leading-[0.85] tracking-tightest">
            ModularDom<span className="text-gold-400">.</span>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 md:py-16">
          <div>
            <div className="section-label text-gold-400 mb-4">NAVEGACIÓN</div>
            <ul className="space-y-2 text-cream-200/75 text-sm">
              <li><a href="#about" className="link-underline">Concepto</a></li>
              <li><a href="#models" className="link-underline">Modelos</a></li>
              <li><a href="#process" className="link-underline">Proceso</a></li>
              <li><a href="#gallery" className="link-underline">Galería</a></li>
              <li><a href="#contact" className="link-underline">Contacto</a></li>
            </ul>
          </div>
          <div>
            <div className="section-label text-gold-400 mb-4">ATELIER</div>
            <p className="text-cream-200/75 text-sm leading-relaxed">
              Carrer de la Indústria, 14<br />
              08202 Sabadell<br />
              Barcelona, España
            </p>
          </div>
          <div>
            <div className="section-label text-gold-400 mb-4">CONTACTO</div>
            <ul className="space-y-2 text-cream-200/75 text-sm">
              <li><a href="mailto:hola@modulardom.com" className="link-underline">hola@modulardom.com</a></li>
              <li><a href="tel:+34931000000" className="link-underline">+34 931 000 000</a></li>
            </ul>
          </div>
          <div>
            <div className="section-label text-gold-400 mb-4">SÍGUENOS</div>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cream-200/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cream-200/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cream-200/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-cream-200/10 text-xs text-cream-200/40 section-label">
          <span>© 2026 MODULARDOM S.L. · TODOS LOS DERECHOS RESERVADOS</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-400">LEGAL</a>
            <a href="#" className="hover:text-gold-400">PRIVACIDAD</a>
            <a href="#" className="hover:text-gold-400">COOKIES</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
