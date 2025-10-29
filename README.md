# Landing Page - Arc Manager

Landing page profesional y elegante para Arc Manager, diseñada específicamente para arquitectos mexicanos.

## ✅ Todo Está Listo

La landing page ya incluye:
- ✅ Logo profesional (SVG)
- ✅ Favicon configurado
- ✅ Screenshots de demostración de alta calidad
- ✅ Diseño completamente responsive
- ✅ Animaciones e interacciones

## 📍 Imágenes Incluidas

### Logo
- **Ubicación:** `assets/images/logo.svg`
- **Usado en:** Header y Footer
- **Dimensiones:** 180x50px (header), 180x45px (footer)
- **Formato:** SVG (escalable, perfecto para cualquier pantalla)

### Favicon
- **Ubicación:** `assets/images/favicon.svg`
- **Configurado en:** `<head>` del HTML
- **Formato:** SVG (soportado por todos los navegadores modernos)

### Screenshots de Demostración
Todas las capturas de pantalla son SVG de alta calidad que muestran:

1. **Dashboard** (`assets/screenshots/dashboard.svg`)
   - Vista general con proyectos activos
   - Estadísticas y métricas
   - Actividad reciente
   - **Dimensiones:** 1200x750px

2. **Fases** (`assets/screenshots/fases.svg`)
   - Gestión por fases arquitectónicas
   - Progreso de cada fase
   - Estados y tareas
   - **Dimensiones:** 1200x900px

3. **Kanban** (`assets/screenshots/kanban.svg`)
   - Tablero Kanban completo
   - 4 columnas (TODO, En Progreso, Pausado, Completado)
   - Tarjetas de tareas con prioridades
   - **Dimensiones:** 1200x900px

4. **Archivos** (`assets/screenshots/archivos.svg`)
   - Gestión de archivos profesional
   - Diferentes formatos (DWG, RVT, PDF, etc.)
   - Indicadores de tamaño y fecha
   - **Dimensiones:** 1200x900px

## 🎨 Personalización del Logo

Si quieres usar tu propio logo en lugar del generado:

### Opción 1: Reemplazar el SVG
Simplemente reemplaza el archivo `assets/images/logo.svg` con tu logo manteniendo el mismo nombre.

### Opción 2: Usar PNG/JPG
1. Coloca tu logo en `assets/images/logo.png`
2. Actualiza en `index.html` línea 25:
```html
<img src="assets/images/logo.png" alt="Arc Manager" class="logo-image">
```

**Dimensiones recomendadas para PNG:**
- Header: 180px ancho x 50px alto (fondo transparente)
- Footer: Usa el mismo archivo (el CSS aplicará filtro blanco automáticamente)

## Estructura de Archivos

```
landing-arqgest/
├── index.html                      # Página principal (HTML)
├── styles.css                      # Estilos CSS
├── script.js                       # JavaScript (interacciones)
├── README.md                       # Esta guía
├── GUIA_LANDING_PAGE_ARC_MANAGER.md # Guía completa de contenido
└── assets/
    ├── images/
    │   ├── logo.svg                # Logo principal
    │   └── favicon.svg             # Favicon del sitio
    └── screenshots/
        ├── dashboard.svg           # Screenshot dashboard
        ├── fases.svg               # Screenshot gestión por fases
        ├── kanban.svg              # Screenshot tablero Kanban
        └── archivos.svg            # Screenshot gestión archivos
```

## Colores del Diseño

La paleta de colores está basada en tu aplicación:

- **Azul Principal:** #3b82f6 (Botones y acentos)
- **Verde Éxito:** #10b981 (CTAs principales)
- **Fondo:** #f8fafc (Secciones alternas)
- **Texto:** #1e293b (Principal)
- **Texto Secundario:** #64748b

## Personalización

### Cambiar información de contacto

En el footer (`index.html` línea 627-632), actualiza:
- Email de contacto
- Número de teléfono
- Ubicación
- Horario de atención

### Actualizar enlaces

Actualiza estos enlaces según tus páginas reales:
- `#login` - Tu página de inicio de sesión
- `#trial` - Formulario de registro trial
- `#demo` - Video demo o tour del producto
- `mailto:soporte@arcmanager.mx` - Tu email real

### Modificar precios

Si cambias precios en el futuro, actualiza:
- Hero section (líneas 58-62)
- Pricing section (líneas 337-379)
- Founder banner (líneas 384-391)

## Optimización

### Antes de publicar:

1. **Optimizar imágenes**
   - Usar TinyPNG o similar
   - Convertir a WebP cuando sea posible
   - Máximo 200KB por imagen

2. **Minificar archivos**
   - Minificar CSS y JS para producción
   - Usar herramientas como cssnano y terser

3. **SEO**
   - Actualizar meta descripción (línea 6)
   - Agregar meta tags de Open Graph para redes sociales
   - Crear favicon y agregarlo

4. **Analytics**
   - Agregar Google Analytics 4
   - Configurar eventos de conversión
   - Instalar Microsoft Clarity o Hotjar

## Responsive

El diseño es completamente responsive:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

Prueba en todos los dispositivos antes de publicar.

## Navegación Móvil

Actualmente el menú de navegación se oculta en móvil. Para agregar un menú hamburguesa:

1. Agregar botón hamburguesa en el header
2. Crear menú lateral (sidebar)
3. Agregar JavaScript para toggle

## Soporte

Para dudas sobre la implementación, revisa el archivo `GUIA_LANDING_PAGE_ARC_MANAGER.md` que contiene toda la estrategia de contenido, copy y recomendaciones de marketing.

## 🚀 Cómo Usar la Landing Page

### Para Ver Localmente
1. Abre el archivo `index.html` en tu navegador
2. Todo debería funcionar perfectamente sin servidor
3. Las animaciones y el FAQ son interactivos

### Para Publicar

**Opción 1: Hosting Simple (Recomendado para empezar)**
- [Netlify](https://www.netlify.com/) - Gratis, arrastra la carpeta
- [Vercel](https://vercel.com/) - Gratis, arrastra la carpeta  
- [GitHub Pages](https://pages.github.com/) - Gratis

**Opción 2: Hosting Tradicional**
- Sube todos los archivos vía FTP a tu hosting
- Asegúrate de mantener la estructura de carpetas

### Checklist Antes de Publicar

- [ ] Reemplazar logo si tienes uno propio
- [ ] Actualizar información de contacto en el footer
- [ ] Cambiar enlaces de CTA (#trial, #login, etc.) a URLs reales
- [ ] Configurar dominio personalizado
- [ ] Instalar SSL (https://)
- [ ] Configurar Google Analytics
- [ ] Probar en móvil, tablet y desktop
- [ ] Validar todos los enlaces
- [ ] Comprimir imágenes si agregas nuevas (TinyPNG)
- [ ] ¡Lanzar! 🚀

# Landing-arqgest
