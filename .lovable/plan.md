
# Serena — Fase 1 (Bienvenida + "Para mí" + Directorio)

App de Primeros Auxilios Psicológicos para los terremotos de Venezuela de junio 2026. 100% frontend, anónima, instalable y offline. Español de Venezuela, tono cálido y digno.

## Sistema de diseño (src/styles.css)

Tokens en oklch que reproducen tu paleta:
- `--background` crema #FAF6EF, `--card` #FFFDF9, `--foreground` #3A3631, `--muted-foreground` #6B645B, `--border` #E7DFD2.
- `--sage` #7C9885, `--sage-deep` #5E7A68, `--sage-soft-bg` #EAF0EA (para íconos circulares).
- `--peach` #E9C5A8, `--peach-bg` #FBEFE3 (tarjeta "Pedir ayuda").
- `--alert` #C25B4E (urgencias).
- Tipografías: Lora (serif, títulos) e Inter (sans, cuerpo) cargadas vía `<link>` en `__root.tsx` (no `@import` URL).
- Radios 16px, sombras casi imperceptibles, animaciones suaves con `prefers-reduced-motion` respetado.

## Rutas (TanStack file-based)

- `/` — Bienvenida (sello + nombre + chip Anónimo + 3 caminos + aviso legal).
- `/para-mi` — Home "Para mí": Luz del día, "Para este momento", "Para momentos difíciles", "Cuando ya pasó lo peor".
- `/para-mi/respira` — Respiración guiada 4-2-6 con círculo animado.
- `/para-mi/presente` — Grounding suave (anclas neutras, sin "mira a tu alrededor").
- `/para-mi/como-estas` — Triaje breve (3–4 preguntas) que escala a directorio si hay banderas rojas.
- `/para-mi/descansar` — Para descansar esta noche.
- `/para-mi/duelo` — Si perdiste a alguien.
- `/para-mi/normal` — Esto que sientes es normal.
- `/para-mi/diario` — Diario privado (localStorage).
- `/para-mi/[varias]` — Placeholders [PENDIENTE]: no-encontre, perdi-todo, noticias, lejos.
- `/ayuda` — Directorio completo.
- `/para-ayudar` y `/red` — placeholders mínimos con "próximamente" (se construyen en mensajes siguientes).

Layout raíz con botón flotante "Pedir ayuda" siempre visible (link a `/ayuda`), y footer "Privado y anónimo · nada de lo que escribas se guarda".

## Componentes

`src/components/`:
- `SerenaMark.tsx` — SVG sol sobre horizonte, en salvia.
- `AppHeader.tsx` — sello + "Serena" + chip "Anónimo" (escudo).
- `PageShell.tsx` — contenedor centrado máx 600px, paddings calmados.
- `Card.tsx`, `IconBubble.tsx` — tarjeta con ícono circular salvia (variante `peach`).
- `FloatingHelpButton.tsx`.
- `BreathingCircle.tsx` — animación inhala/sostén/exhala con texto que cambia.
- `LightOfTheDay.tsx` — selecciona uno de los 6 mensajes por `dayOfYear % 6`, botón Compartir (Web Share API + fallback copiar).
- `DirectoryList.tsx` + `DirectoryItem.tsx` — enlaces `tel:`, resalta 911 y MSF, pie con aviso.

`src/lib/`:
- `directory.ts` — datos exactos verificados (los que diste).
- `light-messages.ts` — los 6 mensajes EXACTOS.
- `diary.ts` — helpers localStorage (`serena.diary.v1`).
- `coordinator-contact.ts` — placeholder vacío configurable; si vacío, formularios mostrarán "esta red se está activando…".

## PWA / Offline

- `public/manifest.webmanifest` con nombre Serena, colores crema/salvia, `display: standalone`, ícono = sello.
- Íconos PWA generados (192, 512) con `imagegen` usando el sello sobre fondo crema.
- Service worker manual (cumpliendo skill PWA — no usar `vite-plugin-pwa` para evitar romper preview):
  - Registro vía wrapper guardado que solo registra en producción y fuera de iframes/hosts de Lovable/preview, con kill-switch `?sw=off`.
  - `public/sw.js` con `NetworkFirst` para navegaciones, `CacheFirst` para assets hasheados. Precachea shell mínimo. Excluye `/~oauth`.
- Meta tags PWA (`theme-color`, `apple-touch-icon`, link manifest) en `__root.tsx`.

Nota: el preview en Lovable no mostrará el SW activo (es lo correcto y documentado).

## Contenido (literal, sin inventar)

- 6 mensajes "Una luz para hoy" copiados textualmente.
- Directorio con los teléfonos exactos que diste (911 destacado urgente, MSF destacado). La Guaira/Carabobo/Zulia se omiten.
- Aviso legal OMS/OPS textual en bienvenida.
- Secciones sin contenido aprobado renderizan tarjeta `[PENDIENTE]` con explicación calmada ("Estamos preparando este espacio con cuidado.") — no se inventa texto clínico.

## Accesibilidad y responsive

- Mobile-first, columna única máx 600px, grid 3-col en `sm:` para "Para este momento".
- Headings semánticos, `aria-label` en botones de ícono, focus visible.
- Animaciones suaves con `motion-safe:` o queries `prefers-reduced-motion`.

## Fuera de alcance en esta fase (vienen después)

- Sección B "Para ayudar" detallada (módulos del curso).
- Sección C "Red" con formularios reales.
- Contenidos finos de duelo / pérdida total / noticias / estar lejos.

Estos quedarán como tarjetas accesibles con [PENDIENTE] para no inventar.

## Entregable final

Bienvenida pulida + flujo "Para mí" funcional (respiración, grounding, triaje, diario, luz del día, normalización, descansar, duelo placeholder cuidado) + directorio completo + PWA instalable y offline + diseño calmado consistente.

¿Apruebas para implementar?
