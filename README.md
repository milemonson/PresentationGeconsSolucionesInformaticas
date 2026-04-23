# Geconsas · Consultoría y Gestión Empresarial

Portfolio digital para Geconsas — consultoría y desarrollo Odoo + front-end, análisis de datos y marketing digital.

## 📋 Descripción

Sitio web profesional que presenta los servicios de consultoría empresarial y soluciones digitales. Incluye dos perfiles principales:
- **Numilén Monzón** — Odoo consultant & developer
- **Milena Monzón** — Front-end dev, data analyst & digital marketing

## 🏗️ Estructura del Proyecto

```
Portfolio/
├── index.html              # HTML semántico principal
├── css/
│   └── styles.css          # Estilos CSS con custom properties
├── js/
│   └── script.js           # Interactividad (scroll, reveal, smooth scroll)
├── assets/                 # Imágenes, SVGs, logos
│   ├── gecons_*.svg        # Logos de gecons
│   ├── profile-*.svg       # Avatares de perfil
│   ├── og-cover.png        # Open Graph preview (1200x630)
│   ├── numilen.png         # Foto Numilén
│   ├── milena.png          # Foto Milena
│   ├── *.png               # Casos (Progomex, Esatto, Madema, etc.)
│   ├── *.svg               # Logos de clientes
│   └── manifest.webmanifest
└── README.md               # Este archivo
```

## 🎨 Tecnologías

- **HTML5** — Semántico (header, main, section, article, footer)
- **CSS3** — Custom properties, BEM naming, responsive design
- **JavaScript** — Vanilla JS (sin frameworks)
- **Fonts** — Inter (Google Fonts)
- **SEO** — Meta tags, Schema.org JSON-LD, Open Graph
- **Analytics** — Meta Pixel (Facebook Conversions API)

## ✨ Características Principales

### 1. **Scroll Progress Indicator**
Barra vertical en el lado derecho que muestra el progreso de scroll (desktop solo).

### 2. **Sticky Scroll Reveal Animation**
Sección de proyectos con efecto parallax — cards se revelan con fade + scale según scroll.

### 3. **Responsive Design**
- Desktop: Full layout con scroll progress
- Tablet (≤900px): Grid single-column, nav oculta
- Mobile (≤600px): Scrollbar oculta, footer reorganizado, viewport dinámico (100dvh)

### 4. **Gradient Profiles**
Fotos de perfil con gradiente radial naranja-oscuro detrás.

### 5. **Dos Tracks de Servicios**
- **Track A**: Odoo & ERP (6 servicios)
- **Track B**: Web, Data & Marketing (6 servicios)

### 6. **CTA Dual**
Botones para contacto: Email + WhatsApp con mensaje pre-armado

### 7. **SEO Optimizado**
- Meta tags completos
- Schema.org Organization + WebSite + FAQPage
- Open Graph image (PNG 1200x630)
- Canonical URL
- Mobile-friendly viewport

## 📱 Responsive Breakpoints

```css
900px  — Tablets: nav principal oculta, footer single-column
600px  — Mobile: scrollbar hidden, footer reorganizado, padding reducido
```

## 🎯 Variables CSS Principales

```css
--bg: #f5f3ee          /* Fondo claro */
--ink: #1a1a1a         /* Texto oscuro */
--accent: #ff5b1f      /* Naranja gecons */
--serif: "Inter"       /* Font family */
--container: 1240px    /* Max-width */
--radius: 18px         /* Border radius */
```

## 🚀 Deployment

### Producción (geconsas.com)
1. Subir archivos vía file manager (cPanel/FTP)
2. Respetar estructura de carpetas:
   - `index.html` en raíz
   - `css/styles.css` en carpeta `css/`
   - `js/script.js` en carpeta `js/`
   - `assets/` en carpeta `assets/`
3. Hard refresh en navegador: `Ctrl+Shift+R`

### Meta Sharing Debugger
Cuando actualices contenido, re-scrapea la URL en:
https://developers.facebook.com/tools/debug/

Para forzar nueva preview image cuando cambies og:cover.png.

## 🔗 URLs de Redes Sociales

Actualizar en footer (`.site-footer__social`):
- Instagram: `https://instagram.com/gecons`
- LinkedIn: `https://linkedin.com/company/gecons`
- Facebook: `https://facebook.com/gecons`

## 📊 Analytics

- **Meta Pixel ID**: Reemplazar `TU_PIXEL_ID_GECONSAS` con ID real
- **GA4**: Configurar en script del sitio (actualmente no incluido)

## 📧 Contacto

**Email**: administracion@gecons.com  
**WhatsApp**: +54 9 351 611 4349

## 📝 Notas de Desarrollo

- **Sin comentarios** en código (requerimiento específico)
- **BEM naming** para clases CSS
- **Smooth scroll** habilitado (scroll-behavior: smooth)
- **Overscroll-behavior** controlado en mobile
- **SVG logos** sin fondo (transparent)

## 🔄 Control de Versiones

```bash
git clone https://github.com/milemonson/PresentationGeconsSolucionesInformaticas.git
cd Portfolio
git add .
git commit -m "descripción del cambio"
git push origin main
```

### .gitignore
```
.claude
node_modules/
.env
```

## 📄 Licencia

© 2026 Geconsas. Todos los derechos reservados.

---

**Construido, medido y optimizado** ✨
