# ModularDom — Web corporativa

Sitio web premium para **ModularDom**, marca dedicada a casas modulares de lujo. Construido con una estética editorial-arquitectónica inspirada en Tesla, Apple, ICON y los grandes estudios de arquitectura internacional.

---

## 🏛️ Filosofía de diseño

- **Tipografía**: `Fraunces` (serif variable editorial) + `Manrope` (sans moderna) + `JetBrains Mono` (datos / labels).
- **Paleta**: Azul marino `#0A1628` · Dorado champagne `#C9A961` · Crema `#F7F4EE`.
- **Estética**: minimalismo refinado, numeración editorial (01/07), grandes tipografías display, mucho aire, acentos dorados milimétricos.
- **Movimiento**: scroll orquestado con Lenis + GSAP ScrollTrigger, reveals tipográficos por palabra, horizontal scroll en Modelos, parallax en imágenes, 3D en hero.

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | React 18 + Vite 5 |
| Estilos | Tailwind CSS 3 (sistema de diseño tokens) |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Animación | GSAP (+ ScrollTrigger) + Framer Motion |
| Scroll suave | Lenis |
| Utilidades | split-type, lucide-react |

---

## 🚀 Puesta en marcha

```bash
# 1. Instala dependencias
npm install

# 2. Arranca el entorno de desarrollo
npm run dev
# → http://localhost:5173

# 3. Build de producción
npm run build

# 4. Previsualiza el build
npm run preview
```

### Requisitos
- Node.js 18+ (recomendado 20 LTS)
- npm 9+ (o pnpm / yarn equivalentes)

---

## 📁 Estructura de archivos

```
modulardom-web/
├── index.html                    # HTML raíz + carga de fuentes
├── package.json                  # Dependencias y scripts
├── vite.config.js                # Configuración Vite
├── tailwind.config.js            # Sistema de diseño (colores, fonts, anims)
├── postcss.config.js
├── public/
│   └── favicon.svg               # Favicon monograma
└── src/
    ├── main.jsx                  # Entry React
    ├── App.jsx                   # Composición general
    ├── index.css                 # Reset + tokens + utilidades custom
    └── components/
        ├── SmoothScroll.jsx      # Lenis + sincronía con ScrollTrigger
        ├── Preloader.jsx         # Pantalla de carga 000 → 100
        ├── CustomCursor.jsx      # Cursor dorado con follow suave
        ├── Navbar.jsx            # Header fijo + menú fullscreen móvil
        ├── Hero.jsx              # Sección hero con 3D
        ├── ModularHouse3D.jsx    # Casa modular procedural Three.js
        ├── Marquee.jsx           # Tipografía deslizante
        ├── About.jsx             # "Sobre nosotros" + contadores
        ├── Models.jsx            # 4 modelos con scroll horizontal
        ├── Process.jsx           # Timeline de 4 etapas
        ├── Benefits.jsx          # Bento grid 6 razones (tilt 3D)
        ├── Gallery.jsx           # Grid asimétrico con parallax
        ├── Contact.jsx           # Formulario + datos
        └── Footer.jsx            # Mega-tipografía de cierre
```

---

## 🎯 Secciones y animaciones

| # | Sección | Animación estrella |
|---|---|---|
| 00 | **Preloader** | Contador 0–100 con barra dorada · salida en `clipPath` |
| 01 | **Hero** | Casa 3D rotando · título con SplitType reveal por palabras · parallax al scrollear |
| 02 | **Marquee** | Deslizante infinito con keywords de marca |
| 03 | **Sobre nosotros** | Reveal tipográfico · contadores animados · imagen con `clipPath` y parallax |
| 04 | **Modelos** | Scroll **horizontal pinneado** en desktop, vertical en móvil · zoom-out en imágenes al entrar |
| 05 | **Proceso** | Línea dorada vertical que se "dibuja" con scroll · 4 etapas alternadas |
| 06 | **Beneficios** | Bento grid con **tilt 3D** al pasar cursor · hover gradient |
| 07 | **Galería** | Grid asimétrico 12 col · imágenes con reveal mask y parallax interno |
| 08 | **Contacto** | Formulario editorial con selectores tipo chip · stagger de campos |
| 09 | **Footer** | Mega-tipografía `ModularDom.` al 18vw |

---

## 🖼️ Recomendaciones de imágenes y vídeo

La web usa placeholders de **Unsplash** ya listos para demo. Para producción sustitúyelos por fotografía profesional:

### Qué encargar

1. **Hero (o fondo 3D actual)**
   Si prefieres vídeo en lugar del 3D: plano cenital/aéreo de una casa modular al amanecer, 4K, 20–30 s en loop, <4 MB comprimido con **Handbrake** (H.265, bitrate 3000 kbps).
   👉 Fotógrafos referentes: **Adrià Goula**, **Iwan Baan**, **Fernando Guerra (FG+SG)**.

2. **Sección "Sobre nosotros" (atelier)**
   Imagen horizontal 21:9 del taller/fábrica o de una casa finalizada con el paisaje. 2400px ancho mínimo.

3. **Modelos (4 tarjetas 4:5)**
   Una foto principal por modelo, formato vertical. Idealmente en diferentes paletas (día, tarde, invierno, noche) para variedad visual.

