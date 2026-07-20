import { renderizarCarritoLateral } from "./ui.js";
import { agregarAlCarrito, decrementarCantidad, eliminarProducto, incrementarCantidad,
         notificarCarritoActualizado } from "./carrito.js";
import { getCarrito, setCarrito } from "./helpers/helperLocalStorage.js";
import { obtenerProductosStore } from "./store/store.js";

let carritoLateral = '';
let overlay = '';

export function inicializarEventosGlobal() {

    const navbarCarrito = document.querySelector('.navbar-carrito');
    carritoLateral = document.getElementById('carritoLateral');
    overlay = document.getElementById('overlay');   
    
    navbarCarrito.addEventListener('click', abrirCarrito);
    overlay.addEventListener('click', cerrarCarrito);   
    carritoLateral.addEventListener('click', manejarEventosCarritoLateral);   
    
}

function abrirCarrito() {
    carritoLateral.classList.add('activo');
    overlay.classList.add('activo');    
}

function cerrarCarrito() {
    carritoLateral.classList.remove('activo');
    overlay.classList.remove('activo');
}

async function manejarEventosCarritoLateral(e) {

    //Obtiene carrito del LocalStorage
    const carrito = getCarrito();
    const productos = await obtenerProductosStore();

    // Ver carrito
    if (e.target.classList.contains('carrito-button-ver')) {
        window.location.href = 'carrito.html';       
    }
  
    // Cerrar carrito
    if (e.target.id === 'btnCerrarCarritoLateral') {
        cerrarCarrito();        
    }    
    
    const carritoItem = e.target.closest('.carrito-item');
    if (!carritoItem) return;

    const idProducto = Number(carritoItem.dataset.id);   
   
    if (e.target.classList.contains('btn-mas')) {
        incrementarCantidad(idProducto, carrito); 
        renderizarCarritoLateral(getCarrito(), productos);
        notificarCarritoActualizado();
    };

    if (e.target.classList.contains('btn-menos')) {
        decrementarCantidad(idProducto, carrito);           
        renderizarCarritoLateral(getCarrito(), productos);
        notificarCarritoActualizado();
    }

    if (e.target.closest('.carrito-eliminar-producto')) {
        eliminarProducto(idProducto, carrito);        
        renderizarCarritoLateral(getCarrito(), productos);
        notificarCarritoActualizado();
    }   

    if (e.target.classList.contains('abrir-detalle')) {
        window.location.href = `producto.html?idProducto=${idProducto}`        
    }
    
}




