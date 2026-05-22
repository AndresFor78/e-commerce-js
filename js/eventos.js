import { getProductos, 
         renderizarCarrito, renderizarModal, 
         renderizarProductos} from "./ui.js";
import { agregarAlCarrito, eliminarProducto, obtenerCarrito } from "./carrito.js";

const navbarCarrito = document.querySelector('.navbar-carrito');
const carritoLateral = document.getElementById('carritoLateral');
const overlay = document.getElementById('overlay');
const grillaProductos = document.getElementById('grillaProductos');
const modalOverlay = document.getElementById('modal');
const filtrador = document.querySelector('.filtrador');
const ordenador = document.getElementById('ordenador');

export function inicializarEventos() {

    renderizarCarrito();
    navbarCarrito.addEventListener('click', abrirCarrito);
    overlay.addEventListener('click', cerrarCarrito);
    grillaProductos.addEventListener('click', manejarEventosGrillaProductos);
    carritoLateral.addEventListener('click', manejarEventosCarritoLateral);
    modalOverlay.addEventListener('click', manejarEventosModal);
    filtrador.addEventListener('input', filtrarProductos);
    ordenador.addEventListener('change', manejarSelectOrdenador);
    
}

function abrirCarrito() {
    carritoLateral.classList.add('activo');
    overlay.classList.add('activo');    
}

function cerrarCarrito() {
    carritoLateral.classList.remove('activo');
    overlay.classList.remove('activo');
}

function abrirModal() {
    modalOverlay.classList.add('mostrar');
}

function cerrarModal() {
    modalOverlay.classList.remove('mostrar');
}

function manejarEventosGrillaProductos(e) {

    const card = e.target.closest('.card');

    if (!card) return;

    const idProducto = Number(card.dataset.id);
    const producto = getProductos().find(p=> p.id === idProducto);

    if (!producto) return;

    // Agregar al carrito
    if (e.target.classList.contains('btn-agregar-carrito')) {
        agregarAlCarrito(producto);
        renderizarCarrito();         
    };

    // Mostrar detalle producto
    if (e.target.classList.contains('btn-detalle')) {
        // abrirModal();  
        // renderizarModal(producto);  
        window.location.href = `producto.html?id=${producto.id}`; 
       
    }
}

function manejarEventosCarritoLateral(e) {

    // Cerrar carrito
    if (e.target.id === 'btnCerrarCarritoLateral') {
        cerrarCarrito();        
    }
    
    const carritoItem = e.target.closest('.carrito-item');
    if (!carritoItem) return;

    const pCantidad = carritoItem.querySelector('.producto-cantidad');
    const idProducto = Number(carritoItem.dataset.id);
    const productoCarrito = obtenerCarrito().find(c=> c.idProducto === idProducto);

    if (!productoCarrito) return;

    const btnEliminar = e.target.closest('.carrito-eliminar-producto');

    

    if (e.target.classList.contains('btn-mas')) {
        productoCarrito.cantidad++;
        renderizarCarrito();
    };

    if (e.target.classList.contains('btn-menos')) {

        if (productoCarrito.cantidad === 1) {
            eliminarProducto(productoCarrito);            
        }else{
            productoCarrito.cantidad--;            
        }
        renderizarCarrito();
    }

    if (btnEliminar) {
        eliminarProducto(productoCarrito);
        renderizarCarrito();
    }   
    
}

function manejarEventosModal(e) {

    if (e.target === e.currentTarget) {
        cerrarModal();
    }

    if (e.target.classList.contains('modal-btn-cerrar')) {
        cerrarModal();
    }

}

function filtrarProductos(e) {

    const filtro = e.target.value;
    
    const productosFiltrados = getProductos().filter(p=> p.title.toUpperCase().includes(filtro.toUpperCase()));

    renderizarProductos(productosFiltrados);    
    
}

const estrategia = {
    precioMayor: (a, b) => b.price - a.price,
    precioMenor: (a, b) => a.price - b.price,
    mejorEvaluado: (a, b) => b.rating - a.rating
}

function manejarSelectOrdenador(e) {

    const criterio = e.target.value;

    const ordenados = [...getProductos()].sort(estrategia[criterio]);
    renderizarProductos(ordenados);  
    
    
}