4. **Galería (6 imágenes asimétricas)**
   Mezcla de planos amplios (exterior) y detalles (cocina, baño, fachada). Dale jerarquía: 2 grandes, 4 medianas.

### Optimización
- Formato **AVIF** o **WebP** (Squoosh.app es gratis y excelente).
- Sirve diferentes resoluciones con `srcset` si el tráfico lo justifica.
- Lazy-loading ya aplicado en todas las `<img>`.

### Alternativas de stock premium
- [Unsplash](https://unsplash.com) (gratis, buena calidad)
- [Pexels](https://pexels.com)
- [Stocksy](https://stocksy.com) (pago, calidad editorial)
- [Death to Stock](https://deathtothestockphoto.com) (suscripción)

### Renders 3D
Si no tienes fotografía, usa **Lumion**, **D5 Render** o **Enscape** con modelos de tus casas. Estilo: cielos dramáticos, luz dorada, mobiliario minimalista.

---

## 🌍 Despliegue

### Vercel (recomendado)
```bash
npm i -g vercel
vercel
```
O conecta el repositorio Git y Vercel detectará Vite automáticamente.

### Netlify
```bash
npm run build
# Arrastra la carpeta /dist a https://app.netlify.com
```
O conecta el repo: build command `npm run build`, publish directory `dist`.

### Cloudflare Pages
1. Conecta tu repo
2. Build command: `npm run build`
3. Build output: `dist`

### Servidor propio (Nginx)
```nginx
server {
  listen 80;
  server_name modulardom.com www.modulardom.com;
  root /var/www/modulardom/dist;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
  gzip on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
```

---

## 🎨 Personalización

### Cambiar colores de marca
Edita `tailwind.config.js`:
```js
colors: {
  navy: { 700: '#TU_COLOR' },
  gold: { 400: '#TU_DORADO' },
}
```
También actualiza las variables CSS en `src/index.css` (`:root`).

### Cambiar la tipografía
1. Edita la etiqueta `<link>` en `index.html` con las fuentes de Google Fonts que elijas.
2. Actualiza `fontFamily` en `tailwind.config.js`.

### Añadir un modelo de casa
Abre `src/components/Models.jsx` y añade un objeto al array `MODELS`. El layout se adapta automáticamente.

### Modificar el 3D
`src/components/ModularHouse3D.jsx` contiene la casa procedural. Puedes:
- Ajustar proporciones, ventanas y materiales en `HouseMesh`.
- Sustituir por un modelo `.glb` usando `useGLTF` de drei:
  ```jsx
  import { useGLTF } from '@react-three/drei'
  const { scene } = useGLTF('/models/casa.glb')
  return <primitive object={scene} />
  ```

### Conectar el formulario
En `src/components/Contact.jsx`, reemplaza el `console.log` en `handleSubmit` por una llamada real a:
- **Formspree** (fácil, sin backend)
- **Resend** / **SendGrid** via función serverless en Vercel/Netlify
- Tu propio endpoint

---

## ⚡ Performance checklist

- [x] Fuentes precargadas con `preconnect`
- [x] Lazy loading en todas las imágenes
- [x] GSAP con `scrub` para scroll eficiente
- [x] Lenis con `lagSmoothing(0)` para sincronía perfecta con ScrollTrigger
- [x] `will-change` en elementos animados
- [x] Tailwind PurgeCSS elimina CSS no utilizado en build
- [ ] (Pendiente por ti) Reemplazar imágenes Unsplash por WebP/AVIF propios
- [ ] (Pendiente por ti) Añadir Open Graph y Twitter Card tags en `index.html`
- [ ] (Pendiente por ti) Registrar dominio, DNS, SSL

### Lighthouse objetivo
- Performance **90+**
- Accessibility **95+**
- Best Practices **100**
- SEO **100**

---

## 📐 Responsive

- Mobile: 320–767px (menú fullscreen, scroll vertical en modelos, grid 1 columna)
- Tablet: 768–1023px
- Desktop: 1024px+ (scroll horizontal en Modelos, cursor custom, bento 3 columnas)
- Large: 1600px+ (contenido limitado a max-width)

Probado en Chrome, Safari, Firefox (desktop + iOS Safari + Android Chrome).

---

## 📝 Copy: notas editoriales

Todo el texto sigue reglas de tono:
- Frases cortas, una idea por línea
- Evitar adjetivos genéricos ("increíble", "mejor"): preferir concreción ("tolerancia inferior al milímetro")
- Números en lugar de promesas ("12–16 semanas", "247 proyectos", "A+")
- Uso de cursivas para palabras clave emocionales (*hogar*, *componemos*, *infinitas*)
- Cero CTAs agresivos. Todos son invitaciones ("Descubre tu casa", "Iniciar un proyecto")

Si necesitas adaptar el copy para otro país/idioma, todos los strings están en los componentes correspondientes — fácil de extraer a `i18n` si escala.

---

## 🤝 Créditos

- Fotografía demo: [Unsplash](https://unsplash.com) (sustituir en producción)
- Iconos: [Lucide](https://lucide.dev)
- Fuentes: [Google Fonts](https://fonts.google.com) — Fraunces, Manrope, JetBrains Mono

---

**¿Dudas o mejoras?** El código está comentado y estructurado para que cualquier dev frontend pueda intervenir sin fricción.
