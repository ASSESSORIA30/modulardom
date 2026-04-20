import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const MODEL_OPTIONS = ['Atlas', 'Solar', 'Cantilever', 'Kyoto', 'A medida']
const BUDGET_OPTIONS = [
  '< 250.000 €',
  '250k — 400k €',
  '400k — 600k €',
  '> 600.000 €',
]

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    model: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

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
            stagger: 0.05,
          })
        },
      })

      const formEl = sectionRef.current.querySelector('[data-form]')
      if (formEl) {
        gsap.from(formEl.querySelectorAll('[data-field]'), {
          opacity: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formEl,
            start: 'top 75%',
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo: no backend. Replace with fetch to your endpoint.
    console.log('Form submitted:', form)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-navy-800 text-cream-200 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-4 md:gap-8 mb-12 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="section-label text-cream-200/50">
              <span className="text-gold-400">06</span> / 07 — CONTACTO
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              ref={headingRef}
              className="font-display text-display leading-[0.95] tracking-tightest"
            >
              Solicita tu
              <br />
              <em className="italic text-gold-400 font-light">proyecto</em>.
            </h2>
            <p className="mt-8 max-w-md text-cream-200/70 text-lg leading-relaxed">
              Cuéntanos sobre tu parcela y tu visión. Te responderemos en menos
              de 24 horas con una primera propuesta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-10">
          {/* Form */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            {submitted ? (
              <div
                data-form
                className="py-20 border-t border-b border-cream-200/10"
              >
                <div className="section-label text-gold-400 mb-4">
                  — RECIBIDO
                </div>
                <h3 className="font-display text-4xl md:text-6xl tracking-tightest leading-tight mb-4">
                  Gracias, {form.name.split(' ')[0] || 'pronto hablamos'}.
                </h3>
                <p className="text-cream-200/70 max-w-md">
                  Nuestro equipo ha recibido tu solicitud. Te escribiremos desde{' '}
                  <span className="text-gold-400">hola@modulardom.com</span> en
                  las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form
                data-form
                onSubmit={handleSubmit}
                className="space-y-0 border-t border-cream-200/10"
              >
                <Field
                  label="Nombre completo"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                />

                {/* Chip selectors: model */}
                <div
                  data-field
                  className="py-6 border-b border-cream-200/10 grid grid-cols-12 gap-4 items-start"
                >
                  <label className="col-span-12 md:col-span-4 section-label text-cream-200/50 pt-2">
                    Modelo
                  </label>
                  <div className="col-span-12 md:col-span-8 flex flex-wrap gap-2">
                    {MODEL_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm({ ...form, model: opt })}
                        className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                          form.model === opt
                            ? 'bg-gold-400 border-gold-400 text-navy-700'
                            : 'border-cream-200/20 text-cream-200/80 hover:border-gold-400/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div
                  data-field
                  className="py-6 border-b border-cream-200/10 grid grid-cols-12 gap-4 items-start"
                >
                  <label className="col-span-12 md:col-span-4 section-label text-cream-200/50 pt-2">
                    Presupuesto
                  </label>
                  <div className="col-span-12 md:col-span-8 flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm({ ...form, budget: opt })}
                        className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                          form.budget === opt
                            ? 'bg-gold-400 border-gold-400 text-navy-700'
                            : 'border-cream-200/20 text-cream-200/80 hover:border-gold-400/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div
                  data-field
                  className="py-6 border-b border-cream-200/10 grid grid-cols-12 gap-4 items-start"
                >
                  <label
                    htmlFor="message"
                    className="col-span-12 md:col-span-4 section-label text-cream-200/50 pt-2"
                  >
                    Cuéntanos
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Háblanos de tu parcela, tu visión, tus plazos…"
                    value={form.message}
                    onChange={handleChange}
                    className="col-span-12 md:col-span-8 bg-transparent text-cream-200 text-lg placeholder:text-cream-200/30 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit */}
                <div data-field className="pt-10">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gold-400 text-navy-700 font-medium text-sm uppercase tracking-widest hover:bg-cream-200 transition-colors duration-500"
                  >
                    <span>Enviar solicitud</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                  <p className="mt-4 text-xs text-cream-200/40">
                    Al enviar aceptas nuestra política de privacidad.
                    Información tratada con la máxima confidencialidad.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Side info */}
          <aside className="col-span-12 md:col-span-5 lg:col-span-4 md:pl-10 lg:pl-16 space-y-10 border-t md:border-t-0 md:border-l border-cream-200/10 pt-10 md:pt-0">
            <div>
              <div className="section-label text-gold-400 mb-3">ATELIER</div>
              <p className="font-display text-2xl tracking-tighter-2 leading-tight">
                Carrer de la Indústria, 14
                <br />
                08202 Sabadell
                <br />
                Barcelona — ES
              </p>
            </div>
            <div>
              <div className="section-label text-gold-400 mb-3">CONTACTO</div>
              <p className="space-y-1 text-cream-200/80">
                <a href="mailto:hola@modulardom.com" className="block link-underline">
                  hola@modulardom.com
                </a>
                <a href="tel:+34931000000" className="block link-underline">
                  +34 931 000 000
                </a>
              </p>
            </div>
            <div>
              <div className="section-label text-gold-400 mb-3">HORARIO</div>
              <p className="text-cream-200/80 text-sm leading-relaxed">
                Lunes a viernes · 9:00 — 19:00
                <br />
                Visitas al atelier con cita previa.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, value, onChange, required }) {
  return (
    <div
      data-field
      className="py-6 border-b border-cream-200/10 grid grid-cols-12 gap-4 items-center"
    >
      <label
        htmlFor={name}
        className="col-span-12 md:col-span-4 section-label text-cream-200/50"
      >
        {label}
        {required && <span className="text-gold-400"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        className="col-span-12 md:col-span-8 bg-transparent text-cream-200 text-lg placeholder:text-cream-200/30 focus:outline-none focus:text-gold-400 transition-colors"
      />
    </div>
  )
}
