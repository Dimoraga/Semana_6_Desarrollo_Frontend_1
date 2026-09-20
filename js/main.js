/* Se implementa el código necesario para desarrollar la funcionalidad de agregar productos
al carrito de compras*/

const carrito = [];

const listaCarrito = document.getElementById('lista-carrito');

const contador = document.getElementById('contador');

const total = document.getElementById('total');

document.querySelectorAll('.btn-agregar').forEach((boton) => {
    boton.addEventListener('click', () => {
        const producto = boton.closest('.producto');

        carrito.push({
            nombre: producto.dataset.nombre,
            precio: Number(producto.dataset.precio),
        })

        renderCarrito();
    })
})


const carritoVacio = document.getElementById('carrito-vacio');
const btnVaciar = document.getElementById('vaciar-carrito');

btnVaciar.addEventListener('click', () => {
    carrito.length = 0;
    renderCarrito();
});

function renderCarrito() {
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

const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('busqueda');

if (formBusqueda && inputBusqueda) formBusqueda.addEventListener('submit', (e) => {
  e.preventDefault(); // evita que la página se recargue

  const texto = inputBusqueda.value.trim().toLowerCase();

  document.querySelectorAll('.producto').forEach((producto) => {
    const nombre = producto.dataset.nombre.toLowerCase();
    producto.hidden = !nombre.includes(texto);
  });
});