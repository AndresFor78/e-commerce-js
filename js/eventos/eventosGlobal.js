import { renderizarCarritoLateral } from "../ui/uiCarrito.js";
import { agregarAlCarrito, decrementarCantidad, eliminarProducto, incrementarCantidad,
         notificarCarritoActualizado } from "../carrito/carrito.js";
import { getCarrito, setCarrito } from "../helpers/helperLocalStorage.js";
import { obtenerProductosStore } from "../store/store.js";
import { navegar } from "../services/navigationService.js";
import { RUTAS } from "../constants/rutas.js";
import { crearItemsCarrito } from "../carrito/itemCarritoFactory.js";

let carritoLateral = '';
let overlay = '';

export function inicializarEventosGlobal() {

    const logo = document.querySelector('.logo');
    const navbarCarrito = document.querySelector('.navbar-carrito');
    carritoLateral = document.getElementById('carritoLateral');
    overlay = document.getElementById('overlay');   
    
    logo.addEventListener('click', manejarEventosLogo);
    navbarCarrito.addEventListener('click', abrirCarrito);
    overlay.addEventListener('click', cerrarCarrito);   
    carritoLateral.addEventListener('click', manejarEventosCarritoLateral);   
    
}

function manejarEventosLogo(e) {

    const logo = e.target.closest('.logo-titulo');
    if (!logo) return;

    navegar(RUTAS.paginas.principal);    
    
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

    // Ver carrito
    if (e.target.classList.contains('carrito-button-ver')) {
        navegar(RUTAS.paginas.carrito); 
        return;     
    }

    // Volver a productos
    if (e.target.classList.contains('btn-ver-productos')) {
        navegar(RUTAS.paginas.principal);
        return;
    }
  
    // Cerrar carrito
    if (e.target.id === 'btnCerrarCarritoLateral') {
        cerrarCarrito();        
    }    
    
    const carritoItem = e.target.closest('.carrito-item');
    if (!carritoItem) return;

    const carrito = getCarrito();
    const productos = await obtenerProductosStore();
  
    const idProducto = Number(carritoItem.dataset.id);   
   
    if (e.target.classList.contains('btn-incrementar')) {
        incrementarCantidad(idProducto, carrito); 
        renderizarCarritoLateral(crearItemsCarrito(getCarrito(), productos));
        notificarCarritoActualizado();
    };

    if (e.target.classList.contains('btn-decrementar')) {
        decrementarCantidad(idProducto, carrito);           
        renderizarCarritoLateral(crearItemsCarrito(getCarrito(), productos));
        notificarCarritoActualizado();
    }

    if (e.target.closest('.carrito-eliminar-producto')) {
        eliminarProducto(idProducto, carrito);        
        renderizarCarritoLateral(crearItemsCarrito(getCarrito(), productos));
        notificarCarritoActualizado();
    }   

    if (e.target.classList.contains('abrir-detalle')) {
        navegar(RUTAS.paginas.producto(idProducto));        
    }
    
}




