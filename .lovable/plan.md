# Plan: OG más fiel a la app Zerena

## Problema
El OG que te gustó (thumbnail con mockup de teléfono + marca grande) transmite bien la idea de app, pero contiene elementos que no existen en Zerena:
- Logo con hojas en vez del sello de sol/horizonte.
- Bottom nav de "Inicio / Explorar / Favoritos / Perfil" (la app no tiene esas secciones).
- Tarjetas "Cuidar mi corazón / Manejar el estrés / No estás solo" (no son los caminos de la app).
- Tagline "Tu bienestar importa" y frase "Escucha. Comprende. Acompaña." que no aparecen.
- Footer "Profesional / Hecho en Venezuela" que tampoco está.

La app real se abre con:
1. **Header:** sello + "Zerena" + chip "Anónimo".
2. **Bienvenida:** "Un espacio calmado para los primeros momentos. Respira. No tienes que apurarte."
3. **Tres caminos:** "Necesito calma para mí", "Quiero ayudar a alguien", "Red de apoyo".
4. **Aviso legal:** PAP (OMS/OPS) y línea 911.
5. **Footer:** "Privado y anónimo · tu diario se queda en tu teléfono" + "¿En qué se basa Zerena?" + "Contáctanos".

## Propuesta
Mantener el **formato thumbnail de YouTube** (llamativo, legible a primera vista) pero reemplazar todo el contenido por la identidad y caminos reales de la app. Incluir un mockup del teléfono mostrando la pantalla de bienvenida real que ya capturé del preview.

## Pasos

1. **Generar 3 propuestas de OG (1200×630)**
   - v1: Mockup de teléfono con la bienvenida real a la izquierda, marca + "Zerena" + subtítulo real + los 3 caminos como píldoras a la derecha.
   - v2: Título grande centrado "Apoyo emocional para ti y para quien ayuda" + las 3 tarjetas reales de la bienvenida abajo + sello + chip "Anónimo".
   - v3: Enfoque en los 3 caminos como bloques visuales grandes (calma, ayudar, red) con iconos + marca Zerena + tono thumbnail.
   - Paleta fiel: crema #FAF6EF, salvia #7C9885 / #5E7A68, durazno #E9C5A8, tinta gris-cálida #3A3631.
   - Sin personas, sin imágenes traumáticas, sin inventar secciones.

2. **Mostrar las 3 propuestas** para que elijas cuál ajustar o mezclar.

3. **Implementar el OG elegido**
   - Guardar la imagen final en `public/og-image.jpg`.
   - Actualizar las meta tags `og:image` y `twitter:image` en `src/routes/__root.tsx` si la ruta de la imagen cambia.
   - Verificar que `og:title`, `og:description` y `twitter:card` estén correctos.

4. **Validar**
   - Correr build/check de TypeScript.
   - Confirmar que la imagen existe en `public/` y que las meta tags apuntan a ella.

## Qué NO haremos
- No cambiamos la navegación, la estructura de rutas ni el contenido de la app.
- No agregamos secciones que no existen (Favoritos, Perfil, Explorar, etc.) solo para que "queden bien" en la imagen.
- No generamos un nuevo texto/tagline; usamos los reales de la app.

## Entregable
Un OG final de 1200×630 que sea reconocible a primera vista como Zerena y que refleje fielmente los tres caminos de la app.
