/* Conforme a las instrucciones de la actividad se implementa una carga
dinámica del catálogo de productos desde un archivo JSON local usando Fetch API, esto 
hace que el código sea más mantenible y escalable. */

const contenedor = document.getElementById('lista-productos');
const estado = document.getElementById('estado-productos');

const formatoPrecio = (n) => `$${n.toLocaleString('es-CL')}.-`;

function crearTarjeta(producto) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';

    const card = document.createElement('article');
    card.className = 'card h-100';

    const img = document.createElement('img');
    img.className = 'card-img-top card-img-juego';
    img.src = producto.imagen;
    img.alt = producto.alt;
    img.loading = 'lazy';

    const cuerpo = document.createElement('div');
    cuerpo.className = 'card-body';

    const nombre = document.createElement('p');
    nombre.className = 'card-text';
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement('p');
    precio.textContent = formatoPrecio(producto.precio);

    cuerpo.append(nombre, descripcion, precio);
    card.append(img, cuerpo);
    col.appendChild(card);
    return col;
}

async function cargarProductos() {
    try {
        const respuesta = await fetch('data/productos.json');
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const productos = await respuesta.json();

        contenedor.replaceChildren(...productos.map(crearTarjeta));
        estado.hidden = true;
    } catch (error) {
        console.error('No se pudieron cargar los productos:', error);
        estado.textContent = 'No pudimos cargar los productos. Intenta nuevamente más tarde.';
    }
}

if (contenedor && estado) cargarProductos();
