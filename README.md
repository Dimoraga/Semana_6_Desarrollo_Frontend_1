# Curso Desarrollo Frontend I

# Semana 6 - Segunda Actividad Sumativa "Optimizando la lógica y rendimiento de una página web con Javascript"

# Contexto

El proyecto de esta corresponde a la segunda actividad sumativa del curso en donde se realizará la actividad denominada "Optimizando la lógica y rendimiento de una página web con Javascript", donde se desarrolla un sitio web que combina BootStrap 5 y Javascript para mejorar tanto la estética como la funcionalidad del sitio web. Existe una particular preocupación en el uso de BootStrap en la maquetación y el diseño visual, junto con la correcta implementación de la interactividad a través de JavaScript, que permite gestionar eventos y manipular el DOM de manera efectiva. 

# Objetivo

Implementar componentes de Javascript para otorgarle interactividad a una página web para crear una estructura moderna y donde los usarios puedan interactuar con el sitio web.

# Estructura del Proyecto

```
Semana_6/
├── index.html          # Página de inicio: carrusel, hero, características y catálogo dinámico
├── nosotros.html       # Información sobre la tienda
├── productos.html      # Listado de productos por categoría, carrito de compras y búsqueda
├── contacto.html       # Canales de contacto
├── css/
│   └── styles.css      # Estilos propios (variables, gradientes, flexbox, grid, media queries)
├── js/
│   ├── main.js         # Carrito, búsqueda y carga dinámica del catálogo (se incluye en todas las páginas)
│   └── productos.js    # Carga dinámica de la vitrina de productos con Fetch API (solo index.html)
├── data/
│   └── productos.json  # Catálogo de 21 productos (consolas, juegos y accesorios)
└── images/             # Logo de la tienda e imágenes de los productos
```

# Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir el proyecto con un servidor local (por ejemplo, la extensión *Live Server* de VS Code o `python -m http.server`). Es necesario para que `fetch` pueda leer `data/productos.json`; abrir `index.html` directamente con `file://` impedirá que el catálogo se cargue.
3. Navegar a `index.html`.

Se requiere conexión a internet para cargar Bootstrap y Google Fonts desde sus CDN.


# Tecnologías utilizadas en el proyecto

- HTML5 semántico
- CSS3 (variables personalizadas, gradientes, flexbox, grid y media queries propias)
- [Bootstrap 5.3.8](https://getbootstrap.com/) (vía CDN) para navbar, carrusel, sistema de grillas y cards
- Google Fonts (Orbitron y Press Start 2P) para la identidad visual retro/gaming

# Características implementadas

- **Navegación responsive** con navbar de Bootstrap, menú desplegable de categorías y enlaces internos (`productos.html#juegos`, etc.).
- **Carrusel** de Bootstrap en la página de inicio con cambio automático cada 3 segundos.
- **Vitrina dinámica** (`index.html`, `js/productos.js`): los productos se cargan desde `data/productos.json` con Fetch API (`async/await`), se generan las tarjetas manipulando el DOM y se muestra un mensaje de estado durante la carga o si ocurre un error.
- **Catálogo dinámico** (`productos.html`, `js/main.js`): al cargar la página, las tarjetas de consolas, juegos y accesorios se vuelven a generar desde `data/productos.json`, agrupadas por categoría. El HTML estático de esas tarjetas queda como contenido de respaldo si el `fetch` falla.
- **Carrito de compras** (`productos.html`):
  - Agregar productos mediante botones y atributos `data-nombre` / `data-precio`.
  - Quitar productos individualmente o vaciar el carrito completo.
  - Contador de productos y total actualizados en cada cambio, con formato de moneda chilena (`es-CL`).
  - Mensaje de carrito vacío y botón "Vaciar carrito" deshabilitado cuando no hay productos.
- **Búsqueda de productos** por nombre desde el buscador de la barra de navegación:
  - En `productos.html` filtra las tarjetas sin recargar la página (`preventDefault` sobre el evento `submit`) y muestra un mensaje si no hay coincidencias.
  - En las demás páginas redirige a `productos.html?busqueda=<texto>`, que aplica el filtro al cargar.
- **Carga diferida de imágenes** (`loading="lazy"`) en las tarjetas del catálogo para mejorar el rendimiento.
- **Diseño visual retro/gaming** con tipografías Orbitron y Press Start 2P, y grilla adaptable a distintos tamaños de pantalla.

# Posibles mejoras

- Eliminar la duplicación de productos entre `productos.html` (HTML estático) y `data/productos.json`, dejando una única fuente de datos.
- Unificar `crearTarjeta`, que hoy existe en `main.js` y en `productos.js`, en un módulo compartido.
- Persistir el carrito con `localStorage` y agrupar productos repetidos con una cantidad.
- Hacer la búsqueda insensible a acentos (por ejemplo, "pokemon" debería encontrar "Pokémon") y ocultar los títulos de las secciones sin resultados.
- Agregar un formulario de contacto con validación.

