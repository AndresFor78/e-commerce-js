import { decrementarCantidad, eliminarProducto, incrementarCantidad, notificarCarritoActualizado } from "../carrito/carrito.js";
import { crearItemsCarrito } from "../carrito/itemCarritoFactory.js";
import { RUTAS } from "../constants/rutas.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { navegar } from "../services/navigationService.js";
import { obtenerProductosStore } from "../store/store.js";
import { renderizarCarritoLateral, renderizarCarritoPrincipal } from "../ui/uiCarrito.js";

export function inicializarEventosCarrito() {

    document.getElementById('carritoPrincipal').addEventListener('click', manejarEventosCarrito);
    document.addEventListener('carritoActualizado', actualizarUICarritoPrincipal);

}

async function manejarEventosCarrito(e) {

    // Carrito vacío
    if (e.target.classList.contains('btn-accion')) {
        navegar(RUTAS.paginas.principal);
        return; 
    }

    inicializarAcordeonResumen(e); 

    const carrito = getCarrito();
    const productos = await obtenerProductosStore();
   
    const carritoItem = e.target.closest('.carrito-principal-item');

    if (!carritoItem) return;   

    const idProducto = Number(carritoItem.dataset.idproducto);
    const producto = productos.find(p=> p.id === idProducto);

    if (!producto) return;

    // Incrementar
    if (e.target.classList.contains('btn-incrementar')) {
        incrementarCantidad(idProducto, carrito);
        refrescarVistaCarrito(productos);     
    }

    // Decrementar
    if (e.target.classList.contains('btn-decrementar')) {
        decrementarCantidad(idProducto, carrito);
        refrescarVistaCarrito(productos);       
    }

    // Eliminar
    if (e.target.closest('.carrito-eliminar-producto')) {
        eliminarProducto(idProducto, carrito);
        refrescarVistaCarrito(productos);        
    }

    if (e.target.classList.contains('abrir-detalle')) {
        navegar(RUTAS.paginas.producto(idProducto));
    }
}

async function actualizarUICarritoPrincipal() {

    const productos = await obtenerProductosStore();
    const carrito = getCarrito();
    const itemsCarrito = crearItemsCarrito(carrito, productos);
    renderizarCarritoPrincipal(itemsCarrito);
    
}

function refrescarVistaCarrito(productos) {

    const itemsCarrito = crearItemsCarrito(getCarrito(), productos);
    renderizarCarritoLateral(itemsCarrito);
    notificarCarritoActualizado();
    renderizarCarritoPrincipal(itemsCarrito);  

}

function inicializarAcordeonResumen(e) {

    const acordeonHeader = e.target.closest('.acordeon-item-header');

    if (acordeonHeader) {

        const acordeonItem = acordeonHeader.closest('.acordeon-item');
        const contenido = acordeonItem.querySelector('.acordeon-item-contenido');
        
        const estabaAbierto = acordeonItem.classList.contains('abrir');

        acordeonItem.classList.remove('abrir');
        contenido.style.height = '0px';

        if (!estabaAbierto) {
            acordeonItem.classList.add('abrir');            
            contenido.style.height = contenido.scrollHeight + 'px';
        }
        
    }    
}