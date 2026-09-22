# CL-automotriz
consecionaria de carros

Landing page de **CL Automotriz, Seminuevos Nacionales** (Hermosillo, Son.).

Sitio estático (HTML + CSS + JS sin dependencias). Se publica tal cual en cualquier hosting estático (Netlify, Vercel, GitHub Pages, cPanel…).

```
index.html   estructura y textos
styles.css   estilos (paleta y tipografía en :root)
main.js      número de WhatsApp, inventario, filtros y formulario
assets/      logo e imágenes
```

Vista local: `python3 -m http.server` dentro de esta carpeta y abrir http://localhost:8000.

## Qué editar

- **Número de WhatsApp**: `WHATSAPP_NUMBER` en `main.js`. Todos los botones con `data-wa` lo usan.
- **Inventario**: arreglo `AUTOS` en `main.js`. Pon la foto en `assets/` y su ruta en `foto`. Si `foto` está vacía, se muestra un espacio en blanco con el texto de `fotoAlt`.
- **Foto del hero**: en `index.html`, cambia el `<div class="photo-slot">` del hero por `<img src="assets/hero.jpg" alt="…" class="photo">`.
- **Reseñas**: los tres `<figure class="review">` en `index.html` son de muestra; cámbialos por reseñas reales de Google.
- **Aviso de privacidad**: el enlace del footer apunta a `#`.
