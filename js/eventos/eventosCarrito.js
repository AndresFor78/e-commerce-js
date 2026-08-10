import { decrementarCantidad, eliminarProducto, incrementarCantidad, notificarCarritoActualizado } from "../carrito/carrito.js";
import { RUTAS } from "../constants/rutas.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { navegar } from "../services/navigationService.js";
import { obtenerProductosStore } from "../store/store.js";
import { renderizarCarritoLateral, renderizarCarritoPrincipal } from "../ui/uiCarrito.js";

export function inicializarEventosCarrito() {

    document.getElementById('carritoPrincipal').addEventListener('click', manejarEventosCarrito);

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

    const productoCantidad = carritoItem.querySelector('.producto-cantidad');

    const idProducto = Number(carritoItem.dataset.idproducto);
    const producto = productos.find(p=> p.id === idProducto);

    if (!producto) return;

    // Incrementar
    if (e.target.classList.contains('btn-incrementar')) {
        incrementarCantidad(idProducto, carrito);
        refrescarUICarrito(productos);     
    }

    // Decrementar
    if (e.target.classList.contains('btn-decrementar')) {

        if (productoCantidad.textContent === '1') return;
        
        decrementarCantidad(idProducto, carrito);
        refrescarUICarrito(productos);       
    }

    // Eliminar
    if (e.target.closest('.carrito-eliminar-producto')) {
        eliminarProducto(idProducto, carrito);
        refrescarUICarrito(productos);
        
    }
}

function refrescarUICarrito(productos) {
    renderizarCarritoLateral(getCarrito(), productos);
    notificarCarritoActualizado();
    renderizarCarritoPrincipal(getCarrito(), productos);    
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