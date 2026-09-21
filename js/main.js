const carrito = [];

const listaCarrito = document.getElementById('lista-carrito');
const contador = document.getElementById('contador');
const total = document.getElementById('total');
const carritoVacio = document.getElementById('carrito-vacio');
const btnVaciar = document.getElementById('vaciar-carrito');

document.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.btn-agregar');
    if (!boton) return;

    const producto = boton.closest('.producto');
    if (!producto) return;

    carrito.push({
        nombre: producto.dataset.nombre,
        precio: Number(producto.dataset.precio),
    });

    renderCarrito();
});

if (btnVaciar) btnVaciar.addEventListener('click', () => {
    carrito.length = 0;
    renderCarrito();
});

function renderCarrito() {
    if (!listaCarrito || !contador || !total || !carritoVacio || !btnVaciar) return;

    listaCarrito.innerHTML = '';

    carrito.forEach((item, indice) => {
        const li = document.createElement('li');

        const nombre = document.createElement('span');
        nombre.className = 'carrito-item-nombre';
        nombre.textContent = item.nombre;

        const precio = document.createElement('span');
        precio.className = 'carrito-item-precio';
        precio.textContent = `$${item.precio.toLocaleString('es-CL')}`;

        const quitar = document.createElement('button');
        quitar.type = 'button';
        quitar.className = 'carrito-quitar';
        quitar.textContent = '×';
        quitar.setAttribute('aria-label', `Quitar ${item.nombre}`);
        quitar.addEventListener('click', () => {
            carrito.splice(indice, 1);
            renderCarrito();
        });

        li.append(nombre, precio, quitar);
        listaCarrito.appendChild(li);
    });

    contador.textContent = carrito.length;
    total.textContent = carrito
        .reduce((suma, item) => suma + item.precio, 0)
        .toLocaleString('es-CL');

    carritoVacio.hidden = carrito.length > 0;
    btnVaciar.disabled = carrito.length === 0;
}

function crearTarjeta(producto) {
    const columna = document.createElement('div');
    columna.className = `col-12 col-sm-6 ${producto.categoria === 'juegos' ? 'col-lg-4' : 'col-md-4'} producto`;
    columna.dataset.nombre = producto.nombre;
    columna.dataset.precio = producto.precio;

    const tarjeta = document.createElement('div');
    tarjeta.className = 'card h-100';

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;
    imagen.className = `card-img-top${producto.categoria === 'juegos' ? ' card-img-juego' : ''}`;
    imagen.loading = 'lazy';

    const cuerpo = document.createElement('div');
    cuerpo.className = 'card-body';

    const nombre = document.createElement('p');
    nombre.className = 'card-text';
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement('p');
    precio.textContent = `$${producto.precio.toLocaleString('es-CL')}.-`;

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn-agregar';
    boton.textContent = 'Agregar al carro';

    cuerpo.append(nombre, descripcion, precio, boton);
    tarjeta.append(imagen, cuerpo);
    columna.appendChild(tarjeta);

    return columna;
}

function renderCatalogo(productos) {
    const contenedores = {
        consolas: document.getElementById('catalogo-consolas'),
        juegos: document.getElementById('catalogo-juegos'),
        accesorios: document.getElementById('catalogo-accesorios'),
    };

    Object.values(contenedores).forEach((contenedor) => {
        if (contenedor) contenedor.replaceChildren();
    });

    productos.forEach((producto) => {
        const contenedor = contenedores[producto.categoria];
        if (contenedor) contenedor.appendChild(crearTarjeta(producto));
    });
}

async function cargarCatalogo() {
    try {
        const respuesta = await fetch('data/productos.json');
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

        const productos = await respuesta.json();
        renderCatalogo(productos);
        aplicarBusqueda(new URLSearchParams(window.location.search).get('busqueda') || '');
    } catch (error) {
        console.error('No se pudo cargar el catálogo dinámico:', error);
    }
}

const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('busqueda');
const estadoBusqueda = document.getElementById('estado-busqueda');
const esPaginaProductos = Boolean(document.getElementById('catalogo-consolas'));

function aplicarBusqueda(texto) {
    if (!inputBusqueda) return;

    inputBusqueda.value = texto;
    const busqueda = texto.trim().toLowerCase();
    let coincidencias = 0;

    document.querySelectorAll('.producto').forEach((producto) => {
        const nombre = producto.dataset.nombre.toLowerCase();
        const coincide = nombre.includes(busqueda);
        producto.hidden = !coincide;
        if (coincide) coincidencias += 1;
    });

    if (estadoBusqueda) estadoBusqueda.hidden = coincidencias > 0;
}

if (formBusqueda && inputBusqueda) formBusqueda.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const texto = inputBusqueda.value.trim();
    if (!esPaginaProductos) {
        window.location.href = `productos.html?busqueda=${encodeURIComponent(texto)}`;
        return;
    }

    aplicarBusqueda(texto);
});

renderCarrito();
if (esPaginaProductos) cargarCatalogo();